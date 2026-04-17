'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { searchAyahs } from '@/lib/quran';
import type { SearchResult } from '@/lib/types';
import SearchBar from '@/components/SearchBar';
import SearchResults from '@/components/SearchResults';
import OrnamentalDivider from '@/components/OrnamentalDivider';

function SearchPageInner() {
  const searchParams = useSearchParams();
  const query = (searchParams.get('q') ?? '').trim();
  const hasQuery = query.length >= 2;

  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!hasQuery) {
      setResults([]);
      setError(null);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    searchAyahs(query)
      .then((r) => {
        if (!cancelled) setResults(r);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message || 'Search failed');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [query, hasQuery]);

  return (
    <div>
      <div className="text-center mb-2">
        <p className="text-xs font-medium tracking-[0.3em] text-gold-600 uppercase mb-2">
          Explore
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-brand-800 mb-6">
          Search Verses
        </h1>
      </div>
      <SearchBar defaultValue={query} autoFocus />

      <OrnamentalDivider />

      <div className="mt-2">
        {!hasQuery ? (
          <p className="text-center text-brand-700/70 py-12">
            Type at least 2 characters to search the English translation.
          </p>
        ) : loading ? (
          <p className="text-center text-brand-700/70 py-12">Searching…</p>
        ) : error ? (
          <p className="text-center text-red-700 py-12">Error: {error}</p>
        ) : (
          <>
            <p className="text-sm text-brand-700/80 mb-4">
              Found <span className="font-semibold text-brand-800">{results.length}</span>{' '}
              {results.length === 1 ? 'result' : 'results'} for{' '}
              <span className="font-medium text-brand-800">&quot;{query}&quot;</span>
              {results.length >= 100 && ' (showing first 100)'}
            </p>
            <SearchResults results={results} query={query} />
          </>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-brand-800 mb-6 text-center">
            Search Verses
          </h1>
          <SearchBar />
        </div>
      }
    >
      <SearchPageInner />
    </Suspense>
  );
}