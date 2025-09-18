import React, { useState, useEffect } from "react";
import { 
  MapPin, 
  Star, 
  TrendingUp, 
  Users, 
  Globe, 
  Award, 
  Zap,
  ArrowRight,
  CheckCircle,
  Target
} from "lucide-react";

const JoinUsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activePin, setActivePin] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    // Animate location pins
    const pinInterval = setInterval(() => {
      setActivePin(prev => (prev + 1) % 3);
    }, 2000);

    return () => clearInterval(pinInterval);
  }, []);

  const locationPins = [
    { id: 1, top: '20%', right: '15%', delay: 0 },
    { id: 2, top: '45%', right: '25%', delay: 500 },
    { id: 3, top: '65%', right: '10%', delay: 1000 }
  ];

  return (
    <div className="py-20 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-teal-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-cyan-200/15 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Header Badge */}
        <div className="text-center mb-16">
          <div className="inline-block bg-white rounded-full px-8 py-4 shadow-lg border border-gray-100 mb-8 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className="text-2xl font-bold text-gray-800">India's #1 Platform for Travel Agents –</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                YatraDarshak
              </span>
            </div>
            <p className="text-gray-600 font-semibold mt-2">
              Feature-Rich. Agent-Friendly. 100% Profitable.
            </p>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-gradient-to-br from-cyan-100 to-blue-100 rounded-3xl p-8 shadow-2xl border border-white/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Section - Content */}
              <div className={`space-y-8 transform transition-all duration-1000 ${
                isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
              }`}>
                
                {/* Main Heading */}
                <div>
                  <h2 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
                    Join{" "}
                    <span className="relative">
                      <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
                        Us
                      </span>
                      <div className="absolute -bottom-2 left-0 w-full h-2 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full opacity-30 animate-pulse"></div>
                    </span>
                  </h2>
                  
                  <h3 className="text-3xl font-bold text-gray-700 mb-6">
                    Use Our Network to Power{" "}
                    <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                      Your Business
                    </span>
                  </h3>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { icon: Globe, text: "Pan-India Network Coverage", color: "from-blue-500 to-cyan-500" },
                    { icon: TrendingUp, text: "Exponential Business Growth", color: "from-green-500 to-teal-500" },
                    { icon: Users, text: "Connect with Millions of Travelers", color: "from-purple-500 to-pink-500" }
                  ].map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <div key={index} className={`flex items-center gap-4 bg-gradient-to-r ${feature.color} bg-opacity-10 p-4 rounded-xl transform transition-all duration-500 hover:scale-105`}
                        style={{ transitionDelay: `${index * 200}ms` }}>
                        <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-semibold text-gray-700">{feature.text}</span>
                      </div>
                    );
                  })}
                </div>

                {/* CTA Button */}
                <div className="pt-4">
                  <button className="group bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3">
                    Start Your Journey Today
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>

              {/* Right Section - Illustration */}
              <div className={`relative transform transition-all duration-1000 delay-300 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}>
                
                {/* Main Character Container */}
                <div className="relative bg-gradient-to-br from-orange-100 to-red-100 rounded-3xl p-8 shadow-xl">
                  
                  {/* Background Map Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-4 border-2 border-dashed border-gray-300 rounded-2xl"></div>
                    <div className="absolute top-8 left-8 w-24 h-16 border border-gray-300 rounded opacity-50"></div>
                    <div className="absolute bottom-12 right-12 w-20 h-12 border border-gray-300 rounded opacity-50"></div>
                  </div>

                  {/* Character Illustration */}
                  <div className="relative z-10 text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
                      <div className="w-24 h-24 bg-orange-300 rounded-full flex items-center justify-center">
                        <Users className="w-12 h-12 text-white" />
                      </div>
                    </div>
                    
                    {/* Success Stats */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 mb-6 shadow-lg">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-orange-600">50K+</div>
                          <div className="text-xs text-gray-600">Happy Agents</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-red-600">₹100Cr+</div>
                          <div className="text-xs text-gray-600">Revenue Generated</div>
                        </div>
                      </div>
                    </div>

                    {/* YatraDarshak Branding */}
                    <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-3 rounded-xl shadow-lg">
                      <div className="text-xl font-bold">YatraDarshak</div>
                      <div className="text-sm opacity-90">India's Travel Agent Platform</div>
                    </div>
                  </div>

                  {/* Floating Location Pins */}
                  {locationPins.map((pin, index) => (
                    <div
                      key={pin.id}
                      className={`absolute w-8 h-8 transform transition-all duration-500 ${
                        activePin === index ? 'scale-125' : 'scale-100'
                      }`}
                      style={{ top: pin.top, right: pin.right }}
                    >
                      <div className={`w-full h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg animate-bounce ${
                        activePin === index ? 'animate-pulse' : ''
                      }`}
                        style={{ animationDelay: `${pin.delay}ms` }}>
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  ))}

                  {/* Success Indicators */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shadow-lg animate-bounce delay-300">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                </div>

                {/* Floating Achievement Badges */}
                <div className="absolute -top-6 right-4 bg-yellow-100 px-4 py-2 rounded-full shadow-lg transform rotate-12 hover:rotate-0 transition-transform duration-300">
                  <div className="flex items-center gap-2 text-yellow-700 text-sm font-semibold">
                    <Award className="w-4 h-4" />
                    #1 Platform
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default JoinUsSection;