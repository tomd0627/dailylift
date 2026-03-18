/**
 * Mood selector — renders the mood button grid and handles selection.
 * Implements roving tabindex for keyboard navigation (arrow keys).
 */

const MOODS = [
  { key: 'angry',       icon: 'ph-smiley-angry',   label: 'Angry' },
  { key: 'sad',         icon: 'ph-smiley-sad',      label: 'Sad' },
  { key: 'frustrated',  icon: 'ph-smiley-meh',      label: 'Frustrated' },
  { key: 'anxious',     icon: 'ph-smiley-nervous',  label: 'Anxious' },
  { key: 'happy',       icon: 'ph-smiley',          label: 'Happy' },
  { key: 'lonely',      icon: 'ph-heart-break',     label: 'Lonely' },
  { key: 'overwhelmed', icon: 'ph-smiley-x-eyes',   label: 'Overwhelmed' },
  { key: 'tired',       icon: 'ph-moon',            label: 'Tired' },
  { key: 'hopeful',     icon: 'ph-star',            label: 'Hopeful' },
  { key: 'grateful',    icon: 'ph-hands-praying',   label: 'Grateful' },
];

/** @type {((mood: string) => void) | null} */
let onSelectCallback = null;

/** @type {string | null} */
let selectedMood = null;

/**
 * Renders mood buttons and sets up keyboard + click interaction.
 * @param {(mood: string) => void} onSelect - Called when a mood is chosen.
 */
export function initMoodSelector(onSelect) {
  onSelectCallback = onSelect;

  const container = document.getElementById('mood-selector');
  if (!container) return;

  container.innerHTML = '';

  MOODS.forEach(({ key, icon, label }, index) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'mood-btn';
    btn.dataset.mood = key;
    btn.setAttribute('aria-pressed', 'false');
    btn.style.setProperty('--mood-color', `var(--mood-${key})`);

    // Roving tabindex: only first button is reachable by Tab initially
    btn.tabIndex = index === 0 ? 0 : -1;

    btn.innerHTML = `
      <span class="mood-btn__emoji" aria-hidden="true"><i class="ph-bold ${icon}"></i></span>
      <span class="mood-btn__label">${label}</span>
    `;

    btn.addEventListener('click', () => handleMoodSelect(key));
    container.appendChild(btn);
  });

  // Arrow key navigation
  container.addEventListener('keydown', handleKeydown);
}

/**
 * @param {string} mood
 */
function handleMoodSelect(mood) {
  selectedMood = mood;

  // Update aria-pressed + tabindex on all buttons
  const buttons = getAllButtons();
  buttons.forEach((btn) => {
    const isSelected = btn.dataset.mood === mood;
    btn.setAttribute('aria-pressed', String(isSelected));
    btn.tabIndex = isSelected ? 0 : -1;
  });

  onSelectCallback?.(mood);
}

/**
 * Roving tabindex — arrow key navigation within the grid.
 * @param {KeyboardEvent} e
 */
function handleKeydown(e) {
  const buttons = getAllButtons();
  const currentIndex = buttons.findIndex((b) => b === document.activeElement);
  if (currentIndex === -1) return;

  const COLS = getColumnCount();
  let nextIndex = -1;

  switch (e.key) {
    case 'ArrowRight':
      nextIndex = (currentIndex + 1) % buttons.length;
      break;
    case 'ArrowLeft':
      nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
      break;
    case 'ArrowDown':
      nextIndex = Math.min(currentIndex + COLS, buttons.length - 1);
      break;
    case 'ArrowUp':
      nextIndex = Math.max(currentIndex - COLS, 0);
      break;
    case 'Enter':
    case ' ':
      buttons[currentIndex]?.click();
      e.preventDefault();
      return;
    default:
      return;
  }

  e.preventDefault();
  if (nextIndex !== -1 && nextIndex !== currentIndex) {
    buttons[currentIndex].tabIndex = -1;
    buttons[nextIndex].tabIndex = 0;
    buttons[nextIndex].focus();
  }
}

/** @returns {HTMLButtonElement[]} */
function getAllButtons() {
  return Array.from(document.querySelectorAll('#mood-selector .mood-btn'));
}

/**
 * Estimates column count from the computed grid layout.
 * Falls back to 5 (the default).
 */
function getColumnCount() {
  const container = document.getElementById('mood-selector');
  if (!container) return 5;
  const style = getComputedStyle(container);
  const cols = style.gridTemplateColumns.split(' ').length;
  return cols || 5;
}

/** @returns {string | null} The currently selected mood key. */
export function getSelectedMood() {
  return selectedMood;
}
