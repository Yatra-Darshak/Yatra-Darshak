import React, { useState, useEffect } from "react";
import { 
  Package, 
  TrendingUp, 
  Users, 
  Shield, 
  Zap, 
  Globe, 
  Star, 
  Calendar,
  MapPin,
  CreditCard,
  BarChart3,
  Headphones
} from "lucide-react";

const OffersSection = () => {
  const [activeCard, setActiveCard] = useState(1);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const offers = [
    {
      id: 1,
      title: "Smart Package Management",
      subtitle: "Create & Customize with Ease",
      description: "Build stunning travel packages with our intuitive drag-and-drop interface. Add photos, itineraries, and pricing in minutes.",
      icon: Package,
      gradient: "from-blue-500 to-cyan-500",
      features: ["Easy Package Builder", "Photo Gallery", "Instant Publishing", "Real-time Updates"],
      stats: { value: "50+", label: "Templates Available" }
    },
    {
      id: 2,
      title: "Advanced Analytics Dashboard",
      subtitle: "Data-Driven Growth",
      description: "Get deep insights into your bookings, customer behavior, and revenue trends. Make informed decisions to boost your business.",
      icon: BarChart3,
      gradient: "from-teal-500 to-green-500",
      features: ["Revenue Tracking", "Customer Analytics", "Booking Trends", "Performance Reports"],
      stats: { value: "300%", label: "Average Growth" }
    },
    {
      id: 3,
      title: "24/7 Premium Support",
      subtitle: "Always Here for You",
      description: "Get instant help from our dedicated support team. From technical issues to business growth strategies, we've got you covered.",
      icon: Headphones,
      gradient: "from-purple-500 to-pink-500",
      features: ["Live Chat Support", "Phone Assistance", "Email Support", "Video Tutorials"],
      stats: { value: "< 2min", label: "Response Time" }
    }
  ];

  const handleCardClick = (cardId) => {
    setActiveCard(cardId);
  };

  return (
    <div className="py-20 bg-gradient-to-br from-slate-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-200/30 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl opacity-40"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-100 to-blue-100 px-6 py-3 rounded-full mb-6">
            <Zap className="w-5 h-5 text-teal-600" />
            <span className="text-teal-700 font-semibold">Powerful Features</span>
          </div>
          <h2 className="text-5xl font-bold text-gray-800 mb-6">
            Discover What YatraDarshak 
            <span className="block bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              Offers....
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Unlock the full potential of your travel business with our comprehensive suite of tools designed to accelerate your growth.
          </p>
        </div>

        {/* Main Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {offers.map((offer, index) => {
            const Icon = offer.icon;
            const isActive = activeCard === offer.id;
            const delay = index * 200;
            
            return (
              <div
                key={offer.id}
                className={`group cursor-pointer transform transition-all duration-500 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                } ${isActive ? 'scale-105' : 'hover:scale-102'}`}
                style={{ transitionDelay: `${delay}ms` }}
                onClick={() => handleCardClick(offer.id)}
              >
                {/* Card Container */}
                <div className={`relative h-full ${isActive ? 'z-20' : 'z-10'}`}>
                  {/* Glow Effect */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${offer.gradient} rounded-3xl blur opacity-0 group-hover:opacity-25 transition-opacity duration-500 ${isActive ? 'opacity-30' : ''}`}></div>
                  
                  {/* Main Card */}
                  <div className={`relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100 h-full transition-all duration-300 ${
                    isActive ? 'shadow-2xl border-gray-200' : ''
                  }`}>
                    
                    {/* Icon & Stats */}
                    <div className="flex items-start justify-between mb-6">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${offer.gradient} flex items-center justify-center transform transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold bg-gradient-to-r ${offer.gradient} bg-clip-text text-transparent`}>
                          {offer.stats.value}
                        </div>
                        <div className="text-sm text-gray-500">{offer.stats.label}</div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">{offer.title}</h3>
                        <p className={`font-semibold bg-gradient-to-r ${offer.gradient} bg-clip-text text-transparent mb-3`}>
                          {offer.subtitle}
                        </p>
                        <p className="text-gray-600 leading-relaxed">{offer.description}</p>
                      </div>

                      {/* Features List */}
                      <div className="grid grid-cols-2 gap-2">
                        {offer.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${offer.gradient}`}></div>
                            <span className="text-sm text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Active Indicator */}
                    {isActive && (
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                        <div className={`w-12 h-1 rounded-full bg-gradient-to-r ${offer.gradient}`}></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Indicator Dots */}
        <div className="flex justify-center space-x-3">
          {offers.map((offer) => (
            <button
              key={offer.id}
              onClick={() => handleCardClick(offer.id)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeCard === offer.id 
                  ? `bg-gradient-to-r ${offers.find(o => o.id === activeCard)?.gradient} transform scale-125` 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-600 to-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-teal-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer">
            <Globe className="w-5 h-5" />
            Explore All Features
            <Star className="w-5 h-5" />
          </div>
          <p className="text-gray-500 mt-4">Join 10,000+ travel agents already growing with YatraDarshak</p>
        </div>
      </div>
    </div>
  );
};

export default OffersSection;