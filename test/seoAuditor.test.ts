import test from 'node:test';
import assert from 'node:assert/strict';
import {
  analyzePageSeo,
  validateHeadingHierarchy,
  validateHreflangMapping,
  CORE_WEB_VITALS,
} from '../src/utils/seoAuditor.ts';

test('analyzePageSeo detects informational search intent on guides', () => {
  const result = analyzePageSeo({
    title: 'Muuttosiivouksen tarkistuslista Helsinki | Siisti360',
    metaDescription: 'Kattava muuttosiivouksen tarkistuslista ja selkeät ohjeet avainten luovutukseen sekä vuokravakuuden palautukseen Helsingissä, Espoossa ja Vantaalla.',
    h1: 'Muuttosiivouksen kattava tarkistuslista',
    primaryKeyword: 'muuttosiivouksen tarkistuslista',
    headings: [
      { level: 1, text: 'Muuttosiivouksen kattava tarkistuslista' },
      { level: 2, text: 'Keittiön puhdistus' },
      { level: 3, text: 'Uunin ja lieden pesu' },
      { level: 2, text: 'Kylpyhuoneen puhdistus' },
    ],
    canonicalUrl: 'https://example.fi/fi/blogi/muuttosiivouksen-tarkistuslista/',
    currentPath: '/fi/blogi/muuttosiivouksen-tarkistuslista/',
    pageType: 'guide',
  });

  assert.equal(result.searchIntent, 'informational');
  assert.equal(result.titleCheck.status, 'optimal');
  assert.equal(result.metaCheck.status, 'optimal');
  assert.equal(result.keywordCheck.inTitle, true);
  assert.equal(result.keywordCheck.inH1, true);
  assert.equal(result.headingsCheck.isValid, true);
  assert.equal(result.canonicalCheck.isSelfReferencing, true);
  assert.ok(result.score >= 90);
});

test('validateHeadingHierarchy flags skipped heading levels', () => {
  const headings = [
    { level: 1, text: 'Main Title' },
    { level: 3, text: 'Skipped H2 Subheading' }, // Skipped level 2!
  ];
  const audit = validateHeadingHierarchy(headings);

  assert.equal(audit.isValid, false);
  assert.equal(audit.issues.length, 1);
  assert.match(audit.issues[0], /hyppäsi H1 -> H3/);
});

test('validateHeadingHierarchy flags missing or multiple H1s', () => {
  const missingH1 = validateHeadingHierarchy([
    { level: 2, text: 'Section 1' },
    { level: 2, text: 'Section 2' },
  ]);
  assert.equal(missingH1.isValid, false);
  assert.equal(missingH1.h1Count, 0);

  const multipleH1 = validateHeadingHierarchy([
    { level: 1, text: 'First H1' },
    { level: 1, text: 'Second H1' },
  ]);
  assert.equal(multipleH1.isValid, false);
  assert.equal(multipleH1.h1Count, 2);
});

test('validateHreflangMapping generates correct cluster', () => {
  const mapping = validateHreflangMapping({
    fi: '/fi/palvelut/kotisiivous/helsinki/',
    sv: '/sv/tjanster/hemstadning/helsingfors/',
    en: '/en/services/home-cleaning/helsinki/',
  });

  assert.equal(mapping.isValid, true);
  assert.equal(mapping.cluster.length, 4);
  assert.equal(mapping.cluster.find((c) => c.lang === 'x-default')?.url, 'https://example.fi/fi/palvelut/kotisiivous/helsinki/');
});

test('CORE_WEB_VITALS has valid metrics', () => {
  assert.equal(CORE_WEB_VITALS.length, 5);
  for (const cwv of CORE_WEB_VITALS) {
    assert.equal(cwv.status, 'good');
    assert.ok(cwv.threshold);
  }
});
