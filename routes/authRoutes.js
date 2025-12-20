const express = require('express');
const { registerUser, loginUser, quenMatKhau, datLaiMatKhau, } = require('../controllers/authController');
const { getAll } = require('../controllers/questionController');
const { submit } = require('../controllers/submissionController');
const { getRoadmap, getAllRoadmap, getRoadmapByLevel } = require('../controllers/roadmap');
const { updateProgress, getProgresStudent, createProgress, getProgressStudent } = require('../controllers/progress');
const { getAllLabs, createLab } = require('../controllers/labsController');
const { getAllResources, createResource } = require('../controllers/resorcesController');
const { getTestMessageUrl } = require('nodemailer');
const { getRandomQuestions, submitQuiz, getUserQuizHistory } = require('../controllers/CQuestionsController');
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

// /roadmap roadmaps/:career
router.get('/all-roadmap', getAllRoadmap);
router.get('/roadmap/:career', getRoadmap);
router.get('/roadmap2/:career', getRoadmapByLevel);

// progress
router.post('/progress/create', createProgress);
router.put('/progress/update', updateProgress);
router.get('/progress/:studentId/:career', getProgressStudent);

//labs
router.get('/get-labs', getAllLabs);
router.post('/post-lab', createLab);

//resource
router.get('/get-resorce', getAllResources);
router.post('/post-resorce', createResource);

//quiz
router.get('/get-quiz', getRandomQuestions);
router.post('/submit-quiz', submitQuiz);
router.get('/quiz/history/:userId', getUserQuizHistory);





module.exports = router;


