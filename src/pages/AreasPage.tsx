import React from 'react';
import { Language, CITIES } from '../data/content';
import { TRANSLATIONS } from '../data/translations';
import { VisualBanner } from '../components/VisualBanner';
import { NEIGHBORHOODS } from '../data/locations';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { BreadcrumbItem } from '../utils/urlHierarchy';
import { MapPin, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { NeighborhoodInfo } from '../data/locations';
import { ActiveLocationBar } from '../components/ActiveLocationBar';

interface AreasPageProps {
  currentLang: Language;
  breadcrumbs?: BreadcrumbItem[];
  selectedNeighborhood?: NeighborhoodInfo | null;
  selectedPostalCode?: string;
  onNavigateUrl?: (url: string) => void;
  onSelectCity: (cityId: string) => void;
  onSelectNeighborhood?: (neighborhoodId: string) => void;
  onSelectNeighborhoodObject?: (neighborhood: NeighborhoodInfo, postalCode?: string) => void;
  onNavigateToQuote: () => void;
  onOpenLocationSearch?: () => void;
}

export const AreasPage: React.FC<AreasPageProps> = ({
  currentLang,
  breadcrumbs,
  selectedNeighborhood,
  selectedPostalCode,
  onNavigateUrl,
  onSelectCity,
  onSelectNeighborhood,
  onSelectNeighborhoodObject,
  onNavigateToQuote,
  onOpenLocationSearch,
}) => {
  const t = TRANSLATIONS[currentLang];
  const ap = t.areasPage;

  const defaultBreadcrumbs: BreadcrumbItem[] = [
    { label: t.nav.home, url: '#/' },
    { label: t.nav.areas, url: '#/locations', isCurrent: true },
  ];

  const handleNavigate = (url: string) => {
    if (onNavigateUrl) {
      onNavigateUrl(url);
    } else {
      window.location.hash = url.startsWith('#') ? url : `#${url}`;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Dynamic Breadcrumbs */}
      <Breadcrumbs
        items={breadcrumbs && breadcrumbs.length > 0 ? breadcrumbs : defaultBreadcrumbs}
        currentLang={currentLang}
        onNavigate={handleNavigate}
        onOpenLocationSearch={onOpenLocationSearch}
      />

      {/* Active Location Banner */}
      <ActiveLocationBar
        currentLang={currentLang}
        selectedNeighborhood={selectedNeighborhood || null}
        selectedPostalCode={selectedPostalCode}
        onOpenLocationSearch={onOpenLocationSearch || (() => {})}
        onSelectNeighborhood={onSelectNeighborhoodObject || (() => {})}
        onNavigateUrl={handleNavigate}
      />

      {/* Highlighted Detected Neighborhood Card if present */}
      {selectedNeighborhood && (
        <section className="rounded-2xl border-2 border-[#0d9d8c] bg-gradient-to-br from-[#f2faf7] to-white p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 rounded-full bg-[#0d9d8c] animate-pulse"></span>
                <span className="text-[11px] font-[800] uppercase tracking-[1.3px] text-[#087f72]">
                  {ap.detectedAreaTitle}
                </span>
                <span className="rounded bg-[#0d9d8c] px-2 py-0.5 text-[10.5px] font-bold text-white font-mono">
                  {selectedPostalCode || selectedNeighborhood.postalCodes[0]}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-[780] text-[#142c42]">
                {selectedNeighborhood.names[currentLang]},{' '}
                {selectedNeighborhood.cityId === 'helsinki'
                  ? 'Helsinki'
                  : selectedNeighborhood.cityId === 'espoo'
                  ? 'Espoo'
                  : 'Vantaa'}
              </h2>

              <p className="text-xs sm:text-sm text-[#526a7d] leading-relaxed">
                {selectedNeighborhood.heroIntro[currentLang]}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 self-start md:self-center">
              <button
                onClick={() => {
                  const url = `#/locations/${selectedNeighborhood.cityId}/${selectedNeighborhood.slug}`;
                  handleNavigate(url);
                }}
                className="flex min-h-[42px] items-center gap-2 rounded-xl bg-[#0d9d8c] hover:bg-[#098072] px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-xs transition-all cursor-pointer"
              >
                <span>{ap.exploreAreaGuide.replace('{name}', selectedNeighborhood.names[currentLang])}</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => {
                  const url = `#/services/deep-cleaning/${selectedNeighborhood.cityId}/${selectedNeighborhood.slug}`;
                  handleNavigate(url);
                }}
                className="flex min-h-[42px] items-center gap-1.5 rounded-xl border border-[#0d9d8c] bg-white hover:bg-[#e0f3ee] px-3.5 py-2 text-xs sm:text-sm font-bold text-[#087f72] transition-all cursor-pointer"
              >
                <Sparkles className="h-3.5 w-3.5 text-[#0d9d8c]" />
                <span>{ap.viewCleanings}</span>
              </button>
            </div>
          </div>
        </section>
      )}

      <VisualBanner
        type="helsinki"
        badge={ap.badge}
        title={ap.title}
        headingTag="h1"
      />

      {/* Intro */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-[#142c42] sm:text-3xl">
          {t.nav.areas} — {t.brandTagline}
        </h2>
        <p className="mt-1 text-sm text-[#677c8d] max-w-2xl leading-relaxed">
          {ap.subtitle}
        </p>
      </div>

      {/* 3 Main City Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {CITIES.map((city) => (
          <article
            key={city.id}
            role="button"
            tabIndex={0}
            onClick={() => onSelectCity(city.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectCity(city.id);
              }
            }}
            className="group cursor-pointer flex flex-col justify-between rounded-2xl border border-[#e2e9ee] bg-white p-6 shadow-xs hover:border-[#0d9d8c] hover:shadow-md transition-all text-left"
          >
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e5f6f1] text-[#0d9d8c] mb-4 group-hover:bg-[#0d9d8c] group-hover:text-white transition-colors">
                <MapPin className="h-6 w-6" />
              </div>

              <h3 className="text-xl font-bold text-[#142c42] group-hover:text-[#087f72] transition-colors">
                {city.names[currentLang]}
              </h3>

              <p className="mt-2 text-xs text-[#677c8d] leading-relaxed">
                {city.text[currentLang]}
              </p>

              <div className="mt-4 pt-3 border-t border-[#f0f4f7]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#087f72]">
                  {ap.districtsLabel}
                </span>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {city.districts.map((d, i) => (
                    <span
                      key={i}
                      className="rounded-md bg-[#f5f8fa] px-2 py-0.5 text-[11px] text-[#486581] font-medium"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#f0f4f7]">
              <div
                className="flex w-full items-center justify-between rounded-xl bg-[#10263d] px-4 py-2.5 text-xs font-bold text-white group-hover:bg-[#087f72] transition-colors"
              >
                <span>{ap.cityServicesBtn.replace('{city}', city.names[currentLang])}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Dedicated Neighborhoods Directory with Verified Postal Codes */}
      <section className="rounded-2xl border border-[#cbd5e1] bg-white p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#e2e9ee] pb-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#0d9d8c] uppercase tracking-wider">
              <Sparkles className="h-4 w-4" />
              <span>{ap.localSeoBadge}</span>
            </div>
            <h2 className="mt-1 text-xl sm:text-2xl font-[800] text-[#142c42]">
              {ap.localSeoTitle}
            </h2>
          </div>
          <span className="text-xs text-[#677c8d]">
            {ap.localSeoSubtitle}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.values(NEIGHBORHOODS).map((neigh) => (
            <div
              key={neigh.id}
              onClick={() => onSelectNeighborhood?.(neigh.id)}
              className="group cursor-pointer flex flex-col justify-between overflow-hidden rounded-xl border border-[#e2e9ee] bg-white shadow-2xs hover:border-[#0d9d8c] hover:shadow-lg transition-all"
            >
              {neigh.heroImage && (
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img
                    src={neigh.heroImage}
                    alt={neigh.names[currentLang]}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 left-2.5 rounded-md bg-white/90 backdrop-blur-xs px-2.5 py-1 text-[11px] font-bold text-[#142c42] flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-[#0d9d8c]" />
                    <span>{neigh.postalCodes[0]}</span>
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 rounded bg-[#ff8d43] px-2 py-0.5 text-[10.5px] font-bold text-[#10263d] font-mono">
                    {neigh.specialOffer.code} (-15%)
                  </div>
                </div>
              )}
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-[#142c42] group-hover:text-[#087f72] transition-colors">
                    {neigh.names[currentLang]}
                  </h3>
                  <span className="text-[11px] font-semibold text-[#087f72] uppercase tracking-wide">
                    {neigh.cityId}
                  </span>
                </div>
                <p className="text-xs text-[#677c8d] line-clamp-2 leading-relaxed">
                  {neigh.heroIntro[currentLang]}
                </p>
                <div className="pt-2 flex items-center justify-between border-t border-[#f0f4f7] text-xs font-bold text-[#087f72]">
                  <span>{ap.openAreaBtn}</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Travel and Service Promise */}
      <section className="rounded-2xl border border-[#e2e9ee] bg-gradient-to-r from-[#eef7f5] to-white p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#087f72]">
            <ShieldCheck className="h-4 w-4" />
            <span>{ap.travelPromiseBadge}</span>
          </div>
          <h3 className="text-lg font-bold text-[#142c42]">
            {ap.travelPromiseTitle}
          </h3>
          <p className="text-xs text-[#677c8d] leading-relaxed">
            {ap.travelPromiseDesc}
          </p>
        </div>

        <button
          onClick={onNavigateToQuote}
          className="flex items-center gap-2 rounded-xl bg-[#ff8d43] px-6 py-3 text-xs font-bold text-[#10263d] hover:bg-[#ff9b59] transition-colors shadow-xs shrink-0 cursor-pointer"
        >
          <span>{ap.ctaQuote}</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </section>
    </div>
  );
};
