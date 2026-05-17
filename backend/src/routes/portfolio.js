import { Router } from 'express';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const router = Router();
const __dirname = dirname(fileURLToPath(import.meta.url));
const portfolioPath = join(__dirname, '../../data/portfolio.json');

let cachedPortfolio = null;

async function loadPortfolio() {
  if (!cachedPortfolio) {
    const raw = await readFile(portfolioPath, 'utf-8');
    cachedPortfolio = JSON.parse(raw);
  }
  return cachedPortfolio;
}

router.get('/portfolio', async (_req, res) => {
  try {
    const portfolio = await loadPortfolio();
    res.json(portfolio);
  } catch (error) {
    console.error('Failed to load portfolio:', error);
    res.status(500).json({ error: 'Failed to load portfolio data' });
  }
});

export default router;
