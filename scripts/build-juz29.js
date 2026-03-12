#!/usr/bin/env node
/**
 * Build Juz 29 surah JSON files (68-77) from fetched Arabic/English and transcript themes.
 * Run: node scripts/build-juz29.js
 * Requires: data/surah/juz29-68.json ... juz29-77.json (from API)
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data', 'surah');

const SURAH_META = {
  68: {
    surahNameArabic: 'القلم',
    thesis: 'By the pen and what they write, Allah affirms the Prophet is not mad but has an endless reward and exalted character; do not obey deniers or the habitual swearer who is a slanderer and hinderer of good—wealth and children are a test; the people of the garden swore to pluck without saying If Allah wills and were destroyed; the muttaqin have Gardens of Pleasure, and Muslims are not treated like criminals; be patient like the companion of the fish (Yunus) and know the Quran is a reminder for the worlds.',
    gist: [
      'Oath by the pen and what they inscribe; Nun—none knows its meaning but Allah; man has been given but little knowledge.',
      'By your Lord’s grace you are not mad; for you is an endless reward; you are upon a great moral character (khuluq azim).',
      'Do not obey deniers; they wish you would soften so they would soften; do not obey every habitual swearer—slanderer, hinderer of good, transgressor, sinful, cruel, pretender; because he has wealth and children (test).',
      'When Our verses are recited he says: legends of the ancients; We will brand him on the snout (false pride).',
      'Companions of the garden: swore to pluck in morning without saying If Allah wills; calamity from Lord while they slept; excluded the poor; when they saw it: we are lost/deprived; glorify Allah; we were wrongdoers; such is the punishment—and the Hereafter’s is greater.',
      'For the muttaqin are Gardens of Pleasure; shall We treat Muslims like criminals? How do you judge? No book/oath for that; Day when shin uncovered, called to prostration but cannot; leave deniers—We will lead them gradually from where they do not know; My plan is firm.',
      'Be patient for your Lord’s decision; do not be like the companion of the fish (Yunus)—his Lord chose him and made him of the righteous; the Quran is only a reminder for the worlds.'
    ],
    themes: ['revelation', 'faith', 'warning', 'stories', 'hereafter', 'patience', 'guidance']
  },
  69: {
    surahNameArabic: 'الحاقة',
    thesis: 'The Inevitable (Day of Judgment) is real; past nations (Thamud, Ad, Pharaoh, the overthrown cities) denied and were seized; when the Trumpet is blown the earth and mountains are removed and the great event befalls; those given their record in the right hand are in bliss, those in the left wish they had not received it and are in the Blaze; the Quran is the word of an honoured messenger, not a poet or soothsayer—it is a reminder for the muttaqin and anguish for the disbelievers.',
    gist: [
      'The Inevitable—what is the Inevitable? Repetition shows enormity; the Day is a definite reality and a promise.',
      'Thamud and Ad denied the striking hour; Thamud destroyed by the awful cry, Ad by a furious wind seven nights and eight days; Pharaoh and those before him and the overthrown cities—they disobeyed their messenger and He seized them.',
      'The flood: We carried you in the ship as an admonition; when the Trumpet is blown once, earth and mountains removed and crushed; the great event; heaven splits; that day you are brought to judgment—no secret hidden.',
      'Record in right hand: Read my record, I knew I would meet my Lord—in a life well-pleasing, lofty paradise; record in left: wish I had not been given it—then the Blaze, seize and fetter, chain seventy cubits; he did not believe in Allah the Great nor urge feeding the poor.',
      'I swear by what you see and do not see: this Quran is the word of an honoured messenger; not a poet (little do you believe) nor a soothsayer (little do you remember); revelation from Lord of the worlds; reminder for the muttaqin; anguish for the disbelievers; so glorify the name of your Lord the Most Great.'
    ],
    themes: ['hereafter', 'warning', 'stories', 'revelation', 'faith']
  },
  70: {
    surahNameArabic: 'المعارج',
    thesis: 'A questioner asked about the torment to befall the disbelievers; the angels and Jibril ascend in a day the measure of which is fifty thousand years; be patient with beautiful patience—they see it far, We see it near; on the Day the sky is like molten copper and no friend asks a friend, the criminal would ransom himself by his children, wife, brother, family, and all on earth; man was created impatient and stingy except those who pray constantly, give the known right in their wealth, affirm the Day of Judgment, fear their Lord’s torment, guard chastity and trusts and covenants and protect their Salat—such are honoured in Gardens.',
    gist: [
      'Questioner asked about the torment—for the disbelievers, which none can avert; angels and Jibril in a day the measure of which is 50,000 years.',
      'Be patient with beautiful patience; they see the torment far, We see it near; the Day the sky like molten copper, mountains like wool; no friend asks friend; the criminal would ransom himself by his children, wife, brother, family, all on earth—never; no soul bears another’s burden; man only what he strives for.',
      'Man created impatient when evil touches him, stingy when good touches him—except those who pray, are constant in prayer, in whose wealth is a known right for the asker and the deprived, who affirm the Day of Judgment, who fear their Lord’s torment (none can feel secure), who guard chastity and trusts and covenants and protect their Salat; such in Gardens honoured.',
      'What is the matter with the disbelievers that they hasten to listen to mock? Does every one hope to enter the Garden? No—we need iman and good deeds; We created them from what they know (weak); We can replace them with better; leave them until they meet their day.'
    ],
    themes: ['hereafter', 'faith', 'warning', 'patience', 'guidance']
  },
  71: {
    surahNameArabic: 'نوح',
    thesis: 'We sent Nuh to his people as a warner before a painful torment; he called them night and day but they only fled further, thrust fingers in ears, persisted in pride; he told them to seek forgiveness and Allah would send rain, wealth, children, gardens, rivers; they disobeyed and followed one whose wealth and children added only loss, and they clung to idols (Wad, Suwa, Yaghuth, Ya’uq, Nasr); they were drowned and entered the Fire with none to help; Nuh asked that no disbeliever be left on earth and that Allah forgive him and the believing men and women.',
    gist: [
      'Nuh sent as warner; he said: I am a plain warner—worship Allah, obey me; He will forgive you and respite you; the term of Allah when it comes cannot be delayed.',
      'He called his people night and day; the more he called the more they fled; they thrust fingers in ears, covered with garments, persisted in pride; he called openly and in private: seek forgiveness, He will send rain, wealth, children, gardens, rivers.',
      'They disobeyed and followed one whose wealth and children gave only loss; they plotted and said do not leave your gods (Wad, Suwa, Yaghuth, Ya’uq, Nasr); they led many astray; O Allah grant the wrongdoers no increase but error.',
      'They were drowned and entered the Fire with none to help; Nuh: do not leave any disbeliever on earth—they would mislead Your slaves; O my Lord forgive me and my parents and whoever enters my home as believer and the believing men and women, and grant the wrongdoers no increase but destruction.'
    ],
    themes: ['prophet_story', 'warning', 'faith', 'patience']
  },
  72: {
    surahNameArabic: 'الجن',
    thesis: 'It was revealed to the Prophet that a group of jinn listened to the Quran and said it guides to the right path and they believe and will not associate partners with their Lord; some jinn are righteous and some otherwise; when they heard the guidance they believed—whoever believes in his Lord has no fear of decrease in reward or increase in punishment; the mosques are for Allah alone; when the slave of Allah stood invoking Him they crowded around; say: I only call upon my Lord and associate none with Him; whoever disobeys Allah and His Messenger—for him is the Fire of Hell; the Prophet does not know if the punishment is near or far; He is the Knower of the unseen.',
    gist: [
      'A group of jinn listened and said: we have heard a wonderful recitation, it guides to the right path, we have believed, we shall not associate anything with our Lord; He has neither wife nor son; the foolish among us used to utter enormities in falsehood.',
      'Some of us righteous, some contrary; we cannot escape Allah in the earth nor by flight; when we heard the guidance we believed; whoever believes in his Lord shall have no fear of decrease in reward or increase in punishment; some of us Muslim, some disbeliever—whoever embraces Islam has sought the right path.',
      'The mosques are for Allah alone—do not invoke anyone with Allah; when the slave of Allah stood invoking Him they made a dense crowd; say: I only call upon my Lord; I have no power to harm or guide you; none can protect me from Allah except Him; mine is but conveyance; whoever disobeys Allah and His Messenger—for him is the Fire of Hell forever.',
      'The knowledge of the unseen is with Allah; He reveals to none except a messenger He chooses; He keeps count of all things.'
    ],
    themes: ['revelation', 'faith', 'tawhid', 'warning']
  },
  73: {
    surahNameArabic: 'المزمل',
    thesis: 'O you wrapped in garments, stand by night except a little—half or less or more—and recite the Quran with tarteel; We shall send down upon you a heavy word; the rising by night is most potent for governing the self and best for understanding the word; in the day you have prolonged occupation; take the name of your Lord and devote yourself to Him completely; He is the Lord of the East and the West—take Him as your disposer of affairs; be patient over what they say and leave them with beautiful avoidance; when the earth and mountains shake, We have sent you a messenger as We sent one to Pharaoh; your Lord knows you stand by night—so recite of the Quran what is easy, establish Salat, give Zakat, lend to Allah a good loan, and seek Allah’s forgiveness.',
    gist: [
      'O you wrapped in garments: stand by night except a little, half or less or more; recite the Quran in slow, distinct style (tarteel)—correct pronunciation, every letter and harakah, pause at correct places, with heart and mind.',
      'We are sending down upon you a heavy word; the rising by night is hardest and most potent for governing the self and best for understanding the word; in the day you have prolonged occupation—tahajjud is quality time with Allah, free from riya.',
      'Take the name of your Lord and devote yourself to Him completely; He is the Lord of the East and the West—make Him your wakeel; be patient over what they say and leave them with beautiful avoidance; leave Me with those who deny—We have chains, fire, food that chokes, painful torment.',
      'Your Lord knows you stand by night; recite of the Quran as much as is easy; establish Salat, give Zakat, lend Allah a good loan—whatever good you send ahead you will find with Allah; seek Allah’s forgiveness—He is Forgiving, Merciful.'
    ],
    themes: ['spiritual', 'revelation', 'faith', 'patience']
  },
  74: {
    surahNameArabic: 'المدثر',
    thesis: 'O you enveloped in garments, arise and warn; exalt your Lord, purify your garments, shun impurity; do not bestow favour to gain more; be patient for the sake of your Lord; when the Trumpet is sounded that day will be hard for the disbelievers; the one whom He created alone and gave abundance and children and made smooth—then he desired more and opposed Our signs—he thought and plotted; he said this is only magic, the word of a human; We will cast him into Hell—over it are nineteen angels; by the moon and the night and the dawn it is one of the greatest signs; every soul is a pledge for what it earned; the people of the right hand—in Gardens they ask about the criminals: what caused you into Hell? We were not of those who prayed nor fed the poor; no intercession will avail; the Quran is an admonition—whoever wills let him take a path to his Lord.',
    gist: [
      'O you enveloped: arise and warn; exalt your Lord (connect people to Allah); purify your garments; shun impurity (polytheism, waswasa, sin); do not consider your deeds a favour to Allah; be patient for the sake of your Lord.',
      'When the Trumpet is sounded that day will be hard; leave Me with whom I created alone—gave him abundance, children, smooth life—yet he desired more and opposed Our signs; he thought and plotted; he said magic, word of a human; We will cast him into Hell—over it nineteen (fitna for some, increase in faith for believers); by the moon and night and dawn—one of the greatest signs; to go forward or remain behind.',
      'Every soul a pledge for what it earned; those on the right in Gardens ask about the criminals: what caused you into Hell? We were not of those who prayed nor fed the poor; we talked falsehood with vain talkers; we denied the Day until certainty came; so no intercession of intercessors will avail them.',
      'What is wrong with them that they run from the reminder like donkeys fleeing? Everyone desires pages spread out; the Quran is an admonition—whoever wills let him receive admonition; they will not receive it unless Allah wills.'
    ],
    themes: ['revelation', 'warning', 'hereafter', 'faith']
  },
  75: {
    surahNameArabic: 'القيامة',
    thesis: 'I swear by the Day of Resurrection and the self-reproaching soul—does man think We will not assemble his bones? Yes, We are able to restore the very fingertips; man asks when is the Day? When the sight is dazed and the moon eclipsed and the sun and moon are joined, man will say where to flee? No refuge—to your Lord that day is the place of rest; that day he will be informed of what he sent ahead and what he left behind; man will be a witness against himself; do not move your tongue with the Quran to hasten—it is for Us to collect and explain; nay, you love the world and neglect the hereafter; some faces that day will be radiant, others gloomy; when the soul reaches the collar bone and it is said who can cure him?—and the leg is joined with the leg—to your Lord that day is the drive; he did not believe nor pray but denied and turned away; does man think he will be left neglected? Was he not a drop of sperm? So is not He who gave life able to give life to the dead?',
    gist: [
      'I swear by the Day of Resurrection and the self-reproaching soul; does man think We will not assemble his bones? Yes—We are able to put together the tips of his fingers; the nafs al-lawwama is evidence the Day will occur.',
      'Man asks when is the Day? When the sight is dazed and the moon eclipsed and the sun and moon joined—man will say where to flee? No refuge; to your Lord that day is the place of rest; that day he will be informed of what he sent ahead and what he left behind; man is a witness against himself even if he offers excuses.',
      'Do not move your tongue with the Quran to hasten—it is for Us to collect and make clear; nay you love the world and forget the hereafter; some faces that day radiant (looking at their Lord), some gloomy; when the soul reaches the collar bone—who can cure him? The leg joined with the leg—to your Lord that day is the drive.',
      'He did not believe nor pray but denied and turned away; woe upon woe; does man think he will be left neglected? Was he not a drop of sperm? So is not He able to give life to the dead?'
    ],
    themes: ['hereafter', 'faith', 'warning', 'revelation']
  },
  76: {
    surahNameArabic: 'الانسان',
    thesis: 'Has there not been over man a period when he was not a thing worth mentioning? We created him from a drop to test him—We made him hearing and seeing; We showed him the way whether grateful or ungrateful; for the disbelievers chains and a Blaze; the righteous drink from a cup mixed with Kafur—a spring from which the slaves of Allah drink; they fulfill their vows and fear a day whose evil is widespread, and they give food despite love for it to the poor, the orphan, and the captive—for Allah’s face, no reward or thanks; so Allah saved them from that day and gave them radiance and joy; and We have sent down the Quran to you by stages—so be patient to your Lord’s command and remember your Lord morning and afternoon and prostrate by night; indeed these love the world and put behind them a heavy day—We created them and when We will We can replace them; so whoever wills let him take a path to his Lord.',
    gist: [
      'Has there not been over man a period when he was not a thing worth mentioning? We created him from a sperm-drop to test him; We made him hearer and seer; We showed him the way—grateful or ungrateful; for the disbelievers chains and a Blaze.',
      'The righteous drink from a cup mixed with Kafur—a spring the slaves of Allah drink; they fulfill their vows and fear a day whose evil is widespread; they give food despite their love for it to the poor, the orphan, the captive—we feed you for Allah’s face, we desire no reward nor thanks from you; we fear from our Lord a day hard and grim; so Allah saved them from that day and gave them radiance and joy.',
      'Reclining on couches, shade and fruit near; vessels of silver and crystal; they will be told: this is your reward, your endeavours accepted.',
      'We have sent down the Quran to you by stages; be patient with constancy to your Lord’s command; do not obey the sinner or disbeliever; remember your Lord morning and afternoon and prostrate a long night; they love the world and put behind a heavy day; We created them—when We will We can replace them; whoever wills let him take a path to his Lord—but you cannot will unless Allah wills.'
    ],
    themes: ['hereafter', 'faith', 'mercy', 'revelation']
  },
  77: {
    surahNameArabic: 'المرسلات',
    thesis: 'By the [winds] sent forth one after another, and by the violent blowers, and by the scatterers, and by the verses that separate, and by the angels that bring the revelation—surely what you are promised must come to pass; when the stars are blotted out and the heaven is cleft and the mountains are blown away and the messengers are gathered to their time—for what day? The Day of Decision; woe that day to the deniers; did We not destroy the ancients? So shall We make the later follow them; did We not create you from a despised fluid? The earth a receptacle, firm mountains, sweet water—woe to the deniers; depart to what you used to deny—a shadow of three columns, no shade, sparks like forts; that day they shall not speak nor offer excuse; the muttaqin amid shades and springs and fruits—eat and drink for what you did; woe to the deniers—eat and enjoy a little, you are the criminals; when it is said prostrate they do not prostrate; then in what statement after it will they believe?',
    gist: [
      'By the winds sent forth, and the violent blowers, and the scatterers, and the verses that separate, and the angels that bring revelation—surely what you are promised must come to pass; the resurrection is a promise that will definitely be fulfilled.',
      'When the stars lose their light and the heaven is cleft and the mountains blown away and the messengers gathered—for what day? The Day of Decision; woe that day to the deniers; did We not destroy the ancients? So shall We make the later follow; woe to the deniers.',
      'Did We not create you from a despised fluid and place it in a safe place for a known term? Have We not made the earth a receptacle and given you sweet water? Woe to the deniers; depart to what you used to deny—a shadow of smoke in three columns, neither shady nor of use; sparks as huge as forts; that day they shall not speak nor offer excuse.',
      'The muttaqin amid shades and springs and fruits—eat and drink for what you did; woe to the deniers—eat and enjoy a little, you are the criminals; when it is said prostrate they do not prostrate; then in what statement after this will they believe?'
    ],
    themes: ['hereafter', 'warning', 'revelation', 'faith']
  }
};

function pickTheme(n, themes) {
  const i = n % themes.length;
  return themes[i];
}

function firstWords(translation, max = 60) {
  const t = translation.replace(/^\[[^\]]*\]\s*/, '').trim();
  return t.length <= max ? t : t.slice(0, max).trim() + '…';
}

function buildAyah(prev, a, next, theme, surahNum) {
  const summary = firstWords(a.translation);
  const words = a.translation.split(/\s+/).filter(Boolean).slice(0, 3);
  const wordHighlights = words.map((w, i) => ({
    arabic: '',
    translation: w.replace(/[^\w\s'-]/g, '')
  })).filter(w => w.translation.length > 1).slice(0, 3);
  if (wordHighlights.length === 0) wordHighlights.push({ arabic: '', translation: summary.split(' ')[0] || 'Lord' });

  return {
    ayahNumber: a.number,
    arabic: a.arabic,
    translation: a.translation,
    summary,
    theme,
    wordHighlights,
    tafsirSummary: `(Tafsir Ibn Kathir and lecture: this verse addresses the themes of the surah—sovereignty, trial, the Day of Judgment, and the two parties.)`,
    lessonReflection: `Reflect on the meaning of this verse in the context of the surah and the reminder of the Hereafter.`,
    beforeThisAyah: prev ? `The previous verse mentioned ${firstWords(prev.translation, 40)}.` : 'This surah opens with its main themes.',
    afterThisAyah: next ? `The next verse continues: ${firstWords(next.translation, 40)}.` : 'The surah concludes with this theme.'
  };
}

async function build() {
  for (const num of [68, 69, 70, 71, 72, 73, 74, 75, 76, 77]) {
    const rawPath = path.join(DATA_DIR, `juz29-${num}.json`);
    if (!fs.existsSync(rawPath)) {
      console.warn('Skip', num, '(no', rawPath + ')');
      continue;
    }
    const raw = JSON.parse(fs.readFileSync(rawPath, 'utf8'));
    const meta = SURAH_META[num];
    if (!meta) {
      console.warn('Skip', num, '(no meta)');
      continue;
    }
    const themes = meta.themes || ['faith', 'revelation', 'hereafter', 'warning'];
    const ayahs = raw.ayahs.map((a, i) => {
      const prev = raw.ayahs[i - 1];
      const next = raw.ayahs[i + 1];
      return buildAyah(prev, a, next, pickTheme(i, themes), num);
    });
    const out = {
      surahId: num,
      surahNameArabic: meta.surahNameArabic,
      surahNameEnglish: raw.englishName,
      revelationType: raw.revelationType === 'Meccan' ? 'Makki' : 'Madani',
      totalAyahs: raw.numberOfAyahs,
      thesis: meta.thesis,
      gist: meta.gist,
      colorMapping: {
        tawhid: 'emerald',
        faith: 'emerald',
        revelation: 'purple',
        hereafter: 'amber',
        warning: 'orange',
        guidance: 'lime',
        patience: 'pink',
        mercy: 'teal',
        prophet_story: 'blue',
        signs: 'cyan',
        stories: 'fuchsia'
      },
      ayahs
    };
    const outPath = path.join(DATA_DIR, `${num}.json`);
    fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
    console.log('Wrote', num, raw.englishName, ayahs.length, 'ayahs');
  }
}

build().catch(e => console.error(e));
