import rawSeoPages from './seoPages.json';
import { Language } from './content';

export interface SeoPage {
  id: string;
  language: Language;
  pageType: string;
  path: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  seoTitle: string;
  metaDescription: string;
  h1: string;
  canonicalUrl: string;
}

export const SEO_PAGES: SeoPage[] = rawSeoPages as SeoPage[];

/**
 * Filter pages by language
 */
export function getSeoPagesByLanguage(lang: Language): SeoPage[] {
  return SEO_PAGES.filter((p) => p.language === lang);
}

/**
 * Filter pages by type
 */
export function getSeoPagesByType(pageType: string, lang?: Language): SeoPage[] {
  return SEO_PAGES.filter((p) => {
    const matchesType = p.pageType === pageType;
    return lang ? matchesType && p.language === lang : matchesType;
  });
}

/**
 * Lookup matching SEO metadata for any route, service, or city combination
 */
export function findSeoMetadata(params: {
  pageType: string;
  language: Language;
  serviceSlug?: string;
  citySlug?: string;
}): SeoPage | undefined {
  const { pageType, language, serviceSlug, citySlug } = params;

  // 1. Service x City local combination
  if (serviceSlug && citySlug) {
    const match = SEO_PAGES.find(
      (p) =>
        p.language === language &&
        p.pageType === 'serviceCity' &&
        p.path.toLowerCase().includes(`/${serviceSlug.toLowerCase()}/${citySlug.toLowerCase()}/`)
    );
    if (match) return match;
  }

  // 2. Individual Service
  if (serviceSlug) {
    const match = SEO_PAGES.find(
      (p) =>
        p.language === language &&
        p.pageType === 'service' &&
        p.path.toLowerCase().includes(`/${serviceSlug.toLowerCase()}/`)
    );
    if (match) return match;
  }

  // 3. City Hub (matches pageType 'city' in seoPages.json)
  if (citySlug) {
    const match = SEO_PAGES.find(
      (p) =>
        p.language === language &&
        (p.pageType === 'city' || p.pageType === 'areas') &&
        p.path.toLowerCase().includes(`/${citySlug.toLowerCase()}/`)
    );
    if (match) return match;
  }

  // 4. Guide / Blog lookup
  if (pageType === 'guide' && serviceSlug) {
    const match = SEO_PAGES.find(
      (p) =>
        p.language === language &&
        p.pageType === 'guide' &&
        p.path.toLowerCase().includes(`/${serviceSlug.toLowerCase()}/`)
    );
    if (match) return match;
  }

  // 5. Core page type match (map route aliases)
  const mappedType = pageType === 'guides' ? 'blog' : pageType;
  return (
    SEO_PAGES.find((p) => p.language === language && p.pageType === mappedType) ||
    SEO_PAGES.find((p) => p.language === language && p.pageType === pageType)
  );
}

/**
 * Update Document Head (Title, Meta, OpenGraph, Canonical, and Schema.org JSON-LD)
 */
export function applySeoMetadataToHead(seo: SeoPage, siteBaseUrl = 'https://example.fi') {
  if (typeof document === 'undefined') return;

  // 1. Page Title
  document.title = seo.seoTitle;

  // 2. Meta description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', seo.metaDescription);

  // 3. OpenGraph tags
  const ogTags: Record<string, string> = {
    'og:title': seo.seoTitle,
    'og:description': seo.metaDescription,
    'og:type': 'website',
    'og:locale': seo.language === 'fi' ? 'fi_FI' : seo.language === 'sv' ? 'sv_SE' : 'en_US',
    'og:url': `${siteBaseUrl}${seo.path}`,
    'twitter:title': seo.seoTitle,
    'twitter:description': seo.metaDescription,
  };

  Object.entries(ogTags).forEach(([property, content]) => {
    let tag = document.querySelector(`meta[property="${property}"]`) || document.querySelector(`meta[name="${property}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute(property.startsWith('twitter:') ? 'name' : 'property', property);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  });

  // 4. Canonical link & Robots meta
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', `${siteBaseUrl}${seo.path}`);

  let robotsTag = document.querySelector('meta[name="robots"]');
  if (!robotsTag) {
    robotsTag = document.createElement('meta');
    robotsTag.setAttribute('name', 'robots');
    document.head.appendChild(robotsTag);
  }
  robotsTag.setAttribute('content', 'index, follow');

  // 5. Multilingual Hreflang alternates (Prevents duplicate content across languages)
  const pathParts = seo.path.split('/').filter(Boolean);
  const restOfPath = pathParts.slice(1).join('/');

  const fiMatch = SEO_PAGES.find(
    (p) => p.language === 'fi' && p.pageType === seo.pageType && (restOfPath ? p.path.endsWith(`/${restOfPath}/`) || p.path.includes(`/${restOfPath}/`) : p.path === '/fi/')
  );
  const svMatch = SEO_PAGES.find(
    (p) => p.language === 'sv' && p.pageType === seo.pageType && (restOfPath ? p.path.endsWith(`/${restOfPath}/`) || p.path.includes(`/${restOfPath}/`) : p.path === '/sv/')
  );
  const enMatch = SEO_PAGES.find(
    (p) => p.language === 'en' && p.pageType === seo.pageType && (restOfPath ? p.path.endsWith(`/${restOfPath}/`) || p.path.includes(`/${restOfPath}/`) : p.path === '/en/')
  );

  const fiUrl = `${siteBaseUrl}${fiMatch ? fiMatch.path : '/fi/'}`;
  const svUrl = `${siteBaseUrl}${svMatch ? svMatch.path : (fiMatch ? fiMatch.path.replace('/fi/', '/sv/') : '/sv/')}`;
  const enUrl = `${siteBaseUrl}${enMatch ? enMatch.path : (fiMatch ? fiMatch.path.replace('/fi/', '/en/') : '/en/')}`;

  const hreflangs = [
    { lang: 'fi', href: fiUrl },
    { lang: 'sv-FI', href: svUrl },
    { lang: 'en-FI', href: enUrl },
    { lang: 'x-default', href: fiUrl },
  ];

  hreflangs.forEach(({ lang, href }) => {
    let link = document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`);
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', lang);
      document.head.appendChild(link);
    }
    link.setAttribute('href', href);
  });

  // 5. Schema.org JSON-LD
  const schemaId = 'siisti360-seo-structured-data';
  let scriptTag = document.getElementById(schemaId) as HTMLScriptElement | null;
  if (!scriptTag) {
    scriptTag = document.createElement('script');
    scriptTag.id = schemaId;
    scriptTag.type = 'application/ld+json';
    document.head.appendChild(scriptTag);
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': `${siteBaseUrl}/#organization`,
        name: 'Siisti360',
        url: siteBaseUrl,
        logo: `${siteBaseUrl}/favicon.svg`,
        description: seo.metaDescription,
        telephone: '+358401234567',
        email: 'asiakaspalvelu@siisti360.fi',
        areaServed: [
          { '@type': 'City', name: 'Helsinki' },
          { '@type': 'City', name: 'Espoo' },
          { '@type': 'City', name: 'Vantaa' },
        ],
        priceRange: '€€',
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            opens: '08:00',
            closes: '20:00',
          },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': `${siteBaseUrl}${seo.path}`,
        url: `${siteBaseUrl}${seo.path}`,
        name: seo.seoTitle,
        description: seo.metaDescription,
        inLanguage: seo.language,
        isPartOf: { '@id': `${siteBaseUrl}/#website` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: seo.language === 'fi' ? 'Etusivu' : seo.language === 'sv' ? 'Startsida' : 'Home',
            item: `${siteBaseUrl}/${seo.language}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: seo.h1 || seo.primaryKeyword,
            item: `${siteBaseUrl}${seo.path}`,
          },
        ],
      },
    ],
  };

  scriptTag.textContent = JSON.stringify(structuredData);
}
