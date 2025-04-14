import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {  useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createReview } from "../features/reviewSlice";

export default function ReviewPage() {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setReview] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const location = useLocation();
    
    const userId= location.state?.userId;
    const productId = location.state?.productId;

    // const {userId,productId}= useOutletContext();
    console.log("user id from comment page",userId);
    console.log("product id from comment page",productId);

    const handleSubmit = async() => {
        if (!rating) {
            toast.error("Please select a rating.");
            return;
        }
        if (comment.trim().length < 10) {
            toast.error("Review must be at least 10 characters.");
            return;
        }

        try{
            
            const response =await dispatch(createReview({userId,productId,rating,comment})).unwrap();

            console.log(response?.data);

            toast.success(response?.message)
            navigate("/")
        }
        catch(er){
            console.log(er)
            toast.error(er);
        }
        // toast.success("Review submitted successfully!");
        // setTimeout(() => navigate("/"), 2000); // Redirect after 2 seconds
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
                Write a Review
            </h2>

            <p className="text-gray-700 text-center mb-4">
                Share your experience with us!
            </p>

            {/* Star Rating */}
            <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, index) => {
                    const starValue = index + 1;
                    return (
                        <FaStar
                            key={index}
                            className={`w-8 h-8 cursor-pointer transition ${
                                starValue <= (hover || rating)
                                    ? "text-yellow-500"
                                    : "text-gray-300"
                            }`}
                            onClick={() => setRating(starValue)}
                            onMouseEnter={() => setHover(starValue)}
                            onMouseLeave={() => setHover(0)}
                        />
                    );
                })}
            </div>

            {/* Review Text Area */}
            <textarea
                placeholder="Write your comment..."
                value={comment}
                onChange={(e) => setReview(e.target.value)}
                className="w-full p-3 border rounded-lg mb-4"
                rows="5"
            ></textarea>

            {/* Submit Button */}
            <button
                onClick={handleSubmit}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-indigo-700 transition"
            >
                Submit Review
            </button>
        </div>
    );
}
