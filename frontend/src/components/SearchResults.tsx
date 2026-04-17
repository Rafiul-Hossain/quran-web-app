'use client';

import Link from 'next/link';
import { useSettings } from '@/context/SettingsContext';
import { getFontClass } from '@/lib/constants';
import type { SearchResult } from '@/lib/types';

interface Props {
  results: SearchResult[];
  query: string;
}

export default function SearchResults({ results, query }: Props) {
  const { settings } = useSettings();
  const fontClass = getFontClass(settings.arabicFont);

  if (results.length === 0) {
    return (
      <p className="text-center text-brand-700/70 py-12">
        No verses matched <span className="font-medium text-brand-800">&quot;{query}&quot;</span>.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {results.map((r, i) => (
        <li key={`${r.surahNumber}-${r.ayahNumber}-${i}`}>
          <Link
            href={`/surah/${r.surahNumber}#ayah-${r.ayahNumber}`}
            className="block bg-white rounded-xl border border-gold-200/70 p-4 hover:border-gold-400 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gold-700 font-semibold">
                {r.surahEnglishName} · {r.surahNumber}:{r.ayahNumber}
              </span>
              <span
                dir="rtl"
                className={`text-brand-800 text-sm ${fontClass}`}
              >
                {r.surahName}
              </span>
            </div>
            <p
              dir="rtl"
              className={`text-right text-brand-900 mb-2 ${fontClass}`}
              style={{
                fontSize: `${Math.min(settings.arabicFontSize, 28)}px`,
                lineHeight: 2,
              }}
            >
              {r.text}
            </p>
            <p
              className="text-brand-800/85 leading-relaxed"
              style={{ fontSize: `${settings.translationFontSize}px` }}
            >
              <Highlight text={r.translation} query={query} />
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function Highlight({ text, query }: { text: string; query: string }) {
  const q = query.trim();
  if (q.length < 2) return <>{text}</>;
  const parts = text.split(new RegExp(`(${escapeRegex(q)})`, 'gi'));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === q.toLowerCase() ? (
          <mark key={i} className="bg-gold-200 text-brand-900 px-0.5 rounded">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}