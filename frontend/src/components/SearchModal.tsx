'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { useSettings } from '@/context/SettingsContext';
import { searchAyahs } from '@/lib/quran';
import type { SearchResult } from '@/lib/types';

export function SearchModal() {
  const { isSearchOpen, closeSearch } = useSettings();
  const [query, setQuery]     = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (isSearchOpen) { setTimeout(() => inputRef.current?.focus(), 50); }
    else { setQuery(''); setResults([]); }
  }, [isSearchOpen]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') closeSearch(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [closeSearch]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    clearTimeout(timerRef.current);
    if (val.trim().length < 2) { setResults([]); setLoading(false); return; }
    setLoading(true);
    timerRef.current = setTimeout(async () => {
      const r = await searchAyahs(val.trim(), 50);
      setResults(r); setLoading(false);
    }, 300);
  }, []);

  if (!isSearchOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-40 animate-fadeIn" onClick={closeSearch} />
      <div className="fixed top-[10%] left-1/2 -translate-x-1/2 w-full max-w-2xl mx-auto z-50 flex flex-col max-h-[75vh] bg-bg-card border border-border rounded-2xl shadow-2xl animate-fadeIn overflow-hidden">
        {/* Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5 text-text-muted flex-shrink-0">
            <circle cx="11" cy="11" r="7" /><path strokeLinecap="round" d="M21 21l-4.35-4.35" />
          </svg>
          <input ref={inputRef} type="text" value={query} onChange={handleChange}
            placeholder="Search ayahs in Arabic or English..."
            className="flex-1 bg-transparent text-text-primary placeholder:text-text-muted focus:outline-none text-base" />
          {loading && (
            <svg className="w-4 h-4 text-accent animate-spin flex-shrink-0" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          )}
          <button onClick={closeSearch} className="text-text-muted hover:text-text-primary text-sm px-2 py-1 rounded border border-border">Esc</button>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto">
          {results.length > 0 && (
            <ul>
              {results.map((r, i) => (
                <li key={i} className="border-b border-border last:border-0">
                  <Link href={`/surah/${r.surahNumber}#ayah-${r.ayahNumber}`} onClick={closeSearch}
                    className="block px-5 py-4 hover:bg-icon-bg transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-accent">
                        {r.surahNumber}. {r.surahEnglishName}
                        <span className="text-text-muted ml-1">· Ayah {r.ayahNumber}</span>
                      </span>
                      <span className="text-xs text-text-muted font-amiri" dir="rtl">{r.surahName}</span>
                    </div>
                    <p dir="rtl" className="text-right text-gold font-amiri text-lg leading-relaxed mb-1.5">
                      {r.text.length > 100 ? r.text.slice(0, 100) + '…' : r.text}
                    </p>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      <Highlight text={r.translation} query={query} />
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {!loading && query.length >= 2 && results.length === 0 && (
            <div className="flex flex-col items-center py-12 text-text-muted">
              <p className="text-sm">No results for &ldquo;{query}&rdquo;</p>
            </div>
          )}
          {query.length < 2 && (
            <div className="flex flex-col items-center py-12 text-text-muted">
              <p className="text-sm">Type at least 2 characters to search</p>
            </div>
          )}
        </div>

        {results.length > 0 && (
          <div className="px-5 py-2.5 border-t border-border text-xs text-text-muted">
            {results.length} result{results.length !== 1 ? 's' : ''} found
          </div>
        )}
      </div>
    </>
  );
}

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-accent/20 text-accent rounded px-0.5">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}