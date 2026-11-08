import React from 'react';
import { Language } from '../data/content';
import { TRANSLATIONS } from '../data/translations';
import { HeartHandshake } from 'lucide-react';

interface OurStoryProps {
  currentLang: Language;
  isStandalone?: boolean;
}

export const OurStory: React.FC<OurStoryProps> = ({ currentLang, isStandalone = false }) => {
  const t = TRANSLATIONS[currentLang];
  const HeadingTag = isStandalone ? 'h1' : 'h2';

  return (
    <section id="story" className="rounded-2xl border border-[#e2e9ee] bg-white p-6 md:p-10 shadow-xs">
      <div className="max-w-3xl space-y-4">
        <span className="type-eyebrow text-[#0d9d8c]">
          {t.story.badge}
        </span>
        {/* Main section heading: 24-34 px clamp per 8-Point Guide Section 05 */}
        <HeadingTag className="heading-h2 font-[780] tracking-[-0.04em] text-[#142c42]">
          {t.story.title}
        </HeadingTag>
        <p className="type-body text-[#334e68] leading-[1.65]">{t.story.text1}</p>
        <p className="type-body text-[#334e68] leading-[1.65]">{t.story.text2}</p>

        {/* Mission Card */}
        <div className="mt-6 rounded-xl border border-[#a5dbd2] bg-[#f0f9f6] p-5">
          <div className="flex items-center gap-2 text-[#087f72]">
            <HeartHandshake className="h-5 w-5" />
            <h3 className="heading-h3 text-[15px] sm:text-[16px] font-[760]">{t.story.missionTitle}</h3>
          </div>
          <p className="mt-1.5 text-[14px] text-[#1e584f] leading-relaxed font-medium">
            {t.story.missionText}
          </p>
        </div>
      </div>
    </section>
  );
};
