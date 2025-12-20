const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuizHistorySchema = new Schema({
    userId: { 
        type: String, 
        required: true, 
        index: true // Đánh index để tìm kiếm lịch sử theo User nhanh hơn
    },
    total_questions: { type: Number, required: true },
    correct_count: { type: Number, required: true },
    score_percentage: { type: Number, required: true },
    // Lưu lại thông tin vắn tắt về lĩnh vực đã làm
    domain: { type: String, default: "General" },
    // Chi tiết từng câu trả lời (tùy chọn)
    details: [
        {
            questionId: Number,
            is_correct: Boolean,
            user_answer_index: Number,
            correct_answer_index: Number
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('QuizHistory', QuizHistorySchema, 'quiz_histories');