const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionId: { type: Number, required: true, unique: true },
  domain: { type: String, default: 'Career Orientation' },
  question: { type: String, required: true },
  options: { type: [String], required: true }, // array of option strings (A, B, C, ...)
  mapping: { type: [String], required: true }  // mapping[i] -> job for options[i]
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);
