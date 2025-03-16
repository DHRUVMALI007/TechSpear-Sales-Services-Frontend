import React, { useState } from "react";
import CompletedPayments from "../../Components/PaymentComponent/CompletedPayments";
import RefundedPayments from "../../Components/PaymentComponent/RefundedPayments";

const PaymentManagement = () => {
  const [activeTab, setActiveTab] = useState("completed"); // Default: Completed Payments

  const [payments, setPayments] = useState([
    { orderId: "#001", customer: "John Doe", email: "john@example.com", paymentMethod: "Credit Card", transactionId: "TXN12345678", status: "Completed", amount: 100 },
    { orderId: "#002", customer: "Jane Smith", email: "jane@example.com", paymentMethod: "PayPal", transactionId: "TXN98765432", status: "Canceled", amount: 200 },
    { orderId: "#003", customer: "Alice Brown", email: "alice@example.com", paymentMethod: "Credit Card", transactionId: "TXN11223344", status: "Refunded", refundMethod: "Bank Transfer", amount: 150 },
    { orderId: "#004", customer: "Robert Wilson", email: "robert@example.com", paymentMethod: "UPI", transactionId: "TXN56789012", status: "Completed", amount: 50 },
    { orderId: "#005", customer: "Emily Davis", email: "emily@example.com", paymentMethod: "Google Pay", transactionId: "TXN77889900", status: "Refunded", refundMethod: "Google Pay Wallet", amount: 300 },
    { orderId: "#006", customer: "Michael Lee", email: "michael@example.com", paymentMethod: "Apple Pay", transactionId: "TXN44556677", status: "Completed", amount: 175 },
    { orderId: "#007", customer: "Sophia Martinez", email: "sophia@example.com", paymentMethod: "Bank Transfer", transactionId: "TXN99887766", status: "Canceled", amount: 220 },
    { orderId: "#008", customer: "David Johnson", email: "david@example.com", paymentMethod: "Credit Card", transactionId: "TXN11225544", status: "Completed", amount: 130 },
    { orderId: "#009", customer: "Olivia Taylor", email: "olivia@example.com", paymentMethod: "PayPal", transactionId: "TXN66334455", status: "Refunded", refundMethod: "PayPal Wallet", amount: 400 },
    { orderId: "#010", customer: "Liam Anderson", email: "liam@example.com", paymentMethod: "Debit Card", transactionId: "TXN55443322", status: "Completed", amount: 90 },
    { orderId: "#011", customer: "Emma Thomas", email: "emma@example.com", paymentMethod: "UPI", transactionId: "TXN33221100", status: "Completed", amount: 250 },
    { orderId: "#012", customer: "Benjamin Clark", email: "benjamin@example.com", paymentMethod: "Google Pay", transactionId: "TXN00112233", status: "Canceled", amount: 60 },
    { orderId: "#013", customer: "Ava Hernandez", email: "ava@example.com", paymentMethod: "Credit Card", transactionId: "TXN77442288", status: "Refunded", refundMethod: "Bank Transfer", amount: 275 },
    { orderId: "#014", customer: "Noah White", email: "noah@example.com", paymentMethod: "Apple Pay", transactionId: "TXN66554433", status: "Completed", amount: 500 },
    { orderId: "#015", customer: "Mia Lopez", email: "mia@example.com", paymentMethod: "Bank Transfer", transactionId: "TXN88990011", status: "Canceled", amount: 150 },
  ]);
  

  const handleRefund = (transactionId) => {
    setPayments((prevPayments) =>
      prevPayments.map((payment) =>
        payment.transactionId === transactionId ? { ...payment, status: "Refunded", refundMethod: "Bank Transfer" } : payment
      )
    );
  };

  return (
    <div className="container mx-auto px-6 py-8">
  {/* Tab Navigation */}
  <div className="flex justify-start space-x-8 border-b ml-5">
    {["completed", "refunded"].map((tab) => (
      <button
        key={tab}
        className={`pb-2 font-semibold text-lg relative transition ${
          activeTab === tab
            ? "text-blue-600 border-b-4 border-blue-600"
            : "text-gray-500 hover:text-blue-600"
        }`}
        onClick={() => setActiveTab(tab)}
      >
        {tab === "completed" ? "✅ Completed Payments" : "🔄 Refunded Payments"}
      </button>
    ))}
  </div>

  {/* Content Section */}
  <div className="bg-white shadow-md rounded-lg p-6 mt-4">
    {activeTab === "completed" ? (
      <CompletedPayments payments={payments} />
    ) : (
      <RefundedPayments payments={payments} handleRefund={handleRefund} />
    )}
  </div>
</div>

  );
};

export default PaymentManagement;
