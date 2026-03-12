import Link from "next/link";
import { SURAH_METADATA } from "@/lib/surah-metadata";

const AVAILABLE_SURAHS = [
  { id: 7, arabic: "الأعراف", english: "Al-A'raf" },
  { id: 8, arabic: "الأنفال", english: "Al-Anfal" },
  { id: 9, arabic: "التوبة", english: "At-Tawbah" },
  { id: 10, arabic: "يونس", english: "Jonah" },
  { id: 11, arabic: "هود", english: "Hud" },
  { id: 67, arabic: "المُلك", english: "Al-Mulk" },
  { id: 68, arabic: "القلم", english: "Al-Qalam" },
  { id: 69, arabic: "الحاقة", english: "Al-Haaqqa" },
  { id: 70, arabic: "المعارج", english: "Al-Ma'arij" },
  { id: 71, arabic: "نوح", english: "Nuh" },
  { id: 72, arabic: "الجن", english: "Al-Jinn" },
  { id: 73, arabic: "المزمل", english: "Al-Muzzammil" },
  { id: 74, arabic: "المدثر", english: "Al-Muddaththir" },
  { id: 75, arabic: "القيامة", english: "Al-Qiyamah" },
  { id: 76, arabic: "الانسان", english: "Al-Insan" },
  { id: 77, arabic: "المرسلات", english: "Al-Mursalat" },
  { id: 85, arabic: "البروج", english: "The Mansions of the Stars" },
  { id: 86, arabic: "الطارق", english: "The Nightcomer" },
  { id: 87, arabic: "الأعلى", english: "The Most High" },
  { id: 91, arabic: "الشمس", english: "The Sun" },
  { id: 92, arabic: "الليل", english: "The Night" },
  { id: 93, arabic: "الضحى", english: "The Morning Hours" },
  { id: 94, arabic: "الشرح", english: "The Relief" },
] as const;

export default function HomePage() {
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-12">
      <header className="mb-14 text-center">
        <h1 className="font-arabic text-4xl font-bold tracking-tight text-slate-800 md:text-5xl">
          Qur&apos;an Ayah Map
        </h1>
        <p className="mt-3 text-lg text-slate-600">
          Visual interactive ayah map for each surah
        </p>
      </header>

      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xl shadow-slate-200/40 ring-1 ring-slate-900/5">
        <div className="border-b border-slate-200/80 bg-gradient-to-b from-amber-50/40 via-slate-50/60 to-white px-6 py-5">
          <h2 className="text-xl font-semibold text-slate-800">Surahs</h2>
          <p className="mt-1.5 text-sm text-slate-500">
            Surahs with JSON data in{" "}
            <code className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-slate-600">
              data/surah/
            </code>
          </p>
        </div>

        <ul className="divide-y divide-slate-100 p-4">
          {AVAILABLE_SURAHS.map(({ id, arabic, english }) => {
            const meta = SURAH_METADATA[id];
            const ayahs = meta?.ayahs ?? 0;
            const juz = meta?.juz ?? "—";

            return (
              <li key={id}>
                <Link
                  href={`/surah/${id}`}
                  className="group flex items-center justify-between gap-4 rounded-xl px-4 py-3.5 transition-colors hover:bg-amber-50/70"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm font-semibold text-slate-600">
                      {id}
                    </span>
                    <div className="min-w-0">
                      <span className="block font-arabic text-lg font-medium text-slate-800">
                        {arabic}
                      </span>
                      <span className="block truncate text-sm text-slate-600">
                        {english}
                      </span>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="rounded-md bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-800">
                      Juz {juz}
                    </span>
                    <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                      {ayahs} ayahs
                    </span>
                    <span className="text-slate-400 transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
