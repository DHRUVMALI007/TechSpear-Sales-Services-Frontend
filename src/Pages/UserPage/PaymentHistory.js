import React, { useState, useContext } from "react";
import { FaPaypal, FaCreditCard, FaMoneyBillWave, FaTimes } from "react-icons/fa";
import { ThemeContext } from "../../Helpers/ThemeContext"; // Ensure correct import


const transactions = [
  {
    id: "#TXN12500",
    date: "2025-02-05",
    items: [
      {
        product: "Gaming Laptop",
        amount: 2000,
        image: "https://via.placeholder.com/80",
        description: "High-performance gaming laptop with RTX 4060 GPU and 16GB RAM.",
      },
      {
        product: "Gaming Headset",
        amount: 150,
        image: "https://via.placeholder.com/80",
        description: "Surround sound gaming headset with noise-canceling microphone.",
      },
      {
        product: "Gaming Headset",
        amount: 150,
        image: "https://via.placeholder.com/80",
        description: "Surround sound gaming headset with noise-canceling microphone.",
      },
    ],
    payment: "Credit Card",
    status: "Completed",
  },
  {
    id: "#TXN12457",
    date: "2025-02-03",
    items: [
      {
        product: "Mechanical Keyboard",
        amount: 100,
        image: "https://via.placeholder.com/80",
        description: "RGB-backlit mechanical keyboard with hot-swappable switches.",
      },

    ],
    payment: "PayPal",
    status: "cancel",
  },
];

const getStatusColor = (status) => {
  return status === "Completed" ? "text-green-500" : status === "Pending" ? "text-yellow-500" : "text-red-500";
};

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

  const calculateTotalWithTax = (items) => {
    const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);
    const tax = totalAmount * 0.18;
    return (totalAmount + tax).toFixed(2);
  };
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Transaction History</h2>

      {/* 🔳 CARD VIEW */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {transactions.map((txn) => (
          <div
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
              >
                {txn.status}
              </p>
            </div>

            {/* Product Images */}
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
            </div>

            {/* Transaction Summary */}
            <div className="mt-3">
              <p className="text-lg font-semibold">
                Total: ${txn.items.reduce((sum, item) => sum + item.amount, 0).toFixed(2)}
              </p>
              <div className="flex items-center gap-2 text-sm mt-1">
                {getPaymentIcon(txn.payment)}
                <span className={`${isDarkMode ? "text-gray-300" : "text-gray-500"}`}>
                  {txn.payment}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>


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
                  </div>
                </div>
              ))}
            </div>

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
              </div>
              <p className={`mt-2 sm:mt-0 font-semibold ${getStatusColor(selectedTransaction.status)}`}>
                {selectedTransaction.status}
              </p>
            </div>
          </div>
        </div>
      )}




    </div >
  );
};

export default TransactionHistory;
