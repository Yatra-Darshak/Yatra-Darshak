import React from 'react';

const App = () => {
  return (
    <div className="flex bg-[#121212] text-white font-sans min-h-screen">
      {/* Left Sidebar */}
      <div className="w-64 bg-[#1c2a39] flex flex-col p-6 rounded-r-[30px] overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#eab308] flex items-center justify-center font-bold text-black text-xl">
              Y
            </div>
            <span className="font-semibold text-lg">YatraDarshak</span>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 cursor-pointer text-[#eab308]">
            <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
          </svg>
        </div>
        
        <h2 className="text-sm font-medium text-gray-400 mb-2">Today</h2>
        <div className="space-y-2 mb-6">
          <div className="h-10 bg-[#334155] rounded-lg p-3"></div>
          <div className="h-10 bg-[#334155] rounded-lg p-3"></div>
          <div className="h-10 bg-[#334155] rounded-lg p-3"></div>
        </div>

        <h2 className="text-sm font-medium text-gray-400 mb-2">Yesterday</h2>
        <div className="space-y-2 mb-6">
          <div className="h-10 bg-[#334155] rounded-lg p-3"></div>
          <div className="h-10 bg-[#334155] rounded-lg p-3"></div>
        </div>

        <h2 className="text-sm font-medium text-gray-400 mb-2">Previous 7 Days</h2>
        <div className="space-y-2">
          <div className="h-10 bg-[#334155] rounded-lg p-3"></div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col p-8">
        {/* Header */}
        <div className="flex justify-end items-center gap-4 mb-16">
          <button className="bg-white text-[#121212] px-6 py-2 rounded-full font-semibold">Login</button>
          <div className="w-10 h-10 rounded-full bg-[#64748b] flex items-center justify-center font-bold text-lg">
            U
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-8">What can I help with?</h1>
          <div className="relative w-full max-w-2xl mt-4">
            <input 
              type="text" 
              placeholder="Ask Anything..." 
              className="w-full bg-[#1c2a39] text-white border-2 border-[#334155] rounded-full py-4 px-6 focus:outline-none focus:border-[#eab308] transition-colors"
            />
            {/* Chatbot SVG icon */}
            <div className="absolute inset-y-0 right-4 flex items-center">
                            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
