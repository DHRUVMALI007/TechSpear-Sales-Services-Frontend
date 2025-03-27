import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import productCategory from "../Helpers/ProductCategory";
import VerticalCard from "../Components/VerticalCardProduct";
import { HiFilter } from "react-icons/hi";
import axios from "axios";

const CategoryProduct = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const urlSearch = new URLSearchParams(location.search);
    const urlCategoryList = urlSearch.getAll("category");

    const [selectCategory, setSelectCategory] = useState(
        urlCategoryList.reduce((acc, el) => ({ ...acc, [el]: true }), {})
    );
    const [filterCategoryList, setFilterCategoryList] = useState(urlCategoryList);
    const [sortBy, setSortBy] = useState("");
    const [data, setData] = useState([]);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const queryParams = new URLSearchParams();
                filterCategoryList.forEach((category) => queryParams.append("category", category));
                if (sortBy) queryParams.append("sortOption", sortBy === "asc" ? "LowToHigh" : "HighToLow");
                console.log(sortBy);

                const response = await axios.get(`http://localhost:5000/api/v1/products/getCategoryBasedProduct?${queryParams.toString()}`);
                setData(response.data.data);
                console.log(data)
            } catch (error) {
                console.error("Error fetching products:", error);
                setData([]);
            }
        };

        if (filterCategoryList.length) fetchProducts();
    }, [filterCategoryList, sortBy]);

    useEffect(() => {
        const selectedCategories = Object.keys(selectCategory).filter((key) => selectCategory[key]);
        setFilterCategoryList(selectedCategories);
        navigate(`/product-category?${selectedCategories.map((cat) => `category=${cat}`).join("&")}`);
    }, [selectCategory, navigate]);

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <button
                    className="lg:hidden bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
                    onClick={() => setShowFilters(true)}
                >
                    <HiFilter size={20} /> Filters
                </button>
                <select className="border px-3 py-2 rounded-md text-sm" onChange={(e) => setSortBy(e.target.value)}>
                    <option value="">Sort By</option>
                    <option value="asc">Price - Low to High</option>
                    <option value="dsc">Price - High to Low</option>
                </select>
            </div>

            <div className="grid lg:grid-cols-[250px,1fr] gap-4">
                <div
                    className={`bg-white p-4 border rounded-md fixed left-0 h-full w-[80%] max-w-[300px] z-50 shadow-lg pt-16 
                        ${showFilters ? "translate-x-0 top-[60px]" : "-translate-x-full"} lg:translate-x-0 lg:static lg:w-full lg:pt-0`}
                >
                    {showFilters && (
                        <div className="flex justify-between items-center lg:hidden">
                            <h3 className="text-lg font-semibold mb-2">Filters</h3>
                            <button className="text-red-500 text-xl font-bold" onClick={() => setShowFilters(false)}>
                                ✖
                            </button>
                        </div>
                    )}
                    <div>
                        <h3 className="text-base uppercase font-medium text-gray-600 border-b pb-1 border-gray-300">
                            Category
                        </h3>
                        <form className="text-sm flex flex-col gap-2 py-2">
                            {productCategory.map((category, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        name="category"
                                        checked={selectCategory[category.value] || false}
                                        value={category.value}
                                        id={category.value}
                                        onChange={(e) => {
                                            setSelectCategory((prev) => ({
                                                ...prev,
                                                [e.target.value]: e.target.checked,
                                            }));
                                        }}
                                    />
                                    <label htmlFor={category.value}>{category.label}</label>
                                </div>
                            ))}
                        </form>
                    </div>
                </div>

                <div>
                    <p className="font-medium text-gray-800 text-lg my-2">Search Results: {data?.length}</p>
                    <div className="w-full flex gap-4">
                        {data.length !== 0 ? <VerticalCard data={data} className={`w-full h-full `}/> : <p>No products found.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryProduct;
