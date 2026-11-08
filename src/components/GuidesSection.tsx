import React, { useState } from 'react';
import { Language, GUIDES, GuideInfo } from '../data/content';
import { TRANSLATIONS } from '../data/translations';
import { BookOpen, ChevronDown, Clock, Check } from 'lucide-react';

interface GuidesSectionProps {
  currentLang: Language;
  onSelectGuide?: (guide: GuideInfo) => void;
  isStandalone?: boolean;
}

export const GuidesSection: React.FC<GuidesSectionProps> = ({
  currentLang,
  onSelectGuide,
  isStandalone = false,
}) => {
  const t = TRANSLATIONS[currentLang];
  const HeadingTag = isStandalone ? 'h1' : 'h2';
  const [openGuideId, setOpenGuideId] = useState<string | null>(GUIDES[0].id);

  return (
    <section id="guides" className="space-y-6">
      <div>
        <span className="text-[11px] font-bold tracking-wider text-[#0d9d8c] uppercase">
          {t.nav.guides} • {t.guides.badge}
        </span>
        <HeadingTag className="mt-1 text-2xl font-bold tracking-tight text-[#142c42] sm:text-3xl">
          {t.guides.title}
        </HeadingTag>
        <p className="mt-1 text-sm text-[#677c8d] max-w-2xl">
          {t.guides.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {GUIDES.map((guide) => {
          const isOpen = openGuideId === guide.id;
          return (
            <article
              key={guide.id}
              className={`rounded-2xl border transition-all duration-200 bg-white p-5 shadow-xs ${
                isOpen ? 'border-[#0d9d8c] ring-1 ring-[#0d9d8c]' : 'border-[#e2e9ee] hover:border-[#ccd9e0]'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-[#677c8d]">
                <div className="flex items-center gap-1.5 font-semibold text-[#087f72]">
                  <BookOpen className="h-4 w-4" />
                  <span>{t.guides.guideBadge}</span>
                </div>
                <div className="flex items-center gap-1 font-mono text-[11px]">
                  <Clock className="h-3 w-3" />
                  <span>{guide.readTime}</span>
                </div>
              </div>

              <h3 className="mt-2 text-[17px] sm:text-[18px] font-[780] text-[#142c42] leading-snug">
                {guide.titles[currentLang]}
              </h3>

              <p className="mt-1.5 text-[14px] text-[#526a7d] leading-[1.6]">
                {guide.summary[currentLang]}
              </p>

              <button
                type="button"
                onClick={() => setOpenGuideId(isOpen ? null : guide.id)}
                className="mt-4 flex w-full min-h-[44px] items-center justify-between border-t border-[#f0f4f7] pt-2 text-[13.5px] font-[750] text-[#0d9d8c] hover:text-[#087f72] touch-target cursor-pointer"
              >
                <span>{isOpen ? t.guides.closeChecklist : t.guides.openChecklist}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {isOpen && (
                <div className="mt-3 space-y-3 rounded-xl bg-[#f8fafb] p-4 text-[13.5px] text-[#203c4e]">
                  <h4 className="font-bold text-[#142c42]">{t.guides.keyPoints}</h4>
                  <ul className="space-y-2">
                    {guide.points[currentLang].map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="h-4 w-4 shrink-0 text-[#0d9d8c] mt-0.5" />
                        <span className="leading-relaxed">{pt}</span>
                      </li>
                    ))}
                  </ul>

                  {onSelectGuide && (
                    <div className="pt-2 border-t border-[#e8eff2]">
                      <button
                        type="button"
                        onClick={() => onSelectGuide(guide)}
                        className="flex items-center gap-1.5 text-xs font-bold text-[#087f72] hover:underline cursor-pointer"
                      >
                        <span>{t.guides.readArticleBtn}</span>
                        <span aria-hidden="true">→</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
};
