import React, { useState, useEffect } from 'react';
import { Language, SERVICES, ServiceInfo } from '../data/content';
import { TRANSLATIONS } from '../data/translations';
import {
  NeighborhoodInfo,
  NEIGHBORHOODS,
  findNeighborhoodByPostalCode,
} from '../data/locations';
import { applySeoMetadataToHead, SeoPage } from '../data/seoCatalog';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { BreadcrumbItem } from '../utils/urlHierarchy';
import {
  MapPin,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Sparkles,
  CheckCircle2,
  PhoneCall,
  Clock,
  Send,
  Building,
  Check,
  Info,
  ChevronRight,
  Star,
} from 'lucide-react';

interface NeighborhoodDetailPageProps {
  neighborhood: NeighborhoodInfo;
  postalCode?: string;
  currentLang: Language;
  breadcrumbs?: BreadcrumbItem[];
  onNavigateUrl?: (url: string) => void;
  onBack: () => void;
  onSelectService: (service: ServiceInfo, cityId?: string, neighborhoodId?: string) => void;
  onBookNeighborhoodService: (serviceId: string, neighborhoodId: string, postalCode?: string) => void;
  onRequestQuote: (neighborhoodId?: string, postalCode?: string) => void;
  onSelectNeighborhood: (neighborhood: NeighborhoodInfo, postalCode?: string) => void;
  onOpenLocationSearch?: () => void;
}

export const NeighborhoodDetailPage: React.FC<NeighborhoodDetailPageProps> = ({
  neighborhood,
  postalCode,
  currentLang,
  breadcrumbs,
  onNavigateUrl,
  onBack,
  onSelectService,
  onBookNeighborhoodService,
  onRequestQuote,
  onSelectNeighborhood,
  onOpenLocationSearch,
}) => {
  const t = TRANSLATIONS[currentLang];
  const activePostal = postalCode || neighborhood.postalCodes[0];
  const neighName = neighborhood.names[currentLang];
  const cityName = neighborhood.cityId === 'helsinki' ? 'Helsinki' : neighborhood.cityId === 'espoo' ? 'Espoo' : 'Vantaa';

  // Lead form inside page
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadService, setLeadService] = useState('kotisiivous');
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  // SEO metadata calculation
  const seoData: SeoPage = {
    id: `seo-neigh-${neighborhood.id}`,
    language: currentLang,
    pageType: 'neighborhood',
    path: `/${currentLang}/alueet/${neighborhood.cityId}/${neighborhood.slug}/`,
    primaryKeyword:
      currentLang === 'fi'
        ? `siivouspalvelut ${neighName.toLowerCase()} ${activePostal}`
        : currentLang === 'sv'
        ? `städtjänster ${neighName.toLowerCase()}`
        : `cleaning services ${neighName.toLowerCase()} ${cityName.toLowerCase()}`,
    secondaryKeywords: [
      `Kotisiivous ${neighName}`,
      `Muuttosiivous ${neighName}`,
      `Suursiivous ${neighName}`,
      `Sohvan puhdistus ${neighName}`,
      `Ikkunanpesu ${neighName}`,
      `Toimistosiivous ${neighName}`,
      `Siivous ${activePostal}`,
    ],
    seoTitle:
      currentLang === 'fi'
        ? `Siivouspalvelut ${neighName}, ${cityName} (${activePostal}) | Siisti360`
        : currentLang === 'sv'
        ? `Städtjänster ${neighName}, ${cityName} (${activePostal}) | Siisti360`
        : `Professional Cleaning Services in ${neighName}, ${cityName} (${activePostal}) | Siisti360`,
    metaDescription:
      currentLang === 'fi'
        ? `Ammattitaitoinen kotisiivous, muuttosiivous ja toimitilasiivous alueella ${neighName} (${activePostal}), ${cityName}. Paikallinen tiimi, 60% kotitalousvähennys ja tyytyväisyystakuu. Laske hinta ja varaa!`
        : currentLang === 'sv'
        ? `Professionell hemstädning och flyttstädning i ${neighName} (${activePostal}), ${cityName}. Lokalt städteam med nöjd-kund-garanti. Boka smidigt!`
        : `Expert home cleaning, deep cleaning and office cleaning in ${neighName} (${activePostal}), ${cityName}. Local cleaners, 100% satisfaction guarantee. Book online now!`,
    h1:
      currentLang === 'fi'
        ? `Siivouspalvelut ${neighName}, ${cityName}`
        : currentLang === 'sv'
        ? `Städtjänster i ${neighName}, ${cityName}`
        : `Professional Cleaning Services in ${neighName}, ${cityName}`,
    canonicalUrl: `https://example.fi/${currentLang}/alueet/${neighborhood.cityId}/${neighborhood.slug}/`,
  };

  useEffect(() => {
    applySeoMetadataToHead(seoData);

    // Inject enhanced local Schema.org
    const scriptId = `schema-local-${neighborhood.id}`;
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': `https://example.fi/#business-${neighborhood.id}`,
      name: `Siisti360 — Siivouspalvelut ${neighName}`,
      description: neighborhood.heroIntro[currentLang],
      telephone: '+358 40 123 4567',
      email: 'asiakaspalvelu@siisti360.fi',
      priceRange: '€€',
      address: {
        '@type': 'PostalAddress',
        addressLocality: cityName,
        postalCode: activePostal,
        addressCountry: 'FI',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: neighborhood.coords.lat,
        longitude: neighborhood.coords.lng,
      },
      areaServed: {
        '@type': 'AdministrativeArea',
        name: `${neighName}, ${cityName}`,
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: neighborhood.localReview.rating.toString(),
        reviewCount: '48',
        bestRating: '5',
      },
    });

    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [neighborhood, activePostal, currentLang]);

  const handleQuickLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName.trim() || !leadPhone.trim()) return;
    setLeadSubmitted(true);
  };

  // Dedicated popular services
  const popularServices = SERVICES.filter((s) =>
    neighborhood.popularServiceIds.includes(s.id)
  );

  const defaultBreadcrumbs: BreadcrumbItem[] = [
    { label: currentLang === 'fi' ? 'Etusivu' : currentLang === 'sv' ? 'Hem' : 'Home', url: '#/' },
    { label: currentLang === 'fi' ? 'Toimialueet' : currentLang === 'sv' ? 'Verksamhetsområden' : 'Locations', url: '#/locations' },
    { label: cityName, url: `#/locations/${neighborhood.cityId}` },
    { label: `${neighName} (${activePostal})`, url: `#/locations/${neighborhood.cityId}/${neighborhood.slug}`, isCurrent: true },
  ];

  const handleNavigate = (url: string) => {
    if (onNavigateUrl) {
      onNavigateUrl(url);
    } else {
      window.location.hash = url.startsWith('#') ? url : `#${url}`;
    }
  };

  return (
    <article className="space-y-8 animate-in fade-in duration-200">
      {/* Dynamic Breadcrumb Navigation */}
      <Breadcrumbs
        items={breadcrumbs && breadcrumbs.length > 0 ? breadcrumbs : defaultBreadcrumbs}
        currentLang={currentLang}
        onNavigate={handleNavigate}
        onOpenLocationSearch={onOpenLocationSearch}
        activePostalCode={activePostal}
      />

      {/* Main Hero Header */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#102b42] via-[#163f52] to-[#205a63] p-6 sm:p-10 text-white shadow-xl">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-[850] uppercase tracking-wider text-[#a2e4d8] border border-white/10">
              <MapPin className="h-3.5 w-3.5 text-[#69dfbd]" />
              <span>{neighborhood.badgeText[currentLang]}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-[44px] font-[820] leading-[1.12] tracking-[-0.04em] text-white">
              {neighborhood.heroHeading[currentLang]}
            </h1>

            <p className="text-[15px] sm:text-[16px] text-[#c9dce3] leading-relaxed max-w-2xl">
              {neighborhood.heroIntro[currentLang]}
            </p>

            {/* Special Neighborhood Promotion Banner */}
            <div className="rounded-xl border border-[#a2e4d8]/40 bg-white/10 p-4 backdrop-blur-xs">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#69dfbd]" />
                  <span className="text-xs sm:text-sm font-bold text-white">
                    {neighborhood.specialOffer.title[currentLang]}
                  </span>
                </div>
                <span className="rounded-lg bg-[#ff8d43] px-3 py-1 text-xs font-black text-[#10263d] font-mono tracking-wider">
                  {neighborhood.specialOffer.code}
                </span>
              </div>
              <p className="mt-1 text-xs text-[#c9dce3]">
                {neighborhood.specialOffer.desc[currentLang]}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onBookNeighborhoodService('kotisiivous', neighborhood.id, activePostal)}
                className="flex min-h-[46px] items-center gap-2 rounded-xl bg-[#ff8d43] px-5 sm:px-6 py-3 text-sm font-bold text-[#10263d] shadow-md transition-all hover:bg-[#ff9b59]"
              >
                <Calendar className="h-4 w-4" />
                <span>
                  {currentLang === 'fi'
                    ? `Varaa siivous: ${neighName}`
                    : currentLang === 'sv'
                    ? `Boka städning i ${neighName}`
                    : `Book Cleaning in ${neighName}`}
                </span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => onRequestQuote(neighborhood.id, activePostal)}
                className="flex min-h-[46px] items-center gap-2 rounded-xl bg-white px-5 sm:px-6 py-3 text-sm font-bold text-[#10263d] shadow-sm hover:bg-[#f5f8fa]"
              >
                <span>{t.hero.ctaQuote}</span>
              </button>
            </div>

            {/* Highlights checkmarks */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#d3e7ed]">
              {neighborhood.keyHighlights[currentLang].slice(0, 4).map((h, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-[#69dfbd] shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: High-Res Real Local Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md overflow-hidden rounded-2xl border-4 border-white/20 bg-white shadow-2xl">
              {neighborhood.heroImage && (
                <img
                  src={neighborhood.heroImage}
                  alt={`${neighName} ${cityName} siivouspalvelut`}
                  className="h-64 sm:h-72 w-full object-cover"
                />
              )}
              <div className="p-4 bg-white text-[#142c42] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-[#087f72]">
                    <MapPin className="h-3.5 w-3.5" />
                    {neighName} ({activePostal})
                  </span>
                  <span className="flex items-center gap-1 rounded bg-[#eef7f5] px-2 py-0.5 text-xs font-bold text-[#087f72] font-mono">
                    <Star className="h-3.5 w-3.5 fill-[#ff8d43] text-[#ff8d43]" />
                    {neighborhood.localReview.rating}.0 / 5.0
                  </span>
                </div>
                <p className="text-xs text-[#677c8d] italic leading-relaxed">
                  "{neighborhood.localReview.quote[currentLang]}"
                </p>
                <div className="pt-1 flex items-center justify-between text-[11px] text-[#677c8d] border-t border-[#e2e9ee]">
                  <span className="font-semibold text-[#142c42]">
                    {neighborhood.localReview.author} • {neighborhood.localReview.street}
                  </span>
                  <span className="text-[#0d9d8c] font-bold">
                    {currentLang === 'fi'
                      ? 'Vahvistettu asiakas'
                      : currentLang === 'sv'
                      ? 'Verifierad kund'
                      : 'Verified Customer'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* In-depth Architectural & Neighborhood Cleaning Insights */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-[#e2e9ee] bg-white p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-[#087f72]">
            <Building className="h-5 w-5" />
            <h2 className="text-lg font-bold text-[#142c42]">
              {currentLang === 'fi'
                ? `${neighName}n asuntokanta ja erityispiirteet`
                : currentLang === 'sv'
                ? `${neighName}s bostadsbestånd och särdrag`
                : `${neighName} Property & Architecture Profile`}
            </h2>
          </div>
          <p className="text-sm text-[#526a7d] leading-relaxed">
            {neighborhood.localContext[currentLang]}
          </p>
          <p className="text-sm text-[#526a7d] leading-relaxed">
            {neighborhood.architectureInfo[currentLang]}
          </p>
        </div>

        <div className="rounded-2xl border border-[#e2e9ee] bg-white p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-[#ff8d43]">
            <Sparkles className="h-5 w-5" />
            <h2 className="text-lg font-bold text-[#142c42]">
              {currentLang === 'fi'
                ? `Alueen siivoushaasteet ja Siisti360:n ratkaisu`
                : currentLang === 'sv'
                ? `Områdets städutmaningar och Siisti360:s lösning`
                : `Local Cleaning Challenges & Solutions`}
            </h2>
          </div>
          <p className="text-xs text-[#677c8d]">
            {currentLang === 'fi'
              ? 'Tunnemme paikalliset olosuhteet ja käytämme oikeita laitteita:'
              : currentLang === 'sv'
              ? 'Vi känner till de lokala förhållandena och använder rätt utrustning:'
              : 'Our cleaners are equipped specifically for these conditions:'}
          </p>
          <ul className="space-y-2">
            {neighborhood.cleaningChallenges[currentLang].map((ch, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#142c42]">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0d9d8c] mt-0.5" />
                <span>{ch}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Available Cleaning Services in this Neighborhood */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-[10.5px] font-[800] uppercase tracking-[1.5px] text-[#0d9d8c]">
              {currentLang === 'fi' ? 'Palveluvalikoima' : currentLang === 'sv' ? 'Tjänsteutbud' : 'Service Catalog'}
            </span>
            <h2 className="text-xl sm:text-2xl font-[800] text-[#142c42] tracking-[-0.03em]">
              {currentLang === 'fi'
                ? `Suosituimmat siivoukset alueella ${neighName}`
                : currentLang === 'sv'
                ? `Populäraste städtjänsterna i ${neighName}`
                : `Popular Cleaning Services in ${neighName}`}
            </h2>
          </div>
          <span className="text-xs text-[#677c8d]">
            {currentLang === 'fi'
              ? `Täysi kotitalousvähennys 60% kaikkiin kotitöihin`
              : currentLang === 'sv'
              ? 'Fullt hushållsavdrag 60% på alla hemarbeten'
              : '60% Finnish tax deduction applied'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularServices.map((serv) => (
            <div
              key={serv.id}
              role="button"
              tabIndex={0}
              onClick={() => onSelectService(serv, neighborhood.cityId, neighborhood.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectService(serv, neighborhood.cityId, neighborhood.id);
                }
              }}
              className="group cursor-pointer flex flex-col justify-between rounded-xl border border-[#e2e9ee] bg-white p-5 shadow-2xs hover:border-[#0d9d8c] hover:shadow-md transition-all text-left"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-[#eef7f5] px-2.5 py-1 text-[11px] font-bold text-[#087f72] uppercase tracking-wide">
                    {serv.category === 'home'
                      ? currentLang === 'sv'
                        ? 'Hem'
                        : currentLang === 'en'
                        ? 'Home'
                        : 'Koti'
                      : currentLang === 'sv'
                      ? 'Företag'
                      : currentLang === 'en'
                      ? 'Business'
                      : 'Yritys'}
                  </span>
                  <span className="text-xs text-[#677c8d] font-mono">
                    {activePostal}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#142c42] group-hover:text-[#0d9d8c] transition-colors">
                  {serv.names[currentLang]} {neighName}
                </h3>
                <p className="text-xs text-[#677c8d] leading-relaxed">
                  {serv.desc[currentLang]}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-[#e2e9ee] flex items-center justify-between">
                <div
                  className="text-xs font-bold text-[#087f72] group-hover:text-[#065e54] flex items-center gap-1 transition-colors"
                >
                  <span>{currentLang === 'fi' ? 'Lue tarkemmin' : currentLang === 'sv' ? 'Läs mer' : 'Read details'}</span>
                  <span>→</span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onBookNeighborhoodService(serv.id, neighborhood.id, activePostal);
                  }}
                  className="rounded-lg bg-[#142c42] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#0d9d8c] transition-colors"
                >
                  {currentLang === 'fi' ? 'Varaa nyt' : currentLang === 'sv' ? 'Boka nu' : 'Book now'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Local Quote Form */}
      <section className="rounded-2xl border border-[#cbd5e1] bg-gradient-to-r from-[#f0f9f7] to-[#e6f4f1] p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-3">
            <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#087f72]">
              {currentLang === 'fi' ? 'Nopea tarjouspyyntö' : currentLang === 'sv' ? 'Snabb offertförfrågan' : 'Quick Estimate'}
            </span>
            <h2 className="text-2xl font-[800] text-[#142c42] tracking-tight">
              {currentLang === 'fi'
                ? `Pyydä maksuton arvio siivouksesta kohteeseen: ${neighName} (${activePostal})`
                : currentLang === 'sv'
                ? `Få en kostnadsfri städoffert för ${neighName} (${activePostal})`
                : `Get a Free Cleaning Estimate for ${neighName} (${activePostal})`}
            </h2>
            <p className="text-sm text-[#526a7d] leading-relaxed">
              {currentLang === 'fi'
                ? 'Vastaamme arkisin 30 minuutissa tarkan hinta-arvion ja ensimmäisen vapaan siivousajan kera. Ei sitoutumispakkoa.'
                : currentLang === 'sv'
                ? 'Vi svarar inom 30 minuter på vardagar med en exakt offert och tidigaste lediga städtid. Inga förpliktelser.'
                : 'We respond within 30 minutes with an exact quote and earliest open cleaning slot. No obligations.'}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#14534a] pt-1">
              <span className="flex items-center gap-1">
                <Check className="h-4 w-4 text-[#0d9d8c]" />
                {currentLang === 'fi'
                  ? '60% kotitalousvähennys'
                  : currentLang === 'sv'
                  ? '60% hushållsavdrag'
                  : '60% Finnish tax deduction'}
              </span>
              <span className="flex items-center gap-1">
                <Check className="h-4 w-4 text-[#0d9d8c]" />
                {currentLang === 'fi'
                  ? 'Vastuuvakuutus 1M€'
                  : currentLang === 'sv'
                  ? 'Ansvarsförsäkring 1M€'
                  : '1M€ Liability insurance'}
              </span>
              <span className="flex items-center gap-1">
                <Check className="h-4 w-4 text-[#0d9d8c]" />
                {currentLang === 'fi'
                  ? 'Oma nimetty siivooja'
                  : currentLang === 'sv'
                  ? 'Egen namngiven städare'
                  : 'Dedicated cleaner'}
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-xl border border-[#cbd5e1] p-5 shadow-md">
            {leadSubmitted ? (
              <div className="text-center py-6 space-y-2">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#e5f6f1] text-[#087f72]">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold text-[#142c42]">
                  {currentLang === 'fi'
                    ? 'Tarjouspyyntö vastaanotettu!'
                    : currentLang === 'sv'
                    ? 'Förfrågan mottagen!'
                    : 'Request Received!'}
                </h3>
                <p className="text-xs text-[#677c8d]">
                  {currentLang === 'fi'
                    ? `Paikallinen ${neighName}n tiimimme soittaa tai laittaa viestin numeroon ${leadPhone} pian.`
                    : currentLang === 'sv'
                    ? `Vårt lokala team i ${neighName} kontaktar dig på numret ${leadPhone} inom kort.`
                    : `Our ${neighName} crew will reach out to ${leadPhone} shortly.`}
                </p>
              </div>
            ) : (
              <form onSubmit={handleQuickLeadSubmit} className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-[#142c42]">
                    {currentLang === 'fi' ? 'Nimi' : currentLang === 'sv' ? 'Namn' : 'Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    placeholder={currentLang === 'fi' ? 'Matti Meikäläinen' : currentLang === 'sv' ? 'Anna Andersson' : 'Jane Doe'}
                    className="mt-1 w-full rounded-lg border border-[#cbd5e1] px-3 py-2 text-xs text-[#142c42] focus:border-[#0d9d8c] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#142c42]">
                    {currentLang === 'fi' ? 'Puhelinnumero' : currentLang === 'sv' ? 'Telefonnummer' : 'Phone'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                    placeholder="+358 40 123 4567"
                    className="mt-1 w-full rounded-lg border border-[#cbd5e1] px-3 py-2 text-xs text-[#142c42] focus:border-[#0d9d8c] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#142c42]">
                    {currentLang === 'fi' ? 'Haluttu palvelu' : currentLang === 'sv' ? 'Önskad tjänst' : 'Service'}
                  </label>
                  <select
                    value={leadService}
                    onChange={(e) => setLeadService(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-[#cbd5e1] px-3 py-2 text-xs text-[#142c42] focus:border-[#0d9d8c] focus:outline-hidden"
                  >
                    <option value="kotisiivous">
                      {currentLang === 'fi' ? 'Kotisiivous' : currentLang === 'sv' ? 'Hemstädning' : 'Home Cleaning'}
                    </option>
                    <option value="suursiivous">
                      {currentLang === 'fi' ? 'Suursiivous' : currentLang === 'sv' ? 'Storstädning' : 'Deep Cleaning'}
                    </option>
                    <option value="muuttosiivous">
                      {currentLang === 'fi' ? 'Muuttosiivous' : currentLang === 'sv' ? 'Flyttstädning' : 'Move-out Cleaning'}
                    </option>
                    <option value="ikkunanpesu">
                      {currentLang === 'fi' ? 'Ikkunanpesu' : currentLang === 'sv' ? 'Fönstertvätt' : 'Window Cleaning'}
                    </option>
                    <option value="sohvan-puhdistus">
                      {currentLang === 'fi' ? 'Sohvan puhdistus' : currentLang === 'sv' ? 'Sofftvätt' : 'Sofa Cleaning'}
                    </option>
                    <option value="toimistosiivous">
                      {currentLang === 'fi' ? 'Toimistosiivous' : currentLang === 'sv' ? 'Kontorsstädning' : 'Office Cleaning'}
                    </option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full mt-2 rounded-xl bg-[#ff8d43] py-2.5 text-xs font-bold text-[#10263d] hover:bg-[#ff9b59] transition-colors"
                >
                  {currentLang === 'fi' ? 'Lähetä nopea pyyntö' : currentLang === 'sv' ? 'Skicka snabbförfrågan' : 'Submit Request'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Related / Nearby Neighborhoods Internal Linking for SEO */}
      <section className="space-y-3 pt-2">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#677c8d]">
          {currentLang === 'fi'
            ? `Lähialueet ja muut kaupunginosat (${cityName})`
            : currentLang === 'sv'
            ? `Närliggande områden och andra stadsdelar (${cityName})`
            : `Nearby Neighborhoods & Adjacent Districts (${cityName})`}
        </h2>
        <div className="flex flex-wrap gap-2">
          {neighborhood.nearbyAreaIds.map((nearId) => {
            const nearNeigh = NEIGHBORHOODS[nearId];
            if (!nearNeigh) return null;
            return (
              <button
                key={nearId}
                type="button"
                onClick={() => onSelectNeighborhood(nearNeigh, nearNeigh.postalCodes[0])}
                className="flex items-center gap-1.5 rounded-lg border border-[#e2e9ee] bg-white px-3 py-2 text-xs font-medium text-[#142c42] hover:border-[#0d9d8c] hover:bg-[#eef7f5] hover:text-[#087f72] transition-colors"
              >
                <MapPin className="h-3 w-3 text-[#0d9d8c]" />
                <span>
                  {nearNeigh.names[currentLang]} ({nearNeigh.postalCodes[0]})
                </span>
                <ChevronRight className="h-3 w-3 text-[#94a3b8]" />
              </button>
            );
          })}
        </div>
      </section>
    </article>
  );
};
