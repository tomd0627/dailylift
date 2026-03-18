import { getDailyAffirmation } from '../data/affirmations.js';

const API_URL = 'https://www.affirmations.dev/';

/**
 * Populates the daily affirmation banner.
 *
 * Strategy:
 *  1. Show the local deterministic fallback immediately (no flash of empty content).
 *  2. Fetch a fresh affirmation from affirmations.dev in the background.
 *  3. If the fetch succeeds, swap in the live affirmation with a fade transition.
 *  4. If the fetch fails (offline, rate-limited, etc.), the local fallback stays.
 */
export async function initDailyAffirmation() {
  const el = document.getElementById('daily-affirmation-text');
  if (!el) return;

  // Step 1 — local fallback visible immediately
  const localText = getDailyAffirmation();
  el.textContent = localText;

  // Step 2 — background fetch
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(API_URL, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    const liveText = data?.affirmation?.trim();

    if (!liveText || liveText === localText) return;

    // Step 3 — fade swap
    el.style.transition = 'opacity 0.4s ease';
    el.style.opacity = '0';

    await new Promise((resolve) => setTimeout(resolve, 400));

    el.textContent = liveText;
    el.style.opacity = '1';
  } catch {
    // Step 4 — silently keep the local fallback; no console noise in production
  }
}
