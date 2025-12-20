// Mock Users
export const users = [{
  id: "1",
  name: "Admin User",
  email: "admin@ricemill.com",
  role: "admin",
  phone: "+1 (123) 456-7890",
  address: "123 Admin Street, Rice City, 12345",
  shopName: "Rice Mill Admin",
  joinDate: new Date(2020, 1, 15)
}, {
  id: "2",
  name: "John Smith",
  email: "john@example.com",
  role: "user",
  phone: "+1 (234) 567-8901",
  address: "456 Dealer Avenue, Rice Town, 23456",
  shopName: "John's Rice Shop",
  joinDate: new Date(2021, 3, 10)
}, {
  id: "3",
  name: "Sarah Johnson",
  email: "sarah@example.com",
  role: "user",
  phone: "+1 (345) 678-9012",
  address: "789 Grain Road, Rice Village, 34567",
  shopName: "Sarah's Rice Emporium",
  joinDate: new Date(2021, 5, 22)
}];
// Mock Products
export const products = [{
  id: "p1",
  name: "Premium Basmati Rice",
  category: "Rice",
  price: 120,
  unit: "kg",
  stock: 5000,
  description: "Long-grain aromatic rice with a nutty flavor",
  image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
}, {
  id: "p2",
  name: "Jasmine Rice",
  category: "Rice",
  price: 95,
  unit: "kg",
  stock: 8000,
  description: "Fragrant, long-grain rice with a subtle floral aroma",
  image: "https://images.unsplash.com/photo-1568347355280-d21d331b540f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
}, {
  id: "p3",
  name: "Brown Rice",
  category: "Rice",
  price: 85,
  unit: "kg",
  stock: 3000,
  description: "Whole grain rice with the bran layer intact, offering more nutrients",
  image: "https://images.unsplash.com/photo-1536304447766-da0ed4ce1b73?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
}, {
  id: "p4",
  name: "Sona Masoori Rice",
  category: "Rice",
  price: 110,
  unit: "kg",
  stock: 6000,
  description: "Medium-grain rice popular for its light and fluffy texture",
  image: "https://images.unsplash.com/photo-1551889761-6c22e8ae4d96?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
}, {
  id: "p5",
  name: "Rice Bran Oil",
  category: "By-products",
  price: 220,
  unit: "liter",
  stock: 1000,
  description: "Healthy cooking oil extracted from rice bran",
  image: "https://images.unsplash.com/photo-1620705163246-1e9a8fb2f917?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
}, {
  id: "p6",
  name: "Rice Flour",
  category: "By-products",
  price: 75,
  unit: "kg",
  stock: 2000,
  description: "Finely milled flour made from ground rice",
  image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
}];
// Mock Orders
export const orders = [{
  id: "ORD-2023-001",
  customerId: "2",
  customerName: "John Smith",
  items: [{
    productId: "p1",
    name: "Premium Basmati Rice",
    quantity: 500,
    price: 120,
    total: 60000
  }, {
    productId: "p3",
    name: "Brown Rice",
    quantity: 200,
    price: 85,
    total: 17000
  }],
  totalAmount: 77000,
  status: "delivered",
  paymentMethod: "cash",
  paymentStatus: "paid",
  orderDate: new Date(2023, 5, 15),
  deliveryDate: new Date(2023, 5, 18),
  notes: "Deliver to the back entrance"
}, {
  id: "ORD-2023-002",
  customerId: "3",
  customerName: "Sarah Johnson",
  items: [{
    productId: "p2",
    name: "Jasmine Rice",
    quantity: 1000,
    price: 95,
    total: 95000
  }],
  totalAmount: 95000,
  status: "in-transit",
  paymentMethod: "credit",
  paymentStatus: "pending",
  orderDate: new Date(2023, 6, 2),
  deliveryDate: new Date(2023, 6, 5),
  notes: "",
  driver: {
    name: "Mike Thompson",
    phone: "+1 (456) 789-0123",
    vehicle: "Truck XYZ-123"
  }
}, {
  id: "ORD-2023-003",
  customerId: "2",
  customerName: "John Smith",
  items: [{
    productId: "p4",
    name: "Sona Masoori Rice",
    quantity: 300,
    price: 110,
    total: 33000
  }, {
    productId: "p5",
    name: "Rice Bran Oil",
    quantity: 50,
    price: 220,
    total: 11000
  }],
  totalAmount: 44000,
  status: "processing",
  paymentMethod: "cash",
  paymentStatus: "paid",
  orderDate: new Date(2023, 6, 10),
  deliveryDate: new Date(2023, 6, 14),
  notes: "Call before delivery"
}, {
  id: "ORD-2023-004",
  customerId: "3",
  customerName: "Sarah Johnson",
  items: [{
    productId: "p1",
    name: "Premium Basmati Rice",
    quantity: 800,
    price: 120,
    total: 96000
  }, {
    productId: "p6",
    name: "Rice Flour",
    quantity: 100,
    price: 75,
    total: 7500
  }],
  totalAmount: 103500,
  status: "delivered",
  paymentMethod: "credit",
  paymentStatus: "paid",
  orderDate: new Date(2023, 5, 20),
  deliveryDate: new Date(2023, 5, 23),
  notes: ""
}, {
  id: "ORD-2023-005",
  customerId: "2",
  customerName: "John Smith",
  items: [{
    productId: "p2",
    name: "Jasmine Rice",
    quantity: 500,
    price: 95,
    total: 47500
  }, {
    productId: "p3",
    name: "Brown Rice",
    quantity: 300,
    price: 85,
    total: 25500
  }],
  totalAmount: 73000,
  status: "cancelled",
  paymentMethod: "cash",
  paymentStatus: "refunded",
  orderDate: new Date(2023, 4, 5),
  deliveryDate: null,
  notes: "Customer cancelled due to change in requirements"
}];
// Mock Loans
export const loans = [{
  id: "LOAN-2023-001",
  customerId: "2",
  customerName: "John Smith",
  riceType: "Premium Basmati Rice",
  quantity: 500,
  amount: 60000,
  interestRate: 5,
  issueDate: new Date(2023, 4, 10),
  dueDate: new Date(2023, 7, 10),
  status: "outstanding",
  remainingAmount: 60000,
  payments: []
}, {
  id: "LOAN-2023-002",
  customerId: "3",
  customerName: "Sarah Johnson",
  riceType: "Jasmine Rice",
  quantity: 1000,
  amount: 95000,
  interestRate: 5,
  issueDate: new Date(2023, 5, 15),
  dueDate: new Date(2023, 8, 15),
  status: "outstanding",
  remainingAmount: 95000,
  payments: []
}, {
  id: "LOAN-2023-003",
  customerId: "2",
  customerName: "John Smith",
  riceType: "Brown Rice",
  quantity: 500,
  amount: 42500,
  interestRate: 5,
  issueDate: new Date(2023, 3, 5),
  dueDate: new Date(2023, 6, 5),
  status: "overdue",
  remainingAmount: 10000,
  payments: [{
    id: "PAY-001",
    amount: 32500,
    date: new Date(2023, 5, 10),
    method: "bank transfer"
  }]
}, {
  id: "LOAN-2023-004",
  customerId: "3",
  customerName: "Sarah Johnson",
  riceType: "Sona Masoori Rice",
  quantity: 300,
  amount: 33000,
  interestRate: 5,
  issueDate: new Date(2023, 2, 20),
  dueDate: new Date(2023, 5, 20),
  status: "paid",
  remainingAmount: 0,
  payments: [{
    id: "PAY-002",
    amount: 15000,
    date: new Date(2023, 3, 25),
    method: "cash"
  }, {
    id: "PAY-003",
    amount: 18000,
    date: new Date(2023, 5, 15),
    method: "bank transfer"
  }]
}];
// Mock Deliveries
export const deliveries = [{
  id: "DEL-2023-001",
  orderId: "ORD-2023-002",
  customerId: "3",
  customerName: "Sarah Johnson",
  customerAddress: "789 Grain Road, Rice Village, 34567",
  customerPhone: "+1 (345) 678-9012",
  status: "in-transit",
  driver: {
    name: "Mike Thompson",
    phone: "+1 (456) 789-0123",
    vehicle: "Truck XYZ-123"
  },
  dispatchTime: new Date(2023, 6, 4, 8, 30),
  estimatedArrival: new Date(2023, 6, 5, 10, 0),
  currentLocation: {
    lat: 40.7128,
    lng: -74.006
  },
  destination: {
    lat: 40.7614,
    lng: -73.9776
  },
  notes: "Customer requested delivery before noon"
}, {
  id: "DEL-2023-002",
  orderId: "ORD-2023-003",
  customerId: "2",
  customerName: "John Smith",
  customerAddress: "456 Dealer Avenue, Rice Town, 23456",
  customerPhone: "+1 (234) 567-8901",
  status: "scheduled",
  driver: {
    name: "David Wilson",
    phone: "+1 (567) 890-1234",
    vehicle: "Van ABC-456"
  },
  dispatchTime: new Date(2023, 6, 14, 9, 0),
  estimatedArrival: new Date(2023, 6, 14, 11, 30),
  currentLocation: {
    lat: 40.7128,
    lng: -74.006
  },
  destination: {
    lat: 40.6782,
    lng: -73.9442
  },
  notes: "Call before delivery"
}, {
  id: "DEL-2023-003",
  orderId: "ORD-2023-001",
  customerId: "2",
  customerName: "John Smith",
  customerAddress: "456 Dealer Avenue, Rice Town, 23456",
  customerPhone: "+1 (234) 567-8901",
  status: "delivered",
  driver: {
    name: "Mike Thompson",
    phone: "+1 (456) 789-0123",
    vehicle: "Truck XYZ-123"
  },
  dispatchTime: new Date(2023, 5, 18, 8, 0),
  estimatedArrival: new Date(2023, 5, 18, 10, 30),
  actualArrival: new Date(2023, 5, 18, 10, 15),
  notes: "Delivered to the back entrance as requested"
}, {
  id: "DEL-2023-004",
  orderId: "ORD-2023-004",
  customerId: "3",
  customerName: "Sarah Johnson",
  customerAddress: "789 Grain Road, Rice Village, 34567",
  customerPhone: "+1 (345) 678-9012",
  status: "delivered",
  driver: {
    name: "David Wilson",
    phone: "+1 (567) 890-1234",
    vehicle: "Van ABC-456"
  },
  dispatchTime: new Date(2023, 5, 23, 9, 30),
  estimatedArrival: new Date(2023, 5, 23, 12, 0),
  actualArrival: new Date(2023, 5, 23, 11, 45),
  notes: ""
}];
// Mock Inventory Transactions
export const inventoryTransactions = [{
  id: "INV-2023-001",
  productId: "p1",
  productName: "Premium Basmati Rice",
  type: "purchase",
  quantity: 2000,
  unitPrice: 100,
  totalAmount: 200000,
  date: new Date(2023, 4, 5),
  supplier: "Global Rice Suppliers Ltd.",
  notes: "Regular monthly purchase"
}, {
  id: "INV-2023-002",
  productId: "p2",
  productName: "Jasmine Rice",
  type: "purchase",
  quantity: 3000,
  unitPrice: 80,
  totalAmount: 240000,
  date: new Date(2023, 4, 10),
  supplier: "Asian Rice Imports Inc.",
  notes: ""
}, {
  id: "INV-2023-003",
  productId: "p1",
  productName: "Premium Basmati Rice",
  type: "sale",
  quantity: 500,
  unitPrice: 120,
  totalAmount: 60000,
  date: new Date(2023, 5, 15),
  customer: "John Smith",
  orderId: "ORD-2023-001",
  notes: ""
}, {
  id: "INV-2023-004",
  productId: "p3",
  productName: "Brown Rice",
  type: "sale",
  quantity: 200,
  unitPrice: 85,
  totalAmount: 17000,
  date: new Date(2023, 5, 15),
  customer: "John Smith",
  orderId: "ORD-2023-001",
  notes: ""
}, {
  id: "INV-2023-005",
  productId: "p5",
  productName: "Rice Bran Oil",
  type: "purchase",
  quantity: 500,
  unitPrice: 180,
  totalAmount: 90000,
  date: new Date(2023, 5, 20),
  supplier: "Organic Rice Products Co.",
  notes: "Bulk purchase discount applied"
}];
// Add this to mockData.js (anywhere after the users array)

// Mock Dealers
export const dealers = [
  { 
    id: "1", 
    name: "John Smith", 
    email: "john@example.com", 
    phone: "+1 (234) 567-8901", 
    shopName: "John's Rice Shop", 
    address: "456 Dealer Avenue, Rice Town, 23456",
    isAuthorized: true,
    joinDate: new Date(2021, 3, 10)
  },
  { 
    id: "2", 
    name: "Sarah Johnson", 
    email: "sarah@example.com", 
    phone: "+1 (345) 678-9012", 
    shopName: "Sarah's Rice Emporium", 
    address: "789 Grain Road, Rice Village, 34567",
    isAuthorized: false,
    joinDate: new Date(2021, 5, 22)
  },
  { 
    id: "3", 
    name: "Michael Brown", 
    email: "michael@example.com", 
    phone: "+1 (456) 789-0123", 
    shopName: "Brown Rice Distributors", 
    address: "321 Rice Street, Grain City, 45678",
    isAuthorized: false,
    joinDate: new Date(2022, 1, 15)
  },
  { 
    id: "4", 
    name: "Emma Wilson", 
    email: "emma@example.com", 
    phone: "+1 (567) 890-1234", 
    shopName: "Wilson Rice Supply", 
    address: "654 Supplier Road, Mill Town, 56789",
    isAuthorized: false,
    joinDate: new Date(2022, 3, 20)
  }
];
// Helper function to get status badge color
export const getStatusBadgeColor = status => {
  switch (status.toLowerCase()) {
    case 'processing':
      return 'bg-blue-100 text-blue-800';
    case 'in-transit':
      return 'bg-yellow-100 text-yellow-800';
    case 'delivered':
      return 'bg-green-100 text-green-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    case 'scheduled':
      return 'bg-purple-100 text-purple-8900';
    case 'outstanding':
      return 'bg-orange-100 text-orange-800';
    case 'overdue':
      return 'bg-red-100 text-red-800';
    case 'paid':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};
// Helper function to format currency
export const formatCurrency = amount => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
};
// Helper function to format date
export const formatDate = date => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};