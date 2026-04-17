import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllSurahs, getSurahById } from '@/lib/quran';
import AyahCard from '@/components/AyahCard';
import OrnamentalDivider from '@/components/OrnamentalDivider';

interface PageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  const surahs = await getAllSurahs();
  return surahs.map((s) => ({ id: String(s.number) }));
}

export async function generateMetadata({ params }: PageProps) {
  const surah = await getSurahById(Number(params.id));
  if (!surah) return { title: 'Surah not found' };
  return {
    title: `Surah ${surah.englishName} · Al-Quran Kareem`,
    description: `${surah.englishName} (${surah.englishNameTranslation}) — ${surah.numberOfAyahs} verses`,
  };
}

export default async function SurahPage({ params }: PageProps) {
  const id = Number(params.id);
  const surah = await getSurahById(id);
  if (!surah) notFound();

  const prev = id > 1 ? id - 1 : null;
  const next = id < 114 ? id + 1 : null;

  // Surah 9 (At-Tawba) does not begin with Bismillah
  const showBismillah = id !== 9;

  return (
    <div>
      <nav className="mb-4 flex items-center justify-between text-sm">
        <Link
          href="/"
          className="text-brand-700 hover:text-gold-600 transition-colors font-medium"
        >
          ← All Surahs
        </Link>
        <div className="flex gap-2">
          {prev && (
            <Link
              href={`/surah/${prev}`}
              className="px-3 py-1 rounded-md border border-gold-300 text-brand-700 hover:bg-gold-50 transition-colors"
            >
              ← {prev}
            </Link>
          )}
          {next && (
            <Link
              href={`/surah/${next}`}
              className="px-3 py-1 rounded-md border border-gold-300 text-brand-700 hover:bg-gold-50 transition-colors"
            >
              {next} →
            </Link>
          )}
        </div>
      </nav>

      {/* Surah header with pattern background */}
      <header className="relative overflow-hidden text-center py-10 mb-6 bg-gradient-to-br from-brand-700 via-brand-800 to-brand-900 text-white rounded-2xl shadow-xl ring-1 ring-gold-400/30">
        <div className="absolute inset-0 bg-islamic-pattern opacity-70" />
        <div className="relative">
          <p className="text-xs text-gold-300 uppercase tracking-[0.3em] mb-2">
            Surah {surah.number}
          </p>
          <h1
            dir="rtl"
            className="text-5xl md:text-6xl font-amiri font-bold my-4 text-white drop-shadow"
          >
            {surah.name}
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-gold-100">
            {surah.englishName}
          </h2>
          <p className="text-sm text-gold-200/80 italic mt-1">
            {surah.englishNameTranslation}
          </p>
          <div className="mt-5 flex items-center justify-center gap-2 text-xs">
            <span className="bg-gold-400/20 border border-gold-300/40 text-gold-100 px-3 py-1 rounded-full">
              {surah.numberOfAyahs} verses
            </span>
            <span className="bg-gold-400/20 border border-gold-300/40 text-gold-100 px-3 py-1 rounded-full">
              {surah.revelationType}
            </span>
          </div>
        </div>
      </header>

      {/* Bismillah ornamental block */}
      {showBismillah && (
        <div className="text-center mb-6">
          <p
            dir="rtl"
            className="font-amiri text-2xl md:text-3xl text-brand-800"
          >
            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </p>
          <OrnamentalDivider className="!my-4" />
        </div>
      )}

      <div className="space-y-3">
        {surah.ayahs.map((ayah) => (
          <AyahCard key={ayah.number} ayah={ayah} />
        ))}
      </div>
    </div>
  );
}