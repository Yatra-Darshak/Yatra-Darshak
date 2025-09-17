import React, { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";
import Navbar from "./Navbar";
import AuthToggle from "./AuthToggle";
import AuthMethodSelector from "./AuthMethodSelector";
import GoogleAuth from "./GoogleAuth";
import AuthForm from "./AuthForm";
import { sendOtp, verifyOtp, signup, login } from "../utils/api.js";

// ------------------- useParticles Hook -------------------
const useParticles = () => {
  const [particles, setParticles] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const initParticles = () => {
      const p = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: `${Math.random() * 100}%`,
        y: `${Math.random() * 100}%`,
        size: 6 + Math.random() * 8,
        opacity: 0.4 + Math.random() * 0.6,
      }));
      setParticles(p);
    };
    initParticles();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { particles, mousePosition, scrollY };
};

// ------------------- Background -------------------
const Background = ({ particles, mousePosition, scrollY }) => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    {particles.map((p) => (
      <div
        key={p.id}
        className="absolute rounded-full bg-gradient-to-r from-teal-400 to-emerald-500"
        style={{
          left: p.x,
          top: p.y,
          width: p.size,
          height: p.size,
          opacity: p.opacity,
          animation: `pulse ${2 + Math.random() * 3}s infinite`,
        }}
      />
    ))}
    <div
      className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-teal-200/30 to-emerald-200/30 rounded-full blur-3xl animate-pulse"
      style={{
        transform: `translate(${mousePosition.x * 25}px, ${mousePosition.y * 25}px)`,
      }}
    />
    <div
      className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-gradient-to-r from-teal-100/20 to-emerald-100/20 rounded-full blur-3xl animate-spin"
      style={{
        animationDuration: "40s",
        transform: `translate(-50%, -50%) rotate(${scrollY * 0.03}deg)`,
      }}
    />
  </div>
);

// ------------------- SuccessToast -------------------
const SuccessToast = ({ isLogin }) => (
  <div className="fixed top-8 right-8 z-[100] bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right duration-700 border-2 border-green-400">
    <CheckCircle size={24} className="animate-bounce" />
    <div>
      <div className="font-bold text-lg">Success!</div>
      <div className="text-green-100 text-sm">
        {isLogin ? "Welcome back, explorer!" : "Your journey begins now!"}
      </div>
    </div>
  </div>
);

// ------------------- YDLogo -------------------
const YDLogo = ({ size = 40 }) => (
  <div className="relative flex items-center justify-center">
    <div
      className="relative flex items-center justify-center bg-gradient-to-br from-teal-700 to-teal-800 rounded-xl shadow-xl"
      style={{ width: size, height: size }}
    >
      <div className="text-white font-black text-lg leading-none transform -rotate-3">
        <span className="text-white">Y</span>
        <span className="text-teal-200">D</span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl blur opacity-50 animate-pulse" />
    </div>
  </div>
);

// ------------------- Main AuthPage -------------------
const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [authMethod, setAuthMethod] = useState("email");
  const [showOtp, setShowOtp] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    phonenumber: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    city: "",
    state: "",
    otp: "",
  });

  const { particles, mousePosition, scrollY } = useParticles();

  useEffect(() => {
    if (otpTimer > 0) {
      const timer = setTimeout(() => setOtpTimer((t) => t - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [otpTimer]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const handleSendOtp = async () => {
    if (!formData.phonenumber) {
      setError("Enter phone number first");
      return;
    }
    try {
      await sendOtp({ phonenumber: formData.phonenumber });
      setShowOtp(true);
      setOtpTimer(30);
      setError("");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Error sending OTP");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");

      if (authMethod === "phonenumber") {
        if (!showOtp) {
          await handleSendOtp();
          return;
        } else {
          await verifyOtp({ phonenumber: formData.phonenumber, otp: formData.otp });
          await signup(formData);
        }
      } else if (authMethod === "email") {
        if (isLogin) {
          await login({ email: formData.email, password: formData.password });
        } else {
          if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
          }
          await signup(formData);
        }
      }

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Authentication failed");
    }
  };

  const handleGoogleAuth = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const toggleForm = () => {
    setIsLogin((s) => !s);
    setShowOtp(false);
    setError("");
    setFormData({
      email: "",
      phonenumber: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      city: "",
      state: "",
      otp: "",
    });
  };

  const switchAuthMethod = (method) => {
    setAuthMethod(method);
    setShowOtp(false);
    setError("");
    setFormData((s) => ({
      ...s,
      email: "",
      phonenumber: "",
      password: "",
      confirmPassword: "",
      otp: "",
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-teal-50 to-emerald-50 overflow-hidden relative">
      {showSuccess && <SuccessToast isLogin={isLogin} />}
      <Background particles={particles} mousePosition={mousePosition} scrollY={scrollY} />

      {/* Navbar */}
      <div className="relative z-10 mb-6">
        <Navbar />
      </div>

      {/* Auth Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <YDLogo size={80} />
            <h1 className="text-4xl font-bold text-teal-800">
              {isLogin ? "Welcome Back Explorer!" : "Start Your Journey"}
            </h1>
          </div>

          <AuthToggle isLogin={isLogin} setIsLogin={setIsLogin} />
          <AuthMethodSelector authMethod={authMethod} setAuthMethod={switchAuthMethod} />

          {authMethod === "google" ? (
            <GoogleAuth isLogin={isLogin} onGoogleAuth={handleGoogleAuth} />
          ) : (
            <AuthForm
              isLogin={isLogin}
              authMethod={authMethod}
              formData={formData}
              onChange={handleInputChange}
              showOtp={showOtp}
              otpTimer={otpTimer}
              handleSendOtp={handleSendOtp}
              handleSubmit={handleSubmit}
              toggleForm={toggleForm}
              error={error}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
