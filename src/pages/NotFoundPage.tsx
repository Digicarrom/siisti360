import React from 'react';
import { AlertCircle, Home, Search, MapPin, ArrowRight } from 'lucide-react';
import { Language, SERVICES, CITIES } from '../data/content';
import { NEIGHBORHOODS } from '../data/locations';

interface NotFoundPageProps {
  currentLang: Language;
  requestedPath: string;
  onNavigateHome: () => void;
  onNavigate: (hash: string) => void;
  onOpenSearch: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  currentLang,
  requestedPath,
  onNavigateHome,
  onNavigate,
  onOpenSearch,
}) => {
  const t = {
    title:
      currentLang === 'fi'
        ? '404 — Sivua ei löytynyt'
        : currentLang === 'sv'
        ? '404 — Sidan hittades inte'
        : '404 — Page Not Found',
    message:
      currentLang === 'fi'
        ? `Valitettavasti pyytämääsi osoitetta "${requestedPath}" ei löytynyt tai osoiterakenne on muuttunut.`
        : currentLang === 'sv'
        ? `Tyvärr hittades inte adressen "${requestedPath}" eller så har sidstrukturen ändrats.`
        : `The requested path "${requestedPath}" does not exist or may have been moved.`,
    homeBtn:
      currentLang === 'fi'
        ? 'Palaa etusivulle'
        : currentLang === 'sv'
        ? 'Tillbaka till startsidan'
        : 'Back to Home',
    searchBtn:
      currentLang === 'fi'
        ? 'Hae postinumerolla tai alueella'
        : currentLang === 'sv'
        ? 'Sök med postnummer eller område'
        : 'Search by postal code or area',
    popularServices:
      currentLang === 'fi'
        ? 'Suositut siivouspalvelut'
        : currentLang === 'sv'
        ? 'Populära städtjänster'
        : 'Popular Cleaning Services',
    popularLocations:
      currentLang === 'fi'
        ? 'Toimialueet pääkaupunkiseudulla'
        : currentLang === 'sv'
        ? 'Verksamhetsområden i huvudstadsregionen'
        : 'Service Areas in Capital Region',
    badge:
      currentLang === 'fi'
        ? 'HTTP 404 VIRHE'
        : currentLang === 'sv'
        ? 'HTTP 404 FEL'
        : 'HTTP 404 ERROR',
  };

  return (
    <div className="space-y-8 py-8 animate-in fade-in duration-200 max-w-4xl mx-auto">
      <div className="rounded-3xl border border-[#e2e9ee] bg-white p-8 sm:p-12 text-center shadow-lg space-y-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 border border-amber-200">
          <AlertCircle className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-[#087f72]">{t.badge}</span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#142c42]">
            {t.title}
          </h1>
          <p className="text-sm text-[#546b7c] max-w-lg mx-auto">
            {t.message}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 rounded-xl bg-[#10263d] px-5 py-3 text-sm font-bold text-white hover:bg-[#183c56] shadow-sm transition-all"
          >
            <Home className="h-4 w-4" />
            <span>{t.homeBtn}</span>
          </button>

          <button
            type="button"
            onClick={onOpenSearch}
            className="inline-flex items-center gap-2 rounded-xl border border-[#0d9d8c] bg-[#e5f6f1] px-5 py-3 text-sm font-bold text-[#087f72] hover:bg-[#d0f0e8] transition-all"
          >
            <Search className="h-4 w-4" />
            <span>{t.searchBtn}</span>
          </button>
        </div>
      </div>

      {/* Suggested Services & Areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Services */}
        <div className="rounded-2xl border border-[#e2e9ee] bg-white p-6 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-[#142c42]">
            {t.popularServices}
          </h2>
          <div className="space-y-2">
            {SERVICES.slice(0, 5).map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => onNavigate(`#/services/${s.slugs.en}`)}
                className="flex w-full items-center justify-between rounded-xl p-3 text-left hover:bg-[#f5f8fa] border border-[#f0f4f7] transition-all group"
              >
                <div>
                  <div className="text-xs font-bold text-[#142c42] group-hover:text-[#087f72]">
                    {s.names[currentLang]}
                  </div>
                  <div className="text-[11px] text-[#677c8d] line-clamp-1">
                    {s.desc[currentLang]}
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-[#9ab3c5] group-hover:text-[#087f72] group-hover:translate-x-0.5 transition-transform shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* Locations */}
        <div className="rounded-2xl border border-[#e2e9ee] bg-white p-6 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-[#142c42]">
            {t.popularLocations}
          </h2>
          <div className="space-y-2">
            {/* Top Cities */}
            {CITIES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => onNavigate(`#/locations/${c.id}`)}
                className="flex w-full items-center justify-between rounded-xl p-3 text-left hover:bg-[#f5f8fa] border border-[#f0f4f7] transition-all group"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#0d9d8c]" />
                  <span className="text-xs font-bold text-[#142c42] group-hover:text-[#087f72]">
                    {c.names[currentLang]}{' '}
                    ({currentLang === 'fi' ? 'Koko kaupunki' : currentLang === 'sv' ? 'Hela staden' : 'Whole City'})
                  </span>
                </div>
                <ArrowRight className="h-4 w-4 text-[#9ab3c5] group-hover:text-[#087f72] group-hover:translate-x-0.5 transition-transform shrink-0" />
              </button>
            ))}

            {/* Top Neighborhoods */}
            {['ruoholahti', 'kamppi', 'tapiola', 'leppavaara', 'tikkurila', 'myyrmaki'].map((nid) => {
              const n = NEIGHBORHOODS[nid];
              if (!n) return null;
              return (
                <button
                  key={nid}
                  type="button"
                  onClick={() => onNavigate(`#/locations/${n.cityId}/${n.slug}`)}
                  className="flex w-full items-center justify-between rounded-xl p-2.5 text-left hover:bg-[#f5f8fa] border border-[#f0f4f7] transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-[#142c42] group-hover:text-[#087f72]">
                      {n.names[currentLang]} ({n.postalCodes[0]})
                    </span>
                    <span className="text-[10px] text-[#677c8d] uppercase tracking-wide">
                      {n.cityId}
                    </span>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-[#9ab3c5] group-hover:text-[#087f72] shrink-0" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
