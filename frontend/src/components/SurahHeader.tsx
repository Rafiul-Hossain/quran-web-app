import type { Surah } from '@/lib/types';

export function SurahHeader({ surah }: { surah: Surah }) {
  return (
    <div className="relative overflow-hidden rounded-2xl mb-8 border border-border bg-bg-card">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none select-none">
        <svg viewBox="0 0 400 200" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          {Array.from({ length: 8 }).map((_, i) =>
            Array.from({ length: 4 }).map((_, j) => (
              <polygon
                key={`${i}-${j}`}
                points={`${i*56},${j*56} ${i*56+28},${j*56-28} ${i*56+56},${j*56} ${i*56+28},${j*56+28}`}
                fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gold"
              />
            ))
          )}
        </svg>
      </div>
      <div className="relative px-6 py-8 text-center">
        <h1 className="font-amiri text-gold mb-3 leading-none" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }} dir="rtl">
          {surah.name}
        </h1>
        <p className="text-xl font-semibold text-text-primary">{surah.englishName}</p>
        <p className="text-sm text-text-secondary mt-0.5 mb-4">{surah.englishNameTranslation}</p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {[['📍', surah.revelationType], ['📖', `${surah.numberOfAyahs} Verses`], ['🔢', `Surah ${surah.number}`]].map(([icon, label]) => (
            <span key={label} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-icon-bg border border-border text-xs font-medium text-text-secondary">
              {icon} {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}