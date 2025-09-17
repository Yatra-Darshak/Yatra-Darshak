import React from "react";
import { Home } from "lucide-react";

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

const Navbar = () => {
  return (
    <nav className="relative z-50 bg-white/30 backdrop-blur-3xl border-b border-white/20 shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* YD Logo */}
          <YDLogo size={50} />

          {/* Back button */}
          <button
            onClick={() => (window.location.href = "/")}
            className="flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-colors duration-300 font-medium"
          >
            <Home size={20} />
            Back to Home
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
