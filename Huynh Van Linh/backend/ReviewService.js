const mongoose = require("mongoose");
const Review = require("../models/Review");
const { Order, OrderItem, Product, Farmer } = require("../models/index");
const { AppError } = require("../utils/AppError");


const _recalculateAverageRating = async (targetType, targetId) => {
  const field = targetType === "product" ? "productId" : "farmerId";
  const Model = targetType === "product" ? Product : Farmer;

  const [result] = await Review.aggregate([
    { $match: { [field]: new mongoose.Types.ObjectId(targetId) } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" },
        reviewCount: { $sum: 1 },
      },
    },
  ]);

  const averageRating = result ? parseFloat(result.averageRating.toFixed(2)) : 0;
  const reviewCount = result ? result.reviewCount : 0;

  await Model.findByIdAndUpdate(targetId, { averageRating, reviewCount });
};


const _resolveTarget = (review) => {
  if (review.productId) return { targetType: "product", targetId: review.productId };
  if (review.farmerId) return { targetType: "farmer", targetId: review.farmerId };
  throw new AppError("Review has no valid target", 500);
};


const validateCompletedTransaction = async (orderId, userId) => {
  const order = await Order.findById(orderId);

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  if (order.userId.toString() !== userId.toString()) {
    throw new AppError("You are not the owner of this order", 403);
  }

  if (order.status !== "Completed") {
    throw new AppError(
      "Reviews can only be submitted for completed orders",
      400
    );
  }

  return order;
};


const validateTargetInOrder = async (orderId, { productId, farmerId }) => {
  const query = { orderId };
  if (productId) query.productId = productId;
  if (farmerId) query.farmerId = farmerId;

  const item = await OrderItem.findOne(query);
  if (!item) {
    const target = productId ? "product" : "farmer";
    throw new AppError(
      `This ${target} was not part of the specified order`,
      400
    );
  }
};



const checkDuplicateReview = async (userId, orderId, { productId, farmerId }) => {
  const query = { userId, orderId };
  if (productId) query.productId = productId;
  if (farmerId) query.farmerId = farmerId;

  const existing = await Review.findOne(query);
  if (existing) {
    throw new AppError(
      "You have already reviewed this item for this order",
      409
    );
  }
};



const createReview = async (userId, { orderId, productId, farmerId, rating, comment }) => {
  await validateCompletedTransaction(orderId, userId);
  await validateTargetInOrder(orderId, { productId, farmerId });
  await checkDuplicateReview(userId, orderId, { productId, farmerId });

  const review = await Review.create({
    userId,
    orderId,
    productId: productId || null,
    farmerId: farmerId || null,
    rating,
    comment: comment || null,
  });

  const { targetType, targetId } = _resolveTarget(review);
  await _recalculateAverageRating(targetType, targetId);

  return review;
};


const updateReview = async (reviewId, userId, { rating, comment }) => {
  const review = await Review.findById(reviewId);

  if (!review) {
    throw new AppError("Review not found", 404);
  }

  if (review.userId.toString() !== userId.toString()) {
    throw new AppError("You can only edit your own reviews", 403);
  }

  if (rating !== undefined) review.rating = rating;
  if (comment !== undefined) review.comment = comment;

  await review.save();

  const { targetType, targetId } = _resolveTarget(review);
  await _recalculateAverageRating(targetType, targetId);

  return review;
};


const deleteReview = async (reviewId, userId) => {
  const review = await Review.findById(reviewId);

  if (!review) {
    throw new AppError("Review not found", 404);
  }

  if (review.userId.toString() !== userId.toString()) {
    throw new AppError("You can only delete your own reviews", 403);
  }

  const { targetType, targetId } = _resolveTarget(review);

  await review.deleteOne();
  await _recalculateAverageRating(targetType, targetId);
};


const getProductReviews = async (productId, { page = 1, pageSize = 10, sortBy = "createdAt", sortOrder = "desc" }) => {
  const product = await Product.findById(productId);
  if (!product) throw new AppError("Product not found", 404);

  const skip = (page - 1) * pageSize;
  const sort = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

  const [reviews, totalItems] = await Promise.all([
    Review.find({ productId })
      .sort(sort)
      .skip(skip)
      .limit(pageSize)
      .populate("userId", "name"),
    Review.countDocuments({ productId }),
  ]);

  return {
    data: reviews,
    pagination: {
      page: Number(page),
      pageSize: Number(pageSize),
      totalItems,
      totalPages: Math.ceil(totalItems / pageSize),
    },
  };
};


const getFarmerReviews = async (farmerId, { page = 1, pageSize = 10, sortBy = "createdAt", sortOrder = "desc" }) => {
  const farmer = await Farmer.findById(farmerId);
  if (!farmer) throw new AppError("Farmer not found", 404);

  const skip = (page - 1) * pageSize;
  const sort = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

  const [reviews, totalItems] = await Promise.all([
    Review.find({ farmerId })
      .sort(sort)
      .skip(skip)
      .limit(pageSize)
      .populate("userId", "name"),
    Review.countDocuments({ farmerId }),
  ]);

  return {
    data: reviews,
    pagination: {
      page: Number(page),
      pageSize: Number(pageSize),
      totalItems,
      totalPages: Math.ceil(totalItems / pageSize),
    },
  };
};

const getReviewStatistics = async (targetId, targetType) => {
  const field = targetType === "product" ? "productId" : "farmerId";
  const Model = targetType === "product" ? Product : Farmer;

  const target = await Model.findById(targetId);
  if (!target) {
    throw new AppError(`${targetType === "product" ? "Product" : "Farmer"} not found`, 404);
  }

  const breakdown = await Review.aggregate([
    { $match: { [field]: new mongoose.Types.ObjectId(targetId) } },
    {
      $group: {
        _id: "$rating",
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: -1 } },
  ]);

  // Build a full 5-star breakdown, filling 0 for missing ratings
  const totalReviews = breakdown.reduce((sum, b) => sum + b.count, 0);
  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => {
    const found = breakdown.find((b) => b._id === star);
    const count = found ? found.count : 0;
    return {
      star,
      count,
      percentage: totalReviews > 0 ? parseFloat(((count / totalReviews) * 100).toFixed(1)) : 0,
    };
  });

  return {
    targetId,
    targetType,
    averageRating: target.averageRating,
    totalReviews: target.reviewCount,
    ratingDistribution,
  };
};

module.exports = {
  createReview,
  updateReview,
  deleteReview,
  getProductReviews,
  getFarmerReviews,
  getReviewStatistics,
};