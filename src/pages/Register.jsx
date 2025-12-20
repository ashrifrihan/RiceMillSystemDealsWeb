import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useNotification } from "../contexts/NotificationContext";
import { 
  Eye, 
  EyeOff, 
  Upload, 
  Check, 
  ArrowLeft, 
  ArrowRight, 
  User, 
  Building, 
  CheckCircle,
  Shield,
  FileText,
  BadgeCheck,
  CreditCard,
  Users,
  Store,
  Package,
  Truck,
  Mail,
  Phone,
  Lock,
  AlertCircle
} from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotification();

  // Form state
  const [step, setStep] = useState(1);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form data
  const [form, setForm] = useState({
    name: "",
    email: "",
    pass: "",
    confirmPass: "",
    phone: "",
    role: "",
    nic: "",
    nicFront: null,
    nicBack: null,
    businessName: "",
    millName: "",
    agree: false
  });

  const updateForm = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  // Validation functions
  const validateStep1 = () => {
    if (!form.name.trim()) {
      addNotification("error", "Please enter your full name");
      return false;
    }
    if (!form.email.trim()) {
      addNotification("error", "Please enter your email address");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      addNotification("error", "Please enter a valid email address");
      return false;
    }
    if (!form.pass.trim()) {
      addNotification("error", "Please create a password");
      return false;
    }
    if (form.pass.length < 6) {
      addNotification("error", "Password must be at least 6 characters");
      return false;
    }
    if (form.pass !== form.confirmPass) {
      addNotification("error", "Passwords don't match");
      return false;
    }
    if (!form.phone.trim()) {
      addNotification("error", "Please enter your phone number");
      return false;
    }
    if (!form.role) {
      addNotification("error", "Please select your role");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!form.nic.trim()) {
      addNotification("error", "Please enter your NIC number");
      return false;
    }
    if (!form.nicFront) {
      addNotification("error", "Please upload NIC front photo");
      return false;
    }
    if (!form.nicBack) {
      addNotification("error", "Please upload NIC back photo");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    
    setStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async () => {
    if (!form.agree) {
      addNotification("error", "Please agree to terms and conditions");
      return;
    }

    setIsLoading(true);
     await new Promise(r => setTimeout(r, 1500));
  addNotification("success", "Application submitted! Check email soon.");
  navigate("/register-success"); // This should navigate to your success page
  setLoading(false);    
    // Simulate API call
    setTimeout(() => {
      addNotification("success", `Registration successful! Welcome ${form.name}`);
      setIsLoading(false);
      navigate("/login");
    }, 2000);
  };

  // Role descriptions
  const roleDescriptions = {
    dealer: {
      title: "Rice Dealer",
      icon: Truck,
      color: "from-blue-500 to-cyan-600",
      description: "Buy rice from mills and sell to customers"
    },
    owner: {
      title: "Mill Owner",
      icon: Building,
      color: "from-emerald-500 to-green-600",
      description: "Sell rice directly from your mill"
    },
    both: {
      title: "Both Roles",
      icon: Users,
      color: "from-purple-500 to-pink-600",
      description: "Operate as both mill owner and dealer"
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row overflow-hidden">
      {/* Left Hero – Desktop Only (Matches Login Design) */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative bg-gradient-to-br from-green-700 via-green-600 to-emerald-800">
        {/* Floating Orbs – Same as Login */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 -left-32 w-96 h-96 bg-green-500/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 -right-32 w-96 h-96 bg-emerald-400/30 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-green-600/20 rounded-full blur-3xl animate-float-slow"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center items-start p-16 text-white">
          <div className="mb-12">
            <h1 className="text-5xl font-black tracking-tighter">Rice Mill</h1>
            <p className="text-2xl font-light text-green-100 mt-2">Business Network</p>
          </div>

          <h2 className="text-5xl font-bold leading-tight">
            Join Sri Lanka's<br />Premium Rice Network
          </h2>
          <p className="text-xl text-green-100 mt-6 opacity-90">
            Connect with trusted mills and dealers. Get credit facilities.<br />
            Grow your rice business.
          </p>

          {/* Features List */}
          <div className="mt-12 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-lg">Purchase Credit</p>
                <p className="text-green-100 opacity-90">Get pay-later facilities for trusted dealers</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-lg">Verified Network</p>
                <p className="text-green-100 opacity-90">All members are verified and trusted</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <BadgeCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-lg">Live Tracking</p>
                <p className="text-green-100 opacity-90">Real-time order and delivery tracking</p>
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mt-16 w-full max-w-md">
            <div className="flex justify-between mb-3">
              <span className="text-green-200 font-medium">Step {step} of 3</span>
              <span className="text-green-200 font-medium">
                {step === 1 && "Account Setup"}
                {step === 2 && "Document Upload"}
                {step === 3 && "Review & Submit"}
              </span>
            </div>
            <div className="h-2 bg-green-900/50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-400 rounded-full transition-all duration-500"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
            <div className="flex justify-between mt-4 text-sm text-green-200">
              <span className={step >= 1 ? "font-bold" : ""}>Account</span>
              <span className={step >= 2 ? "font-bold" : ""}>Documents</span>
              <span className={step >= 3 ? "font-bold" : ""}>Finish</span>
            </div>
          </div>

          <div className="absolute bottom-8 left-16 text-green-200 text-sm">
            © 2025 Rice Mill Management. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right Side – Registration Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-gray-50">
        <div className="w-full max-w-lg">
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-4xl font-black text-green-600">Rice Mill</h1>
            <p className="text-green-700 mt-2">Business Network</p>
            
            {/* Mobile Progress */}
            <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between text-sm font-medium mb-2">
                <span>Account</span>
                <span>Documents</span>
                <span>Finish</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-600 rounded-full transition-all duration-500"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-3">
                Step {step} of 3 • {step === 1 && "Account Setup"}
                {step === 2 && "Document Upload"}
                {step === 3 && "Review & Submit"}
              </p>
            </div>
          </div>

          {/* Registration Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10 border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">
                {step === 1 && "Create Your Account"}
                {step === 2 && "Verify Your Identity"}
                {step === 3 && "Review & Submit"}
              </h2>
              <p className="text-gray-600 mt-2">
                {step === 1 && "Join Sri Lanka's premium rice business network"}
                {step === 2 && "Upload documents for verification"}
                {step === 3 && "Confirm your registration details"}
              </p>
            </div>

            {/* Step 1: Account Setup */}
            {step === 1 && (
              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="inline w-4 h-4 mr-2" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => updateForm("name", e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl border border-gray-300 focus:border-green-600 focus:ring-4 focus:ring-green-600/20 transition-all duration-300 placeholder-gray-400"
                    placeholder="John Perera"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="inline w-4 h-4 mr-2" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => updateForm("email", e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl border border-gray-300 focus:border-green-600 focus:ring-4 focus:ring-green-600/20 transition-all duration-300 placeholder-gray-400"
                    placeholder="john@ricedealer.com"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Lock className="inline w-4 h-4 mr-2" />
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPass ? "text" : "password"}
                      value={form.pass}
                      onChange={(e) => updateForm("pass", e.target.value)}
                      className="w-full px-5 py-4 pr-12 rounded-2xl border border-gray-300 focus:border-green-600 focus:ring-4 focus:ring-green-600/20 transition-all duration-300 placeholder-gray-400"
                      placeholder="Create a strong password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPass ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Must be at least 6 characters</p>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Lock className="inline w-4 h-4 mr-2" />
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPass ? "text" : "password"}
                      value={form.confirmPass}
                      onChange={(e) => updateForm("confirmPass", e.target.value)}
                      className="w-full px-5 py-4 pr-12 rounded-2xl border border-gray-300 focus:border-green-600 focus:ring-4 focus:ring-green-600/20 transition-all duration-300 placeholder-gray-400"
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPass(!showConfirmPass)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPass ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="inline w-4 h-4 mr-2" />
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateForm("phone", e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl border border-gray-300 focus:border-green-600 focus:ring-4 focus:ring-green-600/20 transition-all duration-300 placeholder-gray-400"
                    placeholder="07X XXX XXXX"
                  />
                </div>

                {/* Role Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Select Your Role
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(roleDescriptions).map(([key, role]) => {
                      const Icon = role.icon;
                      const isSelected = form.role === key;
                      
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => updateForm("role", key)}
                          className={`p-5 rounded-2xl border-2 transition-all duration-300 ${
                            isSelected
                              ? `border-green-500 bg-gradient-to-br ${role.color} text-white`
                              : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
                          }`}
                        >
                          <Icon className={`h-10 w-10 mx-auto mb-3 ${isSelected ? 'text-white' : 'text-gray-400'}`} />
                          <p className="font-bold text-sm mb-1">{role.title}</p>
                          <p className="text-xs opacity-90">{role.description}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Document Upload */}
            {step === 2 && (
              <div className="space-y-6">
                {/* NIC Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FileText className="inline w-4 h-4 mr-2" />
                    NIC Number
                  </label>
                  <input
                    type="text"
                    value={form.nic}
                    onChange={(e) => updateForm("nic", e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl border border-gray-300 focus:border-green-600 focus:ring-4 focus:ring-green-600/20 transition-all duration-300 placeholder-gray-400"
                    placeholder="199XXXXXXXXX"
                  />
                </div>

                {/* NIC Front Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    NIC Front Photo
                  </label>
                  <label className={`block rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer hover:border-green-500 ${
                    form.nicFront ? 'border-green-500 bg-green-50' : 'border-gray-300'
                  }`}>
                    <div className="p-8 text-center">
                      {form.nicFront ? (
                        <div className="space-y-3">
                          <Check className="h-12 w-12 text-green-600 mx-auto" />
                          <p className="font-medium text-green-800">{form.nicFront.name}</p>
                          <p className="text-sm text-green-600">
                            {(form.nicFront.size / 1024).toFixed(2)} KB
                          </p>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              updateForm("nicFront", null);
                            }}
                            className="text-sm text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                          <p className="font-medium text-gray-700">Upload NIC Front Photo</p>
                          <p className="text-sm text-gray-500">JPG, PNG, or PDF (Max 5MB)</p>
                        </div>
                      )}
                      <input
                        type="file"
                        className="hidden"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(e) => updateForm("nicFront", e.target.files[0])}
                      />
                    </div>
                  </label>
                </div>

                {/* NIC Back Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    NIC Back Photo
                  </label>
                  <label className={`block rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer hover:border-green-500 ${
                    form.nicBack ? 'border-green-500 bg-green-50' : 'border-gray-300'
                  }`}>
                    <div className="p-8 text-center">
                      {form.nicBack ? (
                        <div className="space-y-3">
                          <Check className="h-12 w-12 text-green-600 mx-auto" />
                          <p className="font-medium text-green-800">{form.nicBack.name}</p>
                          <p className="text-sm text-green-600">
                            {(form.nicBack.size / 1024).toFixed(2)} KB
                          </p>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              updateForm("nicBack", null);
                            }}
                            className="text-sm text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                          <p className="font-medium text-gray-700">Upload NIC Back Photo</p>
                          <p className="text-sm text-gray-500">JPG, PNG, or PDF (Max 5MB)</p>
                        </div>
                      )}
                      <input
                        type="file"
                        className="hidden"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(e) => updateForm("nicBack", e.target.files[0])}
                      />
                    </div>
                  </label>
                </div>

                {/* Conditional Fields */}
                <div className="space-y-4">
                  {(form.role === "dealer" || form.role === "both") && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Store className="inline w-4 h-4 mr-2" />
                        Business Name (Dealer)
                      </label>
                      <input
                        type="text"
                        value={form.businessName}
                        onChange={(e) => updateForm("businessName", e.target.value)}
                        className="w-full px-5 py-4 rounded-2xl border border-gray-300 focus:border-green-600 focus:ring-4 focus:ring-green-600/20 transition-all duration-300"
                        placeholder="Perera Rice Traders"
                      />
                    </div>
                  )}

                  {(form.role === "owner" || form.role === "both") && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Building className="inline w-4 h-4 mr-2" />
                        Rice Mill Name (Owner)
                      </label>
                      <input
                        type="text"
                        value={form.millName}
                        onChange={(e) => updateForm("millName", e.target.value)}
                        className="w-full px-5 py-4 rounded-2xl border border-gray-300 focus:border-green-600 focus:ring-4 focus:ring-green-600/20 transition-all duration-300"
                        placeholder="Green Valley Rice Mill"
                      />
                    </div>
                  )}
                </div>

                {/* Info Box */}
                <div className="p-6 bg-blue-50 rounded-2xl border border-blue-200">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-800">Verification Process</p>
                      <p className="text-sm text-blue-700 mt-2">
                        All documents are verified manually within 24-48 hours. You'll receive email and SMS notifications once your account is approved. This ensures a trusted and secure network for all members.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Review & Submit */}
            {step === 3 && (
              <div className="space-y-6">
                {/* Success Preview */}
                <div className="p-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl text-center text-white">
                  <CheckCircle className="h-16 w-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Ready to Join!</h3>
                  <p className="opacity-90">
                    Your account is ready for verification. Review your details below.
                  </p>
                </div>

                {/* Details Summary */}
                <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between border-b pb-3">
                    <span className="text-gray-600 font-medium">Full Name</span>
                    <span className="font-bold text-gray-900">{form.name}</span>
                  </div>
                  <div className="flex items-center justify-between border-b pb-3">
                    <span className="text-gray-600 font-medium">Email</span>
                    <span className="font-bold text-gray-900">{form.email}</span>
                  </div>
                  <div className="flex items-center justify-between border-b pb-3">
                    <span className="text-gray-600 font-medium">Phone</span>
                    <span className="font-bold text-gray-900">{form.phone}</span>
                  </div>
                  <div className="flex items-center justify-between border-b pb-3">
                    <span className="text-gray-600 font-medium">Role</span>
                    <span className="font-bold text-gray-900 capitalize">{form.role}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 font-medium">NIC</span>
                    <span className="font-bold text-gray-900">{form.nic}</span>
                  </div>
                </div>

                {/* Terms Agreement */}
                <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="agree"
                      checked={form.agree}
                      onChange={(e) => updateForm("agree", e.target.checked)}
                      className="mt-1 h-5 w-5 text-green-600 rounded focus:ring-green-500"
                    />
                    <div>
                      <label htmlFor="agree" className="block font-medium text-gray-900">
                        I agree to the Terms & Conditions and Privacy Policy
                      </label>
                      <p className="text-sm text-gray-600 mt-2">
                        By registering, you agree to our platform rules, terms of service, and data privacy policy. All transactions are governed by Sri Lankan business laws.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-8 mt-8 border-t border-gray-200">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-8 py-4 rounded-2xl border-2 border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-all duration-300 flex items-center gap-2"
                >
                  <ArrowLeft className="h-5 w-5" />
                  Back
                </button>
              ) : (
                <Link
                  to="/login"
                  className="px-8 py-4 rounded-2xl text-gray-600 hover:text-gray-800 font-medium transition-all"
                >
                  Back to Login
                </Link>
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-10 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2"
                >
                  Continue
                  <ArrowRight className="h-5 w-5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading || !form.agree}
                  className="px-10 py-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:hover:translate-y-0 flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      Complete Registration
                      <Check className="h-5 w-5" />
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Login Link */}
            <div className="text-center mt-8 pt-6 border-t border-gray-200">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-green-600 hover:text-green-700 font-bold transition">
                  Login here
                </Link>
              </p>
            </div>
          </div>

          {/* Mobile Footer */}
          <p className="text-center text-gray-500 text-xs mt-8 lg:hidden">
            © 2025 Rice Mill Management
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;