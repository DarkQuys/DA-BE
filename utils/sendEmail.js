const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // hoặc SendGrid, Mailgun...
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS, // Dùng App Password nếu Gmail
        },
        tls: {
        rejectUnauthorized: false   // Dòng này fix lỗi self-signed certificate
    }
    });

    const mailOptions = {
        from: 'Hệ thống <dacquy@gmail.com>',
        to: options.to,
        subject: options.subject,
        html: options.html,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;