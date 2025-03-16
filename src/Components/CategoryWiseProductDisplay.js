import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import displayINRCurrency from '../Helpers/displayCurrency';
import addToCart from '../Helpers/addToCart';
import scrollTop from '../Helpers/scrollTop';

const CategroyWiseProductDisplay = ({ category, heading }) => {
  const [data] = useState([
    {
      _id: "1",
      productName: "Laptop ABC",
      category: "Laptops",
      productImage: ["/images/laptop1.png"],
      price: 90000,
      sellingPrice: 84999,
    },
    {
      _id: "2",
      productName: "Laptop XYZ",
      category: "Laptops",
      productImage: ["/images/laptop2.png"],
      price: 120000,
      sellingPrice: 99999,
    },
    {
      _id: "3",
      productName: "Gaming Laptop",
      category: "Laptops",
      productImage: ["/images/laptop3.png"],
      price: 150000,
      sellingPrice: 129999,
    }
  ]);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
  };

  return (
    <div className='container mx-auto px-4 my-6 relative'>
      <h2 className='text-2xl font-semibold py-4'>{heading}</h2>

      <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] gap-6 overflow-x-scroll scrollbar-none'>
        {data.map((product, index) => (
          <Link to={`/product/${product._id}`} className='w-full bg-white rounded-sm shadow' onClick={scrollTop} key={index}>
            <div className='bg-slate-200 h-48 p-4 flex justify-center items-center'>
              <img src={product.productImage[0]} alt={product.productName} className='object-scale-down h-full hover:scale-110 transition-all' />
            </div>
            <div className='p-4 grid gap-3'>
              <h2 className='font-medium text-base md:text-lg text-black'>{product.productName}</h2>
              <p className='capitalize text-slate-500'>{product.category}</p>
              <div className='flex gap-3'>
                <p className='text-red-600 font-medium'>{displayINRCurrency(product.sellingPrice)}</p>
                <p className='text-slate-500 line-through'>{displayINRCurrency(product.price)}</p>
              </div>
              <button className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full' onClick={(e) => handleAddToCart(e, product._id)}>Add to Cart</button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategroyWiseProductDisplay;
