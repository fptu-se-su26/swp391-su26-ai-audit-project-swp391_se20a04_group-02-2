const express = require('express');
const router = express.Router();
const authController = require('./AuthController');
const authMiddleware = require('./AuthMiddleware'); // Import ổ khóa kiểm tra token

// Cổng công khai không cần đăng nhập (Sử dụng cho trang Đăng ký / Đăng nhập)
router.post('/register', authController.register);
router.post('/login', authController.login);

// Cổng bảo mật bắt buộc phải qua lớp Authen xác thực mới lấy được data
router.get('/profile', authMiddleware, authController.getProfile);

module.exports = router;