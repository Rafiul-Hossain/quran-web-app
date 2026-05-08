import type { Surah, SurahMeta, SearchResult } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002';

export async function getAllSurahs(): Promise<SurahMeta[]> {
  const res = await fetch(`${API_URL}/api/v1/quran/surahs`, {
    next: { revalidate: false },
  });
  if (!res.ok) throw new Error('Failed to fetch surahs');
  const json = await res.json();
  return json.data as SurahMeta[];
}

export async function getSurahById(id: number): Promise<Surah | null> {
  const res = await fetch(`${API_URL}/api/v1/quran/surahs/${id}`, {
    next: { revalidate: false },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to fetch surah ${id}`);
  const json = await res.json();
  return json.data as Surah;
}

export async function searchAyahs(query: string, limit = 50): Promise<SearchResult[]> {
  if (query.trim().length < 2) return [];
  const res = await fetch(
    `${API_URL}/api/v1/quran/search?q=${encodeURIComponent(query)}&limit=${limit}`
  );
  if (!res.ok) return [];
  const json = await res.json();
  return json.data.results as SearchResult[];
}