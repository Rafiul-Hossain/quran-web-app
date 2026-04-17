/**
 * One-time data fetch script.
 * Downloads Arabic (Uthmani) + English (Sahih) from alquran.cloud,
 * merges them into a single JSON, and saves it to ../data/quran.json.
 * Also copies to ../../frontend/src/data/quran.json if that folder exists.
 */
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ARABIC_URL = 'https://api.alquran.cloud/v1/quran/quran-uthmani';
const ENGLISH_URL = 'https://api.alquran.cloud/v1/quran/en.sahih';

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Fetch failed: ${url} (${res.status})`);
  return res.json();
}

async function main() {
  console.log('→ Fetching Arabic (Uthmani)...');
  const arabic = await fetchJson(ARABIC_URL);

  console.log('→ Fetching English (Sahih International)...');
  const english = await fetchJson(ENGLISH_URL);

  console.log('→ Merging...');
  const surahs = arabic.data.surahs.map((surah, i) => ({
    number: surah.number,
    name: surah.name,
    englishName: surah.englishName,
    englishNameTranslation: surah.englishNameTranslation,
    numberOfAyahs: surah.numberOfAyahs,
    revelationType: surah.revelationType,
    ayahs: surah.ayahs.map((ayah, j) => ({
      number: ayah.number,
      numberInSurah: ayah.numberInSurah,
      text: ayah.text,
      translation: english.data.surahs[i].ayahs[j].text,
    })),
  }));

  const payload = JSON.stringify({ surahs });

  // Write to backend/data
  const backendDir = resolve(__dirname, '..', 'data');
  if (!existsSync(backendDir)) mkdirSync(backendDir, { recursive: true });
  writeFileSync(join(backendDir, 'quran.json'), payload);
  console.log(`✓ Saved backend/data/quran.json`);

  // If run from the monorepo, also populate frontend/src/data
  const frontendDir = resolve(__dirname, '..', '..', 'frontend', 'src', 'data');
  if (existsSync(resolve(__dirname, '..', '..', 'frontend'))) {
    if (!existsSync(frontendDir)) mkdirSync(frontendDir, { recursive: true });
    writeFileSync(join(frontendDir, 'quran.json'), payload);
    console.log(`✓ Saved frontend/src/data/quran.json`);
  }

  const totalAyahs = surahs.reduce((sum, s) => sum + s.ayahs.length, 0);
  console.log(`\nDone. ${surahs.length} surahs, ${totalAyahs} ayahs.`);
}

main().catch((err) => {
  console.error('✗ Error:', err.message);
  process.exit(1);
});
