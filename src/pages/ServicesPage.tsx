import React from 'react';
import { Language, ServiceInfo } from '../data/content';
import { TRANSLATIONS } from '../data/translations';
import { ServiceCatalog } from '../components/ServiceCatalog';
import { VisualBanner } from '../components/VisualBanner';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { BreadcrumbItem } from '../utils/urlHierarchy';
import { ArrowRight, Calculator } from 'lucide-react';
import { NeighborhoodInfo } from '../data/locations';
import { ActiveLocationBar } from '../components/ActiveLocationBar';

interface ServicesPageProps {
  currentLang: Language;
  breadcrumbs?: BreadcrumbItem[];
  selectedNeighborhood?: NeighborhoodInfo | null;
  selectedPostalCode?: string;
  onNavigateUrl?: (url: string) => void;
  onSelectService: (service: ServiceInfo) => void;
  onBookService: (serviceId: string) => void;
  onNavigateToCalculator: () => void;
  onNavigateToQuote: () => void;
  onOpenLocationSearch?: () => void;
  onSelectNeighborhood?: (neighborhood: NeighborhoodInfo, postalCode?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  currentLang,
  breadcrumbs,
  selectedNeighborhood,
  selectedPostalCode,
  onNavigateUrl,
  onSelectService,
  onBookService,
  onNavigateToCalculator,
  onNavigateToQuote,
  onOpenLocationSearch,
  onSelectNeighborhood,
}) => {
  const t = TRANSLATIONS[currentLang];
  const sp = t.servicesPage;

  const defaultBreadcrumbs: BreadcrumbItem[] = [
    { label: t.nav.home, url: '#/' },
    { label: t.nav.services, url: '#/services', isCurrent: true },
  ];

  const handleNavigate = (url: string) => {
    if (onNavigateUrl) {
      onNavigateUrl(url);
    } else {
      window.location.hash = url.startsWith('#') ? url : `#${url}`;
    }
  };

  const bannerBadge = selectedNeighborhood
    ? `${t.nav.services.toUpperCase()} • ${selectedNeighborhood.names[currentLang].toUpperCase()}`
    : sp.badge;

  const bannerTitle = selectedNeighborhood
    ? currentLang === 'fi'
      ? `Kattavat siivouspalvelut kotiin ja yrityksille kohteessa ${selectedNeighborhood.names[currentLang]}`
      : currentLang === 'sv'
      ? `Omfattande städtjänster för hem och företag i ${selectedNeighborhood.names[currentLang]}`
      : `Comprehensive cleaning services for home and office in ${selectedNeighborhood.names[currentLang]}`
    : sp.title;

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
        onSelectNeighborhood={onSelectNeighborhood || (() => {})}
        onNavigateUrl={handleNavigate}
      />

      {/* Visual Header Banner */}
      <VisualBanner
        type="home"
        badge={bannerBadge}
        title={bannerTitle}
        headingTag="h1"
      />

      {/* Main Service Catalog */}
      <ServiceCatalog
        currentLang={currentLang}
        onSelectService={onSelectService}
        onBookService={onBookService}
      />

      {/* Quality & Scope Guarantee Box */}
      <section className="rounded-2xl border border-[#e2e9ee] bg-white p-6 md:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0d9d8c]">
              {sp.guaranteeBadge}
            </span>
            <h3 className="text-xl font-bold text-[#142c42]">
              {sp.guaranteeTitle}
            </h3>
            <p className="text-xs text-[#677c8d] leading-relaxed">
              {sp.guaranteeDesc}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onNavigateToCalculator}
              className="flex items-center gap-2 rounded-xl border border-[#0d9d8c] bg-[#eef7f5] px-5 py-3 text-xs font-bold text-[#087f72] hover:bg-[#dff2ed] transition-colors"
            >
              <Calculator className="h-4 w-4" />
              <span>{sp.ctaCalculate}</span>
            </button>
            <button
              onClick={onNavigateToQuote}
              className="flex items-center gap-2 rounded-xl bg-[#ff8d43] px-5 py-3 text-xs font-bold text-[#10263d] hover:bg-[#ff9b59] transition-colors shadow-xs"
            >
              <span>{sp.ctaCustomQuote}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
