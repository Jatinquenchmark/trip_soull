const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Using hardcoded admin credentials for now
  if (email === 'admin@tripsoul.com' && password === 'password123') {
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return res.json({ token });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
});

module.exports = router;
