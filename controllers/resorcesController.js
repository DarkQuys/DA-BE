// controllers/resourceController.js
const Resource = require('../models/Resource');

/**
 * API 1: GET tất cả các Resources (có hỗ trợ lọc và tìm kiếm)
 * Route: GET /api/resources?category=video&level=beginner&search=web%20app
 */
const getAllResources = async (req, res) => {
    try {
        const { category, language, level, search } = req.query;
        const filter = {};

        // 1. Xây dựng bộ lọc
        if (category) {
            filter.category = category;
        }
        if (language) {
            filter.language = language;
        }
        if (level) {
            filter.level = level;
        }

        // 2. Xây dựng tìm kiếm (Search)
        if (search) {
            const searchRegex = new RegExp(search, 'i'); // 'i' là case-insensitive
            // Tìm kiếm trong Title HOẶC Notes
            filter.$or = [
                { title: { $regex: searchRegex } },
                { notes: { $regex: searchRegex } }
            ];
        }

        // 3. Thực hiện truy vấn và sắp xếp theo Category
        const resources = await Resource.find(filter).sort({ category: 1, title: 1 });

        // Trả về dữ liệu
        res.status(200).json({
            count: resources.length,
            data: resources
        });
    } catch (error) {
        console.error("Lỗi khi lấy danh sách Resources:", error);
        res.status(500).json({
            message: 'Lỗi máy chủ nội bộ.',
            error: error.message
        });
    }
};


/**
 * API 2: GET Resource chi tiết theo MongoDB _id
 * Route: GET /api/resources/:id
 */
const getResourceById = async (req, res) => {
    try {
        // Lấy _id từ URL param
        const resourceId = req.params.id;

        // Tìm kiếm document bằng _id mặc định của MongoDB
        const resource = await Resource.findById(resourceId);

        // Xử lý trường hợp không tìm thấy
        if (!resource) {
            return res.status(404).json({ message: `Không tìm thấy tài nguyên với ID: ${resourceId}` });
        }

        // Trả về dữ liệu chi tiết
        res.status(200).json(resource);

    } catch (error) {
        console.error("Lỗi khi lấy Resource theo ID:", error);
        // Lỗi này thường xảy ra nếu ID không đúng định dạng ObjectId
        res.status(500).json({
            message: 'Lỗi máy chủ nội bộ hoặc ID không đúng định dạng.',
            error: error.message
        });
    }
};
/**
 * API 3: POST tạo một Tài nguyên học tập mới (Resource)
 * Route: POST /api/resources
 */
const createResource = async (req, res) => {
    try {
        const resourceData = req.body;

        // 1. Tạo document mới từ Model và dữ liệu gửi lên
        const newResource = new Resource(resourceData);

        // 2. Lưu vào cơ sở dữ liệu. Mongoose sẽ tự động validate 
        // (ví dụ: required, enum)
        await newResource.save();

        // 3. Trả về document đã tạo thành công
        res.status(201).json({
            message: 'Tạo tài nguyên mới thành công.',
            data: newResource
        });

    } catch (error) {
        // Xử lý lỗi validation (ví dụ: thiếu required fields, giá trị enum không hợp lệ)
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: 'Dữ liệu tài nguyên không hợp lệ hoặc thiếu trường bắt buộc.',
                details: error.message
            });
        }

        // Trường 'url' trong Schema của bạn không còn là unique: true nữa (đã bỏ trong Schema bạn gửi).
        // Nếu nó là unique, cần xử lý lỗi 11000 tương tự như bài trước.

        console.error("Lỗi khi tạo Resource:", error);
        res.status(500).json({
            message: 'Lỗi máy chủ nội bộ khi tạo tài nguyên.',
            error: error.message
        });
    }
};
module.exports = { getAllResources, getResourceById, createResource };