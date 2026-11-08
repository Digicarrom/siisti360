import React from 'react';
import { Language } from '../data/content';
import { TRANSLATIONS } from '../data/translations';
import { VisualBanner } from '../components/VisualBanner';
import { PriceComparison } from '../components/PriceComparison';
import { ArrowRight, Check, Info } from 'lucide-react';
import { NeighborhoodInfo } from '../data/locations';
import { ActiveLocationBar } from '../components/ActiveLocationBar';

interface PricingPageProps {
  currentLang: Language;
  selectedNeighborhood?: NeighborhoodInfo | null;
  selectedPostalCode?: string;
  onNavigateToCalculator: () => void;
  onNavigateToBooking: () => void;
  onOpenLocationSearch?: () => void;
  onSelectNeighborhood?: (neighborhood: NeighborhoodInfo, postalCode?: string) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({
  currentLang,
  selectedNeighborhood,
  selectedPostalCode,
  onNavigateToCalculator,
  onNavigateToBooking,
  onOpenLocationSearch,
  onSelectNeighborhood,
}) => {
  const t = TRANSLATIONS[currentLang];
  const pp = t.pricingPage;

  const models = [
    {
      id: 'hourly',
      name: t.pricing.models.hourly.title,
      price: t.pricing.models.hourly.price,
      desc: t.pricing.models.hourly.desc,
      features: pp.features.hourly,
    },
    {
      id: 'fixed',
      name: t.pricing.models.fixed.title,
      price: t.pricing.models.fixed.price,
      desc: t.pricing.models.fixed.desc,
      features: pp.features.fixed,
    },
    {
      id: 'monthly',
      name: t.pricing.models.monthly.title,
      price: t.pricing.models.monthly.price,
      desc: t.pricing.models.monthly.desc,
      features: pp.features.monthly,
    },
    {
      id: 'contract',
      name: t.pricing.models.contract.title,
      price: t.pricing.models.contract.price,
      desc: t.pricing.models.contract.desc,
      features: pp.features.contract,
    },
    {
      id: 'oneTime',
      name: t.pricing.models.oneTime.title,
      price: t.pricing.models.oneTime.price,
      desc: t.pricing.models.oneTime.desc,
      features: pp.features.oneTime,
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Active Location Banner */}
      <ActiveLocationBar
        currentLang={currentLang}
        selectedNeighborhood={selectedNeighborhood || null}
        selectedPostalCode={selectedPostalCode}
        onOpenLocationSearch={onOpenLocationSearch || (() => {})}
        onSelectNeighborhood={onSelectNeighborhood || (() => {})}
      />

      <VisualBanner
        type="pricing"
        badge={pp.badge}
        title={pp.title}
        headingTag="h1"
        currentLang={currentLang}
      />

      {/* Demo Notice */}
      <div className="flex items-start gap-3 rounded-xl border border-[#f4d69d] bg-[#fff7e9] p-4 text-xs text-[#745229]">
        <Info className="h-5 w-5 shrink-0 text-[#d97706]" />
        <div>
          <strong className="font-bold">{t.pricing.demoNotice}</strong>
          <p className="mt-0.5 text-[#855e2d]">{pp.demoNote}</p>
        </div>
      </div>

      {/* Pricing Model Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {models.map((m) => (
          <article
            key={m.id}
            className="flex flex-col justify-between rounded-2xl border border-[#e2e9ee] bg-white p-6 shadow-xs hover:border-[#0d9d8c] hover:shadow-md transition-all"
          >
            <div>
              <span className="type-eyebrow text-[#0d9d8c]">
                {pp.modelEyebrow}
              </span>
              <h3 className="mt-1 text-[19px] font-[760] text-[#142c42] leading-snug">{m.name}</h3>
              <div className="mt-2 text-[21px] sm:text-[25px] font-[820] font-mono-numbers text-[#ff8d43]">{m.price}</div>
              <p className="mt-2 text-[13.5px] sm:text-[14px] text-[#526a7d] leading-[1.6]">{m.desc}</p>

              <ul className="mt-4 space-y-2.5 border-t border-[#f0f4f7] pt-4 text-[13px] sm:text-[13.5px] text-[#334e68]">
                {m.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-[#0d9d8c] shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={onNavigateToCalculator}
              className="mt-6 flex w-full min-h-[45px] items-center justify-center gap-2 rounded-xl bg-[#10263d] py-2.5 text-[13.5px] sm:text-[14px] font-[750] text-white hover:bg-[#1b3d5c] transition-colors touch-target"
            >
              <span>{pp.ctaCalculate}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </article>
        ))}
      </div>

      {/* Competitor Price Comparison Table */}
      <PriceComparison
        currentLang={currentLang}
        onNavigateToCalculator={onNavigateToCalculator}
      />
    </div>
  );
};
