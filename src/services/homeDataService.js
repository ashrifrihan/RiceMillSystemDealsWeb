// C:\Users\RIHAN\Desktop\dealers - web\src\services\homeDataService.js
import { 
  collection, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit,
  doc,
  getDoc 
} from "firebase/firestore";
import { db } from "../firebase/index.js";

export const homeDataService = {
  
  // 🔥 GET TOP SELLING PRODUCTS FROM FIREBASE
  getTopSellingProducts: async () => {
    try {
      const q = query(
        collection(db, "products"),
        where("is_active", "==", true),
        orderBy("price_per_kg", "asc"),
        limit(8)
      );
      
      const snapshot = await getDocs(q);
      const products = [];
      
      for (const docSnap of snapshot.docs) {
        const productData = docSnap.data();
        const product = {
          id: docSnap.id,
          name: productData.name || "Rice Product",
          millName: "Loading Mill...",
          pricePerKg: productData.price_per_kg || 0,
          minOrder: productData.min_order_kg || 50,
          stock: productData.stock_quantity || 0,
          rating: productData.rating || 4.5,
          category: productData.category || "Rice",
          image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80"
        };
        
        // Get mill name
        if (productData.rice_mill_id) {
          const millDoc = await getDoc(doc(db, "rice_mills", productData.rice_mill_id));
          if (millDoc.exists()) {
            product.millName = millDoc.data().name || "Rice Mill";
          }
        }
        
        products.push(product);
      }
      
      return products;
    } catch (error) {
      console.error("Error fetching top products:", error);
      return [];
    }
  },
  
  // 🔥 GET ALL PRODUCT CATEGORIES FROM FIREBASE
  getProductCategories: async () => {
    try {
      const q = query(
        collection(db, "products"),
        where("is_active", "==", true)
      );
      
      const snapshot = await getDocs(q);
      const categoriesMap = {};
      
      snapshot.docs.forEach(docSnap => {
        const product = docSnap.data();
        const category = product.category || "Uncategorized";
        
        if (!categoriesMap[category]) {
          categoriesMap[category] = {
            name: category,
            count: 0,
            minPrice: product.price_per_kg,
            maxPrice: product.price_per_kg
          };
        }
        
        categoriesMap[category].count++;
        if (product.price_per_kg < categoriesMap[category].minPrice) {
          categoriesMap[category].minPrice = product.price_per_kg;
        }
        if (product.price_per_kg > categoriesMap[category].maxPrice) {
          categoriesMap[category].maxPrice = product.price_per_kg;
        }
      });
      
      // Convert to array and add images
      const categories = Object.values(categoriesMap).map((cat, index) => {
        const images = [
          "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
          "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
          "https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80"
        ];
        
        return {
          ...cat,
          products: cat.count,
          priceRange: `LKR ${cat.minPrice}-${cat.maxPrice}/KG`,
          image: images[index % images.length],
          bgColor: `bg-gradient-to-br from-green-${50 + (index * 10)} to-green-${100 + (index * 10)}`,
          borderColor: `border-green-${200 + (index * 10)}`,
          textColor: `text-green-${700 + (index * 10)}`
        };
      });
      
      return categories;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  },
  
  // 🔥 GET DEALER STATS FROM FIREBASE
  getDealerStats: async (userId) => {
    if (!userId) return null;
    
    try {
      // Get user data
      const userDoc = await getDoc(doc(db, "users", userId));
      if (!userDoc.exists()) return null;
      
      const userData = userDoc.data();
      
      // Get order count
      const ordersQuery = query(
        collection(db, "orders"),
        where("dealer_id", "==", userId)
      );
      const ordersSnapshot = await getDocs(ordersQuery);
      const totalOrders = ordersSnapshot.size;
      
      // Get total spent
      let totalSpent = 0;
      ordersSnapshot.docs.forEach(orderDoc => {
        const order = orderDoc.data();
        totalSpent += order.total_amount || 0;
      });
      
      return {
        creditLimit: userData.credit_limit || 0,
        usedCredit: userData.used_credit || 0,
        availableCredit: (userData.credit_limit || 0) - (userData.used_credit || 0),
        totalOrders,
        totalSpent
      };
    } catch (error) {
      console.error("Error fetching dealer stats:", error);
      return null;
    }
  },
  
  // 🔥 GET RICE MILLS COUNT
  getRiceMillsCount: async () => {
    try {
      const q = query(
        collection(db, "rice_mills"),
        where("is_active", "==", true)
      );
      const snapshot = await getDocs(q);
      return snapshot.size;
    } catch (error) {
      console.error("Error fetching mills count:", error);
      return 50; // Fallback
    }
  }
};