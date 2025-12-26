// services/aiLabService.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// controllers/labController.js
const LabLibrary = require('../models/LabLibrary');
const Lab = require('../models/Labs');
const createLabWithAI = async (req, res) => {
    try {

        const { url } = req.body;
        const existing = await Lab.findOne({ url });
        if (existing) {
            return res.status(200).json({ message: "Dữ liệu đã tồn tại", data: existing });
        }
        console.log("Đang nhờ AI phân tích Lab...");

        const aiData = await generateLabData(url);

        const newLab = new Lab({
            ...aiData,
            id: Date.now(), 
            url: url
        });

        await newLab.save();

        res.status(201).json({
            message: "AI đã tự động thêm Lab vào hệ thống!",
            data: newLab
        });

    } catch (error) {
        console.error("Lỗi AI:", error);
        res.status(500).json({ message: "AI không thể xử lý link này", error: error.message });
    }
};

const generateLabData = async (inputUrl) => {
    const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        generationConfig: { responseMimeType: "application/json" } 
    });

    const prompt = `
        Bạn là một chuyên gia Cyber Security. Hãy phân tích URL bài lab này: ${inputUrl}.
        Sau đó tạo ra một đối tượng JSON chuẩn theo cấu trúc sau:
        {
            "title": "Tên bài lab",
            "platform": "NewLab",
            "category": "Lĩnh vực (ví dụ: Web, Network, Forensics)",
            "skill_tags": ["tag1", "tag2"],
            "difficulty": (số từ 1 đến 5),
            "description": "Mô tả ngắn gọn 1 câu",
            "description_detail": "Mô tả chi tiết về các kỹ thuật sẽ học"
        }
        Nếu URL không có thông tin cụ thể, hãy dựa vào kiến thức của bạn về bài lab đó để điền.
    `;

    const result = await model.generateContent(prompt);
    return JSON.parse(result.response.text());
};

module.exports = { createLabWithAI };