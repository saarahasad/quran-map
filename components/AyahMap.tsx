"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { Ayah } from "@/lib/types";
import { getThemeBorderHex, getThemeLabel, hexToRgba } from "@/lib/theme-colors";
import AyahCircle from "./AyahCircle";
import AyahModal from "./AyahModal";
import TimelineAyahCard from "./TimelineAyahCard";
import MapAyahNode from "./MapAyahNode";
import JourneyAyahCard from "./JourneyAyahCard";

type ViewMode = "journey" | "timeline" | "map" | "cluster";

interface AyahMapProps {
  surahId: number;
  totalAyahs: number;
  ayahs: Ayah[];
  colorMapping?: Record<string, string> | null;
}

export default function AyahMap({ surahId, totalAyahs, ayahs, colorMapping }: AyahMapProps) {
  const [selectedAyah, setSelectedAyah] = useState<Ayah | null>(null);
  const [cardRect, setCardRect] = useState<DOMRect | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("journey");
  const [hoveredAyahNumber, setHoveredAyahNumber] = useState<number | null>(null);
  const [mapRevealedCount, setMapRevealedCount] = useState(1);
  const [expandedAyahNumber, setExpandedAyahNumber] = useState<number | null>(null);
  const [journeyScrollAyah, setJourneyScrollAyah] = useState(1);
  const [jumpInputValue, setJumpInputValue] = useState(`${surahId}:1`);
  const mapGridRef = useRef<HTMLDivElement>(null);
  const journeyRefs = useRef<Map<number, HTMLDivElement | null>>(new Map());

  useEffect(() => {
    setJumpInputValue(`${surahId}:${journeyScrollAyah}`);
  }, [surahId, journeyScrollAyah]);
  const [connectorPoints, setConnectorPoints] = useState<{ ayahNumber: number; x: number; y: number }[]>([]);
  const [gridSize, setGridSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (viewMode !== "map" || !mapGridRef.current) return;
    const el = mapGridRef.current;
    const gridEl = el.querySelector<HTMLElement>("[data-map-grid]");
    if (!gridEl) return;
    const measure = () => {
      const containerRect = el.getBoundingClientRect();
      const nodeEls = gridEl.querySelectorAll<HTMLElement>("[data-ayah-node]");
      const points: { ayahNumber: number; x: number; y: number }[] = [];
      nodeEls.forEach((node) => {
        const n = parseInt(node.dataset.ayahNumber ?? "", 10);
        if (Number.isNaN(n)) return;
        const r = node.getBoundingClientRect();
        points.push({
          ayahNumber: n,
          x: r.left - containerRect.left + r.width / 2,
          y: r.top - containerRect.top + r.height / 2,
        });
      });
      points.sort((a, b) => a.ayahNumber - b.ayahNumber);
      setConnectorPoints(points);
      setGridSize({ w: containerRect.width, h: containerRect.height });
    };
    const scheduleMeasure = () => {
      requestAnimationFrame(() => requestAnimationFrame(measure));
    };
    scheduleMeasure();
    const ro = new ResizeObserver(scheduleMeasure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [viewMode, mapRevealedCount, expandedAyahNumber]);

  useEffect(() => {
    if (viewMode !== "map" || ayahs.length === 0) return;
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)
        return;
      if (e.key === "ArrowRight") {
        if (mapRevealedCount >= ayahs.length) return;
        e.preventDefault();
        const nextCount = Math.min(mapRevealedCount + 1, ayahs.length);
        setMapRevealedCount(nextCount);
        const ayah = ayahs[nextCount - 1];
        if (ayah) setExpandedAyahNumber(ayah.ayahNumber);
      } else if (e.key === "ArrowLeft") {
        if (mapRevealedCount <= 1) return;
        e.preventDefault();
        const prevCount = mapRevealedCount - 1;
        setMapRevealedCount(prevCount);
        const ayah = ayahs[prevCount - 1];
        if (ayah) setExpandedAyahNumber(ayah.ayahNumber);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [viewMode, ayahs, mapRevealedCount]);

  const openModal = (ayah: Ayah, rect?: DOMRect) => {
    setHoveredAyahNumber(ayah.ayahNumber);
    setSelectedAyah(ayah);
    setCardRect(rect ?? null);
  };

  const closeModal = () => {
    setHoveredAyahNumber(null);
    setSelectedAyah(null);
    setCardRect(null);
  };

  const applyJumpToAyah = (value: string) => {
    const match = value.match(/^\d+:(\d+)$/) ?? value.match(/^(\d+)$/);
    if (match) {
      const n = parseInt(match[1], 10);
      if (!Number.isNaN(n) && n >= 1 && n <= totalAyahs) setJourneyScrollAyah(n);
    } else {
      setJumpInputValue(`${surahId}:${journeyScrollAyah}`);
    }
  };

  /** Nav bar: Jump to ayah [surahId:ayah] < > of N */
  const NavBar = ({ currentAyah, onAyahChange }: { currentAyah: number; onAyahChange: (n: number) => void }) => (
    <div className="flex flex-wrap items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50/90 px-4 py-3 shadow-sm">
      <label htmlFor="jump-ayah" className="text-sm font-medium text-slate-600">
        Jump to ayah
      </label>
      <input
        id="jump-ayah"
        type="text"
        value={jumpInputValue}
        onChange={(e) => setJumpInputValue(e.target.value)}
        onBlur={() => applyJumpToAyah(jumpInputValue)}
        onKeyDown={(e) => e.key === "Enter" && applyJumpToAyah(jumpInputValue)}
        className="w-14 rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-center text-sm tabular-nums shadow-sm focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
        aria-label="Surah and ayah (e.g. 5:1)"
      />
      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled={currentAyah <= 1}
          onClick={() => onAyahChange(Math.max(1, currentAyah - 1))}
          className="rounded-lg border border-slate-300 bg-white p-2 text-slate-600 shadow-sm transition-colors hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none"
          aria-label="Previous ayah"
        >
          ←
        </button>
        <button
          type="button"
          disabled={currentAyah >= totalAyahs}
          onClick={() => onAyahChange(Math.min(totalAyahs, currentAyah + 1))}
          className="rounded-lg border border-slate-300 bg-white p-2 text-slate-600 shadow-sm transition-colors hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none"
          aria-label="Next ayah"
        >
          →
        </button>
      </div>
      <span className="text-sm text-slate-500">of {totalAyahs}</span>
    </div>
  );

  const renderCard = (ayah: Ayah) => (
    <div key={ayah.ayahNumber} className="flex min-w-[22rem] flex-1 basis-0">
      <AyahCircle
        ayah={ayah}
        dimmed={hoveredAyahNumber != null && hoveredAyahNumber !== ayah.ayahNumber}
        onHoverStart={(e) =>
          openModal(
            ayah,
            e?.currentTarget ? (e.currentTarget as HTMLElement).getBoundingClientRect() : undefined
          )
        }
        onHoverEnd={closeModal}
        colorMapping={colorMapping}
      />
    </div>
  );

  useEffect(() => {
    if ((viewMode !== "journey" && viewMode !== "timeline") || journeyScrollAyah < 1) return;
    const el = journeyRefs.current.get(journeyScrollAyah);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [viewMode, journeyScrollAyah]);

  if (viewMode === "journey") {
    return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-lg font-medium text-slate-700">Ayah Map</h2>
          <div className="flex gap-2">
            {(["journey", "timeline", "map", "cluster"] as ViewMode[]).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setViewMode(mode)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
                  viewMode === mode ? "bg-amber-100 text-amber-900 ring-1 ring-amber-300" : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {totalAyahs > 0 && (
          <div className="flex justify-center">
            <NavBar currentAyah={journeyScrollAyah} onAyahChange={setJourneyScrollAyah} />
          </div>
        )}

        <div className="map-journey-bg relative overflow-hidden rounded-2xl border border-slate-200/60 py-8 shadow-inner">
          <div className="relative mx-auto max-w-3xl space-y-6 px-4 md:px-8">
            {ayahs.map((ayah, i) => {
              const themeHex = getThemeBorderHex(ayah.theme, colorMapping);
              const glowRgba = hexToRgba(themeHex, 0.08);
              return (
                <div
                  key={ayah.ayahNumber}
                  ref={(el) => {
                    if (el) journeyRefs.current.set(ayah.ayahNumber, el);
                  }}
                  className={`flex w-full ${i % 2 === 0 ? "justify-start pl-0 pr-8 md:pr-16" : "justify-end pl-8 md:pl-16 pr-0"}`}
                >
                  <div className="relative w-full max-w-xl">
                    {/* Theme-colored glow behind card */}
                    <div
                      className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[200%] w-[200%] -translate-x-1/2 -translate-y-1/2 rounded-full"
                      style={{
                        background: `radial-gradient(circle, ${glowRgba}, transparent 70%)`,
                      }}
                      aria-hidden
                    />
                    <div className="relative z-10">
                      <JourneyAyahCard
                        ayah={ayah}
                        colorMapping={colorMapping}
                        pathSide={i % 2 === 0 ? "right" : "left"}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Golden dotted path overlay – decorative line down the middle */}
          <div className="journey-path-line pointer-events-none absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 opacity-60" aria-hidden />
        </div>

        {totalAyahs > 0 && (
          <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">Ayah 1</span>
            <span className="flex items-center gap-1.5">Ayah {totalAyahs}</span>
          </div>
        )}
      </div>
    );
  }

  if (viewMode === "timeline") {
    return (
      <div className="space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-lg font-medium text-slate-700">Ayah Map</h2>
          <div className="flex gap-2">
            {(["journey", "timeline", "map", "cluster"] as ViewMode[]).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setViewMode(mode)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
                  viewMode === mode ? "bg-slate-300 text-slate-900 ring-1 ring-slate-400" : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
        {totalAyahs > 0 && (
          <div className="flex justify-center">
            <NavBar currentAyah={journeyScrollAyah} onAyahChange={setJourneyScrollAyah} />
          </div>
        )}
        {/* Full-width timeline: one card per ayah, full screen width */}
        <div className="relative flex w-full max-w-full flex-col pl-1">
          <div className="timeline-glow" aria-hidden />
          <div
            className="absolute left-3 top-6 bottom-6 w-px bg-gradient-to-b from-slate-300 via-slate-200 to-slate-300"
            aria-hidden
          />
          {ayahs.map((ayah) => (
            <div
              key={ayah.ayahNumber}
              ref={(el) => {
                if (el) journeyRefs.current.set(ayah.ayahNumber, el);
              }}
              className="relative flex items-start gap-5 pb-10 last:pb-0"
            >
              <div className="relative z-10 mt-2 h-6 w-6 shrink-0 rounded-full border-2 border-slate-300 bg-white shadow-sm" aria-hidden />
              <div className="min-w-0 flex-1 w-full max-w-full">
                <TimelineAyahCard ayah={ayah} colorMapping={colorMapping} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (viewMode === "cluster") {
    const byTheme = ayahs.reduce<Record<string, Ayah[]>>((acc, ayah) => {
      (acc[ayah.theme] = acc[ayah.theme] ?? []).push(ayah);
      return acc;
    }, {});
    const themes = Object.keys(byTheme).sort((a, b) => {
      const orderA = Math.min(...byTheme[a].map((x) => x.ayahNumber));
      const orderB = Math.min(...byTheme[b].map((x) => x.ayahNumber));
      return orderA - orderB;
    });
    const totalAyahs = ayahs.length > 0 ? Math.max(...ayahs.map((a) => a.ayahNumber)) : 0;
    const themeOrder = ayahs.map((a) => a.theme);

    return (
      <div className="space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-lg font-medium text-slate-700">Ayah Map</h2>
          <div className="flex gap-2">
            {(["journey", "timeline", "map", "cluster"] as ViewMode[]).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setViewMode(mode)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
                  viewMode === mode ? "bg-slate-300 text-slate-900 ring-1 ring-slate-400" : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Surah at a glance: theme distribution + theme flow */}
        {themeOrder.length > 0 && (
          <div className="space-y-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3">
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-500">
                Theme distribution
              </p>
              <div className="flex h-6 w-full overflow-hidden rounded-lg bg-slate-200/60">
                {themes.map((theme) => (
                  <div
                    key={theme}
                    className="flex shrink-0 items-center justify-center transition-all"
                    style={{
                      width: `${(100 * byTheme[theme].length) / ayahs.length}%`,
                      backgroundColor: getThemeBorderHex(theme, colorMapping),
                      minWidth: byTheme[theme].length > 0 ? "2rem" : 0,
                    }}
                    title={`${getThemeLabel(theme)}: ${byTheme[theme].length} ayahs`}
                  />
                ))}
              </div>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
                {themes.map((theme) => (
                  <span key={theme} className="flex items-center gap-1.5">
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: getThemeBorderHex(theme, colorMapping) }}
                    />
                    {getThemeLabel(theme)} {byTheme[theme].length}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3">
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-500">
                Theme flow (order in surah)
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {(() => {
                  const seen = new Set<string>();
                  const order: string[] = [];
                  for (const t of themeOrder) {
                    if (!seen.has(t)) {
                      seen.add(t);
                      order.push(t);
                    }
                  }
                  return order.map((theme, i) => (
                    <span key={theme} className="flex items-center gap-1.5">
                      <span
                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: getThemeBorderHex(theme, colorMapping) }}
                        aria-hidden
                      />
                      <span className="text-sm text-slate-700">{getThemeLabel(theme)}</span>
                      {i < order.length - 1 && (
                        <span className="text-slate-300" aria-hidden>
                          →
                        </span>
                      )}
                    </span>
                  ));
                })()}
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-10">
          {themes.map((theme) => (
            <section key={theme} className="relative flex flex-col">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-slate-500">
                <span
                  className="h-3 w-3 shrink-0 rounded-full"
                  style={{ backgroundColor: getThemeBorderHex(theme, colorMapping) }}
                  aria-hidden
                />
                {getThemeLabel(theme)}
                <span className="text-slate-400 font-normal normal-case">
                  ({byTheme[theme].length} ayah{byTheme[theme].length !== 1 ? "s" : ""})
                </span>
              </h3>
              <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
                {[...byTheme[theme]].sort((a, b) => a.ayahNumber - b.ayahNumber).map((ayah) => (
                  <MapAyahNode
                    key={ayah.ayahNumber}
                    ayah={ayah}
                    colorMapping={colorMapping}
                    totalAyahs={totalAyahs}
                    compact
                    onClick={(clickedAyah, rect) => openModal(clickedAyah, rect)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
        <AyahModal
          ayah={selectedAyah}
          cardRect={cardRect}
          onClose={closeModal}
          onMouseLeave={closeModal}
          colorMapping={colorMapping}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-lg font-medium text-slate-700">Ayah Map</h2>
        <div className="flex gap-2">
          {(["journey", "timeline", "map", "cluster"] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setViewMode(mode)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
                viewMode === mode ? "bg-slate-300 text-slate-900 ring-1 ring-slate-400" : "bg-slate-200 text-slate-700 hover:bg-slate-300"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Map: columns = themes; row = ayah number (ayah 3 in row 3, ayah 4 in row 4, etc.) */}
      {(() => {
        const revealed = ayahs.slice(0, mapRevealedCount);
        const expandedAyah = expandedAyahNumber != null ? ayahs.find((a) => a.ayahNumber === expandedAyahNumber) : null;

        const themeOrder: string[] = [];
        revealed.forEach((ayah) => {
          if (!themeOrder.includes(ayah.theme)) themeOrder.push(ayah.theme);
        });
        const themes = themeOrder;
        const maxRow = revealed.length > 0 ? Math.max(...revealed.map((a) => a.ayahNumber)) : 0;

        const getAyahAt = (row: number, theme: string) =>
          revealed.find((a) => a.ayahNumber === row && a.theme === theme);

        return (
          <div className="flex flex-col items-center gap-6 px-6 py-4 pb-24 sm:px-8">
            {ayahs.length > 0 && (
              <div className="flex w-full max-w-5xl flex-wrap items-center justify-center gap-3">
                <label htmlFor="jump-ayah-map" className="text-sm font-medium text-slate-600">
                  Jump to ayah
                </label>
                <input
                  id="jump-ayah-map"
                  type="number"
                  min={1}
                  max={ayahs.length}
                  value={mapRevealedCount}
                  onChange={(e) => {
                    const raw = e.target.value;
                    if (raw === "") return;
                    const n = parseInt(raw, 10);
                    if (!Number.isNaN(n) && n >= 1 && n <= ayahs.length) {
                      setMapRevealedCount(n);
                      const ayah = ayahs[n - 1];
                      if (ayah) setExpandedAyahNumber(ayah.ayahNumber);
                    }
                  }}
                  className="w-16 rounded-lg border border-slate-300 px-2 py-1.5 text-center text-sm tabular-nums shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
                  aria-label="Ayah number to show up to (1 to total)"
                />
                <span className="text-sm text-slate-500">of {ayahs.length}</span>
              </div>
            )}
            <div ref={mapGridRef} className="relative w-full max-w-5xl mx-auto">
              <div
                data-map-grid
                className="relative z-10 flex w-full flex-col gap-4 py-2"
              >
                {/* Theme headers row — negligible col gap on mobile to avoid overlap */}
                <div
                  className="grid w-full justify-items-center gap-x-0 sm:gap-x-1 md:gap-x-4 lg:gap-x-6"
                  style={{ gridTemplateColumns: `repeat(${themes.length}, minmax(0, 1fr))` }}
                >
                  {themes.map((theme) => (
                    <h3
                      key={theme}
                      className="truncate text-[10px] font-medium uppercase tracking-wider text-slate-500 sm:text-xs max-w-full px-0.5"
                      title={getThemeLabel(theme)}
                    >
                      {getThemeLabel(theme)}
                    </h3>
                  ))}
                </div>
                {/* Ayah rows + in-flow card when expanded — negligible col gap on mobile */}
                {Array.from({ length: maxRow }, (_, i) => i + 1).map((row) => (
                  <Fragment key={row}>
                    <div
                      className="grid min-h-[11rem] w-full items-center justify-items-center gap-x-0 sm:gap-x-1 md:gap-x-4 lg:gap-x-6"
                      style={{ gridTemplateColumns: `repeat(${themes.length}, minmax(0, 1fr))` }}
                    >
                      {themes.map((theme) => {
                        const ayah = getAyahAt(row, theme);
                        return (
                          <div key={`${row}-${theme}`} className="flex min-h-[11rem] min-w-0 items-center justify-center">
                            {ayah ? (
                              <MapAyahNode
                                ayah={ayah}
                                colorMapping={colorMapping}
                                isExpanded={expandedAyahNumber === ayah.ayahNumber}
                                onClick={(clickedAyah) => {
                                  if (expandedAyahNumber === clickedAyah.ayahNumber) {
                                    setExpandedAyahNumber(null);
                                  } else {
                                    setExpandedAyahNumber(clickedAyah.ayahNumber);
                                  }
                                }}
                              />
                            ) : null}
                          </div>
                        );
                      })}
                    </div>
                    {expandedAyahNumber === row && expandedAyah && (
                      <div className="w-full px-2 py-2">
                        <div className="mx-auto w-full max-w-4xl rounded-xl border border-slate-200 bg-white shadow-lg">
                          <TimelineAyahCard ayah={expandedAyah} colorMapping={colorMapping} />
                          <div className="border-t border-slate-100 px-4 py-3">
                            <button
                              type="button"
                              onClick={() => setExpandedAyahNumber(null)}
                              className="text-sm font-medium text-slate-500 hover:text-slate-700"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </Fragment>
                ))}
              </div>
              {gridSize.w > 0 && gridSize.h > 0 && connectorPoints.length >= 2 && (
                <svg
                  className="pointer-events-none absolute left-0 top-0 z-0 overflow-visible"
                  width={gridSize.w}
                  height={gridSize.h}
                  aria-hidden
                >
                  {connectorPoints.slice(0, -1).map((p, i) => {
                    const next = connectorPoints[i + 1];
                    if (next.ayahNumber !== p.ayahNumber + 1) return null;
                    const dx = next.x - p.x;
                    const dy = next.y - p.y;
                    const len = Math.sqrt(dx * dx + dy * dy) || 1;
                    const bend = Math.min(len * 0.45, 56);
                    const midX = (p.x + next.x) / 2;
                    const midY = (p.y + next.y) / 2;
                    const cpx = midX + (-dy / len) * bend;
                    const cpy = midY + (dx / len) * bend;
                    const d = `M ${p.x} ${p.y} Q ${cpx} ${cpy} ${next.x} ${next.y}`;
                    return (
                      <path
                        key={`${p.ayahNumber}-${next.ayahNumber}`}
                        d={d}
                        fill="none"
                        stroke="rgb(100 116 139)"
                        strokeWidth="2"
                        strokeDasharray="6 5"
                        strokeLinecap="round"
                      />
                    );
                  })}
                </svg>
              )}
            </div>

            {ayahs.length > 0 && (
              <div className="fixed bottom-4 left-0 right-0 z-20 flex justify-center gap-3 px-4">
                <button
                  type="button"
                  disabled={mapRevealedCount <= 1}
                  onClick={() => {
                    if (mapRevealedCount <= 1) return;
                    const prevCount = mapRevealedCount - 1;
                    setMapRevealedCount(prevCount);
                    const ayah = ayahs[prevCount - 1];
                    if (ayah) setExpandedAyahNumber(ayah.ayahNumber);
                  }}
                  className="touch-manipulation rounded-full bg-slate-600 px-5 py-3 text-sm font-medium text-white shadow-lg transition-colors hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none sm:px-6"
                  aria-label="Previous ayah (← key)"
                >
                  ← Previous <span className="hidden sm:inline text-slate-300">(←)</span>
                </button>
                <button
                  type="button"
                  disabled={mapRevealedCount >= ayahs.length}
                  onClick={() => {
                    if (mapRevealedCount >= ayahs.length) return;
                    const nextCount = Math.min(mapRevealedCount + 1, ayahs.length);
                    setMapRevealedCount(nextCount);
                    const ayah = ayahs[nextCount - 1];
                    if (ayah) setExpandedAyahNumber(ayah.ayahNumber);
                  }}
                  className="touch-manipulation rounded-full bg-slate-600 px-5 py-3 text-sm font-medium text-white shadow-lg transition-colors hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none sm:px-6"
                  aria-label="Next ayah (→ key)"
                >
                  Next → <span className="hidden sm:inline text-slate-300">(→)</span>
                </button>
              </div>
            )}

            {mapRevealedCount >= ayahs.length && ayahs.length > 0 && (
              <p className="pb-24 text-center text-sm text-slate-500">You’ve revealed all ayahs. Switch to Timeline to read in full.</p>
            )}
          </div>
        );
      })()}
    </div>
  );
}
