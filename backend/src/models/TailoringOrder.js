const mongoose = require('mongoose');

const tailoringOrderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerPhone: { type: String, required: true },
  measurements: {
    chest: String,
    waist: String,
    shoulder: String,
    sleeve: String,
    length: String,
    neck: String,
    other: String
  },
  designNotes: { type: String },
  assignedTailor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { 
    type: String, 
    enum: ['pending', 'assigned', 'in-progress', 'ready', 'delivered'],
    default: 'pending'
  },
  amount: { type: Number, required: true },
  deposit: { type: Number, default: 0 },
  dueDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TailoringOrder', tailoringOrderSchema);
