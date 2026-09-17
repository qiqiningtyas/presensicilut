const express = require('express');
const path = require('path');
const cors = require('cors');

const apiRouter = require('./src/routes/api');
const scheduler = require('./src/services/scheduler');
const baileysService = require('./src/services/baileysService');
const db = require('./src/database/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Private-Network', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', apiRouter);

// Unmatched API route handler
app.use('/api', (req, res) => {
  res.status(404).json({ success: false, error: 'Endpoint API tidak ditemukan' });
});

// SPA fallback for HTML navigation
app.use((req, res, next) => {
  if (req.method === 'GET' && req.accepts('html')) {
    return res.sendFile(path.join(__dirname, 'public', 'index.html'));
  }
  next();
});

// Global process error handlers
process.on('uncaughtException', (err) => {
  console.error('[Server Error] Uncaught Exception:', err.message);
});

process.on('unhandledRejection', (reason) => {
  console.error('[Server Error] Unhandled Rejection:', reason);
});

app.listen(PORT, () => {
  const settings = db.getSettings();
  const officeName = settings.officeName || 'Kantor Kecamatan Cilacap Utara';
  console.log(`[Server] ${officeName} - Sistem Pengingat Presensi aktif di port ${PORT}`);
  console.log(`[Server] URL: http://localhost:${PORT}`);

  baileysService.init();
  scheduler.initScheduler();

  if (process.env.NO_AUTO_OPEN !== 'true' && process.platform === 'win32') {
    try {
      const { exec } = require('child_process');
      setTimeout(() => {
        exec(`start http://localhost:${PORT}`);
      }, 1000);
    } catch (_) {}
  }
});
