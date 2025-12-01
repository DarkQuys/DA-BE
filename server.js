const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

// Load biến môi trường từ file .env
dotenv.config();

// Kết nối MongoDB
connectDB();

const app = express();

// Middleware để phân tích JSON body
app.use(express.json());         // Cho phép đọc JSON từ body
app.use(express.urlencoded({ extended: true }));
// Định nghĩa Route gốc
app.get('/', (req, res) => {
    res.send('API đang chạy...');
});

// Định tuyến API cho xác thực (auth)
// Tất cả các route trong authRoutes sẽ có tiền tố /api/auth
app.use('/api/auth', authRoutes);

// Cổng của server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server đang chạy trên cổng ${PORT}`));