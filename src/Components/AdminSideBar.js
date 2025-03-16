import React from 'react';
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';

const AdminSideBar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (confirmLogout) {
            navigate("/"); // Redirect to home after logout
        }
    };

    return (
        <div className="h-full hidden md:flex sticky">
            <aside className="bg-gradient-to-r from-blue-600 to-blue-900 w-60 shadow-lg flex-shrink-0 h-screen flex flex-col">
                {/* User info section */}
                <div className="h-32 flex justify-center items-center flex-col">
                    <div className="text-5xl cursor-pointer relative flex justify-center">
                        <FaRegCircleUser className="text-white" />
                    </div>
                    <p className="capitalize text-lg font-semibold text-white">Admin User</p>
                </div>

                {/* Navigation section */}
                <div className="flex-grow">
                    <nav className="grid p-4">
                        <Link to="" className="px-2 py-1 text-white hover:bg-blue-700 hover:text-yellow-300 transition-colors duration-200 rounded-md mt-2">Dashboard</Link>
                        <Link to="All-user" className="px-2 py-1 text-white hover:bg-blue-700 hover:text-yellow-300 transition-colors duration-200 rounded-md mt-3">User Management</Link>
                        <Link to="All-product" className="px-2 py-1 text-white hover:bg-blue-700 hover:text-yellow-300 transition-colors duration-200 rounded-md mt-3">Product Management</Link>
                        <Link to="Order-management" className="px-2 py-1 text-white hover:bg-blue-700 hover:text-yellow-300 transition-colors duration-200 rounded-md mt-3">Order Management</Link>
                        <Link to="payment-management" className="px-2 py-1 text-white hover:bg-blue-700 hover:text-yellow-300 transition-colors duration-200 rounded-md mt-3">Payment Management</Link>
                        <Link to="Service-management" className="px-2 py-1 text-white hover:bg-blue-700 hover:text-yellow-300 transition-colors duration-200 rounded-md mt-3">Service Management</Link>
                    </nav>
                </div>

                {/* Logout section */}
                <div className="p-4">
                    <button 
                        onClick={handleLogout}
                        className="px-2 py-1 text-white hover:bg-blue-700 hover:text-yellow-300 transition-colors duration-200 rounded-md mt-auto w-full"
                    >
                        Log Out
                    </button>
                </div>
            </aside>
        </div>
    );
};

export default AdminSideBar;
