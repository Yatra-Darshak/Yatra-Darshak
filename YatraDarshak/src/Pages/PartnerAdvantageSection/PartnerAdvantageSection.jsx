import React, { useState, useEffect } from "react";
import { 
  CheckCircle, 
  TrendingUp, 
  Target, 
  Shield, 
  Gift, 
  Headphones,
  Phone,
  Mail,
  MessageCircle,
  Star,
  Users,
  Award
} from "lucide-react";

const PartnerAdvantageSection = () => {
  const [visibleItems, setVisibleItems] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    // Animate items in sequence
    const timer = setTimeout(() => {
      advantages.forEach((_, index) => {
        setTimeout(() => {
          setVisibleItems(prev => [...prev, index]);
        }, index * 200);
      });
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const advantages = [
    {
      id: 1,
      icon: CheckCircle,
      title: "Zero Commission Listings",
      subtitle: "List unlimited packages for free",
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-50",
      iconBg: "bg-green-100"
    },
    {
      id: 2,
      icon: TrendingUp,
      title: "Wider Reach & Visibility",
      subtitle: "Connect with customers across India",
      color: "from-red-400 to-red-600",
      bgColor: "bg-red-50",
      iconBg: "bg-red-100"
    },
    {
      id: 3,
      icon: Target,
      title: "Featured Promotions",
      subtitle: "Get highlighted in search results",
      color: "from-orange-400 to-orange-600",
      bgColor: "bg-orange-50",
      iconBg: "bg-orange-100"
    },
    {
      id: 4,
      icon: Shield,
      title: "Verified Agent Badge",
      subtitle: "Build trust with verified status",
      color: "from-purple-400 to-purple-600",
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-100"
    },
    {
      id: 5,
      icon: Gift,
      title: "Exclusive Partner Offers",
      subtitle: "Access to special deals & discounts",
      color: "from-yellow-400 to-yellow-600",
      bgColor: "bg-yellow-50",
      iconBg: "bg-yellow-100"
    },
    {
      id: 6,
      icon: Headphones,
      title: "Dedicated Partner Support",
      subtitle: "24/7 assistance for all your needs",
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-100"
    }
  ];

  return (
    <div className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-64 h-64 bg-teal-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Centered Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-100 to-blue-100 px-6 py-3 rounded-full mb-6 animate-pulse">
            <Star className="w-5 h-5 text-teal-600" />
            <span className="text-teal-700 font-semibold">Exclusive Benefits</span>
            <Star className="w-5 h-5 text-teal-600" />
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
            YatraDarshak Partner's{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
                Advantage
              </span>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full opacity-30"></div>
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Unlock exclusive benefits designed to accelerate your travel business growth and maximize your earning potential
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Section - Advantages */}
          <div className="space-y-8">

            {/* Advantages List */}
            <div className="space-y-4">
              {advantages.map((advantage, index) => {
                const Icon = advantage.icon;
                const isVisible = visibleItems.includes(index);
                const isHovered = hoveredItem === index;
                
                return (
                  <div
                    key={advantage.id}
                    className={`transform transition-all duration-700 ${
                      isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                    }`}
                    onMouseEnter={() => setHoveredItem(index)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div className={`group relative overflow-hidden rounded-2xl border border-gray-100 transition-all duration-300 ${
                      isHovered ? 'shadow-xl scale-105 border-gray-200' : 'shadow-lg hover:shadow-xl'
                    }`}>
                      
                      {/* Gradient Background */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${advantage.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                      
                      {/* Card Content */}
                      <div className={`relative ${advantage.bgColor} p-6 flex items-center gap-4`}>
                        {/* Icon */}
                        <div className={`${advantage.iconBg} p-3 rounded-xl transform transition-transform duration-300 ${
                          isHovered ? 'scale-110 rotate-3' : 'group-hover:scale-105'
                        }`}>
                          <Icon className={`w-6 h-6 bg-gradient-to-r ${advantage.color} bg-clip-text text-transparent`} />
                        </div>
                        
                        {/* Text Content */}
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-800 mb-1">
                            {advantage.title}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {advantage.subtitle}
                          </p>
                        </div>

                        {/* Hover Arrow */}
                        <div className={`transform transition-all duration-300 ${
                          isHovered ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'
                        }`}>
                          <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${advantage.color} flex items-center justify-center`}>
                            <span className="text-white text-sm">→</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Section - Illustration */}
          <div className="relative">
            {/* Main Illustration Container */}
            <div className="relative">
              {/* Background Shape */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-100 to-blue-200 rounded-full opacity-20 transform rotate-6"></div>
              
              {/* Computer/Device Mockup */}
              <div className="relative z-10 bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                {/* Screen */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-1">
                  <div className="bg-gradient-to-br from-blue-400 via-teal-400 to-cyan-400 rounded-xl p-8 text-white relative overflow-hidden">
                    
                    {/* Success Person Illustration */}
                    <div className="text-center mb-6">
                      <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <Users className="w-12 h-12 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Success!</h3>
                      <p className="text-white/90">Your packages are live</p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/10 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold">150+</div>
                        <div className="text-xs">Bookings</div>
                      </div>
                      <div className="bg-white/10 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold">₹5L+</div>
                        <div className="text-xs">Revenue</div>
                      </div>
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute -top-2 -right-2 w-16 h-16 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
                    <div className="absolute -bottom-3 -left-3 w-20 h-20 bg-pink-400 rounded-full opacity-20 animate-pulse delay-300"></div>
                  </div>
                </div>

                {/* Mobile Device */}
                <div className="absolute -bottom-4 -right-4 w-24 h-36 bg-slate-800 rounded-xl shadow-xl">
                  <div className="bg-gradient-to-br from-teal-400 to-blue-500 m-2 rounded-lg h-32 flex items-center justify-center">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>

              {/* Floating Icons */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center shadow-lg animate-bounce">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="absolute top-8 -right-8 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shadow-lg animate-bounce delay-300">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* How can we Help Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-3xl p-12 border border-gray-100">
            <h2 className="text-4xl font-bold text-gray-800 mb-8">
              How can we Help?
            </h2>
            
            {/* Contact Methods */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Phone className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Call Us</h3>
                <p className="text-gray-600 text-sm">Get instant support</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Mail className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Email Us</h3>
                <p className="text-gray-600 text-sm">Detailed assistance</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <MessageCircle className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Live Chat</h3>
                <p className="text-gray-600 text-sm">Real-time help</p>
              </div>
            </div>

            {/* Contact Button */}
            <button className="bg-gradient-to-r from-slate-800 to-slate-900 text-white px-12 py-4 rounded-2xl font-bold hover:from-slate-900 hover:to-slate-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerAdvantageSection;