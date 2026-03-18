# DailyLift

A mood-based affirmation web app. Choose how you're feeling and receive a warm, personalized affirmation — refreshable as many times as you need.

## Features

- **Daily affirmation banner** — displays a deterministic affirmation from the local curated set, rotated daily
- **Mood selector** — 10 moods, each backed by 22 curated affirmations (220 total)
- **Refresh** — get a new affirmation for the same mood; never repeats the last shown
- **Fully static** — no backend, no database, no environment variables required

## Tech

- [Vite](https://vitejs.dev/) — build tooling
- Vanilla JS (ES modules, no framework)
- CSS custom properties throughout; no CSS-in-JS, no utility framework
- [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) + [Nunito](https://fonts.google.com/specimen/Nunito) — self-hosted via [Fontsource](https://fontsource.org/)
- Phosphor Icons inlined as SVGs (no external dependency)
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
