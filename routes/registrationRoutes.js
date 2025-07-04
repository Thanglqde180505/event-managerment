const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registrationController');
const { authenticateUser, isAdmin, isStudent } = require('../middlewares/authMiddleware');
const Event = require('../models/eventModel');
const Registration = require('../models/registrationModel');


// Route to list registrations (Admin only)
router.get('/', authenticateUser, isAdmin, registrationController.getRegistrations);

router.post('/place', authenticateUser, isStudent, registrationController.placeRegistration);
router.get('/place', authenticateUser, isStudent, async (req, res) => {
    const events = await Event.find();
    res.render('registerEvent', { events, error: null });
});

// Route to cancel a registration (Student only)
router.delete('/cancel/:registrationId', authenticateUser, isStudent, registrationController.cancelRegistration);
router.get('/cancel', authenticateUser, isStudent, async (req, res) => {
    const registrations = await Registration.find({ studentId: req.user.id });
    res.render('cancelRegistration', { registrations });
});

module.exports = router;