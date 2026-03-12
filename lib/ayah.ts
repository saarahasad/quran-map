import type { Ayah, WordHighlight } from "./types";

/**
 * Returns the list of important words (Arabic ↔ translation) for an ayah.
 * Merges wordHighlights and legacy keywords so one source is used everywhere.
 */
export function getWordHighlights(ayah: Ayah): WordHighlight[] {
  if (ayah.wordHighlights && ayah.wordHighlights.length > 0) {
    return ayah.wordHighlights;
  }
  if (ayah.keywords && ayah.keywords.length > 0) {
    return ayah.keywords.map((k) => ({ arabic: k.word, translation: k.meaning }));
  }
  return [];
}
