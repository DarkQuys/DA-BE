const Question = require('../models/Questions');

// GET /api/questions
const getAll = async (req, res) => {
  const questions = await Question.find({}).sort({ questionId: 1 });
  res.json(questions);
};

// GET /api/questions/:id
const getById = async (req, res) => {
  const q = await Question.findOne({ questionId: Number(req.params.id) });
  if (!q) return res.status(404).json({ message: 'Question not found' });
  res.json(q);
};

// POST /api/questions
const create = async (req, res) => {
  const { questionId, domain, question, options, mapping } = req.body;
  if (!questionId || !question || !options || !mapping)
    return res.status(400).json({ message: 'Missing fields' });

  if (options.length !== mapping.length)
    return res.status(400).json({ message: 'options and mapping length must match' });

  const exists = await Question.findOne({ questionId });
  if (exists) return res.status(400).json({ message: 'questionId already exists' });

  const q = await Question.create({ questionId, domain, question, options, mapping });
  res.status(201).json(q);
};

// PUT /api/questions/:id
const update = async (req, res) => {
  const q = await Question.findOneAndUpdate({ questionId: Number(req.params.id) }, req.body, { new: true });
  if (!q) return res.status(404).json({ message: 'Question not found' });
  res.json(q);
};

// DELETE /api/questions/:id
const remove = async (req, res) => {
  const q = await Question.findOneAndDelete({ questionId: Number(req.params.id) });
  if (!q) return res.status(404).json({ message: 'Question not found' });
  res.json({ message: 'Deleted' });
};

module.exports = { getAll, getById, create, update, remove };
