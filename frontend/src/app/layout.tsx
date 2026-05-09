import type { Metadata } from 'next';
import { Amiri, IBM_Plex_Sans, Noto_Naskh_Arabic, Scheherazade_New } from 'next/font/google';
import './globals.css';
import { SettingsProvider } from '@/context/SettingsContext';
import { getAllSurahs } from '@/lib/quran';
import type { SurahMeta } from '@/lib/types';
import { SurahSidebar } from '@/components/SurahSidebar';
import { SettingsPanel } from '@/components/SettingsPanel';
import { SearchModal } from '@/components/SearchModal';
import { IconSidebar } from '@/components/IconSidebar';

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-ibm-plex',
  display: 'swap',
});

const amiri = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-amiri',
  display: 'swap',
});

const scheherazadeNew = Scheherazade_New({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-scheherazade',
  display: 'swap',
});

const notoNaskhArabic = Noto_Naskh_Arabic({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-noto-naskh',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Quran — Read & Listen',
  description: 'Read and listen to the Holy Quran with English translation',
  icons: { icon: '/favicon.ico' },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const surahs: SurahMeta[] = await getAllSurahs();

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${ibmPlexSans.variable} ${amiri.variable} ${scheherazadeNew.variable} ${notoNaskhArabic.variable}`}>
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
