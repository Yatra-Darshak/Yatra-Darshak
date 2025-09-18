import React from "react";

const YDlogo = ({ size = 40 }) => {
  const YDLogo = ({ size }) => (
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

  return <YDLogo size={size} />;
};

export default YDlogo;
