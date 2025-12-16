const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuizQuestionSchema = new Schema({
    // ID (Không cần thiết nếu dùng _id, nhưng giữ lại để match data)
    id: {
        type: Number,
        required: true,
        unique: true
    },
    // Lĩnh vực: Web Pentester, Network Analyst...
    domain: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    // Kỹ năng: SQL Injection, XSS, CSRF, IDOR...
    skill: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    // Độ khó: easy, medium, hard
    difficulty: {
        type: String,
        required: true,
        trim: true,
        enum: ['easy', 'medium', 'hard','knowledge','scenario', 'preference'],
        index: true
    },
    // Loại câu hỏi: knowledge, scenario
    type: {
        type: String,
        required: true,
        trim: true,
        enum: ['knowledge', 'scenario']
    },
    question: {
        type: String,
        required: true,
        trim: true
    },
    // Mảng các lựa chọn [A, B, C, D]
    options: {
        type: [String],
        required: true,
        validate: {
            validator: function(v) {
                return v && v.length >= 2; // Đảm bảo có ít nhất 2 lựa chọn
            },
            message: 'A question must have at least 2 options!'
        }
    },
    // Vị trí đáp án đúng trong mảng options (0 là A, 1 là B,...)
    answer: {
        type: Number,
        required: true,
        min: 0
    }
}, { timestamps: true });

// Tạo Model, Collection name sẽ là 'quiz_questions'
const QuizQuestion = mongoose.model('QuizQuestion', QuizQuestionSchema, 'quiz_questions');
module.exports = QuizQuestion;