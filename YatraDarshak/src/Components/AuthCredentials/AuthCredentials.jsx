import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin, Shield, CheckCircle, ArrowRight, Home, UserPlus, LogIn, MessageCircle } from 'lucide-react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [authMethod, setAuthMethod] = useState('email'); // 'email', 'phone', 'google'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    city: '',
    state: '',
    otp: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  // Track mouse movement for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // OTP Timer
  useEffect(() => {
    if (otpTimer > 0) {
      const timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [otpTimer]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSendOtp = () => {
    setShowOtp(true);
    setOtpTimer(30);
  };

  const handleGoogleAuth = () => {
    // Simulate Google OAuth flow
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (authMethod === 'phone' && !showOtp) {
      handleSendOtp();
      return;
    }
    
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setShowOtp(false);
    setFormData({
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      city: '',
      state: '',
      otp: ''
    });
  };

  const switchAuthMethod = (method) => {
    setAuthMethod(method);
    setShowOtp(false);
    setFormData({
      ...formData,
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      otp: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 overflow-x-hidden relative">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
          }}
        />
        <div 
          className="absolute top-3/4 right-1/4 w-96 h-96 bg-green-200/30 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${-mousePosition.x * 15}px, ${-mousePosition.y * 15}px)`
          }}
        />
        <div 
          className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-indigo-100/20 rounded-full blur-3xl animate-spin"
          style={{
            animationDuration: '20s',
            transform: `translate(-50%, -50%) rotate(${scrollY * 0.1}deg)`
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <span className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">
                  सह
                </span>
                <span className="text-4xl font-bold bg-gradient-to-r from-green-700 to-green-900 bg-clip-text text-transparent">
                  govern
                </span>
                <div className="absolute -top-2 -right-2 w-3 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-ping" />
              </div>
            </div>

            <button 
              onClick={() => window.location.href = '/'}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-700 transition-colors duration-300 font-medium"
            >
              <Home size={20} />
              Back to Home
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-green-600 rounded-full mb-6 shadow-xl">
              <Shield className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isLogin ? 'Welcome Back' : 'Join सहGovern'}
            </h1>
            <p className="text-gray-600">
              {isLogin 
                ? 'Sign in to continue making a difference in your community' 
                : 'Create your account and start reporting civic issues'
              }
            </p>
          </div>

          {/* Form Toggle */}
          <div className="bg-gray-100/50 p-1 rounded-2xl mb-6 flex backdrop-blur-sm">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                isLogin 
                  ? 'bg-white text-blue-700 shadow-lg transform scale-105' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <LogIn size={18} />
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                !isLogin 
                  ? 'bg-white text-green-700 shadow-lg transform scale-105' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <UserPlus size={18} />
              Sign Up
            </button>
          </div>

          {/* Authentication Method Selection */}
          <div className="bg-white/70 backdrop-blur-2xl rounded-2xl p-1 mb-6 shadow-lg border border-gray-200/50">
            <div className="grid grid-cols-3 gap-1">
              <button
                onClick={() => switchAuthMethod('email')}
                className={`py-3 px-4 rounded-xl font-medium transition-all duration-300 flex flex-col items-center justify-center gap-1 ${
                  authMethod === 'email'
                    ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <Mail size={20} />
                <span className="text-xs">Email</span>
              </button>
              <button
                onClick={() => switchAuthMethod('phone')}
                className={`py-3 px-4 rounded-xl font-medium transition-all duration-300 flex flex-col items-center justify-center gap-1 ${
                  authMethod === 'phone'
                    ? 'bg-green-500 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-green-600'
                }`}
              >
                <Phone size={20} />
                <span className="text-xs">Phone</span>
              </button>
              <button
                onClick={() => switchAuthMethod('google')}
                className={`py-3 px-4 rounded-xl font-medium transition-all duration-300 flex flex-col items-center justify-center gap-1 ${
                  authMethod === 'google'
                    ? 'bg-red-500 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-red-600'
                }`}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-xs">Google</span>
              </button>
            </div>
          </div>

          {/* Google Auth Component */}
          {authMethod === 'google' && (
            <div className="bg-white/70 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-gray-200/50">
              <div className="text-center space-y-6">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {isLogin ? 'Continue with Google' : 'Sign up with Google'}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {isLogin 
                      ? 'Sign in using your Google account for quick access'
                      : 'Create your account instantly using your Google profile'
                    }
                  </p>
                </div>

                <button
                  onClick={handleGoogleAuth}
                  className="group w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-4 px-6 rounded-2xl border-2 border-gray-200 hover:border-red-300 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC04"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  {isLogin ? 'Sign in with Google' : 'Sign up with Google'}
                  <ArrowRight className="transition-transform group-hover:translate-x-1" size={18} />
                </button>

                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Shield size={14} className="text-green-600" />
                    <span>Secure OAuth</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle size={14} className="text-blue-600" />
                    <span>Instant Access</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Email/Phone Form */}
          {(authMethod === 'email' || authMethod === 'phone') && (
            <div className="bg-white/70 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-gray-200/50">
              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <>
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-gray-900 placeholder-gray-500 transition-all duration-300"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                    </div>

                    {/* Location */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          City
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-gray-900 placeholder-gray-500 transition-all duration-300"
                            placeholder="City"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          State
                        </label>
                        <select
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-gray-900 transition-all duration-300"
                          required
                        >
                          <option value="">Select State</option>
                          <option value="MP">Madhya Pradesh</option>
                          <option value="MH">Maharashtra</option>
                          <option value="DL">Delhi</option>
                          <option value="UP">Uttar Pradesh</option>
                          <option value="RJ">Rajasthan</option>
                          <option value="GJ">Gujarat</option>
                          <option value="TN">Tamil Nadu</option>
                          <option value="KA">Karnataka</option>
                          <option value="WB">West Bengal</option>
                          <option value="AP">Andhra Pradesh</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}

                {/* Email or Phone Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    {authMethod === 'email' ? 'Email Address' : 'Phone Number'}
                  </label>
                  <div className="relative">
                    {authMethod === 'email' ? (
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    ) : (
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    )}
                    <input
                      type={authMethod === 'email' ? 'email' : 'tel'}
                      name={authMethod}
                      value={formData[authMethod]}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-gray-900 placeholder-gray-500 transition-all duration-300"
                      placeholder={authMethod === 'email' ? 'Enter your email address' : 'Enter your phone number'}
                      required
                    />
                  </div>
                </div>

                {/* OTP Input for Phone */}
                {authMethod === 'phone' && showOtp && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-semibold text-gray-700">
                        Enter OTP
                      </label>
                      <button
                        type="button"
                        onClick={() => setOtpTimer(30)}
                        disabled={otpTimer > 0}
                        className={`text-sm font-medium ${
                          otpTimer > 0 
                            ? 'text-gray-400 cursor-not-allowed' 
                            : 'text-blue-700 hover:text-blue-900 hover:underline'
                        }`}
                      >
                        {otpTimer > 0 ? `Resend in ${otpTimer}s` : 'Resend OTP'}
                      </button>
                    </div>
                    <div className="relative">
                      <MessageCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        name="otp"
                        value={formData.otp}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 text-gray-900 placeholder-gray-500 transition-all duration-300 text-center text-2xl font-mono tracking-widest"
                        placeholder="000000"
                        maxLength="6"
                        required
                      />
                    </div>
                    <p className="text-sm text-gray-500 text-center">
                      OTP sent to {formData.phone}
                    </p>
                  </div>
                )}

                {/* Password (Email only or if not OTP flow) */}
                {(authMethod === 'email' || (authMethod === 'phone' && !showOtp)) && (
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-12 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-gray-900 placeholder-gray-500 transition-all duration-300"
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>
                )}

                {/* Confirm Password (Sign Up only, Email or Phone without OTP) */}
                {!isLogin && (authMethod === 'email' || (authMethod === 'phone' && !showOtp)) && (
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-12 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-gray-900 placeholder-gray-500 transition-all duration-300"
                        placeholder="Confirm your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>
                )}

                {/* Remember Me / Forgot Password (Login only, Email) */}
                {isLogin && authMethod === 'email' && (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input type="checkbox" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                      <span className="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                    <button type="button" className="text-sm text-blue-700 hover:text-blue-900 font-medium hover:underline">
                      Forgot password?
                    </button>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className={`group w-full font-bold text-lg py-4 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border-2 flex items-center justify-center gap-3 ${
                    authMethod === 'email'
                      ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:shadow-blue-500/25 border-blue-500/30'
                      : 'bg-gradient-to-r from-green-600 to-green-800 text-white hover:shadow-green-500/25 border-green-500/30'
                  }`}
                >
                  {authMethod === 'phone' && !showOtp
                    ? (isLogin ? 'Send OTP' : 'Send Verification Code')
                    : (isLogin ? 'Sign In to Account' : 'Create Account')
                  }
                  <ArrowRight className="transition-transform group-hover:translate-x-1" size={20} />
                </button>

                {/* Terms and Privacy (Sign Up only) */}
                {!isLogin && (
                  <p className="text-xs text-gray-500 text-center leading-relaxed">
                    By creating an account, you agree to our{' '}
                    <button type="button" className="text-blue-700 hover:underline font-medium">Terms of Service</button>{' '}
                    and{' '}
                    <button type="button" className="text-blue-700 hover:underline font-medium">Privacy Policy</button>
                  </p>
                )}
              </form>
            </div>
          )}

          {/* Switch Form */}
          <div className="text-center mt-8">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={toggleForm}
                className="ml-2 text-blue-700 hover:text-blue-900 font-semibold hover:underline transition-colors duration-300"
              >
                {isLogin ? 'Sign up here' : 'Sign in here'}
              </button>
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center gap-8 mt-12 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-green-600" />
              <span>Secure & Protected</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-blue-600" />
              <span>Government Verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed inset-0 flex justify-center items-center z-[100] bg-black/50 backdrop-blur-sm">
          <div className="bg-white/95 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl max-w-md mx-4 text-center border border-gray-200 transform animate-bounce">
            <div className="mb-6">
              <CheckCircle className="mx-auto text-green-600 mb-4" size={48} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {isLogin ? 'Welcome Back!' : 'Account Created!'}
            </h3>
            <p className="text-gray-600 mb-6">
              {authMethod === 'google'
                ? (isLogin 
                    ? 'You have been successfully signed in with Google.' 
                    : 'Your account has been created successfully using Google.')
                : (isLogin 
                    ? 'You have been successfully signed in.' 
                    : 'Your account has been created successfully. You can now start reporting civic issues.')
              }
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-3 rounded-full hover:from-blue-700 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-medium"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>
    </div>
  );
};

export default AuthPage;


// import React, { useState, useEffect } from 'react';
// import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin, Shield, CheckCircle, ArrowRight, Home, UserPlus, LogIn } from 'lucide-react';

// const AuthPage = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [scrollY, setScrollY] = useState(0);
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     confirmPassword: '',
//     fullName: '',
//     phone: '',
//     city: '',
//     state: ''
//   });
//   const [showSuccess, setShowSuccess] = useState(false);

//   // Track mouse movement for interactive effects
//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMousePosition({
//         x: (e.clientX / window.innerWidth - 0.5) * 2,
//         y: (e.clientY / window.innerHeight - 0.5) * 2
//       });
//     };

//     const handleScroll = () => {
//       setScrollY(window.scrollY);
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     window.addEventListener('scroll', handleScroll);

//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setShowSuccess(true);
//     setTimeout(() => setShowSuccess(false), 3000);
//   };

//   const toggleForm = () => {
//     setIsLogin(!isLogin);
//     setFormData({
//       email: '',
//       password: '',
//       confirmPassword: '',
//       fullName: '',
//       phone: '',
//       city: '',
//       state: ''
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 overflow-x-hidden relative">
//       {/* Animated Background Elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div 
//           className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse"
//           style={{
//             transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
//           }}
//         />
//         <div 
//           className="absolute top-3/4 right-1/4 w-96 h-96 bg-green-200/30 rounded-full blur-3xl animate-pulse"
//           style={{
//             transform: `translate(${-mousePosition.x * 15}px, ${-mousePosition.y * 15}px)`
//           }}
//         />
//         <div 
//           className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-indigo-100/20 rounded-full blur-3xl animate-spin"
//           style={{
//             animationDuration: '20s',
//             transform: `translate(-50%, -50%) rotate(${scrollY * 0.1}deg)`
//           }}
//         />
//       </div>

//       {/* Navigation */}
//       <nav className="relative z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
//         <div className="container mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <div className="relative">
//                 <span className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">
//                   सह
//                 </span>
//                 <span className="text-4xl font-bold bg-gradient-to-r from-green-700 to-green-900 bg-clip-text text-transparent">
//                   govern
//                 </span>
//                 <div className="absolute -top-2 -right-2 w-3 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-ping" />
//               </div>
//             </div>

//             <button 
//               onClick={() => window.location.href = '/'}
//               className="flex items-center gap-2 text-gray-600 hover:text-blue-700 transition-colors duration-300 font-medium"
//             >
//               <Home size={20} />
//               Back to Home
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <div className="relative z-10 min-h-screen flex items-center justify-center py-12 px-4">
//         <div className="w-full max-w-md">
//           {/* Logo Section */}
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-green-600 rounded-full mb-6 shadow-xl">
//               <Shield className="text-white" size={32} />
//             </div>
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">
//               {isLogin ? 'Welcome Back' : 'Join सहGovern'}
//             </h1>
//             <p className="text-gray-600">
//               {isLogin 
//                 ? 'Sign in to continue making a difference in your community' 
//                 : 'Create your account and start reporting civic issues'
//               }
//             </p>
//           </div>

//           {/* Form Toggle */}
//           <div className="bg-gray-100/50 p-1 rounded-2xl mb-8 flex backdrop-blur-sm">
//             <button
//               onClick={() => setIsLogin(true)}
//               className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
//                 isLogin 
//                   ? 'bg-white text-blue-700 shadow-lg transform scale-105' 
//                   : 'text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               <LogIn size={18} />
//               Sign In
//             </button>
//             <button
//               onClick={() => setIsLogin(false)}
//               className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
//                 !isLogin 
//                   ? 'bg-white text-green-700 shadow-lg transform scale-105' 
//                   : 'text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               <UserPlus size={18} />
//               Sign Up
//             </button>
//           </div>

//           {/* Form */}
//           <div className="bg-white/70 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-gray-200/50">
//             <div className="space-y-6">
//               {!isLogin && (
//                 <>
//                   {/* Full Name */}
//                   <div className="space-y-2">
//                     <label className="block text-sm font-semibold text-gray-700">
//                       Full Name
//                     </label>
//                     <div className="relative">
//                       <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//                       <input
//                         type="text"
//                         name="fullName"
//                         value={formData.fullName}
//                         onChange={handleInputChange}
//                         className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-gray-900 placeholder-gray-500 transition-all duration-300"
//                         placeholder="Enter your full name"
//                         required
//                       />
//                     </div>
//                   </div>

//                   {/* Phone */}
//                   <div className="space-y-2">
//                     <label className="block text-sm font-semibold text-gray-700">
//                       Phone Number
//                     </label>
//                     <div className="relative">
//                       <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//                       <input
//                         type="tel"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleInputChange}
//                         className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-gray-900 placeholder-gray-500 transition-all duration-300"
//                         placeholder="Enter your phone number"
//                         required
//                       />
//                     </div>
//                   </div>

//                   {/* Location */}
//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="space-y-2">
//                       <label className="block text-sm font-semibold text-gray-700">
//                         City
//                       </label>
//                       <div className="relative">
//                         <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//                         <input
//                           type="text"
//                           name="city"
//                           value={formData.city}
//                           onChange={handleInputChange}
//                           className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-gray-900 placeholder-gray-500 transition-all duration-300"
//                           placeholder="City"
//                           required
//                         />
//                       </div>
//                     </div>
//                     <div className="space-y-2">
//                       <label className="block text-sm font-semibold text-gray-700">
//                         State
//                       </label>
//                       <select
//                         name="state"
//                         value={formData.state}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-gray-900 transition-all duration-300"
//                         required
//                       >
//                         <option value="">Select State</option>
//                         <option value="MP">Madhya Pradesh</option>
//                         <option value="MH">Maharashtra</option>
//                         <option value="DL">Delhi</option>
//                         <option value="UP">Uttar Pradesh</option>
//                         <option value="RJ">Rajasthan</option>
//                         <option value="GJ">Gujarat</option>
//                         <option value="TN">Tamil Nadu</option>
//                         <option value="KA">Karnataka</option>
//                         <option value="WB">West Bengal</option>
//                         <option value="AP">Andhra Pradesh</option>
//                       </select>
//                     </div>
//                   </div>
//                 </>
//               )}

//               {/* Email */}
//               <div className="space-y-2">
//                 <label className="block text-sm font-semibold text-gray-700">
//                   Email Address
//                 </label>
//                 <div className="relative">
//                   <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-gray-900 placeholder-gray-500 transition-all duration-300"
//                     placeholder="Enter your email address"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Password */}
//               <div className="space-y-2">
//                 <label className="block text-sm font-semibold text-gray-700">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     name="password"
//                     value={formData.password}
//                     onChange={handleInputChange}
//                     className="w-full pl-12 pr-12 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-gray-900 placeholder-gray-500 transition-all duration-300"
//                     placeholder="Enter your password"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                   >
//                     {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                   </button>
//                 </div>
//               </div>

//               {/* Confirm Password (Sign Up only) */}
//               {!isLogin && (
//                 <div className="space-y-2">
//                   <label className="block text-sm font-semibold text-gray-700">
//                     Confirm Password
//                   </label>
//                   <div className="relative">
//                     <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//                     <input
//                       type={showConfirmPassword ? 'text' : 'password'}
//                       name="confirmPassword"
//                       value={formData.confirmPassword}
//                       onChange={handleInputChange}
//                       className="w-full pl-12 pr-12 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-gray-900 placeholder-gray-500 transition-all duration-300"
//                       placeholder="Confirm your password"
//                       required
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                       className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                     >
//                       {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* Remember Me / Forgot Password */}
//               {isLogin && (
//                 <div className="flex items-center justify-between">
//                   <label className="flex items-center">
//                     <input type="checkbox" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
//                     <span className="ml-2 text-sm text-gray-600">Remember me</span>
//                   </label>
//                   <button className="text-sm text-blue-700 hover:text-blue-900 font-medium hover:underline">
//                     Forgot password?
//                   </button>
//                 </div>
//               )}

//               {/* Submit Button */}
//               <button
//                 onClick={handleSubmit}
//                 className={`group w-full font-bold text-lg py-4 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border-2 flex items-center justify-center gap-3 ${
//                   isLogin 
//                     ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:shadow-blue-500/25 border-blue-500/30' 
//                     : 'bg-gradient-to-r from-green-600 to-green-800 text-white hover:shadow-green-500/25 border-green-500/30'
//                 }`}
//               >
//                 {isLogin ? 'Sign In to Account' : 'Create Account'}
//                 <ArrowRight className="transition-transform group-hover:translate-x-1" size={20} />
//               </button>

//               {/* Terms and Privacy (Sign Up only) */}
//               {!isLogin && (
//                 <p className="text-xs text-gray-500 text-center leading-relaxed">
//                   By creating an account, you agree to our{' '}
//                   <button className="text-blue-700 hover:underline font-medium">Terms of Service</button>{' '}
//                   and{' '}
//                   <button className="text-blue-700 hover:underline font-medium">Privacy Policy</button>
//                 </p>
//               )}
//             </div>
//           </div>

//           {/* Switch Form */}
//           <div className="text-center mt-8">
//             <p className="text-gray-600">
//               {isLogin ? "Don't have an account?" : "Already have an account?"}
//               <button
//                 onClick={toggleForm}
//                 className="ml-2 text-blue-700 hover:text-blue-900 font-semibold hover:underline transition-colors duration-300"
//               >
//                 {isLogin ? 'Sign up here' : 'Sign in here'}
//               </button>
//             </p>
//           </div>

//           {/* Trust Indicators */}
//           <div className="flex items-center justify-center gap-8 mt-12 text-sm text-gray-500">
//             <div className="flex items-center gap-2">
//               <Shield size={16} className="text-green-600" />
//               <span>Secure & Protected</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <CheckCircle size={16} className="text-blue-600" />
//               <span>Government Verified</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Success Message */}
//       {showSuccess && (
//         <div className="fixed inset-0 flex justify-center items-center z-[100] bg-black/50 backdrop-blur-sm">
//           <div className="bg-white/95 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl max-w-md mx-4 text-center border border-gray-200 transform animate-bounce">
//             <div className="mb-6">
//               <CheckCircle className="mx-auto text-green-600 mb-4" size={48} />
//             </div>
//             <h3 className="text-2xl font-bold text-gray-900 mb-4">
//               {isLogin ? 'Welcome Back!' : 'Account Created!'}
//             </h3>
//             <p className="text-gray-600 mb-6">
//               {isLogin 
//                 ? 'You have been successfully signed in.' 
//                 : 'Your account has been created successfully. You can now start reporting civic issues.'
//               }
//             </p>
//             <button
//               onClick={() => setShowSuccess(false)}
//               className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-3 rounded-full hover:from-blue-700 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-medium"
//             >
//               Continue
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Background Pattern */}
//       <div className="fixed inset-0 opacity-5 pointer-events-none">
//         <div className="absolute inset-0" style={{
//           backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
//           backgroundSize: '60px 60px'
//         }} />
//       </div>
//     </div>
//   );
// };

// export default AuthPage;