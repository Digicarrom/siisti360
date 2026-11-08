import { Language, SERVICES, CITIES, GUIDES, ServiceInfo, CityInfo, GuideInfo } from '../data/content';
import { NEIGHBORHOODS, FINNISH_POSTAL_CODES, NeighborhoodInfo, PostalCodeEntry } from '../data/locations';

export interface BreadcrumbItem {
  label: string;
  url: string;
  isCurrent?: boolean;
}

export type RouteType =
  | 'home'
  | 'locations-hub'
  | 'city'
  | 'neighborhood'
  | 'postal'
  | 'services-hub'
  | 'service'
  | 'service-city'
  | 'service-city-neighborhood'
  | 'booking'
  | 'pricing'
  | 'calculator'
  | 'compare'
  | 'why'
  | 'story'
  | 'guides-hub'
  | 'guide'
  | 'reviews'
  | 'about'
  | 'contact'
  | 'faq'
  | 'quote'
  | 'sitemap'
  | 'seo-analysis'
  | 'not-found';

export interface ParsedRoute {
  type: RouteType;
  canonicalPath: string;
  hashPath: string;
  service?: ServiceInfo;
  city?: CityInfo;
  neighborhood?: NeighborhoodInfo;
  postalCode?: string;
  postalEntry?: PostalCodeEntry;
  guide?: GuideInfo;
  isBooking?: boolean;
  isValid: boolean;
  rawSegments: string[];
}

/**
 * Normalizes a URL slug (lowercase, trimmed, strip trailing slashes, replace spaces with hyphens)
 */
export function normalizeSlug(slug: string): string {
  return slug
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-äöå]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Find service by slug or id across all languages
 */
export function resolveService(slugOrId: string): ServiceInfo | undefined {
  const norm = normalizeSlug(slugOrId);
  return SERVICES.find(
    (s) =>
      s.id.toLowerCase() === norm ||
      s.slugs.fi.toLowerCase() === norm ||
      s.slugs.en.toLowerCase() === norm ||
      s.slugs.sv.toLowerCase() === norm
  );
}

/**
 * Find city by slug or id across all languages
 */
export function resolveCity(slugOrId: string): CityInfo | undefined {
  const norm = normalizeSlug(slugOrId);
  return CITIES.find(
    (c) =>
      c.id.toLowerCase() === norm ||
      c.slugs.fi.toLowerCase() === norm ||
      c.slugs.en.toLowerCase() === norm ||
      c.slugs.sv.toLowerCase() === norm
  );
}

/**
 * Find neighborhood by slug or id across all languages
 */
export function resolveNeighborhood(slugOrId: string, cityId?: string): NeighborhoodInfo | undefined {
  const norm = normalizeSlug(slugOrId);
  const match = Object.values(NEIGHBORHOODS).find((n) => {
    const slugMatch =
      n.id.toLowerCase() === norm ||
      n.slug.toLowerCase() === norm ||
      n.names.fi.toLowerCase() === norm ||
      n.names.en.toLowerCase() === norm ||
      n.names.sv.toLowerCase() === norm;
    if (cityId) {
      return slugMatch && n.cityId === cityId;
    }
    return slugMatch;
  });
  return match;
}

/**
 * Parse an incoming URL pathname or hash into a fully typed route
 */
export function parseRoute(inputPathOrHash: string): ParsedRoute {
  let clean = inputPathOrHash.trim();
  // Strip origin or domain if present
  clean = clean.replace(/^https?:\/\/[^/]+/i, '');
  // Strip leading hash
  clean = clean.replace(/^#\/?/, '/');
  // Strip query parameters
  clean = clean.split('?')[0];
  // Ensure starts with '/'
  if (!clean.startsWith('/')) clean = '/' + clean;
  // Remove trailing slashes
  clean = clean.replace(/\/+$/, '');
  if (!clean) clean = '/';

  const segments = clean.split('/').filter(Boolean);

  // Default Home
  if (
    segments.length === 0 ||
    clean === '/' ||
    ['home', 'etusivu', 'hem', 'index', 'index.html'].includes(clean.replace(/^\//, '').toLowerCase())
  ) {
    return {
      type: 'home',
      canonicalPath: '/',
      hashPath: '#/',
      isValid: true,
      rawSegments: [],
    };
  }

  // Check language prefix if present (fi, en, sv)
  let langPrefix = '';
  let activeSegments = [...segments];
  if (['fi', 'en', 'sv'].includes(segments[0])) {
    langPrefix = segments[0];
    activeSegments = segments.slice(1);
  }

  if (
    activeSegments.length === 0 ||
    (activeSegments.length === 1 &&
      ['home', 'etusivu', 'hem', 'index', 'index.html'].includes(activeSegments[0].toLowerCase()))
  ) {
    return {
      type: 'home',
      canonicalPath: langPrefix ? `/${langPrefix}/` : '/',
      hashPath: langPrefix ? `#/${langPrefix}` : '#/',
      isValid: true,
      rawSegments: segments,
    };
  }

  const root = activeSegments[0].toLowerCase();
  const seg1 = activeSegments[1]?.toLowerCase();
  const seg2 = activeSegments[2]?.toLowerCase();
  const seg3 = activeSegments[3]?.toLowerCase();

  // 1. LOCATIONS HIERARCHY
  // /locations/
  // /locations/[city]/
  // /locations/[city]/[neighborhood]/
  // /locations/postal/[code]/ OR /locations/[postalCode]/
  if (['locations', 'alueet', 'toimialueet', 'areas'].includes(root)) {
    if (activeSegments.length === 1) {
      return {
        type: 'locations-hub',
        canonicalPath: '/locations/',
        hashPath: '#/locations',
        isValid: true,
        rawSegments: segments,
      };
    }

    // Check if seg1 is "postal" or a 5-digit number
    if (seg1 === 'postal' && seg2) {
      const entry = FINNISH_POSTAL_CODES.find((p) => p.code === seg2);
      const neigh = entry ? NEIGHBORHOODS[entry.neighborhoodId] : undefined;
      const city = entry ? resolveCity(entry.cityId) : undefined;
      return {
        type: 'postal',
        canonicalPath: `/locations/postal/${seg2}/`,
        hashPath: `#/locations/postal/${seg2}`,
        postalCode: seg2,
        postalEntry: entry,
        neighborhood: neigh,
        city: city,
        isValid: true,
        rawSegments: segments,
      };
    }

    if (/^\d{5}$/.test(seg1)) {
      const entry = FINNISH_POSTAL_CODES.find((p) => p.code === seg1);
      const neigh = entry ? NEIGHBORHOODS[entry.neighborhoodId] : undefined;
      const city = entry ? resolveCity(entry.cityId) : undefined;
      return {
        type: 'postal',
        canonicalPath: `/locations/postal/${seg1}/`,
        hashPath: `#/locations/postal/${seg1}`,
        postalCode: seg1,
        postalEntry: entry,
        neighborhood: neigh,
        city: city,
        isValid: true,
        rawSegments: segments,
      };
    }

    // Check city
    const matchedCity = resolveCity(seg1);
    if (matchedCity) {
      if (activeSegments.length === 2) {
        return {
          type: 'city',
          canonicalPath: `/locations/${matchedCity.id}/`,
          hashPath: `#/locations/${matchedCity.id}`,
          city: matchedCity,
          isValid: true,
          rawSegments: segments,
        };
      }

      // Check neighborhood under this city
      const matchedNeigh = resolveNeighborhood(seg2, matchedCity.id) || resolveNeighborhood(seg2);
      if (matchedNeigh) {
        return {
          type: 'neighborhood',
          canonicalPath: `/locations/${matchedCity.id}/${matchedNeigh.slug}/`,
          hashPath: `#/locations/${matchedCity.id}/${matchedNeigh.slug}`,
          city: matchedCity,
          neighborhood: matchedNeigh,
          postalCode: matchedNeigh.postalCodes[0],
          isValid: true,
          rawSegments: segments,
        };
      }
    }

    // Direct neighborhood without city prefix under /locations/
    const directNeigh = resolveNeighborhood(seg1);
    if (directNeigh) {
      const city = resolveCity(directNeigh.cityId);
      return {
        type: 'neighborhood',
        canonicalPath: `/locations/${directNeigh.cityId}/${directNeigh.slug}/`,
        hashPath: `#/locations/${directNeigh.cityId}/${directNeigh.slug}`,
        city,
        neighborhood: directNeigh,
        postalCode: directNeigh.postalCodes[0],
        isValid: true,
        rawSegments: segments,
      };
    }
  }

  // 2. SERVICES HIERARCHY
  // /services/
  // /services/[service]/
  // /services/[service]/[city]/
  // /services/[service]/[city]/[neighborhood]/
  // /services/[service]/[city]/[neighborhood]/booking/
  // /services/[service]/booking/
  if (['services', 'palvelut', 'siivouspalvelut'].includes(root)) {
    if (activeSegments.length === 1) {
      return {
        type: 'services-hub',
        canonicalPath: '/services/',
        hashPath: '#/services',
        isValid: true,
        rawSegments: segments,
      };
    }

    const matchedService = resolveService(seg1);
    if (matchedService) {
      // /services/[service]/
      if (activeSegments.length === 2) {
        return {
          type: 'service',
          canonicalPath: `/services/${matchedService.slugs.en}/`,
          hashPath: `#/services/${matchedService.slugs.en}`,
          service: matchedService,
          isValid: true,
          rawSegments: segments,
        };
      }

      // Check if seg2 is 'booking' -> /services/[service]/booking/
      if (seg2 === 'booking' || seg2 === 'varaus') {
        return {
          type: 'booking',
          canonicalPath: `/services/${matchedService.slugs.en}/booking/`,
          hashPath: `#/services/${matchedService.slugs.en}/booking`,
          service: matchedService,
          isBooking: true,
          isValid: true,
          rawSegments: segments,
        };
      }

      // Check city: /services/[service]/[city]/
      const matchedCity = resolveCity(seg2);
      if (matchedCity) {
        if (activeSegments.length === 3) {
          return {
            type: 'service-city',
            canonicalPath: `/services/${matchedService.slugs.en}/${matchedCity.id}/`,
            hashPath: `#/services/${matchedService.slugs.en}/${matchedCity.id}`,
            service: matchedService,
            city: matchedCity,
            isValid: true,
            rawSegments: segments,
          };
        }

        // seg3 is neighborhood or booking
        if (seg3 === 'booking' || seg3 === 'varaus') {
          return {
            type: 'booking',
            canonicalPath: `/services/${matchedService.slugs.en}/${matchedCity.id}/booking/`,
            hashPath: `#/services/${matchedService.slugs.en}/${matchedCity.id}/booking`,
            service: matchedService,
            city: matchedCity,
            isBooking: true,
            isValid: true,
            rawSegments: segments,
          };
        }

        const matchedNeigh = resolveNeighborhood(seg3, matchedCity.id) || resolveNeighborhood(seg3);
        if (matchedNeigh) {
          // Check if 4th segment is booking: /services/[service]/[city]/[neighborhood]/booking/
          const seg4 = activeSegments[4]?.toLowerCase();
          if (seg4 === 'booking' || seg4 === 'varaus') {
            return {
              type: 'booking',
              canonicalPath: `/services/${matchedService.slugs.en}/${matchedCity.id}/${matchedNeigh.slug}/booking/`,
              hashPath: `#/services/${matchedService.slugs.en}/${matchedCity.id}/${matchedNeigh.slug}/booking`,
              service: matchedService,
              city: matchedCity,
              neighborhood: matchedNeigh,
              postalCode: matchedNeigh.postalCodes[0],
              isBooking: true,
              isValid: true,
              rawSegments: segments,
            };
          }

          return {
            type: 'service-city-neighborhood',
            canonicalPath: `/services/${matchedService.slugs.en}/${matchedCity.id}/${matchedNeigh.slug}/`,
            hashPath: `#/services/${matchedService.slugs.en}/${matchedCity.id}/${matchedNeigh.slug}`,
            service: matchedService,
            city: matchedCity,
            neighborhood: matchedNeigh,
            postalCode: matchedNeigh.postalCodes[0],
            isValid: true,
            rawSegments: segments,
          };
        }
      }

      // Direct neighborhood after service: /services/[service]/[neighborhood]/
      const directNeigh = resolveNeighborhood(seg2);
      if (directNeigh) {
        const city = resolveCity(directNeigh.cityId);
        return {
          type: 'service-city-neighborhood',
          canonicalPath: `/services/${matchedService.slugs.en}/${directNeigh.cityId}/${directNeigh.slug}/`,
          hashPath: `#/services/${matchedService.slugs.en}/${directNeigh.cityId}/${directNeigh.slug}`,
          service: matchedService,
          city,
          neighborhood: directNeigh,
          postalCode: directNeigh.postalCodes[0],
          isValid: true,
          rawSegments: segments,
        };
      }
    }
  }

  // 3. DIRECT SERVICE ROOT SHORTCUTS (e.g. /deep-cleaning/, /home-cleaning/, /sofa-cleaning/)
  const directService = resolveService(root);
  if (directService) {
    if (activeSegments.length === 1) {
      return {
        type: 'service',
        canonicalPath: `/services/${directService.slugs.en}/`,
        hashPath: `#/services/${directService.slugs.en}`,
        service: directService,
        isValid: true,
        rawSegments: segments,
      };
    }
    const c = resolveCity(seg1);
    if (c) {
      if (activeSegments.length === 2) {
        return {
          type: 'service-city',
          canonicalPath: `/services/${directService.slugs.en}/${c.id}/`,
          hashPath: `#/services/${directService.slugs.en}/${c.id}`,
          service: directService,
          city: c,
          isValid: true,
          rawSegments: segments,
        };
      }
      const n = resolveNeighborhood(seg2, c.id);
      if (n) {
        return {
          type: 'service-city-neighborhood',
          canonicalPath: `/services/${directService.slugs.en}/${c.id}/${n.slug}/`,
          hashPath: `#/services/${directService.slugs.en}/${c.id}/${n.slug}`,
          service: directService,
          city: c,
          neighborhood: n,
          postalCode: n.postalCodes[0],
          isValid: true,
          rawSegments: segments,
        };
      }
    }
  }

  // 4. BOOKING DIRECT ROUTE
  if (root === 'booking' || root === 'varaus') {
    return {
      type: 'booking',
      canonicalPath: '/booking/',
      hashPath: '#/booking',
      isBooking: true,
      isValid: true,
      rawSegments: segments,
    };
  }

  // 5. GUIDES / BLOG HIERARCHY
  if (['guides', 'blog', 'oppaat', 'vinkit'].includes(root)) {
    if (activeSegments.length === 1) {
      return {
        type: 'guides-hub',
        canonicalPath: '/guides/',
        hashPath: '#/guides',
        isValid: true,
        rawSegments: segments,
      };
    }
    const matchedGuide = GUIDES.find(
      (g) =>
        g.id.toLowerCase() === seg1 ||
        g.slugs.fi.toLowerCase() === seg1 ||
        g.slugs.en.toLowerCase() === seg1 ||
        g.slugs.sv.toLowerCase() === seg1
    );
    if (matchedGuide) {
      return {
        type: 'guide',
        canonicalPath: `/guides/${matchedGuide.slugs.en}/`,
        hashPath: `#/guides/${matchedGuide.slugs.en}`,
        guide: matchedGuide,
        isValid: true,
        rawSegments: segments,
      };
    }
  }

  // 6. STANDARD STATIC ROUTES
  const staticMap: Record<string, { type: RouteType; canonical: string; hash: string }> = {
    home: { type: 'home', canonical: '/', hash: '#/' },
    etusivu: { type: 'home', canonical: '/', hash: '#/' },
    hem: { type: 'home', canonical: '/', hash: '#/' },
    index: { type: 'home', canonical: '/', hash: '#/' },
    'index.html': { type: 'home', canonical: '/', hash: '#/' },

    areas: { type: 'locations-hub', canonical: '/locations/', hash: '#/locations' },
    locations: { type: 'locations-hub', canonical: '/locations/', hash: '#/locations' },
    alueet: { type: 'locations-hub', canonical: '/locations/', hash: '#/locations' },
    toimialueet: { type: 'locations-hub', canonical: '/locations/', hash: '#/locations' },

    services: { type: 'services-hub', canonical: '/services/', hash: '#/services' },
    palvelut: { type: 'services-hub', canonical: '/services/', hash: '#/services' },
    siivouspalvelut: { type: 'services-hub', canonical: '/services/', hash: '#/services' },

    pricing: { type: 'pricing', canonical: '/pricing/', hash: '#/pricing' },
    hinnasto: { type: 'pricing', canonical: '/pricing/', hash: '#/pricing' },
    prices: { type: 'pricing', canonical: '/pricing/', hash: '#/pricing' },
    priser: { type: 'pricing', canonical: '/pricing/', hash: '#/pricing' },

    calculator: { type: 'calculator', canonical: '/calculator/', hash: '#/calculator' },
    hintalaskuri: { type: 'calculator', canonical: '/calculator/', hash: '#/calculator' },
    laskuri: { type: 'calculator', canonical: '/calculator/', hash: '#/calculator' },
    kalkylator: { type: 'calculator', canonical: '/calculator/', hash: '#/calculator' },

    compare: { type: 'compare', canonical: '/compare/', hash: '#/compare' },
    vertaa: { type: 'compare', canonical: '/compare/', hash: '#/compare' },
    hintavertailu: { type: 'compare', canonical: '/compare/', hash: '#/compare' },
    'jamfor': { type: 'compare', canonical: '/compare/', hash: '#/compare' },

    why: { type: 'why', canonical: '/why/', hash: '#/why' },
    'why-us': { type: 'why', canonical: '/why/', hash: '#/why' },
    'miksi-me': { type: 'why', canonical: '/why/', hash: '#/why' },
    'miksi-siisti360': { type: 'why', canonical: '/why/', hash: '#/why' },
    'miksi-valita-meidat': { type: 'why', canonical: '/why/', hash: '#/why' },

    story: { type: 'story', canonical: '/story/', hash: '#/story' },
    tarina: { type: 'story', canonical: '/story/', hash: '#/story' },
    tarinamme: { type: 'story', canonical: '/story/', hash: '#/story' },
    'our-story': { type: 'story', canonical: '/story/', hash: '#/story' },
    historia: { type: 'story', canonical: '/story/', hash: '#/story' },

    reviews: { type: 'reviews', canonical: '/reviews/', hash: '#/reviews' },
    arvostelut: { type: 'reviews', canonical: '/reviews/', hash: '#/reviews' },
    kokemuksia: { type: 'reviews', canonical: '/reviews/', hash: '#/reviews' },
    recensioner: { type: 'reviews', canonical: '/reviews/', hash: '#/reviews' },

    about: { type: 'about', canonical: '/about/', hash: '#/about' },
    meista: { type: 'about', canonical: '/about/', hash: '#/about' },
    'meistä': { type: 'about', canonical: '/about/', hash: '#/about' },
    'om-oss': { type: 'about', canonical: '/about/', hash: '#/about' },

    contact: { type: 'contact', canonical: '/contact/', hash: '#/contact' },
    yhteystiedot: { type: 'contact', canonical: '/contact/', hash: '#/contact' },
    kontakt: { type: 'contact', canonical: '/contact/', hash: '#/contact' },

    faq: { type: 'faq', canonical: '/faq/', hash: '#/faq' },
    ukk: { type: 'faq', canonical: '/faq/', hash: '#/faq' },
    'usein-kysyttya': { type: 'faq', canonical: '/faq/', hash: '#/faq' },

    quote: { type: 'quote', canonical: '/quote/', hash: '#/quote' },
    tarjous: { type: 'quote', canonical: '/quote/', hash: '#/quote' },
    tarjouspyynto: { type: 'quote', canonical: '/quote/', hash: '#/quote' },
    'tarjouspyyntö': { type: 'quote', canonical: '/quote/', hash: '#/quote' },
    offert: { type: 'quote', canonical: '/quote/', hash: '#/quote' },

    sitemap: { type: 'sitemap', canonical: '/sitemap/', hash: '#/sitemap' },
    sivukartta: { type: 'sitemap', canonical: '/sitemap/', hash: '#/sitemap' },
    'seo-directory': { type: 'sitemap', canonical: '/sitemap/', hash: '#/sitemap' },
    'sitemap.xml': { type: 'sitemap', canonical: '/sitemap/', hash: '#/sitemap' },

    'seo-audit': { type: 'seo-analysis', canonical: '/seo-audit/', hash: '#/seo-audit' },
    'seo-analysis': { type: 'seo-analysis', canonical: '/seo-audit/', hash: '#/seo-audit' },
    'technical-seo': { type: 'seo-analysis', canonical: '/seo-audit/', hash: '#/seo-audit' },
  };

  if (staticMap[root]) {
    const s = staticMap[root];
    return {
      type: s.type,
      canonicalPath: s.canonical,
      hashPath: s.hash,
      isValid: true,
      rawSegments: segments,
    };
  }

  // Not matched -> Not Found
  return {
    type: 'not-found',
    canonicalPath: clean,
    hashPath: `#/not-found?path=${encodeURIComponent(clean)}`,
    isValid: false,
    rawSegments: segments,
  };
}

/**
 * Builds the canonical path and hash URL for any combination of Service + City + Neighborhood + Booking
 */
export function buildHierarchyUrl(params: {
  service?: ServiceInfo | string;
  city?: CityInfo | string;
  neighborhood?: NeighborhoodInfo | string;
  postalCode?: string;
  isBooking?: boolean;
}): { canonicalPath: string; hashPath: string } {
  const serviceObj = typeof params.service === 'string' ? resolveService(params.service) : params.service;
  const cityObj = typeof params.city === 'string' ? resolveCity(params.city) : params.city;
  const neighObj =
    typeof params.neighborhood === 'string'
      ? resolveNeighborhood(params.neighborhood, cityObj?.id)
      : params.neighborhood;

  // 1. Service + City + Neighborhood (+ Booking)
  if (serviceObj && cityObj && neighObj) {
    const base = `/services/${serviceObj.slugs.en}/${cityObj.id}/${neighObj.slug}`;
    if (params.isBooking) {
      return {
        canonicalPath: `${base}/booking/`,
        hashPath: `#${base}/booking`,
      };
    }
    return {
      canonicalPath: `${base}/`,
      hashPath: `#${base}`,
    };
  }

  // 2. Service + City (+ Booking)
  if (serviceObj && cityObj) {
    const base = `/services/${serviceObj.slugs.en}/${cityObj.id}`;
    if (params.isBooking) {
      return {
        canonicalPath: `${base}/booking/`,
        hashPath: `#${base}/booking`,
      };
    }
    return {
      canonicalPath: `${base}/`,
      hashPath: `#${base}`,
    };
  }

  // 3. Service only (+ Booking)
  if (serviceObj) {
    const base = `/services/${serviceObj.slugs.en}`;
    if (params.isBooking) {
      return {
        canonicalPath: `${base}/booking/`,
        hashPath: `#${base}/booking`,
      };
    }
    return {
      canonicalPath: `${base}/`,
      hashPath: `#${base}`,
    };
  }

  // 4. City + Neighborhood
  if (cityObj && neighObj) {
    const base = `/locations/${cityObj.id}/${neighObj.slug}`;
    return {
      canonicalPath: `${base}/`,
      hashPath: `#${base}`,
    };
  }

  // 5. Postal code direct
  if (params.postalCode) {
    return {
      canonicalPath: `/locations/postal/${params.postalCode}/`,
      hashPath: `#/locations/postal/${params.postalCode}`,
    };
  }

  // 6. City only
  if (cityObj) {
    return {
      canonicalPath: `/locations/${cityObj.id}/`,
      hashPath: `#/locations/${cityObj.id}`,
    };
  }

  // 7. General Booking
  if (params.isBooking) {
    return {
      canonicalPath: '/booking/',
      hashPath: '#/booking',
    };
  }

  return {
    canonicalPath: '/',
    hashPath: '#/',
  };
}

/**
 * Generates dynamic breadcrumbs reflecting the exact user hierarchy
 */
export function generateBreadcrumbs(route: ParsedRoute, lang: Language): BreadcrumbItem[] {
  const t = {
    home: lang === 'fi' ? 'Etusivu' : lang === 'sv' ? 'Hem' : 'Home',
    locations: lang === 'fi' ? 'Toimialueet' : lang === 'sv' ? 'Områden' : 'Locations',
    services: lang === 'fi' ? 'Palvelut' : lang === 'sv' ? 'Tjänster' : 'Services',
    booking: lang === 'fi' ? 'Varaus' : lang === 'sv' ? 'Bokning' : 'Booking',
    pricing: lang === 'fi' ? 'Hinnasto' : lang === 'sv' ? 'Priser' : 'Pricing',
    calculator: lang === 'fi' ? 'Hintalaskuri' : lang === 'sv' ? 'Priskalkylator' : 'Calculator',
    guides: lang === 'fi' ? 'Oppaat' : lang === 'sv' ? 'Guider' : 'Guides',
    reviews: lang === 'fi' ? 'Arvostelut' : lang === 'sv' ? 'Omdömen' : 'Reviews',
    about: lang === 'fi' ? 'Meistä' : lang === 'sv' ? 'Om oss' : 'About',
    contact: lang === 'fi' ? 'Yhteystiedot' : lang === 'sv' ? 'Kontakt' : 'Contact',
    faq: lang === 'fi' ? 'Usein kysyttyä' : lang === 'sv' ? 'FAQ' : 'FAQ',
    quote: lang === 'fi' ? 'Tarjouspyyntö' : lang === 'sv' ? 'Offertförfrågan' : 'Get a Quote',
    sitemap: lang === 'fi' ? 'Sivukartta' : lang === 'sv' ? 'Webbplatskarta' : 'Sitemap',
    seoAudit: lang === 'fi' ? 'SEO-Auditointi' : lang === 'sv' ? 'SEO-Granskning' : 'SEO Audit',
    notFound: lang === 'fi' ? 'Sivua ei löydy' : lang === 'sv' ? 'Sidan hittades inte' : 'Page Not Found',
  };

  const breadcrumbs: BreadcrumbItem[] = [
    { label: t.home, url: '#/' },
  ];

  switch (route.type) {
    case 'home':
      breadcrumbs[0].isCurrent = true;
      return breadcrumbs;

    case 'locations-hub':
      breadcrumbs.push({ label: t.locations, url: '#/locations', isCurrent: true });
      return breadcrumbs;

    case 'city':
      breadcrumbs.push({ label: t.locations, url: '#/locations' });
      if (route.city) {
        breadcrumbs.push({
          label: route.city.names[lang],
          url: `#/locations/${route.city.id}`,
          isCurrent: true,
        });
      }
      return breadcrumbs;

    case 'neighborhood':
      breadcrumbs.push({ label: t.locations, url: '#/locations' });
      if (route.city) {
        breadcrumbs.push({
          label: route.city.names[lang],
          url: `#/locations/${route.city.id}`,
        });
      }
      if (route.neighborhood) {
        breadcrumbs.push({
          label: route.neighborhood.names[lang],
          url: `#/locations/${route.neighborhood.cityId}/${route.neighborhood.slug}`,
          isCurrent: true,
        });
      }
      return breadcrumbs;

    case 'postal':
      breadcrumbs.push({ label: t.locations, url: '#/locations' });
      if (route.city) {
        breadcrumbs.push({
          label: route.city.names[lang],
          url: `#/locations/${route.city.id}`,
        });
      }
      if (route.neighborhood) {
        breadcrumbs.push({
          label: `${route.neighborhood.names[lang]} (${route.postalCode})`,
          url: `#/locations/postal/${route.postalCode}`,
          isCurrent: true,
        });
      } else {
        breadcrumbs.push({
          label: `${lang === 'fi' ? 'Postinumero' : 'Postal code'} ${route.postalCode}`,
          url: `#/locations/postal/${route.postalCode}`,
          isCurrent: true,
        });
      }
      return breadcrumbs;

    case 'services-hub':
      breadcrumbs.push({ label: t.services, url: '#/services', isCurrent: true });
      return breadcrumbs;

    case 'service':
      breadcrumbs.push({ label: t.services, url: '#/services' });
      if (route.service) {
        breadcrumbs.push({
          label: route.service.names[lang],
          url: `#/services/${route.service.slugs.en}`,
          isCurrent: true,
        });
      }
      return breadcrumbs;

    case 'service-city':
      breadcrumbs.push({ label: t.services, url: '#/services' });
      if (route.service) {
        breadcrumbs.push({
          label: route.service.names[lang],
          url: `#/services/${route.service.slugs.en}`,
        });
      }
      if (route.city) {
        breadcrumbs.push({
          label: route.city.names[lang],
          url: `#/services/${route.service?.slugs.en}/${route.city.id}`,
          isCurrent: true,
        });
      }
      return breadcrumbs;

    case 'service-city-neighborhood':
      breadcrumbs.push({ label: t.services, url: '#/services' });
      if (route.service) {
        breadcrumbs.push({
          label: route.service.names[lang],
          url: `#/services/${route.service.slugs.en}`,
        });
      }
      if (route.city) {
        breadcrumbs.push({
          label: route.city.names[lang],
          url: `#/services/${route.service?.slugs.en}/${route.city.id}`,
        });
      }
      if (route.neighborhood) {
        breadcrumbs.push({
          label: route.neighborhood.names[lang],
          url: `#/services/${route.service?.slugs.en}/${route.city?.id}/${route.neighborhood.slug}`,
          isCurrent: true,
        });
      }
      return breadcrumbs;

    case 'booking':
      // Hierarchical booking breadcrumb
      // e.g. Home > Services > Deep Cleaning > Helsinki > Ruoholahti > Booking
      if (route.service) {
        breadcrumbs.push({ label: t.services, url: '#/services' });
        breadcrumbs.push({
          label: route.service.names[lang],
          url: `#/services/${route.service.slugs.en}`,
        });
        if (route.city) {
          breadcrumbs.push({
            label: route.city.names[lang],
            url: `#/services/${route.service.slugs.en}/${route.city.id}`,
          });
        }
        if (route.neighborhood) {
          breadcrumbs.push({
            label: route.neighborhood.names[lang],
            url: `#/services/${route.service.slugs.en}/${route.city?.id}/${route.neighborhood.slug}`,
          });
        }
        breadcrumbs.push({
          label: t.booking,
          url: route.hashPath,
          isCurrent: true,
        });
      } else {
        breadcrumbs.push({ label: t.booking, url: '#/booking', isCurrent: true });
      }
      return breadcrumbs;

    case 'guides-hub':
      breadcrumbs.push({ label: t.guides, url: '#/guides', isCurrent: true });
      return breadcrumbs;

    case 'guide':
      breadcrumbs.push({ label: t.guides, url: '#/guides' });
      if (route.guide) {
        breadcrumbs.push({
          label: route.guide.titles[lang],
          url: `#/guides/${route.guide.slugs.en}`,
          isCurrent: true,
        });
      }
      return breadcrumbs;

    case 'pricing':
      breadcrumbs.push({ label: t.pricing, url: '#/pricing', isCurrent: true });
      return breadcrumbs;

    case 'calculator':
      breadcrumbs.push({ label: t.calculator, url: '#/calculator', isCurrent: true });
      return breadcrumbs;

    case 'compare':
      breadcrumbs.push({
        label: lang === 'fi' ? 'Hintavertailu' : lang === 'sv' ? 'Prisjämförelse' : 'Compare Prices',
        url: '#/compare',
        isCurrent: true,
      });
      return breadcrumbs;

    case 'why':
      breadcrumbs.push({
        label: lang === 'fi' ? 'Miksi Siisti360' : lang === 'sv' ? 'Varför Siisti360' : 'Why Choose Us',
        url: '#/why',
        isCurrent: true,
      });
      return breadcrumbs;

    case 'story':
      breadcrumbs.push({
        label: lang === 'fi' ? 'Tarinamme' : lang === 'sv' ? 'Vår berättelse' : 'Our Story',
        url: '#/story',
        isCurrent: true,
      });
      return breadcrumbs;

    case 'reviews':
      breadcrumbs.push({ label: t.reviews, url: '#/reviews', isCurrent: true });
      return breadcrumbs;

    case 'about':
      breadcrumbs.push({ label: t.about, url: '#/about', isCurrent: true });
      return breadcrumbs;

    case 'contact':
      breadcrumbs.push({ label: t.contact, url: '#/contact', isCurrent: true });
      return breadcrumbs;

    case 'faq':
      breadcrumbs.push({ label: t.faq, url: '#/faq', isCurrent: true });
      return breadcrumbs;

    case 'quote':
      breadcrumbs.push({ label: t.quote, url: '#/quote', isCurrent: true });
      return breadcrumbs;

    case 'sitemap':
      breadcrumbs.push({ label: t.sitemap, url: '#/sitemap', isCurrent: true });
      return breadcrumbs;

    case 'seo-analysis':
      breadcrumbs.push({ label: t.seoAudit, url: '#/seo-audit', isCurrent: true });
      return breadcrumbs;

    case 'not-found':
    default:
      breadcrumbs.push({ label: t.notFound, url: route.hashPath, isCurrent: true });
      return breadcrumbs;
  }
}

/**
 * Builds Schema.org JSON-LD BreadcrumbList object
 */
export function buildBreadcrumbSchema(items: BreadcrumbItem[], siteBaseUrl = 'https://example.fi') {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => {
      // Clean hash to canonical absolute url
      let path = item.url.replace(/^#\/?/, '/');
      if (!path.startsWith('/')) path = '/' + path;
      if (!path.endsWith('/') && !path.includes('.')) path = path + '/';
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
        item: `${siteBaseUrl}${path}`,
      };
    }),
  };
}
