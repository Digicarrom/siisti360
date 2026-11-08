import React from 'react';
import { Language, ServiceInfo } from '../data/content';
import {
  Home,
  Sparkles,
  Building2,
  Package,
  Bath,
  Armchair,
  Layers,
  AppWindow,
  UtensilsCrossed,
  HardHat,
  RefreshCw,
  Handshake,
  ArrowRight,
} from 'lucide-react';

interface ExploreServicesProps {
  currentLang: Language;
  onSelectService: (serviceSlug: string) => void;
  onViewAllServices: () => void;
}

export const ExploreServicesSection: React.FC<ExploreServicesProps> = ({
  currentLang,
  onSelectService,
  onViewAllServices,
}) => {
  const services = [
    {
      id: 'kotisiivous',
      slug: 'home-cleaning',
      title: {
        en: 'Home Cleaning',
        fi: 'Kotisiivous',
        sv: 'Hemstädning',
      },
      icon: Home,
      iconColor: 'text-[#10b981]',
      bgColor: 'bg-[#ecfdf5]',
      borderColor: 'border-[#a7f3d0]',
    },
    {
      id: 'suursiivous',
      slug: 'deep-cleaning',
      title: {
        en: 'Deep Cleaning',
        fi: 'Suursiivous',
        sv: 'Storstädning',
      },
      icon: Sparkles,
      iconColor: 'text-[#f59e0b]',
      bgColor: 'bg-[#fffbeb]',
      borderColor: 'border-[#fde68a]',
    },
    {
      id: 'toimistosiivous',
      slug: 'office-cleaning',
      title: {
        en: 'Office Cleaning',
        fi: 'Toimistosiivous',
        sv: 'Kontorsstädning',
      },
      icon: Building2,
      iconColor: 'text-[#06b6d4]',
      bgColor: 'bg-[#ecfeff]',
      borderColor: 'border-[#a5f3fc]',
    },
    {
      id: 'muuttosiivous',
      slug: 'move-out-cleaning',
      title: {
        en: 'Move-out Cleaning',
        fi: 'Muuttosiivous',
        sv: 'Flyttstädning',
      },
      icon: Package,
      iconColor: 'text-[#f97316]',
      bgColor: 'bg-[#fff7ed]',
      borderColor: 'border-[#fed7aa]',
    },
    {
      id: 'kylpyhuonesiivous',
      slug: 'bathroom-cleaning',
      title: {
        en: 'Bathroom Cleaning',
        fi: 'Kylpyhuonesiivous',
        sv: 'Badrumsstädning',
      },
      icon: Bath,
      iconColor: 'text-[#3b82f6]',
      bgColor: 'bg-[#eff6ff]',
      borderColor: 'border-[#bfdbfe]',
    },
    {
      id: 'sohvansiivous',
      slug: 'sofa-cleaning',
      title: {
        en: 'Sofa Cleaning',
        fi: 'Sohvan pesu',
        sv: 'Sofftvätt',
      },
      icon: Armchair,
      iconColor: 'text-[#ea580c]',
      bgColor: 'bg-[#fff7ed]',
      borderColor: 'border-[#fed7aa]',
    },
    {
      id: 'mattopesu',
      slug: 'carpet-cleaning',
      title: {
        en: 'Carpet Cleaning',
        fi: 'Mattopesu',
        sv: 'Mattvätt',
      },
      icon: Layers,
      iconColor: 'text-[#0d9d8c]',
      bgColor: 'bg-[#f0fdfa]',
      borderColor: 'border-[#99f6e4]',
    },
    {
      id: 'ikkunanpesu',
      slug: 'window-cleaning',
      title: {
        en: 'Window Cleaning',
        fi: 'Ikkunanpesu',
        sv: 'Fönsterputsning',
      },
      icon: AppWindow,
      iconColor: 'text-[#0284c7]',
      bgColor: 'bg-[#f0f9ff]',
      borderColor: 'border-[#bae6fd]',
    },
    {
      id: 'keittiosiivous',
      slug: 'kitchen-cleaning',
      title: {
        en: 'Kitchen Cleaning',
        fi: 'Keittiösiivous',
        sv: 'Kökssanering',
      },
      icon: UtensilsCrossed,
      iconColor: 'text-[#14b8a6]',
      bgColor: 'bg-[#f0fdfa]',
      borderColor: 'border-[#99f6e4]',
    },
    {
      id: 'remonttisiivous',
      slug: 'post-construction-cleaning',
      title: {
        en: 'Post-Construction Cleaning',
        fi: 'Remonttisiivous',
        sv: 'Byggstädning',
      },
      icon: HardHat,
      iconColor: 'text-[#d97706]',
      bgColor: 'bg-[#fffbeb]',
      borderColor: 'border-[#fde68a]',
    },
    {
      id: 'yllapitosiivous',
      slug: 'recurring-cleaning',
      title: {
        en: 'Recurring Cleaning',
        fi: 'Ylläpitosiivous',
        sv: 'Regelbunden städning',
      },
      icon: RefreshCw,
      iconColor: 'text-[#059669]',
      bgColor: 'bg-[#ecfdf5]',
      borderColor: 'border-[#a7f3d0]',
    },
    {
      id: 'sopimussiivous',
      slug: 'contract-cleaning',
      title: {
        en: 'Contract Cleaning',
        fi: 'Sopimussiivous',
        sv: 'Avtalsstädning',
      },
      icon: Handshake,
      iconColor: 'text-[#0f766e]',
      bgColor: 'bg-[#f0fdfa]',
      borderColor: 'border-[#99f6e4]',
    },
  ];

  return (
    <section className="space-y-5">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-[800] tracking-tight text-[#142c42]">
          {currentLang === 'fi'
            ? 'Tutustu siivouspalveluihin'
            : currentLang === 'sv'
            ? 'Utforska städtjänster'
            : 'Explore Cleaning Services'}
        </h2>
        <button
          onClick={onViewAllServices}
          className="flex items-center gap-1.5 text-[13.5px] font-[750] text-[#087f72] hover:text-[#0d9d8c] hover:underline cursor-pointer"
        >
          <span>
            {currentLang === 'fi'
              ? 'Kaikki palvelut'
              : currentLang === 'sv'
              ? 'Alla tjänster'
              : 'View All Services'}
          </span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* 12 Service Cards (6 Columns on Desktop) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4">
        {services.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onSelectService(item.slug)}
              className="group flex flex-col items-center justify-center rounded-2xl border border-[#e2e9ee] bg-white p-4 sm:p-5 text-center shadow-xs hover:-translate-y-1 hover:border-[#0d9d8c] hover:shadow-md transition-all cursor-pointer min-h-[135px]"
            >
              {/* Centered Tinted Icon Badge */}
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.bgColor} ${item.iconColor} transition-transform group-hover:scale-110`}
              >
                <Icon className="h-5 w-5" />
              </div>

              {/* Title */}
              <h3 className="mt-3 text-[13.5px] font-[750] text-[#142c42] group-hover:text-[#087f72] transition-colors leading-snug">
                {item.title[currentLang]}
              </h3>
            </button>
          );
        })}
      </div>
    </section>
  );
};
