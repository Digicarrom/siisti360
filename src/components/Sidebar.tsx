import React from 'react';
import { Language } from '../data/content';
import { TRANSLATIONS } from '../data/translations';
import {
  Home,
  Sparkles,
  MapPin,
  Calculator,
  CalendarCheck,
  Scale,
  ShieldCheck,
  Star,
  Users,
  Info,
  Phone,
  ChevronRight,
  ChevronDown,
  X,
  ArrowRight,
  Calendar,
  Leaf,
  Clock,
} from 'lucide-react';
import { NeighborhoodInfo } from '../data/locations';

interface SidebarProps {
  currentLang: Language;
  onLanguageChange?: (lang: Language) => void;
  activeSection: string;
  onNavigate: (sectionId: string, subParam?: string) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  selectedNeighborhood?: NeighborhoodInfo | null;
  selectedPostalCode?: string;
  onOpenLocationModal?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentLang,
  onLanguageChange,
  activeSection,
  onNavigate,
  isOpenMobile,
  onCloseMobile,
  selectedNeighborhood,
  selectedPostalCode,
  onOpenLocationModal,
}) => {
  const t = TRANSLATIONS[currentLang];

  const handleItemClick = (id: string, subParam?: string) => {
    onNavigate(id, subParam);
    onCloseMobile();
  };

  const locationDisplayText = selectedNeighborhood
    ? `${selectedNeighborhood.names[currentLang]}${selectedPostalCode ? ` (${selectedPostalCode})` : ''}`
    : 'Helsinki, Ruoholahti (00180)';

  const menuItems = [
    {
      id: 'home',
      label: {
        fi: 'Etusivu',
        sv: 'Hem',
        en: 'Home',
      },
      icon: Home,
    },
    {
      id: 'services',
      label: {
        fi: 'Siivouspalvelut',
        sv: 'Städtjänster',
        en: 'Cleaning Services',
      },
      icon: Sparkles,
    },
    {
      id: 'pricing',
      label: {
        fi: 'Hinnat',
        sv: 'Priser',
        en: 'Pricing',
      },
      icon: Scale,
    },
    {
      id: 'booking',
      label: {
        fi: 'Varaa siivous',
        sv: 'Boka städning',
        en: 'Book Cleaning',
      },
      icon: CalendarCheck,
    },
    {
      id: 'calculator',
      label: {
        fi: 'Hinta-arvio',
        sv: 'Priskalkylator',
        en: 'Price Calculator',
      },
      icon: Calculator,
    },
    {
      id: 'areas',
      label: {
        fi: 'Toimialueet',
        sv: 'Verksamhetsområden',
        en: 'Service Areas',
      },
      icon: MapPin,
    },
    {
      id: 'why',
      label: {
        fi: 'Miksi Siisti360?',
        sv: 'Varför Siisti360?',
        en: 'Why Siisti360?',
      },
      icon: Star,
    },
    {
      id: 'reviews',
      label: {
        fi: 'Asiakkaiden kokemuksia',
        sv: 'Kundomdömen',
        en: 'Customer Reviews',
      },
      icon: Users,
    },
    {
      id: 'about',
      label: {
        fi: 'Tietoa meistä',
        sv: 'Om oss',
        en: 'About Us',
      },
      icon: Info,
    },
    {
      id: 'contact',
      label: {
        fi: 'Ota yhteyttä',
        sv: 'Kontakta oss',
        en: 'Contact Us',
      },
      icon: Phone,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-50 bg-[#0a1827]/70 backdrop-blur-xs transition-opacity lg:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Slide-out Menu Drawer matching Siisti360_Mobile_Menu_Drawer_2ec4925f.png */}
      <aside
        className={`fixed top-0 bottom-0 right-0 z-50 flex w-full max-w-[340px] sm:max-w-[380px] flex-col bg-white text-[#142c42] shadow-2xl transition-transform duration-300 ease-in-out lg:hidden overflow-y-auto ${
          isOpenMobile ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-[#edf2f6]">
          {/* Logo with house + sparkle icon */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef7fd] text-[#0d9d8c]">
              <div className="relative">
                <Home className="h-6 w-6 text-[#0d9d8c]" />
                <Sparkles className="h-3 w-3 text-[#ff8d43] absolute -top-1 -right-1" />
              </div>
            </div>
            <div>
              <div className="flex items-center text-[20px] font-[900] tracking-tight leading-none text-[#10263d]">
                <span>Siisti</span>
                <span className="text-[#ff8d43]">360</span>
              </div>
              <div className="text-[11px] font-[700] text-[#718c9f] uppercase tracking-wider mt-0.5">
                Siivouspalvelut
              </div>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onCloseMobile}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-[#677c8d] hover:bg-[#f5f8fa] hover:text-[#142c42] transition-colors cursor-pointer"
            aria-label="Sulje valikko"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Selected Location Selector Card */}
        <div className="px-5 pt-3.5 pb-2">
          <button
            type="button"
            onClick={() => {
              onCloseMobile();
              onOpenLocationModal?.();
            }}
            className="w-full flex items-center justify-between rounded-2xl border border-[#e2e9ee] bg-[#fafcfe] p-3 text-left hover:border-[#0d9d8c] hover:bg-[#f0f8f6] transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#fff3eb] text-[#ff8d43] shrink-0">
                <MapPin className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[10.5px] font-[700] text-[#718c9f] uppercase tracking-wide">
                  {currentLang === 'fi'
                    ? 'Valittu sijainti:'
                    : currentLang === 'sv'
                    ? 'Vald plats:'
                    : 'Selected location:'}
                </div>
                <div className="text-[13px] font-[800] text-[#142c42] group-hover:text-[#087f72] truncate">
                  {locationDisplayText}
                </div>
              </div>
            </div>
            <ChevronDown className="h-4 w-4 text-[#8ca2b2] group-hover:text-[#0d9d8c] shrink-0 ml-1" />
          </button>
        </div>

        {/* Navigation Links List */}
        <div className="flex-1 px-4 py-2 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              activeSection === item.id ||
              (item.id === 'services' && activeSection === 'service-detail') ||
              (item.id === 'areas' && (activeSection === 'city-detail' || activeSection === 'neighborhood-detail')) ||
              (item.id === 'pricing' && activeSection === 'compare');

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[14.5px] font-[750] transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#fff3eb] text-[#ff8d43]'
                    : 'text-[#142c42] hover:bg-[#f5f8fa] hover:text-[#087f72]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`h-5 w-5 ${isActive ? 'text-[#ff8d43]' : 'text-[#677c8d]'}`} />
                  <span>{item.label[currentLang]}</span>
                </div>
                {!isActive && (
                  <ChevronRight className="h-4 w-4 text-[#a0b3c2]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Language Selector Segmented Pills: FI | EN | SV */}
        {onLanguageChange && (
          <div className="px-5 py-3">
            <div className="flex items-center justify-center gap-2 rounded-2xl bg-[#f5f8fa] p-1.5 border border-[#e5edf2]">
              {(['fi', 'en', 'sv'] as Language[]).map((lang) => {
                const isActive = currentLang === lang;
                return (
                  <button
                    key={lang}
                    onClick={() => onLanguageChange(lang)}
                    className={`flex-1 py-1.5 rounded-xl text-[13px] font-[800] transition-all cursor-pointer uppercase tracking-wider ${
                      isActive
                        ? 'bg-white text-[#ff8d43] border border-[#ff8d43] shadow-xs'
                        : 'text-[#677c8d] hover:text-[#142c42]'
                    }`}
                  >
                    {lang}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Quick Booking CTA Card in Drawer */}
        <div className="px-5 py-2">
          <div
            onClick={() => handleItemClick('booking')}
            className="flex items-center justify-between rounded-2xl bg-[#eef7fd] border border-[#d6eaf8] p-3.5 hover:bg-[#e4f2fb] transition-all cursor-pointer group shadow-xs"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#0d9d8c] shadow-2xs shrink-0">
                <Calendar className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[14px] font-[850] text-[#142c42] leading-tight">
                  {currentLang === 'fi'
                    ? 'Varaa siivous helposti'
                    : currentLang === 'sv'
                    ? 'Boka städning enkelt'
                    : 'Book cleaning easily'}
                </div>
                <div className="text-[11.5px] text-[#677c8d] truncate mt-0.5">
                  {currentLang === 'fi'
                    ? 'Valitse palvelu, aika ja alue.'
                    : currentLang === 'sv'
                    ? 'Välj tjänst, tid och område.'
                    : 'Choose service, time and area.'}
                </div>
              </div>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ff8d43] text-white shrink-0 group-hover:scale-105 transition-transform shadow-xs ml-2">
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Bottom 3 Trust Badges */}
        <div className="grid grid-cols-3 gap-2 px-5 py-4 border-t border-[#edf2f6] text-center mt-2">
          <div className="flex flex-col items-center">
            <Leaf className="h-4 w-4 text-[#10b981] mb-1" />
            <span className="text-[10px] font-[750] text-[#526a7d] leading-tight">
              {currentLang === 'fi'
                ? 'Ympäristöystävällinen'
                : currentLang === 'sv'
                ? 'Miljövänlig'
                : 'Eco-friendly'}
            </span>
          </div>

          <div className="flex flex-col items-center border-x border-[#edf2f6] px-1">
            <ShieldCheck className="h-4 w-4 text-[#0d9d8c] mb-1" />
            <span className="text-[10px] font-[750] text-[#526a7d] leading-tight">
              {currentLang === 'fi'
                ? 'Luotettava palvelu'
                : currentLang === 'sv'
                ? 'Pålitlig service'
                : 'Trusted service'}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <Sparkles className="h-4 w-4 text-[#ff8d43] mb-1" />
            <span className="text-[10px] font-[750] text-[#526a7d] leading-tight">
              {currentLang === 'fi'
                ? 'Nopea varaus'
                : currentLang === 'sv'
                ? 'Snabb bokning'
                : 'Fast booking'}
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};
