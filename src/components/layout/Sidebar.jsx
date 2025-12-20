import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, ShoppingCartIcon, TruckIcon, HistoryIcon, CreditCardIcon, UserIcon, BarChart2Icon, UsersIcon, SettingsIcon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
const Sidebar = ({
  isMobileOpen,
  setIsMobileOpen
}) => {
  const {
    user
  } = useAuth();
  const isAdmin = user?.role === 'admin';
  const navItems = [{
    path: '/',
    label: 'Home',
    icon: <HomeIcon className="w-5 h-5" />
  }, {
    path: '/place-order',
    label: 'Place Order',
    icon: <ShoppingCartIcon className="w-5 h-5" />
  }, {
    path: '/loan-management',
    label: 'Loan Management',
    icon: <CreditCardIcon className="w-5 h-5" />
  }, {
    path: '/delivery-tracking',
    label: 'Delivery Tracking',
    icon: <TruckIcon className="w-5 h-5" />
  }, {
    path: '/order-history',
    label: 'Order History',
    icon: <HistoryIcon className="w-5 h-5" />
  }];
  const adminItems = [{
    path: '/dashboard',
    label: 'Dashboard',
    icon: <BarChart2Icon className="w-5 h-5" />
  }, {
    path: '/users',
    label: 'User Management',
    icon: <UsersIcon className="w-5 h-5" />
  }, {
    path: '/settings',
    label: 'System Settings',
    icon: <SettingsIcon className="w-5 h-5" />
  }];
  const allItems = isAdmin ? [...navItems, ...adminItems] : navItems;
  const closeSidebar = () => {
    if (isMobileOpen) {
      setIsMobileOpen(false);
    }
  };
  return <aside className={`bg-white border-r border-gray-200 z-30 h-full`}>
      <div className="h-full flex flex-col justify-between">
        <div className="px-3 py-4">
          <div className="mb-8 px-4">
            <h2 className="text-xl font-bold text-green-600">Rice Mill</h2>
            <p className="text-xs text-gray-500">Management System</p>
          </div>
          <div className="space-y-1">
            {allItems.map(item => <NavLink key={item.path} to={item.path} onClick={closeSidebar} className={({
            isActive
          }) => `flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${isActive ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </NavLink>)}
          </div>
        </div>
        <div className="p-4 border-t border-gray-200">
          <NavLink to="/profile" onClick={closeSidebar} className={({
          isActive
        }) => `flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${isActive ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-100'}`}>
            <span className="mr-3">
              <UserIcon className="w-5 h-5" />
            </span>
            Profile
          </NavLink>
        </div>
      </div>
    </aside>;
};
export default Sidebar;