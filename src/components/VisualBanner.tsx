import React from 'react';
import { Language } from '../data/content';

interface VisualBannerProps {
  type: 'home' | 'office' | 'move' | 'deep' | 'windows' | 'sofa' | 'helsinki' | 'espoo' | 'vantaa' | 'pricing' | 'story' | 'why';
  className?: string;
  title?: string;
  badge?: string;
  headingTag?: 'h1' | 'h2' | 'h3';
  currentLang?: Language;
}

export const VisualBanner: React.FC<VisualBannerProps> = ({
  type,
  className = '',
  title,
  badge,
  headingTag = 'h2',
  currentLang,
}) => {
  const Tag = headingTag;
  const activeLang =
    currentLang ||
    (typeof document !== 'undefined' && (document.documentElement.lang as Language)) ||
    'fi';

  const pill1 =
    activeLang === 'sv'
      ? '✓ 100% Nöjd-kund-garanti'
      : activeLang === 'en'
      ? '✓ 100% Satisfaction Guarantee'
      : '✓ 100% Tyytyväisyystakuu';

  const pill2 =
    activeLang === 'sv'
      ? '✓ Hushållsavdrag 60%'
      : activeLang === 'en'
      ? '✓ 60% Tax Credit'
      : '✓ Kotitalousvähennys 60%';

  const pill3 =
    activeLang === 'sv'
      ? '✓ Ansvarsförsäkrad'
      : activeLang === 'en'
      ? '✓ Fully Insured & Bonded'
      : '✓ Vastuuvakuutettu';

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#10263d] via-[#163a56] to-[#12535c] text-white shadow-md ${className}`}
    >
      {/* Background graphic elements */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <svg className="h-full w-full" viewBox="0 0 800 400" preserveAspectRatio="none">
          <circle cx="700" cy="50" r="180" fill="currentColor" className="text-teal-400" />
          <circle cx="100" cy="350" r="140" fill="currentColor" className="text-orange-400" />
          <path
            d="M-50,200 Q200,100 450,250 T900,150 L900,450 L-50,450 Z"
            fill="currentColor"
            className="text-cyan-900"
          />
        </svg>
      </div>

      {/* Grid Pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col justify-between p-6 sm:p-8 min-h-[190px]">
        {badge && (
          <div className="inline-flex items-center gap-2 self-start rounded-full bg-white/10 px-3.5 py-1 text-[10.5px] font-[750] uppercase tracking-[1.55px] text-[#9ddbd1] backdrop-blur-xs border border-white/15">
            <span className="h-2 w-2 rounded-full bg-[#69dfbd]" />
            <span>{badge}</span>
          </div>
        )}

        <div className="mt-4 max-w-2xl">
          {title && (
            <Tag className={`${headingTag === 'h1' ? 'service-h1' : 'heading-h2'} font-[820] tracking-[-0.04em] text-white leading-[1.18] text-balance`}>
              {title}
            </Tag>
          )}
        </div>

        {/* Feature Pill Tags */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-[13px] sm:text-[13.5px] font-semibold text-[#e1f0f4]">
          <span className="rounded-lg bg-white/10 px-3 py-1 backdrop-blur-2xs">
            {pill1}
          </span>
          <span className="rounded-lg bg-white/10 px-3 py-1 backdrop-blur-2xs">
            {pill2}
          </span>
          <span className="rounded-lg bg-white/10 px-3 py-1 backdrop-blur-2xs">
            {pill3}
          </span>
        </div>
      </div>

      {/* Right corner decorative SVG emblem */}
      <div className="pointer-events-none absolute -bottom-6 -right-6 hidden sm:block opacity-25">
        <svg width="220" height="220" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="90" stroke="white" strokeWidth="2" strokeDasharray="6 6" />
          <path
            d="M100 20 L115 75 L170 80 L125 115 L140 170 L100 135 L60 170 L75 115 L30 80 L85 75 Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
};
