const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { authenticateUser, isStudent } = require('../middlewares/authMiddleware');

// Route to list events (Students can view events to register)
router.get('/list', authenticateUser, isStudent, eventController.listEvents);

module.exports = router;