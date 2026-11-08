import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { Language } from '../data/content';
import { TRANSLATIONS } from '../data/translations';

interface WhatsAppButtonProps {
  currentLang: Language;
}

export function WhatsAppButton({ currentLang }: WhatsAppButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [customText, setCustomText] = useState('');
  const popoverRef = useRef<HTMLDivElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);

  const t = TRANSLATIONS[currentLang];
  const wt = t.whatsapp;

  // Siisti360 WhatsApp number (Finnish international format without + or spaces)
  const WHATSAPP_NUMBER = '358401234567';

  // Set default message when language changes
  useEffect(() => {
    setCustomText(wt.defaultMessage);
  }, [wt.defaultMessage, currentLang]);

  // Handle outside click to close popover
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isOpen &&
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const generateWhatsAppUrl = (messageText: string) => {
    const encoded = encodeURIComponent(messageText.trim() || wt.defaultMessage);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
  };

  const handleQuickSelect = (msg: string) => {
    setCustomText(msg);
    // Directly open WhatsApp with selected inquiry
    const url = generateWhatsAppUrl(msg);
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  const handleOpenDirect = () => {
    const url = generateWhatsAppUrl(customText || wt.defaultMessage);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-40 select-none print:hidden">
      {/* Popover chat window */}
      {isOpen && (
        <div
          ref={popoverRef}
          role="dialog"
          aria-label={wt.title}
          className="mb-3 w-[calc(100vw-2rem)] max-w-sm rounded-2xl border border-[#d6e2e9] bg-white p-4 shadow-2xl transition-all duration-200 animate-in fade-in slide-in-from-bottom-4"
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-[#f0f4f7] pb-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md">
                  <WhatsAppIcon className="h-6 w-6 fill-current" />
                </div>
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500 animate-pulse" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#10263d] leading-snug">
                  {wt.title}
                </h4>
                <p className="flex items-center gap-1.5 text-xs text-[#0f766e] font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {wt.responseTime}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
              aria-label={currentLang === 'fi' ? 'Sulje' : currentLang === 'sv' ? 'Stäng' : 'Close'}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Subtitle / intro */}
          <p className="mt-2.5 text-xs text-[#526371] leading-relaxed">
            {wt.subtitle}
          </p>

          {/* Pre-filled quick question options */}
          <div className="mt-3 space-y-1.5">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-[#738596]">
              {currentLang === 'fi'
                ? 'Pikavalinnat'
                : currentLang === 'sv'
                ? 'Snabbval'
                : 'Quick options'}
            </span>

            <button
              type="button"
              onClick={() => handleQuickSelect(wt.quickHomeMsg)}
              className="group flex w-full items-center justify-between rounded-xl border border-[#e2e9ee] bg-[#fbfdfd] p-2.5 text-left text-xs font-semibold text-[#10263d] hover:border-[#25D366] hover:bg-[#f0fdf4] transition-all"
            >
              <span className="flex items-center gap-2">
                <span className="text-sm">🏠</span>
                <span>{wt.quickHome}</span>
              </span>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#25D366] group-hover:translate-x-0.5 transition-all" />
            </button>

            <button
              type="button"
              onClick={() => handleQuickSelect(wt.quickMoveMsg)}
              className="group flex w-full items-center justify-between rounded-xl border border-[#e2e9ee] bg-[#fbfdfd] p-2.5 text-left text-xs font-semibold text-[#10263d] hover:border-[#25D366] hover:bg-[#f0fdf4] transition-all"
            >
              <span className="flex items-center gap-2">
                <span className="text-sm">📦</span>
                <span>{wt.quickMove}</span>
              </span>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#25D366] group-hover:translate-x-0.5 transition-all" />
            </button>

            <button
              type="button"
              onClick={() => handleQuickSelect(wt.quickSlotsMsg)}
              className="group flex w-full items-center justify-between rounded-xl border border-[#e2e9ee] bg-[#fbfdfd] p-2.5 text-left text-xs font-semibold text-[#10263d] hover:border-[#25D366] hover:bg-[#f0fdf4] transition-all"
            >
              <span className="flex items-center gap-2">
                <span className="text-sm">📅</span>
                <span>{wt.quickSlots}</span>
              </span>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#25D366] group-hover:translate-x-0.5 transition-all" />
            </button>
          </div>

          {/* Custom message input box */}
          <div className="mt-3">
            <label
              htmlFor="wa-custom-msg"
              className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-[#738596]"
            >
              {currentLang === 'fi'
                ? 'Tai kirjoita oma viestisi:'
                : currentLang === 'sv'
                ? 'Eller skriv eget meddelande:'
                : 'Or write your message:'}
            </label>
            <textarea
              id="wa-custom-msg"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              rows={2}
              className="w-full rounded-xl border border-[#d6e2e9] bg-[#f8fafc] p-2.5 text-xs text-[#10263d] focus:border-[#25D366] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#25D366]/20 transition-all resize-none"
              placeholder={wt.defaultMessage}
            />
          </div>

          {/* Action button */}
          <button
            type="button"
            onClick={handleOpenDirect}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] py-2.5 px-4 text-xs font-bold text-white shadow-md hover:shadow-lg transition-all"
          >
            <WhatsAppIcon className="h-4 w-4 fill-current" />
            <span>{wt.startChat}</span>
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Main floating pill/button */}
      <div className="flex items-center gap-2">
        {/* Subtle hover badge / teaser pill on desktop */}
        {!isOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-2 rounded-full border border-emerald-200/60 bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#10263d] shadow-lg backdrop-blur hover:bg-white hover:border-emerald-400 transition-all group"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="group-hover:text-emerald-700 transition-colors">
              {wt.floatingLabel}
            </span>
          </button>
        )}

        {/* Floating action button */}
        <button
          ref={toggleBtnRef}
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label={wt.ariaLabel}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/40 hover:bg-[#20ba5a] hover:shadow-2xl hover:shadow-[#25D366]/60 hover:scale-105 active:scale-95 transition-all duration-200"
        >
          {isOpen ? (
            <X className="h-6 w-6 stroke-[2.5]" />
          ) : (
            <>
              <WhatsAppIcon className="h-7 w-7 fill-current drop-shadow-sm" />
              {/* Online pulse indicator */}
              <span className="absolute top-0 right-0 -mt-0.5 -mr-0.5 flex h-4 w-4">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60"></span>
                <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-white bg-emerald-700"></span>
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

/**
 * Standard official WhatsApp vector icon
 */
function WhatsAppIcon({ className = 'h-5 w-5 fill-current' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
    >
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}
