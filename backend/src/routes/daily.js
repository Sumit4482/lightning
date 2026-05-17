import { Router } from 'express';
import {
  buildCalendar,
  getDefaultRange,
  loadDailyLogs,
} from '../services/dailyStore.js';

const router = Router();

router.get('/daily/today', async (_req, res) => {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const data = await loadDailyLogs();
    const entry = data.entries.find((e) => e.date === today) ?? null;
    res.json({ date: today, entry });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to load daily log' });
  }
});

router.get('/daily/history', async (req, res) => {
  try {
    const defaults = getDefaultRange();
    const from = req.query.from || defaults.from;
    const to = req.query.to || defaults.to;
    const data = await loadDailyLogs();
    const entries = data.entries.filter((e) => e.date >= from && e.date <= to);
    const calendar = buildCalendar(data.entries, from, to);
    const missedDates = calendar
      .filter((d) => d.status === 'missed')
      .map((d) => d.date);

    res.json({ from, to, entries, calendar, missedDates });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to load history' });
  }
});

router.get('/daily/:date', async (req, res) => {
  try {
    const { date } = req.params;
    const data = await loadDailyLogs();
    const entry = data.entries.find((e) => e.date === date) ?? null;
    if (!entry) {
      res.status(404).json({ error: 'No entry for this date' });
      return;
    }
    res.json({ date, entry });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to load daily log' });
  }
});

export default router;
