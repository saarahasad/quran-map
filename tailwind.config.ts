import type { Config } from "tailwindcss";

/** Theme background/border classes used via variables — must be safelisted so Tailwind generates them */
const themeColorSafelist = [
  "bg-emerald-600",
  "bg-violet-600",
  "bg-blue-600",
  "bg-amber-600",
  "bg-rose-600",
  "bg-green-600",
  "bg-teal-600",
  "bg-sky-600",
  "bg-indigo-600",
  "bg-slate-600",
  "bg-red-600",
  "bg-purple-600",
  "bg-orange-600",
  "bg-yellow-600",
  "bg-cyan-600",
  "bg-fuchsia-600",
  "bg-pink-600",
  "bg-zinc-600",
  "bg-lime-600",
  "border-emerald-500",
  "border-violet-500",
  "border-blue-500",
  "border-amber-500",
  "border-rose-500",
  "border-green-500",
  "border-teal-500",
  "border-sky-500",
  "border-slate-500",
];

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: themeColorSafelist,
  theme: {
    extend: {
      fontFamily: {
        arabic: ["var(--font-arabic-uthmani)", "Scheherazade New", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      transitionDuration: {
        DEFAULT: "200ms",
      },
    },
  },
  plugins: [],
};

export default config;
