const authService = require('./AuthService');

class AuthController {
    async register(req, res) {
        try {
            const savedUser = await authService.registerUser(req.body);
            res.status(201).json({
                success: true,
                message: 'Tạo tài khoản PreOnic thành công!',
                userId: savedUser._id
            });
        } catch (error) {
            res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || 'Lỗi máy chủ nội bộ.'
            });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const data = await authService.loginUser(email, password);
            res.status(200).json({
                success: true,
                message: 'Xác thực đăng nhập thành công!',
                token: data.token,
                user: data.user
            });
        } catch (error) {
            res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || 'Lỗi máy chủ nội bộ.'
            });
        }
    }

    // API Test chốt chặn bảo mật Authen
    async getProfile(req, res) {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Từ chối quyền truy cập! Bạn cần đăng nhập trước.'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Bạn đang truy cập bằng tài khoản hợp lệ.',
            userData: req.user
        });
    }
}

module.exports = new AuthController();