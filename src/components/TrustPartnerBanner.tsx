import React from 'react';
import { Language } from '../data/content';
import { ShieldCheck, Users, Zap, MapPin } from 'lucide-react';

interface TrustPartnerProps {
  currentLang: Language;
}

export const TrustPartnerBanner: React.FC<TrustPartnerProps> = ({ currentLang }) => {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-[#f8f5ee] border border-[#ebe4d8] p-6 sm:p-8 text-[#142c42] shadow-xs">
      {/* Left Plant Graphic */}
      <div className="pointer-events-none absolute left-0 bottom-0 top-0 w-24 hidden md:flex items-center opacity-85">
        <img
          src="/assets/homepage/trust_plant.png"
          alt="Eco Green Plant"
          className="h-full object-contain object-left"
        />
      </div>

      {/* Right Cleaning Bottles Graphic */}
      <div className="pointer-events-none absolute right-0 bottom-0 top-0 w-28 hidden md:flex items-center justify-end opacity-90">
        <img
          src="/assets/homepage/trust_bottles.png"
          alt="Cleaning Supplies"
          className="h-full object-contain object-right"
        />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto space-y-6">
        {/* Banner Title */}
        <h2 className="text-xl sm:text-2xl lg:text-[25px] font-[850] tracking-tight text-[#142c42]">
          {currentLang === 'fi'
            ? 'Luotettu siivouskumppani pääkaupunkiseudulla'
            : currentLang === 'sv'
            ? 'En pålitlig städpartner i huvudstadsregionen'
            : 'A Trusted Cleaning Partner in the Helsinki Region'}
        </h2>

        {/* 4 Metrics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-2">
          {/* Stat 1 */}
          <div className="flex flex-col items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#0d9d8c] shadow-2xs mb-2">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-[900] text-[#142c42] font-mono leading-tight">
              2,500+
            </div>
            <div className="text-[12px] sm:text-[13px] font-[650] text-[#677c8d] mt-1">
              {currentLang === 'fi'
                ? 'Vahvistettua siivoojaa'
                : currentLang === 'sv'
                ? 'Verifierade städare'
                : 'Verified cleaners'}
            </div>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#ff8d43] shadow-2xs mb-2">
              <Users className="h-5 w-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-[900] text-[#142c42] font-mono leading-tight">
              50,000+
            </div>
            <div className="text-[12px] sm:text-[13px] font-[650] text-[#677c8d] mt-1">
              {currentLang === 'fi'
                ? 'Tyytyväistä asiakasta'
                : currentLang === 'sv'
                ? 'Nöjda kunder'
                : 'Happy customers'}
            </div>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#f59e0b] shadow-2xs mb-2">
              <Zap className="h-5 w-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-[900] text-[#142c42] font-mono leading-tight">
              &lt; 2 h
            </div>
            <div className="text-[12px] sm:text-[13px] font-[650] text-[#677c8d] mt-1">
              {currentLang === 'fi'
                ? 'Keskim. vastausaika'
                : currentLang === 'sv'
                ? 'Genomsnittlig svarstid'
                : 'Average response time'}
            </div>
          </div>

          {/* Stat 4 */}
          <div className="flex flex-col items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#0d9d8c] shadow-2xs mb-2">
              <MapPin className="h-5 w-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-[900] text-[#142c42] font-mono leading-tight">
              8+
            </div>
            <div className="text-[12px] sm:text-[13px] font-[650] text-[#677c8d] mt-1">
              {currentLang === 'fi'
                ? 'Palvelualuetta'
                : currentLang === 'sv'
                ? 'Verksamhetsområden'
                : 'Service areas'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
