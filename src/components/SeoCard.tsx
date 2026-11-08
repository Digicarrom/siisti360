import React, { useState } from 'react';
import { SeoPage } from '../data/seoCatalog';
import { Search, Globe, ChevronDown, ChevronUp, CheckCircle, Tag, Code } from 'lucide-react';
import { Language } from '../data/content';

interface SeoCardProps {
  seo: SeoPage;
  currentLang: Language;
}

export const SeoCard: React.FC<SeoCardProps> = ({ seo, currentLang }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const langLabels = {
    fi: {
      badge: 'ON-PAGE SEO & HAKUKONETIEDOT',
      primaryLabel: 'Pääavainsana (Primary Keyword)',
      secondaryLabel: 'Tukevat avainsanat (Secondary Keywords)',
      serpPreview: 'Google-hakutulosnäkymä (SERP Snippet Preview)',
      structuredData: 'Schema.org JSON-LD Rakennetieto aktiivinen',
      h1Label: 'Kohdistettu H1-otsikko',
      canonical: 'Kanoninen URL',
      toggleShow: 'Näytä SEO-rakennetiedot',
      toggleHide: 'Piilota SEO-tiedot',
    },
    sv: {
      badge: 'ON-PAGE SEO & SÖKMOTORDATA',
      primaryLabel: 'Primärt sökord (Primary Keyword)',
      secondaryLabel: 'Sekundära sökord (Secondary Keywords)',
      serpPreview: 'Förhandsvisning i Google (SERP Snippet Preview)',
      structuredData: 'Schema.org JSON-LD Strukturerad data aktiv',
      h1Label: 'Mål H1-rubrik',
      canonical: 'Kanonisk URL',
      toggleShow: 'Visa SEO-strukturdata',
      toggleHide: 'Dölj SEO-data',
    },
    en: {
      badge: 'ON-PAGE SEO & SEARCH METADATA',
      primaryLabel: 'Primary Target Keyword',
      secondaryLabel: 'Secondary & Semantic Keywords',
      serpPreview: 'Google Search Result Preview (SERP Snippet)',
      structuredData: 'Schema.org JSON-LD Structured Data Active',
      h1Label: 'Targeted H1 Heading',
      canonical: 'Canonical URL',
      toggleShow: 'Show SEO Structure Data',
      toggleHide: 'Hide SEO Data',
    },
  }[currentLang];

  return (
    <div className="rounded-2xl border border-[#d6e4ec] bg-[#f8fbfe] p-4 text-[#10263d] shadow-xs">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0d9d8c]/15 text-[#087f72]">
            <Search className="h-4 w-4" />
          </div>
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-[#087f72]">
              {langLabels.badge}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#10263d]">
                {langLabels.primaryLabel}:
              </span>
              <span className="inline-flex items-center rounded-md bg-[#e6f4f2] px-2 py-0.5 text-xs font-extrabold text-[#087f72] border border-[#a5dbd2]">
                {seo.primaryKeyword}
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1.5 rounded-lg border border-[#ccdbe4] bg-white px-2.5 py-1 text-xs font-semibold text-[#30485d] hover:bg-[#edf4f8] transition-colors"
        >
          <span>{isExpanded ? langLabels.toggleHide : langLabels.toggleShow}</span>
          {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
        </button>
      </div>

      {/* Expanded details */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-[#e2edf3] space-y-4 animate-in fade-in duration-200">
          {/* Google SERP Snippet Preview */}
          <div className="rounded-xl border border-[#dfe8ee] bg-white p-3.5 shadow-xs">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-[#63788b] mb-1.5">
              {langLabels.serpPreview}
            </span>
            <div className="text-xs text-[#1a0dab] font-medium truncate hover:underline cursor-pointer">
              {seo.canonicalUrl}
            </div>
            <div className="text-sm font-semibold text-[#1a0dab] hover:underline cursor-pointer leading-tight mt-0.5">
              {seo.seoTitle}
            </div>
            <p className="mt-1 text-xs text-[#4d5156] line-clamp-2 leading-relaxed">
              {seo.metaDescription}
            </p>
          </div>

          {/* Secondary Keywords tags */}
          {seo.secondaryKeywords && seo.secondaryKeywords.length > 0 && (
            <div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-[#63788b] mb-1.5 flex items-center gap-1.5">
                <Tag className="h-3.5 w-3.5 text-[#0d9d8c]" />
                {langLabels.secondaryLabel}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {seo.secondaryKeywords.map((kw, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center rounded-md border border-[#e2e9ee] bg-white px-2.5 py-1 text-xs font-medium text-[#2d4356]"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
            <div className="rounded-lg bg-white p-2.5 border border-[#e5ecf0]">
              <span className="block text-[10px] font-bold uppercase text-[#73889b]">
                {langLabels.h1Label}
              </span>
              <span className="font-semibold text-[#10263d]">{seo.h1}</span>
            </div>
            <div className="rounded-lg bg-white p-2.5 border border-[#e5ecf0]">
              <span className="block text-[10px] font-bold uppercase text-[#73889b]">
                {langLabels.canonical}
              </span>
              <span className="font-mono text-[11px] text-[#087f72] break-all">{seo.path}</span>
            </div>
          </div>

          {/* Schema.org verification badge */}
          <div className="flex items-center gap-2 text-xs font-semibold text-[#087f72] bg-[#ebf7f5] p-2.5 rounded-xl border border-[#b2e5dc]">
            <CheckCircle className="h-4 w-4 shrink-0 text-[#0d9d8c]" />
            <span>{langLabels.structuredData} (LocalBusiness, CleaningService, BreadcrumbList)</span>
          </div>
        </div>
      )}
    </div>
  );
};
