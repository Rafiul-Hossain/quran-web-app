import type { Metadata } from 'next';
import './globals.css';
import { SettingsProvider } from '@/context/SettingsContext';
import { getAllSurahs } from '@/lib/quran';
import type { SurahMeta } from '@/lib/types';
import { SurahSidebar } from '@/components/SurahSidebar';
import { SettingsPanel } from '@/components/SettingsPanel';
import { SearchModal } from '@/components/SearchModal';
import { IconSidebar } from '@/components/IconSidebar';

export const metadata: Metadata = {
  title: 'Quran — Read & Listen',
  description: 'Read and listen to the Holy Quran with English translation',
  icons: { icon: '/favicon.ico' },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const surahs: SurahMeta[] = await getAllSurahs();

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body>
        <SettingsProvider>
          <div className="flex h-screen overflow-hidden bg-bg-primary">
            <IconSidebar />
            <SurahSidebar surahs={surahs} />
            <main className="flex-1 overflow-y-auto relative">
              {children}
            </main>
            <SettingsPanel />
            <SearchModal />
          </div>
        </SettingsProvider>
      </body>
    </html>
  );
}