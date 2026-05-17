import { Router } from 'express';
import { requireAdmin } from '../middleware/adminAuth.js';
import {
  loadDailyLogs,
  normalizeEntry,
  saveDailyLogs,
  upsertEntry,
} from '../services/dailyStore.js';

const router = Router();

router.post('/admin/daily', requireAdmin, async (req, res) => {
  try {
    const entry = normalizeEntry(req.body);
    const data = await loadDailyLogs();
    const updated = upsertEntry(data, entry);
    await saveDailyLogs(updated);

    res.json({
      success: true,
      entry,
      message:
        'Saved to backend/data/daily-logs.json. Commit and push to deploy for production.',
    });
  } catch (error) {
    const status = error.message?.includes('Invalid date') ? 400 : 500;
    res.status(status).json({ error: error.message || 'Failed to save daily log' });
  }
});

router.delete('/admin/daily/:date', requireAdmin, async (req, res) => {
  try {
    const { date } = req.params;
    const data = await loadDailyLogs();
    const next = {
      ...data,
      entries: data.entries.filter((e) => e.date !== date),
    };
    await saveDailyLogs(next);
    res.json({ success: true, message: 'Entry deleted.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete entry' });
  }
});

export default router;
