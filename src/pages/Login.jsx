// C:\Users\RIHAN\Desktop\dealers - web\src\pages\Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useNotification } from "../contexts/NotificationContext";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();
  const { addNotification } = useNotification();

  const isFormValid = email.trim() && password.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const cleanedEmail = email.trim().toLowerCase();
    const cleanedPassword = password.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanedEmail)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      const result = await login(cleanedEmail, cleanedPassword);
      
      if (result.success) {
        addNotification("success", `Welcome back, ${result.user.name || "User"}!`);
        
        // Get user role
        const userRole = result.user.role;
        
        // 🔥 ROLE-BASED REDIRECTION
        if (userRole === "owner" || userRole === "mill_owner") {
          // ⭐️ OWNER → GO TO OWNER APP (Port 5174)
          window.location.href = "http://localhost:5174/dashboard";
          return;
        }
        
        if (userRole === "dealer") {
          // ⭐️ DEALER → STAY IN DEALER APP
          navigate("/");
          return;
        }
        
        // If other roles (driver, admin, etc.)
        setError("Unauthorized role. Please contact administrator.");
        addNotification("error", "Your account role is not authorized.");
        
      } else {
        setError(result.message || "Invalid email or password");
        addNotification("error", result.message || "Login failed.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      addNotification("error", "Login failed due to a system error.");
    } finally {
      setIsLoading(false);
    }
  };

  // Demo login function (for testing without Firebase)
  const handleDemoLogin = (role) => {
    if (role === "owner") {
      setEmail("owner@ricemill.com");
      setPassword("owner123");
    } else {
      setEmail("dealer@example.com");
      setPassword("dealer123");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row overflow-hidden">
      {/* Left Hero – Desktop Only */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative bg-gradient-to-br from-green-700 via-green-600 to-emerald-800">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 -left-32 w-96 h-96 bg-green-500/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 -right-32 w-96 h-96 bg-emerald-400/30 rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center items-start p-16 text-white">
          <div className="mb-12">
            <h1 className="text-5xl font-black tracking-tighter">Rice Mill</h1>
            <p className="text-2xl font-light text-green-100 mt-2">Management System</p>
          </div>

          <h2 className="text-5xl font-bold leading-tight">
            Login into<br />your account
          </h2>
          <p className="text-xl text-green-100 mt-6 opacity-90">
            Manage your rice business with precision and ease.
          </p>
        </div>
      </div>

      {/* Right Side – Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-10">
            <h1 className="text-4xl font-black text-green-600">Rice Mill</h1>
            <p className="text-green-700 mt-2">Management System</p>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10 border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Welcome Back</h2>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl border border-gray-300 focus:border-green-600 focus:ring-4 focus:ring-green-600/20 transition-all duration-300 placeholder-gray-400"
                  placeholder="email@example.com"
                  autoComplete="email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-5 py-4 pr-12 rounded-2xl border border-gray-300 focus:border-green-600 focus:ring-4 focus:ring-green-600/20 transition-all duration-300 placeholder-gray-400"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-green-600 rounded focus:ring-green-500" />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-green-600 font-medium hover:text-green-700 transition"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={!isFormValid || isLoading}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:hover:translate-y-0"
              >
                {isLoading ? "Signing in..." : "Login"}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <button
                  onClick={() => navigate("/register")}
                  className="text-green-600 hover:text-green-700 font-medium transition"
                >
                  Register here
                </button>
              </p>
            </div>

            {/* Demo Accounts Section */}
            <div className="mt-8 p-6 bg-green-50 rounded-2xl border-2 border-dashed border-green-300">
              <p className="text-center font-bold text-green-800 text-sm mb-3">Quick Test Accounts</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-green-700">Mill Owner</p>
                    <p className="text-xs text-green-600">Full access to all features</p>
                  </div>
                  <button
                    onClick={() => handleDemoLogin("owner")}
                    className="px-3 py-1 text-xs bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Fill & Login
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-green-700">Rice Dealer</p>
                    <p className="text-xs text-green-600">Place orders, track deliveries</p>
                  </div>
                  <button
                    onClick={() => handleDemoLogin("dealer")}
                    className="px-3 py-1 text-xs bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Fill & Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;