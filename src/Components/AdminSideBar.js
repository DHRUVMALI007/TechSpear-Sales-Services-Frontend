import React, { useState } from 'react';
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logoutUser } from '../features/userSlice';
import { persistor } from '../redux/store';
import { useDispatch } from 'react-redux';

const AdminSideBar = () => {
    const navigate = useNavigate();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const dispatch = useDispatch();
    const handleLogout =async () => {
        console.log("User logged out");
        setShowLogoutModal(false);
        // Add your logout logic here, like clearing tokens, navigating to login, etc
    try{
      const rs= await dispatch(logoutUser()).unwrap()
     
      console.log(rs)
      toast.success(rs?.message)
      persistor.purge()
      window.location.reload();
        
    }catch(er){
      console.log(er)
      toast.error(er)
    }
   
        

        navigate('/login');

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
                        <Link to="banner-management" className="px-2 py-1 text-white hover:bg-blue-700 hover:text-yellow-300 transition-colors duration-200 rounded-md mt-3">Banner Management</Link>
                    </nav>
                </div>

                {/* Logout section */}
                <div className="p-4">
                    <button
                        onClick={() => setShowLogoutModal(true)}
                        className="px-2 py-1 bg-blue-600 text-white hover:bg-blue-700 hover:text-yellow-300 transition-colors duration-200 rounded-md w-full"
                    >
                        Log Out
                    </button>
                </div>
            </aside>

            {/* Logout Confirmation Modal */}
            {showLogoutModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                        <h3 className="text-lg font-semibold text-slate-700 mb-3">Confirm Logout</h3>
                        <p className="text-slate-600 mb-4">Are you sure you want to log out?</p>
                        <div className="flex justify-end gap-2">
                            <button
                                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 text-slate-700"
                                onClick={() => setShowLogoutModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                onClick={handleLogout}
                            >
                                Yes, Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminSideBar;
