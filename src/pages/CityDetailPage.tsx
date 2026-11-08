import React, { useState, useEffect } from 'react';
import { Language, CityInfo, SERVICES, ServiceInfo } from '../data/content';
import { TRANSLATIONS } from '../data/translations';
import { VisualBanner } from '../components/VisualBanner';
import { NEIGHBORHOODS, NeighborhoodInfo } from '../data/locations';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { BreadcrumbItem } from '../utils/urlHierarchy';
import {
  MapPin,
  ArrowRight,
  Sparkles,
  Send,
  Check,
  CheckCircle2,
} from 'lucide-react';

interface CityDetailPageProps {
  city: CityInfo;
  currentLang: Language;
  breadcrumbs?: BreadcrumbItem[];
  onNavigateUrl?: (url: string) => void;
  onSelectService: (service: ServiceInfo, cityId: string) => void;
  onBookCityService: (serviceId: string, cityId: string) => void;
  onSelectNeighborhood?: (neighborhood: NeighborhoodInfo) => void;
  onOpenLocationSearch?: () => void;
  onBack?: () => void;
  onRequestQuote?: () => void;
}

export const CityDetailPage: React.FC<CityDetailPageProps> = ({
  city,
  currentLang,
  breadcrumbs,
  onNavigateUrl,
  onSelectService,
  onBookCityService,
  onSelectNeighborhood,
  onOpenLocationSearch,
  onBack,
  onRequestQuote,
}) => {
  const t = TRANSLATIONS[currentLang];
  const cdp = t.cityDetailPage;
  const cityName = city.names[currentLang];

  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState(SERVICES[0].id);
  const [submitted, setSubmitted] = useState(false);

  // Filter all neighborhoods located in this city
  const cityNeighborhoods = Object.values(NEIGHBORHOODS).filter((n) => n.cityId === city.id);

  // SEO metadata & canonical
  useEffect(() => {
    const seoTitle =
      currentLang === 'fi'
        ? `Siivouspalvelut ${cityName} – Koteihin ja yrityksille | Siisti360`
        : currentLang === 'sv'
        ? `Städtjänster i ${cityName} – För hem och företag | Siisti360`
        : `Cleaning Services in ${cityName} – For Homes & Offices | Siisti360`;

    document.title = seoTitle;

    const metaDescription =
      currentLang === 'fi'
        ? `Ammattitaitoiset ja luotettavat siivouspalvelut kaupungissa ${cityName}. Kotisiivous, suursiivous, toimitilasiivous ja ikkunanpesu. Kotitalousvähennys 60%.`
        : currentLang === 'sv'
        ? `Professionella och pålitliga städtjänster i ${cityName}. Hemstädning, storstädning, kontorsstädning och fönsterputs. 60% hushållsavdrag.`
        : `Professional, reliable cleaning services in ${cityName}. Home cleaning, deep cleaning, office cleaning and window washing. 60% tax deduction.`;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', metaDescription);
    }

    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', `https://example.fi/${currentLang}/locations/${city.id}/`);
    }
  }, [city, cityName, currentLang]);

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setSubmitted(true);
  };

  const handleNavigate = (url: string) => {
    if (onNavigateUrl) {
      onNavigateUrl(url);
    } else {
      window.location.hash = url.startsWith('#') ? url : `#${url}`;
    }
  };

  const defaultBreadcrumbs: BreadcrumbItem[] = [
    { label: t.nav.home, url: '#/' },
    { label: t.nav.areas, url: '#/locations' },
    { label: cityName, url: `#/locations/${city.id}`, isCurrent: true },
  ];

  const logistics = cdp.logisticsNotes[city.id] || cdp.logisticsNotes.helsinki;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* 1. Dynamic Breadcrumbs */}
      <Breadcrumbs
        items={breadcrumbs && breadcrumbs.length > 0 ? breadcrumbs : defaultBreadcrumbs}
        currentLang={currentLang}
        onNavigate={handleNavigate}
        onOpenLocationSearch={onOpenLocationSearch}
      />

      {/* 2. Visual Banner */}
      <VisualBanner
        type={city.id}
        badge={`${cdp.badgePrefix}${cityName.toUpperCase()}`}
        title={`Siivouspalvelut ${cityName} ${cdp.titleSuffix}`}
        headingTag="h1"
      />

      {/* 3. Intro & District list */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        <div className="rounded-2xl border border-[#e2e9ee] bg-white p-6 shadow-xs md:col-span-8 space-y-4">
          <h2 className="text-xl font-bold text-[#142c42]">
            {currentLang === 'fi'
              ? `Luotettavaa siivousta kaupungissa ${cityName}`
              : currentLang === 'sv'
              ? `Pålitlig städning i ${cityName}`
              : `Reliable Cleaning Services in ${cityName}`}
          </h2>
          <p className="text-sm text-[#4c6275] leading-relaxed">
            {city.text[currentLang]}
          </p>

          {/* City Specific Logistics Note */}
          <div className="rounded-xl bg-[#f0f9f6] border border-[#a5dbd2] p-4 text-xs text-[#1e584f] space-y-1">
            <strong className="block font-bold text-[#087f72]">
              {logistics.title}
            </strong>
            <p>{logistics.text}</p>
          </div>

          {/* Neighborhood Hubs with Direct Clickable URLs */}
          <div className="pt-3 border-t border-[#f0f4f7] space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#087f72]">
                {cdp.districtsTitle.replace('{cityName}', cityName)}
              </h3>
              <span className="text-[11px] text-[#677c8d]">
                {cdp.districtsSubtitle}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {cityNeighborhoods.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => {
                    if (onSelectNeighborhood) onSelectNeighborhood(n);
                    handleNavigate(`#/locations/${city.id}/${n.slug}`);
                  }}
                  className="flex items-center justify-between rounded-xl border border-[#e2e9ee] bg-[#f8fafb] p-3 text-left hover:border-[#0d9d8c] hover:bg-[#ebf7f5] transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <MapPin className="h-4 w-4 text-[#0d9d8c]" />
                    <div>
                      <div className="text-xs font-bold text-[#142c42] group-hover:text-[#087f72]">
                        {n.names[currentLang]}
                      </div>
                      <div className="text-[10px] text-[#677c8d] font-mono">
                        {cdp.postalPrefix} {n.postalCodes.join(', ')}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[#9ab3c5] group-hover:text-[#087f72] shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right City Fast-Facts & Lead Gen */}
        <div className="rounded-2xl border border-[#e2e9ee] bg-[#10263d] p-6 text-white shadow-xs md:col-span-4 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#9ddbd1]">
              {cdp.localPerksBadge}
            </span>
            <h3 className="text-lg font-bold">{cdp.localPerksTitle.replace('{cityName}', cityName)}</h3>
            <ul className="space-y-2 text-xs text-[#c8d8e1]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#69dfbd] shrink-0" />
                <span>{cdp.perk1.replace('{cityName}', cityName)}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#69dfbd] shrink-0" />
                <span>{cdp.perk2}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#69dfbd] shrink-0" />
                <span>{cdp.perk3}</span>
              </li>
            </ul>
          </div>

          {!submitted ? (
            <form onSubmit={handleQuickSubmit} className="space-y-2.5 pt-2 border-t border-white/10">
              <span className="block text-[12px] font-bold text-[#9ddbd1]">
                {cdp.quickQuoteTitle.replace('{cityName}', cityName)}
              </span>
              <div>
                <label htmlFor="city-name" className="block text-[10px] text-white/80">{cdp.nameLabel}</label>
                <input
                  id="city-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Matti Meikäläinen"
                  className="w-full rounded-lg bg-white/10 px-3 py-1.5 text-xs text-white border border-white/20 focus:outline-hidden focus:border-[#ff8d43]"
                />
              </div>
              <div>
                <label htmlFor="city-phone" className="block text-[10px] text-white/80">{cdp.phoneLabel}</label>
                <input
                  id="city-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+358 40 123 4567"
                  className="w-full rounded-lg bg-white/10 px-3 py-1.5 text-xs text-white border border-white/20 focus:outline-hidden focus:border-[#ff8d43]"
                />
              </div>
              <div>
                <label htmlFor="city-service" className="block text-[10px] text-white/80">{cdp.serviceLabel}</label>
                <select
                  id="city-service"
                  value={selectedServiceId}
                  onChange={(e) => setSelectedServiceId(e.target.value)}
                  className="w-full rounded-lg bg-[#1a3854] px-2.5 py-1.5 text-xs text-white border border-white/20 focus:outline-hidden"
                >
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.names[currentLang]}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-[#ff8d43] py-2 text-xs font-bold text-[#10263d] hover:bg-[#ff9b59] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Send className="h-3.5 w-3.5" />
                <span>{cdp.sendBtn}</span>
              </button>
            </form>
          ) : (
            <div className="rounded-xl bg-emerald-600/30 border border-emerald-500/40 p-4 text-center space-y-1.5">
              <Check className="h-5 w-5 text-emerald-400 mx-auto" />
              <h4 className="text-xs font-bold text-white">{cdp.successTitle}</h4>
              <p className="text-[11px] text-emerald-100">
                {cdp.successMsg.replace('{phone}', phone)}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Services in this city */}
      <div className="rounded-2xl border border-[#e2e9ee] bg-white p-6 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-[#142c42]">
          {cdp.servicesInCityTitle.replace('{cityName}', cityName)}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((s) => (
            <div
              key={s.id}
              role="button"
              tabIndex={0}
              onClick={() => {
                onSelectService(s, city.id);
                handleNavigate(`#/services/${s.slugs.en}/${city.id}`);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectService(s, city.id);
                  handleNavigate(`#/services/${s.slugs.en}/${city.id}`);
                }
              }}
              className="group cursor-pointer flex flex-col justify-between rounded-xl border border-[#e2e9ee] bg-white p-4 hover:border-[#0d9d8c] hover:shadow-md transition-all text-left"
            >
              <div className="space-y-1.5">
                <h3 className="text-sm font-bold text-[#142c42] group-hover:text-[#0d9d8c] transition-colors">
                  {s.names[currentLang]} {cityName}
                </h3>
                <p className="text-xs text-[#677c8d] line-clamp-2">{s.desc[currentLang]}</p>
              </div>

              <div className="pt-3 mt-2 border-t border-[#f0f4f7] flex items-center justify-between">
                <div
                  className="text-xs font-bold text-[#087f72] group-hover:text-[#065e54] flex items-center gap-1 transition-colors"
                >
                  <span>{cdp.exploreService}</span>
                  <span>→</span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onBookCityService(s.id, city.id);
                  }}
                  className="rounded-lg bg-[#142c42] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#0d9d8c] transition-colors cursor-pointer"
                >
                  {cdp.bookBtn}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
