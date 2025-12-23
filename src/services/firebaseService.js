// C:\Users\RIHAN\Desktop\dealers - web\src\services\firebaseService.js
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp
} from "firebase/firestore";
import { db } from "../firebase/index.js";

// USERS SERVICE
export const userService = {
  // Get user by ID
  getUserById: async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, "users", userId));
      return userDoc.exists() ? { id: userDoc.id, ...userDoc.data() } : null;
    } catch (error) {
      console.error("Error getting user:", error);
      throw error;
    }
  },

  // Update user profile
  updateUserProfile: async (userId, data) => {
    try {
      await updateDoc(doc(db, "users", userId), {
        ...data,
        updated_at: new Date().toISOString()
      });
      return true;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  },

  // Get all dealers
  getAllDealers: async () => {
    try {
      const q = query(
        collection(db, "users"),
        where("role", "==", "dealer"),
        where("is_active", "==", true)
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error getting dealers:", error);
      throw error;
    }
  }
};

// PRODUCTS SERVICE
export const productService = {
  // Get all products
  getAllProducts: async (riceMillId = null) => {
    try {
      let q;
      if (riceMillId) {
        q = query(
          collection(db, "products"),
          where("rice_mill_id", "==", riceMillId),
          where("is_active", "==", true),
          orderBy("created_at", "desc")
        );
      } else {
        q = query(
          collection(db, "products"),
          where("is_active", "==", true),
          orderBy("created_at", "desc")
        );
      }
      
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error getting products:", error);
      throw error;
    }
  },

  // Get product by ID
  getProductById: async (productId) => {
    try {
      const productDoc = await getDoc(doc(db, "products", productId));
      return productDoc.exists() ? { id: productDoc.id, ...productDoc.data() } : null;
    } catch (error) {
      console.error("Error getting product:", error);
      throw error;
    }
  },

  // Update product stock
  updateProductStock: async (productId, quantity) => {
    try {
      const product = await getDoc(doc(db, "products", productId));
      if (!product.exists()) throw new Error("Product not found");
      
      const currentStock = product.data().stock_quantity;
      const newStock = currentStock - quantity;
      
      await updateDoc(doc(db, "products", productId), {
        stock_quantity: newStock,
        stock_status: newStock <= 0 ? "Out of Stock" : newStock < 100 ? "Low Stock" : "In Stock",
        updated_at: new Date().toISOString()
      });
      
      return true;
    } catch (error) {
      console.error("Error updating stock:", error);
      throw error;
    }
  }
};

// ORDERS SERVICE
export const orderService = {
  // Create new order
  createOrder: async (orderData, orderItems) => {
    try {
      // Generate order number
      const orderNumber = `ORD-${Date.now()}`;
      
      // Create order document
      const orderDoc = await addDoc(collection(db, "orders"), {
        ...orderData,
        order_number: orderNumber,
        created_at: new Date().toISOString()
      });

      // Create order items
      for (const item of orderItems) {
        await addDoc(collection(db, "order_items"), {
          ...item,
          order_id: orderDoc.id,
          created_at: new Date().toISOString()
        });
      }

      // Create order timeline
      await addDoc(collection(db, "order_timeline"), {
        order_id: orderDoc.id,
        step: "order_placed",
        completed: true,
        created_at: new Date().toISOString()
      });

      // Create notification
      await addDoc(collection(db, "notifications"), {
        user_id: orderData.dealer_id,
        title: "Order Placed Successfully",
        message: `Your order ${orderNumber} has been placed successfully.`,
        is_read: false,
        created_at: new Date().toISOString()
      });

      return { success: true, orderId: orderDoc.id, orderNumber };
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  },

  // Get dealer orders
  getDealerOrders: async (dealerId) => {
    try {
      const q = query(
        collection(db, "orders"),
        where("dealer_id", "==", dealerId),
        orderBy("created_at", "desc")
      );
      
      const snapshot = await getDocs(q);
      const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Get order items for each order
      for (const order of orders) {
        const itemsQuery = query(
          collection(db, "order_items"),
          where("order_id", "==", order.id)
        );
        const itemsSnapshot = await getDocs(itemsQuery);
        order.items = itemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      }

      return orders;
    } catch (error) {
      console.error("Error getting orders:", error);
      throw error;
    }
  },

  // Update order status
  updateOrderStatus: async (orderId, status, userId) => {
    try {
      await updateDoc(doc(db, "orders", orderId), {
        order_status: status,
        updated_at: new Date().toISOString()
      });

      // Create timeline entry
      await addDoc(collection(db, "order_timeline"), {
        order_id: orderId,
        step: status,
        completed: true,
        created_at: new Date().toISOString()
      });

      // Get order to find dealer ID
      const orderDoc = await getDoc(doc(db, "orders", orderId));
      if (orderDoc.exists()) {
        const order = orderDoc.data();
        
        // Create notification
        await addDoc(collection(db, "notifications"), {
          user_id: order.dealer_id,
          title: `Order Status Updated`,
          message: `Your order ${order.order_number} is now ${status}.`,
          is_read: false,
          created_at: new Date().toISOString()
        });
      }

      return true;
    } catch (error) {
      console.error("Error updating order status:", error);
      throw error;
    }
  }
};

// NOTIFICATIONS SERVICE
export const notificationService = {
  // Get user notifications
  getUserNotifications: async (userId) => {
    try {
      const q = query(
        collection(db, "notifications"),
        where("user_id", "==", userId),
        orderBy("created_at", "desc"),
        limit(50)
      );
      
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error getting notifications:", error);
      throw error;
    }
  },

  // Mark notification as read
  markAsRead: async (notificationId) => {
    try {
      await updateDoc(doc(db, "notifications", notificationId), {
        is_read: true,
        updated_at: new Date().toISOString()
      });
      return true;
    } catch (error) {
      console.error("Error marking notification:", error);
      throw error;
    }
  },

  // Create notification
  createNotification: async (userId, title, message) => {
    try {
      await addDoc(collection(db, "notifications"), {
        user_id: userId,
        title,
        message,
        is_read: false,
        created_at: new Date().toISOString()
      });
      return true;
    } catch (error) {
      console.error("Error creating notification:", error);
      throw error;
    }
  }
};

// CART SERVICE
export const cartService = {
  // Get user cart
  getUserCart: async (userId) => {
    try {
      const q = query(
        collection(db, "cart_items"),
        where("user_id", "==", userId)
      );
      
      const snapshot = await getDocs(q);
      const cartItems = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Get product details for each cart item
      for (const item of cartItems) {
        const product = await getDoc(doc(db, "products", item.product_id));
        if (product.exists()) {
          item.product = product.data();
        }
      }

      return cartItems;
    } catch (error) {
      console.error("Error getting cart:", error);
      throw error;
    }
  },

  // Add to cart
  addToCart: async (userId, productId, quantity) => {
    try {
      // Check if item already in cart
      const q = query(
        collection(db, "cart_items"),
        where("user_id", "==", userId),
        where("product_id", "==", productId)
      );
      
      const existing = await getDocs(q);
      
      if (!existing.empty) {
        // Update existing item
        const existingDoc = existing.docs[0];
        const currentQty = existingDoc.data().quantity_kg;
        await updateDoc(doc(db, "cart_items", existingDoc.id), {
          quantity_kg: currentQty + quantity,
          updated_at: new Date().toISOString()
        });
      } else {
        // Add new item
        await addDoc(collection(db, "cart_items"), {
          user_id: userId,
          product_id: productId,
          quantity_kg: quantity,
          created_at: new Date().toISOString()
        });
      }

      return true;
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  },

  // Remove from cart
  removeFromCart: async (cartItemId) => {
    try {
      await deleteDoc(doc(db, "cart_items", cartItemId));
      return true;
    } catch (error) {
      console.error("Error removing from cart:", error);
      throw error;
    }
  },

  // Clear cart
  clearCart: async (userId) => {
    try {
      const q = query(
        collection(db, "cart_items"),
        where("user_id", "==", userId)
      );
      
      const snapshot = await getDocs(q);
      const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref));
      await Promise.all(deletePromises);
      
      return true;
    } catch (error) {
      console.error("Error clearing cart:", error);
      throw error;
    }
  }
};