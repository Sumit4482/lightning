const fs = require('node:fs');
const path = require('node:path');

const apiUrl = (process.env.API_URL || '').replace(/\/$/, '');
const publicDir = path.join(__dirname, '../public');
const configPath = path.join(publicDir, 'config.json');
const redirectsPath = path.join(publicDir, '_redirects');

if (process.env.NETLIFY === 'true' && !apiUrl) {
  console.error(
    'API_URL is not set. In Netlify: Site settings → Environment variables → add API_URL = your Render URL (e.g. https://lightning-api.onrender.com), then redeploy.'
  );
  process.exit(1);
}

// Netlify: proxy /api to Render (same-origin — no CORS). Rules must be before SPA fallback.
if (process.env.NETLIFY === 'true' && apiUrl) {
  fs.writeFileSync(
    redirectsPath,
    [`/api/*\t${apiUrl}/api/:splat\t200`, `/*\t/index.html\t200`].join('\n') + '\n',
    'utf8'
  );
  fs.writeFileSync(configPath, JSON.stringify({ apiUrl: '' }, null, 2) + '\n');
  console.log(`Netlify: proxy /api/* → ${apiUrl}/api/* (config.json apiUrl empty)`);
} else {
  try {
    fs.unlinkSync(redirectsPath);
  } catch {
    /* no generated redirects locally */
  }
  fs.writeFileSync(configPath, JSON.stringify({ apiUrl }, null, 2) + '\n');
  console.log(`Wrote config.json with apiUrl: "${apiUrl || '(same origin / proxy)'}"`);
}
