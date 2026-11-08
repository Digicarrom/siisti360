import test from 'node:test';
import assert from 'node:assert/strict';
import {
  parseRoute,
  buildHierarchyUrl,
  generateBreadcrumbs,
  buildBreadcrumbSchema,
} from '../src/utils/urlHierarchy.ts';

test('parseRoute correctly parses City URL hierarchy', () => {
  const parsedHelsinki = parseRoute('/locations/helsinki/');
  assert.equal(parsedHelsinki.type, 'city');
  assert.equal(parsedHelsinki.city?.id, 'helsinki');
  assert.equal(parsedHelsinki.canonicalPath, '/locations/helsinki/');

  const parsedEspoo = parseRoute('/locations/espoo/');
  assert.equal(parsedEspoo.type, 'city');
  assert.equal(parsedEspoo.city?.id, 'espoo');

  const parsedVantaa = parseRoute('#/locations/vantaa');
  assert.equal(parsedVantaa.type, 'city');
  assert.equal(parsedVantaa.city?.id, 'vantaa');
});

test('parseRoute correctly parses Neighborhood URL hierarchy', () => {
  const parsedRuoholahti = parseRoute('/locations/helsinki/ruoholahti/');
  assert.equal(parsedRuoholahti.type, 'neighborhood');
  assert.equal(parsedRuoholahti.city?.id, 'helsinki');
  assert.equal(parsedRuoholahti.neighborhood?.id, 'ruoholahti');
  assert.equal(parsedRuoholahti.canonicalPath, '/locations/helsinki/ruoholahti/');

  const parsedKamppi = parseRoute('/locations/helsinki/kamppi/');
  assert.equal(parsedKamppi.type, 'neighborhood');
  assert.equal(parsedKamppi.neighborhood?.id, 'kamppi');

  const parsedTapiola = parseRoute('/locations/espoo/tapiola/');
  assert.equal(parsedTapiola.type, 'neighborhood');
  assert.equal(parsedTapiola.city?.id, 'espoo');
  assert.equal(parsedTapiola.neighborhood?.id, 'tapiola');

  const parsedTikkurila = parseRoute('/locations/vantaa/tikkurila/');
  assert.equal(parsedTikkurila.type, 'neighborhood');
  assert.equal(parsedTikkurila.city?.id, 'vantaa');
  assert.equal(parsedTikkurila.neighborhood?.id, 'tikkurila');

  const parsedMyyrmaki = parseRoute('/locations/vantaa/myyrmaki/');
  assert.equal(parsedMyyrmaki.type, 'neighborhood');
  assert.equal(parsedMyyrmaki.city?.id, 'vantaa');
  assert.equal(parsedMyyrmaki.neighborhood?.id, 'myyrmaki');
});

test('parseRoute handles postal code direct URL', () => {
  const parsedPostal = parseRoute('/locations/postal/00180/');
  assert.equal(parsedPostal.type, 'postal');
  assert.equal(parsedPostal.postalCode, '00180');
  assert.equal(parsedPostal.neighborhood?.id, 'ruoholahti');
  assert.equal(parsedPostal.city?.id, 'helsinki');
});

test('parseRoute correctly parses Service + City hierarchy', () => {
  const parsedHomeHel = parseRoute('/services/home-cleaning/helsinki/');
  assert.equal(parsedHomeHel.type, 'service-city');
  assert.equal(parsedHomeHel.service?.id, 'kotisiivous');
  assert.equal(parsedHomeHel.city?.id, 'helsinki');

  const parsedDeepEspoo = parseRoute('/services/deep-cleaning/espoo/');
  assert.equal(parsedDeepEspoo.type, 'service-city');
  assert.equal(parsedDeepEspoo.service?.id, 'suursiivous');
  assert.equal(parsedDeepEspoo.city?.id, 'espoo');
});

test('parseRoute correctly parses Service + City + Neighborhood hierarchy', () => {
  const parsedDeepRuoho = parseRoute('/services/deep-cleaning/helsinki/ruoholahti/');
  assert.equal(parsedDeepRuoho.type, 'service-city-neighborhood');
  assert.equal(parsedDeepRuoho.service?.id, 'suursiivous');
  assert.equal(parsedDeepRuoho.city?.id, 'helsinki');
  assert.equal(parsedDeepRuoho.neighborhood?.id, 'ruoholahti');
  assert.equal(parsedDeepRuoho.canonicalPath, '/services/deep-cleaning/helsinki/ruoholahti/');

  const parsedSofaKamppi = parseRoute('/services/sofa-cleaning/helsinki/kamppi/');
  assert.equal(parsedSofaKamppi.type, 'service-city-neighborhood');
  assert.equal(parsedSofaKamppi.service?.id, 'sohvan-puhdistus');
  assert.equal(parsedSofaKamppi.city?.id, 'helsinki');
  assert.equal(parsedSofaKamppi.neighborhood?.id, 'kamppi');
});

test('parseRoute correctly parses Booking page with Service + City + Neighborhood hierarchy', () => {
  const parsedBooking = parseRoute('/services/home-cleaning/helsinki/ruoholahti/booking/');
  assert.equal(parsedBooking.type, 'booking');
  assert.equal(parsedBooking.isBooking, true);
  assert.equal(parsedBooking.service?.id, 'kotisiivous');
  assert.equal(parsedBooking.city?.id, 'helsinki');
  assert.equal(parsedBooking.neighborhood?.id, 'ruoholahti');
});

test('buildHierarchyUrl generates valid canonical and hash URLs', () => {
  const url1 = buildHierarchyUrl({
    service: 'deep-cleaning',
    city: 'helsinki',
    neighborhood: 'ruoholahti',
  });
  assert.equal(url1.canonicalPath, '/services/deep-cleaning/helsinki/ruoholahti/');
  assert.equal(url1.hashPath, '#/services/deep-cleaning/helsinki/ruoholahti');

  const urlBooking = buildHierarchyUrl({
    service: 'home-cleaning',
    city: 'helsinki',
    neighborhood: 'ruoholahti',
    isBooking: true,
  });
  assert.equal(urlBooking.canonicalPath, '/services/home-cleaning/helsinki/ruoholahti/booking/');
  assert.equal(urlBooking.hashPath, '#/services/home-cleaning/helsinki/ruoholahti/booking');

  const urlCity = buildHierarchyUrl({
    city: 'espoo',
  });
  assert.equal(urlCity.canonicalPath, '/locations/espoo/');

  const urlNeigh = buildHierarchyUrl({
    city: 'vantaa',
    neighborhood: 'myyrmaki',
  });
  assert.equal(urlNeigh.canonicalPath, '/locations/vantaa/myyrmaki/');
});

test('generateBreadcrumbs generates exact prompt examples in Finnish and English', () => {
  // Example 1: City Page -> Home > Locations > Helsinki
  const route1 = parseRoute('/locations/helsinki/');
  const bc1 = generateBreadcrumbs(route1, 'en');
  assert.equal(bc1.length, 3);
  assert.equal(bc1[0].label, 'Home');
  assert.equal(bc1[1].label, 'Locations');
  assert.equal(bc1[2].label, 'Helsinki');
  assert.equal(bc1[2].isCurrent, true);

  // Example 2: Neighborhood Page -> Home > Locations > Helsinki > Ruoholahti
  const route2 = parseRoute('/locations/helsinki/ruoholahti/');
  const bc2 = generateBreadcrumbs(route2, 'en');
  assert.equal(bc2.length, 4);
  assert.equal(bc2[0].label, 'Home');
  assert.equal(bc2[1].label, 'Locations');
  assert.equal(bc2[2].label, 'Helsinki');
  assert.equal(bc2[3].label, 'Ruoholahti');
  assert.equal(bc2[3].isCurrent, true);

  // Example 3: Location-Specific Cleaning Service -> Home > Services > Deep Cleaning > Helsinki > Ruoholahti
  const route3 = parseRoute('/services/deep-cleaning/helsinki/ruoholahti/');
  const bc3 = generateBreadcrumbs(route3, 'en');
  assert.equal(bc3.length, 5);
  assert.equal(bc3[0].label, 'Home');
  assert.equal(bc3[1].label, 'Services');
  assert.equal(bc3[2].label, 'Deep cleaning');
  assert.equal(bc3[3].label, 'Helsinki');
  assert.equal(bc3[4].label, 'Ruoholahti');
  assert.equal(bc3[4].isCurrent, true);

  // Example 4: Another Neighborhood -> Home > Services > Sofa Cleaning > Helsinki > Kamppi
  const route4 = parseRoute('/services/sofa-cleaning/helsinki/kamppi/');
  const bc4 = generateBreadcrumbs(route4, 'en');
  assert.equal(bc4.length, 5);
  assert.equal(bc4[0].label, 'Home');
  assert.equal(bc4[1].label, 'Services');
  assert.equal(bc4[2].label, 'Sofa cleaning');
  assert.equal(bc4[3].label, 'Helsinki');
  assert.equal(bc4[4].label, 'Kamppi');
  assert.equal(bc4[4].isCurrent, true);

  // Example 5: Booking Page -> Home > Services > Home Cleaning > Helsinki > Ruoholahti > Booking
  const route5 = parseRoute('/services/home-cleaning/helsinki/ruoholahti/booking/');
  const bc5 = generateBreadcrumbs(route5, 'en');
  assert.equal(bc5.length, 6);
  assert.equal(bc5[0].label, 'Home');
  assert.equal(bc5[1].label, 'Services');
  assert.equal(bc5[2].label, 'Home cleaning');
  assert.equal(bc5[3].label, 'Helsinki');
  assert.equal(bc5[4].label, 'Ruoholahti');
  assert.equal(bc5[5].label, 'Booking');
  assert.equal(bc5[5].isCurrent, true);
});

test('buildBreadcrumbSchema builds valid Schema.org BreadcrumbList', () => {
  const route = parseRoute('/services/deep-cleaning/helsinki/ruoholahti/');
  const breadcrumbs = generateBreadcrumbs(route, 'en');
  const schema = buildBreadcrumbSchema(breadcrumbs, 'https://example.fi');

  assert.equal(schema['@context'], 'https://schema.org');
  assert.equal(schema['@type'], 'BreadcrumbList');
  assert.equal(schema.itemListElement.length, 5);
  assert.equal(schema.itemListElement[0].position, 1);
  assert.equal(schema.itemListElement[0].name, 'Home');
  assert.equal(schema.itemListElement[4].position, 5);
  assert.equal(schema.itemListElement[4].name, 'Ruoholahti');
});

test('parseRoute handles invalid routes with 404 not-found', () => {
  const invalidRoute = parseRoute('/unknown-nonexistent-path-12345/');
  assert.equal(invalidRoute.type, 'not-found');
  assert.equal(invalidRoute.isValid, false);
});

test('parseRoute correctly resolves home route aliases to prevent 404 on navigation', () => {
  const homeAliases = ['/', '#/', '#/home', '/home', '/home/', '/fi/home', '/en/home', '#/etusivu', '#/hem'];
  for (const alias of homeAliases) {
    const parsed = parseRoute(alias);
    assert.equal(parsed.type, 'home', `Expected ${alias} to parse as 'home', got ${parsed.type}`);
    assert.equal(parsed.isValid, true);
  }
});

test('parseRoute correctly resolves static pages (compare, why, story, areas, etc.) without 404', () => {
  const routesToTest = [
    { input: '#/compare', expectedType: 'compare' },
    { input: '/compare/', expectedType: 'compare' },
    { input: '#/why', expectedType: 'why' },
    { input: '/why/', expectedType: 'why' },
    { input: '#/story', expectedType: 'story' },
    { input: '/story/', expectedType: 'story' },
    { input: '#/areas', expectedType: 'locations-hub' },
    { input: '/locations/', expectedType: 'locations-hub' },
    { input: '#/services', expectedType: 'services-hub' },
    { input: '#/pricing', expectedType: 'pricing' },
    { input: '#/calculator', expectedType: 'calculator' },
    { input: '#/about', expectedType: 'about' },
    { input: '#/contact', expectedType: 'contact' },
    { input: '#/sitemap', expectedType: 'sitemap' },
    { input: '#/seo-audit', expectedType: 'seo-analysis' },
  ];

  for (const { input, expectedType } of routesToTest) {
    const parsed = parseRoute(input);
    assert.equal(parsed.type, expectedType, `Expected ${input} to parse as ${expectedType}, got ${parsed.type}`);
    assert.equal(parsed.isValid, true);
  }
});

