const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./src/preonic/auth/AuthRoutes');

const app = express();

// Cấu hình các Middleware hệ thống
app.use(cors());
app.use(express.json()); 

// Cổng kết nối cơ sở dữ liệu MongoDB Local (Có thể thay đổi chuỗi kết nối nếu dùng MongoDB Atlas)
const MONGO_URI = 'mongodb+srv://hoangquang:123@cluster0.800wdhy.mongodb.net/?appName=Cluster0';
mongoose.connect(MONGO_URI)
    .then(() => console.log('=== Kết nối cơ sở dữ liệu PreOnic thành công! ==='))
    .catch(err => console.error('Lỗi kết nối database:', err));

// Định tuyến cổng API cho Module Authentication
app.use('/api/auth', authRoutes);

// Kích hoạt cổng chạy Server Backend
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server Backend PreOnic đang vận hành tại: http://localhost:${PORT}`);
});