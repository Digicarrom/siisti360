import React from 'react';
import { Language } from '../data/content';
import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';

interface FooterProps {
  currentLang: Language;
  onNavigate: (sectionId: string, serviceId?: string, cityId?: string) => void;
  onOpenDirectory?: () => void;
  onOpenTypography?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, onNavigate }) => {
  return (
    <footer className="w-full border-t border-[#e2e9ee] bg-white pt-14 pb-8 text-[#142c42]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 pb-12">
          {/* Column 1: Brand & Social */}
          <div className="space-y-4 lg:col-span-1">
            {/* Logo with 360 circle swirl */}
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center text-left cursor-pointer"
            >
              <span className="text-[24px] font-[900] tracking-tight text-[#10263d]">
                Siisti
              </span>
              <span className="relative ml-0.5 inline-flex items-center justify-center font-[900] text-[24px] text-[#ff8d43]">
                360
                <svg
                  className="absolute -inset-1.5 w-[calc(100%+12px)] h-[calc(100%+12px)] pointer-events-none text-[#ff8d43]"
                  viewBox="0 0 70 36"
                  fill="none"
                >
                  <ellipse
                    cx="35"
                    cy="18"
                    rx="32"
                    ry="15"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeDasharray="4 2"
                    transform="rotate(-8 35 18)"
                  />
                </svg>
              </span>
            </button>

            <p className="text-[13px] text-[#526a7d] leading-relaxed">
              {currentLang === 'fi'
                ? 'Luotettavat siivouspalvelut koteihin ja yrityksiin Helsingissä, Espoossa ja Vantaalla.'
                : currentLang === 'sv'
                ? 'Pålitliga städtjänster för hem och företag i Helsingfors, Esbo och Vanda.'
                : 'Reliable cleaning services for homes and businesses in Helsinki, Espoo, and Vantaa.'}
            </p>

            {/* Social Icons (Facebook, Instagram, LinkedIn, YouTube) */}
            <div className="flex items-center gap-2 pt-2">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1877f2] text-white hover:opacity-90 transition-opacity"
                aria-label="Facebook"
              >
                <span className="text-xs font-bold font-sans">f</span>
              </a>
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white hover:opacity-90 transition-opacity"
                aria-label="Instagram"
              >
                <span className="text-xs font-bold font-sans">📷</span>
              </a>
              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0077b5] text-white hover:opacity-90 transition-opacity"
                aria-label="LinkedIn"
              >
                <span className="text-xs font-bold font-sans">in</span>
              </a>
              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ff0000] text-white hover:opacity-90 transition-opacity"
                aria-label="YouTube"
              >
                <span className="text-xs font-bold font-sans">▶</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-[13.5px] font-[800] text-[#142c42]">
              {currentLang === 'fi' ? 'Pikalinkit' : currentLang === 'sv' ? 'Snabblänkar' : 'Quick Links'}
            </h4>
            <ul className="space-y-2 text-[13px] text-[#526a7d]">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#0d9d8c] transition-colors cursor-pointer"
                >
                  {currentLang === 'fi' ? 'Etusivu' : currentLang === 'sv' ? 'Hem' : 'Home'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-[#0d9d8c] transition-colors cursor-pointer"
                >
                  {currentLang === 'fi' ? 'Palvelut' : currentLang === 'sv' ? 'Tjänster' : 'Services'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('pricing')}
                  className="hover:text-[#0d9d8c] transition-colors cursor-pointer"
                >
                  {currentLang === 'fi' ? 'Hinnasto' : currentLang === 'sv' ? 'Priser' : 'Pricing'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('booking')}
                  className="hover:text-[#0d9d8c] transition-colors cursor-pointer"
                >
                  {currentLang === 'fi' ? 'Varaus' : currentLang === 'sv' ? 'Bokning' : 'Booking'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('areas')}
                  className="hover:text-[#0d9d8c] transition-colors cursor-pointer"
                >
                  {currentLang === 'fi' ? 'Toimialueet' : currentLang === 'sv' ? 'Områden' : 'Areas'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('guides')}
                  className="hover:text-[#0d9d8c] transition-colors cursor-pointer"
                >
                  {currentLang === 'fi' ? 'Blogi' : currentLang === 'sv' ? 'Blogg' : 'Blog'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#0d9d8c] transition-colors cursor-pointer"
                >
                  {currentLang === 'fi' ? 'Yhteystiedot' : currentLang === 'sv' ? 'Kontakt' : 'Contact'}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Services (12 links) */}
          <div className="space-y-3">
            <h4 className="text-[13.5px] font-[800] text-[#142c42]">
              {currentLang === 'fi' ? 'Palvelumme' : currentLang === 'sv' ? 'Våra tjänster' : 'Our Services'}
            </h4>
            <ul className="space-y-1.5 text-[12.5px] text-[#526a7d]">
              {[
                { en: 'Home Cleaning', fi: 'Kotisiivous', sv: 'Hemstädning', slug: 'home-cleaning' },
                { en: 'Deep Cleaning', fi: 'Suursiivous', sv: 'Storstädning', slug: 'deep-cleaning' },
                { en: 'Office Cleaning', fi: 'Toimistosiivous', sv: 'Kontorsstädning', slug: 'office-cleaning' },
                { en: 'Move-out Cleaning', fi: 'Muuttosiivous', sv: 'Flyttstädning', slug: 'move-out-cleaning' },
                { en: 'Bathroom Cleaning', fi: 'Kylpyhuonesiivous', sv: 'Badrumsstädning', slug: 'bathroom-cleaning' },
                { en: 'Sofa Cleaning', fi: 'Sohvan pesu', sv: 'Sofftvätt', slug: 'sofa-cleaning' },
                { en: 'Carpet Cleaning', fi: 'Mattopesu', sv: 'Mattvätt', slug: 'carpet-cleaning' },
                { en: 'Window Cleaning', fi: 'Ikkunanpesu', sv: 'Fönsterputsning', slug: 'window-cleaning' },
                { en: 'Kitchen Cleaning', fi: 'Keittiösiivous', sv: 'Kökssanering', slug: 'kitchen-cleaning' },
                { en: 'Post-Construction Cleaning', fi: 'Remonttisiivous', sv: 'Byggstädning', slug: 'post-construction-cleaning' },
                { en: 'Recurring Cleaning', fi: 'Ylläpitosiivous', sv: 'Regelbunden städning', slug: 'recurring-cleaning' },
                { en: 'Contract Cleaning', fi: 'Sopimussiivous', sv: 'Avtalsstädning', slug: 'contract-cleaning' },
              ].map((s) => (
                <li key={s.slug}>
                  <button
                    onClick={() => onNavigate('service-detail', s.slug)}
                    className="hover:text-[#0d9d8c] transition-colors text-left"
                  >
                    {s[currentLang]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Service Areas (8 links + All Areas) */}
          <div className="space-y-3">
            <h4 className="text-[13.5px] font-[800] text-[#142c42]">
              {currentLang === 'fi' ? 'Toimialueet' : currentLang === 'sv' ? 'Verksamhetsområden' : 'Service Areas'}
            </h4>
            <ul className="space-y-1.5 text-[12.5px] text-[#526a7d]">
              {['Helsinki', 'Espoo', 'Vantaa', 'Kamppi', 'Ruoholahti', 'Tapiola', 'Leppävaara', 'Myyrmäki'].map((area) => (
                <li key={area}>
                  <button
                    onClick={() => {
                      const lower = area.toLowerCase().replace('ä', 'a').replace('ä', 'a');
                      if (['helsinki', 'espoo', 'vantaa'].includes(lower)) {
                        onNavigate('city-detail', undefined, lower);
                      } else {
                        onNavigate('neighborhood-detail', lower);
                      }
                    }}
                    className="hover:text-[#0d9d8c] transition-colors text-left"
                  >
                    {area}
                  </button>
                </li>
              ))}
              <li className="pt-1.5">
                <button
                  onClick={() => onNavigate('areas')}
                  className="flex items-center gap-1 font-bold text-[#0d9d8c] hover:underline text-[12.5px]"
                >
                  <span>{currentLang === 'fi' ? 'Kaikki alueet' : currentLang === 'sv' ? 'Alla områden' : 'All Areas'}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Contact Us */}
          <div className="space-y-3">
            <h4 className="text-[13.5px] font-[800] text-[#142c42]">
              {currentLang === 'fi' ? 'Ota yhteyttä' : currentLang === 'sv' ? 'Kontakta oss' : 'Contact Us'}
            </h4>
            <ul className="space-y-2.5 text-[12.5px] text-[#526a7d]">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#0d9d8c] shrink-0" />
                <a href="tel:+358401234567" className="hover:text-[#0d9d8c] font-medium font-mono">
                  +358 40 123 4567
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#0d9d8c] shrink-0" />
                <a href="mailto:info@siisti360.fi" className="hover:text-[#0d9d8c]">
                  info@siisti360.fi
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#0d9d8c] shrink-0" />
                <span>Helsinki, Finland</span>
              </li>
              <li className="flex items-start gap-2 pt-1 text-[11.5px] text-[#718c9f]">
                <Clock className="h-4 w-4 text-[#0d9d8c] shrink-0 mt-0.5" />
                <div>
                  <div>Mon-Fri 8:00–18:00</div>
                  <div>Sat 9:00–15:00</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="border-t border-[#edf2f5] pt-6 flex flex-col sm:flex-row items-center justify-between text-[12px] text-[#718c9f] gap-3">
          <p>© 2025 Siisti360. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('privacy')} className="hover:text-[#142c42]">
              Privacy Policy
            </button>
            <span>|</span>
            <button onClick={() => onNavigate('terms')} className="hover:text-[#142c42]">
              Terms of Service
            </button>
            <span>|</span>
            <button onClick={() => onNavigate('cookies')} className="hover:text-[#142c42]">
              Cookie Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
