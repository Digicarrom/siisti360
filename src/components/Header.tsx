import React, { useState, useRef, useEffect } from 'react';
import { Language, SERVICES, CITIES } from '../data/content';
import { TRANSLATIONS } from '../data/translations';
import {
  Menu,
  Globe,
  MapPin,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Phone,
  Home,
} from 'lucide-react';
import { NeighborhoodInfo } from '../data/locations';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenMobileMenu: () => void;
  onNavigateToQuote: () => void;
  onNavigateHome: () => void;
  onNavigateUrl?: (url: string) => void;
  activeSection: string;
  selectedNeighborhood?: NeighborhoodInfo | null;
  selectedPostalCode?: string;
  onOpenLocationModal?: () => void;
  onRequestLocationDetect?: () => void;
  isDetectingLocation?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  onOpenMobileMenu,
  onNavigateToQuote,
  onNavigateHome,
  onNavigateUrl = (url: string) => {
    window.location.hash = url.startsWith('#') ? url : `#${url}`;
  },
  activeSection,
  selectedNeighborhood,
  selectedPostalCode,
  onOpenLocationModal,
}) => {
  const t = TRANSLATIONS[currentLang];
  const [openDropdown, setOpenDropdown] = useState<'services' | 'areas' | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const locationDisplayText = selectedNeighborhood
    ? `${selectedNeighborhood.names[currentLang]}${selectedPostalCode ? ` (${selectedPostalCode})` : ''}`
    : 'Helsinki / Espoo / Vantaa';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#e5edf2] bg-white shadow-2xs">
      <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-3.5 sm:px-6 lg:px-8">
        {/* Left: Brand Logo & Location Pill */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Logo with house/sparkle icon or orbit */}
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2 text-left cursor-pointer group"
          >
            {/* Mobile Home & Sparkle Badge */}
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-[#eef7fd] text-[#0d9d8c] sm:hidden">
              <div className="relative">
                <Home className="h-5 w-5 text-[#0d9d8c]" />
                <Sparkles className="h-2.5 w-2.5 text-[#ff8d43] absolute -top-1 -right-1" />
              </div>
            </div>

            <div>
              <div className="flex items-center">
                <span className="text-[21px] sm:text-[25px] font-[900] tracking-tight text-[#10263d]">
                  Siisti
                </span>
                <span className="relative ml-0.5 inline-flex items-center justify-center font-[900] text-[21px] sm:text-[25px] text-[#ff8d43]">
                  360
                  <svg
                    className="absolute -inset-1.5 w-[calc(100%+12px)] h-[calc(100%+12px)] pointer-events-none text-[#ff8d43] hidden sm:block"
                    viewBox="0 0 70 36"
                    fill="none"
                  >
                    <ellipse
                      cx="35"
                      cy="18"
                      rx="32"
                      ry="15"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeDasharray="4 2"
                      transform="rotate(-8 35 18)"
                    />
                  </svg>
                  <Sparkles className="h-3 w-3 text-[#ff8d43] sm:hidden ml-0.5" />
                </span>
              </div>
              <div className="text-[9.5px] font-[750] text-[#718c9f] uppercase tracking-wider -mt-0.5 sm:hidden">
                Siivouspalvelut
              </div>
            </div>
          </button>

          {/* Location Selector Pill (Hidden on narrow mobile, visible on tablet & desktop) */}
          <button
            type="button"
            onClick={onOpenLocationModal}
            className="hidden md:flex items-center gap-2 rounded-full border border-[#d8e4eb] bg-white px-3.5 py-1.5 text-[12.5px] font-[650] text-[#142c42] shadow-2xs hover:border-[#0d9d8c] hover:bg-[#f8fafb] transition-all cursor-pointer"
            title={currentLang === 'fi' ? 'Vaihda sijaintia' : currentLang === 'sv' ? 'Ändra plats' : 'Change location'}
          >
            <MapPin className="h-3.5 w-3.5 text-[#0d9d8c] shrink-0" />
            <span className="truncate max-w-[140px] lg:max-w-none">
              {locationDisplayText}
            </span>
            <ChevronDown className="h-3.5 w-3.5 text-[#677c8d] shrink-0" />
          </button>
        </div>

        {/* Center: Desktop Navigation Links (Desktop only) */}
        <nav
          ref={dropdownRef}
          className="hidden lg:flex items-center gap-7 text-[14.5px] font-[650] text-[#142c42]"
        >
          {/* Home */}
          <button
            onClick={onNavigateHome}
            className={`cursor-pointer transition-colors hover:text-[#ff8d43] relative py-1 ${
              activeSection === 'home'
                ? 'text-[#ff8d43] font-[750]'
                : 'text-[#142c42]'
            }`}
          >
            {currentLang === 'fi' ? 'Etusivu' : currentLang === 'sv' ? 'Hem' : 'Home'}
            {activeSection === 'home' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff8d43] rounded-full" />
            )}
          </button>

          {/* Services with Dropdown */}
          <div className="relative">
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === 'services' ? null : 'services')
              }
              className={`flex items-center gap-1 cursor-pointer transition-colors hover:text-[#ff8d43] py-1 ${
                activeSection === 'services' || activeSection === 'service-detail'
                  ? 'text-[#ff8d43] font-[750]'
                  : 'text-[#142c42]'
              }`}
            >
              <span>{currentLang === 'fi' ? 'Palvelut' : currentLang === 'sv' ? 'Tjänster' : 'Services'}</span>
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${openDropdown === 'services' ? 'rotate-180' : ''}`} />
            </button>

            {openDropdown === 'services' && (
              <div className="absolute top-full left-0 mt-2 w-72 rounded-2xl border border-[#e2e9ee] bg-white p-3 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#edf2f6] px-2 text-[11px] font-bold text-[#677c8d] uppercase tracking-wider">
                  <span>{currentLang === 'fi' ? 'Kaikki siivouspalvelut' : currentLang === 'sv' ? 'Alla städtjänster' : 'All Cleaning Services'}</span>
                  <button
                    onClick={() => {
                      setOpenDropdown(null);
                      onNavigateUrl('#/services');
                    }}
                    className="text-[#0d9d8c] hover:underline normal-case font-semibold text-xs"
                  >
                    {currentLang === 'fi' ? 'Näytä kaikki' : currentLang === 'sv' ? 'Se alla' : 'View all'}
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto space-y-1 pr-1">
                  {SERVICES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        setOpenDropdown(null);
                        onNavigateUrl(`#/services/${s.slugs.en}`);
                      }}
                      className="w-full text-left px-3 py-2 text-[13px] font-medium text-[#142c42] rounded-xl hover:bg-[#f0f8f6] hover:text-[#087f72] transition-colors flex items-center justify-between group cursor-pointer"
                    >
                      <span className="truncate">{s.names[currentLang]}</span>
                      <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 text-[#0d9d8c] transition-opacity shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Pricing */}
          <button
            onClick={() => onNavigateUrl('#/pricing')}
            className={`cursor-pointer transition-colors hover:text-[#ff8d43] py-1 ${
              activeSection === 'pricing' || activeSection === 'calculator'
                ? 'text-[#ff8d43] font-[750]'
                : 'text-[#142c42]'
            }`}
          >
            {currentLang === 'fi' ? 'Hinnasto' : currentLang === 'sv' ? 'Priser' : 'Pricing'}
          </button>

          {/* Booking */}
          <button
            onClick={() => onNavigateUrl('#/booking')}
            className={`cursor-pointer transition-colors hover:text-[#ff8d43] py-1 ${
              activeSection === 'booking'
                ? 'text-[#ff8d43] font-[750]'
                : 'text-[#142c42]'
            }`}
          >
            {currentLang === 'fi' ? 'Varaus' : currentLang === 'sv' ? 'Bokning' : 'Booking'}
          </button>

          {/* Areas with Dropdown */}
          <div className="relative">
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === 'areas' ? null : 'areas')
              }
              className={`flex items-center gap-1 cursor-pointer transition-colors hover:text-[#ff8d43] py-1 ${
                activeSection === 'areas' || activeSection === 'city-detail' || activeSection === 'neighborhood-detail'
                  ? 'text-[#ff8d43] font-[750]'
                  : 'text-[#142c42]'
              }`}
            >
              <span>{currentLang === 'fi' ? 'Toimialueet' : currentLang === 'sv' ? 'Områden' : 'Areas'}</span>
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${openDropdown === 'areas' ? 'rotate-180' : ''}`} />
            </button>

            {openDropdown === 'areas' && (
              <div className="absolute top-full left-0 mt-2 w-64 rounded-2xl border border-[#e2e9ee] bg-white p-3 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#edf2f6] px-2 text-[11px] font-bold text-[#677c8d] uppercase tracking-wider">
                  <span>{currentLang === 'fi' ? 'Kaupungit & Alueet' : currentLang === 'sv' ? 'Städer & Områden' : 'Cities & Districts'}</span>
                  <button
                    onClick={() => {
                      setOpenDropdown(null);
                      onNavigateUrl('#/locations');
                    }}
                    className="text-[#0d9d8c] hover:underline normal-case font-semibold text-xs"
                  >
                    {currentLang === 'fi' ? 'Kaikki' : currentLang === 'sv' ? 'Alla' : 'All'}
                  </button>
                </div>
                <div className="space-y-1">
                  {CITIES.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setOpenDropdown(null);
                        onNavigateUrl(`#/locations/${c.id}`);
                      }}
                      className="w-full text-left px-3 py-2 text-[13px] font-medium text-[#142c42] rounded-xl hover:bg-[#f0f8f6] hover:text-[#087f72] transition-colors flex items-center justify-between group cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 text-[#0d9d8c]" />
                        <span>{c.names[currentLang]}</span>
                      </div>
                      <span className="text-[11px] font-mono text-[#677c8d]">{c.districts.length} alue</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Blog / Guides */}
          <button
            onClick={() => onNavigateUrl('#/guides')}
            className={`cursor-pointer transition-colors hover:text-[#ff8d43] py-1 ${
              activeSection === 'guides' || activeSection === 'guide-detail'
                ? 'text-[#ff8d43] font-[750]'
                : 'text-[#142c42]'
            }`}
          >
            {currentLang === 'fi' ? 'Blogi' : currentLang === 'sv' ? 'Blogg' : 'Blog'}
          </button>

          {/* Contact */}
          <button
            onClick={() => onNavigateUrl('#/contact')}
            className={`cursor-pointer transition-colors hover:text-[#ff8d43] py-1 ${
              activeSection === 'contact'
                ? 'text-[#ff8d43] font-[750]'
                : 'text-[#142c42]'
            }`}
          >
            {currentLang === 'fi' ? 'Yhteystiedot' : currentLang === 'sv' ? 'Kontakt' : 'Contact'}
          </button>
        </nav>

        {/* Right: Language Pill, Phone Call CTA, and Hamburger Menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Selector Pill */}
          <div className="flex items-center gap-1 sm:gap-1.5 rounded-full border border-[#d8e4eb] bg-white px-2.5 sm:px-3 py-1 sm:py-1.5 text-[12px] sm:text-[12.5px] font-[750] text-[#142c42] shadow-2xs hover:border-[#0d9d8c] transition-colors">
            <Globe className="h-3.5 w-3.5 text-[#0d9d8c] shrink-0" />
            <select
              value={currentLang}
              onChange={(e) => onLanguageChange(e.target.value as Language)}
              className="cursor-pointer bg-transparent py-0.5 text-[12px] sm:text-[12.5px] font-[750] text-[#142c42] outline-hidden uppercase"
              aria-label="Language selection"
            >
              <option value="fi">FI</option>
              <option value="en">EN</option>
              <option value="sv">SV</option>
            </select>
          </div>

          {/* Direct Phone Call Button (matches screenshot orange call button) */}
          <a
            href="tel:+358401234567"
            title="Soita meille: +358 40 123 4567"
            className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-[#ff8d43] text-white shadow-xs hover:bg-[#ff9b59] active:scale-95 transition-all"
            aria-label="Soita asiakaspalveluun"
          >
            <Phone className="h-4 w-4" />
          </a>

          {/* Mobile Hamburger Button */}
          <button
            onClick={onOpenMobileMenu}
            className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-[#d8e4eb] bg-white text-[#142c42] hover:bg-[#f5f8fa] lg:hidden cursor-pointer"
            aria-label="Avaa valikko"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Desktop Primary CTA Button */}
          <button
            onClick={onNavigateToQuote}
            className="hidden lg:flex min-h-[42px] items-center gap-2 rounded-xl bg-[#ff8d43] px-5 py-2.5 text-[13.5px] font-[750] text-[#10263d] shadow-xs transition-transform hover:-translate-y-0.5 hover:bg-[#ff9b59] active:translate-y-0 cursor-pointer"
          >
            <span>{t.nav.requestQuote}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
