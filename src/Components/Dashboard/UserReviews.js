import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const StarRating = ({ rating }) => (
    <div className="flex text-yellow-500">
        {[...Array(5)].map((_, i) => (
            rating >= i + 1 ? <FaStar key={i} /> :
            rating >= i + 0.5 ? <FaStarHalfAlt key={i} /> :
            <FaRegStar key={i} />
        ))}
    </div>
);

const UserReviews = ({ reviews }) => {
    const averageRating = reviews.length 
        ? reviews.reduce((acc, { rating }) => acc + rating, 0) / reviews.length 
        : 0;

    return (
        <div className="bg-white p-6 rounded-lg shadow-xl border-2 border-orange-400 space-y-4">
            <h3 className="text-xl font-semibold">⭐ User Reviews</h3>

            {/* Average Rating */}
            <div className="flex items-center gap-2">
                <span className="font-medium">Average Rating:</span> 
                <StarRating rating={averageRating} />
            </div>

            {/* Scrollable Reviews Section */}
            <div className="max-h-64 overflow-y-auto space-y-4">
                {reviews.map(({ reviewer, rating, comment, productName, productId }, i) => (
                    <div key={i} className="p-4 bg-orange-100 rounded-lg shadow space-y-2">
                        {/* Product Details */}
                        <div className="text-sm text-gray-600">
                            <p><strong>Product:</strong> {productName}</p>
                            <p><strong>Product ID:</strong> {productId}</p>
                        </div>

                        {/* Reviewer Info */}
                        <div className="flex items-center justify-between">
                            <strong className="text-lg">{reviewer}</strong> 
                            <StarRating rating={rating} />
                        </div>
                        
                        {/* Review Comment */}
                        <p className="text-gray-700 mt-1 italic">"{comment}"</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserReviews;
