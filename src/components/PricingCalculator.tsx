import React, { useState, useMemo } from 'react';
import { Language } from '../data/content';
import { TRANSLATIONS } from '../data/translations';
import {
  calculateEstimate,
  formatEuro,
  PricingModel,
  ServiceType,
  ExtraOption,
  DEMO_RATES,
} from '../utils/pricing';
import { Calculator, ArrowRight, Check, Sparkles, Clock, Info } from 'lucide-react';

import { NeighborhoodInfo } from '../data/locations';

interface PricingCalculatorProps {
  currentLang: Language;
  selectedNeighborhood?: NeighborhoodInfo | null;
  selectedPostalCode?: string;
  onProceedToBooking: (data: {
    model: PricingModel;
    service: ServiceType;
    area: number;
    extras: ExtraOption[];
    city?: 'helsinki' | 'espoo' | 'vantaa';
    postalCode?: string;
  }) => void;
  isStandalone?: boolean;
}

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({
  currentLang,
  selectedNeighborhood,
  selectedPostalCode,
  onProceedToBooking,
  isStandalone = false,
}) => {
  const t = TRANSLATIONS[currentLang];
  const HeadingTag = isStandalone ? 'h1' : 'h2';
  const [model, setModel] = useState<PricingModel>('hourly');
  const [service, setService] = useState<ServiceType>('standard');
  const [area, setArea] = useState<number>(75);
  const [selectedExtras, setSelectedExtras] = useState<ExtraOption[]>([]);

  const toggleExtra = (extra: ExtraOption) => {
    setSelectedExtras((prev) =>
      prev.includes(extra) ? prev.filter((e) => e !== extra) : [...prev, extra]
    );
  };

  const estimate = useMemo(() => {
    try {
      return calculateEstimate({
        model,
        service,
        area: Math.max(10, Math.min(1000, area || 50)),
        extras: selectedExtras,
      });
    } catch {
      return null;
    }
  }, [model, service, area, selectedExtras]);

  const calcTitle = selectedNeighborhood
    ? currentLang === 'fi'
      ? `Laske siivouskustannus: ${selectedNeighborhood.names[currentLang]}`
      : currentLang === 'sv'
      ? `Beräkna städkostnad i ${selectedNeighborhood.names[currentLang]}`
      : `Estimate Cleaning Cost in ${selectedNeighborhood.names[currentLang]}`
    : t.calculator.title;

  const calcSubtitle = selectedNeighborhood
    ? currentLang === 'fi'
      ? `Tarkka hinta-arvio ja saatavuus kohteeseen ${selectedNeighborhood.names[currentLang]} (${selectedPostalCode || selectedNeighborhood.postalCodes[0]}). Sisältää aluetakuun ja 60% kotitalousvähennyksen.`
      : currentLang === 'sv'
      ? `Prisuppskattning för ${selectedNeighborhood.names[currentLang]} (${selectedPostalCode || selectedNeighborhood.postalCodes[0]}).`
      : `Accurate price estimate for ${selectedNeighborhood.names[currentLang]} (${selectedPostalCode || selectedNeighborhood.postalCodes[0]}). Includes 60% tax deduction.`
    : t.calculator.subtitle;

  return (
    <section id="calculator" className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-[10.5px] font-[750] uppercase tracking-[1.55px] text-[#0d9d8c]">
            {selectedNeighborhood
              ? `${selectedNeighborhood.names[currentLang].toUpperCase()} (${selectedPostalCode || selectedNeighborhood.postalCodes[0]})`
              : t.calculator.badge}
          </span>
          {selectedNeighborhood && (
            <span className="rounded-full bg-[#eef7f5] px-2 py-0.5 text-[10.5px] font-bold text-[#087f72] border border-[#a2e4d8]">
              {t.calculator.verifiedArea}
            </span>
          )}
        </div>
        <HeadingTag className="mt-1 text-2xl sm:text-3xl font-[780] tracking-[-0.045em] text-[#142c42] leading-[1.2]">
          {calcTitle}
        </HeadingTag>
        <p className="mt-1.5 text-[15px] sm:text-[16px] text-[#526a7d] max-w-2xl leading-[1.6]">
          {calcSubtitle}
        </p>
      </div>

      {/* Demo Notice Banner */}
      <div className="flex items-start gap-3 rounded-xl border border-[#f4d69d] bg-[#fff7e9] p-4 text-[13.5px] text-[#745229] leading-relaxed">
        <Info className="h-5 w-5 shrink-0 text-[#d97706] mt-0.5" />
        <div>
          <strong className="font-bold">{t.pricing.demoNotice}</strong>
          <p className="mt-1 text-[#855e2d]">{t.calculator.disclaimer}</p>
        </div>
      </div>

      {/* Main Calculator Layout */}
      <div className="grid grid-cols-1 gap-6 rounded-2xl border border-[#e2e9ee] bg-white p-6 shadow-sm lg:grid-cols-12">
        {/* Left Form Controls */}
        <div className="space-y-5 lg:col-span-7">
          {/* Model Selector Tabs */}
          <div>
            <label className="text-[13.5px] font-bold text-[#142c42]">{t.calculator.modelLabel}</label>
            <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {(['hourly', 'fixed', 'monthly', 'contract', 'oneTime'] as PricingModel[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setModel(m)}
                  className={`flex flex-col items-start min-h-[44px] rounded-xl border p-3 text-left transition-all ${
                    model === m
                      ? 'border-[#0d9d8c] bg-[#eef7f5] text-[#087f72] ring-1 ring-[#0d9d8c]'
                      : 'border-[#e2e9ee] bg-[#f8fafb] text-[#526a7d] hover:bg-[#eef3f6]'
                  }`}
                >
                  <span className="text-[13px] font-[750] leading-tight">{t.pricing.models[m].title}</span>
                  <span className="mt-1 text-[12px] font-bold text-[#142c42] font-mono">
                    {t.pricing.models[m].price}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Service Dropdown */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="calc-service" className="text-[13.5px] font-bold text-[#142c42]">
                {t.calculator.serviceLabel}
              </label>
              <select
                id="calc-service"
                value={service}
                onChange={(e) => setService(e.target.value as ServiceType)}
                className="mt-1.5 w-full min-h-[44px] rounded-xl border border-[#ccd9e0] bg-white px-3 py-2 text-sm font-semibold text-[#142c42] focus:border-[#0d9d8c] focus:outline-hidden"
              >
                <option value="standard">{t.calculator.serviceNames.standard}</option>
                <option value="deep">{t.calculator.serviceNames.deep}</option>
                <option value="move">{t.calculator.serviceNames.move}</option>
                <option value="office">{t.calculator.serviceNames.office}</option>
                <option value="carpet">{t.calculator.serviceNames.carpet}</option>
                <option value="sofa">{t.calculator.serviceNames.sofa}</option>
              </select>
            </div>

            {/* Area Slider & Input */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="calc-area" className="text-[13.5px] font-bold text-[#142c42]">
                  {t.calculator.areaLabel}
                </label>
                <span className="text-sm font-bold text-[#0d9d8c] font-mono">{area} m²</span>
              </div>
              <div className="mt-1.5 flex items-center gap-3">
                <input
                  id="calc-area"
                  type="range"
                  min="20"
                  max="350"
                  step="5"
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="h-2 w-full cursor-pointer accent-[#0d9d8c]"
                />
                <input
                  type="number"
                  min="10"
                  max="1000"
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="w-20 min-h-[44px] rounded-xl border border-[#ccd9e0] px-2.5 py-2 text-center text-sm font-bold text-[#142c42] font-mono"
                />
              </div>
            </div>
          </div>

          {/* Add-ons Checkboxes */}
          <div>
            <span className="text-[13.5px] font-bold text-[#142c42]">{t.calculator.extrasLegend}</span>
            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {(['windows', 'oven', 'fridge', 'sofa'] as ExtraOption[]).map((extraKey) => {
                const checked = selectedExtras.includes(extraKey);
                return (
                  <button
                    key={extraKey}
                    type="button"
                    onClick={() => toggleExtra(extraKey)}
                    className={`flex items-center justify-between min-h-[44px] rounded-xl border px-3 py-2.5 text-[13.5px] transition-colors ${
                      checked
                        ? 'border-[#0d9d8c] bg-[#eef7f5] text-[#087f72]'
                        : 'border-[#e2e9ee] bg-[#f8fafb] text-[#526a7d] hover:bg-[#eef3f6]'
                    }`}
                  >
                    <span className="font-semibold">{t.calculator.extras[extraKey]}</span>
                    <div
                      className={`flex h-4 w-4 items-center justify-center rounded border ${
                        checked ? 'border-[#0d9d8c] bg-[#0d9d8c] text-white' : 'border-[#ccd9e0] bg-white'
                      }`}
                    >
                      {checked && <Check className="h-3 w-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Output Card */}
        <div className="flex flex-col justify-between rounded-2xl bg-gradient-to-br from-[#10263d] to-[#183c56] p-6 text-white lg:col-span-5 shadow-inner">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-[11.5px] font-[750] uppercase tracking-[1.55px] text-[#9ddbd1]">
                {t.pricing.models[model].title}
              </span>
              <span className="rounded bg-white/10 px-2 py-0.5 text-xs font-mono text-[#a2e4d8]">
                {area} m²
              </span>
            </div>

            {/* Estimated Hours */}
            <div>
              <div className="flex items-center gap-1.5 text-[13px] text-[#b8d1dc]">
                <Clock className="h-4 w-4 text-[#0d9d8c]" />
                <span>{t.calculator.estimatedHours}</span>
              </div>
              <div className="mt-1 text-2xl sm:text-3xl font-[820] font-mono tracking-tight text-white">
                {estimate ? `${estimate.hours} h` : '—'}
                {estimate?.visits === 4 && <span className="text-sm font-normal text-[#9ddbd1]">{t.calculator.visitsMonthLabel}</span>}
              </div>
            </div>

            {/* Estimated Total Price */}
            <div>
              <div className="flex items-center gap-1.5 text-[13px] text-[#b8d1dc]">
                <Sparkles className="h-4 w-4 text-[#ff8d43]" />
                <span>{t.calculator.estimatedPrice}</span>
              </div>
              <div className="mt-1 text-3xl sm:text-4xl font-[820] font-mono text-[#ff8d43]">
                {estimate ? formatEuro(estimate.total, currentLang) : '—'}
                <span className="text-xs font-normal text-[#c8d8e1]">
                  {model === 'monthly' || model === 'contract' ? ` / ${t.pricing.month}` : ` / ${t.pricing.visit}`}
                </span>
              </div>
            </div>

            {/* Kotitalousvähennys highlight */}
            <div className="rounded-xl bg-white/5 p-3.5 text-[12.5px] text-[#c8d8e1] leading-relaxed border border-white/10">
              💡 <strong>{t.calculator.taxCreditTitle}</strong>{' '}
              {t.calculator.taxCreditDesc.replace(
                '{amount}',
                estimate ? formatEuro(Math.round(estimate.total * 0.4), currentLang) : '—'
              )}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 space-y-3">
            <button
              onClick={() =>
                onProceedToBooking({
                  model,
                  service,
                  area,
                  extras: selectedExtras,
                  city: selectedNeighborhood ? selectedNeighborhood.cityId : undefined,
                  postalCode: selectedPostalCode || selectedNeighborhood?.postalCodes[0],
                })
              }
              className="flex w-full min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#ff8d43] px-5 py-3 text-[14px] sm:text-[15px] font-[750] text-[#10263d] shadow-md transition-all hover:bg-[#ff9b59] active:translate-y-0"
            >
              <span>{t.calculator.proceedToBooking}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <p className="text-center text-[11px] text-[#8ea7b8] leading-tight">
              {t.calculator.noCommitment}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
