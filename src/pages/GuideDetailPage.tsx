import React, { useState, useEffect } from 'react';
import { Language, GuideInfo } from '../data/content';
import { TRANSLATIONS } from '../data/translations';
import { VisualBanner } from '../components/VisualBanner';
import { SeoCard } from '../components/SeoCard';
import { findSeoMetadata, applySeoMetadataToHead, SeoPage } from '../data/seoCatalog';
import { RICH_ARTICLES, RichArticle } from '../data/richArticles';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { BreadcrumbItem } from '../utils/urlHierarchy';
import {
  BookOpen,
  Clock,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  UserCheck,
  HelpCircle,
  ListOrdered,
  FileCheck,
  RotateCcw,
  CheckSquare,
  Square,
  FlaskConical,
  MapPin,
  Share2,
} from 'lucide-react';

interface GuideDetailPageProps {
  guide: GuideInfo;
  currentLang: Language;
  breadcrumbs?: BreadcrumbItem[];
  onNavigateUrl?: (url: string) => void;
  onBack: () => void;
  onBookNow: () => void;
  onRequestQuote: () => void;
}

export const GuideDetailPage: React.FC<GuideDetailPageProps> = ({
  guide,
  currentLang,
  breadcrumbs,
  onNavigateUrl,
  onBack,
  onBookNow,
  onRequestQuote,
}) => {
  const t = TRANSLATIONS[currentLang];
  const richArticle: RichArticle | undefined = RICH_ARTICLES[guide.id];

  // State for interactive checklist
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  // State for open FAQs
  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({ 0: true });

  const toggleChecklist = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const resetChecklist = () => {
    setCheckedItems({});
  };

  const toggleFaq = (index: number) => {
    setOpenFaqs((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  // SEO metadata lookup
  const seoData: SeoPage = findSeoMetadata({
    pageType: 'guide',
    language: currentLang,
    serviceSlug: guide.slugs[currentLang],
  }) || {
    id: `guide-${guide.id}`,
    language: currentLang,
    pageType: 'guide',
    path: `/${currentLang}/blogi/${guide.slugs[currentLang]}/`,
    primaryKeyword: guide.titles[currentLang].toLowerCase(),
    secondaryKeywords: [
      'Siivousopas',
      'Siivousvinkit',
      'Kotisiivous Helsinki',
      'Muuttosiivousohjeet',
    ],
    seoTitle: `${guide.titles[currentLang]} | Siisti360`,
    metaDescription: guide.summary[currentLang],
    h1: guide.titles[currentLang],
    canonicalUrl: `https://example.fi/${currentLang}/blogi/${guide.slugs[currentLang]}/`,
  };

  // Apply SEO metadata & rich Schema.org (HowTo and FAQPage) to <head>
  useEffect(() => {
    if (seoData) {
      applySeoMetadataToHead(seoData);

      // Inject supplemental HowTo and FAQPage schema
      if (richArticle && typeof document !== 'undefined') {
        const schemaId = 'guide-rich-schema';
        let scriptTag = document.getElementById(schemaId) as HTMLScriptElement | null;
        if (!scriptTag) {
          scriptTag = document.createElement('script');
          scriptTag.id = schemaId;
          scriptTag.type = 'application/ld+json';
          document.head.appendChild(scriptTag);
        }

        const faqEntities = richArticle.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question[currentLang],
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer[currentLang],
          },
        }));

        const howToSteps = richArticle.interactiveChecklist.map((step, idx) => ({
          '@type': 'HowToStep',
          position: idx + 1,
          name: step.title[currentLang],
          text: step.details[currentLang],
        }));

        const richGraph = {
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Article',
              headline: guide.titles[currentLang],
              description: guide.summary[currentLang],
              author: {
                '@type': 'Person',
                name: richArticle.author.name,
                jobTitle: richArticle.author.role[currentLang],
              },
              datePublished: richArticle.author.date,
              dateModified: '2026-11-06',
              publisher: {
                '@type': 'Organization',
                name: 'Siisti360',
                url: 'https://example.fi',
              },
            },
            {
              '@type': 'HowTo',
              name: guide.titles[currentLang],
              step: howToSteps,
            },
            {
              '@type': 'FAQPage',
              mainEntity: faqEntities,
            },
          ],
        };

        scriptTag.textContent = JSON.stringify(richGraph);
      }
    }
  }, [seoData, richArticle, currentLang, guide]);

  const checklistTotal = richArticle?.interactiveChecklist.length || 0;
  const checklistCompleted = Object.values(checkedItems).filter(Boolean).length;
  const completionPercentage = checklistTotal > 0 ? Math.round((checklistCompleted / checklistTotal) * 100) : 0;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Dynamic Breadcrumbs */}
      <Breadcrumbs
        items={
          breadcrumbs && breadcrumbs.length > 0
            ? breadcrumbs
            : [
                { label: currentLang === 'fi' ? 'Etusivu' : 'Home', url: '#/' },
                { label: currentLang === 'fi' ? 'Oppaat' : 'Guides', url: '#/guides' },
                { label: guide.titles[currentLang], url: `#/guides/${guide.slugs.en}`, isCurrent: true },
              ]
        }
        currentLang={currentLang}
        onNavigate={(url) => (onNavigateUrl ? onNavigateUrl(url) : (window.location.hash = url))}
      />

      {/* Hero Visual Banner */}
      <VisualBanner
        type="story"
        headingTag="h1"
        badge={
          currentLang === 'fi'
            ? 'CONTENT SEO • ASIANTUNTIJA-ARTIKKELI JA TARKISTUSLISTA'
            : currentLang === 'sv'
            ? 'CONTENT SEO • EXPERTGUIDE OCH CHECKLISTA'
            : 'CONTENT SEO • EXPERT GUIDE & VERIFIED CHECKLIST'
        }
        title={guide.titles[currentLang]}
      />

      {/* On-Page SEO Info & Schema Badge */}
      {seoData && <SeoCard seo={seoData} currentLang={currentLang} />}

      {/* Content SEO Header Metadata Bar: Intent, Word Count, Author */}
      <div className="rounded-2xl border border-[#dce8ee] bg-white p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {/* Search Intent Tag */}
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e5f6f1] px-3 py-1 text-xs font-bold text-[#087f72] border border-[#a5dbd2]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>
              {richArticle?.searchIntentLabel[currentLang] ||
                (currentLang === 'fi'
                  ? 'Hakuaie: Informatiivinen (Informational)'
                  : currentLang === 'sv'
                  ? 'Sökavsikt: Informativ'
                  : 'Intent: Informational')}
            </span>
          </span>

          {/* Word Count */}
          <span className="inline-flex items-center gap-1 rounded-full bg-[#f4f7f9] px-3 py-1 text-xs font-mono font-medium text-[#465f73]">
            <BookOpen className="h-3.5 w-3.5 text-[#0d9d8c]" />
            <span>{richArticle?.wordCount || 1200} {currentLang === 'fi' ? 'sanaa' : currentLang === 'sv' ? 'ord' : 'words'}</span>
          </span>

          {/* Reading Time */}
          <span className="inline-flex items-center gap-1 rounded-full bg-[#f4f7f9] px-3 py-1 text-xs font-mono font-medium text-[#465f73]">
            <Clock className="h-3.5 w-3.5 text-[#0d9d8c]" />
            <span>{richArticle?.readTime[currentLang] || guide.readTime}</span>
          </span>
        </div>

        {/* Author & Verification Badge */}
        <div className="flex items-center gap-3 text-xs text-[#526d82]">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0d9d8c] text-white font-bold text-xs shadow-2xs">
            LV
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-bold text-[#142c42]">
              <span>{richArticle?.author.name || 'Laura Virtanen'}</span>
              <UserCheck className="h-3.5 w-3.5 text-[#0d9d8c]" />
            </div>
            <span className="text-[11px] text-[#677c8d]">
              {richArticle?.author.reviewer[currentLang] || 'Tarkistanut Siisti360 asiantuntijatiimi'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Article & Right Sticky Sidebar */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Main Article Content Column */}
        <article className="space-y-8 lg:col-span-8">
          {/* Executive Summary / Key Takeaways Box */}
          <div className="rounded-2xl border-2 border-[#b8dfd8] bg-[#f2faf8] p-6 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#087f72] mb-3">
              <ShieldCheck className="h-4 w-4" />
              <span>
                {currentLang === 'fi'
                  ? 'TIIVISTELMÄ & PÄÄKOHDAT (KEY TAKEAWAYS)'
                  : currentLang === 'sv'
                  ? 'SAMMANFATTNING & HUVUDPUNKTER (KEY TAKEAWAYS)'
                  : 'EXECUTIVE SUMMARY & KEY TAKEAWAYS'}
              </span>
            </div>

            <p className="text-sm font-semibold text-[#142c42] leading-relaxed mb-4">
              {guide.summary[currentLang]}
            </p>

            {richArticle?.keyTakeaways && (
              <ul className="space-y-2 pt-2 border-t border-[#d3eee7]">
                {richArticle.keyTakeaways[currentLang].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-[#1e3c38] font-medium leading-relaxed">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0d9d8c] mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Interactive Table of Contents */}
          {richArticle?.toc && richArticle.toc.length > 0 && (
            <div className="rounded-2xl border border-[#e2e9ee] bg-white p-5 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#142c42] mb-3">
                <ListOrdered className="h-4 w-4 text-[#0d9d8c]" />
                <span>
                  {currentLang === 'fi'
                    ? 'Sisällysluettelo (Table of Contents)'
                    : currentLang === 'sv'
                    ? 'Innehållsförteckning'
                    : 'Table of Contents'}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {richArticle.toc.map((toc) => (
                  <button
                    key={toc.id}
                    onClick={() => scrollToSection(toc.id)}
                    className="text-left flex items-center justify-between rounded-lg border border-[#f0f4f7] bg-[#fbfcfd] px-3 py-2 text-xs font-semibold text-[#294255] hover:border-[#0d9d8c] hover:bg-[#eef7f5] hover:text-[#087f72] transition-colors"
                  >
                    <span className="truncate">{toc.title[currentLang]}</span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 ml-1 text-[#0d9d8c]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Rich Content Sections */}
          {richArticle?.sections ? (
            <div className="space-y-8">
              {richArticle.sections.map((sec) => (
                <section
                  key={sec.id}
                  id={sec.id}
                  className="rounded-2xl border border-[#e2e9ee] bg-white p-6 md:p-8 shadow-xs space-y-4"
                >
                  <h2 className="heading-h2 font-[780] text-[#142c42] flex items-center gap-2.5">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#eef7f5] text-xs font-bold text-[#087f72]">
                      §
                    </span>
                    <span>{sec.h2[currentLang]}</span>
                  </h2>

                  <div className="space-y-3.5 type-body text-[#374e60] leading-[1.65]">
                    {sec.paragraphs[currentLang].map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>

                  {sec.proTip && (
                    <div className="rounded-xl border border-[#b2e5dc] bg-[#f2faf8] p-4 text-[13.5px] font-medium text-[#13443e] leading-relaxed">
                      {sec.proTip[currentLang]}
                    </div>
                  )}
                </section>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-[#e2e9ee] bg-white p-6 md:p-8 shadow-xs space-y-4">
              <h2 className="text-xl font-bold text-[#142c42]">
                {currentLang === 'fi' ? 'Tärkeimmät asiat ja ohjeet' : 'Viktiga råd och instruktioner'}
              </h2>
              <div className="space-y-3">
                {guide.points[currentLang].map((point, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-xl border border-[#f0f4f7] bg-[#fbfcfd] p-4 text-xs text-[#203c4e]"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e5f6f1] text-[11px] font-bold text-[#0d9d8c] font-mono">
                      0{index + 1}
                    </span>
                    <p className="leading-relaxed font-medium">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cleaning Chemistry pH Guide Table (if present) */}
          {richArticle?.cleaningChemistry && (
            <section id="kemikaalit" className="rounded-2xl border border-[#e2e9ee] bg-white p-6 md:p-8 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <FlaskConical className="h-5 w-5 text-[#0d9d8c]" />
                <h2 className="text-xl font-bold text-[#142c42]">
                  {richArticle.cleaningChemistry.title[currentLang]}
                </h2>
              </div>
              <p className="text-xs text-[#526d82] leading-relaxed">
                {richArticle.cleaningChemistry.description[currentLang]}
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-[#e2e9ee] rounded-xl overflow-hidden">
                  <thead className="bg-[#f0f4f7] text-[#142c42] font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3">{currentLang === 'fi' ? 'Aineryhmä' : currentLang === 'sv' ? 'Produktgrupp' : 'Product Type'}</th>
                      <th className="p-3">{currentLang === 'fi' ? 'pH-arvo' : currentLang === 'sv' ? 'pH-värde' : 'pH Value'}</th>
                      <th className="p-3">{currentLang === 'fi' ? 'Käyttökohde' : currentLang === 'sv' ? 'Användningsområde' : 'Application'}</th>
                      <th className="p-3">{currentLang === 'fi' ? 'Varoitus / Huomio' : currentLang === 'sv' ? 'Varning / Observera' : 'Caution / Notes'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e8eff2]">
                    {richArticle.cleaningChemistry.items.map((item, idx) => (
                      <tr key={idx} className="hover:bg-[#fbfcfd]">
                        <td className="p-3 font-bold text-[#142c42]">{item.type[currentLang]}</td>
                        <td className="p-3 font-mono font-bold text-[#087f72]">{item.ph}</td>
                        <td className="p-3 text-[#334e62]">{item.usage[currentLang]}</td>
                        <td className="p-3 text-[#c2410c] font-medium">{item.warning[currentLang]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Interactive Checklist Widget with Progress Tracking */}
          {richArticle?.interactiveChecklist && richArticle.interactiveChecklist.length > 0 && (
            <section
              id="interaktiivinen-lista"
              className="rounded-2xl border border-[#0d9d8c]/30 bg-white p-6 md:p-8 shadow-sm space-y-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#e8eff2] pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <FileCheck className="h-5 w-5 text-[#0d9d8c]" />
                    <h2 className="text-xl font-bold text-[#142c42]">
                      {currentLang === 'fi'
                        ? 'Interaktiivinen muuttosiivouslista'
                        : currentLang === 'sv'
                        ? 'Interaktiv städchecklista'
                        : 'Interactive Cleaning Checklist'}
                    </h2>
                  </div>
                  <p className="text-xs text-[#526d82] mt-1">
                    {currentLang === 'fi'
                      ? 'Merkitse kohdat suoritetuksi siivotessasi ja varmista, ettei mikään unohdu.'
                      : currentLang === 'sv'
                      ? 'Bocka av punkterna under städningens gång och se till att inget glöms.'
                      : 'Check off tasks as you go to ensure a complete and thorough clean.'}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-[#087f72]">
                      {checklistCompleted} / {checklistTotal} {currentLang === 'fi' ? 'valmiina' : currentLang === 'sv' ? 'klara' : 'completed'} ({completionPercentage} %)
                    </span>
                    <div className="h-2 w-32 rounded-full bg-[#e2edf3] overflow-hidden mt-1">
                      <div
                        className="h-full bg-[#0d9d8c] transition-all duration-300"
                        style={{ width: `${completionPercentage}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={resetChecklist}
                    title={currentLang === 'fi' ? 'Nollaa merkinnät' : currentLang === 'sv' ? 'Återställ' : 'Reset checklist'}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#d6e4ec] text-[#4a6579] hover:bg-[#f0f5f8] transition-colors cursor-pointer"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Checklist items */}
              <div className="space-y-3">
                {richArticle.interactiveChecklist.map((item) => {
                  const isChecked = Boolean(checkedItems[item.id]);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklist(item.id)}
                      className={`cursor-pointer flex items-start gap-3.5 rounded-xl border p-4 transition-all ${
                        isChecked
                          ? 'border-[#a5dbd2] bg-[#f2faf8] text-[#13443e]'
                          : 'border-[#e2e9ee] bg-[#fbfcfd] hover:border-[#ccdbe4]'
                      }`}
                    >
                      <button
                        type="button"
                        className="mt-0.5 text-[#0d9d8c] focus:outline-hidden"
                        aria-label={isChecked ? 'Merkitse tekemättömäksi' : 'Merkitse tehdyksi'}
                      >
                        {isChecked ? (
                          <CheckSquare className="h-5 w-5 text-[#0d9d8c]" />
                        ) : (
                          <Square className="h-5 w-5 text-[#8fa7b8]" />
                        )}
                      </button>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-sm font-bold ${
                              isChecked ? 'line-through text-[#63847e]' : 'text-[#142c42]'
                            }`}
                          >
                            {item.title[currentLang]}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#087f72] rounded-md bg-white px-2 py-0.5 border border-[#e2e9ee]">
                            {item.category[currentLang]}
                          </span>
                        </div>
                        <p className="text-xs text-[#526d82] leading-relaxed">
                          {item.details[currentLang]}
                        </p>
                        <div className="text-[11px] text-[#425d70] font-medium pt-1">
                          <span className="font-semibold text-[#142c42]">Välineet: </span>
                          {item.tools[currentLang]}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* FAQ Accordion Section with FAQPage Schema */}
          {richArticle?.faqs && richArticle.faqs.length > 0 && (
            <section id="ukk" className="rounded-2xl border border-[#e2e9ee] bg-white p-6 md:p-8 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-[#0d9d8c]" />
                <h2 className="text-xl font-bold text-[#142c42]">
                  {currentLang === 'fi'
                    ? 'Usein kysytyt kysymykset (FAQ)'
                    : currentLang === 'sv'
                    ? 'Vanliga frågor och svar (FAQ)'
                    : 'Frequently Asked Questions (FAQ)'}
                </h2>
              </div>

              <div className="space-y-3 pt-2">
                {richArticle.faqs.map((faq, idx) => {
                  const isOpen = Boolean(openFaqs[idx]);
                  return (
                    <div
                      key={idx}
                      className="rounded-xl border border-[#e2e9ee] overflow-hidden transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(idx)}
                        className="flex w-full items-center justify-between p-4 text-left font-bold text-xs sm:text-sm text-[#142c42] bg-[#fbfcfd] hover:bg-[#f5f8fa]"
                      >
                        <span>{faq.question[currentLang]}</span>
                        {isOpen ? (
                          <ChevronUp className="h-4 w-4 shrink-0 text-[#0d9d8c]" />
                        ) : (
                          <ChevronDown className="h-4 w-4 shrink-0 text-[#677c8d]" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="p-4 bg-white text-xs text-[#425d70] leading-relaxed border-t border-[#f0f4f7]">
                          {faq.answer[currentLang]}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Internal Links to City Doorway Pages (Helsinki, Espoo, Vantaa) */}
          <div className="rounded-2xl border border-[#e2e9ee] bg-[#f8fbfe] p-6 text-xs text-[#456176] space-y-3">
            <span className="block font-bold uppercase tracking-wider text-[#087f72]">
              {currentLang === 'fi'
                ? 'PALVELUALUEEMME PÄÄKAUPUNKISEUDULLA'
                : 'VÅRA SERVICEOMRÅDEN I REGIONEN'}
            </span>
            <p>
              Toteutamme ammattitaitoiset siivoukset kattavasti koko pääkaupunkiseudulla. Tutustu kunkin
              kaupungin paikalliseen palvelukuvaukseen ja asiakasarvosteluihin:
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href="#/areas/helsinki"
                className="inline-flex items-center gap-1 rounded-lg border border-[#cce1eb] bg-white px-3 py-1.5 font-bold text-[#142c42] hover:border-[#0d9d8c] hover:text-[#087f72] transition-colors"
              >
                <MapPin className="h-3.5 w-3.5 text-[#0d9d8c]" />
                <span>Helsinki (Keskusta, Lauttasaari, Pasila)</span>
              </a>
              <a
                href="#/areas/espoo"
                className="inline-flex items-center gap-1 rounded-lg border border-[#cce1eb] bg-white px-3 py-1.5 font-bold text-[#142c42] hover:border-[#0d9d8c] hover:text-[#087f72] transition-colors"
              >
                <MapPin className="h-3.5 w-3.5 text-[#0d9d8c]" />
                <span>Espoo (Tapiola, Leppävaara, Matinkylä)</span>
              </a>
              <a
                href="#/areas/vantaa"
                className="inline-flex items-center gap-1 rounded-lg border border-[#cce1eb] bg-white px-3 py-1.5 font-bold text-[#142c42] hover:border-[#0d9d8c] hover:text-[#087f72] transition-colors"
              >
                <MapPin className="h-3.5 w-3.5 text-[#0d9d8c]" />
                <span>Vantaa (Tikkurila, Myyrmäki, Kivistö)</span>
              </a>
            </div>
          </div>
        </article>

        {/* Right Sticky Column: High-Converting CTA Widget */}
        <aside className="space-y-6 lg:col-span-4">
          <div className="sticky top-24 space-y-6">
            {/* Primary Action Card */}
            <div className="rounded-2xl border border-[#e2e9ee] bg-[#10263d] p-6 text-white shadow-md space-y-4">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#9ddbd1]">
                <Sparkles className="h-3.5 w-3.5" />
                <span>{currentLang === 'fi' ? 'HELPOTA ARKEASI' : 'UNDERLÄTTA VARDAGEN'}</span>
              </span>

              <h3 className="text-lg font-bold text-white leading-snug">
                {richArticle?.relatedServiceCta.title[currentLang] ||
                  (currentLang === 'fi'
                    ? 'Anna ammattilaisten hoitaa siivous'
                    : 'Låt proffs ta hand om städningen')}
              </h3>

              <p className="text-xs text-[#c8d8e1] leading-relaxed">
                {richArticle?.relatedServiceCta.subtitle[currentLang] ||
                  (currentLang === 'fi'
                    ? 'Säästä omaa aikaasi ja varmista huolellinen lopputulos. Teemme siivouksen joustavasti toiveidesi mukaan.'
                    : 'Spara din tid och säkerställ ett perfekt resultat med Siisti360.')}
              </p>

              <div className="space-y-2 pt-2">
                <button
                  onClick={onBookNow}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff8d43] px-4 py-3 text-xs font-bold text-[#10263d] hover:bg-[#ff9b59] transition-colors shadow-xs"
                >
                  <Calendar className="h-4 w-4" />
                  <span>
                    {richArticle?.relatedServiceCta.buttonText[currentLang] ||
                      (currentLang === 'fi' ? 'Varaa siivous verkossa' : 'Boka städning online')}
                  </span>
                </button>

                <button
                  onClick={onRequestQuote}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-xs font-semibold text-white hover:bg-white/20 transition-colors"
                >
                  <span>{currentLang === 'fi' ? 'Pyydä maksuton tarjous' : 'Begär kostnadsfri offert'}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              {/* Trust items */}
              <div className="pt-4 border-t border-white/10 space-y-2 text-[11px] text-[#9bb3c4]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#0d9d8c]" />
                  <span>100 % Tyytyväisyystakuu tai veloitukseton uusinta</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#0d9d8c]" />
                  <span>Kotitalousvähennys -60 % suoraan verotukseen</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#0d9d8c]" />
                  <span>Vastuuvakuutus 1 000 000 € asti</span>
                </div>
              </div>
            </div>

            {/* Quick Price Estimate Box */}
            <div className="rounded-2xl border border-[#d8e5ec] bg-white p-5 shadow-xs text-xs space-y-3">
              <span className="block font-bold uppercase tracking-wider text-[#087f72]">
                HINTAESIMERKKI & KOTITALOUSVÄHENNYS
              </span>
              <p className="text-[#456176] leading-relaxed">
                Tiesitkö, että muutto- ja kotisiivouksesta saa <strong>60 % verohelpotuksen</strong>?
              </p>
              <div className="rounded-xl bg-[#f5f8fa] p-3 space-y-1">
                <div className="flex justify-between text-[#142c42]">
                  <span>Esimerkki (350 €):</span>
                  <span className="font-semibold line-through text-[#8da0b0]">350 €</span>
                </div>
                <div className="flex justify-between font-bold text-[#087f72] text-sm">
                  <span>Vähennyksen jälkeen:</span>
                  <span>140 € + omavastuu</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
