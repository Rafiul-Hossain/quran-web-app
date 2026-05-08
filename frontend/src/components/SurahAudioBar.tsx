'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useSettings } from '@/context/SettingsContext';
import { getAudioUrl } from '@/lib/constants';
import type { Ayah } from '@/lib/types';

export function SurahAudioBar({ ayahs, surahNumber }: { ayahs: Ayah[]; surahNumber: number }) {
  const { settings } = useSettings();
  const audioRef     = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying]       = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading]       = useState(false);

  const playAyah = useCallback((index: number) => {
    if (index >= ayahs.length) { setPlaying(false); return; }
    const ayah = ayahs[index];
    if (!audioRef.current) audioRef.current = new Audio();
    const audio = audioRef.current;
    audio.src = getAudioUrl(ayah.number, settings.reciter);
    audio.onended = () => playAyah(index + 1);
    audio.onerror = () => { setLoading(false); setPlaying(false); };
    setLoading(true);
    audio.play()
      .then(() => { setCurrentIndex(index); setLoading(false); setPlaying(true); })
      .catch(() => setLoading(false));
    document.getElementById(`ayah-${ayah.numberInSurah}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [ayahs, settings.reciter]);

  const togglePlay = () => {
    if (!audioRef.current || !playing) { playAyah(currentIndex); }
    else { audioRef.current.pause(); setPlaying(false); }
  };

  useEffect(() => () => { audioRef.current?.pause(); }, []);

  const current = ayahs[currentIndex];

  return (
    <div className="sticky top-0 z-10 bg-bg-sidebar/95 backdrop-blur border-b border-border px-4 py-3">
      <div className="max-w-3xl mx-auto flex items-center gap-3">
        {/* Prev */}
        <CtrlBtn onClick={() => { const i = Math.max(0, currentIndex-1); setCurrentIndex(i); if (playing) playAyah(i); }} disabled={currentIndex === 0} title="Previous">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" /></svg>
        </CtrlBtn>

        {/* Play/Pause */}
        <button onClick={togglePlay} title={playing ? 'Pause' : 'Play surah'}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            playing ? 'bg-accent text-[#0f1117]' : 'bg-icon-bg text-text-primary hover:bg-accent hover:text-[#0f1117]'
          }`}
        >
          {loading ? (
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          ) : playing ? (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-0.5"><path d="M8 5v14l11-7z" /></svg>
          )}
        </button>

        {/* Next */}
        <CtrlBtn onClick={() => { const i = Math.min(ayahs.length-1, currentIndex+1); setCurrentIndex(i); if (playing) playAyah(i); }} disabled={currentIndex === ayahs.length - 1} title="Next">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M6 18l8.5-6L6 6v12zM16 6h2v12h-2z" /></svg>
        </CtrlBtn>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-xs text-text-muted truncate">
            {playing ? '▶ Playing' : '◼ Stopped'} · Verse {current?.numberInSurah ?? 1} of {ayahs.length}
          </p>
        </div>

        {/* Dot progress (first 20 ayahs) */}
        <div className="hidden sm:flex items-center gap-0.5">
          {ayahs.slice(0, 20).map((_, i) => (
            <button key={i}
              onClick={() => { setCurrentIndex(i); if (playing) playAyah(i); }}
              className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentIndex ? 'bg-accent scale-125' : 'bg-border hover:bg-text-muted'}`}
            />
          ))}
          {ayahs.length > 20 && <span className="text-xs text-text-muted ml-1">+{ayahs.length - 20}</span>}
        </div>
      </div>
    </div>
  );
}

function CtrlBtn({ children, onClick, disabled, title }: { children: React.ReactNode; onClick: () => void; disabled?: boolean; title: string }) {
  return (
    <button onClick={onClick} disabled={disabled} title={title}
      className="w-7 h-7 flex items-center justify-center rounded-lg text-text-muted hover:text-text-primary hover:bg-icon-bg transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
      {children}
    </button>
  );
}