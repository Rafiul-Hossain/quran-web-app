# Quran API (Express)

Express-based REST API serving Quran data. Migrated from Hono to the Express boilerplate pattern (controller / service / routes).

## Stack

- **Runtime:** Node.js 18.17+
- **Framework:** Express 4
- **Security:** helmet, cors, xss-clean, express-mongo-sanitize, express-rate-limit
- **Logging:** winston + morgan
- **Data source:** [alquran.cloud](https://alquran.cloud) (fetched once into `data/quran.json`)

## Setup

```bash
npm install
cp .env.example .env
npm run fetch-data    # Downloads Quran into data/quran.json (~6 MB)
npm run dev           # Starts API on http://localhost:3001
```

## API Endpoints

| Method | Path                         | Description                              |
| ------ | ---------------------------- | ---------------------------------------- |
| GET    | `/`                          | API info                                 |
| GET    | `/api/v1/quran/surahs`       | List all 114 surahs (metadata only)      |
| GET    | `/api/v1/quran/surahs/:id`   | Get a single surah with all its ayahs    |
| GET    | `/api/v1/quran/search?q=...` | Search ayahs by translation (min 2 chars)|

All responses follow the boilerplate format:

```json
{ "status": true, "message": "...", "data": ... }
```

## Project Structure

```
backend/
├── index.js                          # entry point
├── scripts/fetch-quran.js            # one-time data fetch
├── data/quran.json                   # generated, git-ignored
└── src/
    ├── app.js                        # express app setup
    ├── core/
    │   ├── app/appRouter.js          # mounts /api/v1/quran
    │   ├── config/                   # config + winston logger
    │   └── middlewares/              # error + 404 handlers
    ├── lib/                          # rate limit + response helper
    └── entities/quran/
        ├── quran.routes.js
        ├── quran.controller.js
        └── quran.service.js
```

## Deployment

- **Render / Railway / Fly.io:**
  - Build: `npm install && npm run fetch-data`
  - Start: `npm start`
  - Set `PORT` env var (platform usually auto-assigns)
