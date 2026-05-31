const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Đọc token từ header "Authorization" dạng: Bearer <token>
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ 
            success: false, 
            message: 'Từ chối quyền truy cập! Bạn cần đăng nhập trước.' 
        });
    }

    try {
        // Kiểm tra xem mã hóa token có khớp với khóa bí mật của hệ thống không
        const verified = jwt.verify(token, 'PREONIC_SUPER_SECRET_KEY');
        req.user = verified; // Lưu trữ thông tin giải mã (userId, role) vào request để xử lý tiếp
        next(); // Đạt yêu cầu, cho phép đi qua chốt chặn bảo mật
    } catch (error) {
        return res.status(403).json({ 
            success: false, 
            message: 'Thẻ xác thực (Token) đã hết hạn hoặc không hợp lệ!' 
        });
    }
};