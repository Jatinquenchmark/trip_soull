const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
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
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
