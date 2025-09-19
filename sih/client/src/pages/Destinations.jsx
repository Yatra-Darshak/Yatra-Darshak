import React from "react";

const naturalWonders = [
  {
    title: "Living Root Bridges, Meghalaya",
    image:
      "https://images.unsplash.com/photo-1637324944880-54b69e9a6b2f?auto=format&fit=crop&w=800&q=60",
  },
  {
    title: "Dudhsagar falls, Goa",
    image:
      "https://images.unsplash.com/photo-1508182314998-3bd49473002f?auto=format&fit=crop&w=800&q=60",
  },
  {
    title: "Gomukh, Uttarakhand",
    image:
      "https://images.unsplash.com/photo-1615473780952-1a80ae0e1ea3?auto=format&fit=crop&w=800&q=60",
  },
  
];

const latestTrends = [
  {
    name: "KUTCH",
    image:
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "GOA",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "LADAKH",
    image:
      "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "RAJASTHAN",
    image:
      "https://images.unsplash.com/photo-1603264048828-4822c1f0e524?auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "JODHPUR",
    image:
      "https://images.unsplash.com/photo-1599661046271-5f9e8e96f82e?auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "MANIPUR",
    image:
      "https://images.unsplash.com/photo-1601628107065-dc5b19d91ed7?auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "GULMARG",
    image:
      "https://images.unsplash.com/photo-1615971677499-5467cbab01c5?auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "CHHATISGARH",
    image:
      "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "KASOL",
    image:
      "https://images.unsplash.com/photo-1559305616-3f99cd43e353?auto=format&fit=crop&w=800&q=60",
  },
];

export default function MoreDestinations() {
  return (
    <div className="p-6 space-y-10">
      {/* Must Visit Natural Wonders */}
      <section>
        <h2 className="text-xl font-bold mb-4">Must Visit Natural Wonders</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {naturalWonders.map((item, i) => (
            <div
              key={i}
              className="relative rounded-xl overflow-hidden shadow-md group"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-44 w-full object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="absolute bottom-2 left-2 text-white text-sm font-medium bg-black/40 px-2 py-1 rounded">
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Trends */}
      <section>
        <h2 className="text-xl font-bold mb-4">Latest Trends</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {latestTrends.map((place, i) => (
            <div
              key={i}
              className="relative rounded-xl overflow-hidden shadow-md group"
            >
              <img
                src={place.image}
                alt={place.name}
                className="h-28 w-full object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="absolute inset-0 bg-black/30"></div>
              <div className="absolute bottom-2 left-2 text-white text-sm font-bold drop-shadow-md tracking-wide">
                {place.name}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
