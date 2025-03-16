import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import successSound from "../success.mp3";

const PaymentSuccess = () => {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const audio = new Audio(successSound);
    audio.play();

    if (countdown === 0) navigate("/");
    const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-700 to-indigo-900 p-6 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white shadow-2xl rounded-3xl p-10 text-center max-w-lg w-full relative z-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1.5 }}
          transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 120 }}
          className="flex items-center justify-center"
        >
          <FaCheckCircle className="text-blue-500 text-7xl drop-shadow-lg" />
        </motion.div>
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-3xl font-extrabold text-gray-800 mt-6"
        >
          Payment Successful!
        </motion.h2>
        <motion.p
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-gray-700 mt-4 text-lg"
        >
          Thank you for your purchase. Your order is now being processed.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-gray-500 text-sm mt-6"
        >
          Redirecting in {countdown} seconds...
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-600 transition text-lg font-semibold"
          onClick={() => navigate("/")}
        >
          Go to Home
        </motion.button>
      </motion.div>
      <motion.div
        className="absolute inset-0 flex items-center justify-center overflow-hidden"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.5, 0.5, 1] }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <div className="w-96 h-96 bg-blue-400 opacity-30 rounded-full absolute"></div>
        <div className="w-72 h-72 bg-indigo-500 opacity-20 rounded-full absolute"></div>
        <div className="w-52 h-52 bg-blue-600 opacity-10 rounded-full absolute"></div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
