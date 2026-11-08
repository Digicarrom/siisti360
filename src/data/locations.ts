import { Language } from './content';

export interface NeighborhoodInfo {
  id: string;
  slug: string;
  cityId: 'helsinki' | 'espoo' | 'vantaa';
  postalCodes: string[];
  names: Record<Language, string>;
  coords: { lat: number; lng: number };
  badgeText: Record<Language, string>;
  heroHeading: Record<Language, string>;
  heroIntro: Record<Language, string>;
  localContext: Record<Language, string>;
  architectureInfo: Record<Language, string>;
  specialOffer: {
    code: string;
    discountPercent: number;
    title: Record<Language, string>;
    desc: Record<Language, string>;
  };
  keyHighlights: Record<Language, string[]>;
  cleaningChallenges: Record<Language, string[]>;
  nearbyAreaIds: string[];
  heroImage?: string;
  popularServiceIds: string[];
  localReview: {
    author: string;
    street: string;
    rating: number;
    date: string;
    serviceName: Record<Language, string>;
    quote: Record<Language, string>;
  };
}

export interface PostalCodeEntry {
  code: string;
  neighborhoodId: string;
  neighborhoodName: string;
  cityId: 'helsinki' | 'espoo' | 'vantaa';
  cityName: string;
  secondaryNeighborhoods?: string[];
}

// Verified Finnish postal code mapping for Capital Region (Helsinki, Espoo, Vantaa)
export const FINNISH_POSTAL_CODES: PostalCodeEntry[] = [
  // Helsinki Central & South
  { code: '00100', neighborhoodId: 'kamppi', neighborhoodName: 'Kamppi', cityId: 'helsinki', cityName: 'Helsinki', secondaryNeighborhoods: ['Etu-Töölö', 'Keskusta'] },
  { code: '00120', neighborhoodId: 'punavuori', neighborhoodName: 'Punavuori', cityId: 'helsinki', cityName: 'Helsinki', secondaryNeighborhoods: ['Rööperi'] },
  { code: '00130', neighborhoodId: 'kaartinkaupunki', neighborhoodName: 'Kaartinkaupunki', cityId: 'helsinki', cityName: 'Helsinki' },
  { code: '00140', neighborhoodId: 'ullanlinna', neighborhoodName: 'Ullanlinna', cityId: 'helsinki', cityName: 'Helsinki', secondaryNeighborhoods: ['Kaivopuisto'] },
  { code: '00150', neighborhoodId: 'eira', neighborhoodName: 'Eira', cityId: 'helsinki', cityName: 'Helsinki', secondaryNeighborhoods: ['Hernesaari'] },
  { code: '00160', neighborhoodId: 'katajanokka', neighborhoodName: 'Katajanokka', cityId: 'helsinki', cityName: 'Helsinki' },
  { code: '00170', neighborhoodId: 'kruununhaka', neighborhoodName: 'Kruununhaka', cityId: 'helsinki', cityName: 'Helsinki' },
  { code: '00180', neighborhoodId: 'ruoholahti', neighborhoodName: 'Ruoholahti', cityId: 'helsinki', cityName: 'Helsinki', secondaryNeighborhoods: ['Jätkäsaari (pohjoinen)', 'Salmisaari'] },
  
  // Helsinki West & South-West
  { code: '00200', neighborhoodId: 'lauttasaari', neighborhoodName: 'Lauttasaari', cityId: 'helsinki', cityName: 'Helsinki', secondaryNeighborhoods: ['Kotkavuori'] },
  { code: '00210', neighborhoodId: 'lauttasaari', neighborhoodName: 'Lauttasaari (Vattuniemi)', cityId: 'helsinki', cityName: 'Helsinki' },
  { code: '00220', neighborhoodId: 'jatkasaari', neighborhoodName: 'Jätkäsaari', cityId: 'helsinki', cityName: 'Helsinki', secondaryNeighborhoods: ['Saukonpaasi'] },
  { code: '00240', neighborhoodId: 'pasila', neighborhoodName: 'Länsi-Pasila', cityId: 'helsinki', cityName: 'Helsinki' },
  { code: '00250', neighborhoodId: 'toolo', neighborhoodName: 'Taka-Töölö', cityId: 'helsinki', cityName: 'Helsinki' },
  { code: '00260', neighborhoodId: 'toolo', neighborhoodName: 'Töölö', cityId: 'helsinki', cityName: 'Helsinki' },
  { code: '00270', neighborhoodId: 'meilahti', neighborhoodName: 'Meilahti', cityId: 'helsinki', cityName: 'Helsinki' },
  { code: '00280', neighborhoodId: 'ruskeasuo', neighborhoodName: 'Ruskeasuo', cityId: 'helsinki', cityName: 'Helsinki' },
  { code: '00300', neighborhoodId: 'munkkiniemi', neighborhoodName: 'Munkkiniemi', cityId: 'helsinki', cityName: 'Helsinki' },
  { code: '00320', neighborhoodId: 'haaga', neighborhoodName: 'Etelä-Haaga', cityId: 'helsinki', cityName: 'Helsinki' },
  { code: '00330', neighborhoodId: 'munkkivuori', neighborhoodName: 'Munkkivuori', cityId: 'helsinki', cityName: 'Helsinki' },
  { code: '00350', neighborhoodId: 'munkkiniemi', neighborhoodName: 'Munkkiniemi', cityId: 'helsinki', cityName: 'Helsinki' },
  { code: '00380', neighborhoodId: 'pitajanmaki', neighborhoodName: 'Pitäjänmäki', cityId: 'helsinki', cityName: 'Helsinki' },
  { code: '00400', neighborhoodId: 'haaga', neighborhoodName: 'Pohjois-Haaga', cityId: 'helsinki', cityName: 'Helsinki' },
  { code: '00410', neighborhoodId: 'malminkartano', neighborhoodName: 'Malminkartano', cityId: 'helsinki', cityName: 'Helsinki' },
  { code: '00420', neighborhoodId: 'kannelmaki', neighborhoodName: 'Kannelmäki', cityId: 'helsinki', cityName: 'Helsinki' },
  
  // Helsinki East & Inner North
  { code: '00500', neighborhoodId: 'sorneinen', neighborhoodName: 'Sörnäinen', cityId: 'helsinki', cityName: 'Helsinki', secondaryNeighborhoods: ['Suvilahti'] },
  { code: '00510', neighborhoodId: 'vallila', neighborhoodName: 'Vallila', cityId: 'helsinki', cityName: 'Helsinki' },
  { code: '00520', neighborhoodId: 'pasila', neighborhoodName: 'Itä-Pasila', cityId: 'helsinki', cityName: 'Helsinki' },
  { code: '00530', neighborhoodId: 'kallio', neighborhoodName: 'Kallio', cityId: 'helsinki', cityName: 'Helsinki', secondaryNeighborhoods: ['Hakaniemi', 'Siltasaari'] },
  { code: '00540', neighborhoodId: 'kalasatama', neighborhoodName: 'Kalasatama', cityId: 'helsinki', cityName: 'Helsinki', secondaryNeighborhoods: ['Sompasaari', 'Nihti'] },
  { code: '00550', neighborhoodId: 'vallila', neighborhoodName: 'Hermanni & Arabianranta', cityId: 'helsinki', cityName: 'Helsinki' },
  { code: '00560', neighborhoodId: 'kumpula', neighborhoodName: 'Kumpula & Toukola', cityId: 'helsinki', cityName: 'Helsinki' },
  { code: '00570', neighborhoodId: 'kulosaari', neighborhoodName: 'Kulosaari', cityId: 'helsinki', cityName: 'Helsinki' },
  { code: '00580', neighborhoodId: 'kalasatama', neighborhoodName: 'Verkkosaari', cityId: 'helsinki', cityName: 'Helsinki' },
  { code: '00600', neighborhoodId: 'kapyla', neighborhoodName: 'Käpylä', cityId: 'helsinki', cityName: 'Helsinki' },
  { code: '00610', neighborhoodId: 'kapyla', neighborhoodName: 'Käpylä', cityId: 'helsinki', cityName: 'Helsinki' },
  { code: '00620', neighborhoodId: 'metsala', neighborhoodName: 'Metsälä', cityId: 'helsinki', cityName: 'Helsinki' },
  { code: '00630', neighborhoodId: 'maunula', neighborhoodName: 'Maunula', cityId: 'helsinki', cityName: 'Helsinki' },
  { code: '00640', neighborhoodId: 'oulunkyla', neighborhoodName: 'Oulunkylä', cityId: 'helsinki', cityName: 'Helsinki' },
  { code: '00700', neighborhoodId: 'malmi', neighborhoodName: 'Malmi', cityId: 'helsinki', cityName: 'Helsinki' },
  { code: '00810', neighborhoodId: 'herttoniemi', neighborhoodName: 'Herttoniemenranta', cityId: 'helsinki', cityName: 'Helsinki' },
  { code: '00840', neighborhoodId: 'laajasalo', neighborhoodName: 'Laajasalo', cityId: 'helsinki', cityName: 'Helsinki', secondaryNeighborhoods: ['Kruunuvuorenranta'] },
  { code: '00960', neighborhoodId: 'vuosaari', neighborhoodName: 'Vuosaari', cityId: 'helsinki', cityName: 'Helsinki' },
  { code: '00990', neighborhoodId: 'vuosaari', neighborhoodName: 'Aurinkolahti', cityId: 'helsinki', cityName: 'Helsinki' },

  // Espoo
  { code: '02100', neighborhoodId: 'tapiola', neighborhoodName: 'Tapiola', cityId: 'espoo', cityName: 'Espoo', secondaryNeighborhoods: ['Otsolahti'] },
  { code: '02110', neighborhoodId: 'otaniemi', neighborhoodName: 'Otaniemi', cityId: 'espoo', cityName: 'Espoo' },
  { code: '02140', neighborhoodId: 'laajalahti', neighborhoodName: 'Laajalahti', cityId: 'espoo', cityName: 'Espoo' },
  { code: '02150', neighborhoodId: 'otaniemi', neighborhoodName: 'Keilaniemi', cityId: 'espoo', cityName: 'Espoo' },
  { code: '02160', neighborhoodId: 'westend', neighborhoodName: 'Westend', cityId: 'espoo', cityName: 'Espoo' },
  { code: '02170', neighborhoodId: 'haukilahti', neighborhoodName: 'Haukilahti', cityId: 'espoo', cityName: 'Espoo' },
  { code: '02180', neighborhoodId: 'mankkaa', neighborhoodName: 'Mankkaa', cityId: 'espoo', cityName: 'Espoo' },
  { code: '02200', neighborhoodId: 'niittykumpu', neighborhoodName: 'Niittykumpu', cityId: 'espoo', cityName: 'Espoo' },
  { code: '02210', neighborhoodId: 'olari', neighborhoodName: 'Olari', cityId: 'espoo', cityName: 'Espoo' },
  { code: '02230', neighborhoodId: 'matinkyla', neighborhoodName: 'Matinkylä', cityId: 'espoo', cityName: 'Espoo', secondaryNeighborhoods: ['Iivisniemi'] },
  { code: '02320', neighborhoodId: 'espoonlahti', neighborhoodName: 'Espoonlahti', cityId: 'espoo', cityName: 'Espoo' },
  { code: '02330', neighborhoodId: 'saunalahti', neighborhoodName: 'Saunalahti', cityId: 'espoo', cityName: 'Espoo' },
  { code: '02600', neighborhoodId: 'leppavaara', neighborhoodName: 'Leppävaara', cityId: 'espoo', cityName: 'Espoo', secondaryNeighborhoods: ['Sello', 'Perkka'] },
  { code: '02610', neighborhoodId: 'kilo', neighborhoodName: 'Kilo', cityId: 'espoo', cityName: 'Espoo' },
  { code: '02700', neighborhoodId: 'kauniainen', neighborhoodName: 'Kauniainen', cityId: 'espoo', cityName: 'Kauniainen / Espoo' },
  { code: '02770', neighborhoodId: 'espoon-keskus', neighborhoodName: 'Espoon keskus', cityId: 'espoo', cityName: 'Espoo' },

  // Vantaa
  { code: '01300', neighborhoodId: 'tikkurila', neighborhoodName: 'Tikkurila', cityId: 'vantaa', cityName: 'Vantaa', secondaryNeighborhoods: ['Jokiniemi'] },
  { code: '01350', neighborhoodId: 'hiekkaharju', neighborhoodName: 'Hiekkaharju', cityId: 'vantaa', cityName: 'Vantaa' },
  { code: '01360', neighborhoodId: 'koivukyla', neighborhoodName: 'Koivukylä', cityId: 'vantaa', cityName: 'Vantaa' },
  { code: '01400', neighborhoodId: 'rekola', neighborhoodName: 'Rekola', cityId: 'vantaa', cityName: 'Vantaa' },
  { code: '01450', neighborhoodId: 'korso', neighborhoodName: 'Korso', cityId: 'vantaa', cityName: 'Vantaa' },
  { code: '01510', neighborhoodId: 'pakkala', neighborhoodName: 'Pakkala & Jumbo', cityId: 'vantaa', cityName: 'Vantaa' },
  { code: '01520', neighborhoodId: 'tammisto', neighborhoodName: 'Tammisto', cityId: 'vantaa', cityName: 'Vantaa' },
  { code: '01530', neighborhoodId: 'aviapolis', neighborhoodName: 'Aviapolis & Lentokenttä', cityId: 'vantaa', cityName: 'Vantaa' },
  { code: '01600', neighborhoodId: 'myyrmaki', neighborhoodName: 'Myyrmäki', cityId: 'vantaa', cityName: 'Vantaa' },
  { code: '01610', neighborhoodId: 'kaivoksela', neighborhoodName: 'Kaivoksela', cityId: 'vantaa', cityName: 'Vantaa' },
  { code: '01620', neighborhoodId: 'martinlaakso', neighborhoodName: 'Martinlaakso', cityId: 'vantaa', cityName: 'Vantaa' },
  { code: '01700', neighborhoodId: 'kivisto', neighborhoodName: 'Kivistö', cityId: 'vantaa', cityName: 'Vantaa' },
];

export const NEIGHBORHOODS: Record<string, NeighborhoodInfo> = {
  ruoholahti: {
    id: 'ruoholahti',
    slug: 'ruoholahti',
    cityId: 'helsinki',
    postalCodes: ['00180'],
    coords: { lat: 60.1627, lng: 24.9126 },
    names: {
      fi: 'Ruoholahti',
      sv: 'Gräsviken',
      en: 'Ruoholahti',
    },
    badgeText: {
      fi: 'Tunnistettu alue: Ruoholahti (00180)',
      sv: 'Identifierat område: Gräsviken (00180)',
      en: 'Identified Area: Ruoholahti (00180)',
    },
    heroHeading: {
      fi: 'Ammattitaitoiset siivouspalvelut Ruoholahdessa, Helsingissä',
      sv: 'Professionella städtjänster i Gräsviken, Helsingfors',
      en: 'Professional Cleaning Services in Ruoholahti, Helsinki',
    },
    heroIntro: {
      fi: 'Palvelemme Ruoholahden kanavanvarsiasuntoja, modernia kerrostalokantaa ja IT-keskittymän toimistoja nopeasti ja paikallisella tiimillä. Tunnemme merituulen ja lattiasta kattoon ulottuvien ikkunoiden erityisvaatimukset.',
      sv: 'Vi betjänar bostäder längs kanalen i Gräsviken, moderna lägenhetshus och IT-kontor med ett lokalt team. Vi behärskar havsbrisen och stora panoramafönster.',
      en: 'Serving Ruoholahti canal-side residences, contemporary high-rises and tech hub offices with a dedicated local team. We specialize in floor-to-ceiling maritime windows and modern urban living.',
    },
    localContext: {
      fi: 'Ruoholahti on Helsingin elinvoimainen kanavakaupunginosa (postinumero 00180), jossa yhdistyvät 1990–2010-luvuilla rakennetut laadukkaat kerrostalot, Itämeren läheisyys sekä Porkkalankadun ja Salmisaaren yrityskeskittymät.',
      sv: 'Gräsviken är en modern kanalstadsdel i Helsingfors (postnummer 00180) med havsnära läge, utmärkta hissförbindelser och aktiva företag vid Östersjögatan och Salmisaari.',
      en: 'Ruoholahti is an iconic maritime canal neighborhood in Helsinki (postal code 00180), known for contemporary architecture, extensive glazing facing the sea, and vibrant tech office buildings.',
    },
    architectureInfo: {
      fi: 'Ruoholahden kodeissa on tyypillisesti hissit, maanalaiset parkkihallit sekä suuret lasitetut parvekkeet ja lattiasta kattoon ulottuvat ikkunat. Merituuli tuo ikkunoihin suolapölyä, joten erikoistunut ikkunanpesumme ja HEPA-mikrokuitusiivouksemme pitävät pinnat säkenöivän puhtaina.',
      sv: 'Fastigheterna i Gräsviken har generellt moderna hissar och stora glasade balkonger som kräver fackmannamässig putsning mot havsbris och saltstänk.',
      en: 'Homes in Ruoholahti typically feature elevators, garage parking, generous glass-walled balconies, and large picture windows. Coastal sea breeze deposits fine salt film, for which our streak-free glass and balcony care is ideal.',
    },
    specialOffer: {
      code: 'RUOHO15',
      discountPercent: 15,
      title: {
        fi: 'Ruoholahden & Jätkäsaaren aluetarjous: -15% ensisiivouksesta',
        sv: 'Gräsvikens områdeserbjudande: -15% på första städningen',
        en: 'Ruoholahti & Jätkäsaari Local Offer: 15% off your first clean',
      },
      desc: {
        fi: 'Käytä koodia RUOHO15 varatessasi kotisiivouksen tai suursiivouksen postinumeroon 00180. Voimassa toistaiseksi uusille asiakkaille.',
        sv: 'Ange koden RUOHO15 vid bokning av hemstädning till postnummer 00180.',
        en: 'Use code RUOHO15 when booking home cleaning or deep cleaning in postal code 00180.',
      },
    },
    keyHighlights: {
      fi: [
        'Vakituinen siivoustiimi Ruoholahdessa ja Jätkäsaaressa joka arkipäivä',
        'Helppo avainpalvelu ja nouto Porkkalankadulta tai taloyhtiön lukkokaapista',
        'Täysi 60 % kotitalousvähennys suoraan verotukseen (omavastuu vain 150 € / v)',
        'Erikoistunut kanavanvarsien suurten ikkunoiden ja parvekelasien pesuun',
      ],
      sv: [
        'Fast städpatrull i Gräsviken och Busholmen varje vardag',
        'Smidig nyckelhantering och anpassad starttid',
        'Fullt 60 % hushållsavdrag direkt på skatten',
        'Professionell tvätt av stora fönster och inglasade balkonger',
      ],
      en: [
        'Dedicated local cleaner team operating in Ruoholahti and Jätkäsaari daily',
        'Key drop-off and pickup coordination right by Ruoholahti metro / Porkkalankatu',
        'Full 60% Finnish tax deduction (kotitalousvähennys) applied',
        'Specialized in canal-view panorama windows and glass balcony deep cleans',
      ],
    },
    cleaningChallenges: {
      fi: [
        'Merellisen kosteuden ja liikenteen nostattama pöly lasitetuilla parvekkeilla',
        'Keittiön saarekkeiden ja avotilojen liesituulettimien tehokas rasvanpoisto',
        'Kylpyhuoneiden ja lasisten suihkuseinien kalkkisaostumien poisto',
      ],
      sv: [
        'Saltstänk och trafikdamm på inglasade balkonger mot kanalen',
        'Fettlösning i öppna kökslösningar och fläktfilter',
        'Kalkborttagning på glasduschväggar och klinker',
      ],
      en: [
        'Maritime salt film and street particles on expansive glazed balconies',
        'Degreasing modern open-plan kitchens and island extractor hoods',
        'Descaling glass shower screens and dark bathroom tiles',
      ],
    },
    nearbyAreaIds: ['kamppi', 'jatkasaari', 'lauttasaari', 'punavuori'],
    heroImage: '/src/assets/images/ruoholahti_cleaning_1794054875174.jpg',
    popularServiceIds: ['kotisiivous', 'suursiivous', 'ikkunanpesu', 'sohvan-puhdistus', 'toimistosiivous', 'muuttosiivous'],
    localReview: {
      author: 'Markus L.',
      street: 'Itämerenkatu, Ruoholahti',
      rating: 5,
      date: 'Eilen',
      serviceName: {
        fi: 'Säännöllinen kotisiivous',
        sv: 'Regelbunden hemstädning',
        en: 'Recurring home cleaning',
      },
      quote: {
        fi: 'Meillä on Ruoholahdessa 84 m² kanavanvarren kolmio isoilla ikkunoilla. Siisti360:n siivooja tekee aivan uskomatonta jälkeä – koti tuoksuu raikkaalta eikä laseissa näy yhtään raitaa.',
        sv: 'Vi har en trea på 84 m² i Gräsviken. Siisti360 gör ett fantastiskt jobb med fönstren och badrummet!',
        en: 'We have an 84 m² apartment by the Ruoholahti canal. Siisti360 leaves our floor-to-ceiling windows and kitchen spotless every single time.',
      },
    },
  },

  kamppi: {
    id: 'kamppi',
    slug: 'kamppi',
    cityId: 'helsinki',
    postalCodes: ['00100'],
    coords: { lat: 60.1699, lng: 24.9384 },
    names: {
      fi: 'Kamppi',
      sv: 'Kampen',
      en: 'Kamppi',
    },
    badgeText: {
      fi: 'Tunnistettu alue: Kamppi & Keskusta (00100)',
      sv: 'Identifierat område: Kampen (00100)',
      en: 'Identified Area: Kamppi & Central (00100)',
    },
    heroHeading: {
      fi: 'Ammattitaitoiset siivouspalvelut Kampissa, Helsingissä',
      sv: 'Professionella städtjänster i Kampen, Helsingfors',
      en: 'Professional Cleaning Services in Kamppi, Helsinki',
    },
    heroIntro: {
      fi: 'Palvelemme Kampin arvokiinteistöjä, korkeita jugend-koteja sekä modernien keskustatalojen asukkaita ja yrityksiä. Huomioimme katuvarren pysäköinnin, porraskäytävät ja vanhojen lautalattioiden hoidon.',
      sv: 'Städtjänster för sekelskifteshus, moderna centrumlägenheter och kontor i Kampen. Skonsam vård av trägolv och anpassad logistik i stadskärnan.',
      en: 'Providing premium cleaning services for Kamppi historic jugend apartments, modern city homes and boutique offices. We care for high ceilings, heritage woodwork and downtown access.',
    },
    localContext: {
      fi: 'Kamppi (00100) on Helsingin ydinkeskustan vilkkain kaupunginosa, jossa klassiset 1900-luvun alun kivitalot korkeine huoneineen kohtaavat Kampin kauppakeskuksen ja Fredrikinkadun modernit toimitilat.',
      sv: 'Kampen (00100) är Helsingfors hjärta, med magnifika jugendfastigheter och moderna affärslokaler runt Fredriksgatan.',
      en: 'Kamppi (00100) is the vibrant core of downtown Helsinki, characterized by grand early 20th-century stone buildings with high ornate ceilings as well as modern commercial towers.',
    },
    architectureInfo: {
      fi: 'Kampin asunnoissa on usein yli 3 metrin huonekorkeus, alkuperäiset kipsilistat, lautalattiat tai kalanruotoparketti. Käytämme hellävaraisia pH-neutraaleja vahoja ja erikoispitkiä mikrokuituvarsia pölynpoistoon korkeuksista.',
      sv: 'I Kampens jugendlägenheter är takhöjden ofta över 3 meter med stuckatur och fiskbensparkett som kräver varsam rengöring med neutrala medel.',
      en: 'Apartments in Kamppi frequently boast 3-meter+ ceiling heights, historic plaster cornices, and herringbone parquet. Our cleaners utilize telescopic microfiber dusters and wood-safe neutral formulas.',
    },
    specialOffer: {
      code: 'KAMPPI15',
      discountPercent: 15,
      title: {
        fi: 'Kampin & Keskustan aluetarjous: -15% ensitilauksesta',
        sv: 'Kampens erbjudande: -15% på första beställningen',
        en: 'Kamppi & City Center Offer: 15% off first service',
      },
      desc: {
        fi: 'Syötä koodi KAMPPI15 varatessasi kotisiivouksen tai toimistosiivouksen postinumeroon 00100.',
        sv: 'Använd koden KAMPPI15 för hemstädning eller kontor i 00100.',
        en: 'Enter coupon KAMPPI15 when booking in postal code 00100.',
      },
    },
    keyHighlights: {
      fi: [
        'Kokemus Helsingin keskustan asukaspysäköinnistä ja luvista',
        'Vanhojen arvoparkettien ja korkeiden jugend-kattojen erikoisosaaminen',
        'Kattava vastuuvakuutus 1 000 000 € asti kaikissa kohteissa',
        'Joustavat aamu- ja iltavuorot myös keskustan toimistoille',
      ],
      sv: [
        'Vana vid boendeparkering och logistik i innerstan',
        'Specialkunskap om sekelskiftesparkett och högt i tak',
        'Ansvarsförsäkring upp till 1 000 000 €',
        'Flexibla tider för hem och kontor runt Kampen',
      ],
      en: [
        'Experienced with downtown Helsinki parking permits and courtyard access',
        'Expertise in historic herringbone parquet and tall ceiling dusting',
        'Full liability insurance coverage up to €1,000,000 for peace of mind',
        'Early morning and after-hours availability for central offices and boutiques',
      ],
    },
    cleaningChallenges: {
      fi: [
        'Korkeiden huoneiden kattolistoihin kertyvä hieno kaupunkipöly',
        'Vanhojen kakluunien ja antiikkipintojen varovainen puhdistus',
        'Kadunpuoleisten ikkunoiden puhdistus vilkkaassa kaupunkiympäristössä',
      ],
      sv: [
        'Findamm vid höga stuckaturer och taklister',
        'Varsam rengöring kring historiska kakelugnar och trädetaljer',
        'Fönsterputsning mot trafikerade innerstadsgator',
      ],
      en: [
        'Fine street soot settling on 3.2m-high ceiling moldings and chandeliers',
        'Preserving antique tiled stoves (kakluunit) and heritage woodwork',
        'Street-facing double window casement cleaning in dense urban traffic',
      ],
    },
    nearbyAreaIds: ['ruoholahti', 'punavuori', 'toolo', 'kruununhaka'],
    heroImage: '/src/assets/images/sofa_cleaning_pro_1794054907523.jpg',
    popularServiceIds: ['kotisiivous', 'suursiivous', 'sohvan-puhdistus', 'matonpesu', 'kylpyhuoneen-siivous', 'toimistosiivous'],
    localReview: {
      author: 'Sofia K.',
      street: 'Urho Kekkosen katu, Kamppi',
      rating: 5,
      date: '3 päivää sitten',
      serviceName: {
        fi: 'Muuttosiivous',
        sv: 'Flyttstädning',
        en: 'Move-out cleaning',
      },
      quote: {
        fi: 'Muuttosiivous Kampin kaksiossamme sujui täydellisesti! Vuokranantaja kehui uunin ja kylpyhuoneen puhtautta ja takuuvuokra palautettiin samana iltana.',
        sv: 'Flyttstädningen i vår tvåa i Kampen var helt perfekt. Depositionen betalades tillbaka utan anmärkning!',
        en: 'Our move-out clean in Kamppi was flawless. The landlord remarked on how sparkling the oven and tiles were, deposit returned immediately!',
      },
    },
  },

  lauttasaari: {
    id: 'lauttasaari',
    slug: 'lauttasaari',
    cityId: 'helsinki',
    postalCodes: ['00200', '00210'],
    coords: { lat: 60.1587, lng: 24.8789 },
    names: {
      fi: 'Lauttasaari',
      sv: 'Drumsö',
      en: 'Lauttasaari',
    },
    badgeText: {
      fi: 'Tunnistettu alue: Lauttasaari (00200 / 00210)',
      sv: 'Identifierat område: Drumsö (00200 / 00210)',
      en: 'Identified Area: Lauttasaari (00200 / 00210)',
    },
    heroHeading: {
      fi: 'Ammattitaitoiset siivouspalvelut Lauttasaaressa, Helsingissä',
      sv: 'Professionella städtjänster på Drumsö, Helsingfors',
      en: 'Professional Cleaning Services in Lauttasaari, Helsinki',
    },
    heroIntro: {
      fi: 'Onnellisten saaren luotettava siivouskumppani: palvelemme Vattuniemen moderneja rantakoteja, Pohjois-Lauttasaaren idyllisiä 50-luvun taloja sekä yrityksiä.',
      sv: 'Drumsös pålitliga städpartner: vi hjälper moderna havslägenheter i Hallonnäs och charmiga 50-talshus på norra Drumsö.',
      en: 'The trusted cleaning partner of Lauttasaari island: catering to modern coastal homes in Vattuniemi, classic 1950s flats, and seaside businesses.',
    },
    localContext: {
      fi: 'Lauttasaari (00200 & 00210) tunnetaan saaristomaisemistaan, rauhallisesta merellisestä tunnelmastaan ja aktiivisista lapsiperheistään.',
      sv: 'Drumsö erbjuder härlig skärgårdskänsla med närhet till Helsingfors centrum via metro och broar.',
      en: 'Lauttasaari island balances tranquil maritime pine nature with rapid metro connections to Helsinki center.',
    },
    architectureInfo: {
      fi: 'Vattuniemen uudiskohteissa on laajat lasitukset, kun taas 1950-luvun suojelluissa kerrostaloissa on usein kapeat hissit tai portaat sekä alkuperäiset valurautapatterit.',
      sv: 'Moderna havsnära lägenheter i Hallonnäs blandas med klassiska 50-talsbostäder med tidstypiska fönsterkarmar.',
      en: 'Vattuniemi modern builds contrast with 1950s stone buildings with deep window sills and custom woodwork.',
    },
    specialOffer: {
      code: 'SAARI15',
      discountPercent: 15,
      title: {
        fi: 'Lauttasaaren saarialuetarjous: -15% ensikäynnistä',
        sv: 'Drumsös ö-erbjudande: -15% rabatt',
        en: 'Lauttasaari Island Offer: 15% discount',
      },
      desc: {
        fi: 'Käytä koodia SAARI15 tilatessasi säännöllisen siivouksen tai ikkunanpesun Lauttasaareen.',
        sv: 'Använd koden SAARI15 för rabatt på Drumsö.',
        en: 'Use code SAARI15 for savings across Lauttasaari.',
      },
    },
    keyHighlights: {
      fi: [
        'Vakituinen Lauttasaari-tiimi liikkeellä saarella joka päivä',
        'Ympäristöystävälliset Joutsenmerkityt puhdistusaineet',
        'Raikas merituulen kestävä ikkunanpesu ammattilaiskalustolla',
        'Sujuva avainpalvelu Lauttasaaren metroaseman lähellä',
      ],
      sv: [
        'Eget team stationerat på Drumsö varje vardag',
        'Svanenmärkta, miljövänliga rengöringsprodukter',
        'Professionell fönsterputsning med kalkskydd',
        'Smidig nyckelservice nära Drumsö metro',
      ],
      en: [
        'Dedicated island cleaning crew serving Lauttasaari every day',
        'Nordic Swan Ecolabel non-toxic cleaning agents safe for kids and pets',
        'High-grade window wash formulated against coastal sea spray',
        'Seamless key handover around Lauttasaari metro station',
      ],
    },
    cleaningChallenges: {
      fi: [
        'Meren läheisyyden tuoma suola ja kosteus ikkunalaseissa',
        'Koirien ja ulkoilun tuoma hiekka eteistiloissa',
        'Kalkkijäämät kylpyhuoneen laatoituksissa ja lasipinnoilla',
      ],
      sv: [
        'Salt och fukt från havet på fönsterytor',
        'Sand och smuts från hundpromenader och strandstigar',
        'Kalkavlagringar i badrum och bastuutrymmen',
      ],
      en: [
        'Salt mist film on exterior glass panes',
        'Fine beach sand and outdoor grit in hallways and entryways',
        'Hard water spotting on glass shower walls and tiles',
      ],
    },
    nearbyAreaIds: ['ruoholahti', 'kamppi', 'toolo', 'tapiola'],
    heroImage: '/src/assets/images/bathroom_deepclean_1794054888257.jpg',
    popularServiceIds: ['kotisiivous', 'ikkunanpesu', 'saunan-pesu', 'suursiivous', 'matonpesu'],
    localReview: {
      author: 'Antti & Laura T.',
      street: 'Vattuniemenkatu, Lauttasaari',
      rating: 5,
      date: 'Viikko sitten',
      serviceName: {
        fi: 'Säännöllinen kotisiivous',
        sv: 'Regelbunden städning',
        en: 'Recurring home cleaning',
      },
      quote: {
        fi: 'Kahden koiran ja pienten lasten perheessä Siisti360 on ollut pelastus. Joka toinen viikko saamme tulla puhtaaseen kotiin ilman viikonloppustressiä.',
        sv: 'Med två hundar och barn har Siisti360 räddat våra helger på Drumsö!',
        en: 'With two dogs and active toddlers in Lauttasaari, Siisti360 has been a lifesaver. We return to a gleaming, fresh home every alternate Tuesday.',
      },
    },
  },

  tapiola: {
    id: 'tapiola',
    slug: 'tapiola',
    cityId: 'espoo',
    postalCodes: ['02100', '02110', '02120'],
    coords: { lat: 60.1764, lng: 24.8055 },
    names: {
      fi: 'Tapiola',
      sv: 'Hagalund',
      en: 'Tapiola',
    },
    badgeText: {
      fi: 'Tunnistettu alue: Tapiola, Espoo (02100)',
      sv: 'Identifierat område: Hagalund, Esbo (02100)',
      en: 'Identified Area: Tapiola, Espoo (02100)',
    },
    heroHeading: {
      fi: 'Ammattitaitoiset siivouspalvelut Tapiolassa, Espoossa',
      sv: 'Professionella städtjänster i Hagalund, Esbo',
      en: 'Professional Cleaning Services in Tapiola, Espoo',
    },
    heroIntro: {
      fi: 'Puutarhakaupungin tunteva siivouspalvelu koteihin ja toimistoihin. Palvelemme Tapiolan keskustan uudiskohteita, Otsolahden rantarivejä sekä vehreitä suojeltuja taloyhtiöitä.',
      sv: 'Trädgårdsstadens professionella städtjänst för bostäder och kontor i Hagalund, Esbo.',
      en: 'Garden city cleaning excellence for homes and offices in Tapiola, Espoo. Catering to Otsolahti coastal residences and modernist townhomes.',
    },
    localContext: {
      fi: 'Tapiola (02100) on Espoon arkkitehtoninen sydän ja maailmankuulu puutarhakaupunki, jossa kulttuuri, metroasema ja Ainoa-keskuksen palvelut luovat laadukkaan elinympäristön.',
      sv: 'Hagalund (02100) är Esbos kultur- och arkitekturcentrum med fantastisk grönska och moderna metroförbindelser.',
      en: 'Tapiola (02100) is Espoo’s celebrated modernist garden city, distinguished by lush greenery, cultural centers, and upscale housing.',
    },
    architectureInfo: {
      fi: 'Tapiolassa arkkitehtuuri vaihtelee Aarne Ervin 50-luvun klassikoista uusiin Ainoan torneihin. Suurista maisemaikkunoista avautuu näkymä mäntyihin, ja luonnonvalo paljastaa jokaisen pölyhiukkasen.',
      sv: 'Klassiska 50-talsvillor och moderna höghus vid Ainoa med stora fönster mot tallskogen.',
      en: 'Architecture ranges from 1950s mid-century masterpieces to soaring glass towers over Ainoa mall, demanding expert window and woodwork maintenance.',
    },
    specialOffer: {
      code: 'ESPOO15',
      discountPercent: 15,
      title: {
        fi: 'Tapiolan & Espoon aluetarjous: -15% ensitilauksesta',
        sv: 'Hagalunds erbjudande: -15% rabatt',
        en: 'Tapiola & Espoo Offer: 15% discount',
      },
      desc: {
        fi: 'Hyödynnä koodi ESPOO15 varatessasi siivouksen Tapiolan alueelle.',
        sv: 'Använd koden ESPOO15 för rabatt i Hagalund.',
        en: 'Redeem code ESPOO15 for 15% off first service in Tapiola.',
      },
    },
    keyHighlights: {
      fi: [
        'Tapiolan ja Länsimetron varren paikallinen siivoustiimi',
        'Parkettien ja luonnonkivilattioiden suojaava puhdistus',
        'Pihapölyn ja siitepölyn tehokas poisto allergiakodeissa',
        'Täysi 60 % kotitalousvähennys',
      ],
      sv: [
        'Lokal personal längs Västmetron i Esbo',
        'Skyddande rengöring av parkett och natursten',
        'Effektiv damm- och pollenreducering',
        'Fullt hushållsavdrag 60 %',
      ],
      en: [
        'Dedicated West Metro corridor cleaning team stationed in Espoo',
        'Protective treatments for parquet and natural slate flooring',
        'Pollen and pine dust extraction with HEPA air filters',
        'Full 60% household tax deduction supported',
      ],
    },
    cleaningChallenges: {
      fi: [
        'Mäntyjen ja lehtipuiden siitepöly keväisin ikkunoissa ja terasseilla',
        'Korkeat ikkunat ja luonnonvalon vaatima raidaton viimeistely',
        'Saunaosastojen ja porealtaiden säännöllinen desinfiointi',
      ],
      sv: [
        'Tallpollen på fönster och balkonger under våren',
        'Stora glaspartier som kräver spegelblank finish',
        'Rengöring av bastu och spabad i enfamiljshus',
      ],
      en: [
        'Heavy seasonal pine pollen on oversized forest-facing windows',
        'Bright natural daylight magnifying streaks on dark tiles',
        'Private sauna complexes and spa descaling',
      ],
    },
    nearbyAreaIds: ['leppavaara', 'matinkyla', 'otaniemi', 'lauttasaari'],
    heroImage: '/src/assets/images/ruoholahti_cleaning_1794054875174.jpg',
    popularServiceIds: ['kotisiivous', 'saannollinen-kotisiivous', 'ikkunanpesu', 'saunan-pesu', 'remonttisiivous'],
    localReview: {
      author: 'Mikael V.',
      street: 'Menninkäisentie, Tapiola',
      rating: 5,
      date: '4 päivää sitten',
      serviceName: {
        fi: 'Ikkunanpesu & Kotisiivous',
        sv: 'Fönsterputs & städning',
        en: 'Window washing & Home cleaning',
      },
      quote: {
        fi: 'Tapiolan rivitalomme isot ikkunat puhdistettiin ammattitaidolla. Erityiskiitos siitä, että siivoojat huomioivat puulattiamme ja käyttivät hellävaraisia aineita.',
        sv: 'Våra stora fönster i radhuset blev skinande rena. Mycket nöjd med Siisti360!',
        en: 'The large windows of our Tapiola townhouse were cleaned flawlessly. They treated our oiled wood floors with immense care.',
      },
    },
  },

  leppavaara: {
    id: 'leppavaara',
    slug: 'leppavaara',
    cityId: 'espoo',
    postalCodes: ['02600', '02610', '02650'],
    coords: { lat: 60.2185, lng: 24.8129 },
    names: {
      fi: 'Leppävaara',
      sv: 'Alberga',
      en: 'Leppävaara',
    },
    badgeText: {
      fi: 'Tunnistettu alue: Leppävaara, Espoo (02600)',
      sv: 'Identifierat område: Alberga, Esbo (02600)',
      en: 'Identified Area: Leppävaara, Espoo (02600)',
    },
    heroHeading: {
      fi: 'Ammattitaitoiset siivouspalvelut Leppävaarassa, Espoossa',
      sv: 'Professionella städtjänster i Alberga, Esbo',
      en: 'Professional Cleaning Services in Leppävaara, Espoo',
    },
    heroIntro: {
      fi: 'Espoon vilkkaimman solmukohdan koteihin ja yrityksiin: Sellon lähiympäristön asunnot, Perkan uudiskohteet sekä Leppävaaran toimitilat siistiksi nopeasti ja luotettavasti.',
      sv: 'Städning för bostäder och kontor runt Sello och Alberga med pålitlig personal.',
      en: 'Cleaning excellence around Sello mall, Perkkaa new developments and Leppävaara corporate hubs with speed and utmost reliability.',
    },
    localContext: {
      fi: 'Leppävaara (02600) on Espoon suurin asukas- ja työpaikkakeskittymä pikaraitiotie 15:n ja rantaradan risteyskohdassa.',
      sv: 'Alberga är Esbos mest dynamiska knutpunkt med snabbspårvagn och utmärkta tågförbindelser.',
      en: 'Leppävaara is Espoo’s busiest transit and residential center with light rail 15 and direct rail connections.',
    },
    architectureInfo: {
      fi: 'Alueella on runsaasti tiiviisti rakennettuja nykyaikaisia kerrostaloja, joissa on avokeittiöt, lasitetut parvekkeet ja koneellinen ilmanvaihto.',
      sv: 'Många moderna flervåningshus med öppna planlösningar och mekanisk ventilation.',
      en: 'Dense contemporary multi-story residences with open kitchens, glazed balconies and mechanical air exchange.',
    },
    specialOffer: {
      code: 'LEPPA15',
      discountPercent: 15,
      title: {
        fi: 'Leppävaaran aluetarjous: -15% ensisiivouksesta',
        sv: 'Albergas rabatt: -15%',
        en: 'Leppävaara Offer: 15% discount',
      },
      desc: {
        fi: 'Syötä koodi LEPPA15 varatessasi kotisiivouksen postinumeroon 02600 tai 02650.',
        sv: 'Ange LEPPA15 för städning i 02600.',
        en: 'Use code LEPPA15 for postal code 02600/02650.',
      },
    },
    keyHighlights: {
      fi: [
        'Nopea vasteaika Sellon ja Perkan alueella',
        'Toimistojen ja kotien räätälöidyt huoltosuunnitelmat',
        'Muuttosiivoukset takuulla ja tarkistuslistalla',
        '60 % kotitalousvähennys',
      ],
      sv: [
        'Snabb inställelsetid i Alberga och Perkkaa',
        'Skräddarsydda städplaner för hem och företag',
        'Flyttstädning med godkännandegaranti',
        '60 % hushållsavdrag',
      ],
      en: [
        'Rapid response time across Sello and Perkkaa quarters',
        'Customized maintenance plans for apartments and business units',
        'Move-out cleans with deposit guarantee and inspection sign-off',
        'Full 60% tax deduction applicable',
      ],
    },
    cleaningChallenges: {
      fi: [
        'Junaradan ja Kehä I:n aiheuttama ulkoilmapöly ikkunoissa',
        'Korkean käyttöasteen kerrostalokotien arjen kuluma ja eteiset',
        'Uudiskohteiden maalipöly ja hienojakoinen rakennusjäämä',
      ],
      sv: [
        'Trafikdamm från Ring I och banområdet',
        'Hårt slitage i entréer och gemensamma utrymmen',
        'Byggdamm i nybyggda kvarter',
      ],
      en: [
        'Street dust and rail particulate on window frames',
        'High wear-and-tear in busy commuter apartment entrance areas',
        'Fine plaster and gypsum residue in recently constructed units',
      ],
    },
    nearbyAreaIds: ['tapiola', 'kallio', 'pasila', 'myyrmaki'],
    heroImage: '/src/assets/images/office_cleaning_pro_1794054920944.jpg',
    popularServiceIds: ['kotisiivous', 'muuttosiivous', 'toimistosiivous', 'ikkunanpesu', 'suursiivous'],
    localReview: {
      author: 'Juha P.',
      street: 'Alberganpromenadi, Leppävaara',
      rating: 5,
      date: '2 viikkoa sitten',
      serviceName: {
        fi: 'Toimistosiivous & Kotisiivous',
        sv: 'Kontorsstädning',
        en: 'Office cleaning',
      },
      quote: {
        fi: 'Siisti360 hoitaa sekä kotini että yrityksemme 120 m² toimiston Sellon kupeessa. Erittäin jämpti ja ammattitaitoinen palvelu!',
        sv: 'Siisti360 tar hand om både mitt hem och vårt kontor vid Sello. Mycket pålitliga!',
        en: 'Siisti360 manages both my home and our 120 m² software office next to Sello. Incredibly punctual and thorough team!',
      },
    },
  },

  tikkurila: {
    id: 'tikkurila',
    slug: 'tikkurila',
    cityId: 'vantaa',
    postalCodes: ['01300', '01350'],
    coords: { lat: 60.2934, lng: 25.0416 },
    names: {
      fi: 'Tikkurila',
      sv: 'Dickursby',
      en: 'Tikkurila',
    },
    badgeText: {
      fi: 'Tunnistettu alue: Tikkurila, Vantaa (01300)',
      sv: 'Identifierat område: Dickursby, Vanda (01300)',
      en: 'Identified Area: Tikkurila, Vantaa (01300)',
    },
    heroHeading: {
      fi: 'Ammattitaitoiset siivouspalvelut Tikkurilassa, Vantaalla',
      sv: 'Professionella städtjänster i Dickursby, Vanda',
      en: 'Professional Cleaning Services in Tikkurila, Vantaa',
    },
    heroIntro: {
      fi: 'Vantaan hallinnollisen ja kulttuurisen sydämen siivousasiantuntija: palvelemme Tikkurilan asemanseudun kerrostaloja, Keravanjoen rantakoteja ja yritystiloja.',
      sv: 'Städpartner i Dickursby, Vanda: lägenheter nära stationen, flervåningshus vid Kervo å och företag.',
      en: 'Leading cleaning service across Tikkurila, Vantaa: serving modern station apartments, riverside homes by Keravanjoki and corporate suites.',
    },
    localContext: {
      fi: 'Tikkurila (01300) on Vantaan keskeisin kaupunkikeskus, jossa vilkas Dixi-asemakeskus, Heureka ja Keravanjoen vehreät puistot luovat viihtyisän kokonaisuuden.',
      sv: 'Dickursby (01300) är Vandas centrum med utmärkta flyg- och tågförbindelser samt trivsamma bostadskvarter.',
      en: 'Tikkurila (01300) is the administrative core of Vantaa, combining fast airport rail links at Dixi with riverside residences.',
    },
    architectureInfo: {
      fi: 'Uudet 2010–2020-lukujen kerrostalot yhdistyvät historiallisiin puutaloihin ja 70-luvun betonikiinteistöihin. Huolehdimme laattojen ja saumojen kalkinpoistosta sekä lattiamateriaalien suojauksesta.',
      sv: 'Nya bostäder vid Dixi kombinerat med äldre fastigheter och radhus.',
      en: 'New urban towers adjacent to Dixi mixed with established garden estates and Keravanjoki riverfront properties.',
    },
    specialOffer: {
      code: 'TIKKU15',
      discountPercent: 15,
      title: {
        fi: 'Tikkurilan & Vantaan aluetarjous: -15% ensikäynnistä',
        sv: 'Dickursby erbjudande: -15%',
        en: 'Tikkurila & Vantaa Offer: 15% discount',
      },
      desc: {
        fi: 'Käytä koodia TIKKU15 tilatessasi siivouspalvelun postinumeroon 01300.',
        sv: 'Använd TIKKU15 i 01300.',
        en: 'Redeem code TIKKU15 for bookings in 01300.',
      },
    },
    keyHighlights: {
      fi: [
        'Vantaan oma siivoustiimi Tikkurilassa päivittäin',
        'Täsmälliset tuloajat ja avainten luotettava säilytys',
        'Allergiavapaat hajusteettomat pesuaineet pyynnöstä',
        '60 % kotitalousvähennys verotuksessa',
      ],
      sv: [
        'Eget Vanda-team på plats varje dag',
        'Punktliga besökstider och säker nyckelförvaring',
        'Doftfria allergivänliga rengöringsmedel på begäran',
        '60 % hushållsavdrag',
      ],
      en: [
        'Dedicated Vantaa crew active across Tikkurila every weekday',
        'Punctual arrivals and secure key lockbox protocols',
        'Fragrance-free hypoallergenic cleaning formulas upon request',
        'Full 60% Finnish tax deduction applied',
      ],
    },
    cleaningChallenges: {
      fi: [
        'Kalkkipitoinen vesi vaatii säännöllistä kalkinpoistoa kylpytiloissa',
        'Ratakadun ja Vernissakadun pölyn poisto parvekelaseista',
        'Perhekotien lattioiden ja keittiöiden tehokas viikkosiivous',
      ],
      sv: [
        'Kalkavlagringar i duschar och handfat',
        'Damm från trafikerade gator runt centrum',
        'Veckostädning för barnfamiljer med husdjur',
      ],
      en: [
        'Mineral spotting and hard water scale requiring specialist descalers',
        'Transit hub dust on glazed balconies facing the rail spine',
        'Family household floor sanitization and kitchen degreasing',
      ],
    },
    nearbyAreaIds: ['myyrmaki', 'pakkala', 'korso', 'kallio'],
    heroImage: '/src/assets/images/bathroom_deepclean_1794054888257.jpg',
    popularServiceIds: ['kotisiivous', 'saannollinen-kotisiivous', 'muuttosiivous', 'kylpyhuoneen-siivous', 'porrassiivous'],
    localReview: {
      author: 'Tiina N.',
      street: 'Kielotie, Tikkurila',
      rating: 5,
      date: 'Viikko sitten',
      serviceName: {
        fi: 'Säännöllinen kotisiivous',
        sv: 'Regelbunden hemstädning',
        en: 'Recurring home cleaning',
      },
      quote: {
        fi: 'Ihana palata töistä kotiin puhtaaseen Tikkurilan kotiin. Kylpyhuone ja keittiö kiiltävät kuin uudet, ja siivooja on aina uskomattoman kohtelias.',
        sv: 'Underbart att komma hem till ett rent hem i Dickursby efter jobbet!',
        en: 'Wonderful coming home from work to our pristine Tikkurila flat. The kitchen and bathroom sparkle like new every single visit.',
      },
    },
  },

  kallio: {
    id: 'kallio',
    slug: 'kallio',
    cityId: 'helsinki',
    postalCodes: ['00530', '00500'],
    coords: { lat: 60.1843, lng: 24.9501 },
    names: {
      fi: 'Kallio',
      sv: 'Berghäll',
      en: 'Kallio',
    },
    badgeText: {
      fi: 'Tunnistettu alue: Kallio & Hakaniemi (00530)',
      sv: 'Identifierat område: Berghäll (00530)',
      en: 'Identified Area: Kallio (00530)',
    },
    heroHeading: {
      fi: 'Ammattitaitoiset siivouspalvelut Kalliossa, Helsingissä',
      sv: 'Professionella städtjänster i Berghäll, Helsingfors',
      en: 'Professional Cleaning Services in Kallio, Helsinki',
    },
    heroIntro: {
      fi: 'Kallion kompakteihin kaupunkikoteihin, historiallisiin kivitaloihin ja trendikkäisiin toimitiloihin sovitettu siivouspalvelu. Teemme tehokasta jälkeä myös pienissä yksiöissä ja kaksioissa.',
      sv: 'Effektiv städning för Berghälls kompakta citylägenheter och charmiga sekelskifteshus.',
      en: 'Tailored cleaning for Kallio’s vibrant urban studios, historic 1920s stone walkups and creative studios. Efficient space optimization and deep care.',
    },
    localContext: {
      fi: 'Kallio (00530) on Helsingin tiheimmin asuttu ja eläväisin kantakaupunginosa, jossa vanhat 1920–1930-lukujen asunnot vaativat taitavaa tilankäyttöä ja pikkutarkkaa pintojen hoitoa.',
      sv: 'Berghäll (00530) är Helsingfors tätast befolkade stadsdel, känd för sin karaktär och historiska stenhus.',
      en: 'Kallio (00530) is Helsinki’s most vibrant cultural enclave, filled with classic 1920s apartment buildings with compact floorplans.',
    },
    architectureInfo: {
      fi: 'Usein portaikot ilman hissiä tai kapeat hissit, puiset lautalattiat, korkeat ikkunalaudat ja kompakti kylpyhuone. Kalustomme on suunniteltu kulkemaan ketterästi vanhoissa porraskäytävissä.',
      sv: 'Ofta äldre trappuppgångar, trägolv och kompakta badrum som städas med smidig utrustning.',
      en: 'Historic stairwells, narrow elevators, solid timber floors and compact wet rooms. Our portable professional equipment navigates older architecture seamlessly.',
    },
    specialOffer: {
      code: 'KALLIO15',
      discountPercent: 15,
      title: {
        fi: 'Kallion & Hakaniemen aluetarjous: -15% ensitilauksesta',
        sv: 'Berghälls erbjudande: -15%',
        en: 'Kallio Offer: 15% discount',
      },
      desc: {
        fi: 'Käytä koodia KALLIO15 varatessasi siivouksen postinumeroon 00530 tai 00500.',
        sv: 'Använd KALLIO15 för rabatt i Berghäll.',
        en: 'Enter KALLIO15 for 15% discount in Kallio.',
      },
    },
    keyHighlights: {
      fi: [
        'Ketterä tiimi Kallion ja Hakaniemen sydämessä päivittäin',
        'Kompaktien kaupunkikotien tehokas tuntihinnoittelu ilman minimilisää',
        'Muuttosiivous takuulla Kallion vuokra- ja omistusasuntoihin',
        '60 % kotitalousvähennys',
      ],
      sv: [
        'Snabbt och smidigt team i Berghäll varje dag',
        'Prisvärd städning anpassad för ettor och tvåor',
        'Flyttstädning med godkänd garanti',
        '60 % skatteavdrag',
      ],
      en: [
        'Agile urban cleaning crew on site in Kallio every weekday',
        'Cost-effective flat rates optimized for studio and one-bedroom flats',
        'Move-out clean guarantee protecting your tenancy deposit',
        '60% domestic tax deduction (kotitalousvähennys)',
      ],
    },
    cleaningChallenges: {
      fi: [
        'Kompaktien kylpyhuoneiden ja suihkunurkkien kalkkisaostumat',
        'Hämeentien ja Fleminginkadun katurapautumat eteisissä',
        'Lautalattioiden suojelu kosteudelta hellävaraisella nihkeäpyyhinnällä',
      ],
      sv: [
        'Kalk och fukt i små badrumslösningar',
        'Gatudamm och grus från innerstadens trottoarer',
        'Varsam torkning av traditionella trägolv',
      ],
      en: [
        'Lime buildup in compact European-style wet rooms',
        'Urban grime in high-traffic hallway thresholds',
        'Damp-mopping timber plank flooring without over-saturation',
      ],
    },
    nearbyAreaIds: ['kamppi', 'sorneinen', 'vallila', 'pasila'],
    heroImage: '/src/assets/images/sofa_cleaning_pro_1794054907523.jpg',
    popularServiceIds: ['kotisiivous', 'muuttosiivous', 'suursiivous', 'kylpyhuoneen-siivous', 'sohvan-puhdistus'],
    localReview: {
      author: 'Eetu R.',
      street: 'Fleminginkatu, Kallio',
      rating: 5,
      date: '5 päivää sitten',
      serviceName: {
        fi: 'Kertasiivous & Kylpyhuone',
        sv: 'Engångsstädning',
        en: 'One-time clean',
      },
      quote: {
        fi: 'Tilasimme suursiivouksen 42 m² Kallion kaksioomme ennen ystävien illallista. Keittiö ja kylpyhuone tulivat aivan käsittämättömän puhtaiksi, suosittelen!',
        sv: 'Bästa städfirman i Berghäll! Badrummet och spisen blev som nya.',
        en: 'Best cleaning service in Kallio. Our 42 m² apartment was transformed in 3 hours flat, right before our dinner party.',
      },
    },
  },

  myyrmaki: {
    id: 'myyrmaki',
    slug: 'myyrmaki',
    cityId: 'vantaa',
    postalCodes: ['01600'],
    coords: { lat: 60.2612, lng: 24.8553 },
    names: {
      fi: 'Myyrmäki',
      sv: 'Myrbacka',
      en: 'Myyrmäki',
    },
    badgeText: {
      fi: 'Tunnistettu alue: Myyrmäki, Vantaa (01600)',
      sv: 'Identifierat område: Myrbacka, Vanda (01600)',
      en: 'Identified Area: Myyrmäki, Vantaa (01600)',
    },
    heroHeading: {
      fi: 'Ammattitaitoiset siivouspalvelut Myyrmäessä, Vantaalla',
      sv: 'Professionella städtjänster i Myrbacka, Vanda',
      en: 'Professional Cleaning Services in Myyrmäki, Vantaa',
    },
    heroIntro: {
      fi: 'Länsi-Vantaan keskuspaikan luotettu puhtauskumppani: Myyrmäen asemanseudun kerrostalot, Raappavuoren puistomaiset kodit ja Louhelan toimitilat säihkyvän puhtaiksi ammattitaidolla.',
      sv: 'Städtjänster för bostäder och lokaler runt Myrbacka station, Raappavuori och Louhela med lokalt team.',
      en: 'Trusted cleaning partner in Western Vantaa: serving Myyrmäki train station high-rises, parkside family residences and commercial spaces with thorough local care.',
    },
    localContext: {
      fi: 'Myyrmäki (01600) on Länsi-Vantaan suurin kaupunkikeskus ja katutaiteen edelläkävijä kehäradan varrella. Alueella on monipuolinen kanta 1970–1990-lukujen kerrostaloja sekä uudempia Myyrmannin viereisiä koteja.',
      sv: 'Myrbacka (01600) är västra Vandas centrum med utmärkta tågförbindelser och aktiv kulturverksamhet.',
      en: 'Myyrmäki (01600) is West Vantaa’s vibrant focal district on the ring rail line, home to diverse residential architecture and bustling community hubs.',
    },
    architectureInfo: {
      fi: 'Alueen kiinteistöissä on tyypillisesti suuret lasitetut parvekkeet, laatoitetut kylpyhuoneet ja toimivat keittiötilat. Huolehdimme kalkinpoistosta, suodattimien puhdistuksesta ja kulutusta kestävien lattiapintojen hoidosta.',
      sv: 'Bostäder med glasade balkonger och rymliga badrum som kräver noggrann kalk- och dammsanering.',
      en: 'Residences feature spacious enclosed balconies, tiled washrooms and modern functional layouts, requiring systematic lime removal and floor treatments.',
    },
    specialOffer: {
      code: 'MYYRMA15',
      discountPercent: 15,
      title: {
        fi: 'Myyrmäen & Länsi-Vantaan aluetarjous: -15% ensikäynnistä',
        sv: 'Myrbackas erbjudande: -15% rabatt',
        en: 'Myyrmäki & West Vantaa Offer: 15% discount',
      },
      desc: {
        fi: 'Käytä koodia MYYRMA15 tilatessasi kotisiivouksen tai suursiivouksen postinumeroon 01600.',
        sv: 'Använd koden MYYRMA15 vid bokning till postnummer 01600.',
        en: 'Redeem coupon MYYRMA15 for cleaning services in postal code 01600.',
      },
    },
    keyHighlights: {
      fi: [
        'Vakituinen Länsi-Vantaan siivoustiimi Myyrmäessä joka arkipäivä',
        'Avainpalvelu ja nouto Myyrmannin tai aseman seudulta',
        'Täysi 60 % kotitalousvähennys verotukseen',
        'Erikoistunut perhekotien ja lemmikkitalouksien puhtaanapitoon',
      ],
      sv: [
        'Lokal städpatrull i Myrbacka och Louhela varje vardag',
        'Smidig nyckelhantering nära Myyrmanni',
        '60 % skatteavdrag för hushållsnära tjänster',
        'Allergivänliga metoder anpassade för djurägare',
      ],
      en: [
        'Stationed cleaning crew operating in Myyrmäki and Louhela daily',
        'Key drop-off and pickup coordination right by Myyrmanni mall',
        'Full 60% Finnish tax deduction applied directly',
        'Specialized in active family homes and pet-friendly sanitization',
      ],
    },
    cleaningChallenges: {
      fi: [
        'Kehäradan ja Vihdintien liikenteestä kertyvä katupöly ikkunoissa',
        'Lemmikkien karvat ja eteistilojen rapakelit',
        'Kylpyhuoneiden suihkuseinien kalkkisaostumat',
      ],
      sv: [
        'Trafikdamm från ringbanan och vägarna',
        'Djurhår och smuts i entréer under regniga dagar',
        'Kalkavlagringar på badrumskakel',
      ],
      en: [
        'Traffic particulate from transport corridors on glass casements',
        'Pet hair extraction and hallway mud management',
        'Descaling glass shower surrounds and floor grout',
      ],
    },
    nearbyAreaIds: ['tikkurila', 'kaivoksela', 'martinlaakso', 'leppavaara'],
    heroImage: '/src/assets/images/bathroom_deepclean_1794054888257.jpg',
    popularServiceIds: ['kotisiivous', 'suursiivous', 'ikkunanpesu', 'muuttosiivous', 'sohvan-puhdistus'],
    localReview: {
      author: 'Anssi & Johanna K.',
      street: 'Raappavuorentie, Myyrmäki',
      rating: 5,
      date: '2 päivää sitten',
      serviceName: {
        fi: 'Säännöllinen kotisiivous',
        sv: 'Regelbunden städning',
        en: 'Recurring home cleaning',
      },
      quote: {
        fi: 'Siisti360 hoitaa 92 m² perhekotimme Myyrmäessä kaksi kertaa kuussa. Palvelu on ollut poikkeuksellisen täsmällistä ja kotimme tuoksuu aina raikkaalta!',
        sv: 'Mycket bra städning i vår lägenhet i Myrbacka. Alltid punktliga och trevliga.',
        en: 'Siisti360 cleans our 92 m² family flat in Myyrmäki twice a month. Extremely punctual and thorough, returning home is always a joy!',
      },
    },
  },

  matinkyla: {
    id: 'matinkyla',
    slug: 'matinkyla',
    cityId: 'espoo',
    postalCodes: ['02230'],
    coords: { lat: 60.1588, lng: 24.7438 },
    names: {
      fi: 'Matinkylä',
      sv: 'Mattby',
      en: 'Matinkylä',
    },
    badgeText: {
      fi: 'Tunnistettu alue: Matinkylä, Espoo (02230)',
      sv: 'Identifierat område: Mattby, Esbo (02230)',
      en: 'Identified Area: Matinkylä, Espoo (02230)',
    },
    heroHeading: {
      fi: 'Ammattitaitoiset siivouspalvelut Matinkylässä, Espoossa',
      sv: 'Professionella städtjänster i Mattby, Esbo',
      en: 'Professional Cleaning Services in Matinkylä, Espoo',
    },
    heroIntro: {
      fi: 'Ison Omenan ja Espoon rantaraittien tunnelmassa: palvelemme Matinkylän metrokeskuksen moderneja koteja, Tiistilän vehreitä asuinalueita sekä Iivisniemen rivitaloja.',
      sv: 'Städning runt Iso Omena och strandpromenaden i Mattby: moderna bostäder och radhus.',
      en: 'Between Iso Omena transit hub and scenic coastal trails: catering to Matinkylä modern high-rises, Tiistilä greenery and Iivisniemi townhouses.',
    },
    localContext: {
      fi: 'Matinkylä (02230) on Etelä-Espoon vetovoimainen keskus Länsimetron varrella, jossa meri ja palvelut kohtaavat.',
      sv: 'Mattby (02230) är ett expansivt centrum i södra Esbo med metro och havskontakt.',
      en: 'Matinkylä (02230) is South Espoo’s bustling coastal district anchored by Iso Omena and the Rantaraitti waterfront promenade.',
    },
    architectureInfo: {
      fi: 'Korkeatasoisia uudiskohteita yhdistettynä 70-luvun avariin pohjaratkaisuihin. Ikkunoiden ja parvekkeiden merituulen kestävä puhdistus on erityisalaamme.',
      sv: 'Moderna bostäder med glasytor och havsnära läge.',
      en: 'Modern high-rises and established townhomes with large balconies requiring streak-free coastal glass care.',
    },
    specialOffer: {
      code: 'MATIN15',
      discountPercent: 15,
      title: {
        fi: 'Matinkylän aluetarjous: -15% ensitilauksesta',
        sv: 'Mattbys rabatt: -15%',
        en: 'Matinkylä Offer: 15% discount',
      },
      desc: {
        fi: 'Syötä koodi MATIN15 tilatessasi siivouspalvelun postinumeroon 02230.',
        sv: 'Använd koden MATIN15 i postnummer 02230.',
        en: 'Use code MATIN15 when booking in postal code 02230.',
      },
    },
    keyHighlights: {
      fi: [
        'Länsimetron varren paikallistiimi Matinkylässä päivittäin',
        'Ikkunoiden ja lasitettujen parvekkeiden erikoispuhdistus',
        '60 % kotitalousvähennys suoraan verotukseen',
        'Allergiaystävälliset ja turvalliset puhdistusmenetelmät',
      ],
      sv: [
        'Team stationerat längs Västmetron i Mattby',
        'Specialister på fönsterputs och balkongglas',
        'Fullt hushållsavdrag 60 %',
        'Miljövänliga och skonsamma produkter',
      ],
      en: [
        'Dedicated West Metro team active in Matinkylä daily',
        'Specialist glazed balcony and large pane window care',
        '60% domestic tax deduction applied',
        'Hypoallergenic, kid- and pet-safe eco detergents',
      ],
    },
    cleaningChallenges: {
      fi: [
        'Merituulen tuoma kosteus ja suolapöly lasipinnoilla',
        'Korkean asukastiheyden talojen eteis- ja laattakuluma',
        'Kylpyhuoneiden ja saunojen säännöllinen syväpuhdistus',
      ],
      sv: [
        'Saltstänk på fönster mot havet',
        'Slitage i entréer och köksytor',
        'Rengöring av bastu och kakel',
      ],
      en: [
        'Maritime salt residue on exterior glass panels',
        'High entryway footwear wear-and-tear',
        'Regular deep descaling of private saunas and shower tiles',
      ],
    },
    nearbyAreaIds: ['tapiola', 'olari', 'niittykumpu', 'espoonlahti'],
    heroImage: '/src/assets/images/ruoholahti_cleaning_1794054875174.jpg',
    popularServiceIds: ['kotisiivous', 'suursiivous', 'ikkunanpesu', 'saunan-pesu', 'muuttosiivous'],
    localReview: {
      author: 'Kati S.',
      street: 'Piispansilta, Matinkylä',
      rating: 5,
      date: 'Viikko sitten',
      serviceName: {
        fi: 'Kotisiivous & Ikkunat',
        sv: 'Hemstäd & fönster',
        en: 'Home clean & windows',
      },
      quote: {
        fi: 'Ison Omenan vieressä sijaitsevan asuntomme ikkunat ja koti puhdistettiin uskomattoman tarkasti. Ammattitaitoista ja ystävällistä palvelua alusta loppuun.',
        sv: 'Skinande rena fönster och underbart städat hem i Mattby!',
        en: 'Our apartment next to Iso Omena was cleaned impeccably. Reliable and warm service throughout.',
      },
    },
  },

  punavuori: {
    id: 'punavuori',
    slug: 'punavuori',
    cityId: 'helsinki',
    postalCodes: ['00120'],
    coords: { lat: 60.1605, lng: 24.9338 },
    names: {
      fi: 'Punavuori',
      sv: 'Rödbergen',
      en: 'Punavuori',
    },
    badgeText: {
      fi: 'Tunnistettu alue: Punavuori & Rööperi (00120)',
      sv: 'Identifierat område: Rödbergen (00120)',
      en: 'Identified Area: Punavuori / Rööperi (00120)',
    },
    heroHeading: {
      fi: 'Ammattitaitoiset siivouspalvelut Punavuoressa, Helsingissä',
      sv: 'Professionella städtjänster i Rödbergen, Helsingfors',
      en: 'Professional Cleaning Services in Punavuori, Helsinki',
    },
    heroIntro: {
      fi: 'Designkorttelin historiallisille asunnoille ja putiikeille räätälöity siivous: vaalimme vanhoja lankkulattioita, korkeita huoneita ja ullakkohuoneistoja huolella.',
      sv: 'Varsam städning för sekelskifteshus, trägolv och vindsvåningar i Rödbergen med respekt för inredning och material.',
      en: 'Customized cleaning for Design District heritage flats, classic wooden floors and loft apartments in Punavuori with gentle, premium care.',
    },
    localContext: {
      fi: 'Punavuori (00120) on Helsingin designin ja luovan elämän keskus, jossa vanhat jugend-talot ja teollisuusromanttiset loftit vaativat erityistä materiaalituntemusta.',
      sv: 'Rödbergen är känt för sin design och unika arkitektur med vackra sekelskifteslägenheter.',
      en: 'Punavuori is Helsinki’s creative design quarter, characterized by charming 1900s walkups and industrial-chic loft conversions.',
    },
    architectureInfo: {
      fi: 'Perinteiset lankkulattiat, kipsilistat ja erikoislasitukset kaipaavat pH-neutraalia hoitoa. Puhdistustiimimme osaa kohdella arvokkaita pintoja niiden ansaitsemalla arvokkuudella.',
      sv: 'Traditionella trägolv och stuckaturer kräver skonsamma produkter utan starka kemikalier.',
      en: 'Heritage wood planks, vintage tilework and high ceilings require specialized pH-neutral solutions and delicate microfibers.',
    },
    specialOffer: {
      code: 'ROOPERI15',
      discountPercent: 15,
      title: {
        fi: 'Punavuoren aluetarjous: -15% ensisiivouksesta',
        sv: 'Rödbergens rabatt: -15%',
        en: 'Punavuori Offer: 15% discount',
      },
      desc: {
        fi: 'Syötä koodi ROOPERI15 varatessasi siivouksen postinumeroon 00120.',
        sv: 'Använd koden ROOPERI15 i 00120.',
        en: 'Enter code ROOPERI15 for 15% discount in 00120.',
      },
    },
    keyHighlights: {
      fi: [
        'Keskustan ja Punavuoren tiimi liikkeellä päivittäin',
        'Vanhojen puu- ja kivilattioiden suojaava käsittely',
        'Kattava vastuuvakuutus 1 000 000 € asti',
        '60 % kotitalousvähennys',
      ],
      sv: [
        'Lokal personal i innerstan varje dag',
        'Varsam behandling av trä- och stengolv',
        'Ansvarsförsäkring upp till 1 000 000 €',
        '60 % hushållsavdrag',
      ],
      en: [
        'Active inner-city crew serving Punavuori daily',
        'Protective treatments for aged wood and slate flooring',
        'Full liability coverage up to €1,000,000',
        '60% domestic tax deduction applied',
      ],
    },
    cleaningChallenges: {
      fi: [
        'Korkeiden huoneiden valaisimien ja kattolistojen pöly',
        'Historiallisten ikkunoiden sisä- ja välipintojen varovainen puhdistus',
        'Vanhojen kylpyhuoneiden herkkien saumojen puhdistus',
      ],
      sv: [
        'Damm vid höga tak och takrosetter',
        'Känsliga fönsterbågar i äldre fastigheter',
        'Fogar och kakel i äldre badrum',
      ],
      en: [
        'Dust accumulation on 3.3m high chandeliers and ornamental cornices',
        'Careful treatment of multi-pane historical window casements',
        'Delicate tile grout preservation in renovated period bathrooms',
      ],
    },
    nearbyAreaIds: ['kamppi', 'ruoholahti', 'eira', 'ullanlinna'],
    heroImage: '/src/assets/images/sofa_cleaning_pro_1794054907523.jpg',
    popularServiceIds: ['kotisiivous', 'suursiivous', 'sohvan-puhdistus', 'matonpesu', 'ikkunanpesu'],
    localReview: {
      author: 'Henrik B.',
      street: 'Uudenmaankatu, Punavuori',
      rating: 5,
      date: 'Eilen',
      serviceName: {
        fi: 'Säännöllinen kotisiivous',
        sv: 'Regelbunden städning',
        en: 'Recurring home cleaning',
      },
      quote: {
        fi: 'Punavuoren jugend-asuntomme lautalattiat vaativat herkkää otetta. Siisti360:n siivooja tekee poikkeuksellisen siistiä jälkeä ilman kovia kemikaaleja!',
        sv: 'Mycket nöjd med Siisti360 i Rödbergen. Trägolven hanteras med varsamhet.',
        en: 'Our turn-of-the-century flat in Punavuori has original floorboards. Siisti360 treats our home with exceptional care and gentle eco detergents.',
      },
    },
  },
};

/**
 * Scalable helper: Get existing neighborhood or generate configured metadata dynamically for any postal code entry
 */
export function getOrCreateNeighborhood(idOrSlugOrPostal: string): NeighborhoodInfo {
  const norm = idOrSlugOrPostal.trim().toLowerCase();
  if (NEIGHBORHOODS[norm]) {
    return NEIGHBORHOODS[norm];
  }

  // Check by postal code
  const entry = FINNISH_POSTAL_CODES.find((p) => p.code === norm || p.neighborhoodId === norm);
  if (entry && NEIGHBORHOODS[entry.neighborhoodId]) {
    return NEIGHBORHOODS[entry.neighborhoodId];
  }

  // Generate a dynamic, rich NeighborhoodInfo object
  const cityName = entry ? entry.cityName : 'Helsinki';
  const cityId: 'helsinki' | 'espoo' | 'vantaa' = entry ? entry.cityId : 'helsinki';
  const neighName = entry ? entry.neighborhoodName : idOrSlugOrPostal.charAt(0).toUpperCase() + idOrSlugOrPostal.slice(1);
  const pCode = entry ? entry.code : '00100';

  return {
    id: norm,
    slug: norm,
    cityId,
    postalCodes: [pCode],
    coords: { lat: 60.1699, lng: 24.9384 },
    names: {
      fi: neighName,
      sv: neighName,
      en: neighName,
    },
    badgeText: {
      fi: `Toimialue: ${neighName} (${pCode})`,
      sv: `Verksamhetsområde: ${neighName} (${pCode})`,
      en: `Service Area: ${neighName} (${pCode})`,
    },
    heroHeading: {
      fi: `Ammattitaitoiset siivouspalvelut alueella ${neighName}, ${cityName}`,
      sv: `Professionella städtjänster i ${neighName}, ${cityName}`,
      en: `Professional Cleaning Services in ${neighName}, ${cityName}`,
    },
    heroIntro: {
      fi: `Tarjoamme luotettavaa ja joustavaa siivouspalvelua alueella ${neighName} (${pCode}). Kotisiivous, suursiivous ja ikkunanpesu ammattilaisten toimesta 60% kotitalousvähennyksellä.`,
      sv: `Vi erbjuder pålitlig städning i ${neighName} (${pCode}) med fullt hushållsavdrag.`,
      en: `Providing dependable, eco-conscious cleaning services across ${neighName} (${pCode}). Recurring cleans, deep cleaning and window washing with 60% tax deduction.`,
    },
    localContext: {
      fi: `${neighName} on keskeinen osa ${cityName}n toimialuettamme (postinumero ${pCode}), jossa paikallinen siivoustiimimme palvelee asukkaita ja yrityksiä joustavilla tuloajoilla.`,
      sv: `${neighName} ingår i vårt verksamhetsområde i ${cityName}.`,
      en: `${neighName} (${pCode}) is an integral part of our core ${cityName} service radius.`,
    },
    architectureInfo: {
      fi: `Alueella ${neighName} hoidamme kerros-, rivi- ja omakotitalojen puhtaanapidon ammattivälinein ja HEPA-mikrokuitutekniikalla.`,
      sv: `Vi anpassar städningen efter fastighetstyp och ytskikt i ${neighName}.`,
      en: `We tailor equipment and protective formulas for residential and office properties across ${neighName}.`,
    },
    specialOffer: {
      code: 'SIISTI15',
      discountPercent: 15,
      title: {
        fi: `${neighName} aluetarjous: -15% ensitilauksesta`,
        sv: `Områdeserbjudande för ${neighName}: -15%`,
        en: `${neighName} Local Offer: 15% discount`,
      },
      desc: {
        fi: `Käytä koodia SIISTI15 varatessasi siivouksen alueelle ${neighName} (${pCode}).`,
        sv: `Använd SIISTI15 för rabatt i ${neighName}.`,
        en: `Enter code SIISTI15 when scheduling in ${neighName}.`,
      },
    },
    keyHighlights: {
      fi: [
        `Vakituinen siivoustiimi alueella ${neighName} arkisin`,
        'Täysi 60 % kotitalousvähennys suoraan verotukseen',
        'Kattava vastuuvakuutus 1 000 000 € asti',
        'Hajusteettomat ja ympäristöystävälliset puhdistusaineet',
      ],
      sv: [
        `Eget team i ${neighName} på vardagar`,
        '60 % skatteavdrag för hushållsnära tjänster',
        'Ansvarsförsäkring upp till 1 000 000 €',
        'Miljövänliga och skonsamma rengöringsmedel',
      ],
      en: [
        `Dedicated crew serving ${neighName} on weekdays`,
        'Full 60% Finnish tax deduction applied',
        '€1,000,000 comprehensive liability insurance',
        'Eco-certified, non-toxic cleaning agents',
      ],
    },
    cleaningChallenges: {
      fi: [
        'Kosteuden ja katupölyn poisto lasitetuilta parvekkeilta',
        'Kylpyhuoneen laattojen ja saumojen kalkkikertymien poisto',
        'Lattiamateriaalien suojaava, kosteuskontrolloitu puhdistus',
      ],
      sv: [
        'Damm och smuts på inglasade balkonger',
        'Kalkavlagringar i duschutrymmen',
        'Skonsam torkning av golv',
      ],
      en: [
        'Outdoor grime and dust on enclosed balconies',
        'Hard water descaling on tile grout and glass screens',
        'Moisture-controlled gentle floor sanitization',
      ],
    },
    nearbyAreaIds: ['ruoholahti', 'kamppi', 'tapiola', 'tikkurila'],
    heroImage: '/src/assets/images/bathroom_deepclean_1794054888257.jpg',
    popularServiceIds: ['kotisiivous', 'suursiivous', 'ikkunanpesu', 'muuttosiivous'],
    localReview: {
      author: 'Paikallinen asiakas',
      street: neighName,
      rating: 5,
      date: 'Hiljattain',
      serviceName: {
        fi: 'Kotisiivous',
        sv: 'Hemstädning',
        en: 'Home cleaning',
      },
      quote: {
        fi: `Siisti360 hoitaa siivouksemme alueella ${neighName} ammattitaidolla. Suosittelemme lämpimästi!`,
        sv: `Mycket bra städtjänst i ${neighName}!`,
        en: `Siisti360 consistently delivers top-tier cleaning quality in ${neighName}. Highly recommended!`,
      },
    },
  };
}

/**
 * Find neighborhood by postal code
 */
export function findNeighborhoodByPostalCode(code: string): NeighborhoodInfo | null {
  const cleanCode = code.trim();
  const entry = FINNISH_POSTAL_CODES.find((e) => e.code === cleanCode);
  if (entry) {
    if (NEIGHBORHOODS[entry.neighborhoodId]) {
      return NEIGHBORHOODS[entry.neighborhoodId];
    }
    return getOrCreateNeighborhood(entry.neighborhoodId);
  }
  return null;
}

/**
 * Find postal code entry by code
 */
export function findPostalEntry(code: string): PostalCodeEntry | undefined {
  const cleanCode = code.trim();
  return FINNISH_POSTAL_CODES.find((e) => e.code === cleanCode);
}

/**
 * Autocomplete / Search location by query (postal code, neighborhood name, city)
 */
export interface LocationSearchResult {
  id: string;
  type: 'postal' | 'neighborhood' | 'city';
  primaryText: string;
  secondaryText: string;
  postalCode?: string;
  cityId: 'helsinki' | 'espoo' | 'vantaa';
  neighborhoodId?: string;
  isCovered: boolean;
}

export function searchLocations(query: string, lang: Language = 'fi'): LocationSearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: LocationSearchResult[] = [];
  const seenKeys = new Set<string>();

  // 1. Direct postal code matching
  if (/^\d+$/.test(q)) {
    const matchingCodes = FINNISH_POSTAL_CODES.filter((e) => e.code.startsWith(q));
    matchingCodes.slice(0, 5).forEach((entry) => {
      const key = `post-${entry.code}`;
      if (!seenKeys.has(key)) {
        seenKeys.add(key);
        results.push({
          id: key,
          type: 'postal',
          primaryText: `${entry.code} ${entry.neighborhoodName}`,
          secondaryText: `${entry.cityName} • ${lang === 'fi' ? 'Toimialueella' : lang === 'sv' ? 'I verksamhetsområdet' : 'In service area'}`,
          postalCode: entry.code,
          cityId: entry.cityId,
          neighborhoodId: entry.neighborhoodId,
          isCovered: true,
        });
      }
    });

    // Check if user entered a full 5-digit postal code that is outside our coverage
    if (q.length === 5 && matchingCodes.length === 0) {
      results.push({
        id: `outside-${q}`,
        type: 'postal',
        primaryText: `${q} (Suomi)`,
        secondaryText:
          lang === 'fi'
            ? 'Päätoimialueen (Helsinki, Espoo, Vantaa) ulkopuolella'
            : lang === 'sv'
            ? 'Utanför primärområdet'
            : 'Outside primary capital service area',
        postalCode: q,
        cityId: 'helsinki',
        isCovered: false,
      });
    }
    return results;
  }

  // 2. Neighborhood name matching
  Object.values(NEIGHBORHOODS).forEach((n) => {
    const nameFi = n.names.fi.toLowerCase();
    const nameSv = n.names.sv.toLowerCase();
    const nameEn = n.names.en.toLowerCase();
    const matchesName = nameFi.includes(q) || nameSv.includes(q) || nameEn.includes(q);

    if (matchesName) {
      const key = `neigh-${n.id}`;
      if (!seenKeys.has(key)) {
        seenKeys.add(key);
        results.push({
          id: key,
          type: 'neighborhood',
          primaryText: `${n.names[lang]} (${n.postalCodes[0]})`,
          secondaryText: `${n.cityId === 'helsinki' ? 'Helsinki' : n.cityId === 'espoo' ? 'Espoo' : 'Vantaa'} • ${lang === 'fi' ? 'Vahvistettu toimialue' : lang === 'sv' ? 'Bekräftat område' : 'Verified service area'}`,
          postalCode: n.postalCodes[0],
          cityId: n.cityId,
          neighborhoodId: n.id,
          isCovered: true,
        });
      }
    }
  });

  // 3. Postal directory secondary matches (districts)
  FINNISH_POSTAL_CODES.forEach((entry) => {
    const name = entry.neighborhoodName.toLowerCase();
    const sec = (entry.secondaryNeighborhoods || []).join(' ').toLowerCase();
    if ((name.includes(q) || sec.includes(q)) && !seenKeys.has(`post-${entry.code}`)) {
      seenKeys.add(`post-${entry.code}`);
      results.push({
        id: `post-${entry.code}`,
        type: 'postal',
        primaryText: `${entry.code} ${entry.neighborhoodName}`,
        secondaryText: `${entry.cityName}`,
        postalCode: entry.code,
        cityId: entry.cityId,
        neighborhoodId: entry.neighborhoodId,
        isCovered: true,
      });
    }
  });

  // 4. City-level matching
  const cities: Array<{ id: 'helsinki' | 'espoo' | 'vantaa'; names: Record<Language, string> }> = [
    { id: 'helsinki', names: { fi: 'Helsinki', sv: 'Helsingfors', en: 'Helsinki' } },
    { id: 'espoo', names: { fi: 'Espoo', sv: 'Esbo', en: 'Espoo' } },
    { id: 'vantaa', names: { fi: 'Vantaa', sv: 'Vanda', en: 'Vantaa' } },
  ];

  cities.forEach((c) => {
    if (c.names[lang].toLowerCase().includes(q) || c.id.includes(q)) {
      const key = `city-${c.id}`;
      if (!seenKeys.has(key)) {
        seenKeys.add(key);
        results.push({
          id: key,
          type: 'city',
          primaryText: c.names[lang],
          secondaryText: lang === 'fi' ? 'Pääkaupunkiseudun kaupunki • Kaikki kaupunginosat' : lang === 'sv' ? 'Huvudstadsregionen • Alla stadsdelar' : 'Metropolitan City • All districts covered',
          cityId: c.id,
          isCovered: true,
        });
      }
    }
  });

  return results.slice(0, 8);
}

/**
 * Find closest neighborhood using browser geolocation coordinates (Haversine formula)
 */
export function findClosestNeighborhoodByCoords(lat: number, lng: number): {
  neighborhood: NeighborhoodInfo;
  distanceKm: number;
  isWithinCapitalRegion: boolean;
} {
  const R = 6371; // Earth's radius in km
  let closest: NeighborhoodInfo = NEIGHBORHOODS.ruoholahti;
  let minDistance = Infinity;

  Object.values(NEIGHBORHOODS).forEach((n) => {
    const dLat = ((n.coords.lat - lat) * Math.PI) / 180;
    const dLng = ((n.coords.lng - lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat * Math.PI) / 180) *
        Math.cos((n.coords.lat * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;

    if (d < minDistance) {
      minDistance = d;
      closest = n;
    }
  });

  return {
    neighborhood: closest,
    distanceKm: Math.round(minDistance * 10) / 10,
    isWithinCapitalRegion: minDistance <= 38, // 38km covers Helsinki, Espoo, Vantaa, Kauniainen
  };
}
