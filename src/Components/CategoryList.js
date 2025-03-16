import React, { useState, useEffect, useMemo, useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../Helpers/ThemeContext"; // ✅ Importing ThemeContext

const CategoryList = () => {
  const { isDarkMode } = useContext(ThemeContext); // ✅ Using Theme Context

  const [loading, setLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  // Memoized category list
  const categoryProducts = useMemo(
    () => [
      { category: "Laptops", productImage: "https://images.unsplash.com/photo-1521747116042-5a810fda9664" },
      { category: "Desktops", productImage: "https://images.unsplash.com/photo-1521747116042-5a810fda9664" },
      { category: "Accessories", productImage: "https://images.unsplash.com/photo-1589927986089-35812388d1f4" },
      { category: "Gaming", productImage: "https://images.unsplash.com/photo-1521747116042-5a810fda9664" },
      { category: "Monitors", productImage: "https://images.unsplash.com/photo-1521747116042-5a810fda9664" },
    ],
    []
  );

  useEffect(() => {
    let isMounted = true;

    const preloadImages = () => {
      categoryProducts.forEach((product) => {
        const img = new Image();
        img.src = product.productImage;
        img.onload = () => {
          if (isMounted) {
            setImagesLoaded((prev) => prev + 1);
          }
        };
      });
    };

    preloadImages();

    return () => {
      isMounted = false;
    };
  }, [categoryProducts]);

  useEffect(() => {
    if (imagesLoaded === categoryProducts.length) {
      setLoading(false);
    }
  }, [imagesLoaded, categoryProducts.length]);

  return (
    <div className="xl:container mx-auto p-4">
      <div className="scroll-container flex items-center gap-4 justify-between overflow-x-auto">
        {loading
          ? categoryProducts.map((_, index) => (
              <div
                className="h-16 w-16 md:w-20 md:h-20 rounded-full bg-slate-300 animate-pulse"
                key={index}
              ></div>
            ))
          : categoryProducts.map((product) => (
              <Link
                key={product.category}
                to={`/product-category?category=${product.category}`}
                className="flex flex-col items-center text-center cursor-pointer"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-18 md:h-18 rounded-full overflow-hidden p-1 bg-gray-200 flex items-center justify-center">
                  <img
                    src={product.productImage}
                    alt={product.category}
                    className="h-full w-full object-cover rounded-full hover:scale-110 transition-transform"
                  />
                </div>
                {/* ✅ Dynamic Text Color Based on Theme */}
                <p className={`mt-2 text-sm md:text-base capitalize ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                  {product.category}
                </p>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default CategoryList;
