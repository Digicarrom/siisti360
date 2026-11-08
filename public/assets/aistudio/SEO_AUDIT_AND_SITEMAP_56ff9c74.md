# Cleaning website benchmark and SEO strategy (Finland, reviewed 5 Nov 2026)

## Design source

**User-provided `justfinder_b2b_buyers(1).html`:** navy sidebar (#10263d), dark ink (#142c42), white panels, orange actions (#ff8d43), teal (#0d9d8c), compact rounded cards, desktop workspace and mobile responsive layout. Adapted into an original public cleaning-services website rather than reproducing the source's supplier marketplace.

## Competitors analyzed (only observed characteristics, not inferred business claims)

| Site | Observed architecture / UX / content | Adaptation for your site |
|---|---|---|
| https://www.freska.fi/ | Home cleaning, window washing, moving cleaning, office cleaning, calculator fields for house size/frequency, contact entry points, FAQ, pricing and household-deduction information. | Strong residential homepage, service-specific CTA, service details, quote form, simple non-price estimation. |
| https://puhda.fi/ | Focus on Helsinki/Espoo/Vantaa, services for homes, companies, housing companies; categories such as office cleaning, property/stair cleaning, deep cleans, floor waxing, specialty cleaning, window cleaning. Short lead form and indicative pricing calculator. | Region-first architecture, service cards, residential/B2B segments, short frictionless quote form. |
| https://novah.fi/fi | Story-driven trust messaging; service pages by city for home and move-out cleaning across Helsinki/Espoo/Vantaa; guide/library content; transparent scope and prices. | Localized service-city structure, distinct city context, transparent copy, knowledge hub. |
| https://kotileena.fi/ | Home cleaning, additional services, pricing, company and operating-principles pages, articles and recurring or one-off order CTA. | Recurring plan selector, guides, home service cluster, about and FAQ. |
| https://www.sol.fi/palvelut/siivouspalvelut/ | Broad commercial/industry service taxonomy (hotel, healthcare, construction, food production, offices, daycare, etc.), detailed B2B contact form and service scoping. | B2B industry category pages, detailed quote form, transparent scope and planning. |

**Important:** Service names and content are original recommendations; they are not copies of competitor web copy. This is a benchmark, not a claim that your new business already offers every service.

## Multilingual site tree

- `/fi/` (default), `/sv/`, `/en/` — homepage
- `/fi/palvelut/`, `/sv/tjanster/`, `/en/services/` — service catalog
- 22 primary service pages per language, e.g. `/fi/palvelut/kotisiivous/`, `/sv/tjanster/hemstadning/`, `/en/services/home-cleaning/`
- 66 local service-city pages per language, e.g. `/fi/palvelut/kotisiivous/helsinki/`, `/sv/tjanster/hemstadning/helsingfors/`, `/en/services/home-cleaning/helsinki/`
- `/fi/alueet/{helsinki|espoo|vantaa}/`, `/sv/omraden/{helsingfors|esbo|vanda}/`, `/en/locations/{helsinki|espoo|vantaa}/`
- Pricing/estimate, about, FAQ, contact, quote, privacy, and guides pages per language
- Four educational guides in all three languages

**Per-language totals:** 10 core pages + 22 service pages + 66 service/city pages + 3 city hubs + 4 guides = **105 pages**. Across three languages: **315 pages**.

## Keyword clusters by intent

| Buyer intent | Finnish primary | Swedish primary | English primary | Supporting variants |
|---|---|---|---|---|
| General/local | siivouspalvelut Helsinki | städtjänster Helsingfors | cleaning services Helsinki | siivous Espoo, siivous Vantaa, städfirma Esbo, cleaners Vantaa |
| Residential | kotisiivous Helsinki | hemstädning Helsingfors | home cleaning Helsinki | kotisiivous Espoo, säännöllinen kotisiivous, recurring home cleaning |
| Deep cleaning | suursiivous Helsinki | storstädning Helsingfors | deep cleaning Helsinki | perusteellinen siivous, kertasiivous, one-off clean |
| Moving | muuttosiivous Helsinki | flyttstädning Helsingfors | move-out cleaning Helsinki | loppusiivous, muuttosiivous Espoo, end-of-tenancy cleaning |
| Textile | sohvan puhdistus Helsinki | soffrengöring Helsingfors | sofa cleaning Helsinki | matonpesu Espoo, carpet cleaning Vantaa, tekstiilipesu |
| Bathroom | kylpyhuoneen siivous Helsinki | badrumsstädning Helsingfors | bathroom cleaning Helsinki | kalkinpoisto, shower cleaning, kylpyhuoneen pesu |
| Commercial | toimistosiivous Helsinki | kontorsstädning Helsingfors | office cleaning Helsinki | toimitilasiivous, commercial cleaning Espoo, cleaning contracts |
| Housing | porrassiivous Helsinki | trappstädning Helsingfors | stairwell cleaning Helsinki | taloyhtiön siivous, kiinteistösiivous, common-area cleaning |
| Other B2B | liiketilasiivous Helsinki | butiksstädning Helsingfors | retail cleaning Helsinki | ravintolasiivous, gym cleaning, varastosiivous |

Primary keywords are reflected in unique per-page titles/headings; secondary variants are placed naturally in copy, relevant internal links and the exported CSV, not stuffed into SEO meta keyword tags (which Google does not use for rankings).

## Recommended launch priority (to avoid thin doorway pages)

**Phase 1, index first:** Finnish homepage, 3 city hubs, 8 genuinely offered top services, quote/contact/FAQ/about, 4 guides; translate the most important pages to Swedish and English with reviewed natural language.

**Phase 2, index selectively:** high-intent city-service pages for actual coverage (`kotisiivous Helsinki`, `muuttosiivous Espoo`, `toimistosiivous Vantaa`, etc.). Add city-specific original proof: genuine travel/service-zone details, photos, process differences, real reviews with consent, and service-specific FAQs.

**Phase 3, expand after confirmation:** additional industry services only if actually offered. Avoid numerous lightly reworded near-duplicate pages; review and consolidate or noindex weak pages.

## Core technical SEO provided

- Distinct local URLs for all three languages; Finnish-first `/` redirect.
- SSR HTML for every URL; descriptive title, meta description, `<h1>` hierarchy.
- Language-switch equivalent URLs; self-canonical; `hreflang` fi, sv-FI, en-FI, x-default.
- Schema.org WebSite, WebPage, Service, BreadcrumbList, FAQPage where applicable; no fictional ratings.
- Automatically generated multilingual `sitemap.xml`; `robots.txt`; responsive accessible UI; internal links from service/city catalogs and related services.
- Open Graph title/description and favicon.
- Demo domain `example.fi` automatically returns `noindex` and disallow all; set a real domain only after compliance/content review.

## Conversion UX

- Primary orange CTA above the fold and sticky mobile CTA.
- Quote form: customer type, service, city, postcode, m², frequency, preferred date, name, phone/email, comments, contact channel, separate mandatory privacy consent and optional marketing consent.
- Consent-aware server validation, lead persistence, admin status workflow and CSV export, optional HTTPS webhook into CRM.
- Service search/filter, mobile menu, 4 local guides, FAQ accordions, scope/benefit sections and illustrative hours calculator.
- **Do not invent** ratings, prices, client logos, employee qualifications, guarantees, Y-tunnus, or operating history. Verify claims before deployment.

## Before going live

1. Verify domain, brand rights, logo, company legal name, Finnish Business ID, real address/service area, contact email/phone and service offerings.
2. Finish GDPR privacy policy, retention, security arrangements, processor list, lawful basis and handling of data access/deletion requests; configure a persistent datastore and backups.
3. Configure `SITE_URL`, HTTPS, strong `ADMIN_TOKEN` and operational notifications via opt-in webhook/CRM.
4. Review Finnish/Swedish/English translations and each city page for meaningful, unique information.
5. Test lead handling on production host and an actual mobile device. Submit sitemaps to Google Search Console and Bing Webmaster Tools when ready.
6. Use actual company media/photos with permission and only genuine, permissioned reviews; add local business structured data after validating the company's facts.

## Sources (visited November 5, 2026)

- https://www.freska.fi/
- https://www.freska.fi/siivouspalvelu
- https://puhda.fi/
- https://novah.fi/fi
- https://kotileena.fi/
- https://www.sol.fi/palvelut/siivouspalvelut/

### Representative competitor URL patterns actually inspected

These are *examples* of observed live pages, not a claim of having exhaustively crawled every URL:

- Freska: `https://www.freska.fi/`, `/siivouspalvelu`, `/siivouspalvelu/kotisiivouspalvelu`, `/muuttosiivous`.
- PUHDA: `https://puhda.fi/`, `/toimistosiivous/`, `/kiinteistosiivous/`, `/muuttosiivous/`, `/peruspesu/`.
- Novah: `https://novah.fi/fi`, `/fi/palvelut/kotisiivous/helsinki`, `/fi/palvelut/kotisiivous/espoo`.
- Kotileena: `https://kotileena.fi/`, `/palvelut`.
- SOL: `https://www.sol.fi/palvelut/siivouspalvelut/`, `/palvelut/siivouspalvelut/rakennussiivous-ja-loppusiivous/`.

The main research focused on cleaning services, site hierarchy, target audiences, conversions and SEO—not a full technical audit of competitor backlinks, rankings, every sitemap URL, Core Web Vitals or analytics (which require separate tooling and access).

---

## 6 November 2026 — added pricing, booking, trust and testimonial pages

The enhanced site now has **333 route pages**, 111 per language (Finnish, Swedish and English). New pages: localized booking request, price calculator, competitor price comparison, Why Choose Us, moderated testimonials and Our Story. The original pricing and About pages are upgraded too. Full inventory: `SEO_STRUCTURE_333_PAGES.csv`.

### Public competitor-price references (checked 2026-11-06)

| Brand | Example public price for home cleaning | Basis and important context | Source |
|---|---:|---|---|
| Freska | from €51.90/hour | Weekly recurring home cleaning; other frequency prices and one-time surcharges apply | https://www.freska.fi/hinnasto |
| PUHDA | €49/hour | One cleaner, regular home cleaning; minimum 2.5 hours, terms may vary | https://puhda.fi/hinnasto/ |
| Novah | from €37.90/hour | Weekly home cleaning, Helsinki; home equipment conditions apply | https://novah.fi/fi/hinnat/helsinki |
| Kotileena | €51.90/hour | Home cleaning in Helsinki region, Mon–Wed; other visit types differ | https://kotileena.fi/hinnasto |
| SOL | Ask for quote | No comparable publicly verified residential recurring hourly price for the broad cleaning service page | https://www.sol.fi/palvelut/siivouspalvelut/ |

These values do **not** prove that one provider is cheaper in a comparable scenario: minimum charges, scope, frequency, travel, materials, and discounts vary. Sources can change; the displayed data is a date-stamped reference only. Siisti360's €43/hour example is **invented** and must be replaced before launch.

### Booking UX research reference

- Freska's JavaScript-powered booking page `https://tilaus.freska.fi/service` cannot be fully inspected from a text-only crawler, but Freska's public site describes selecting a home size, cleaning duration and appointment time and completing an online order. The Siisti360 wizard is an independent implementation based on that general 3-step pattern, not copied source or styling.
- This implementation collects **requests**, not confirmed bookings, because no live employee calendars or staff capacity database were provided.

### New keyword targets

- FI: `siivouksen varaus netissä`, `siivouksen hintalaskuri`, `kotisiivous hintavertailu`, `edullinen siivous helsinki`, `siivousyritys kokemuksia`.
- SV: `boka städning Helsingfors`, `städhjälp priskalkylator`, `jämför städpriser`, `städfirma omdömen`.
- EN: `book cleaning Helsinki`, `cleaning price calculator`, `compare Helsinki cleaning prices`, `trusted cleaning company`, `cleaning customer reviews`.

All new page links are available through `ALL_PAGES.html`; exact metadata is in `SEO_STRUCTURE_333_PAGES.csv`.
