// models/Roadmap.js
const mongoose = require("mongoose");

const roadmapItemSchema = new mongoose.Schema({
  category: { type: String, enum: ["video", "playlist","learning_path","article","book"], required: true },
  title: { type: String, required: true },
  language: { type: String },
  level: { type: String, enum: ["beginner", "intermediate", "mixed" ,"advanced"] },
  url: { type: String, required: true },
  notes: { type: String }
});

const roadmapSchema = new mongoose.Schema({
  career: { type: String, required: true }, // Ví dụ: "SOC Analyst"
  items: { type: [roadmapItemSchema], required: true }
});

module.exports = mongoose.model("Roadmap", roadmapSchema);
