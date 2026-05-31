const express = require('express');
const router  = express.Router();
const stripe  = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { protect } = require('../middleware/authMiddleware');

// POST /api/payments/create-intent
router.post('/create-intent', protect, async (req, res) => {
  const { amount } = req.body; // amount in cents

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