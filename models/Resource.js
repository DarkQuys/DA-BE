const mongoose = require('mongoose');
const { Schema } = mongoose;

const ResourceSchema = new Schema({
    // Loại tài nguyên: video, playlist, channel, guide, lab_platform, book
    category: {
        type: String,
        required: true,
        trim: true,
        enum: ['video', 'playlist', 'article', 'channel', 'guide', 'lab_platform', 'book', 'learning_path'],
        // Index giúp tăng tốc độ lọc theo Category
        index: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    // Ngôn ngữ: en (English), vi (Vietnamese), mixed
    language: {
        type: String,
        required: true,
        trim: true,
        enum: ['en', 'vi', 'mixed'],
        index: true
    },
    // Cấp độ: beginner, intermediate, mixed
    level: {
        type: String,
        required: true,
        trim: true,
        enum: ['beginner', 'intermediate', 'mixed', 'advanced'],
        index: true
    },
    url: {
        type: String,
        trim: true
    },
    notes: {
        type: String,
        trim: true
    }
}, { timestamps: true });

// Tạo Model, Collection name sẽ là 'learning_resources'
const Resource = mongoose.model('LearningResource', ResourceSchema, 'learning_resources');
module.exports = Resource;