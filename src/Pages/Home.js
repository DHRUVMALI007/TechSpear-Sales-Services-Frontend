import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../Helpers/ThemeContext";
import CategoryList from "../Components/CategoryList";
import BannerProduct from "../Components/BannerProduct";
import HorizontalCardProduct from "../Components/HorizontalCardProduct";
import VerticalCardProduct from "../Components/VerticalCardProduct";
import Footer from "../Components/Footer";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="w-16 h-16 border-4 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="px-4 md:px-8 lg:px-12 py-6 space-y-8">
          <CategoryList />
          <BannerProduct />
          <HorizontalCardProduct />
          <HorizontalCardProduct />
          <HorizontalCardProduct />
          <VerticalCardProduct />
        </div>
      )}
      <Footer /> {/* Ensure Footer is inside the return statement */}
    </div>
  );
};

export default Home;
