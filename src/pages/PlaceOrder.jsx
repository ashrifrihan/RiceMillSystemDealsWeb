import React, { useState, useEffect } from 'react';
import {
  ShoppingCartIcon,
  PlusIcon,
  MinusIcon,
  XIcon,
  SearchIcon,
  FilterIcon,
  CheckIcon,
  AlertCircleIcon,
  TruckIcon,
  CreditCardIcon,
  MapPinIcon,
  BuildingIcon,
  StarIcon,
  PackageIcon,
  EyeIcon,
  HeartIcon,
  ShoppingBag,
  CreditCard,
  DollarSignIcon,
  WalletIcon,
  ArrowRightIcon,
  ChevronRightIcon,
  UserIcon,
  CheckCircleIcon,
  ClockIcon,
  ShieldIcon,
  UploadIcon,
  FileTextIcon,
  AlertTriangleIcon,
  BanknoteIcon
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';

const MIN_ORDER_QUANTITY = 100;

// Dealer data without offers
const dealerData = {
  name: "John Dealer",
  creditLimit: 1000000,
  creditUsed: 250000,
  creditRemaining: 750000,
  nextDueDate: "2024-12-15",
  trustLevel: "Trusted",
  paymentMethods: ['pay-now', 'pay-later']
};

// Product data without offers
const mockProducts = [
  {
    id: 'p1',
    name: 'Premium Basmati Rice',
    type: 'Basmati Rice',
    category: 'Premium',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&auto=format&fit=crop',
    pricePerKg: 350,
    minOrder: 100,
    stock: 'Available',
    stockQuantity: 2500,
    riceMill: 'Haris Rice Mills',
    location: 'Colombo',
    deliveryAvailable: true,
    payLaterEligible: true,
    trackingSupported: true,
    trustBadge: true,
    rating: 4.8,
    reviews: 128,
    description: 'Premium quality basmati rice with long grains and aromatic flavor. Perfect for special occasions and restaurants.',
    features: ['Aromatic', 'Long Grain', 'Non-sticky'],
    deliveryTime: '2-3 days',
    packaging: '25kg bags'
  },
  {
    id: 'p2',
    name: 'Samba Rice',
    type: 'Samba Rice',
    category: 'Traditional',
    image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=800&auto=format&fit=crop',
    pricePerKg: 180,
    minOrder: 100,
    stock: 'Available',
    stockQuantity: 1800,
    riceMill: 'Lanka Rice Corporation',
    location: 'Kandy',
    deliveryAvailable: true,
    payLaterEligible: false,
    trackingSupported: true,
    trustBadge: true,
    rating: 4.5,
    reviews: 95,
    description: 'Traditional Samba rice known for its excellent cooking quality and taste.',
    features: ['Traditional', 'Medium Grain', 'Easy to Cook'],
    deliveryTime: '1-2 days',
    packaging: '50kg bags'
  },
  {
    id: 'p3',
    name: 'Red Rice',
    type: 'Red Rice',
    category: 'Health',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop',
    pricePerKg: 220,
    minOrder: 100,
    stock: 'Low',
    stockQuantity: 150,
    riceMill: 'Healthy Grains Ltd',
    location: 'Galle',
    deliveryAvailable: true,
    payLaterEligible: true,
    trackingSupported: false,
    trustBadge: false,
    rating: 4.3,
    reviews: 67,
    description: 'Organic red rice packed with nutrients and fiber. Perfect for health-conscious consumers.',
    features: ['Organic', 'High Fiber', 'Nutritious'],
    deliveryTime: '3-4 days',
    packaging: '10kg bags'
  },
  {
    id: 'p4',
    name: 'White Rice',
    type: 'White Rice',
    category: 'Regular',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop',
    pricePerKg: 120,
    minOrder: 100,
    stock: 'Available',
    stockQuantity: 5000,
    riceMill: 'National Rice Mills',
    location: 'Colombo',
    deliveryAvailable: true,
    payLaterEligible: true,
    trackingSupported: true,
    trustBadge: true,
    rating: 4.2,
    reviews: 210,
    description: 'Standard white rice suitable for daily consumption.',
    features: ['Standard', 'White Grain', 'Economical'],
    deliveryTime: '1 day',
    packaging: '50kg bags'
  },
  {
    id: 'p5',
    name: 'Brown Rice',
    type: 'Brown Rice',
    category: 'Health',
    image: 'https://images.unsplash.com/photo-1592921877370-7b54c4a8b4c8?w=800&auto=format&fit=crop',
    pricePerKg: 280,
    minOrder: 100,
    stock: 'Available',
    stockQuantity: 800,
    riceMill: 'Organic Farms Co.',
    location: 'Matara',
    deliveryAvailable: true,
    payLaterEligible: true,
    trackingSupported: true,
    trustBadge: true,
    rating: 4.7,
    reviews: 89,
    description: 'Whole grain brown rice with all nutrients intact. Rich in fiber and vitamins.',
    features: ['Whole Grain', 'High Fiber', 'Vitamin Rich'],
    deliveryTime: '2-3 days',
    packaging: '25kg bags'
  },
  {
    id: 'p6',
    name: 'Jasmine Rice',
    type: 'Jasmine Rice',
    category: 'Premium',
    image: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=800&auto=format&fit=crop',
    pricePerKg: 320,
    minOrder: 100,
    stock: 'Out of Stock',
    stockQuantity: 0,
    riceMill: 'Asian Rice Imports',
    location: 'Colombo',
    deliveryAvailable: false,
    payLaterEligible: false,
    trackingSupported: false,
    trustBadge: true,
    rating: 4.9,
    reviews: 156,
    description: 'Fragrant jasmine rice imported from Thailand. Known for its delicate aroma.',
    features: ['Fragrant', 'Soft Texture', 'Premium'],
    deliveryTime: 'N/A',
    packaging: '25kg bags'
  }
];

const PlaceOrder = () => {
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(MIN_ORDER_QUANTITY);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStock, setFilterStock] = useState('all');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [showBankStatementModal, setShowBankStatementModal] = useState(false);
  const [creditPending, setCreditPending] = useState(false);
  const [bankStatement, setBankStatement] = useState({
    bankName: '',
    accountNumber: '',
    accountHolder: '',
    statementFile: null,
    statementFileName: '',
    uploaded: false
  });
  
  // Online payment state
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardType, setCardType] = useState('');

  // Simple calculations without offers
  const cartSubtotal = cart.reduce((total, item) => total + (item.quantity * item.pricePerKg), 0);
  const cartTotalKg = cart.reduce((total, item) => total + item.quantity, 0);
  const deliveryCost = cartTotalKg > 1000 ? 0 : 15000;
  const grandTotal = cartSubtotal + deliveryCost;

  // Filter products
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.riceMill.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterStock === 'available') return matchesSearch && product.stock === 'Available';
    if (filterStock === 'low') return matchesSearch && product.stock === 'Low';
    if (filterStock === 'out') return matchesSearch && product.stock === 'Out of Stock';
    return matchesSearch;
  });

  // Detect card type from number
  const detectCardType = (number) => {
    const cleaned = number.replace(/\D/g, '');
    
    if (/^4/.test(cleaned)) {
      return 'Visa';
    } else if (/^5[1-5]/.test(cleaned)) {
      return 'MasterCard';
    } else if (/^3[47]/.test(cleaned)) {
      return 'American Express';
    } else if (/^6(?:011|5)/.test(cleaned)) {
      return 'Discover';
    }
    return '';
  };

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\D/g, '');
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ') : cleaned;
  };

  // Handle card number input
  const handleCardNumberChange = (e) => {
    const value = e.target.value;
    const formatted = formatCardNumber(value);
    setCardNumber(formatted);
    
    // Detect card type
    const detectedType = detectCardType(value);
    setCardType(detectedType);
  };

  // Handle expiry date input
  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    setExpiryDate(value);
  };

  // Handle CVV input
  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setCvv(value);
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setQuantity(product.minOrder);
    setShowProductModal(true);
  };

  const handleViewDetails = (product) => {
    setProductDetails(product);
  };

  const handleAddToCart = () => {
    if (quantity < MIN_ORDER_QUANTITY) {
      alert(`Minimum order quantity is ${MIN_ORDER_QUANTITY}KG`);
      return;
    }

    const itemTotal = quantity * selectedProduct.pricePerKg;
    const cartItem = {
      id: selectedProduct.id,
      name: selectedProduct.name,
      type: selectedProduct.type,
      riceMill: selectedProduct.riceMill,
      quantity: quantity,
      pricePerKg: selectedProduct.pricePerKg,
      total: itemTotal,
      image: selectedProduct.image
    };

    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item.id === cartItem.id);
      if (existingItemIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        updatedCart[existingItemIndex].total += itemTotal;
        return updatedCart;
      }
      return [...prevCart, cartItem];
    });

    setShowProductModal(false);
    setShowCart(true);
  };

  const handleRemoveFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < MIN_ORDER_QUANTITY) {
      alert(`Minimum order quantity is ${MIN_ORDER_QUANTITY}KG`);
      return;
    }

    setCart(prevCart => 
      prevCart.map(item => {
        if (item.id === productId) {
          const updatedTotal = newQuantity * item.pricePerKg;
          return { ...item, quantity: newQuantity, total: updatedTotal };
        }
        return item;
      })
    );
  };

  const handleProceedToPayment = () => {
    setShowPaymentOptions(true);
  };

  // Validate card details
  const validateCardDetails = () => {
    if (!cardNumber || cardNumber.replace(/\D/g, '').length < 16) {
      alert('Please enter a valid 16-digit card number');
      return false;
    }
    
    if (!cardHolder.trim()) {
      alert('Please enter card holder name');
      return false;
    }
    
    if (!expiryDate || !/^\d{2}\/\d{2}$/.test(expiryDate)) {
      alert('Please enter valid expiry date (MM/YY)');
      return false;
    }
    
    if (!cvv || cvv.length < 3) {
      alert('Please enter valid CVV');
      return false;
    }
    
    return true;
  };

  // Handle bank statement file upload
  const handleBankStatementUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('File size should be less than 5MB');
        return;
      }
      
      if (!['application/pdf', 'image/jpeg', 'image/png'].includes(file.type)) {
        alert('Please upload PDF, JPG, or PNG files only');
        return;
      }
      
      setBankStatement(prev => ({
        ...prev,
        statementFile: file,
        statementFileName: file.name,
        uploaded: true
      }));
    }
  };

  // Submit bank statement for credit approval
  const handleSubmitBankStatement = () => {
    if (!bankStatement.bankName || !bankStatement.accountNumber || !bankStatement.accountHolder) {
      alert('Please fill all bank details');
      return;
    }
    
    if (!bankStatement.statementFile) {
      alert('Please upload your bank statement');
      return;
    }
    
    // Simulate API call
    setCreditPending(true);
    
    // Simulate processing delay
    setTimeout(() => {
      // In real app, this would be an API call to submit for approval
      const orderId = `ORD-${Date.now().toString().slice(-8)}`;
      const order = {
        id: orderId,
        date: new Date().toISOString(),
        items: [...cart],
        paymentMethod: 'pay-later',
        paymentDetails: {
          status: 'pending-approval',
          bankName: bankStatement.bankName,
          accountNumber: bankStatement.accountNumber.slice(-4),
          submittedAt: new Date().toISOString(),
          requiresApproval: true
        },
        totalAmount: grandTotal,
        status: 'pending-approval',
        riceMill: cart[0]?.riceMill || 'Multiple Mills',
        estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
      };

      setOrderDetails(order);
      setOrderPlaced(true);
      setShowBankStatementModal(false);
      setShowPaymentOptions(false);
      setCreditPending(false);
      
      // Reset bank statement
      setBankStatement({
        bankName: '',
        accountNumber: '',
        accountHolder: '',
        statementFile: null,
        statementFileName: '',
        uploaded: false
      });
    }, 2000);
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }

    if (paymentMethod === 'online' && !validateCardDetails()) {
      return;
    }

    if (paymentMethod === 'pay-later') {
      if (dealerData.trustLevel !== 'Trusted') {
        alert('Pay Later option is only available for trusted dealers');
        return;
      }

      if (grandTotal > dealerData.creditRemaining) {
        alert('Order amount exceeds your available credit limit');
        return;
      }

      // Show bank statement modal for credit approval
      setShowBankStatementModal(true);
      return;
    }

    // Online payment flow
    const orderId = `ORD-${Date.now().toString().slice(-8)}`;
    const order = {
      id: orderId,
      date: new Date().toISOString(),
      items: [...cart],
      paymentMethod: paymentMethod,
      paymentDetails: paymentMethod === 'online' ? {
        cardType: cardType,
        lastFour: cardNumber.replace(/\D/g, '').slice(-4),
        amount: grandTotal,
        status: 'completed'
      } : null,
      totalAmount: grandTotal,
      status: paymentMethod === 'online' ? 'processing' : 'pending',
      riceMill: cart[0]?.riceMill || 'Multiple Mills',
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
    };

    setOrderDetails(order);
    setOrderPlaced(true);
    setShowPaymentOptions(false);
    
    // Reset payment form
    if (paymentMethod === 'online') {
      setCardNumber('');
      setCardHolder('');
      setExpiryDate('');
      setCvv('');
      setCardType('');
    }
  };

  const formatCurrency = (amount) => {
    return `Rs. ${amount.toLocaleString('en-US')}`;
  };

  // Product Card Design
  const renderProductCard = (product) => (
    <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 border border-gray-200 rounded-2xl overflow-hidden bg-white">
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Stock Badge */}
        <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${
          product.stock === 'Available' ? 'bg-green-100 text-green-800' :
          product.stock === 'Low' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {product.stock}
        </div>
        
        {/* Quick View Button */}
        <button 
          onClick={() => handleViewDetails(product)}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-md opacity-0 group-hover:opacity-100"
          title="Quick View"
        >
          <EyeIcon className="w-4 h-4 text-gray-700" />
        </button>
      </div>

      {/* Product Content */}
      <div className="p-4">
        {/* Title and Rating */}
        <div className="mb-2">
          <h3 className="font-bold text-gray-900 text-base leading-tight line-clamp-1">{product.name}</h3>
          <div className="flex items-center gap-1 mt-1">
            <StarIcon className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-600">{product.rating} • {product.reviews} reviews</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 mb-3 line-clamp-2 h-10">
          {product.description}
        </p>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold text-green-600 text-lg">{formatCurrency(product.pricePerKg)}</p>
            <p className="text-xs text-gray-400">per kg</p>
          </div>
          
          <Button
            variant={product.stock === 'Out of Stock' ? 'outline' : 'primary'}
            disabled={product.stock === 'Out of Stock'}
            onClick={() => handleSelectProduct(product)}
            className="rounded-lg px-4 py-2 text-sm"
          >
            {product.stock === 'Out of Stock' ? 'Out of Stock' : 'Add'}
          </Button>
        </div>

        {/* Additional Info */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <BuildingIcon className="w-3 h-3" />
              <span>{product.riceMill}</span>
            </div>
            <div className="flex items-center gap-1">
              <TruckIcon className="w-3 h-3" />
              <span>{product.deliveryTime}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  // Cart Summary
  const renderCartSummary = () => (
    <div className={`lg:sticky lg:top-6 transition-all duration-300 ${showCart ? 'block' : 'hidden lg:block'}`}>
      <Card className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
        <div className="p-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <ShoppingCartIcon className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900">Your Order</h2>
                <p className="text-sm text-gray-500">{cart.length} items</p>
              </div>
            </div>
            <div className="lg:hidden">
              <button
                onClick={() => setShowCart(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <XIcon className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Cart Items */}
          {cart.length === 0 ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <PackageIcon className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-gray-500 font-medium">Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="space-y-3 mb-5 max-h-72 overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div key={item.id} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex gap-3">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-14 h-14 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 text-sm truncate">{item.name}</h4>
                            <p className="text-xs text-gray-500">{item.type}</p>
                          </div>
                          <button
                            onClick={() => handleRemoveFromCart(item.id)}
                            className="p-1 hover:bg-red-50 rounded text-red-400"
                          >
                            <XIcon className="w-3 h-3" />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 bg-white rounded px-2 py-1 border">
                              <button
                                onClick={() => handleUpdateQuantity(item.id, item.quantity - 100)}
                                disabled={item.quantity <= MIN_ORDER_QUANTITY}
                                className="p-0.5 hover:bg-gray-100 rounded disabled:opacity-30"
                              >
                                <MinusIcon className="w-3 h-3" />
                              </button>
                              <span className="font-medium text-sm w-10 text-center">{item.quantity}kg</span>
                              <button
                                onClick={() => handleUpdateQuantity(item.id, item.quantity + 100)}
                                className="p-0.5 hover:bg-gray-100 rounded"
                              >
                                <PlusIcon className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-900 text-sm">{formatCurrency(item.total)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Totals */}
              <div className="space-y-2 mb-5">
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-600 text-sm">Subtotal</span>
                  <span className="font-medium text-gray-900">{formatCurrency(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-600 text-sm">Delivery</span>
                  <span className={`font-medium ${deliveryCost === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                    {deliveryCost === 0 ? 'FREE' : formatCurrency(deliveryCost)}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900">Total</span>
                    <div className="text-right">
                      <p className="font-bold text-xl text-green-600">{formatCurrency(grandTotal)}</p>
                      <p className="text-xs text-gray-500">{cartTotalKg} kg total</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Proceed to Payment Button */}
              <Button
                fullWidth
                onClick={handleProceedToPayment}
                disabled={cart.length === 0}
                className="rounded-lg py-3 bg-green-600 hover:bg-green-700 border-0"
              >
                <span className="flex items-center justify-center">
                  Proceed to Payment
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </span>
              </Button>
            </>
          )}
        </div>
      </Card>
    </div>
  );

  // Bank Statement Modal for Credit Approval
  const BankStatementModal = () => (
    <Modal
      isOpen={showBankStatementModal}
      onClose={() => !creditPending && setShowBankStatementModal(false)}
      title="Submit Bank Statement for Credit Approval"
      size="lg"
    >
      <div className="space-y-6">
        {/* Info Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertCircleIcon className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-blue-800 mb-1">Credit Payment Requires Approval</h4>
              <p className="text-sm text-blue-700">
                Your order will be placed in pending status. The rice mill owner will review your 
                bank statement and credit history before approving the payment. This process may 
                take 24-48 hours.
              </p>
            </div>
          </div>
        </div>

        {/* Bank Details Form */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bank Name
              </label>
              <input
                type="text"
                value={bankStatement.bankName}
                onChange={(e) => setBankStatement(prev => ({ ...prev, bankName: e.target.value }))}
                placeholder="e.g., Commercial Bank"
                disabled={creditPending}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Account Number
              </label>
              <input
                type="text"
                value={bankStatement.accountNumber}
                onChange={(e) => setBankStatement(prev => ({ ...prev, accountNumber: e.target.value }))}
                placeholder="1234567890"
                disabled={creditPending}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Account Holder Name
            </label>
            <input
              type="text"
              value={bankStatement.accountHolder}
              onChange={(e) => setBankStatement(prev => ({ ...prev, accountHolder: e.target.value }))}
              placeholder="As per bank records"
              disabled={creditPending}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100"
            />
          </div>

          {/* Bank Statement Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Bank Statement (Last 3 months)
            </label>
            <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
              bankStatement.uploaded 
                ? 'border-green-300 bg-green-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}>
              <input
                type="file"
                id="bankStatement"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleBankStatementUpload}
                disabled={creditPending}
                className="hidden"
              />
              
              {bankStatement.uploaded ? (
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckIcon className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="font-medium text-green-700">File Uploaded Successfully</p>
                  <p className="text-sm text-gray-600">{bankStatement.statementFileName}</p>
                  <button
                    onClick={() => setBankStatement(prev => ({ ...prev, uploaded: false, statementFile: null, statementFileName: '' }))}
                    disabled={creditPending}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Remove file
                  </button>
                </div>
              ) : (
                <label htmlFor="bankStatement" className="cursor-pointer">
                  <div className="space-y-2">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                      <UploadIcon className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="font-medium text-gray-700">Click to upload bank statement</p>
                    <p className="text-sm text-gray-500">PDF, JPG, or PNG up to 5MB</p>
                  </div>
                </label>
              )}
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                className="mt-1"
                disabled={creditPending}
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree that my order will be placed on hold until the rice mill owner 
                reviews and approves my bank statement. I understand that this may delay 
                my order processing by 24-48 hours.
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              fullWidth
              onClick={handleSubmitBankStatement}
              disabled={creditPending || !bankStatement.uploaded || !bankStatement.bankName || !bankStatement.accountNumber || !bankStatement.accountHolder}
              className="rounded-lg py-3 bg-blue-600 hover:bg-blue-700 border-0 disabled:bg-blue-300"
            >
              {creditPending ? (
                <span className="flex items-center justify-center">
                  <ClockIcon className="w-4 h-4 mr-2 animate-spin" />
                  Submitting for Approval...
                </span>
              ) : (
                `Submit for Approval - ${formatCurrency(grandTotal)}`
              )}
            </Button>
            
            {!creditPending && (
              <button
                onClick={() => setShowBankStatementModal(false)}
                className="w-full mt-2 text-center text-sm text-gray-600 hover:text-gray-800"
              >
                Cancel and choose different payment
              </button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );

  // Payment Options Modal - UPDATED WITH ONLINE PAYMENT
  const PaymentOptionsModal = () => (
    <Modal
      isOpen={showPaymentOptions}
      onClose={() => setShowPaymentOptions(false)}
      title="Select Payment Method"
      size="md"
    >
      <div className="space-y-4">
        {/* Online Payment Option */}
        <div 
          className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
            paymentMethod === 'online' 
              ? 'border-green-500 bg-green-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => setPaymentMethod('online')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${
                paymentMethod === 'online' 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-gray-100 text-gray-500'
              }`}>
                <CreditCardIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Online Payment</h3>
                <p className="text-sm text-gray-600">Pay securely with your card</p>
              </div>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              paymentMethod === 'online' 
                ? 'border-green-500 bg-green-500' 
                : 'border-gray-300'
            }`}>
              {paymentMethod === 'online' && (
                <div className="w-2 h-2 rounded-full bg-white" />
              )}
            </div>
          </div>
        </div>

        {/* Pay Later Option */}
        <div 
          className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
            paymentMethod === 'pay-later' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:border-gray-300'
          } ${dealerData.trustLevel !== 'Trusted' ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => dealerData.trustLevel === 'Trusted' && setPaymentMethod('pay-later')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${
                paymentMethod === 'pay-later' 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'bg-gray-100 text-gray-500'
              }`}>
                <WalletIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-gray-900">Pay Later (Credit)</h3>
                  {dealerData.trustLevel === 'Trusted' ? (
                    <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs font-bold">
                      Available
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 bg-red-100 text-red-800 rounded-full text-xs font-bold">
                      Not Eligible
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">Submit bank statement for approval</p>
              </div>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              paymentMethod === 'pay-later' 
                ? 'border-blue-500 bg-blue-500' 
                : 'border-gray-300'
            }`}>
              {paymentMethod === 'pay-later' && (
                <div className="w-2 h-2 rounded-full bg-white" />
              )}
            </div>
          </div>
          
          {dealerData.trustLevel === 'Trusted' && (
            <div className="mt-3 bg-white rounded-lg p-3 border">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-500">Credit Limit</p>
                  <p className="font-bold">{formatCurrency(dealerData.creditLimit)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Available</p>
                  <p className="font-bold text-green-600">{formatCurrency(dealerData.creditRemaining)}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Card Details Form (shown when Online Payment is selected) */}
        {paymentMethod === 'online' && (
          <div className="border rounded-xl p-4 mt-4 bg-white">
            <h4 className="font-bold text-gray-900 mb-4">Enter Card Details</h4>
            
            <div className="space-y-3">
              {/* Card Number with Type Detection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  {cardType && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-xs font-medium">
                        {cardType === 'Visa' && (
                          <span className="text-blue-600">VISA</span>
                        )}
                        {cardType === 'MasterCard' && (
                          <span className="text-red-600">MasterCard</span>
                        )}
                        {cardType === 'American Express' && (
                          <span className="text-blue-500">Amex</span>
                        )}
                        {cardType === 'Discover' && (
                          <span className="text-orange-600">Discover</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Holder Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Holder Name
                </label>
                <input
                  type="text"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Expiry and CVV */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={handleExpiryDateChange}
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVV
                  </label>
                  <input
                    type="text"
                    value={cvv}
                    onChange={handleCvvChange}
                    placeholder="123"
                    maxLength={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Security Notice */}
              <div className="flex items-start gap-2 p-2 bg-gray-50 rounded-lg">
                <ShieldIcon className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-gray-600">
                  Your payment is secure and encrypted. We never store your card details.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Place Order Button */}
        <div className="pt-4 border-t">
          <Button
            fullWidth
            onClick={handlePlaceOrder}
            disabled={cart.length === 0 || (paymentMethod === 'pay-later' && dealerData.trustLevel !== 'Trusted')}
            className="rounded-lg py-3 bg-green-600 hover:bg-green-700 border-0"
          >
            {paymentMethod === 'online' ? 'Pay Now' : 'Submit for Approval'} - {formatCurrency(grandTotal)}
          </Button>
        </div>
      </div>
    </Modal>
  );

  // Product Details Modal
  const ProductDetailsModal = () => (
    <Modal
      isOpen={!!productDetails}
      onClose={() => setProductDetails(null)}
      title="Product Details"
      size="lg"
    >
      {productDetails && (
        <div className="space-y-6">
          {/* Mobile Layout */}
          <div className="lg:hidden">
            {/* Image Section */}
            <div className="relative h-56 bg-gray-100 mb-4 rounded-lg overflow-hidden">
              <img 
                src={productDetails.image} 
                alt={productDetails.name}
                className="w-full h-full object-cover"
              />
              {/* Stock Badge */}
              <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${
                productDetails.stock === 'Available' ? 'bg-green-100 text-green-800' :
                productDetails.stock === 'Low' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {productDetails.stock}
              </div>
            </div>

            {/* Product Info */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{productDetails.name}</h2>
              
              <div className="flex items-center gap-2 mb-3">
                <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-gray-600">{productDetails.rating} • {productDetails.reviews} reviews</span>
              </div>

              <p className="text-gray-600 mb-4">{productDetails.description}</p>

              {/* Price Display */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-green-700">{formatCurrency(productDetails.pricePerKg)}</p>
                    <p className="text-sm text-gray-500">per kg</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Minimum Order</p>
                    <p className="font-bold">{productDetails.minOrder} kg</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Details Grid - Mobile */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Type</p>
                <p className="font-semibold">{productDetails.type}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Rice Mill</p>
                <p className="font-semibold">{productDetails.riceMill}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Location</p>
                <p className="font-semibold">{productDetails.location}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Delivery</p>
                <p className="font-semibold">{productDetails.deliveryTime}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Packaging</p>
                <p className="font-semibold">{productDetails.packaging}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Stock</p>
                <p className="font-semibold">{productDetails.stockQuantity} kg available</p>
              </div>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-900 mb-3">Features</h3>
              <div className="flex flex-wrap gap-2">
                {productDetails.features.map((feature, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart - Mobile */}
            <div className="border-t pt-6">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-gray-700">Quantity (kg)</span>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
                      <button
                        onClick={() => setQuantity(Math.max(MIN_ORDER_QUANTITY, quantity - 100))}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <MinusIcon className="w-4 h-4" />
                      </button>
                      <span className="font-medium w-12 text-center">{quantity} kg</span>
                      <button
                        onClick={() => setQuantity(quantity + 100)}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <PlusIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-700">Total Price</span>
                    <span className="font-bold text-xl text-green-700">{formatCurrency(quantity * productDetails.pricePerKg)}</span>
                  </div>
                  
                  <Button
                    fullWidth
                    onClick={() => {
                      const cartItem = {
                        id: productDetails.id,
                        name: productDetails.name,
                        type: productDetails.type,
                        riceMill: productDetails.riceMill,
                        quantity: quantity,
                        pricePerKg: productDetails.pricePerKg,
                        total: quantity * productDetails.pricePerKg,
                        image: productDetails.image
                      };
                      
                      setCart(prev => {
                        const existing = prev.find(item => item.id === cartItem.id);
                        if (existing) {
                          return prev.map(item =>
                            item.id === cartItem.id
                              ? { ...item, quantity: item.quantity + quantity, total: item.total + cartItem.total }
                              : item
                          );
                        }
                        return [...prev, cartItem];
                      });
                      setProductDetails(null);
                      setShowCart(true);
                    }}
                    disabled={productDetails.stock === 'Out of Stock'}
                    className="rounded-lg py-3 bg-green-600 hover:bg-green-700 border-0 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    {productDetails.stock === 'Out of Stock' ? 'Out of Stock' : `Add to Cart - ${formatCurrency(quantity * productDetails.pricePerKg)}`}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:flex lg:gap-6">
            <div className="flex-1">
              <div className="relative h-64 rounded-xl overflow-hidden mb-4">
                <img 
                  src={productDetails.image} 
                  alt={productDetails.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{productDetails.name}</h2>
              <p className="text-gray-600 mb-4">{productDetails.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Type</p>
                  <p className="font-semibold">{productDetails.type}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Packaging</p>
                  <p className="font-semibold">{productDetails.packaging}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Rice Mill</p>
                  <p className="font-semibold">{productDetails.riceMill}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Location</p>
                  <p className="font-semibold">{productDetails.location}</p>
                </div>
              </div>
            </div>
            
            <div className="w-80 space-y-6">
              {/* Price Box */}
              <div className="bg-gray-50 border rounded-xl p-5">
                <div className="mb-4">
                  <p className="text-3xl font-bold text-green-700">{formatCurrency(productDetails.pricePerKg)}</p>
                  <p className="text-gray-600">per kg</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Quantity (kg)</span>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border">
                        <button
                          onClick={() => setQuantity(Math.max(MIN_ORDER_QUANTITY, quantity - 100))}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <MinusIcon className="w-4 h-4" />
                        </button>
                        <span className="font-medium w-16 text-center">{quantity}</span>
                        <button
                          onClick={() => setQuantity(quantity + 100)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <PlusIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex justify-between mb-2">
                      <span>Total Price</span>
                      <span className="font-bold text-lg">{formatCurrency(quantity * productDetails.pricePerKg)}</span>
                    </div>
                    <Button
                      fullWidth
                      onClick={() => {
                        const cartItem = {
                          id: productDetails.id,
                          name: productDetails.name,
                          type: productDetails.type,
                          riceMill: productDetails.riceMill,
                          quantity: quantity,
                          pricePerKg: productDetails.pricePerKg,
                          total: quantity * productDetails.pricePerKg,
                          image: productDetails.image
                        };
                        
                        setCart(prev => {
                          const existing = prev.find(item => item.id === cartItem.id);
                          if (existing) {
                            return prev.map(item =>
                              item.id === cartItem.id
                                ? { ...item, quantity: item.quantity + quantity, total: item.total + cartItem.total }
                                : item
                            );
                          }
                          return [...prev, cartItem];
                        });
                        setProductDetails(null);
                        setShowCart(true);
                      }}
                      className="rounded-lg py-3 bg-green-600 hover:bg-green-700 border-0"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Cart Toggle */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setShowCart(true)}
          className="p-4 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700"
        >
          <div className="relative">
            <ShoppingCartIcon className="w-6 h-6" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </div>
        </button>
      </div>

      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <ShoppingCartIcon className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Place Order</h1>
                  <p className="text-gray-600">Browse and order rice products</p>
                </div>
              </div>
              
              {/* Dealer Info */}
              <div className="flex flex-wrap gap-3 mt-4">
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                  <UserIcon className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium">{dealerData.name}</span>
                </div>
                
                {dealerData.trustLevel === 'Trusted' && (
                  <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg">
                    <CreditCardIcon className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-700">
                      Credit: {formatCurrency(dealerData.creditRemaining)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {orderPlaced ? (
          // Order Confirmation
          <Card className="max-w-2xl mx-auto border rounded-2xl overflow-hidden">
            <div className="p-6 text-center">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                orderDetails.paymentMethod === 'pay-later' ? 'bg-blue-100' : 'bg-green-100'
              }`}>
                {orderDetails.paymentMethod === 'pay-later' ? (
                  <ClockIcon className="w-10 h-10 text-blue-600" />
                ) : (
                  <CheckCircleIcon className="w-10 h-10 text-green-600" />
                )}
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                {orderDetails.paymentMethod === 'pay-later' ? 'Submitted for Approval!' : 'Order Confirmed!'}
              </h2>
              <p className="text-gray-600 mb-6">
                {orderDetails.paymentMethod === 'pay-later' 
                  ? 'Your order has been submitted for credit approval'
                  : 'Your order has been placed successfully'}
              </p>
              
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Order ID</p>
                    <p className="font-bold text-gray-900">{orderDetails.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Payment Method</p>
                    <p className={`font-bold ${
                      orderDetails.paymentMethod === 'online' ? 'text-green-600' : 'text-blue-600'
                    } capitalize`}>
                      {orderDetails.paymentMethod === 'online' 
                        ? `Online (${orderDetails.paymentDetails.cardType})` 
                        : 'Credit - Pending Approval'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                    <p className="font-bold text-gray-900">{formatCurrency(orderDetails.totalAmount)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Status</p>
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm ${
                      orderDetails.paymentMethod === 'pay-later' 
                        ? 'bg-blue-100 text-blue-800' 
                        : orderDetails.status === 'processing'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {orderDetails.paymentMethod === 'pay-later' ? (
                        <>
                          <ClockIcon className="w-3 h-3" />
                          <span className="font-bold">Pending Approval</span>
                        </>
                      ) : orderDetails.status === 'processing' ? (
                        <>
                          <ClockIcon className="w-3 h-3" />
                          <span className="font-bold">Processing</span>
                        </>
                      ) : (
                        <>
                          <CheckIcon className="w-3 h-3" />
                          <span className="font-bold">Confirmed</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                {orderDetails.paymentMethod === 'pay-later' && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-start gap-2">
                      <AlertCircleIcon className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-blue-700">
                        Your order is pending rice mill owner approval. Please wait 24-48 hours for 
                        approval confirmation. You will be notified once approved.
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  variant="outline"
                  onClick={() => {
                    setOrderPlaced(false);
                    setCart([]);
                  }}
                  className="rounded-lg px-6"
                >
                  Place Another Order
                </Button>
                <Button
                  className="rounded-lg px-6 bg-green-600 hover:bg-green-700"
                >
                  {orderDetails.paymentMethod === 'pay-later' ? 'Check Approval Status' : 'Track Order'}
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <div className="lg:flex lg:gap-6">
            {/* Left Column - Product Grid */}
            <div className="lg:flex-1">
              {/* Search and Filter */}
              <Card className="mb-6 border rounded-xl overflow-hidden">
                <div className="p-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                      <div className="relative">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search products..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    
                    <div className="relative">
                      <FilterIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <select
                        value={filterStock}
                        onChange={(e) => setFilterStock(e.target.value)}
                        className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="all">All Stock</option>
                        <option value="available">Available</option>
                        <option value="low">Low Stock</option>
                        <option value="out">Out of Stock</option>
                      </select>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Product Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map(renderProductCard)}
              </div>

              {filteredProducts.length === 0 && (
                <Card className="text-center py-12 border rounded-xl">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <PackageIcon className="w-8 h-8 text-gray-300" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">No Products Found</h3>
                  <p className="text-gray-500">
                    Try adjusting your search or filter
                  </p>
                </Card>
              )}
            </div>

            {/* Right Column - Cart */}
            <div className="lg:w-80">
              {renderCartSummary()}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Cart Panel */}
      {showCart && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowCart(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl max-h-[85vh] overflow-hidden">
            {renderCartSummary()}
          </div>
        </div>
      )}

      {/* Product Selection Modal */}
      <Modal
        isOpen={showProductModal}
        onClose={() => setShowProductModal(false)}
        title="Add to Order"
        size="sm"
      >
        {selectedProduct && (
          <div className="space-y-4">
            <div className="flex gap-3">
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-bold text-gray-900">{selectedProduct.name}</h3>
                <p className="text-gray-600 text-sm">{selectedProduct.type}</p>
                <p className="text-xl font-bold text-green-600 mt-1">{formatCurrency(selectedProduct.pricePerKg)}/kg</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Quantity (kg)</span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
                    <button
                      onClick={() => setQuantity(Math.max(MIN_ORDER_QUANTITY, quantity - 100))}
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      <MinusIcon className="w-4 h-4" />
                    </button>
                    <span className="font-medium w-12 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 100)}
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      <PlusIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex justify-between">
                  <span>Total Price</span>
                  <span className="font-bold">{formatCurrency(quantity * selectedProduct.pricePerKg)}</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                fullWidth
                onClick={handleAddToCart}
                className="rounded-lg py-2.5 bg-green-600 hover:bg-green-700 border-0"
              >
                Add to Cart
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowProductModal(false)}
                className="rounded-lg py-2.5"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Payment Options Modal */}
      <PaymentOptionsModal />

      {/* Bank Statement Modal */}
      <BankStatementModal />

      {/* Product Details Modal */}
      <ProductDetailsModal />
    </div>
  );
};

export default PlaceOrder;