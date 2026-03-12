"use client";

import { useEffect, useState } from "react";
import { Ayah } from "@/lib/types";
import { getWordHighlights } from "@/lib/ayah";
import { getThemeBorderHex, getThemeLabel } from "@/lib/theme-colors";

const POPUP_GAP = 8;
const POPUP_OVERLAP = 24; /* overlap with card so no dead zone between card and popup */
const POPUP_MAX_WIDTH = 560;
const POPUP_EST_HEIGHT = 560;
const POPUP_MAX_HEIGHT = "85vh";

interface AyahModalProps {
  ayah: Ayah | null;
  cardRect?: DOMRect | null;
  onClose: () => void;
  onMouseLeave?: () => void;
  colorMapping?: Record<string, string> | null;
}

function getPositionNearCard(rect: DOMRect): { left: number; top: number } {
  if (typeof window === "undefined") return { left: 16, top: 16 };
  const padding = 16;
  /* Start popup overlapping card by POPUP_OVERLAP so there's no gap to cross with the cursor */
  let left = rect.right - POPUP_OVERLAP + POPUP_GAP;
  if (left + POPUP_MAX_WIDTH > window.innerWidth - padding) {
    left = rect.left - POPUP_MAX_WIDTH + POPUP_OVERLAP - POPUP_GAP;
  }
  if (left < padding) left = padding;
  if (left + POPUP_MAX_WIDTH > window.innerWidth - padding) {
    left = (window.innerWidth - POPUP_MAX_WIDTH) / 2;
  }

  let top = rect.top;
  if (top + POPUP_EST_HEIGHT > window.innerHeight - padding) {
    top = window.innerHeight - POPUP_EST_HEIGHT - padding;
  }
  if (top < padding) top = padding;

  return { left, top };
}

export default function AyahModal({
  ayah,
  cardRect,
  onClose,
  onMouseLeave,
  colorMapping,
}: AyahModalProps) {
  const [position, setPosition] = useState<{ left: number; top: number } | null>(null);

  useEffect(() => {
    if (cardRect) setPosition(getPositionNearCard(cardRect));
    else setPosition(null);
  }, [cardRect]);

  if (!ayah) return null;

  const headerBgHex = getThemeBorderHex(ayah.theme, colorMapping);
  const themeLabel = getThemeLabel(ayah.theme);
  const nearCard = Boolean(cardRect && position);

  const content = (
    <div
        className="w-full max-w-lg rounded-2xl bg-white shadow-xl ring-1 ring-slate-200"
        onMouseLeave={onMouseLeave}
      >
      <div
        className="rounded-t-2xl px-6 py-4 text-white"
        style={{ backgroundColor: headerBgHex }}
      >
        <p className="text-sm font-medium opacity-90">
          Ayah {ayah.ayahNumber} · {themeLabel}
          {ayah.cluster != null && ayah.cluster !== "" && (
            <span className="ml-1 opacity-80"> · {ayah.cluster}</span>
          )}
        </p>
      </div>
      <div
        className="space-y-5 px-6 py-5 overflow-y-auto"
        style={{ maxHeight: POPUP_MAX_HEIGHT }}
      >
        {/* Full ayah (Arabic – Uthmani script, increased line-height) */}
        <section>
          <p
            id="ayah-modal-title"
            className="font-arabic text-2xl leading-[2.25] text-slate-800"
            dir="rtl"
          >
            {ayah.arabic}
          </p>
        </section>
        {/* Full translation (increased line-height) */}
        <section>
          <p className="text-slate-600 leading-[2] text-[1.0625rem]">
            {ayah.translation}
          </p>
        </section>
        {/* Word highlights: Arabic ↔ translation for quick matching */}
        {(() => {
          const highlights = getWordHighlights(ayah);
          return highlights.length > 0 ? (
          <section>
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Important words
            </h4>
            <ul className="space-y-1.5 rounded-lg border border-slate-200 bg-slate-50/50 p-3">
              {highlights.map((pair, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between gap-3 rounded px-2 py-1.5 odd:bg-white/60"
                >
                  <span className="font-arabic text-base text-slate-800" dir="rtl">
                    {pair.arabic}
                  </span>
                  <span className="text-sm text-slate-600">{pair.translation}</span>
                </li>
              ))}
            </ul>
          </section>
          ) : null;
        })()}
        {/* Tafsir summary */}
        {ayah.tafsirSummary && (
          <section>
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Tafsir summary
            </h4>
            <div className="rounded-lg bg-slate-50/80 p-4 text-sm leading-relaxed text-slate-600">
              <p className="whitespace-pre-line text-[0.9375rem] leading-7">
                {ayah.tafsirSummary}
              </p>
            </div>
          </section>
        )}
        {/* Lesson / reflection */}
        {ayah.lessonReflection && (
          <section>
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Lesson / reflection
            </h4>
            <p className="rounded-lg border-l-4 border-emerald-500/60 bg-emerald-50/50 p-4 text-sm leading-relaxed text-slate-700">
              {ayah.lessonReflection}
            </p>
          </section>
        )}
        {/* Flow: Before / After this ayah */}
        {(ayah.beforeThisAyah || ayah.afterThisAyah) && (
          <section className="rounded-lg border border-slate-200 bg-slate-50/50 p-4">
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Flow
            </h4>
            <div className="space-y-3 text-sm text-slate-600">
              {ayah.beforeThisAyah && (
                <p>
                  <span className="font-medium text-slate-700">Before this ayah…</span>{" "}
                  {ayah.beforeThisAyah}
                </p>
              )}
              {ayah.afterThisAyah && (
                <p>
                  <span className="font-medium text-slate-700">After this ayah…</span>{" "}
                  {ayah.afterThisAyah}
                </p>
              )}
            </div>
          </section>
        )}
        {/* Short summary (if no tafsirSummary, or as extra) */}
        {ayah.summary && !ayah.tafsirSummary && (
          <p className="rounded-lg bg-slate-50/80 p-4 text-sm leading-relaxed text-slate-600">
            {ayah.summary}
          </p>
        )}
      </div>
      <div className="flex justify-end gap-2 border-t border-slate-100 px-6 py-4">
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200"
        >
          Close
        </button>
      </div>
    </div>
  );

  return (
    <div
      className={`fixed inset-0 z-50 p-4 ${nearCard ? "pointer-events-none" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ayah-modal-title"
    >
      {!nearCard && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          onClick={onClose}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
        </div>
      )}

      {nearCard && position ? (
        <div
          className="fixed z-10 w-full max-w-lg pointer-events-auto"
          style={{
            left: position.left,
            top: position.top,
            width: "min(28rem, calc(100vw - 2rem))",
            maxWidth: POPUP_MAX_WIDTH,
          }}
          onMouseLeave={onMouseLeave}
        >
          {content}
        </div>
      ) : (
        <div className="relative z-10 flex min-h-full items-center justify-center">
          {content}
        </div>
      )}
    </div>
  );
}
