import React from "react";
import { LogIn, UserPlus } from "lucide-react";

const AuthToggle = ({ isLogin, setIsLogin }) => {
  return (
    <div className="bg-white/30 backdrop-blur-3xl p-1 rounded-2xl mb-6 flex border border-white/20 shadow-sm">
      <button
        onClick={() => setIsLogin(true)}
        className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
          isLogin
            ? "bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-lg transform scale-105"
            : "text-gray-600 hover:text-teal-600"
        }`}
      >
        <LogIn size={18} />
        Sign In
      </button>

      <button
        onClick={() => setIsLogin(false)}
        className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
          !isLogin
            ? "bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-lg transform scale-105"
            : "text-gray-600 hover:text-emerald-600"
        }`}
      >
        <UserPlus size={18} />
        Sign Up
      </button>
    </div>
  );
};

export default AuthToggle;
