import React, { useState, useRef, useEffect } from 'react';
import { Language } from '../data/content';
import {
  searchLocations,
  LocationSearchResult,
  NeighborhoodInfo,
  NEIGHBORHOODS,
  FINNISH_POSTAL_CODES,
  findClosestNeighborhoodByCoords,
  getOrCreateNeighborhood,
} from '../data/locations';
import {
  MapPin,
  Search,
  Crosshair,
  Sparkles,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Building2,
  X,
  Loader2,
} from 'lucide-react';

interface HomepageLocationSearchProps {
  currentLang: Language;
  selectedNeighborhood: NeighborhoodInfo | null;
  selectedPostalCode?: string;
  onSelectNeighborhood: (neighborhood: NeighborhoodInfo | null, postalCode?: string) => void;
  onSelectCityOnly?: (cityId: 'helsinki' | 'espoo' | 'vantaa') => void;
  onNavigateToBooking: () => void;
}

export const HomepageLocationSearch: React.FC<HomepageLocationSearchProps> = ({
  currentLang,
  selectedNeighborhood,
  selectedPostalCode,
  onSelectNeighborhood,
  onSelectCityOnly,
  onNavigateToBooking,
}) => {
  const [query, setQuery] = useState('');
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'warning'; text: string } | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpenDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const results = searchLocations(query, currentLang);

  const handleDetectGPS = () => {
    if (!navigator.geolocation) {
      setStatusMessage({
        type: 'warning',
        text:
          currentLang === 'fi'
            ? 'Selaimesi ei tue paikannusta.'
            : currentLang === 'sv'
            ? 'Din webbläsare stöder inte positionsbestämning.'
            : 'Browser geolocation not supported.',
      });
      return;
    }
    setIsLocating(true);
    setStatusMessage(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        const match = findClosestNeighborhoodByCoords(pos.coords.latitude, pos.coords.longitude);
        if (!match.isWithinCapitalRegion) {
          setStatusMessage({
            type: 'warning',
            text:
              currentLang === 'fi'
                ? `Sijaintisi on pääkaupunkiseudun ulkopuolella (~${match.distanceKm} km). Voit valita toimialueen alta.`
                : currentLang === 'sv'
                ? `Din position är utanför huvudstadsregionen (~${match.distanceKm} km). Välj ett område nedan.`
                : `Outside capital region (~${match.distanceKm} km). Please pick an area below.`,
          });
        } else {
          onSelectNeighborhood(match.neighborhood, match.neighborhood.postalCodes[0]);
          setStatusMessage({
            type: 'success',
            text:
              currentLang === 'fi'
                ? `Tunnistettu: ${match.neighborhood.names.fi}! Sisältö ja hinnat päivitetty.`
                : currentLang === 'sv'
                ? `Identifierad: ${match.neighborhood.names.sv}! Innehåll och priser uppdaterade.`
                : `Identified: ${match.neighborhood.names.en}! Content and pricing updated.`,
          });
          setIsOpenDropdown(false);
        }
      },
      (err) => {
        setIsLocating(false);
        setStatusMessage({
          type: 'warning',
          text:
            currentLang === 'fi'
              ? 'Sijaintilupa evätty. Voit hakea syöttämällä postinumeron (esim. 00180).'
              : currentLang === 'sv'
              ? 'Platsbehörighet nekad. Du kan söka med postnummer (t.ex. 00180).'
              : 'Permission denied. You can search by postal code (e.g. 00180).',
        });
      },
      { timeout: 9000, enableHighAccuracy: true }
    );
  };

  const handleSelectResult = (res: LocationSearchResult) => {
    if (!res.isCovered) {
      setStatusMessage({
        type: 'warning',
        text:
          currentLang === 'fi'
            ? `Postinumero ${res.postalCode} on toimialueemme (Helsinki, Espoo, Vantaa) ulkopuolella.`
            : currentLang === 'sv'
            ? `Postnummer ${res.postalCode} är utanför vårt verksamhetsområde.`
            : `Postal code ${res.postalCode} is outside our coverage.`,
      });
      return;
    }

    if (res.type === 'city') {
      if (onSelectCityOnly) onSelectCityOnly(res.cityId);
      onSelectNeighborhood(null);
      setQuery('');
      setIsOpenDropdown(false);
      return;
    }

    const neigh = res.neighborhoodId
      ? NEIGHBORHOODS[res.neighborhoodId] || getOrCreateNeighborhood(res.neighborhoodId)
      : null;

    if (neigh) {
      onSelectNeighborhood(neigh, res.postalCode || neigh.postalCodes[0]);
      setQuery('');
      setIsOpenDropdown(false);
      setStatusMessage({
        type: 'success',
        text:
          currentLang === 'fi'
            ? `Alue valittu: ${neigh.names.fi} (${res.postalCode || neigh.postalCodes[0]})`
            : currentLang === 'sv'
            ? `Område valt: ${neigh.names.sv} (${res.postalCode || neigh.postalCodes[0]})`
            : `Area selected: ${neigh.names.en} (${res.postalCode || neigh.postalCodes[0]})`,
      });
    }
  };

  return (
    <div className="relative rounded-2xl border border-[#cbd5e1] bg-white p-4 sm:p-6 shadow-lg" ref={dropdownRef}>
      {/* Active Location Banner if selected */}
      {selectedNeighborhood ? (
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-[#a2e4d8] bg-[#eef7f5] p-3.5 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#0d9d8c] text-white">
              <CheckCircle className="h-4 w-4" />
            </div>
            <div>
              <p className="font-bold text-[#087f72] text-[13px]">
                {currentLang === 'fi'
                  ? 'Aktiivinen palvelualue:'
                  : currentLang === 'sv'
                  ? 'Aktivt verksamhetsområde:'
                  : 'Active Service Area:'}{' '}
                <span className="text-[#142c42]">{selectedNeighborhood.names[currentLang]}</span>
                {selectedPostalCode && <span className="font-mono text-[#087f72]"> ({selectedPostalCode})</span>}
              </p>
              <p className="text-[#14534a] text-[11.5px]">
                {currentLang === 'fi'
                  ? 'Kaikki siivouspalvelut, hinnat, aluetarjoukset ja varaustiedot on kohdistettu tähän osoitteeseen.'
                  : currentLang === 'sv'
                  ? 'Alla städtjänster, priser, erbjudanden och bokningstider är anpassade till denna adress.'
                  : 'All cleaning services, prices, offers, and booking slots are localized to this address.'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onSelectNeighborhood(null)}
              className="rounded-lg border border-[#a2e4d8] bg-white px-3 py-1.5 font-bold text-[#087f72] hover:bg-[#dff1ed]"
            >
              {currentLang === 'fi'
                ? 'Vaihda / Nollaa'
                : currentLang === 'sv'
                ? 'Ändra / Återställ'
                : 'Change / Reset'}
            </button>
          </div>
        </div>
      ) : null}

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-[#142c42]">
            {currentLang === 'fi'
              ? 'Löydä siivouspalvelut omalla alueellasi'
              : currentLang === 'sv'
              ? 'Hitta städtjänster i ditt område'
              : 'Find Cleaning Services in Your Area'}
          </label>
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-[#0d9d8c]">
            <Sparkles className="h-3 w-3" />
            {currentLang === 'fi' ? 'Helsinki · Espoo · Vantaa' : 'Helsinki · Espoo · Vantaa'}
          </span>
        </div>

        {/* Input & Action Bar */}
        <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-[#677c8d]" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpenDropdown(true);
              }}
              onFocus={() => setIsOpenDropdown(true)}
              placeholder={
                currentLang === 'fi'
                  ? 'Hae postinumerolla (esim. 00180) tai nimellä (Kamppi, Tapiola...)'
                  : currentLang === 'sv'
                  ? 'Sök med postnummer (t.ex. 00180) eller stadsdel...'
                  : 'Search by postal code (e.g. 00180) or area (Ruoholahti, Kamppi)...'
              }
              className="w-full rounded-xl border border-[#cbd5e1] bg-white py-3 pl-10 pr-8 text-sm font-medium text-[#142c42] placeholder-[#94a3b8] shadow-2xs focus:border-[#0d9d8c] focus:outline-hidden focus:ring-2 focus:ring-[#0d9d8c]/20"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-3 text-xs text-[#94a3b8] hover:text-[#142c42]"
              >
                ✕
              </button>
            )}
          </div>

          <button
            onClick={handleDetectGPS}
            disabled={isLocating}
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl border border-[#e2e9ee] bg-[#f8fafb] px-4 py-3 text-xs sm:text-sm font-bold text-[#142c42] shadow-2xs hover:border-[#0d9d8c] hover:bg-[#eef7f5] hover:text-[#087f72] transition-colors disabled:opacity-50"
            title="Tunnista sijainti automaattisesti selaimen GPS:llä"
          >
            {isLocating ? (
              <Loader2 className="h-4 w-4 animate-spin text-[#0d9d8c]" />
            ) : (
              <Crosshair className="h-4 w-4 text-[#0d9d8c]" />
            )}
            <span className="whitespace-nowrap">
              {currentLang === 'fi'
                ? 'Tunnista sijainti'
                : currentLang === 'sv'
                ? 'Identifiera plats'
                : 'Detect Location'}
            </span>
          </button>
        </div>

        {/* Status notification */}
        {statusMessage && (
          <div
            className={`mt-2 flex items-center gap-2 rounded-lg p-2.5 text-xs ${
              statusMessage.type === 'success'
                ? 'bg-[#eef7f5] text-[#087f72] border border-[#a2e4d8]'
                : 'bg-amber-50 text-amber-800 border border-amber-200'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <Sparkles className="h-3.5 w-3.5 shrink-0" />
            ) : (
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Quick Example Search Links */}
        <div className="pt-2 flex flex-wrap items-center gap-1.5 text-xs text-[#677c8d]">
          <span className="font-semibold text-[#142c42]">
            {currentLang === 'fi'
              ? 'Esimerkkihaut:'
              : currentLang === 'sv'
              ? 'Exempelsökningar:'
              : 'Example searches:'}
          </span>
          {[
            { label: '00180 — Ruoholahti', code: '00180', id: 'ruoholahti' },
            { label: 'Kamppi', code: '00100', id: 'kamppi' },
            { label: 'Lauttasaari', code: '00200', id: 'lauttasaari' },
            { label: 'Tapiola (Espoo)', code: '02100', id: 'tapiola' },
            { label: 'Tikkurila (Vantaa)', code: '01300', id: 'tikkurila' },
          ].map((ex) => (
            <button
              key={ex.label}
              type="button"
              onClick={() => {
                const neigh = NEIGHBORHOODS[ex.id];
                if (neigh) {
                  onSelectNeighborhood(neigh, ex.code);
                  setQuery('');
                  setIsOpenDropdown(false);
                }
              }}
              className="rounded-md border border-[#e2e9ee] bg-[#f8fafb] px-2 py-0.5 text-[11px] font-semibold text-[#142c42] hover:border-[#0d9d8c] hover:bg-[#eef7f5] hover:text-[#087f72] transition-colors"
            >
              {ex.label}
            </button>
          ))}
        </div>
      </div>

      {/* Autocomplete Dropdown overlay */}
      {isOpenDropdown && query.trim().length > 0 && (
        <div className="absolute left-0 right-0 top-full z-40 mt-1 max-h-72 overflow-y-auto rounded-xl border border-[#cbd5e1] bg-white shadow-xl">
          {results.length === 0 ? (
            <div className="p-4 text-center text-xs text-[#677c8d]">
              {currentLang === 'fi'
                ? 'Ei suoraa osumaa. Kokeile viisinumeroista postinumeroa (esim. 00180) tai kaupunginosaa.'
                : 'No results found. Try a 5-digit postal code (e.g. 00180) or area name.'}
            </div>
          ) : (
            <div className="divide-y divide-[#e2e9ee]">
              {results.map((res) => (
                <button
                  key={res.id}
                  type="button"
                  onClick={() => handleSelectResult(res)}
                  className="flex w-full items-center justify-between p-3 text-left transition-colors hover:bg-[#f5f8fa]"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                        res.isCovered ? 'bg-[#e5f6f1] text-[#087f72]' : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {res.type === 'city' ? (
                        <Building2 className="h-3.5 w-3.5" />
                      ) : (
                        <MapPin className="h-3.5 w-3.5" />
                      )}
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-[#142c42]">{res.primaryText}</p>
                      <p className="text-[11px] text-[#677c8d]">{res.secondaryText}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-[#94a3b8]" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
