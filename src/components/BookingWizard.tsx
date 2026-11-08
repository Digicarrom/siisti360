import React, { useState, useEffect } from 'react';
import { Language } from '../data/content';
import { TRANSLATIONS } from '../data/translations';
import {
  calculateEstimate,
  formatEuro,
  getAvailableSlots,
  PricingModel,
  ServiceType,
  ExtraOption,
} from '../utils/pricing';
import {
  CalendarCheck,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  MapPin,
  Clock,
  Sparkles,
  ShieldCheck,
  Calendar,
} from 'lucide-react';

import { NeighborhoodInfo, findPostalEntry, FINNISH_POSTAL_CODES } from '../data/locations';
import { Breadcrumbs } from './Breadcrumbs';
import { BreadcrumbItem } from '../utils/urlHierarchy';

interface BookingWizardProps {
  currentLang: Language;
  selectedNeighborhood?: NeighborhoodInfo | null;
  selectedPostalCode?: string;
  breadcrumbs?: BreadcrumbItem[];
  onNavigateUrl?: (url: string) => void;
  onOpenLocationSearch?: () => void;
  initialData?: {
    model?: PricingModel;
    service?: ServiceType;
    area?: number;
    extras?: ExtraOption[];
    city?: 'helsinki' | 'espoo' | 'vantaa';
    postalCode?: string;
    neighborhoodId?: string;
  };
  isStandalone?: boolean;
}

export const BookingWizard: React.FC<BookingWizardProps> = ({
  currentLang,
  selectedNeighborhood,
  selectedPostalCode,
  breadcrumbs,
  onNavigateUrl,
  onOpenLocationSearch,
  initialData,
  isStandalone = false,
}) => {
  const t = TRANSLATIONS[currentLang];
  const HeadingTag = isStandalone ? 'h1' : 'h2';

  // Stage 1 fields
  const [model, setModel] = useState<PricingModel>(initialData?.model || 'hourly');
  const [service, setService] = useState<ServiceType>(initialData?.service || 'standard');
  const [area, setArea] = useState<number>(initialData?.area || 75);
  const [extras, setExtras] = useState<ExtraOption[]>(initialData?.extras || []);
  const [city, setCity] = useState<'helsinki' | 'espoo' | 'vantaa'>(
    initialData?.city || selectedNeighborhood?.cityId || 'helsinki'
  );

  // Stage 2 fields
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [postcode, setPostcode] = useState<string>(
    initialData?.postalCode || selectedPostalCode || selectedNeighborhood?.postalCodes[0] || '00180'
  );

  // Coupon state
  const [couponCode, setCouponCode] = useState<string>(
    selectedNeighborhood ? selectedNeighborhood.specialOffer.code : ''
  );
  const [isCouponApplied, setIsCouponApplied] = useState<boolean>(!!selectedNeighborhood);

  // Stage 3 fields
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [consent, setConsent] = useState<boolean>(false);

  // Wizard state
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (initialData?.model) setModel(initialData.model);
    if (initialData?.service) setService(initialData.service);
    if (initialData?.area) setArea(initialData.area);
    if (initialData?.extras) setExtras(initialData.extras);
    if (initialData?.city) setCity(initialData.city);
    if (initialData?.postalCode) setPostcode(initialData.postalCode);
  }, [initialData]);

  useEffect(() => {
    if (selectedNeighborhood) {
      setCity(selectedNeighborhood.cityId);
      if (selectedPostalCode) {
        setPostcode(selectedPostalCode);
      } else if (selectedNeighborhood.postalCodes[0]) {
        setPostcode(selectedNeighborhood.postalCodes[0]);
      }
      setCouponCode(selectedNeighborhood.specialOffer.code);
      setIsCouponApplied(true);
    }
  }, [selectedNeighborhood, selectedPostalCode]);

  // Set min date to tomorrow
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split('T')[0];

  const availableSlots = date ? getAvailableSlots(date) : [];

  const estimate = calculateEstimate({
    model,
    service,
    area: Math.max(10, Math.min(1000, area)),
    extras,
  });

  const handleNextFromStep1 = () => {
    setErrorMessage('');
    setCurrentStep(2);
  };

  const handleNextFromStep2 = () => {
    setErrorMessage('');
    if (!date) {
      setErrorMessage(t.booking.validation.date);
      return;
    }
    if (!time) {
      setErrorMessage(t.booking.validation.time);
      return;
    }
    if (!address.trim() || address.trim().length < 4) {
      setErrorMessage(t.booking.validation.address);
      return;
    }
    if (!/^\d{5}$/.test(postcode.trim())) {
      setErrorMessage(t.booking.validation.postal);
      return;
    }
    setCurrentStep(3);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage(t.booking.validation.name);
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage(currentLang === 'fi' ? 'Anna toimiva sähköpostiosoite.' : currentLang === 'sv' ? 'Ange en giltig e-postadress.' : 'Please enter a valid email address.');
      return;
    }
    if (!phone.trim()) {
      setErrorMessage(t.booking.validation.contact);
      return;
    }
    if (!consent) {
      setErrorMessage(t.booking.validation.consent);
      return;
    }

    // Generate reference code
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    const refCode = `S360-B${randomHex}`;
    setSubmittedRef(refCode);
  };

  const resetForm = () => {
    setSubmittedRef(null);
    setCurrentStep(1);
    setDate('');
    setTime('');
    setAddress('');
    setName('');
    setEmail('');
    setPhone('');
    setNotes('');
    setConsent(false);
  };

  if (submittedRef) {
    return (
      <section id="booking" className="rounded-2xl border border-[#a5dbd2] bg-gradient-to-br from-[#edf8f6] to-white p-8 text-center shadow-lg">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0d9d8c] text-white shadow-md">
          <CheckCircle className="h-9 w-9 stroke-[2.2]" />
        </div>
        <span className="mt-4 inline-block text-xs font-bold uppercase tracking-wider text-[#087f72]">
          {t.booking.successTitle}
        </span>
        <h2 className="mt-1 text-2xl font-black text-[#10263d]">
          {t.booking.bookingRefLabel}: <span className="font-mono text-[#0d9d8c]">{submittedRef}</span>
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-[#4c6a79] leading-relaxed">
          {t.booking.successMessage}
        </p>

        {/* Summary Card */}
        <div className="mx-auto mt-6 max-w-md rounded-xl border border-[#d2ebe5] bg-white p-5 text-left text-xs text-[#203c4e] space-y-2 shadow-xs">
          <div className="flex justify-between border-b border-[#eef5f4] pb-2">
            <span className="text-[#677c8d]">Palvelu:</span>
            <strong className="capitalize">{service} ({model})</strong>
          </div>
          <div className="flex justify-between border-b border-[#eef5f4] pb-2">
            <span className="text-[#677c8d]">Toivottu aika:</span>
            <strong>{date} klo {time}</strong>
          </div>
          <div className="flex justify-between border-b border-[#eef5f4] pb-2">
            <span className="text-[#677c8d]">Osoite:</span>
            <strong>{address}, {postcode} ({city})</strong>
          </div>
          <div className="flex justify-between pt-1">
            <span className="text-[#677c8d]">Arvioitu hinta:</span>
            <strong className="text-sm font-bold text-[#ff8d43] font-mono">
              {formatEuro(estimate.total, currentLang)}
            </strong>
          </div>
        </div>

        <button
          onClick={resetForm}
          className="mt-6 rounded-xl bg-[#10263d] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#1b3d5c] transition-colors"
        >
          Lähetä uusi varauspyyntö
        </button>
      </section>
    );
  }

  return (
    <section id="booking" className="space-y-6">
      {/* Dynamic Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumbs
          items={breadcrumbs}
          currentLang={currentLang}
          onNavigate={(url) => (onNavigateUrl ? onNavigateUrl(url) : (window.location.hash = url))}
          onOpenLocationSearch={onOpenLocationSearch}
          activePostalCode={selectedPostalCode || selectedNeighborhood?.postalCodes[0]}
        />
      )}

      {/* Header */}
      <div>
        <span className="text-[10.5px] font-[750] uppercase tracking-[1.55px] text-[#0d9d8c]">
          {t.booking.badge}
        </span>
        <HeadingTag className="mt-1 text-2xl sm:text-3xl font-[780] tracking-[-0.045em] text-[#142c42] leading-[1.2]">
          {t.booking.title}
        </HeadingTag>
        <p className="mt-1.5 text-[15px] sm:text-[16px] text-[#526a7d] max-w-2xl leading-[1.6]">{t.booking.subtitle}</p>
      </div>

      {/* Detected Location Badge */}
      {selectedNeighborhood && (
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#a2e4d8] bg-[#f2faf7] p-3 text-xs text-[#087f72]">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-[#0d9d8c] animate-pulse"></span>
            <MapPin className="h-4 w-4 text-[#0d9d8c]" />
            <span className="font-bold text-[#142c42]">
              {currentLang === 'fi'
                ? `Tunnistettu varauskohde: ${selectedNeighborhood.names[currentLang]} (${selectedPostalCode || selectedNeighborhood.postalCodes[0]})`
                : `Detected Booking Location: ${selectedNeighborhood.names[currentLang]} (${selectedPostalCode || selectedNeighborhood.postalCodes[0]})`}
            </span>
            <span className="text-[#526a7d]">
              • {currentLang === 'fi' ? '0 € matkakulut' : '0 € travel fee'}
            </span>
          </div>

          <span className="rounded bg-[#ff8d43] px-2 py-0.5 text-[11px] font-extrabold text-[#10263d] font-mono">
            {selectedNeighborhood.specialOffer.code} (-{selectedNeighborhood.specialOffer.discountPercent}%)
          </span>
        </div>
      )}

      {/* 3 Step Pill Indicator */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-[12.5px] font-[750]">
        <div
          className={`flex items-center gap-1.5 rounded-full px-4 py-2 transition-colors ${
            currentStep === 1
              ? 'bg-[#10263d] text-white shadow-xs'
              : 'bg-[#e2e9ee] text-[#526a7d]'
          }`}
        >
          <span>{t.booking.step1}</span>
        </div>
        <div
          className={`flex items-center gap-1.5 rounded-full px-4 py-2 transition-colors ${
            currentStep === 2
              ? 'bg-[#10263d] text-white shadow-xs'
              : 'bg-[#e2e9ee] text-[#526a7d]'
          }`}
        >
          <span>{t.booking.step2}</span>
        </div>
        <div
          className={`flex items-center gap-1.5 rounded-full px-4 py-2 transition-colors ${
            currentStep === 3
              ? 'bg-[#10263d] text-white shadow-xs'
              : 'bg-[#e2e9ee] text-[#526a7d]'
          }`}
        >
          <span>{t.booking.step3}</span>
        </div>
      </div>

      {/* Main Booking Form Panel */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 rounded-2xl border border-[#e2e9ee] bg-white p-6 shadow-sm lg:grid-cols-12">
        {/* Left Form Content */}
        <div className="space-y-5 lg:col-span-8">
          {errorMessage && (
            <div className="rounded-xl border border-[#fca5a5] bg-[#fef2f2] p-3 text-xs font-semibold text-[#b91c1c]">
              {errorMessage}
            </div>
          )}

          {/* STEP 1: Service & Pricing Model */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-base sm:text-[17px] font-[780] text-[#142c42]">{t.booking.step1}</h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="booking-service" className="text-[13.5px] font-bold text-[#142c42]">
                    {t.calculator.serviceLabel}
                  </label>
                  <select
                    id="booking-service"
                    value={service}
                    onChange={(e) => setService(e.target.value as ServiceType)}
                    className="mt-1.5 w-full min-h-[44px] rounded-xl border border-[#ccd9e0] bg-white px-3 py-2 text-sm font-medium text-[#142c42]"
                  >
                    <option value="standard">{t.booking.serviceOptions.standard}</option>
                    <option value="deep">{t.booking.serviceOptions.deep}</option>
                    <option value="move">{t.booking.serviceOptions.move}</option>
                    <option value="office">{t.booking.serviceOptions.office}</option>
                    <option value="carpet">{t.booking.serviceOptions.carpet}</option>
                    <option value="sofa">{t.booking.serviceOptions.sofa}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="booking-model" className="text-[13.5px] font-bold text-[#142c42]">
                    {t.calculator.modelLabel}
                  </label>
                  <select
                    id="booking-model"
                    value={model}
                    onChange={(e) => setModel(e.target.value as PricingModel)}
                    className="mt-1.5 w-full min-h-[44px] rounded-xl border border-[#ccd9e0] bg-white px-3 py-2 text-sm font-medium text-[#142c42]"
                  >
                    <option value="hourly">{t.booking.modelOptions.hourly}</option>
                    <option value="fixed">{t.booking.modelOptions.fixed}</option>
                    <option value="monthly">{t.booking.modelOptions.monthly}</option>
                    <option value="contract">{t.booking.modelOptions.contract}</option>
                    <option value="oneTime">{t.booking.modelOptions.oneTime}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="booking-area" className="text-[13.5px] font-bold text-[#142c42]">
                    {t.calculator.areaLabel}
                  </label>
                  <input
                    id="booking-area"
                    type="number"
                    min="15"
                    max="1000"
                    value={area}
                    onChange={(e) => setArea(Number(e.target.value))}
                    className="mt-1.5 w-full min-h-[44px] rounded-xl border border-[#ccd9e0] bg-white px-3 py-2 text-sm font-semibold text-[#142c42] font-mono"
                  />
                </div>

                <div>
                  <label htmlFor="booking-city" className="text-[13.5px] font-bold text-[#142c42]">
                    {t.calculator.cityLabel}
                  </label>
                  <select
                    id="booking-city"
                    value={city}
                    onChange={(e) => setCity(e.target.value as 'helsinki' | 'espoo' | 'vantaa')}
                    className="mt-1.5 w-full min-h-[44px] rounded-xl border border-[#ccd9e0] bg-white px-3 py-2 text-sm font-medium text-[#142c42]"
                  >
                    <option value="helsinki">Helsinki</option>
                    <option value="espoo">Espoo</option>
                    <option value="vantaa">Vantaa</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Date, Time & Address */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-base sm:text-[17px] font-[780] text-[#142c42]">{t.booking.step2}</h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="booking-date" className="text-[13.5px] font-bold text-[#142c42]">
                    {t.booking.dateLabel}
                  </label>
                  <input
                    id="booking-date"
                    type="date"
                    min={minDateStr}
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                      setTime('');
                    }}
                    required
                    className="mt-1.5 w-full min-h-[44px] rounded-xl border border-[#ccd9e0] bg-white px-3 py-2 text-sm font-medium text-[#142c42]"
                  />
                </div>

                <div>
                  <label className="text-[13.5px] font-bold text-[#142c42]">{t.booking.timeLabel}</label>
                  {!date ? (
                    <p className="mt-2 text-xs text-[#8ba7b8]">{t.booking.noSlotsNotice}</p>
                  ) : availableSlots.length === 0 ? (
                    <p className="mt-2 text-xs font-semibold text-[#c53030]">
                      {t.booking.closedSundayNotice}
                    </p>
                  ) : (
                    <div className="mt-1.5 flex flex-wrap gap-2">
                      {availableSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setTime(slot)}
                          className={`min-h-[42px] rounded-xl px-4 py-2 text-[13px] font-[750] transition-all ${
                            time === slot
                              ? 'bg-[#0d9d8c] text-white shadow-xs'
                              : 'border border-[#ccd9e0] bg-[#f8fafb] text-[#142c42] hover:bg-[#eaf1f5]'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="sm:col-span-2">
                  <label htmlFor="booking-address" className="text-[13.5px] font-bold text-[#142c42]">
                    {t.booking.addressLabel}
                  </label>
                  <input
                    id="booking-address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Esim. Mannerheimintie 14 B 22"
                    required
                    className="mt-1.5 w-full min-h-[44px] rounded-xl border border-[#ccd9e0] bg-white px-3 py-2 text-sm font-medium text-[#142c42]"
                  />
                </div>
                <div>
                  <label htmlFor="booking-postcode" className="text-[13.5px] font-bold text-[#142c42]">
                    {t.booking.postalLabel}
                  </label>
                  <input
                    id="booking-postcode"
                    type="text"
                    maxLength={5}
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    required
                    className="mt-1.5 w-full min-h-[44px] rounded-xl border border-[#ccd9e0] bg-white px-3 py-2 text-sm font-medium text-[#142c42] font-mono"
                  />
                  {/* Live Finnish Postal Code Coverage Feedback */}
                  {postcode.trim().length === 5 && (
                    <div className="mt-1.5">
                      {findPostalEntry(postcode) ? (
                        <div className="flex items-center gap-1 text-[11px] font-bold text-[#087f72]">
                          <span>✓</span>
                          <span>
                            {findPostalEntry(postcode)?.neighborhoodName},{' '}
                            {findPostalEntry(postcode)?.cityName} (Vahvistettu toimialue)
                          </span>
                        </div>
                      ) : (
                        <div className="text-[11px] font-semibold text-amber-700">
                          ⚠️ Postinumero {postcode} on Siisti360:n nykyisen pääalueen ulkopuolella.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Contact info & consent */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-base sm:text-[17px] font-[780] text-[#142c42]">{t.booking.step3}</h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="booking-name" className="text-[13.5px] font-bold text-[#142c42]">
                    {t.booking.nameLabel} *
                  </label>
                  <input
                    id="booking-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Matti Meikäläinen"
                    required
                    className="mt-1.5 w-full min-h-[44px] rounded-xl border border-[#ccd9e0] bg-white px-3 py-2 text-sm font-medium text-[#142c42]"
                  />
                </div>

                <div>
                  <label htmlFor="booking-email" className="text-[13.5px] font-bold text-[#142c42]">
                    {t.booking.emailLabel} *
                  </label>
                  <input
                    id="booking-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="matti@example.fi"
                    required
                    className="mt-1.5 w-full min-h-[44px] rounded-xl border border-[#ccd9e0] bg-white px-3 py-2 text-sm font-medium text-[#142c42]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="booking-phone" className="text-[13.5px] font-bold text-[#142c42]">
                    {t.booking.phoneLabel} *
                  </label>
                  <input
                    id="booking-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+358 40 123 4567"
                    required
                    className="mt-1.5 w-full min-h-[44px] rounded-xl border border-[#ccd9e0] bg-white px-3 py-2 text-sm font-medium text-[#142c42]"
                  />
                </div>

                <div>
                  <label htmlFor="booking-company" className="text-[13.5px] font-bold text-[#142c42]">
                    {t.booking.companyLabel}
                  </label>
                  <input
                    id="booking-company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Yritys Oy (valinnainen)"
                    className="mt-1.5 w-full min-h-[44px] rounded-xl border border-[#ccd9e0] bg-white px-3 py-2 text-sm font-medium text-[#142c42]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="booking-notes" className="text-[13.5px] font-bold text-[#142c42]">
                  {t.booking.notesLabel}
                </label>
                <textarea
                  id="booking-notes"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Esim. Kohteessa on koira, ovikoodi 1234..."
                  className="mt-1.5 w-full rounded-xl border border-[#ccd9e0] bg-white px-3 py-2.5 text-sm font-medium text-[#142c42]"
                />
              </div>

              <label className="flex items-start gap-2 text-[13px] text-[#526a7d] cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded accent-[#0d9d8c]"
                />
                <span>
                  {t.booking.consentLabel}{' '}
                  <span className="text-[#0d9d8c] underline">({t.booking.privacyLink})</span>
                </span>
              </label>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-[#f0f4f7]">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => (prev - 1) as 1 | 2)}
                className="flex items-center gap-1.5 min-h-[46px] rounded-xl border border-[#e2e9ee] bg-white px-5 py-2.5 text-[13.5px] font-[750] text-[#526a7d] hover:bg-[#f5f8fa]"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>{t.booking.backBtn}</span>
              </button>
            ) : <div />}

            {currentStep === 1 && (
              <button
                type="button"
                onClick={handleNextFromStep1}
                className="flex items-center gap-1.5 min-h-[46px] rounded-xl bg-[#ff8d43] px-6 py-2.5 text-[14px] sm:text-[15px] font-[750] text-[#10263d] hover:bg-[#ff9b59] shadow-xs"
              >
                <span>{t.booking.nextBtn}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            )}

            {currentStep === 2 && (
              <button
                type="button"
                onClick={handleNextFromStep2}
                className="flex items-center gap-1.5 min-h-[46px] rounded-xl bg-[#ff8d43] px-6 py-2.5 text-[14px] sm:text-[15px] font-[750] text-[#10263d] hover:bg-[#ff9b59] shadow-xs"
              >
                <span>{t.booking.nextBtn}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            )}

            {currentStep === 3 && (
              <button
                type="submit"
                className="flex items-center gap-1.5 min-h-[46px] rounded-xl bg-[#0d9d8c] px-6 py-2.5 text-[14px] sm:text-[15px] font-[750] text-white hover:bg-[#0b8778] shadow-xs"
              >
                <span>{t.booking.submitBtn}</span>
                <CheckCircle className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Right Live Summary Box */}
        <div className="flex flex-col justify-between rounded-xl bg-[#10263d] p-5 text-white lg:col-span-4">
          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#9ddbd1]">
              VARAUSYHTEENVETO
            </span>

            <div className="rounded-lg bg-white/5 p-3 text-xs space-y-2 border border-white/10">
              <div className="flex justify-between">
                <span className="text-[#a1b8c5]">Palvelu:</span>
                <strong className="capitalize">{service}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#a1b8c5]">Malli:</span>
                <strong className="capitalize">{model}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#a1b8c5]">Koko:</span>
                <strong className="font-mono">{area} m²</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#a1b8c5]">Toivottu aika:</span>
                <strong>{date ? `${date} ${time || ''}` : 'Valitse vaiheessa 2'}</strong>
              </div>
            </div>

            <div>
              <span className="text-[11px] text-[#b8d1dc]">Arvioitu hinta:</span>
              <div className="mt-1 text-2xl font-black font-mono text-[#ff8d43]">
                {formatEuro(estimate.total, currentLang)}
              </div>
              <p className="mt-1 text-[10px] text-[#8ea7b8] leading-tight">
                Ei sitova tilaus. Lopullinen aika ja hinta sovitaan ennen aloitusta.
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 text-[11px] text-[#9ddbd1]">
            <ShieldCheck className="h-4 w-4 shrink-0 text-[#69dfbd]" />
            <span>Maksuton peruutus 24h ennen sovittua aikaa</span>
          </div>
        </div>
      </form>
    </section>
  );
};
