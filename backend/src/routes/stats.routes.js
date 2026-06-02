const express = require('express');
const router = express.Router();
const geoip = require('geoip-lite');
const Visitor = require('../models/Visitor');
const ToolUsage = require('../models/ToolUsage');
const SiteSetting = require('../models/SiteSetting');

// POST /api/stats/visit
router.post('/visit', async (req, res) => {
  try {
    const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress || 'unknown';
    const { tool, category } = req.body;
    const geo = geoip.lookup(ip);
    const countryNames = require('../routes/countryNames');
    await Visitor.create({
      ip, country: geo?.country ? countryNames[geo.country] || geo.country : 'Unknown',
      countryCode: geo?.country || 'XX', city: geo?.city || 'Unknown',
      tool: tool || 'homepage', category: category || 'general',
      userAgent: req.headers['user-agent'], date: new Date(),
    });
    if (tool && category) {
      await ToolUsage.create({ tool, category, ip, country: geo?.country || 'Unknown', date: new Date() });
    }
    res.json({ ok: true });
  } catch { res.json({ ok: true }); }
});

// GET /api/stats/public
router.get('/public', async (req, res) => {
  try {
    const [total, adCodeSetting] = await Promise.all([
      ToolUsage.countDocuments(),
      SiteSetting.findOne({ key: 'adCode' }),
    ]);
    res.json({ totalOperations: total, adCode: adCodeSetting?.value || '' });
  } catch { res.json({ totalOperations: 0, adCode: '' }); }
});

module.exports = router;
