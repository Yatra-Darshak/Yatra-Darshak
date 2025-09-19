import React from 'react';

const App = () => {
  return (
    <div className="bg-[#121212] flex items-center justify-center min-h-screen p-4 sm:p-8 md:p-12 font-sans">
      <div className="bg-[#1c2a39] p-6 sm:p-8 md:p-12 rounded-[30px] shadow-2xl w-full max-w-6xl flex flex-col lg:flex-row gap-6 lg:gap-12">
        
        {/* Tour Map Section */}
        <div className="flex-1 flex flex-col">
          <h1 className="text-white text-3xl sm:text-4xl font-bold mb-6">Tour Map</h1>
          <div className="relative w-full aspect-[4/3] sm:aspect-[3/2] md:aspect-video bg-[#334155] rounded-[20px] overflow-hidden shadow-inner">
            <img src="https://placehold.co/900x675/64748b/FFFFFF?text=Tour+Map+Placeholder" alt="Tour map" className="w-full h-full object-cover" />
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs sm:text-sm p-1 sm:p-2 rounded-lg">
              2 hr 34 min
            </div>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex-1 flex flex-col justify-center items-center lg:items-end gap-6 sm:gap-8">
          <Button
            label="Emergency contact"
            style={{ background: 'linear-gradient(to right, #ef4444, #dc2626)' }}
            textColor="white"
          />
          <Button
            label="Help"
            style={{ background: 'linear-gradient(to right, #f97316, #ea580c)' }}
            textColor="white"
          />
          <Button
            label="Alerts"
            style={{ background: 'linear-gradient(to right, #eab308, #ca8a04)' }}
            textColor="black"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M12 2A10 10 0 1 0 12 22A10 10 0 1 0 12 2ZM9 8A1 1 0 1 1 9 10A1 1 0 1 1 9 8ZM15 8A1 1 0 1 1 15 10A1 1 0 1 1 15 8ZM12 14A2 2 0 1 1 12 16A2 2 0 1 1 12 14ZM12 4A8 8 0 1 1 12 20A8 8 0 1 1 12 4Z" />
              </svg>
            }
          />
        </div>
      </div>
    </div>
  );
};

const Button = ({ label, style, textColor, icon }) => (
  <button
    className={`w-full max-w-sm h-20 sm:h-24 md:h-28 rounded-2xl flex items-center justify-center text-${textColor} text-lg sm:text-xl font-semibold shadow-lg transition-transform transform hover:scale-105`}
    style={style}
  >
    <div className="flex items-center gap-4">
      {icon}
      {label}
    </div>
  </button>
);

export default App;
