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

/**
 * API 3: POST tạo một Lab mới
 * Route: POST /api/labs
 */
const createLab = async (req, res) => {
    try {
        const labData = req.body;
        
        // --- Bổ sung Logic kiểm tra ID ---
        // Do bạn dùng trường 'id' tự định nghĩa (unique), ta cần tìm max ID hiện tại 
        // và gán ID mới để tránh lỗi trùng lặp khi người dùng không gửi 'id'
        
        if (!labData.id) {
            // Tìm Max ID hiện tại
            const latestLab = await Lab.findOne().sort({ id: -1 }).select('id');
            const newId = latestLab ? latestLab.id + 1 : 1;
            labData.id = newId;
        }
        
        // Tạo document mới từ Model và dữ liệu gửi lên
        const newLab = new Lab(labData);

        // Lưu vào cơ sở dữ liệu. Mongoose sẽ tự động validate (ví dụ: required, unique)
        await newLab.save();

        // Trả về document đã tạo thành công
        res.status(201).json({
            message: 'Tạo Lab mới thành công.',
            data: newLab
        });

    } catch (error) {
        // Xử lý lỗi validation (ví dụ: thiếu required fields) hoặc lỗi trùng unique
        if (error.name === 'ValidationError') {
            return res.status(400).json({ 
                message: 'Dữ liệu Lab không hợp lệ hoặc thiếu trường bắt buộc.',
                details: error.message
            });
        }
        if (error.code === 11000) {
            // Lỗi trùng unique key (id hoặc url)
            const field = Object.keys(error.keyValue)[0];
            return res.status(409).json({ 
                message: `Lỗi trùng lặp: Trường '${field}' đã tồn tại.`,
            });
        }

        console.error("Lỗi khi tạo Lab:", error);
        res.status(500).json({ 
            message: 'Lỗi máy chủ nội bộ khi tạo Lab.',
            error: error.message 
        });
    }
};

module.exports = { getAllLabs, getLabById ,createLab};