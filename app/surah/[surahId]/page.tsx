import Link from "next/link";
import { notFound } from "next/navigation";
import SurahHeader from "@/components/SurahHeader";
import ThemeLegend from "@/components/ThemeLegend";
import AyahMap from "@/components/AyahMap";
import { getSurahData } from "@/lib/surah";
import { getUniqueThemeColorMapping } from "@/lib/theme-colors";

interface SurahPageProps {
  params: { surahId: string };
}

export default async function SurahPage({ params }: SurahPageProps) {
  const { surahId } = params;
  const id = parseInt(surahId, 10);
  if (Number.isNaN(id) || id < 1 || id > 114) notFound();

  const surah = await getSurahData(id);
  if (!surah) notFound();

  const themes = Array.from(new Set(surah.ayahs.map((a) => a.theme)));
  const colorMapping = getUniqueThemeColorMapping(themes, surah.colorMapping ?? undefined);

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-8 md:px-10 md:py-10">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 rounded-lg border border-slate-200/80 bg-white px-3 py-2 text-sm font-medium text-slate-600 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-800"
      >
        ← Back to surahs
      </Link>
      <SurahHeader surah={surah} />
      <section className="mb-8">
        <ThemeLegend themes={themes} colorMapping={colorMapping} />
      </section>
      <section>
        <AyahMap
          surahId={surah.surahId}
          totalAyahs={surah.totalAyahs ?? surah.ayahs.length}
          ayahs={surah.ayahs}
          colorMapping={colorMapping}
        />
      </section>
    </main>
  );
}
