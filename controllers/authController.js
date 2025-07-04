const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Function to register a new user
exports.registerUser = async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            password: hashedPassword,
            role,
            createdAt: new Date()
        });
        await newUser.save();
        // Redirect to login with success message
        res.redirect('/auth/login?success=1');
    } catch (error) {
        res.render('register', { error: 'Đăng ký thất bại. Vui lòng thử lại.' });
    }
};

// Function to authenticate a user
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.render('login', { error: 'Invalid credentials', success: null });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.render('login', { error: 'Invalid credentials', success: null });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        req.session.token = token;

        if (user.role === 'student') {
            return res.redirect('/register/place');
        } else if (user.role === 'admin') {
            return res.redirect('/register');
        }
    } catch (error) {
        res.render('login', { error: 'An error occurred during login', success: null });
    }
};

// Function to logout user
exports.logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
        }
        res.redirect('/auth/login?logout=1');
    });
};