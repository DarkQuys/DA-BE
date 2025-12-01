const mongoose = require('mongoose');

const answerSubSchema = new mongoose.Schema({
  questionId: { type: Number, required: true },
  optionIndex: { type: Number, required: true } // 0-based index of option
}, { _id: false });

const submissionSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  studentName: { type: String }, // optional extra info
  answers: { type: [answerSubSchema], required: true },
  result: { type: [String], default: [] }, // top job(s) best fit (can be multiple on tie)
  resultStats: { type: Object }, // counts / percentages
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Submission', submissionSchema);
