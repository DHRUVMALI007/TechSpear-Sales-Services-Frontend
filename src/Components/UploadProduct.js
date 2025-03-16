import React, { useState } from 'react';
import { CgClose } from "react-icons/cg";
import productCategory from '../Helpers/ProductCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast } from 'react-toastify';

const UploadProduct = ({ onClose, fetchData }) => {
    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImage: [],
        description: "",
        price: "",
        sellingPrice: ""
    });
    const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
    const [fullScreenImage, setFullScreenImage] = useState("");

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUploadProduct = async (e) => {
        const files = e.target.files;
        const newImages = [];

        // Loop through all selected files and convert them to base64
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            reader.onloadend = () => {
                newImages.push(reader.result); // Store each base64 image string
                if (newImages.length === files.length) {
                    setData((prev) => ({
                        ...prev,
                        productImage: [...prev.productImage, ...newImages]  // Append new images to the state
                    }));
                }
            };

            if (file) {
                reader.readAsDataURL(file);  // Convert image to base64
            }
        }
    };

    const handleDeleteProductImage = (index) => {
        const newProductImage = [...data.productImage];
        newProductImage.splice(index, 1);

        setData((prev) => ({
            ...prev,
            productImage: newProductImage
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Product uploaded:", data);

        toast.success("Product uploaded successfully!");
        fetchData?.();
        onClose();
    };

    return (
        <div className="fixed w-full h-full bg-slate-400 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
            <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
                <div className="flex justify-between items-center pb-3">
                    <h2 className="font-bold text-lg">Upload Product</h2>
                    <div
                        className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
                        onClick={onClose}
                    >
                        <CgClose />
                    </div>
                </div>

                <form className="grid p-4 gap-2 overflow-auto h-full pb-5" onSubmit={handleSubmit}>
                    <label htmlFor="productName">Product Name:</label>
                    <input
                        type="text"
                        id="productName"
                        placeholder="Enter product name"
                        name="productName"
                        value={data.productName}
                        onChange={handleOnChange}
                        className="p-2 bg-slate-100 border rounded"
                        required
                    />

                    <label htmlFor="category" className="mt-3">Category:</label>
                    <select
                        required
                        value={data.category}
                        name="category"
                        onChange={handleOnChange}
                        className="p-2 bg-slate-100 border rounded relative z-10 w-full text-sm sm:text-base"
                    >
                        <option value="">Select Category</option>
                        {productCategory.map((el, index) => (
                            <option value={el.value} key={el.value + index}>
                                {el.label}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="productImage" className="mt-3">Product Image:</label>
                    <label htmlFor="uploadImageInput">
                        <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
                            <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                                <span className="text-4xl"><FaCloudUploadAlt /></span>
                                <p className="text-sm">Upload Product Image</p>
                                <input
                                    type="file"
                                    id="uploadImageInput"
                                    className="hidden"
                                    onChange={handleUploadProduct}
                                    multiple
                                />
                            </div>
                        </div>
                    </label>

                    {/* Display Uploaded Images with Close Icon */}
                    <div className="mt-3">
                        {data?.productImage[0] ? (
                            <div className="flex items-center gap-2 flex-wrap">
                                {data.productImage.map((el, index) => (
                                    <div className="relative group" key={index}>
                                        <img
                                            src={el}  // base64 string
                                            alt={el}
                                            width={80}
                                            height={80}
                                            className="bg-slate-100 border cursor-pointer"
                                            onClick={() => {
                                                setOpenFullScreenImage(true);
                                                setFullScreenImage(el);
                                            }}
                                        />
                                        {/* Close icon for removing image */}
                                        <div
                                            className="absolute top-0 right-0 p-1 text-white bg-red-600 rounded-full cursor-pointer"
                                            onClick={() => handleDeleteProductImage(index)}
                                        >
                                            <CgClose className="text-lg" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-red-600 text-xs">*Please upload product image</p>
                        )}
                    </div>

                    <label htmlFor="price" className="mt-3">Price:</label>
                    <input
                        type="number"
                        id="price"
                        placeholder="Enter price"
                        value={data.price}
                        name="price"
                        onChange={handleOnChange}
                        className="p-2 bg-slate-100 border rounded"
                        required
                    />

                    <label htmlFor="sellingPrice" className="mt-3">Selling Price:</label>
                    <input
                        type="number"
                        id="sellingPrice"
                        placeholder="Enter selling price"
                        value={data.sellingPrice}
                        name="sellingPrice"
                        onChange={handleOnChange}
                        className="p-2 bg-slate-100 border rounded"
                        required
                    />

                    <label htmlFor="description" className="mt-3">Description:</label>
                    <textarea
                        className="h-28 bg-slate-100 border resize-none p-1"
                        placeholder="Enter product description"
                        rows={3}
                        onChange={handleOnChange}
                        name="description"
                        value={data.description}
                    />

                    <button className="px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700">
                        Upload Product
                    </button>
                </form>

                {openFullScreenImage && (
                    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50">
                        <div className="relative w-auto h-auto">
                            <img src={fullScreenImage} alt="Full screen" />
                            <div
                                className="absolute top-0 right-0 p-2 cursor-pointer"
                                onClick={() => setOpenFullScreenImage(false)}
                            >
                                <CgClose className="text-white text-3xl" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UploadProduct;
