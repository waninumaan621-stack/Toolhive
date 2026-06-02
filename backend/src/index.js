require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');

const adminRoutes = require('./routes/admin.routes');
const statsRoutes = require('./routes/stats.routes');

const app = express();

connectDB();

app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }));
app.use(express.json({ limit: '1mb' }));

// Rate limiter
app.use('/api/', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { error: 'Too many requests' }
}));

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/stats', statsRoutes);

// Health
app.get('/api/health', (req, res) => res.json({ status: 'ok', app: 'ToolHive' }));

app.use((req, res) => res.status(404).json({ error: 'Not found' }));
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: 'Server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`ToolHive backend running on port ${PORT}`));
