// // models/Roadmap.js
// const mongoose = require("mongoose");

// const roadmapItemSchema = new mongoose.Schema({
//   category: { type: String, enum: ["video", "playlist","learning_path","article","book"], required: true },
//   title: { type: String, required: true },
//   language: { type: String },
//   levels: { type: String, enum: ["beginner", "intermediate", "mixed" ,"advanced"] },
//   url: { type: String, required: true },
//   notes: { type: String }
// });

// const roadmapSchema = new mongoose.Schema({
//   career: { type: String, required: true }, // Ví dụ: "SOC Analyst"
//   items: { type: [roadmapItemSchema], required: true }
// });

// module.exports = mongoose.model("Roadmap", roadmapSchema);

const mongoose = require('mongoose');
const { Schema } = mongoose;

const LabSchema = new Schema({
    platform: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    url: {
        type: String,
        required: true,
        trim: true,
       // unique: true // Đảm bảo URL là duy nhất
    }
}, { _id: false }); // Không tạo _id cho các Sub-document này
const LevelSchema = new Schema({
    level: {
        type: Number,
        required: true,
        min: 0
    },
    slug: {
        type: String,
        required: true,
        trim: true,
        // unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    goals: {
        type: [String], // Một mảng các chuỗi
        required: true
    },
    labs: {
        type: [LabSchema], // Nhúng LabSchema vào đây
        required: true
    }
}, { _id: false }); // Không tạo _id cho các Sub-document này
const TrackSchema = new Schema({
    career: {
        type: String,
        required: true,
        trim: true,
        unique: true // Đảm bảo ID Lộ trình là duy nhất
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    version: {
        type: String,
        required: true,
        trim: true
    },
    levels: {
        type: [LevelSchema], // Nhúng LevelSchema vào đây
        required: true
    }
}, { timestamps: true }); // Thêm timestamps để có createdAt, updatedAt

// Tạo Model để sử dụng
const Roadmap = mongoose.model('Roadmap', TrackSchema);

module.exports = Roadmap;