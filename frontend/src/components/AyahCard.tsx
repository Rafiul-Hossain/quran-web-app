'use client';

import { useSettings } from '@/context/SettingsContext';
import { getFontClass } from '@/lib/constants';
import type { Ayah } from '@/lib/types';

export default function AyahCard({ ayah }: { ayah: Ayah }) {
  const { settings } = useSettings();
  const fontClass = getFontClass(settings.arabicFont);

  return (
    <article
      id={`ayah-${ayah.numberInSurah}`}
      className="relative bg-white rounded-xl border border-gold-200/70 p-5 shadow-sm scroll-mt-24 hover:shadow-md transition-shadow"
    >
      {/* Gold top accent bar */}
      <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent" />

      <header className="flex items-center justify-between mb-4">
        <div className="relative w-10 h-10 flex items-center justify-center">
          <svg
            className="absolute inset-0 w-full h-full text-gold-400"
            viewBox="0 0 40 40"
            fill="currentColor"
            aria-hidden
          >
            <path d="M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z" opacity="0.25" />
          </svg>
          <span className="relative text-xs font-bold text-brand-800">
            {ayah.numberInSurah}
          </span>
        </div>
      </header>

      <p
        dir="rtl"
        lang="ar"
        className={`text-right text-brand-900 mb-4 ${fontClass}`}
        style={{
          fontSize: `${settings.arabicFontSize}px`,
          lineHeight: 2,
        }}
      >
        {ayah.text}
      </p>

      <div className="gold-rule mb-3 opacity-60" />

      <p
        className="text-brand-800/85 leading-relaxed"
        style={{ fontSize: `${settings.translationFontSize}px` }}
      >
        {ayah.translation}
      </p>
    </article>
  );
}