import React, { useEffect, useState } from "react";
import CompletedPayments from "../../Components/PaymentComponent/CompletedPayments";
import { useDispatch } from "react-redux";
import { getAllPayment } from "../../features/paymentSlice";
import { toast } from "react-toastify";

const PaymentManagement = () => {
  const [payments, setPayments] = useState([]);
  const dispatch = useDispatch();

  const getAllPayments = async () => {
    try {
      const rs = await dispatch(getAllPayment()).unwrap();
      setPayments(rs?.data);
      console.log(rs);
    } catch (er) {
      toast.error(er);
    }
  };

  useEffect(() => {
    getAllPayments();
  }, [dispatch]);

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">✅ Completed Payments</h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        <CompletedPayments payments={payments} />
      </div>
    </div>
  );
};

export default PaymentManagement;
