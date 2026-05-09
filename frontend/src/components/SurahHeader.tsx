import type { Surah } from "@/lib/types";

export function SurahHeader({ surah }: { surah: Surah }) {
  return (
    <div className="relative overflow-hidden rounded-2xl mb-8 border border-border bg-bg-card">
      {/* Kaaba image from ref site */}
     

      <div className="relative px-6 py-8 text-center">
        <h1
          className="font-kfgq text-gold mb-3 leading-none"
          style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}
          dir="rtl"
        >
          {surah.name}
        </h1>
        <p className="text-xl font-semibold text-text-primary">
          {surah.englishName}
        </p>
        <p className="text-sm text-text-secondary mt-0.5 mb-4">
          {surah.englishNameTranslation}
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {[
            ["📍", surah.revelationType],
            [
              "📖",
              `${surah.numberOfAyahs ?? surah.ayahs?.length ?? "?"} Verses`,
            ],
            ["🔢", `Surah ${surah.number}`],
          ].map(([icon, label]) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-icon-bg border border-border text-xs font-medium text-text-secondary"
            >
              {icon} {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
