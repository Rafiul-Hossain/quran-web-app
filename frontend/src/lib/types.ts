export interface Ayah {
  number: number;
  numberInSurah: number;
  text: string;
  translation: string;
}

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
  ayahs: Ayah[];
}

export type SurahMeta = Omit<Surah, 'ayahs'>;

export interface SearchResult {
  surahNumber: number;
  surahName: string;
  surahEnglishName: string;
  surahEnglishNameTranslation: string;
  ayahNumber: number;
  ayahGlobalNumber: number;
  text: string;
  translation: string;
}

export type Theme = 'dark' | 'light';