import React, { useState } from 'react';
import { Language } from '../data/content';
import { NeighborhoodInfo } from '../data/locations';
import {
  MapPin,
  Sparkles,
  RefreshCw,
  Search,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Tag,
} from 'lucide-react';
import { detectVisitorLocation } from '../utils/geolocation';

interface ActiveLocationBarProps {
  currentLang: Language;
  selectedNeighborhood: NeighborhoodInfo | null;
  selectedPostalCode?: string;
  onOpenLocationSearch: () => void;
  onSelectNeighborhood: (neighborhood: NeighborhoodInfo, postalCode?: string) => void;
  currentServiceSlug?: string;
  onNavigateUrl?: (url: string) => void;
  compact?: boolean;
}

export const ActiveLocationBar: React.FC<ActiveLocationBarProps> = ({
  currentLang,
  selectedNeighborhood,
  selectedPostalCode,
  onOpenLocationSearch,
  onSelectNeighborhood,
  currentServiceSlug,
  onNavigateUrl,
  compact = false,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [justRefreshed, setJustRefreshed] = useState(false);

  const handleRefreshLocation = async () => {
    setIsRefreshing(true);
    try {
      const res = await detectVisitorLocation({ enableHighAccuracy: true });
      onSelectNeighborhood(res.neighborhood, res.postalCode);
      setJustRefreshed(true);
      setTimeout(() => setJustRefreshed(false), 3500);
    } catch {
      onOpenLocationSearch();
    } finally {
      setIsRefreshing(false);
    }
  };

  if (!selectedNeighborhood) {
    return (
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-dashed border-[#a2e4d8] bg-[#f2faf7] p-3 text-xs text-[#142c42]">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-[#0d9d8c]" />
          <span>
            {currentLang === 'fi'
              ? 'Ei valittua asuinaluetta. Salli sijainti tai hae postinumerolla nähdäksesi paikalliset hinnat ja edut.'
              : currentLang === 'sv'
              ? 'Inget område valt. Tillåt plats eller sök med postnummer för lokala priser och förmåner.'
              : 'No neighborhood selected yet. Enable location or search postal code for local rates and perks.'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefreshLocation}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 rounded-lg bg-[#0d9d8c] px-3 py-1.5 font-bold text-white hover:bg-[#098072] transition-colors cursor-pointer"
          >
            <RefreshCw className={`h-3 w-3 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>
              {currentLang === 'fi'
                ? 'Tunnista sijainti'
                : currentLang === 'sv'
                ? 'Identifiera plats'
                : 'Detect Location'}
            </span>
          </button>
          <button
            onClick={onOpenLocationSearch}
            className="flex items-center gap-1 rounded-lg border border-[#0d9d8c] px-2.5 py-1.5 font-semibold text-[#087f72] hover:bg-[#e0f3ee] transition-colors cursor-pointer"
          >
            <Search className="h-3 w-3" />
            <span>
              {currentLang === 'fi' ? 'Hae' : currentLang === 'sv' ? 'Sök' : 'Search'}
            </span>
          </button>
        </div>
      </div>
    );
  }

  const pCode = selectedPostalCode || selectedNeighborhood.postalCodes[0];
  const cityName =
    selectedNeighborhood.cityId === 'helsinki'
      ? (currentLang === 'sv' ? 'Helsingfors' : 'Helsinki')
      : selectedNeighborhood.cityId === 'espoo'
      ? (currentLang === 'sv' ? 'Esbo' : 'Espoo')
      : (currentLang === 'sv' ? 'Vanda' : 'Vantaa');

  return (
    <div className="rounded-xl border border-[#a2e4d8] bg-gradient-to-r from-[#eef7f5] to-[#f4fbf9] p-3 sm:p-3.5 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        {/* Left: Location summary */}
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[#0d9d8c] text-white">
            <MapPin className="h-3.5 w-3.5" />
            <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#69dfbd] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#69dfbd]"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-[750] text-[#142c42] text-[13px]">
                {selectedNeighborhood.names[currentLang]} ({pCode})
              </span>
              <span className="text-[#0d9d8c] font-semibold text-[11px]">• {cityName}</span>
              <span className="rounded bg-[#0d9d8c]/15 px-1.5 py-0.5 text-[10px] font-bold text-[#087f72]">
                {justRefreshed
                  ? currentLang === 'fi'
                    ? 'Päivitetty juuri nyt'
                    : currentLang === 'sv'
                    ? 'Uppdaterad just nu'
                    : 'Just Updated'
                  : currentLang === 'fi'
                  ? 'Tunnistettu alue'
                  : currentLang === 'sv'
                  ? 'Identifierat område'
                  : 'Detected Area'}
              </span>
            </div>

            <p className="mt-0.5 text-[11.5px] text-[#526a7d] flex items-center gap-3">
              <span className="text-[#087f72] font-semibold">
                🟢 {currentLang === 'fi'
                  ? 'Siivoojia vapaana 24–48h'
                  : currentLang === 'sv'
                  ? 'Städare tillgängliga inom 24–48h'
                  : 'Cleaners available in 24–48h'}
              </span>
              <span>•</span>
              <span>
                {currentLang === 'fi'
                  ? '0 € matkakulut'
                  : currentLang === 'sv'
                  ? '0 € resekostnader'
                  : '0 € travel fee'}
              </span>
              <span>•</span>
              <span className="font-mono font-bold text-[#e06212]">
                -{selectedNeighborhood.specialOffer.discountPercent}% ({selectedNeighborhood.specialOffer.code})
              </span>
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 self-end sm:self-center">
          {currentServiceSlug && onNavigateUrl && (
            <button
              onClick={() => {
                const targetHash = `#/services/${currentServiceSlug}/${selectedNeighborhood.cityId}/${selectedNeighborhood.slug}`;
                onNavigateUrl(targetHash);
              }}
              className="flex items-center gap-1 rounded-lg bg-[#ff8d43] hover:bg-[#ff9b59] px-2.5 py-1.5 font-bold text-[#10263d] transition-all text-[11.5px] cursor-pointer shadow-2xs"
            >
              <span>
                {currentLang === 'fi'
                  ? `Avaa ${selectedNeighborhood.names[currentLang]} -sivu`
                  : currentLang === 'sv'
                  ? `Öppna ${selectedNeighborhood.names[currentLang]}`
                  : `Open ${selectedNeighborhood.names[currentLang]} page`}
              </span>
              <ChevronRight className="h-3 w-3" />
            </button>
          )}

          <button
            onClick={handleRefreshLocation}
            disabled={isRefreshing}
            title={
              currentLang === 'fi'
                ? 'Päivitä sijainti GPS:llä'
                : currentLang === 'sv'
                ? 'Uppdatera plats med GPS'
                : 'Refresh location via GPS'
            }
            className="flex items-center gap-1 rounded-lg border border-[#a2e4d8] bg-white px-2.5 py-1.5 font-semibold text-[#087f72] hover:bg-[#eef7f5] transition-all text-[11.5px] cursor-pointer"
          >
            <RefreshCw className={`h-3 w-3 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">
              {currentLang === 'fi'
                ? 'Päivitä GPS'
                : currentLang === 'sv'
                ? 'Uppdatera GPS'
                : 'Update GPS'}
            </span>
          </button>

          <button
            onClick={onOpenLocationSearch}
            className="flex items-center gap-1 rounded-lg border border-[#a2e4d8] bg-white px-2.5 py-1.5 font-semibold text-[#087f72] hover:bg-[#eef7f5] transition-all text-[11.5px] cursor-pointer"
          >
            <Search className="h-3 w-3" />
            <span>
              {currentLang === 'fi' ? 'Muuta' : currentLang === 'sv' ? 'Ändra' : 'Change'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
