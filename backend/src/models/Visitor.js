const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  ip: { type: String },
  country: { type: String, default: 'Unknown' },
  countryCode: { type: String, default: 'XX' },
  city: { type: String, default: 'Unknown' },
  tool: { type: String },
  category: { type: String },
  date: { type: Date, default: Date.now },
  userAgent: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Visitor', visitorSchema);
