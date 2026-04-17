import { getAllSurahs } from '@/lib/quran';
import SurahCard from '@/components/SurahCard';
import SearchBar from '@/components/SearchBar';
import OrnamentalDivider from '@/components/OrnamentalDivider';

export default async function HomePage() {
  const surahs = await getAllSurahs();

  return (
    <div>
      <section className="text-center py-8 md:py-12 mb-4">
        <p className="text-xs font-medium tracking-[0.3em] text-gold-600 uppercase mb-3">
          Bismillah
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-brand-800 mb-2 tracking-tight">
          Al-Quran Kareem
        </h1>
        <p className="text-brand-700/70 mb-8 max-w-lg mx-auto">
          Read, explore, and search the 114 surahs of the Holy Quran
        </p>
        <SearchBar />
      </section>

      <OrnamentalDivider />

      <section>
        <div className="flex items-baseline justify-between mb-5">
          <h2 className="text-xl md:text-2xl font-semibold text-brand-800">
            All Surahs
          </h2>
          <span className="text-sm text-gold-700 font-medium">
            {surahs.length} chapters
          </span>
        </div>
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {surahs.map((surah) => (
            <SurahCard key={surah.number} surah={surah} />
          ))}
        </div>
      </section>
    </div>
  );
}