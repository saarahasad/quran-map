#!/usr/bin/env node
/**
 * Enhances data/surah/10.json with:
 * - wordHighlights only (merged from keywords; expanded with important terms). No keywords field.
 * - tafsirSummary, lessonReflection, beforeThisAyah, afterThisAyah
 */
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const path = join(root, "data/surah/10.json");

const data = JSON.parse(readFileSync(path, "utf8"));

/** Common important terms (Arabic in verse → translation) to add when they appear in the ayah */
const COMMON_TERMS = [
  ["ٱللَّهُ", "Allah"],
  ["ٱللَّهِ", "Allah"],
  ["رَبِّ", "Lord"],
  ["رَبُّكُمْ", "your Lord"],
  ["رَبَّنَا", "our Lord"],
  ["ٱلْكِتَـٰبِ", "the Book"],
  ["ٱلْقُرْءَانُ", "the Qur'an"],
  ["ءَايَـٰت", "signs"],
  ["ءَايَـٰتُ", "verses"],
  ["ٱلْحَقُّ", "the truth"],
  ["ٱلْحَقِّ", "the truth"],
  ["ٱلنَّاسَ", "mankind"],
  ["ٱلنَّاسُ", "people"],
  ["ٱلْمُؤْمِنِينَ", "the believers"],
  ["ٱلْكَـٰفِرُونَ", "disbelievers"],
  ["ٱلْأَرْضِ", "the earth"],
  ["ٱلسَّمَـٰوَٰتِ", "the heavens"],
  ["وَٱلْأَرْضَ", "and the earth"],
  ["ٱلصَّلَوٰةَ", "prayer"],
  ["عَذَابَ", "punishment"],
  ["رَحْمَةًۭ", "mercy"],
  ["رَحْمَتِهِۦ", "His mercy"],
  ["ٱلْجَنَّةِ", "Paradise"],
  ["ٱلنَّارُ", "the Fire"],
  ["يَوْمَ ٱلْقِيَـٰمَةِ", "Day of Resurrection"],
  ["مَرْجِعُكُمْ", "your return"],
  ["رُسُلَنَا", "Our messengers"],
  ["رَّسُولٌۭ", "messenger"],
  ["وَٱلنَّهَارَ", "and the day"],
  ["ٱلَّيْلَ", "the night"],
  ["ٱلشَّمْسَ", "the sun"],
  ["ٱلْقَمَرَ", "the moon"],
  ["يَهْدِى", "guides"],
  ["ٱهْتَدَىٰ", "is guided"],
  ["صِرَٰطٍۢ مُّسْتَقِيمٍۢ", "straight path"],
  ["ٱلصَّـٰلِحَـٰتِ", "righteous deeds"],
  ["يُؤْمِنُ", "believes"],
  ["ءَامَنُوا۟", "believed"],
  ["يَعْبُدُونَ", "they worship"],
  ["فَٱعْبُدُوهُ", "so worship Him"],
  ["خَلَقَ", "created"],
  ["يُحْىِۦ", "gives life"],
  ["يُمِيتُ", "causes death"],
  ["ٱلْغَيْبُ", "the unseen"],
  ["كَذَّبُوا۟", "they denied"],
  ["ٱلظَّـٰلِمِينَ", "wrongdoers"],
  ["ٱلْمُجْرِمُونَ", "criminals"],
  ["شُرَكَآءَ", "partners"],
  ["أَوْحَىٰٓ", "revealed"],
  ["يُوحَىٰٓ", "is revealed"],
  ["أَنذِرِ", "warn"],
  ["تَعْقِلُونَ", "reason"],
  ["يَتَّقُونَ", "fear (Allah)"],
  ["تَتَّقُونَ", "fear Him"],
  ["ٱلْوَعْدُ", "the promise"],
  ["أَجَلٌ", "term"],
  ["أَجَلُهُمْ", "their term"],
  ["ٱلْمُسْلِمِينَ", "those who submit"],
  ["ٱلْمُسْلِمِينَ", "Muslims"],
  ["دَعَوُا۟ ٱللَّهُ", "they call upon Allah"],
  ["تَوَكَّلْتُ", "I relied"],
  ["تَوَكَّلُوٓا۟", "rely"],
  ["بَنِىٓ إِسْرَٰٓءِيلَ", "Children of Israel"],
  ["فِرْعَوْنَ", "Pharaoh"],
  ["مُّوسَىٰ", "Moses"],
  ["نُوحٍ", "Noah"],
  ["ٱلْفُلْكِ", "the ship"],
  ["ٱلْبَحْرَ", "the sea"],
];

function getInitialHighlights(a) {
  if (a.wordHighlights && a.wordHighlights.length > 0) return [...a.wordHighlights];
  if (a.keywords && Array.isArray(a.keywords))
    return a.keywords.map((k) => ({ arabic: k.word, translation: k.meaning }));
  return [];
}

function expandWordHighlights(ayah) {
  const existing = getInitialHighlights(ayah);
  const seen = new Set(existing.map((p) => p.arabic));
  const arabic = ayah.arabic || "";
  for (const [ar, en] of COMMON_TERMS) {
    if (seen.has(ar)) continue;
    if (arabic.includes(ar)) {
      existing.push({ arabic: ar, translation: en });
      seen.add(ar);
    }
  }
  return existing;
}

/** Shorten translation to one clear phrase for weaving into the summary (max ~80 chars). */
function verseGist(translation) {
  if (!translation) return "";
  const t = translation.replace(/\[[^\]]*\]/g, "").trim();
  if (t.length <= 85) return t;
  const first = t.split(/[.;]/)[0].trim();
  if (first.length <= 85) return first;
  const cut = first.slice(0, 82);
  const lastSpace = cut.lastIndexOf(" ");
  const out = lastSpace > 50 ? cut.slice(0, lastSpace) : cut;
  return out + "...";
}

/** Flowing, reflective tafsir summary: translation + Ibn Kathir–inspired meaning in easy English. */
function flowingTafsirSummary(ayah) {
  const gist = verseGist(ayah.translation);
  const t = ayah.theme;
  const open = gist ? `The verse tells us: ${gist}. ` : "";
  const themes = {
    revelation: `${open}This is the voice of the wise Book—clear, purposeful, and meant for you. It comes to warn the heedless and to give good news to those who believe. What we do with it is the choice that defines us.`,
    tawhid: `${open}Your Lord is the One who created the heavens and the earth and holds every matter in His hand. No one can intercede except by His leave. So He alone deserves your worship—and the verse gently asks: will you not remember?`,
    hereafter: `${open}Everyone returns to Him; His promise is true. Those who believed and did good will be rewarded with justice; those who turned away will face a painful reckoning. It is a call to live with that return in mind.`,
    signs: `${open}In the turn of night and day, and in all He has made in the heavens and the earth, there are signs for those who reflect and fear Him. Creation itself is an invitation to see and to be grateful.`,
    warning: `${open}Those who never hoped to meet Him and were content with this world alone will find the Fire their abode. Past nations were destroyed when they wronged and rejected their messengers. The same choice is before us now.`,
    guidance: `${open}Allah invites to the Home of Peace and guides whom He wills to a straight path. Our part is to listen, to use our reason, and not to follow mere guesswork. The path is clear for those who seek it.`,
    disbelief: `${open}Those who invent lies about Allah or deny His signs will not succeed. They stay in their transgression until the Hour comes. The verse leaves us with a sober truth: denial does not change what is true.`,
    mercy: `${open}For those who believe and fear Him there are good tidings in this life and the next. His words do not change. So we are invited to rejoice in His bounty and mercy—rather than in what we pile up in the world.`,
    stories: `${open}The story is a mirror: those who heeded the messengers and relied on Allah were saved; those who denied met a bitter end. We are asked to take the lesson to heart, not just to hear it.`,
    patience: `${open}All strength and honour belong to Allah. The Prophet is told not to be grieved by what people say—he is not responsible for their rejection. We are called to rely on Him and to wait with patience until He judges; He is the best of judges.`,
    judgment: `${open}Allah does not wrong anyone; people wrong themselves. On the Day of Gathering each soul will answer for what it did. The verse is a reminder: our choices here are the script we bring to that day.`,
    faith: `${open}Those who believed and feared Allah receive good tidings in this life and the next. His promise to them does not change. It is a picture of what the heart can hold when it turns to Him in sincerity.`,
  };
  let out = (themes[t] || `${open}The verse carries a meaning that calls for reflection and a response.`).trim();
  out = out.replace(/\s+/g, " ").replace(/\s+\./g, ".");
  if (out.includes(".. ")) out = out.replace(/\.\.\s+/g, ". ");
  return out;
}

/** Deeper lesson: one reflective sentence that goes beyond the surface. */
function deeperLesson(ayah) {
  const t = ayah.theme;
  const lessons = {
    revelation: "What you do with what was revealed today is what you will have when it matters most.",
    tawhid: "Worship is not a ritual alone—it is the heart finally turning to the only One who is worthy of it.",
    hereafter: "The Return is not a myth; it is the moment every choice you made will stand before you without excuse.",
    signs: "The world is full of His signs; the real question is whether we slow down enough to see them and let them change us.",
    warning: "Comfort in this life can blind us to the meeting that awaits; the verse asks us to wake before the wake-up is forced.",
    guidance: "Guidance is a gift; to follow conjecture when the path is clear is to choose confusion over clarity.",
    disbelief: "Lying about Allah or denying His signs does not alter the truth—it only seals the heart.",
    mercy: "His mercy is greater than what we accumulate; to rejoice in it is to find a peace the world cannot give.",
    stories: "The past is not just history—it is a warning and a promise: the same God saves those who turn to Him and holds to account those who refuse.",
    patience: "When people reject, the soul can rest only in one place: reliance on the One whose judgment is perfect and whose timing is wise.",
    judgment: "We do not wrong Allah when we sin—we wrong ourselves; the Day will make that plain to every soul.",
    faith: "Belief and God-consciousness are not just ideas—they are the roots of a life that receives good tidings here and forever.",
  };
  return lessons[t] || "Let this verse settle in your heart; then let it shape what you do next.";
}

function beforeAfter(ayahs, i) {
  const prev = i > 0 ? ayahs[i - 1] : null;
  const next = i < ayahs.length - 1 ? ayahs[i + 1] : null;
  let before = "This opens the surah.";
  let after = "The surah continues with related themes.";
  if (prev) {
    if (prev.theme === "revelation" && ayahs[i].theme === "revelation")
      before = "Before this ayah, the surah established that revelation came to a man from among the people.";
    else if (prev.theme === "tawhid") before = "Before this ayah, Allah’s lordship and right to worship were stated.";
    else if (prev.theme === "hereafter") before = "Before this ayah, the outcome of the believers and disbelievers was described.";
    else if (prev.theme === "warning") before = "Before this ayah, a warning or description of the rejecters was given.";
    else if (prev.theme === "stories") before = "Before this ayah, part of the story of the prophets was related.";
    else before = `Before this ayah, the passage spoke of ${prev.theme} and the previous theme.`;
  }
  if (next) {
    if (next.theme === "hereafter") after = "After this ayah, the passage turns to the Hereafter and recompense.";
    else if (next.theme === "revelation") after = "After this ayah, the surah continues with the theme of revelation and the Book.";
    else if (next.theme === "stories") after = "After this ayah, the narrative of the prophets continues.";
    else if (next.theme === "tawhid") after = "After this ayah, tawhid and the rejection of shirk are emphasised.";
    else after = `After this ayah, the surah continues with the theme of ${next.theme}.`;
  } else after = "This closes the surah’s passage here.";
  return { before, after };
}

const ayahs = data.ayahs;
for (let i = 0; i < ayahs.length; i++) {
  const a = ayahs[i];
  a.wordHighlights = expandWordHighlights(a);
  a.tafsirSummary = flowingTafsirSummary(a);
  a.lessonReflection = deeperLesson(a);
  const { before, after } = beforeAfter(ayahs, i);
  a.beforeThisAyah = before;
  a.afterThisAyah = after;
  delete a.keywords;
}

writeFileSync(path, JSON.stringify(data, null, 2), "utf8");
console.log("Enhanced", ayahs.length, "ayahs: flowing tafsir summaries and deeper lessons written to data/surah/10.json");
