import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Banner = () => {
  const bannerImages = [
    {
      id: 1,
      mobileImageUrl:
        "https://images.unsplash.com/photo-1521747116042-5a810fda9664?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg1MnwwfDF8c2VhcmNofDJ8fG1vYmlsZXxlbnwwfHx8fDE2Nzk3MzQ3NjY&ixlib=rb-1.2.1&q=80&w=500",
      desktopImageUrl:
        "https://images.unsplash.com/photo-1521747116042-5a810fda9664?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg1MnwwfDF8c2VhcmNofDJ8fG1vYmlsZXxlbnwwfHx8fDE2Nzk3MzQ3NjY&ixlib=rb-1.2.1&q=80&w=1080",
    },
    {
      id: 2,
      mobileImageUrl:
        "https://images.unsplash.com/photo-1521747116042-5a810fda9664?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg1MnwwfDF8c2VhcmNofDJ8fG1vYmlsZXxlbnwwfHx8fDE2Nzk3MzQ3NjY&ixlib=rb-1.2.1&q=80&w=500",
      desktopImageUrl:
        "https://images.unsplash.com/photo-1521747116042-5a810fda9664?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg1MnwwfDF8c2VhcmNofDJ8fG1vYmlsZXxlbnwwfHx8fDE2Nzk3MzQ3NjY&ixlib=rb-1.2.1&q=80&w=1080",
    },
    {
      id: 2,
      mobileImageUrl:
        "https://images.unsplash.com/photo-1521747116042-5a810fda9664?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg1MnwwfDF8c2VhcmNofDJ8fG1vYmlsZXxlbnwwfHx8fDE2Nzk3MzQ3NjY&ixlib=rb-1.2.1&q=80&w=500",
      desktopImageUrl:
        "https://images.unsplash.com/photo-1521747116042-5a810fda9664?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg1MnwwfDF8c2VhcmNofDJ8fG1vYmlsZXxlbnwwfHx8fDE2Nzk3MzQ3NjY&ixlib=rb-1.2.1&q=80&w=1080",
    },
    {
      id: 2,
      mobileImageUrl:
        "https://images.unsplash.com/photo-1521747116042-5a810fda9664?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg1MnwwfDF8c2VhcmNofDJ8fG1vYmlsZXxlbnwwfHx8fDE2Nzk3MzQ3NjY&ixlib=rb-1.2.1&q=80&w=500",
      desktopImageUrl:
        "https://images.unsplash.com/photo-1521747116042-5a810fda9664?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg1MnwwfDF8c2VhcmNofDJ8fG1vYmlsZXxlbnwwfHx8fDE2Nzk3MzQ3NjY&ixlib=rb-1.2.1&q=80&w=1080",
    },
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
    <div className="relative w-full h-[300px] md:h-[450px] lg:h-[550px] bg-gray-900">
      {/* Image Section */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <img
          src={bannerImages[currentIndex].mobileImageUrl}
          alt={`Banner ${currentIndex + 1}`}
          className="w-full h-full object-cover md:hidden"
        />
        <img
          src={bannerImages[currentIndex].desktopImageUrl}
          alt={`Banner ${currentIndex + 1}`}
          className="w-full h-full object-cover hidden md:block"
        />
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
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
        {bannerImages.map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-white scale-125" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
