import React from 'react';
import { Language } from '../data/content';
import { Star, ArrowRight } from 'lucide-react';

interface CustomerReviewsProps {
  currentLang: Language;
  onViewAllReviews: () => void;
}

export const CustomerReviewsSection: React.FC<CustomerReviewsProps> = ({
  currentLang,
  onViewAllReviews,
}) => {
  const reviews = [
    {
      id: 'emma',
      name: 'Emma K.',
      city: 'Helsinki',
      avatar: '/assets/homepage/avatar_emma.png',
      rating: 5,
      quote: {
        en: '“Excellent cleaning service! The team was punctual, friendly, and left our home spotless. Highly recommended!”',
        fi: '”Erinomainen siivouspalvelu! Tiimi oli täsmällinen, ystävällinen ja koti jäi tahrattoman puhtaaksi. Suosittelen lämpimästi!”',
        sv: '”Utmärkt städservice! Teamet var punktligt, trevligt och lämnade vårt hem skinande rent. Rekommenderas varmt!”',
      },
    },
    {
      id: 'mikko',
      name: 'Mikko T.',
      city: 'Espoo',
      avatar: '/assets/homepage/avatar_mikko.png',
      rating: 5,
      quote: {
        en: '“We use Siisti360 for our office cleaning and have been very happy. Reliable, professional, and great communication.”',
        fi: '”Käytämme Siisti360-palvelua toimistosiivoukseemme ja olemme olleet erittäin tyytyväisiä. Luotettava, ammattitaitoinen ja sujuva viestintä.”',
        sv: '”Vi använder Siisti360 för vår kontorsstädning och har varit mycket nöjda. Pålitligt, professionellt och bra kommunikation.”',
      },
    },
    {
      id: 'laura',
      name: 'Laura S.',
      city: 'Vantaa',
      avatar: '/assets/homepage/avatar_laura.png',
      rating: 5,
      quote: {
        en: '“Booking was super easy and the result was fantastic. Our apartment has never looked this clean!”',
        fi: '”Varaus oli todella helppoa ja lopputulos oli mahtava. Asuntomme ei ole koskaan näyttänyt näin puhtaalta!”',
        sv: '”Bokningen var superlätt och resultatet fantastiskt. Vår lägenhet har aldrig sett så här ren ut!”',
      },
    },
  ];

  return (
    <section className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-[800] tracking-tight text-[#142c42]">
          {currentLang === 'fi'
            ? 'Mitä asiakkaamme sanovat'
            : currentLang === 'sv'
            ? 'Vad våra kunder säger'
            : 'What Our Customers Say'}
        </h2>
        <button
          onClick={onViewAllReviews}
          className="flex items-center gap-1.5 text-[13.5px] font-[750] text-[#087f72] hover:text-[#0d9d8c] hover:underline cursor-pointer"
        >
          <span>
            {currentLang === 'fi'
              ? 'Katso kaikki arvostelut'
              : currentLang === 'sv'
              ? 'Se alla recensioner'
              : 'See All Reviews'}
          </span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* 3 Review Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {reviews.map((r) => (
          <div
            key={r.id}
            className="flex flex-col justify-between rounded-2xl border border-[#e2e9ee] bg-white p-6 shadow-xs hover:border-[#0d9d8c] hover:shadow-md transition-all"
          >
            <div>
              {/* Header: Avatar, Name, City, Stars */}
              <div className="flex items-center gap-3.5">
                <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-[#e2e9ee] bg-[#f0f4f7] shrink-0">
                  <img
                    src={r.avatar}
                    alt={r.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-[15px] font-[800] text-[#142c42]">
                    {r.name}
                  </h3>
                  <div className="text-[12.5px] text-[#677c8d] font-medium">
                    {r.city}
                  </div>
                  {/* 5 Stars */}
                  <div className="mt-1 flex items-center gap-0.5 text-[#ff8d43]">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-3.5 w-3.5 fill-[#ff8d43] stroke-[#ff8d43]"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Quote */}
              <p className="mt-4 text-[13.5px] text-[#526a7d] leading-relaxed italic">
                {r.quote[currentLang]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
