import { Language } from './content';

export interface TranslationDictionary {
  brand: string;
  brandTagline: string;
  region: string;
  common: {
    satisfactionGuarantee: string;
    bookNow: string;
    viewDetails: string;
    requestQuote: string;
    close: string;
    search: string;
    verifiedCustomer: string;
    taxCredit60: string;
    liabilityInsurance: string;
    dedicatedCleaner: string;
  };
  nav: {
    home: string;
    services: string;
    areas: string;
    pricing: string;
    booking: string;
    calculator: string;
    compare: string;
    why: string;
    reviews: string;
    story: string;
    guides: string;
    faq: string;
    about: string;
    contact: string;
    allPages: string;
    requestQuote: string;
    categoryLabel: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaQuote: string;
    ctaServices: string;
    ctaBooking: string;
    pill1: string;
    pill2: string;
    pill3: string;
    card1Title: string;
    card1Text: string;
    card2Title: string;
    card2Text: string;
    bookInArea: string;
    areaGuideBtn: string;
  };
  stats: {
    stat1Number: string;
    stat1Title: string;
    stat1Desc: string;
    stat2Number: string;
    stat2Title: string;
    stat2Desc: string;
    stat3Number: string;
    stat3Title: string;
    stat3Desc: string;
  };
  services: {
    title: string;
    subtitle: string;
    viewAll: string;
    allFilter: string;
    homeFilter: string;
    businessFilter: string;
    searchPlaceholder: string;
    exploreService: string;
    noResults: string;
    bookService: string;
  };
  pricing: {
    title: string;
    subtitle: string;
    demoNotice: string;
    startingFrom: string;
    hour: string;
    visit: string;
    month: string;
    calculateOwn: string;
    models: {
      hourly: { title: string; price: string; desc: string };
      fixed: { title: string; price: string; desc: string };
      monthly: { title: string; price: string; desc: string };
      contract: { title: string; price: string; desc: string };
      oneTime: { title: string; price: string; desc: string };
    };
  };
  pricingPage: {
    badge: string;
    title: string;
    demoNote: string;
    modelEyebrow: string;
    ctaCalculate: string;
    features: {
      hourly: string[];
      fixed: string[];
      monthly: string[];
      contract: string[];
      oneTime: string[];
    };
  };
  servicesPage: {
    badge: string;
    title: string;
    guaranteeBadge: string;
    guaranteeTitle: string;
    guaranteeDesc: string;
    ctaCalculate: string;
    ctaCustomQuote: string;
  };
  areasPage: {
    badge: string;
    title: string;
    subtitle: string;
    cityServicesBtn: string;
    districtsLabel: string;
    localSeoBadge: string;
    localSeoTitle: string;
    localSeoSubtitle: string;
    openAreaBtn: string;
    travelPromiseBadge: string;
    travelPromiseTitle: string;
    travelPromiseDesc: string;
    ctaQuote: string;
    detectedAreaTitle: string;
    exploreAreaGuide: string;
    viewCleanings: string;
  };
  cityDetailPage: {
    badgePrefix: string;
    titleSuffix: string;
    logisticsNotes: Record<
      'helsinki' | 'espoo' | 'vantaa',
      { title: string; text: string }
    >;
    districtsTitle: string;
    districtsSubtitle: string;
    postalPrefix: string;
    localPerksBadge: string;
    localPerksTitle: string;
    perk1: string;
    perk2: string;
    perk3: string;
    quickQuoteTitle: string;
    nameLabel: string;
    phoneLabel: string;
    serviceLabel: string;
    sendBtn: string;
    successTitle: string;
    successMsg: string;
    servicesInCityTitle: string;
    exploreService: string;
    bookBtn: string;
  };
  calculator: {
    badge: string;
    title: string;
    subtitle: string;
    modelLabel: string;
    serviceLabel: string;
    areaLabel: string;
    cityLabel: string;
    extrasLegend: string;
    extras: {
      windows: string;
      oven: string;
      fridge: string;
      sofa: string;
    };
    serviceNames: {
      standard: string;
      deep: string;
      move: string;
      office: string;
      carpet: string;
      sofa: string;
    };
    estimatedHours: string;
    estimatedPrice: string;
    proceedToBooking: string;
    disclaimer: string;
    visitsMonthLabel: string;
    taxCreditTitle: string;
    taxCreditDesc: string;
    noCommitment: string;
    verifiedArea: string;
  };
  booking: {
    badge: string;
    title: string;
    subtitle: string;
    step1: string;
    step2: string;
    step3: string;
    dateLabel: string;
    timeLabel: string;
    noSlotsNotice: string;
    closedSundayNotice: string;
    addressLabel: string;
    postalLabel: string;
    nameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    companyLabel: string;
    notesLabel: string;
    consentLabel: string;
    privacyLink: string;
    backBtn: string;
    nextBtn: string;
    submitBtn: string;
    successTitle: string;
    successMessage: string;
    bookingRefLabel: string;
    serviceOptions: {
      standard: string;
      deep: string;
      move: string;
      office: string;
      carpet: string;
      sofa: string;
    };
    modelOptions: {
      hourly: string;
      fixed: string;
      monthly: string;
      contract: string;
      oneTime: string;
    };
    validation: {
      date: string;
      time: string;
      address: string;
      postal: string;
      name: string;
      contact: string;
      consent: string;
    };
  };
  compare: {
    badge: string;
    title: string;
    subtitle: string;
    thProvider: string;
    thPrice: string;
    thTerms: string;
    thSource: string;
    ourSample: string;
    ourRate: string;
    ourTerms: string;
    disclaimer: string;
    ctaCalculator: string;
  };
  why: {
    badge: string;
    title: string;
    subtitle: string;
    cards: Array<{ num: string; title: string; text: string }>;
  };
  story: {
    badge: string;
    title: string;
    text1: string;
    text2: string;
    missionTitle: string;
    missionText: string;
  };
  about: {
    badge: string;
    title: string;
    h2: string;
    p1: string;
    p2: string;
    ctaBooking: string;
    ctaQuote: string;
    values: Array<{ title: string; desc: string }>;
  };
  contactPage: {
    badge: string;
    title: string;
    h3: string;
    phoneInfoLabel: string;
    emailInfoLabel: string;
    officeLabel: string;
    officeAddress: string;
    hoursLabel: string;
    hoursVal: string;
    coverageTitle: string;
    coverageText: string;
    formTitle: string;
    formSubtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    msgLabel: string;
    msgPlaceholder: string;
    sendBtn: string;
    successTitle: string;
    successMsg: string;
    newMsgBtn: string;
  };
  guides: {
    badge: string;
    title: string;
    subtitle: string;
    guideBadge: string;
    openChecklist: string;
    closeChecklist: string;
    keyPoints: string;
    readArticleBtn: string;
    checklistTitle: string;
    checklistSubtitle: string;
    resetBtn: string;
    completedItems: string;
    intentLabel: string;
    wordsLabel: string;
    readTimeLabel: string;
    verifiedBy: string;
  };
  reviews: {
    badge: string;
    title: string;
    subtitle: string;
    leaveReviewTitle: string;
    namePlaceholder: string;
    ratingLabel: string;
    commentPlaceholder: string;
    consentText: string;
    submitReviewBtn: string;
    reviewSuccessMsg: string;
  };
  faq: {
    badge: string;
    title: string;
    subtitle: string;
    items: Array<{ question: string; answer: string }>;
  };
  quoteForm: {
    title: string;
    subtitle: string;
    customerType: string;
    typeHome: string;
    typeBusiness: string;
    companyName: string;
    serviceSelect: string;
    citySelect: string;
    postcode: string;
    size: string;
    frequency: string;
    freqOnce: string;
    freqWeekly: string;
    freqBiweekly: string;
    freqMonthly: string;
    preferredDate: string;
    contactPref: string;
    prefPhone: string;
    prefEmail: string;
    name: string;
    phone: string;
    email: string;
    message: string;
    consent: string;
    sendBtn: string;
    successMsg: string;
  };
  footer: {
    disclaimer: string;
    rights: string;
    usefulLinks: string;
    serviceAreas: string;
    allPagesBtn: string;
  };
  whatsapp: {
    floatingLabel: string;
    badge: string;
    title: string;
    subtitle: string;
    responseTime: string;
    defaultMessage: string;
    quickHome: string;
    quickHomeMsg: string;
    quickMove: string;
    quickMoveMsg: string;
    quickSlots: string;
    quickSlotsMsg: string;
    startChat: string;
    ariaLabel: string;
  };
  activeLocationBar: {
    noLocationText: string;
    detectBtn: string;
    searchBtn: string;
    justUpdated: string;
    detectedArea: string;
    cleanersAvailable: string;
    travelFree: string;
    changeBtn: string;
  };
  locationSearchModal: {
    title: string;
    subtitle: string;
    placeholder: string;
    detectBtn: string;
    detecting: string;
    detectTitle: string;
    resultsTitle: string;
    popularAreas: string;
    capitalHubs: string;
    closeBtn: string;
  };
  locationBanner: {
    promptTitle: string;
    promptDesc: string;
    localPerkBadge: string;
    allowBtn: string;
    manualBtn: string;
    dismissBtn: string;
    activeBadge: string;
  };
  notFound: {
    errorBadge: string;
    title: string;
    message: string;
    homeBtn: string;
    searchBtn: string;
    popularServices: string;
    popularLocations: string;
    wholeCity: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  fi: {
    brand: 'Siisti360',
    brandTagline: 'Puhtaampi arki alkaa tästä.',
    region: 'Helsinki · Espoo · Vantaa',
    common: {
      satisfactionGuarantee: '100% Tyytyväisyystakuu',
      bookNow: 'Varaa nyt',
      viewDetails: 'Tutustu palveluun',
      requestQuote: 'Pyydä tarjous',
      close: 'Sulje',
      search: 'Hae',
      verifiedCustomer: 'Vahvistettu asiakas',
      taxCredit60: '60% kotitalousvähennys',
      liabilityInsurance: 'Vastuuvakuutus 1M€',
      dedicatedCleaner: 'Oma nimetty siivooja',
    },
    nav: {
      home: 'Etusivu',
      services: 'Siivouspalvelut',
      areas: 'Toimialueet',
      pricing: 'Hinnasto',
      booking: 'Varaa siivous',
      calculator: 'Hintalaskuri',
      compare: 'Hintavertailu',
      why: 'Miksi valita meidät',
      reviews: 'Asiakaskokemukset',
      story: 'Meidän tarinamme',
      guides: 'Oppaat',
      faq: 'Usein kysyttyä',
      about: 'Meistä',
      contact: 'Yhteystiedot',
      allPages: 'Kaikki sivut (333)',
      requestQuote: 'Pyydä tarjous',
      categoryLabel: 'PALVELUT / PÄÄKAUPUNKISEUTU',
    },
    hero: {
      eyebrow: 'KOTI- JA YRITYSSIIVOUS • HELSINKI · ESPOO · VANTAA',
      title: 'Puhtaampi arki alkaa tästä.',
      subtitle:
        'Ammattitaitoiset siivouspalvelut koteihin, toimistoihin ja taloyhtiöille Helsingissä, Espoossa ja Vantaalla. Kerro tarpeesi, niin suunnittelemme sinulle parhaan ratkaisun.',
      ctaQuote: 'Pyydä maksuton tarjous',
      ctaServices: 'Tutustu palveluihin',
      ctaBooking: 'Varaa siivous verkossa',
      pill1: 'Koti & yritys',
      pill2: 'Kerta- & sopimussiivous',
      pill3: 'Helsinki, Espoo & Vantaa',
      card1Title: 'Tarkka palvelukuvaus',
      card1Text: 'Ei piilokuluja. Kirjallinen palvelusisältö ennen työn aloitusta.',
      card2Title: 'Helppo alku',
      card2Text: 'Laske arvio tai lähetä varauspyyntö 2 minuutissa.',
      bookInArea: 'Varaa siivooja: {name}',
      areaGuideBtn: '{name} -aluetiedot',
    },
    stats: {
      stat1Number: '01',
      stat1Title: 'Selkeä tarjouspyyntö',
      stat1Desc: 'Kerro kohteesi ja toiveesi yhdellä helpolla lomakkeella.',
      stat2Number: '02',
      stat2Title: 'Sopiva siivousrytmi',
      stat2Desc: 'Valitse kertakäynti, viikoittainen tai kuukausittainen palvelu.',
      stat3Number: '03',
      stat3Title: 'Paikallinen ammattitaito',
      stat3Desc: 'Tunnemme pääkaupunkiseudun taloyhtiöt, kodit ja toimitilat.',
    },
    services: {
      title: 'Siivouspalvelut tarpeesi mukaan',
      subtitle: 'Kodin arjesta yrityksen toimitiloihin — valitse sopiva palvelu ja pyydä yksilöllinen arvio.',
      viewAll: 'Kaikki palvelut',
      allFilter: 'Kaikki',
      homeFilter: 'Koti',
      businessFilter: 'Yritys',
      searchPlaceholder: 'Hae siivouspalvelua (esim. kotisiivous, ikkunanpesu)...',
      exploreService: 'Tutustu palveluun',
      noResults: 'Palvelua ei löytynyt hakusanalla. Kokeile toista sanaa.',
      bookService: 'Varaa',
    },
    pricing: {
      title: 'Viisi joustavaa hinnoittelumallia',
      subtitle: 'Valitse tuntihinta, kiinteä hinta, kuukausipaketti, sopimussiivous tai kertasiivous.',
      demoNotice: 'ESIMERKKIHINNASTO — Muokattavissa yrityksen tarpeiden mukaan ennen lopullista julkaisua.',
      startingFrom: 'Esimerkkihinta alkaen',
      hour: 'tunti',
      visit: 'käynti',
      month: 'kk',
      calculateOwn: 'Laske oma arvio →',
      models: {
        hourly: { title: 'Tuntiperusteinen', price: '43 € / h', desc: 'Työtunnit ja sovittu siivouksen laajuus, 2h vähimmäisveloitus.' },
        fixed: { title: 'Kiinteä hinta', price: '149 € / käynti', desc: 'Käyntikohtainen paketti, joka sisältää sovitun tuntimäärän (3h).' },
        monthly: { title: 'Kuukausiperusteinen', price: '189 € / kk', desc: 'Kuukausipaketti säännölliselle kotisiivoukselle (sis. 4h).' },
        contract: { title: 'Sopimussiivous', price: '549 € / kk', desc: 'Jatkuva yritys- ja toimitilasiivous, 4 käyntiä kuukaudessa (sis. 12h).' },
        oneTime: { title: 'Kertasiivous', price: '179 € / käynti', desc: 'Yksittäinen perusteellisempi siivouskäynti (sis. 3h).' },
      },
    },
    pricingPage: {
      badge: 'LÄPINÄKYVÄ HINNASTO',
      title: 'Viisi joustavaa hinnoittelumallia — Ei piilokuluja',
      demoNote: 'Hinnat ovat esimerkkejä ja vahvistetaan aina kohteen koon ja toiveiden mukaan.',
      modelEyebrow: 'Malli',
      ctaCalculate: 'Laske tällä mallilla',
      features: {
        hourly: ['Minimiveloitus 2 työtuntia', 'Sisältää perusaineet ja välineet', 'Kotitalousvähennyskelpoinen työn osuus (60%)'],
        fixed: ['Sisältää 3h tehokasta työaikaa', 'Ylimenevät tunnit 39 €/h', 'Sopii täydellisesti perussiivoukseen'],
        monthly: ['Kuukausipaketti säännölliseen arkeen', 'Sisältää 4h kuukausittain', 'Sama tuttu siivooja joka kerta'],
        contract: ['Yrityksille ja toimitiloille', '4 käyntiä kuukaudessa (sis. 12h)', 'Laskutus kuukausittain yritykselle'],
        oneTime: ['Kertaluontoinen tehopuhdistus', 'Sisältää 3h perusteellista työtä', 'Ennen juhlia tai kauden alussa'],
      },
    },
    servicesPage: {
      badge: 'KATTAVA PALVELUVALIKOIMA',
      title: 'Ammattitaitoista puhtautta kotiin ja yrityksille pääkaupunkiseudulla',
      guaranteeBadge: 'LAATUTAKUU & JOUSTAVUUS',
      guaranteeTitle: 'Etkö löytänyt etsimääsi tai tarvitsetko yhdistelmäpalvelua?',
      guaranteeDesc: 'Räätälöimme mielellämme juuri sinun kohteeseesi sopivan siivouskokonaisuuden, kuten muuttosiivouksen yhdistettynä ikkunanpesuun ja tekstiilipesuun.',
      ctaCalculate: 'Laske hinta-arvio',
      ctaCustomQuote: 'Pyydä räätälöity tarjous',
    },
    areasPage: {
      badge: 'TOIMIALUEET • PÄÄKAUPUNKISEUTU',
      title: 'Siivouspalvelut Helsingissä, Espoossa ja Vantaalla ilman matkakuluja',
      subtitle: 'Toimimme kattavasti koko pääkaupunkiseudulla. Palvelemme niin kantakaupungin arvokiinteistöjä, lähiöiden lapsiperheitä kuin yrityskeskittymien toimitiloja.',
      cityServicesBtn: 'Katso palvelut kaupungissa {city}',
      districtsLabel: 'Palveltavat kaupunginosat:',
      localSeoBadge: 'Paikalliset SEO-aluesivut ja kaupunginosat',
      localSeoTitle: 'Täsmäpalvelut Helsingin, Espoon ja Vantaan kaupunginosiin',
      localSeoSubtitle: 'Räätälöidyt aluetarjoukset & paikalliset siivoustiimit',
      openAreaBtn: 'Avaa aluesivu',
      travelPromiseBadge: '0 € matkakulut pääkaupunkiseudun alueella',
      travelPromiseTitle: 'Selkeä ja reilu hinnoittelu ilman yllättäviä siirtymälisiä',
      travelPromiseDesc: 'Siisti360 ei veloita erillisiä kilometrikuluja tai matkakorvauksia Helsingin, Espoon ja Vantaan alueella tehtävistä säännöllisistä tai kertasiivouksista.',
      ctaQuote: 'Pyydä tarjous alueellesi',
      detectedAreaTitle: 'Tunnistettu oma alueesi',
      exploreAreaGuide: 'Tutustu alueeseen {name}',
      viewCleanings: 'Katso siivoukset',
    },
    cityDetailPage: {
      badgePrefix: 'PAIKALLINEN SIIVOUSPALVELU • ',
      titleSuffix: '— Koteihin ja yrityksille',
      logisticsNotes: {
        helsinki: {
          title: '📍 Kantakaupungin pysäköinti- ja avainpalvelu (Helsinki)',
          text: 'Tiimillämme on pysäköintiluvat kantakaupungin asukaspysäköintialueille (vyöhykkeet 1 ja 2). Voimme sopia avainten noudosta toimistoltamme tai asuntosi avainsäilöstä ilman lisäveloitusta.',
        },
        espoo: {
          title: '📍 Pientalojen ja yrityspuistojen erikoisosaaminen (Espoo)',
          text: 'Palvelemme kattavasti Tapiolan, Leppävaaran ja Saunalahden omakoti- ja rivitaloja sekä Keilaniemen ja Otaniemen innovaatiotoimistoja. Omat siivousvälineet ja vesi-imurit mukana jokaisessa kohteessa.',
        },
        vantaa: {
          title: '📍 Logistiikkaväylien ja asuinalueiden suora palvelu (Vantaa)',
          text: 'Tikkurilan, Myyrmäen ja Aviapoliksen kohteisiin saavumme täsmällisesti Kehäradan ja Kehä III:n tuntumaan. Tarjoamme joustavat aamu- ja iltasiivousvuorot ilman ruuhkalisämaksuja.',
        },
      },
      districtsTitle: 'Kaupunginosat ja aluesivut kaupungissa {cityName}:',
      districtsSubtitle: 'Valitse kaupunginosa tarkempaan hintaan & paikallistietoihin',
      postalPrefix: 'Postinumero:',
      localPerksBadge: 'PAIKALLISET EDUT',
      localPerksTitle: 'Miksi {cityName} luottaa Siisti360:een?',
      perk1: '0 € matkakulut alueella {cityName}',
      perk2: 'Nopeat vapaat ajat (ma–la)',
      perk3: 'Kotitalousvähennys 60%',
      quickQuoteTitle: 'Pyydä nopea tarjous kohteellesi ({cityName}):',
      nameLabel: 'Nimi:',
      phoneLabel: 'Puhelinnumero:',
      serviceLabel: 'Palvelu:',
      sendBtn: 'Lähetä yhteydenottopyyntö',
      successTitle: 'Tarjouspyyntö vastaanotettu!',
      successMsg: 'Otamme yhteyttä numeroon {phone} mahdollisimman pian.',
      servicesInCityTitle: 'Siivouspalvelut kaupungissa {cityName}:',
      exploreService: 'Tutustu palveluun',
      bookBtn: 'Varaa',
    },
    calculator: {
      badge: 'INTERAKTIIVINEN HINTALASKURI',
      title: 'Laske oma suuntaa-antava hinta-arvio',
      subtitle: 'Valitse hinnoittelumalli, siivoustyyppi, asunnon pinta-ala ja haluamasi lisäpalvelut.',
      modelLabel: 'Hinnoittelumalli',
      serviceLabel: 'Siivoustyyppi',
      areaLabel: 'Pinta-ala (m²)',
      cityLabel: 'Kaupunki',
      extrasLegend: 'Valinnaiset lisäpalvelut',
      extras: {
        windows: 'Ikkunanpesu (+29 €)',
        oven: 'Uunin syväpuhdistus (+24 €)',
        fridge: 'Jääkaapin puhdistus (+19 €)',
        sofa: 'Sohvan tekstiilipesu (+39 €)',
      },
      serviceNames: {
        standard: 'Kotisiivous (Standard)',
        deep: 'Suursiivous (Deep clean)',
        move: 'Muuttosiivous (Move-out)',
        office: 'Toimistosiivous (Office)',
        carpet: 'Matonpesu (Carpet)',
        sofa: 'Sohvan tekstiilipesu (Sofa)',
      },
      estimatedHours: 'Arvioitu työaika',
      estimatedPrice: 'Hinta-arvio (alustava)',
      proceedToBooking: 'Siirry varauspyyntöön näillä tiedoilla →',
      disclaimer: 'Laskurin hinnat ovat havainnollisia esimerkkejä, eivät sitovia tarjouksia. Lopullinen tarjous vahvistetaan erikseen.',
      visitsMonthLabel: ' (4 käyntiä / kk)',
      taxCreditTitle: 'Kotitalousvähennys (60%):',
      taxCreditDesc: 'Verovähennyksen jälkeen todellinen omavastuuosuutesi on vain {amount}!',
      noCommitment: 'Ei sitoutumista. Varauspyyntö vahvistetaan aina erikseen.',
      verifiedArea: '✓ Vahvistettu toimialue',
    },
    booking: {
      badge: 'ONLINE VARAUSPYYNTÖ',
      title: 'Lähetä siivouksen varauspyyntö',
      subtitle: 'Valitse palvelu, toivottu aloitusaika ja täytä tiedot. Pyyntö ei sido sinua eikä sisällä ennakkomaksua.',
      step1: '1. Palvelu ja hinta',
      step2: '2. Toivottu aika & osoite',
      step3: '3. Yhteystiedot',
      dateLabel: 'Toivottu päivämäärä',
      timeLabel: 'Valitse aloitusaika (ma–la)',
      noSlotsNotice: 'Valitse päivämäärä kalenterista nähdäksesi vapaat ajat.',
      closedSundayNotice: 'Sunnuntaisin suljettu. Valitse arkipäivä tai lauantai.',
      addressLabel: 'Siivouskohteen katuosoite',
      postalLabel: 'Postinumero',
      nameLabel: 'Koko nimi',
      emailLabel: 'Sähköpostiosoite',
      phoneLabel: 'Puhelinnumero',
      companyLabel: 'Yrityksen nimi (jos yritysasiakas)',
      notesLabel: 'Lisäohjeet (lemmikit, avainsopimus, erikoistoiveet)',
      consentLabel: 'Hyväksyn tietojeni käsittelyn yhteydenottoa ja varauspyyntöä varten.',
      privacyLink: 'Tietosuojaseloste',
      backBtn: 'Takaisin',
      nextBtn: 'Jatka seuraavaan vaiheeseen',
      submitBtn: 'Lähetä varauspyyntö',
      successTitle: 'Varauspyyntö vastaanotettu onnistuneesti!',
      successMessage: 'Kiitos yhteydenotostasi! Olemme sinuun yhteydessä vahvistaaksemme tarkan saapumisajan ja yksityiskohdat.',
      bookingRefLabel: 'Varaustunnus',
      serviceOptions: {
        standard: 'Kotisiivous',
        deep: 'Suursiivous',
        move: 'Muuttosiivous',
        office: 'Toimistosiivous',
        carpet: 'Matonpesu',
        sofa: 'Sohvan puhdistus',
      },
      modelOptions: {
        hourly: 'Tuntiperusteinen (43 €/h)',
        fixed: 'Kiinteä hinta (149 €/käynti)',
        monthly: 'Kuukausipaketti (189 €/kk)',
        contract: 'Sopimussiivous (549 €/kk)',
        oneTime: 'Kertasiivous (179 €/käynti)',
      },
      validation: {
        date: 'Valitse toivottu päivämäärä.',
        time: 'Valitse toivottu aloitusaika.',
        address: 'Syötä katuosoite.',
        postal: 'Syötä 5-numeroinen postinumero.',
        name: 'Syötä nimesi.',
        contact: 'Syötä vähintään puhelinnumero tai sähköpostiosoite.',
        consent: 'Hyväksy tietojen käsittely jatkaaksesi.',
      },
    },
    compare: {
      badge: 'MARKKINAVERTAILU 2026',
      title: 'Hintavertailu: Pääkaupunkiseudun siivouspalvelut',
      subtitle: 'Tarkistettu julkisista hinnastoista 6.11.2026. Sisällöt ja vähimmäisajat vaihtelevat yrityksittäin.',
      thProvider: 'Palveluntarjoaja',
      thPrice: 'Julkinen alkaen-hinta',
      thTerms: 'Vertailuperuste',
      thSource: 'Lähde / Verkkosivusto',
      ourSample: 'Siisti360 (esimerkki)',
      ourRate: '43,00 € / h',
      ourTerms: 'Kotisiivous, 2h vähimmäisaika',
      disclaimer: 'Kilpailijoiden hinnat ovat heidän julkisilta verkkosivuiltaan. Muista kotitalousvähennys (jopa 60%), joka pienentää työn osuutta merkittävästi.',
      ctaCalculator: 'Kokeile hintalaskuria',
    },
    why: {
      badge: 'LAATUTAKUU & LUPAUS',
      title: 'Miksi valita Siisti360?',
      subtitle: 'Panostamme puhtauden laatuun, luotettaviin tekijöihin ja selkeään palveluun ilman yllätyksiä.',
      cards: [
        { num: '01', title: 'Turvallisuutta painottavat tuotteet', text: 'Käytämme laadukkaita, matala-allergisoivia ammattisiivousaineita, jotka ovat turvallisia lemmikeille ja lapsille.' },
        { num: '02', title: 'Budjettiisi sopivat mallit', text: 'Viisi selkeää hinnoitteluvaihtoehtoa kertasiivouksista jatkuviin yrityssopimuksiin ilman piilokuluja.' },
        { num: '03', title: 'Paikallinen pääkaupunkiseudulla', text: 'Palvelemme Helsingin, Espoon ja Vantaan alueilla joustavilla matka-ajoilla ja paikallistuntemuksella.' },
        { num: '04', title: 'Joustava toiveiden huomiointi', text: 'Voit valita sinulle parhaan aloitusajan ja räätälöidä siivouksen tarkistuslistan omien tarpeidesi mukaiseksi.' },
        { num: '05', title: 'Sovitut laatumuistilistat', text: 'Tarkka huonekohtainen työlista takaa, että jokainen sovittu nurkka tulee huolella siivotuksi joka kerta.' },
        { num: '06', title: 'Ei ennakkomaksuja', text: 'Laskutus vasta hyväksytyn siivouksen jälkeen. Voit myös hyödyntää kotitalousvähennyksen verotuksessa.' },
      ],
    },
    story: {
      badge: 'TARINAMME',
      title: 'Puhtaampi arki sai alkunsa yksinkertaisesta ajatuksesta',
      text1:
        'Siisti360 sai alkunsa halusta tuoda pääkaupunkiseudun asukkaille ja yrityksille läpinäkyvää, huoletonta ja korkeatasoista siivouspalvelua. Huomasimme, että monille siivouspalvelujen tilaaminen oli monimutkaista, epäselvää ja usein täynnä piilokuluja.',
      text2:
        'Tavoitteemme on yhdistää moderni digitaalinen helppous ja aito inhimillinen välittäminen. Kun luovutat kotisi tai toimitilasi käsiimme, voit luottaa siihen, että lopputulos on puhdas, turvallinen ja sovitun mukainen.',
      missionTitle: 'Lupauksemme jokaiselle asiakkaalle',
      missionText: 'Selkeät ennakkoon sovitut hinnat, sitoutunut ja koulutettu henkilöstö sekä tyytyväisyystakuu.',
    },
    about: {
      badge: 'TIETOA MEISTÄ • SIISTI360',
      title: 'Puhtauden ammattilaiset pääkaupunkiseudulla — Arvojemme mukaista palvelua',
      h2: 'Tavoitteemme: Helpompi arki ja puhtaat tilat ilman huolta',
      p1: 'Siisti360 syntyi havainnosta, että laadukkaan ja luotettavan siivouspalvelun tilaaminen oli liian usein epävarmaa, hinnoittelultaan epäselvää ja vaikeasti hallittavaa. Päätimme luoda palvelun, jossa moderni digitaalinen helppous yhdistyy aitoon pohjoismaiseen huolellisuuteen ja ammattitaitoon.',
      p2: 'Tänään palvelemme satoja tyytyväisiä kotitalouksia ja kymmeniä yrityksiä Helsingissä, Espoossa ja Vantaalla. Meille jokainen koti ja toimitila on yksilöllinen kohde, jonka luottamusta vaalimme jokaisella käynnillä.',
      ctaBooking: 'Varaa siivous verkossa',
      ctaQuote: 'Pyydä maksuton tarjous',
      values: [
        {
          title: 'Koulutettu ja luotettava henkilöstö',
          desc: 'Kaikki siivoojamme perehdytetään huolellisesti pintamateriaaleihin, ergonomiaan ja turvallisuusmääräyksiin. Taustat tarkistetaan aina.',
        },
        {
          title: 'Täysi vastuuvakuutus',
          desc: 'Toimintamme on kattavasti vakuutettu aina 1 000 000 euroon saakka. Voit luottaa siihen, että kotisi tai toimitilasi on turvallisissa käsissä.',
        },
        {
          title: 'Ympäristövastuulliset aineet',
          desc: 'Käytämme Joutsenmerkittyjä tai EU-Ecolabel -sertifioituja puhdistusaineita. Huolehdimme sisäilman puhtaudesta ilman voimakkaita keinotekoisia hajusteita.',
        },
        {
          title: '100% Tyytyväisyystakuu',
          desc: 'Mikäli et ole täysin tyytyväinen siivousjälkeen, korjaamme asian viipymättä veloituksetta 24 tunnin kuluessa ilmoituksesta.',
        },
      ],
    },
    contactPage: {
      badge: 'ASIAKASPALVELU & YHTEYSTIEDOT',
      title: 'Ota yhteyttä Siisti360-asiakaspalveluun — Vastaamme nopeasti',
      h3: 'Yhteystiedot',
      phoneInfoLabel: 'Puhelinpalvelu (ma–la):',
      emailInfoLabel: 'Sähköposti:',
      officeLabel: 'Toimisto (sovi tapaaminen etukäteen):',
      officeAddress: 'Aleksanterinkatu 15, 00100 Helsinki',
      hoursLabel: 'Aukioloajat:',
      hoursVal: 'Ma–Pe 07:00–19:00 · La 09:00–17:00',
      coverageTitle: 'Palvelualueen kattavuus:',
      coverageText: 'Helsinki, Espoo, Vantaa ja Kauniainen. Matkakulut 0 € koko pääkaupunkiseudulla.',
      formTitle: 'Lähetä meille viesti',
      formSubtitle: 'Kysy siivouspalveluista, aikatauluista tai pyydä neuvoa kohteeseesi.',
      nameLabel: 'Nimesi *',
      namePlaceholder: 'Matti Meikäläinen',
      emailLabel: 'Sähköpostiosoite *',
      emailPlaceholder: 'matti@example.fi',
      phoneLabel: 'Puhelinnumero (valinnainen)',
      phonePlaceholder: '+358 40 123 4567',
      msgLabel: 'Viesti *',
      msgPlaceholder: 'Kirjoita viestisi tähän...',
      sendBtn: 'Lähetä viesti',
      successTitle: 'Viestisi on lähetetty!',
      successMsg: 'Kiitos yhteydenotostasi! Vastaamme viestiisi mahdollisimman pian, yleensä 2 tunnin kuluessa.',
      newMsgBtn: 'Lähetä uusi viesti',
    },
    guides: {
      badge: 'VINKIT & OPPAAT',
      title: 'Siivousoppaat ja käytännön vinkit',
      subtitle: 'Hyödyllistä tietoa kodin ylläpidosta, muutoista, tekstiilien hoidosta ja toimitilojen puhtaudesta.',
      guideBadge: 'Opas',
      openChecklist: 'Lue tärkeimmät muistisäännöt',
      closeChecklist: 'Sulje ohjeet',
      keyPoints: 'Pääkohdat:',
      readArticleBtn: 'Avaa koko asiantuntija-artikkeli & interaktiivinen lista',
      checklistTitle: 'Interaktiivinen tarkistuslista',
      checklistSubtitle: 'Merkitse valmiiksi sitä mukaa kun siivoat:',
      resetBtn: 'Nollaa lista',
      completedItems: 'Valmiina',
      intentLabel: 'Hakuaie: Informatiivinen',
      wordsLabel: 'sanaa',
      readTimeLabel: 'lukuajan arvio',
      verifiedBy: 'Tarkistanut Siisti360 asiantuntijatiimi',
    },
    reviews: {
      badge: 'ASIAKASKOKEMUKSET',
      title: 'Mitä asiakkaamme sanovat?',
      subtitle: 'Aitoja kokemuksia kotitalouksilta ja yrityksiltä Helsingissä, Espoossa ja Vantaalla.',
      leaveReviewTitle: 'Jätä oma asiakaspalautteesi',
      namePlaceholder: 'Nimesi tai nimimerkki (esim. Matti H., Espoo)',
      ratingLabel: 'Arvosana (1–5 tähteä)',
      commentPlaceholder: 'Kerro kokemuksestasi: työn laatu, aikataulu, palvelualttius...',
      consentText: 'Sallin palautteeni julkaisun valitulla nimellä moderoinnin jälkeen.',
      submitReviewBtn: 'Lähetä palaute',
      reviewSuccessMsg: 'Kiitos palautteestasi! Se on vastaanotettu ja julkaistaan sivustolla.',
    },
    faq: {
      badge: 'USEIN KYSYTYT KYSYMYKSET',
      title: 'Usein kysyttyä siivouspalveluista',
      subtitle: 'Löydä vastaukset yleisimpiin kysymyksiin kotisiivouksesta, välineistä ja hinnoittelusta.',
      items: [
        { question: 'Mitä tietoja tarjouspyyntöön tarvitaan?', answer: 'Palvelun tyyppi, kaupunki, asunnon tai toimitilan arvioitu pinta-ala (m²), toivottu ajankohta ja yhteystietosi riittävät alustavan tarjouksen antamiseen.' },
        { question: 'Tuoko Siisti360 omat siivousvälineet ja -aineet?', answer: 'Kyllä, tiimimme tuo mukanaan ammattikäyttöön tarkoitetut siivousvälineet, mikrokuituliinat ja ekologiset puhdistusaineet. Asiakkaalta toivomme vain toimivan imurin ja mopin erikoistoiveiden varalta.' },
        { question: 'Miten kotitalousvähennys toimii?', answer: 'Kotisiivous kuuluu kotitalousvähennyksen piiriin. Voit vähentää työn osuudesta jopa 60% henkilökohtaisessa verotuksessasi, jolloin todellinen kustannus jää huomattavasti pienemmäksi.' },
        { question: 'Onko varauspyyntö tai tarjouspyyntö sitova?', answer: 'Ei. Lähetetty pyyntö on maksuton eikä sido sinua mihinkään. Vahvistamme työn sisällön ja ajankohdan kanssasi aina henkilökohtaisesti ennen tilauksen lukitsemista.' },
        { question: 'Voinko peruuttaa tai siirtää sovittua siivousaikaa?', answer: 'Kyllä, siivousajan voi siirtää veloituksetta ilmoittamalla siitä vähintään 24 tuntia ennen sovittua ajankohtaa.' },
      ],
    },
    quoteForm: {
      title: 'Pyydä maksuton tarjous',
      subtitle: 'Täytä lomake, niin lähetämme sinulle kohteen koon ja toiveidesi mukaan räätälöidyn tarjouksen.',
      customerType: 'Asiakastyyppi',
      typeHome: 'Kotitalous (Koti)',
      typeBusiness: 'Yritys tai taloyhtiö',
      companyName: 'Yrityksen nimi',
      serviceSelect: 'Valitse siivouspalvelu',
      citySelect: 'Kaupunki',
      postcode: 'Postinumero',
      size: 'Pinta-ala (m²)',
      frequency: 'Siivousväli',
      freqOnce: 'Kertaluontoinen siivous',
      freqWeekly: 'Viikoittainen siivous',
      freqBiweekly: 'Joka toinen viikko',
      freqMonthly: 'Kerran kuukaudessa',
      preferredDate: 'Toivottu aloitusaika',
      contactPref: 'Miten haluat vastauksen?',
      prefPhone: 'Puhelimitse',
      prefEmail: 'Sähköpostitse',
      name: 'Nimi',
      phone: 'Puhelinnumero',
      email: 'Sähköposti',
      message: 'Erityistoiveet tai kohteen lisätiedot',
      consent: 'Hyväksyn tietojen käsittelyn tarjouksen laatimista varten.',
      sendBtn: 'Lähetä tarjouspyyntö',
      successMsg: 'Kiitos! Tarjouspyyntö vastaanotettiin. Otamme sinuun pian yhteyttä.',
    },
    footer: {
      disclaimer: 'Siisti360 — Pääkaupunkiseudun moderni ja luotettava siivouspalvelu. Helsinki, Espoo ja Vantaa.',
      rights: 'Kaikki oikeudet pidätetään.',
      usefulLinks: 'Hyödylliset linkit',
      serviceAreas: 'Toimialueet',
      allPagesBtn: 'Selaa kaikkia 333 sivua',
    },
    whatsapp: {
      floatingLabel: 'Kysy WhatsAppissa',
      badge: 'Vastaamme nopeasti',
      title: 'Asiakaspalvelu WhatsAppissa',
      subtitle: 'Vastaamme tavallisesti muutamassa minuutissa ma–su klo 08–20.',
      responseTime: 'Paikalla nyt · Vastausaika alle 15 min',
      defaultMessage: 'Hei Siisti360! Haluaisin kysyä vapaista siivousajoista ja saada nopean hinta-arvion kohteelleni.',
      quickHome: 'Kotisiivouskysely',
      quickHomeMsg: 'Hei Siisti360! Haluaisin kysyä säännöllisestä kotisiivouksesta ja vapaista ajoista.',
      quickMove: 'Muuttosiivous / Tarjous',
      quickMoveMsg: 'Hei! Tarvitsisin nopean hinta-arvion ja vapaat ajat muuttosiivoukselle.',
      quickSlots: 'Vapaat ajat tälle viikolle',
      quickSlotsMsg: 'Hei! Löytyykö teiltä vapaita siivousaikoja tälle tai ensi viikolle?',
      startChat: 'Avaa WhatsApp-keskustelu',
      ariaLabel: 'Ota yhteyttä WhatsAppissa',
    },
    activeLocationBar: {
      noLocationText: 'Ei valittua asuinaluetta. Salli sijainti tai hae postinumerolla nähdäksesi paikalliset hinnat ja edut.',
      detectBtn: 'Tunnista sijainti',
      searchBtn: 'Hae',
      justUpdated: 'Päivitetty juuri nyt',
      detectedArea: 'Tunnistettu alue',
      cleanersAvailable: 'Siivoojia vapaana 24–48h',
      travelFree: '0 € matkakulut',
      changeBtn: 'Muuta aluetta',
    },
    locationSearchModal: {
      title: 'Hae ja valitse asuinalueesi',
      subtitle: 'Kirjoita postinumero tai kaupunginosan nimi. Voit myös käyttää automaattista paikannusta.',
      placeholder: 'Hae postinumerolla (esim. 00180) tai nimellä (Kamppi, Tapiola)...',
      detectBtn: 'Tunnista automaattisesti',
      detecting: 'Tunnistetaan...',
      detectTitle: 'Automaattinen paikannus',
      resultsTitle: 'Hakutulokset',
      popularAreas: 'Suositut kaupunginosat',
      capitalHubs: 'Pääkaupungit',
      closeBtn: 'Sulje',
    },
    locationBanner: {
      promptTitle: 'Haluatko siivoustiedot ja hinnat omalle asuinalueellesi?',
      promptDesc: 'Salli sijaintisi, niin näet suoraan lähimmät vapaat siivooja-ajat, tarkan hinnoittelun ja kaupunginosasi erikoisalennukset kaikilla sivuilla.',
      localPerkBadge: 'Paikallinen etu',
      allowBtn: 'Salli ja tunnista sijainti',
      manualBtn: 'Valitse käsin',
      dismissBtn: 'Sulje ilmoitus',
      activeBadge: 'Aktiivinen',
    },
    notFound: {
      errorBadge: 'HTTP 404 VIRHE',
      title: '404 — Sivua ei löytynyt',
      message: 'Valitettavasti pyytämääsi sivua ei löytynyt tai osoiterakenne on muuttunut.',
      homeBtn: 'Palaa etusivulle',
      searchBtn: 'Hae postinumerolla tai alueella',
      popularServices: 'Suositut siivouspalvelut',
      popularLocations: 'Toimialueet pääkaupunkiseudulla',
      wholeCity: 'Koko kaupunki',
    },
  },
  sv: {
    brand: 'Siisti360',
    brandTagline: 'En renare vardag börjar här.',
    region: 'Helsingfors · Esbo · Vanda',
    common: {
      satisfactionGuarantee: '100% Nöjd-kund-garanti',
      bookNow: 'Boka nu',
      viewDetails: 'Läs mer',
      requestQuote: 'Begär offert',
      close: 'Stäng',
      search: 'Sök',
      verifiedCustomer: 'Verifierad kund',
      taxCredit60: '60% hushållsavdrag',
      liabilityInsurance: 'Ansvarsförsäkring 1M€',
      dedicatedCleaner: 'Egen namngiven städare',
    },
    nav: {
      home: 'Startsida',
      services: 'Städtjänster',
      areas: 'Serviceområden',
      pricing: 'Prislista',
      booking: 'Boka städning',
      calculator: 'Priskalkylator',
      compare: 'Prisjämförelse',
      why: 'Varför välja oss',
      reviews: 'Kundomdömen',
      story: 'Vår berättelse',
      guides: 'Guider',
      faq: 'Frågor och svar',
      about: 'Om oss',
      contact: 'Kontakt',
      allPages: 'Alla sidor (333)',
      requestQuote: 'Begär offert',
      categoryLabel: 'TJÄNSTER / HUVUDSTADSREGIONEN',
    },
    hero: {
      eyebrow: 'HEM- OCH FÖRETAGSSTÄDNING • HELSINGFORS · ESBO · VANDA',
      title: 'En renare vardag börjar här.',
      subtitle:
        'Professionella städtjänster för hem, kontor och bostadsbolag i Helsingfors, Esbo och Vanda. Beskriv dina behov så skapar vi den perfekta lösningen.',
      ctaQuote: 'Begär kostnadsfri offert',
      ctaServices: 'Se våra tjänster',
      ctaBooking: 'Boka städning online',
      pill1: 'Hem & företag',
      pill2: 'Engångs & avtal',
      pill3: 'Helsingfors, Esbo & Vanda',
      card1Title: 'Tydlig tjänstebeskrivning',
      card1Text: 'Inga dolda kostnader. Skriftligt avtal före arbetets början.',
      card2Title: 'Enkel start',
      card2Text: 'Beräkna ditt pris eller skicka bokningsförfrågan på 2 minuter.',
      bookInArea: 'Boka städare i {name}',
      areaGuideBtn: '{name} områdesguide',
    },
    stats: {
      stat1Number: '01',
      stat1Title: 'Tydlig offertförfrågan',
      stat1Desc: 'Berätta om objektet i ett enkelt och snabbt formulär.',
      stat2Number: '02',
      stat2Title: 'Passande städfrekvens',
      stat2Desc: 'Välj engångsbesök, städning varje eller varannan vecka.',
      stat3Number: '03',
      stat3Title: 'Lokal yrkesskicklighet',
      stat3Desc: 'Vi kan bostäder och kontorsfastigheter i huvudstadsregionen.',
    },
    services: {
      title: 'Städtjänster efter dina behov',
      subtitle: 'Från vardagshem till företagets lokaler — välj lämplig tjänst och be om offert.',
      viewAll: 'Alla tjänster',
      allFilter: 'Alla',
      homeFilter: 'Hem',
      businessFilter: 'Företag',
      searchPlaceholder: 'Sök städtjänst (t.ex. hemstädning, fönsterputs)...',
      exploreService: 'Läs om tjänsten',
      noResults: 'Ingen tjänst hittades. Prova ett annat sökord.',
      bookService: 'Boka',
    },
    pricing: {
      title: 'Fem flexibla prismodeller',
      subtitle: 'Välj timpris, fast pris, månadsplan, avtalsstädning eller engångsstädning.',
      demoNotice: 'EXEMPELPRISLISTA — Kan anpassas fritt efter företagets behov före publicering.',
      startingFrom: 'Exempelpris från',
      hour: 'timme',
      visit: 'besök',
      month: 'mån',
      calculateOwn: 'Beräkna ditt pris →',
      models: {
        hourly: { title: 'Timpris', price: '43 € / h', desc: 'Arbetade timmar och överenskommen omfattning, minst 2h debitering.' },
        fixed: { title: 'Fast pris', price: '149 € / besök', desc: 'Fast paket per besök med avtalat antal timmar (3h).' },
        monthly: { title: 'Månadsplan', price: '189 € / mån', desc: 'Regelbunden månadslösning för hemmet (inkl. 4h).' },
        contract: { title: 'Avtalsstädning', price: '549 € / mån', desc: 'Löpande företagsstädning med 4 besök per månad (inkl. 12h).' },
        oneTime: { title: 'Engångsstädning', price: '179 € / besök', desc: 'Ett enstaka och grundligt städbesök (inkl. 3h).' },
      },
    },
    pricingPage: {
      badge: 'TRANSPARENTA PRISER',
      title: 'Fem flexibla prismodeller — Inga dolda avgifter',
      demoNote: 'Priserna är exempel och bekräftas alltid enligt bostadens storlek och önskemål.',
      modelEyebrow: 'Modell',
      ctaCalculate: 'Beräkna med denna modell',
      features: {
        hourly: ['Minsta debitering 2 arbetstimmar', 'Inkluderar professionella rengöringsmedel', 'Berättigar till 60% hushållsavdrag'],
        fixed: ['Inkluderar 3 timmars effektiv arbetstid', 'Överskjutande timmar 39 €/h', 'Perfekt för grundlig veckostädning'],
        monthly: ['Månadspaket för en bekymmersfri vardag', 'Inkluderar 4 timmar månatligen', 'Samma bekanta städare varje gång'],
        contract: ['För kontor och företagslokaler', '4 besök per månad (totalt 12h)', 'Månadsvis fakturering till företaget'],
        oneTime: ['Grundlig engångsinsats', 'Inkluderar 3 timmars djuprengöring', 'Inför fest eller säsongsstädning'],
      },
    },
    servicesPage: {
      badge: 'OMFATTANDE TJÄNSTEUTBUD',
      title: 'Professionell städning för hem och företag i huvudstadsregionen',
      guaranteeBadge: 'KVALITETSGARANTI & FLEXIBILITET',
      guaranteeTitle: 'Hittade du inte vad du sökte eller behöver du en kombinerad tjänst?',
      guaranteeDesc: 'Vi skräddarsyr gärna en helhetslösning för ditt hem eller kontor, till exempel flyttstädning kombinerat med fönsterputs och textiltvätt.',
      ctaCalculate: 'Beräkna prisuppskattning',
      ctaCustomQuote: 'Begär skräddarsydd offert',
    },
    areasPage: {
      badge: 'SERVICEOMRÅDEN • HUVUDSTADSREGIONEN',
      title: 'Städtjänster i Helsingfors, Esbo och Vanda utan resekostnader',
      subtitle: 'Vi betjänar hela huvudstadsregionen, från historiska innerstadslägenheter till barnfamiljers småhus och företagsparkernas kontor.',
      cityServicesBtn: 'Se städtjänster i {city}',
      districtsLabel: 'Stadsdelar vi betjänar:',
      localSeoBadge: 'Lokala SEO-områdessidor och stadsdelar',
      localSeoTitle: 'Skräddarsydd städning i Helsingfors, Esbo och Vanda',
      localSeoSubtitle: 'Lokala erbjudanden och städteam nära dig',
      openAreaBtn: 'Öppna områdessida',
      travelPromiseBadge: '0 € i resekostnader inom huvudstadsregionen',
      travelPromiseTitle: 'Tydlig prissättning utan oväntade tillägg',
      travelPromiseDesc: 'Siisti360 debiterar inga extra kilometeravgifter eller resekostnader för städuppdrag i Helsingfors, Esbo och Vanda.',
      ctaQuote: 'Begär offert för ditt område',
      detectedAreaTitle: 'Ditt identifierade område',
      exploreAreaGuide: 'Läs guide för {name}',
      viewCleanings: 'Se städtjänster',
    },
    cityDetailPage: {
      badgePrefix: 'LOKAL STÄDTJÄNST • ',
      titleSuffix: '— För hem och företag',
      logisticsNotes: {
        helsinki: {
          title: '📍 Parkering och nyckelservice i innerstaden (Helsingfors)',
          text: 'Vårt team har boendeparkeringstillstånd för zonerna 1 och 2 i Helsingfors. Vi kan smidigt hämta upp nycklar från vårt kontor eller ett överenskommet nyckelskåp utan extra kostnad.',
        },
        espoo: {
          title: '📍 Expertis för småhus och företagsparker (Esbo)',
          text: 'Vi betjänar villor och radhus i Hagalund, Alberga och Bastvik samt teknikföretag i Kägeludden och Otnäs. Komplett städutrustning och våtdammsugare medtages alltid.',
        },
        vantaa: {
          title: '📍 Direkt service längs Ring III och logistikstråk (Vanda)',
          text: 'Vi anländer punktligt till objekt i Dickursby, Myrbacka och Aviapolis. Flexibla morgon- och kvällspass erbjuds utan trängselavgifter.',
        },
      },
      districtsTitle: 'Stadsdelar och områdessidor i {cityName}:',
      districtsSubtitle: 'Välj stadsdel för lokala priser och information',
      postalPrefix: 'Postnummer:',
      localPerksBadge: 'LOKALA FÖRDELAR',
      localPerksTitle: 'Varför litar {cityName} på Siisti360?',
      perk1: '0 € i resekostnader i {cityName}',
      perk2: 'Snabbt lediga städtider (mån–lör)',
      perk3: 'Hushållsavdrag upp till 60%',
      quickQuoteTitle: 'Begär snabb offert i {cityName}:',
      nameLabel: 'Namn:',
      phoneLabel: 'Telefonnummer:',
      serviceLabel: 'Tjänst:',
      sendBtn: 'Skicka kontaktförfrågan',
      successTitle: 'Förfrågan mottagen!',
      successMsg: 'Vi kontaktar dig på numret {phone} inom kort.',
      servicesInCityTitle: 'Städtjänster i {cityName}:',
      exploreService: 'Läs om tjänsten',
      bookBtn: 'Boka',
    },
    calculator: {
      badge: 'INTERAKTIV PRISKALKYLATOR',
      title: 'Beräkna ett preliminärt pris för städningen',
      subtitle: 'Välj prismodell, städtyp, kvadratmeter och eventuella tillägg.',
      modelLabel: 'Prismodell',
      serviceLabel: 'Typ av städning',
      areaLabel: 'Bostadens yta (m²)',
      cityLabel: 'Stad',
      extrasLegend: 'Valbara tilläggstjänster',
      extras: {
        windows: 'Fönsterputs (+29 €)',
        oven: 'Djuprengöring av ugn (+24 €)',
        fridge: 'Rengöring av kylskåp (+19 €)',
        sofa: 'Textiltvätt av soffa (+39 €)',
      },
      serviceNames: {
        standard: 'Hemstädning (Standard)',
        deep: 'Storstädning (Deep clean)',
        move: 'Flyttstädning (Move-out)',
        office: 'Kontorsstädning (Office)',
        carpet: 'Matttvätt (Carpet)',
        sofa: 'Sofftvätt (Sofa)',
      },
      estimatedHours: 'Uppskattad arbetstid',
      estimatedPrice: 'Prisuppskattning (preliminär)',
      proceedToBooking: 'Gå vidare till bokningsförfrågan →',
      disclaimer: 'Priserna är exempel och inte bindande avtal. Det slutliga priset bekräftas i offerten.',
      visitsMonthLabel: ' (4 besök / mån)',
      taxCreditTitle: 'Hushållsavdrag (60%):',
      taxCreditDesc: 'Efter skatteavdraget är din faktiska kostnad endast {amount}!',
      noCommitment: 'Ingen bindningstid. Bokningsförfrågan bekräftas alltid separat.',
      verifiedArea: '✓ Bekräftat serviceområde',
    },
    booking: {
      badge: 'ONLINE BOKNINGSFÖRFRÅGAN',
      title: 'Skicka en bokningsförfrågan för städning',
      subtitle: 'Välj tjänst, önskad tid och fyll i kontaktuppgifter. Ingen förskottsbetalning krävs.',
      step1: '1. Tjänst och pris',
      step2: '2. Önskad tid & adress',
      step3: '3. Kontaktuppgifter',
      dateLabel: 'Önskat datum',
      timeLabel: 'Välj starttid (mån–lör)',
      noSlotsNotice: 'Välj ett datum i kalendern för att visa tillgängliga tider.',
      closedSundayNotice: 'Stängt på söndagar. Välj vardag eller lördag.',
      addressLabel: 'Städadress',
      postalLabel: 'Postnummer',
      nameLabel: 'Fullständigt namn',
      emailLabel: 'E-postadress',
      phoneLabel: 'Telefonnummer',
      companyLabel: 'Företagsnamn (om företagskund)',
      notesLabel: 'Ytterligare önskemål (husdjur, nycklar, portkod)',
      consentLabel: 'Jag samtycker till behandling av mina personuppgifter för bokningsförfrågan.',
      privacyLink: 'Integritetspolicy',
      backBtn: 'Tillbaka',
      nextBtn: 'Gå till nästa steg',
      submitBtn: 'Skicka bokningsförfrågan',
      successTitle: 'Bokningsförfrågan mottagen!',
      successMessage: 'Tack! Vi kontaktar dig snarast för att bekräfta tidpunkten och gå igenom detaljerna.',
      bookingRefLabel: 'Bokningsreferens',
      serviceOptions: {
        standard: 'Hemstädning',
        deep: 'Storstädning',
        move: 'Flyttstädning',
        office: 'Kontorsstädning',
        carpet: 'Matttvätt',
        sofa: 'Sofftvätt',
      },
      modelOptions: {
        hourly: 'Timpris (43 €/h)',
        fixed: 'Fast pris (149 €/besök)',
        monthly: 'Månadspaket (189 €/mån)',
        contract: 'Avtalsstädning (549 €/mån)',
        oneTime: 'Engångsstädning (179 €/besök)',
      },
      validation: {
        date: 'Välj önskat datum.',
        time: 'Välj starttid.',
        address: 'Ange städadress.',
        postal: 'Ange ett 5-siffrigt postnummer.',
        name: 'Ange ditt namn.',
        contact: 'Ange minst telefonnummer eller e-post.',
        consent: 'Godkänn villkoren för att fortsätta.',
      },
    },
    compare: {
      badge: 'MARKNADJÄMFÖRELSE 2026',
      title: 'Prisjämförelse för städtjänster i huvudstadsregionen',
      subtitle: 'Granskad från offentliga prislistor 6.11.2026.',
      thProvider: 'Leverantör',
      thPrice: 'Offentligt frånpris',
      thTerms: 'Villkor',
      thSource: 'Källa / Webbplats',
      ourSample: 'Siisti360 (exempel)',
      ourRate: '43,00 € / h',
      ourTerms: 'Hemstädning, min. 2 timmar',
      disclaimer: 'Konkurrentpriserna är hämtade från deras offentliga webbplatser. Kom ihåg hushållsavdraget (upp till 60%).',
      ctaCalculator: 'Prova priskalkylatorn',
    },
    why: {
      badge: 'KVALITETSGARANTI',
      title: 'Varför välja Siisti360?',
      subtitle: 'Vi satsar på noggrann städning, pålitlig personal och tydliga villkor.',
      cards: [
        { num: '01', title: 'Skonsamma rengöringsmedel', text: 'Vi använder professionella produkter som är säkra för både husdjur och allergiker.' },
        { num: '02', title: 'Prismodeller för alla behov', text: 'Fem transparenta prismodeller från engångsstädningar till löpande företagsavtal.' },
        { num: '03', title: 'Lokal närvaro', text: 'Vi betjänar Helsingfors, Esbo och Vanda med god lokalkännedom och korta restider.' },
        { num: '04', title: 'Anpassad tidsplan', text: 'Välj den starttid som passar dig bäst och anpassa städlistan efter dina behov.' },
        { num: '05', title: 'Klara checklistor', text: 'Våra checklistor säkerställer att varje överenskommen yta städas grundligt varje gång.' },
        { num: '06', title: 'Ingen förskottsbetalning', text: 'Betala mot faktura efter godkänd städning. Utnyttja hushållsavdraget.' },
      ],
    },
    story: {
      badge: 'VÅR HISTORIA',
      title: 'En renare vardag börjar med en enkel idé',
      text1:
        'Siisti360 föddes ur en önskan att erbjuda transparent, bekymmersfri och professionell städning i huvudstadsregionen.',
      text2:
        'Vår vision är att kombinera modern digital smidighet med genuint personligt engagemang och pålitlighet.',
      missionTitle: 'Vårt löfte',
      missionText: 'Klara priser, utbildad personal och full nöjdhetsgaranti.',
    },
    about: {
      badge: 'OM OSS • SIISTI360',
      title: 'Professionella städare i huvudstadsregionen — Tjänster enligt våra kärnvärden',
      h2: 'Vårt mål: En enklare vardag och rena utrymmen utan bekymmer',
      p1: 'Siisti360 grundades utifrån insikten att det ofta var krångligt, otydligt och osäkert att beställa städtjänster. Vi ville skapa en tjänst där modern digital smidighet möter nordisk noggrannhet och pålitlighet.',
      p2: 'Idag hjälper vi hundratals nöjda hushåll och tiotals företag i Helsingfors, Esbo och Vanda. Varje hem och kontor är unikt och vi vårdar ditt förtroende vid varje besök.',
      ctaBooking: 'Boka städning online',
      ctaQuote: 'Begär kostnadsfri offert',
      values: [
        {
          title: 'Utbildad och pålitlig personal',
          desc: 'Alla våra städare genomgår noggrann utbildning i ytmaterial, ergonomi och säkerhet. Bakgrundskontroll utförs alltid.',
        },
        {
          title: 'Full ansvarsförsäkring',
          desc: 'Vår verksamhet är heltäckande försäkrad upp till 1 000 000 euro. Du kan lita på att ditt hem är i trygga händer.',
        },
        {
          title: 'Miljöcertifierade rengöringsmedel',
          desc: 'Vi använder Svanenmärkta och EU-Ecolabel-certifierade städprodukter för en frisk inomhusluft utan starka parfymer.',
        },
        {
          title: '100% Nöjd-kund-garanti',
          desc: 'Om du inte är helt nöjd med resultatet åtgärdar vi det kostnadsfritt inom 24 timmar efter anmälan.',
        },
      ],
    },
    contactPage: {
      badge: 'KUNDSERVICE & KONTAKT',
      title: 'Kontakta Siisti360 kundservice — Vi svarar snabbt',
      h3: 'Kontaktuppgifter',
      phoneInfoLabel: 'Telefontjänst (mån–lör):',
      emailInfoLabel: 'E-post:',
      officeLabel: 'Kontor (boka besök i förväg):',
      officeAddress: 'Alexandersgatan 15, 00100 Helsingfors',
      hoursLabel: 'Öppettider:',
      hoursVal: 'Mån–Fre 07:00–19:00 · Lör 09:00–17:00',
      coverageTitle: 'Verksamhetsområde:',
      coverageText: 'Helsingfors, Esbo, Vanda och Grankulla. Resekostnader 0 € i hela huvudstadsregionen.',
      formTitle: 'Skicka ett meddelande',
      formSubtitle: 'Fråga om våra städtjänster, tidtabeller eller be om råd för ditt objekt.',
      nameLabel: 'Ditt namn *',
      namePlaceholder: 'Anna Andersson',
      emailLabel: 'E-postadress *',
      emailPlaceholder: 'anna@example.fi',
      phoneLabel: 'Telefonnummer (valfritt)',
      phonePlaceholder: '+358 40 123 4567',
      msgLabel: 'Meddelande *',
      msgPlaceholder: 'Skriv ditt meddelande här...',
      sendBtn: 'Skicka meddelande',
      successTitle: 'Ditt meddelande har skickats!',
      successMsg: 'Tack för att du kontaktar oss! Vi återkommer så snart som möjligt, vanligen inom 2 timmar.',
      newMsgBtn: 'Skicka ett nytt meddelande',
    },
    guides: {
      badge: 'GUIDER & TIPS',
      title: 'Städguider och praktiska råd',
      subtitle: 'Nyttig information om hemunderhåll, flyttstädning, textilvård och rena arbetsmiljöer.',
      guideBadge: 'Guide',
      openChecklist: 'Läs de viktigaste punkterna',
      closeChecklist: 'Stäng instruktioner',
      keyPoints: 'Viktiga punkter:',
      readArticleBtn: 'Läs hela expertartikeln & interaktiv checklista',
      checklistTitle: 'Interaktiv checklista',
      checklistSubtitle: 'Bocka av under arbetets gång:',
      resetBtn: 'Återställ lista',
      completedItems: 'Slutförda',
      intentLabel: 'Sökavsikt: Informativ',
      wordsLabel: 'ord',
      readTimeLabel: 'lästid',
      verifiedBy: 'Granskad av Siisti360 expertteam',
    },
    reviews: {
      badge: 'KUNDOMDÖMEN',
      title: 'Vad våra kunder säger',
      subtitle: 'Äkta omdömen från hem och företag i Helsingfors, Esbo och Vanda.',
      leaveReviewTitle: 'Lämna ditt eget omdöme',
      namePlaceholder: 'Ditt namn eller alias (t.ex. Anna L., Esbo)',
      ratingLabel: 'Betyg (1–5 stjärnor)',
      commentPlaceholder: 'Berätta om din upplevelse: kvalitet, punktlighet, service...',
      consentText: 'Jag godkänner att mitt omdöme publiceras med angivet namn.',
      submitReviewBtn: 'Skicka omdöme',
      reviewSuccessMsg: 'Tack för ditt omdöme! Det har tagits emot och publiceras på sidan.',
    },
    faq: {
      badge: 'VANLIGA FRÅGOR',
      title: 'Vanliga frågor om städtjänster',
      subtitle: 'Svar på vanliga frågor om hemstädning, material och prissättning.',
      items: [
        { question: 'Vad behövs för en offert?', answer: 'Tjänst, ort, uppskattad bostadsyta (m²), önskad tidpunkt och kontaktuppgifter.' },
        { question: 'Tar Siisti360 med egna städredskap?', answer: 'Ja, vi tar med professionella trasor, redskap och skonsamma rengöringsmedel.' },
        { question: 'Hur fungerar hushållsavdraget?', answer: 'Du kan dra av upp till 60% av arbetskostnaden i din beskattning i Finland.' },
        { question: 'Är en förfrågan bindande?', answer: 'Nej, förfrågan är helt kostnadsfri och binder dig inte till något köp.' },
        { question: 'Kan jag avboka eller boka om en städtid?', answer: 'Ja, det går att boka om kostnadsfritt senast 24 timmar före besöket.' },
      ],
    },
    quoteForm: {
      title: 'Begär kostnadsfri offert',
      subtitle: 'Fyll i formuläret så skickar vi en skräddarsydd offert anpassad för ditt objekt.',
      customerType: 'Kundtyp',
      typeHome: 'Privatperson (Hem)',
      typeBusiness: 'Företag / Bostadsbolag',
      companyName: 'Företagsnamn',
      serviceSelect: 'Välj städtjänst',
      citySelect: 'Stad',
      postcode: 'Postnummer',
      size: 'Yta (m²)',
      frequency: 'Städfrekvens',
      freqOnce: 'Engångsstädning',
      freqWeekly: 'Varje vecka',
      freqBiweekly: 'Varannan vecka',
      freqMonthly: 'En gång i månaden',
      preferredDate: 'Önskat startdatum',
      contactPref: 'Hur vill du bli kontaktad?',
      prefPhone: 'Telefon',
      prefEmail: 'E-post',
      name: 'Namn',
      phone: 'Telefonnummer',
      email: 'E-post',
      message: 'Önskemål eller information om objektet',
      consent: 'Jag godkänner behandlingen av mina uppgifter för offertförfrågan.',
      sendBtn: 'Skicka offertförfrågan',
      successMsg: 'Tack! Din förfrågan har tagits emot. Vi kontaktar dig inom kort.',
    },
    footer: {
      disclaimer: 'Siisti360 — Professionell och pålitlig städning i huvudstadsregionen. Helsingfors, Esbo och Vanda.',
      rights: 'Alla rättigheter förbehållna.',
      usefulLinks: 'Användbara länkar',
      serviceAreas: 'Serviceområden',
      allPagesBtn: 'Bläddra bland alla 333 sidor',
    },
    whatsapp: {
      floatingLabel: 'Fråga på WhatsApp',
      badge: 'Vi svarar snabbt',
      title: 'Kundservice på WhatsApp',
      subtitle: 'Vi svarar vanligen inom några minuter mån–sön kl 08–20.',
      responseTime: 'Online nu · Svarstid under 15 min',
      defaultMessage: 'Hej Siisti360! Jag vill gärna fråga om lediga städtider och få en snabb prisuppskattning för mitt hem.',
      quickHome: 'Hemstädning',
      quickHomeMsg: 'Hej Siisti360! Jag är intresserad av återkommande hemstädning och lediga tider.',
      quickMove: 'Flyttstädning offert',
      quickMoveMsg: 'Hej! Jag behöver en prisuppskattning och lediga tider för flyttstädning.',
      quickSlots: 'Lediga tider denna vecka',
      quickSlotsMsg: 'Hej! Finns det lediga städtider denna eller nästa vecka?',
      startChat: 'Öppna WhatsApp-chatt',
      ariaLabel: 'Kontakta oss via WhatsApp',
    },
    activeLocationBar: {
      noLocationText: 'Inget område valt. Tillåt plats eller sök postnummer för lokala priser och förmåner.',
      detectBtn: 'Identifiera plats',
      searchBtn: 'Sök',
      justUpdated: 'Uppdaterades nyss',
      detectedArea: 'Identifierat område',
      cleanersAvailable: 'Städare lediga inom 24–48h',
      travelFree: '0 € i resekostnad',
      changeBtn: 'Byt område',
    },
    locationSearchModal: {
      title: 'Sök och välj ditt bostadsområde',
      subtitle: 'Skriv in ditt postnummer eller stadsdel. Du kan även använda automatisk GPS.',
      placeholder: 'Sök med postnummer (t.ex. 00180) eller namn (Drumsö, Hagalund)...',
      detectBtn: 'Identifiera automatiskt',
      detecting: 'Identifierar...',
      detectTitle: 'Automatisk positionsbestämning',
      resultsTitle: 'Sökresultat',
      popularAreas: 'Populära stadsdelar',
      capitalHubs: 'Huvudstäder',
      closeBtn: 'Stäng',
    },
    locationBanner: {
      promptTitle: 'Vill du se städtjänster och priser för ditt område?',
      promptDesc: 'Tillåt platsåtkomst för att se lediga städtider, exakta priser och lokala rabatter på alla sidor.',
      localPerkBadge: 'Lokal förmån',
      allowBtn: 'Tillåt och identifiera',
      manualBtn: 'Välj manuellt',
      dismissBtn: 'Stäng meddelande',
      activeBadge: 'Aktiv',
    },
    notFound: {
      errorBadge: 'HTTP 404 FEL',
      title: '404 — Sidan hittades inte',
      message: 'Sidan du eftersökte kunde inte hittas eller adressstrukturen har ändrats.',
      homeBtn: 'Tillbaka till startsidan',
      searchBtn: 'Sök med postnummer eller område',
      popularServices: 'Populära städtjänster',
      popularLocations: 'Serviceområden i huvudstadsregionen',
      wholeCity: 'Hela staden',
    },
  },
  en: {
    brand: 'Siisti360',
    brandTagline: 'A cleaner everyday starts here.',
    region: 'Helsinki · Espoo · Vantaa',
    common: {
      satisfactionGuarantee: '100% Satisfaction Guarantee',
      bookNow: 'Book now',
      viewDetails: 'View details',
      requestQuote: 'Request quote',
      close: 'Close',
      search: 'Search',
      verifiedCustomer: 'Verified customer',
      taxCredit60: '60% tax deduction',
      liabilityInsurance: 'Liability insurance €1M',
      dedicatedCleaner: 'Dedicated personal cleaner',
    },
    nav: {
      home: 'Home',
      services: 'Services',
      areas: 'Locations',
      pricing: 'Pricing',
      booking: 'Book online',
      calculator: 'Calculator',
      compare: 'Price comparison',
      why: 'Why choose us',
      reviews: 'Testimonials',
      story: 'Our story',
      guides: 'Guides',
      faq: 'FAQ',
      about: 'About',
      contact: 'Contact',
      allPages: 'All Pages (333)',
      requestQuote: 'Get a quote',
      categoryLabel: 'CLEANING / HELSINKI METRO AREA',
    },
    hero: {
      eyebrow: 'HOME & BUSINESS CLEANING • HELSINKI · ESPOO · VANTAA',
      title: 'A cleaner everyday starts here.',
      subtitle:
        'Professional cleaning services for homes, offices and housing companies in Helsinki, Espoo and Vantaa. Tell us your needs and we will tailor the optimal cleaning plan.',
      ctaQuote: 'Request a free quote',
      ctaServices: 'Explore services',
      ctaBooking: 'Book cleaning online',
      pill1: 'Homes & businesses',
      pill2: 'One-off & recurring',
      pill3: 'Helsinki, Espoo & Vantaa',
      card1Title: 'Clear service scope',
      card1Text: 'Zero hidden fees. Documented cleaning scope agreed before we begin.',
      card2Title: 'Easy start',
      card2Text: 'Calculate an instant estimate or submit a request in 2 minutes.',
      bookInArea: 'Book cleaner in {name}',
      areaGuideBtn: '{name} Area Guide',
    },
    stats: {
      stat1Number: '01',
      stat1Title: 'Straightforward request',
      stat1Desc: 'Tell us about your property in one smooth online form.',
      stat2Number: '02',
      stat2Title: 'Flexible schedules',
      stat2Desc: 'Choose single visits, weekly or fortnightly recurring cleaning.',
      stat3Number: '03',
      stat3Title: 'Local expertise',
      stat3Desc: 'Serving properties across Helsinki, Espoo and Vantaa with local care.',
    },
    services: {
      title: 'Cleaning services for every need',
      subtitle: 'From residential homes to commercial facilities — choose a service and receive a tailored plan.',
      viewAll: 'All services',
      allFilter: 'All',
      homeFilter: 'Home',
      businessFilter: 'Business',
      searchPlaceholder: 'Search cleaning service (e.g. home cleaning, windows)...',
      exploreService: 'Explore service',
      noResults: 'No services found matching your query.',
      bookService: 'Book',
    },
    pricing: {
      title: 'Five flexible cleaning price models',
      subtitle: 'Choose hourly rate, fixed visit package, monthly plan, contract or one-time clean.',
      demoNotice: 'DEMO PRICING — Flexible rates tailored to business needs prior to public rollout.',
      startingFrom: 'Sample price starting at',
      hour: 'hour',
      visit: 'visit',
      month: 'mo',
      calculateOwn: 'Calculate your estimate →',
      models: {
        hourly: { title: 'Hourly based', price: '43 € / h', desc: 'Pay for hours worked within agreed scope, 2h minimum.' },
        fixed: { title: 'Fixed package', price: '149 € / visit', desc: 'Predictable per-visit package with 3 hours included.' },
        monthly: { title: 'Monthly recurring', price: '189 € / mo', desc: 'Popular recurring home cleaning plan with 4 hours included.' },
        contract: { title: 'Contract commercial', price: '549 € / mo', desc: 'Ongoing commercial cleaning with 4 monthly visits (12h included).' },
        oneTime: { title: 'One-time clean', price: '179 € / visit', desc: 'Comprehensive one-off deep cleaning visit (3h included).' },
      },
    },
    pricingPage: {
      badge: 'TRANSPARENT PRICING',
      title: 'Five flexible pricing plans — Zero hidden fees',
      demoNote: 'Prices are illustrative estimates and confirmed individually according to property specifications.',
      modelEyebrow: 'Model',
      ctaCalculate: 'Calculate with this plan',
      features: {
        hourly: ['2-hour minimum billing', 'Includes standard supplies and microfiber tools', 'Eligible for 60% Finnish tax deduction'],
        fixed: ['Includes 3 hours of efficient labor', 'Additional hours at €39/h', 'Ideal for thorough routine maintenance'],
        monthly: ['Convenient monthly recurring routine', 'Includes 4 hours per month', 'Same trusted, vetted cleaner each visit'],
        contract: ['For corporate offices and workspaces', '4 monthly visits (12h included)', 'Direct monthly invoicing to company'],
        oneTime: ['One-off intensive sanitization', 'Includes 3 hours of deep cleaning', 'Perfect before guests, parties, or seasons'],
      },
    },
    servicesPage: {
      badge: 'COMPREHENSIVE SERVICES',
      title: 'Professional cleanliness for homes and businesses across the Capital Region',
      guaranteeBadge: 'QUALITY & FLEXIBILITY',
      guaranteeTitle: 'Looking for a custom combination or special cleaning scope?',
      guaranteeDesc: 'We happily assemble tailored cleaning packages for your exact property, such as move-out cleaning combined with window washing and upholstery extraction.',
      ctaCalculate: 'Calculate price estimate',
      ctaCustomQuote: 'Request a tailored quote',
    },
    areasPage: {
      badge: 'SERVICE LOCATIONS • CAPITAL REGION',
      title: 'Cleaning services in Helsinki, Espoo & Vantaa with zero travel surcharges',
      subtitle: 'Covering the entire metropolitan capital region, from central heritage apartments and family neighborhoods to corporate business hubs.',
      cityServicesBtn: 'View services in {city}',
      districtsLabel: 'Districts served:',
      localSeoBadge: 'Local SEO Area Pages & Districts',
      localSeoTitle: 'Hyper-local cleaning services across Helsinki, Espoo & Vantaa',
      localSeoSubtitle: 'Custom neighborhood offers & local cleaner teams',
      openAreaBtn: 'Open area guide',
      travelPromiseBadge: '€0 travel fee throughout the capital area',
      travelPromiseTitle: 'Transparent, fair pricing without transit surprises',
      travelPromiseDesc: 'Siisti360 charges zero mileage or transit surcharges for regular or one-off cleanings in Helsinki, Espoo, and Vantaa.',
      ctaQuote: 'Request a quote for your area',
      detectedAreaTitle: 'Your detected local area',
      exploreAreaGuide: 'Explore {name} guide',
      viewCleanings: 'View cleaning services',
    },
    cityDetailPage: {
      badgePrefix: 'LOCAL CLEANING SERVICE • ',
      titleSuffix: '— For homes & offices',
      logisticsNotes: {
        helsinki: {
          title: '📍 Central city parking and key handling (Helsinki)',
          text: 'Our teams possess resident parking permits across central zones 1 & 2. We can arrange key handovers from our office or your key lockbox at zero additional surcharge.',
        },
        espoo: {
          title: '📍 Detached houses & tech park expertise (Espoo)',
          text: 'Serving private homes in Tapiola, Leppävaara, and Saunalahti, alongside tech campus offices in Keilaniemi and Otaniemi. Full equipment and HEPA vacs included on every visit.',
        },
        vantaa: {
          title: '📍 Ring III transit corridors & residential hubs (Vantaa)',
          text: 'Prompt arrival across Tikkurila, Myyrmäki, and Aviapolis along the Ring Rail Line and Ring III. Flexible morning and evening slots without rush-hour fees.',
        },
      },
      districtsTitle: 'Neighborhoods and district hubs in {cityName}:',
      districtsSubtitle: 'Select a neighborhood for localized pricing & area specifics',
      postalPrefix: 'Postal code:',
      localPerksBadge: 'LOCAL ADVANTAGES',
      localPerksTitle: 'Why does {cityName} trust Siisti360?',
      perk1: '€0 travel fees in {cityName}',
      perk2: 'Fast open booking slots (Mon–Sat)',
      perk3: '60% Finnish tax deduction applied',
      quickQuoteTitle: 'Request a quick estimate in {cityName}:',
      nameLabel: 'Full name:',
      phoneLabel: 'Phone number:',
      serviceLabel: 'Service:',
      sendBtn: 'Send inquiry request',
      successTitle: 'Quote request received!',
      successMsg: 'Our team will contact you at {phone} as soon as possible.',
      servicesInCityTitle: 'Cleaning services in {cityName}:',
      exploreService: 'Explore service',
      bookBtn: 'Book',
    },
    calculator: {
      badge: 'INTERACTIVE ESTIMATE CALCULATOR',
      title: 'Calculate your estimated cleaning cost',
      subtitle: 'Choose your preferred pricing model, service type, property size and add-ons.',
      modelLabel: 'Pricing model',
      serviceLabel: 'Service type',
      areaLabel: 'Floor area (m²)',
      cityLabel: 'City',
      extrasLegend: 'Optional add-ons',
      extras: {
        windows: 'Window washing (+29 €)',
        oven: 'Oven deep clean (+24 €)',
        fridge: 'Fridge clean (+19 €)',
        sofa: 'Upholstery sofa extraction (+39 €)',
      },
      serviceNames: {
        standard: 'Home Cleaning (Standard)',
        deep: 'Deep Cleaning (Deep clean)',
        move: 'Move-out Cleaning (Move-out)',
        office: 'Office Cleaning (Office)',
        carpet: 'Carpet Washing (Carpet)',
        sofa: 'Sofa Cleaning (Sofa)',
      },
      estimatedHours: 'Estimated labour',
      estimatedPrice: 'Price estimate (preliminary)',
      proceedToBooking: 'Proceed to booking request with these details →',
      disclaimer: 'Calculated prices are illustrative estimates and do not constitute binding contracts. Final offer confirmed individually.',
      visitsMonthLabel: ' (4 visits / mo)',
      taxCreditTitle: 'Finnish tax credit (60%):',
      taxCreditDesc: 'After the tax deduction, your actual out-of-pocket cost is only {amount}!',
      noCommitment: 'No commitment. Booking requests are confirmed individually.',
      verifiedArea: '✓ Verified Service Area',
    },
    booking: {
      badge: 'ONLINE BOOKING REQUEST',
      title: 'Request a cleaning appointment',
      subtitle: 'Select service, desired date and time, and your contact info. No upfront card payment required.',
      step1: '1. Service & pricing',
      step2: '2. Date, time & address',
      step3: '3. Contact details',
      dateLabel: 'Preferred date',
      timeLabel: 'Select start time (Mon–Sat)',
      noSlotsNotice: 'Please pick a date in the calendar to see available slots.',
      closedSundayNotice: 'Closed on Sundays. Please select a weekday or Saturday.',
      addressLabel: 'Cleaning address',
      postalLabel: 'Postal code',
      nameLabel: 'Full name',
      emailLabel: 'Email address',
      phoneLabel: 'Phone number',
      companyLabel: 'Company name (for corporate clients)',
      notesLabel: 'Special instructions (pets, access, priority rooms)',
      consentLabel: 'I consent to processing my information for this booking request.',
      privacyLink: 'Privacy policy',
      backBtn: 'Back',
      nextBtn: 'Continue to next step',
      submitBtn: 'Send booking request',
      successTitle: 'Booking request sent successfully!',
      successMessage: 'Thank you! We have received your request and will contact you promptly to confirm the final schedule.',
      bookingRefLabel: 'Booking reference',
      serviceOptions: {
        standard: 'Home cleaning',
        deep: 'Deep cleaning',
        move: 'Move-out cleaning',
        office: 'Office cleaning',
        carpet: 'Carpet cleaning',
        sofa: 'Sofa cleaning',
      },
      modelOptions: {
        hourly: 'Hourly based (43 €/h)',
        fixed: 'Fixed package (149 €/visit)',
        monthly: 'Monthly plan (189 €/mo)',
        contract: 'Contract commercial (549 €/mo)',
        oneTime: 'One-time clean (179 €/visit)',
      },
      validation: {
        date: 'Please select a preferred date.',
        time: 'Please select a start time.',
        address: 'Please enter street address.',
        postal: 'Please enter a 5-digit postal code.',
        name: 'Please enter your name.',
        contact: 'Please enter at least email or phone number.',
        consent: 'Please accept terms to continue.',
      },
    },
    compare: {
      badge: 'BENCHMARK 2026',
      title: 'Helsinki cleaning services price comparison',
      subtitle: 'Verified from competitor public price pages as of 6 November 2026.',
      thProvider: 'Provider',
      thPrice: 'Public starting price',
      thTerms: 'Terms & context',
      thSource: 'Source',
      ourSample: 'Siisti360 (demo rate)',
      ourRate: '43,00 € / h',
      ourTerms: 'Home cleaning, 2h minimum',
      disclaimer: 'Competitor prices are cited from their publicly available price tables. Eligible for Finnish household tax deduction (up to 60%).',
      ctaCalculator: 'Try price calculator',
    },
    why: {
      badge: 'QUALITY COMMITMENT',
      title: 'Why choose Siisti360?',
      subtitle: 'Committed to superior cleanliness, verified professionals and clear communication.',
      cards: [
        { num: '01', title: 'Safety-focused cleaning products', text: 'Professional, low-allergen products safe for children and household pets.' },
        { num: '02', title: 'Plans for every budget', text: 'Five transparent pricing models from single one-off cleans to business contracts.' },
        { num: '03', title: 'Local to Helsinki, Espoo & Vantaa', text: 'Fast response times and deep understanding of metropolitan housing styles.' },
        { num: '04', title: 'Flexible scheduling', text: 'Pick the arrival window that fits your schedule and customize your room priority list.' },
        { num: '05', title: 'Documented checklists', text: 'Room-by-room inspection checklists ensure every agreed detail is meticulously completed.' },
        { num: '06', title: 'Zero upfront payment', text: 'Invoiced only after satisfactory completion. Eligible for the Finnish tax credit.' },
      ],
    },
    story: {
      badge: 'OUR STORY',
      title: 'A cleaner everyday starts with a simple idea',
      text1:
        'Siisti360 was founded to bring transparent, reliable and high-quality cleaning services to homes and businesses across the Helsinki capital region.',
      text2:
        'We blend modern digital convenience with genuine care. When you entrust your home or workplace to our team, you can expect spotless, safe and respectful care every single time.',
      missionTitle: 'Our customer promise',
      missionText: 'Transparent upfront pricing, vetted cleaning staff and a 100% satisfaction guarantee.',
    },
    about: {
      badge: 'ABOUT US • SIISTI360',
      title: 'Cleaning professionals in the Capital Region — Values-led service you can trust',
      h2: 'Our Goal: Effortless everyday living and pristine spaces without worry',
      p1: 'Siisti360 was born from the observation that finding dependable, top-tier cleaning services was frequently confusing, unpredictable, and hidden behind vague terms. We built a platform combining modern digital speed with genuine Nordic thoroughness and craftsmanship.',
      p2: 'Today, we proudly serve hundreds of households and corporate offices across Helsinki, Espoo, and Vantaa. We treat every home and workspace as a unique trust we honor on every single visit.',
      ctaBooking: 'Book cleaning online',
      ctaQuote: 'Request a free quote',
      values: [
        {
          title: 'Trained & Vetted Cleaning Staff',
          desc: 'All our cleaners undergo meticulous training in modern surfaces, eco-chemicals, ergonomics, and security protocols. Backgrounds are verified.',
        },
        {
          title: 'Full €1,000,000 Liability Insurance',
          desc: 'Our operations carry comprehensive commercial liability insurance up to €1,000,000. Your premises and valuables remain in safe hands.',
        },
        {
          title: 'Eco-Certified Nordic Detergents',
          desc: 'We utilize Nordic Swan and EU-Ecolabel certified formulas, ensuring pure indoor air quality free of harsh artificial fragrances.',
        },
        {
          title: '100% Satisfaction Guarantee',
          desc: 'If any spot does not meet our high standards, report it within 24 hours and we promptly re-clean the area free of charge.',
        },
      ],
    },
    contactPage: {
      badge: 'CUSTOMER SERVICE & CONTACT',
      title: 'Contact Siisti360 Customer Support — We reply promptly',
      h3: 'Contact details',
      phoneInfoLabel: 'Phone line (Mon–Sat):',
      emailInfoLabel: 'Email:',
      officeLabel: 'Office (appointments arranged in advance):',
      officeAddress: 'Aleksanterinkatu 15, 00100 Helsinki',
      hoursLabel: 'Service hours:',
      hoursVal: 'Mon–Fri 07:00–19:00 · Sat 09:00–17:00',
      coverageTitle: 'Coverage area:',
      coverageText: 'Helsinki, Espoo, Vantaa, and Kauniainen. €0 travel fee across the entire capital region.',
      formTitle: 'Send us a message',
      formSubtitle: 'Ask about our cleaning services, schedules, or request expert advice for your property.',
      nameLabel: 'Your name *',
      namePlaceholder: 'John Doe',
      emailLabel: 'Email address *',
      emailPlaceholder: 'john@example.com',
      phoneLabel: 'Phone number (optional)',
      phonePlaceholder: '+358 40 123 4567',
      msgLabel: 'Message *',
      msgPlaceholder: 'Type your message here...',
      sendBtn: 'Send message',
      successTitle: 'Your message has been sent!',
      successMsg: 'Thank you for reaching out! We will reply promptly, usually within 2 hours.',
      newMsgBtn: 'Send another message',
    },
    guides: {
      badge: 'TIPS & GUIDES',
      title: 'Cleaning guides and practical tips',
      subtitle: 'Insightful guides on home maintenance, move-outs, textile care, and commercial workspace cleanliness.',
      guideBadge: 'Guide',
      openChecklist: 'Read key rules and steps',
      closeChecklist: 'Close instructions',
      keyPoints: 'Key points:',
      readArticleBtn: 'Open full expert article & interactive checklist',
      checklistTitle: 'Interactive checklist',
      checklistSubtitle: 'Check off tasks as you clean:',
      resetBtn: 'Reset checklist',
      completedItems: 'Completed',
      intentLabel: 'Search Intent: Informational',
      wordsLabel: 'words',
      readTimeLabel: 'read time',
      verifiedBy: 'Verified by Siisti360 expert cleaning team',
    },
    reviews: {
      badge: 'CUSTOMER TESTIMONIALS',
      title: 'What our clients say',
      subtitle: 'Authentic reviews from homes and business clients across Helsinki, Espoo and Vantaa.',
      leaveReviewTitle: 'Leave your customer review',
      namePlaceholder: 'Your name or display name (e.g. Maria S., Helsinki)',
      ratingLabel: 'Rating (1–5 stars)',
      commentPlaceholder: 'Tell us about your experience: cleanliness, timeliness, friendliness...',
      consentText: 'I agree to have my review published under this name.',
      submitReviewBtn: 'Submit review',
      reviewSuccessMsg: 'Thank you for your feedback! It has been received and added to our testimonials.',
    },
    faq: {
      badge: 'FREQUENTLY ASKED QUESTIONS',
      title: 'Frequently asked cleaning questions',
      subtitle: 'Clear answers on home cleaning procedures, supplies and tax deductions.',
      items: [
        { question: 'What details are needed for an accurate quote?', answer: 'Service type, city, floor area (m²), preferred schedule and your contact details.' },
        { question: 'Does Siisti360 supply cleaning materials?', answer: 'Yes, our team brings professional microfiber cloths, cleaning solutions and specialized tools.' },
        { question: 'How does the Finnish household tax deduction work?', answer: 'Home cleaning qualifies for the Finnish household tax credit (kotitalousvähennys), allowing you to deduct up to 60% of the labor cost.' },
        { question: 'Is a quote or booking request binding?', answer: 'No. Submissions are free of charge and non-binding. We confirm all details before scheduling.' },
        { question: 'Can I reschedule or cancel an appointment?', answer: 'Yes, you can reschedule free of charge up to 24 hours prior to the booked visit.' },
      ],
    },
    quoteForm: {
      title: 'Request a free cleaning quote',
      subtitle: 'Fill in the form to receive a tailored, transparent price offer based on your property.',
      customerType: 'Customer type',
      typeHome: 'Residential (Home)',
      typeBusiness: 'Company or Housing Association',
      companyName: 'Company name',
      serviceSelect: 'Select cleaning service',
      citySelect: 'City',
      postcode: 'Postal code',
      size: 'Floor area (m²)',
      frequency: 'Cleaning frequency',
      freqOnce: 'One-time visit',
      freqWeekly: 'Weekly recurring',
      freqBiweekly: 'Every 2 weeks',
      freqMonthly: 'Monthly recurring',
      preferredDate: 'Preferred start date',
      contactPref: 'Preferred contact method',
      prefPhone: 'Phone call',
      prefEmail: 'Email',
      name: 'Full name',
      phone: 'Phone number',
      email: 'Email address',
      message: 'Special requests or notes about the property',
      consent: 'I agree to the processing of my details for preparing a cleaning quote.',
      sendBtn: 'Send quote request',
      successMsg: 'Thank you! Your quote request was received. We will contact you shortly.',
    },
    footer: {
      disclaimer: 'Siisti360 — Modern and trusted cleaning services for the Helsinki metropolitan area: Helsinki, Espoo & Vantaa.',
      rights: 'All rights reserved.',
      usefulLinks: 'Quick links',
      serviceAreas: 'Service areas',
      allPagesBtn: 'Browse all 333 pages',
    },
    whatsapp: {
      floatingLabel: 'Chat on WhatsApp',
      badge: 'Quick response',
      title: 'Customer support on WhatsApp',
      subtitle: 'We usually reply within a few minutes Mon–Sun 08:00–20:00.',
      responseTime: 'Online now · Reply time < 15 min',
      defaultMessage: 'Hello Siisti360! I would like to inquire about available cleaning slots and get a quick quote for my home.',
      quickHome: 'Home cleaning inquiry',
      quickHomeMsg: 'Hello Siisti360! I would like to inquire about recurring home cleaning and available slots.',
      quickMove: 'Move-out cleaning quote',
      quickMoveMsg: 'Hello! I need a quick estimate and available dates for move-out cleaning.',
      quickSlots: 'Available slots this week',
      quickSlotsMsg: 'Hello! Do you have any available cleaning slots for this or next week?',
      startChat: 'Start WhatsApp Chat',
      ariaLabel: 'Contact us on WhatsApp',
    },
    activeLocationBar: {
      noLocationText: 'No neighborhood selected yet. Enable location or search postal code for local rates and perks.',
      detectBtn: 'Detect Location',
      searchBtn: 'Search',
      justUpdated: 'Just Updated',
      detectedArea: 'Detected Area',
      cleanersAvailable: 'Cleaners available in 24–48h',
      travelFree: '0 € travel fee',
      changeBtn: 'Change area',
    },
    locationSearchModal: {
      title: 'Search and Select Your Local Area',
      subtitle: 'Enter your postal code or neighborhood name. You can also use automatic GPS detection.',
      placeholder: 'Search by postal code (e.g. 00180) or area name (Kamppi, Tapiola)...',
      detectBtn: 'Detect Automatically',
      detecting: 'Detecting...',
      detectTitle: 'Automatic Geolocation',
      resultsTitle: 'Search Results',
      popularAreas: 'Popular Neighborhoods',
      capitalHubs: 'Metropolitan Hubs',
      closeBtn: 'Close',
    },
    locationBanner: {
      promptTitle: 'Get accurate cleaning rates & availability for your neighborhood?',
      promptDesc: 'Allow location detection to view nearest available cleaner slots, accurate pricing, and area discounts across all pages.',
      localPerkBadge: 'Local Perks',
      allowBtn: 'Allow & Detect Location',
      manualBtn: 'Choose manually',
      dismissBtn: 'Dismiss notice',
      activeBadge: 'Active',
    },
    notFound: {
      errorBadge: 'HTTP 404 ERROR',
      title: '404 — Page Not Found',
      message: 'The requested path does not exist or may have been moved.',
      homeBtn: 'Back to Home',
      searchBtn: 'Search by postal code or area',
      popularServices: 'Popular Cleaning Services',
      popularLocations: 'Service Areas in Capital Region',
      wholeCity: 'Whole city',
    },
  },
};
