import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = resolve(__dirname, '..', '..', '..', 'data', 'quran.json');

let cache = null;

function load() {
  if (cache) return cache;
  if (!existsSync(DATA_PATH)) {
    throw new Error(
      `Quran data not found at ${DATA_PATH}. Run "npm run fetch-data" first.`
    );
  }
  const raw = readFileSync(DATA_PATH, 'utf-8');
  cache = JSON.parse(raw).surahs;
  return cache;
}

export function getAllSurahs() {
  return load().map(({ ayahs, ...meta }) => meta);
}

export function getSurahById(id) {
  return load().find((s) => s.number === id) ?? null;
}

export function searchAyahs(query, limit = 100) {
  const q = query.toLowerCase().trim();
  if (q.length < 2) return [];

  const results = [];
  for (const surah of load()) {
    for (const ayah of surah.ayahs) {
      if (ayah.translation.toLowerCase().includes(q)) {
        results.push({
          surahNumber: surah.number,
          surahName: surah.name,
          surahEnglishName: surah.englishName,
          ayahNumber: ayah.numberInSurah,
          text: ayah.text,
          translation: ayah.translation,
        });
        if (results.length >= limit) return results;
      }
    }
  }
  return results;
}
