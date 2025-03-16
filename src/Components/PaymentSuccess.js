import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCreditCard, FaPaypal, FaUniversity, FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import successSound from "./success.mp3";

const paymentMethods = [
    { id: "credit_card", title: "Credit Card", icon: <FaCreditCard className="w-6 h-6 text-indigo-600" /> },
    { id: "paypal", title: "PayPal", icon: <FaPaypal className="w-6 h-6 text-indigo-600" /> },
    { id: "bank_transfer", title: "Bank Transfer", icon: <FaUniversity className="w-6 h-6 text-indigo-600" /> },
];

export default function PaymentSelection() {
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [, setCountdown] = useState(5);
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [upiId, setUpiId] = useState("");

    const navigate = useNavigate();
    const amountToPay = 2500;

    useEffect(() => {
        if (paymentSuccess) {
            const audio = new Audio(successSound);
            audio.play();
            const interval = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);

            setTimeout(() => {
                clearInterval(interval);
                navigate("/");
            }, 3000);

            return () => clearInterval(interval);
        }
    }, [paymentSuccess, navigate]);

    const formatCardNumber = (value) => {
        return value.replace(/\D/g, "").replace(/(\d{4})/g, "$1 ").trim();
    };

    const formatExpiry = (value) => {
        return value.replace(/\D/g, "").replace(/(\d{2})(\d{0,2})/, (_, p1, p2) => (p2 ? `${p1}/${p2}` : p1));
    };

    const handleConfirmPayment = () => {
        if (selectedPayment === "credit_card") {
            if (cardNumber.length < 19) {
                toast.error("Invalid card number. Must be 16 digits.");
                return;
            }
            if (expiry.length < 5) {
                toast.error("Invalid expiry date.");
                return;
            }
            if (cvv.length < 3) {
                toast.error("Invalid CVV.");
                return;
            }
        }

        if (selectedPayment === "bank_transfer" && !/^\w+@\w+$/.test(upiId)) {
            toast.error("Invalid UPI ID! Format should be 'example@upi'.");
            return;
        }
        
        setPaymentSuccess(true);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-10 max-w-lg mx-auto p-6 border rounded-lg shadow-md bg-white"
        >
            {!paymentSuccess ? (
                !showPaymentForm ? (
                    <>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">Select Payment Method</h2>
                        <p className="text-gray-700 text-center text-lg mb-4">Amount to Pay: <span className="font-semibold text-indigo-600">₹{amountToPay}</span></p>
                        <div className="space-y-3">
                            {paymentMethods.map((method) => (
                                <motion.div
                                    key={method.id}
                                    whileHover={{ scale: 1.05 }}
                                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition ${selectedPayment === method.id ? "border-indigo-600 bg-indigo-50" : "border-gray-300"}`}
                                    onClick={() => setSelectedPayment(method.id)}
                                >
                                    {method.icon}
                                    <span className="ml-3 text-sm font-medium text-gray-700">{method.title}</span>
                                </motion.div>
                            ))}
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="w-full bg-indigo-600 text-white py-3 mt-4 rounded-lg text-lg font-semibold shadow-md hover:bg-indigo-700 transition disabled:opacity-50"
                            disabled={!selectedPayment}
                            onClick={() => setShowPaymentForm(true)}
                        >
                            Pay Now
                        </motion.button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => { setShowPaymentForm(false); setSelectedPayment(null); }}
                            className="flex items-center text-gray-600 hover:text-gray-800 transition mb-4"
                        >
                            <FaArrowLeft className="mr-2" /> Back
                        </button>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">Paying with {selectedPayment.replace("_", " ")}</h2>
                        <p className="text-gray-700 text-center text-lg mb-4">Total Amount: <span className="font-semibold text-indigo-600">₹{amountToPay}</span></p>

                        {selectedPayment === "credit_card" && (
                            <div className="space-y-3">
                                <input type="text" placeholder="Card Number" value={cardNumber} onChange={(e) => setCardNumber(formatCardNumber(e.target.value))} className="w-full border p-2 rounded-lg" maxLength={19} />
                                <div className="flex space-x-2">
                                    <input type="text" placeholder="MM/YY" value={expiry} onChange={(e) => setExpiry(formatExpiry(e.target.value))} className="w-1/2 border p-2 rounded-lg" maxLength={5} />
                                    <input type="text" placeholder="CVV" value={cvv} onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))} className="w-1/2 border p-2 rounded-lg" maxLength={3} />
                                </div>
                            </div>
                        )}
                        {selectedPayment === "bank_transfer" && (
                            <input type="text" placeholder="Enter UPI ID" className="w-full border p-2 rounded-lg" value={upiId} onChange={(e) => setUpiId(e.target.value)} />
                        )}
                        <motion.button onClick={handleConfirmPayment} className="w-full bg-green-600 text-white py-3 mt-4 rounded-lg text-lg font-semibold shadow-md hover:bg-green-700 transition">Confirm Payment</motion.button>
                    </>
                )
            ) : (
                <motion.div className="bg-white shadow-2xl rounded-3xl p-10 text-center max-w-lg w-full relative z-10">
                    <FaCheckCircle className="text-green-500 text-7xl drop-shadow-lg" />
                    <h2 className="text-3xl font-extrabold text-green-700 mt-6">Payment Successful!</h2>
                    <p className="text-gray-700 mt-4 text-lg">Thank you for your purchase.</p>
                </motion.div>
            )}
        </motion.div>
    );
}
