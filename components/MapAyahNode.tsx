"use client";

import { Ayah } from "@/lib/types";
import { getWordHighlights } from "@/lib/ayah";
import { getHighlightSegments } from "@/lib/highlight-text";
import { getThemeBorderHex, getThemeLabel, hexToRgba } from "@/lib/theme-colors";
import { useLayoutEffect, useRef, useState } from "react";

const MIN_NODE_SIZE = 11 * 16; /* 11rem in px – base size */
const CLUSTER_SIZE_MIN = 7 * 16; /* 7rem – when sizing by ayah number */
const CLUSTER_SIZE_MAX = 15 * 16; /* 15rem – when sizing by ayah number */
const PADDING_PX = 32; /* extra space so content isn’t tight */
const TEXT_CLASS = "text-[0.8125rem] font-medium leading-snug text-slate-700";

interface MapAyahNodeProps {
  ayah: Ayah;
  colorMapping?: Record<string, string> | null;
  isExpanded?: boolean;
  onClick?: (ayah: Ayah, rect: DOMRect) => void;
  /** When set, circle size scales by ayah number (early = smaller, late = larger). For cluster view. */
  totalAyahs?: number;
  /** Hide the number + theme label to the right (used when embedded in cluster grid). */
  compact?: boolean;
}

export default function MapAyahNode({
  ayah,
  colorMapping,
  isExpanded,
  onClick,
  totalAyahs,
  compact = false,
}: MapAyahNodeProps) {
  const borderColor = getThemeBorderHex(ayah.theme, colorMapping);
  const themeLabel = getThemeLabel(ayah.theme);
  const highlights = getWordHighlights(ayah);
  const translationPhrases = highlights.map((h) => h.translation);
  const summarySegments = getHighlightSegments(ayah.summary?.trim() ?? "", translationPhrases, {
    caseSensitive: false,
  });
  const measureRef = useRef<HTMLParagraphElement>(null);
  const [contentSizePx, setContentSizePx] = useState(MIN_NODE_SIZE);

  useLayoutEffect(() => {
    const el = measureRef.current;
    if (!el || !ayah.summary?.trim()) {
      setContentSizePx(MIN_NODE_SIZE);
      return;
    }
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    const size = Math.max(w, h) + PADDING_PX;
    setContentSizePx(Math.max(MIN_NODE_SIZE, Math.ceil(size)));
  }, [ayah.summary]);

  const sizeByAyah =
    totalAyahs != null && totalAyahs > 0
      ? CLUSTER_SIZE_MIN +
        ((CLUSTER_SIZE_MAX - CLUSTER_SIZE_MIN) * (ayah.ayahNumber - 1)) / Math.max(1, totalAyahs - 1)
      : null;
  const sizePx =
    sizeByAyah != null ? Math.max(contentSizePx, Math.round(sizeByAyah)) : contentSizePx;
  const effectiveMin = totalAyahs != null ? CLUSTER_SIZE_MIN : MIN_NODE_SIZE;

  const glowRgba = hexToRgba(borderColor, 0.08);

  return (
    <div className="flex items-center gap-2">
      {ayah.summary?.trim() ? (
        <p
          ref={measureRef}
          className={"invisible absolute left-[-9999px] w-[11rem] " + TEXT_CLASS}
          aria-hidden
        >
          {ayah.summary.trim()}
        </p>
      ) : null}
      <div
        className="relative shrink-0"
        style={{ width: sizePx, height: sizePx, minWidth: effectiveMin, minHeight: effectiveMin }}
      >
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[280%] w-[280%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(circle, " + glowRgba + ", transparent 70%)" }}
          aria-hidden
        />
        <button
          type="button"
          data-ayah-node
          data-ayah-number={ayah.ayahNumber}
          className={`relative z-10 flex h-full w-full shrink-0 flex-col rounded-full border border-slate-200/90 bg-white text-center ring-1 ring-black/5 transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2 overflow-hidden ${
            isExpanded ? "ring-2 ring-slate-500 ring-offset-2" : ""
          }`}
          style={{
            width: sizePx,
            height: sizePx,
            minWidth: effectiveMin,
            minHeight: effectiveMin,
            boxShadow: isExpanded
              ? `0 20px 25px -5px ${borderColor}35, 0 8px 10px -6px ${borderColor}25, 0 0 0 1px rgba(0,0,0,0.04)`
              : `0 10px 15px -3px ${borderColor}30, 0 4px 6px -4px ${borderColor}20, 0 0 0 1px rgba(0,0,0,0.03)`,
          }}
          onClick={(e) => {
            const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
            onClick?.(ayah, rect);
          }}
          aria-label={`Ayah ${ayah.ayahNumber}: ${themeLabel}`}
          aria-expanded={isExpanded}
        >
          {ayah.summary?.trim() ? (
            <div className="flex min-h-0 min-w-0 flex-1 flex-col items-center justify-center gap-2 p-3">
              {/* Number + text block centered vertically as a unit */}
              <div className="flex flex-col items-center gap-2">
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm ring-1 ring-black/5"
                  style={{ backgroundColor: borderColor }}
                >
                  {ayah.ayahNumber}
                </div>
                <p className={`max-h-[60%] min-h-0 overflow-auto text-center ${TEXT_CLASS}`}>
                  {summarySegments.map((seg, i) =>
                    seg.highlight ? (
                      <strong key={i} className="font-semibold text-slate-800">
                        {seg.text}
                      </strong>
                    ) : (
                      <span key={i}>{seg.text}</span>
                    )
                  )}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 p-3">
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                style={{ backgroundColor: borderColor }}
              >
                {ayah.ayahNumber}
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                {themeLabel}
              </span>
            </div>
          )}
        </button>
      </div>
      {!compact && (
        <div className="flex shrink-0 flex-col items-start text-left">
          <span className="text-sm font-semibold text-slate-700">{ayah.ayahNumber}</span>
          <span
            className="text-[10px] font-semibold uppercase tracking-wider"
            style={{ color: borderColor }}
          >
            {themeLabel}
          </span>
        </div>
      )}
    </div>
  );
}

