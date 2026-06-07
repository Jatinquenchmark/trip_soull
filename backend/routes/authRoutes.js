const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const User = require('../models/User');
const rateLimit = require('express-rate-limit');
const router = express.Router();

const isProduction = process.env.NODE_ENV === 'production';

// Auth Rate Limiter - Stricter for login/register
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 auth requests per window
  message: { message: 'Too many authentication attempts from this IP, please try again after 15 minutes' }
});

// Admin Login
router.post('/login', authLimiter, (req, res) => {
  const { email, password } = req.body;

  // Using hardcoded admin credentials for now
  if (email === 'admin@tripsoul.com' && password === 'password123') {
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });
    
    res.cookie('adminToken', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    return res.json({ message: 'Logged in successfully' });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
});

// Admin Logout
router.post('/logout', (req, res) => {
  res.clearCookie('adminToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/'
  });
  return res.json({ message: 'Logged out successfully' });
});

// --- Customer Auth Routes ---

// Register
router.post('/register', authLimiter, async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      password: hashedPassword,
      phone: phone || ''
    });

    await user.save();

    // Create token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    res.cookie('userToken', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(201).json({ 
      message: 'User registered successfully', 
      user: { id: user._id, name: user.name, email: user.email, role: user.role } 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// User Login
router.post('/user-login', authLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (user.authProvider !== 'local' || !user.password) {
      return res.status(400).json({ message: 'Please login using your social account' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    res.cookie('userToken', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({ 
      message: 'Logged in successfully',
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// User Logout
router.post('/user-logout', (req, res) => {
  res.clearCookie('userToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/'
  });
  return res.json({ message: 'Logged out successfully' });
});

// General Verify Route (Handles both user and admin)
router.get('/verify', async (req, res) => {
  try {
    let isAdmin = false;
    let isAuthenticated = false;
    let userData = null;
    let currentRole = null;

    if (req.cookies && req.cookies.adminToken) {
      try {
        jwt.verify(req.cookies.adminToken, process.env.JWT_SECRET);
        isAdmin = true;
        isAuthenticated = true;
        currentRole = 'admin';
      } catch (err) {}
    }

    if (req.cookies && req.cookies.userToken) {
      try {
        const decoded = jwt.verify(req.cookies.userToken, process.env.JWT_SECRET);
        if (decoded.role === 'user') {
          const user = await User.findById(decoded.id).select('-password');
          if (user) {
            userData = { id: user._id, name: user.name, email: user.email, role: user.role };
            isAuthenticated = true;
            if (!currentRole) currentRole = 'user';
          }
        }
      } catch (err) {}
    }

    if (!isAuthenticated) {
      return res.json({ isAuthenticated: false, message: 'No valid token provided' });
    }

    return res.json({ 
      isAuthenticated: true, 
      isAdmin: isAdmin,
      role: currentRole,
      user: userData
    });
  } catch (err) {
    return res.json({ isAuthenticated: false, message: 'Server error during verification' });
  }
});

module.exports = router;
