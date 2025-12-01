const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    // Thay 'YOUR_JWT_SECRET' bằng một chuỗi bí mật phức tạp trong file .env
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Token hết hạn sau 30 ngày
    });
};

module.exports = generateToken;