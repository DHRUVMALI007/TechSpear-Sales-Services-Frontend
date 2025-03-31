import React, { useEffect, useState } from "react";
import { FaSearch, FaEdit, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder, updateOrderStatus } from "../../features/orderSlice";
import { toast } from "react-toastify";

const OrderManagement = () => {
    const dispatch = useDispatch();
    const { order } = useSelector((state) => state.order);
    const [orders, setOrders] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");
    const [editingOrder, setEditingOrder] = useState(null);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [orderToCancel, setOrderToCancel] = useState(null);

    // Fetch all orders
    const fetchOrders = async () => {
        try {
            const response = await dispatch(getAllOrder()).unwrap();
            toast.success(response?.message);
            setOrders(response?.data || []); // Ensure data is always an array
        } catch (error) {
            console.error("Error fetching orders:", error);
            toast.error(error || "Failed to fetch orders.");
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []); // Fetch orders only once when the component mounts


    // const editTheStutus = async()=>{
    //     try{
    //         console.log(order._id)
    //         const response = await dispatch(updateTheStatus({orderId:order?._id,orderStatus:})).unwrap()
    //     }
    //     catch(er){

    //     }
    // }

    // Search & Filter functions
    const handleSearch = (e) => setSearchQuery(e.target.value);
    const handleFilterChange = (e) => setFilterStatus(e.target.value);

    const updateTheStatus = async (id, newStatus) => {
        try {
            console.log(newStatus)
            const response = await dispatch(
                updateOrderStatus({
                    orderId: id,
                    orderStatus: newStatus, // Ensure it's sent as an object
                })
            ).unwrap();
            
            toast.success(response?.message || "Order status updated");
    
            // Update local state only if API request is successful
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order._id === id ? { ...order, orderStatus: newStatus } : order
                )
            );
        } catch (er) {
            toast.error(er || "Failed to update order status");
        }
    
        setEditingOrder(null);
    };
    
    // Handle order cancellation
    const handleCancelOrder = (id) => {
        setShowCancelModal(true);
        setOrderToCancel(id);
    };

    const confirmCancelOrder = () => {
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order._id === orderToCancel ? { ...order, orderStatus: "Cancelled" } : order
            )
        );
        setShowCancelModal(false);
        setOrderToCancel(null);
    };

    // Filtered and searched orders
    const filteredOrders = orders.filter((order) =>
        (filterStatus === "All" || order.orderStatus === filterStatus) &&
        (order.userId?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order._id.includes(searchQuery))
    );

    return (
        <div className="p-5 bg-gray-100 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Order Management</h2>

            {/* Search and Filter */}
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

            {/* Orders Table */}
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
                                <tr key={order._id} className="border-t">
                                    <td className="p-3">{order._id}</td>
                                    <td className="p-3">{order.userId?.name || "N/A"}</td>
                                    <td className="p-3">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-3">
                                        {editingOrder === order._id ? (
                                            <select
                                                value={order.orderStatus}
                                                onChange={(e) => updateTheStatus(order._id, e.target.value)}
                                                className="border p-1 rounded-md"
                                            >
                                                <option value="">Select Status</option>
                                                <option value="Pending">Pending</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Cancel">Cancel</option>
                                                {/* "Processing", "Shipped", "Delivered", "Cancelled" */}
                                            </select>
                                        ) : (
                                            <span className="px-2 py-1 rounded-md text-sm border border-gray-400">
                                                {order.orderStatus}
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-3 flex justify-center gap-2">
                                        <button
                                            className="border border-gray-400 px-2 py-1 rounded-md hover:bg-gray-200 transition"
                                            onClick={() => setEditingOrder(order._id)}
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            className="border border-gray-400 px-2 py-1 rounded-md hover:bg-gray-200 transition"
                                            onClick={() => handleCancelOrder(order._id)}
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

            {/* Cancel Order Modal */}
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
                                className="px-4 py-2 border border-gray-400 rounded-md hover:bg-gray-200 transition bg-red-500"
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
