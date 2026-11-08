import React, { useState, useEffect, useMemo } from 'react';
import { Language, ServiceInfo, SERVICES, CITIES, CityInfo, GUIDES, GuideInfo } from './data/content';
import { TRANSLATIONS } from './data/translations';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Hero } from './components/Hero';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { AreasPage } from './pages/AreasPage';
import { CityDetailPage } from './pages/CityDetailPage';
import { PricingPage } from './pages/PricingPage';
import { GuideDetailPage } from './pages/GuideDetailPage';
import { ContactPage } from './pages/ContactPage';
import { AboutPage } from './pages/AboutPage';
import { PricingCalculator } from './components/PricingCalculator';
import { BookingWizard } from './components/BookingWizard';
import { PriceComparison } from './components/PriceComparison';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ReviewsSection } from './components/ReviewsSection';
import { OurStory } from './components/OurStory';
import { GuidesSection } from './components/GuidesSection';
import { FaqSection } from './components/FaqSection';
import { QuoteForm } from './components/QuoteForm';
import { AllPagesModal } from './components/AllPagesModal';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { ExploreServicesSection } from './components/ExploreServicesSection';
import { PopularServicesSection } from './components/PopularServicesSection';
import { PromoDiscountBanner } from './components/PromoDiscountBanner';
import { CalculatorCtaBar } from './components/CalculatorCtaBar';
import { AreaLocationsSection } from './components/AreaLocationsSection';
import { PricingCardsSection } from './components/PricingCardsSection';
import { WhyChooseSection } from './components/WhyChooseSection';
import { CustomerReviewsSection } from './components/CustomerReviewsSection';
import { ActivityTabsSection } from './components/ActivityTabsSection';
import { TrustPartnerBanner } from './components/TrustPartnerBanner';
import { ArticlesGuidesSection } from './components/ArticlesGuidesSection';
import { BottomCtaBanner } from './components/BottomCtaBanner';
import { SeoDirectoryPage } from './pages/SeoDirectoryPage';
import { TechnicalSeoAuditPage } from './pages/TechnicalSeoAuditPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { Breadcrumbs } from './components/Breadcrumbs';
import { findSeoMetadata, applySeoMetadataToHead } from './data/seoCatalog';
import { PricingModel, ServiceType, ExtraOption } from './utils/pricing';
import {
  NeighborhoodInfo,
  NEIGHBORHOODS,
  FINNISH_POSTAL_CODES,
  findNeighborhoodByPostalCode,
  getOrCreateNeighborhood,
} from './data/locations';
import { LocationSearchModal } from './components/LocationSearchModal';
import { LocationPermissionBanner } from './components/LocationPermissionBanner';
import {
  checkGeolocationPermission,
  detectVisitorLocation,
  savePermissionStatus,
  isPromptDismissed,
} from './utils/geolocation';
import { NeighborhoodDetailPage } from './pages/NeighborhoodDetailPage';
import {
  parseRoute,
  buildHierarchyUrl,
  generateBreadcrumbs,
  ParsedRoute,
  BreadcrumbItem,
} from './utils/urlHierarchy';
import { MapPin, ArrowRight, ShieldCheck, Calendar, Sparkles } from 'lucide-react';

export type PageRoute =
  | 'home'
  | 'services'
  | 'service-detail'
  | 'areas'
  | 'city-detail'
  | 'neighborhood-detail'
  | 'pricing'
  | 'calculator'
  | 'booking'
  | 'compare'
  | 'why'
  | 'reviews'
  | 'story'
  | 'guides'
  | 'guide-detail'
  | 'faq'
  | 'about'
  | 'contact'
  | 'quote'
  | 'seo-directory'
  | 'seo-analysis'
  | 'not-found';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('siisti360_lang');
      if (saved === 'fi' || saved === 'sv' || saved === 'en') return saved;
    } catch {}
    return 'fi';
  });

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    try {
      localStorage.setItem('siisti360_lang', lang);
    } catch {}
  };

  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState<boolean>(false);
  const [isOpenDirectory, setIsOpenDirectory] = useState<boolean>(false);

  // Selected sub-items
  const [selectedService, setSelectedService] = useState<ServiceInfo>(SERVICES[0]);
  const [selectedCity, setSelectedCity] = useState<CityInfo>(CITIES[0]);
  const [selectedGuide, setSelectedGuide] = useState<GuideInfo>(GUIDES[0]);
  const [selectedCityIdForService, setSelectedCityIdForService] = useState<string | undefined>(undefined);

  // Active Parsed Route State
  const [currentRoute, setCurrentRoute] = useState<ParsedRoute>(() =>
    typeof window !== 'undefined'
      ? parseRoute(window.location.hash || window.location.pathname)
      : {
          type: 'home',
          canonicalPath: '/',
          hashPath: '#/',
          isValid: true,
          rawSegments: [],
        }
  );

  // Location state
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<NeighborhoodInfo | null>(() => {
    try {
      const saved = localStorage.getItem('siisti360_active_neighborhood');
      if (saved && (NEIGHBORHOODS[saved] || getOrCreateNeighborhood(saved))) {
        return NEIGHBORHOODS[saved] || getOrCreateNeighborhood(saved);
      }
    } catch {}
    return null;
  });

  const [selectedPostalCode, setSelectedPostalCode] = useState<string | undefined>(() => {
    try {
      return localStorage.getItem('siisti360_active_postal') || undefined;
    } catch {}
    return undefined;
  });

  const [isOpenLocationModal, setIsOpenLocationModal] = useState<boolean>(false);
  const [isPromptDismissedState, setIsPromptDismissedState] = useState<boolean>(() => isPromptDismissed());
  const [isDetectingLocation, setIsDetectingLocation] = useState<boolean>(false);

  // Trigger location detection via browser Geolocation API
  const handleTriggerLocationDetection = async () => {
    setIsDetectingLocation(true);
    try {
      const res = await detectVisitorLocation({ enableHighAccuracy: true });
      handleSelectNeighborhood(res.neighborhood, res.postalCode);
      setIsPromptDismissedState(true);
    } catch (err: any) {
      if (err.message === 'PERMISSION_DENIED') {
        savePermissionStatus('denied');
      }
      setIsOpenLocationModal(true);
    } finally {
      setIsDetectingLocation(false);
    }
  };

  // Check if browser already granted permission previously and auto-detect on initial visit
  useEffect(() => {
    const checkSilentPermission = async () => {
      try {
        const perm = await checkGeolocationPermission();
        if (perm === 'granted' && !selectedNeighborhood) {
          const res = await detectVisitorLocation({ timeout: 6000 });
          handleSelectNeighborhood(res.neighborhood, res.postalCode);
        }
      } catch {}
    };
    checkSilentPermission();
  }, []);

  // Pre-filled data for booking wizard
  const [wizardPreData, setWizardPreData] = useState<{
    model: PricingModel;
    service: ServiceType;
    area: number;
    extras: ExtraOption[];
    city?: 'helsinki' | 'espoo' | 'vantaa';
    postalCode?: string;
    neighborhoodId?: string;
  } | undefined>(undefined);

  // Synchronize location changes and update URL hierarchy dynamically (Requirement 3)
  const handleSelectNeighborhood = (neighborhood: NeighborhoodInfo | null, postalCode?: string) => {
    setSelectedNeighborhood(neighborhood);
    const pCode = postalCode || neighborhood?.postalCodes[0];
    setSelectedPostalCode(pCode);

    try {
      if (neighborhood) {
        localStorage.setItem('siisti360_active_neighborhood', neighborhood.id);
        if (pCode) localStorage.setItem('siisti360_active_postal', pCode);
      } else {
        localStorage.removeItem('siisti360_active_neighborhood');
        localStorage.removeItem('siisti360_active_postal');
      }
    } catch {}

    // Dynamic URL Navigation:
    // If currently on a service page: /services/[service]/[city]/[new-neighborhood]
    if (currentPage === 'service-detail' && selectedService) {
      if (neighborhood) {
        const url = buildHierarchyUrl({
          service: selectedService,
          city: neighborhood.cityId,
          neighborhood: neighborhood.slug,
        });
        window.location.hash = url.hashPath;
      } else {
        const url = buildHierarchyUrl({ service: selectedService });
        window.location.hash = url.hashPath;
      }
    } else if (currentPage === 'neighborhood-detail' || currentPage === 'city-detail' || currentPage === 'areas') {
      if (neighborhood) {
        const url = buildHierarchyUrl({
          city: neighborhood.cityId,
          neighborhood: neighborhood.slug,
        });
        window.location.hash = url.hashPath;
      }
    }
  };

  // Centralized URL routing listener (handles hash and path, deep-links, and location-based routing)
  useEffect(() => {
    const handleHashChange = () => {
      const raw = window.location.hash || window.location.pathname;
      const parsed = parseRoute(raw);
      setCurrentRoute(parsed);

      switch (parsed.type) {
        case 'home':
          setCurrentPage('home');
          break;

        case 'locations-hub':
          setCurrentPage('areas');
          break;

        case 'city':
          if (parsed.city) {
            setSelectedCity(parsed.city);
          }
          setCurrentPage('city-detail');
          break;

        case 'neighborhood':
        case 'postal':
          if (parsed.city) {
            setSelectedCity(parsed.city);
          }
          if (parsed.neighborhood) {
            setSelectedNeighborhood(parsed.neighborhood);
            const pCode = parsed.postalCode || parsed.neighborhood.postalCodes[0];
            setSelectedPostalCode(pCode);
            try {
              localStorage.setItem('siisti360_active_neighborhood', parsed.neighborhood.id);
              if (pCode) localStorage.setItem('siisti360_active_postal', pCode);
            } catch {}
          }
          setCurrentPage('neighborhood-detail');
          break;

        case 'services-hub':
          setCurrentPage('services');
          break;

        case 'service':
          if (parsed.service) {
            setSelectedService(parsed.service);
            setSelectedCityIdForService(undefined);
          }
          setCurrentPage('service-detail');
          break;

        case 'service-city':
          if (parsed.service) {
            setSelectedService(parsed.service);
          }
          if (parsed.city) {
            setSelectedCityIdForService(parsed.city.id);
            setSelectedCity(parsed.city);
          }
          setCurrentPage('service-detail');
          break;

        case 'service-city-neighborhood':
          if (parsed.service) {
            setSelectedService(parsed.service);
          }
          if (parsed.city) {
            setSelectedCityIdForService(parsed.city.id);
            setSelectedCity(parsed.city);
          }
          if (parsed.neighborhood) {
            setSelectedNeighborhood(parsed.neighborhood);
            const pCode = parsed.postalCode || parsed.neighborhood.postalCodes[0];
            setSelectedPostalCode(pCode);
            try {
              localStorage.setItem('siisti360_active_neighborhood', parsed.neighborhood.id);
              if (pCode) localStorage.setItem('siisti360_active_postal', pCode);
            } catch {}
          }
          setCurrentPage('service-detail');
          break;

        case 'booking':
          if (parsed.service) {
            setSelectedService(parsed.service);
            const sType =
              parsed.service.id === 'suursiivous'
                ? 'deep'
                : parsed.service.id === 'muuttosiivous'
                ? 'move'
                : 'standard';
            setWizardPreData({
              model: 'hourly',
              service: sType as ServiceType,
              area: 75,
              extras: [],
              city: (parsed.city?.id as any) || selectedNeighborhood?.cityId || 'helsinki',
              postalCode: parsed.postalCode || selectedPostalCode || parsed.neighborhood?.postalCodes[0] || '00100',
              neighborhoodId: parsed.neighborhood?.id,
            });
          }
          setCurrentPage('booking');
          break;

        case 'guide':
          if (parsed.guide) {
            setSelectedGuide(parsed.guide);
          }
          setCurrentPage('guide-detail');
          break;

        case 'guides-hub':
          setCurrentPage('guides');
          break;

        case 'pricing':
          setCurrentPage('pricing');
          break;

        case 'calculator':
          setCurrentPage('calculator');
          break;

        case 'compare':
          setCurrentPage('compare');
          break;

        case 'why':
          setCurrentPage('why');
          break;

        case 'story':
          setCurrentPage('story');
          break;

        case 'reviews':
          setCurrentPage('reviews');
          break;

        case 'about':
          setCurrentPage('about');
          break;

        case 'contact':
          setCurrentPage('contact');
          break;

        case 'faq':
          setCurrentPage('faq');
          break;

        case 'quote':
          setCurrentPage('quote');
          break;

        case 'sitemap':
          setCurrentPage('seo-directory');
          break;

        case 'seo-analysis':
          setCurrentPage('seo-analysis');
          break;

        case 'not-found':
          setCurrentPage('not-found');
          break;

        default:
          setCurrentPage('home');
          break;
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentLang]);

  // Navigate to standard named page or subparam
  const navigateTo = (page: PageRoute, subParam?: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    let newHash = `#/${page}`;
    if (page === 'home') {
      newHash = '#/';
    } else if (page === 'service-detail' && subParam) {
      newHash = `#/services/${subParam}`;
    } else if (page === 'city-detail' && subParam) {
      newHash = `#/locations/${subParam}`;
    } else if (page === 'neighborhood-detail' && subParam) {
      newHash = `#/locations/${subParam}`;
    } else if (page === 'guide-detail' && subParam) {
      newHash = `#/guides/${subParam}`;
    } else if (page === 'areas') {
      newHash = '#/locations';
    } else if (page === 'seo-directory') {
      newHash = '#/sitemap';
    } else if (page === 'seo-analysis') {
      newHash = '#/seo-audit';
    }

    setCurrentPage(page);

    if (window.location.hash === newHash) {
      const parsed = parseRoute(newHash);
      setCurrentRoute(parsed);
    } else {
      window.location.hash = newHash;
    }
  };

  const handleNavigateUrl = (hashOrUrl: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    let targetHash = hashOrUrl.startsWith('#') ? hashOrUrl : `#${hashOrUrl}`;
    if (targetHash === '#/home' || targetHash === '#home') {
      targetHash = '#/';
    }
    const parsed = parseRoute(targetHash);
    setCurrentRoute(parsed);

    // Synchronize page state immediately
    if (parsed.type === 'home') {
      setCurrentPage('home');
    } else if (parsed.type === 'locations-hub') {
      setCurrentPage('areas');
    } else if (parsed.type === 'city') {
      if (parsed.city) setSelectedCity(parsed.city);
      setCurrentPage('city-detail');
    } else if (parsed.type === 'neighborhood' || parsed.type === 'postal') {
      if (parsed.city) setSelectedCity(parsed.city);
      if (parsed.neighborhood) {
        setSelectedNeighborhood(parsed.neighborhood);
        const pCode = parsed.postalCode || parsed.neighborhood.postalCodes[0];
        setSelectedPostalCode(pCode);
      }
      setCurrentPage('neighborhood-detail');
    } else if (parsed.type === 'services-hub') {
      setCurrentPage('services');
    } else if (parsed.type === 'service') {
      if (parsed.service) {
        setSelectedService(parsed.service);
        setSelectedCityIdForService(undefined);
      }
      setCurrentPage('service-detail');
    } else if (parsed.type === 'service-city') {
      if (parsed.service) setSelectedService(parsed.service);
      if (parsed.city) {
        setSelectedCityIdForService(parsed.city.id);
        setSelectedCity(parsed.city);
      }
      setCurrentPage('service-detail');
    } else if (parsed.type === 'service-city-neighborhood') {
      if (parsed.service) setSelectedService(parsed.service);
      if (parsed.city) {
        setSelectedCityIdForService(parsed.city.id);
        setSelectedCity(parsed.city);
      }
      if (parsed.neighborhood) {
        setSelectedNeighborhood(parsed.neighborhood);
        const pCode = parsed.postalCode || parsed.neighborhood.postalCodes[0];
        setSelectedPostalCode(pCode);
      }
      setCurrentPage('service-detail');
    } else if (parsed.type === 'booking') {
      if (parsed.service) setSelectedService(parsed.service);
      setCurrentPage('booking');
    } else if (parsed.type === 'compare') {
      setCurrentPage('compare');
    } else if (parsed.type === 'why') {
      setCurrentPage('why');
    } else if (parsed.type === 'story') {
      setCurrentPage('story');
    } else if (parsed.type === 'pricing') {
      setCurrentPage('pricing');
    } else if (parsed.type === 'calculator') {
      setCurrentPage('calculator');
    } else if (parsed.type === 'reviews') {
      setCurrentPage('reviews');
    } else if (parsed.type === 'about') {
      setCurrentPage('about');
    } else if (parsed.type === 'contact') {
      setCurrentPage('contact');
    } else if (parsed.type === 'faq') {
      setCurrentPage('faq');
    } else if (parsed.type === 'quote') {
      setCurrentPage('quote');
    } else if (parsed.type === 'sitemap') {
      setCurrentPage('seo-directory');
    } else if (parsed.type === 'seo-analysis') {
      setCurrentPage('seo-analysis');
    } else if (parsed.type === 'not-found') {
      setCurrentPage('not-found');
    }

    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash;
    }
  };

  // Generate dynamic breadcrumbs for current view
  const breadcrumbs: BreadcrumbItem[] = useMemo(() => {
    return generateBreadcrumbs(currentRoute, currentLang);
  }, [currentRoute, currentLang]);

  // Synchronize document title, meta tags, and canonical head link
  useEffect(() => {
    document.documentElement.lang = currentLang;
    const t = TRANSLATIONS[currentLang];

    // Canonical link update
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `https://example.fi${currentRoute.canonicalPath}`);

    // If on service-detail, the page component handles specific title and local JSON-LD
    if (currentPage === 'service-detail') return;

    // Look up exact SEO metadata from our catalog
    const matchedSeo = findSeoMetadata({
      pageType:
        currentPage === 'city-detail'
          ? 'city'
          : currentPage === 'guide-detail'
          ? 'guide'
          : currentPage,
      language: currentLang,
      serviceSlug:
        currentPage === 'guide-detail'
          ? selectedGuide?.slugs[currentLang]
          : selectedService?.slugs[currentLang],
      citySlug: selectedCityIdForService || selectedCity?.slugs[currentLang],
    });

    if (matchedSeo) {
      applySeoMetadataToHead(matchedSeo);
    } else {
      const titles: Record<PageRoute, string> = {
        home: `${t.brand} — ${t.hero.title} | ${t.region}`,
        services: `${t.services.title} | ${t.brand}`,
        'service-detail': `${selectedService.names[currentLang]} | ${t.brand}`,
        areas: `${currentLang === 'sv' ? 'Verksamhetsområden' : currentLang === 'en' ? 'Service Areas' : 'Toimialueet'} — Helsinki, Espoo & Vantaa | ${t.brand}`,
        'city-detail': `${currentLang === 'sv' ? 'Städtjänster' : currentLang === 'en' ? 'Cleaning Services' : 'Siivouspalvelut'} ${selectedCity.names[currentLang]} | ${t.brand}`,
        'neighborhood-detail': `${selectedNeighborhood ? selectedNeighborhood.names[currentLang] : (currentLang === 'sv' ? 'Stadsdelar' : currentLang === 'en' ? 'Districts' : 'Kaupunginosat')} (${selectedPostalCode || ''}) — ${currentLang === 'sv' ? 'Städtjänster' : currentLang === 'en' ? 'Cleaning Services' : 'Siivouspalvelut'} | ${t.brand}`,
        pricing: `${t.pricing.title} | ${t.brand}`,
        calculator: `${t.calculator.title} | ${t.brand}`,
        booking: `${t.booking.title} | ${t.brand}`,
        compare: `${t.compare.title} | ${t.brand}`,
        why: `${t.why.title} | ${t.brand}`,
        reviews: `${t.reviews.title} | ${t.brand}`,
        story: `${t.story.title} | ${t.brand}`,
        guides: `${currentLang === 'sv' ? 'Städguider och tips' : currentLang === 'en' ? 'Cleaning Guides & Tips' : 'Siivousoppaat ja vinkit'} | ${t.brand}`,
        'guide-detail': `${selectedGuide.titles[currentLang]} | ${t.brand}`,
        faq: `${t.faq.title} | ${t.brand}`,
        about: `${currentLang === 'sv' ? 'Om oss' : currentLang === 'en' ? 'About Us' : 'Meistä'} — ${t.brand}`,
        contact: `${currentLang === 'sv' ? 'Kontakta oss' : currentLang === 'en' ? 'Contact Us' : 'Ota yhteyttä'} | ${t.brand}`,
        quote: `${t.quoteForm.title} | ${t.brand}`,
        'seo-directory': `${currentLang === 'sv' ? 'Webbplatskarta & Alla sidor' : currentLang === 'en' ? 'Sitemap & All Pages' : 'SEO-sivukartta & Kaikki sivut'} | ${t.brand}`,
        'seo-analysis': `${currentLang === 'sv' ? 'Teknisk SEO-granskning' : currentLang === 'en' ? 'Technical SEO Audit' : 'Tekninen SEO-auditointi'} | ${t.brand}`,
        'not-found': `${currentLang === 'sv' ? '404 — Sidan hittades inte' : currentLang === 'en' ? '404 — Page Not Found' : '404 — Sivua ei löytynyt'} | ${t.brand}`,
      };
      const activeTitle = titles[currentPage] || `${t.brand} — ${t.region}`;
      document.title = activeTitle;

      // Dynamic meta description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      const pageDescriptions: Partial<Record<PageRoute, string>> = {
        home: t.hero.subtitle,
        services: t.services.subtitle,
        areas: t.areasPage.subtitle,
        pricing: t.pricing.subtitle,
        calculator: t.calculator.subtitle,
        booking: t.booking.subtitle,
        compare: t.compare.subtitle,
        why: t.why.subtitle,
        reviews: t.reviews.subtitle,
        story: t.story.text1,
        guides: t.guides.subtitle,
        faq: t.faq.subtitle,
        about: t.about.p1,
        contact: t.contactPage.formSubtitle,
        quote: t.quoteForm.subtitle,
      };
      const activeDesc = pageDescriptions[currentPage] || t.hero.subtitle;
      metaDesc.setAttribute('content', activeDesc);

      // OpenGraph updates
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', activeTitle);

      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', activeDesc);

      let ogLocale = document.querySelector('meta[property="og:locale"]');
      if (ogLocale) {
        ogLocale.setAttribute(
          'content',
          currentLang === 'sv' ? 'sv_SE' : currentLang === 'en' ? 'en_US' : 'fi_FI'
        );
      }

      // Twitter Cards
      let twTitle = document.querySelector('meta[name="twitter:title"]');
      if (twTitle) twTitle.setAttribute('content', activeTitle);

      let twDesc = document.querySelector('meta[name="twitter:description"]');
      if (twDesc) twDesc.setAttribute('content', activeDesc);
    }

    // Ensure developer/audit sections are noindexed, and consumer pages are indexed
    let robotsTag = document.querySelector('meta[name="robots"]');
    if (!robotsTag) {
      robotsTag = document.createElement('meta');
      robotsTag.setAttribute('name', 'robots');
      document.head.appendChild(robotsTag);
    }
    if (currentPage === 'seo-analysis') {
      robotsTag.setAttribute('content', 'noindex, nofollow');
    } else {
      robotsTag.setAttribute('content', 'index, follow');
    }
  }, [
    currentLang,
    currentPage,
    currentRoute,
    selectedService,
    selectedCity,
    selectedNeighborhood,
    selectedPostalCode,
    selectedGuide,
    selectedCityIdForService,
  ]);

  const t = TRANSLATIONS[currentLang];

  // Service selection with hierarchical URL resolution (Requirement 3)
  const handleSelectService = (service: ServiceInfo) => {
    setSelectedService(service);
    if (selectedNeighborhood) {
      const url = buildHierarchyUrl({
        service,
        city: selectedNeighborhood.cityId,
        neighborhood: selectedNeighborhood.slug,
      });
      handleNavigateUrl(url.hashPath);
    } else if (selectedCityIdForService) {
      const url = buildHierarchyUrl({
        service,
        city: selectedCityIdForService,
      });
      handleNavigateUrl(url.hashPath);
    } else {
      const url = buildHierarchyUrl({ service });
      handleNavigateUrl(url.hashPath);
    }
  };

  const handleSelectCity = (cityId: string) => {
    const c = CITIES.find((item) => item.id === cityId) || CITIES[0];
    setSelectedCity(c);
    handleNavigateUrl(`#/locations/${c.id}`);
  };

  // Booking with full hierarchical state and URL (Requirement 2 & 3)
  const handleBookServiceDirectly = (
    serviceId: string,
    cityId?: string,
    neighborhoodId?: string,
    postalCode?: string
  ) => {
    const s = SERVICES.find((item) => item.id === serviceId) || SERVICES[0];
    setSelectedService(s);

    const activeCId = cityId || selectedNeighborhood?.cityId || 'helsinki';
    const c = CITIES.find((item) => item.id === activeCId);
    if (c) setSelectedCity(c);

    const n = neighborhoodId
      ? NEIGHBORHOODS[neighborhoodId] || getOrCreateNeighborhood(neighborhoodId)
      : selectedNeighborhood;
    if (n) setSelectedNeighborhood(n);

    const pCode = postalCode || selectedPostalCode || n?.postalCodes[0] || '00100';
    setSelectedPostalCode(pCode);

    setWizardPreData({
      model: 'hourly',
      service: (s.id === 'suursiivous' ? 'deep' : s.id === 'muuttosiivous' ? 'move' : 'standard') as ServiceType,
      area: 75,
      extras: [],
      city: activeCId as any,
      postalCode: pCode,
      neighborhoodId: n?.id,
    });

    // Hierarchical booking URL (e.g. /services/deep-cleaning/helsinki/ruoholahti/booking/)
    const bookingUrl = buildHierarchyUrl({
      service: s,
      city: c,
      neighborhood: n || undefined,
      isBooking: true,
    });
    handleNavigateUrl(bookingUrl.hashPath);
  };

  const handleProceedToBooking = (data: {
    model: PricingModel;
    service: ServiceType;
    area: number;
    extras: ExtraOption[];
    city?: 'helsinki' | 'espoo' | 'vantaa';
    postalCode?: string;
  }) => {
    setWizardPreData({
      ...data,
      city: data.city || selectedNeighborhood?.cityId || 'helsinki',
      postalCode: data.postalCode || selectedPostalCode || selectedNeighborhood?.postalCodes[0] || '00180',
    });

    if (selectedService && selectedNeighborhood) {
      const url = buildHierarchyUrl({
        service: selectedService,
        city: selectedNeighborhood.cityId,
        neighborhood: selectedNeighborhood,
        isBooking: true,
      });
      handleNavigateUrl(url.hashPath);
    } else {
      handleNavigateUrl('#/booking');
    }
  };

  const handleSelectRouteFromDirectory = (
    section: string,
    serviceId?: string,
    cityId?: string
  ) => {
    if (serviceId && cityId) {
      const s = SERVICES.find((item) => item.id === serviceId);
      if (s) setSelectedService(s);
      const c = CITIES.find((item) => item.id === cityId);
      if (c) setSelectedCity(c);
      handleNavigateUrl(`#/services/${s?.slugs.en || serviceId}/${cityId}`);
    } else if (serviceId) {
      const s = SERVICES.find((item) => item.id === serviceId);
      if (s) setSelectedService(s);
      handleNavigateUrl(`#/services/${s?.slugs.en || serviceId}`);
    } else if (cityId) {
      const c = CITIES.find((item) => item.id === cityId);
      if (c) setSelectedCity(c);
      handleNavigateUrl(`#/locations/${cityId}`);
    } else {
      navigateTo((section as PageRoute) || 'home');
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f8fa] text-[#142c42]">
      {/* Sidebar Navigation */}
      <Sidebar
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        activeSection={currentPage}
        onNavigate={(pageId) => {
          if (pageId === 'areas') handleNavigateUrl('#/locations');
          else if (pageId === 'services') handleNavigateUrl('#/services');
          else navigateTo(pageId as PageRoute);
        }}
        isOpenMobile={isOpenMobileMenu}
        onCloseMobile={() => setIsOpenMobileMenu(false)}
        selectedNeighborhood={selectedNeighborhood}
        selectedPostalCode={selectedPostalCode}
        onOpenLocationModal={() => setIsOpenLocationModal(true)}
      />

      {/* Main Layout Container (Full Width for Desktop) */}
      <div className="w-full flex min-h-screen flex-col">
        {/* Proactive Location Permission & Detection Banner (Asks permission & detects location) */}
        <LocationPermissionBanner
          currentLang={currentLang}
          selectedNeighborhood={selectedNeighborhood}
          onLocationDetected={(neighborhood, postalCode) => {
            handleSelectNeighborhood(neighborhood, postalCode);
            setIsPromptDismissedState(true);
          }}
          onOpenManualSearch={() => setIsOpenLocationModal(true)}
          onDismiss={() => setIsPromptDismissedState(true)}
          isDismissed={isPromptDismissedState || !!selectedNeighborhood}
        />

        {/* Sticky Top Header */}
        <Header
          currentLang={currentLang}
          onLanguageChange={handleLanguageChange}
          onOpenMobileMenu={() => setIsOpenMobileMenu(true)}
          onNavigateToQuote={() => navigateTo('quote')}
          onNavigateHome={() => navigateTo('home')}
          onNavigateUrl={handleNavigateUrl}
          activeSection={currentPage}
          selectedNeighborhood={selectedNeighborhood}
          selectedPostalCode={selectedPostalCode}
          onOpenLocationModal={() => setIsOpenLocationModal(true)}
          onRequestLocationDetect={handleTriggerLocationDetection}
          isDetectingLocation={isDetectingLocation}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full pb-24 lg:pb-16">
          {currentPage === 'home' && (
            <div className="space-y-12 sm:space-y-16">
              {/* 1. Hero Section */}
              <Hero
                currentLang={currentLang}
                selectedNeighborhood={selectedNeighborhood}
                selectedPostalCode={selectedPostalCode}
                onSelectNeighborhood={handleSelectNeighborhood}
                onSelectCityOnly={(cId) => handleSelectCity(cId)}
                onNavigateToBooking={() => navigateTo('booking')}
                onNavigateToCalculator={() => navigateTo('calculator')}
                onOpenLocationModal={() => setIsOpenLocationModal(true)}
              />

              {/* 2. Explore Cleaning Services (12 Grid Cards) */}
              <ExploreServicesSection
                currentLang={currentLang}
                onSelectService={(slug) => handleNavigateUrl(`#/services/${slug}`)}
                onViewAllServices={() => handleNavigateUrl('#/services')}
              />

              {/* 3. Popular Cleaning Services (8 Cards) */}
              <PopularServicesSection
                currentLang={currentLang}
                onSelectService={(slug) => handleNavigateUrl(`#/services/${slug}`)}
                onViewAllOffers={() => handleNavigateUrl('#/pricing')}
                onGetQuote={(slug) => handleBookServiceDirectly(slug)}
              />

              {/* Special Promotion -15% First Cleaning Banner */}
              <PromoDiscountBanner
                currentLang={currentLang}
                onBookNow={() => navigateTo('booking')}
              />

              {/* Quick Interactive Price Calculator CTA Bar */}
              <CalculatorCtaBar
                currentLang={currentLang}
                onOpenCalculator={() => navigateTo('calculator')}
              />

              {/* 4. Find Cleaning Services in Your Area (8 Location Cards) */}
              <AreaLocationsSection
                currentLang={currentLang}
                onSelectLocation={(type, id) => {
                  if (type === 'city') {
                    handleNavigateUrl(`#/locations/${id}`);
                  } else {
                    const neigh = NEIGHBORHOODS[id] || getOrCreateNeighborhood(id);
                    const city = neigh?.cityId || 'helsinki';
                    handleNavigateUrl(`#/locations/${city}/${id}`);
                  }
                }}
              />

              {/* 5. Simple & Transparent Pricing (5 Model Cards) */}
              <PricingCardsSection
                currentLang={currentLang}
                onViewFullPricing={() => handleNavigateUrl('#/pricing')}
                onSelectModel={(model) => {
                  if (model === 'contract') {
                    navigateTo('quote');
                  } else {
                    navigateTo('calculator');
                  }
                }}
              />

              {/* 6. Why Choose Siisti360? (6 Benefit Cards) */}
              <WhyChooseSection currentLang={currentLang} />

              {/* 7. What Our Customers Say (3 Customer Testimonials) */}
              <CustomerReviewsSection
                currentLang={currentLang}
                onViewAllReviews={() => handleNavigateUrl('#/reviews')}
              />

              {/* 8. Recent Activity Tabbed Slider */}
              <ActivityTabsSection
                currentLang={currentLang}
                onSelectService={(slug) => handleNavigateUrl(`#/services/${slug}`)}
                onSelectArea={(area) => {
                  const lower = area.toLowerCase().replace('ä', 'a');
                  handleNavigateUrl(`#/locations/${lower}`);
                }}
              />

              {/* 9. A Trusted Cleaning Partner in the Helsinki Region Banner */}
              <TrustPartnerBanner currentLang={currentLang} />

              {/* 10. Cleaning Tips, Guides & Local News (4 Cards) */}
              <ArticlesGuidesSection
                currentLang={currentLang}
                onSelectArticle={(slug) => handleNavigateUrl(`#/guides/${slug}`)}
                onViewAllArticles={() => handleNavigateUrl('#/guides')}
              />

              {/* 11. Ready for a cleaner home or office? Bottom CTA Banner */}
              <BottomCtaBanner
                currentLang={currentLang}
                onGetQuote={() => navigateTo('quote')}
              />
            </div>
          )}

          {/* Services Hub Page */}
          {currentPage === 'services' && (
            <ServicesPage
              currentLang={currentLang}
              breadcrumbs={breadcrumbs}
              selectedNeighborhood={selectedNeighborhood}
              selectedPostalCode={selectedPostalCode}
              onNavigateUrl={handleNavigateUrl}
              onSelectService={handleSelectService}
              onBookService={handleBookServiceDirectly}
              onNavigateToCalculator={() => navigateTo('calculator')}
              onNavigateToQuote={() => navigateTo('quote')}
              onOpenLocationSearch={() => setIsOpenLocationModal(true)}
              onSelectNeighborhood={handleSelectNeighborhood}
            />
          )}

          {/* Service Detail Page (supports Service, Service+City, and Service+City+Neighborhood) */}
          {currentPage === 'service-detail' && (
            <ServiceDetailPage
              service={selectedService}
              currentLang={currentLang}
              selectedCityId={selectedCityIdForService}
              selectedNeighborhood={selectedNeighborhood}
              selectedPostalCode={selectedPostalCode}
              breadcrumbs={breadcrumbs}
              onNavigateUrl={handleNavigateUrl}
              onBack={() => {
                setSelectedCityIdForService(undefined);
                handleNavigateUrl('#/services');
              }}
              onBookNow={(sId, cId, nId) =>
                handleBookServiceDirectly(sId, cId, nId, selectedPostalCode)
              }
              onRequestQuote={() => navigateTo('quote')}
              onSelectCity={(cityId) => setSelectedCityIdForService(cityId)}
              onSelectNeighborhood={(neigh) =>
                handleSelectNeighborhood(neigh, neigh.postalCodes[0])
              }
              onOpenLocationSearch={() => setIsOpenLocationModal(true)}
            />
          )}

          {/* Neighborhood Detail Page (e.g. /locations/helsinki/ruoholahti/) */}
          {currentPage === 'neighborhood-detail' && (
            <NeighborhoodDetailPage
              neighborhood={selectedNeighborhood || NEIGHBORHOODS.ruoholahti}
              postalCode={selectedPostalCode}
              currentLang={currentLang}
              breadcrumbs={breadcrumbs}
              onNavigateUrl={handleNavigateUrl}
              onBack={() => handleNavigateUrl('#/locations')}
              onSelectService={(serv, cityId, neighborhoodId) => {
                setSelectedService(serv);
                if (cityId) setSelectedCityIdForService(cityId);
                const url = buildHierarchyUrl({
                  service: serv,
                  city: cityId,
                  neighborhood: neighborhoodId,
                });
                handleNavigateUrl(url.hashPath);
              }}
              onBookNeighborhoodService={(servId, neighId, pCode) => {
                handleBookServiceDirectly(servId, selectedNeighborhood?.cityId, neighId, pCode);
              }}
              onRequestQuote={() => navigateTo('quote')}
              onSelectNeighborhood={(neigh, pCode) => {
                handleSelectNeighborhood(neigh, pCode);
                handleNavigateUrl(`#/locations/${neigh.cityId}/${neigh.slug}`);
              }}
              onOpenLocationSearch={() => setIsOpenLocationModal(true)}
            />
          )}

          {/* Areas Hub Page (/locations/) */}
          {currentPage === 'areas' && (
            <AreasPage
              currentLang={currentLang}
              breadcrumbs={breadcrumbs}
              selectedNeighborhood={selectedNeighborhood}
              selectedPostalCode={selectedPostalCode}
              onNavigateUrl={handleNavigateUrl}
              onSelectCity={handleSelectCity}
              onSelectNeighborhood={(nId) => {
                const neigh = NEIGHBORHOODS[nId] || getOrCreateNeighborhood(nId);
                if (neigh) {
                  handleSelectNeighborhood(neigh, neigh.postalCodes[0]);
                  handleNavigateUrl(`#/locations/${neigh.cityId}/${neigh.slug}`);
                }
              }}
              onSelectNeighborhoodObject={handleSelectNeighborhood}
              onNavigateToQuote={() => navigateTo('quote')}
              onOpenLocationSearch={() => setIsOpenLocationModal(true)}
            />
          )}

          {/* City Detail Page (e.g. /locations/helsinki/) */}
          {currentPage === 'city-detail' && (
            <CityDetailPage
              city={selectedCity}
              currentLang={currentLang}
              breadcrumbs={breadcrumbs}
              onNavigateUrl={handleNavigateUrl}
              onBack={() => handleNavigateUrl('#/locations')}
              onSelectService={(service, cityId) => {
                setSelectedService(service);
                setSelectedCityIdForService(cityId || selectedCity.id);
                handleNavigateUrl(`#/services/${service.slugs.en}/${cityId || selectedCity.id}`);
              }}
              onBookCityService={handleBookServiceDirectly}
              onRequestQuote={() => navigateTo('quote')}
              onSelectNeighborhood={(neigh) => {
                handleSelectNeighborhood(neigh, neigh.postalCodes[0]);
                handleNavigateUrl(`#/locations/${neigh.cityId}/${neigh.slug}`);
              }}
              onOpenLocationSearch={() => setIsOpenLocationModal(true)}
            />
          )}

          {/* Pricing Page */}
          {currentPage === 'pricing' && (
            <div className="space-y-6">
              <Breadcrumbs
                items={breadcrumbs}
                currentLang={currentLang}
                onNavigate={handleNavigateUrl}
                onOpenLocationSearch={() => setIsOpenLocationModal(true)}
                activePostalCode={selectedPostalCode}
              />
              <PricingPage
                currentLang={currentLang}
                selectedNeighborhood={selectedNeighborhood}
                selectedPostalCode={selectedPostalCode}
                onNavigateToCalculator={() => navigateTo('calculator')}
                onNavigateToBooking={() => navigateTo('booking')}
                onOpenLocationSearch={() => setIsOpenLocationModal(true)}
                onSelectNeighborhood={handleSelectNeighborhood}
              />
            </div>
          )}

          {/* Calculator Standalone */}
          {currentPage === 'calculator' && (
            <div className="space-y-6">
              <Breadcrumbs
                items={breadcrumbs}
                currentLang={currentLang}
                onNavigate={handleNavigateUrl}
                onOpenLocationSearch={() => setIsOpenLocationModal(true)}
                activePostalCode={selectedPostalCode}
              />
              <PricingCalculator
                currentLang={currentLang}
                selectedNeighborhood={selectedNeighborhood}
                selectedPostalCode={selectedPostalCode}
                onProceedToBooking={handleProceedToBooking}
                isStandalone={true}
              />
            </div>
          )}

          {/* Booking Page with Dynamic Hierarchy Breadcrumbs */}
          {currentPage === 'booking' && (
            <div className="space-y-6">
              <BookingWizard
                currentLang={currentLang}
                selectedNeighborhood={selectedNeighborhood}
                selectedPostalCode={selectedPostalCode}
                breadcrumbs={breadcrumbs}
                onNavigateUrl={handleNavigateUrl}
                onOpenLocationSearch={() => setIsOpenLocationModal(true)}
                initialData={wizardPreData}
                isStandalone={true}
              />
            </div>
          )}

          {/* Compare Prices */}
          {currentPage === 'compare' && (
            <div className="space-y-6">
              <Breadcrumbs
                items={breadcrumbs}
                currentLang={currentLang}
                onNavigate={handleNavigateUrl}
              />
              <PriceComparison
                currentLang={currentLang}
                onNavigateToCalculator={() => navigateTo('calculator')}
                isStandalone={true}
              />
            </div>
          )}

          {/* Why Choose Us */}
          {currentPage === 'why' && (
            <div className="space-y-6">
              <Breadcrumbs
                items={breadcrumbs}
                currentLang={currentLang}
                onNavigate={handleNavigateUrl}
              />
              <WhyChooseUs currentLang={currentLang} isStandalone={true} />
            </div>
          )}

          {/* Customer Reviews */}
          {currentPage === 'reviews' && (
            <div className="space-y-6">
              <Breadcrumbs
                items={breadcrumbs}
                currentLang={currentLang}
                onNavigate={handleNavigateUrl}
                onOpenLocationSearch={() => setIsOpenLocationModal(true)}
                activePostalCode={selectedPostalCode}
              />
              <ReviewsSection currentLang={currentLang} isStandalone={true} />
            </div>
          )}

          {/* Our Story */}
          {currentPage === 'story' && (
            <div className="space-y-6">
              <Breadcrumbs
                items={breadcrumbs}
                currentLang={currentLang}
                onNavigate={handleNavigateUrl}
              />
              <OurStory currentLang={currentLang} isStandalone={true} />
            </div>
          )}

          {/* Guides Hub */}
          {currentPage === 'guides' && (
            <div className="space-y-6">
              <Breadcrumbs
                items={breadcrumbs}
                currentLang={currentLang}
                onNavigate={handleNavigateUrl}
              />
              <GuidesSection
                currentLang={currentLang}
                onSelectGuide={(g) => {
                  setSelectedGuide(g);
                  handleNavigateUrl(`#/guides/${g.slugs.en}`);
                }}
                isStandalone={true}
              />
            </div>
          )}

          {/* Guide Detail Page */}
          {currentPage === 'guide-detail' && (
            <GuideDetailPage
              guide={selectedGuide}
              currentLang={currentLang}
              breadcrumbs={breadcrumbs}
              onNavigateUrl={handleNavigateUrl}
              onBack={() => handleNavigateUrl('#/guides')}
              onBookNow={() => navigateTo('booking')}
              onRequestQuote={() => navigateTo('quote')}
            />
          )}

          {/* FAQ Page */}
          {currentPage === 'faq' && (
            <div className="space-y-6">
              <Breadcrumbs
                items={breadcrumbs}
                currentLang={currentLang}
                onNavigate={handleNavigateUrl}
              />
              <FaqSection currentLang={currentLang} isStandalone={true} />
            </div>
          )}

          {/* About Us */}
          {currentPage === 'about' && (
            <div className="space-y-6">
              <Breadcrumbs
                items={breadcrumbs}
                currentLang={currentLang}
                onNavigate={handleNavigateUrl}
              />
              <AboutPage
                currentLang={currentLang}
                onNavigateToQuote={() => navigateTo('quote')}
                onNavigateToBooking={() => navigateTo('booking')}
              />
            </div>
          )}

          {/* Contact Page */}
          {currentPage === 'contact' && (
            <div className="space-y-6">
              <Breadcrumbs
                items={breadcrumbs}
                currentLang={currentLang}
                onNavigate={handleNavigateUrl}
              />
              <ContactPage currentLang={currentLang} />
            </div>
          )}

          {/* Quote Page */}
          {currentPage === 'quote' && (
            <div className="space-y-6">
              <Breadcrumbs
                items={breadcrumbs}
                currentLang={currentLang}
                onNavigate={handleNavigateUrl}
                onOpenLocationSearch={() => setIsOpenLocationModal(true)}
                activePostalCode={selectedPostalCode}
              />
              <QuoteForm
                currentLang={currentLang}
                selectedNeighborhood={selectedNeighborhood}
                selectedPostalCode={selectedPostalCode}
                isStandalone={true}
              />
            </div>
          )}

          {/* SEO Directory and XML Sitemap Explorer */}
          {currentPage === 'seo-directory' && (
            <div className="space-y-6">
              <Breadcrumbs
                items={breadcrumbs}
                currentLang={currentLang}
                onNavigate={handleNavigateUrl}
              />
              <SeoDirectoryPage
                currentLang={currentLang}
                onNavigatePage={(pageType, serviceId, cityId, guideId) => {
                  if (serviceId && cityId) {
                    const s = SERVICES.find((item) => item.id === serviceId);
                    if (s) setSelectedService(s);
                    const c = CITIES.find((item) => item.id === cityId);
                    if (c) setSelectedCity(c);
                    handleNavigateUrl(`#/services/${s?.slugs.en || serviceId}/${cityId}`);
                  } else if (serviceId) {
                    const s = SERVICES.find((item) => item.id === serviceId);
                    if (s) setSelectedService(s);
                    handleNavigateUrl(`#/services/${s?.slugs.en || serviceId}`);
                  } else if (cityId) {
                    const c = CITIES.find((item) => item.id === cityId);
                    if (c) setSelectedCity(c);
                    handleNavigateUrl(`#/locations/${cityId}`);
                  } else if (guideId) {
                    const g = GUIDES.find((item) => item.id === guideId);
                    if (g) setSelectedGuide(g);
                    handleNavigateUrl(`#/guides/${g?.slugs.en || guideId}`);
                  } else {
                    navigateTo(pageType as PageRoute);
                  }
                }}
                onRequestQuote={() => navigateTo('quote')}
              />
            </div>
          )}

          {/* Technical SEO Audit */}
          {currentPage === 'seo-analysis' && (
            <div className="space-y-6">
              <Breadcrumbs
                items={breadcrumbs}
                currentLang={currentLang}
                onNavigate={handleNavigateUrl}
              />
              <TechnicalSeoAuditPage
                currentLang={currentLang}
                onNavigateToPage={(path, serviceId, cityId) => {
                  if (serviceId && cityId) {
                    const s = SERVICES.find((item) => item.id === serviceId);
                    if (s) setSelectedService(s);
                    const c = CITIES.find((item) => item.id === cityId);
                    if (c) setSelectedCity(c);
                    handleNavigateUrl(`#/services/${s?.slugs.en || serviceId}/${cityId}`);
                  } else if (serviceId) {
                    const s = SERVICES.find((item) => item.id === serviceId);
                    if (s) setSelectedService(s);
                    handleNavigateUrl(`#/services/${s?.slugs.en || serviceId}`);
                  } else if (cityId) {
                    const c = CITIES.find((item) => item.id === cityId);
                    if (c) setSelectedCity(c);
                    handleNavigateUrl(`#/locations/${cityId}`);
                  } else {
                    handleNavigateUrl('#/services');
                  }
                }}
                onRequestQuote={() => navigateTo('quote')}
              />
            </div>
          )}

          {/* 404 Page Not Found */}
          {currentPage === 'not-found' && (
            <div className="space-y-6">
              <Breadcrumbs
                items={breadcrumbs}
                currentLang={currentLang}
                onNavigate={handleNavigateUrl}
              />
              <NotFoundPage
                currentLang={currentLang}
                requestedPath={currentRoute.canonicalPath}
                onNavigateHome={() => handleNavigateUrl('#/')}
                onNavigate={handleNavigateUrl}
                onOpenSearch={() => setIsOpenLocationModal(true)}
              />
            </div>
          )}
        </main>

        {/* Global Footer */}
        <Footer
          currentLang={currentLang}
          onNavigate={(pageId, serviceId, cityId) => {
            if (serviceId && cityId) {
              const s = SERVICES.find((item) => item.id === serviceId);
              if (s) setSelectedService(s);
              handleNavigateUrl(`#/services/${s?.slugs.en || serviceId}/${cityId}`);
            } else if (serviceId) {
              const s = SERVICES.find((item) => item.id === serviceId);
              if (s) setSelectedService(s);
              handleNavigateUrl(`#/services/${s?.slugs.en || serviceId}`);
            } else if (cityId) {
              const c = CITIES.find((item) => item.id === cityId);
              if (c) setSelectedCity(c);
              handleNavigateUrl(`#/locations/${cityId}`);
            } else if (pageId === 'areas') {
              handleNavigateUrl('#/locations');
            } else if (pageId === 'services') {
              handleNavigateUrl('#/services');
            } else {
              navigateTo(pageId as PageRoute);
            }
          }}
          onOpenDirectory={() => setIsOpenDirectory(true)}
        />
      </div>

      {/* Sticky Mobile CTA Strip */}
      <div className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-between border-t border-[#183c56] bg-[#10263d] px-4 py-3 text-white shadow-lg lg:hidden">
        <div>
          <span className="block text-[10.5px] font-[750] uppercase tracking-[1.55px] text-[#9ddbd1]">
            {selectedNeighborhood ? selectedNeighborhood.names[currentLang] : t.hero.pill1}
          </span>
          <span className="text-sm font-bold text-white font-mono">{t.pricing.models.hourly.price}</span>
        </div>
        <button
          onClick={() => {
            if (selectedService && selectedNeighborhood) {
              const url = buildHierarchyUrl({
                service: selectedService,
                city: selectedNeighborhood.cityId,
                neighborhood: selectedNeighborhood,
                isBooking: true,
              });
              handleNavigateUrl(url.hashPath);
            } else {
              handleNavigateUrl('#/booking');
            }
          }}
          className="flex items-center gap-1.5 min-h-[45px] rounded-xl bg-[#ff8d43] px-5 py-2.5 text-[13.5px] font-[750] text-[#10263d] hover:bg-[#ff9b59] transition-colors shadow-sm"
        >
          <span>{t.nav.booking}</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Floating WhatsApp Chat Button */}
      <WhatsAppButton currentLang={currentLang} />

      {/* Smart Location Search Modal with Geolocation and Postal Code Directory */}
      <LocationSearchModal
        isOpen={isOpenLocationModal}
        onClose={() => setIsOpenLocationModal(false)}
        currentLang={currentLang}
        selectedNeighborhood={selectedNeighborhood}
        onSelectNeighborhood={handleSelectNeighborhood}
        onSelectCityOnly={(cId) => handleSelectCity(cId)}
      />

      {/* All Pages Directory Modal */}
      <AllPagesModal
        isOpen={isOpenDirectory}
        onClose={() => setIsOpenDirectory(false)}
        currentLang={currentLang}
        onSelectLanguage={handleLanguageChange}
        onSelectRoute={handleSelectRouteFromDirectory}
      />
    </div>
  );
}
