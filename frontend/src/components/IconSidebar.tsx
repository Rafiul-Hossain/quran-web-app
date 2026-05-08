'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSettings } from '@/context/SettingsContext';

export function IconSidebar() {
  const pathname = usePathname();
  const { toggleSurahSidebar, openSettings, toggleSearch, isSurahSidebarOpen } = useSettings();
  const isHome = pathname === '/';

  return (
    <aside className="hidden md:flex flex-col items-center w-14 h-screen flex-shrink-0 bg-bg-sidebar border-r border-border py-4 gap-1 z-30">
      {/* Logo */}
      <Link href="/" className="mb-4 w-9 h-9 flex items-center justify-center rounded-xl bg-accent select-none">
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.966 8.966 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      </Link>
      <div className="w-8 h-px bg-border mb-2" />

      <SidebarBtn onClick={toggleSurahSidebar} active={isSurahSidebarOpen} label="Surahs" title="Toggle Surah List">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h10M4 18h8" />
        </svg>
      </SidebarBtn>

      <SidebarLinkBtn href="/" active={isHome} label="Home" title="Home">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" />
        </svg>
      </SidebarLinkBtn>

      <SidebarBtn onClick={toggleSearch} label="Search" title="Search Ayahs">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
          <circle cx="11" cy="11" r="7" />
          <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
        </svg>
      </SidebarBtn>

      <div className="flex-1" />
      <div className="w-8 h-px bg-border mb-2" />

      <SidebarBtn onClick={openSettings} label="Settings" title="Settings">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
          <circle cx="12" cy="12" r="3" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
        </svg>
      </SidebarBtn>
    </aside>
  );
}

function btnCls(active?: boolean) {
  return `group relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 cursor-pointer ${
    active ? 'bg-accent text-[#0f1117]' : 'text-text-secondary hover:bg-icon-bg hover:text-text-primary'
  }`;
}

function Tooltip({ label }: { label: string }) {
  return (
    <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-bg-card text-text-primary text-xs font-medium px-2 py-1 rounded-md shadow-lg border border-border whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
      {label}
    </span>
  );
}

function SidebarBtn({ children, onClick, active, label, title }: {
  children: React.ReactNode; onClick: () => void; active?: boolean; label: string; title: string;
}) {
  return (
    <button onClick={onClick} title={title} aria-label={title} className={btnCls(active)}>
      {children}<Tooltip label={label} />
    </button>
  );
}

function SidebarLinkBtn({ children, href, active, label, title }: {
  children: React.ReactNode; href: string; active?: boolean; label: string; title: string;
}) {
  return (
    <Link href={href} title={title} className={btnCls(active)}>
      {children}<Tooltip label={label} />
    </Link>
  );
}