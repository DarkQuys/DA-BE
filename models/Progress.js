// models/Progress.js
const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  career: { type: String, required: true }, // ex: "SOC Analyst"
  completedItems: { type: [Number], default: [] }, // index của roadmap items
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Progress", progressSchema);
