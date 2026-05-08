'use client';

import {
  createContext, useCallback, useContext,
  useEffect, useState, type ReactNode,
} from 'react';
import { DEFAULT_SETTINGS, STORAGE_KEY, type AppSettings } from '@/lib/constants';

interface SettingsContextValue {
  settings: AppSettings;
  updateSettings: (patch: Partial<AppSettings>) => void;
  resetSettings: () => void;
  isSurahSidebarOpen: boolean;
  isSettingsOpen: boolean;
  isSearchOpen: boolean;
  toggleSurahSidebar: () => void;
  openSettings: () => void;
  closeSettings: () => void;
  toggleSearch: () => void;
  closeSearch: () => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [isSurahSidebarOpen, setIsSurahSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen]         = useState(false);
  const [isSearchOpen, setIsSearchOpen]             = useState(false);
  const [hydrated, setHydrated]                     = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(raw) });
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(settings)); } catch {}
  }, [settings, hydrated]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', settings.theme === 'dark');
  }, [settings.theme]);

  const updateSettings = useCallback((patch: Partial<AppSettings>) =>
    setSettings((p) => ({ ...p, ...patch })), []);
  const resetSettings      = useCallback(() => setSettings(DEFAULT_SETTINGS), []);
  const toggleSurahSidebar = useCallback(() => setIsSurahSidebarOpen((o) => !o), []);
  const openSettings       = useCallback(() => setIsSettingsOpen(true), []);
  const closeSettings      = useCallback(() => setIsSettingsOpen(false), []);
  const toggleSearch       = useCallback(() => setIsSearchOpen((o) => !o), []);
  const closeSearch        = useCallback(() => setIsSearchOpen(false), []);

  return (
    <SettingsContext.Provider value={{
      settings, updateSettings, resetSettings,
      isSurahSidebarOpen, isSettingsOpen, isSearchOpen,
      toggleSurahSidebar, openSettings, closeSettings,
      toggleSearch, closeSearch,
    }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used inside <SettingsProvider>');
  return ctx;
}