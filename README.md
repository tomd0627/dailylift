# DailyLift

A mood-based affirmation web app. Choose how you're feeling and receive a warm, personalized affirmation — refreshable as many times as you need.

## Features

- **Daily affirmation banner** — fetches a live affirmation from [affirmations.dev](https://www.affirmations.dev/) on each visit, with an instant local fallback if offline
- **Mood selector** — 10 moods, each backed by 22 curated affirmations (220 total)
- **Refresh** — get a new affirmation for the same mood; never repeats the last shown
- **Fully static** — no backend, no database, no environment variables required

## Tech

- [Vite](https://vitejs.dev/) — build tooling
- Vanilla JS (ES modules, no framework)
- CSS custom properties throughout; no CSS-in-JS, no utility framework
- [Phosphor Icons](https://phosphoricons.com/)
- [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) + [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts
- Deployed on [Netlify](https://netlify.com)

## Local development

```bash
npm install
npm run dev       # → http://localhost:5173
```

## Build

```bash
npm run build     # output → dist/
npm run preview   # preview the production build locally
```

## Deploy

Connect the repo to Netlify. Build settings are configured in `netlify.toml`:

- **Build command:** `npm run build`
- **Publish directory:** `dist`

No environment variables needed.
