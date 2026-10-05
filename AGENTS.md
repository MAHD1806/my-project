# Horizon Properties

- Vite + React + react-router app, run from source via `docker compose -f docker-compose.base44.yml up -d` (port 3000).
- No backend or secrets. Property/site content lives in `src/data/`; images are Unsplash photo ids (`img()` helper in `src/data/properties.js`).
- Favorites, inquiries and newsletter signups are stored in localStorage (`horizon_*` keys); swap `save()` in `src/components/InquiryForm.jsx` and `src/data/properties.js` for an API when a database is added.
- `node_modules` lives in a named Docker volume; dependencies install on container start.
