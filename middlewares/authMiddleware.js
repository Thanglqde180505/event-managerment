const jwt = require('jsonwebtoken');

exports.authenticateUser = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1] || req.session.token;
    if (!token) {
        return res.status(401).json({ message: 'Authentication required' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

exports.isAdmin = (req, res, next) => {
    if (req.user.role === 'admin') {
        return next();
    }
    res.status(403).json({ message: 'Access denied. Admins only.' });
};

exports.isStudent = (req, res, next) => {
    if (req.user.role === 'student') {
        return next();
    }
    res.status(403).json({ message: 'Access denied. Students only.' });
};