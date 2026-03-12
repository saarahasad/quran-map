#!/usr/bin/env node
/**
 * Fetches Tafsir Ibn Kathir from Alim.org for Surah 10 and writes an exact
 * summary per ayah (no fixed intros). Uses URL pattern:
 *   https://www.alim.org/quran/tafsir/ibn-kathir/surah/10/{ayah}/
 * Run: node scripts/fetch-ibn-kathir-surah10.mjs
 * Requires network access.
 */
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const path = join(root, "data/surah/10.json");

const data = JSON.parse(readFileSync(path, "utf8"));
const ayahs = data.ayahs;

const BASE = "https://www.alim.org/quran/tafsir/ibn-kathir/surah/10";
const DELAY_MS = 900;

const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function stripHtml(html) {
  if (!html || typeof html !== "string") return "";
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, " ")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .replace(/&\w+;|&#\d+;/g, " ")
    .trim();
}

/** Find where the actual Ibn Kathir commentary starts (skip nav/chrome). */
function findTafsirStart(text) {
  const markers = [
    /The isolated letters\s/i,
    /This indicates that these are verses/i,
    /Allah said[:\s]/i,
    /Allah rebukes/i,
    /These are the verses/i,
    /It is He who/i,
    /Say,?\s/i,
    /(?:Moses|Noah|Pharaoh|Ibn)\s+(?:said|reported)/i,
    /Scholars have (?:differed|said)/i,
    /(?:He|Allah)\s+(?:also tells|tells)/i,
    /(?:So|Thus)\s+(?:Allah|We)/i,
    /(?:This means|This is) that/i,
    /(?:The|Their)\s+(?:reward|call|refuge)/i,
    /(?:When|So when)\s+(?:they|Allah|the)/i,
    /(?:We|Allah)\s+(?:had already|sent|saved)/i,
    /(?:Indeed|Verily),?\s+(?:those|Allah|your)/i,
  ];
  for (const re of markers) {
    const m = text.match(re);
    if (m && m.index !== undefined) return m.index;
  }
  return -1;
}

/** Remove Arabic verse markers and tidy spacing for easier reading. */
function cleanForReading(text) {
  if (!text) return "";
  let out = text
    // Remove ﴿Arabic﴾ and keep following (English) as-is
    .replace(/﴿[^﴾]*﴾\s*/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\s+\./g, ".")
    .replace(/\s+,/g, ",")
    .replace(/\s*\)\s*/g, ") ")
    .trim();
  return out;
}

/** Take first meaningful segment of tafsir, clean it, and add paragraph breaks for readability. */
function summarizeTafsirText(raw) {
  if (!raw || raw.length < 60) return "";
  let text = raw;
  const start = findTafsirStart(text);
  if (start >= 0) text = text.slice(start);
  const maxLen = 520;
  const stopPhrases = [
    "Related Islamic Resources",
    "pageType",
    "Loading Comments",
    "Please wait",
    "Close menu",
    "Back arrow",
  ];
  for (const phrase of stopPhrases) {
    const i = text.indexOf(phrase);
    if (i >= 0 && i < maxLen * 2) text = text.slice(0, i);
  }
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text.slice(0, maxLen)];
  let out = "";
  let len = 0;
  for (const s of sentences) {
    const t = s.trim();
    if (!t || t.length < 20) continue;
    if (len + t.length > maxLen && out.length > 0) break;
    out += (out ? " " : "") + t;
    len += t.length;
  }
  let result = (out || text.slice(0, maxLen)).trim();
  result = cleanForReading(result);
  // Add paragraph break every 2 sentences for easier reading (only between full sentences)
  const parts = (result.match(/[^.!?]+[.!?]+/g) || [result]).map((s) => s.trim()).filter((s) => s.length > 25);
  const grouped = [];
  for (let i = 0; i < parts.length; i += 2) {
    const pair = parts.slice(i, i + 2).join(" ").trim();
    if (pair) grouped.push(pair);
  }
  result = grouped.join("\n\n");
  result = result.replace(/\n\n\s*\)/g, " )").trim();
  const looksLikeTafsir =
    result.length >= 80 &&
    (/Allah|Qur'an|verses|Lord|believers|disbelievers|reward|punishment/i.test(result) ||
      /said|means|indicates|explains/i.test(result)) &&
    !/Close menu|Please wait\.\.\./i.test(result);
  return looksLikeTafsir ? result : "";
}

async function fetchPage(pageNum) {
  const url = `${BASE}/${pageNum}/`;
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": USER_AGENT, Accept: "text/html" },
    });
    if (!res.ok) return null;
    const html = await res.text();
    const text = stripHtml(html);
    return summarizeTafsirText(text);
  } catch (e) {
    console.warn(`Fetch failed for ${url}:`, e.message);
    return null;
  }
}

async function main() {
  // Alim groups: page 1 = ayah 1–2, page 3 = 3–4, …, page 109 = 109 only
  const pages = [];
  for (let i = 1; i <= 109; i += 2) pages.push(i);

  for (let idx = 0; idx < pages.length; idx++) {
    const pageNum = pages[idx];
    const summary = await fetchPage(pageNum);
    const ayahIndex1 = pageNum - 1;
    const ayahIndex2 = pageNum;

    if (summary) {
      ayahs[ayahIndex1].tafsirSummary = summary;
      if (ayahIndex2 < 109) ayahs[ayahIndex2].tafsirSummary = summary;
    }

    const label =
      ayahIndex2 < 109 ? `ayah ${pageNum}-${pageNum + 1}` : `ayah ${pageNum}`;
    console.log(`${label}: ${summary ? "OK" : "skip"}`);
    await delay(DELAY_MS);
  }

  writeFileSync(path, JSON.stringify(data, null, 2), "utf8");
  console.log("Updated data/surah/10.json with Ibn Kathir summaries (exact, no fixed intros).");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
