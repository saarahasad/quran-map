# Qur'an Ayah Map

Visual interactive ayah map for each surah of the Qur'an. Built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

## Architecture

- **Routing**: Dynamic route `/surah/[surahId]` — each surah has its own page (e.g. `/surah/7`).
- **Data**: Surah content is loaded from JSON files under `data/surah/{surahId}.json`. One file per surah (1–114).
- **Structure**: App is scalable for all 114 surahs; add a JSON file for a surah to make it available.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React 18

## Folder Structure

```
quran-map/
├── app/
│   ├── layout.tsx          # Root layout (fonts, metadata)
│   ├── page.tsx            # Home: list/links to surahs
│   ├── globals.css         # Tailwind + base styles
│   ├── not-found.tsx       # 404 page
│   └── surah/
│       └── [surahId]/
│           └── page.tsx    # Surah page (header + legend + ayah map)
├── components/
│   ├── SurahHeader.tsx     # Surah name (AR/EN), "Surah X · Name", thesis, gist bullets
│   ├── ThemeLegend.tsx     # Theme legend: icon + label row (uppercase)
│   ├── ThemeIcon.tsx       # Per-theme SVG icons (feather, heart, droplet, etc.)
│   ├── AyahMap.tsx         # Journey (default) / timeline / map / cluster + nav bar
│   ├── AyahCircle.tsx      # Single ayah card (grid/cluster: number, keywords, summary)
│   ├── JourneyAyahCard.tsx # Journey view: circle number, translation highlights, theme tag
│   ├── TimelineAyahCard.tsx # Timeline: full ayah, translation, highlights, tafsir, flow
│   ├── MapAyahNode.tsx     # Map/Cluster node (circle, summary, theme)
│   └── AyahModal.tsx       # Modal: full ayah, translation, summary, theme
├── data/
│   └── surah/
│       ├── 7.json          # Al-A'raf (basic format)
│       ├── 8.json          # Al-Anfal (extended: colorMapping, gist)
│       ├── 9.json          # At-Tawbah (extended: primaryThemes, colorMapping)
│       ├── 10.json         # Jonah / Yunus (109 ayahs, extended)
│       ├── 11.json         # Hud (120 ayahs, extended)
│       ├── 85.json         # Al-Buruj / The Mansions of the Stars (22 ayahs)
│       ├── 86.json         # At-Tariq / The Nightcomer (17 ayahs)
│       ├── 87.json         # Al-A'la / The Most High (19 ayahs)
│       ├── 67.json         # Al-Mulk / The Sovereignty (30 ayahs; Juz 29; tafsir from lecture transcript)
│       ├── 68.json         # Al-Qalam / The Pen (52 ayahs; Juz 29)
│       ├── 69.json         # Al-Haaqqa / The Inevitable (52 ayahs; Juz 29)
│       ├── 70.json         # Al-Ma'arij / The Ascending Stairways (44 ayahs; Juz 29)
│       ├── 71.json         # Nuh / Noah (28 ayahs; Juz 29)
│       ├── 72.json         # Al-Jinn / The Jinn (28 ayahs; Juz 29)
│       ├── 73.json         # Al-Muzzammil / The Enwrapped (20 ayahs; Juz 29)
│       ├── 74.json         # Al-Muddaththir / The Cloaked One (56 ayahs; Juz 29)
│       ├── 75.json         # Al-Qiyamah / The Resurrection (40 ayahs; Juz 29)
│       ├── 76.json         # Al-Insan / The Man (31 ayahs; Juz 29)
│       ├── 77.json         # Al-Mursalat / The Emissaries (50 ayahs; Juz 29)
│       ├── 91.json         # Ash-Shams / The Sun (15 ayahs; detailed tafseer, tazkiyatun nafs, Thamūd)
│       ├── 92.json         # Al-Layl / The Night (21 ayahs)
│       ├── 93.json         # Ad-Duha / The Morning Hours (11 ayahs)
│       └── 94.json         # Ash-Sharh / The Relief (1 ayah in data; full surah 8)
├── lib/
│   ├── types.ts            # Ayah, SurahData, WordHighlight, Keyword types
│   ├── ayah.ts             # getWordHighlights(ayah)
│   ├── highlight-text.ts   # getHighlightSegments() for inline word highlighting
│   ├── theme-colors.ts     # Theme → Tailwind class + labels
│   ├── surah.ts            # getSurahData(surahId), SURAH_IDS
│   └── surah-metadata.ts   # SURAH_METADATA: ayah count + juz for each surah (1–114)
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
├── package.json
└── quran-map.md            # This file
```

## Database / Data Schema

There is no database. All content is file-based JSON.

### Surah metadata (`lib/surah-metadata.ts`)

Static metadata for all 114 surahs:

| Field | Type | Description |
|-------|------|-------------|
| `ayahs` | number | Total number of verses in the surah |
| `juz` | string | Juz number(s), e.g. `"29"` or `"8–9"` when spanning multiple juz |

Used on the home page to display Juz and ayah count for each surah.

### Surah JSON schema (`data/surah/{surahId}.json`)

**Required**

| Field | Type | Description |
|-------|------|-------------|
| `surahId` | number | 1–114 |
| `surahNameArabic` | string | Arabic name |
| `surahNameEnglish` | string | English name |
| `thesis` | string | One-line thesis |
| `ayahs` | Ayah[] | Array of ayah objects |

**Optional (extended format, e.g. surahs 8 & 9)**

| Field | Type | Description |
|-------|------|-------------|
| `gist` | string[] | 5–6 bullet summary points |
| `primaryThemes` | string[] | Alternative to `gist` (e.g. surah 9) |
| `revelationType` | string | e.g. "Madani", "Makki" |
| `totalAyahs` | number | Total ayah count |
| `colorMapping` | Record<string, string> | Per-surah theme → color name (e.g. `"faith"` → `"emerald"`). Color names: emerald, red, blue, orange, purple, yellow, gray, teal. |

### Ayah object

**Required**

| Field | Type | Description |
|-------|------|-------------|
| `ayahNumber` | number | Ayah index in surah |
| `arabic` | string | Full Arabic text |
| `translation` | string | English translation |
| `summary` | string | Short summary |
| `theme` | string | Theme key (e.g. `tawhid`, `faith`, `unity`) |
| `wordHighlights` | WordHighlight[] | **Preferred.** Important words that help understand the ayah: pairs `{ arabic, translation }` (no fixed limit). Use `getWordHighlights(ayah)` in code so legacy `keywords` is supported. |

**Optional**

| Field | Type | Description |
|-------|------|-------------|
| `keywords` | Keyword[] | **Deprecated.** Use `wordHighlights`. Kept for backward compat (surahs 7, 8, 9). |
| `cluster` | string | Section/cluster name (e.g. "Spoils & Unity") |
| `intensity` | number | Theme intensity 1–4 |
| `tafsirSummary` | string | Tafsir Ibn Kathir–style wholesome summary of the ayah |
| `lessonReflection` | string | Lesson or reflection (tafsir-informed) |
| `beforeThisAyah` | string | "Before this ayah…" — narrative/thematic flow leading to this verse (tafsir-informed) |
| `afterThisAyah` | string | "After this ayah…" — where the passage goes next (tafsir-informed) |

### WordHighlight (important words for the ayah)

| Field | Type | Description |
|-------|------|-------------|
| `arabic` | string | Arabic word or phrase |
| `translation` | string | Corresponding English translation for quick visual matching |

### Theme keys and colors (`lib/theme-colors.ts`)

Each theme has a distinct color for the legend and map:

- `tawhid` → emerald
- `hereafter` → amber
- `prophet_story` → blue
- `law` → amber
- `war` → rose
- `mercy` → teal
- `warning` → orange
- `spiritual` → indigo
- `faith` → green
- `battle` → red
- `unity` → sky
- `divine_support` → violet
- `hypocrisy` → slate
- `revelation` → purple
- `signs` → cyan
- `guidance` → lime
- `disbelief` → zinc
- `stories` → fuchsia
- `patience` → pink
- `judgment` → yellow  

(Unknown themes fall back to slate.)

## Features

- **Home page**: Surah list with Arabic/English names, Juz number, and ayah count. Card-style layout with hover states.
- **Surah header**: "Surah X · English Name" style, Arabic name, thesis, 5-point gist. Optional theme legend below.
- **Theme legend**: Horizontal row of **colored circles** (no symbols) + uppercase labels (e.g. REVELATION, TAWHID, MERCY). Each theme gets a **unique color** (no repeats) via `getUniqueThemeColorMapping` in `lib/theme-colors.ts`.
- **View modes**: **Journey** (default), **Timeline**, **Map**, **Cluster**.
- **Journey view** (map-style UI): Verses as cards along a winding path. Each card shows: circled ayah number (theme-colored), English translation with important words bolded, theme tag + icon. "Jump to ayah" nav bar (surah:ayah input, prev/next, of N). Golden dotted path and soft gradient sky + mountain silhouettes background. Uses `JourneyAyahCard` and `map-journey-bg` / `journey-path-line` in `globals.css`.
- **Timeline view**: Vertical journey, one full-width card per ayah. Same "Jump to ayah" nav; scrolls to ayah on change. Each card: full Arabic and translation with highlights; tafsir summary and lesson; before/after flow. Uses `TimelineAyahCard` and `lib/highlight-text.ts`.
- **Map view**: Grid (columns = themes, rows = ayah order); circles with summary text; dashed connectors between ayahs in sequence; click to expand full card. Circle size fits content.
- **Cluster view**: Themes as sections; each ayah is a **circle** (same as Map). Circle **size scales by ayah number** (early ayahs smaller, later larger). Click a circle to open the ayah modal. **Surah-at-a-glance**: theme distribution bar and theme flow.
- **Ayah circle**: Used in Map and Cluster; summary text inside; hover/click opens modal. `MapAyahNode` supports `totalAyahs` + `compact` for cluster.
- **Modal**: Full ayah, translation, word pairs, tafsir summary, lesson, before/after flow.
- **Performance**: Dynamic import of surah JSON; lightweight CSS transitions.

## Running the app

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Use “Al-A'raf (Surah 7)” to open the example surah page.

## Adding more surahs

Add a JSON file at `data/surah/{surahId}.json` following the schema above. The surah will be available at `/surah/{surahId}`. You can add a link on the home page in `app/page.tsx` or generate the list from available files.
