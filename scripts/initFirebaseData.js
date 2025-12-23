// C:\Users\RIHAN\Desktop\dealers - web\scripts\initFirebaseData.js
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, collection, addDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAcBZ7lp9Qf61qu2Hgusm0j4ImUo23ya9E",
  authDomain: "ricemill-lk.firebaseapp.com",
  projectId: "ricemill-lk",
  storageBucket: "ricemill-lk.firebasestorage.app",
  messagingSenderId: "751522316202",
  appId: "1:751522316202:web:3b032b9443bff6c8f8b5d3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

async function initializeFirebaseData() {
  console.log("🚀 Initializing Firebase Data...");

  try {
    // 1. CREATE USERS WITH AUTH + FIRESTORE
    console.log("Creating users...");
    
    // Mill Owner
    const ownerCredential = await createUserWithEmailAndPassword(
      auth, 
      "owner@ricemill.com", 
      "owner123"
    );
    
    await setDoc(doc(db, "users", ownerCredential.user.uid), {
      id: "1",
      email: "owner@ricemill.com",
      name: "Sunil Perera",
      phone: "+94771234567",
      role: "owner",
      nic_number: "851234567V",
      business_name: "Sunrise Rice Mills",
      mill_name: "Sunrise Premium Rice Mill",
      is_verified: true,
      is_active: true,
      credit_limit: 1000000,
      used_credit: 0,
      created_at: new Date().toISOString()
    });
    console.log("✅ Mill Owner created");

    // Rice Dealer
    const dealerCredential = await createUserWithEmailAndPassword(
      auth,
      "dealer@example.com",
      "dealer123"
    );
    
    await setDoc(doc(db, "users", dealerCredential.user.uid), {
      id: "2",
      email: "dealer@example.com",
      name: "Kamal Fernando",
      phone: "+94777654321",
      role: "dealer",
      nic_number: "887654321V",
      business_name: "City Rice Distributors",
      mill_name: "",
      is_verified: true,
      is_active: true,
      credit_limit: 500000,
      used_credit: 125000,
      created_at: new Date().toISOString()
    });
    console.log("✅ Rice Dealer created");

    // Driver
    const driverCredential = await createUserWithEmailAndPassword(
      auth,
      "driver@example.com",
      "driver123"
    );
    
    await setDoc(doc(db, "users", driverCredential.user.uid), {
      id: "3",
      email: "driver@example.com",
      name: "Nimal Rathnayake",
      phone: "+94771122334",
      role: "driver",
      nic_number: "901112233V",
      business_name: "",
      mill_name: "",
      is_verified: true,
      is_active: true,
      credit_limit: 0,
      used_credit: 0,
      created_at: new Date().toISOString()
    });
    console.log("✅ Driver created");

    // 2. CREATE RICE MILL
    console.log("Creating rice mills...");
    const riceMillId = "mill_" + Date.now();
    await setDoc(doc(db, "rice_mills", riceMillId), {
      id: "1",
      owner_id: ownerCredential.user.uid,
      name: "Sunrise Premium Rice Mill",
      location: "Dambulla, Sri Lanka",
      contact_phone: "+94771234567",
      rating: 4.8,
      total_orders: 156,
      is_active: true,
      created_at: new Date().toISOString()
    });
    console.log("✅ Rice Mill created");

    // 3. CREATE PRODUCTS
    console.log("Creating products...");
    const products = [
      {
        id: "1",
        rice_mill_id: riceMillId,
        name: "Samba Rice",
        type: "White Rice",
        category: "Premium",
        price_per_kg: 250,
        stock_quantity: 5000,
        stock_status: "In Stock",
        min_order_kg: 50,
        is_active: true,
        created_at: new Date().toISOString()
      },
      {
        id: "2",
        rice_mill_id: riceMillId,
        name: "Red Rice",
        type: "Red Rice",
        category: "Organic",
        price_per_kg: 280,
        stock_quantity: 3000,
        stock_status: "In Stock",
        min_order_kg: 50,
        is_active: true,
        created_at: new Date().toISOString()
      },
      {
        id: "3",
        rice_mill_id: riceMillId,
        name: "Keeri Samba",
        type: "White Rice",
        category: "Traditional",
        price_per_kg: 270,
        stock_quantity: 2000,
        stock_status: "Low Stock",
        min_order_kg: 50,
        is_active: true,
        created_at: new Date().toISOString()
      }
    ];

    for (const product of products) {
      const productId = "product_" + product.id;
      await setDoc(doc(db, "products", productId), product);
    }
    console.log("✅ Products created");

    // 4. CREATE DRIVER PROFILE
    console.log("Creating driver profile...");
    await setDoc(doc(db, "driver_profiles", "driver_1"), {
      id: "1",
      user_id: driverCredential.user.uid,
      license_number: "DL1234567",
      license_expiry: "2026-12-31",
      current_status: "available",
      trips_completed: 45,
      created_at: new Date().toISOString()
    });
    console.log("✅ Driver profile created");

    // 5. CREATE VEHICLE
    console.log("Creating vehicle...");
    await setDoc(doc(db, "vehicles", "vehicle_1"), {
      id: "1",
      vehicle_number: "WP CAB 1234",
      vehicle_type: "Lorry",
      capacity_kg: 10000,
      status: "available",
      driver_id: driverCredential.user.uid,
      created_at: new Date().toISOString()
    });
    console.log("✅ Vehicle created");

    // 6. CREATE SAMPLE ORDER
    console.log("Creating sample order...");
    const orderId = "order_" + Date.now();
    await setDoc(doc(db, "orders", orderId), {
      id: "1",
      order_number: "ORD-2024-001",
      dealer_id: dealerCredential.user.uid,
      rice_mill_id: riceMillId,
      total_amount: 125000,
      total_weight: 500,
      payment_method: "credit",
      order_status: "processing",
      delivery_address: "No. 123, Galle Road, Colombo 03",
      created_at: new Date().toISOString()
    });
    console.log("✅ Order created");

    // 7. CREATE ORDER ITEMS
    console.log("Creating order items...");
    await setDoc(doc(db, "order_items", "item_1"), {
      id: "1",
      order_id: orderId,
      product_id: "product_1",
      quantity_kg: 300,
      price_per_kg: 250,
      total_price: 75000
    });

    await setDoc(doc(db, "order_items", "item_2"), {
      id: "2",
      order_id: orderId,
      product_id: "product_2",
      quantity_kg: 200,
      price_per_kg: 250,
      total_price: 50000
    });
    console.log("✅ Order items created");

    // 8. CREATE NOTIFICATION
    console.log("Creating notification...");
    await setDoc(doc(db, "notifications", "notif_1"), {
      id: "1",
      user_id: dealerCredential.user.uid,
      title: "Welcome to Rice Mill System!",
      message: "Your account has been successfully verified. You can now place orders.",
      is_read: false,
      created_at: new Date().toISOString()
    });
    console.log("✅ Notification created");

    console.log("\n🎉 ALL DATA INITIALIZED SUCCESSFULLY!");
    console.log("\n📋 TEST ACCOUNTS:");
    console.log("Mill Owner: owner@ricemill.com / owner123");
    console.log("Rice Dealer: dealer@example.com / dealer123");
    console.log("Driver: driver@example.com / driver123");

  } catch (error) {
    console.error("❌ Error initializing data:", error);
  }
}

// Run the initialization
initializeFirebaseData();