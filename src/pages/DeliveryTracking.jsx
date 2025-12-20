import React, { useState, useEffect } from 'react';
import {
  TruckIcon,
  MapPinIcon,
  PhoneIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  PackageIcon,
  SearchIcon,
  FilterIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  ChevronRightIcon,
  DownloadIcon,
  MessageSquareIcon,
  AlertTriangleIcon,
  FileTextIcon,
  StarIcon,
  CreditCardIcon,
  RefreshCwIcon,
  PauseIcon,
  PlayIcon,
  MapIcon,
  GlobeIcon,
  NavigationIcon,
  ThermometerIcon,
  GaugeIcon,
  WifiIcon,
  EyeIcon,
  ChevronLeftIcon,
  MenuIcon,
  XIcon,
  InfoIcon,
  ClipboardListIcon,
  UsersIcon,
  PackageOpenIcon,
  TimerIcon,
  Navigation2Icon,
  MapPin
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

// Mock data for orders and tracking (same as before)
const dealerOrders = [
  {
    orderId: 'ORD-2023-001',
    products: [
      { name: 'Premium Basmati Rice', type: 'Basmati', quantity: 500, pricePerKg: 350, total: 175000 },
      { name: 'Samba Rice', type: 'Samba', quantity: 300, pricePerKg: 220, total: 66000 }
    ],
    totalKg: 800,
    totalAmount: 241000,
    paymentType: 'Credit',
    status: 'vehicle-assigned',
    riceMill: 'Haris Rice Mills',
    placedDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
    deliveryStatus: 'Vehicle Assigned',
    expectedDelivery: new Date(Date.now() + 6 * 60 * 60 * 1000),
    driver: {
      name: 'Ravi Perera',
      phone: '+94 77 123 4567',
      vehicleNumber: 'KA-1234',
      vehicleType: 'Truck (10-ton)',
      photo: 'https://via.placeholder.com/50',
      rating: 4.8,
      tripsCompleted: 234
    },
    timeline: [
      { step: 'Order Placed', time: new Date(Date.now() - 24 * 60 * 60 * 1000), completed: true },
      { step: 'Approved by Mill', time: new Date(Date.now() - 22 * 60 * 60 * 1000), completed: true },
      { step: 'Packing', time: new Date(Date.now() - 20 * 60 * 60 * 1000), completed: true },
      { step: 'Vehicle Assigned', time: new Date(Date.now() - 2 * 60 * 60 * 1000), completed: true },
      { step: 'Driver Started', time: null, completed: false },
      { step: 'Delivery in Progress', time: null, completed: false },
      { step: 'Delivered', time: null, completed: false }
    ],
    currentLocation: { lat: 7.480, lng: 80.360, address: 'Near Dambulla, on A6 highway' },
    destination: { lat: 7.290, lng: 80.640, address: '123 Dealer Street, Kandy' },
    estimatedReachingTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
    transportCost: 15000,
    isDelayed: false,
    trafficNotice: 'Light traffic on route',
    vehicleSpeed: 65,
    temperature: 22,
    etaUpdates: [],
    deliveryCompleted: null,
    deliveryNotes: 'Deliver to main warehouse gate'
  },
  {
    orderId: 'ORD-2023-002',
    products: [
      { name: 'Nadu Rice', type: 'Nadu', quantity: 1000, pricePerKg: 190, total: 190000 }
    ],
    totalKg: 1000,
    totalAmount: 190000,
    paymentType: 'Cash',
    status: 'on-the-way',
    riceMill: 'Premium Rice Co.',
    placedDate: new Date(Date.now() - 12 * 60 * 60 * 1000),
    deliveryStatus: 'On the Way',
    expectedDelivery: new Date(Date.now() + 2 * 60 * 60 * 1000),
    driver: {
      name: 'Kamal Silva',
      phone: '+94 71 234 5678',
      vehicleNumber: 'CP-5678',
      vehicleType: 'Truck (5-ton)',
      photo: 'https://via.placeholder.com/50',
      rating: 4.5,
      tripsCompleted: 189
    },
    timeline: [
      { step: 'Order Placed', time: new Date(Date.now() - 12 * 60 * 60 * 1000), completed: true },
      { step: 'Approved by Mill', time: new Date(Date.now() - 11 * 60 * 60 * 1000), completed: true },
      { step: 'Packing', time: new Date(Date.now() - 10 * 60 * 60 * 1000), completed: true },
      { step: 'Vehicle Assigned', time: new Date(Date.now() - 8 * 60 * 60 * 1000), completed: true },
      { step: 'Driver Started', time: new Date(Date.now() - 6 * 60 * 60 * 1000), completed: true },
      { step: 'Delivery in Progress', time: new Date(Date.now() - 4 * 60 * 60 * 1000), completed: true },
      { step: 'Delivered', time: null, completed: false }
    ],
    currentLocation: { lat: 7.250, lng: 80.600, address: 'Near Peradeniya, approaching Kandy' },
    destination: { lat: 7.295, lng: 80.635, address: '456 Business Avenue, Kandy' },
    estimatedReachingTime: new Date(Date.now() + 90 * 60 * 1000),
    transportCost: 12000,
    isDelayed: true,
    trafficNotice: 'Heavy traffic near Peradeniya junction',
    vehicleSpeed: 55,
    temperature: 28,
    etaUpdates: [
      { time: new Date(Date.now() - 30 * 60 * 1000), message: 'Traffic delay - adding 30 minutes' }
    ],
    deliveryCompleted: null,
    deliveryNotes: 'Call before arrival for gate access'
  },
  {
    orderId: 'ORD-2023-003',
    products: [
      { name: 'Jasmine Rice', type: 'Jasmine', quantity: 400, pricePerKg: 320, total: 128000 },
      { name: 'Brown Rice', type: 'Brown', quantity: 200, pricePerKg: 280, total: 56000 }
    ],
    totalKg: 600,
    totalAmount: 184000,
    paymentType: 'Cheque',
    status: 'delivered',
    riceMill: 'Golden Grains Mill',
    placedDate: new Date(Date.now() - 48 * 60 * 60 * 1000),
    deliveryStatus: 'Delivered',
    expectedDelivery: new Date(Date.now() - 24 * 60 * 60 * 1000),
    driver: {
      name: 'Saman Kumara',
      phone: '+94 76 345 6789',
      vehicleNumber: 'GA-9012',
      vehicleType: 'Van (3-ton)',
      photo: 'https://via.placeholder.com/50',
      rating: 4.9,
      tripsCompleted: 312
    },
    timeline: [
      { step: 'Order Placed', time: new Date(Date.now() - 48 * 60 * 60 * 1000), completed: true },
      { step: 'Approved by Mill', time: new Date(Date.now() - 46 * 60 * 60 * 1000), completed: true },
      { step: 'Packing', time: new Date(Date.now() - 44 * 60 * 60 * 1000), completed: true },
      { step: 'Vehicle Assigned', time: new Date(Date.now() - 40 * 60 * 60 * 1000), completed: true },
      { step: 'Driver Started', time: new Date(Date.now() - 38 * 60 * 60 * 1000), completed: true },
      { step: 'Delivery in Progress', time: new Date(Date.now() - 36 * 60 * 60 * 1000), completed: true },
      { step: 'Delivered', time: new Date(Date.now() - 24 * 60 * 60 * 1000), completed: true }
    ],
    currentLocation: null,
    destination: { lat: 6.927, lng: 79.861, address: '789 Colombo Street, Colombo 10' },
    estimatedReachingTime: null,
    transportCost: 10000,
    isDelayed: false,
    trafficNotice: null,
    vehicleSpeed: 0,
    temperature: null,
    etaUpdates: [],
    deliveryCompleted: new Date(Date.now() - 24 * 60 * 60 * 1000),
    deliveryNotes: 'Signed by warehouse manager',
    deliveryRating: 4.5,
    deliveryFeedback: 'On-time delivery, professional service'
  },
  {
    orderId: 'ORD-2023-004',
    products: [
      { name: 'Raw Paddy', type: 'Paddy', quantity: 1500, pricePerKg: 85, total: 127500 }
    ],
    totalKg: 1500,
    totalAmount: 127500,
    paymentType: 'Credit',
    status: 'packing',
    riceMill: 'Haris Rice Mills',
    placedDate: new Date(Date.now() - 4 * 60 * 60 * 1000),
    deliveryStatus: 'Packing',
    expectedDelivery: new Date(Date.now() + 20 * 60 * 60 * 1000),
    driver: null,
    timeline: [
      { step: 'Order Placed', time: new Date(Date.now() - 4 * 60 * 60 * 1000), completed: true },
      { step: 'Approved by Mill', time: new Date(Date.now() - 3 * 60 * 60 * 1000), completed: true },
      { step: 'Packing', time: new Date(Date.now() - 1 * 60 * 60 * 1000), completed: true },
      { step: 'Vehicle Assigned', time: null, completed: false },
      { step: 'Driver Started', time: null, completed: false },
      { step: 'Delivery in Progress', time: null, completed: false },
      { step: 'Delivered', time: null, completed: false }
    ],
    currentLocation: null,
    destination: { lat: 6.054, lng: 80.220, address: '555 Galle Road, Galle' },
    estimatedReachingTime: null,
    transportCost: 20000,
    isDelayed: false,
    trafficNotice: null,
    vehicleSpeed: 0,
    temperature: null,
    etaUpdates: [],
    deliveryCompleted: null
  }
];

// Helpers
const getStatusBadgeColor = (status) => {
  switch (status) {
    case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'packing': return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'vehicle-assigned': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    case 'on-the-way': return 'bg-green-100 text-green-800 border-green-200';
    case 'delivered': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const formatDate = (date) => {
  if (!date) return 'Not scheduled';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { 
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const formatTimeAgo = (date) => {
  if (!date) return '';
  const diff = Date.now() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days !== 1 ? 's' : ''} ago`;
};

const TrackingPage = () => {
  const [selectedOrder, setSelectedOrder] = useState(dealerOrders[0]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('tracking'); // 'tracking', 'details', 'documents'

  // Auto-refresh simulation
  useEffect(() => {
    if (!autoRefresh || !selectedOrder.currentLocation) return;
    
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000);
    
    return () => clearInterval(interval);
  }, [autoRefresh, selectedOrder]);

  // Filter orders
  const filteredOrders = dealerOrders.filter(order => {
    if (statusFilter !== 'all' && order.status !== statusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        order.orderId.toLowerCase().includes(q) ||
        order.riceMill.toLowerCase().includes(q) ||
        order.paymentType.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleCallDriver = (phone) => {
    window.open(`tel:${phone}`, '_blank');
  };

  const handleDownloadReceipt = (orderId) => {
    console.log(`Downloading receipt for ${orderId}`);
  };

  const handleDownloadInvoice = (orderId) => {
    console.log(`Downloading invoice for ${orderId}`);
  };

  const handleReorder = (order) => {
    console.log(`Reordering ${order.orderId}`);
  };

  const handleRateDelivery = (orderId, rating) => {
    console.log(`Rating delivery for ${orderId}: ${rating} stars`);
  };

  const renderTimeline = (timeline) => {
    return (
      <div className="space-y-4">
        {timeline.map((step, index) => (
          <div key={index} className="flex items-start">
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-4
              ${step.completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
              {step.completed ? (
                <CheckCircleIcon className="w-5 h-5" />
              ) : (
                <span className="text-sm font-medium">{index + 1}</span>
              )}
            </div>
            <div className="flex-1 pb-4 border-b border-gray-100 last:border-b-0">
              <div className="flex justify-between items-start">
                <div>
                  <p className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                    {step.step}
                  </p>
                  {step.time && (
                    <p className="text-sm text-gray-500 mt-1">
                      {formatDate(step.time)}
                    </p>
                  )}
                </div>
                {step.completed && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Completed
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderOrdersList = () => (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">My Orders</h2>
            <p className="text-sm text-gray-500">{filteredOrders.length} orders</p>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        
        {/* Search & Filter */}
        <div className="space-y-4">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            {['all', 'vehicle-assigned', 'on-the-way', 'packing', 'delivered'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  statusFilter === status
                    ? 'bg-green-100 text-green-800 border border-green-300'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status === 'all' ? 'All' : status.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-2">
          {filteredOrders.map((order) => (
            <div
              key={order.orderId}
              className={`p-4 rounded-xl cursor-pointer transition-all ${
                selectedOrder.orderId === order.orderId
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 shadow-sm'
                  : 'bg-white border border-gray-200 hover:border-green-200 hover:shadow-sm'
              }`}
              onClick={() => {
                setSelectedOrder(order);
                setIsMobileMenuOpen(false);
              }}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-bold text-gray-900">{order.orderId}</p>
                  <p className="text-sm text-gray-600">{order.riceMill}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getStatusBadgeColor(order.status)}`}>
                  {order.deliveryStatus}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                <div className="flex items-center gap-2">
                  <PackageOpenIcon className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900 font-medium">{order.totalKg} kg</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCardIcon className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{order.paymentType}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <span className="text-gray-500 text-sm">
                  {formatDate(order.placedDate)}
                </span>
                <span className="font-bold text-green-700">
                  Rs. {order.totalAmount.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTrackingView = () => (
    <div className="space-y-4">
      {/* Order Header Card */}
      <Card className="rounded-2xl border border-gray-200">
        <div className="p-4">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-xl font-bold text-gray-900">{selectedOrder.orderId}</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-bold border ${getStatusBadgeColor(selectedOrder.status)}`}>
                  {selectedOrder.deliveryStatus}
                </span>
              </div>
              <p className="text-gray-600 text-sm">
                From: {selectedOrder.riceMill} • Placed: {formatDate(selectedOrder.placedDate)}
              </p>
            </div>
            
            <div className="hidden sm:flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={autoRefresh ? 'bg-green-50 text-green-700 border-green-300' : ''}
              >
                {autoRefresh ? (
                  <>
                    <PauseIcon className="w-4 h-4 mr-2" />
                    Auto-refresh
                  </>
                ) : (
                  <>
                    <PlayIcon className="w-4 h-4 mr-2" />
                    Refresh
                  </>
                )}
              </Button>
            </div>
          </div>
          
          {/* Mobile Auto-refresh */}
          <div className="sm:hidden flex items-center justify-between pt-3 border-t border-gray-100">
            <span className="text-sm text-gray-600">
              <RefreshCwIcon className="inline w-4 h-4 mr-2" />
              Updated {formatTimeAgo(lastUpdated)}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={autoRefresh ? 'bg-green-50 text-green-700 border-green-300' : ''}
            >
              {autoRefresh ? 'Pause' : 'Resume'}
            </Button>
          </div>
        </div>
      </Card>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200">
        {['tracking', 'details', 'documents'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? 'border-green-500 text-green-700'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-4">
        {activeTab === 'tracking' && (
          <>
            {/* Live Tracking Card */}
            <Card className="rounded-2xl border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Navigation2Icon className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Live Tracking</h3>
                      <p className="text-sm text-gray-600">
                        {selectedOrder.driver?.name || 'No driver assigned'}
                      </p>
                    </div>
                  </div>
                  {selectedOrder.driver && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCallDriver(selectedOrder.driver.phone)}
                      className="rounded-lg"
                    >
                      <PhoneIcon className="w-4 h-4 mr-2" />
                      Call
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="p-4">
                {selectedOrder.currentLocation ? (
                  <div className="space-y-4">
                    {/* Map Visualization */}
                    <div className="relative h-48 bg-gradient-to-br from-blue-50 to-gray-100 rounded-xl overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="relative mb-4">
                            <MapIcon className="w-16 h-16 text-blue-300 mx-auto" />
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse ring-4 ring-green-200"></div>
                            </div>
                          </div>
                          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-sm inline-block max-w-xs">
                            <p className="text-xs text-gray-600 mb-1">Current Location</p>
                            <p className="font-medium text-gray-900 text-sm">
                              {selectedOrder.currentLocation.address}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Status Bar */}
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Estimated Arrival</span>
                        <span className="text-lg font-bold text-green-700">
                          {formatDate(selectedOrder.estimatedReachingTime)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-600">Vehicle is moving</span>
                      </div>
                    </div>
                    
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <GaugeIcon className="w-4 h-4 text-gray-500" />
                          <span className="text-xs text-gray-600">Speed</span>
                        </div>
                        <p className="font-bold text-gray-900">{selectedOrder.vehicleSpeed} km/h</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <ThermometerIcon className="w-4 h-4 text-gray-500" />
                          <span className="text-xs text-gray-600">Temperature</span>
                        </div>
                        <p className="font-bold text-gray-900">{selectedOrder.temperature}°C</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-xs text-gray-600">Distance</span>
                        </div>
                        <p className="font-bold text-gray-900">125 km</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <TimerIcon className="w-4 h-4 text-gray-500" />
                          <span className="text-xs text-gray-600">Duration</span>
                        </div>
                        <p className="font-bold text-gray-900">2h 45m</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <PackageIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Preparing for Dispatch</h3>
                    <p className="text-gray-500">Vehicle will be assigned soon</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Timeline Card */}
            <Card className="rounded-2xl border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-bold text-gray-900">Delivery Timeline</h3>
              </div>
              <div className="p-4">
                {renderTimeline(selectedOrder.timeline)}
              </div>
            </Card>
          </>
        )}

        {activeTab === 'details' && (
          <div className="space-y-4">
            {/* Order Details Card */}
            <Card className="rounded-2xl border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <ClipboardListIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-900">Order Details</h3>
                </div>
              </div>
              
              <div className="p-4">
                <div className="space-y-4">
                  {selectedOrder.products.map((product, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-gray-900">{product.name}</p>
                          <p className="text-sm text-gray-600">Type: {product.type}</p>
                        </div>
                        <span className="font-bold text-green-700">
                          Rs. {product.total.toLocaleString()}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-gray-600">Quantity</p>
                          <p className="font-medium">{product.quantity} kg</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Price/KG</p>
                          <p className="font-medium">Rs. {product.pricePerKg}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="border-t border-gray-200 pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium text-gray-900">
                        Rs. {selectedOrder.totalAmount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Transport</span>
                      <span className="font-medium text-gray-900">
                        Rs. {selectedOrder.transportCost.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                      <span>Total Amount</span>
                      <span className="text-green-700">
                        Rs. {(selectedOrder.totalAmount + selectedOrder.transportCost).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Driver Info Card */}
            {selectedOrder.driver && (
              <Card className="rounded-2xl border border-gray-200">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <UsersIcon className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">Driver Information</h3>
                        <p className="text-sm text-gray-600">Delivery executive</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <StarIcon className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="font-bold">{selectedOrder.driver.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <img 
                      src={selectedOrder.driver.photo} 
                      alt={selectedOrder.driver.name}
                      className="w-14 h-14 rounded-xl border-2 border-green-200"
                    />
                    <div>
                      <p className="font-bold text-gray-900 text-lg">{selectedOrder.driver.name}</p>
                      <p className="text-gray-600">{selectedOrder.driver.vehicleType}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-600 mb-1">Phone Number</p>
                      <p className="font-medium">{selectedOrder.driver.phone}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-600 mb-1">Vehicle Number</p>
                      <p className="font-medium">{selectedOrder.driver.vehicleNumber}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-600 mb-1">Trips Completed</p>
                      <p className="font-medium">{selectedOrder.driver.tripsCompleted}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-600 mb-1">Status</p>
                      <p className="font-medium text-green-700">Active</p>
                    </div>
                  </div>
                  
                  <Button
                    fullWidth
                    className="mt-4 rounded-lg"
                    onClick={() => handleCallDriver(selectedOrder.driver.phone)}
                  >
                    <PhoneIcon className="w-5 h-5 mr-2" />
                    Call Driver
                  </Button>
                </div>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="space-y-4">
            <Card className="rounded-2xl border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <FileTextIcon className="w-5 h-5 text-orange-600" />
                  </div>
                  <h3 className="font-bold text-gray-900">Documents</h3>
                </div>
              </div>
              
              <div className="p-4">
                <div className="space-y-3">
                  <Button 
                    fullWidth
                    variant="outline"
                    className="justify-start p-4 rounded-lg border-gray-200 hover:border-green-300 hover:bg-green-50"
                    onClick={() => handleDownloadReceipt(selectedOrder.orderId)}
                  >
                    <FileTextIcon className="w-5 h-5 mr-3 text-gray-500" />
                    <div className="text-left">
                      <p className="font-medium text-gray-900">Download Receipt</p>
                      <p className="text-sm text-gray-500">Payment confirmation</p>
                    </div>
                    <DownloadIcon className="w-5 h-5 ml-auto text-gray-400" />
                  </Button>
                  
                  <Button 
                    fullWidth
                    variant="outline"
                    className="justify-start p-4 rounded-lg border-gray-200 hover:border-green-300 hover:bg-green-50"
                    onClick={() => handleDownloadInvoice(selectedOrder.orderId)}
                  >
                    <FileTextIcon className="w-5 h-5 mr-3 text-gray-500" />
                    <div className="text-left">
                      <p className="font-medium text-gray-900">Download Invoice</p>
                      <p className="text-sm text-gray-500">Tax invoice</p>
                    </div>
                    <DownloadIcon className="w-5 h-5 ml-auto text-gray-400" />
                  </Button>
                  
                  {selectedOrder.status === 'delivered' && (
                    <>
                      <Button 
                        fullWidth
                        variant="outline"
                        className="justify-start p-4 rounded-lg border-gray-200 hover:border-green-300 hover:bg-green-50"
                        onClick={() => handleReorder(selectedOrder)}
                      >
                        <RefreshCwIcon className="w-5 h-5 mr-3 text-gray-500" />
                        <div className="text-left">
                          <p className="font-medium text-gray-900">Reorder This</p>
                          <p className="text-sm text-gray-500">Order same items again</p>
                        </div>
                      </Button>
                      
                      <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                        <div className="flex items-start gap-3">
                          <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-green-800 mb-2">Delivery Completed</p>
                            <p className="text-sm text-green-700">
                              {selectedOrder.deliveryFeedback || 'Delivery completed successfully'}
                            </p>
                            {selectedOrder.deliveryRating && (
                              <div className="flex items-center gap-1 mt-3">
                                {[1, 2, 3, 4, 5].map(i => (
                                  <StarIcon 
                                    key={i} 
                                    className={`w-5 h-5 ${
                                      i <= Math.floor(selectedOrder.deliveryRating) 
                                        ? 'text-yellow-400 fill-yellow-400' 
                                        : 'text-gray-300'
                                    }`} 
                                  />
                                ))}
                                <span className="ml-2 font-medium">{selectedOrder.deliveryRating}/5</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Card>

            {/* ETA Updates */}
            {selectedOrder.etaUpdates.length > 0 && (
              <Card className="rounded-2xl border border-gray-200">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <AlertTriangleIcon className="w-5 h-5 text-yellow-600" />
                    <h3 className="font-bold text-gray-900">Route Updates</h3>
                  </div>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    {selectedOrder.etaUpdates.map((update, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-xl border border-yellow-200">
                        <AlertTriangleIcon className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-yellow-900">{update.message}</p>
                          <p className="text-sm text-yellow-700 mt-1">
                            Updated {formatTimeAgo(update.time)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Header */}
      <div className="hidden lg:block bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Delivery Tracking</h1>
              <p className="text-gray-600">Real-time tracking of your rice and paddy deliveries</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Last updated</p>
                <p className="font-medium">{formatTimeAgo(lastUpdated)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Tracking</h1>
              <p className="text-sm text-gray-600">{selectedOrder.orderId}</p>
            </div>
            
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto lg:px-6 lg:py-6">
        <div className="lg:flex lg:gap-6">
          {/* Desktop Orders Sidebar */}
          <div className="hidden lg:block lg:w-80 lg:flex-shrink-0">
            <Card className="h-[calc(100vh-8rem)] rounded-2xl border border-gray-200 overflow-hidden">
              {renderOrdersList()}
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:flex-1 p-4 lg:p-0">
            {renderTrackingView()}
          </div>
        </div>
      </div>

      {/* Mobile Orders Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="absolute inset-0" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-4/5 max-w-sm bg-white shadow-2xl overflow-y-auto">
            <Card className="h-full rounded-none border-0">
              {renderOrdersList()}
            </Card>
          </div>
        </div>
      )}

      {/* Mobile Bottom Bar */}
      {selectedOrder.driver && !isMobileMenuOpen && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <TruckIcon className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">
                  {selectedOrder.driver.name}
                </p>
                <p className="text-xs text-gray-600">
                  {selectedOrder.driver.vehicleNumber}
                </p>
              </div>
            </div>
            
            <Button
              size="sm"
              onClick={() => handleCallDriver(selectedOrder.driver.phone)}
              className="rounded-lg"
            >
              <PhoneIcon className="w-4 h-4 mr-2" />
              Call
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackingPage;