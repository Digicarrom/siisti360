import React, { useState, useMemo } from 'react';
import { Language, SERVICES, CITIES, GUIDES } from '../data/content';
import { TRANSLATIONS } from '../data/translations';
import { SEO_PAGES, SeoPage } from '../data/seoCatalog';
import { VisualBanner } from '../components/VisualBanner';
import { NEIGHBORHOODS } from '../data/locations';
import {
  Search,
  Filter,
  ExternalLink,
  Layers,
  Globe2,
  MapPin,
  Sparkles,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Code,
  Copy,
  Download,
  Check,
} from 'lucide-react';

interface SeoDirectoryPageProps {
  currentLang: Language;
  onNavigatePage: (pageType: string, serviceId?: string, cityId?: string, guideId?: string) => void;
  onRequestQuote: () => void;
}

export const SeoDirectoryPage: React.FC<SeoDirectoryPageProps> = ({
  currentLang,
  onNavigatePage,
  onRequestQuote,
}) => {
  const [selectedLang, setSelectedLang] = useState<Language>(currentLang);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'cards' | 'xml'>('cards');
  const [copied, setCopied] = useState(false);

  const t = TRANSLATIONS[currentLang];

  const categoryLabels = {
    fi: {
      all: 'Kaikki sivut',
      core: 'Pääsivut (10)',
      services: 'Siivouspalvelut (22)',
      serviceCity: 'Palvelu × Kaupunki (66)',
      areas: 'Toimialueet (3)',
      guides: 'Oppaat (4)',
    },
    sv: {
      all: 'Alla sidor',
      core: 'Huvudsidor (10)',
      services: 'Städtjänster (22)',
      serviceCity: 'Tjänst × Stad (66)',
      areas: 'Områden (3)',
      guides: 'Guider (4)',
    },
    en: {
      all: 'All Pages',
      core: 'Core Pages (10)',
      services: 'Cleaning Services (22)',
      serviceCity: 'Service × City (66)',
      areas: 'City Hubs (3)',
      guides: 'Guides (4)',
    },
  }[currentLang];

  // Filter SEO pages based on language, category, and search query
  const filteredPages = useMemo(() => {
    return SEO_PAGES.filter((p) => {
      // Language match
      if (p.language !== selectedLang) return false;

      // Category match
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'core') {
          const coreTypes = ['home', 'quote', 'pricing', 'about', 'faq', 'contact', 'privacy', 'booking', 'calculator', 'compare', 'why', 'reviews', 'story'];
          if (!coreTypes.includes(p.pageType)) return false;
        } else if (selectedCategory === 'services') {
          if (p.pageType !== 'service' && p.pageType !== 'services') return false;
        } else if (selectedCategory === 'serviceCity') {
          if (p.pageType !== 'serviceCity') return false;
        } else if (selectedCategory === 'areas') {
          if (p.pageType !== 'areas') return false;
        } else if (selectedCategory === 'guides') {
          if (p.pageType !== 'blog' && p.pageType !== 'guide') return false;
        }
      }

      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesPrimary = p.primaryKeyword.toLowerCase().includes(query);
        const matchesTitle = p.seoTitle.toLowerCase().includes(query);
        const matchesPath = p.path.toLowerCase().includes(query);
        const matchesH1 = p.h1.toLowerCase().includes(query);
        const matchesSecondary = p.secondaryKeywords.some((k) => k.toLowerCase().includes(query));
        return matchesPrimary || matchesTitle || matchesPath || matchesH1 || matchesSecondary;
      }

      return true;
    });
  }, [selectedLang, selectedCategory, searchQuery]);

  // Generate XML Sitemap dynamically for search engines and webmasters
  const xmlContent = useMemo(() => {
    const urls = filteredPages.map((p) => {
      const priority =
        p.pageType === 'home'
          ? '1.0'
          : p.pageType === 'service' || p.pageType === 'city' || p.pageType === 'serviceCity'
          ? '0.9'
          : '0.8';
      const changefreq = p.pageType === 'home' ? 'daily' : 'weekly';
      return `  <url>
    <loc>${p.canonicalUrl}</loc>
    <lastmod>2026-11-07</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    });

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>`;
  }, [filteredPages]);

  const handleCopyXml = () => {
    navigator.clipboard.writeText(xmlContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadXml = () => {
    const blob = new Blob([xmlContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sitemap-${selectedLang}.xml`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePageClick = (page: SeoPage) => {
    // Map URL path to internal app routes
    if (page.pageType === 'home') {
      onNavigatePage('home');
    } else if (page.pageType === 'services') {
      onNavigatePage('services');
    } else if (page.pageType === 'areas') {
      // Find matching city if specified in path
      const city = CITIES.find((c) => page.path.includes(c.id) || page.path.includes(c.slugs.sv));
      if (city) {
        onNavigatePage('city-detail', undefined, city.id);
      } else {
        onNavigatePage('areas');
      }
    } else if (page.pageType === 'service') {
      const service = SERVICES.find((s) => page.path.includes(s.id) || page.path.includes(s.slugs[page.language]));
      if (service) {
        onNavigatePage('service-detail', service.id);
      } else {
        onNavigatePage('services');
      }
    } else if (page.pageType === 'serviceCity') {
      // Find both service and city
      const service = SERVICES.find((s) => page.path.includes(s.id) || page.path.includes(s.slugs[page.language]));
      const city = CITIES.find((c) => page.path.includes(c.id) || page.path.includes(c.slugs.sv));
      if (service && city) {
        onNavigatePage('service-detail', service.id, city.id);
      } else if (service) {
        onNavigatePage('service-detail', service.id);
      } else {
        onNavigatePage('services');
      }
    } else if (page.pageType === 'pricing') {
      onNavigatePage('pricing');
    } else if (page.pageType === 'calculator') {
      onNavigatePage('calculator');
    } else if (page.pageType === 'booking') {
      onNavigatePage('booking');
    } else if (page.pageType === 'compare') {
      onNavigatePage('compare');
    } else if (page.pageType === 'why') {
      onNavigatePage('why');
    } else if (page.pageType === 'reviews') {
      onNavigatePage('reviews');
    } else if (page.pageType === 'story') {
      onNavigatePage('story');
    } else if (page.pageType === 'blog' || page.pageType === 'guide') {
      const guide = GUIDES.find((g) => page.path.includes(g.id) || page.path.includes(g.slugs[page.language]));
      if (guide) {
        onNavigatePage('guide-detail', undefined, undefined, guide.id);
      } else {
        onNavigatePage('guides');
      }
    } else if (page.pageType === 'faq') {
      onNavigatePage('faq');
    } else if (page.pageType === 'about') {
      onNavigatePage('about');
    } else if (page.pageType === 'contact') {
      onNavigatePage('contact');
    } else if (page.pageType === 'quote') {
      onNavigatePage('quote');
    } else {
      onNavigatePage('home');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Banner */}
      <VisualBanner
        type="story"
        headingTag="h1"
        badge="SEO-RAKENNE & SIVUKARTTA • 333 KOHDISTETTUA SIVUA"
        title="Täydellinen 3-kielinen SEO-arkkitehtuuri ja sivukartta"
      />

      {/* Explanatory Context Bar */}
      <div className="rounded-2xl border border-[#d2e4ea] bg-white p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-[#10263d]">
              Kaikki 333 hakukoneoptimoitua laskeutumissivua
            </h2>
            <p className="text-xs text-[#526a7e] leading-relaxed max-w-2xl">
              Sivusto sisältää kattavan 333 sivun hakukonerakenteen (111 suomeksi, 111 ruotsiksi ja 111 englanniksi).
              Jokaisella sivulla on määritelty oma <strong>Primary Keyword</strong>, <strong>Secondary Keywords</strong>,
              yksilöllinen SEO Title, Meta Description ja Schema.org -rakennetieto.
            </p>
          </div>
          <button
            type="button"
            onClick={onRequestQuote}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#ff8d43] hover:bg-[#ff9b59] px-5 py-3 text-xs font-bold text-[#10263d] shadow-sm shrink-0 transition-colors"
          >
            <span>{t.nav.requestQuote}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Controls: Language Selector, Category Filters, Search Input */}
      <div className="rounded-2xl border border-[#e2e9ee] bg-white p-5 shadow-xs space-y-4">
        {/* Language Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#f0f4f7] pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#6b8294]">
            Valitse kieli / Välj språk / Select language:
          </span>
          <div className="flex items-center gap-1.5 rounded-xl bg-[#f0f4f8] p-1">
            <button
              type="button"
              onClick={() => setSelectedLang('fi')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                selectedLang === 'fi'
                  ? 'bg-white text-[#087f72] shadow-xs'
                  : 'text-[#506677] hover:text-[#10263d]'
              }`}
            >
              <span>🇫🇮 Suomi</span>
              <span className="rounded-full bg-[#087f72]/10 px-1.5 py-0.2 text-[10px] text-[#087f72]">
                111
              </span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedLang('sv')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                selectedLang === 'sv'
                  ? 'bg-white text-[#087f72] shadow-xs'
                  : 'text-[#506677] hover:text-[#10263d]'
              }`}
            >
              <span>🇸🇪 Svenska</span>
              <span className="rounded-full bg-[#087f72]/10 px-1.5 py-0.2 text-[10px] text-[#087f72]">
                111
              </span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedLang('en')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                selectedLang === 'en'
                  ? 'bg-white text-[#087f72] shadow-xs'
                  : 'text-[#506677] hover:text-[#10263d]'
              }`}
            >
              <span>🇬🇧 English</span>
              <span className="rounded-full bg-[#087f72]/10 px-1.5 py-0.2 text-[10px] text-[#087f72]">
                111
              </span>
            </button>
          </div>
        </div>

        {/* Category Pills & Search */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: categoryLabels.all },
              { id: 'services', label: categoryLabels.services },
              { id: 'serviceCity', label: categoryLabels.serviceCity },
              { id: 'areas', label: categoryLabels.areas },
              { id: 'core', label: categoryLabels.core },
              { id: 'guides', label: categoryLabels.guides },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#10263d] text-white shadow-xs'
                    : 'bg-[#f4f7f9] text-[#4b6070] hover:bg-[#e8eff3]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative min-w-[260px]">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Etsi avainsanalla, otsikolla tai URL:lla..."
              className="w-full rounded-xl border border-[#d6e2e9] bg-[#fbfdfd] pl-9 pr-3 py-2 text-xs text-[#10263d] focus:border-[#087f72] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#087f72]/20 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Results Header and View Mode Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-semibold text-[#5a7182]">
        <div className="flex items-center gap-3">
          <span>
            Näytetään <strong className="text-[#10263d]">{filteredPages.length}</strong> sivua valituilla kriteereillä:
          </span>
          <span className="hidden md:inline-flex items-center gap-1.5 text-[#087f72]">
            <CheckCircle className="h-4 w-4" />
            Kaikki sivut linkitetty & indeksoitavissa
          </span>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-xl bg-white border border-[#d6e2e9] p-0.5 shadow-2xs">
            <button
              type="button"
              onClick={() => setViewMode('cards')}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                viewMode === 'cards'
                  ? 'bg-[#10263d] text-white shadow-xs'
                  : 'text-[#506677] hover:text-[#10263d]'
              }`}
            >
              Korttiluettelo
            </button>
            <button
              type="button"
              onClick={() => setViewMode('xml')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                viewMode === 'xml'
                  ? 'bg-[#087f72] text-white shadow-xs'
                  : 'text-[#506677] hover:text-[#10263d]'
              }`}
            >
              <Code className="h-3.5 w-3.5" />
              <span>XML Sitemap</span>
            </button>
          </div>
        </div>
      </div>

      {/* XML Sitemap Viewer Mode */}
      {viewMode === 'xml' ? (
        <div className="rounded-2xl border border-[#d6e2e9] bg-[#0d1c2c] text-[#e0ecf4] shadow-md p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="rounded bg-[#ff8d43] px-2 py-0.5 text-[11px] font-bold text-[#10263d] font-mono">
                sitemap-{selectedLang}.xml
              </span>
              <span className="text-xs text-[#a0b5c4]">
                Validioitu XML Schema.org sitemap ({filteredPages.length} URL-osoitetta)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyXml}
                className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 hover:bg-white/20 px-3 py-1.5 text-xs font-bold text-white transition-colors border border-white/10"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? 'Kopioitu!' : 'Kopioi XML'}</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadXml}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#0d9d8c] hover:bg-[#087f72] px-3 py-1.5 text-xs font-bold text-white transition-colors shadow-xs"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Lataa sitemap.xml</span>
              </button>
            </div>
          </div>

          <pre className="max-h-[500px] overflow-auto rounded-xl bg-black/40 p-4 font-mono text-[11px] leading-relaxed text-[#7ee787]">
            {xmlContent}
          </pre>
        </div>
      ) : (
        /* Pages Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredPages.map((page) => (
          <div
            key={page.id}
            onClick={() => handlePageClick(page)}
            className="group flex flex-col justify-between rounded-2xl border border-[#e2e9ee] bg-white p-5 shadow-xs hover:border-[#087f72] hover:shadow-md transition-all cursor-pointer relative"
          >
            <div>
              {/* Type and Lang badge */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="rounded-md bg-[#ebf7f5] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#087f72]">
                  {page.pageType}
                </span>
                <span className="font-mono text-[11px] text-[#869ab0] truncate max-w-[180px]">
                  {page.path}
                </span>
              </div>

              {/* Title & H1 */}
              <h3 className="text-sm font-bold text-[#10263d] group-hover:text-[#087f72] transition-colors leading-snug">
                {page.seoTitle}
              </h3>

              {/* Primary Keyword Badge */}
              <div className="mt-2.5 flex items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase text-[#73889b]">Pääavainsana:</span>
                <span className="inline-flex items-center rounded-md bg-[#fff7ed] px-2 py-0.5 text-xs font-bold text-[#c2410c] border border-[#fed7aa]">
                  {page.primaryKeyword}
                </span>
              </div>

              {/* Meta Description snippet */}
              <p className="mt-2 text-xs text-[#526a7e] line-clamp-2 leading-relaxed">
                {page.metaDescription}
              </p>

              {/* Secondary keywords preview */}
              {page.secondaryKeywords && page.secondaryKeywords.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {page.secondaryKeywords.slice(0, 3).map((kw, i) => (
                    <span
                      key={i}
                      className="rounded bg-[#f4f7f9] px-1.5 py-0.5 text-[10px] text-[#556b7c]"
                    >
                      {kw}
                    </span>
                  ))}
                  {page.secondaryKeywords.length > 3 && (
                    <span className="text-[10px] text-slate-400">
                      +{page.secondaryKeywords.length - 3} muuta
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Bottom action bar */}
            <div className="mt-4 pt-3 border-t border-[#f0f4f7] flex items-center justify-between text-xs font-bold text-[#087f72]">
              <span>Avaa sivu ja tarkista SEO →</span>
              <ExternalLink className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        ))}
        </div>
      )}
    </div>
  );
};
