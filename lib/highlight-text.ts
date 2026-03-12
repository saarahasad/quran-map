/**
 * Splits text into segments: plain strings and phrases to highlight.
 * Used to render Arabic/translation with important words visually matched.
 */

export interface TextSegment {
  text: string;
  highlight?: boolean;
}

/**
 * Find all non-overlapping occurrences of phrases in text (case-insensitive for English).
 * Longer phrases are preferred when one phrase contains another.
 * Returns segments in order: [plain, highlighted, plain, ...].
 */
export function getHighlightSegments(
  text: string,
  phrases: string[],
  options?: { caseSensitive?: boolean }
): TextSegment[] {
  const caseSensitive = options?.caseSensitive ?? false;
  const normalizedText = caseSensitive ? text : text.toLowerCase();
  const uniquePhrases = Array.from(new Set(phrases)).filter(Boolean);

  if (uniquePhrases.length === 0) return [{ text, highlight: false }];

  // Find all matches: { start, end, phrase }
  type Match = { start: number; end: number; phrase: string };
  const matches: Match[] = [];

  for (const phrase of uniquePhrases) {
    if (!phrase.trim()) continue;
    const search = caseSensitive ? phrase : phrase.toLowerCase();
    let pos = 0;
    while (pos < normalizedText.length) {
      const i = normalizedText.indexOf(search, pos);
      if (i === -1) break;
      matches.push({ start: i, end: i + phrase.length, phrase });
      pos = i + 1;
    }
  }

  // Sort by start, then by length (longer first) to prefer longer matches
  matches.sort((a, b) => a.start - b.start || b.end - b.start - (a.end - a.start));

  // Merge overlapping: keep non-overlapping in order
  const merged: Match[] = [];
  for (const m of matches) {
    if (merged.length === 0 || m.start >= merged[merged.length - 1].end) {
      merged.push(m);
    }
  }

  // Build segments from merged matches
  const segments: TextSegment[] = [];
  let lastEnd = 0;

  for (const m of merged) {
    if (m.start > lastEnd) {
      segments.push({ text: text.slice(lastEnd, m.start), highlight: false });
    }
    segments.push({ text: text.slice(m.start, m.end), highlight: true });
    lastEnd = m.end;
  }

  if (lastEnd < text.length) {
    segments.push({ text: text.slice(lastEnd), highlight: false });
  }

  return segments.length > 0 ? segments : [{ text, highlight: false }];
}
