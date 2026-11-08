import React from 'react';
import { Language, COMPETITORS } from '../data/content';
import { TRANSLATIONS } from '../data/translations';
import { Scale, ExternalLink, ShieldCheck, ArrowRight } from 'lucide-react';

interface PriceComparisonProps {
  currentLang: Language;
  onNavigateToCalculator: () => void;
  isStandalone?: boolean;
}

export const PriceComparison: React.FC<PriceComparisonProps> = ({
  currentLang,
  onNavigateToCalculator,
  isStandalone = false,
}) => {
  const t = TRANSLATIONS[currentLang];
  const HeadingTag = isStandalone ? 'h1' : 'h2';

  return (
    <section id="compare" className="space-y-6">
      <div>
        <span className="text-[10.5px] font-[750] uppercase tracking-[1.55px] text-[#0d9d8c]">
          {t.compare.badge}
        </span>
        <HeadingTag className="mt-1 text-2xl sm:text-3xl font-[780] tracking-[-0.045em] text-[#142c42] leading-[1.2]">
          {t.compare.title}
        </HeadingTag>
        <p className="mt-1.5 text-[15px] sm:text-[16px] text-[#526a7d] max-w-2xl leading-[1.6]">{t.compare.subtitle}</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#e2e9ee] bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13.5px]">
            <thead className="border-b border-[#e2e9ee] bg-[#f5f8fa] text-[11.5px] font-[750] text-[#526a7d] uppercase tracking-[1.55px]">
              <tr>
                <th className="px-5 py-3.5">{t.compare.thProvider}</th>
                <th className="px-5 py-3.5">{t.compare.thPrice}</th>
                <th className="px-5 py-3.5">{t.compare.thTerms}</th>
                <th className="px-5 py-3.5">{t.compare.thSource}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eef3f6]">
              {/* Siisti360 row highlighted */}
              <tr className="bg-[#fff9f4] font-semibold text-[#142c42]">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#ff8d43] text-[10px] text-white font-bold">
                      ✦
                    </span>
                    <strong className="text-[15px] font-bold text-[#10263d]">{t.compare.ourSample}</strong>
                  </div>
                </td>
                <td className="px-5 py-4 text-[15px] sm:text-[16px] font-[820] text-[#e97123] font-mono">
                  {t.compare.ourRate}
                </td>
                <td className="px-5 py-4 text-[#526a7d]">{t.compare.ourTerms}</td>
                <td className="px-5 py-4 text-[#0d9d8c] font-bold">Siisti360.fi</td>
              </tr>

              {COMPETITORS.map((c) => (
                <tr key={c.name} className="hover:bg-[#fbfcfd] transition-colors">
                  <td className="px-5 py-3.5 font-bold text-[#142c42]">{c.name}</td>
                  <td className="px-5 py-3.5 font-mono font-semibold text-[#2c4960]">{c.rate}</td>
                  <td className="px-5 py-3.5 text-[#526a7d] max-w-xs">{c.notes[currentLang]}</td>
                  <td className="px-5 py-3.5">
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-[#087f72] hover:text-[#065e54] underline"
                    >
                      <span>{c.name} {t.compare.thSource.toLowerCase().split('/')[0]}</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-t border-[#e2e9ee] bg-[#f8fafb] p-4 text-[13px] text-[#677c8d] leading-relaxed flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-start gap-2">
            <ShieldCheck className="h-4 w-4 text-[#0d9d8c] shrink-0 mt-0.5" />
            <p>{t.compare.disclaimer}</p>
          </div>
          <button
            onClick={onNavigateToCalculator}
            className="flex items-center gap-1.5 self-start sm:self-auto min-h-[44px] rounded-xl bg-[#10263d] px-4 py-2 text-[13px] font-[750] text-white hover:bg-[#1b3d5c] transition-colors shrink-0"
          >
            <span>{t.compare.ctaCalculator}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
