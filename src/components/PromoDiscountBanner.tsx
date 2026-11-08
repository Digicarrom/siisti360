import React from 'react';
import { Language } from '../data/content';
import { Tag, ArrowRight, Sparkles } from 'lucide-react';

interface PromoDiscountBannerProps {
  currentLang: Language;
  onBookNow: () => void;
}

export const PromoDiscountBanner: React.FC<PromoDiscountBannerProps> = ({
  currentLang,
  onBookNow,
}) => {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#eaf4fb] via-[#f0f8fd] to-[#e4f1f9] border border-[#d3e5f2] p-5 sm:p-7 shadow-xs">
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Text & CTA */}
        <div className="space-y-3 max-w-lg text-left">
          {/* Tag */}
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[11px] font-[800] text-[#ff8d43] border border-[#ff8d43]/30 shadow-2xs uppercase tracking-wide">
            <Tag className="h-3 w-3" />
            <span>
              {currentLang === 'fi'
                ? 'Paikallinen tarjous'
                : currentLang === 'sv'
                ? 'Lokalt erbjudande'
                : 'Local Special Offer'}
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl font-[900] text-[#142c42] tracking-tight leading-tight">
            <span>
              {currentLang === 'fi'
                ? 'Ensimmäinen siivous '
                : currentLang === 'sv'
                ? 'Första städningen '
                : 'First Cleaning '}
            </span>
            <span className="text-[#ff8d43] font-mono">
              -15%
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-[13px] sm:text-[14.5px] text-[#526a7d] leading-relaxed">
            {currentLang === 'fi'
              ? 'Uusille asiakkaille Helsingissä, Espoossa ja Vantaalla. Tutustu laadukkaisiin palveluihimme ja hyödynnä etu!'
              : currentLang === 'sv'
              ? 'För nya kunder i Helsingfors, Esbo och Vanda. Prova våra städtjänster med rabatt!'
              : 'For new customers in Helsinki, Espoo, and Vantaa. Try our quality cleaning and save!'}
          </p>

          {/* Button */}
          <div className="pt-1">
            <button
              onClick={onBookNow}
              className="inline-flex items-center gap-2 rounded-xl bg-[#ff8d43] px-5 sm:px-6 py-2.5 sm:py-3 text-[13.5px] sm:text-[14.5px] font-[800] text-white hover:bg-[#ff9b59] transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <span>
                {currentLang === 'fi'
                  ? 'Varaa nyt'
                  : currentLang === 'sv'
                  ? 'Boka nu'
                  : 'Book Now'}
              </span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Right: Cleaning Supplies Basket Photo */}
        <div className="relative flex justify-center shrink-0 w-full md:w-auto">
          <div className="relative max-w-[260px] sm:max-w-[300px]">
            <img
              src="/assets/homepage/promo_basket.png"
              alt="Siisti360 Cleaning supplies and eco plant"
              className="w-full h-auto object-contain rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
