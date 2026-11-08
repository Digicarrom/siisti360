import React from 'react';
import { Language } from '../data/content';
import { Clock, ArrowRight } from 'lucide-react';

interface ArticlesGuidesProps {
  currentLang: Language;
  onSelectArticle: (slug: string) => void;
  onViewAllArticles: () => void;
}

export const ArticlesGuidesSection: React.FC<ArticlesGuidesProps> = ({
  currentLang,
  onSelectArticle,
  onViewAllArticles,
}) => {
  const articles = [
    {
      id: 'a1',
      slug: '10-easy-tips-home-cleaner',
      title: {
        en: '10 Easy Tips to Keep Your Home Cleaner for Longer',
        fi: '10 helppoa vinkkiä kodin puhtaana pitämiseen pidempään',
        sv: '10 enkla tips för att hålla ditt hem rent längre',
      },
      tag: {
        en: 'Cleaning Tips',
        fi: 'Siivousvinkit',
        sv: 'Städtips',
      },
      tagColor: 'bg-[#ff8d43] text-white',
      readTime: {
        en: '5 min read',
        fi: '5 min lukuaika',
        sv: '5 min lästid',
      },
      image: '/assets/homepage/article_1.png',
    },
    {
      id: 'a2',
      slug: 'guide-eco-friendly-cleaning',
      title: {
        en: 'A Guide to Eco-Friendly Cleaning at Home',
        fi: 'Opas ekologiseen ja vihreään siivoukseen kotona',
        sv: 'En guide till miljövänlig städning hemma',
      },
      tag: {
        en: 'Eco Cleaning',
        fi: 'Eko-siivous',
        sv: 'Miljöstädning',
      },
      tagColor: 'bg-[#10b981] text-white',
      readTime: {
        en: '6 min read',
        fi: '6 min lukuaika',
        sv: '6 min lästid',
      },
      image: '/assets/homepage/article_2.png',
    },
    {
      id: 'a3',
      slug: 'move-out-cleaning-checklist',
      title: {
        en: "Move-out Cleaning Checklist: Don't Miss These Steps",
        fi: 'Muuttosiivouksen tarkistuslista: Älä unohda näitä vaiheita',
        sv: 'Checklista för flyttstädning: Missa inte dessa steg',
      },
      tag: {
        en: 'Moving',
        fi: 'Muutto',
        sv: 'Flytt',
      },
      tagColor: 'bg-[#f97316] text-white',
      readTime: {
        en: '7 min read',
        fi: '7 min lukuaika',
        sv: '7 min lästid',
      },
      image: '/assets/homepage/article_3.png',
    },
    {
      id: 'a4',
      slug: 'clean-office-productivity',
      title: {
        en: 'How a Clean Office Improves Wellbeing and Productivity',
        fi: 'Miten puhdas toimisto parantaa työhyvinvointia ja tuottavuutta',
        sv: 'Hur ett rent kontor förbättrar välbefinnande och produktivitet',
      },
      tag: {
        en: 'Office Cleaning',
        fi: 'Toimistosiivous',
        sv: 'Kontorsstädning',
      },
      tagColor: 'bg-[#0d9d8c] text-white',
      readTime: {
        en: '5 min read',
        fi: '5 min lukuaika',
        sv: '5 min lästid',
      },
      image: '/assets/homepage/article_4.png',
    },
  ];

  return (
    <section className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-[800] tracking-tight text-[#142c42]">
          {currentLang === 'fi'
            ? 'Siivousoppaat, vinkit & paikalliset uutiset'
            : currentLang === 'sv'
            ? 'Städguider, tips & lokala nyheter'
            : 'Cleaning Tips, Guides & Local News'}
        </h2>
        <button
          onClick={onViewAllArticles}
          className="flex items-center gap-1.5 text-[13.5px] font-[750] text-[#087f72] hover:text-[#0d9d8c] hover:underline cursor-pointer"
        >
          <span>
            {currentLang === 'fi'
              ? 'Katso kaikki artikkelit'
              : currentLang === 'sv'
              ? 'Se alla artiklar'
              : 'View All Articles'}
          </span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {articles.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectArticle(item.slug)}
            className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#e2e9ee] bg-white shadow-xs hover:-translate-y-1 hover:border-[#0d9d8c] hover:shadow-md transition-all cursor-pointer"
          >
            <div>
              {/* Photo & Category Badge */}
              <div className="relative h-44 w-full overflow-hidden bg-[#eef3f6]">
                <img
                  src={item.image}
                  alt={item.title[currentLang]}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span
                  className={`absolute bottom-3 left-3 rounded-full px-2.5 py-0.5 text-[11px] font-[750] uppercase tracking-wider ${item.tagColor} shadow-xs`}
                >
                  {item.tag[currentLang]}
                </span>
              </div>

              {/* Title */}
              <div className="p-4 sm:p-5">
                <h3 className="text-[15.5px] font-[800] text-[#142c42] group-hover:text-[#087f72] transition-colors leading-snug">
                  {item.title[currentLang]}
                </h3>
              </div>
            </div>

            {/* Read Time */}
            <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0">
              <div className="flex items-center gap-1.5 text-[12px] text-[#677c8d] font-medium">
                <Clock className="h-3.5 w-3.5 text-[#8ca2b2]" />
                <span>{item.readTime[currentLang]}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
