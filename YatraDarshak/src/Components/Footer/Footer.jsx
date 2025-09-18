import React, { useState } from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Instagram, 
  Youtube, 
  Facebook, 
  Linkedin,
  Send,
  ExternalLink,
  Building2,
  Users,
  CreditCard,
  FileText,
  HelpCircle,
  Banknote
} from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [hoveredSocial, setHoveredSocial] = useState(null);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Handle email submission here
    console.log("Email submitted:", email);
    setEmail("");
  };

  const footerSections = [
    {
      title: "Corporate Information",
      icon: Building2,
      links: [
        { name: "About Us", href: "#", icon: ExternalLink },
        { name: "Our Products", href: "#", icon: ExternalLink },
        { name: "Terms and Conditions", href: "#", icon: FileText },
        { name: "Fare Rules", href: "#", icon: ExternalLink }
      ]
    },
    {
      title: "Customer Care",
      icon: Users,
      links: [
        { name: "Contact Us", href: "#", icon: Phone }
      ]
    },
    {
      title: "More",
      icon: HelpCircle,
      links: [
        { name: "Bank Details", href: "#", icon: Banknote }
      ]
    }
  ];

  const socialLinks = [
    { 
      name: "Instagram", 
      icon: Instagram, 
      href: "#", 
      color: "from-pink-500 to-purple-600",
      hoverColor: "hover:from-pink-600 hover:to-purple-700"
    },
    { 
      name: "YouTube", 
      icon: Youtube, 
      href: "#", 
      color: "from-red-500 to-red-600",
      hoverColor: "hover:from-red-600 hover:to-red-700"
    },
    { 
      name: "Facebook", 
      icon: Facebook, 
      href: "#", 
      color: "from-blue-500 to-blue-600",
      hoverColor: "hover:from-blue-600 hover:to-blue-700"
    },
    { 
      name: "LinkedIn", 
      icon: Linkedin, 
      href: "#", 
      color: "from-blue-600 to-blue-700",
      hoverColor: "hover:from-blue-700 hover:to-blue-800"
    }
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-teal-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-400 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 gap-12">
          
          {/* Footer Sections */}
          {footerSections.map((section, index) => {
            const SectionIcon = section.icon;
            return (
              <div 
                key={index}
                className="space-y-6 transform transition-all duration-500 hover:translate-y-1"
              >
                {/* Section Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-r from-teal-400 to-blue-500 rounded-lg flex items-center justify-center">
                    <SectionIcon className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{section.title}</h3>
                </div>

                {/* Links */}
                <div className="space-y-3">
                  {section.links.map((link, linkIndex) => {
                    const LinkIcon = link.icon;
                    return (
                      <div key={linkIndex} className="group">
                        <a 
                          href={link.href}
                          className="flex items-center gap-3 text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2"
                        >
                          <div className="w-4 h-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <LinkIcon className="w-3 h-3" />
                          </div>
                          <span className="underline decoration-transparent hover:decoration-teal-400 transition-all duration-300 underline-offset-4">
                            {link.name}
                          </span>
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Support Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                <Mail className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Support</h3>
            </div>

            {/* Email Subscription */}
            <div className="space-y-4">
              <p className="text-gray-300 text-sm">Enter your E-mail address</p>
              <div className="relative">
                <div className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your E-mail for updates"
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-l-xl text-white placeholder-gray-400 focus:outline-none focus:border-teal-400 focus:bg-white/15 transition-all duration-300"
                  />
                  <button
                    onClick={handleEmailSubmit}
                    className="px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 rounded-r-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
          
          {/* Copyright */}
          <div className="text-gray-400 text-sm">
            <span className="flex items-center gap-2">
              <span>©2025. All rights reserved.</span>
              <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
            </span>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center gap-4">
            <p className="text-gray-300 font-medium">Connect with us.</p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => {
                const SocialIcon = social.icon;
                const isHovered = hoveredSocial === index;
                
                return (
                  <a
                    key={index}
                    href={social.href}
                    className={`relative w-12 h-12 bg-gradient-to-r ${social.color} ${social.hoverColor} rounded-xl flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:rotate-3 shadow-lg hover:shadow-xl`}
                    onMouseEnter={() => setHoveredSocial(index)}
                    onMouseLeave={() => setHoveredSocial(null)}
                    aria-label={social.name}
                  >
                    <SocialIcon className={`w-5 h-5 text-white transition-all duration-300 ${isHovered ? 'scale-110' : ''}`} />
                    
                    {/* Hover Tooltip */}
                    <div className={`absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded transition-all duration-300 ${
                      isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
                    }`}>
                      {social.name}
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500"></div>
      </div>
    </footer>
  );
};

export default Footer;