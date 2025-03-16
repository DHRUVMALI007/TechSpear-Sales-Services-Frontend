import React, { useContext } from 'react';
import { ThemeContext } from "../Helpers/ThemeContext";

const products = [
  {
    id: 1,
    name: "Zip Tote Basket",
    color: "White and black",
    href: "#",
    imageSrc: "https://tailwindui.com/plus/img/ecommerce-images/product-page-03-related-product-01.jpg",
    imageAlt: "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
    price: "$140",
  },
  {
    id: 2,
    name: "Leather Handbag",
    color: "Brown leather",
    href: "#",
    imageSrc: "https://tailwindui.com/plus/img/ecommerce-images/product-page-03-related-product-02.jpg",
    imageAlt: "Leather handbag with adjustable strap and gold detailing.",
    price: "$180",
  },
];

export default function Example() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className={`${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"} py-16`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Heading */}
        <h2 className="text-2xl font-bold text-center mb-8">
          Customers Also Bought
        </h2>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className={`rounded-lg shadow-md overflow-hidden group transition duration-300 
                ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
            >
              {/* Image Container */}
              <div className="relative h-72 w-full overflow-hidden">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Price Overlay */}
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent opacity-75 flex items-end p-4">
                  <p className="text-lg font-semibold text-white">{product.price}</p>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}>{product.color}</p>
              </div>

              {/* Add to Cart Button */}
              <div className="p-4">
                <a
                  href={product.href}
                  className={`block w-full text-center font-medium py-2 rounded-md transition duration-300
                    ${isDarkMode ? "bg-red-600 text-white hover:bg-red-700" : "bg-blue-600 text-white hover:bg-blue-700"}`}
                >
                  Add to Cart
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
