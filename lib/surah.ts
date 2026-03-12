import { SurahData } from "./types";

export async function getSurahData(surahId: number): Promise<SurahData | null> {
  try {
    const data = await import(`@/data/surah/${surahId}.json`);
    return data.default as SurahData;
  } catch {
    return null;
  }
}

export const SURAH_IDS = Array.from({ length: 114 }, (_, i) => i + 1);
