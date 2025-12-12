// controllers/labController.js
const Lab = require('../models/Labs'); // Thay đổi đường dẫn nếu cần

/**
 * API 1: GET tất cả các Labs (với tùy chọn lọc theo Category và Difficulty)
 * Route: GET /api/labs?category=Web%20Security&difficulty=2
 */
const getAllLabs = async (req, res) => {
    try {
        const { category, difficulty, search } = req.query;
        const filter = {};

        // Lọc theo Category
        if (category) {
            filter.category = category;
        }

        // Lọc theo Difficulty
        if (difficulty) {
            // Chuyển difficulty sang số nguyên
            const diff = parseInt(difficulty);
            if (!isNaN(diff)) {
                filter.difficulty = diff;
            }
        }
        
        // Tìm kiếm theo Title hoặc Description (dùng $regex)
        if (search) {
             const searchRegex = new RegExp(search, 'i'); // 'i' là case-insensitive
             filter.$or = [
                 { title: { $regex: searchRegex } },
                 { description: { $regex: searchRegex } }
             ];
        }

        // Thực hiện truy vấn
        const labs = await Lab.find(filter).sort({ difficulty: 1, id: 1 });

        // Trả về dữ liệu
        res.status(200).json({
            count: labs.length,
            data: labs
        });
    } catch (error) {
        console.error("Lỗi khi lấy danh sách Labs:", error);
        res.status(500).json({ 
            message: 'Lỗi máy chủ nội bộ khi lấy danh sách Labs.',
            error: error.message 
        });
    }
};


/**
 * API 2: GET Lab chi tiết theo ID
 * Route: GET /api/labs/:id
 */
const getLabById = async (req, res) => {
    try {
        // Lấy ID từ URL param
        const labId = parseInt(req.params.id);

        if (isNaN(labId)) {
             return res.status(400).json({ message: 'ID không hợp lệ.' });
        }

        // Tìm kiếm document dựa trên trường 'id' bạn đã định nghĩa
        const lab = await Lab.findOne({ id: labId });

        // Xử lý trường hợp không tìm thấy
        if (!lab) {
            return res.status(404).json({ message: `Không tìm thấy Lab với ID: ${labId}` });
        }

        // Trả về dữ liệu chi tiết
        res.status(200).json(lab);

    } catch (error) {
        console.error("Lỗi khi lấy Lab theo ID:", error);
        res.status(500).json({ 
            message: 'Lỗi máy chủ nội bộ khi lấy Lab chi tiết.',
            error: error.message 
        });
    }
};

module.exports = { getAllLabs, getLabById };