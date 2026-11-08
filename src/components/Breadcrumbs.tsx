import React, { useEffect } from 'react';
import { Home, ChevronRight, MapPin, Sparkles, Building2 } from 'lucide-react';
import { Language } from '../data/content';
import { BreadcrumbItem, buildBreadcrumbSchema } from '../utils/urlHierarchy';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  currentLang: Language;
  onNavigate: (hashUrl: string) => void;
  onOpenLocationSearch?: () => void;
  activePostalCode?: string;
  showLocationPill?: boolean;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  currentLang,
  onNavigate,
  onOpenLocationSearch,
  activePostalCode,
  showLocationPill = true,
}) => {
  // Inject or update Schema.org JSON-LD BreadcrumbList in head
  useEffect(() => {
    if (typeof document === 'undefined' || items.length === 0) return;

    const schemaId = 'siisti360-breadcrumb-jsonld';
    let scriptTag = document.getElementById(schemaId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = schemaId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const schemaData = buildBreadcrumbSchema(items);
    scriptTag.textContent = JSON.stringify(schemaData);

    return () => {
      // Cleanup on unmount if needed
    };
  }, [items]);

  if (!items || items.length <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className="group relative flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#d8e6ee] bg-white/80 px-3.5 py-2.5 shadow-xs backdrop-blur-md transition-all text-xs"
    >
      {/* Breadcrumb Links List */}
      <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[#4c6275]">
        {items.map((item, index) => {
          const isFirst = index === 0;
          const isLast = index === items.length - 1 || item.isCurrent;

          return (
            <li key={index} className="flex items-center gap-1.5 sm:gap-2">
              {/* Divider Chevron */}
              {!isFirst && (
                <ChevronRight className="h-3.5 w-3.5 text-[#9ab3c5] shrink-0" aria-hidden="true" />
              )}

              {/* Breadcrumb item */}
              {isLast ? (
                <span
                  aria-current="page"
                  className="inline-flex items-center gap-1.5 font-bold text-[#142c42] bg-[#f0f6fa] px-2 py-0.5 rounded-md"
                >
                  {isFirst && <Home className="h-3.5 w-3.5 text-[#0d9d8c]" />}
                  <span className="truncate max-w-[200px] sm:max-w-xs">{item.label}</span>
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => onNavigate(item.url)}
                  className="inline-flex items-center gap-1.5 font-medium text-[#4c6275] hover:text-[#087f72] hover:underline transition-colors focus:outline-none focus:ring-1 focus:ring-[#0d9d8c] rounded px-1"
                >
                  {isFirst && <Home className="h-3.5 w-3.5 text-[#087f72]" />}
                  <span className="truncate max-w-[160px] sm:max-w-none">{item.label}</span>
                </button>
              )}
            </li>
          );
        })}
      </ol>

      {/* Right side helper / fast location switcher badge */}
      {showLocationPill && onOpenLocationSearch && (
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenLocationSearch}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#a2e4d8] bg-[#f0faf7] px-2.5 py-1 text-[11px] font-bold text-[#087f72] hover:bg-[#e2f5f1] transition-all"
            title={
              currentLang === 'fi'
                ? 'Vaihda kaupunkia tai kaupunginosaa'
                : currentLang === 'sv'
                ? 'Byt stad eller stadsdel'
                : 'Change city or neighborhood'
            }
          >
            <MapPin className="h-3 w-3 text-[#0d9d8c]" />
            <span>
              {activePostalCode
                ? `${activePostalCode} • ${
                    currentLang === 'fi'
                      ? 'Vaihda alue'
                      : currentLang === 'sv'
                      ? 'Byt område'
                      : 'Change'
                  }`
                : currentLang === 'fi'
                ? 'Valitse alue'
                : currentLang === 'sv'
                ? 'Välj område'
                : 'Select area'}
            </span>
          </button>
        </div>
      )}
    </nav>
  );
};
