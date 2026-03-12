"use client";

import { SurahData } from "@/lib/types";
import { SURAH_METADATA } from "@/lib/surah-metadata";

interface SurahHeaderProps {
  surah: SurahData;
}

export default function SurahHeader({ surah }: SurahHeaderProps) {
  const bullets = surah.gist ?? surah.primaryThemes ?? [];
  const meta = SURAH_METADATA[surah.surahId];
  const ayahCount = surah.totalAyahs ?? surah.ayahs.length ?? meta?.ayahs;
  const juz = meta?.juz;

  const metaItems: string[] = [];
  if (surah.revelationType) metaItems.push(surah.revelationType);
  if (ayahCount != null) metaItems.push(`${ayahCount} ayahs`);
  if (juz) metaItems.push(`Juz ${juz}`);

  return (
    <header className="mb-8 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-lg shadow-slate-200/40 ring-1 ring-slate-900/5 md:mb-10">
      <div className="border-b border-slate-100 bg-gradient-to-b from-slate-50/60 to-white px-6 py-8 text-center md:px-10 md:py-10">
        <h1 className="font-arabic text-4xl font-bold tracking-tight text-slate-800 md:text-5xl">
          {surah.surahNameArabic}
        </h1>
        <p className="mt-2 text-xl font-semibold text-slate-700 md:text-2xl">
          Surah {surah.surahId} · {surah.surahNameEnglish}
        </p>
        {metaItems.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {metaItems.map((item) => (
              <span
                key={item}
                className="rounded-lg border border-slate-200/80 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm"
              >
                {item}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="px-6 py-6 md:px-10 md:py-7">
        <p className="mx-auto max-w-2xl text-center text-slate-600 leading-relaxed">
          {surah.thesis}
        </p>
        {bullets.length > 0 && (
          <ul className="mx-auto mt-5 flex max-w-2xl flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-500">
            {bullets.map((item, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/80" />
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
}
