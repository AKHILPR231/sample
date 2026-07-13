import type { WelcomeChip } from "@/features/ai/types";

/** Words too common to signal intent. */
const STOP_WORDS = new Set([
  "a",
  "an",
  "the",
  "my",
  "me",
  "for",
  "to",
  "of",
  "out",
  "i",
  "want",
  "show",
  "please",
  "with",
  "in",
]);

const tokenize = (value: string): string[] =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 0 && !STOP_WORDS.has(word));

/**
 * Finds the welcome chip a typed message is asking for, so free text like
 * "plan a family day" starts the same flow as tapping "Plan a Family Day Out".
 *
 * Returns null when nothing matches confidently.
 */
export function matchWelcomeChip(
  text: string,
  chips: WelcomeChip[],
  labelOf: (chip: WelcomeChip) => string,
): WelcomeChip | null {
  const typed = tokenize(text);
  if (typed.length === 0) return null;

  let best: WelcomeChip | null = null;
  let bestScore = 0;

  for (const chip of chips) {
    const chipTokens = new Set(tokenize(labelOf(chip)));
    const score = typed.filter((word) => chipTokens.has(word)).length;

    if (score > bestScore) {
      bestScore = score;
      best = chip;
    }
  }

  // Two overlapping meaningful words is enough to be confident.
  return bestScore >= 2 ? best : null;
}
