import { getDailyAffirmation } from '../data/affirmations.js';

export function initDailyAffirmation() {
  const el = document.getElementById('daily-affirmation-text');
  if (!el) return;
  el.textContent = getDailyAffirmation();
}
