const express = require("express");
const router = express.Router();

const { authenticate } = require("../middlewares/index");
const { validate } = require("../middlewares/index");
const {
  createReviewRules,
  updateReviewRules,
  deleteReviewRules,
  listReviewsRules,
  targetIdRule,
} = require("../middlewares/reviewValidation");

const {
  createReview,
  updateReview,
  deleteReview,
  getProductReviews,
  getFarmerReviews,
  getReviewStatistics,
} = require("../controllers/reviewController");

// ─── Public Routes ────────────────────────────────────────────────────────────
// No auth required — anyone can read reviews

router.get(
  "/product/:productId",
  targetIdRule("productId"),
  listReviewsRules,
  validate,
  getProductReviews
);

router.get(
  "/farmer/:farmerId",
  targetIdRule("farmerId"),
  listReviewsRules,
  validate,
  getFarmerReviews
);

router.get(
  "/statistics/:targetId",
  targetIdRule("targetId"),
  validate,
  getReviewStatistics
);

// ─── Protected Routes ─────────────────────────────────────────────────────────
// All write operations require authentication

router.post("/", authenticate, createReviewRules, validate, createReview);

router.patch("/:id", authenticate, updateReviewRules, validate, updateReview);

router.delete("/:id", authenticate, deleteReviewRules, validate, deleteReview);

module.exports = router;