import React from 'react';
import { Language } from '../data/content';
import { ArrowRight, Sparkles } from 'lucide-react';

interface BottomCtaProps {
  currentLang: Language;
  onGetQuote: () => void;
}

export const BottomCtaBanner: React.FC<BottomCtaProps> = ({ currentLang, onGetQuote }) => {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0b8376] via-[#0d9d8c] to-[#0c786d] p-7 sm:p-10 text-white shadow-md">
      {/* Sparkle graphics in background */}
      <div className="pointer-events-none absolute right-1/4 top-1/2 -translate-y-1/2 text-white/20">
        <Sparkles className="h-24 w-24" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-1.5 max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-[850] tracking-tight text-white leading-tight">
            {currentLang === 'fi'
              ? 'Valmis puhtaampaan kotiin tai toimitilaan?'
              : currentLang === 'sv'
              ? 'Redo för ett renare hem eller kontor?'
              : 'Ready for a cleaner home or office?'}
          </h2>
          <p className="text-[14px] sm:text-[15.5px] text-teal-100/90 leading-relaxed">
            {currentLang === 'fi'
              ? 'Pyydä nopea, sitoumukseton tarjous ja varaa luotettu siivooja alueeltasi.'
              : currentLang === 'sv'
              ? 'Få ett snabbt och förutsättningslöst prisförslag och boka en pålitlig städare i ditt område.'
              : 'Get a quick, no-obligation quote and book a trusted cleaner in your area.'}
          </p>
        </div>

        <button
          onClick={onGetQuote}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#ff8d43] px-7 py-4 text-[14.5px] sm:text-[15.5px] font-[800] text-[#10263d] shadow-sm hover:bg-[#ff9b59] transition-all self-start md:self-auto shrink-0 cursor-pointer active:scale-98"
        >
          <span>
            {currentLang === 'fi'
              ? 'Pyydä tarjous'
              : currentLang === 'sv'
              ? 'Få din offert'
              : 'Get Your Quote'}
          </span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
};
