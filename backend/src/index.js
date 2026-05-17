import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import portfolioRouter from './routes/portfolio.js';
import dailyRouter from './routes/daily.js';
import adminDailyRouter from './routes/admin-daily.js';

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:4200')
  .split(',')
  .map((origin) => origin.trim().replace(/\/$/, ''))
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      const normalized = origin?.replace(/\/$/, '') ?? '';
      if (
        !origin ||
        allowedOrigins.includes('*') ||
        allowedOrigins.includes(normalized)
      ) {
        callback(null, true);
        return;
      }
      callback(null, false);
    },
  })
);

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api', portfolioRouter);
app.use('/api', dailyRouter);
app.use('/api', adminDailyRouter);

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(port, () => {
  console.log(`Portfolio API listening on port ${port}`);
});
