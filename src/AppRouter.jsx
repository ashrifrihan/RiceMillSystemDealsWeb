// src/AppRouter.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register'; // Add this import
import RegisterSuccess from './pages/RegisterSuccess'; // Add this import
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { CartProvider } from './contexts/CartContext';
import Layout from './components/layout/Layout';
import DeliveryTracking from './pages/DeliveryTracking';
import LoanManagement from './pages/LoanManagement';
import OrderHistory from './pages/OrderHistory';
import PlaceOrder from './pages/PlaceOrder';
import HomePage from './pages/HomePage';
import Profile from './pages/Profile';

// PrivateRoute component inside to access context
function PrivateRoute() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

// PublicOnlyRoute - for login/register when already authenticated
function PublicOnlyRoute() {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <CartProvider>
            <Routes>
              {/* Public routes - only accessible when NOT logged in */}
              <Route element={<PublicOnlyRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/register-success" element={<RegisterSuccess />} />
              </Route>

              {/* Private routes - only accessible when logged in */}
              <Route element={<PrivateRoute />}>
                <Route element={<Layout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/delivery-tracking" element={<DeliveryTracking />} />
                  <Route path="/loan-management" element={<LoanManagement />} />
                  <Route path="/order-history" element={<OrderHistory />} />
                  <Route path="/place-order" element={<PlaceOrder />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
              </Route>

              {/* Redirect root based on auth status */}
              <Route 
                path="/" 
                element={
                  <Navigate 
                    to={localStorage.getItem("user") ? "/" : "/login"} 
                    replace 
                  /> 
                } 
              />
            </Routes>
          </CartProvider>
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}