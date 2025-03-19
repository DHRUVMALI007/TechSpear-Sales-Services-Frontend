import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import productCategory from "../Helpers/ProductCategory";
import VerticalCard from "../Components/VerticalCardProduct";
import { HiFilter, HiArrowLeft } from "react-icons/hi"; // Import back icon

const staticProducts = [
    { id: 1, name: "Gaming Laptop", sellingPrice: 800, category: "laptop" },
    { id: 2, name: "Wireless Mouse", sellingPrice: 40, category: "mouse" },
    { id: 3, name: "Mechanical Keyboard", sellingPrice: 100, category: "keyboard" },
    { id: 4, name: "Smartphone X", sellingPrice: 600, category: "mobiles" },
    { id: 5, name: "Bluetooth Headphones", sellingPrice: 150, category: "earphones" },
    { id: 6, name: "Gaming Monitor", sellingPrice: 300, category: "monitors" },
    { id: 7, name: "Smart Watch", sellingPrice: 200, category: "watches" },
    { id: 8, name: "Printer", sellingPrice: 250, category: "printers" },
    { id: 9, name: "Home Speaker", sellingPrice: 180, category: "speakers" },
    { id: 10, name: "Processor i7", sellingPrice: 350, category: "processor" }
];

const CategoryProduct = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const urlSearch = new URLSearchParams(location.search);
    const urlCategoryList = urlSearch.getAll("category");

    const initialCategoryState = {};
    urlCategoryList.forEach((el) => {
        initialCategoryState[el] = true;
    });

    const [selectCategory, setSelectCategory] = useState(initialCategoryState);
    const [filterCategoryList, setFilterCategoryList] = useState(urlCategoryList);
    const [sortBy, setSortBy] = useState("");
    const [data, setData] = useState(staticProducts);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        const selectedCategories = Object.keys(selectCategory).filter(
            (key) => selectCategory[key]
        );
        setFilterCategoryList(selectedCategories);

       // const urlParams = selectedCategories.map((cat) => `category=${cat}`).join("&");
       // navigate(`/product-category?${urlParams}`);
    }, [selectCategory]);

    useEffect(() => {
        let filteredData = staticProducts;

        if (filterCategoryList.length) {
            filteredData = staticProducts.filter((product) =>
                filterCategoryList.includes(product.category)
            );
        }

        if (sortBy === "asc") {
            filteredData = [...filteredData].sort((a, b) => a.sellingPrice - b.sellingPrice);
        }
        if (sortBy === "dsc") {
            filteredData = [...filteredData].sort((a, b) => b.sellingPrice - a.sellingPrice);
        }

        setData(filteredData);
    }, [filterCategoryList, sortBy]);

    return (
        <div className="container mx-auto p-4">
            {/* Back Button */}
            <button
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold mb-4"
                onClick={() => navigate("/")}
            >
                <HiArrowLeft size={20} /> Back to Home
            </button>

            {/* Top section for filters & sorting */}
            <div className="flex justify-between items-center mb-4">
                <button
                    className="lg:hidden bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
                    onClick={() => setShowFilters(true)}
                >
                    <HiFilter size={20} /> Filters
                </button>

                <select
                    className="border px-3 py-2 rounded-md text-sm"
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="">Sort By</option>
                    <option value="asc">Price - Low to High</option>
                    <option value="dsc">Price - High to Low</option>
                </select>
            </div>

            <div className="grid lg:grid-cols-[250px,1fr] gap-4">
                {/* Sidebar Filters */}
                <div
                    className={`bg-white p-4 border rounded-md transition-transform duration-300 ease-in-out
                                fixed left-0 h-full w-[80%] max-w-[300px] z-50 shadow-lg pt-16
                                ${showFilters ? "translate-x-0 top-[60px]" : "-translate-x-full"} lg:translate-x-0 lg:static lg:w-full lg:pt-0`}
                >
                    {showFilters && (
                        <div className="flex justify-between items-center lg:hidden">
                            <h3 className="text-lg font-semibold mb-2">Filters</h3>
                            <button
                                className="text-red-500 text-xl font-bold"
                                onClick={() => setShowFilters(false)}
                            >
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
                                            const { value, checked } = e.target;
                                            setSelectCategory((prev) => ({
                                                ...prev,
                                                [value]: checked,
                                            }));
                                        }}
                                    />
                                    <label htmlFor={category.value}>{category.label}</label>
                                </div>
                            ))}
                        </form>
                    </div>
                </div>

                {/* Product List */}
                <div>
                    <p className="font-medium text-gray-800 text-lg my-2">
                        Search Results: {data.length}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {data.length !== 0 ? <VerticalCard data={data} /> : <p>No products found.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryProduct;
