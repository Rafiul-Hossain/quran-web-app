# Quran Web Frontend (Next.js + SSG)

Next.js 14 App Router frontend for the Quran Web Application. Fetches data from the Express backend at build time to statically generate all 114 surah pages.

## Features

- Surah list (home) — all 114 surahs with Arabic + English names
- Ayat page (`/surah/[id]`) — Arabic text + English (Sahih International) translation
- Search (`/search`) — live, calls backend search API
- Settings sidebar — Arabic font (Amiri / Scheherazade New / Noto Naskh), Arabic font size, Translation font size, all persisted via `localStorage`
- Fully responsive (Tailwind CSS)
- All 114 surah pages statically generated at build time (SSG)

## Setup

**Start the backend first** on `http://localhost:3001` (see `backend/README.md`), then:

```bash
npm install
cp .env.example .env.local   # Already has the default localhost URL
npm run dev                  # Starts on http://localhost:3000
```

## Production build

```bash
npm run build                # Pre-renders all 114 surah pages via backend
npm start
```

During `next build`, the frontend will call the backend for:
- `GET /api/v1/quran/surahs` (once, for the list + generateStaticParams)
- `GET /api/v1/quran/surahs/:id` (114 times, one per surah page)

Search is **client-side** — calls the live backend from the browser at runtime.

## Environment variables

| Key                   | Description                          | Example                              |
| --------------------- | ------------------------------------ | ------------------------------------ |
| `NEXT_PUBLIC_API_URL` | Backend base URL (no trailing slash) | `https://quran-api.onrender.com`     |

## Deploy to Vercel

1. Deploy the backend first (Render/Railway), copy its public URL.
2. In your Vercel project → Settings → Environment Variables, add:
   - `NEXT_PUBLIC_API_URL` = your backend URL
3. Deploy. Build will pre-render all pages statically by calling the backend.
4. Test the live URL in incognito mode before submitting.
