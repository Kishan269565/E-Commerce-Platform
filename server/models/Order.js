const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product:  { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name:     String,
    price:    Number,
    quantity: Number,
    image:    String,
  }],
  shippingAddress: {
    street:  String,
    city:    String,
    zip:     String,
    country: String,
  },
  totalPrice:  { type: Number, required: true },
  isPaid:      { type: Boolean, default: false },
  paidAt:      Date,
  isDelivered: { type: Boolean, default: false },
  deliveredAt: Date,
  paymentResult: {
    id:       String,
    status:   String,
    email:    String,
  },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);