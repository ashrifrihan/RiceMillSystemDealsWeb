import React, { useState, useEffect } from 'react';
import { 
  CreditCardIcon, 
  DollarSignIcon, 
  CalendarIcon, 
  CheckCircleIcon, 
  AlertCircleIcon, 
  PlusIcon, 
  SearchIcon, 
  FilterIcon, 
  EyeIcon, 
  ArrowRightIcon,
  TrendingUpIcon,
  ClockIcon,
  UserIcon,
  PackageIcon,
  ReceiptIcon,
  BuildingIcon,
  ShieldIcon,
  AwardIcon,
  TrendingDownIcon,
  DownloadIcon,
  CreditCard,
  BanknoteIcon,
  AlertTriangleIcon,
  InfoIcon,
  StarIcon,
  PercentIcon,
  FileTextIcon,
  CheckIcon,
  XIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MapPinIcon,
  TruckIcon,
  UploadIcon
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { loans, formatCurrency, formatDate } from '../utils/mockData';
import { useNotification } from '../contexts/NotificationContext';

// Mock dealer credit data
const dealerCredit = {
  approvedLimit: 300000,
  usedCredit: 180000,
  remainingCredit: 120000,
  creditProvider: "Haris Rice Mills",
  creditExpiry: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 180 days from now
  creditScore: 85,
  onTimePayments: 92,
  delaysCount: 2,
  totalAmountPaid: 450000,
  reputation: "Excellent"
};

// Mock purchase-based loan transactions
const purchaseTransactions = [
  {
    id: 'TXN-001',
    orderId: 'ORD-2023-001',
    riceMill: 'Haris Rice Mills',
    riceType: 'Premium Basmati Rice',
    quantity: 500,
    value: 60000,
    purchaseDate: new Date(2023, 5, 15),
    creditUsed: 60000,
    dueMonth: 'Jun 2023',
    status: 'paid'
  },
  {
    id: 'TXN-002',
    orderId: 'ORD-2023-002',
    riceMill: 'Haris Rice Mills',
    riceType: 'Jasmine Rice',
    quantity: 1000,
    value: 95000,
    purchaseDate: new Date(2023, 6, 2),
    creditUsed: 95000,
    dueMonth: 'Jul 2023',
    status: 'paid'
  },
  {
    id: 'TXN-003',
    orderId: 'ORD-2023-003',
    riceMill: 'Lanka Rice Corporation',
    riceType: 'Sona Masoori Rice',
    quantity: 300,
    value: 33000,
    purchaseDate: new Date(2023, 6, 10),
    creditUsed: 33000,
    dueMonth: 'Aug 2023',
    status: 'overdue'
  },
  {
    id: 'TXN-004',
    orderId: 'ORD-2023-004',
    riceMill: 'Asian Rice Imports',
    riceType: 'Premium Basmati Rice',
    quantity: 800,
    value: 96000,
    purchaseDate: new Date(2023, 7, 5),
    creditUsed: 96000,
    dueMonth: 'Sep 2023',
    status: 'pending'
  }
];

// UPDATED: Monthly repayment schedule with rice mill information
const initialMonthlyRepayments = [
  {
    month: 'June 2023',
    dueAmount: 60000,
    paidAmount: 60000,
    pendingAmount: 0,
    status: 'paid',
    penalty: 0,
    dueDate: new Date(2023, 6, 10),
    paidDate: new Date(2023, 6, 5),
    riceMill: 'Haris Rice Mills',
    riceTypes: ['Premium Basmati Rice'],
    orders: ['ORD-2023-001']
  },
  {
    month: 'July 2023',
    dueAmount: 95000,
    paidAmount: 95000,
    pendingAmount: 0,
    status: 'paid',
    penalty: 0,
    dueDate: new Date(2023, 7, 10),
    paidDate: new Date(2023, 7, 8),
    riceMill: 'Haris Rice Mills',
    riceTypes: ['Jasmine Rice'],
    orders: ['ORD-2023-002']
  },
  {
    month: 'August 2023',
    dueAmount: 33000,
    paidAmount: 15000,
    pendingAmount: 18000,
    status: 'delayed',
    penalty: 1500,
    dueDate: new Date(2023, 8, 10),
    paidDate: new Date(2023, 8, 25),
    riceMill: 'Lanka Rice Corporation',
    riceTypes: ['Sona Masoori Rice'],
    orders: ['ORD-2023-003']
  },
  {
    month: 'September 2023',
    dueAmount: 96000,
    paidAmount: 0,
    pendingAmount: 96000,
    status: 'pending',
    penalty: 0,
    dueDate: new Date(2023, 9, 10),
    paidDate: null,
    riceMill: 'Asian Rice Imports',
    riceTypes: ['Premium Basmati Rice'],
    orders: ['ORD-2023-004']
  }
];

// UPDATED: Payment history with rice mill information
const initialPaymentHistory = [
  {
    id: 'PAY-001',
    amount: 60000,
    date: new Date(2023, 6, 5),
    method: 'Bank Transfer',
    receipt: 'invoice_001.pdf',
    status: 'confirmed',
    forMonth: 'June 2023',
    riceMill: 'Haris Rice Mills',
    riceTypes: ['Premium Basmati Rice'],
    orders: ['ORD-2023-001'],
    bankSlip: null
  },
  {
    id: 'PAY-002',
    amount: 95000,
    date: new Date(2023, 7, 8),
    method: 'Visa Card',
    receipt: 'invoice_002.pdf',
    status: 'confirmed',
    forMonth: 'July 2023',
    riceMill: 'Haris Rice Mills',
    riceTypes: ['Jasmine Rice'],
    orders: ['ORD-2023-002'],
    bankSlip: null
  },
  {
    id: 'PAY-003',
    amount: 15000,
    date: new Date(2023, 8, 25),
    method: 'Master Card',
    receipt: 'invoice_003.pdf',
    status: 'confirmed',
    forMonth: 'August 2023',
    riceMill: 'Lanka Rice Corporation',
    riceTypes: ['Sona Masoori Rice'],
    orders: ['ORD-2023-003'],
    bankSlip: null
  }
];

const LoanManagement = () => {
  const { addNotification } = useNotification();
  
  // State for loan management
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showRepayModal, setShowRepayModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);
  
  // State for repayments and payment history
  const [monthlyRepayments, setMonthlyRepayments] = useState(initialMonthlyRepayments);
  const [paymentHistory, setPaymentHistory] = useState(initialPaymentHistory);
  
  // Repayment form state
  const [repayment, setRepayment] = useState({
    month: '',
    amount: 0,
    method: 'visa',
    bankSlip: null
  });

  // Calculate pending payments
  const pendingPayments = monthlyRepayments.filter(repayment => repayment.status === 'pending' || repayment.status === 'delayed');

  // Handle repay now
  const handleRepayNow = (month) => {
    const monthData = monthlyRepayments.find(m => m.month === month);
    setSelectedMonth(month);
    setRepayment({
      month: month,
      amount: monthData.pendingAmount,
      method: 'visa',
      bankSlip: null
    });
    setShowRepayModal(true);
  };

  // Function to mark month as paid (Local state update)
  const markMonthAsPaid = (month, amount, method, bankSlip = null) => {
    setMonthlyRepayments(prev => 
      prev.map(repayment => 
        repayment.month === month 
          ? {
              ...repayment,
              paidAmount: repayment.paidAmount + amount,
              pendingAmount: 0,
              status: 'paid',
              paidDate: new Date(),
              penalty: 0
            }
          : repayment
      )
    );

    // Add to payment history
    const monthData = monthlyRepayments.find(m => m.month === month);
    const newPayment = {
      id: `PAY-${Date.now()}`,
      amount: amount,
      date: new Date(),
      method: method === 'visa' ? 'Visa Card' : 
             method === 'master' ? 'Master Card' : 
             'Bank Transfer',
      receipt: `receipt_${Date.now()}.pdf`,
      status: 'confirmed',
      forMonth: month,
      riceMill: monthData?.riceMill || 'Unknown',
      riceTypes: monthData?.riceTypes || [],
      orders: monthData?.orders || [],
      bankSlip: bankSlip
    };

    setPaymentHistory(prev => [newPayment, ...prev]);
  };

  // Handle file upload for bank slip
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        addNotification('error', 'Please upload a valid file (JPEG, PNG, or PDF)');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        addNotification('error', 'File size should be less than 5MB');
        return;
      }

      setRepayment(prev => ({ ...prev, bankSlip: file }));
      addNotification('success', 'Bank slip uploaded successfully');
    }
  };

  // Handle submit repayment
  const handleSubmitRepayment = (e) => {
    e.preventDefault();
    
    // Validation
    if (repayment.amount <= 0) {
      addNotification('error', 'Please enter a valid payment amount');
      return;
    }

    if (repayment.method === 'bank' && !repayment.bankSlip) {
      addNotification('error', 'Please upload bank transfer slip to continue');
      return;
    }

    // Update local state
    markMonthAsPaid(repayment.month, repayment.amount, repayment.method, repayment.bankSlip);
    
    // Show success notification
    addNotification('success', `Payment of ${formatCurrency(repayment.amount)} for ${repayment.month} saved successfully.`);
    
    // For bank transfer, add additional info
    if (repayment.method === 'bank') {
      addNotification('info', 'Bank transfer proof has been saved. Payment will be confirmed once verified by the rice mill.');
    }
    
    // Close modal
    setShowRepayModal(false);
    
    // Reset form
    setRepayment({
      month: '',
      amount: 0,
      method: 'visa',
      bankSlip: null
    });
  };

  // Get credit score color
  const getCreditScoreColor = (score) => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  // Get reputation badge
  const getReputationBadge = (reputation) => {
    switch(reputation.toLowerCase()) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'average': return 'bg-yellow-100 text-yellow-800';
      case 'risk': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Mock payment methods (removed cheque, added bank transfer)
  const paymentMethods = [
    { id: 'visa', name: 'Visa Card', icon: CreditCardIcon, color: 'text-blue-600', description: 'Pay with your Visa card' },
    { id: 'master', name: 'Master Card', icon: CreditCardIcon, color: 'text-red-600', description: 'Pay with your Master card' },
    { id: 'bank', name: 'Bank Transfer Proof', icon: BanknoteIcon, color: 'text-green-600', description: 'Upload bank transfer slip' }
  ];

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-10">
          <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-3xl shadow-2xl p-12 lg:p-20 text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
            {/* Left Side – Title & Info */}
            <div className="max-w-4xl">
              <div className="flex items-center gap-5 mb-6">
                {/* Icon */}
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center shadow-2xl">
                  <CreditCard className="w-12 h-12 text-white" />
                </div>

                {/* Title */}
                <div>
                  <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-none">
                    Loan Management
                  </h1>
                  <p className="text-purple-100 text-xl mt-2 opacity-90">
                    Credit tied to rice purchases • Monthly repayments • Behavior tracking
                  </p>
                </div>
              </div>

              <p className="text-2xl lg:text-3xl text-purple-50 font-light leading-relaxed max-w-3xl opacity-95">
                Manage your purchase-based credit, track monthly repayments, and maintain your dealer reputation 
                through timely payments.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 1️⃣ Top Overview Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Credit Limit Card */}
        <Card className="rounded-3xl border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-gray-900">Credit Overview</h2>
              <p className="text-gray-600 mt-1">Your approved purchase credit</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
              <CreditCardIcon className="w-7 h-7 text-white" />
            </div>
          </div>

          <div className="space-y-6">
            {/* Credit Limit Progress */}
            <div>
              <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                <span>Credit Usage</span>
                <span>{Math.round((dealerCredit.usedCredit / dealerCredit.approvedLimit) * 100)}% used</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full"
                  style={{ width: `${(dealerCredit.usedCredit / dealerCredit.approvedLimit) * 100}%` }}
                />
              </div>
            </div>

            {/* Credit Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-2xl">
                <p className="text-2xl font-black text-green-700">{formatCurrency(dealerCredit.approvedLimit)}</p>
                <p className="text-sm text-gray-600 mt-1">Approved Credit</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-2xl">
                <p className="text-2xl font-black text-blue-700">{formatCurrency(dealerCredit.usedCredit)}</p>
                <p className="text-sm text-gray-600 mt-1">Used Credit</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-2xl">
                <p className="text-2xl font-black text-purple-700">{formatCurrency(dealerCredit.remainingCredit)}</p>
                <p className="text-sm text-gray-600 mt-1">Remaining Credit</p>
              </div>
            </div>

            {/* Credit Provider Info */}
            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200">
              <div className="flex items-center gap-3">
                <BuildingIcon className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-blue-800">Credit Provider</p>
                  <p className="text-sm text-blue-700">{dealerCredit.creditProvider}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <CalendarIcon className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-blue-800">Credit Expiry</p>
                  <p className="text-sm text-blue-700">{formatDate(dealerCredit.creditExpiry)}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* 7️⃣ Credit Confidence Score */}
        <Card className="rounded-3xl border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-gray-900">Dealer Reputation</h2>
              <p className="text-gray-600 mt-1">Behavior score & payment history</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center">
              <AwardIcon className="w-7 h-7 text-white" />
            </div>
          </div>

          <div className="space-y-6">
            {/* Credit Score */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 mb-2">
                <span className={`px-4 py-2 rounded-full text-sm font-bold ${getCreditScoreColor(dealerCredit.creditScore)}`}>
                  Credit Score: {dealerCredit.creditScore}/100
                </span>
                <span className={`px-4 py-2 rounded-full text-sm font-bold ${getReputationBadge(dealerCredit.reputation)}`}>
                  {dealerCredit.reputation}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-1">
                <div 
                  className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full"
                  style={{ width: `${dealerCredit.creditScore}%` }}
                />
              </div>
            </div>

            {/* Reputation Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircleIcon className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-2xl font-black text-green-700">{dealerCredit.onTimePayments}%</p>
                    <p className="text-sm text-green-600">On-time payments</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-red-50 rounded-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <AlertTriangleIcon className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="text-2xl font-black text-red-700">{dealerCredit.delaysCount}</p>
                    <p className="text-sm text-red-600">Delays</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Metrics */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total amount paid</span>
                <span className="font-bold text-gray-900">{formatCurrency(dealerCredit.totalAmountPaid)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Reputation level</span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(i => (
                    <StarIcon 
                      key={i} 
                      className={`w-5 h-5 ${i <= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Trust Note */}
            <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200">
              <div className="flex items-start gap-3">
                <ShieldIcon className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-purple-800">Trust & Confidence</p>
                  <p className="text-sm text-purple-700 mt-1">
                    Your reputation score helps rice mill owners trust your business. 
                    Maintain timely payments to keep your score high.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* 2️⃣ Purchase-based Loan Table */}
      <Card className="rounded-3xl border border-gray-100 p-8 mb-12">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div>
            <h2 className="text-2xl font-black text-gray-900">Purchase-based Credit Transactions</h2>
            <p className="text-gray-600 mt-1">Every rice purchase using credit becomes a loan transaction</p>
          </div>
          <div className="text-gray-600 flex items-center gap-2">
            <PackageIcon className="w-5 h-5" />
            <span className="font-medium">{purchaseTransactions.length} transactions</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Rice Mill</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Rice Type</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">KG</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Value</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Purchase Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Credit Used</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Due Month</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {purchaseTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium text-gray-900">{transaction.orderId}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">{transaction.riceMill}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">{transaction.riceType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">{transaction.quantity} kg</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{formatCurrency(transaction.value)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">{formatDate(transaction.purchaseDate)}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-bold text-blue-700">{formatCurrency(transaction.creditUsed)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">{transaction.dueMonth}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      transaction.status === 'paid' ? 'bg-green-100 text-green-800' :
                      transaction.status === 'overdue' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            <InfoIcon className="inline w-4 h-4 mr-2" />
            Credit is only provided for rice purchases, not as cash loans. Each purchase transaction becomes a separate credit entry.
          </div>
        </div>
      </Card>

      {/* 3️⃣ Monthly Installment Tracking - UPDATED with Rice Mill info */}
      <div className="mb-12">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div>
            <h2 className="text-2xl font-black text-gray-900">Monthly Installment Tracking</h2>
            <p className="text-gray-600 mt-1">Monthly breakdown of due payments by rice mill</p>
          </div>
          <div className="text-gray-600 flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            <span className="font-medium">{monthlyRepayments.length} months tracked</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {monthlyRepayments.map((repay) => (
            <Card key={repay.month} className="rounded-3xl border border-gray-100 p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{repay.month}</h3>
                  <p className="text-sm text-gray-500 mt-1">Due: {formatDate(repay.dueDate)}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  repay.status === 'paid' ? 'bg-green-100 text-green-800' :
                  repay.status === 'delayed' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {repay.status.charAt(0).toUpperCase() + repay.status.slice(1)}
                </span>
              </div>

              {/* Rice Mill Info - ADDED */}
              <div className="mb-4 p-3 bg-gray-50 rounded-2xl border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <BuildingIcon className="w-4 h-4 text-gray-500" />
                  <span className="font-medium text-gray-700">Rice Mill</span>
                </div>
                <p className="font-bold text-gray-900">{repay.riceMill}</p>
                <div className="flex items-center gap-1 mt-1">
                  <PackageIcon className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-500">{repay.riceTypes.join(', ')}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Due Amount</span>
                  <span className="font-bold text-gray-900">{formatCurrency(repay.dueAmount)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Paid Amount</span>
                  <span className="font-bold text-green-700">{formatCurrency(repay.paidAmount)}</span>
                </div>
                {repay.pendingAmount > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Pending Amount</span>
                    <span className="font-bold text-red-700">{formatCurrency(repay.pendingAmount)}</span>
                  </div>
                )}
                {repay.penalty > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Penalty</span>
                    <span className="font-bold text-red-700">+{formatCurrency(repay.penalty)}</span>
                  </div>
                )}
              </div>

              {repay.status === 'pending' || repay.status === 'delayed' ? (
                <Button 
                  fullWidth 
                  className="mt-6 rounded-2xl py-3"
                  onClick={() => handleRepayNow(repay.month)}
                >
                  Pay to {repay.riceMill}
                </Button>
              ) : (
                <div className="mt-6 p-3 bg-green-50 rounded-2xl border border-green-200">
                  <div className="flex items-center gap-2 text-green-700">
                    <CheckIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">Paid to {repay.riceMill}</span>
                  </div>
                  <p className="text-xs text-green-600 mt-1">on {formatDate(repay.paidDate)}</p>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* 4️⃣ Payment History & 5️⃣ Pending Payments - UPDATED with Rice Mill info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Payment History - UPDATED */}
        <Card className="rounded-3xl border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-gray-900">Payment History</h2>
              <p className="text-gray-600 mt-1">All confirmed payments to rice mills</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center">
              <ReceiptIcon className="w-7 h-7 text-white" />
            </div>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {paymentHistory.map((payment) => (
              <div key={payment.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-medium text-gray-900">{payment.forMonth}</p>
                    <p className="text-sm text-gray-500 mt-1">{formatDate(payment.date)}</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold">
                    {payment.status}
                  </span>
                </div>
                
                {/* Rice Mill Info - ADDED */}
                <div className="mb-3 p-3 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-2 mb-1">
                    <BuildingIcon className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-blue-700">Paid to:</span>
                  </div>
                  <p className="font-bold text-blue-800">{payment.riceMill}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <PackageIcon className="w-3 h-3 text-blue-400" />
                    <span className="text-xs text-blue-600">{payment.riceTypes.join(', ')}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <CreditCardIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{payment.method}</span>
                    {payment.bankSlip && (
                      <span className="text-xs text-green-600 flex items-center gap-1">
                        <UploadIcon className="w-3 h-3" />
                        Slip attached
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-gray-900">{formatCurrency(payment.amount)}</span>
                    <button 
                      className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg"
                      onClick={() => addNotification('info', `Downloading receipt: ${payment.receipt}`)}
                    >
                      <DownloadIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <Button variant="outline" className="rounded-2xl">
              View Full Payment History
            </Button>
          </div>
        </Card>

        {/* Pending Payments - UPDATED */}
        <Card className="rounded-3xl border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-gray-900">Pending Payments</h2>
              <p className="text-gray-600 mt-1">Unpaid months by rice mill</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center">
              <ClockIcon className="w-7 h-7 text-white" />
            </div>
          </div>

          {pendingPayments.length === 0 ? (
            <div className="text-center py-12">
              <CheckCircleIcon className="w-16 h-16 text-green-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg font-medium">All payments are up to date!</p>
              <p className="text-gray-400 mt-2">No pending payments at this time.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingPayments.map((pending) => (
                <div key={pending.month} className="p-4 bg-red-50 rounded-2xl border border-red-200">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-bold text-gray-900">{pending.month}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Due by {formatDate(pending.dueDate)} • {pending.status === 'delayed' ? 'Overdue' : 'Pending'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-red-700">{formatCurrency(pending.pendingAmount)}</p>
                      {pending.penalty > 0 && (
                        <p className="text-sm text-red-600">+{formatCurrency(pending.penalty)} penalty</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Rice Mill Info - ADDED */}
                  <div className="mb-4 p-3 bg-white rounded-xl border border-red-300">
                    <div className="flex items-center gap-2 mb-1">
                      <BuildingIcon className="w-4 h-4 text-red-600" />
                      <span className="font-medium text-red-700">Pay to:</span>
                    </div>
                    <p className="font-bold text-red-800">{pending.riceMill}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <PackageIcon className="w-3 h-3 text-red-400" />
                      <span className="text-xs text-red-600">{pending.riceTypes.join(', ')}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <ReceiptIcon className="w-3 h-3 text-red-400" />
                      <span className="text-xs text-red-500">Orders: {pending.orders.join(', ')}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      variant="outline" 
                      className="rounded-2xl py-3"
                      onClick={() => addNotification('info', `Invoice for ${pending.month} from ${pending.riceMill} will be emailed.`)}
                    >
                      Get Invoice
                    </Button>
                    <Button 
                      className="rounded-2xl py-3"
                      onClick={() => handleRepayNow(pending.month)}
                    >
                      Pay to {pending.riceMill}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 6️⃣ Repay Now CTA */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="text-center">
              <p className="text-gray-600 mb-4">Ready to make a payment?</p>
              <Button 
                size="lg" 
                className="rounded-2xl px-8 py-4"
                onClick={() => {
                  const firstPending = pendingPayments[0];
                  if (firstPending) {
                    handleRepayNow(firstPending.month);
                  } else {
                    addNotification('info', 'All payments are up to date!');
                  }
                }}
              >
                <BanknoteIcon className="w-5 h-5 mr-2" />
                Make Payment Now
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* 6️⃣ Repay Now Modal - UPDATED with realistic payment methods */}
      <Modal 
        isOpen={showRepayModal} 
        onClose={() => setShowRepayModal(false)} 
        title="Make Payment"
        size="lg"
      >
        <form onSubmit={handleSubmitRepayment} className="space-y-8">
          {/* Selected Month with Rice Mill Info */}
          {selectedMonth && (
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <CalendarIcon className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-700">Selected Month</p>
                    <p className="text-2xl font-black text-gray-900">{selectedMonth}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Amount Due</p>
                  <p className="text-3xl font-black text-green-700">{formatCurrency(repayment.amount)}</p>
                </div>
              </div>
              
              {/* Show Rice Mill info for selected month */}
              {(() => {
                const monthData = monthlyRepayments.find(m => m.month === selectedMonth);
                if (monthData) {
                  return (
                    <div className="mt-4 p-4 bg-blue-50 rounded-2xl border border-blue-200">
                      <div className="flex items-center gap-3 mb-2">
                        <BuildingIcon className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-blue-800">Payment to Rice Mill</p>
                          <p className="text-lg font-bold text-blue-900">{monthData.riceMill}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <PackageIcon className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-blue-700">For: {monthData.riceTypes.join(', ')}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <ReceiptIcon className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-blue-700">Orders: {monthData.orders.join(', ')}</span>
                      </div>
                    </div>
                  );
                }
                return null;
              })()}
            </div>
          )}

          {/* Payment Method Selection */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-6">Select Payment Method</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {paymentMethods.map((method) => (
                <div 
                  key={method.id}
                  className={`p-6 border-2 rounded-2xl cursor-pointer transition-all ${
                    repayment.method === method.id 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setRepayment({...repayment, method: method.id, bankSlip: null})}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <method.icon className={`w-8 h-8 ${method.color}`} />
                      <h4 className="font-bold text-gray-900">{method.name}</h4>
                    </div>
                    {repayment.method === method.id && (
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckIcon className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{method.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Details Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Amount</label>
              <div className="relative">
                <DollarSignIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="number" 
                  value={repayment.amount}
                  onChange={e => setRepayment({...repayment, amount: parseFloat(e.target.value) || 0})}
                  min="1"
                  required
                  className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg font-medium"
                />
              </div>
            </div>

            {/* Bank Transfer Proof Upload */}
            {repayment.method === 'bank' && (
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6">
                <div className="text-center mb-4">
                  <UploadIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-700 font-medium mb-2">Upload Bank Transfer Slip</p>
                  <p className="text-gray-500 text-sm mb-4">
                    Upload screenshot or scan of your bank transfer confirmation
                  </p>
                  
                  {repayment.bankSlip ? (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileTextIcon className="w-5 h-5 text-green-600" />
                          <div>
                            <p className="font-medium text-green-800">{repayment.bankSlip.name}</p>
                            <p className="text-xs text-green-600">
                              {(repayment.bankSlip.size / 1024).toFixed(2)} KB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setRepayment(prev => ({...prev, bankSlip: null}))}
                          className="text-red-500 hover:text-red-700"
                        >
                          <XIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <input
                        type="file"
                        id="bank-slip-upload"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <label htmlFor="bank-slip-upload">
                        <Button 
                          type="button"
                          variant="outline" 
                          className="rounded-2xl cursor-pointer"
                        >
                          <UploadIcon className="w-4 h-4 mr-2" />
                          Choose File
                        </Button>
                      </label>
                      <p className="text-xs text-gray-400 mt-3">
                        Accepted formats: JPG, PNG, PDF (Max 5MB)
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Bank Transfer Instructions */}
                <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <h4 className="font-medium text-blue-800 mb-2">Bank Transfer Instructions:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Transfer amount to the rice mill's bank account</li>
                    <li>• Use your Dealer ID as reference</li>
                    <li>• Upload the transfer confirmation slip</li>
                    <li>• Payment will be verified within 24 hours</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Card Payment Note */}
            {(repayment.method === 'visa' || repayment.method === 'master') && (
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                <div className="flex items-start gap-3">
                  <InfoIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-800">Mock Payment Processing</p>
                    <p className="text-sm text-blue-700 mt-1">
                      This is a frontend simulation. In a real implementation, you would be redirected to 
                      a secure payment gateway (Stripe/PayHere) for card processing.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Terms */}
            <div className="bg-yellow-50 rounded-2xl p-6 border border-yellow-200">
              <div className="flex items-start gap-3">
                <AlertTriangleIcon className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-yellow-800">Payment Terms</p>
                  <ul className="mt-2 space-y-1 text-sm text-yellow-700">
                    <li>• Payments update your local state immediately</li>
                    <li>• Receipt will be available in payment history</li>
                    <li>• Late payments affect your credit score</li>
                    <li>• Bank transfers require proof upload</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                setShowRepayModal(false);
                setRepayment({
                  month: '',
                  amount: 0,
                  method: 'visa',
                  bankSlip: null
                });
              }} 
              className="rounded-2xl px-8"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              size="lg"
              className="rounded-2xl px-12 py-4 font-bold"
              disabled={repayment.method === 'bank' && !repayment.bankSlip}
            >
              <ArrowRightIcon className="w-5 h-5 mr-2" />
              {repayment.method === 'bank' ? 'Save Payment Proof' : 'Simulate Payment'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default LoanManagement;