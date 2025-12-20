import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  Menu as MenuIcon,
  X as XIcon,
  Home,
  Package,
  Truck,
  CreditCard,
  History,
  User,
  LogOut,
  ChevronDown,
} from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Place Order', path: '/place-order', icon: Package },
    { name: 'Track Delivery', path: '/delivery-tracking', icon: Truck },
    { name: 'Loans', path: '/loan-management', icon: CreditCard },
    { name: 'Order History', path: '/order-history', icon: History },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Premium Glass Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-black text-xl"></span>
              </div>
              <span className="text-2xl font-black text-gray-900 tracking-tight">
                RiceMill<span className="text-green-600">.</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-green-600 text-white shadow-lg'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                    {isActive && (
                      <div className="absolute inset-x-4 bottom-1 h-1 bg-white rounded-full opacity-30" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Desktop Auth / Profile */}
            <div className="hidden lg:flex items-center gap-4">
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold shadow-md">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500">Dealer Account</p>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                      <div className="p-4 border-b border-gray-100">
                        <p className="font-semibold text-gray-900">{user?.name}</p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                      </div>
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <User className="w-5 h-5 text-gray-600" />
                        <span>Your Profile</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-5 py-4 hover:bg-red-50 text-red-600 w-full text-left transition"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Login
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition"
            >
              <MenuIcon className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-bold text-gray-900">Menu</h3>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <XIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${
                      isActive
                        ? 'bg-green-600 text-white shadow-md'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="font-medium text-lg">{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Mobile Auth Section */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t bg-gray-50">
              {isAuthenticated ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{user?.name}</p>
                      <p className="text-sm text-gray-500">Active Dealer</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-2xl shadow-lg transition"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    navigate('/login');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl shadow-lg transition"
                >
                  Login to Continue
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;