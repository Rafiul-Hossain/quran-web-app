import type { Metadata, Viewport } from 'next';
import { Inter, Amiri, Scheherazade_New, Noto_Naskh_Arabic } from 'next/font/google';
import { SettingsProvider } from '@/context/SettingsContext';
import Header from '@/components/Header';
import SettingsSidebar from '@/components/SettingsSidebar';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const amiri = Amiri({
  weight: ['400', '700'],
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-amiri',
});

const scheherazade = Scheherazade_New({
  weight: ['400', '700'],
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-scheherazade',
});

const notoNaskh = Noto_Naskh_Arabic({
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-noto-naskh',
});

export const metadata: Metadata = {
  title: 'Al-Quran Kareem',
  description:
    'Read, search, and explore the Holy Quran — 114 surahs with Arabic text and English translation.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${amiri.variable} ${scheherazade.variable} ${notoNaskh.variable} antialiased min-h-screen`}
      >
        <SettingsProvider>
          <Header />
          <SettingsSidebar />
          <main className="container mx-auto px-4 py-6 md:py-8 max-w-5xl">
            {children}
          </main>
          <footer className="container mx-auto px-4 py-8 max-w-5xl text-center text-xs text-brand-700/60">
            <div className="gold-rule mb-4 max-w-md mx-auto" />
            Data sourced from alquran.cloud · Translation: Sahih International
          </footer>
        </SettingsProvider>
      </body>
    </html>
  );
}