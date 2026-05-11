const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    price: Number,
    quantity: { type: Number, default: 1 }
  }],
  totalAmount: { type: Number, required: true },
  profit: { type: Number, required: true },
  paymentMethod: { 
    type: String, 
    enum: ['cash', 'mpesa', 'bank'],
    default: 'cash'
  },
  soldBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Sale', saleSchema);
