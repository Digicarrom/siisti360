import React, { useState } from 'react';
import { Language } from '../data/content';
import { MapPin, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

interface ActivityTabsProps {
  currentLang: Language;
  onSelectService: (serviceSlug: string) => void;
  onSelectArea: (areaName: string) => void;
}

export const ActivityTabsSection: React.FC<ActivityTabsProps> = ({
  currentLang,
  onSelectService,
  onSelectArea,
}) => {
  const [activeTab, setActiveTab] = useState<'bookings' | 'areas' | 'trending'>('bookings');
  const [scrollIndex, setScrollIndex] = useState(0);

  const bookings = [
    {
      id: 'b1',
      service: {
        en: 'Home Cleaning',
        fi: 'Kotisiivous',
        sv: 'Hemstädning',
      },
      slug: 'home-cleaning',
      location: 'Helsinki',
      time: {
        en: 'Booked 2 hours ago',
        fi: 'Varattu 2 tuntia sitten',
        sv: 'Bokad för 2 timmar sedan',
      },
      image: '/assets/homepage/activity_home.png',
    },
    {
      id: 'b2',
      service: {
        en: 'Office Cleaning',
        fi: 'Toimistosiivous',
        sv: 'Kontorsstädning',
      },
      slug: 'office-cleaning',
      location: 'Espoo',
      time: {
        en: 'Booked 3 hours ago',
        fi: 'Varattu 3 tuntia sitten',
        sv: 'Bokad för 3 timmar sedan',
      },
      image: '/assets/homepage/activity_office.png',
    },
    {
      id: 'b3',
      service: {
        en: 'Carpet Cleaning',
        fi: 'Mattopesu',
        sv: 'Mattvätt',
      },
      slug: 'carpet-cleaning',
      location: 'Vantaa',
      time: {
        en: 'Booked 4 hours ago',
        fi: 'Varattu 4 tuntia sitten',
        sv: 'Bokad för 4 timmar sedan',
      },
      image: '/assets/homepage/activity_carpet.png',
    },
    {
      id: 'b4',
      service: {
        en: 'Bathroom Cleaning',
        fi: 'Kylpyhuonesiivous',
        sv: 'Badrumsstädning',
      },
      slug: 'bathroom-cleaning',
      location: 'Kamppi',
      time: {
        en: 'Booked 4 hours ago',
        fi: 'Varattu 4 tuntia sitten',
        sv: 'Bokad för 4 timmar sedan',
      },
      image: '/assets/homepage/activity_bath.png',
    },
    {
      id: 'b5',
      service: {
        en: 'Sofa Cleaning',
        fi: 'Sohvan pesu',
        sv: 'Sofftvätt',
      },
      slug: 'sofa-cleaning',
      location: 'Tapiola',
      time: {
        en: 'Booked 6 hours ago',
        fi: 'Varattu 6 tuntia sitten',
        sv: 'Bokad för 6 timmar sedan',
      },
      image: '/assets/homepage/activity_sofa.png',
    },
  ];

  const handlePrev = () => {
    setScrollIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setScrollIndex((prev) => Math.min(bookings.length - 3, prev + 1));
  };

  return (
    <section className="space-y-4">
      {/* 3 Tabs Header */}
      <div className="flex items-center gap-6 sm:gap-8 border-b border-[#e2e9ee] pb-2 text-[14.5px] font-[750]">
        <button
          onClick={() => setActiveTab('bookings')}
          className={`cursor-pointer transition-colors pb-2 relative ${
            activeTab === 'bookings'
              ? 'text-[#ff8d43]'
              : 'text-[#677c8d] hover:text-[#142c42]'
          }`}
        >
          {currentLang === 'fi'
            ? 'Viimeisimmät varaukset'
            : currentLang === 'sv'
            ? 'Senaste bokningarna'
            : 'Recent Bookings'}
          {activeTab === 'bookings' && (
            <span className="absolute -bottom-[2px] left-0 right-0 h-0.5 bg-[#ff8d43] rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('areas')}
          className={`cursor-pointer transition-colors pb-2 relative ${
            activeTab === 'areas'
              ? 'text-[#ff8d43]'
              : 'text-[#677c8d] hover:text-[#142c42]'
          }`}
        >
          {currentLang === 'fi'
            ? 'Haetuimmat alueet'
            : currentLang === 'sv'
            ? 'Mest sökta områden'
            : 'Top Searched Areas'}
          {activeTab === 'areas' && (
            <span className="absolute -bottom-[2px] left-0 right-0 h-0.5 bg-[#ff8d43] rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('trending')}
          className={`cursor-pointer transition-colors pb-2 relative ${
            activeTab === 'trending'
              ? 'text-[#ff8d43]'
              : 'text-[#677c8d] hover:text-[#142c42]'
          }`}
        >
          {currentLang === 'fi'
            ? 'Trendaavat siivouspalvelut'
            : currentLang === 'sv'
            ? 'Trendande städtjänster'
            : 'Trending Cleaning Services'}
          {activeTab === 'trending' && (
            <span className="absolute -bottom-[2px] left-0 right-0 h-0.5 bg-[#ff8d43] rounded-full" />
          )}
        </button>
      </div>

      {/* Cards Row with Navigation Arrows */}
      <div className="relative group">
        {/* Left Arrow Button */}
        <button
          onClick={handlePrev}
          disabled={scrollIndex === 0}
          className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-[#cbdce5] bg-white text-[#142c42] shadow-md hover:bg-[#f5f8fa] disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
          aria-label="Previous"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={handleNext}
          className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-[#cbdce5] bg-white text-[#142c42] shadow-md hover:bg-[#f5f8fa] cursor-pointer"
          aria-label="Next"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        {/* Cards Grid / Flex Container */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
          {bookings.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectService(item.slug)}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#e2e9ee] bg-white shadow-xs hover:-translate-y-0.5 hover:border-[#0d9d8c] hover:shadow-sm transition-all cursor-pointer"
            >
              <div>
                {/* Thumbnail Photo */}
                <div className="h-24 w-full overflow-hidden bg-[#e9f0f4]">
                  <img
                    src={item.image}
                    alt={item.service[currentLang]}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="p-3">
                  <h4 className="text-[13.5px] font-[800] text-[#142c42] group-hover:text-[#087f72] transition-colors truncate">
                    {item.service[currentLang]}
                  </h4>

                  <div className="mt-1 flex items-center gap-1 text-[11.5px] text-[#677c8d]">
                    <MapPin className="h-3 w-3 text-[#0d9d8c] shrink-0" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>

              {/* Timestamp */}
              <div className="px-3 pb-3 pt-0">
                <div className="flex items-center gap-1 text-[11px] text-[#718c9f]">
                  <Clock className="h-3 w-3 text-[#8ca2b2] shrink-0" />
                  <span className="truncate">{item.time[currentLang]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
