import type { Surah, SurahMeta, SearchResult } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

async function apiGet<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    // Cache aggressively — Quran data is immutable
    next: { revalidate: false },
    ...init,
  });
  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${path}`);
  }
  const json = (await res.json()) as ApiResponse<T>;
  if (!json.status) {
    throw new Error(json.message || 'API returned error');
  }
  return json.data;
}

export async function getAllSurahs(): Promise<SurahMeta[]> {
  return apiGet<SurahMeta[]>('/api/v1/quran/surahs');
}

export async function getSurahById(id: number): Promise<Surah | null> {
  try {
    return await apiGet<Surah>(`/api/v1/quran/surahs/${id}`);
  } catch {
    return null;
  }
}

export async function searchAyahs(query: string): Promise<SearchResult[]> {
  const q = query.trim();
  if (q.length < 2) return [];
  const data = await apiGet<{ results: SearchResult[]; count: number }>(
    `/api/v1/quran/search?q=${encodeURIComponent(q)}`,
    // Search is dynamic — don't cache on the client
    { cache: 'no-store' }
  );
  return data.results;
}
