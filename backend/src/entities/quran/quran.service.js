import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let cachedData   = null;
let surahOffsets = null;

function getData() {
  if (!cachedData) {
    const filePath = path.join(__dirname, '../../../data/quran.json');
    cachedData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }
  return cachedData;
}

function getSurahOffsets() {
  if (!surahOffsets) {
    surahOffsets = {};
    let running = 1;
    for (const s of getData().surahs) {
      surahOffsets[s.number] = running;
      running += s.numberOfAyahs;
    }
  }
  return surahOffsets;
}

export const getAllSurahs = () =>
  getData().surahs.map(({ ayahs, ...meta }) => meta);

export const getSurahById = (id) =>
  getData().surahs.find((s) => s.number === id) || null;

export const searchAyahs = (query, limit = 100) => {
  if (!query || query.trim().length < 2) return [];
  const q = query.toLowerCase().trim();
  const results = [];
  for (const surah of getData().surahs) {
    for (const ayah of surah.ayahs) {
      if (ayah.translation.toLowerCase().includes(q) || ayah.text.includes(query)) {
        results.push({
          surahNumber: surah.number,
          surahName: surah.name,
          surahEnglishName: surah.englishName,
          surahEnglishNameTranslation: surah.englishNameTranslation,
          ayahNumber: ayah.numberInSurah,
          ayahGlobalNumber: (getSurahOffsets()[surah.number] ?? 1) + ayah.numberInSurah - 1,
          text: ayah.text,
          translation: ayah.translation,
        });
        if (results.length >= limit) return results;
      }
    }
  }
  return results;
};
