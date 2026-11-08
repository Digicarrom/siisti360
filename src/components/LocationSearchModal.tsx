import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../data/content';
import {
  FINNISH_POSTAL_CODES,
  NEIGHBORHOODS,
  NeighborhoodInfo,
  PostalCodeEntry,
  searchLocations,
  LocationSearchResult,
  findClosestNeighborhoodByCoords,
  getOrCreateNeighborhood,
} from '../data/locations';
import {
  MapPin,
  Search,
  Crosshair,
  X,
  Check,
  AlertCircle,
  Building2,
  ChevronRight,
  Sparkles,
  Loader2,
} from 'lucide-react';

interface LocationSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  selectedNeighborhood: NeighborhoodInfo | null;
  onSelectNeighborhood: (neighborhood: NeighborhoodInfo | null, postalCode?: string) => void;
  onSelectCityOnly?: (cityId: 'helsinki' | 'espoo' | 'vantaa') => void;
}

export const LocationSearchModal: React.FC<LocationSearchModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  selectedNeighborhood,
  onSelectNeighborhood,
  onSelectCityOnly,
}) => {
  const [query, setQuery] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [geoNotice, setGeoNotice] = useState<{ type: 'success' | 'warning' | 'error'; message: string } | null>(null);
  const [multiChoiceEntry, setMultiChoiceEntry] = useState<PostalCodeEntry | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setGeoNotice(null);
      setMultiChoiceEntry(null);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const searchResults = searchLocations(query, currentLang);

  // Handle browser geolocation
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setGeoNotice({
        type: 'error',
        message:
          currentLang === 'fi'
            ? 'Selaimesi ei tue sijaintipaikannusta.'
            : currentLang === 'sv'
            ? 'Din webbläsare stöder inte positionsbestämning.'
            : 'Your browser does not support geolocation.',
      });
      return;
    }

    setIsLocating(true);
    setGeoNotice(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        const { latitude, longitude } = pos.coords;
        const match = findClosestNeighborhoodByCoords(latitude, longitude);

        if (!match.isWithinCapitalRegion) {
          setGeoNotice({
            type: 'warning',
            message:
              currentLang === 'fi'
                ? `Sijaintisi havaittiin pääkaupunkiseudun ulkopuolella (~${match.distanceKm} km Helsingistä). Siisti360 palvelee Helsingissä, Espoossa ja Vantaalla. Voit valita haluamasi alueen alta.`
                : currentLang === 'sv'
                ? `Din position är utanför huvudstadsregionen (~${match.distanceKm} km). Siisti360 betjänar Helsingfors, Esbo och Vanda.`
                : `Your location was detected outside the capital region (~${match.distanceKm} km away). Siisti360 serves Helsinki, Espoo and Vantaa. You can choose a service area below.`,
          });
        } else {
          setGeoNotice({
            type: 'success',
            message:
              currentLang === 'fi'
                ? `Sijainti tunnistettu: ${match.neighborhood.names.fi}! Hinnat ja palvelut personoitu alueellesi.`
                : currentLang === 'sv'
                ? `Position identifierad: ${match.neighborhood.names.sv}!`
                : `Location detected: ${match.neighborhood.names.en}! Content personalized for your area.`,
          });
          onSelectNeighborhood(match.neighborhood, match.neighborhood.postalCodes[0]);
          setTimeout(() => onClose(), 1200);
        }
      },
      (err) => {
        setIsLocating(false);
        let msg = currentLang === 'fi' ? 'Sijainnin haku epäonnistui tai lupa evättiin.' : 'Could not detect location.';
        if (err.code === err.PERMISSION_DENIED) {
          msg =
            currentLang === 'fi'
              ? 'Sijaintilupa evätty. Voit valita alueesi helposti syöttämällä postinumeron (esim. 00180).'
              : currentLang === 'sv'
              ? 'Platsbehörighet nekad. Ange ditt postnummer (t.ex. 00180).'
              : 'Location permission denied. You can easily enter a postal code (e.g. 00180).';
        }
        setGeoNotice({ type: 'warning', message: msg });
      },
      { timeout: 9000, enableHighAccuracy: true }
    );
  };

  const handleSelectResult = (res: LocationSearchResult) => {
    if (!res.isCovered) {
      setGeoNotice({
        type: 'warning',
        message:
          currentLang === 'fi'
            ? `Postinumero ${res.postalCode} on Siisti360:n nykyisen toimialueen (Helsinki, Espoo, Vantaa) ulkopuolella. Laajennamme pian!`
            : currentLang === 'sv'
            ? `Postnummer ${res.postalCode} är för närvarande utanför vårt verksamhetsområde (Helsingfors, Esbo, Vanda). Vi expanderar snart!`
            : `Postal code ${res.postalCode} is currently outside our service area (Helsinki, Espoo, Vantaa). We are expanding soon!`,
      });
      return;
    }

    if (res.type === 'city') {
      if (onSelectCityOnly) onSelectCityOnly(res.cityId);
      onSelectNeighborhood(null);
      onClose();
      return;
    }

    if (res.postalCode) {
      const entry = FINNISH_POSTAL_CODES.find((e) => e.code === res.postalCode);
      if (entry && entry.secondaryNeighborhoods && entry.secondaryNeighborhoods.length > 0) {
        setMultiChoiceEntry(entry);
        return;
      }
    }

    const targetNeigh = res.neighborhoodId
      ? NEIGHBORHOODS[res.neighborhoodId] || getOrCreateNeighborhood(res.neighborhoodId)
      : null;

    if (targetNeigh) {
      onSelectNeighborhood(targetNeigh, res.postalCode || targetNeigh.postalCodes[0]);
      onClose();
    }
  };

  const handlePickSpecificSubArea = (neighborhoodName: string) => {
    if (!multiChoiceEntry) return;
    const baseNeigh =
      NEIGHBORHOODS[multiChoiceEntry.neighborhoodId] ||
      getOrCreateNeighborhood(multiChoiceEntry.neighborhoodId);
    if (baseNeigh) {
      onSelectNeighborhood(baseNeigh, multiChoiceEntry.code);
    }
    setMultiChoiceEntry(null);
    onClose();
  };

  const popularAreas = [
    { id: 'ruoholahti', name: 'Ruoholahti (00180)', city: 'Helsinki' },
    { id: 'kamppi', name: 'Kamppi (00100)', city: 'Helsinki' },
    { id: 'lauttasaari', name: 'Lauttasaari (00200)', city: 'Helsinki' },
    { id: 'tapiola', name: 'Tapiola (02100)', city: 'Espoo' },
    { id: 'leppavaara', name: 'Leppävaara (02600)', city: 'Espoo' },
    { id: 'tikkurila', name: 'Tikkurila (01300)', city: 'Vantaa' },
    { id: 'kallio', name: 'Kallio (00530)', city: 'Helsinki' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl border border-[#e2e9ee]">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#e2e9ee] bg-[#f8fafb] px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e5f6f1] text-[#087f72]">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#142c42]">
                {currentLang === 'fi'
                  ? 'Valitse tai hae toimialue'
                  : currentLang === 'sv'
                  ? 'Välj städområde'
                  : 'Select or Search Service Location'}
              </h2>
              <p className="text-xs text-[#677c8d]">
                {currentLang === 'fi'
                  ? 'Helsinki · Espoo · Vantaa (kaikki postinumerot)'
                  : currentLang === 'sv'
                  ? 'Helsingfors · Esbo · Vanda (alla postnummer)'
                  : 'Helsinki · Espoo · Vantaa (all postal codes)'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#677c8d] hover:bg-[#eef3f6] hover:text-[#142c42]"
            aria-label="Sulje"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Geolocation Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={handleDetectLocation}
              disabled={isLocating}
              type="button"
              className="flex items-center justify-center gap-2 rounded-xl border border-[#0d9d8c] bg-[#eef7f5] px-4 py-2.5 text-xs sm:text-[13px] font-bold text-[#087f72] shadow-2xs hover:bg-[#dff1ed] transition-colors disabled:opacity-60"
            >
              {isLocating ? (
                <Loader2 className="h-4 w-4 animate-spin text-[#0d9d8c]" />
              ) : (
                <Crosshair className="h-4 w-4 text-[#0d9d8c]" />
              )}
              <span>
                {isLocating
                  ? currentLang === 'fi'
                    ? 'Tunnistetaan sijaintia...'
                    : currentLang === 'sv'
                    ? 'Identifierar plats...'
                    : 'Locating...'
                  : currentLang === 'fi'
                  ? 'Käytä nykyistä sijaintiani (GPS)'
                  : currentLang === 'sv'
                  ? 'Använd min plats (GPS)'
                  : 'Use My Current Location (GPS)'}
              </span>
            </button>

            {selectedNeighborhood && (
              <button
                onClick={() => {
                  onSelectNeighborhood(null);
                  onClose();
                }}
                type="button"
                className="text-xs text-[#677c8d] underline hover:text-[#142c42] py-2 text-center"
              >
                {currentLang === 'fi'
                  ? 'Palauta: Koko pääkaupunkiseutu'
                  : currentLang === 'sv'
                  ? 'Återställ: Hela regionen'
                  : 'Reset to All Capital Cities'}
              </button>
            )}
          </div>

          {/* Feedback Notice */}
          {geoNotice && (
            <div
              className={`flex items-start gap-2.5 rounded-xl p-3.5 text-xs leading-relaxed ${
                geoNotice.type === 'success'
                  ? 'bg-[#eef7f5] border border-[#a2e4d8] text-[#087f72]'
                  : 'bg-[#fff7e9] border border-[#f4d69d] text-[#855e2d]'
              }`}
            >
              {geoNotice.type === 'success' ? (
                <Sparkles className="h-4 w-4 shrink-0 text-[#0d9d8c] mt-0.5" />
              ) : (
                <AlertCircle className="h-4 w-4 shrink-0 text-[#d97706] mt-0.5" />
              )}
              <span>{geoNotice.message}</span>
            </div>
          )}

          {/* Search Input Bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-[#677c8d]" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                currentLang === 'fi'
                  ? 'Kirjoita postinumero (esim. 00180) tai kaupunginosa...'
                  : currentLang === 'sv'
                  ? 'Ange postnummer (t.ex. 00180) eller stadsdel...'
                  : 'Enter postal code (e.g. 00180) or neighborhood...'
              }
              className="w-full rounded-xl border border-[#cbd5e1] bg-white py-3 pl-10 pr-4 text-sm font-medium text-[#142c42] placeholder-[#94a3b8] shadow-2xs focus:border-[#0d9d8c] focus:outline-hidden focus:ring-2 focus:ring-[#0d9d8c]/20"
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

          {/* Multi-Neighborhood Choice Modal Sub-view (e.g. 00180 has Ruoholahti & Jätkäsaari) */}
          {multiChoiceEntry && (
            <div className="rounded-xl border border-[#a2e4d8] bg-[#f0f9f7] p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#0d9d8c]" />
                <span className="text-xs font-bold text-[#087f72] uppercase tracking-wider">
                  {currentLang === 'fi'
                    ? `Postinumero ${multiChoiceEntry.code} kattaa useamman osa-alueen`
                    : currentLang === 'sv'
                    ? `Postnummer ${multiChoiceEntry.code} omfattar flera delområden`
                    : `Postal code ${multiChoiceEntry.code} spans multiple neighborhoods`}
                </span>
              </div>
              <p className="text-xs text-[#14534a]">
                {currentLang === 'fi'
                  ? 'Valitse tarkka kotisiivous- tai toimitilakohteesi:'
                  : currentLang === 'sv'
                  ? 'Välj ditt specifika städområde:'
                  : 'Please pick your specific target quarter:'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handlePickSpecificSubArea(multiChoiceEntry.neighborhoodName)}
                  className="flex items-center justify-between rounded-lg border border-[#0d9d8c] bg-white p-2.5 text-left text-xs font-bold text-[#142c42] hover:bg-[#eef7f5]"
                >
                  <span>{multiChoiceEntry.neighborhoodName}</span>
                  <Check className="h-3.5 w-3.5 text-[#0d9d8c]" />
                </button>
                {multiChoiceEntry.secondaryNeighborhoods?.map((sec) => (
                  <button
                    key={sec}
                    type="button"
                    onClick={() => handlePickSpecificSubArea(sec)}
                    className="flex items-center justify-between rounded-lg border border-[#cbd5e1] bg-white p-2.5 text-left text-xs font-medium text-[#142c42] hover:border-[#0d9d8c] hover:bg-[#eef7f5]"
                  >
                    <span>{sec}</span>
                    <ChevronRight className="h-3.5 w-3.5 text-[#677c8d]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results List */}
          {query.trim().length > 0 && !multiChoiceEntry && (
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#677c8d]">
                {currentLang === 'fi'
                  ? 'Hakutulokset'
                  : currentLang === 'sv'
                  ? 'Sökresultat'
                  : 'Search Results'}{' '}
                ({searchResults.length})
              </span>
              {searchResults.length === 0 ? (
                <div className="rounded-xl border border-dashed border-[#cbd5e1] p-4 text-center text-xs text-[#677c8d]">
                  {currentLang === 'fi'
                    ? 'Ei suoraa osumaa. Kokeile viisinumeroista postinumeroa (esim. 00180) tai kaupunkia (Helsinki, Espoo, Vantaa).'
                    : currentLang === 'sv'
                    ? 'Ingen direkt träff. Prova med femsiffrigt postnummer (t.ex. 00180) eller stadsnamn.'
                    : 'No direct match. Try a 5-digit postal code (e.g. 00180) or city name.'}
                </div>
              ) : (
                <div className="divide-y divide-[#e2e9ee] rounded-xl border border-[#e2e9ee] bg-white overflow-hidden">
                  {searchResults.map((res) => (
                    <button
                      key={res.id}
                      type="button"
                      onClick={() => handleSelectResult(res)}
                      className="flex w-full items-center justify-between p-3 text-left transition-colors hover:bg-[#f5f8fa]"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                            res.isCovered ? 'bg-[#e5f6f1] text-[#087f72]' : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {res.type === 'city' ? (
                            <Building2 className="h-4 w-4" />
                          ) : (
                            <MapPin className="h-4 w-4" />
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

          {/* Popular Areas Quick Selection */}
          {!query && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#677c8d]">
                  {currentLang === 'fi'
                    ? 'Suositut kaupunginosat'
                    : currentLang === 'sv'
                    ? 'Populära stadsdelar'
                    : 'Popular Neighborhoods'}
                </span>
                <span className="text-[11px] text-[#0d9d8c] font-semibold">
                  {currentLang === 'fi'
                    ? 'Pääkaupunkiseutu'
                    : currentLang === 'sv'
                    ? 'Huvudstadsregionen'
                    : 'Capital Region'}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularAreas.map((p) => {
                  const isSelected = selectedNeighborhood?.id === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        const neigh = NEIGHBORHOODS[p.id];
                        if (neigh) {
                          onSelectNeighborhood(neigh, neigh.postalCodes[0]);
                          onClose();
                        }
                      }}
                      className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${
                        isSelected
                          ? 'border-[#0d9d8c] bg-[#e5f6f1] text-[#087f72] ring-1 ring-[#0d9d8c]'
                          : 'border-[#e2e9ee] bg-[#f8fafb] text-[#142c42] hover:border-[#cbd5e1] hover:bg-white'
                      }`}
                    >
                      <MapPin className={`h-3 w-3 ${isSelected ? 'text-[#0d9d8c]' : 'text-[#677c8d]'}`} />
                      <span>{p.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3 Main Regional Cities Hubs */}
          <div className="rounded-xl border border-[#e2e9ee] bg-[#f8fafb] p-3.5 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#677c8d]">
              {currentLang === 'fi'
                ? 'Pääkaupungit'
                : currentLang === 'sv'
                ? 'Metropolområden'
                : 'Metropolitan Hubs'}
            </span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'helsinki' as const, name: 'Helsinki', desc: '00100–00990' },
                { id: 'espoo' as const, name: 'Espoo', desc: '02100–02980' },
                { id: 'vantaa' as const, name: 'Vantaa', desc: '01200–01770' },
              ].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    if (onSelectCityOnly) onSelectCityOnly(c.id);
                    onSelectNeighborhood(null);
                    onClose();
                  }}
                  className="rounded-lg border border-[#e2e9ee] bg-white p-2.5 text-center transition-colors hover:border-[#0d9d8c] hover:bg-[#eef7f5]"
                >
                  <p className="text-xs font-bold text-[#142c42]">{c.name}</p>
                  <p className="text-[10px] text-[#677c8d]">{c.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-[#e2e9ee] bg-[#f8fafb] px-6 py-3 flex items-center justify-between text-xs text-[#677c8d]">
          <span>
            {currentLang === 'fi'
              ? 'Tietosuoja: Sijaintiasi käytetään ainoastaan siivoussisältöjen ja saatavuuden näyttämiseen.'
              : currentLang === 'sv'
              ? 'Integritet: Din plats används endast för att visa lokala städtjänster och tillgänglighet.'
              : 'Privacy: Your location is only used to display local services and availability.'}
          </span>
          <button
            onClick={onClose}
            className="font-bold text-[#142c42] hover:underline"
          >
            {currentLang === 'fi' ? 'Sulje' : currentLang === 'sv' ? 'Stäng' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
