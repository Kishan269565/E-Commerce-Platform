const express = require('express');
const router  = express.Router();
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/authMiddleware');

// GET /api/products — with search & category filter
router.get('/', async (req, res) => {
  const { search, category, page = 1 } = req.query;
  const limit = 12;
  const query = {};

  if (search)   query.name     = { $regex: search, $options: 'i' };
  if (category) query.category = category;

  const total    = await Product.countDocuments(query);
  const products = await Product.find(query)
    .skip((page - 1) * limit)
    .limit(limit);

  res.json({ products, total, pages: Math.ceil(total / limit) });
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

// POST /api/products — admin only
router.post('/', protect, admin, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/products/:id — admin only
router.put('/:id', protect, admin, async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(product);
});

// DELETE /api/products/:id — admin only
router.delete('/:id', protect, admin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Product deleted' });
});

// POST /api/products/:id/reviews
router.post('/:id/reviews', protect, async (req, res) => {
  const product = await Product.findById(req.params.id);
  const { rating, comment } = req.body;

  product.reviews.push({ user: req.user._id, rating, comment });
  product.numReviews = product.reviews.length;
  product.rating = product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length;
  await product.save();
  res.status(201).json({ message: 'Review added' });
});

module.exports = router;