// controllers/quizController.js
const QuizQuestion = require('../models/CQuestion');

/**
 * API 1: Lấy ngẫu nhiên số câu hỏi tùy chỉnh (Có thể lọc)
 * Route: GET /api/quiz/generate?count=10&domain=Web%20Pentester&difficulty=medium
 */
const getRandomQuestions = async (req, res) => {
    try {
        const { count, domain, skill, difficulty } = req.query;

        // Xây dựng điều kiện lọc (match)
        const match = {};
        if (domain) match.domain = domain;
        if (skill) match.skill = skill;
        if (difficulty) match.difficulty = difficulty;

        // Số lượng câu hỏi cần lấy (Mặc định là 10 nếu không chỉ định)
        const limitCount = parseInt(count) || 10;
        if (limitCount <= 0 || limitCount > 50) { // Giới hạn tối đa 50 câu 1 lần
            return res.status(400).json({ message: 'Số lượng câu hỏi không hợp lệ (1-50).' });
        }

        // Aggregate Pipeline: Match -> Sample (Lấy ngẫu nhiên)
        const questions = await QuizQuestion.aggregate([
            { $match: match }, // Lọc theo điều kiện
            { $sample: { size: limitCount } }, // Lấy ngẫu nhiên
            {
                // Loại bỏ đáp án đúng (answer) trước khi gửi cho người dùng
                $project: {
                    id: 1,
                    domain: 1,
                    skill: 1,
                    difficulty: 1,
                    type: 1,
                    question: 1,
                    options: 1,
                    _id: 0 // Thường loại bỏ _id của Mongo để dùng id của riêng bạn
                }
            }
        ]);

        res.status(200).json({
            count: questions.length,
            data: questions
        });
    } catch (error) {
        console.error("Lỗi khi lấy câu hỏi ngẫu nhiên:", error);
        res.status(500).json({
            message: 'Lỗi máy chủ nội bộ.',
            error: error.message
        });
    }
};

/**
 * API 2: Chấm điểm bài trắc nghiệm
 * Route: POST /api/quiz/submit
 * Body: [{ id: 1, user_answer: 0 }, { id: 2, user_answer: 1 }, ...]
 */
const submitQuiz = async (req, res) => {
    try {
        const submissions = req.body; // Mảng các câu trả lời: [{ id: question_id, user_answer: index }]

        if (!Array.isArray(submissions) || submissions.length === 0) {
            return res.status(400).json({ message: 'Dữ liệu làm bài không hợp lệ hoặc trống.' });
        }

        // Lấy danh sách ID câu hỏi từ submissions
        const questionIds = submissions.map(s => s.id).filter(id => id !== undefined);

        // 1. Truy vấn tất cả đáp án đúng từ DB
        const correctAnswers = await QuizQuestion.find({ id: { $in: questionIds } })
            .select('id answer');

        // Chuyển kết quả DB thành Map để truy vấn nhanh hơn: { questionId: correctAnswerIndex }
        const answerMap = correctAnswers.reduce((map, q) => {
            map[q.id] = q.answer;
            return map;
        }, {});

        let correctCount = 0;
        const resultDetails = [];
        const totalQuestions = submissions.length;

        // 2. Chấm điểm
        submissions.forEach(submission => {
            const correctAnswer = answerMap[submission.id];
            const isCorrect = correctAnswer !== undefined && correctAnswer === submission.user_answer;

            if (isCorrect) {
                correctCount++;
            }

            // Ghi lại chi tiết kết quả (tùy chọn)
            resultDetails.push({
                id: submission.id,
                is_correct: isCorrect,
                correct_answer_index: correctAnswer,
                user_answer_index: submission.user_answer
            });
        });

        // 3. Trả về điểm số
        res.status(200).json({
            total_questions: totalQuestions,
            correct_count: correctCount,
            score_percentage: (correctCount / totalQuestions) * 100,
            details: resultDetails // Chi tiết từng câu (tùy chọn)
        });

    } catch (error) {
        console.error("Lỗi khi chấm điểm trắc nghiệm:", error);
        res.status(500).json({
            message: 'Lỗi máy chủ nội bộ trong quá trình chấm điểm.',
            error: error.message
        });
    }
};
module.exports = { getRandomQuestions, submitQuiz };