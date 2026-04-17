'use client';

import { useSettings } from '@/context/SettingsContext';
import { ARABIC_FONTS, FONT_SIZES, getFontClass } from '@/lib/constants';

export default function SettingsSidebar() {
  const {
    settings,
    updateSettings,
    resetSettings,
    isSidebarOpen,
    closeSidebar,
  } = useSettings();

  const activeFontClass = getFontClass(settings.arabicFont);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeSidebar}
        aria-hidden
        className={`fixed inset-0 bg-brand-900/50 backdrop-blur-sm z-40 transition-opacity duration-200 ${
          isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Panel */}
      <aside
        aria-label="Settings"
        className={`fixed top-0 right-0 h-full w-[340px] max-w-[92vw] bg-cream-50 shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-out border-l border-gold-300/50 ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gold-200/80 bg-gradient-to-r from-brand-800 to-brand-700 text-white">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-gold-300" aria-hidden>
              <path d="M12 2 L14 9 L21 12 L14 15 L12 22 L10 15 L3 12 L10 9 Z" />
            </svg>
            Settings
          </h2>
          <button
            type="button"
            onClick={closeSidebar}
            aria-label="Close settings"
            className="p-1.5 -mr-1 rounded-md hover:bg-white/10 text-gold-200 transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-7">
          {/* Arabic font */}
          <section>
            <SectionLabel>Arabic Font</SectionLabel>
            <div className="space-y-2">
              {ARABIC_FONTS.map((font) => (
                <button
                  key={font.id}
                  type="button"
                  onClick={() => updateSettings({ arabicFont: font.id })}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg border transition-all ${
                    settings.arabicFont === font.id
                      ? 'border-gold-400 bg-gold-50 ring-1 ring-gold-400 shadow-sm'
                      : 'border-gold-200/60 hover:border-gold-300 bg-white'
                  }`}
                >
                  <span className="text-xs uppercase tracking-wider font-semibold text-brand-800">
                    {font.label}
                  </span>
                  <span
                    dir="rtl"
                    className={`text-2xl text-brand-900 ${font.className}`}
                  >
                    بِسْمِ اللَّهِ
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* Arabic font size */}
          <section>
            <SectionLabelRow>
              <span>Arabic Font Size</span>
              <ValuePill>{settings.arabicFontSize}px</ValuePill>
            </SectionLabelRow>
            <input
              type="range"
              min={FONT_SIZES.arabic.min}
              max={FONT_SIZES.arabic.max}
              step={FONT_SIZES.arabic.step}
              value={settings.arabicFontSize}
              onChange={(e) =>
                updateSettings({ arabicFontSize: Number(e.target.value) })
              }
              className="w-full cursor-pointer"
              aria-label="Arabic font size"
            />
          </section>

          {/* Translation font size */}
          <section>
            <SectionLabelRow>
              <span>Translation Font Size</span>
              <ValuePill>{settings.translationFontSize}px</ValuePill>
            </SectionLabelRow>
            <input
              type="range"
              min={FONT_SIZES.translation.min}
              max={FONT_SIZES.translation.max}
              step={FONT_SIZES.translation.step}
              value={settings.translationFontSize}
              onChange={(e) =>
                updateSettings({ translationFontSize: Number(e.target.value) })
              }
              className="w-full cursor-pointer"
              aria-label="Translation font size"
            />
          </section>

          {/* Live preview */}
          <section>
            <SectionLabel>Preview</SectionLabel>
            <div className="p-4 bg-white rounded-lg border border-gold-200/60 relative">
              <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
              <p
                dir="rtl"
                className={`text-right mb-3 text-brand-900 ${activeFontClass}`}
                style={{
                  fontSize: `${settings.arabicFontSize}px`,
                  lineHeight: 1.9,
                }}
              >
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
              <p
                className="text-brand-800/85 leading-relaxed"
                style={{ fontSize: `${settings.translationFontSize}px` }}
              >
                In the name of Allah, the Entirely Merciful, the Especially Merciful.
              </p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-gold-200/80 bg-cream-100">
          <button
            type="button"
            onClick={resetSettings}
            className="w-full py-2 text-sm font-semibold text-brand-800 border border-gold-300 rounded-lg hover:bg-gold-50 hover:border-gold-400 transition-colors"
          >
            Reset to Defaults
          </button>
        </div>
      </aside>
    </>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-bold text-brand-800 mb-3 flex items-center gap-2 uppercase tracking-wider">
      <span className="w-1 h-3 bg-gold-400 rounded-full" />
      {children}
    </h3>
  );
}

function SectionLabelRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-sm font-bold text-brand-800 flex items-center gap-2 uppercase tracking-wider">
        <span className="w-1 h-3 bg-gold-400 rounded-full" />
        {Array.isArray(children) ? children[0] : children}
      </h3>
      {Array.isArray(children) ? children[1] : null}
    </div>
  );
}

function ValuePill({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-bold text-brand-800 bg-gold-100 border border-gold-300/60 px-2 py-0.5 rounded">
      {children}
    </span>
  );
}

function CloseIcon() {
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
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}