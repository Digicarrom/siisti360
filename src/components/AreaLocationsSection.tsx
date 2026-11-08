import React from 'react';
import { Language } from '../data/content';
import { MapPin, ChevronRight, ArrowRight } from 'lucide-react';

interface AreaLocationsProps {
  currentLang: Language;
  onSelectLocation: (type: 'city' | 'neighborhood', id: string) => void;
}

export const AreaLocationsSection: React.FC<AreaLocationsProps> = ({
  currentLang,
  onSelectLocation,
}) => {
  const mainCities = [
    {
      id: 'helsinki',
      type: 'city' as const,
      name: 'Helsinki',
      desc: {
        fi: 'Koko Helsinki ja sen kaupunginosat',
        sv: 'Hela Helsingfors och dess stadsdelar',
        en: 'All of Helsinki and its neighborhoods',
      },
      image: '/assets/homepage/loc_helsinki.png',
    },
    {
      id: 'espoo',
      type: 'city' as const,
      name: 'Espoo',
      desc: {
        fi: 'Espoon kaikki alueet, mm. Tapiola, Leppävaara',
        sv: 'Alla områden i Esbo, bl.a. Hagalund, Alberga',
        en: 'All Espoo areas, incl. Tapiola, Leppävaara',
      },
      image: '/assets/homepage/loc_espoo.png',
    },
    {
      id: 'vantaa',
      type: 'city' as const,
      name: 'Vantaa',
      desc: {
        fi: 'Koko Vantaa, mm. Tikkurila, Myyrmäki, Aviapolis',
        sv: 'Hela Vanda, bl.a. Dickursby, Myrbacka',
        en: 'All Vantaa, incl. Tikkurila, Myyrmäki',
      },
      image: '/assets/homepage/loc_vantaa.png',
    },
  ];

  const districts = [
    { id: 'kamppi', name: 'Kamppi', image: '/assets/homepage/loc_kamppi.png' },
    { id: 'ruoholahti', name: 'Ruoholahti', image: '/assets/homepage/loc_ruoholahti.png' },
    { id: 'tapiola', name: 'Tapiola', image: '/assets/homepage/loc_tapiola.png' },
    { id: 'leppavaara', name: 'Leppävaara', image: '/assets/homepage/loc_leppavaara.png' },
    { id: 'myyrmaki', name: 'Myyrmäki', image: '/assets/homepage/loc_myyrmaki.png' },
  ];

  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-[800] tracking-tight text-[#142c42]">
            {currentLang === 'fi'
              ? 'Palvelualueemme'
              : currentLang === 'sv'
              ? 'Våra verksamhetsområden'
              : 'Our Service Areas'}
          </h2>
          <p className="text-[12.5px] sm:text-[13.5px] text-[#677c8d] hidden sm:block mt-0.5">
            {currentLang === 'fi'
              ? 'Palvelemme koko pääkaupunkiseudulla – erityisesti Helsingissä, Espoossa ja Vantaalla.'
              : currentLang === 'sv'
              ? 'Vi betjänar hela huvudstadsregionen – särskilt Helsingfors, Esbo och Vanda.'
              : 'Serving the entire capital region – especially Helsinki, Espoo, and Vantaa.'}
          </p>
        </div>

        <button
          onClick={() => onSelectLocation('city', 'helsinki')}
          className="flex items-center gap-1.5 text-[13px] sm:text-[13.5px] font-[750] text-[#087f72] hover:text-[#0d9d8c] hover:underline cursor-pointer"
        >
          <span>
            {currentLang === 'fi' ? 'Kaikki alueet' : currentLang === 'sv' ? 'Alla områden' : 'All Areas'}
          </span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* 3 Main City Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
        {mainCities.map((city) => (
          <button
            key={city.id}
            onClick={() => onSelectLocation(city.type, city.id)}
            className="group flex flex-col overflow-hidden rounded-2xl border border-[#e2e9ee] bg-white shadow-2xs hover:-translate-y-1 hover:border-[#0d9d8c] hover:shadow-md transition-all text-left cursor-pointer"
          >
            {/* Top Photo */}
            <div className="h-32 sm:h-36 w-full overflow-hidden bg-[#e9f0f4]">
              <img
                src={city.image}
                alt={city.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Bottom Bar: 📍 Name + Description + Arrow */}
            <div className="p-3.5 sm:p-4 bg-white flex items-center justify-between">
              <div className="min-w-0 pr-2">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-[#0d9d8c] shrink-0" />
                  <span className="text-[15px] font-[800] text-[#142c42] group-hover:text-[#087f72] transition-colors truncate">
                    {city.name}
                  </span>
                </div>
                <div className="text-[11.5px] text-[#718c9f] truncate mt-0.5">
                  {city.desc[currentLang]}
                </div>
              </div>
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f0f8f6] text-[#0d9d8c] group-hover:bg-[#0d9d8c] group-hover:text-white transition-colors shrink-0">
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Additional Districts Row (Kamppi, Ruoholahti, Tapiola, Leppävaara, Myyrmäki) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-3 pt-1">
        {districts.map((d) => (
          <button
            key={d.id}
            onClick={() => onSelectLocation('neighborhood', d.id)}
            className="flex items-center justify-between rounded-xl border border-[#e2e9ee] bg-white p-2.5 sm:p-3 text-left hover:border-[#0d9d8c] hover:bg-[#f8fafb] transition-all cursor-pointer group shadow-2xs"
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="h-7 w-7 rounded-lg overflow-hidden shrink-0">
                <img src={d.image} alt={d.name} className="h-full w-full object-cover" />
              </div>
              <span className="text-[12.5px] font-[750] text-[#142c42] group-hover:text-[#087f72] truncate">
                {d.name}
              </span>
            </div>
            <ChevronRight className="h-3.5 w-3.5 text-[#8ca2b2] group-hover:text-[#0d9d8c] shrink-0" />
          </button>
        ))}
      </div>
    </section>
  );
};
