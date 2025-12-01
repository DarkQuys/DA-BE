const Submission = require('../models/Submission');
const Question = require('../models/Questions');
const calcResult = require('../utils/calcResult');

// POST /api/submissions/submit
// body: { studentId, studentName?, answers: [{questionId, optionIndex}, ...] }
const submit = async (req, res) => {
  try {
    const { studentId, studentName, answers } = req.body;
    if (!studentId || !answers || !Array.isArray(answers)) {
      return res.status(400).json({ message: 'studentId and answers required' });
    }

    // load relevant questions (only those referenced to avoid loading all)
    const qIds = [...new Set(answers.map(a => a.questionId))];
    const questions = await Question.find({ questionId: { $in: qIds } });

    const { top, counts, percentages } = calcResult(answers, questions);

    const submission = await Submission.create({
      studentId,
      studentName,
      answers,
      result: top,
      resultStats: { counts, percentages }
    });

    res.status(201).json({
      submissionId: submission._id,
      result: top,
      resultStats: submission.resultStats
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/submissions/:studentId  (get submissions for a student)
const getByStudent = async (req, res) => {
  const submissions = await Submission.find({ studentId: req.params.studentId }).sort({ createdAt: -1 });
  res.json(submissions);
};

// GET /api/submissions (admin) - list all (with pagination)
const getAll = async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(100, Number(req.query.limit) || 50);
  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    Submission.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Submission.countDocuments()
  ]);

  res.json({ items, total, page, limit });
};

module.exports = { submit, getByStudent, getAll };
