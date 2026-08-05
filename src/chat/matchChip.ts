import type { WelcomeChip } from "./types";

const STOP_WORDS = new Set([
  "a",
  "an",
  "the",
  "my",
  "me",
  "for",
  "to",
  "of",
  "i",
  "want",
  "show",
  "please",
  "with",
  "in",
  "new",
]);

const tokenize = (value: string): string[] =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 0 && !STOP_WORDS.has(word));

/**
 * Finds the welcome chip a typed message is asking for, so free text like
 * "add store" behaves like tapping "Add a new store". Returns null when nothing
 * matches confidently (>= 2 overlapping meaningful words).
 */
export function matchWelcomeChip(
  text: string,
  chips: WelcomeChip[],
): WelcomeChip | null {
  const typed = tokenize(text);
  if (typed.length === 0) return null;

  let best: WelcomeChip | null = null;
  let bestScore = 0;

  for (const chip of chips) {
    const chipTokens = new Set(tokenize(chip.label));
    const score = typed.filter((word) => chipTokens.has(word)).length;
    if (score > bestScore) {
      bestScore = score;
      best = chip;
    }
  }

  return bestScore >= 2 ? best : null;
}
