const reviewService = require("../services/reviewService");
const { catchAsync } = require("../utils/AppError");
const { AppError } = require("../utils/AppError");


const createReview = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const { orderId, productId, farmerId, rating, comment } = req.body;

  const review = await reviewService.createReview(userId, {
    orderId,
    productId,
    farmerId,
    rating,
    comment,
  });

  res.status(201).json({
    success: true,
    data: { review },
  });
});


const updateReview = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const { id } = req.params;
  const { rating, comment } = req.body;

  const review = await reviewService.updateReview(id, userId, { rating, comment });

  res.status(200).json({
    success: true,
    data: { review },
  });
});


const deleteReview = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const { id } = req.params;

  await reviewService.deleteReview(id, userId);

  res.status(204).send();
});


const getProductReviews = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const { page, pageSize, sortBy, sortOrder } = req.query;

  const result = await reviewService.getProductReviews(productId, {
    page,
    pageSize,
    sortBy,
    sortOrder,
  });

  res.status(200).json({
    success: true,
    ...result,
  });
});

const getFarmerReviews = catchAsync(async (req, res) => {
  const { farmerId } = req.params;
  const { page, pageSize, sortBy, sortOrder } = req.query;

  const result = await reviewService.getFarmerReviews(farmerId, {
    page,
    pageSize,
    sortBy,
    sortOrder,
  });

  res.status(200).json({
    success: true,
    ...result,
  });
});


const getReviewStatistics = catchAsync(async (req, res) => {
  const { targetId } = req.params;
  const { type } = req.query;

  if (!["product", "farmer"].includes(type)) {
    throw new AppError("Query param `type` must be 'product' or 'farmer'", 400);
  }

  const stats = await reviewService.getReviewStatistics(targetId, type);

  res.status(200).json({
    success: true,
    data: { statistics: stats },
  });
});

module.exports = {
  createReview,
  updateReview,
  deleteReview,
  getProductReviews,
  getFarmerReviews,
  getReviewStatistics,
};