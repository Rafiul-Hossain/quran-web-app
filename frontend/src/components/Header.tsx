'use client';

import Link from 'next/link';
import { useSettings } from '@/context/SettingsContext';

export default function Header() {
  const { toggleSidebar } = useSettings();

  return (
    <header className="sticky top-0 z-30 bg-cream-50/95 backdrop-blur border-b border-gold-200/60 shadow-sm">
      <div className="container mx-auto px-4 py-3 max-w-5xl flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-700 to-brand-900 flex items-center justify-center text-gold-300 font-bold shadow-md group-hover:shadow-lg transition-shadow ring-1 ring-gold-400/30">
            <span className="font-amiri text-xl">ق</span>
          </div>
          <span className="font-semibold text-brand-800 tracking-tight">
            Al-Quran Kareem
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          <Link
            href="/"
            className="px-3 py-1.5 text-sm font-medium text-brand-700 hover:text-gold-600 rounded-md transition-colors"
          >
            Surahs
          </Link>
          <Link
            href="/search"
            className="px-3 py-1.5 text-sm font-medium text-brand-700 hover:text-gold-600 rounded-md transition-colors"
          >
            Search
          </Link>
          <button
            type="button"
            onClick={toggleSidebar}
            aria-label="Open settings"
            className="ml-1 p-2 rounded-md hover:bg-gold-100 text-brand-700 transition-colors"
          >
            <SettingsIcon />
          </button>
        </nav>
      </div>
    </header>
  );
}

function SettingsIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}