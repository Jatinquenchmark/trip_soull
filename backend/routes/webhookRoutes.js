const express = require('express');
const { Webhook } = require('svix');
const User = require('../models/User');

const router = express.Router();

// Webhook route needs raw body for svix verification
router.post('/clerk', express.raw({ type: 'application/json' }), async (req, res) => {
  const SIGNING_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!SIGNING_SECRET) {
    console.error('Error: Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env');
    return res.status(500).json({ error: 'Webhook secret missing' });
  }

  const wh = new Webhook(SIGNING_SECRET);

  const headers = req.headers;
  const payload = req.body;

  const svix_id = headers['svix-id'];
  const svix_timestamp = headers['svix-timestamp'];
  const svix_signature = headers['svix-signature'];

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return res.status(400).json({
      success: false,
      message: 'Error: Missing svix headers',
    });
  }

  let evt;

  try {
    evt = wh.verify(payload, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (err) {
    console.log('Error: Could not verify webhook:', err.message);
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  const eventType = evt.type;

  if (eventType === 'user.created') {
    const { email_addresses, first_name, last_name, image_url } = evt.data;
    
    try {
      const email = email_addresses[0].email_address;
      const name = `${first_name || ''} ${last_name || ''}`.trim() || 'Clerk User';

      let user = await User.findOne({ clerkId: id });
      
      if (!user) {
        user = await User.findOne({ email });
      }

      if (!user) {
        user = new User({
          clerkId: id,
          name: name,
          email: email,
          profilePicture: image_url || '',
          authProvider: 'google', // We map it to google since it's the main social login
        });
        await user.save();
        console.log("New user synced to MongoDB from Clerk:", email);
      } else if (!user.clerkId) {
        // Update existing user with clerkId
        user.clerkId = id;
        await user.save();
        console.log("Updated existing user with clerkId:", email);
      }
    } catch (error) {
      console.error("Error saving user to MongoDB:", error);
      return res.status(500).json({ success: false, message: 'Error syncing user' });
    }
  }

  return res.status(200).json({
    success: true,
    message: 'Webhook received',
  });
});

module.exports = router;
