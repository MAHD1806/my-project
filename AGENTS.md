# Horizon Properties

- Vite + React + react-router app, run from source via `docker compose -f docker-compose.base44.yml up -d` (port 3000).
- No backend or secrets. Property/site content lives in `src/data/`; images are Unsplash photo ids (`img()` helper in `src/data/properties.js`).
- Favorites, inquiries and newsletter signups are stored in localStorage (`horizon_*` keys); swap `save()` in `src/components/InquiryForm.jsx` and `src/data/properties.js` for an API when a database is added.
- `node_modules` lives in a named Docker volume; dependencies install on container start.
- Hero is a scroll-scrubbed video (`src/sections/Hero.jsx`, `src/hooks/useScrollScrub.js`). Files in `public/video/` are encoded all-intra (`-g 1`, no audio) for fast seeking; the ffmpeg commands are in the hook's header comment. Re-encode any replacement video the same way. Scroll distance = `.hero--scrub { height: 300vh }` in `styles.css`.
