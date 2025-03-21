import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../Helpers/ThemeContext";
import { FaSpinner } from "react-icons/fa";

const products = [
  { id: 1, name: "Zip Tote Basket", color: "White and black", price: "$140", imageSrc: "https://tailwindui.com/plus/img/ecommerce-images/product-page-03-related-product-01.jpg" },
  { id: 2, name: "Leather Handbag", color: "Brown leather", price: "$180", imageSrc: "https://tailwindui.com/plus/img/ecommerce-images/product-page-03-related-product-02.jpg" },
  { id: 3, name: "Classic Backpack", color: "Black", price: "$120", imageSrc: "https://tailwindui.com/plus/img/ecommerce-images/product-page-03-related-product-03.jpg" },
  { id: 4, name: "Travel Duffel", color: "Gray", price: "$160", imageSrc: "https://tailwindui.com/plus/img/ecommerce-images/product-page-03-related-product-04.jpg" },
  { id: 5, name: "Laptop Sleeve", color: "Navy Blue", price: "$90", imageSrc: "https://tailwindui.com/plus/img/ecommerce-images/product-page-03-related-product-05.jpg" },
  { id: 6, name: "Canvas Messenger Bag", color: "Olive Green", price: "$130", imageSrc: "https://tailwindui.com/plus/img/ecommerce-images/product-page-03-related-product-06.jpg" },
];

export default function ProductGrid() {
  const { isDarkMode } = useContext(ThemeContext);
  const [visibleCount, setVisibleCount] = useState(3); // Default for md/lg
  const [columns, setColumns] = useState(3);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(2);
        setColumns(2);
      } else {
        setVisibleCount(3);
        setColumns(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleViewMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prevCount) => prevCount + columns);
      setLoading(false);
    }, 1000); // Simulate loading time
  };

  const handleViewLess = () => {
    setVisibleCount(columns);
  };

  return (
    <div className={`${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"} py-16`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Heading */}
        <h2 className="text-2xl font-bold text-start mb-8">Customers Also Bought</h2>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {products.slice(0, visibleCount).map((product) => (
            <div
              key={product.id}
              className={`h-full flex flex-col rounded-lg shadow-md overflow-hidden group transition duration-300 
                ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
            >
              {/* Image Container */}
              <div className="relative h-44 sm:h-52 md:h-72 w-full overflow-hidden">
                <img
                  src={product.imageSrc}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Price Overlay */}
                <div className="absolute bottom-0 left-0 w-full h-16 sm:h-20 bg-gradient-to-t from-black to-transparent opacity-75 flex items-end p-3 sm:p-4">
                  <p className="text-base sm:text-lg font-semibold text-white">{product.price}</p>
                </div>
              </div>

              {/* Product Info */}
              <div className="flex-grow p-3 sm:p-4 space-y-1 sm:space-y-2">
                <h3 className="text-base sm:text-lg font-semibold">{product.name}</h3>
                <p className={`text-xs sm:text-sm ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}>{product.color}</p>
              </div>

              {/* Add to Cart Button */}
              <div className="p-3 sm:p-4 mt-auto">
                <button
                  className={`block w-full text-center font-medium py-2 rounded-md transition duration-300
                    ${isDarkMode ? "bg-red-600 text-white hover:bg-red-700" : "bg-blue-600 text-white hover:bg-blue-700"}`}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View More & View Less Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          {visibleCount < products.length && (
            <button
              onClick={handleViewMore}
              className={`px-6 py-2 text-lg font-medium rounded-md transition duration-300 flex items-center space-x-2
                ${isDarkMode ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-gray-200 text-gray-900 hover:bg-gray-300"}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  <span>Loading...</span>
                </>
              ) : (
                "View More"
              )}
            </button>
          )}

          {visibleCount > columns && (
            <button
              onClick={handleViewLess}
              className={`px-6 py-2 text-lg font-medium rounded-md transition duration-300
                ${isDarkMode ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-gray-200 text-gray-900 hover:bg-gray-300"}`}
            >
              View Less
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
