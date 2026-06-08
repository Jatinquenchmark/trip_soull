const express = require('express');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');

const router = express.Router();

const isProduction = process.env.NODE_ENV === 'production';
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

const getOAuthClient = () => {
  return new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/auth/google/callback'
  );
};

// Route to initiate Google Login
router.get('/google', (req, res) => {
  const oAuth2Client = getOAuthClient();
  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
    prompt: 'consent',
    redirect_uri: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/auth/google/callback'
  });
  
  res.redirect(authorizeUrl);
});

// Callback route for Google
router.get('/google/callback', async (req, res) => {
  const { code } = req.query;
  
  if (!code) {
    return res.redirect(`${frontendUrl}/login?error=auth_failed`);
  }

  try {
    const oAuth2Client = getOAuthClient();
    
    // Exchange authorization code for access token
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

    // Get user profile info directly using the oauth2 client
    const response = await oAuth2Client.request({
      url: 'https://www.googleapis.com/oauth2/v2/userinfo'
    });
    
    const data = response.data;
    
    if (!data.email) {
      return res.redirect(`${frontendUrl}/login?error=no_email`);
    }

    // Find or create user
    let user = await User.findOne({ email: data.email });

    if (user) {
      // If user exists but used local auth, we can either update them or just log them in
      if (user.authProvider === 'local') {
        user.authProvider = 'google';
        if (!user.profilePicture && data.picture) {
          user.profilePicture = data.picture;
        }
        await user.save();
      }
    } else {
      // Create new user
      user = new User({
        name: data.name,
        email: data.email,
        profilePicture: data.picture,
        authProvider: 'google'
      });
      await user.save();
    }

    // Generate token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    // Set cookie
    res.cookie('userToken', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    // Redirect to home page with success flag and token
    res.redirect(`${frontendUrl}/?login=success&token=${token}`);

  } catch (error) {
    console.error('Google Auth Error:', error);
    res.redirect(`${frontendUrl}/login?error=server_error`);
  }
});

module.exports = router;
