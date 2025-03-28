import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import displayINRCurrency from '../Helpers/displayCurrency';
import addToCart from '../Helpers/addToCart';
import scrollTop from '../Helpers/scrollTop';
import axios from 'axios';
import useAddToCart from '../Helpers/addToCart';

const CategroyWiseProductDisplay = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); 
    const addToCart = useAddToCart();
  useEffect(() => {
    if (!category) return; // Agar category undefined ho to API request avoid karna

    const fetchData = async () => {
      setLoading(true); // Loading start
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/products/getCategoryBasedProduct?category=${category}`
        );

        console.log("API Response categorywiseProd:", response.data.data);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setLoading(false); // ✅ Loading stop
      }
    };

    fetchData();
  }, [category]);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
  };

  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>

      {/*Loading Indicator */}
      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] gap-6 overflow-x-scroll scrollbar-none">
          {data.length > 0 ? (
            data.map((product) => (
              <Link
                to={`/product/${product._id}`}
                className="w-full bg-white rounded-sm shadow"
                onClick={scrollTop}
                key={product._id}
              >
                <div className="bg-slate-200 h-48 p-4 flex justify-center items-center">
                  <img
                    src={product.mainProductImg}
                    alt={product.productName}
                    className="object-scale-down h-full hover:scale-110 transition-all"
                  />
                </div>
                <div className="p-4 grid gap-3">
                  <h2 className="font-medium text-base md:text-lg text-black">
                    {product.productName}
                  </h2>
                  <p className="capitalize text-slate-500">{product.category}</p>
                  <div className="flex gap-3">
                    <p className="text-red-600 font-medium">
                      {displayINRCurrency(product.price)}
                    </p>
                    <p className="text-slate-500 line-through">
                      {displayINRCurrency(product.underlinePrice)}
                    </p>
                  </div>
                  <button
                    className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full"
                    onClick={(e) => handleAddToCart(e, product._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500">No products found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CategroyWiseProductDisplay;
