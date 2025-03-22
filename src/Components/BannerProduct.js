import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import banner1 from "./Banner Images/Home.png";
import banner2 from "./Banner Images/Home (2).png";
import banner3 from "./Banner Images/Home (3).png";
import banner4 from "./Banner Images/Home (4).png";

const Banner = () => {
  const bannerImages = [
    { id: 1, imageUrl: banner1, link: "/product-category?category=Laptop" },
    { id: 2, imageUrl: banner2, link: "/product-category?category=PC" },
    { id: 3, imageUrl: banner3, link: "/product-category?category=Accessory" },
    { id: 4, imageUrl: banner4, link: "/product-category?category=Other" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [bannerImages.length]);

  const nextBanner = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
  };

  const prevBanner = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + bannerImages.length) % bannerImages.length
    );
  };

  return (
    <div className="relative w-full aspect-[16/9] bg-gray-900">
      {/* Image Section with Clickable Link */}
      <div className="absolute top-0 left-0 w-full h-full lg:h-auto overflow-hidden">
        <a href={bannerImages[currentIndex].link}>
          <img
            src={bannerImages[currentIndex].imageUrl}
            alt={`Banner ${currentIndex + 1}`}
            className="w-full h-full object-contain cursor-pointer"
          />
        </a>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevBanner}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-900/50 text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition"
      >
        <FaArrowLeft size={20} />
      </button>

      <button
        onClick={nextBanner}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-900/50 text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition"
      >
        <FaArrowRight size={20} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 md:gap-3">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-white scale-125" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
