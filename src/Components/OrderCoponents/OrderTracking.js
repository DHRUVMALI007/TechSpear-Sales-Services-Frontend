import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaRegCircle, FaSearch} from "react-icons/fa";
import { ThemeContext } from "../../Helpers/ThemeContext";

const allStatuses = [
  { label: "Order Placed", date: "Feb 18, 2025" },
  { label: "Processing", date: "Feb 19, 2025" },
  { label: "Shipped", date: "Feb 20, 2025" },
  { label: "Out for Delivery", date: "Feb 21, 2025" },
  { label: "Delivered", date: "Feb 22, 2025" }
];

const refundStatuses = [
  { label: "Refund Requested", date: "Feb 23, 2025" },
  { label: "Refund Processing", date: "Feb 24, 2025" },
  { label: "Refund Approved", date: "Feb 25, 2025" },
  { label: "Amount Refunded", date: "Feb 26, 2025" }
];

const refundedOrders = ["12345", "67890", "54321"]; // Example refunded order IDs

const OrderTracking = () => {
  const [orderId, setOrderId] = useState("");
  const [statusIndex, setStatusIndex] = useState(null);
  const [refundIndex, setRefundIndex] = useState(null);
  const [isRefunded, setIsRefunded] = useState(false);
  const { isDarkMode } = useContext(ThemeContext);

  const bgColor = isDarkMode ? "bg-gray-900" : "bg-white";
  const textColor = isDarkMode ? "text-white" : "text-gray-900";
  const inputBgColor = isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900";
  const borderColor = isDarkMode ? "border-gray-600" : "border-gray-300";

  const handleTrackOrder = () => {
    if (!orderId) return;
    
    // Check if order is refunded
    if (refundedOrders.includes(orderId.trim())) {
      setIsRefunded(true);
      setStatusIndex(null);
      const randomRefundStatus = Math.floor(Math.random() * refundStatuses.length);
      setRefundIndex(randomRefundStatus);
    } else {
      setIsRefunded(false);
      setRefundIndex(null);
      const randomStatus = Math.floor(Math.random() * allStatuses.length);
      setStatusIndex(randomStatus);
    }
  };

  return (
    <div className={`flex flex-col items-center p-6 max-w-xl mx-auto rounded-2xl shadow-lg transition-all duration-300 ${bgColor} ${textColor}`}>
      <h2 className="text-2xl font-semibold mb-4">Track Your Order</h2>
      <div className={`flex w-full mb-6 border rounded-lg overflow-hidden transition-all ${borderColor}`}>
        <input
          type="text"
          placeholder="Enter Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className={`w-full p-3 outline-none ${inputBgColor}`}
        />
        <button
          onClick={handleTrackOrder}
          className="bg-blue-600 text-white px-4 flex items-center justify-center"
        >
          <FaSearch size={20} />
        </button>
      </div>

      {isRefunded ? (
        <div className="w-full flex flex-col items-center">
          <h3 className="text-lg font-medium mb-4">Refund Status:</h3>
          <div className="flex flex-col items-center gap-6">
            {refundStatuses.map((status, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-full border-2 transition-all ${
                    index <= refundIndex ? "border-red-500 bg-red-100" : `${borderColor} ${bgColor}`
                  }`}
                >
                  {index <= refundIndex ? (
                    <FaCheckCircle className="text-red-500" size={24} />
                  ) : (
                    <FaRegCircle className="text-gray-400" size={24} />
                  )}
                </div>
                <div className="text-center mt-2">
                  <span className={`font-semibold ${index <= refundIndex ? "text-red-600" : "text-gray-500"}`}>
                    {status.label}
                  </span>
                  <br />
                  <span className="text-gray-500 text-sm">
                    {index <= refundIndex ? status.date : `Est. ${status.date}`}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : statusIndex !== null && (
        <div className="w-full flex flex-col items-center">
          <h3 className="text-lg font-medium mb-4">Order Status:</h3>
          <div className="flex flex-col items-center gap-6">
            {allStatuses.map((status, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-full border-2 transition-all ${
                    index <= statusIndex ? "border-green-500 bg-green-100" : `${borderColor} ${bgColor}`
                  }`}
                >
                  {index <= statusIndex ? (
                    <FaCheckCircle className="text-green-500" size={24} />
                  ) : (
                    <FaRegCircle className="text-gray-400" size={24} />
                  )}
                </div>
                <div className="text-center mt-2">
                  <span className={`font-semibold ${index <= statusIndex ? textColor : "text-gray-500"}`}>
                    {status.label}
                  </span>
                  <br />
                  <span className="text-gray-500 text-sm">
                    {index <= statusIndex ? status.date : `Est. ${status.date}`}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
