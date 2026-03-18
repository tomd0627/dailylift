/**
 * API module — currently a thin wrapper around the affirmations.dev public API.
 * Kept as a separate module so additional sources can be added here without
 * touching business logic in other files.
 */

const AFFIRMATIONS_DEV = 'https://www.affirmations.dev/';

/**
 * Fetches a single general affirmation from affirmations.dev.
 * Used as a supplemental source for the daily banner.
 *
 * @returns {Promise<string>}
 */
export async function fetchWebAffirmation() {
  const res = await fetch(AFFIRMATIONS_DEV);
  if (!res.ok) throw new Error(`affirmations.dev returned ${res.status}`);
  const data = await res.json();
  const text = data?.affirmation?.trim();
  if (!text) throw new Error('Empty response from affirmations.dev');
  return text;
}
