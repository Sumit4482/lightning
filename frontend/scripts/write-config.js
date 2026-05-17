const fs = require('node:fs');
const path = require('node:path');

const apiUrl = (process.env.API_URL || '').replace(/\/$/, '');
const configPath = path.join(__dirname, '../public/config.json');

fs.writeFileSync(configPath, JSON.stringify({ apiUrl }, null, 2) + '\n');
console.log(`Wrote config.json with apiUrl: "${apiUrl || '(same origin / proxy)"}"`);
