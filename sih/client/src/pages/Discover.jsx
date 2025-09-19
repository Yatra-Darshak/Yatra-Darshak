import React, { useRef } from "react";
import { motion } from "framer-motion";

const naturalWonders = [
  {
    title: "Living Root Bridges",
    subtitle: "Meghalaya",
    image:
      "https://images.unsplash.com/photo-1600889241935-7798317a7836?q=80&w=2890&auto=format&fit=crop",
  },
  {
    title: "Dudhsagar falls",
    subtitle: "Goa",
    image:
      "https://images.unsplash.com/photo-1594916893699-b1d3d63d865c?q=80&w=2940&auto=format&fit=crop",
  },
  {
    title: "Gomukh",
    subtitle: "Uttarakhand",
    image:
      "https://images.unsplash.com/photo-1627993049586-773a9080e729?q=80&w=2940&auto=format&fit=crop",
  },
  {
    title: "Chilika Lake",
    subtitle: "Odisha",
    image:
      "https://images.unsplash.com/photo-1595180479133-911874246835?q=80&w=2940&auto=format&fit=crop",
  },
  {
    title: "Valley of Flowers",
    subtitle: "Uttarakhand",
    image:
      "https://images.unsplash.com/photo-1616851608752-19e49a882e3f?q=80&w=2940&auto=format&fit=crop",
  }, {
    title: "Valley of Flowers",
    subtitle: "Uttarakhand",
    image:
      "https://images.unsplash.com/photo-1616851608752-19e49a882e3f?q=80&w=2940&auto=format&fit=crop",
  }, {
    title: "Valley of Flowers",
    subtitle: "Uttarakhand",
    image:
      "https://images.unsplash.com/photo-1616851608752-19e49a882e3f?q=80&w=2940&auto=format&fit=crop",
  },
];

const latestTrends = [
  {
    city: "KUTCH",
    size: "small",
    image:
      "https://images.unsplash.com/photo-1596700813936-2580749a0c4f?q=80&w=2940&auto=format&fit=crop",
  },
  {
    city: "GOA",
    size: "wide",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2946&auto=format&fit=crop",
  },
  {
    city: "LADAKH",
    size: "small",
    image:
      "https://images.unsplash.com/photo-1597843054178-9512537651a5?q=80&w=2940&auto=format&fit=crop",
  },
  {
    city: "RAJASTHAN",
    size: "small",
    image:
      "https://images.unsplash.com/photo-1611094628373-108b97d2c388?q=80&w=2940&auto=format&fit=crop",
  },
  {
    city: "JODHPUR",
    size: "wide",
    image:
      "https://images.unsplash.com/photo-1621689625345-098e9860b730?q=80&w=2940&auto=format&fit=crop",
  },
  {
    city: "MANIPUR",
    size: "small",
    image:
      "https://images.unsplash.com/photo-1621532822165-288229e0689b?q=80&w=2940&auto=format&fit=crop",
  },
  {
    city: "GULMARG",
    size: "small",
    image:
      "https://images.unsplash.com/photo-1606558872652-ef19c727038e?q=80&w=2940&auto=format&fit=crop",
  },
  {
    city: "CHHATISGARH",
    size: "wide",
    image:
      "https://images.unsplash.com/photo-1619865103632-6a56f6c9d74c?q=80&w=2940&auto=format&fit=crop",
  },
//   {
//     city: "KASOL",
//     size: "small",
//     image:
//       "https://images.unsplash.com/photo-1624699564619-74d115e5a95f?q=80&w=2940&auto=format&fit=crop",
//   },
];

const HorizontalScrollSection = ({ title, data }) => {
  const scrollRef = useRef(null);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <button
          onClick={scrollRight}
          className="bg-gray-100 w-10 h-10 rounded-full shadow-lg flex items-center justify-center text-gray-800 text-2xl font-bold hover:scale-110 transition"
        >
          &gt;
        </button>
      </div>

      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto p-2 scroll-snap-x hide-scrollbar"
      >
        {data.map((item, i) => (
          <motion.div
            key={i}
            className="flex-none rounded-2xl overflow-hidden shadow-lg group cursor-pointer relative w-[200px] h-[260px]"
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
              <p className="text-lg font-semibold">{item.title}</p>
              <p className="text-sm opacity-90">{item.subtitle}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const LatestTrendsSection = ({ title, data }) => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 auto-rows-[180px] sm:auto-rows-[200px]">
        {data.map((item, i) => (
          <motion.div
            key={i}
            className={`relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer ${
              item.size === "wide" ? "col-span-2" : ""
            }`}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src={item.image}
              alt={item.city}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <h3 className="absolute bottom-3 left-3 text-xl sm:text-2xl font-bold text-white drop-shadow-lg">
              {item.city}
            </h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default function DiscoverPage() {
  return (
    <div className="p-6 space-y-10 bg-gray-50 min-h-screen">
      <HorizontalScrollSection
        title="Must Visit Natural Wonders"
        data={naturalWonders}
      />
      <LatestTrendsSection title="Latest Trends" data={latestTrends} />
    </div>
  );
}
