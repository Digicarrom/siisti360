export type Language = 'fi' | 'sv' | 'en';

export interface CityInfo {
  id: 'helsinki' | 'espoo' | 'vantaa';
  slugs: Record<Language, string>;
  names: Record<Language, string>;
  text: Record<Language, string>;
  districts: string[];
}

export interface ServiceInfo {
  id: string;
  category: 'home' | 'business';
  names: Record<Language, string>;
  slugs: Record<Language, string>;
  desc: Record<Language, string>;
  icon: string;
  popular?: boolean;
}

export interface GuideInfo {
  id: string;
  titles: Record<Language, string>;
  slugs: Record<Language, string>;
  summary: Record<Language, string>;
  points: Record<Language, string[]>;
  readTime: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  city: string;
  service: string;
  rating: number;
  date: string;
  text: Record<Language, string>;
}

export const CITIES: CityInfo[] = [
  {
    id: 'helsinki',
    slugs: { fi: 'helsinki', sv: 'helsingfors', en: 'helsinki' },
    names: { fi: 'Helsinki', sv: 'Helsingfors', en: 'Helsinki' },
    districts: ['Keskusta', 'Lauttasaari', 'Töölö', 'Kallio', 'Pasila', 'Vuosaari', 'Munkkiniemi', 'Malmi'],
    text: {
      fi: 'Helsingin keskustan kerrostaloista Lauttasaaren koteihin ja Pasilan toimistoihin: sovitamme siivoussuunnitelman tilan ja kulkuyhteyksien mukaan.',
      sv: 'Från lägenheter i centrala Helsingfors till hem i Drumsö och kontor i Böle anpassar vi städplanen efter lokalen och tillgängligheten.',
      en: 'From central Helsinki apartments to Lauttasaari homes and Pasila offices, we tailor the cleaning plan to each property and its access arrangements.',
    },
  },
  {
    id: 'espoo',
    slugs: { fi: 'espoo', sv: 'esbo', en: 'espoo' },
    names: { fi: 'Espoo', sv: 'Esbo', en: 'Espoo' },
    districts: ['Leppävaara', 'Tapiola', 'Matinkylä', 'Espoonlahti', 'Otaniemi', 'Kauniainen', 'Kivenlahti'],
    text: {
      fi: 'Espoon alueella palvelemme erilaisten kotien ja toimitilojen tarpeita esimerkiksi Leppävaarassa, Tapiolassa ja Matinkylässä.',
      sv: 'I Esbo hjälper vi olika typer av hem och företag, bland annat i Alberga, Hagalund och Mattby.',
      en: 'Across Espoo, we help homes and workplaces in areas such as Leppävaara, Tapiola and Matinkylä.',
    },
  },
  {
    id: 'vantaa',
    slugs: { fi: 'vantaa', sv: 'vanda', en: 'vantaa' },
    names: { fi: 'Vantaa', sv: 'Vanda', en: 'Vantaa' },
    districts: ['Tikkurila', 'Myyrmäki', 'Aviapolis', 'Kivistö', 'Korso', 'Martinlaakso', 'Koivukylä'],
    text: {
      fi: 'Vantaalla huomioimme niin Myyrmäen kodit, Tikkurilan työpaikat kuin Aviapoliksen vilkkaat toimitilatkin.',
      sv: 'I Vanda beaktar vi behoven i hem i Myrbacka, arbetsplatser i Dickursby och verksamhetslokaler i Aviapolis.',
      en: 'In Vantaa, we consider the different needs of Myyrmäki homes, Tikkurila workplaces and busy Aviapolis premises.',
    },
  },
];

export const SERVICES: ServiceInfo[] = [
  {
    id: 'kotisiivous',
    category: 'home',
    popular: true,
    icon: 'home',
    names: { fi: 'Kotisiivous', sv: 'Hemstädning', en: 'Home cleaning' },
    slugs: { fi: 'kotisiivous', sv: 'hemstadning', en: 'home-cleaning' },
    desc: {
      fi: 'Kodin arjen siisteys: keittiö, kylpyhuone, pölypinnat ja lattiat oman siivoussuunnitelman mukaan.',
      sv: 'Ett renare hem i vardagen: kök, badrum, dammtorkning och golv enligt en individuell plan.',
      en: 'Everyday home care for kitchens, bathrooms, surfaces and floors, planned around your home.',
    },
  },
  {
    id: 'saannollinen-kotisiivous',
    category: 'home',
    popular: true,
    icon: 'calendar',
    names: { fi: 'Säännöllinen kotisiivous', sv: 'Regelbunden hemstädning', en: 'Recurring home cleaning' },
    slugs: { fi: 'saannollinen-kotisiivous', sv: 'regelbunden-hemstadning', en: 'recurring-home-cleaning' },
    desc: {
      fi: 'Viikoittainen tai kahden viikon välein tehtävä siivous vähentää arjen kuormitusta ja takaa tasaisen puhtauden.',
      sv: 'Städning varje eller varannan vecka gör vardagen enklare att planera och ger ett rent hem.',
      en: 'Weekly or fortnightly visits help keep your home comfortably maintained without the weekend stress.',
    },
  },
  {
    id: 'kertasiivous',
    category: 'home',
    popular: true,
    icon: 'sparkles',
    names: { fi: 'Kertasiivous', sv: 'Engångsstädning', en: 'One-time cleaning' },
    slugs: { fi: 'kertasiivous', sv: 'engangsstadning', en: 'one-time-cleaning' },
    desc: {
      fi: 'Yksittäinen siivouskerta ennen juhlia, vieraita tai kodin uutta alkua.',
      sv: 'En enstaka städning före fest, gäster eller en ny början hemma.',
      en: 'A one-off clean before guests, a celebration or a seasonal fresh start.',
    },
  },
  {
    id: 'suursiivous',
    category: 'home',
    popular: true,
    icon: 'shield-check',
    names: { fi: 'Suursiivous', sv: 'Storstädning', en: 'Deep cleaning' },
    slugs: { fi: 'suursiivous', sv: 'storstadning', en: 'deep-cleaning' },
    desc: {
      fi: 'Tavallista perusteellisempi siivous vaikeammin puhdistettaville pinnoille, kalusteiden taustoille ja saumoille.',
      sv: 'En grundligare genomgång av ytor och rum som behöver extra omsorg.',
      en: 'A more thorough clean for rooms and surfaces that need extra attention and deep sanitization.',
    },
  },
  {
    id: 'muuttosiivous',
    category: 'home',
    popular: true,
    icon: 'truck',
    names: { fi: 'Muuttosiivous', sv: 'Flyttstädning', en: 'Move-out cleaning' },
    slugs: { fi: 'muuttosiivous', sv: 'flyttstadning', en: 'move-out-cleaning' },
    desc: {
      fi: 'Vanhan tai uuden asunnon loppusiivous kirjallisen tarkistuslistan avulla takuuvarmasti.',
      sv: 'Slutstädning av gamla eller nya bostaden med en tydlig checklista och garanti.',
      en: 'A documented checklist-based clean when moving into or out of a property, ensuring full deposit return.',
    },
  },
  {
    id: 'ikkunanpesu',
    category: 'home',
    popular: true,
    icon: 'sun',
    names: { fi: 'Ikkunanpesu', sv: 'Fönsterputsning', en: 'Window cleaning' },
    slugs: { fi: 'ikkunanpesu', sv: 'fonsterputsning', en: 'window-cleaning' },
    desc: {
      fi: 'Kodin ja toimitilojen ikkunoiden sekä lasipintojen kirkas puhdistus ammattilaisvälineillä.',
      sv: 'Rengöring av fönster och glasytor i hem och på arbetsplatser med proffsverktyg.',
      en: 'Crystal clear window and glass cleaning for homes and workplaces using professional tools.',
    },
  },
  {
    id: 'kylpyhuoneen-siivous',
    category: 'home',
    icon: 'droplet',
    names: { fi: 'Kylpyhuoneen siivous', sv: 'Badrumsstädning', en: 'Bathroom cleaning' },
    slugs: { fi: 'kylpyhuoneen-siivous', sv: 'badrumsstadning', en: 'bathroom-cleaning' },
    desc: {
      fi: 'Laatat, kalusteet, suihkutilat ja kosketuspinnat puhtaiksi huolellisella kalkinpoistolla.',
      sv: 'Noggrann rengöring av kakel, inredning, dusch och kontaktytor med kalkborttagning.',
      en: 'Careful descaling and deep cleaning of tiles, fixtures, showers and high-touch surfaces.',
    },
  },
  {
    id: 'keittion-siivous',
    category: 'home',
    icon: 'utensils',
    names: { fi: 'Keittiön siivous', sv: 'Köksstädning', en: 'Kitchen cleaning' },
    slugs: { fi: 'keittion-siivous', sv: 'koksstadning', en: 'kitchen-cleaning' },
    desc: {
      fi: 'Ruoanlaittopinnat, kaapinovet, liesi ja lattiat puhtaiksi rasvanpoistolla.',
      sv: 'Rena arbetsytor, luckor, spis och golv med effektiv fettlösning.',
      en: 'Clean worktops, cabinet fronts, stovetops and floors degreased and sanitized within agreed scope.',
    },
  },
  {
    id: 'sohvan-puhdistus',
    category: 'home',
    popular: true,
    icon: 'sofa',
    names: { fi: 'Sohvan puhdistus', sv: 'Soffrengöring', en: 'Sofa cleaning' },
    slugs: { fi: 'sohvan-puhdistus', sv: 'soffrengoring', en: 'sofa-cleaning' },
    desc: {
      fi: 'Tekstiilipintojen syvähoito ja tahranpoisto materiaalin mukaan tekstiilipesurilla.',
      sv: 'Omsorg om textilier enligt material och skick, med maskinell fläckborttagning vid behov.',
      en: 'Deep upholstery care and stain removal suited to fabric type and condition.',
    },
  },
  {
    id: 'matonpesu',
    category: 'home',
    popular: true,
    icon: 'layers',
    names: { fi: 'Matonpesu', sv: 'Mattvätt', en: 'Carpet cleaning' },
    slugs: { fi: 'matonpesu', sv: 'mattvatt', en: 'carpet-cleaning' },
    desc: {
      fi: 'Mattojen ja kokolattiamattojen puhdistustarpeen arviointi materiaalikohtaisesti paikan päällä.',
      sv: 'Bedömning av rengöring för mattor och heltäckningsmattor efter material.',
      en: 'Material-appropriate care for rugs and fitted carpets following an assessment.',
    },
  },
  {
    id: 'saunan-pesu',
    category: 'home',
    icon: 'flame',
    names: { fi: 'Saunan pesu', sv: 'Basturengöring', en: 'Sauna cleaning' },
    slugs: { fi: 'saunan-pesu', sv: 'basturengoring', en: 'sauna-cleaning' },
    desc: {
      fi: 'Saunan lauteiden, lattioiden ja pesutilojen desinfioiva puhdistus puupintoja varjellen.',
      sv: 'Rengöring av bastulavar, golv och tvättrum med hänsyn till trämaterial.',
      en: 'Gentle wood-safe disinfection and deep cleaning for sauna benches, floors and washrooms.',
    },
  },
  {
    id: 'remonttisiivous',
    category: 'home',
    icon: 'hammer',
    names: { fi: 'Remonttisiivous', sv: 'Renoveringsstädning', en: 'Post-renovation cleaning' },
    slugs: { fi: 'remonttisiivous', sv: 'renoveringsstadning', en: 'post-renovation-cleaning' },
    desc: {
      fi: 'Remontin jälkeisen hienojakoisen pölyn ja irtolian poisto HEPA-suodatetulla kalustolla.',
      sv: 'Städning av byggdamm och löst smuts efter renovering med HEPA-filter.',
      en: 'Removal of post-renovation fine dust and debris with professional HEPA equipment.',
    },
  },
  {
    id: 'airbnb-siivous',
    category: 'home',
    icon: 'key',
    names: { fi: 'Airbnb-siivous', sv: 'Städning för korttidsuthyrning', en: 'Short-term rental cleaning' },
    slugs: { fi: 'airbnb-siivous', sv: 'stadning-korttidsuthyrning', en: 'short-term-rental-cleaning' },
    desc: {
      fi: 'Majoituskohteen nopea vaihtosiivous, liinavaatteiden vaihto ja raportointi vieraiden välillä.',
      sv: 'Bytesstädning mellan gäster, linnebyte och tillsyn med konsekvent checklista.',
      en: 'Quick turnover cleaning between guests, linen changes and property checklist reports.',
    },
  },
  {
    id: 'toimistosiivous',
    category: 'business',
    popular: true,
    icon: 'briefcase',
    names: { fi: 'Toimistosiivous', sv: 'Kontorsstädning', en: 'Office cleaning' },
    slugs: { fi: 'toimistosiivous', sv: 'kontorsstadning', en: 'office-cleaning' },
    desc: {
      fi: 'Työpisteet, neuvotteluhuoneet, keittiöt ja yhteiset tilat puhtaiksi työrytmiä häiritsemättä.',
      sv: 'Rena arbetsplatser, mötesrum och gemensamma ytor enligt företagets arbetstider.',
      en: 'Clean desks, meeting rooms and shared areas scheduled discreetly around your operations.',
    },
  },
  {
    id: 'toimitilasiivous',
    category: 'business',
    icon: 'building',
    names: { fi: 'Toimitilasiivous', sv: 'Lokalstädning', en: 'Commercial premises cleaning' },
    slugs: { fi: 'toimitilasiivous', sv: 'lokalstadning', en: 'commercial-cleaning' },
    desc: {
      fi: 'Työ- ja asiakastilojen säännöllinen ylläpitosiivous yrityksen käyttöasteen ja tarpeiden mukaan.',
      sv: 'Löpande städning av personal- och kundutrymmen enligt verksamhetens behov.',
      en: 'Ongoing cleaning for staff and customer premises based on occupancy and hygiene standards.',
    },
  },
  {
    id: 'porrassiivous',
    category: 'business',
    popular: true,
    icon: 'stairs',
    names: { fi: 'Porrassiivous', sv: 'Trappstädning', en: 'Stairwell cleaning' },
    slugs: { fi: 'porrassiivous', sv: 'trappstadning', en: 'stairwell-cleaning' },
    desc: {
      fi: 'Taloyhtiöiden porraskäytävien, tuulikaappien, hissien ja saunatilojen sopimussiivous.',
      sv: 'Städning av trapphus, entréer och hissar i bostadsbolag på fast avtal.',
      en: 'Scheduled cleaning of apartment-building staircases, entrances, lifts and common facilities.',
    },
  },
  {
    id: 'liiketilasiivous',
    category: 'business',
    icon: 'shopping-bag',
    names: { fi: 'Liiketilasiivous', sv: 'Butiksstädning', en: 'Retail cleaning' },
    slugs: { fi: 'liiketilasiivous', sv: 'butiksstadning', en: 'retail-cleaning' },
    desc: {
      fi: 'Asiakastilojen ja myymälöiden edustava puhtaus ennen avaamista tai sulkemisen jälkeen.',
      sv: 'Rena kundytor och butiker före öppning eller efter stängning.',
      en: 'Spotless retail floor care and fitting room sanitation before opening or after hours.',
    },
  },
  {
    id: 'ravintolasiivous',
    category: 'business',
    icon: 'coffee',
    names: { fi: 'Ravintolasiivous', sv: 'Restaurangstädning', en: 'Restaurant cleaning' },
    slugs: { fi: 'ravintolasiivous', sv: 'restaurangstadning', en: 'restaurant-cleaning' },
    desc: {
      fi: 'Sali- ja henkilökuntatilojen perusteellinen hygienia toiminnan aukioloaikojen ulkopuolella.',
      sv: 'Städning av gäst- och personalutrymmen anpassad till restaurangens öppettider.',
      en: 'Dining room and back-of-house sanitation scheduled around restaurant service shifts.',
    },
  },
  {
    id: 'paivakotisiivous',
    category: 'business',
    icon: 'smile',
    names: { fi: 'Päiväkotisiivous', sv: 'Daghemsstädning', en: 'Daycare cleaning' },
    slugs: { fi: 'paivakotisiivous', sv: 'daghemsstadning', en: 'daycare-cleaning' },
    desc: {
      fi: 'Päiväkodin yhteisten leikkitilojen ja kosketuspintojen siivous tiukkojen hygieniakriteerien mukaan.',
      sv: 'Städning av daghemmets gemensamma ytor enligt överenskomna hygienkrav.',
      en: 'Child-safe, low-chemical sanitation of daycare play areas and high-touch contact points.',
    },
  },
  {
    id: 'kuntosalisiivous',
    category: 'business',
    icon: 'activity',
    names: { fi: 'Kuntosalisiivous', sv: 'Gymstädning', en: 'Gym cleaning' },
    slugs: { fi: 'kuntosalisiivous', sv: 'gymstadning', en: 'gym-cleaning' },
    desc: {
      fi: 'Laitteiden, harjoittelualueiden ja pukuhuoneiden tehokas desinfiointi ja raikkaus.',
      sv: 'Städning av träningsytor, omklädningsrum och kontaktytor efter belastning.',
      en: 'Sanitization of workout zones, exercise equipment and locker rooms for high hygiene.',
    },
  },
  {
    id: 'varastosiivous',
    category: 'business',
    icon: 'box',
    names: { fi: 'Varastosiivous', sv: 'Lagerstädning', en: 'Warehouse cleaning' },
    slugs: { fi: 'varastosiivous', sv: 'lagerstadning', en: 'warehouse-cleaning' },
    desc: {
      fi: 'Varasto-, logistiikka- ja huoltotilojen siisteys työturvallisuusstandardien mukaisesti.',
      sv: 'Rena lager- och serviceutrymmen inom överenskomna arbets- och säkerhetsramar.',
      en: 'Cleaning for storage and utility areas within agreed safety and operational boundaries.',
    },
  },
  {
    id: 'rakennussiivous',
    category: 'business',
    icon: 'hard-hat',
    names: { fi: 'Rakennussiivous', sv: 'Byggstädning', en: 'Construction cleaning' },
    slugs: { fi: 'rakennussiivous', sv: 'byggstadning', en: 'construction-cleaning' },
    desc: {
      fi: 'Rakennustyömaan P1-pölynhallinta ja luovutussiivous tarkastusvalmiuden saavuttamiseksi.',
      sv: 'Slutstädning i byggprojekt med en platsanpassad plan inför överlämning.',
      en: 'Final-stage construction cleaning and P1 dust management before official building handover.',
    },
  },
];

export const COMPETITORS = [
  {
    name: 'Freska',
    rate: '51,90 € / h',
    basisKey: 'weekly',
    url: 'https://www.freska.fi/hinnasto',
    notes: {
      fi: 'Viikoittainen säännöllinen kotisiivous; kertakäynnit ja muut välit eri hinnoilla.',
      sv: 'Regelbunden veckostädning; engångsbesök har annat pris.',
      en: 'Weekly recurring home cleaning; one-off visits have different pricing.',
    },
  },
  {
    name: 'PUHDA',
    rate: '49,00 € / h',
    basisKey: 'puhdaBasis',
    url: 'https://puhda.fi/hinnasto/',
    notes: {
      fi: 'Yhden siivoojan kotisiivous, vähimmäisveloitus 2,5 tuntia.',
      sv: 'En städare, minimidebitering 2,5 timmar.',
      en: 'Single cleaner, 2.5 hour minimum charge applies.',
    },
  },
  {
    name: 'Novah',
    rate: '37,90 € / h',
    basisKey: 'weekly',
    url: 'https://novah.fi/fi/hinnat/helsinki',
    notes: {
      fi: 'Alkaen-hinta säännölliselle siivoukselle Helsingissä omien välineiden ehdoilla.',
      sv: 'Frånpris för regelbunden städning i Helsingfors.',
      en: 'Starting rate for recurring cleaning in Helsinki with client equipment.',
    },
  },
  {
    name: 'Kotileena',
    rate: '51,90 € / h',
    basisKey: 'kotileenaBasis',
    url: 'https://kotileena.fi/hinnasto',
    notes: {
      fi: 'Kotisiivous pääkaupunkiseudulla ma–ke; loppuviikon käynnit eri hinnalla.',
      sv: 'Hemstädning måndag–onsdag i huvudstadsregionen.',
      en: 'Home cleaning Mon–Wed in Helsinki metropolitan area.',
    },
  },
  {
    name: 'SOL',
    rate: 'Pyydä tarjous',
    basisKey: 'solBasis',
    url: 'https://www.sol.fi/palvelut/siivouspalvelut/',
    notes: {
      fi: 'Yritys- ja kohdekohtainen tarjous; ei julkista vertailukelpoista tuntihintaa.',
      sv: 'Individuell offert för företag och fastigheter.',
      en: 'Tailored quotes per business client; no single published standard rate.',
    },
  },
];

export const GUIDES: GuideInfo[] = [
  {
    id: 'muuttosiivouksen-tarkistuslista',
    readTime: '4 min',
    slugs: {
      fi: 'muuttosiivouksen-tarkistuslista',
      sv: 'checklista-for-flyttstadning',
      en: 'move-out-cleaning-checklist',
    },
    titles: {
      fi: 'Muuttosiivouksen kattava tarkistuslista',
      sv: 'Checklista för flyttstädning',
      en: 'Comprehensive move-out cleaning checklist',
    },
    summary: {
      fi: 'Mitä jokaisen muuttajan tulee muistaa ennen avainten luovutusta ja vuokravakuuden palautusta?',
      sv: 'Vad bör du kontrollera före nyckelöverlämningen och depositionens återbetalning?',
      en: 'Essential steps to check before handing over keys and securing your security deposit.',
    },
    points: {
      fi: [
        'Uunin ja liesituulettimen rasvasuodattimen syväpuhdistus.',
        'Jääkaapin ja pakastimen sulatus, pyyhintä ja takaosan imurointi.',
        'Kylpyhuoneen lattiakaivon puhdistus ja saumojen kalkinpoisto.',
        'Ikkunoiden pesu puitteineen ja sälekaihtimien pyyhintä.',
        'Kaikkien kaappien sisä- ja ulkopintojen pyyhintä tyhjänä.',
      ],
      sv: [
        'Djuprengöring av ugn och spisfläktens filter.',
        'Avfrostning och avtorkning av kyl och frys.',
        'Rengöring av golvbrunn och kalkborttagning i badrum.',
        'Fönsterputsning inklusive fönsterkarmar och persienner.',
        'Avtorkning av skåpens in- och utsidor.',
      ],
      en: [
        'Deep degreasing of the oven and cooker hood filter.',
        'Defrosting, wiping and vacuuming behind fridge and freezer.',
        'Bathroom floor drain cleaning and tile grout descaling.',
        'Interior and exterior window washing including blinds.',
        'Wiping inside and outside of all empty cupboards and wardrobes.',
      ],
    },
  },
  {
    id: 'kuinka-usein-kotisiivous',
    readTime: '3 min',
    slugs: {
      fi: 'kuinka-usein-kotisiivous',
      sv: 'hur-ofta-hemstadning',
      en: 'how-often-home-cleaning',
    },
    titles: {
      fi: 'Kuinka usein kotisiivous kannattaa tehdä?',
      sv: 'Hur ofta behövs hemstädning?',
      en: 'How often should a home be cleaned?',
    },
    summary: {
      fi: 'Sopiva siivousväli riippuu asukkaiden määrästä, lemmikeistä ja arjen kiireistä.',
      sv: 'Rätt städintervall beror på antalet boende, husdjur och vardagstempo.',
      en: 'The ideal cleaning interval depends on household size, pets and your daily routine.',
    },
    points: {
      fi: [
        'Viikoittainen siivous: lapsi- ja lemmikkiperheille, joissa pölyä ja likaa kertyy nopeasti.',
        'Joka toinen viikko: suosituin ja kustannustehokkain rytmi pariskunnille ja yksinasuville.',
        'Kerran kuussa: riittää ylläpitoon, kun arjen pikasiivoukset hoidetaan itse.',
        'Kausittainen suursiivous: 2–3 kertaa vuodessa tekstiilien ja kaappien perusteelliseen huoltoon.',
      ],
      sv: [
        'Veckovis städning: perfekt för barn- och husdjursfamiljer.',
        'Varannan vecka: den populäraste och mest prisvärda lösningen.',
        'Månadsvis: bra grund när man sköter vardagsstädningen själv.',
        'Säsongsstorstädning: 2–3 gånger per år för textilier och grundligare ytor.',
      ],
      en: [
        'Weekly cleaning: recommended for families with kids or shedding pets.',
        'Bi-weekly (every 2 weeks): the most cost-effective and popular schedule.',
        'Monthly: excellent foundation when you manage quick day-to-day tidy-ups.',
        'Seasonal deep clean: 2–3 times a year for upholstery, appliances and windows.',
      ],
    },
  },
  {
    id: 'toimistosiivouksen-suunnittelu',
    readTime: '5 min',
    slugs: {
      fi: 'toimistosiivouksen-suunnittelu',
      sv: 'planera-kontorsstadning',
      en: 'planning-office-cleaning',
    },
    titles: {
      fi: 'Toimistosiivouksen suunnittelu ja hygienia',
      sv: 'Planera kontorsstädning',
      en: 'Office cleaning planning & workplace hygiene',
    },
    summary: {
      fi: 'Selkeä siivoussuunnitelma parantaa työviihtyvyyttä ja vähentää sairauspoissaoloja.',
      sv: 'En tydlig städplan ökar trivseln och minskar sjukfrånvaron på arbetsplatsen.',
      en: 'A clear cleaning schedule boosts workplace comfort and reduces sick leave.',
    },
    points: {
      fi: [
        'Kosketuspintojen (ovenkahvat, hissinapit, kahvinkeittimet) päivittäinen desinfiointi.',
        'Neuvotteluhuoneiden ja keittiön säännöllinen jätehuolto ja pintapuhdistus.',
        'Työskentelyaikojen huomioiminen: siivous joko ennen klo 8 tai klo 16 jälkeen.',
        'Laadunvalvonta: säännöllinen katselmus ja yhteyshenkilön suora tavoitettavuus.',
      ],
      sv: [
        'Daglig desinficering av kontaktytor (handtag, knappar, kaffemaskiner).',
        'Regelbunden sophantering och avtorkning i mötesrum och pausrum.',
        'Anpassade tider: städning före kl. 08:00 eller efter kl. 16:00.',
        'Kvalitetsuppföljning och en dedikerad kontaktperson.',
      ],
      en: [
        'Daily sanitization of high-touch surfaces (door handles, coffee stations).',
        'Regular waste management and surface cleaning in conference rooms and pantries.',
        'Operational scheduling: early morning before 8am or evening after 4pm.',
        'Quality checks: periodic inspections and a single designated service manager.',
      ],
    },
  },
  {
    id: 'sohvan-ja-maton-puhdistus',
    readTime: '3 min',
    slugs: {
      fi: 'sohvan-ja-maton-puhdistus',
      sv: 'rengoring-av-soffa-och-matta',
      en: 'sofa-and-carpet-cleaning',
    },
    titles: {
      fi: 'Sohvan ja maton tekstiilipesun muistilista',
      sv: 'Checklista för soffa och matta',
      en: 'Sofa & carpet cleaning guide',
    },
    summary: {
      fi: 'Miten herkkien kangas- ja villamateriaalien tahrat poistetaan ilman kuituvaurioita?',
      sv: 'Hur du avlägsnar fläckar utan att skada känsliga tyger och ull.',
      en: 'How to clean fabrics and wool safely without damaging delicate fibres.',
    },
    points: {
      fi: [
        'Tarkista aina tekstiilin hoitomerkintä (W, S, WS tai X).',
        'Älä koskaan hankaa tuoretta tahraa; taputtele puhtaalla mikrokuituliinalla.',
        'Ammattimainen vesi-imuri poistaa lian syvältä kankaasta ilman liiallista kastumista.',
        'Huolehdi riittävästä tuuletuksesta ja huonelämmöstä kuivumisen aikana (n. 4–8 h).',
      ],
      sv: [
        'Kontrollera alltid skötselmärkningen (W, S, WS eller X).',
        'Gnugga aldrig en färsk fläck; badda med mikrofiberduk.',
        'Professionell textilvårdsmaskin suger upp smuts utan att dränka stoppningen.',
        'Sörj för god ventilation och värme under torktiden (ca 4–8 timmar).',
      ],
      en: [
        'Always verify fabric care codes (W, S, WS, or X).',
        'Never rub fresh spills; gently dab with a clean microfiber towel.',
        'Professional extraction machines remove deep soil without oversaturating foam.',
        'Ensure good ventilation and ambient warmth during drying (approx. 4–8 hours).',
      ],
    },
  },
];

export const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Laura K.',
    city: 'Helsinki (Töölö)',
    service: 'Kotisiivous',
    rating: 5,
    date: '2026-10-24',
    text: {
      fi: 'Aivan loistavaa jälkeä! Koti tuoksuu raikkaalta ja kylpyhuoneen kalkkisaumat tulivat puhtaiksi, mitä emme olleet saaneet itse pestyä.',
      sv: 'Fantastiskt resultat! Hemmet doftar fräscht och badrummet blev skinande rent.',
      en: 'Outstanding quality! The home feels fresh and the bathroom lime scale was completely removed.',
    },
  },
  {
    id: 'rev-2',
    name: 'Mikael B.',
    city: 'Espoo (Tapiola)',
    service: 'Muuttosiivous',
    rating: 5,
    date: '2026-10-18',
    text: {
      fi: 'Muuttosiivous hoitui sovitusti ja vuokraisäntä hyväksyi asunnon luovutuksen heti ilman huomautuksia. Suuri helpotus muuton keskellä.',
      sv: 'Flyttstädningen sköttes punktligt och hyresvärden godkände lägenheten utan anmärkning.',
      en: 'Move-out cleaning was seamless and the landlord approved the inspection immediately with zero remarks.',
    },
  },
  {
    id: 'rev-3',
    name: 'Elina & Antti',
    city: 'Vantaa (Tikkurila)',
    service: 'Säännöllinen kotisiivous',
    rating: 5,
    date: '2026-10-09',
    text: {
      fi: 'Joka toinen viikko käyvä tiimi on luotettava ja ystävällinen. On ihanaa tulla perjantaina puhtaaseen kotiin ilman viikonlopun siivousstressiä.',
      sv: 'Vårt städteam varannan vecka är pålitligt och trevligt. Underbart att komma hem till ett nystädat hem på fredagar.',
      en: 'Our bi-weekly team is punctual, reliable and polite. It is pure bliss coming home on Fridays to a sparkling home.',
    },
  },
  {
    id: 'rev-4',
    name: 'TeknoDesign Oy',
    city: 'Helsinki (Ruoholahti)',
    service: 'Toimistosiivous',
    rating: 5,
    date: '2026-09-30',
    text: {
      fi: '40 hengen toimistomme neukkarit ja keittiö pysyvät aina priimakunnossa. Yhteyshenkilö vastaa nopeasti toiveisiimme.',
      sv: 'Vårt kontor för 40 personer hålls alltid i toppskick. Snabb och smidig kontakt.',
      en: 'Our 40-person office and conference rooms stay in pristine condition. Excellent communication.',
    },
  },
];
