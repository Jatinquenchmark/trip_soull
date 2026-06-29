const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');

const Package = require('../models/Package');

// Route to create a Razorpay order
router.post('/create-order', async (req, res) => {
  try {
    const { packageId, tierId, experienceId, currency = 'INR' } = req.body;

    if (!packageId || !tierId) {
      return res.status(400).json({ success: false, message: 'Package ID and Tier ID are required' });
    }

    const pkg = await Package.findById(packageId);
    if (!pkg) {
      return res.status(404).json({ success: false, message: 'Package not found' });
    }

    // Determine active pricing source
    let activePricingSource = pkg.pricingTiers;
    if (experienceId && pkg.experiences && pkg.experiences[experienceId]) {
      const exp = pkg.experiences[experienceId];
      if (exp.pricingTiers && (exp.pricingTiers.essential || exp.pricingTiers.comfort || exp.pricingTiers.luxury)) {
        activePricingSource = exp.pricingTiers;
      }
    }

    let priceString = '0';
    if (tierId === 'basic') priceString = activePricingSource?.essential || '0';
    if (tierId === 'medium') priceString = activePricingSource?.comfort || '0';
    if (tierId === 'luxury') priceString = activePricingSource?.luxury || '0';

    const amount = parseInt(priceString.toString().replace(/[^\d]/g, ''));
    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid or zero price for selected package tier' });
    }

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: amount * 100, // amount in smallest currency unit (paise)
      currency,
      receipt: `receipt_order_${Date.now()}`
    };

    const order = await instance.orders.create(options);

    if (!order) {
      return res.status(500).json({ success: false, message: 'Some error occurred with Razorpay' });
    }

    res.json({ success: true, order });
  } catch (error) {
    console.error('Error creating razorpay order:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Route to verify the payment signature
router.post('/verify', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature === expectedSign) {
      // Payment is verified
      // TODO: Here you can update your database with payment success status
      return res.json({ success: true, message: 'Payment verified successfully' });
    } else {
      return res.status(400).json({ success: false, message: 'Invalid signature sent!' });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
