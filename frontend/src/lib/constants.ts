export interface FontOption {
  id: string;
  label: string;
  className: string;
  preview: string;
}

export const ARABIC_FONTS: FontOption[] = [
  { id: 'amiri',        label: 'Amiri',            className: 'font-amiri',        preview: 'بِسْمِ اللَّهِ' },
  { id: 'scheherazade', label: 'Scheherazade New',  className: 'font-scheherazade', preview: 'بِسْمِ اللَّهِ' },
  { id: 'noto-naskh',   label: 'Noto Naskh Arabic', className: 'font-noto-naskh',   preview: 'بِسْمِ اللَّهِ' },
];

export const FONT_SIZES = {
  arabic:      { min: 20, max: 52, default: 32, step: 2 },
  translation: { min: 12, max: 24, default: 16, step: 1 },
} as const;

export interface AppSettings {
  arabicFont: string;
  arabicFontSize: number;
  translationFontSize: number;
  theme: 'dark' | 'light';
  reciter: string;
}

export const RECITERS = [
  { id: 'ar.alafasy',              label: 'Mishary Alafasy' },
  { id: 'ar.abdulbasitmurattal',   label: 'Abdul Basit (Murattal)' },
  { id: 'ar.abdullahbasfar',       label: 'Abdullah Basfar' },
  { id: 'ar.hudhaify',             label: 'Ali Al-Hudhaify' },
  { id: 'ar.minshawi',             label: 'Mohamed Minshawi' },
];

export const DEFAULT_SETTINGS: AppSettings = {
  arabicFont:        'amiri',
  arabicFontSize:    32,
  translationFontSize: 16,
  theme:   'dark',
  reciter: 'ar.alafasy',
};

export const STORAGE_KEY = 'quran-app-settings-v2';

export function getFontClass(id: string): string {
  return ARABIC_FONTS.find((f) => f.id === id)?.className ?? 'font-amiri';
}

/**
 * Audio CDN — free, no API key needed
 * https://cdn.islamic.network/quran/audio/128/{edition}/{globalAyahNumber}.mp3
 */
export function getAudioUrl(globalAyahNumber: number, reciter: string): string {
  return `https://cdn.islamic.network/quran/audio/128/${reciter}/${globalAyahNumber}.mp3`;
}