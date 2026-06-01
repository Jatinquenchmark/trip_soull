const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Booking = require('../models/Booking');
const User = require('../models/User');

// Middleware to optionally authenticate a user
const optionalAuth = (req, res, next) => {
  const token = req.cookies.userToken || (req.header('Authorization') && req.header('Authorization').replace('Bearer ', ''));
  if (token) {
    // If token exists, try to verify it
    try {
      const jwt = require('jsonwebtoken');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    } catch (e) {
      // invalid token, just proceed as guest
    }
  }
  next();
};

// Create a new booking
router.post('/', optionalAuth, async (req, res) => {
  try {
    const { packageId, guestDetails, travelDate, tier, travelStyle, totalPrice } = req.body;

    if (!packageId || !guestDetails || !guestDetails.name || !guestDetails.email || !guestDetails.phone || !travelDate) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const booking = new Booking({
      user: req.user ? req.user.id : null,
      package: packageId,
      guestDetails,
      travelDate,
      tier,
      travelStyle,
      totalPrice
    });

    await booking.save();
    
    // If user is logged in, optionally link the booking to their account somehow, 
    // though the 'user' field in Booking schema already handles this relation.

    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Server error while creating booking' });
  }
});

// Get bookings for logged-in user
router.get('/my-bookings', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('package', 'name images location countryId duration days nights')
      .sort({ travelDate: 1 }); // Sort by travel date ascending

    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
