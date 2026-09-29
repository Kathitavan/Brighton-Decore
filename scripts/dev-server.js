// scripts/dev-server.js
// Local Node.js development server for testing /api/lead on port 3000
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import handler from '../api/lead.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Load .env.local if present
const envLocalPath = path.join(rootDir, '.env.local');
if (fs.existsSync(envLocalPath)) {
  const envContent = fs.readFileSync(envLocalPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const idx = trimmed.indexOf('=');
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim();
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

const PORT = 3000;

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

  // Enhance res with Express/Vercel-like helper methods
  res.status = function (statusCode) {
    this.statusCode = statusCode;
    return this;
  };
  res.json = function (data) {
    this.setHeader('Content-Type', 'application/json');
    this.end(JSON.stringify(data));
    return this;
  };

  if (url.pathname === '/api/lead') {
    // Read body buffer
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', async () => {
      try {
        const rawBody = Buffer.concat(chunks).toString('utf8');
        req.body = rawBody ? JSON.parse(rawBody) : {};
      } catch {
        req.body = {};
      }

      try {
        await handler(req, res);
      } catch (err) {
        console.error('Server error handling /api/lead:', err);
        if (!res.headersSent) {
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
    });
    return;
  }

  res.status(404).json({ error: 'Not Found' });
});

server.listen(PORT, () => {
  console.log(`Local Lead API Server running at http://localhost:${PORT}/api/lead`);
});
