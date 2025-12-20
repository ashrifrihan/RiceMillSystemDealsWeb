import React, { useState } from 'react';
import { 
  SearchIcon, 
  FilterIcon, 
  DownloadIcon, 
  EyeIcon, 
  RotateCw,
  CalendarIcon,
  TruckIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  StoreIcon,
  PackageIcon,
  DollarSign,
  CreditCardIcon,
  MapPinIcon,
  PhoneIcon,
  ReceiptIcon,
  ArrowRight,
  ChevronDown,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { useNotification } from '../contexts/NotificationContext';

// Mock data for DEALER's orders (only this dealer's orders)
const dealerOrders = [
  {
    id: 'ORD-2023-001',
    dealerId: 'dealer-001',
    dealerName: 'Rihan Traders',
    riceMill: 'Green Valley Rice Mill',
    riceMillContact: '037-1234567',
    orderDate: new Date(2023, 5, 15),
    status: 'delivered',
    paymentMethod: 'cash',
    totalAmount: 120000,
    deliveryAddress: 'Colombo 10',
    driverContact: '077-9876543',
    trackingId: 'TRK-001',
    items: [
      { name: 'Nadu Rice', quantity: 500, price: 120 },
      { name: 'Samba Rice', quantity: 200, price: 140 }
    ]
  },
  {
    id: 'ORD-2023-002',
    dealerId: 'dealer-001',
    dealerName: 'Rihan Traders',
    riceMill: 'Lanka Rice Corporation',
    riceMillContact: '037-7654321',
    orderDate: new Date(2023, 5, 20),
    status: 'in-transit',
    paymentMethod: 'payLater',
    totalAmount: 95000,
    deliveryAddress: 'Kandy',
    driverContact: '077-1234567',
    trackingId: 'TRK-002',
    items: [
      { name: 'Premium Basmati', quantity: 300, price: 180 },
      { name: 'Keeri Samba', quantity: 100, price: 150 }
    ]
  },
  {
    id: 'ORD-2023-003',
    dealerId: 'dealer-001',
    dealerName: 'Rihan Traders',
    riceMill: 'Haris Rice Mills',
    riceMillContact: '037-8888888',
    orderDate: new Date(2023, 5, 25),
    status: 'processing',
    paymentMethod: 'payLater',
    totalAmount: 150000,
    deliveryAddress: 'Gampaha',
    driverContact: '077-5555555',
    trackingId: 'TRK-003',
    items: [
      { name: 'Red Nadu', quantity: 800, price: 110 },
      { name: 'White Samba', quantity: 200, price: 135 }
    ]
  },
  {
    id: 'ORD-2023-004',
    dealerId: 'dealer-001',
    dealerName: 'Rihan Traders',
    riceMill: 'Green Valley Rice Mill',
    riceMillContact: '037-1234567',
    orderDate: new Date(2023, 4, 10),
    status: 'delivered',
    paymentMethod: 'cash',
    totalAmount: 85000,
    deliveryAddress: 'Negombo',
    driverContact: '077-4444444',
    trackingId: 'TRK-004',
    items: [
      { name: 'Nadu Rice', quantity: 700, price: 120 }
    ]
  },
  {
    id: 'ORD-2023-005',
    dealerId: 'dealer-001',
    dealerName: 'Rihan Traders',
    riceMill: 'Lanka Rice Corporation',
    riceMillContact: '037-7654321',
    orderDate: new Date(2023, 4, 5),
    status: 'cancelled',
    paymentMethod: 'payLater',
    totalAmount: 60000,
    deliveryAddress: 'Kurunegala',
    driverContact: '077-3333333',
    trackingId: 'TRK-005',
    items: [
      { name: 'Keeri Samba', quantity: 400, price: 150 }
    ]
  }
];

// Current dealer info (from auth context)
const currentDealer = {
  id: 'dealer-001',
  name: 'Rihan Traders',
  creditLimit: 300000,
  usedCredit: 180000,
  remainingCredit: 120000
};

// Helper functions
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-LK', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

const getStatusBadgeColor = (status) => {
  switch(status) {
    case 'delivered': return 'bg-green-100 text-green-800';
    case 'in-transit': return 'bg-blue-100 text-blue-800';
    case 'processing': return 'bg-amber-100 text-amber-800';
    case 'cancelled': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const OrderHistory = () => {
  const { addNotification } = useNotification();
  
  // Simple filters for dealer
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
  // State for order details modal
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showTrackingModal, setShowTrackingModal] = useState(false);

  // Filter orders - DEALER ONLY SEES THEIR OWN ORDERS
  const filteredOrders = dealerOrders.filter(order => {
    // Always filter by current dealer
    if (order.dealerId !== currentDealer.id) return false;
    
    // Status filter
    if (statusFilter !== 'all' && order.status !== statusFilter) return false;
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return order.id.toLowerCase().includes(query) || 
             order.riceMill.toLowerCase().includes(query);
    }
    
    return true;
  });

  // Calculate simple stats for dealer
  const totalOrders = filteredOrders.length;
  const deliveredOrders = filteredOrders.filter(order => order.status === 'delivered').length;
  const processingOrders = filteredOrders.filter(order => order.status === 'processing' || order.status === 'in-transit').length;
  const payLaterBalance = filteredOrders
    .filter(order => order.paymentMethod === 'payLater' && order.status !== 'cancelled')
    .reduce((sum, order) => sum + order.totalAmount, 0);

  // Handle view order details
  const handleViewDetails = order => {
    setSelectedOrder(order);
    setShowDetailsModal(true);
  };

  // Handle track order
  const handleTrackOrder = order => {
    setSelectedOrder(order);
    setShowTrackingModal(true);
    addNotification('info', `Tracking order ${order.id} from ${order.riceMill}`);
  };

  // Handle download invoice
  const handleDownloadInvoice = order => {
    addNotification('success', `Invoice for ${order.id} downloaded successfully.`);
    // In real app, trigger PDF download
  };

  // Handle reorder
  const handleReorder = order => {
    addNotification('success', `Items from order ${order.id} added to new order.`);
    // In real app, navigate to place order page with pre-filled items
  };

  // Clear filters
  const clearFilters = () => {
    setStatusFilter('all');
    setSearchQuery('');
  };

  // Format items display
  const formatItemsDisplay = (items) => {
    return items.map(item => `${item.name} – ${item.quantity}kg`).join(' • ');
  };

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
      {/* Header - SIMPLE DEALER HEADER */}
      <div className="mb-12">
        <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-3xl shadow-2xl p-12 lg:p-16 text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-5 mb-8">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center shadow-2xl">
                <PackageIcon className="w-10 h-10 text-white" />
              </div>

              <div>
                <h1 className="text-4xl lg:text-6xl font-black tracking-tight leading-none">
                  Your Order History
                </h1>
                <p className="text-green-100 text-lg mt-2 opacity-90">
                  {currentDealer.name} • Track all your rice purchases
                </p>
              </div>
            </div>

            <p className="text-xl text-green-50 font-light leading-relaxed max-w-3xl opacity-95">
              View all your past and current orders from rice mills. 
              Track deliveries, download invoices, and quickly reorder.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats - DEALER FOCUSED */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card className="rounded-3xl border border-gray-100 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
              <PackageIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900">{totalOrders}</p>
              <p className="text-sm text-gray-600">Total Orders</p>
            </div>
          </div>
        </Card>

        <Card className="rounded-3xl border border-gray-100 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900">{deliveredOrders}</p>
              <p className="text-sm text-gray-600">Delivered</p>
            </div>
          </div>
        </Card>

        <Card className="rounded-3xl border border-gray-100 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center">
              <ClockIcon className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900">{processingOrders}</p>
              <p className="text-sm text-gray-600">In Progress</p>
            </div>
          </div>
        </Card>

        <Card className="rounded-3xl border border-gray-100 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
              <CreditCardIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900">{formatCurrency(payLaterBalance)}</p>
              <p className="text-sm text-gray-600">Pay Later Balance</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Simple Filters - NO DEALER FILTER */}
      <Card className="rounded-3xl border border-gray-100 p-8 mb-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-black text-gray-900">Filter Your Orders</h2>
            <p className="text-gray-600 mt-1">Find specific orders quickly</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <FilterIcon className="w-5 h-5" />
              <span className="font-medium">{filteredOrders.length} orders</span>
            </div>
            {filteredOrders.length < dealerOrders.length && (
              <Button
                variant="outline"
                onClick={clearFilters}
                className="rounded-2xl"
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Orders
            </label>
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Order ID or Rice Mill"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-300 focus:border-green-600 focus:ring-4 focus:ring-green-600/20 transition-all duration-300"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Order Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl border border-gray-300 focus:border-green-600 focus:ring-4 focus:ring-green-600/20 transition-all duration-300"
            >
              <option value="all">All Statuses</option>
              <option value="processing">Processing</option>
              <option value="in-transit">In Transit</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Quick Actions */}
          <div className="flex items-end">
            <Button
              className="w-full rounded-2xl py-4"
              onClick={() => addNotification('info', 'Navigating to place order...')}
            >
              Place New Order
            </Button>
          </div>
        </div>

        {/* Active Filters */}
        {(searchQuery || statusFilter !== 'all') && (
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-600 font-medium">Active filters:</span>
              {searchQuery && (
                <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-xl text-sm font-medium">
                  Search: "{searchQuery}"
                </span>
              )}
              {statusFilter !== 'all' && (
                <span className={`px-3 py-1.5 rounded-xl text-sm font-medium capitalize ${getStatusBadgeColor(statusFilter)}`}>
                  {statusFilter.replace('-', ' ')}
                </span>
              )}
            </div>
          </div>
        )}
      </Card>

      {/* Order Listings - SIMPLE DEALER VIEW */}
      <div className="space-y-6">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-lg border border-gray-100">
            <div className="w-32 h-32 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <PackageIcon className="w-16 h-16 text-gray-300" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mt-6">No Orders Found</h3>
            <p className="text-gray-600 mt-3 max-w-md mx-auto">
              {dealerOrders.length === 0 
                ? "You haven't placed any orders yet."
                : "No orders match your current filters."}
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button variant="outline" onClick={clearFilters} className="rounded-2xl px-8">
                Clear Filters
              </Button>
              <Button className="rounded-2xl px-8" onClick={() => addNotification('info', 'Navigating to place order...')}>
                Place Your First Order
              </Button>
            </div>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <Card key={order.id} className="rounded-3xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                {/* Order Info */}
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                      order.paymentMethod === 'payLater' 
                        ? 'bg-gradient-to-br from-blue-500 to-cyan-600' 
                        : 'bg-gradient-to-br from-green-500 to-emerald-600'
                    }`}>
                      {order.paymentMethod === 'payLater' ? (
                        <CreditCardIcon className="w-7 h-7 text-white" />
                      ) : (
                        <DollarSign className="w-7 h-7 text-white" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-black text-gray-900 cursor-pointer hover:text-green-700 transition" onClick={() => handleViewDetails(order)}>
                          {order.id}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusBadgeColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1).replace('-', ' ')}
                        </span>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <StoreIcon className="w-4 h-4 text-gray-400" />
                          <span className="font-medium text-gray-700">{order.riceMill}</span>
                          <span className="text-xs text-gray-400">•</span>
                          <CalendarIcon className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{formatDate(order.orderDate)}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                            order.paymentMethod === 'cash' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {order.paymentMethod === 'cash' ? 'Cash' : 'Pay Later'}
                          </span>
                          <span className="text-gray-500">•</span>
                          <span className="text-sm text-gray-700">
                            {formatItemsDisplay(order.items)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Amount & Actions */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
                  <div className="text-right">
                    <p className="text-2xl font-black text-gray-900 mb-2">
                      {formatCurrency(order.totalAmount)}
                    </p>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-xl"
                      onClick={() => handleViewDetails(order)}
                    >
                      <EyeIcon className="w-4 h-4 mr-2" /> Details
                    </Button>
                    
                    {order.status !== 'cancelled' && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-xl"
                          onClick={() => handleTrackOrder(order)}
                        >
                          <TruckIcon className="w-4 h-4 mr-2" /> Track
                        </Button>
                        
                        <Button
                          size="sm"
                          className="rounded-xl"
                          onClick={() => handleReorder(order)}
                        >
                          <RotateCw className="w-4 h-4 mr-2" /> Reorder
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <Modal 
          isOpen={showDetailsModal} 
          onClose={() => setShowDetailsModal(false)} 
          title="Order Details"
          size="lg"
        >
          <div className="space-y-6">
            {/* Order Header */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Order ID</p>
                  <p className="font-bold text-lg">{selectedOrder.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-bold">{formatDate(selectedOrder.orderDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Rice Mill</p>
                  <p className="font-bold">{selectedOrder.riceMill}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <p className={`font-bold capitalize ${getStatusBadgeColor(selectedOrder.status)} px-3 py-1 rounded-full inline-block`}>
                    {selectedOrder.status}
                  </p>
                </div>
              </div>
            </div>

            {/* Rice Items */}
            <div>
              <h4 className="font-bold text-lg mb-4">Rice Items</h4>
              <div className="space-y-3">
                {selectedOrder.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.quantity} kg</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{formatCurrency(item.price * item.quantity)}</p>
                      <p className="text-sm text-gray-600">{formatCurrency(item.price)} per kg</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment & Total */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600">Payment Method</p>
                <p className="font-bold text-lg">
                  {selectedOrder.paymentMethod === 'cash' ? 'Cash' : 'Pay Later'}
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-xl">
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="text-2xl font-black text-green-700">
                  {formatCurrency(selectedOrder.totalAmount)}
                </p>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="p-4 bg-blue-50 rounded-xl">
              <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                <TruckIcon className="w-5 h-5" />
                Delivery Information
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPinIcon className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">{selectedOrder.deliveryAddress}</span>
                </div>
                {selectedOrder.driverContact && (
                  <div className="flex items-center gap-2">
                    <PhoneIcon className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">Driver: {selectedOrder.driverContact}</span>
                  </div>
                )}
                {selectedOrder.trackingId && (
                  <div className="flex items-center gap-2">
                    <TruckIcon className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">Tracking ID: {selectedOrder.trackingId}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6 border-t border-gray-200">
              <Button
                variant="outline"
                className="flex-1 rounded-2xl"
                onClick={() => handleDownloadInvoice(selectedOrder)}
              >
                <DownloadIcon className="w-5 h-5 mr-2" />
                Download Invoice
              </Button>
              {selectedOrder.status !== 'cancelled' && (
                <>
                  <Button
                    className="flex-1 rounded-2xl"
                    onClick={() => handleTrackOrder(selectedOrder)}
                  >
                    <TruckIcon className="w-5 h-5 mr-2" />
                    Track Order
                  </Button>
                  <Button
                    className="flex-1 rounded-2xl bg-green-600 hover:bg-green-700"
                    onClick={() => handleReorder(selectedOrder)}
                  >
                    <RotateCw className="w-5 h-5 mr-2" />
                    Reorder
                  </Button>
                </>
              )}
            </div>
          </div>
        </Modal>
      )}

      {/* Tracking Modal */}
      {selectedOrder && showTrackingModal && (
        <Modal 
          isOpen={showTrackingModal} 
          onClose={() => setShowTrackingModal(false)} 
          title="Track Your Order"
          size="md"
        >
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <TruckIcon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900">Order {selectedOrder.id}</h3>
              <p className="text-gray-600">From {selectedOrder.riceMill}</p>
            </div>

            {/* Tracking Steps */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircleIcon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Order Confirmed</p>
                  <p className="text-sm text-gray-600">{formatDate(selectedOrder.orderDate)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  selectedOrder.status === 'processing' || selectedOrder.status === 'in-transit' || selectedOrder.status === 'delivered'
                    ? 'bg-green-500' : 'bg-gray-300'
                }`}>
                  <ClockIcon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${selectedOrder.status !== 'cancelled' ? 'text-gray-900' : 'text-gray-400'}`}>
                    Processing at Mill
                  </p>
                  <p className="text-sm text-gray-600">Rice being prepared for dispatch</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  selectedOrder.status === 'in-transit' || selectedOrder.status === 'delivered'
                    ? 'bg-green-500' : 'bg-gray-300'
                }`}>
                  <TruckIcon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${selectedOrder.status === 'in-transit' || selectedOrder.status === 'delivered' ? 'text-gray-900' : 'text-gray-400'}`}>
                    In Transit
                  </p>
                  <p className="text-sm text-gray-600">
                    Driver: {selectedOrder.driverContact || 'Assigned soon'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  selectedOrder.status === 'delivered'
                    ? 'bg-green-500' : 'bg-gray-300'
                }`}>
                  <CheckCircleIcon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${selectedOrder.status === 'delivered' ? 'text-gray-900' : 'text-gray-400'}`}>
                    Delivered
                  </p>
                  <p className="text-sm text-gray-600">
                    {selectedOrder.status === 'delivered' ? formatDate(new Date()) : 'Estimated soon'}
                  </p>
                </div>
              </div>
            </div>

            {/* Live Tracking Note */}
            <div className="p-4 bg-blue-50 rounded-xl">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-800">Live GPS Tracking</p>
                  <p className="text-sm text-blue-700 mt-1">
                    Real-time GPS tracking is available for in-transit orders. 
                    You'll receive SMS updates on delivery status.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default OrderHistory;