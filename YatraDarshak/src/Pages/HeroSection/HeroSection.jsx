import React, { useState } from "react";
import { LogIn, Sparkles, TrendingUp, Users, Shield, Phone } from "lucide-react";
import Background from "../../Components/UI/Background";
import YDlogo from "../../Components/UI/YDlogo";

const HeroSection = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-800 text-white overflow-hidden rounded-b-[80px]">
      {/* Animated background */}
      <Background className='h-50%'/>

      <div className="relative z-10 flex flex-col items-center justify-center p-6 min-h-screen">
        {/* Header */}
        <div className="w-full flex justify-between items-center mb-12 max-w-6xl">
          <div className="flex items-center gap-3">
            <YDlogo size={60} />
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
                YatraDarshak
              </span>
              <div className="text-sm text-gray-300">Partner's Platform</div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-gray-300 hover:text-white cursor-pointer transition-colors duration-300">
              Why YatraDarshak Partners?
            </span>
            <button
              className="flex items-center gap-2 bg-white text-slate-800 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <LogIn
                size={18}
                className={`transition-transform duration-300 ${
                  isHovered ? "rotate-12" : ""
                }`}
              />
              Login
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full max-w-6xl">
          {/* Left Section */}
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Your Gateway to{" "}
                <span className="bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
                  More Bookings
                </span>
              </h1>
              <h2 className="text-3xl font-bold mb-6 leading-tight">
                Welcome to the YatraDarshak Partners
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                A platform for travel agents to showcase packages, expand reach,
                and grow with easy-to-use features and amazing deals.
              </p>
            </div>
          </div>

          {/* Right Section - Login Form */}
          <div className="relative group w-full">
            {/* Gradient Border Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-400/50 to-blue-500/50 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>

            {/* Main Card */}
            <div className="relative w-full bg-white/95 backdrop-blur-sm text-slate-800 p-8 rounded-3xl shadow-2xl border border-white/20">
              {/* Header */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-slate-800">
                  Let’s Begin!
                </h3>
                <p className="text-slate-600">
                  Sign in or create an account with your phone number.
                </p>
              </div>

              {/* Input + Button */}
              <div className="space-y-4">
                <div className="relative">
                  <div className="flex items-center border-2 border-slate-200 rounded-xl overflow-hidden focus-within:border-teal-400 transition-colors duration-300 w-full">
                    <div className="flex items-center px-4 py-3 bg-slate-50">
                      <img
                        src="https://flagcdn.com/w20/in.png"
                        alt="India"
                        className="w-5 h-5 mr-2"
                      />
                      <span className="font-semibold text-slate-700">+91</span>
                    </div>
                    <input
                      type="tel"
                      placeholder="Enter your mobile number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="flex-1 px-4 py-3 outline-none bg-white text-slate-800 placeholder-slate-400"
                    />
                  </div>
                </div>

                <button
                  className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white py-3 rounded-xl font-bold hover:from-teal-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  disabled={!phoneNumber}
                >
                  <span className="flex items-center justify-center gap-2">
                    Start Your Journey
                    <Sparkles className="w-5 h-5" />
                  </span>
                </button>

                <div className="text-center">
                  <p className="text-xs text-slate-500 mt-4">
                    By continuing, you agree to our Terms & Privacy Policy
                  </p>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-slate-200">
                <div className="flex items-center gap-2 text-slate-600">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Secure</span>
                </div>
                <div className="w-px h-4 bg-slate-300"></div>
                <div className="flex items-center gap-2 text-slate-600">
                  <TrendingUp className="w-4 h-4 text-teal-500" />
                  <span className="text-sm">Fast Growth</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Exclusive Offer moved here */}
        <div className="relative group mt-16 w-full max-w-4xl">
          <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-blue-500 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
          <div className="relative bg-gradient-to-r from-teal-400 to-blue-500 p-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="absolute -top-4 left-6 bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2 rounded-full text-sm font-bold text-white shadow-lg animate-bounce">
              🎉 Limited Time Offer
            </div>
            <h3 className="text-3xl font-bold text-white mt-2 mb-3">
              Zero Commission Launch
            </h3>
            <p className="text-white/90 mb-3 text-lg">
              List unlimited packages completely FREE – zero commission for your
              first 3 months!
            </p>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <p className="font-bold text-white">
                Start Earning More Today!
              </p>
            </div>
          </div>
        </div>

        {/* Floating CTA */}
        <div className="mt-12 text-center">
          <p className="text-lg text-gray-300 mb-2">
            Join the revolution in travel business
          </p>
          <div className="flex items-center justify-center gap-2 text-teal-400">
            <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold">
              Ready to 3X your bookings?
            </span>
            <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse delay-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
