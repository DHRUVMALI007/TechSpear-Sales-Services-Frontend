import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import productCategory from '../Helpers/ProductCategory';
import { FaBars, FaArrowLeft, FaTimes } from 'react-icons/fa';

const CategoryProduct = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const urlSearch = new URLSearchParams(location.search);
    const urlCategoryListinArray = urlSearch.getAll('category');

    const urlCategoryListObject = {};
    urlCategoryListinArray.forEach((el) => {
        urlCategoryListObject[el] = true;
    });

    const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
    const [filterCategoryList, setFilterCategoryList] = useState([]);
    const [sortBy, setSortBy] = useState('');
    const [data, setData] = useState([]);
    const [sidebarVisible, setSidebarVisible] = useState(false); // State for sidebar visibility

    // Static dataset for product categories
    useEffect(() => {
        const categoryData = [
            { id: 1, name: 'Laptop A', category: 'laptops', sellingPrice: 800 },
            { id: 2, name: 'Desktop B', category: 'desktops', sellingPrice: 1000 },
            { id: 9, name: 'Desktop B', category: 'desktops', sellingPrice: 1000 },
            { id: 3, name: 'Monitor C', category: 'monitors', sellingPrice: 300 },
            { id: 4, name: 'Gaming PC D', category: 'gaming', sellingPrice: 1200 },
            { id: 5, name: 'Keyboard E', category: 'accessories', sellingPrice: 50 },
            { id: 6, name: 'Keyboard f', category: 'accessories', sellingPrice: 50 },
        ];

        const filteredData = categoryData.filter((product) =>
            filterCategoryList.length ? filterCategoryList.includes(product.category) : true
        );
        setData(filteredData);
    }, [filterCategoryList]); // No need to include categoryData as a dependency


    const handleSelectCategory = (e) => {
        const { value, checked } = e.target;
        setSelectCategory((prev) => ({
            ...prev,
            [value]: checked,
        }));
    };

    useEffect(() => {
        const selectedCategories = Object.keys(selectCategory).filter((key) => selectCategory[key]);
        setFilterCategoryList(selectedCategories);

        // Format URL query string
        const urlFormat = selectedCategories.map((el, index) =>
            index === selectedCategories.length - 1 ? `category=${el}` : `category=${el}&&`
        );

        navigate('/product-category?' + urlFormat.join(''));
    }, [selectCategory, navigate]);

    const handleOnChangeSortBy = (e) => {
        const { value } = e.target;
        setSortBy(value);

        const sortedData = [...data];
        if (value === 'asc') {
            sortedData.sort((a, b) => a.sellingPrice - b.sellingPrice);
        } else if (value === 'dsc') {
            sortedData.sort((a, b) => b.sellingPrice - a.sellingPrice);
        }
        setData(sortedData);
    };

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulating data fetch delay
        setTimeout(() => {
            setLoading(false);
        }, 1000); // Adjust time as needed
    }, []);

    return (
        <div className="md:container mx-auto p-4 ">
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="border-4 border-blue-500 border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
                </div>
            ) : (
                <>

                    <button onClick={() => navigate('/')} className="p-2 text-lg text-black rounded-full mb-4">
                        <FaArrowLeft />
                    </button>
                    {/*** Desktop version (from md and above) ***/}
                    <div className="hidden md:grid grid-cols-[180px,1fr] gap-4">
                        {/*** Left Side (Filters) ***/}
                        <div className="bg-white p-2 overflow-y-auto">
                            {/** Sort By **/}
                            <div>
                                <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
                                    Sort by
                                </h3>
                                <form className="text-sm flex flex-col gap-2 py-2">
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="radio"
                                            name="sortBy"
                                            checked={sortBy === 'asc'}
                                            onChange={handleOnChangeSortBy}
                                            value="asc"
                                        />
                                        <label>Price - Low to High</label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="radio"
                                            name="sortBy"
                                            checked={sortBy === 'dsc'}
                                            onChange={handleOnChangeSortBy}
                                            value="dsc"
                                        />
                                        <label>Price - High to Low</label>
                                    </div>
                                </form>
                            </div>

                            {/** Filter by Category **/}
                            <div>
                                <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
                                    Category
                                </h3>
                                <form className="text-sm flex flex-col gap-2 py-2">
                                    {productCategory.map((categoryName, index) => (
                                        <div className="flex items-center gap-3" key={index}>
                                            <input
                                                type="checkbox"
                                                name="category"
                                                checked={selectCategory[categoryName?.value] || false}
                                                value={categoryName?.value}
                                                id={categoryName?.value}
                                                onChange={handleSelectCategory}
                                            />
                                            <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                                        </div>
                                    ))}
                                </form>
                            </div>
                        </div>

                        {/*** Right Side (Product List) ***/}
                        <div className="bg-white">
                            <div>Search Result :</div>
                            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                                <div className="mt-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {data.map((product) => (
                                        <div key={product.id} className="bg-gray-100 p-4 rounded-lg shadow">
                                            <div className="relative">
                                                <div className="relative h-56 w-full overflow-hidden rounded-lg">
                                                    {/* Placeholder Image or Replace with actual image source */}
                                                    <img alt={product.name} src="/placeholder.jpg" className="size-full object-cover" />
                                                </div>
                                                <div className="relative mt-4">
                                                    <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                                                    <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                                                </div>
                                                <div className="absolute inset-x-0 top-0 flex h-56 items-end justify-end overflow-hidden rounded-lg p-4">
                                                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black opacity-50" />
                                                    <p className="relative text-lg font-semibold text-white">${product.sellingPrice}</p>
                                                </div>
                                            </div>
                                            <div className="mt-6">
                                                <button className="w-full flex items-center justify-center rounded-md border border-transparent bg-blue-500 text-white px-6 py-2 text-sm font-medium hover:bg-blue-600">
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>

                    {/*** Mobile and Small Screens (below md) ***/}
                    <div className="md:hidden">
                        {/* Mobile layout with two columns */}
                        <div className="flex justify-between items-center mb-4">
                            {/* Hamburger Menu */}
                            <button
                                onClick={() => setSidebarVisible(!sidebarVisible)}
                                className="p-4 text-lg text-white bg-blue-500 rounded-full"
                            >
                                {sidebarVisible ? <FaTimes /> : <FaBars />} {/* Toggle icon */}
                            </button>

                            {/* Search Results */}
                            <p className="font-medium text-slate-800 text-lg">Search Results: {data.length}</p>
                        </div>

                        {/* Sidebar */}
                        <div
                            className={`fixed top-35 left-0 h-full bg-gray-100 shadow-md z-40 transition-transform ${sidebarVisible ? 'transform-none' : 'transform -translate-x-full'
                                }`}
                            style={{ width: '250px' }}
                        >
                            <div className="p-4">
                                <button
                                    onClick={() => setSidebarVisible(false)} // Close sidebar
                                    className="p-2 text-red-500 hover:text-red-700"
                                >
                                    <i className="fas fa-times"></i> {/* Close icon */}
                                </button>

                                {/** Sort By **/}
                                <div>
                                    <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
                                        Sort by
                                    </h3>
                                    <form className="text-sm flex flex-col gap-2 py-2">
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="sortBy"
                                                checked={sortBy === 'asc'}
                                                onChange={handleOnChangeSortBy}
                                                value="asc"
                                            />
                                            <label>Price - Low to High</label>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="sortBy"
                                                checked={sortBy === 'dsc'}
                                                onChange={handleOnChangeSortBy}
                                                value="dsc"
                                            />
                                            <label>Price - High to Low</label>
                                        </div>
                                    </form>
                                </div>

                                {/** Filter by Category **/}
                                <div>
                                    <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
                                        Category
                                    </h3>
                                    <form className="text-sm flex flex-col gap-2 py-2">
                                        {productCategory.map((categoryName, index) => (
                                            <div className="flex items-center gap-3" key={index}>
                                                <input
                                                    type="checkbox"
                                                    name="category"
                                                    checked={selectCategory[categoryName?.value] || false}
                                                    value={categoryName?.value}
                                                    id={categoryName?.value}
                                                    onChange={handleSelectCategory}
                                                />
                                                <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                                            </div>
                                        ))}
                                    </form>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="bg-white">
                            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {data.map((product) => (
                                        <div key={product.id} className="bg-gray-100 p-4 rounded-lg shadow">
                                            <div className="relative">
                                                <div className="relative h-56 w-full overflow-hidden rounded-lg">
                                                    {/* Placeholder Image or Replace with actual image source */}
                                                    <img alt={product.name} src="/placeholder.jpg" className="size-full object-cover" />
                                                </div>
                                                <div className="relative mt-4">
                                                    <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                                                    <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                                                </div>
                                                <div className="absolute inset-x-0 top-0 flex h-56 items-end justify-end overflow-hidden rounded-lg p-4">
                                                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black opacity-50" />
                                                    <p className="relative text-lg font-semibold text-white">${product.sellingPrice}</p>
                                                </div>
                                            </div>
                                            <div className="mt-6">
                                                <button className="w-full flex items-center justify-center rounded-md border border-transparent bg-blue-500 text-white px-6 py-2 text-sm font-medium hover:bg-blue-600">
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </>
            )}
        </div>
    );
};

export default CategoryProduct;
