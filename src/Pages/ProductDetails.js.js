import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaStar, FaStarHalf } from 'react-icons/fa';
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { ThemeContext } from "../Helpers/ThemeContext";
import displayINRCurrency from '../Helpers/displayCurrency';
import CategoryWiseProductDisplay from '../Components/CategoryWiseProductDisplay';
import { useDispatch, useSelector } from "react-redux";
import { getSingleProductDetails } from '../features/productSlice';
import { toast } from 'react-toastify';
import useAddToCart from '../Helpers/addToCart';

const ProductDetails = () => {
    const [data, setData] = useState(null);
    const [activeImage, setActiveImage] = useState(""); // Initialize activeImage
    const [expanded, setExpanded] = useState(false);
    const addToCart = useAddToCart();

    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();

    
  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
  };


    useEffect(() => {
        const getDetail = async () => {
            const res = await dispatch(getSingleProductDetails(id));
            if (res.payload?.data) {
                setData(res.payload.data);
                setActiveImage(res.payload.data.mainProductImg || ""); // Set default image
                toast.success(res.payload?.message);
            } else {
                toast.error("Failed to fetch product details.");
            }
        };
        getDetail();
    }, [dispatch, id]); // Added dependency array

    // console.log(data)
    const { isDarkMode } = useContext(ThemeContext);

    if (!data) {
        return <p className="text-center mt-10">Loading product details...</p>;
    }

    return (
        <div className={`${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
            <div className="container mx-auto p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Product Image Section */}
                    <div className="relative flex flex-col lg:flex-row gap-4">
                        {/* Main Image */}
                        <div className={`relative flex-1 p-4 rounded-lg shadow-lg ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
                            <img
                                src={activeImage}
                                alt="Product"
                                className="w-full h-96 object-contain cursor-pointer transition-transform duration-300 hover:scale-105"
                            />
                        </div>

                        {/* Thumbnails */}
                        <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto">
                            {data.otherProductImg?.map((imgURL, index) => (
                                <img
                                    key={index}
                                    src={imgURL}
                                    alt="Thumbnail"
                                    className={`w-16 h-16 object-cover cursor-pointer border-2 rounded-lg p-1 transition
                                    ${activeImage === imgURL ? "border-red-500" : isDarkMode ? "border-gray-600" : "border-gray-300"}`}
                                    onClick={() => setActiveImage(imgURL)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Product Details Section */}
                    <div>
                        <p className={`text-sm px-3 py-1 rounded-full w-fit font-medium 
                        ${isDarkMode ? "bg-gray-700 text-red-300" : "bg-red-100 text-red-600"}`}>
                            {data.brandName}
                        </p>
                        <h2 className="text-3xl font-semibold mt-2">{data.productName}</h2>
                        <p className="capitalize text-gray-500">{data.category}</p>

                        {/* Rating */}
                        <div className="flex items-center gap-1 text-red-500 mt-2">
                            <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalf />
                            <span className="ml-2 text-sm text-gray-400">(4.5/5)</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-3 text-2xl font-semibold my-2">
                            <p className="text-red-600">{displayINRCurrency(data.price)}</p>
                            <p className="line-through text-gray-400">{displayINRCurrency(data.underlinePrice)}</p>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4 mt-4">
                            <button className="bg-red-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-red-700 transition" onClick={(e)=>handleAddToCart(e,data._id)}>
                                Add to Cart
                            </button>
                            <button
                                className="border-2 border-red-600 text-red-600 px-5 py-2 rounded-lg font-medium hover:bg-red-600 hover:text-white transition"
                                onClick={() => navigate('/cart')}
                            >
                                Buy Now
                            </button>
                        </div>

                        {/* Product Features */}
                        <div className="mt-6 border-t pt-4 border-gray-400">
                            <button
                                className="flex justify-between items-center w-full text-lg font-medium"
                                onClick={() => setExpanded(!expanded)}
                            >
                                Product Features
                                {expanded ? <IoMdRemove size={20} /> : <IoMdAdd size={20} />}
                            </button>
                            {expanded && (
                                <ul className="mt-2 space-y-1">
                                    {data.features?.map((feature, index) => (
                                        <li key={index} className="flex items-center gap-2">
                                            ✅ {feature}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Product Description */}
                        <div className="mt-6 border-t pt-4 border-gray-400">
                            <h3 className="text-lg font-medium">Description</h3>
                            <p className="mt-2">{data.description}</p>
                        </div>
                    </div>
                </div>

                {/* Recommended Products */}
                <CategoryWiseProductDisplay
                    category={data.category}
                    heading={'Recommended Products'}
                    className="no-scroll"
                />
            </div>
        </div>
    );
};

export default ProductDetails;
