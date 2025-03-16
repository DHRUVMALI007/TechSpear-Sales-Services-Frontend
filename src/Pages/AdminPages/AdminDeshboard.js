import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';


ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const Dashboard = () => {
    // Sample Data for Charts
    const salesData = {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
            {
                label: 'Sales',
                data: [30, 45, 60, 90, 120],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
        ],
    };

    const revenueData = {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
            {
                label: 'Revenue Growth',
                data: [1000, 1500, 1800, 2500, 3200],
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                fill: true,
            },
        ],
    };

    // Sample Data for Most Sold Products
    const mostSoldProducts = ['Laptop', 'Gaming PC', 'Mouse'];
    const productDetails = {
        'Laptop': { description: 'High-performance laptop for work and play.', price: '$1,200', stock: 50 },
        'Gaming PC': { description: 'Powerful gaming PC with latest graphics.', price: '$1,800', stock: 30 },
        'Mouse': { description: 'Ergonomic wireless mouse for smooth navigation.', price: '$50', stock: 100 },
    };

    // Sample Reviews Data
    const reviews = [
        { reviewer: 'John Doe', rating: 5, comment: 'Excellent product! The laptop is fast and sleek.' },
        { reviewer: 'Jane Smith', rating: 4, comment: 'Great performance, but the battery could be better.' },
        { reviewer: 'David Brown', rating: 3, comment: 'The mouse is good, but not great for long hours of use.' },
    ];

    // State for product details and review toggle
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedReview, setSelectedReview] = useState(null);

    // Toggle product details visibility
    const handleProductClick = (product) => {
        setSelectedProduct(selectedProduct === product ? null : product);
    };

    // Toggle review description visibility
    const handleReviewClick = (index) => {
        setSelectedReview(selectedReview === index ? null : index);
    };

    // Sales & Revenue Feedback
    const salesChange = ((salesData.datasets[0].data[4] - salesData.datasets[0].data[3]) / salesData.datasets[0].data[3]) * 100;
    const revenueChange = ((revenueData.datasets[0].data[4] - revenueData.datasets[0].data[3]) / revenueData.datasets[0].data[3]) * 100;

    const salesFeedback = salesChange > 0
        ? `📈 Sales have increased by ${salesChange.toFixed(2)}% this month! Keep it up!`
        : `📉 Sales have decreased by ${Math.abs(salesChange).toFixed(2)}%. Try to improve your sales this month.`;

    const revenueFeedback = revenueChange > 0
        ? `📈 Revenue has increased by ${revenueChange.toFixed(2)}% this month! Great work!`
        : `📉 Revenue has decreased by ${Math.abs(revenueChange).toFixed(2)}%. Focus on increasing revenue.`;

    // Function to display rating as stars
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<FaStar key={i} className="text-yellow-500" />);
            } else if (i - 0.5 <= rating) {
                stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
            } else {
                stars.push(<FaRegStar key={i} className="text-yellow-500" />);
            }
        }
        return stars;
    };

    // Calculate average review rating
    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">

                {/* Sales Chart with Border */}
                <div className="bg-white p-4 rounded-lg shadow-2xl border-[3px] border-green-400">
                    <h3 className="text-xl font-semibold text-gray-700">📊 Sales Chart</h3>
                    <Line data={salesData} />
                    <p className="mt-4">{salesFeedback}</p>
                </div>

                {/* Revenue Growth with Border */}
                <div className="bg-white p-4 rounded-lg shadow-2xl border-[3px] border-blue-400">
                    <h3 className="text-xl font-semibold text-gray-700">📈 Revenue Growth</h3>
                    <Line data={revenueData} />
                    <p className="mt-4">{revenueFeedback}</p>
                </div>

                {/* Orders Overview with Border */}
                <div className="bg-white p-6 rounded-lg shadow-2xl border-[3px] border-yellow-400">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">🛍️ Orders Overview</h3>
                    <div className="space-y-4">
                        {/* Total Orders */}
                        <div className="flex items-center justify-between p-4 bg-blue-100 rounded-lg hover:shadow-xl transition duration-300">
                            <div className="flex items-center">
                                <svg className="h-6 w-6 text-blue-600 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7-7 7 7M4 4h16v12H4V4z" />
                                </svg>
                                <span className="text-lg font-medium text-gray-700">Total Orders:</span>
                            </div>
                            <span className="text-xl font-semibold text-blue-600">150</span>
                        </div>

                        {/* Pending Orders */}
                        <div className="flex items-center justify-between p-4 bg-yellow-100 rounded-lg hover:shadow-xl transition duration-300">
                            <div className="flex items-center">
                                <svg className="h-6 w-6 text-yellow-600 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4v4m0-8h4m-4 0H8" />
                                </svg>
                                <span className="text-lg font-medium text-gray-700">Pending Orders:</span>
                            </div>
                            <span className="text-xl font-semibold text-yellow-600">30</span>
                        </div>

                        {/* Completed Orders */}
                        <div className="flex items-center justify-between p-4 bg-green-100 rounded-lg hover:shadow-xl transition duration-300">
                            <div className="flex items-center">
                                <svg className="h-6 w-6 text-green-600 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-lg font-medium text-gray-700">Completed Orders:</span>
                            </div>
                            <span className="text-xl font-semibold text-green-600">120</span>
                        </div>
                    </div>
                </div>

                {/* Most Sold Products with Border */}
                <div className="bg-white p-6 rounded-lg shadow-2xl border-[3px] border-purple-400">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">🔥 Most Sold Products</h3>
                    <div className="space-y-4">
                        {mostSoldProducts.map((product) => (
                            <div
                                key={product}
                                className="p-4 bg-purple-100 rounded-lg hover:shadow-xl transition duration-300 cursor-pointer"
                                onClick={() => handleProductClick(product)}
                            >
                                {/* Product Name and Icon */}
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-medium text-gray-700">{product}</span>
                                    <div className="ml-2 text-purple-600">
                                        {selectedProduct === product ? (
                                            <FaChevronUp className="h-5 w-5" />
                                        ) : (
                                            <FaChevronDown className="h-5 w-5" />
                                        )}
                                    </div>
                                </div>

                                {/* Conditionally Render Product Description below the product */}
                                {selectedProduct === product && (
                                    <div className="text-sm text-gray-600 mt-2">
                                        <p><strong>Description:</strong> {productDetails[product].description}</p>
                                        <p><strong>Price:</strong> {productDetails[product].price}</p>
                                        <p><strong>Stock:</strong> {productDetails[product].stock} units available</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* User Reviews Section with Border */}
            <div className="bg-white p-6 rounded-lg shadow-2xl">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">⭐ User Reviews</h3>

                {/* Display Average Rating */}
                <div className="flex items-center mb-4">
                    <span className="text-lg font-semibold text-gray-700">Average Rating:</span>
                    <div className="flex space-x-1 ml-2">
                        {renderStars(averageRating)}
                    </div>
                </div>

                <div className="space-y-4">
                    {reviews.map((review, index) => (
                        <div
                            key={index}
                            className="flex flex-col p-4 bg-orange-100 rounded-lg hover:shadow-xl transition duration-300 cursor-pointer"
                            onClick={() => handleReviewClick(index)}
                        >
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-medium text-gray-700">{review.reviewer}</span>
                                <div className="flex space-x-1">
                                    {renderStars(review.rating)}
                                </div>
                            </div>
                            {selectedReview === index && (
                                <div className="mt-2 text-sm text-gray-600">
                                    <p><strong>Comment:</strong> {review.comment}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Dashboard;
