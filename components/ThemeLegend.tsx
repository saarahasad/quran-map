"use client";

import {
  THEME_COLORS,
  getThemeBorderHex,
  getThemeLabel,
} from "@/lib/theme-colors";

interface ThemeLegendProps {
  /** When provided, show only these themes; colorMapping should be unique per theme */
  themes?: string[];
  colorMapping?: Record<string, string> | null;
}

export default function ThemeLegend({ themes, colorMapping }: ThemeLegendProps) {
  const themeKeys = themes ?? Object.keys(THEME_COLORS);

  return (
    <div className="mb-8 rounded-xl border border-slate-200/80 bg-white/80 px-5 py-4 shadow-sm ring-1 ring-slate-900/5">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
        Themes
      </p>
      <div className="flex flex-wrap items-center gap-3">
        {themeKeys.map((theme) => (
          <div
            key={theme}
            className="flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50/50 px-3 py-1.5"
          >
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full ring-2 ring-white shadow-sm"
              style={{ backgroundColor: getThemeBorderHex(theme, colorMapping) }}
              aria-hidden
            />
            <span className="text-xs font-medium text-slate-600">
              {getThemeLabel(theme)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
