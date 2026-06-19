const User = require('../user/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'PREONIC_SUPER_SECRET_KEY';

class AuthService {
    // Xử lý Đăng ký tài khoản
    async registerUser(userData) {
        const { email, password } = userData;

        if (!email || !password) {
            const error = new Error('Email và mật khẩu là bắt buộc!');
            error.statusCode = 400;
            throw error;
        }

        const normalizedEmail = email.trim().toLowerCase();

        const isExist = await User.findOne({ email: normalizedEmail });
        if (isExist) {
            const error = new Error('Email này đã được đăng ký trên hệ thống PreOnic!');
            error.statusCode = 409;
            throw error;
        }

        // Mã hóa mật khẩu bảo mật (băm chuỗi 10 lớp)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            ...userData,
            email: normalizedEmail,
            password: hashedPassword
        });

        return await newUser.save();
    }

    // Xử lý Đăng nhập & cấp thẻ xác thực (Authen Token)
    async loginUser(email, password) {
        if (!email || !password) {
            const error = new Error('Email và mật khẩu là bắt buộc!');
            error.statusCode = 400;
            throw error;
        }

        const normalizedEmail = email.trim().toLowerCase();
        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            const error = new Error('Tài khoản Email hoặc mật khẩu không chính xác!');
            error.statusCode = 401;
            throw error;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            const error = new Error('Tài khoản Email hoặc mật khẩu không chính xác!');
            error.statusCode = 401;
            throw error;
        }

        // Ký số tạo chuỗi Token có thời hạn sử dụng trong 24 giờ
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        return {
            token,
            user: { id: user._id, fullName: user.fullName, role: user.role }
        };
    }
}

module.exports = new AuthService();