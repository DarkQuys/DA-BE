const mongoose = require('mongoose');
const { Schema } = mongoose;

const LabSchema = new Schema({
    // Lab ID (Không phải _id mặc định của MongoDB)
    id: { 
        type: Number, 
        required: true, 
        unique: true 
    },
    title: { 
        type: String, 
        required: true, 
        trim: true 
    },
    platform: { 
        type: String, 
        required: true, 
        trim: true,
        default: "SEED Labs" 
    },
    category: { 
        type: String, 
        required: true, 
        trim: true,
        // Dùng index để tăng tốc độ tìm kiếm theo Category
        index: true 
    },
    skill_tags: { 
        type: [String], // Mảng các chuỗi
        required: true 
    },
    difficulty: { 
        type: Number, 
        required: true, 
        min: 1, 
        max: 5,
        index: true 
    },
    subject: { 
        type: String, 
        trim: true 
    },
    url: { 
        type: String, 
        required: true, 
        unique: true, // Đảm bảo URL là duy nhất
        trim: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    description_detail: { 
        type: String, 
        required: true 
    }
}, { timestamps: true });

// Tạo Model để sử dụng
const Lab = mongoose.model('Lab', LabSchema, 'security_labs'); // 'security_labs' là tên collection
module.exports = Lab;