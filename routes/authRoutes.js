const express = require('express');
const { registerUser, loginUser, quenMatKhau, datLaiMatKhau , } = require('../controllers/authController');
const { getAll } = require('../controllers/questionController');
const { submit } = require('../controllers/submissionController');
const { getRoadmap, getAllRoadmap } = require('../controllers/roadmap');
const { updateProgress, getProgresStudent, createProgress } = require('../controllers/progress');
const { getAllLabs } = require('../controllers/labsController');
const { getAllResources } = require('../controllers/resorcesController');
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
router.get('/all-roadmap', getAllRoadmap);  
router.get('/roadmap/:career', getRoadmap);

// progress
router.post('/progress/create', createProgress);
router.put('/progress/update', updateProgress);
router.get('/progress/:studentId/:career',getProgresStudent );

//labs
router.get('/get-labs', getAllLabs);  

//resource
router.get('/get-resorce', getAllResources);  



module.exports = router;


