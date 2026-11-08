import React, { useState, useMemo } from 'react';
import { Language, SERVICES, CITIES, GUIDES } from '../data/content';
import { TRANSLATIONS } from '../data/translations';
import { X, Search, Filter, Globe, ExternalLink, Check } from 'lucide-react';

interface AllPagesModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  onSelectLanguage: (lang: Language) => void;
  onSelectRoute: (section: string, serviceId?: string, cityId?: string) => void;
}

interface PageEntry {
  lang: Language;
  type: string;
  typeLabel: string;
  title: string;
  path: string;
  keywords: string;
  section: string;
  serviceId?: string;
  cityId?: string;
}

export const AllPagesModal: React.FC<AllPagesModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  onSelectLanguage,
  onSelectRoute,
}) => {
  const [selectedLang, setSelectedLang] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Generate all 333 indexed pages data
  const allPages = useMemo(() => {
    const list: PageEntry[] = [];
    const langs: Language[] = ['fi', 'sv', 'en'];

    for (const l of langs) {
      const t = TRANSLATIONS[l];

      // 1. Core pages (16 core per language = 48)
      list.push(
        { lang: l, type: 'core', typeLabel: 'Etusivu / Home', title: `${t.brand} — ${t.hero.pill1}`, path: `/${l}/`, keywords: 'siivouspalvelut helsinki espoo vantaa', section: 'home' },
        { lang: l, type: 'core', typeLabel: 'Palvelut / Services', title: t.services.title, path: `/${l}/palvelut/`, keywords: 'siivouspalvelut koti yritys', section: 'services' },
        { lang: l, type: 'core', typeLabel: 'Alueet / Areas', title: 'Toimialueet — Helsinki, Espoo & Vantaa', path: `/${l}/alueet/`, keywords: 'toimialueet helsinki espoo vantaa', section: 'areas' },
        { lang: l, type: 'core', typeLabel: 'Hinnasto / Pricing', title: t.pricing.title, path: `/${l}/hinnasto/`, keywords: 'siivouksen hinta tuntihinta kiinteä hinta', section: 'pricing' },
        { lang: l, type: 'core', typeLabel: 'Laskuri / Calculator', title: t.calculator.title, path: `/${l}/hintalaskuri/`, keywords: 'hintalaskuri siivous laskuri', section: 'calculator' },
        { lang: l, type: 'core', typeLabel: 'Varaus / Booking', title: t.booking.title, path: `/${l}/varaa-siivous/`, keywords: 'varaa siivous booking helsinki', section: 'booking' },
        { lang: l, type: 'core', typeLabel: 'Vertailu / Compare', title: t.compare.title, path: `/${l}/hintavertailu/`, keywords: 'hintavertailu freska puhda novah kotileena sol', section: 'compare' },
        { lang: l, type: 'core', typeLabel: 'Miksi me / Why us', title: t.why.title, path: `/${l}/miksi-me/`, keywords: 'miksi valita siisti360 laatu luotettavuus', section: 'why' },
        { lang: l, type: 'core', typeLabel: 'Palaute / Reviews', title: t.reviews.title, path: `/${l}/asiakaskokemukset/`, keywords: 'asiakaskokemukset arvostelut palaute', section: 'reviews' },
        { lang: l, type: 'core', typeLabel: 'Tarina / Story', title: t.story.title, path: `/${l}/tarinamme/`, keywords: 'meidän tarinamme siisti360 tausta arvot', section: 'story' },
        { lang: l, type: 'core', typeLabel: 'Oppaat / Guides', title: 'Siivousoppaat ja käytännön vinkit', path: `/${l}/blogi/`, keywords: 'siivousoppaat muuttosiivous kotisiivous', section: 'guides' },
        { lang: l, type: 'core', typeLabel: 'FAQ / UKK', title: t.faq.title, path: `/${l}/ukk/`, keywords: 'usein kysytyt kysymykset vastaukset', section: 'faq' },
        { lang: l, type: 'core', typeLabel: 'Tarjous / Quote', title: t.quoteForm.title, path: `/${l}/pyyda-tarjous/`, keywords: 'pyydä tarjous ilmainen tarjouspyyntö', section: 'quote' },
        { lang: l, type: 'core', typeLabel: 'Yhteystiedot / Contact', title: 'Ota yhteyttä Siisti360', path: `/${l}/yhteystiedot/`, keywords: 'asiakaspalvelu puhelin sähköposti', section: 'contact' },
        { lang: l, type: 'core', typeLabel: 'Meistä / About', title: 'Tietoa Siisti360-siivouspalvelusta', path: `/${l}/meista/`, keywords: 'meistä yritys pääkaupunkiseutu', section: 'about' },
        { lang: l, type: 'core', typeLabel: 'Tietosuoja / Privacy', title: 'Tietosuojaseloste ja GDPR', path: `/${l}/tietosuoja/`, keywords: 'tietosuoja rekisteriseloste gdpr', section: 'privacy' },
      );

      // 2. City Hub Pages (3 per lang = 9)
      for (const city of CITIES) {
        list.push({
          lang: l,
          type: 'city',
          typeLabel: 'Kaupunki / City Hub',
          title: `Siivouspalvelut ${city.names[l]}`,
          path: `/${l}/alueet/${city.slugs[l]}/`,
          keywords: `siivouspalvelut ${city.names[l].toLowerCase()} kotisiivous toimistosiivous`,
          section: 'areas',
          cityId: city.id,
        });
      }

      // 3. Service Primary Pages (22 per lang = 66)
      for (const s of SERVICES) {
        list.push({
          lang: l,
          type: 'service',
          typeLabel: 'Palvelusivu / Service',
          title: `${s.names[l]} — Helsinki, Espoo & Vantaa`,
          path: `/${l}/palvelut/${s.slugs[l]}/`,
          keywords: `${s.names[l].toLowerCase()} ${s.category}`,
          section: 'services',
          serviceId: s.id,
        });

        // 4. City + Service Pages (22 services * 3 cities = 66 per lang = 198)
        for (const city of CITIES) {
          list.push({
            lang: l,
            type: 'cityService',
            typeLabel: 'Palvelu kaupungissa / City Service',
            title: `${s.names[l]} ${city.names[l]}`,
            path: `/${l}/palvelut/${s.slugs[l]}/${city.slugs[l]}/`,
            keywords: `${s.names[l].toLowerCase()} ${city.names[l].toLowerCase()}`,
            section: 'services',
            serviceId: s.id,
            cityId: city.id,
          });
        }
      }

      // 5. Educational Guides (4 per lang = 12)
      for (const g of GUIDES) {
        list.push({
          lang: l,
          type: 'guide',
          typeLabel: 'Opas / Guide',
          title: g.titles[l],
          path: `/${l}/blogi/${g.slugs[l]}/`,
          keywords: g.titles[l].toLowerCase(),
          section: 'guides',
        });
      }
    }

    return list;
  }, []);

  const filteredPages = useMemo(() => {
    return allPages.filter((page) => {
      const matchLang = selectedLang === 'all' || page.lang === selectedLang;
      const matchType = selectedType === 'all' || page.type === selectedType;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        page.title.toLowerCase().includes(q) ||
        page.path.toLowerCase().includes(q) ||
        page.keywords.toLowerCase().includes(q);

      return matchLang && matchType && matchSearch;
    });
  }, [allPages, selectedLang, selectedType, searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a1827]/80 p-3 md:p-6 backdrop-blur-xs">
      <div className="relative flex h-[90vh] w-full max-w-5xl flex-col rounded-2xl bg-white shadow-2xl border border-[#e2e9ee]">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#e2e9ee] p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e5f6f1] text-[#0d9d8c]">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#142c42]">
                {currentLang === 'fi'
                  ? 'Siisti360 — Kaikki 333 sivua (Sivustohakemisto)'
                  : currentLang === 'sv'
                  ? 'Siisti360 — Alla 333 sidor (Webbplatskatalog)'
                  : 'Siisti360 — All 333 Indexed Pages (Site Directory)'}
              </h2>
              <p className="text-xs text-[#677c8d]">
                111 Suomi (FI) · 111 Svenska (SV) · 111 English (EN)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-[#8ba7b8] hover:bg-[#f5f8fa] hover:text-[#142c42]"
            aria-label={currentLang === 'fi' ? 'Sulje' : currentLang === 'sv' ? 'Stäng' : 'Close'}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Filter Toolbar */}
        <div className="border-b border-[#e2e9ee] bg-[#f8fafb] p-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-12">
            {/* Search */}
            <div className="relative sm:col-span-6">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8ba7b8]" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  currentLang === 'fi'
                    ? 'Etsi sivua, palvelua tai kaupunkia (esim. kotisiivous espoo)...'
                    : currentLang === 'sv'
                    ? 'Sök sida, tjänst eller stad (t.ex. hemstädning esbo)...'
                    : 'Search page, service or city (e.g. home cleaning espoo)...'
                }
                className="w-full rounded-xl border border-[#ccd9e0] bg-white py-2 pl-10 pr-4 text-xs text-[#142c42] focus:border-[#0d9d8c] focus:outline-hidden"
              />
            </div>

            {/* Language filter */}
            <div className="sm:col-span-3">
              <select
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value)}
                className="w-full rounded-xl border border-[#ccd9e0] bg-white p-2 text-xs font-semibold text-[#142c42]"
              >
                <option value="all">
                  {currentLang === 'fi'
                    ? 'Kaikki kielet'
                    : currentLang === 'sv'
                    ? 'Alla språk'
                    : 'All languages'}
                </option>
                <option value="fi">Suomi (111 sivua)</option>
                <option value="sv">Svenska (111 sidor)</option>
                <option value="en">English (111 pages)</option>
              </select>
            </div>

            {/* Type filter */}
            <div className="sm:col-span-3">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full rounded-xl border border-[#ccd9e0] bg-white p-2 text-xs font-semibold text-[#142c42]"
              >
                <option value="all">
                  {currentLang === 'fi'
                    ? 'Kaikki sivutyypit'
                    : currentLang === 'sv'
                    ? 'Alla sidtyper'
                    : 'All page types'}
                </option>
                <option value="cityService">
                  {currentLang === 'fi'
                    ? 'Palvelu kaupungissa (198)'
                    : currentLang === 'sv'
                    ? 'Tjänst i stad (198)'
                    : 'City Service (198)'}
                </option>
                <option value="service">
                  {currentLang === 'fi'
                    ? 'Pääpalvelut (66)'
                    : currentLang === 'sv'
                    ? 'Huvudtjänster (66)'
                    : 'Main Services (66)'}
                </option>
                <option value="core">
                  {currentLang === 'fi'
                    ? 'Pääsivut (48)'
                    : currentLang === 'sv'
                    ? 'Huvudsidor (48)'
                    : 'Core Pages (48)'}
                </option>
                <option value="city">
                  {currentLang === 'fi'
                    ? 'Kaupunkisivut (9)'
                    : currentLang === 'sv'
                    ? 'Stadssidor (9)'
                    : 'City Hubs (9)'}
                </option>
                <option value="guide">
                  {currentLang === 'fi'
                    ? 'Oppaat (12)'
                    : currentLang === 'sv'
                    ? 'Guider (12)'
                    : 'Guides (12)'}
                </option>
              </select>
            </div>
          </div>

          <div className="mt-2.5 flex items-center justify-between text-xs text-[#526a7d]">
            <span>
              {currentLang === 'fi'
                ? `Näytetään ${filteredPages.length} / ${allPages.length} sivua`
                : currentLang === 'sv'
                ? `Visar ${filteredPages.length} / ${allPages.length} sidor`
                : `Showing ${filteredPages.length} / ${allPages.length} pages`}
            </span>
            <span className="text-[11px] text-[#0d9d8c] font-medium">
              {currentLang === 'fi'
                ? 'Kaikki URL-reitit indeksoitu ja valmiina tuotantoon'
                : currentLang === 'sv'
                ? 'Alla URL-rutter indexerade och redo för produktion'
                : 'All URL routes indexed and ready for production'}
            </span>
          </div>
        </div>

        {/* Scrollable Cards Grid */}
        <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-3">
            {filteredPages.map((page, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-xl border border-[#e2e9ee] bg-white p-3.5 shadow-2xs hover:border-[#a5dbd2] hover:bg-[#fbfdfc] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#087f72]">
                    <span>
                      {page.lang.toUpperCase()} · {page.typeLabel}
                    </span>
                    <span className="rounded bg-[#f0f4f7] px-1.5 py-0.5 text-[#526a7d] font-mono">
                      {page.lang}
                    </span>
                  </div>

                  <h4 className="mt-1.5 text-xs font-bold text-[#142c42] leading-snug line-clamp-1">
                    {page.title}
                  </h4>

                  <code className="mt-1 block font-mono text-[10px] text-[#718c9f] truncate">
                    {page.path}
                  </code>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onSelectLanguage(page.lang);
                    onSelectRoute(page.section, page.serviceId, page.cityId);
                    onClose();
                  }}
                  className="mt-3 flex items-center justify-between border-t border-[#f0f4f7] pt-2 text-[11px] font-bold text-[#0d9d8c] hover:text-[#065e54] cursor-pointer"
                >
                  <span>
                    {currentLang === 'fi'
                      ? 'Avaa tämä sivu'
                      : currentLang === 'sv'
                      ? 'Öppna denna sida'
                      : 'Open this page'}
                  </span>
                  <ExternalLink className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
