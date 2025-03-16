import { useState } from "react";
import {useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Initialize Toasts

export default function ForgotPassword() {
  const navigate = useNavigate(); // ✅ Initialize navigate function
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");

  // Function to simulate OTP sending
  const handleSendOTP = (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      toast.error("Please enter a valid email!", { position: "top-center" });
      return;
    }

    const mockOtp = "123456"; // Replace with backend-generated OTP
    setGeneratedOtp(mockOtp);
    console.log("OTP sent to:", email, "OTP:", mockOtp);
    toast.success("OTP sent to your email!", { position: "top-center" });
    setStep(2);
  };

  // Function to verify OTP
  const handleVerifyOTP = (e) => {
    e.preventDefault();

    if (otp !== generatedOtp) {
      toast.error("Invalid OTP. Please try again.", { position: "top-center" });
      return;
    }

    toast.success("OTP Verified!", { position: "top-center" });
    setStep(3);
  };

  // Function to update the password
  const handleResetPassword = (e) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters!", { position: "top-center" });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!", { position: "top-center" });
      return;
    }

    console.log("Password updated successfully for:", email);
    toast.success("Your password has been reset!", { position: "top-center" });
    navigate("/");

    // Reset process
    setStep(1);
    setEmail("");
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="min-h-screen flex items-top justify-center mt-8">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96">
        {step === 1 && (
          <form onSubmit={handleSendOTP}>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
              Forgot Password
            </h2>
            <p className="text-gray-500 text-sm text-center mb-6">
              Enter your email to receive an OTP.
            </p>
            <label className="block text-gray-600 text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 mt-4 rounded-lg hover:bg-blue-600 transition"
            >
              Send OTP
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOTP}>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
              Enter OTP
            </h2>
            <p className="text-gray-500 text-sm text-center mb-6">
              An OTP has been sent to your email.
            </p>
            <label className="block text-gray-600 text-sm mb-1">OTP</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 mt-4 rounded-lg hover:bg-green-600 transition"
            >
              Verify OTP
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword}>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
              Reset Password
            </h2>
            <p className="text-gray-500 text-sm text-center mb-6">
              Enter a new password for your account.
            </p>
            <label className="block text-gray-600 text-sm mb-1">
              New Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <label className="block text-gray-600 text-sm mb-1 mt-3">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-purple-500 text-white py-2 mt-4 rounded-lg hover:bg-purple-600 transition"
            >
              Update Password
            </button>
          </form>
        )}

        <div className="mt-4 text-center">
          <Link to="/login" className="text-blue-500 text-sm hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
