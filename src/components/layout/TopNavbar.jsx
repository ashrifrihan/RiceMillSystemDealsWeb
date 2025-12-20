import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BellIcon, UserIcon, ShoppingCartIcon, SearchIcon, MenuIcon, XIcon, LogOutIcon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useNotification } from '../../contexts/NotificationContext';
import Button from '../ui/Button';
const TopNavbar = ({
  toggleSidebar
}) => {
  const {
    user,
    logout
  } = useAuth();
  const {
    items,
    getTotalItems
  } = useCart();
  const {
    notifications,
    markAsRead,
    markAllAsRead,
    getUnreadCount
  } = useNotification();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = event => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  const handleSearch = e => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Implement search functionality here
  };
  return <header className="bg-white border-b border-gray-200 z-40">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section */}
          <div className="flex items-center">
            <button onClick={toggleSidebar} className="mr-2 text-gray-500 focus:outline-none lg:hidden">
              <MenuIcon className="h-6 w-6" />
            </button>
            <Link to="/" className="flex items-center lg:hidden">
              <span className="text-xl font-bold text-green-600">Rice Mill</span>
            </Link>
          </div>
          {/* Center - Search */}
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <form onSubmit={handleSearch} className="relative">
              <input type="text" placeholder="Search..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" />
              <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </form>
          </div>
          {/* Right section */}
          <div className="flex items-center space-x-4">
            <Link to="/place-order" className="relative p-1.5 text-gray-500 hover:text-green-600">
              <ShoppingCartIcon className="h-6 w-6" />
              {getTotalItems() > 0 && <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {getTotalItems()}
                </span>}
            </Link>
            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button onClick={() => setShowNotifications(!showNotifications)} className="p-1.5 text-gray-500 hover:text-green-600 relative">
                <BellIcon className="h-6 w-6" />
                {getUnreadCount() > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {getUnreadCount()}
                  </span>}
              </button>
              {showNotifications && <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-50 border border-gray-200">
                  <div className="p-3 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="font-medium text-gray-700">Notifications</h3>
                    <button onClick={() => markAllAsRead()} className="text-xs text-green-600 hover:text-green-800">
                      Mark all as read
                    </button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? notifications.map(notification => <div key={notification.id} onClick={() => markAsRead(notification.id)} className={`p-3 border-b border-gray-100 cursor-pointer ${!notification.read ? 'bg-blue-50' : 'bg-white'}`}>
                          <div className="flex items-start">
                            <div className={`p-1.5 rounded-full ${notification.type === 'success' ? 'bg-green-100 text-green-600' : notification.type === 'error' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'} mr-3`}>
                              {notification.type === 'success' ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg> : notification.type === 'error' ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg> : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>}
                            </div>
                            <div>
                              <p className="text-sm text-gray-800">{notification.message}</p>
                              <p className="text-xs text-gray-500 mt-1">Just now</p>
                            </div>
                          </div>
                        </div>) : <div className="p-4 text-center text-gray-500">
                        No notifications
                      </div>}
                  </div>
                </div>}
            </div>
            {/* Profile dropdown */}
            <div className="relative" ref={profileRef}>
              <button onClick={() => setShowProfileMenu(!showProfileMenu)} className="flex items-center text-gray-700 hover:text-green-600">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <UserIcon className="h-5 w-5 text-gray-600" />
                </div>
                <span className="ml-2 text-sm font-medium hidden lg:block">
                  {user?.name || 'User'}
                </span>
              </button>
              {showProfileMenu && <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-50 border border-gray-200">
                  <div className="p-3 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-800">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <div className="py-1">
                    <Link to="/profile" onClick={() => setShowProfileMenu(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Your Profile
                    </Link>
                    <button onClick={handleLogout} className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                      <LogOutIcon className="h-4 w-4 mr-2" />
                      Sign out
                    </button>
                  </div>
                </div>}
            </div>
          </div>
        </div>
      </div>
    </header>;
};
export default TopNavbar;