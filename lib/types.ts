/** Pair for highlighting: Arabic word/phrase ↔ its translation. Use for all important words that help understand the ayah (no fixed limit). */
export interface WordHighlight {
  arabic: string;
  translation: string;
}

/** @deprecated Use wordHighlights instead. Kept for backward compat with surahs 7, 8, 9. */
export interface Keyword {
  word: string;
  meaning: string;
}

export interface Ayah {
  ayahNumber: number;
  arabic: string;
  translation: string;
  summary: string;
  theme: string;
  /** Important words/phrases: Arabic ↔ translation. Use getWordHighlights(ayah) so legacy keywords are supported. */
  wordHighlights?: WordHighlight[];
  /** @deprecated Use wordHighlights. Kept for backward compat. */
  keywords?: Keyword[];
  /** Optional: cluster/section name (e.g. "Spoils & Unity") */
  cluster?: string;
  /** Optional: theme intensity 1–4 */
  intensity?: number;
  /** Tafsir Ibn Kathir–style wholesome summary of the ayah */
  tafsirSummary?: string;
  /** Lesson or reflection drawn from the ayah (Tafsir Ibn Kathir–informed) */
  lessonReflection?: string;
  /** "Before this ayah…" — narrative/thematic flow leading to this verse (tafsir-informed) */
  beforeThisAyah?: string;
  /** "After this ayah…" — where the passage goes next (tafsir-informed) */
  afterThisAyah?: string;
}

export interface SurahData {
  surahId: number;
  surahNameArabic: string;
  surahNameEnglish: string;
  thesis: string;
  /** Bullet summary (5–6 items). Use `gist` or `primaryThemes` */
  gist?: string[];
  /** Alternative to gist (e.g. surah 9) */
  primaryThemes?: string[];
  ayahs: Ayah[];
  /** Optional: Makki/Madani */
  revelationType?: string;
  /** Optional: total ayah count */
  totalAyahs?: number;
  /** Optional: per-surah theme → color name (e.g. "faith" → "emerald") */
  colorMapping?: Record<string, string>;
}
