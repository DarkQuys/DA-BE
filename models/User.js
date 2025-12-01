const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    hoTen: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Đảm bảo email là duy nhất
    },
    matKhau: {
        type: String,
        required: true,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
}, {
    timestamps: true,
});

// Middleware PRE-SAVE: Băm mật khẩu trước khi lưu
userSchema.pre('save', async function (next) {
    if (!this.isModified('matKhau')) {
        next();
    }

    // Băm mật khẩu với độ phức tạp 10
    const salt = await bcrypt.genSalt(10);
    this.matKhau = await bcrypt.hash(this.matKhau, salt);
    next();
});

// Phương thức để so sánh mật khẩu nhập vào và mật khẩu đã băm
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.matKhau);
};

const User = mongoose.model('User', userSchema);

module.exports = User;