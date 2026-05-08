import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllSurahs, getSurahById } from '@/lib/quran';
import { AyahCard } from '@/components/AyahCard';
import { SurahAudioBar } from '@/components/SurahAudioBar';
import { SurahHeader } from '@/components/SurahHeader';


export const revalidate = false;

export async function generateStaticParams() {
  const surahs = await getAllSurahs();
  return surahs.map((s) => ({ id: String(s.number) }));
}

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props) {
  const surah = await getSurahById(Number(params.id));
  if (!surah) return { title: 'Not Found' };
  return {
    title: `${surah.number}. ${surah.englishName} — Quran`,
    description: `Read ${surah.englishName} (${surah.name}) — ${surah.numberOfAyahs} verses`,
  };
}

export default async function SurahPage({ params }: Props) {
  const id = Number(params.id);
  const surah = await getSurahById(id);
  if (!surah) notFound();

  const hasBismillah = surah.number !== 1 && surah.number !== 9;

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <SurahAudioBar ayahs={surah.ayahs} surahNumber={surah.number} />

      <div className="max-w-3xl mx-auto px-4 py-8">
        <SurahHeader surah={surah} />

        {hasBismillah && (
          <div className="bismillah-text mb-8 py-4">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>
        )}

        <div className="space-y-4">
          {surah.ayahs.map((ayah) => (
            <AyahCard key={ayah.numberInSurah} ayah={ayah} surahNumber={surah.number} />
          ))}
        </div>

        {/* Prev / Next */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
          {surah.number > 1 ? (
            <Link
              href={`/surah/${surah.number - 1}`}
              className="flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Previous Surah
            </Link>
          ) : <div />}

          <Link href="/" className="text-xs text-text-muted hover:text-accent transition-colors">
            All Surahs
          </Link>

          {surah.number < 114 ? (
            <Link
              href={`/surah/${surah.number + 1}`}
              className="flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors"
            >
              Next Surah
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  );
}