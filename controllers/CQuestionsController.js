// controllers/quizController.js
const QuizQuestion = require('../models/CQuestion');
const QuizHistory = require('../models/QuizHistory');
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
// const submitQuiz = async (req, res) => {
//     try {
//         const submissions = req.body; // Mảng các câu trả lời: [{ id: question_id, user_answer: index }]

//         if (!Array.isArray(submissions) || submissions.length === 0) {
//             return res.status(400).json({ message: 'Dữ liệu làm bài không hợp lệ hoặc trống.' });
//         }

//         // Lấy danh sách ID câu hỏi từ submissions
//         const questionIds = submissions.map(s => s.id).filter(id => id !== undefined);

//         // 1. Truy vấn tất cả đáp án đúng từ DB
//         const correctAnswers = await QuizQuestion.find({ id: { $in: questionIds } })
//             .select('id answer');

//         // Chuyển kết quả DB thành Map để truy vấn nhanh hơn: { questionId: correctAnswerIndex }
//         const answerMap = correctAnswers.reduce((map, q) => {
//             map[q.id] = q.answer;
//             return map;
//         }, {});

//         let correctCount = 0;
//         const resultDetails = [];
//         const totalQuestions = submissions.length;

//         // 2. Chấm điểm
//         submissions.forEach(submission => {
//             const correctAnswer = answerMap[submission.id];
//             const isCorrect = correctAnswer !== undefined && correctAnswer === submission.user_answer;

//             if (isCorrect) {
//                 correctCount++;
//             }

//             // Ghi lại chi tiết kết quả (tùy chọn)
//             resultDetails.push({
//                 id: submission.id,
//                 is_correct: isCorrect,
//                 correct_answer_index: correctAnswer,
//                 user_answer_index: submission.user_answer
//             });
//         });

//         // 3. Trả về điểm số
//         res.status(200).json({
//             total_questions: totalQuestions,
//             correct_count: correctCount,
//             score_percentage: (correctCount / totalQuestions) * 100,
//             details: resultDetails // Chi tiết từng câu (tùy chọn)
//         });

//     } catch (error) {
//         console.error("Lỗi khi chấm điểm trắc nghiệm:", error);
//         res.status(500).json({
//             message: 'Lỗi máy chủ nội bộ trong quá trình chấm điểm.',
//             error: error.message
//         });
//     }
// };

const submitQuiz = async (req, res) => {
    try {
        const { userId, domain, submissions } = req.body;

        if (!Array.isArray(submissions) || submissions.length === 0) {
            return res.status(400).json({ message: 'Dữ liệu nộp bài không hợp lệ.' });
        }

        // 1. Lấy danh sách ID câu hỏi từ dữ liệu nộp lên
        const questionIds = submissions.map(s => s.id);

        // 2. Truy vấn DB để lấy đáp án đúng
        const questionsFromDb = await QuizQuestion.find({ id: { $in: questionIds } });

        // Tạo map để tra cứu nhanh đáp án đúng theo ID
        const answerMap = questionsFromDb.reduce((map, q) => {
            map[q.id] = q.answer;
            return map;
        }, {});

        // 3. Tính toán kết quả
        let correctCount = 0;
        const details = [];

        submissions.forEach(sub => {
            const correctAnswerIndex = answerMap[sub.id];
            const isCorrect = correctAnswerIndex !== undefined && correctAnswerIndex === sub.user_answer;

            if (isCorrect) correctCount++;

            details.push({
                questionId: sub.id,
                is_correct: isCorrect,
                user_answer_index: sub.user_answer,
                correct_answer_index: correctAnswerIndex
            });
        });

        // --- PHẦN TÍNH ĐIỂM ---
        const totalQuestions = submissions.length;
        const wrongCount = totalQuestions - correctCount;
        const scorePercentage = (correctCount / totalQuestions) * 100;

        // Tính điểm hệ số 10 (làm tròn 1 chữ số thập phân)
        const finalScore = parseFloat(((correctCount / totalQuestions) * 10).toFixed(1));

        // 4. Lưu vào lịch sử (Nếu bạn đã làm bước lưu lịch sử ở câu trước)
        const historyEntry = new QuizHistory({
            userId: userId || "anonymous",
            total_questions: totalQuestions,
            correct_count: correctCount,
            score_percentage: scorePercentage,
            domain: domain || "General",
            details: details
        });
        await historyEntry.save();

        // 5. Trả về kết quả cho Client bao gồm ĐIỂM
        res.status(200).json({
            message: "Chấm điểm hoàn tất",
            summary: {
                total: totalQuestions,
                correct: correctCount,
                wrong: wrongCount,
                percentage: `${scorePercentage}%`,
                points: finalScore // <--- Điểm số trả về ở đây (ví dụ: 8.5)
            },
            details: details
        });

    } catch (error) {
        console.error("Lỗi submit:", error);
        res.status(500).json({ message: 'Lỗi khi xử lý nộp bài.', error: error.message });
    }
};
/**
 * API MỚI: Lấy lịch sử làm bài của một User
 * Route: GET /api/quiz/history/:userId
 */
const getUserQuizHistory = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Tìm tất cả lịch sử của User, sắp xếp cái mới nhất lên đầu
        const history = await QuizHistory.find({ userId: userId })
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: history.length,
            data: history
        });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy lịch sử.', error: error.message });
    }
};
module.exports = { getRandomQuestions, submitQuiz, getUserQuizHistory };