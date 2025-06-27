


import React, { useEffect, useState } from "react";
import axios from "axios";

const Carousel2 = () => {
  const [mobiles, setMobiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const baseImageUrl = "http://localhost:3001/images/";

  useEffect(() => {
    axios
      .get("http://localhost:3001/mobiles")
      .then((res) => setMobiles(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (mobiles.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === mobiles.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000);
    return () => clearInterval(interval);
  }, [mobiles]);

  if (mobiles.length === 0)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-xl text-gray-500 animate-pulse">Loading Mobiles...</p>
      </div>
    );

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {mobiles.map((mobile, index) => (
        <div
          key={mobile._id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={
              mobile.image.startsWith("http")
                ? mobile.image
                : baseImageUrl + mobile.image
            }
            alt={mobile.name}
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-center items-center text-center px-4 md:px-8">
            <h3 className="text-sm md:text-xl text-cyan-300 uppercase tracking-widest mb-3">
              New Arrival
            </h3>

            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 mb-4 drop-shadow-lg">
              {mobile.name}
            </h2>

            <p className="text-white/90 max-w-3xl text-base md:text-xl leading-relaxed drop-shadow">
              {mobile.description || "Experience the future with this powerful mobile device."}
            </p>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={() =>
          setCurrentIndex(currentIndex === 0 ? mobiles.length - 1 : currentIndex - 1)
        }
        className="absolute left-5 top-1/2 transform -translate-y-1/2 z-20 text-white text-3xl bg-black/40 hover:bg-cyan-600 focus:outline-none rounded-full p-3 transition"
        aria-label="Previous"
      >
        ❮
      </button>

      <button
        onClick={() => setCurrentIndex((currentIndex + 1) % mobiles.length)}
        className="absolute right-5 top-1/2 transform -translate-y-1/2 z-20 text-white text-3xl bg-black/40 hover:bg-cyan-600 focus:outline-none rounded-full p-3 transition"
        aria-label="Next"
      >
        ❯
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
        {mobiles.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === currentIndex ? "bg-white" : "bg-white/40"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel2;
