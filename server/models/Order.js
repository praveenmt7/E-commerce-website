const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  cartItems: [
    {
      _id: String,
      title: String,
      name: String,
      image: String,
      price: Number,
      quantity: Number,
    }
  ],
  shippingInfo: {
    fullName: String,
    email: String,
    phone: String,
    address: String,
  },
  totalPrice: Number,
  deliveryOption: String,
  grandTotal: Number,

  // Payment
  paymentMethod: {
    type: String,
    required: true,
    enum: ['COD', 'Card']
  },
  status: {
    type: String,
    enum: ['Pending', 'Paid'],
    default: 'Pending'
  },

  // Razorpay (optional for COD)
  razorpayPaymentId: String,
  razorpayOrderId: String,
  razorpaySignature: String,

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', OrderSchema);