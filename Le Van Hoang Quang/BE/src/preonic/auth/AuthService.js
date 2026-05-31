const User = require('../user/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthService {
    // Xử lý Đăng ký tài khoản
    async registerUser(userData) {
        const { email, password } = userData;

        const isExist = await User.findOne({ email });
        if (isExist) {
            throw new Error('Email này đã được đăng ký trên hệ thống PreOnic!');
        }

        // Mã hóa mật khẩu bảo mật (băm chuỗi 10 lớp)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            ...userData,
            password: hashedPassword
        });

        return await newUser.save();
    }

    // Xử lý Đăng nhập & cấp thẻ xác thực (Authen Token)
    async loginUser(email, password) {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Tài khoản Email hoặc mật khẩu không chính xác!');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Tài khoản Email hoặc mật khẩu không chính xác!');
        }

        // Ký số tạo chuỗi Token có thời hạn sử dụng trong 24 giờ
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            'PREONIC_SUPER_SECRET_KEY',
            { expiresIn: '24h' }
        );

        return {
            token,
            user: { id: user._id, fullName: user.fullName, role: user.role }
        };
    }
}

module.exports = new AuthService();