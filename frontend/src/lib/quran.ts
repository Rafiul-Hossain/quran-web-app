import type { Surah, SurahMeta, SearchResult } from './types';
import quranData from '@/data/quran.json';

const surahs: Surah[] = (quranData as { surahs: Surah[] }).surahs;

// Pre-compute global ayah offsets once
const surahStartNumbers: Record<number, number> = {};
let running = 1;
for (const s of surahs) {
  surahStartNumbers[s.number] = running;
  running += s.numberOfAyahs;
}

export function getGlobalAyahNumber(surahNumber: number, ayahNumberInSurah: number): number {
  return (surahStartNumbers[surahNumber] ?? 1) + ayahNumberInSurah - 1;
}

export async function getAllSurahs(): Promise<SurahMeta[]> {
  return surahs.map(({ ayahs, ...meta }) => meta);
}

export async function getSurahById(id: number): Promise<Surah | null> {
  return surahs.find((s) => s.number === id) ?? null;
}

export async function searchAyahs(query: string, limit = 100): Promise<SearchResult[]> {
  const q = query.toLowerCase().trim();
  if (q.length < 2) return [];

  const results: SearchResult[] = [];
  for (const surah of surahs) {
    for (const ayah of surah.ayahs) {
      if (ayah.translation.toLowerCase().includes(q) || ayah.text.includes(query)) {
        results.push({
          surahNumber: surah.number,
          surahName: surah.name,
          surahEnglishName: surah.englishName,
          surahEnglishNameTranslation: surah.englishNameTranslation,
          ayahNumber: ayah.numberInSurah,
          ayahGlobalNumber: getGlobalAyahNumber(surah.number, ayah.numberInSurah),
          text: ayah.text,
          translation: ayah.translation,
        });
        if (results.length >= limit) return results;
      }
    }
  }
  return results;
}