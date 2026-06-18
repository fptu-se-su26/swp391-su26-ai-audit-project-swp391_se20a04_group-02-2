const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    role: { type: String, enum: ['Farmer', 'Business'], required: true }, // Nông dân hoặc Doanh nghiệp
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    province: { type: String, required: true },
    district: { type: String, required: true },
    ward: { type: String },
    password: { type: String, required: true }
}, { timestamps: true }); // Tự động quản lý thời gian tạo tài khoản

module.exports = mongoose.model('User', UserSchema);