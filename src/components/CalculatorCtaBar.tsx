import React from 'react';
import { Language } from '../data/content';
import { Calculator, ChevronRight, ArrowRight } from 'lucide-react';

interface CalculatorCtaBarProps {
  currentLang: Language;
  onOpenCalculator: () => void;
}

export const CalculatorCtaBar: React.FC<CalculatorCtaBarProps> = ({
  currentLang,
  onOpenCalculator,
}) => {
  return (
    <div
      onClick={onOpenCalculator}
      className="group flex items-center justify-between rounded-2xl border border-[#e2e9ee] bg-white p-4 sm:p-5 shadow-xs hover:border-[#0d9d8c] hover:shadow-md transition-all cursor-pointer"
    >
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-[#fff3eb] text-[#ff8d43] group-hover:scale-105 transition-transform">
          <Calculator className="h-6 w-6" />
        </div>
        <div className="min-w-0">
          <h3 className="text-[15px] sm:text-[17px] font-[850] text-[#142c42] group-hover:text-[#087f72] transition-colors leading-snug truncate">
            {currentLang === 'fi'
              ? 'Laske siivouksen hinta'
              : currentLang === 'sv'
              ? 'Räkna ut städpris'
              : 'Calculate Cleaning Price'}
          </h3>
          <p className="text-[12.5px] sm:text-[13.5px] text-[#677c8d] truncate mt-0.5">
            {currentLang === 'fi'
              ? 'Saat arvion hinnasta nopeasti ja helposti.'
              : currentLang === 'sv'
              ? 'Få ett prisförslag snabbt och enkelt.'
              : 'Get a quick and transparent price estimate.'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 ml-3">
        <span className="hidden sm:inline text-[13px] font-[750] text-[#0d9d8c] group-hover:underline">
          {currentLang === 'fi' ? 'Hinta-arvioon' : currentLang === 'sv' ? 'Till kalkylatorn' : 'To Calculator'}
        </span>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0f8f6] text-[#0d9d8c] group-hover:bg-[#0d9d8c] group-hover:text-white transition-colors">
          <ChevronRight className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
};
