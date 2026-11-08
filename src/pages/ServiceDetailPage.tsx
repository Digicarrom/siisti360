import React, { useState, useEffect } from 'react';
import { Language, ServiceInfo, CITIES, SERVICES } from '../data/content';
import { TRANSLATIONS } from '../data/translations';
import { VisualBanner } from '../components/VisualBanner';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { BreadcrumbItem } from '../utils/urlHierarchy';
import {
  CheckCircle,
  Clock,
  ShieldCheck,
  Calendar,
  ArrowRight,
  MapPin,
  Sparkles,
  HelpCircle,
  Send,
  Building,
  Check,
  Star,
  ChevronDown,
} from 'lucide-react';
import { NeighborhoodInfo, NEIGHBORHOODS } from '../data/locations';
import { ActiveLocationBar } from '../components/ActiveLocationBar';

interface ServiceDetailPageProps {
  service: ServiceInfo;
  currentLang: Language;
  selectedCityId?: string;
  selectedNeighborhood?: NeighborhoodInfo | null;
  selectedPostalCode?: string;
  breadcrumbs?: BreadcrumbItem[];
  onNavigateUrl?: (url: string) => void;
  onBack: () => void;
  onBookNow: (serviceId: string, cityId?: string, neighborhoodId?: string) => void;
  onRequestQuote: (serviceId: string, cityId?: string, postalCode?: string) => void;
  onSelectCity: (cityId: string) => void;
  onSelectNeighborhood?: (neighborhood: NeighborhoodInfo, postalCode?: string) => void;
  onOpenLocationSearch?: () => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  service,
  currentLang,
  selectedCityId,
  selectedNeighborhood,
  selectedPostalCode,
  breadcrumbs,
  onNavigateUrl,
  onBack,
  onBookNow,
  onRequestQuote,
  onSelectCity,
  onSelectNeighborhood,
  onOpenLocationSearch,
}) => {
  const t = TRANSLATIONS[currentLang];
  const isHome = service.category === 'home';

  // Active city (if any) or neighborhood city
  const activeCityId = selectedNeighborhood ? selectedNeighborhood.cityId : selectedCityId;
  const activeCity = CITIES.find((c) => c.id === activeCityId);
  const activePostal = selectedPostalCode || selectedNeighborhood?.postalCodes[0];

  // Specific city name
  const cityName = activeCity ? activeCity.names[currentLang] : null;
  const neighName = selectedNeighborhood ? selectedNeighborhood.names[currentLang] : null;

  // Local quick quote form state
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadPostal, setLeadPostal] = useState(activePostal || '');
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  // Relevant high-res image based on service type
  const serviceImage =
    service.id === 'kylpyhuoneen-siivous' || service.id === 'suursiivous'
      ? '/src/assets/images/bathroom_deepclean_1794054888257.jpg'
      : service.id === 'sohvan-puhdistus' || service.id === 'matonpesu'
      ? '/src/assets/images/sofa_cleaning_pro_1794054907523.jpg'
      : service.category === 'business'
      ? '/src/assets/images/office_cleaning_pro_1794054920944.jpg'
      : '/src/assets/images/ruoholahti_cleaning_1794054875174.jpg';

  // Compute targeted H1, SEO Title, and Description
  const pageH1 = selectedNeighborhood && cityName
    ? currentLang === 'fi'
      ? `Ammattitaitoinen ${service.names.fi.toLowerCase()} alueella ${neighName}, ${cityName}`
      : currentLang === 'sv'
      ? `Professionell ${service.names.sv.toLowerCase()} i ${neighName}, ${cityName}`
      : `Professional ${service.names.en} in ${neighName}, ${cityName}`
    : cityName
    ? currentLang === 'fi'
      ? `${service.names.fi} ${cityName} — Ammattitaitoinen puhtauspalvelu`
      : `${service.names[currentLang]} in ${cityName}`
    : `${service.names[currentLang]} — Helsinki, Espoo & Vantaa`;

  const pageSeoTitle = selectedNeighborhood && cityName
    ? currentLang === 'fi'
      ? `${service.names.fi} ${neighName}, ${cityName} | Ammattitaitoinen Siivouspalvelu`
      : currentLang === 'sv'
      ? `${service.names.sv} i ${neighName}, ${cityName} | Professionell Städning`
      : `${service.names.en} in ${neighName}, ${cityName} | Professional Cleaning`
    : cityName
    ? `${service.names[currentLang]} ${cityName} | Siisti360`
    : `${service.names[currentLang]} – Helsinki, Espoo ja Vantaa | Siisti360`;

  const pageMetaDesc = selectedNeighborhood && cityName
    ? currentLang === 'fi'
      ? `Löydä ammattitaitoinen ${service.names.fi.toLowerCase()} alueella ${neighName}, ${cityName}. Tutustu siivousvaihtoehtoihin, laske hinta ja varaa vaivattomasti.`
      : `Discover professional ${service.names.en.toLowerCase()} services in ${neighName}, ${cityName}. Explore available cleaning options, request a quote, and book a cleaning service.`
    : `${service.desc[currentLang]} Saatavilla pääkaupunkiseudulla. Kotitalousvähennys 60%.`;

  // Sync document head and LocalBusiness/CleaningService JSON-LD
  useEffect(() => {
    document.title = pageSeoTitle;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', pageMetaDesc);
    }

    // Canonical link
    const pathPart = selectedNeighborhood && cityName
      ? `/services/${service.slugs.en}/${activeCityId}/${selectedNeighborhood.slug}/`
      : activeCityId
      ? `/services/${service.slugs.en}/${activeCityId}/`
      : `/services/${service.slugs.en}/`;

    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', `https://example.fi${pathPart}`);
    }

    // Inject Service + LocalBusiness Schema
    const scriptId = 'schema-service-detail-jsonld';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'LocalBusiness',
          '@id': 'https://example.fi/#localbusiness',
          name: 'Siisti360',
          url: 'https://example.fi/',
          telephone: '+358 40 123 4567',
          priceRange: '€€',
          areaServed: {
            '@type': 'Place',
            name: selectedNeighborhood ? `${neighName}, ${cityName}` : cityName || 'Helsinki, Espoo, Vantaa',
          },
        },
        {
          '@type': 'Service',
          '@id': `https://example.fi${pathPart}#service`,
          serviceType: service.names[currentLang],
          name: pageH1,
          description: pageMetaDesc,
          provider: { '@id': 'https://example.fi/#localbusiness' },
          areaServed: {
            '@type': 'AdministrativeArea',
            name: selectedNeighborhood ? `${neighName}, ${cityName}` : cityName || 'Capital Region',
          },
          offers: {
            '@type': 'Offer',
            price: isHome ? '43.00' : '46.00',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
          },
        },
      ],
    };

    script.textContent = JSON.stringify(structuredData);

    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [service, activeCityId, selectedNeighborhood, currentLang, pageH1, pageSeoTitle, pageMetaDesc]);

  const handleQuickLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadPhone) return;
    setLeadSubmitted(true);
  };

  // Nearby areas in same city or capital region
  const nearbyAreas: NeighborhoodInfo[] = selectedNeighborhood
    ? selectedNeighborhood.nearbyAreaIds
        .map((id) => NEIGHBORHOODS[id])
        .filter(Boolean)
    : Object.values(NEIGHBORHOODS)
        .filter((n) => !activeCityId || n.cityId === activeCityId)
        .slice(0, 4);

  // Other related services for internal cross-linking
  const otherServices = SERVICES.filter((s) => s.id !== service.id).slice(0, 4);

  // Checklists with full Swedish and English support
  const checklistSections = isHome
    ? currentLang === 'sv'
      ? [
          {
            title: 'Kök och matplats',
            tasks: [
              'Desinficerande rengöring och avkalkning av bänkskivor, diskho och blandare',
              'Avtorkning av spis, ugnsglas och mikrovågsugn in- och utvändigt',
              'Fettborttagning från skåpluckor, handtag och vitvarors frontytor',
              'Tömning av soppåse och hygienisk rengöring av sopsorteringsskåp',
              'Grundlig dammsugning och fukttorkning av golv',
            ],
          },
          {
            title: 'Badrum och sanitetsutrymmen',
            tasks: [
              'Rengöring och desinficering av toalettstol, handfat och bidédusch',
              'Avkalkning av duschväggar, kranar och kakelytor',
              'Putsning av speglar, glaspartier och belysningskåpor utan ränder',
              'Rengöring av golvbrunnssil och desinficerande golvtvätt',
            ],
          },
          {
            title: 'Vardagsrum och sovrum',
            tasks: [
              'Dammavtorkning av alla fria bänkytor och hyllor',
              'Avtorkning av dörrar, karmar, strömbrytare och handtag',
              'Effektiv dammsugning av golv och mattor med HEPA-filter',
              'Fukttorkning av golv med mikrofibermopp anpassad för materialet',
            ],
          },
        ]
      : currentLang === 'en'
      ? [
          {
            title: 'Kitchen and Dining Area',
            tasks: [
              'Sanitizing and descaling countertops, sinks, and faucets',
              'Wiping stovetop, oven door, and microwave inside and out',
              'Degreasing cabinet doors, handles, and appliance surfaces',
              'Emptying bins and hygienically cleaning waste cabinet',
              'Thorough HEPA vacuuming and damp mopping of floors',
            ],
          },
          {
            title: 'Bathroom and Sanitary Areas',
            tasks: [
              'Scrubbing and disinfecting toilet bowl, washbasin, and bidet spray',
              'Removing limescale from shower screens, taps, and wall tiles',
              'Streak-free polishing of mirrors, glass, and light covers',
              'Cleaning floor drain cover and sanitizing floor wash',
            ],
          },
          {
            title: 'Living Room and Bedrooms',
            tasks: [
              'Damp dusting all free horizontal surfaces and shelves',
              'Wiping doors, frames, light switches, and door handles',
              'High-efficiency HEPA vacuuming of floors and carpets',
              'Material-appropriate microfiber damp mopping of hard floors',
            ],
          },
        ]
      : [
          {
            title: 'Keittiö ja ruokailutila',
            tasks: [
              'Työtasojen, tiskialtaan ja hanan desinfioiva puhdistus ja kalkinpoisto',
              'Lieden, uuninluukun ja mikroaaltouunin pyyhintä sisältä ja ulkoa',
              'Kaappien ovien, vetimien ja kodinkoneiden etupintojen rasvanpoisto',
              'Roska-astian tyhjennys ja jätekaapin hygieeninen puhdistus',
              'Lattian perusteellinen imurointi ja kosteapyyhintä',
            ],
          },
          {
            title: 'Kylpyhuone ja saniteettitilat',
            tasks: [
              'WC-istuimen, lavuaarin ja bideesuihkun pesu ja desinfiointi',
              'Suihkuseinien, hanojen ja laattapintojen kalkkisaostumien poisto',
              'Peilien, lasipintojen ja valaisinkansien kiillotus raidattomaksi',
              'Lattiakaivon kannen puhdistus ja lattian desinfioiva pesu',
            ],
          },
          {
            title: 'Olohuone ja makuuhuoneet',
            tasks: [
              'Kaikkien vapaiden tasopintojen ja hyllyjen nihkeäpyyhintä',
              'Ovien, ovenpielien, valokatkaisijoiden ja vetimien pyyhintä',
              'Lattioiden ja mattojen HEPA-suodatettu tehokas imurointi',
              'Lattiamateriaaleille sopiva kosteapyyhintä mikrokuitumopilla',
            ],
          },
        ]
    : currentLang === 'sv'
    ? [
        {
          title: 'Arbetsytor och mötesrum',
          tasks: [
            'Avtorkning och desinficering av skrivbord och konferensbord',
            'Djuprengöring av beröringsytor (handtag, strömbrytare, räcken)',
            'Tömning av papperskorgar och byte av soppåsar enligt återvinning',
            'Dammsugning och fläckborttagning på golv',
          ],
        },
        {
          title: 'Pausrum och pentry',
          tasks: [
            'Hygienisk rengöring av kaffemaskiner, diskho och bänkar',
            'Rengöring av mikrovågsugnar och kylskåpshandtag',
            'In- eller urplockning av diskmaskin vid behov',
            'Desinficerande fukttorkning av golv',
          ],
        },
      ]
    : currentLang === 'en'
    ? [
        {
          title: 'Workspaces and Meeting Rooms',
          tasks: [
            'Wiping and sanitizing desks and meeting tables',
            'Disinfecting high-touch surfaces (handles, switches, railings)',
            'Emptying trash bins and replacing liners for recycling',
            'Floor vacuuming and localized spot cleaning',
          ],
        },
        {
          title: 'Breakrooms and Kitchenette',
          tasks: [
            'Hygienic cleaning of coffee makers, sinks, and countertops',
            'Wiping microwave interiors and refrigerator handles',
            'Loading or unloading dishwasher as needed',
            'Sanitizing damp mop of breakroom floors',
          ],
        },
      ]
    : [
        {
          title: 'Työtilat ja neuvotteluhuoneet',
          tasks: [
            'Työpöytien ja kokouspöytien pyyhintä ja desinfiointi',
            'Kosketuspintojen (kahvat, kytkimet, kaiteet) tehopuhdistus',
            'Roskakorien tyhjennys ja pussien vaihto kierrätyksen mukaan',
            'Lattioiden imurointi ja tahranpoisto',
          ],
        },
        {
          title: 'Taukotilat ja keittiö',
          tasks: [
            'Kahvikoneiden, tiskialtaan ja työtasojen hygieniahoito',
            'Mikroaaltouunien ja jääkaapin kahvojen puhdistus',
            'Astianpesukoneen täyttö tai tyhjennys tarvittaessa',
            'Lattioiden hygieeninen desinfiointipyyhintä',
          ],
        },
      ];

  // Neighborhood-specific FAQs
  const localFaqs = selectedNeighborhood
    ? [
        {
          q:
            currentLang === 'fi'
              ? `Kuinka siivooja pääsee kohteeseen alueella ${neighName} (${activePostal})?`
              : currentLang === 'sv'
              ? `Hur får städaren tillgång till bostaden i ${neighName} (${activePostal})?`
              : `How does the cleaner access apartments in ${neighName} (${activePostal})?`,
          a:
            currentLang === 'fi'
              ? `Voit luovuttaa avaimen henkilökohtaisesti, sopia avaimen noudosta tai käyttää taloyhtiön lukkokaappia. Siivoojamme tuntevat alueen ${neighName} ovikoodikäytännöt ja kiinteistöt.`
              : currentLang === 'sv'
              ? `Du kan lämna nyckeln personligen, avtala om nyckelhämtning eller använda ett nyckelskåp. Våra städare känner till fastigheterna och dörrkoderna i ${neighName}.`
              : `You can hand over keys in person, arrange key pickup, or use a lockbox. Our cleaners are experienced with local access in ${neighName}.`,
        },
        {
          q:
            currentLang === 'fi'
              ? `Onko palveluun ${service.names.fi} saatavilla kotitalousvähennys alueella ${neighName}?`
              : currentLang === 'sv'
              ? `Gäller hushållsavdraget på 60% för ${service.names.sv} i ${neighName}?`
              : `Is the 60% Finnish tax deduction applicable for ${service.names.en} in ${neighName}?`,
          a:
            currentLang === 'fi'
              ? `Kyllä! Saat täyden 60 % kotitalousvähennyksen työn osuudesta suoraan verotukseen (omavastuu 150 €/vuosi). Tuntihintamme 43,00 € laskee verovähennyksen jälkeen vain 17,20 €/h tasolle.`
              : currentLang === 'sv'
              ? `Ja! Alla våra städtjänster berättigar till 60% hushållsavdrag. Timpriset 43,00 € blir efter skatteavdrag endast 17,20 €/h.`
              : `Yes! All domestic cleaning qualifies for the 60% kotitalousvähennys tax reduction, reducing the effective rate to just €17.20/h.`,
        },
        {
          q:
            currentLang === 'fi'
              ? `Tuoko Siisti360 omat siivousvälineet ja pesuaineet kohteeseen alueella ${neighName}?`
              : currentLang === 'sv'
              ? `Tar Siisti360 med sig egna städredskap och rengöringsmedel i ${neighName}?`
              : `Does Siisti360 bring professional cleaning supplies to ${neighName}?`,
          a:
            currentLang === 'fi'
              ? `Kyllä, tiimillämme on mukana ammattilaistason HEPA-imurit, mikrokuituliinat ja ekologiset Joutsenmerkityt pesuaineet. Asiakkaan ei tarvitse hankkia mitään etukäteen.`
              : currentLang === 'sv'
              ? `Ja, vi tar med all professionell utrustning såsom HEPA-dammsugare, mikrofiberdukar och miljömärkta rengöringsmedel.`
              : `Yes, we bring complete professional equipment including HEPA filtration vacuums and eco-certified detergents.`,
        },
        {
          q:
            currentLang === 'fi'
              ? `Kuinka nopeasti ${service.names.fi.toLowerCase()} voidaan aloittaa alueella ${neighName}?`
              : currentLang === 'sv'
              ? `Hur snabbt kan ${service.names.sv.toLowerCase()} påbörjas i ${neighName}?`
              : `How quickly can ${service.names.en.toLowerCase()} start in ${neighName}?`,
          a:
            currentLang === 'fi'
              ? `Meillä on vakituinen tiimi liikkeellä alueella ${neighName} joka arkipäivä. Voimme yleensä aloittaa 24–48 tunnin sisällä tilauksesta tai sopia sinulle parhaiten sopivan vakioajan.`
              : currentLang === 'sv'
              ? `Vi har städare i ${neighName} alla vardagar. Vi kan oftast starta inom 24–48 timmar.`
              : `We operate locally in ${neighName} daily and can typically start within 24–48 hours.`,
        },
      ]
    : [
        {
          q:
            currentLang === 'fi'
              ? 'Mitä siivousvälineitä asiakkaalla tulee olla?'
              : currentLang === 'sv'
              ? 'Vilken städutrustning behöver kunden tillhandahålla?'
              : 'What cleaning equipment does the customer need to provide?',
          a:
            currentLang === 'fi'
              ? 'Siisti360 tuo mukanaan kaikki tarvittavat ammattitason välineet, mikrokuituliinat ja ympäristöystävälliset puhdistusaineet. Asiakkaan tarvitsee vain varmistaa vapaa pääsy tilaan.'
              : currentLang === 'sv'
              ? 'Siisti360 har med sig all professionell utrustning, mikrofiberdukar och miljövänliga rengöringsmedel. Du behöver bara säkerställa tillträde till bostaden.'
              : 'Siisti360 brings all necessary professional equipment, microfiber cloths, and eco-certified detergents. You only need to ensure clear access.',
        },
        {
          q:
            currentLang === 'fi'
              ? 'Kuinka kotitalousvähennys toimii?'
              : currentLang === 'sv'
              ? 'Hur fungerar det finska hushållsavdraget?'
              : 'How does the Finnish household tax deduction work?',
          a:
            currentLang === 'fi'
              ? 'Kaikki kuluttajasiivouspalvelumme ovat 60% kotitalousvähennyskelpoisia. Lähetämme verovuoden alussa automaattisesti tarkan verottajalle sopivan yhteenvedon.'
              : currentLang === 'sv'
              ? 'Alla våra hemtjänster berättigar till 60% skatteavdrag. Vi skickar automatiskt ett färdigt skatteunderlag i början av skatteåret.'
              : 'All our residential services qualify for the 60% tax credit. We automatically send an official tax certificate at the end of the year.',
        },
      ];

  const handleNavigate = (url: string) => {
    if (onNavigateUrl) {
      onNavigateUrl(url);
    } else {
      window.location.hash = url.startsWith('#') ? url : `#${url}`;
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* 1. Dynamic Breadcrumb Navigation */}
      {breadcrumbs && breadcrumbs.length > 0 ? (
        <Breadcrumbs
          items={breadcrumbs}
          currentLang={currentLang}
          onNavigate={handleNavigate}
          onOpenLocationSearch={onOpenLocationSearch}
          activePostalCode={activePostal}
        />
      ) : (
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#677c8d]">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1 text-[#087f72] hover:underline"
          >
            <span>{t.nav.services}</span>
          </button>
          <span>/</span>
          <span className="text-[#142c42] font-bold">{service.names[currentLang]}</span>
          {cityName && (
            <>
              <span>/</span>
              <span className="rounded-md bg-[#e6f4f2] px-2 py-0.5 text-[#087f72] font-bold">
                {selectedNeighborhood ? `${neighName}, ${cityName}` : cityName}
              </span>
            </>
          )}
        </div>
      )}

      {/* Active Location & Proximity Bar */}
      <ActiveLocationBar
        currentLang={currentLang}
        selectedNeighborhood={selectedNeighborhood || null}
        selectedPostalCode={activePostal}
        onOpenLocationSearch={onOpenLocationSearch || (() => {})}
        onSelectNeighborhood={onSelectNeighborhood || (() => {})}
        currentServiceSlug={service.slugs.en}
        onNavigateUrl={handleNavigate}
      />

      {/* 2. Visual Header Banner */}
      <VisualBanner
        type={isHome ? 'home' : 'office'}
        headingTag="h1"
        badge={
          selectedNeighborhood && cityName
            ? `${currentLang === 'fi' ? 'PAIKALLINEN SIIVOUSPALVELU' : currentLang === 'sv' ? 'LOKAL STÄDTJÄNST' : 'LOCAL CLEANING SERVICE'} • ${neighName?.toUpperCase()} (${activePostal})`
            : cityName
            ? `${currentLang === 'fi' ? 'PAIKALLINEN SIIVOUSPALVELU' : currentLang === 'sv' ? 'LOKAL STÄDTJÄNST' : 'LOCAL CLEANING SERVICE'} • ${cityName.toUpperCase()}`
            : isHome
            ? currentLang === 'fi'
              ? 'KOTITALOUKSILLE • KOTITALOUSVÄHENNYS 60%'
              : currentLang === 'sv'
              ? 'FÖR HUSHÅLL • HUSHÅLLSAVDRAG 60%'
              : 'FOR HOUSEHOLDS • 60% TAX CREDIT'
            : currentLang === 'fi'
            ? 'YRITYKSILLE & KIINTEISTÖILLE'
            : currentLang === 'sv'
            ? 'FÖR FÖRETAG & FASTIGHETER'
            : 'FOR BUSINESSES & PROPERTIES'
        }
        title={pageH1}
      />

      {/* 3. Interactive Location & City Switcher Bar */}
      <div className="rounded-2xl border border-[#d8e6ee] bg-[#f8fbfe] p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-[#0d9d8c] shrink-0" />
          <span className="text-xs font-bold text-[#142c42]">
            {currentLang === 'fi'
              ? 'Valitse tai vaihda palvelualue:'
              : currentLang === 'sv'
              ? 'Välj eller ändra serviceområde:'
              : 'Select or change service area:'}
          </span>
          {selectedNeighborhood && (
            <span className="rounded-full bg-[#e5f6f1] px-2.5 py-0.5 text-[11px] font-bold text-[#087f72] border border-[#a2e4d8]">
              {neighName} ({activePostal})
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Quick city selection pills */}
          {CITIES.map((c) => {
            const isCitySelected = activeCityId === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  onSelectCity(c.id);
                  handleNavigate(`#/services/${service.slugs.en}/${c.id}`);
                }}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  isCitySelected && !selectedNeighborhood
                    ? 'bg-[#087f72] text-white shadow-xs'
                    : isCitySelected
                    ? 'bg-[#e5f6f1] border border-[#087f72] text-[#087f72]'
                    : 'bg-white border border-[#ccdbe4] text-[#30485d] hover:border-[#087f72] hover:bg-[#ebf7f5]'
                }`}
              >
                {c.names[currentLang]}
              </button>
            );
          })}

          {onOpenLocationSearch && (
            <button
              type="button"
              onClick={onOpenLocationSearch}
              className="rounded-lg bg-[#ff8d43] px-3 py-1.5 text-xs font-bold text-[#10263d] hover:bg-[#ff9b59] transition-all shadow-xs"
            >
              {currentLang === 'fi'
                ? 'Hae postinumerolla...'
                : currentLang === 'sv'
                ? 'Sök med postnummer...'
                : 'Search by postal code...'}
            </button>
          )}
        </div>
      </div>

      {/* 4. Main Grid: Details + High-Converting Lead Widget */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Description, Checklists & Local Details */}
        <div className="space-y-6 lg:col-span-8">
          <div className="rounded-2xl border border-[#e2e9ee] bg-white p-6 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-[#142c42]">
              {selectedNeighborhood
                ? currentLang === 'fi'
                  ? `Mitä ${service.names.fi.toLowerCase()} sisältää alueella ${neighName}?`
                  : currentLang === 'sv'
                  ? `Vad ingår i ${service.names.sv.toLowerCase()} i ${neighName}?`
                  : `What is included in ${service.names.en.toLowerCase()} in ${neighName}?`
                : cityName
                ? currentLang === 'fi'
                  ? `Mitä ${service.names.fi.toLowerCase()} sisältää kaupungissa ${cityName}?`
                  : currentLang === 'sv'
                  ? `Vad ingår i ${service.names.sv.toLowerCase()} i ${cityName}?`
                  : `What is included in ${service.names.en.toLowerCase()} in ${cityName}?`
                : currentLang === 'fi'
                ? `Mitä ${service.names.fi.toLowerCase()} sisältää?`
                : currentLang === 'sv'
                ? `Vad ingår i ${service.names.sv.toLowerCase()}?`
                : `What is included in ${service.names.en.toLowerCase()}?`}
            </h2>

            <p className="text-sm text-[#4c6275] leading-relaxed">
              {service.desc[currentLang]}{' '}
              {selectedNeighborhood
                ? currentLang === 'fi'
                  ? `Palvelemme joustavasti alueella ${neighName} (${activePostal}) ilman erillisiä matka- tai kilometrikuluja.`
                  : currentLang === 'sv'
                  ? `Vi betjänar bostäder och lokaler i ${neighName} (${activePostal}) utan extra resekostnader.`
                  : `We serve all residential and commercial properties across ${neighName} (${activePostal}) with no extra travel fees.`
                : cityName
                ? currentLang === 'fi'
                  ? `Palvelemme joustavasti koko ${cityName}n alueella ilman erillisiä matkakuluja.`
                  : currentLang === 'sv'
                  ? `Vi betjänar hela området i ${cityName} utan extra resekostnader.`
                  : `We serve the entire area of ${cityName} without extra travel fees.`
                : ''}{' '}
              {currentLang === 'fi'
                ? 'Siisti360 suorittaa jokaisen siivouskerran ennalta sovitun laatumuistilistan mukaisesti. Käytämme ammattitason HEPA-suodatettuja laitteita ja vähä-ärsyttäviä, ympäristöystävällisiä pesuaineita.'
                : currentLang === 'sv'
                ? 'Siisti360 utför varje städtillfälle enligt en överenskommen kvalitetschecklista. Vi använder professionella HEPA-dammsugare och miljövänliga rengöringsmedel.'
                : 'Siisti360 completes every cleaning visit according to an agreed quality checklist. We use professional HEPA-filtered equipment and eco-friendly detergents.'}
            </p>

            {/* Generated High-Fidelity Service Photo */}
            {serviceImage && (
              <div className="relative overflow-hidden rounded-xl border border-[#e2e9ee] shadow-xs">
                <img
                  src={serviceImage}
                  alt={`${service.names[currentLang]} ${neighName || cityName || ''}`}
                  className="h-56 sm:h-64 w-full object-cover"
                />
                <div className="absolute bottom-2 right-2 rounded-lg bg-black/60 backdrop-blur-xs px-2.5 py-1 text-[11px] font-bold text-white">
                  Siisti360 • {selectedNeighborhood ? `${neighName} (${activePostal})` : cityName || (currentLang === 'sv' ? 'Huvudstadsregionen' : currentLang === 'en' ? 'Capital Region' : 'Pääkaupunkiseutu')}
                </div>
              </div>
            )}

            {/* Neighborhood Special Promotion Badge */}
            {selectedNeighborhood && (
              <div className="rounded-xl bg-[#eef7f5] border border-[#a2e4d8] p-4 text-xs text-[#14534a] space-y-1.5">
                <div className="flex items-center justify-between">
                  <strong className="font-bold text-[#087f72] flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4" />
                    {selectedNeighborhood.specialOffer.title[currentLang]}:
                  </strong>
                  <span className="rounded bg-[#ff8d43] px-2 py-0.5 text-[11px] font-bold text-[#10263d] font-mono">
                    {selectedNeighborhood.specialOffer.code}
                  </span>
                </div>
                <p>{selectedNeighborhood.specialOffer.desc[currentLang]}</p>
              </div>
            )}

            {/* Neighborhood Context & Architecture Profile */}
            {selectedNeighborhood && (
              <div className="rounded-xl border border-[#e2e9ee] bg-[#fbfcfd] p-5 space-y-3">
                <div className="flex items-center gap-2 text-[#087f72]">
                  <Building className="h-4 w-4" />
                  <h3 className="text-sm font-bold text-[#142c42]">
                    {currentLang === 'fi'
                      ? `Paikallinen asiantuntemus alueella ${neighName}`
                      : currentLang === 'sv'
                      ? `Lokal expertis i ${neighName}`
                      : `Local Expertise in ${neighName}`}
                  </h3>
                </div>
                <p className="text-xs text-[#526a7d] leading-relaxed">
                  {selectedNeighborhood.localContext[currentLang]}
                </p>
                <p className="text-xs text-[#526a7d] leading-relaxed">
                  {selectedNeighborhood.architectureInfo[currentLang]}
                </p>
              </div>
            )}

            {/* Checklist Columns */}
            <div className="mt-6 space-y-4">
              <h3 className="text-sm font-bold text-[#142c42]">
                {currentLang === 'fi'
                  ? 'Tarkka siivouksen sisältö huoneittain:'
                  : currentLang === 'sv'
                  ? 'Noggrann städchecklista rum för rum:'
                  : 'Detailed room-by-room cleaning checklist:'}
              </h3>
              {checklistSections.map((sec, idx) => (
                <div key={idx} className="rounded-xl border border-[#f0f4f7] bg-[#fbfcfd] p-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#087f72]">
                    {sec.title}
                  </h4>
                  <ul className="mt-2.5 space-y-2 text-xs text-[#334e68]">
                    {sec.tasks.map((task, taskIdx) => (
                      <li key={taskIdx} className="flex items-start gap-2.5">
                        <CheckCircle className="h-4 w-4 shrink-0 text-[#0d9d8c] mt-0.5" />
                        <span className="leading-relaxed">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Location Customer Review */}
          {selectedNeighborhood?.localReview && (
            <div className="rounded-2xl border border-[#e2e9ee] bg-white p-6 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#087f72] uppercase tracking-wider">
                  {currentLang === 'fi' ? 'Aito asiakaskokemus alueelta' : 'Verified Local Customer Review'}
                </span>
                <span className="flex items-center gap-1 rounded bg-[#eef7f5] px-2 py-0.5 text-xs font-bold text-[#087f72] font-mono">
                  <Star className="h-3.5 w-3.5 fill-[#ff8d43] text-[#ff8d43]" />
                  {selectedNeighborhood.localReview.rating}.0 / 5.0
                </span>
              </div>
              <p className="text-sm text-[#273c4d] italic leading-relaxed">
                "{selectedNeighborhood.localReview.quote[currentLang]}"
              </p>
              <div className="text-xs text-[#677c8d]">
                <strong>{selectedNeighborhood.localReview.author}</strong> • {selectedNeighborhood.localReview.street} ({activePostal})
              </div>
            </div>
          )}

          {/* Localized FAQs */}
          <div className="rounded-2xl border border-[#e2e9ee] bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-[#087f72]">
              <HelpCircle className="h-5 w-5" />
              <h3 className="text-base font-bold text-[#142c42]">
                {selectedNeighborhood
                  ? currentLang === 'fi'
                    ? `Usein kysyttyä: ${service.names.fi} alueella ${neighName}`
                    : `FAQs: ${service.names.en} in ${neighName}`
                  : `Usein kysyttyä palvelusta ${service.names[currentLang]}`}
              </h3>
            </div>

            <div className="space-y-3">
              {localFaqs.map((faq, idx) => (
                <div key={idx} className="rounded-xl border border-[#f0f4f7] bg-[#fbfcfd] p-4 space-y-1.5">
                  <h4 className="text-xs font-bold text-[#142c42]">{faq.q}</h4>
                  <p className="text-xs text-[#526a7d] leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contextual Internal Links: Nearby Service Areas */}
          {selectedNeighborhood && (
            <div className="rounded-2xl border border-[#e2e9ee] bg-white p-6 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-[#142c42]">
                {currentLang === 'fi'
                  ? `${service.names.fi} lähialueilla:`
                  : `${service.names.en} in Nearby Service Areas:`}
              </h3>
              <div className="flex flex-wrap gap-2">
                {nearbyAreas.map((near) => (
                  <button
                    key={near.id}
                    type="button"
                    onClick={() => {
                      if (onSelectNeighborhood) onSelectNeighborhood(near);
                      handleNavigate(`#/services/${service.slugs.en}/${near.cityId}/${near.slug}`);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#ccdbe4] bg-[#f8fbfe] px-3 py-1.5 text-xs font-bold text-[#142c42] hover:border-[#087f72] hover:text-[#087f72] transition-colors"
                  >
                    <MapPin className="h-3 w-3 text-[#0d9d8c]" />
                    <span>{service.names[currentLang]} {near.names[currentLang]} ({near.postalCodes[0]})</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Contextual Internal Links: Related Cleaning Services in this Area */}
          <div className="rounded-2xl border border-[#e2e9ee] bg-white p-6 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-[#142c42]">
              {selectedNeighborhood
                ? currentLang === 'fi'
                  ? `Muut siivouspalvelut alueella ${neighName} (${activePostal}):`
                  : `Other Cleaning Services in ${neighName}:`
                : currentLang === 'fi'
                ? 'Tutustu myös muihin palveluihimme:'
                : 'Other Professional Cleaning Services:'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {otherServices.map((os) => {
                const targetHash = selectedNeighborhood
                  ? `#/services/${os.slugs.en}/${selectedNeighborhood.cityId}/${selectedNeighborhood.slug}`
                  : activeCityId
                  ? `#/services/${os.slugs.en}/${activeCityId}`
                  : `#/services/${os.slugs.en}`;

                return (
                  <button
                    key={os.id}
                    type="button"
                    onClick={() => handleNavigate(targetHash)}
                    className="flex items-center justify-between rounded-xl border border-[#f0f4f7] bg-[#fbfcfd] p-3 text-left hover:border-[#087f72] hover:bg-[#ebf7f5] transition-all group"
                  >
                    <div>
                      <div className="text-xs font-bold text-[#142c42] group-hover:text-[#087f72]">
                        {os.names[currentLang]} {neighName || cityName || ''}
                      </div>
                      <div className="text-[11px] text-[#677c8d] line-clamp-1">{os.desc[currentLang]}</div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-[#9ab3c5] group-hover:text-[#087f72] shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Pricing & Fast Lead-Gen Card */}
        <div className="space-y-4 lg:col-span-4">
          {/* Instant Lead Capture Card */}
          <div className="rounded-2xl border border-[#e2e9ee] bg-[#10263d] p-6 text-white shadow-md space-y-4 sticky top-24">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#9ddbd1]">
              {currentLang === 'fi'
                ? `PIKAPYYNTÖ & HINTA-ARVIO • ${neighName ? neighName.toUpperCase() : 'PÄÄKAUPUNKISEUTU'}`
                : currentLang === 'sv'
                ? `SNABB FÖRFRÅGAN & PRIS • ${neighName ? neighName.toUpperCase() : 'HUVUDSTADSREGIONEN'}`
                : `QUICK ESTIMATE & PRICE • ${neighName ? neighName.toUpperCase() : 'CAPITAL REGION'}`}
            </span>

            <div>
              <span className="text-xs text-[#c8d8e1]">
                {currentLang === 'fi'
                  ? 'Tuntihinta alkaen:'
                  : currentLang === 'sv'
                  ? 'Timpris från:'
                  : 'Hourly rate from:'}
              </span>
              <div className="mt-1 text-3xl font-extrabold font-mono text-[#ff8d43]">
                43,00 €{' '}
                <span className="text-xs font-normal text-[#c8d8e1]">
                  {currentLang === 'sv' ? '/ timme' : currentLang === 'en' ? '/ hour' : '/ h'}
                </span>
              </div>
            </div>

            {isHome && (
              <div className="rounded-xl bg-white/10 p-3 text-xs text-[#d3e7ed] leading-relaxed border border-white/10">
                💡{' '}
                <strong>
                  {currentLang === 'fi'
                    ? 'Kotitalousvähennys 60%:'
                    : currentLang === 'sv'
                    ? 'Hushållsavdrag 60%:'
                    : 'Tax Credit 60%:'}
                </strong>{' '}
                {currentLang === 'fi'
                  ? 'Verovähennyksen jälkeen todellinen omavastuu vain'
                  : currentLang === 'sv'
                  ? 'Efter skatteavdrag är den verkliga självrisken endast'
                  : 'After the Finnish tax deduction, you pay only'}{' '}
                <strong className="text-[#69dfbd] font-mono">17,20 € / h</strong>.
              </div>
            )}

            {/* Quick Lead Form */}
            {!leadSubmitted ? (
              <form onSubmit={handleQuickLeadSubmit} className="space-y-3 pt-2">
                <div>
                  <label htmlFor="lead-name" className="block text-[11px] font-bold text-[#9ddbd1] mb-1">
                    {currentLang === 'fi' ? 'Nimesi:' : currentLang === 'sv' ? 'Ditt namn:' : 'Your Name:'}
                  </label>
                  <input
                    id="lead-name"
                    type="text"
                    required
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    placeholder={currentLang === 'fi' ? 'Matti Meikäläinen' : currentLang === 'sv' ? 'Anna Andersson' : 'Jane Doe'}
                    className="w-full rounded-xl bg-white/10 border border-white/20 px-3 py-2 text-xs text-white placeholder-slate-400 focus:bg-white/20 focus:border-[#ff8d43] focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="lead-phone" className="block text-[11px] font-bold text-[#9ddbd1] mb-1">
                    {currentLang === 'fi' ? 'Puhelinnumero:' : currentLang === 'sv' ? 'Telefonnummer:' : 'Phone Number:'}
                  </label>
                  <input
                    id="lead-phone"
                    type="tel"
                    required
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                    placeholder="+358 40 123 4567"
                    className="w-full rounded-xl bg-white/10 border border-white/20 px-3 py-2 text-xs text-white placeholder-slate-400 focus:bg-white/20 focus:border-[#ff8d43] focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="lead-postal" className="block text-[11px] font-bold text-[#9ddbd1] mb-1">
                    {currentLang === 'fi' ? 'Postinumero:' : currentLang === 'sv' ? 'Postnummer:' : 'Postal Code:'}
                  </label>
                  <input
                    id="lead-postal"
                    type="text"
                    value={leadPostal}
                    onChange={(e) => setLeadPostal(e.target.value)}
                    placeholder={activePostal || '00100'}
                    className="w-full rounded-xl bg-white/10 border border-white/20 px-3 py-2 text-xs text-white placeholder-slate-400 focus:bg-white/20 focus:border-[#ff8d43] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff8d43] px-4 py-3 text-xs font-bold text-[#10263d] hover:bg-[#ff9b59] transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                  <span>
                    {currentLang === 'fi'
                      ? 'Pyydä nopea tarjous (<15 min)'
                      : currentLang === 'sv'
                      ? 'Begär snabboffert (<15 min)'
                      : 'Request Quick Quote (<15 min)'}
                  </span>
                </button>
              </form>
            ) : (
              <div className="rounded-xl bg-emerald-500/20 border border-emerald-400/30 p-4 text-center space-y-2 animate-in fade-in">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white mx-auto">
                  <Check className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold text-white">
                  {currentLang === 'fi'
                    ? 'Kiitos yhteydenotostasi!'
                    : currentLang === 'sv'
                    ? 'Tack för din förfrågan!'
                    : 'Thank You for Reaching Out!'}
                </h4>
                <p className="text-xs text-emerald-100">
                  {currentLang === 'fi'
                    ? `Tarjouspyyntösi palvelulle ${service.names[currentLang]} (${neighName || cityName || 'Pääkaupunkiseutu'}) vastaanotettiin. Otamme yhteyttä numeroon ${leadPhone}!`
                    : currentLang === 'sv'
                    ? `Din förfrågan för ${service.names[currentLang]} (${neighName || cityName || 'Huvudstadsregionen'}) har mottagits. Vi kontaktar dig på ${leadPhone}!`
                    : `Your quote request for ${service.names[currentLang]} (${neighName || cityName || 'Capital Region'}) has been received. We will reach out to ${leadPhone}!`}
                </p>
              </div>
            )}

            <div className="border-t border-white/10 pt-3 space-y-2">
              <button
                type="button"
                onClick={() => {
                  const bookingHash = selectedNeighborhood
                    ? `#/services/${service.slugs.en}/${selectedNeighborhood.cityId}/${selectedNeighborhood.slug}/booking`
                    : activeCityId
                    ? `#/services/${service.slugs.en}/${activeCityId}/booking`
                    : `#/services/${service.slugs.en}/booking`;
                  handleNavigate(bookingHash);
                  onBookNow(service.id, activeCityId, selectedNeighborhood?.id);
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-bold text-white hover:bg-white/20 transition-colors cursor-pointer"
              >
                <Calendar className="h-4 w-4" />
                <span>
                  {currentLang === 'fi'
                    ? 'Varaa suoraan verkossa'
                    : currentLang === 'sv'
                    ? 'Boka direkt online'
                    : 'Book directly online'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => onRequestQuote(service.id, activeCityId, activePostal)}
                className="flex w-full items-center justify-center gap-2 text-xs text-[#9ddbd1] hover:underline pt-1 cursor-pointer"
              >
                <span>
                  {currentLang === 'fi'
                    ? 'Siirry laajempaan tarjouslomakkeeseen →'
                    : currentLang === 'sv'
                    ? 'Gå till fullständigt offerformulär →'
                    : 'Go to detailed quote form →'}
                </span>
              </button>
            </div>

            <div className="pt-2 border-t border-white/10 text-[11px] text-[#90a7b8] space-y-1">
              <p>
                ✓{' '}
                {currentLang === 'fi'
                  ? 'Ilmainen ja sitoumukseton tarjouspyyntö'
                  : currentLang === 'sv'
                  ? 'Kostnadsfri och icke-bindande offertförfrågan'
                  : 'Free and non-binding quote request'}
              </p>
              <p>
                ✓{' '}
                {currentLang === 'fi'
                  ? '100% tyytyväisyystakuu jokaiselle käynnille'
                  : currentLang === 'sv'
                  ? '100% nöjd-kund-garanti på varje städtillfälle'
                  : '100% satisfaction guarantee on every visit'}
              </p>
              <p>
                ✓{' '}
                {currentLang === 'fi'
                  ? 'Taustatarkistettu ja vakuutettu tiimi'
                  : currentLang === 'sv'
                  ? 'Bakgrundskontrollerat och försäkrat städteam'
                  : 'Background-checked and insured cleaning team'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
