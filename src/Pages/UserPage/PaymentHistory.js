<<<<<<< HEAD
import React, { useState, useContext } from "react";
import { FaPaypal, FaCreditCard, FaMoneyBillWave, FaTimes } from "react-icons/fa";
import { ThemeContext } from "../../Helpers/ThemeContext"; // Ensure correct import

=======
import React, { useEffect, useState } from "react";
import { FaPaypal, FaCreditCard, FaMoneyBillWave, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getUserPayment } from "../../features/paymentSlice";
import moment from "moment"
>>>>>>> 02630c0aab20ce5c200df09568b080f5dd75e1c7

// Function to determine status color
const getStatusColor = (status) => {
  return status === "Completed"
    ? "text-green-500"
    : status === "Pending"
      ? "text-yellow-500"
      : "text-red-500";
};

// Function to get the appropriate payment method icon
const getPaymentIcon = (method) => {
  switch (method) {
    case "PayPal":
      return <FaPaypal className="text-blue-500 text-lg" />;
    case "Credit Card":
      return <FaCreditCard className="text-gray-700 text-lg" />;
    default:
      return <FaMoneyBillWave className="text-green-600 text-lg" />;
  }
};

const TransactionHistory = () => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const { isAuthenticate, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const getUserPayments = async () => {
    try {
      if (!isAuthenticate) {
        toast.error("Please login.");
        return;
      }
      const response = await dispatch(getUserPayment({ userId: user?.data?.user?._id })).unwrap();
      setTransactions(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch transactions.");
    }
  };
  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    getUserPayments();
  }, [dispatch]);

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h2 className="text-2xl font-bold mb-6 text-center sm:text-left">Transaction History</h2>

      {/* Transactions Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 overflow-hidden scroll-smooth">
        {transactions.map((txn) => (
          <div
<<<<<<< HEAD
            key={txn.id}
            className={`border rounded-xl shadow-lg p-5 flex flex-col cursor-pointer 
        hover:shadow-2xl hover:-translate-y-1 transition duration-300 
        ${isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200"}`}
            onClick={() => setSelectedTransaction(txn)}
          >
            {/* Transaction Header */}
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-lg">{`#${txn.id}`}</p>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                  {txn.date}
                </p>
              </div>
              <p
                className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(txn.status)}`}
=======
            key={txn._id}
            className="border rounded-xl shadow-lg bg-white p-4 sm:p-5 flex flex-col cursor-pointer 
                   hover:shadow-2xl hover:-translate-y-1 transition duration-300"
            onClick={() => setSelectedTransaction(txn)}
          >
            {/* Transaction Header */}
            <div className="flex justify-between items-center gap-2">
              {/* Transaction ID */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 text-lg truncate">#{txn._id}</p>
                <p className="text-sm text-gray-500">{ moment(txn.createdAt).format("DD/MM/YYYY") }</p>
              </div>

              {/* Status Badge */}
              <p
                className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(txn.status)} shrink-0`}
>>>>>>> 02630c0aab20ce5c200df09568b080f5dd75e1c7
              >
                {txn.status}
              </p>
            </div>

            {/* Product Images */}
<<<<<<< HEAD
            <div className="flex mt-3 space-x-2">
              {txn.items.slice(0, 3).map((item, index) => (
                <img
                  key={index}
                  src={item.image}
                  alt={item.product}
                  className="w-14 h-14 rounded-lg shadow-md border border-gray-300"
                />
              ))}
              {txn.items.length > 3 && (
                <div
                  className={`w-14 h-14 flex items-center justify-center rounded-lg font-semibold
            ${isDarkMode ? "bg-gray-600 text-gray-300" : "bg-gray-200 text-gray-600"}`}
                >
                  +{txn.items.length - 3}
                </div>
              )}
=======
            <div className="flex mt-3 space-x-2 overflow-x-auto scrollbar-hide">
              {txn?.orderId.cartItems[0]?.items?.map((item, index) => (
                <img
                  key={index}
                  src={item.productId?.mainProductImg || "/placeholder.jpg"}
                  alt={item.productId.productName}
                  className="w-14 h-14 rounded-lg shadow-md"
                />
              ))}
>>>>>>> 02630c0aab20ce5c200df09568b080f5dd75e1c7
            </div>

            {/* Transaction Summary */}
            <div className="mt-3">
<<<<<<< HEAD
              <p className="text-lg font-semibold">
                Total: ${txn.items.reduce((sum, item) => sum + item.amount, 0).toFixed(2)}
              </p>
              <div className="flex items-center gap-2 text-sm mt-1">
                {getPaymentIcon(txn.payment)}
                <span className={`${isDarkMode ? "text-gray-300" : "text-gray-500"}`}>
                  {txn.payment}
                </span>
=======
              <p className="text-lg font-semibold text-gray-800">
                Total: {txn.amount.toFixed(2)}
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500 font-bold mt-1">
                {getPaymentIcon(txn.paymentMethod)}
                <span>{txn.paymentMethod}</span>
>>>>>>> 02630c0aab20ce5c200df09568b080f5dd75e1c7
              </div>
            </div>
          </div>
        ))}
      </div>

<<<<<<< HEAD

      {/* 🔽 MODAL POPUP */}
      {selectedTransaction && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center p-4"
        >
          <div
            className={`p-4 sm:p-6 rounded-lg shadow-xl w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl relative 
        mt-10 sm:mt-16 max-h-[70vh] overflow-y-auto transition-transform transform scale-95 animate-fadeIn 
        ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}
          >
            {/* ✖ Close Button */}
            <button
              className="absolute top-3 right-3 hover:text-red-500 transition"
              onClick={() => setSelectedTransaction(null)}
            >
              <FaTimes className="text-2xl" />
            </button>

            {/* 🏷️ Modal Title */}
            <h3 className="text-xl font-bold border-b pb-2 text-center">
              Transaction Details
            </h3>

            {/* 🛒 Products */}
            <div className="space-y-4 mt-4">
              {selectedTransaction.items?.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.product}
                    className="w-20 h-20 rounded-lg shadow-md border border-gray-300"
                  />
                  <div>
                    <p className="text-lg font-semibold">{item.product}</p>
                    <p className="text-sm opacity-80">{item.description}</p>
                    <p className="text-sm font-semibold">
                      Price: ${item.amount.toFixed(2)}
                    </p>
=======
      {/* Modal Popup for Transaction Details */}
      {selectedTransaction && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-xl w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl relative 
                   mt-10 sm:mt-16 max-h-[90vh] overflow-y-auto">

            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500 transition"
              onClick={() => setSelectedTransaction(null)}
            >
              <FaTimes className="text-2xl" />
            </button>

            {/* Modal Title */}
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 text-center">
              Transaction Details
            </h3>

            {/* Product List */}
            <div className="space-y-4">
              {selectedTransaction?.orderId?.cartItems[0]?.items?.map((item, index) => (
                <div key={index} className="flex flex-wrap sm:flex-nowrap items-center gap-4">
                  <img
                    src={item.productId?.mainProductImg || "/placeholder.jpg"}
                    alt={item.productId.productName}
                    className="w-20 h-20 rounded-lg shadow-md"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-lg font-semibold text-gray-800 truncate">{item.productId?.productName}</p>
                    <p className="text-gray-500 text-sm truncate">{item.productId?.description || "No description"}</p>
                    <p className="text-gray-700 text-sm font-semibold">Price: {item?.productId?.price.toFixed(2)}</p>
                    <p className="text-gray-700 text-sm font-semibold">Quantity: {item?.quantity}</p>
>>>>>>> 02630c0aab20ce5c200df09568b080f5dd75e1c7
                  </div>
                </div>
              ))}
            </div>

<<<<<<< HEAD
            {/* 💰 Transaction Details */}
            <div className="mt-4 space-y-2 text-sm">
              <p>
                <span className="font-semibold">Transaction ID:</span>{" "}
                {selectedTransaction.id}
              </p>
              <p>
                <span className="font-semibold">Subtotal:</span> $
                {selectedTransaction.items
                  ?.reduce((sum, item) => sum + item.amount, 0)
                  .toFixed(2)}
              </p>
              <p>
                <span className="font-semibold">Tax (18% GST):</span> $
                {(
                  selectedTransaction.items?.reduce(
                    (sum, item) => sum + item.amount,
                    0
                  ) * 0.18
                ).toFixed(2)}
              </p>
              <p className="text-lg font-bold text-blue-500 text-center">
                Final Price: ${calculateTotalWithTax(selectedTransaction.items)}
              </p>
            </div>

            {/* 💳 Payment & Status */}
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between">
              <div className="flex items-center gap-2">
                {getPaymentIcon(selectedTransaction.payment)}
                <span>{selectedTransaction.payment}</span>
=======
            {/* Transaction Summary */}
            <div className="mt-4 space-y-2 text-gray-700 text-sm">
              <p className="text-lg font-bold text-gray-600 text-center">
                <span className="font-semibold">Transaction ID:</span> {selectedTransaction._id}
              </p>
              <p className="text-lg font-bold text-blue-600 text-center">
                <span className="font-semibold">Subtotal:</span>
                {selectedTransaction?.orderId?.cartItems[0]?.items
                  .reduce((sum, item) => sum + item.productId.price * item.quantity, 0)
                  .toFixed(2)}
              </p>
            </div>

            {/* Payment Method & Status */}
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between">
              <div className="flex items-center gap-2">
                {getPaymentIcon(selectedTransaction.paymentMethod)}
                <span className="text-gray-600">{selectedTransaction.paymentMethod}</span>
>>>>>>> 02630c0aab20ce5c200df09568b080f5dd75e1c7
              </div>
              <p className={`mt-2 sm:mt-0 font-semibold ${getStatusColor(selectedTransaction.status)}`}>
                {selectedTransaction.status}
              </p>
            </div>
          </div>
        </div>
      )}

<<<<<<< HEAD



    </div >
=======
    </div>
>>>>>>> 02630c0aab20ce5c200df09568b080f5dd75e1c7
  );
};

export default TransactionHistory;
