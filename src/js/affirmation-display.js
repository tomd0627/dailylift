import { getRandomAffirmation } from '../data/affirmations.js';
import { announce } from './main.js';

/** @type {string} The affirmation text currently displayed. */
let currentText = '';
/** @type {string | null} */
let currentMood = null;

const MOOD_LABELS = {
  angry:       'Angry',
  sad:         'Sad',
  frustrated:  'Frustrated',
  happy:       'Happy',
  anxious:     'Anxious',
  lonely:      'Lonely',
  overwhelmed: 'Overwhelmed',
  tired:       'Tired',
  hopeful:     'Hopeful',
  grateful:    'Grateful',
};

export function initAffirmationDisplay() {
  document.getElementById('refresh-affirmation')?.addEventListener('click', () => {
    if (currentMood) loadAffirmation(currentMood);
  });
}

/**
 * Loads and displays a random affirmation for the given mood.
 * Avoids repeating the currently displayed text.
 *
 * @param {string} mood
 */
export function loadAffirmation(mood) {
  currentMood = mood;

  showCard(mood);

  const text = getRandomAffirmation(mood, currentText);
  if (!text) return;

  setAffirmationText(text);

  document.getElementById('affirmation')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/** @returns {string | null} */
export function getCurrentMood() {
  return currentMood;
}

// ── Private helpers ──────────────────────────────────────────────

function showCard(mood) {
  const wrapper = document.getElementById('affirmation-card-wrapper');
  const emptyState = document.getElementById('affirmation-empty-state');
  const moodText = document.getElementById('affirmation-mood-text');
  const moodLabel = document.getElementById('affirmation-mood-label');
  const card = document.getElementById('affirmation-card');

  if (wrapper) {
    wrapper.classList.add('is-ready');
    requestAnimationFrame(() => {
      wrapper.classList.add('is-visible');
      wrapper.removeAttribute('aria-hidden');
    });
  }
  if (emptyState) {
    emptyState.classList.remove('is-visible');
    emptyState.setAttribute('aria-hidden', 'true');
  }
  if (moodText) {
    moodText.textContent = MOOD_LABELS[mood] ?? mood;
  }
  if (moodLabel) {
    moodLabel.removeAttribute('aria-hidden');
  }
  if (card) {
    card.style.setProperty('--mood-color', `var(--mood-${mood})`);
  }
}

function setAffirmationText(text) {
  const textEl = document.getElementById('affirmation-text');
  if (textEl) textEl.textContent = text;
  currentText = text;
  announce(text);
}
