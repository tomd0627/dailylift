/**
 * Mood selector — wires up the pre-rendered mood button grid and handles selection.
 * Buttons are rendered in HTML to prevent CLS; this module adds interactivity.
 * Implements roving tabindex for keyboard navigation (arrow keys).
 */

/** @type {((mood: string) => void) | null} */
let onSelectCallback = null;

/** @type {string | null} */
let selectedMood = null;

/**
 * Attaches click + keyboard handlers to the pre-rendered mood buttons.
 * @param {(mood: string) => void} onSelect - Called when a mood is chosen.
 */
export function initMoodSelector(onSelect) {
  onSelectCallback = onSelect;

  const container = document.getElementById('mood-selector');
  if (!container) return;

  getAllButtons().forEach((btn) => {
    btn.addEventListener('click', () => handleMoodSelect(btn.dataset.mood));
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
  const currentIndex = buttons.indexOf(/** @type {HTMLButtonElement} */ (document.activeElement));
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
