// models/LabLibrary.js
const mongoose = require('mongoose');

const LabLibrarySchema = new mongoose.Schema({
    id: Number, // ID gốc từ file JSON của bạn
    title: { type: String, required: true },
    platform: String,
    category: String,
    skill_tags: [String],
    difficulty: Number,
    url: { type: String, required: true, unique: true }, // Dùng URL để đối chiếu
    description: String,
    description_detail: String
}, { timestamps: true });

module.exports = mongoose.model('LabLibrary', LabLibrarySchema);