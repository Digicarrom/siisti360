import React, { useState } from 'react';
import { Language, SERVICES, CITIES } from '../data/content';
import { TRANSLATIONS } from '../data/translations';
import { Send, CheckCircle2, ShieldCheck } from 'lucide-react';

import { NeighborhoodInfo } from '../data/locations';

interface QuoteFormProps {
  currentLang: Language;
  preselectedService?: string;
  preselectedCity?: string;
  selectedNeighborhood?: NeighborhoodInfo | null;
  selectedPostalCode?: string;
  isStandalone?: boolean;
}

export const QuoteForm: React.FC<QuoteFormProps> = ({
  currentLang,
  preselectedService,
  preselectedCity,
  selectedNeighborhood,
  selectedPostalCode,
  isStandalone = false,
}) => {
  const t = TRANSLATIONS[currentLang];
  const HeadingTag = isStandalone ? 'h1' : 'h2';

  const [customerType, setCustomerType] = useState<'home' | 'business'>('home');
  const [companyName, setCompanyName] = useState('');
  const [service, setService] = useState(preselectedService || 'kotisiivous');
  const [city, setCity] = useState(
    selectedNeighborhood?.cityId || preselectedCity || 'helsinki'
  );
  const [postcode, setPostcode] = useState(
    selectedPostalCode || selectedNeighborhood?.postalCodes[0] || '00180'
  );
  const [size, setSize] = useState('75');
  const [frequency, setFrequency] = useState('biweekly');
  const [preferredDate, setPreferredDate] = useState('');
  const [contactPref, setContactPref] = useState<'email' | 'phone'>('email');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (customerType === 'business' && !companyName.trim()) {
      setErrorMessage(
        currentLang === 'fi'
          ? 'Anna yrityksen nimi.'
          : currentLang === 'sv'
          ? 'Ange företagsnamn.'
          : 'Please enter company name.'
      );
      return;
    }
    if (!name.trim()) {
      setErrorMessage(
        currentLang === 'fi'
          ? 'Anna nimesi.'
          : currentLang === 'sv'
          ? 'Ange ditt namn.'
          : 'Please enter your name.'
      );
      return;
    }
    if (!email.trim() && !phone.trim()) {
      setErrorMessage(
        currentLang === 'fi'
          ? 'Anna puhelinnumero tai sähköposti.'
          : currentLang === 'sv'
          ? 'Ange telefonnummer eller e-post.'
          : 'Please provide email or phone.'
      );
      return;
    }
    if (!consent) {
      setErrorMessage(
        currentLang === 'fi'
          ? 'Hyväksy tietojen käsittely jatkaaksesi.'
          : currentLang === 'sv'
          ? 'Godkänn databehandling för att fortsätta.'
          : 'Please accept terms.'
      );
      return;
    }

    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <section id="quote" className="rounded-2xl border border-[#a5dbd2] bg-[#f0f9f6] p-8 text-center shadow-md">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0d9d8c] text-white shadow-xs">
          <CheckCircle2 className="h-8 w-8 stroke-[2.2]" />
        </div>
        <h3 className="mt-4 text-xl font-bold text-[#142c42]">{t.quoteForm.successMsg}</h3>
        <p className="mx-auto mt-2 max-w-md text-xs text-[#526a7d] leading-relaxed">
          {currentLang === 'fi'
            ? 'Käsittelemme pyyntösi nopeasti ja toimitamme selkeän, kilpailukykyisen tarjouksen.'
            : currentLang === 'sv'
            ? 'Vi behandlar din förfrågan snabbt och återkommer med en tydlig offert.'
            : 'We process your request promptly and provide a clear, competitive quote.'}
        </p>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setName('');
            setEmail('');
            setPhone('');
            setMessage('');
            setConsent(false);
          }}
          className="mt-5 rounded-xl bg-[#10263d] px-5 py-2 text-xs font-bold text-white hover:bg-[#1b3d5c]"
        >
          {currentLang === 'fi'
            ? 'Lähetä toinen tarjouspyyntö'
            : currentLang === 'sv'
            ? 'Skicka en ny offertförfrågan'
            : 'Send another quote request'}
        </button>
      </section>
    );
  }

  return (
    <section id="quote" className="rounded-2xl border border-[#e2e9ee] bg-white p-6 md:p-8 shadow-xs space-y-6">
      <div>
        <span className="text-[10.5px] font-[750] uppercase tracking-[1.55px] text-[#0d9d8c]">
          {t.nav.requestQuote} • Helsinki, Espoo & Vantaa
        </span>
        <HeadingTag className="mt-1 text-2xl sm:text-3xl font-[780] tracking-[-0.045em] text-[#142c42] leading-[1.2]">
          {t.quoteForm.title}
        </HeadingTag>
        <p className="mt-1.5 text-[15px] sm:text-[16px] text-[#526a7d] max-w-2xl leading-[1.6]">{t.quoteForm.subtitle}</p>
      </div>

      {errorMessage && (
        <div className="rounded-xl border border-[#fca5a5] bg-[#fef2f2] p-3 text-xs font-semibold text-[#b91c1c]">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Customer Type Toggle */}
        <div className="grid grid-cols-2 gap-3 max-w-md">
          <button
            type="button"
            onClick={() => setCustomerType('home')}
            className={`min-h-[44px] rounded-xl border p-2.5 text-[13px] font-[750] transition-all ${
              customerType === 'home'
                ? 'border-[#0d9d8c] bg-[#eef7f5] text-[#087f72] ring-1 ring-[#0d9d8c]'
                : 'border-[#e2e9ee] bg-[#f8fafb] text-[#526a7d] hover:bg-[#eef3f6]'
            }`}
          >
            {t.quoteForm.typeHome}
          </button>
          <button
            type="button"
            onClick={() => setCustomerType('business')}
            className={`min-h-[44px] rounded-xl border p-2.5 text-[13px] font-[750] transition-all ${
              customerType === 'business'
                ? 'border-[#0d9d8c] bg-[#eef7f5] text-[#087f72] ring-1 ring-[#0d9d8c]'
                : 'border-[#e2e9ee] bg-[#f8fafb] text-[#526a7d] hover:bg-[#eef3f6]'
            }`}
          >
            {t.quoteForm.typeBusiness}
          </button>
        </div>

        {customerType === 'business' && (
          <div>
            <label htmlFor="quote-company" className="text-[13.5px] font-bold text-[#142c42]">
              {t.quoteForm.companyName} *
            </label>
            <input
              id="quote-company"
              type="text"
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Yritys Oy"
              className="mt-1.5 w-full min-h-[44px] rounded-xl border border-[#ccd9e0] px-3 py-2 text-sm font-medium text-[#142c42]"
            />
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="quote-service" className="text-[13.5px] font-bold text-[#142c42]">
              {t.quoteForm.serviceSelect} *
            </label>
            <select
              id="quote-service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="mt-1.5 w-full min-h-[44px] rounded-xl border border-[#ccd9e0] bg-white px-3 py-2 text-sm font-medium text-[#142c42]"
            >
              {SERVICES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.names[currentLang]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="quote-city" className="text-[13.5px] font-bold text-[#142c42]">
              {t.quoteForm.citySelect} *
            </label>
            <select
              id="quote-city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="mt-1.5 w-full min-h-[44px] rounded-xl border border-[#ccd9e0] bg-white px-3 py-2 text-sm font-medium text-[#142c42]"
            >
              {CITIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.names[currentLang]}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="quote-postcode" className="text-[13.5px] font-bold text-[#142c42]">
              {t.quoteForm.postcode}
            </label>
            <input
              id="quote-postcode"
              type="text"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              placeholder="00100"
              className="mt-1.5 w-full min-h-[44px] rounded-xl border border-[#ccd9e0] px-3 py-2 text-sm font-medium font-mono text-[#142c42]"
            />
          </div>

          <div>
            <label htmlFor="quote-size" className="text-[13.5px] font-bold text-[#142c42]">
              {t.quoteForm.size}
            </label>
            <input
              id="quote-size"
              type="number"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              placeholder="75"
              className="mt-1.5 w-full min-h-[44px] rounded-xl border border-[#ccd9e0] px-3 py-2 text-sm font-medium font-mono text-[#142c42]"
            />
          </div>

          <div>
            <label htmlFor="quote-freq" className="text-[13.5px] font-bold text-[#142c42]">
              {t.quoteForm.frequency}
            </label>
            <select
              id="quote-freq"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="mt-1.5 w-full min-h-[44px] rounded-xl border border-[#ccd9e0] bg-white px-3 py-2 text-sm font-medium text-[#142c42]"
            >
              <option value="once">{t.quoteForm.freqOnce}</option>
              <option value="weekly">{t.quoteForm.freqWeekly}</option>
              <option value="biweekly">{t.quoteForm.freqBiweekly}</option>
              <option value="monthly">{t.quoteForm.freqMonthly}</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="quote-name" className="text-[13.5px] font-bold text-[#142c42]">
              {t.quoteForm.name} *
            </label>
            <input
              id="quote-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Matti Meikäläinen"
              className="mt-1.5 w-full min-h-[44px] rounded-xl border border-[#ccd9e0] px-3 py-2 text-sm font-medium text-[#142c42]"
            />
          </div>

          <div>
            <label htmlFor="quote-email" className="text-[13.5px] font-bold text-[#142c42]">
              {t.quoteForm.email} *
            </label>
            <input
              id="quote-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="matti@example.fi"
              className="mt-1.5 w-full min-h-[44px] rounded-xl border border-[#ccd9e0] px-3 py-2 text-sm font-medium text-[#142c42]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="quote-phone" className="text-[13.5px] font-bold text-[#142c42]">
              {t.quoteForm.phone}
            </label>
            <input
              id="quote-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+358 40 123 4567"
              className="mt-1.5 w-full min-h-[44px] rounded-xl border border-[#ccd9e0] px-3 py-2 text-sm font-medium text-[#142c42]"
            />
          </div>

          <div>
            <label htmlFor="quote-pref" className="text-[13.5px] font-bold text-[#142c42]">
              {t.quoteForm.contactPref}
            </label>
            <select
              id="quote-pref"
              value={contactPref}
              onChange={(e) => setContactPref(e.target.value as 'email' | 'phone')}
              className="mt-1.5 w-full min-h-[44px] rounded-xl border border-[#ccd9e0] bg-white px-3 py-2 text-sm font-medium text-[#142c42]"
            >
              <option value="email">{t.quoteForm.prefEmail}</option>
              <option value="phone">{t.quoteForm.prefPhone}</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="quote-msg" className="text-[13.5px] font-bold text-[#142c42]">
            {t.quoteForm.message}
          </label>
          <textarea
            id="quote-msg"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={
              currentLang === 'fi'
                ? 'Kerro toiveistasi, siivouskohteen kunnosta tai erityistarpeista...'
                : currentLang === 'sv'
                ? 'Berätta om dina önskemål eller särskilda behov...'
                : 'Tell us about your wishes, premises condition or special needs...'
            }
            className="mt-1.5 w-full rounded-xl border border-[#ccd9e0] px-3 py-2.5 text-sm font-medium text-[#142c42]"
          />
        </div>

        <label className="flex items-start gap-2 text-[13px] text-[#526a7d] cursor-pointer pt-1">
          <input
            type="checkbox"
            required
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded accent-[#0d9d8c]"
          />
          <span>{t.quoteForm.consent}</span>
        </label>

        <button
          type="submit"
          className="flex items-center justify-center gap-2 min-h-[48px] rounded-xl bg-[#ff8d43] px-7 py-3 text-[14px] sm:text-[15px] font-[750] text-[#10263d] hover:bg-[#ff9b59] shadow-xs transition-colors"
        >
          <span>{t.quoteForm.sendBtn}</span>
          <Send className="h-4 w-4" />
        </button>
      </form>
    </section>
  );
};
