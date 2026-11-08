import React from 'react';
import { Language } from '../data/content';
import { Clock, Layers, Calendar, Building2, Sparkles, ArrowRight } from 'lucide-react';

interface PricingCardsProps {
  currentLang: Language;
  onViewFullPricing: () => void;
  onSelectModel: (model: string) => void;
}

export const PricingCardsSection: React.FC<PricingCardsProps> = ({
  currentLang,
  onViewFullPricing,
  onSelectModel,
}) => {
  const cards = [
    {
      id: 'hourly',
      title: {
        en: 'Hourly Cleaning',
        fi: 'Tuntisiivous',
        sv: 'Timstädning',
      },
      desc: {
        en: 'Flexible and convenient cleaning by the hour.',
        fi: 'Joustava ja helppo siivous tuntiveloituksella.',
        sv: 'Flexibel och bekväm städning per timme.',
      },
      icon: Clock,
      iconColor: 'text-[#0d9d8c]',
      bgColor: 'bg-[#e6f7f4]',
      pricePrefix: {
        en: 'From',
        fi: 'Alk.',
        sv: 'Från',
      },
      price: '€39 / hour',
      isCustom: false,
    },
    {
      id: 'fixed',
      title: {
        en: 'Fixed Cleaning',
        fi: 'Kiinteähintainen siivous',
        sv: 'Fast pris städning',
      },
      desc: {
        en: 'A set price for a clearly defined cleaning.',
        fi: 'Kiinteä hinta selkeästi määritellylle kokonaisuudelle.',
        sv: 'Ett fast pris för en tydligt definierad städning.',
      },
      icon: Layers,
      iconColor: 'text-[#ff8d43]',
      bgColor: 'bg-[#fff4eb]',
      pricePrefix: {
        en: 'From',
        fi: 'Alk.',
        sv: 'Från',
      },
      price: '€129',
      isCustom: false,
    },
    {
      id: 'monthly',
      title: {
        en: 'Monthly Cleaning',
        fi: 'Kuukausisiivous',
        sv: 'Månadsstädning',
      },
      desc: {
        en: 'Regular cleaning for a consistently clean space.',
        fi: 'Säännöllinen ylläpitosiivous puhtaan kodin puolesta.',
        sv: 'Regelbunden städning för ett ständigt rent hem.',
      },
      icon: Calendar,
      iconColor: 'text-[#10b981]',
      bgColor: 'bg-[#ecfdf5]',
      pricePrefix: {
        en: 'From',
        fi: 'Alk.',
        sv: 'Från',
      },
      price: '€249 / month',
      isCustom: false,
    },
    {
      id: 'contract',
      title: {
        en: 'Contract Cleaning',
        fi: 'Sopimussiivous',
        sv: 'Avtalsstädning',
      },
      desc: {
        en: 'Ongoing cleaning for offices and businesses.',
        fi: 'Jatkuva ja räätälöity siivous yrityksille ja toimitiloille.',
        sv: 'Löpande städning för kontor och företag.',
      },
      icon: Building2,
      iconColor: 'text-[#0284c7]',
      bgColor: 'bg-[#f0f9ff]',
      price: {
        en: 'Custom quote',
        fi: 'Yksilöllinen tarjous',
        sv: 'Skräddarsydd offert',
      },
      isCustom: true,
    },
    {
      id: 'one-time',
      title: {
        en: 'One-time Cleaning',
        fi: 'Kertasiivous',
        sv: 'Engångsstädning',
      },
      desc: {
        en: 'A thorough clean whenever you need it.',
        fi: 'Perusteellinen suursiivous juuri silloin kun tarvitset.',
        sv: 'En grundlig städning precis när du behöver det.',
      },
      icon: Sparkles,
      iconColor: 'text-[#f59e0b]',
      bgColor: 'bg-[#fffbeb]',
      pricePrefix: {
        en: 'From',
        fi: 'Alk.',
        sv: 'Från',
      },
      price: '€99',
      isCustom: false,
    },
  ];

  return (
    <section className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-[800] tracking-tight text-[#142c42]">
            {currentLang === 'fi'
              ? 'Selkeä ja läpinäkyvä hinnoittelu'
              : currentLang === 'sv'
              ? 'Enkel & transparent prissättning'
              : 'Simple & Transparent Pricing'}
          </h2>
          <p className="mt-1 text-[13.5px] sm:text-[14.5px] text-[#526a7d]">
            {currentLang === 'fi'
              ? 'Valitse tarpeisiisi sopiva palvelumalli. Ei piilokuluja.'
              : currentLang === 'sv'
              ? 'Välj den servicemodell som passar dina behov. Inga dolda avgifter.'
              : 'Choose the service model that fits your needs. No hidden fees.'}
          </p>
        </div>

        <button
          onClick={onViewFullPricing}
          className="flex items-center gap-1.5 text-[13.5px] font-[750] text-[#087f72] hover:text-[#0d9d8c] hover:underline cursor-pointer self-start sm:self-auto shrink-0"
        >
          <span>
            {currentLang === 'fi'
              ? 'Katso koko hinnasto'
              : currentLang === 'sv'
              ? 'Se hela prislistan'
              : 'View Full Pricing'}
          </span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* 5 Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              onClick={() => onSelectModel(card.id)}
              className="group flex flex-col justify-between rounded-2xl border border-[#e2e9ee] bg-white p-5 shadow-xs hover:-translate-y-1 hover:border-[#0d9d8c] hover:shadow-md transition-all cursor-pointer"
            >
              <div>
                {/* Icon in soft square */}
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.bgColor} ${card.iconColor}`}
                >
                  <Icon className="h-5 w-5" />
                </div>

                {/* Title & Description */}
                <h3 className="mt-4 text-[16px] font-[800] text-[#142c42] group-hover:text-[#087f72] transition-colors leading-snug">
                  {card.title[currentLang]}
                </h3>
                <p className="mt-1.5 text-[13px] text-[#526a7d] leading-relaxed">
                  {card.desc[currentLang]}
                </p>
              </div>

              {/* Price Row */}
              <div className="mt-6 pt-3 border-t border-[#f0f4f7]">
                {!card.isCustom && card.pricePrefix && (
                  <span className="block text-[11px] font-[650] text-[#7890a1] uppercase tracking-wider">
                    {card.pricePrefix[currentLang]}
                  </span>
                )}
                <div className="text-[20px] font-[850] text-[#ff8d43] font-mono leading-tight">
                  {card.isCustom
                    ? (card.price as any)[currentLang]
                    : (card.price as string)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
