const mongoose = require('mongoose');

const toolUsageSchema = new mongoose.Schema({
  tool: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now },
  ip: { type: String },
  country: { type: String, default: 'Unknown' },
}, { timestamps: true });

module.exports = mongoose.model('ToolUsage', toolUsageSchema);
