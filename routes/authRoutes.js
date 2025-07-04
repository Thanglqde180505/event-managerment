const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route for user login
router.post('/login', authController.loginUser);
router.get('/login', (req, res) => {
    const success = req.query.success ? 'Đăng ký thành công! Vui lòng đăng nhập.' : null;
    const logout = req.query.logout ? 'Đăng xuất thành công!' : null;
    res.render('login', { error: null, success, logout });
});
// Route for user registration
router.post('/register', authController.registerUser);
router.get('/register', (req, res) => {
    res.render('register', { error: null });
});

// Route for user logout
router.get('/logout', authController.logoutUser);

module.exports = router;