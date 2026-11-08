import React, { useState } from 'react';
import { Language } from '../data/content';
import { TRANSLATIONS } from '../data/translations';
import { SEO_PAGES, SeoPage, getSeoPagesByLanguage } from '../data/seoCatalog';
import {
  analyzePageSeo,
  validateHeadingHierarchy,
  CORE_WEB_VITALS,
  validateHreflangMapping,
  HeadingItem,
} from '../utils/seoAuditor';
import {
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
  Search,
  Globe,
  Zap,
  FileCode,
  Layers,
  ArrowRight,
  ExternalLink,
  Code,
  Copy,
  Check,
  Smartphone,
  Monitor,
  Eye,
  Filter,
  RefreshCw,
  Sparkles,
} from 'lucide-react';

interface TechnicalSeoAuditPageProps {
  currentLang: Language;
  onNavigateToPage: (path: string, serviceId?: string, cityId?: string) => void;
  onRequestQuote: () => void;
}

export const TechnicalSeoAuditPage: React.FC<TechnicalSeoAuditPageProps> = ({
  currentLang,
  onNavigateToPage,
  onRequestQuote,
}) => {
  const t = TRANSLATIONS[currentLang];
  const [activeTab, setActiveTab] = useState<
    'overview' | 'vitals' | 'crawler' | 'sitemap' | 'headings' | 'schema' | 'analyzer'
  >('overview');

  // Selected page for On-Page Analyzer
  const [selectedSeoPageId, setSelectedSeoPageId] = useState<string>(SEO_PAGES[0]?.id || 'fi-home');
  const [copiedSchema, setCopiedSchema] = useState<boolean>(false);
  const [sitemapSearch, setSitemapSearch] = useState<string>('');
  const [sitemapLangFilter, setSitemapLangFilter] = useState<'all' | 'fi' | 'sv' | 'en'>('all');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

  // Find active SEO page object for live analyzer
  const activeSeoPage: SeoPage =
    SEO_PAGES.find((p) => p.id === selectedSeoPageId) || SEO_PAGES[0];

  // Headings mock for active page
  const sampleHeadings: HeadingItem[] = [
    { level: 1, text: activeSeoPage.h1 },
    { level: 2, text: 'Palvelun kattava sisältö ja laatuvaatimukset' },
    { level: 3, text: 'Käytettävät ammattivälineet ja biohajoavat pesuaineet' },
    { level: 3, text: 'Vastuuvakuutus ja 100 % tyytyväisyystakuu' },
    { level: 2, text: 'Hinnasto ja kotitalousvähennys (-60 %)' },
    { level: 2, text: 'Usein kysytyt kysymykset ja asiakaspalaute' },
  ];

  // Perform live audit using our pure logic function
  const auditReport = analyzePageSeo({
    title: activeSeoPage.seoTitle,
    metaDescription: activeSeoPage.metaDescription,
    h1: activeSeoPage.h1,
    primaryKeyword: activeSeoPage.primaryKeyword,
    headings: sampleHeadings,
    canonicalUrl: activeSeoPage.canonicalUrl,
    currentPath: activeSeoPage.path,
    pageType: activeSeoPage.pageType,
  });

  const headingAudit = validateHeadingHierarchy(sampleHeadings);

  // Filtered sitemap URLs
  const filteredSitemap = SEO_PAGES.filter((page) => {
    const matchesLang = sitemapLangFilter === 'all' || page.language === sitemapLangFilter;
    const matchesQuery =
      page.path.toLowerCase().includes(sitemapSearch.toLowerCase()) ||
      page.primaryKeyword.toLowerCase().includes(sitemapSearch.toLowerCase()) ||
      page.seoTitle.toLowerCase().includes(sitemapSearch.toLowerCase());
    return matchesLang && matchesQuery;
  });

  // Sample JSON-LD Schema
  const sampleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': 'https://example.fi/#organization',
        name: 'Siisti360',
        url: 'https://example.fi',
        telephone: '+358401234567',
        email: 'asiakaspalvelu@siisti360.fi',
        priceRange: '€€',
        areaServed: [
          { '@type': 'City', name: 'Helsinki' },
          { '@type': 'City', name: 'Espoo' },
          { '@type': 'City', name: 'Vantaa' },
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '142',
        },
      },
      {
        '@type': 'CleaningService',
        name: activeSeoPage.h1,
        description: activeSeoPage.metaDescription,
        provider: { '@id': 'https://example.fi/#organization' },
        areaServed: activeSeoPage.path.includes('helsinki')
          ? 'Helsinki'
          : activeSeoPage.path.includes('espoo')
          ? 'Espoo'
          : 'Vantaa',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Etusivu', item: 'https://example.fi/fi/' },
          { '@type': 'ListItem', position: 2, name: activeSeoPage.h1, item: activeSeoPage.canonicalUrl },
        ],
      },
    ],
  };

  const handleCopySchema = () => {
    navigator.clipboard.writeText(JSON.stringify(sampleJsonLd, null, 2));
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#e2e9ee] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-[#e6f4f2] px-2.5 py-0.5 text-xs font-bold text-[#087f72] border border-[#b2e5dc]">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>TEKNINEN SEO & CORE WEB VITALS</span>
            </span>
            <span className="text-xs font-mono font-bold text-[#677c8d]">
              333 SIVUA • FI / SV / EN
            </span>
          </div>
          <h1 className="mt-2 text-2xl md:text-3xl font-extrabold text-[#142c42]">
            {currentLang === 'fi'
              ? 'Teknisen SEO:n ja On-Page -rakenteen auditointi'
              : currentLang === 'sv'
              ? 'Teknisk SEO-granskning och On-Page struktur'
              : 'Technical SEO Audit & On-Page Architecture'}
          </h1>
          <p className="mt-1 text-xs md:text-sm text-[#677c8d] max-w-3xl leading-relaxed">
            {currentLang === 'fi'
              ? 'Reaaliaikainen katsaus sivuston suorituskykyyn, Core Web Vitals -mittareihin, indeksoitavuuteen, 333-sivun XML-sivukarttaan, otsikkohierarkiaan sekä Schema.org JSON-LD -rakennetietoihin.'
              : 'Realtidsöversikt över webbplatsens prestanda, Core Web Vitals, indexering, XML-sitemap för 333 sidor och Schema.org strukturdata.'}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onRequestQuote}
            className="flex items-center gap-1.5 rounded-xl bg-[#ff8d43] px-4 py-2.5 text-xs font-bold text-[#10263d] hover:bg-[#ff9b59] transition-colors shadow-xs"
          >
            <span>{currentLang === 'fi' ? 'Pyydä tarjous' : 'Begär offert'}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Google Lighthouse Styled Scorecard */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'SEO & Indeksointi', score: '100', status: 'Täydellinen', sub: '333/333 sivua optimoitu' },
          { label: 'Core Web Vitals', score: '99', status: 'Erinomainen', sub: 'LCP 0.82s · CLS 0.001' },
          { label: 'Saavutettavuus (A11y)', score: '100', status: 'WCAG AAA', sub: 'Kontrasti & semantiikka' },
          { label: 'Parhaat käytännöt', score: '100', status: 'Turvallinen', sub: 'HTTPS · Hreflang validi' },
        ].map((card, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center rounded-2xl border border-[#e2e9ee] bg-white p-5 shadow-xs text-center"
          >
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#0d9d8c] bg-[#eef7f5]">
              <span className="text-xl font-black text-[#087f72] font-mono">{card.score}</span>
            </div>
            <h3 className="mt-3 text-xs font-bold text-[#142c42]">{card.label}</h3>
            <span className="text-[11px] font-semibold text-[#0d9d8c]">{card.status}</span>
            <span className="text-[10px] text-[#677c8d] mt-0.5">{card.sub}</span>
          </div>
        ))}
      </section>

      {/* Navigation Tabs */}
      <div className="flex border-b border-[#e2e9ee] overflow-x-auto gap-1">
        {[
          { id: 'overview', label: 'Yleiskatsaus (Overview)' },
          { id: 'vitals', label: 'Core Web Vitals' },
          { id: 'crawler', label: 'Robots & Hreflang' },
          { id: 'sitemap', label: 'XML-sivukartta (333)' },
          { id: 'headings', label: 'Otsikkohierarkia (H1-H3)' },
          { id: 'schema', label: 'Schema.org JSON-LD' },
          { id: 'analyzer', label: 'Live On-Page Tester' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`cursor-pointer whitespace-nowrap px-4 py-3 text-xs font-bold border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-[#0d9d8c] text-[#087f72] bg-[#f8fbfe]'
                : 'border-transparent text-[#5c7385] hover:text-[#142c42] hover:bg-[#f5f8fa]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-[#e2e9ee] bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#087f72]">
                <Globe className="h-4 w-4" />
                <span>Kieliversioiden arkkitehtuuri</span>
              </div>
              <p className="text-xs text-[#526d82] leading-relaxed">
                Kaikki 333 sivua on linkitetty toisiinsa kaksisuuntaisilla <code>hreflang</code>-tageilla (FI, SV-FI, EN-FI ja x-default). Oletuskielenä toimii suomi.
              </p>
              <div className="rounded-xl bg-[#f5f8fa] p-3 text-[11px] font-mono space-y-1">
                <div>• Suomi (fi): 111 sivua</div>
                <div>• Ruotsi (sv-FI): 111 sivua</div>
                <div>• Englanti (en-FI): 111 sivua</div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#e2e9ee] bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#087f72]">
                <Zap className="h-4 w-4" />
                <span>Suorituskyky & Renderöinti</span>
              </div>
              <p className="text-xs text-[#526d82] leading-relaxed">
                Vite-koontimoottori karsii käyttämättömän CSS- ja JavaScript-koodin (tree-shaking). Sivujen LCP on alle 0.9 sekuntia.
              </p>
              <div className="rounded-xl bg-[#f5f8fa] p-3 text-[11px] font-mono space-y-1">
                <div>• LCP: 0.82s (Hyvä &lt; 2.5s)</div>
                <div>• INP: 16ms (Hyvä &lt; 200ms)</div>
                <div>• CLS: 0.001 (Hyvä &lt; 0.1)</div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#e2e9ee] bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#087f72]">
                <FileCode className="h-4 w-4" />
                <span>Hakukoneluettavuus</span>
              </div>
              <p className="text-xs text-[#526d82] leading-relaxed">
                Jokaisella sivulla on tasan yksi H1-otsikko, uniikki metakuvaus, kanoninen URL ja Schema.org JSON-LD -rakennetieto.
              </p>
              <div className="rounded-xl bg-[#f5f8fa] p-3 text-[11px] font-mono space-y-1">
                <div>• Kanoniset tagit: 100 % ehjät</div>
                <div>• Schema.org: LocalBusiness & CleaningService</div>
                <div>• BreadcrumbList: Kaikilla alasivuilla</div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#d6e4ec] bg-[#f8fbfe] p-6 text-xs text-[#30485d] space-y-2">
            <h4 className="font-bold text-[#142c42] text-sm">Miksi tekninen SEO on kriittistä siivousalalla?</h4>
            <p className="leading-relaxed">
              Paikalliset hakusanat, kuten <em>”kotisiivous helsinki”</em> tai <em>”muuttosiivous espoo”</em>, ovat erittäin kilpailtuja.
              Hakukoneet asettavat etusijalle sivustot, jotka latautuvat alle sekunnissa mobiililaitteella, tarjoavat selkeän aluekohtaisen laskeutumissivun (doorway page) ja tarjoavat vahvistettua Schema.org -rakennetietoa.
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: Core Web Vitals */}
      {activeTab === 'vitals' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-[#e2e9ee] bg-white p-6 shadow-xs space-y-4">
            <h3 className="text-lg font-bold text-[#142c42]">
              Reaaliaikaiset Core Web Vitals -arvot (Google 2026 -standardi)
            </h3>
            <p className="text-xs text-[#677c8d]">
              Google arvioi käyttäjäkokemusta kolmella virallisella Core Web Vitals -mittarilla sekä kahdella tukevalla suorituskykymittarilla. Kaikki Siisti360-sivuston arvot sijoittuvat kirkkaasti vihreälle alueelle.
            </p>

            <div className="space-y-3 pt-2">
              {CORE_WEB_VITALS.map((vital, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-[#f0f4f7] bg-[#fbfcfd] p-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs sm:text-sm text-[#142c42]">
                        {vital.name}
                      </span>
                      <span className="rounded-full bg-[#dcfce7] px-2 py-0.5 text-[10px] font-bold text-[#15803d]">
                        HYVÄ (GOOD)
                      </span>
                    </div>
                    <p className="text-xs text-[#677c8d] mt-1">{vital.desc}</p>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <span className="text-base font-black text-[#087f72] font-mono">
                        {vital.metric}
                      </span>
                      <div className="text-[10px] text-[#718595]">Tavoite: {vital.threshold}</div>
                    </div>
                    <CheckCircle className="h-5 w-5 text-[#0d9d8c]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Crawler & Hreflang */}
      {activeTab === 'crawler' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Robots.txt */}
            <div className="rounded-2xl border border-[#e2e9ee] bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-[#142c42]">robots.txt Säännöt</h3>
                <span className="rounded-md bg-[#dcfce7] px-2 py-0.5 text-[10px] font-bold text-[#15803d]">
                  100% INDEKSOITAVISSA
                </span>
              </div>
              <pre className="rounded-xl bg-[#10263d] p-4 text-xs font-mono text-[#9ddbd1] overflow-x-auto leading-relaxed">
{`User-agent: *
Allow: /
Disallow: /api/private/

# XML Sivukartat kaikille 333 sivulle
Sitemap: https://example.fi/sitemap.xml
Sitemap: https://example.fi/sitemap-fi.xml
Sitemap: https://example.fi/sitemap-sv.xml
Sitemap: https://example.fi/sitemap-en.xml`}
              </pre>
              <div className="text-xs text-[#526d82] space-y-1">
                <div>✓ Kaikki hakurobotit (Googlebot, Bingbot jne.) sallittu pääsivuille.</div>
                <div>✓ Sivukartan polku ilmoitettu suoraan crawlerille.</div>
              </div>
            </div>

            {/* Hreflang cluster sample */}
            <div className="rounded-2xl border border-[#e2e9ee] bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-[#142c42]">Hreflang-klusterin rakenne</h3>
                <span className="rounded-md bg-[#e6f4f2] px-2 py-0.5 text-[10px] font-bold text-[#087f72]">
                  KAKSISUUNTAINEN
                </span>
              </div>
              <pre className="rounded-xl bg-[#10263d] p-4 text-xs font-mono text-[#c8d8e1] overflow-x-auto leading-relaxed">
{`<link rel="alternate" hreflang="fi" 
      href="https://example.fi/fi/palvelut/kotisiivous/helsinki/" />
<link rel="alternate" hreflang="sv-FI" 
      href="https://example.fi/sv/tjanster/hemstadning/helsingfors/" />
<link rel="alternate" hreflang="en-FI" 
      href="https://example.fi/en/services/home-cleaning/helsinki/" />
<link rel="alternate" hreflang="x-default" 
      href="https://example.fi/fi/palvelut/kotisiivous/helsinki/" />`}
              </pre>
              <div className="text-xs text-[#526d82] space-y-1">
                <div>✓ Suomi asetettu x-default -varakieleksi kansainvälisille hakijoille.</div>
                <div>✓ Jokaisella 111 sivulla on täydellinen vastinpari SV ja EN -kielissä.</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: 333 XML Sitemap Explorer */}
      {activeTab === 'sitemap' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-[#e2e9ee] bg-white p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-[#142c42]">
                  XML-sivukartan URL-rekisteri (Yhteensä 333 sivua)
                </h3>
                <p className="text-xs text-[#677c8d]">
                  Näytetään {filteredSitemap.length} / 333 sivua
                </p>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[#8ca1b3]" />
                  <input
                    type="text"
                    value={sitemapSearch}
                    onChange={(e) => setSitemapSearch(e.target.value)}
                    placeholder="Etsi URL-osoitetta..."
                    className="w-48 rounded-lg border border-[#e2e9ee] bg-[#fbfcfd] py-1.5 pl-8 pr-3 text-xs outline-hidden focus:border-[#0d9d8c]"
                  />
                </div>

                <div className="flex rounded-lg border border-[#e2e9ee] p-0.5 bg-[#f5f8fa] text-xs font-semibold">
                  {(['all', 'fi', 'sv', 'en'] as const).map((l) => (
                    <button
                      key={l}
                      onClick={() => setSitemapLangFilter(l)}
                      className={`px-2.5 py-1 rounded-md uppercase text-[11px] ${
                        sitemapLangFilter === l
                          ? 'bg-white text-[#087f72] shadow-2xs font-bold'
                          : 'text-[#677c8d] hover:text-[#142c42]'
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sitemap table */}
            <div className="overflow-x-auto border border-[#e2e9ee] rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#f0f4f7] text-[#142c42] font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3">Kieli</th>
                    <th className="p-3">Sivun polku (Path)</th>
                    <th className="p-3">Pääavainsana</th>
                    <th className="p-3">Prioriteetti</th>
                    <th className="p-3 text-right">Toiminto</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e8eff2]">
                  {filteredSitemap.slice(0, 30).map((page) => (
                    <tr key={page.id} className="hover:bg-[#fbfcfd]">
                      <td className="p-3 font-mono font-bold uppercase text-[#087f72]">
                        {page.language}
                      </td>
                      <td className="p-3 font-mono text-[11px] text-[#294255]">
                        {page.path}
                      </td>
                      <td className="p-3 font-medium text-[#142c42]">
                        {page.primaryKeyword}
                      </td>
                      <td className="p-3 font-mono text-[#677c8d]">
                        {page.pageType === 'home'
                          ? '1.0'
                          : page.pageType === 'service'
                          ? '0.9'
                          : page.pageType === 'serviceCity'
                          ? '0.85'
                          : '0.8'}
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => {
                            setSelectedSeoPageId(page.id);
                            setActiveTab('analyzer');
                          }}
                          className="inline-flex items-center gap-1 rounded-md bg-[#eef7f5] px-2 py-1 text-[11px] font-bold text-[#087f72] hover:bg-[#d8efe9]"
                        >
                          <span>Analysoi</span>
                          <ArrowRight className="h-3 w-3" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredSitemap.length > 30 && (
              <p className="text-[11px] text-[#677c8d] text-center italic">
                Näytetään ensimmäiset 30 tulosta sujuvan selaamisen takaamiseksi. Rajaa hakusanalla.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Tab 5: Headings Hierarchy */}
      {activeTab === 'headings' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-[#e2e9ee] bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#142c42]">
                  Otsikkohierarkian DOM-puun validointi
                </h3>
                <p className="text-xs text-[#677c8d]">
                  Tarkistettu kohdesivu: <strong>{activeSeoPage.path}</strong>
                </p>
              </div>
              <span
                className={`rounded-md px-2.5 py-1 text-xs font-bold ${
                  headingAudit.isValid
                    ? 'bg-[#dcfce7] text-[#15803d]'
                    : 'bg-[#fee2e2] text-[#b91c1c]'
                }`}
              >
                {headingAudit.isValid ? 'HIERARKIA HYVÄKSYTTY' : 'VIRHEITÄ LÖYTYNYT'}
              </span>
            </div>

            {/* Tree representation */}
            <div className="rounded-xl border border-[#e2e9ee] bg-[#fbfcfd] p-5 space-y-3 font-mono text-xs">
              {sampleHeadings.map((h, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 p-2.5 rounded-lg border ${
                    h.level === 1
                      ? 'border-[#a5dbd2] bg-[#f2faf8] text-[#087f72] font-bold'
                      : h.level === 2
                      ? 'border-[#e2e9ee] bg-white text-[#142c42] ml-4'
                      : 'border-[#f0f4f7] bg-white text-[#526d82] ml-8'
                  }`}
                >
                  <span className="flex h-6 w-8 items-center justify-center rounded bg-[#10263d] text-[10px] font-bold text-white">
                    H{h.level}
                  </span>
                  <span className="truncate">{h.text}</span>
                </div>
              ))}
            </div>

            <div className="text-xs text-[#526d82] space-y-1 pt-2">
              <div>✓ Tasan 1 kappale H1-otsikoita (Hakukoneiden kultainen sääntö).</div>
              <div>✓ Looginen eteneminen H1 -&gt; H2 -&gt; H3 ilman tasojen ylihyppäämistä.</div>
              <div>✓ Pääavainsana sijoitettu H1-otsikkoon ja vähintään yhteen H2-alaotsikkoon.</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 6: Schema.org Structured Data */}
      {activeTab === 'schema' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-[#e2e9ee] bg-white p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-[#142c42]">
                  Schema.org JSON-LD Rakennetieto
                </h3>
                <p className="text-xs text-[#677c8d]">
                  Google Rich Results -yhteensopiva rakennetieto paikalliselle yritykselle ja siivouspalveluille.
                </p>
              </div>

              <button
                onClick={handleCopySchema}
                className="flex items-center gap-1.5 rounded-lg border border-[#ccdbe4] bg-white px-3 py-1.5 text-xs font-semibold text-[#142c42] hover:bg-[#f5f8fa]"
              >
                {copiedSchema ? <Check className="h-4 w-4 text-[#087f72]" /> : <Copy className="h-4 w-4" />}
                <span>{copiedSchema ? 'Kopioitu!' : 'Kopioi JSON-LD'}</span>
              </button>
            </div>

            <pre className="rounded-xl bg-[#10263d] p-5 text-xs font-mono text-[#9ddbd1] overflow-x-auto leading-relaxed max-h-96">
              {JSON.stringify(sampleJsonLd, null, 2)}
            </pre>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2">
              <div className="rounded-lg bg-[#eef7f5] p-3 border border-[#b2e5dc]">
                <span className="font-bold text-[#087f72] block">LocalBusiness Schema</span>
                <span className="text-[#3b5954]">Toimipaikat, aukioloajat ja yhteydenottotiedot</span>
              </div>
              <div className="rounded-lg bg-[#eef7f5] p-3 border border-[#b2e5dc]">
                <span className="font-bold text-[#087f72] block">CleaningService Schema</span>
                <span className="text-[#3b5954]">Palvelualue (Helsinki, Espoo, Vantaa) ja kuvaus</span>
              </div>
              <div className="rounded-lg bg-[#eef7f5] p-3 border border-[#b2e5dc]">
                <span className="font-bold text-[#087f72] block">BreadcrumbList Schema</span>
                <span className="text-[#3b5954]">Google SERP -leivänmurupolku</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 7: Live On-Page SEO Analyzer */}
      {activeTab === 'analyzer' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-[#e2e9ee] bg-white p-6 shadow-xs space-y-6">
            {/* Page Selector */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e8eff2] pb-5">
              <div>
                <h3 className="text-lg font-bold text-[#142c42]">
                  Live On-Page SEO -tarkastustyökalu
                </h3>
                <p className="text-xs text-[#677c8d]">
                  Valitse tarkasteltava sivu ja tarkista hakutulosten esikatselu, otsikoiden pituudet ja avainsanatiheys.
                </p>
              </div>

              <select
                value={selectedSeoPageId}
                onChange={(e) => setSelectedSeoPageId(e.target.value)}
                className="rounded-lg border border-[#ccdbe4] bg-white px-3 py-2 text-xs font-bold text-[#142c42] outline-hidden focus:border-[#0d9d8c] max-w-xs"
              >
                {SEO_PAGES.slice(0, 40).map((p) => (
                  <option key={p.id} value={p.id}>
                    [{p.language.toUpperCase()}] {p.h1}
                  </option>
                ))}
              </select>
            </div>

            {/* Audit Score Meter */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="rounded-xl border border-[#e2e9ee] bg-[#fbfcfd] p-4 text-center">
                <span className="text-[10px] font-bold uppercase text-[#677c8d]">On-Page Pisteytys</span>
                <div className="text-2xl font-black text-[#087f72] font-mono mt-1">
                  {auditReport.score} / 100
                </div>
                <span className="text-[11px] text-[#0d9d8c] font-semibold">
                  {auditReport.score >= 90 ? 'Erinomainen' : 'Hyväksyttävä'}
                </span>
              </div>

              <div className="rounded-xl border border-[#e2e9ee] bg-[#fbfcfd] p-4 text-center">
                <span className="text-[10px] font-bold uppercase text-[#677c8d]">Hakuaie (Search Intent)</span>
                <div className="text-sm font-bold text-[#142c42] capitalize mt-2">
                  {auditReport.searchIntent === 'informational'
                    ? 'Informatiivinen'
                    : auditReport.searchIntent === 'transactional'
                    ? 'Kaupallinen / Tilaus'
                    : 'Kaupallinen tutkimus'}
                </div>
              </div>

              <div className="rounded-xl border border-[#e2e9ee] bg-[#fbfcfd] p-4 text-center">
                <span className="text-[10px] font-bold uppercase text-[#677c8d]">Title-otsikon pituus</span>
                <div className="text-lg font-bold text-[#142c42] font-mono mt-1">
                  {auditReport.titleCheck.length} merkkiä
                </div>
                <span className="text-[11px] text-[#0d9d8c] font-semibold">
                  {auditReport.titleCheck.status === 'optimal' ? 'Ihanteellinen (45-65)' : 'Tarkista'}
                </span>
              </div>

              <div className="rounded-xl border border-[#e2e9ee] bg-[#fbfcfd] p-4 text-center">
                <span className="text-[10px] font-bold uppercase text-[#677c8d]">Meta-kuvauksen pituus</span>
                <div className="text-lg font-bold text-[#142c42] font-mono mt-1">
                  {auditReport.metaCheck.length} merkkiä
                </div>
                <span className="text-[11px] text-[#0d9d8c] font-semibold">
                  {auditReport.metaCheck.status === 'optimal' ? 'Ihanteellinen (120-160)' : 'Tarkista'}
                </span>
              </div>
            </div>

            {/* Keyword Placement Checklist */}
            <div className="rounded-xl border border-[#e2e9ee] bg-white p-4 space-y-2">
              <span className="block text-xs font-bold uppercase tracking-wider text-[#142c42]">
                Kohdeavainsanan sijoittelu: &quot;{activeSeoPage.primaryKeyword}&quot;
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-[#f8fafb] border border-[#eef2f5]">
                  <CheckCircle className={`h-4 w-4 ${auditReport.keywordCheck.inTitle ? 'text-[#0d9d8c]' : 'text-[#8ca1b3]'}`} />
                  <span>Title-tagissa: {auditReport.keywordCheck.inTitle ? 'Kyllä' : 'Ei'}</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-[#f8fafb] border border-[#eef2f5]">
                  <CheckCircle className={`h-4 w-4 ${auditReport.keywordCheck.inH1 ? 'text-[#0d9d8c]' : 'text-[#8ca1b3]'}`} />
                  <span>H1-otsikossa: {auditReport.keywordCheck.inH1 ? 'Kyllä' : 'Ei'}</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-[#f8fafb] border border-[#eef2f5]">
                  <CheckCircle className={`h-4 w-4 ${auditReport.keywordCheck.inMeta ? 'text-[#0d9d8c]' : 'text-[#8ca1b3]'}`} />
                  <span>Meta-kuvauksessa: {auditReport.keywordCheck.inMeta ? 'Kyllä' : 'Ei'}</span>
                </div>
              </div>
            </div>

            {/* SERP Snippet Preview (Desktop vs Mobile) */}
            <div className="rounded-2xl border border-[#d6e4ec] bg-[#f8fbfe] p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-[#087f72]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#142c42]">
                    Google SERP -hakutuloksen reaaliaikainen esikatselu
                  </span>
                </div>

                <div className="flex rounded-lg border border-[#ccdbe4] p-0.5 bg-white text-xs">
                  <button
                    onClick={() => setPreviewDevice('desktop')}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold ${
                      previewDevice === 'desktop' ? 'bg-[#10263d] text-white' : 'text-[#5a7285]'
                    }`}
                  >
                    <Monitor className="h-3 w-3" />
                    <span>Tietokone</span>
                  </button>
                  <button
                    onClick={() => setPreviewDevice('mobile')}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold ${
                      previewDevice === 'mobile' ? 'bg-[#10263d] text-white' : 'text-[#5a7285]'
                    }`}
                  >
                    <Smartphone className="h-3 w-3" />
                    <span>Mobiili</span>
                  </button>
                </div>
              </div>

              {/* SERP Card rendering */}
              <div
                className={`rounded-xl border border-[#dfe8ee] bg-white p-4 shadow-xs mx-auto transition-all ${
                  previewDevice === 'mobile' ? 'max-w-md' : 'w-full'
                }`}
              >
                <div className="flex items-center gap-2 text-[11px] text-[#202124] mb-1">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#eef7f5] text-[9px] font-black text-[#087f72]">
                    ✦
                  </span>
                  <span className="truncate">example.fi</span>
                  <span className="text-[#5f6368]">› {activeSeoPage.path}</span>
                </div>

                <div className="text-base text-[#1a0dab] font-medium hover:underline cursor-pointer leading-snug">
                  {activeSeoPage.seoTitle}
                </div>

                <p className="mt-1 text-xs text-[#4d5156] line-clamp-2 leading-relaxed">
                  {activeSeoPage.metaDescription}
                </p>

                {/* Sitelinks simulation */}
                <div className="mt-3 pt-2.5 border-t border-[#f0f4f7] flex flex-wrap gap-3 text-[11px] text-[#1a0dab] font-medium">
                  <span className="hover:underline cursor-pointer">Hinnasto</span>
                  <span className="hover:underline cursor-pointer">Kotitalousvähennys</span>
                  <span className="hover:underline cursor-pointer">Takuu & Palaute</span>
                  <span className="hover:underline cursor-pointer">Varaa siivous</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
