import React, { useState, useMemo } from 'react';
import { Language, ServiceInfo, SERVICES } from '../data/content';
import { TRANSLATIONS } from '../data/translations';
import {
  Search,
  ArrowRight,
  Home,
  Building,
  Calendar,
  Sparkles,
  ShieldCheck,
  Truck,
  Sun,
  Droplet,
  Utensils,
  Layers,
  Flame,
  Hammer,
  Key,
  Briefcase,
  Smile,
  Activity,
  Box,
  HardHat,
} from 'lucide-react';

interface ServiceCatalogProps {
  currentLang: Language;
  onSelectService: (service: ServiceInfo) => void;
  onBookService: (serviceId: string) => void;
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  home: Home,
  building: Building,
  calendar: Calendar,
  sparkles: Sparkles,
  'shield-check': ShieldCheck,
  truck: Truck,
  sun: Sun,
  droplet: Droplet,
  utensils: Utensils,
  layers: Layers,
  flame: Flame,
  hammer: Hammer,
  key: Key,
  briefcase: Briefcase,
  smile: Smile,
  activity: Activity,
  box: Box,
  'hard-hat': HardHat,
  stairs: Building,
  'shopping-bag': Building,
  coffee: Utensils,
  sofa: Layers,
};

export const ServiceCatalog: React.FC<ServiceCatalogProps> = ({
  currentLang,
  onSelectService,
  onBookService,
}) => {
  const t = TRANSLATIONS[currentLang];
  const [activeFilter, setActiveFilter] = useState<'all' | 'home' | 'business'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = useMemo(() => {
    return SERVICES.filter((service) => {
      const matchesCategory = activeFilter === 'all' || service.category === activeFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        service.names[currentLang].toLowerCase().includes(q) ||
        service.desc[currentLang].toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [activeFilter, searchQuery, currentLang]);

  return (
    <section id="services" className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="text-[10.5px] font-[750] uppercase tracking-[1.55px] text-[#0d9d8c]">
            {t.nav.services} • Helsinki · Espoo · Vantaa
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-[780] tracking-[-0.045em] text-[#142c42] leading-[1.2]">
            {t.services.title}
          </h2>
          <p className="mt-1.5 text-[15px] sm:text-[16px] text-[#526a7d] max-w-2xl leading-[1.6]">{t.services.subtitle}</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-[#e2e9ee] bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8ba7b8]" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.services.searchPlaceholder}
            className="w-full min-h-[44px] rounded-xl border border-[#e2e9ee] bg-[#f8fafb] py-2.5 pl-10 pr-4 text-sm font-medium text-[#142c42] placeholder-[#8ba7b8] transition-colors focus:border-[#0d9d8c] focus:bg-white focus:outline-hidden"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto">
          <button
            onClick={() => setActiveFilter('all')}
            className={`min-h-[40px] rounded-xl px-4 py-2 text-[13px] font-[750] transition-colors ${
              activeFilter === 'all'
                ? 'bg-[#10263d] text-white shadow-xs'
                : 'bg-[#f5f8fa] text-[#526a7d] hover:bg-[#eaf1f5]'
            }`}
          >
            {t.services.allFilter} ({SERVICES.length})
          </button>
          <button
            onClick={() => setActiveFilter('home')}
            className={`min-h-[40px] rounded-xl px-4 py-2 text-[13px] font-[750] transition-colors ${
              activeFilter === 'home'
                ? 'bg-[#0d9d8c] text-white shadow-xs'
                : 'bg-[#f5f8fa] text-[#526a7d] hover:bg-[#eaf1f5]'
            }`}
          >
            {t.services.homeFilter} (13)
          </button>
          <button
            onClick={() => setActiveFilter('business')}
            className={`min-h-[40px] rounded-xl px-4 py-2 text-[13px] font-[750] transition-colors ${
              activeFilter === 'business'
                ? 'bg-[#2a455c] text-white shadow-xs'
                : 'bg-[#f5f8fa] text-[#526a7d] hover:bg-[#eaf1f5]'
            }`}
          >
            {t.services.businessFilter} (9)
          </button>
        </div>
      </div>

      {/* Services Grid */}
      {filteredServices.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#ccd9e0] bg-white p-12 text-center text-[#677c8d]">
          <p className="text-[15px] font-semibold">{t.services.noResults}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredServices.map((service) => {
            const Icon = ICON_MAP[service.icon] || Sparkles;
            const isHome = service.category === 'home';

            return (
              <article
                key={service.id}
                onClick={() => onSelectService(service)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectService(service);
                  }
                }}
                className="group relative flex flex-col justify-between rounded-xl border border-[#e2e9ee] bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-[#0d9d8c] hover:shadow-md cursor-pointer text-left"
              >
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                        isHome ? 'bg-[#e5f6f1] text-[#0d9d8c]' : 'bg-[#eaf1fb] text-[#2c5282]'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span
                      className={`rounded-md px-2 py-0.5 text-[10.5px] font-[750] uppercase tracking-[1.55px] ${
                        isHome ? 'bg-[#e5f6f1] text-[#087f72]' : 'bg-[#eaf1fb] text-[#2b6cb0]'
                      }`}
                    >
                      {isHome ? t.services.homeFilter : t.services.businessFilter}
                    </span>
                  </div>

                  <h3 className="text-[16px] sm:text-[17px] font-[780] text-[#142c42] group-hover:text-[#0d9d8c] transition-colors leading-snug">
                    {service.names[currentLang]}
                  </h3>

                  <p className="mt-2.5 text-[13.5px] sm:text-[14px] text-[#526a7d] leading-[1.6] line-clamp-3">
                    {service.desc[currentLang]}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#f0f4f7] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 min-h-[44px] px-1 text-[13.5px] font-[750] text-[#087f72] group-hover:text-[#065e54] transition-colors">
                    <span>{t.services.exploreService}</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 text-[#ff8d43]" />
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onBookService(service.id);
                    }}
                    className="flex items-center justify-center min-h-[44px] rounded-xl bg-[#fff3ea] px-4 py-2 text-[13px] font-[750] text-[#ff8d43] hover:bg-[#ff8d43] hover:text-white transition-colors touch-target shadow-2xs"
                  >
                    {t.services.bookService}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};
