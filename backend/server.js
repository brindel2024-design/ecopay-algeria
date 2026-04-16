require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const helmet     = require('helmet');
const rateLimit  = require('express-rate-limit');
const pool       = require('./config/db');

const app = express();

// ── Security Headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
    }
  }
}));

import cors from 'cors';
app.use(cors({
  origin: [process.env.FRONTEND_URL || 'http://localhost:3000'],
  credentials: true,
}));

app.use(express.json({ limit: '1mb' }));

const globalLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200 });
app.use(globalLimiter);

app.use('/api/auth', require('./routes/auth'));
app.use('/api/wallet', require('./routes/wallet'));
app.use('/api/transfer', require('./routes/transfer'));
app.use('/api/billing', require('./routes/billing'));
app.use('/api/recharge', require('./routes/recharge'));
app.use('/api/qr', require('./routes/qr'));
app.use('/api/users', require('./routes/users'));

app.get('/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', db: 'connected', version: '1.0.0' });
  } catch {
    res.status(503).json({ status: 'error' });
  }
});

app.use((_req, res) => res.status(404).json({ error: 'Route introuvable' }));
app.use((err, _req, res, _next) => {
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => { console.log(`Ecopay API port ${PORT}`); });
module.exports = app;
