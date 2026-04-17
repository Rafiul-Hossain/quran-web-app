import Link from 'next/link';
import type { SurahMeta } from '@/lib/types';

export default function SurahCard({ surah }: { surah: SurahMeta }) {
  return (
    <Link
      href={`/surah/${surah.number}`}
      className="group flex items-center gap-4 p-4 bg-white rounded-xl border border-gold-200/70 hover:border-gold-400 hover:shadow-lg hover:-translate-y-0.5 transition-all"
    >
      <div className="relative flex-shrink-0 w-12 h-12 flex items-center justify-center">
        {/* Gold 8-point star badge behind the number */}
        <svg
          className="absolute inset-0 w-full h-full text-gold-400 group-hover:text-gold-500 transition-colors"
          viewBox="0 0 48 48"
          fill="currentColor"
          aria-hidden
        >
          <path d="M24 2 L29 19 L46 24 L29 29 L24 46 L19 29 L2 24 L19 19 Z" opacity="0.2" />
          <path
            d="M24 6 L28 20 L42 24 L28 28 L24 42 L20 28 L6 24 L20 20 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.5"
          />
        </svg>
        <span className="relative font-semibold text-brand-800">
          {surah.number}
        </span>
      </div>

      <div className="flex-grow min-w-0">
        <h3 className="font-semibold text-brand-800 truncate group-hover:text-brand-900">
          {surah.englishName}
        </h3>
        <p className="text-xs text-brand-600/70 truncate mt-0.5">
          {surah.englishNameTranslation} · {surah.numberOfAyahs} verses
        </p>
      </div>

      <div className="flex-shrink-0">
        <p
          dir="rtl"
          className="font-amiri text-2xl text-brand-800 leading-none"
        >
          {surah.name}
        </p>
      </div>
    </Link>
  );
}