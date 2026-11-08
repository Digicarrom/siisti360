import React from 'react';
import { Language } from '../data/content';
import { ArrowRight, Home, Bath, Layers, Armchair, Building2, Package, Sparkles, AppWindow } from 'lucide-react';

interface PopularServicesProps {
  currentLang: Language;
  onSelectService: (slug: string) => void;
  onViewAllOffers: () => void;
  onGetQuote: (serviceSlug: string) => void;
}

export const PopularServicesSection: React.FC<PopularServicesProps> = ({
  currentLang,
  onSelectService,
  onViewAllOffers,
  onGetQuote,
}) => {
  const popular = [
    {
      id: 'home-cleaning',
      slug: 'home-cleaning',
      title: {
        en: 'Home Cleaning',
        fi: 'Kotisiivous',
        sv: 'Hemstädning',
      },
      desc: {
        en: 'Keep your home fresh, healthy, and spotless.',
        fi: 'Pidä kotisi raikkaana, terveellisenä ja tahrattoman puhtaana.',
        sv: 'Håll ditt hem fräscht, hälsosamt och skinande rent.',
      },
      image: '/assets/homepage/popular_home.png',
      icon: Home,
      iconColor: 'text-[#10b981]',
    },
    {
      id: 'bathroom-cleaning',
      slug: 'bathroom-cleaning',
      title: {
        en: 'Bathroom Cleaning',
        fi: 'Kylpyhuonesiivous',
        sv: 'Badrumsstädning',
      },
      desc: {
        en: 'Deep sanitize for tiles, grout, and fixtures.',
        fi: 'Perusteellinen laattojen, saumojen ja kalusteiden puhdistus.',
        sv: 'Grundlig rengöring av kakel, fogar och sanitetsporslin.',
      },
      image: '/assets/homepage/activity_bath.png',
      icon: Bath,
      iconColor: 'text-[#3b82f6]',
    },
    {
      id: 'carpet-cleaning',
      slug: 'carpet-cleaning',
      title: {
        en: 'Carpet Cleaning',
        fi: 'Mattosiivous',
        sv: 'Mattvätt',
      },
      desc: {
        en: 'Deep cleaning for fresher, longer-lasting carpets.',
        fi: 'Syväpuhdistus raikkaille ja pitkäikäisille matoille.',
        sv: 'Djuprengöring för fräschare och hållbarare mattor.',
      },
      image: '/assets/homepage/popular_carpet.png',
      icon: Layers,
      iconColor: 'text-[#0d9d8c]',
    },
    {
      id: 'sofa-cleaning',
      slug: 'sofa-cleaning',
      title: {
        en: 'Sofa Cleaning',
        fi: 'Sohvasiivous',
        sv: 'Sofftvätt',
      },
      desc: {
        en: 'Fabric and leather upholstery steam cleaning.',
        fi: 'Kangas- ja nahkaverhoilun höyry- ja tekstiilipesu.',
        sv: 'Ång- och textilrengöring för soffor och fåtöljer.',
      },
      image: '/assets/homepage/activity_sofa.png',
      icon: Armchair,
      iconColor: 'text-[#ea580c]',
    },
    {
      id: 'office-cleaning',
      slug: 'office-cleaning',
      title: {
        en: 'Office Cleaning',
        fi: 'Toimistosiivous',
        sv: 'Kontorsstädning',
      },
      desc: {
        en: 'A cleaner, more productive workplace.',
        fi: 'Puhtaampi, viihtyisämpi ja tuottavampi työyhteisö.',
        sv: 'En renare, mer produktiv och trivsam arbetsplats.',
      },
      image: '/assets/homepage/popular_office.png',
      icon: Building2,
      iconColor: 'text-[#06b6d4]',
    },
    {
      id: 'move-out-cleaning',
      slug: 'move-out-cleaning',
      title: {
        en: 'Move-out Cleaning',
        fi: 'Muuttosiivous',
        sv: 'Flyttstädning',
      },
      desc: {
        en: 'Full move guarantee for apartments and houses.',
        fi: 'Täyden takuun muuttosiivous uuteen ja vanhaan kotiin.',
        sv: 'Flyttstädning med full garanti för lägenheter och hus.',
      },
      image: '/assets/homepage/article_3.png',
      icon: Package,
      iconColor: 'text-[#f97316]',
    },
    {
      id: 'deep-cleaning',
      slug: 'deep-cleaning',
      title: {
        en: 'Deep Cleaning',
        fi: 'Perussiivous',
        sv: 'Storstädning',
      },
      desc: {
        en: 'Thorough intensive cleaning for every corner.',
        fi: 'Tehokas perusteellinen tehopuhdistus kotiin.',
        sv: 'Noggrann och intensiv storstädning av alla ytor.',
      },
      image: '/assets/homepage/article_1.png',
      icon: Sparkles,
      iconColor: 'text-[#f59e0b]',
    },
    {
      id: 'window-cleaning',
      slug: 'window-cleaning',
      title: {
        en: 'Window Cleaning',
        fi: 'Ikkunanpesu',
        sv: 'Fönsterputsning',
      },
      desc: {
        en: 'Streak-free, crystal-clear windows.',
        fi: 'Raidattomat ja kristallinkirkkaat ikkunat.',
        sv: 'Ränderfria och kristallklara fönster.',
      },
      image: '/assets/homepage/popular_window.png',
      icon: AppWindow,
      iconColor: 'text-[#0284c7]',
    },
  ];

  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-[800] tracking-tight text-[#142c42]">
          {currentLang === 'fi'
            ? 'Suosituimmat siivouspalvelut'
            : currentLang === 'sv'
            ? 'Populära städtjänster'
            : 'Popular Cleaning Services'}
        </h2>
        <button
          onClick={onViewAllOffers}
          className="flex items-center gap-1.5 text-[13px] sm:text-[13.5px] font-[750] text-[#087f72] hover:text-[#0d9d8c] hover:underline cursor-pointer"
        >
          <span>
            {currentLang === 'fi'
              ? 'Katso kaikki'
              : currentLang === 'sv'
              ? 'Se alla'
              : 'See All'}
          </span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* 8 Cards Grid: 2 columns on mobile, 4 columns on tablet & desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
        {popular.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => onSelectService(item.slug)}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#e2e9ee] bg-white shadow-2xs hover:-translate-y-1 hover:border-[#0d9d8c] hover:shadow-md transition-all cursor-pointer"
            >
              <div>
                {/* Photo Container */}
                <div className="relative h-28 sm:h-36 w-full overflow-hidden bg-[#eef3f6]">
                  <img
                    src={item.image}
                    alt={item.title[currentLang]}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Card Title & Icon */}
                <div className="p-3 sm:p-4">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Icon className={`h-4 w-4 ${item.iconColor} shrink-0`} />
                    <h3 className="text-[13.5px] sm:text-[15.5px] font-[800] text-[#142c42] group-hover:text-[#087f72] transition-colors truncate">
                      {item.title[currentLang]}
                    </h3>
                  </div>
                  <p className="hidden sm:block mt-1.5 text-[12.5px] text-[#526a7d] leading-relaxed line-clamp-2">
                    {item.desc[currentLang]}
                  </p>
                </div>
              </div>

              {/* Bottom Quote CTA Link */}
              <div className="px-3 pb-3 sm:px-4 sm:pb-4 pt-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onGetQuote(item.slug);
                  }}
                  className="flex items-center gap-1 text-[12px] sm:text-[13px] font-[750] text-[#0d9d8c] hover:text-[#087f72] hover:underline cursor-pointer group-hover:translate-x-0.5 transition-all"
                >
                  <span>
                    {currentLang === 'fi' ? 'Pyydä tarjous' : currentLang === 'sv' ? 'Få offert' : 'Get Quote'}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
