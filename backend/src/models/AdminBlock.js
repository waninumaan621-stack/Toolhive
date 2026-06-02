const mongoose = require('mongoose');

const adminBlockSchema = new mongoose.Schema({
  ip: { type: String, required: true, unique: true },
  attempts: { type: Number, default: 0 },
  blockedUntil: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('AdminBlock', adminBlockSchema);
