import React, { useState } from "react";
import { FaSearch, FaEdit, FaTimes } from "react-icons/fa";

const OrderManagement = () => {
    const [orders, setOrders] = useState([
        { id: "1001", customer: "John Doe", date: "10 Sep, 2 PM", status: "Confirmed" },
        { id: "1002", customer: "Jane Smith", date: "15 Sep, 4 PM", status: "Pending" },
    ]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");
    const [editingOrder, setEditingOrder] = useState(null);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [orderToCancel, setOrderToCancel] = useState(null);

    const handleSearch = (e) => setSearchQuery(e.target.value);
    const handleFilterChange = (e) => setFilterStatus(e.target.value);

    const updateStatus = (id, newStatus) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) => (order.id === id ? { ...order, status: newStatus } : order))
        );
        setEditingOrder(null);
    };

    const handleCancelOrder = (id) => {
        setShowCancelModal(true);
        setOrderToCancel(id);
    };

    const confirmCancelOrder = () => {
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order.id === orderToCancel ? { ...order, status: "Cancelled" } : order
            )
        );
        setShowCancelModal(false);
        setOrderToCancel(null);
    };

    const filteredOrders = orders.filter((order) =>
        (filterStatus === "All" || order.status === filterStatus) &&
        (order.customer.toLowerCase().includes(searchQuery.toLowerCase()) || order.id.includes(searchQuery))
    );

    return (
        <div className="p-5 bg-gray-100 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Order Management</h2>

            <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex items-center border rounded-md px-3 py-2 w-full md:max-w-md">
                    <FaSearch className="text-gray-600" />
                    <input 
                        type="text" 
                        placeholder="Search Order..." 
                        value={searchQuery} 
                        onChange={handleSearch} 
                        className="w-full ml-2 bg-transparent outline-none"
                    />
                </div>
                <select 
                    className="border rounded-md px-3 py-2" 
                    value={filterStatus} 
                    onChange={handleFilterChange}
                >
                    <option value="All">All</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Pending">Pending</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
            </div>

            {filteredOrders.length === 0 ? (
                <p className="text-center text-gray-500">No orders found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-300 rounded-md bg-white">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="p-3 text-left">Order ID</th>
                                <th className="p-3 text-left">Customer</th>
                                <th className="p-3 text-left">Date</th>
                                <th className="p-3 text-left">Status</th>
                                <th className="p-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order) => (
                                <tr key={order.id} className="border-t">
                                    <td className="p-3">{order.id}</td>
                                    <td className="p-3">{order.customer}</td>
                                    <td className="p-3">{order.date}</td>
                                    <td className="p-3">
                                        {editingOrder === order.id ? (
                                            <select 
                                                value={order.status} 
                                                onChange={(e) => updateStatus(order.id, e.target.value)} 
                                                className="border p-1 rounded-md"
                                            >
                                                <option value="Confirmed">Confirmed</option>
                                                <option value="Pending">Pending</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        ) : (
                                            <span className="px-2 py-1 rounded-md text-sm border border-gray-400">
                                                {order.status}
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-3 flex justify-center gap-2">
                                        <button 
                                            className="border border-gray-400 px-2 py-1 rounded-md hover:bg-gray-200 transition" 
                                            onClick={() => setEditingOrder(order.id)}
                                        >
                                            <FaEdit />
                                        </button>
                                        <button 
                                            className="border border-gray-400 px-2 py-1 rounded-md hover:bg-gray-200 transition" 
                                            onClick={() => handleCancelOrder(order.id)}
                                        >
                                            <FaTimes />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {showCancelModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
                    <div className="bg-white p-5 rounded-md shadow-md w-80">
                        <h3 className="text-lg font-semibold mb-3">Confirm Cancellation</h3>
                        <p className="text-gray-600">Are you sure you want to cancel this order?</p>
                        <div className="mt-4 flex justify-end gap-2">
                            <button 
                                className="px-4 py-2 border border-gray-400 rounded-md hover:bg-gray-200 transition"
                                onClick={() => setShowCancelModal(false)}
                            >
                                No
                            </button>
                            <button 
                                className="px-4 py-2 border border-gray-400 rounded-md hover:bg-gray-200 transition"
                                onClick={confirmCancelOrder}
                            >
                                Yes, Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderManagement;
