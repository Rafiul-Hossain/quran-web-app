'use client';

import { useSettings } from '@/context/SettingsContext';
import { ARABIC_FONTS, FONT_SIZES, RECITERS } from '@/lib/constants';

export function SettingsPanel() {
  const { isSettingsOpen, closeSettings, settings, updateSettings, resetSettings } = useSettings();
  if (!isSettingsOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40 animate-fadeIn" onClick={closeSettings} />
      <div className="fixed right-0 top-0 h-full w-80 z-50 bg-bg-sidebar border-l border-border flex flex-col shadow-2xl animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <span className="font-semibold text-text-primary">Settings</span>
          <button onClick={closeSettings} className="w-8 h-8 flex items-center justify-center rounded-lg text-text-muted hover:text-text-primary hover:bg-icon-bg transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-7">
          {/* Theme */}
          <Section title="Theme">
            <div className="flex gap-2">
              {(['dark', 'light'] as const).map((t) => (
                <button key={t} onClick={() => updateSettings({ theme: t })}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-all border ${
                    settings.theme === t
                      ? 'bg-accent text-[#0f1117] border-accent'
                      : 'border-border text-text-secondary hover:border-accent hover:text-accent'
                  }`}>
                  {t === 'dark' ? '🌙 Dark' : '☀️ Light'}
                </button>
              ))}
            </div>
          </Section>

          {/* Arabic Font */}
          <Section title="Arabic Font">
            <div className="space-y-2">
              {ARABIC_FONTS.map((font) => (
                <button key={font.id} onClick={() => updateSettings({ arabicFont: font.id })}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg border transition-all ${
                    settings.arabicFont === font.id ? 'border-accent bg-accent/10' : 'border-border'
                  }`}>
                  <span className={`text-sm font-medium ${settings.arabicFont === font.id ? 'text-accent' : 'text-text-secondary'}`}>
                    {font.label}
                  </span>
                  <span className={`text-lg ${font.className} text-gold`} dir="rtl">{font.preview}</span>
                </button>
              ))}
            </div>
          </Section>

          {/* Arabic Font Size */}
          <Section title={`Arabic Font Size — ${settings.arabicFontSize}px`}>
            <input type="range" min={FONT_SIZES.arabic.min} max={FONT_SIZES.arabic.max} step={FONT_SIZES.arabic.step}
              value={settings.arabicFontSize} onChange={(e) => updateSettings({ arabicFontSize: Number(e.target.value) })} />
            <div className="flex justify-between text-xs text-text-muted mt-1">
              <span>{FONT_SIZES.arabic.min}px</span><span>{FONT_SIZES.arabic.max}px</span>
            </div>
            <div dir="rtl" style={{ fontSize: `${settings.arabicFontSize}px` }}
              className={`mt-3 p-3 rounded-lg bg-bg-card border border-border text-right text-gold leading-relaxed font-${settings.arabicFont}`}>
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>
          </Section>

          {/* Translation Size */}
          <Section title={`Translation Size — ${settings.translationFontSize}px`}>
            <input type="range" min={FONT_SIZES.translation.min} max={FONT_SIZES.translation.max} step={FONT_SIZES.translation.step}
              value={settings.translationFontSize} onChange={(e) => updateSettings({ translationFontSize: Number(e.target.value) })} />
            <div className="flex justify-between text-xs text-text-muted mt-1">
              <span>{FONT_SIZES.translation.min}px</span><span>{FONT_SIZES.translation.max}px</span>
            </div>
            <p style={{ fontSize: `${settings.translationFontSize}px` }}
              className="mt-3 p-3 rounded-lg bg-bg-card border border-border text-text-secondary leading-relaxed">
              In the name of Allah, the Entirely Merciful, the Especially Merciful.
            </p>
          </Section>

          {/* Reciter */}
          <Section title="Reciter">
            <select value={settings.reciter} onChange={(e) => updateSettings({ reciter: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-bg-card text-text-primary text-sm focus:outline-none focus:border-accent transition-colors">
              {RECITERS.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}
            </select>
          </Section>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-border">
          <button onClick={resetSettings}
            className="w-full py-2.5 rounded-lg border border-border text-text-secondary text-sm hover:border-accent hover:text-accent transition-colors">
            Reset to Defaults
          </button>
        </div>
      </div>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted">{title}</h3>
      {children}
    </div>
  );
}