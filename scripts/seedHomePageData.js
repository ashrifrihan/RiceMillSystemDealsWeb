// C:\Users\RIHAN\Desktop\dealers - web\scripts\seedHomePageData.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

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

async function seedHomePageData() {
  console.log("🌱 Seeding HomePage Data...");

  try {
    // 1. First create a rice mill
    console.log("Creating rice mill...");
    const millData = {
      name: "Sunrise Premium Rice Mill",
      location: "Dambulla, Sri Lanka",
      contact_phone: "+94771234567",
      rating: 4.8,
      total_orders: 156,
      is_active: true,
      created_at: new Date().toISOString()
    };
    
    const millRef = await addDoc(collection(db, "rice_mills"), millData);
    console.log("✅ Rice Mill created with ID:", millRef.id);

    // 2. Create sample products for homepage
    console.log("Creating sample products...");
    
    const products = [
      {
        rice_mill_id: millRef.id,
        name: "Premium Nadu Rice - Grade A",
        type: "White Rice",
        category: "Nadu Rice",
        price_per_kg: 115,
        stock_quantity: 5000,
        stock_status: "In Stock",
        min_order_kg: 50,
        is_active: true,
        created_at: new Date().toISOString(),
        rating: 4.8
      },
      {
        rice_mill_id: millRef.id,
        name: "Export Quality Samba Rice",
        type: "White Rice",
        category: "Samba Rice",
        price_per_kg: 125,
        stock_quantity: 2500,
        stock_status: "In Stock",
        min_order_kg: 25,
        is_active: true,
        created_at: new Date().toISOString(),
        rating: 4.7
      },
      {
        rice_mill_id: millRef.id,
        name: "Organic Red Rice",
        type: "Red Rice",
        category: "Organic Rice",
        price_per_kg: 145,
        stock_quantity: 1800,
        stock_status: "In Stock",
        min_order_kg: 30,
        is_active: true,
        created_at: new Date().toISOString(),
        rating: 4.9
      },
      {
        rice_mill_id: millRef.id,
        name: "Premium Basmati Rice",
        type: "Basmati",
        category: "Basmati Rice",
        price_per_kg: 195,
        stock_quantity: 1200,
        stock_status: "In Stock",
        min_order_kg: 20,
        is_active: true,
        created_at: new Date().toISOString(),
        rating: 4.8
      },
      {
        rice_mill_id: millRef.id,
        name: "Raw Rice - Standard",
        type: "Raw Rice",
        category: "Raw Rice",
        price_per_kg: 98,
        stock_quantity: 8000,
        stock_status: "In Stock",
        min_order_kg: 100,
        is_active: true,
        created_at: new Date().toISOString(),
        rating: 4.5
      },
      {
        rice_mill_id: millRef.id,
        name: "Broken Rice - Grade B",
        type: "Broken Rice",
        category: "Broken Rice",
        price_per_kg: 85,
        stock_quantity: 3000,
        stock_status: "In Stock",
        min_order_kg: 100,
        is_active: true,
        created_at: new Date().toISOString(),
        rating: 4.3
      },
      {
        rice_mill_id: millRef.id,
        name: "Rice Flour - Fine",
        type: "Flour",
        category: "Rice Flour",
        price_per_kg: 110,
        stock_quantity: 1500,
        stock_status: "In Stock",
        min_order_kg: 25,
        is_active: true,
        created_at: new Date().toISOString(),
        rating: 4.6
      },
      {
        rice_mill_id: millRef.id,
        name: "Keeri Samba - Traditional",
        type: "White Rice",
        category: "Samba Rice",
        price_per_kg: 135,
        stock_quantity: 2000,
        stock_status: "Low Stock",
        min_order_kg: 50,
        is_active: true,
        created_at: new Date().toISOString(),
        rating: 4.7
      }
    ];

    for (const product of products) {
      await addDoc(collection(db, "products"), product);
    }
    console.log(`✅ ${products.length} Products created`);

    // 3. Create some sample orders for stats
    console.log("Creating sample orders...");
    
    // First create a test dealer user (for orders)
    const dealerData = {
      email: "testdealer@example.com",
      name: "Test Dealer",
      phone: "+94777654321",
      role: "dealer",
      business_name: "Test Rice Shop",
      is_verified: true,
      is_active: true,
      credit_limit: 500000,
      used_credit: 125000,
      created_at: new Date().toISOString()
    };
    
    // Note: For real users, you need to create auth user first
    // This is just for sample orders
    
    console.log("🎉 HomePage Seed Data Complete!");
    console.log("\n📊 Summary:");
    console.log("- 1 Rice Mill created");
    console.log("- 8 Products created across categories");
    console.log("- HomePage will now show real data from Firebase");
    console.log("\n🔑 Next Steps:");
    console.log("1. Run the full initialization script for complete data");
    console.log("2. Add real users through Auth + Firestore");
    console.log("3. Your HomePage is now connected to Firebase!");

  } catch (error) {
    console.error("❌ Error seeding data:", error);
  }
}

// Run the seed script
seedHomePageData();