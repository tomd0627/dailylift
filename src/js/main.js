/**
 * DailyLift — Main entry point.
 * Orchestrates module initialization in the correct order.
 */

import '../styles/main.css';
import { initAffirmationDisplay, loadAffirmation } from './affirmation-display.js';
import { initDailyAffirmation } from './daily-affirmation.js';
import { initMoodSelector } from './mood-selector.js';

// Apply preloaded external stylesheets non-blocking via JS so that inline
// onload handlers (blocked by CSP script-src 'self') are not needed.
[
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Nunito:wght@400;500;600&display=swap',
  'https://unpkg.com/@phosphor-icons/web@2.1.1/src/bold/style.css',
].forEach((href) => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
});

// ── Screen reader announcer ──────────────────────────────────────
const announcer = document.getElementById('sr-announcer');

/**
 * Announces a message to screen readers via the live region.
 * @param {string} message
 */
export function announce(message) {
  if (!announcer) return;
  // Clear then re-set to ensure the announcement fires even for repeated text
  announcer.textContent = '';
  requestAnimationFrame(() => {
    announcer.textContent = message;
  });
}

// ── Initialisation ───────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initDailyAffirmation();

  initMoodSelector((selectedMood) => {
    loadAffirmation(selectedMood);
  });

  initAffirmationDisplay();
});
