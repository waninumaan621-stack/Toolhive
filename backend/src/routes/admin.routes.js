const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const geoip = require('geoip-lite');
const AdminBlock = require('../models/AdminBlock');
const SiteSetting = require('../models/SiteSetting');
const Visitor = require('../models/Visitor');
const ToolUsage = require('../models/ToolUsage');
const adminAuth = require('../middleware/adminAuth');

// POST /api/admin/login
router.post('/login', async (req, res) => {
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress || 'unknown';
  const { username, password } = req.body;
  try {
    let block = await AdminBlock.findOne({ ip });
    if (block?.blockedUntil && new Date() < block.blockedUntil) {
      const minutesLeft = Math.ceil((block.blockedUntil - new Date()) / 60000);
      return res.status(429).json({ error: `Too many attempts. Try again in ${minutesLeft} minutes.` });
    }
    const validUsername = process.env.ADMIN_USERNAME || 'toolhive@9698';
    const validPassword = process.env.ADMIN_PASSWORD || 'ToolHive@9698';
    if (username === validUsername && password === validPassword) {
      await AdminBlock.findOneAndDelete({ ip });
      const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '12h' });
      return res.json({ token });
    }
    if (!block) { block = new AdminBlock({ ip, attempts: 1 }); }
    else {
      block.attempts += 1;
      if (block.attempts >= 3) block.blockedUntil = new Date(Date.now() + 24 * 60 * 60 * 1000);
    }
    await block.save();
    if (block.blockedUntil) return res.status(429).json({ error: 'Too many failed attempts. Blocked for 24 hours.' });
    return res.status(401).json({ error: 'Invalid credentials', remaining: Math.max(0, 3 - block.attempts) });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: 'Login failed' });
  }
});

// GET /api/admin/settings/public — no auth, returns only adCode
router.get('/settings/public', async (req, res) => {
  try {
    const setting = await SiteSetting.findOne({ key: 'adCode' });
    res.json({ adCode: setting?.value || '' });
  } catch { res.json({ adCode: '' }); }
});

// All routes below require auth
router.use(adminAuth);

// GET /api/admin/stats
router.get('/stats', async (req, res) => {
  try {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterdayStart = new Date(todayStart - 24 * 60 * 60 * 1000);
    const weekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);

    const [totalVisitors, todayVisitors, yesterdayVisitors, totalToolUsage, todayToolUsage] = await Promise.all([
      Visitor.countDocuments(),
      Visitor.countDocuments({ date: { $gte: todayStart } }),
      Visitor.countDocuments({ date: { $gte: yesterdayStart, $lt: todayStart } }),
      ToolUsage.countDocuments(),
      ToolUsage.countDocuments({ date: { $gte: todayStart } }),
    ]);

    const [topToolsToday, topToolsAllTime, byCountry, last7Days, hourlyToday] = await Promise.all([
      ToolUsage.aggregate([{ $match: { date: { $gte: todayStart } } }, { $group: { _id: '$tool', count: { $sum: 1 }, category: { $first: '$category' } } }, { $sort: { count: -1 } }, { $limit: 10 }]),
      ToolUsage.aggregate([{ $group: { _id: '$tool', count: { $sum: 1 }, category: { $first: '$category' } } }, { $sort: { count: -1 } }, { $limit: 10 }]),
      Visitor.aggregate([{ $group: { _id: '$country', code: { $first: '$countryCode' }, count: { $sum: 1 } } }, { $sort: { count: -1 } }, { $limit: 15 }]),
      Visitor.aggregate([{ $match: { date: { $gte: weekAgo } } }, { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } }, count: { $sum: 1 } } }, { $sort: { _id: 1 } }]),
      Visitor.aggregate([{ $match: { date: { $gte: todayStart } } }, { $group: { _id: { $hour: '$date' }, count: { $sum: 1 } } }, { $sort: { _id: 1 } }]),
    ]);

    res.json({ totalVisitors, todayVisitors, yesterdayVisitors, totalToolUsage, todayToolUsage, topToolsToday, topToolsAllTime, byCountry, last7Days, hourlyToday });
  } catch (err) {
    console.error('Stats error:', err.message);
    res.status(500).json({ error: 'Failed to load stats' });
  }
});

// GET /api/admin/settings
router.get('/settings', async (req, res) => {
  try {
    const settings = await SiteSetting.find();
    const result = {};
    settings.forEach(s => { result[s.key] = s.value; });
    res.json(result);
  } catch { res.status(500).json({ error: 'Failed to load settings' }); }
});

// PUT /api/admin/settings
router.put('/settings', async (req, res) => {
  try {
    for (const [key, value] of Object.entries(req.body)) {
      await SiteSetting.findOneAndUpdate({ key }, { value }, { upsert: true, new: true });
    }
    res.json({ message: 'Settings saved' });
  } catch { res.status(500).json({ error: 'Failed to save settings' }); }
});

module.exports = router;
