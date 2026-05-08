import Link from 'next/link';
import { getAllSurahs } from '@/lib/quran';

export const revalidate = false;

export default async function HomePage() {
  const surahs = await getAllSurahs();

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-border px-6 py-14 text-center bg-bg-secondary">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none">
          <svg viewBox="0 0 800 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            {Array.from({ length: 20 }).map((_, i) =>
              Array.from({ length: 8 }).map((_, j) => (
                <polygon
                  key={`${i}-${j}`}
                  points={`${i*45},${j*45} ${i*45+22},${j*45-22} ${i*45+45},${j*45} ${i*45+22},${j*45+22}`}
                  fill="none" stroke="#d4aa55" strokeWidth="0.8"
                />
              ))
            )}
          </svg>
        </div>

        <div className="relative max-w-xl mx-auto">
          <p className="font-amiri text-gold text-4xl mb-2 leading-relaxed" dir="rtl">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
          <p className="text-text-muted text-sm mb-6">
            In the name of Allah, the Most Gracious, the Most Merciful
          </p>
          <h1 className="text-3xl font-bold text-text-primary mb-2">The Holy Quran</h1>
          <p className="text-text-secondary text-sm">
            114 Surahs · 6,236 Verses · Saheeh International Translation
          </p>
        </div>
      </div>

      {/* Surah grid */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-text-muted mb-5">
          All Surahs
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {surahs.map((surah) => (
            <Link
              key={surah.number}
              href={`/surah/${surah.number}`}
              className="group flex items-center gap-3 p-4 rounded-xl bg-bg-card border border-border hover:border-accent transition-all duration-200 hover:shadow-lg"
            >
              <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg bg-icon-bg text-sm font-semibold text-text-secondary group-hover:bg-accent group-hover:text-[#0f1117] transition-all">
                {surah.number}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-text-primary text-sm truncate">{surah.englishName}</p>
                <p className="text-xs text-text-muted truncate">
                  {surah.englishNameTranslation} · {surah.numberOfAyahs} verses
                </p>
              </div>
              <span className="text-gold font-amiri text-xl flex-shrink-0" dir="rtl">
                {surah.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}