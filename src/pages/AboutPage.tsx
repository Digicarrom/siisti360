import React from 'react';
import { Language } from '../data/content';
import { TRANSLATIONS } from '../data/translations';
import { VisualBanner } from '../components/VisualBanner';
import { ShieldCheck, HeartHandshake, Award, Users } from 'lucide-react';

interface AboutPageProps {
  currentLang: Language;
  onNavigateToQuote: () => void;
  onNavigateToBooking: () => void;
}

const ICONS = [Users, ShieldCheck, Award, HeartHandshake];

export const AboutPage: React.FC<AboutPageProps> = ({
  currentLang,
  onNavigateToQuote,
  onNavigateToBooking,
}) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <VisualBanner
        type="story"
        badge={t.about.badge}
        title={t.about.title}
        headingTag="h1"
      />

      <div className="rounded-2xl border border-[#e2e9ee] bg-white p-6 md:p-10 shadow-xs space-y-6">
        <div className="max-w-3xl space-y-4">
          <h2 className="heading-h2 font-[780] text-[#142c42]">
            {t.about.h2}
          </h2>
          <p className="type-body text-[#374e60] leading-[1.65]">
            {t.about.p1}
          </p>
          <p className="type-body text-[#374e60] leading-[1.65]">
            {t.about.p2}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-4">
          {t.about.values.map((v, i) => {
            const Icon = ICONS[i] || ShieldCheck;
            return (
              <div
                key={i}
                className="flex items-start gap-4 rounded-xl border border-[#f0f4f7] bg-[#fbfcfd] p-5 shadow-2xs"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e5f6f1] text-[#0d9d8c]">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-[16px] sm:text-[17px] font-[780] text-[#142c42] leading-snug">
                    {v.title}
                  </h3>
                  <p className="mt-1.5 text-[14px] text-[#526a7d] leading-[1.6]">
                    {v.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action strip */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#f0f4f7]">
          <button
            onClick={onNavigateToBooking}
            className="flex min-h-[45px] items-center gap-2 rounded-xl bg-[#ff8d43] px-6 py-2.5 text-[14px] font-[750] text-[#10263d] hover:bg-[#ff9b59] transition-colors touch-target shadow-xs"
          >
            <span>{t.about.ctaBooking}</span>
          </button>
          <button
            onClick={onNavigateToQuote}
            className="flex min-h-[45px] items-center gap-2 rounded-xl border border-[#e2e9ee] bg-white px-6 py-2.5 text-[14px] font-[750] text-[#142c42] hover:bg-[#f5f8fa] transition-colors touch-target shadow-2xs"
          >
            <span>{t.about.ctaQuote}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
