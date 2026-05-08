'use client';

import { useRef, useState } from 'react';
import { useSettings } from '@/context/SettingsContext';
import { getFontClass, getAudioUrl } from '@/lib/constants';
import type { Ayah } from '@/lib/types';

function toArabicNumerals(n: number): string {
  return String(n).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[parseInt(d)]);
}

export function AyahCard({ ayah, surahNumber }: { ayah: Ayah; surahNumber: number }) {
  const { settings } = useSettings();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(false);

  const fontClass = getFontClass(settings.arabicFont);
  const audioUrl  = getAudioUrl(ayah.number, settings.reciter);

  const togglePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.onended = () => setPlaying(false);
      audioRef.current.onerror = () => { setError(true); setLoading(false); setPlaying(false); };
    }
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      setError(false);
      setLoading(true);
      audioRef.current.src = audioUrl;
      audioRef.current.play()
        .then(() => { setPlaying(true); setLoading(false); })
        .catch(() => { setError(true); setLoading(false); });
    }
  };

  return (
    <div id={`ayah-${ayah.numberInSurah}`} className="ayah-card bg-bg-card border border-border rounded-xl p-5 md:p-6 transition-all duration-200">
      {/* Top row */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-icon-bg">
            <span className="text-xs font-semibold text-accent">{ayah.numberInSurah}</span>
          </div>
          <span className="text-xs text-text-muted hidden sm:block">Verse {ayah.numberInSurah}</span>
        </div>

        <button
          onClick={togglePlay}
          title={playing ? 'Pause' : 'Play recitation'}
          className={`w-8 h-8 flex items-center justify-center rounded-full border transition-all duration-200 ${
            playing
              ? 'bg-accent border-accent text-[#0f1117] playing-pulse'
              : 'border-border text-text-muted hover:border-accent hover:text-accent hover:bg-icon-bg'
          } ${loading ? 'opacity-60 cursor-wait' : 'cursor-pointer'}`}
        >
          {loading ? (
            <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          ) : playing ? (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
              <rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 ml-0.5">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>

      {error && <p className="text-xs text-red-400 mb-3 text-right">Audio unavailable</p>}

      {/* Arabic */}
      <p
        dir="rtl"
        style={{ fontSize: settings.arabicFontSize }}
        className={`${fontClass} text-right leading-loose text-text-primary mb-5`}
      >
        {ayah.text}
        <span
          className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-gold/40 text-gold mx-2 align-middle"
          style={{ fontSize: 14 }}
        >
          ﴿{toArabicNumerals(ayah.numberInSurah)}﴾
        </span>
      </p>

      <div className="w-full h-px bg-border mb-4" />

      {/* Translation */}
      <p style={{ fontSize: settings.translationFontSize }} className="text-text-secondary leading-relaxed">
        {ayah.translation}
      </p>
    </div>
  );
}