'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSettings } from '@/context/SettingsContext';
import type { SurahMeta } from '@/lib/types';

export function SurahSidebar({ surahs }: { surahs: SurahMeta[] }) {
  const pathname = usePathname();
  const { isSurahSidebarOpen, toggleSurahSidebar } = useSettings();
  const [search, setSearch] = useState('');
  const activeRef = useRef<HTMLAnchorElement | null>(null);

  const currentSurahNumber = (() => {
    const m = pathname.match(/^\/surah\/(\d+)/);
    return m ? parseInt(m[1]) : null;
  })();

  const filtered = surahs.filter((s) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return s.englishName.toLowerCase().includes(q)
      || s.englishNameTranslation.toLowerCase().includes(q)
      || String(s.number).includes(q)
      || s.name.includes(search);
  });

  useEffect(() => {
    if (isSurahSidebarOpen && activeRef.current) {
      setTimeout(() => activeRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' }), 150);
    }
  }, [isSurahSidebarOpen]);

  return (
    <>
      {/* Mobile backdrop */}
      {isSurahSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={toggleSurahSidebar} />
      )}

      <aside className={`
        flex flex-col w-72 flex-shrink-0 h-screen bg-bg-sidebar border-r border-border z-20
        transition-transform duration-300 fixed md:static top-0 left-0
        ${isSurahSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        ${!isSurahSidebarOpen ? 'md:hidden' : 'md:flex'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-border">
          <span className="text-sm font-semibold text-text-primary tracking-wide uppercase">Surahs</span>
          <button
            onClick={toggleSurahSidebar}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-text-muted hover:text-text-primary hover:bg-icon-bg transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Filter input */}
        <div className="px-3 py-3 border-b border-border">
          <div className="relative">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted pointer-events-none">
              <circle cx="11" cy="11" r="7" /><path strokeLinecap="round" d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Find surah..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm bg-bg-card border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto py-2">
          {filtered.map((surah) => {
            const isActive = surah.number === currentSurahNumber;
            return (
              <Link
                key={surah.number}
                href={`/surah/${surah.number}`}
                ref={isActive ? activeRef : undefined}
                onClick={() => { if (window.innerWidth < 768) toggleSurahSidebar(); }}
                className={`flex items-center gap-3 px-3 py-2.5 mx-2 rounded-lg transition-all duration-150 group ${
                  isActive ? 'bg-accent text-[#0f1117]' : 'hover:bg-icon-bg text-text-primary'
                }`}
              >
                <span className={`w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-lg text-xs font-semibold transition-colors ${
                  isActive ? 'bg-white/20' : 'bg-icon-bg text-text-secondary group-hover:bg-border'
                }`}>
                  {surah.number}
                </span>
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-medium leading-tight truncate ${isActive ? '' : ''}`}>
                    {surah.englishName}
                  </div>
                  <div className={`text-xs leading-tight truncate ${isActive ? 'opacity-70' : 'text-text-muted'}`}>
                    {surah.englishNameTranslation}
                  </div>
                </div>
                <span className={`text-base font-amiri flex-shrink-0 ${isActive ? 'opacity-90' : 'text-gold'}`} dir="rtl">
                  {surah.name}
                </span>
              </Link>
            );
          })}
          {filtered.length === 0 && (
            <p className="text-center text-text-muted text-sm py-8">No surahs found</p>
          )}
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden z-30 bg-bg-sidebar border-t border-border px-4 py-2 flex justify-around">
        <MobileBtn onClick={toggleSurahSidebar} label="Surahs">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h10M4 18h8" />
          </svg>
        </MobileBtn>
        <MobileLinkBtn href="/" label="Home">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" />
          </svg>
        </MobileLinkBtn>
        <MobileSearchBtn />
        <MobileSettingsBtn />
      </div>
    </>
  );
}

const mobileCls = "flex flex-col items-center gap-0.5 text-text-secondary hover:text-accent transition-colors p-2";

function MobileBtn({ children, onClick, label }: { children: React.ReactNode; onClick: () => void; label: string }) {
  return <button onClick={onClick} className={mobileCls}>{children}<span className="text-[10px]">{label}</span></button>;
}
function MobileLinkBtn({ children, href, label }: { children: React.ReactNode; href: string; label: string }) {
  return <Link href={href} className={mobileCls}>{children}<span className="text-[10px]">{label}</span></Link>;
}
function MobileSearchBtn() {
  const { toggleSearch } = useSettings();
  return (
    <button onClick={toggleSearch} className={mobileCls}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <circle cx="11" cy="11" r="7" /><path strokeLinecap="round" d="M21 21l-4.35-4.35" />
      </svg>
      <span className="text-[10px]">Search</span>
    </button>
  );
}
function MobileSettingsBtn() {
  const { openSettings } = useSettings();
  return (
    <button onClick={openSettings} className={mobileCls}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <circle cx="12" cy="12" r="3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
      <span className="text-[10px]">Settings</span>
    </button>
  );
}