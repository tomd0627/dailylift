/**
 * DailyLift — Main entry point.
 * Orchestrates module initialization in the correct order.
 */

import '../styles/main.css';
import { initAffirmationDisplay, loadAffirmation } from './affirmation-display.js';
import { initDailyAffirmation } from './daily-affirmation.js';
import { initMoodSelector } from './mood-selector.js';

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
