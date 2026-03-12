"use client";

/** Icon type per theme – matches reference map legend (feather, heart, droplet, etc.) */
const THEME_ICONS: Record<string, "feather" | "heart" | "droplet" | "sun" | "flame" | "link-off" | "book" | "scroll" | "hourglass" | "circle"> = {
  revelation: "feather",
  tawhid: "heart",
  mercy: "droplet",
  hereafter: "sun",
  warning: "flame",
  disbelief: "link-off",
  guidance: "book",
  stories: "scroll",
  patience: "hourglass",
  faith: "heart",
  unity: "heart",
  battle: "flame",
  law: "book",
  war: "flame",
  spiritual: "sun",
  divine_support: "droplet",
  hypocrisy: "link-off",
  signs: "sun",
  judgment: "sun",
};

interface ThemeIconProps {
  theme: string;
  className?: string;
}

export default function ThemeIcon({ theme, className = "h-4 w-4" }: ThemeIconProps) {
  const icon = THEME_ICONS[theme] ?? "circle";

  const svgClass = `inline-block shrink-0 ${className}`;

  switch (icon) {
    case "feather":
      return (
        <svg className={svgClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M12 2L4 20M12 2l4 6M12 2l4-2M4 20l8-10M4 20l6-4" />
        </svg>
      );
    case "heart":
      return (
        <svg className={svgClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      );
    case "droplet":
      return (
        <svg className={svgClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        </svg>
      );
    case "sun":
      return (
        <svg className={svgClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      );
    case "flame":
      return (
        <svg className={svgClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M12 22c4-3 8-6 8-10a8 8 0 0 0-16 0c0 4 4 7 8 10z" />
          <path d="M12 22c-4-3-8-6-8-10a8 8 0 0 1 16 0c0 4-4 7-8 10z" />
        </svg>
      );
    case "link-off":
      return (
        <svg className={svgClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          <path d="M2 2l20 20" />
        </svg>
      );
    case "book":
      return (
        <svg className={svgClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          <path d="M8 7h8M8 11h8" />
        </svg>
      );
    case "scroll":
      return (
        <svg className={svgClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M8 3h8v14a4 4 0 0 1-8 0V3z" />
          <path d="M8 3a4 4 0 0 1 4 4v10" />
        </svg>
      );
    case "hourglass":
      return (
        <svg className={svgClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M5 3h14v4l-5 5 5 5v4H5v-4l5-5-5-5z" />
          <path d="M12 12l5-5" />
        </svg>
      );
    default:
      return (
        <svg className={svgClass} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <circle cx="12" cy="12" r="4" />
        </svg>
      );
  }
}
