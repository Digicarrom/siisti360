import React, { useState } from 'react';
import { Language } from '../data/content';
import { TRANSLATIONS } from '../data/translations';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqSectionProps {
  currentLang: Language;
  isStandalone?: boolean;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ currentLang, isStandalone = false }) => {
  const t = TRANSLATIONS[currentLang];
  const HeadingTag = isStandalone ? 'h1' : 'h2';
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="faq" className="space-y-6">
      <div>
        <span className="text-[10.5px] font-[750] uppercase tracking-[1.55px] text-[#0d9d8c]">
          {t.faq.badge}
        </span>
        <HeadingTag className="mt-1 text-2xl sm:text-3xl font-[780] tracking-[-0.045em] text-[#142c42] leading-[1.2]">
          {t.faq.title}
        </HeadingTag>
        <p className="mt-1.5 text-[15px] sm:text-[16px] text-[#526a7d] max-w-2xl leading-[1.6]">{t.faq.subtitle}</p>
      </div>

      <div className="space-y-3">
        {t.faq.items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`rounded-xl border bg-white transition-colors ${
                isOpen ? 'border-[#0d9d8c] shadow-xs' : 'border-[#e2e9ee]'
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(index)}
                className="flex w-full min-h-[48px] items-center justify-between p-4 text-left text-[15px] sm:text-[16px] font-bold text-[#142c42] hover:text-[#0d9d8c] transition-colors"
                aria-expanded={isOpen}
              >
                <span>{item.question}</span>
                <span className="ml-4 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f0f4f7] text-[#0d9d8c]">
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </span>
              </button>

              {isOpen && (
                <div className="border-t border-[#f0f4f7] px-4 pb-4 pt-3 text-[14.5px] sm:text-[15px] text-[#4c6275] leading-[1.6]">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
