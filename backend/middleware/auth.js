const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.userToken || req.cookies.adminToken;
    
    if (!token) {
      return res.status(401).json({ message: 'No authentication token found, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find the user in MongoDB
    if (decoded.role === 'admin') {
      req.user = { id: 'admin', role: 'admin' };
    } else {
      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      req.user = user;
      req.user.id = user._id; // Ensure req.user.id is accessible
    }

    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;
