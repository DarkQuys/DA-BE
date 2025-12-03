const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcryptjs'); // Cần thiết cho so sánh mật khẩu trong Login
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
// @desc    Đăng ký người dùng mới
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    // 1. Lấy dữ liệu từ body request
    const { hoTen, email, matKhau, nhapLaiMatKhau } = req.body;
    console.log("body",req.body);
    // 2. Xử lý logic
    if (matKhau !== nhapLaiMatKhau) {
        return res.status(400).json({ message: 'Mật khẩu và Nhập lại mật khẩu không khớp.' });
    }

    try {
        // Kiểm tra người dùng đã tồn tại chưa
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'Người dùng đã tồn tại với Email này.' });
        }

        // Tạo người dùng mới (mật khẩu sẽ được băm tự động trong Model.js)
        const user = await User.create({
            hoTen,
            email,
            matKhau,
        });

        // 3. Phản hồi kết quả
        if (user) {
            res.status(201).json({
                _id: user._id,
                hoTen: user.hoTen,
                email: user.email,
                token: generateToken(user._id), // Tạo và gửi token
            });
        } else {
            res.status(400).json({ message: 'Dữ liệu người dùng không hợp lệ' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server khi đăng ký.', error: error.message });
    }
};


const loginUser = async (req, res) => {
    // 1. Lấy dữ liệu từ body request
    const { email, matKhau } = req.body;

    try {
       
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(matKhau))) {
    
            res.json({
                _id: user._id,
                hoTen: user.hoTen,
                email: user.email,
                token: generateToken(user._id), // Tạo và gửi token
            });
        } else {
          
            res.status(401).json({ message: 'Email hoặc Mật khẩu không đúng.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server khi đăng nhập.', error: error.message });
    }
};

// @desc    Quên mật khẩu - Gửi link đặt lại
// @route   POST /api/users/quen-mat-khau
// @access  Public

const quenMatKhau = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            // Không báo "email không tồn tại" để tránh leak thông tin
            return res.json({ message: 'Nếu email tồn tại, chúng tôi đã gửi link đặt lại mật khẩu.' });
        }

        // Tạo token ngẫu nhiên (dùng crypto tốt hơn jwt cho reset token)
        const resetToken = crypto.randomBytes(32).toString('hex');

        // Mã hóa token trước khi lưu vào DB (bảo mật hơn)
        const hashedToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');

        // Lưu token đã hash + thời hạn (ví dụ: 10 phút)
        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 phút

        await user.save();

        // Link người dùng sẽ click
        const resetUrl = `${process.env.FRONTEND_URL}/dat-lai-mat-khau/${resetToken}`;

        // Nội dung email (có thể dùng template đẹp hơn sau)
        const message = `
            <h2>Bạn đã yêu cầu đặt lại mật khẩu</h2>
            <p>Vui lòng click vào link dưới đây để đặt lại mật khẩu:</p>
            <p><a href="${resetUrl}" style="color: blue; font-weight: bold;">${resetUrl}</a></p>
            <p>Link này sẽ hết hạn sau 10 phút.</p>
            <p>Nếu bạn không yêu cầu, vui lòng bỏ qua email này.</p>
        `;

        // Gửi email (dùng nodemailer hoặc service như SendGrid, Gmail, etc.)
        await sendEmail({
            to: user.email,
            subject: 'Đặt lại mật khẩu - Hệ thống của bạn',
            html: message,
        });

        res.json({ message: 'Nếu email tồn tại, chúng tôi đã gửi link đặt lại mật khẩu.' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Có lỗi xảy ra, vui lòng thử lại sau.' });
    }
};

// @desc    Đặt lại mật khẩu từ token
// @route   POST /api/users/dat-lai-mat-khau/:resetToken
// @access  Public

const datLaiMatKhau = async (req, res) => {
    const { matKhauMoi } = req.body;
    const { resetToken } = req.params;

    try {
        // Hash token người dùng gửi lên để so sánh với DB
        const hashedToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');

        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: { $gt: Date.now() }, // Chưa hết hạn
        });

        if (!user) {
            return res.status(400).json({ message: 'Token không hợp lệ hoặc đã hết hạn.' });
        }

        // Cập nhật mật khẩu mới
        user.matKhau = matKhauMoi; // Nhớ là bạn đã hash trong pre-save rồi nhé!
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.json({ message: 'Đặt lại mật khẩu thành công! Bạn có thể đăng nhập ngay.' });

    } catch (error) {
        res.status(500).json({ message: 'Có lỗi xảy ra.' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    quenMatKhau,
    datLaiMatKhau
};