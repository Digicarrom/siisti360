import React from 'react';
import { Language } from '../data/content';
import { Leaf, Coins, Users, Zap, MapPin, CalendarCheck } from 'lucide-react';

interface WhyChooseProps {
  currentLang: Language;
}

export const WhyChooseSection: React.FC<WhyChooseProps> = ({ currentLang }) => {
  const reasons = [
    {
      id: 'chemicals',
      title: {
        en: 'Safe, non-harmful chemicals',
        fi: 'Turvalliset ja hellävaraiset pesuaineet',
        sv: 'Säkra, skonsamma rengöringsmedel',
      },
      desc: {
        en: 'Effective cleaning with eco-friendly, safe products.',
        fi: 'Tehokas puhtaus ympäristöystävällisillä ja turvallisilla tuotteilla.',
        sv: 'Effektiv rengöring med miljövänliga och säkra produkter.',
      },
      icon: Leaf,
      iconColor: 'text-[#10b981]',
      bgColor: 'bg-[#ecfdf5]',
    },
    {
      id: 'pricing',
      title: {
        en: 'Affordable pricing',
        fi: 'Edullinen ja selkeä hinnoittelu',
        sv: 'Prisvärd & transparent prissättning',
      },
      desc: {
        en: 'High-quality cleaning at a fair and transparent price.',
        fi: 'Huippulaadukas siivous reiluun ja läpinäkyvään hintaan.',
        sv: 'Högkvalitativ städning till ett rättvist och transparent pris.',
      },
      icon: Coins,
      iconColor: 'text-[#ff8d43]',
      bgColor: 'bg-[#fff7ed]',
    },
    {
      id: 'cleaners',
      title: {
        en: 'Trained cleaners',
        fi: 'Koulutetut ja luotettavat siivoojat',
        sv: 'Utbildade städare',
      },
      desc: {
        en: 'Experienced, vetted, and professional cleaning staff.',
        fi: 'Kokeneet, taustatarkastetut ja ammattitaitoiset työntekijät.',
        sv: 'Erfarna, kontrollerade och professionella medarbetare.',
      },
      icon: Users,
      iconColor: 'text-[#0284c7]',
      bgColor: 'bg-[#f0f9ff]',
    },
    {
      id: 'booking',
      title: {
        en: 'Fast booking',
        fi: 'Nopea ja vaivaton varaus',
        sv: 'Snabb och smidig bokning',
      },
      desc: {
        en: 'Get a quote and book in just a few clicks.',
        fi: 'Pyydä tarjous ja vahvista varaus muutamalla klikkauksella.',
        sv: 'Få prisförslag och boka med bara några klick.',
      },
      icon: Zap,
      iconColor: 'text-[#ff8d43]',
      bgColor: 'bg-[#fff7ed]',
    },
    {
      id: 'coverage',
      title: {
        en: 'Local service coverage',
        fi: 'Kattava paikallinen palvelualue',
        sv: 'Lokal täckning i regionen',
      },
      desc: {
        en: 'Reliable cleaning in Helsinki, Espoo, and Vantaa.',
        fi: 'Luotettavaa siivouspalvelua Helsingissä, Espoossa ja Vantaalla.',
        sv: 'Pålitlig städning i Helsingfors, Esbo och Vanda.',
      },
      icon: MapPin,
      iconColor: 'text-[#0d9d8c]',
      bgColor: 'bg-[#f0fdfa]',
    },
    {
      id: 'scheduling',
      title: {
        en: 'Flexible scheduling',
        fi: 'Joustava aikataulutus',
        sv: 'Flexibel schemaläggning',
      },
      desc: {
        en: 'Choose a time that works for you, including evenings and weekends.',
        fi: 'Valitse sinulle parhaiten sopiva aika, myös iltaisin ja viikonloppuisin.',
        sv: 'Välj en tid som passar dig, inklusive kvällar och helger.',
      },
      icon: CalendarCheck,
      iconColor: 'text-[#f43f5e]',
      bgColor: 'bg-[#fff1f2]',
    },
  ];

  return (
    <section className="space-y-5">
      {/* Title */}
      <h2 className="text-xl sm:text-2xl font-[800] tracking-tight text-[#142c42]">
        {currentLang === 'fi'
          ? 'Miksi valita Siisti360?'
          : currentLang === 'sv'
          ? 'Varför välja Siisti360?'
          : 'Why Choose Siisti360?'}
      </h2>

      {/* 6 Cards in 3x2 Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {reasons.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="flex items-start gap-4 rounded-2xl border border-[#e2e9ee] bg-white p-5 shadow-xs hover:border-[#0d9d8c] hover:shadow-sm transition-all"
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${item.bgColor} ${item.iconColor}`}
              >
                <Icon className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-[15.5px] font-[800] text-[#142c42] leading-snug">
                  {item.title[currentLang]}
                </h3>
                <p className="text-[13px] text-[#526a7d] leading-relaxed">
                  {item.desc[currentLang]}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
