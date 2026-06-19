import React, { useState } from 'react';

const ReviewPopup = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    console.log({ rating, comment });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-2xl relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
        >&times;</button>

        <h2 className="text-xl font-bold text-gray-800 text-center mb-2">Đánh giá của bạn</h2>
        <p className="text-gray-500 text-center mb-6 text-sm">Trải nghiệm của bạn giúp chúng tôi cải thiện tốt hơn.</p>

        {/* Star Rating */}
        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className={`text-4xl transition-colors ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
            >
              ★
            </button>
          ))}
        </div>

        {/* Comment Area */}
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mb-4"
          rows="4"
          placeholder="Viết đánh giá của bạn tại đây..."
        />

        <button 
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all"
        >
          Gửi đánh giá
        </button>
      </div>
    </div>
  );
};

export default ReviewPopup;