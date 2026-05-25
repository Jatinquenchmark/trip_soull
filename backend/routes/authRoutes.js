const express = require('express');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Using hardcoded admin credentials for now
  if (email === 'admin@tripsoul.com' && password === 'password123') {
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });
    
    // Set cookie
    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie('adminToken', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    return res.json({ message: 'Logged in successfully' });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
});

router.post('/logout', (req, res) => {
  const isProduction = process.env.NODE_ENV === 'production';
  res.clearCookie('adminToken', {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax'
  });
  return res.json({ message: 'Logged out successfully' });
});

router.get('/verify', (req, res) => {
  let token = null;

  // 1. Try to get token from cookies
  if (req.cookies && req.cookies.adminToken) {
    token = req.cookies.adminToken;
  } 
  // 2. Fallback to Authorization header
  else {
    const authHeader = req.header('Authorization');
    if (authHeader) {
      token = authHeader.split(' ')[1]; // Bearer <token>
    }
  }

  if (!token) {
    return res.json({ isAuthenticated: false, message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.json({ isAuthenticated: true, role: decoded.role });
  } catch (err) {
    return res.json({ isAuthenticated: false, message: 'Invalid token' });
  }
});

module.exports = router;
