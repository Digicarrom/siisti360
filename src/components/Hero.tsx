import React, { useState } from 'react';
import { Language } from '../data/content';
import { TRANSLATIONS } from '../data/translations';
import {
  MapPin,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Leaf,
  Sparkles,
  Search,
  Users,
} from 'lucide-react';
import {
  NeighborhoodInfo,
  NEIGHBORHOODS,
  FINNISH_POSTAL_CODES,
  findNeighborhoodByPostalCode,
} from '../data/locations';

interface HeroProps {
  currentLang: Language;
  selectedNeighborhood: NeighborhoodInfo | null;
  selectedPostalCode?: string;
  onSelectNeighborhood: (neighborhood: NeighborhoodInfo | null, postalCode?: string) => void;
  onSelectCityOnly?: (cityId: 'helsinki' | 'espoo' | 'vantaa') => void;
  onNavigateToBooking: () => void;
  onNavigateToCalculator?: () => void;
  onOpenLocationModal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentLang,
  selectedNeighborhood,
  selectedPostalCode,
  onSelectNeighborhood,
  onSelectCityOnly,
  onNavigateToBooking,
  onOpenLocationModal,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Suggestions for postal codes / neighborhoods
  const suggestions = React.useMemo(() => {
    if (!searchInput.trim()) return { postalMatches: [], neighborhoodMatches: [] };
    const query = searchInput.toLowerCase().trim();

    const postalMatches = FINNISH_POSTAL_CODES
      .filter((entry) => entry.code.startsWith(query) || entry.neighborhoodName.toLowerCase().includes(query))
      .slice(0, 4)
      .map((entry) => ({
        type: 'postal' as const,
        code: entry.code,
        name: entry.neighborhoodName,
      }));

    const neighborhoodMatches = Object.values(NEIGHBORHOODS)
      .filter((n) =>
        n.names.fi.toLowerCase().includes(query) ||
        n.names.en.toLowerCase().includes(query) ||
        n.cityId.toLowerCase().includes(query)
      )
      .slice(0, 4)
      .map((n) => ({
        type: 'neighborhood' as const,
        neighborhood: n,
      }));

    return { postalMatches, neighborhoodMatches };
  }, [searchInput]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) {
      onOpenLocationModal?.();
      return;
    }
    const clean = searchInput.trim();
    if (/^\d{5}$/.test(clean)) {
      const match = findNeighborhoodByPostalCode(clean);
      if (match) {
        onSelectNeighborhood(match, clean);
      }
    } else {
      const found = Object.values(NEIGHBORHOODS).find(
        (n) => n.names.fi.toLowerCase().includes(clean.toLowerCase()) || n.names.en.toLowerCase().includes(clean.toLowerCase())
      );
      if (found) {
        onSelectNeighborhood(found, found.postalCodes[0]);
      }
    }
    onNavigateToBooking();
  };

  const quickCities = [
    { name: 'Helsinki', id: 'helsinki' as const },
    { name: 'Espoo', id: 'espoo' as const },
    { name: 'Vantaa', id: 'vantaa' as const },
    { name: 'Kamppi', neighId: 'kamppi' },
    { name: 'Ruoholahti', neighId: 'ruoholahti' },
  ];

  return (
    <div className="w-full space-y-4">
      {/* Curved Cyan / Light Blue Hero Container */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#e8f4f9] via-[#edf7fb] to-[#d6edf6] p-5 sm:p-8 lg:p-12 border border-[#d2e8f1] shadow-xs">
        {/* Background Decorative Cyan Waves (matches mockup wave shape) */}
        <div className="pointer-events-none absolute -left-12 -top-12 h-72 w-72 rounded-full border-[24px] border-[#cbeaf4]/40 bg-transparent" />
        <div className="pointer-events-none absolute right-1/4 -bottom-20 h-80 w-80 rounded-full border-[28px] border-[#d4eef7]/50 bg-transparent" />

        <div className="relative z-10 grid grid-cols-1 items-center gap-6 lg:gap-8 lg:grid-cols-12">
          {/* Left Column: Headlines, Search Pill, Quick City Chips */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            {/* Main Headline with highlighted region */}
            <h1 className="text-[28px] sm:text-[38px] lg:text-[46px] font-[850] text-[#142c42] leading-[1.14] tracking-[-0.035em]">
              <span>
                {currentLang === 'fi'
                  ? 'Ammattilaisen siivouspalvelut '
                  : currentLang === 'sv'
                  ? 'Professionella städtjänster '
                  : 'Professional Cleaning Services '}
              </span>
              <span className="text-[#ff8d43] block sm:inline">
                {currentLang === 'fi'
                  ? 'Helsingissä, Espoossa ja Vantaalla'
                  : currentLang === 'sv'
                  ? 'i Helsingfors, Esbo och Vanda'
                  : 'in Helsinki, Espoo & Vantaa'}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-xl text-[13.5px] sm:text-[15.5px] text-[#526a7d] leading-[1.6]">
              {currentLang === 'fi'
                ? 'Kodin, toimiston ja yritysten siivous – luotettavasti, laadukkaasti ja joustavasti.'
                : currentLang === 'sv'
                ? 'Städning för hem, kontor och företag – pålitligt, högkvalitativt och flexibelt.'
                : 'Cleaning for homes, offices and businesses – reliably, with high quality and flexibility.'}
            </p>

            {/* Search / Quote Input Bar (white pill card) */}
            <div className="relative max-w-xl pt-1">
              <form
                onSubmit={handleSearchSubmit}
                className="relative flex items-center justify-between rounded-full border border-[#cbdce5] bg-white p-1.5 pl-3.5 sm:pl-5 shadow-xs focus-within:border-[#0d9d8c] focus-within:ring-2 focus-within:ring-[#0d9d8c]/20 transition-all"
              >
                <div className="flex flex-1 items-center gap-2 sm:gap-2.5 min-w-0 pr-2">
                  <MapPin className="h-4 w-4 text-[#ff8d43] shrink-0" />
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => {
                      setSearchInput(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder={
                      currentLang === 'fi'
                        ? 'Etsi kaupunki, alue tai postinumero...'
                        : currentLang === 'sv'
                        ? 'Sök stad, område eller postnummer...'
                        : 'Search city, area or postal code...'
                    }
                    className="w-full bg-transparent text-[13px] sm:text-[14px] text-[#142c42] placeholder-[#8ca2b2] outline-hidden truncate font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-full bg-[#ff8d43] px-4 sm:px-6 py-2.5 sm:py-3 text-[13px] sm:text-[14px] font-[750] text-white hover:bg-[#ff9b59] transition-all shadow-xs shrink-0 cursor-pointer active:scale-95"
                >
                  <Search className="h-4 w-4 sm:hidden" />
                  <span className="hidden sm:inline">
                    {currentLang === 'fi' ? 'Hae' : currentLang === 'sv' ? 'Sök' : 'Search'}
                  </span>
                  <ArrowRight className="h-4 w-4 hidden sm:inline" />
                </button>
              </form>

              {/* Autocomplete Dropdown */}
              {showSuggestions && searchInput.trim().length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 z-30 rounded-2xl border border-[#e2e9ee] bg-white p-2 shadow-xl">
                  {suggestions.postalMatches?.map((p) => (
                    <button
                      key={p.code}
                      type="button"
                      onClick={() => {
                        const n = findNeighborhoodByPostalCode(p.code);
                        if (n) onSelectNeighborhood(n, p.code);
                        setSearchInput(`${p.code} ${p.name}`);
                        setShowSuggestions(false);
                        onNavigateToBooking();
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-[#142c42] hover:bg-[#eef7f5] hover:text-[#087f72] rounded-xl flex items-center justify-between"
                    >
                      <span className="font-bold">{p.code} — {p.name}</span>
                      <span className="text-[#0d9d8c] text-[11px]">Valitse</span>
                    </button>
                  ))}
                  {suggestions.neighborhoodMatches?.map((item) => (
                    <button
                      key={item.neighborhood.id}
                      type="button"
                      onClick={() => {
                        onSelectNeighborhood(item.neighborhood, item.neighborhood.postalCodes[0]);
                        setSearchInput(item.neighborhood.names[currentLang]);
                        setShowSuggestions(false);
                        onNavigateToBooking();
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-[#142c42] hover:bg-[#eef7f5] hover:text-[#087f72] rounded-xl flex items-center justify-between"
                    >
                      <span>{item.neighborhood.names[currentLang]} ({item.neighborhood.cityId})</span>
                      <span className="text-[#0d9d8c] text-[11px]">Valitse</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick City Filter Chips (Matches the mobile mockup pill chips row) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
              {quickCities.map((c) => {
                const isSelected =
                  selectedNeighborhood?.cityId === c.id ||
                  selectedNeighborhood?.id === c.neighId;
                return (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => {
                      if (c.neighId) {
                        const n = NEIGHBORHOODS[c.neighId];
                        if (n) onSelectNeighborhood(n, n.postalCodes[0]);
                      } else if (c.id && onSelectCityOnly) {
                        onSelectCityOnly(c.id);
                      }
                    }}
                    className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-1 text-[12px] font-[700] transition-all cursor-pointer shadow-2xs shrink-0 ${
                      isSelected
                        ? 'bg-[#0d9d8c] text-white'
                        : 'bg-white text-[#142c42] border border-[#d8e4eb] hover:border-[#0d9d8c] hover:bg-[#f0f8f6]'
                    }`}
                  >
                    <MapPin className={`h-3 w-3 ${isSelected ? 'text-white' : 'text-[#0d9d8c]'}`} />
                    <span>{c.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Cleaner Photography with Sparkles */}
          <div className="relative lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[280px] sm:max-w-[340px] lg:max-w-none">
              {/* Floating Sparkle Accents */}
              <div className="absolute top-4 left-4 z-20 text-[#0d9d8c] animate-pulse">
                <Sparkles className="h-6 w-6" />
              </div>

              {/* Cleaner Image with rounded border */}
              <div className="overflow-hidden rounded-2xl shadow-lg border-2 border-white/80 bg-white">
                <img
                  src="/assets/homepage/hero_cleaner.png"
                  alt="Siisti360 Professional Cleaner"
                  className="w-full h-auto object-cover transform hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Trust Badges Strip (Matches the 4 badges row in both mobile screenshots) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 pt-1">
        <div className="flex items-center gap-2.5 rounded-2xl border border-[#e2e9ee] bg-white p-3 sm:p-4 shadow-2xs">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#ecfdf5] text-[#10b981]">
            <Leaf className="h-4 w-4" />
          </div>
          <span className="text-[12px] sm:text-[13px] font-[750] text-[#142c42] leading-tight">
            {currentLang === 'fi'
              ? 'Turvalliset puhdistusaineet'
              : currentLang === 'sv'
              ? 'Säkra rengöringsmedel'
              : 'Safe cleaning agents'}
          </span>
        </div>

        <div className="flex items-center gap-2.5 rounded-2xl border border-[#e2e9ee] bg-white p-3 sm:p-4 shadow-2xs">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#eef7fd] text-[#0d9d8c]">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <span className="text-[12px] sm:text-[13px] font-[750] text-[#142c42] leading-tight">
            {currentLang === 'fi'
              ? 'Luotettava palvelu'
              : currentLang === 'sv'
              ? 'Pålitlig service'
              : 'Reliable service'}
          </span>
        </div>

        <div className="flex items-center gap-2.5 rounded-2xl border border-[#e2e9ee] bg-white p-3 sm:p-4 shadow-2xs">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#fff7ed] text-[#ff8d43]">
            <Calendar className="h-4 w-4" />
          </div>
          <span className="text-[12px] sm:text-[13px] font-[750] text-[#142c42] leading-tight">
            {currentLang === 'fi'
              ? 'Joustavat varaukset'
              : currentLang === 'sv'
              ? 'Flexibla bokningar'
              : 'Flexible bookings'}
          </span>
        </div>

        <div className="flex items-center gap-2.5 rounded-2xl border border-[#e2e9ee] bg-white p-3 sm:p-4 shadow-2xs">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f0fdfa] text-[#0d9d8c]">
            <Users className="h-4 w-4" />
          </div>
          <span className="text-[12px] sm:text-[13px] font-[750] text-[#142c42] leading-tight">
            {currentLang === 'fi'
              ? 'Tyytyväiset asiakkaat'
              : currentLang === 'sv'
              ? 'Nöjda kunder'
              : 'Satisfied customers'}
          </span>
        </div>
      </div>
    </div>
  );
};
