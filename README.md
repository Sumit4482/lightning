# Personal Portfolio

Angular 18 frontend + Express API backend.

## Project structure

```
lightning/
├── frontend/          # Angular app (Netlify)
├── backend/           # Express API (Render)
├── netlify.toml
└── render.yaml
```

## Development

```bash
# Backend
cd backend && npm install && npm run dev

# Frontend (separate terminal)
cd frontend && npm install && npm start
```

With both running, the frontend proxies `/api` to `http://localhost:3000`.

## Portfolio data

Edit `backend/data/portfolio.json`, then redeploy the backend on Render.

## Daily progress log

- Public data: `backend/data/daily-logs.json`
- Publish page (secret, not linked): `http://localhost:4200/publish`
- Set `ADMIN_SECRET` in `backend/.env` (local) and on Render (production)
- After publishing locally: `git add backend/data/daily-logs.json && git push` to deploy

LeetCode: one problem per line. Optional `Title | Easy` suffix for difficulty.

## Deployment

- **Frontend (Netlify):** `base = frontend`, set `API_URL` to your Render URL
- **Backend (Render):** uses `render.yaml`, set `CORS_ORIGIN` to your Netlify URL
