const express = require('express');
const { registerUser, loginUser, quenMatKhau, datLaiMatKhau , } = require('../controllers/authController');
const { getAll } = require('../controllers/questionController');
const { submit } = require('../controllers/submissionController');
const { getRoadmap } = require('../controllers/roadmap');
const { updateProgress, getProgresStudent, createProgress } = require('../controllers/progress');
const router = express.Router();

// Định nghĩa routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/quen-mat-khau', quenMatKhau);
router.post('/dat-lai-mat-khau/:resetToken', datLaiMatKhau);

//questions
router.get('/questions', getAll);

//submissions
router.post('/submissions/submit', submit);

// /roadmap
router.post('/roadmap', getRoadmap);

// progress
router.post('/progress/create', createProgress);
router.put('/progress/update', updateProgress);
router.get('/progress/:studentId/:career',getProgresStudent );


module.exports = router;


