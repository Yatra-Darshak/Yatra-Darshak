import React from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaPlane,
  FaHotel,
  FaUmbrellaBeach,
  FaTrain,
  FaBus,
  FaTaxi,
} from "react-icons/fa";
import homeBg from "../assets/homebg.png";
import robot from "../assets/robot.png";
import Destinations from "../pages/Destinations"; // ✅ keep this
import DiscoverPage from "../pages/Discover";

const Hero = () => {
  return (
    <div className="w-full">
      {/* Hero Banner Section */}
      <div
        className="relative w-full h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${homeBg})` }}
      >
        {/* Categories Bar */}
        <div className="absolute top-20 left-0 w-full bg-[#2a305e]/95 py-3 px-4 md:px-6 flex flex-wrap justify-center md:justify-start items-center gap-4 md:gap-6 text-white z-20 shadow-md">
          <div className="bg-gray-100 rounded-full h-8 w-8 flex items-center justify-center">
            <FaSearch className="text-[#2a305e]" />
          </div>
          {[
            "Historical sites",
            "Natural Escapes",
            "Adventure sites",
            "Religious Sites",
            "Beach Gateways",
            "Romantic Retreats",
          ].map((cat, i) => (
            <Link
              key={i}
              to="/explore"
              className="text-white hover:text-gray-300 text-sm md:text-base whitespace-nowrap"
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="absolute top-36 md:top-40 left-0 w-full px-4 md:px-6 z-20 flex flex-col lg:flex-row justify-center items-center lg:items-start gap-10">
          {/* Left Column */}
          <div className="flex flex-col items-center w-full lg:w-auto">
            {/* Search Bar */}
            <div className="w-full mt-10 md:mt-20 max-w-md mb-6 md:mb-8">
              <div className="flex items-center bg-white rounded-full shadow-lg px-4 py-3">
                <FaSearch className="text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Search and Select your Destinations..."
                  className="flex-1 outline-none text-gray-700 bg-transparent text-sm md:text-base"
                />
              </div>
            </div>

            {/* Title */}
            <div className="text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg mb-10 md:mb-16 leading-snug">
                Plan, Explore and <br /> Book with <br /> Yatradarshak
              </h1>
            </div>
          </div>

          {/* Right Column - Services */}
          <div className="bg-white rounded-lg p-6 mt-20 shadow-lg w-full sm:w-96 md:w-80 lg:w-72">
            <div className="grid grid-cols-3 gap-4">
              <ServiceCard
                icon={<FaPlane className="text-blue-500" />}
                title="Flights"
              />
              <ServiceCard
                icon={<FaHotel className="text-blue-500" />}
                title="Hotels"
              />
              <ServiceCard
                icon={<FaUmbrellaBeach className="text-blue-500" />}
                title="Holidays"
              />
              <ServiceCard
                icon={<FaTrain className="text-blue-500" />}
                title="Trains"
              />
              <ServiceCard
                icon={<FaBus className="text-blue-500" />}
                title="Buses"
              />
              <ServiceCard
                icon={<FaTaxi className="text-blue-500" />}
                title="Cabs"
              />
            </div>
          </div>
        </div>

        {/* Floating Chatbot */}
        <div className="absolute bottom-6 right-4 sm:right-6 z-30 flex items-center space-x-2 sm:space-x-3">
          <div className="bg-white px-3 sm:px-4 py-2 rounded-full shadow-lg text-gray-800 text-xs sm:text-sm">
            <FaSearch className="inline mr-1 sm:mr-2 text-xs" />
            Namaste! Plan Your Trips With Me
          </div>
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
            <img src={robot} alt="Bot" className="h-10 w-10 sm:h-14 sm:w-14" />
          </div>
        </div>
      </div>

      {/* 👇 Destinations Section - Visible below Hero */}
      <div className="relative z-10 bg-gradient-to-b from-white to-gray-50">
        <Destinations />
        <DiscoverPage />
      </div>
    </div>
  );
};

const ServiceCard = ({ icon, title }) => (
  <div className="flex flex-col items-center justify-center py-4">
    <div className="text-xl sm:text-2xl mb-2">{icon}</div>
    <span className="text-xs sm:text-sm font-medium text-gray-800">
      {title}
    </span>
  </div>
);

export default Hero;
