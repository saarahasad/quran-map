/** Global theme → Tailwind background class. Each theme has a distinct, apt color. */
export const THEME_COLORS: Record<string, string> = {
  tawhid: "bg-emerald-600",
  hereafter: "bg-amber-600",
  prophet_story: "bg-blue-600",
  law: "bg-yellow-600",
  war: "bg-rose-600",
  mercy: "bg-teal-600",
  warning: "bg-orange-600",
  spiritual: "bg-indigo-600",
  faith: "bg-green-600",
  battle: "bg-red-600",
  unity: "bg-sky-600",
  divine_support: "bg-violet-600",
  hypocrisy: "bg-slate-600",
  revelation: "bg-purple-600",
  signs: "bg-cyan-600",
  guidance: "bg-lime-600",
  disbelief: "bg-zinc-600",
  stories: "bg-fuchsia-600",
  patience: "bg-pink-600",
  judgment: "bg-amber-600",
};

/** Ordered palette for assigning unique colors when resolving duplicates. */
const ORDERED_PALETTE = [
  "emerald", "amber", "blue", "yellow", "rose", "teal", "orange", "indigo",
  "green", "red", "sky", "violet", "slate", "purple", "cyan", "lime",
  "zinc", "fuchsia", "pink", "gray",
] as const;

/** Color name (from JSON colorMapping) → Tailwind background class. No white. */
const COLOR_NAME_TO_CLASS: Record<string, string> = {
  emerald: "bg-emerald-600",
  red: "bg-red-600",
  blue: "bg-blue-600",
  orange: "bg-orange-600",
  purple: "bg-purple-600",
  yellow: "bg-yellow-600",
  gray: "bg-slate-600",
  teal: "bg-teal-600",
  amber: "bg-amber-600",
  rose: "bg-rose-600",
  sage: "bg-green-600",
  slate: "bg-slate-600",
  violet: "bg-violet-600",
  sky: "bg-sky-600",
  green: "bg-green-600",
  indigo: "bg-indigo-600",
  cyan: "bg-cyan-600",
  fuchsia: "bg-fuchsia-600",
  pink: "bg-pink-600",
  zinc: "bg-zinc-600",
  lime: "bg-lime-600",
};

export const THEME_LABELS: Record<string, string> = {
  tawhid: "Tawhid (Oneness)",
  hereafter: "Hereafter",
  prophet_story: "Prophet Story",
  law: "Law",
  war: "War",
  mercy: "Mercy",
  warning: "Warning",
  spiritual: "Spiritual",
  faith: "Faith",
  battle: "Battle",
  unity: "Unity",
  divine_support: "Divine Support",
  hypocrisy: "Hypocrisy",
  revelation: "Revelation",
  signs: "Signs",
  guidance: "Guidance",
  disbelief: "Disbelief",
  stories: "Stories",
  patience: "Patience",
  judgment: "Judgment",
};

/** Extract Tailwind color name from bg class (e.g. "bg-emerald-600" → "emerald"). */
function themeToColorName(theme: string): string {
  const bg = THEME_COLORS[theme];
  if (!bg) return "slate";
  return bg.replace(/^bg-/, "").replace(/-\d+$/, "");
}

/**
 * Build a theme → color name map with no duplicates.
 * Uses surah colorMapping or THEME_COLORS for preferred colors, then assigns
 * the next available palette color when a duplicate would occur.
 */
export function getUniqueThemeColorMapping(
  themes: string[],
  colorMapping?: Record<string, string> | null
): Record<string, string> {
  const used = new Set<string>();
  const result: Record<string, string> = {};
  for (const theme of themes) {
    const preferred =
      (colorMapping && colorMapping[theme]) || themeToColorName(theme);
    const colorName = used.has(preferred)
      ? ORDERED_PALETTE.find((c) => !used.has(c)) ?? "slate"
      : preferred;
    used.add(colorName);
    result[theme] = colorName;
  }
  return result;
}

/**
 * Resolve theme to Tailwind background class.
 * If surah provides colorMapping (theme → color name), use it; else use global THEME_COLORS.
 */
export function getThemeColor(
  theme: string | undefined | null,
  surahColorMapping?: Record<string, string> | null
): string {
  if (theme != null && surahColorMapping?.[theme]) {
    const colorName = surahColorMapping[theme];
    const cls = COLOR_NAME_TO_CLASS[colorName];
    if (cls) return cls;
  }
  return (theme != null && THEME_COLORS[theme]) || "bg-slate-600";
}

/** Tailwind color name → hex (muted, manuscript-style) */
const COLOR_NAME_TO_HEX: Record<string, string> = {
  emerald: "#059669",
  red: "#dc2626",
  blue: "#2563eb",
  orange: "#ea580c",
  purple: "#9333ea",
  yellow: "#ca8a04",
  gray: "#64748b",
  teal: "#0d9488",
  sky: "#0284c7",
  amber: "#d97706",
  rose: "#be123c",
  sage: "#16a34a",
  slate: "#475569",
  violet: "#7c3aed",
  green: "#16a34a",
  indigo: "#4f46e5",
  cyan: "#0891b2",
  fuchsia: "#c026d3",
  pink: "#db2777",
  zinc: "#52525b",
  lime: "#65a30d",
};

/** Theme → color name (from THEME_COLORS or surah colorMapping) */
function getThemeColorName(
  theme: string | undefined | null,
  surahColorMapping?: Record<string, string> | null
): string {
  if (theme != null && surahColorMapping?.[theme]) return surahColorMapping[theme];
  const bgClass = theme != null && THEME_COLORS[theme] ? THEME_COLORS[theme] : "bg-slate-600";
  return bgClass.replace(/^bg-/, "").replace(/-\d+$/, "");
}

/**
 * Resolve theme to a hex color for borders (guarantees color shows).
 */
export function getThemeBorderHex(
  theme: string | undefined | null,
  surahColorMapping?: Record<string, string> | null
): string {
  const name = getThemeColorName(theme, surahColorMapping);
  return COLOR_NAME_TO_HEX[name] ?? "#64748b";
}

/** Convert hex (#RRGGBB or #RGB) to rgba string for glows. */
export function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace(/^#/, "");
  const r =
    h.length === 3 ? parseInt(h[0] + h[0], 16) : parseInt(h.slice(0, 2), 16);
  const g =
    h.length === 3 ? parseInt(h[1] + h[1], 16) : parseInt(h.slice(2, 4), 16);
  const b =
    h.length === 3 ? parseInt(h[2] + h[2], 16) : parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/** Light background tints (soft, manuscript-style) for card backgrounds */
const COLOR_NAME_TO_LIGHT_BG: Record<string, string> = {
  emerald: "#ecfdf5",
  red: "#fef2f2",
  blue: "#eff6ff",
  orange: "#fff7ed",
  purple: "#faf5ff",
  yellow: "#fefce8",
  gray: "#f8fafc",
  teal: "#f0fdfa",
  sky: "#f0f9ff",
  amber: "#fffbeb",
  rose: "#fff1f2",
  sage: "#f0fdf4",
  slate: "#f1f5f9",
  violet: "#f5f3ff",
  green: "#f0fdf4",
  indigo: "#eef2ff",
  cyan: "#ecfeff",
  fuchsia: "#fdf4ff",
  pink: "#fdf2f8",
  zinc: "#f4f4f5",
  lime: "#f7fee7",
};

/**
 * Resolve theme to a light background hex (for card background).
 */
export function getThemeBgLightHex(
  theme: string | undefined | null,
  surahColorMapping?: Record<string, string> | null
): string {
  const name = getThemeColorName(theme, surahColorMapping);
  return COLOR_NAME_TO_LIGHT_BG[name] ?? "#f8fafc";
}

export function getThemeLabel(theme: string | undefined | null): string {
  if (theme == null || theme === "") return "Theme";
  return THEME_LABELS[theme] ?? theme.replace(/_/g, " ");
}
