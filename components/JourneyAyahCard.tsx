"use client";

import { Ayah } from "@/lib/types";
import { getWordHighlights } from "@/lib/ayah";
import { getThemeBorderHex, getThemeLabel } from "@/lib/theme-colors";
import { getHighlightSegments } from "@/lib/highlight-text";

interface JourneyAyahCardProps {
  ayah: Ayah;
  colorMapping?: Record<string, string> | null;
  /** Offset direction for winding path: "left" | "right" */
  pathSide?: "left" | "right";
}

export default function JourneyAyahCard({
  ayah,
  colorMapping,
  pathSide = "right",
}: JourneyAyahCardProps) {
  const themeHex = getThemeBorderHex(ayah.theme, colorMapping);
  const themeLabel = getThemeLabel(ayah.theme);
  const highlights = getWordHighlights(ayah);
  const translationPhrases = highlights.map((h) => h.translation);
  const translationSegments = getHighlightSegments(ayah.translation, translationPhrases, {
    caseSensitive: false,
  });

  return (
    <article
      className="relative flex items-start gap-4"
      aria-label={`Ayah ${ayah.ayahNumber}: ${themeLabel}`}
      data-journey-ayah={ayah.ayahNumber}
    >
      {/* Solid filled circle – card-like shadow like journey cards */}
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white shadow-lg ring-1 ring-black/5"
        style={{
          backgroundColor: themeHex,
          boxShadow: "0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -4px rgba(0,0,0,0.05)",
        }}
      >
        {ayah.ayahNumber}
      </div>

      {/* Card: translation + theme tag (matches map circle polish) */}
      <div
        className={`min-w-0 flex-1 rounded-xl border border-slate-200/90 bg-white px-4 py-3 shadow-lg ring-1 ring-black/5 ${
          pathSide === "left" ? "ml-0" : "mr-0"
        }`}
      >
        <p className="text-sm leading-relaxed text-slate-700 md:text-base">
          {translationSegments.map((seg, i) =>
            seg.highlight ? (
              <strong key={i} className="font-semibold text-slate-800">
                {seg.text}
              </strong>
            ) : (
              <span key={i}>{seg.text}</span>
            )
          )}
        </p>
        <div
          className="mt-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide"
          style={{ color: themeHex }}
        >
          <span
            className="h-2.5 w-2.5 shrink-0 rounded-full"
            style={{ backgroundColor: themeHex }}
            aria-hidden
          />
          {themeLabel}
        </div>
      </div>
    </article>
  );
}
