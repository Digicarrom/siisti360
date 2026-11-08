import React from 'react';
import { Language } from '../data/content';
import { TRANSLATIONS } from '../data/translations';

interface WhyChooseUsProps {
  currentLang: Language;
  isStandalone?: boolean;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ currentLang, isStandalone = false }) => {
  const t = TRANSLATIONS[currentLang];
  const HeadingTag = isStandalone ? 'h1' : 'h2';

  return (
    <section id="why" className="space-y-6">
      <div>
        <span className="type-eyebrow text-[#0d9d8c]">
          {t.why.badge}
        </span>
        <HeadingTag className="heading-h2 mt-1 text-[#142c42]">
          {t.why.title}
        </HeadingTag>
        <p className="mt-1.5 type-body-muted max-w-2xl">{t.why.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {t.why.cards.map((card) => (
          <article
            key={card.num}
            className="flex flex-col justify-between rounded-xl border border-[#e2e9ee] bg-white p-5 shadow-xs transition-shadow hover:shadow-md"
          >
            <div>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#eef7f5] text-xs font-black text-[#0d9d8c] font-mono-numbers">
                {card.num}
              </span>
              {/* Benefit title: 18px / 780 weight per 8-Point Guide Section 05 */}
              <h3 className="mt-3 text-[17px] sm:text-[18px] font-[780] text-[#142c42] leading-snug tracking-[-0.025em]">
                {card.title}
              </h3>
              {/* Benefit description: 14px per Section 08 upgrade */}
              <p className="mt-2 text-[14px] text-[#526a7d] leading-[1.6]">{card.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
