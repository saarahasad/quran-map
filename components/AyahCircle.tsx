"use client";

import { Ayah } from "@/lib/types";
import { getWordHighlights } from "@/lib/ayah";
import { getThemeBorderHex, getThemeBgLightHex, getThemeLabel } from "@/lib/theme-colors";

interface AyahCircleProps {
  ayah: Ayah;
  onHoverStart?: (e?: React.MouseEvent<HTMLDivElement>) => void;
  onHoverEnd?: () => void;
  /** Per-surah theme → color name (from JSON colorMapping) */
  colorMapping?: Record<string, string> | null;
  /** When true, softly fade this card so the hovered one stands out (emotional flow) */
  dimmed?: boolean;
}

export default function AyahCircle({ ayah, onHoverStart, onHoverEnd, colorMapping, dimmed }: AyahCircleProps) {
  const borderColor = getThemeBorderHex(ayah.theme, colorMapping);
  const bgColor = getThemeBgLightHex(ayah.theme, colorMapping);
  const themeLabel = getThemeLabel(ayah.theme);
  const wordHighlights = getWordHighlights(ayah).slice(0, 4);

  return (
    <div
      className={`flex h-full w-full flex-col transition-all duration-300 ease-out ${dimmed ? "opacity-50 scale-[0.98]" : "opacity-100 scale-100"}`}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      {/* Ayah number outside card */}
      <span className="mb-1 block text-center text-base font-bold text-slate-800 md:mb-1.5 md:text-lg">
        {ayah.ayahNumber}
      </span>
      {/* Theme label above card */}
      <span className="mb-1 block text-center text-xs text-slate-500">
        {themeLabel}
      </span>

      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onHoverStart?.();
          }
        }}
        style={{
          backgroundColor: bgColor,
          boxShadow: `0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06), 0 0 0 1px ${borderColor}20`,
        }}
        className="group flex min-h-[6rem] cursor-default flex-1 flex-col rounded-xl p-4 text-left text-slate-900 transition-transform duration-200 hover:scale-[1.02] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 md:min-h-[8rem] md:p-5"
        aria-label={`Ayah ${ayah.ayahNumber}: hover for details`}
      >
        {/* Top half: important words (Arabic ↔ translation) */}
        <div className="flex min-h-0 flex-1 flex-row">
          {wordHighlights.map((pair, i) => (
            <div
              key={i}
              className={`flex min-w-0 flex-1 flex-col gap-2 px-1.5 py-1 md:gap-2.5 md:px-2 md:py-1.5 ${i < wordHighlights.length - 1 ? "border-r border-slate-200" : ""}`}
            >
              <span className="font-arabic text-lg leading-relaxed text-slate-900 md:text-xl" dir="rtl">
                {pair.arabic}
              </span>
              <span className="break-words text-xs leading-normal text-slate-600 md:text-sm">
                {pair.translation}
              </span>
            </div>
          ))}
        </div>

        {/* Horizontal line between top and bottom half */}
        <div className="my-3 h-px shrink-0 bg-slate-200 md:my-4" aria-hidden />

        {/* Bottom half: summary */}
        <div className="flex min-h-0 flex-1 flex-col justify-center overflow-hidden">
          {ayah.summary ? (
            <p className="line-clamp-4 break-words text-sm font-medium leading-relaxed text-slate-700 md:line-clamp-5 md:text-base">
              {ayah.summary}
            </p>
          ) : (
            <span className="text-sm italic text-slate-500 md:text-base">No summary</span>
          )}
        </div>

        <span className="sr-only">Theme: {themeLabel}</span>
      </div>
    </div>
  );
}
