"use client";

import { Ayah } from "@/lib/types";
import { getWordHighlights } from "@/lib/ayah";
import { getThemeBorderHex, getThemeLabel } from "@/lib/theme-colors";
import { getHighlightSegments } from "@/lib/highlight-text";

interface TimelineAyahCardProps {
  ayah: Ayah;
  colorMapping?: Record<string, string> | null;
}

export default function TimelineAyahCard({ ayah, colorMapping }: TimelineAyahCardProps) {
  const themeLabel = getThemeLabel(ayah.theme);
  const headerBgHex = getThemeBorderHex(ayah.theme, colorMapping);
  const highlights = getWordHighlights(ayah);

  const arabicPhrases = highlights.map((h) => h.arabic);
  const translationPhrases = highlights.map((h) => h.translation);
  const arabicSegments = getHighlightSegments(ayah.arabic, arabicPhrases, { caseSensitive: true });
  const translationSegments = getHighlightSegments(ayah.translation, translationPhrases, {
    caseSensitive: false,
  });

  return (
    <article
      className="w-full overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-slate-200"
      aria-label={`Ayah ${ayah.ayahNumber}: ${themeLabel}`}
    >
      {/* Colored header – inline hex so theme color always shows */}
      <div
        className="rounded-t-2xl px-6 py-4 text-white md:px-8 md:py-5"
        style={{ backgroundColor: headerBgHex }}
      >
        <p className="text-sm font-medium opacity-95 md:text-base">
          Ayah {ayah.ayahNumber} · {themeLabel}
          {ayah.cluster != null && ayah.cluster !== "" && (
            <span className="ml-1 opacity-85"> · {ayah.cluster}</span>
          )}
        </p>
      </div>

      {/* Body: white background, same structure as modal */}
      <div className="space-y-5 px-6 py-5 md:px-8 md:py-6">
        {/* 1. Full Arabic with highlighted words (unified line-height and highlight height, light grey) */}
        <section>
          <p className="font-arabic text-2xl leading-[2.25] text-slate-800 md:text-3xl" dir="rtl">
            {arabicSegments.map((seg, i) =>
              seg.highlight ? (
                <mark
                  key={i}
                  className="inline-flex min-h-[1.75em] items-center rounded px-0.5 font-medium text-slate-800 align-middle bg-slate-200/70"
                >
                  {seg.text}
                </mark>
              ) : (
                <span key={i}>{seg.text}</span>
              )
            )}
          </p>
        </section>

        {/* 2. Full translation (same line-height and highlight height as Arabic, light grey) */}
        <section>
          <p className="text-slate-600 text-[1.0625rem] leading-[2.25] md:text-lg">
            {translationSegments.map((seg, i) =>
              seg.highlight ? (
                <mark
                  key={i}
                  className="inline-flex min-h-[1.75em] items-center rounded px-0.5 font-medium text-slate-800 align-middle bg-slate-200/70"
                >
                  {seg.text}
                </mark>
              ) : (
                <span key={i}>{seg.text}</span>
              )
            )}
          </p>
        </section>

        {/* 3. Tafsir summary */}
        {(ayah.tafsirSummary || ayah.summary) && (
          <section>
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Summary (Tafsir Ibn Kathir)
            </h4>
            <p className="rounded-lg bg-slate-50/90 p-4 text-sm leading-relaxed text-slate-700 md:text-base">
              {ayah.tafsirSummary ?? ayah.summary}
            </p>
          </section>
        )}

        {/* 4. Lesson / reflection */}
        {ayah.lessonReflection && (
          <section>
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Lesson / reflection
            </h4>
            <p className="rounded-lg border-l-4 border-emerald-500/60 bg-emerald-50/50 p-4 text-sm leading-relaxed text-slate-700 md:text-base">
              {ayah.lessonReflection}
            </p>
          </section>
        )}

        {/* 5. Before this ayah… / After this ayah… */}
        {(ayah.beforeThisAyah || ayah.afterThisAyah) && (
          <section className="rounded-lg border border-slate-200 bg-slate-50/50 p-4 md:p-5">
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Flow
            </h4>
            <div className="space-y-4 text-sm text-slate-600 md:text-base">
              {ayah.beforeThisAyah && (
                <p>
                  <span className="font-semibold text-slate-700">Before this ayah…</span>{" "}
                  {ayah.beforeThisAyah}
                </p>
              )}
              {ayah.afterThisAyah && (
                <p>
                  <span className="font-semibold text-slate-700">After this ayah…</span>{" "}
                  {ayah.afterThisAyah}
                </p>
              )}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
