export interface FontOption {
  id: string;
  label: string;
  className: string;
}

export const ARABIC_FONTS: FontOption[] = [
  { id: 'amiri', label: 'Amiri', className: 'font-amiri' },
  { id: 'scheherazade', label: 'Scheherazade New', className: 'font-scheherazade' },
  { id: 'noto-naskh', label: 'Noto Naskh Arabic', className: 'font-noto-naskh' },
];

export const FONT_SIZES = {
  arabic: { min: 20, max: 48, default: 32, step: 2 },
  translation: { min: 12, max: 24, default: 16, step: 1 },
} as const;

export interface AppSettings {
  arabicFont: string;
  arabicFontSize: number;
  translationFontSize: number;
}

export const DEFAULT_SETTINGS: AppSettings = {
  arabicFont: ARABIC_FONTS[0].id,
  arabicFontSize: FONT_SIZES.arabic.default,
  translationFontSize: FONT_SIZES.translation.default,
};

export const STORAGE_KEY = 'quran-app-settings';

export function getFontClass(id: string): string {
  return ARABIC_FONTS.find((f) => f.id === id)?.className ?? ARABIC_FONTS[0].className;
}
