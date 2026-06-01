const express = require('express');
const router  = express.Router();
const { protect } = require('../middleware/authMiddleware');

// POST /api/payments/create-intent
router.post('/create-intent', protect, async (req, res) => {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // ← moved inside
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;