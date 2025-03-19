import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SalesChart from "../../Components/Dashboard/SalesChart";
import RevenueChart from "../../Components/Dashboard/RevenueChart";
import OrdersOverview from "../../Components/Dashboard/OrdersOverview";
import MostSoldProducts from "../../Components/Dashboard/MostSoldProduct";
import UserReviews from "../../Components/Dashboard/UserReviews";

const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [{ label: "Sales", data: [30, 45, 60, 90, 120], borderColor: "green", backgroundColor: "lightgreen", fill: true }],
};

const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [{ label: "Revenue Growth", data: [1000, 1500, 1800, 2500, 3200], borderColor: "blue", backgroundColor: "lightblue", fill: true }],
};

const mostSoldProducts = [
    { name: "Laptop", description: "High-performance laptop.", price: "$1200", stock: 50 },
    { name: "Gaming PC", description: "Powerful gaming PC.", price: "$1800", stock: 30 },
];

const reviews = [
    { reviewer: "John Doe", rating: 5, comment: "Great product!", productName: "Gaming Laptop", productId: "12345" },
    { reviewer: "Jane Smith", rating: 4, comment: "Good performance!", productName: "Gaming Laptop", productId: "12345" },
    { reviewer: "Mike Johnson", rating: 2, comment: "Average experience.", productName: "Gaming Laptop", productId: "12345" },
];


const tabs = [
    { name: "📊 Sales", component: <SalesChart data={salesData} /> },
    { name: "💰 Revenue", component: <RevenueChart data={revenueData} /> },
    { name: "🛍️ Orders", component: <OrdersOverview totalOrders={150} pendingOrders={30} completedOrders={120} /> },
    { name: "🔥 Most Sold Product", component: <MostSoldProducts products={mostSoldProducts} /> },
    { name: "⭐ Reviews", component: <UserReviews reviews={reviews} /> },
];

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState("📊 Sales");

    return (
        <div className="p-6">
            {/* Tabs for md and below */}
            <div className="block xl:hidden">
                <div className="flex gap-4 pb-3 mb-6 border-b border-gray-300 dark:border-gray-600 overflow-x-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.name}
                            onClick={() => setActiveTab(tab.name)}
                            className={`relative px-6 py-3 text-lg font-semibold transition duration-300 rounded-lg shadow-md focus:outline-none ${activeTab === tab.name
                                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                                    : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
                                }`}
                        >


                            {activeTab === tab.name && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-blue-500 opacity-20 rounded-lg"
                                />
                            )}
                            {tab.name}
                        </button>
                    ))}
                </div>
                {/* Tab Content with Animation */}
                <div className="w-full">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="w-full"
                        >
                            {tabs.find((tab) => tab.name === activeTab)?.component}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Grid layout for lg and larger */}
            <div className="hidden xl:grid grid-cols-1 xl:grid-cols-2 gap-6">
                <SalesChart data={salesData} />
                <RevenueChart data={revenueData} />
                <OrdersOverview totalOrders={150} pendingOrders={30} completedOrders={120} />
                <MostSoldProducts products={mostSoldProducts} />
                <div className="col-span-1 xl:col-span-2">
                    <UserReviews reviews={reviews} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
