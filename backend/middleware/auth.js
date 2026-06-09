const { requireAuth } = require('@clerk/express');
const User = require('../models/User');

const loadUser = async (req, res, next) => {
  try {
    if (!req.auth || !req.auth.userId) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
    // Find the user in MongoDB using the Clerk ID
    const user = await User.findOne({ clerkId: req.auth.userId });
    
    if (user) {
      req.user = user;
      // Also map id so req.user.id works for downstream routes
      req.user.id = user._id; 
    }
    
    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    res.status(500).json({ message: 'Server error in auth middleware' });
  }
};

// This middleware array ensures that a valid Clerk user is making the request,
// and then loads their corresponding MongoDB user object into req.user.
module.exports = [requireAuth(), loadUser];

