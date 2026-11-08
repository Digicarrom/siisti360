import { Language } from './content';

export interface TocItem {
  id: string;
  title: Record<Language, string>;
}

export interface InteractiveChecklistItem {
  id: string;
  category: Record<Language, string>;
  title: Record<Language, string>;
  details: Record<Language, string>;
  tools: Record<Language, string>;
}

export interface FaqItem {
  question: Record<Language, string>;
  answer: Record<Language, string>;
}

export interface RichArticle {
  id: string;
  slugs: Record<Language, string>;
  titles: Record<Language, string>;
  searchIntent: 'informational' | 'commercial' | 'transactional';
  searchIntentLabel: Record<Language, string>;
  targetAudience: Record<Language, string>;
  author: {
    name: string;
    role: Record<Language, string>;
    date: string;
    reviewer: Record<Language, string>;
  };
  wordCount: number;
  readTime: Record<Language, string>;
  summary: Record<Language, string>;
  keyTakeaways: Record<Language, string[]>;
  toc: TocItem[];
  introLead: Record<Language, string>;
  sections: {
    id: string;
    h2: Record<Language, string>;
    lead?: Record<Language, string>;
    paragraphs: Record<Language, string[]>;
    subsections?: {
      h3: Record<Language, string>;
      content: Record<Language, string>;
    }[];
    proTip?: Record<Language, string>;
    calloutBox?: {
      title: Record<Language, string>;
      body: Record<Language, string>;
    };
  }[];
  cleaningChemistry?: {
    title: Record<Language, string>;
    description: Record<Language, string>;
    items: {
      type: Record<Language, string>;
      ph: string;
      usage: Record<Language, string>;
      warning: Record<Language, string>;
    }[];
  };
  interactiveChecklist: InteractiveChecklistItem[];
  faqs: FaqItem[];
  relatedServiceId: string;
  relatedServiceCta: {
    title: Record<Language, string>;
    subtitle: Record<Language, string>;
    buttonText: Record<Language, string>;
  };
}

export const RICH_ARTICLES: Record<string, RichArticle> = {
  'muuttosiivouksen-tarkistuslista': {
    id: 'muuttosiivouksen-tarkistuslista',
    slugs: {
      fi: 'muuttosiivouksen-tarkistuslista',
      sv: 'checklista-for-flyttstadning',
      en: 'move-out-cleaning-checklist',
    },
    titles: {
      fi: 'Muuttosiivouksen kattava tarkistuslista & opas vuokravakuuden varmistamiseen',
      sv: 'Komplett checklista för flyttstädning & garanterad deposition',
      en: 'Complete Move-Out Cleaning Checklist & Deposit Guarantee Guide',
    },
    searchIntent: 'informational',
    searchIntentLabel: {
      fi: 'Informatiivinen hakuaie (Asiantuntijaohje & Vuokralaisen opas)',
      sv: 'Informativ sökavsikt (Expertguide & Hyresgästchecklista)',
      en: 'Informational Intent (Expert Guide & Tenant Checklist)',
    },
    targetAudience: {
      fi: 'Vuokra-asunnosta muuttavat, asunnon myyjät ja vuokranantajat pääkaupunkiseudulla',
      sv: 'Hyresgäster, bostadssäljare och hyresvärdar i huvudstadsregionen',
      en: 'Tenants moving out, home sellers, and landlords in the Helsinki region',
    },
    author: {
      name: 'Laura Virtanen',
      role: {
        fi: 'Puhtausalan erikoisammattitutkinto & vastaava työnohjaaja',
        sv: 'Städledare & certifierad hygienexpert',
        en: 'Certified Cleaning Supervisor & Hygiene Specialist',
      },
      date: '2026-10-15',
      reviewer: {
        fi: 'Tarkistanut Siisti360 laadunvarmistustiimi 6.11.2026',
        sv: 'Granskad av Siisti360 kvalitetsteam 6.11.2026',
        en: 'Reviewed by Siisti360 Quality Assurance on Nov 6, 2026',
      },
    },
    wordCount: 1480,
    readTime: {
      fi: '6 min lukuaika',
      sv: '6 min lästid',
      en: '6 min read',
    },
    summary: {
      fi: 'Muuttosiivous on tavanomaista ylläpitosiivousta huomattavasti vaativampi kokonaisuus. Tämä ammattilaisen laatima tarkistuslista kattaa jokaisen nurkan, uunista lattiakaivoon, jotta asunnon luovutus sujuu moitteetta ja saat vuokravakuutesi täysimääräisenä takaisin.',
      sv: 'En flyttstädning är mycket mer omfattande än vanlig veckostädning. Denna expertchecklista täcker alla utrymmen, från ugn till golvbrunn, så att överlämningen godkänns utan anmärkning.',
      en: 'A move-out cleaning is far more demanding than routine housekeeping. This professional checklist covers every corner from the oven to the floor drain to ensure flawless inspection and full deposit return.',
    },
    keyTakeaways: {
      fi: [
        'Muuttosiivous tehdään aina tyhjään asuntoon ylhäältä alaspäin ja puhtaimmasta likaisimpaan.',
        'Yleisimmät vuokranantajan huomautukset kohdistuvat uuniin, liesituulettimen rasvasuodattimeen ja kylpyhuoneen lattiakaivoon.',
        'Sulata pakastin vähintään 24 tuntia ennen siivousta ja aseta astia sulamisvedelle lattiasuojan kera.',
        'Ammattilaisen tekemästä muuttosiivouksesta saa kotitalousvähennyksen (60 % työn osuudesta).',
      ],
      sv: [
        'Flyttstädning utförs alltid i en tom bostad uppifrån och ner, från renaste till smutsigaste yta.',
        'Vanligaste anmärkningarna gäller ugn, spisfläktens fettfilter och badrummets golvbrunn.',
        'Frosta av frysen minst 24 timmar i förväg med uppsamlingskärl och golvskydd.',
        'Hushållsavdrag (60 % av arbetskostnaden) gäller när städningen köps från ett momsregistrerat företag.',
      ],
      en: [
        'Move-out cleaning is always executed in an empty home, working top-to-bottom and cleanest to dirtiest.',
        'Most frequent inspection deductions occur on ovens, cooker hood grease filters, and bathroom floor drains.',
        'Defrost the freezer at least 24 hours prior with drip trays and moisture-absorbent towels.',
        'Finnish household tax deduction (kotitalousvähennys) covers 60% of professional labor costs.',
      ],
    },
    toc: [
      { id: 'valmistelu', title: { fi: '1. Valmistelu ja oikeat välineet', sv: '1. Förberedelser och rätt utrustning', en: '1. Preparation and Essential Equipment' } },
      { id: 'keittio', title: { fi: '2. Keittiö: Uuni, liesituuletin ja kodinkoneet', sv: '2. Kök: Ugn, fläkt och vitvaror', en: '2. Kitchen: Oven, Range Hood & Appliances' } },
      { id: 'kylpyhuone', title: { fi: '3. Kylpyhuone, sauna ja lattiakaivot', sv: '3. Badrum, bastu och golvbrunn', en: '3. Bathroom, Sauna & Floor Drains' } },
      { id: 'asuinhuoneet', title: { fi: '4. Asuinhuoneet, kaapit ja ikkunat', sv: '4. Rum, garderober och fönster', en: '4. Living Spaces, Wardrobes & Windows' } },
      { id: 'kemikaalit', title: { fi: '5. Siivouskemian pH-opas materiaaleille', sv: '5. pH-guide för städkemi och ytor', en: '5. Cleaning Chemistry pH Reference' } },
      { id: 'interaktiivinen-lista', title: { fi: '6. Interaktiivinen muuttosiivouslista', sv: '6. Interaktiv checklista för flyttstädning', en: '6. Interactive Move-Out Checklist' } },
      { id: 'ukk', title: { fi: '7. Usein kysytyt kysymykset (FAQ)', sv: '7. Vanliga frågor och svar (FAQ)', en: '7. Frequently Asked Questions (FAQ)' } },
    ],
    introLead: {
      fi: 'Asunnon luovutus on yksi muuton stressaavimmista hetkistä. Vuokranantajalla tai ostajalla on oikeus teettää siivous edellisen asukkaan laskuun, mikäli asunto ei täytä puhtausvaatimuksia. Tällä oppaalla vältät turhat sanktiot ja teet urakasta järjestelmällisen.',
      sv: 'Bostadsöverlämningen kan vara flyttens mest stressiga moment. Hyresvärden har rätt att beställa omstädning på din bekostnad om kraven inte uppfylls. Den här guiden ger dig trygghet och ett systematiskt arbetssätt.',
      en: 'Handing over apartment keys is often the most stressful part of moving. Landlords or buyers can withhold security deposits or order emergency cleanings if standards are not met. This guide ensures systematic inspection success.',
    },
    sections: [
      {
        id: 'valmistelu',
        h2: {
          fi: '1. Valmistelu: Ajoitus, tyhjä asunto ja oikeat siivousvälineet',
          sv: '1. Förberedelser: Tidsplan, tom bostad och professionell utrustning',
          en: '1. Preparation: Timing, Empty Property & Proper Tools',
        },
        paragraphs: {
          fi: [
            'Muuttosiivousta ei koskaan kannata aloittaa, kun asunnossa on vielä muuttolaatikoita tai huonekaluja. Tavaroita siirrellessä tiloihin kulkeutuu jatkuvasti uutta pölyä ja katupölyä, mikä tekee työstä kaksinkertaista.',
            'Varaa riittävästi aikaa: yksiön perusteellinen muuttosiivous vie yhdeltä henkilöltä 4–6 tuntia, kaksion 6–9 tuntia ja perheasunnon usein jopa 12–16 työtuntia.',
            'Varmista, että asunnossa on sähkö ja juokseva vesi edelleen päällä siivouspäivänä. Älä koskaan vie valaisimia tai imuria pois viimeisen muuttokuorman mukana ennen kuin loppusiivous on hyväksytty.',
          ],
          sv: [
            'Börja aldrig flyttstädningen medan kartonger och möbler finns kvar. Varje flyttrunda drar in ny smuts och gör arbetet dubbelt så tungt.',
            'Räkna med rimlig tid: en etta tar ofta 4–6 timmar, en tvåa 6–9 timmar och större lägenheter 12–16 timmar för en person.',
            'Kontrollera att el och varmvatten är påkopplade under städdagen. Lämna belysning och dammsugare kvar till sist.',
          ],
          en: [
            'Never begin a thorough move-out clean while moving boxes or furniture remain in rooms. Foot traffic continually drags in dust and grime.',
            'Schedule adequate time: a studio flat typically requires 4–6 hours, a one-bedroom apartment 6–9 hours, and a family apartment 12–16 hours for a single cleaner.',
            'Ensure electricity and hot running water remain active on cleaning day. Leave lighting fixtures and vacuums until the final walkthrough.',
          ],
        },
        proTip: {
          fi: 'Ammattilaisen vinkki: Käytä värikoodattuja mikrokuituliinoja ristikontaminaation estämiseksi: Punainen WC-pöntölle, keltainen pesualtaille ja lauteille, sininen asuinhuoneille ja vihreä keittiön ruokapinnoille.',
          sv: 'Proffstips: Använd färgkodade mikrofiberdukar: Röd för toalett, gul för handfat/dusch, blå för vardagsrum och grön för kökets matytor.',
          en: 'Pro Tip: Use color-coded microfiber cloths to prevent cross-contamination: Red for WC, Yellow for washbasins, Blue for living areas, and Green for food surfaces.',
        },
      },
      {
        id: 'keittio',
        h2: {
          fi: '2. Keittiö: Uunin, liesituulettimen rasvasuodattimen ja kylmälaitteiden syväpuhdistus',
          sv: '2. Kök: Djuprengöring av ugn, fettfilter och kyl/frys',
          en: '2. Kitchen: Deep Cleaning Oven, Grease Filter & Cold Storage',
        },
        paragraphs: {
          fi: [
            'Keittiö on asunnon kriittisin tila vuokravakuustarkastuksissa. Pelkkä tiskialtaan pyyhintä ei riitä, vaan tarkastajat avaavat aina uunin luukun ja kurkistavat liesituulettimen rasvasuodattimeen.',
            'Uuni ja pellit: Levitä emäksinen uuninpuhdistusaine tai ruokasooda-pesuainetahna uunin sisäpinnoille ja anna vaikuttaa vähintään 45–60 minuuttia. Pese myös uunin ritilät, pellit ja kaksinkertaisten lasien väli, jos luukku on avattavissa.',
            'Liesituuletin: Irrota metallinen rasvasuodatin ja liota sitä kuumassa vedessä yhdessä rasvaa pilkkovan astianpesuaineen kanssa. Huuhtele huolellisesti ja kuivaa ennen paikoilleen asettamista.',
            'Kylmälaitteet: Sulata pakastin ja pyyhi jääkaapin hyllyt, lokerot ja vihanneslaatikot miedolla pesuaineella. Muista myös imuroida ja pyyhkiä jääkaapin tausta, jos laite on vedettävissä esiin.',
          ],
          sv: [
            'Köket granskas alltid mest noggrant vid besiktning. Hyresvärden kontrollerar framför allt ugnen, plåtarna och köksfläktens filter.',
            'Ugn och plåtar: Applicera ugnsrengöring eller såpapasta och låt verka minst 45–60 minuter innan du torkar rent.',
            'Spisfläkt: Ta loss metallfiltret och blötlägg i hett vatten med fettlösande diskmedel. Torka rent.',
            'Kyl och frys: Frosta av frysen, torka hyllor och grönsakslådor. Dammsug bakom kylskåpet om det går att rulla fram.',
          ],
          en: [
            'The kitchen receives the strictest scrutiny during move-out inspections. Inspectors inspect inside the oven cavity, baking sheets, and range hood filter.',
            'Oven and trays: Apply alkaline oven cleaner or baking soda paste and allow at least 45–60 minutes dwell time before wiping down.',
            'Range hood: Detach metal grease filters and soak in boiling water with degreasing detergent. Rinse and dry thoroughly.',
            'Refrigerators: Defrost the freezer completely and sanitize shelves and crisper drawers. Vacuum coils behind the unit if reachable.',
          ],
        },
      },
      {
        id: 'kylpyhuone',
        h2: {
          fi: '3. Kylpyhuone, sauna ja lattiakaivojen desinfioiva puhdistus',
          sv: '3. Badrum, bastu och desinficering av golvbrunn',
          en: '3. Bathroom, Sauna & Floor Drain Descaling',
        },
        paragraphs: {
          fi: [
            'Kosteissa tiloissa kertyy kalkkisaostumia, saippuajäämiä ja rasvaa. Kalkki poistetaan happamalla pesuaineella (pH 2–4), kun taas laattasaumojen orgaaninen lika vaatii neutraalin tai miedosti emäksisen pesuaineen.',
            'Lattiakaivon puhdistus: Tämä on ehdoton vaatimus kaikissa vuokrasopimuksissa. Nosta ritilä, poista hiukset ja irtolika suojahanskoilla, ja pese kaivon sisäosa sekä hajulukko tiskiharjalla ja desinfioivalla aineella.',
            'WC-istuin: Puhdista pöntön sisä- ja ulkopinnat, jalan kiinnityskohta sekä vesisäiliön kansi. Poista mahdollinen ruoste- ja kalkkirengas istuinkulhosta kalkinpoistoaineella.',
            'Sauna: Pese lauteet puun syiden suuntaisesti laudepesuaineella. Älä käytä painepesuria tai klooripitoisia valkaisuaineita, jotka vaurioittavat pehmeää puukuitua.',
          ],
          sv: [
            'I våtrum samlas kalk, tvålrester och hudfett. Använd surt rengöringsmedel (pH 2–4) mot kalk och skona fogarna.',
            'Rensa golvbrunn: Obligatoriskt i alla flyttbesiktningar. Lyft gallret, avlägsna hår och smuts, och skrubba vattenlåset rent.',
            'Toalettstol: Rengör sitsens fästen, fot och krök noggrant.',
            'Bastu: Tvätta lavarna med träanpassat basturengöringsmedel i fibrernas riktning.',
          ],
          en: [
            'Wet areas collect stubborn mineral limescale, soap scum, and body oils. Limescale requires an acidic cleaner (pH 2–4), while tile grouts need pre-dampening with water to protect porous cement.',
            'Floor drain: Non-negotiable requirement. Remove the grate, clear hair traps with gloves, and scrub the trap body with disinfectant.',
            'Toilet bowl: Clean hinges, base bolts, and tank exterior. Treat mineral rings in the bowl with a descaling gel.',
            'Sauna: Scrub benches along the wood grain using dedicated sauna detergent. Never use pressure washers or harsh chlorine bleach.',
          ],
        },
      },
      {
        id: 'asuinhuoneet',
        h2: {
          fi: '4. Asuinhuoneet, vaatekaapit, ovet ja ikkunoiden pesu',
          sv: '4. Rum, garderober, dörrar och fönsterputsning',
          en: '4. Living Spaces, Built-In Cupboards & Window Washing',
        },
        paragraphs: {
          fi: [
            'Kaikki kiinteät kaapit, hyllyt ja laatikostot on pyyhittävä sekä sisä- että ulkopuolelta. Tarkista myös henkaritangot ja vetimet.',
            'Pistorasiat, valokatkaisijat ja ovet: Poista sormenjäljet ja rasvatahrat ovien kahvojen ympäriltä mikrokuituliinalla.',
            'Patterien taustat ja ilmanvaihtoventtiilit: Imuroi patterien taustat ja pyyhi poistoilmaventtiilien pölykerros varoen muuttamasta venttiilin säätöasentoa.',
            'Ikkunat: Pese ikkunat sisä- ja ulkopinnoilta sekä puitteiden välistä sään salliessa (lämpötila yli 0 °C). Pyyhi myös sälekaihtimet pölystä.',
          ],
          sv: [
            'Alla fasta garderober och lådor torkas ur in- och utvändigt.',
            'Strömbrytare och dörrhandtag torkas från fett och fingeravtryck.',
            'Dammsug bakom element och torka frånluftsventiler varsamt utan att ändra inställningen.',
            'Fönster tvättas på alla sidor inklusive karmar och fönsterbrädor om vädret tillåter (plusgrader).',
          ],
          en: [
            'All built-in closets, shelves and drawers must be thoroughly wiped down inside and out.',
            'Switchplates, doors, and handles: Clear smudges and fingerprint grease with a damp microfiber cloth.',
            'Radiators and ventilation grilles: Vacuum behind radiators and gently wipe ceiling intake grilles without rotating calibrated airflow discs.',
            'Windows: Wash both interior and exterior panes, frame channels, and sills if temperature permits (above freezing).',
          ],
        },
      },
    ],
    cleaningChemistry: {
      title: {
        fi: 'Ammattilaisen pH-opas: Valitse oikea puhdistusaine oikealle lialle',
        sv: 'Professionell pH-guide: Välj rätt rengöringsmedel för rätt smuts',
        en: 'Professional pH Reference: Matching Cleaners to Soils',
      },
      description: {
        fi: 'Väärä aine väärällä pinnalla voi vaurioittaa marmoria, puuta tai saumoja. Muuttosiivouksessa nyrkkisääntö on pH-arvon oikea valinta:',
        sv: 'Fel medel på fel yta kan skada marmor, trä och fogar. Rätt pH-värde är avgörande:',
        en: 'The wrong chemical on a sensitive surface can etch marble, strip timber sealants, or destroy grout:',
      },
      items: [
        {
          type: { fi: 'Hapan puhdistusaine', sv: 'Surt rengöringsmedel', en: 'Acidic Cleaner' },
          ph: 'pH 1 – 4',
          usage: { fi: 'Kalkki, ruoste, saippuasaostumat, kaakelit', sv: 'Kalk, rost, tvålrester, kakel', en: 'Limescale, mineral deposits, rust rings' },
          warning: { fi: 'EI saa käyttää marmorille, kalkkikivelle tai suojaamattomille saumoille', sv: 'Får EJ användas på marmor eller kalksten', en: 'DO NOT use on marble, limestone or unsealed grout' },
        },
        {
          type: { fi: 'Neutraali yleispuhdistusaine', sv: 'Neutralt allrengöringsmedel', en: 'Neutral Multi-Surface' },
          ph: 'pH 6 – 8',
          usage: { fi: 'Lattiat (parketti, laminaatti, vinyyli), pöly, maalatut ovet', sv: 'Golv (parkett, laminat), målade dörrar, damm', en: 'Hardwood floors, laminate, vinyl, painted doors' },
          warning: { fi: 'Turvallinen useimmille aroille pinnoille', sv: 'Säker för de flesta känsliga ytor', en: 'Safe for virtually all architectural materials' },
        },
        {
          type: { fi: 'Heikosti / vahvasti emäksinen', sv: 'Alkaliskt / grovrengöring', en: 'Alkaline Degreaser' },
          ph: 'pH 9 – 13',
          usage: { fi: 'Ruoanlaittorasva, uuni, liesituuletin, keittiön kaapit', sv: 'Fett, ugn, spisfläkt, köksluckor', en: 'Heavy cooking oil, oven grease, exhaust baffles' },
          warning: { fi: 'Käytä aina suojahanskoja; ei alumiinille eikä öljytylle puulle', sv: 'Använd handskar; undvik aluminium', en: 'Wear protective gloves; damages raw aluminum & oiled wood' },
        },
      ],
    },
    interactiveChecklist: [
      {
        id: 'chk-1',
        category: { fi: 'Keittiö', sv: 'Kök', en: 'Kitchen' },
        title: { fi: 'Uunin ja uunipeltien pesu', sv: 'Rengöring av ugn och plåtar', en: 'Oven & baking sheet deep clean' },
        details: { fi: 'Poista palanut rasva pohjasta ja seinämistä. Pese ritilät ja uunipellit.', sv: 'Ta bort fastbränt fett från väggar och botten.', en: 'Strip carbonized grease from walls, racks, and enamel trays.' },
        tools: { fi: 'Emäksinen uuninpuhdistusaine, hankaussieni, suojahanskat', sv: 'Ugnsrengöring, svamp, handskar', en: 'Alkaline oven foam, scrub pad, nitrile gloves' },
      },
      {
        id: 'chk-2',
        category: { fi: 'Keittiö', sv: 'Kök', en: 'Kitchen' },
        title: { fi: 'Liesituulettimen rasvasuodatin', sv: 'Spisfläktens metallfilter', en: 'Range hood grease filter soak' },
        details: { fi: 'Irrota ja liota kuumassa astianpesuaineliuoksessa tai pese astianpesukoneessa.', sv: 'Blötlägg i diskmedelslösning eller diska i maskin.', en: 'Submerge in hot degreasing bath or run on heavy dishwasher cycle.' },
        tools: { fi: 'Astianpesuaine, kuuma vesi, tiskiharja', sv: 'Handdiskmedel, hett vatten, diskborste', en: 'Dish soap, hot soak water, nylon dish brush' },
      },
      {
        id: 'chk-3',
        category: { fi: 'Keittiö', sv: 'Kök', en: 'Kitchen' },
        title: { fi: 'Jääkaapin & pakastimen sulatus ja pyyhintä', sv: 'Avfrostning av kyl och frys', en: 'Defrost fridge & freezer, wipe seals' },
        details: { fi: 'Sulata pakastin, pyyhi hyllyt, lokerot ja ovitiivisteet. Jätä ovet raolleen.', sv: 'Frosta av, torka hyllor och lister. Lämna dörrar på glänt.', en: 'Defrost freezer, wipe gasket seals, sanitize crisper bins. Prop doors open.' },
        tools: { fi: 'Yleispuhdistusaine, mikrokuituliina, sulatusastia', sv: 'Allrengöring, trasa, avfrostningskärl', en: 'Neutral cleaner, microfiber cloths, catch towels' },
      },
      {
        id: 'chk-4',
        category: { fi: 'Kylpyhuone', sv: 'Badrum', en: 'Bathroom' },
        title: { fi: 'Lattiakaivon tyhjennys ja pesu', sv: 'Rensa och skrubba golvbrunn', en: 'Clear & scrub bathroom floor drain' },
        details: { fi: 'Poista ritilä ja hajulukko. Pese hiukset ja lieju pois harjalla ja desinfiointiaineella.', sv: 'Ta bort galler och vattenlås. Rengör med borste och desinfektion.', en: 'Remove grate and bell trap. Clean out hair sludge and sanitize reservoir.' },
        tools: { fi: 'Suojahanskat, tiskiharja, desinfioiva puhdistusaine', sv: 'Handskar, borste, desinfektionsmedel', en: 'Heavy duty gloves, small scrubber, chlorine or pine disinfectant' },
      },
      {
        id: 'chk-5',
        category: { fi: 'Kylpyhuone', sv: 'Badrum', en: 'Bathroom' },
        title: { fi: 'Suihkun seinien & hanan kalkinpoisto', sv: 'Kalkborttagning på kakel och kranar', en: 'Shower walls, tile grout & tap descaling' },
        details: { fi: 'Kastele saumat ensin vedellä. Levitä hapan aine, harjaa kalkki pois ja huuhtele heti.', sv: 'Blöt fogar först, applicera surt medel, skrubba och skölj.', en: 'Pre-wet grout joints with fresh water, apply descaling agent, rinse thoroughly.' },
        tools: { fi: 'Hapan puhdistusaine (pH 2–3), suihkulasta, saumaharja', sv: 'Surt medel (pH 2-3), skrapa, fogborste', en: 'Acidic limescale remover (pH 2–3), squeegee, tile brush' },
      },
      {
        id: 'chk-6',
        category: { fi: 'Asuinhuoneet', sv: 'Rum', en: 'Living Spaces' },
        title: { fi: 'Kaappien sisä- ja ulkopintojen pyyhintä', sv: 'Torka ur alla garderober och skåp', en: 'Wipe all cupboard interiors & shelves' },
        details: { fi: 'Kaikki vaatekaapit, keittiökaapit ja laatikot pyyhitään nihkeällä liinalla puhtaiksi.', sv: 'Torka hyllor, lådor och fronter fria från damm.', en: 'Wipe all empty wardrobes, kitchen cupboards, cutlery trays, and handles.' },
        tools: { fi: 'Nihkeä mikrokuituliina, mieto yleispesuaine', sv: 'Fuktig mikrofiberduk, milt allrengöringsmedel', en: 'Damp microfiber cloths, mild multi-surface spray' },
      },
      {
        id: 'chk-7',
        category: { fi: 'Yleiset tilat', sv: 'Övrigt', en: 'General' },
        title: { fi: 'Lattioiden imurointi ja kosteapyyhintä', sv: 'Dammsugning och moppning av golv', en: 'Vacuum & damp mop all floor surfaces' },
        details: { fi: 'Imuroi jalkalistat ja nurkat harjasuulakkeella. Moppaa nihkeällä mopilla materiaalin mukaan.', sv: 'Dammsug lister och hörn. Moppa med rätt fuktighetsgrad.', en: 'Vacuum skirting boards and corners. Mop damply tailored to wood/vinyl spec.' },
        tools: { fi: 'Imuri harjasuulakkeella, litteä mikrokuitumoppi, ämpäri', sv: 'Dammsugare, mikrofibermopp, hink', en: 'HEPA vacuum, flat microfiber mop, bucket & floor detergent' },
      },
    ],
    faqs: [
      {
        question: {
          fi: 'Mitä tapahtuu, jos vuokranantaja ei hyväksy muuttosiivousta?',
          sv: 'Vad händer om hyresvärden inte godkänner flyttstädningen?',
          en: 'What happens if the landlord rejects the move-out cleaning?',
        },
        answer: {
          fi: 'Vuokranantaja antaa yleensä 24–48 tuntia aikaa korjata puutteet itse. Jos korjausta ei tehdä tai se ei kelpaa, vuokranantaja tilaa ammattisiivouksen ja vähentää kulut suoraan vuokravakuudesta. Siisti360 muuttosiivoukseen sisältyy aina 100 % luovutustakuu: jos huomautus tulee, korjaamme sen veloituksetta.',
          sv: 'Hyresvärden ger normalt 24–48 timmar att åtgärda brister. Annars beställs omstädning som dras från depositionen. Med Siisti360 ingår alltid 100 % godkännandegaranti: vi åtgärdar eventuella anmärkningar utan extra kostnad.',
          en: 'Landlords typically allow 24–48 hours to rectify omissions. If uncorrected, they commission an emergency commercial cleaning deducted from your deposit. Siisti360 includes a 100% inspection guarantee: if any note is made, we return and fix it free of charge.',
        },
      },
      {
        question: {
          fi: 'Kuuluuko ikkunoiden pesu aina muuttosiivoukseen?',
          sv: 'Ingår fönsterputsning alltid i flyttstädning?',
          en: 'Is window washing always included in move-out cleaning?',
        },
        answer: {
          fi: 'Useimmissa vuokrasopimuksissa edellytetään ikkunoiden pesua sisä- ja ulkopinnoilta, jos ulkolämpötila on plussan puolella. Talvipakkasilla pestään ainoastaan sisäpinnat ja puitteiden välit. Siisti360 tarjoaa ikkunanpesun kätevästi valinnaisena lisäpalveluna tai pakettiin sisällytettynä.',
          sv: 'I de flesta avtal krävs fönstertvätt vid plusgrader. Under minusgrader tvättas endast insidan. Hos Siisti360 kan du enkelt välja fönsterputs som tillval eller paket.',
          en: 'Most lease agreements mandate window washing when outdoor temperatures are above freezing. In freezing winter weather, only interior panes and intermediate frames are cleaned. Siisti360 provides window cleaning as an easy add-on.',
        },
      },
      {
        question: {
          fi: 'Kuinka paljon kotitalousvähennystä muuttosiivouksesta saa?',
          sv: 'Hur mycket hushållsavdrag får jag för flyttstädning?',
          en: 'How much tax deduction (kotitalousvähennys) can I claim?',
        },
        answer: {
          fi: 'Vuonna 2026 kotitalousvähennys kotona teetetystä siivoustyöstä on 60 % työn arvonlisäverollisesta osuudesta (omavastuu 100 € / vuosi). Esimerkiksi 350 euron muuttosiivouksesta todellinen kustannus vähennyksen jälkeen on vain 140 euroa plus omavastuuosuus.',
          sv: 'Hushållsavdraget för städarbete är 60 % av arbetskostnaden (självrisk 100 € / kalenderår). För en städning på 350 € blir nettokostnaden endast 140 € plus självrisk.',
          en: 'In Finland, the household tax deduction covers 60% of invoice labor cost (100 € annual deductible). For instance, on a 350 € move-out clean, your net outlay after tax rebate is only 140 € plus applicable deductible.',
        },
      },
    ],
    relatedServiceId: 'muuttosiivous',
    relatedServiceCta: {
      title: {
        fi: 'Haluatko säästää 8 tuntia ja varmistaa vakuutesi palautuksen?',
        sv: 'Vill du spara 8 timmar och garantera din deposition?',
        en: 'Want to save 8 hours and guarantee your full security deposit?',
      },
      subtitle: {
        fi: 'Tilaa ammattitaitoinen muuttosiivous luovutustakuulla. Tuomme kaikki aineet ja välineet mukanamme.',
        sv: 'Boka professionell flyttstädning med godkännandegaranti. Vi tar med alla maskiner och medel.',
        en: 'Book professional move-out cleaning with a 100% inspection guarantee. We bring all equipment and eco-certified chemicals.',
      },
      buttonText: {
        fi: 'Varaa muuttosiivous luovutustakuulla',
        sv: 'Boka flyttstädning med garanti',
        en: 'Book Move-Out Cleaning with Guarantee',
      },
    },
  },
  'kuinka-usein-kotisiivous': {
    id: 'kuinka-usein-kotisiivous',
    slugs: {
      fi: 'kuinka-usein-kotisiivous',
      sv: 'hur-ofta-hemstadning',
      en: 'how-often-home-cleaning',
    },
    titles: {
      fi: 'Kuinka usein kotisiivous kannattaa tehdä? Asiantuntijan opas oikeaan siivousrytmiin',
      sv: 'Hur ofta bör man städa hemma? Expertguide till rätt städrutiner',
      en: 'How Often Should You Clean Your Home? Expert Routine Guide',
    },
    searchIntent: 'informational',
    searchIntentLabel: {
      fi: 'Informatiivinen hakuaie (Siivousvälin arviointi & Arjen optimointi)',
      sv: 'Informativ sökavsikt (Städintervall & Vardagsoptimering)',
      en: 'Informational Intent (Cleaning Interval & Routine Planning)',
    },
    targetAudience: {
      fi: 'Perheet, pariskunnat ja lemmikinomistajat, jotka haluavat optimoida kodinhoidon aikataulun',
      sv: 'Familjer, par och djurägare som vill optimera hemmets städrutiner',
      en: 'Households, busy professionals, and pet owners looking to optimize home care',
    },
    author: {
      name: 'Laura Virtanen',
      role: {
        fi: 'Puhtausalan erikoisammattitutkinto & vastaava työnohjaaja',
        sv: 'Städledare & certifierad hygienexpert',
        en: 'Certified Cleaning Supervisor & Hygiene Specialist',
      },
      date: '2026-10-10',
      reviewer: {
        fi: 'Tarkistanut Siisti360 laadunvarmistustiimi 6.11.2026',
        sv: 'Granskad av Siisti360 kvalitetsteam 6.11.2026',
        en: 'Reviewed by Siisti360 Quality Assurance on Nov 6, 2026',
      },
    },
    wordCount: 1220,
    readTime: {
      fi: '5 min lukuaika',
      sv: '5 min lästid',
      en: '5 min read',
    },
    summary: {
      fi: 'Optimaalinen siivousväli riippuu neliöistä, asukkaiden määrästä, lemmikeistä sekä perheen arjen aktiivisuudesta. Tämä opas vertailee viikoittaisen, kahden viikon välein tapahtuvan ja kuukausittaisen siivouksen kustannus-hyötysuhdetta.',
      sv: 'Rätt städintervall beror på boyta, antal familjemedlemmar, husdjur och livsstil. Den här guiden jämför veckovis, varannan vecka och månatlig städning.',
      en: 'The ideal cleaning cadence depends on square footage, household size, pets, and activity levels. This guide analyzes weekly, bi-weekly, and monthly maintenance options.',
    },
    keyTakeaways: {
      fi: [
        'Joka toinen viikko (2 vkon välein) on 65 % asiakkaistamme suosituin ja kustannustehokkain siivousrytmi.',
        'Lapsi- ja koiraperheissä viikoittainen käynti säästää eniten vanhempien vapaa-aikaa ja parantaa sisäilman laatua.',
        'Kuukausisiivous toimii erinomaisena syväpuhdistuspohjana, jos asukkaat ylläpitävät pintasiisteyttä itse.',
        'Säännöllinen sopimusasiakkuus alentaa tuntihintaa 39,90 € / h tasolle verrattuna kertakäyntiin.',
      ],
      sv: [
        'Varannan vecka är det populäraste valet för 65 % av våra kunder och ger bäst valuta för pengarna.',
        'För familjer med småbarn eller pälsdjur är veckovis städning bäst för inomhusluften.',
        'Månadsstädning fungerar bra som grundlig genomgång om man sköter vardagsplocket själv.',
        'Regelbundet abonnemang ger lägre timpris från 39,90 €/h jämfört med engångsbesök.',
      ],
      en: [
        'Bi-weekly (every two weeks) is chosen by 65% of our clients as the sweet spot between cleanliness and budget.',
        'Households with shedding pets or toddlers gain maximum free time and air quality benefits from weekly visits.',
        'Monthly deep cleaning is ideal when occupants handle routine sweeping and kitchen wiping themselves.',
        'Recurring subscription rates start at 39,90 €/h, providing a substantial discount over single visits.',
      ],
    },
    toc: [
      { id: 'tekijat', title: { fi: '1. Siivoustarpeeseen vaikuttavat tekijät', sv: '1. Faktorer som styr städbehovet', en: '1. Key Factors Impacting Frequency' } },
      { id: 'vertailu', title: { fi: '2. Viikoittainen vs. joka toinen viikko vs. kuukausittain', sv: '2. Veckovis vs. varannan vecka vs. månadsvis', en: '2. Weekly vs. Bi-Weekly vs. Monthly' } },
      { id: 'sisailma', title: { fi: '3. Sisäilma ja allergioiden ennaltaehkäisy', sv: '3. Inomhusluft och allergier', en: '3. Indoor Air Quality & Allergy Reduction' } },
      { id: 'interaktiivinen-lista', title: { fi: '4. Arjen ylläpitotarkistuslista', sv: '4. Vardagens underhållslista', en: '4. Routine Maintenance Checklist' } },
      { id: 'ukk', title: { fi: '5. Usein kysytyt kysymykset', sv: '5. Vanliga frågor', en: '5. Frequently Asked Questions' } },
    ],
    introLead: {
      fi: 'Moni miettii, kuinka usein koti todellisuudessa tulisi siivota. Liian harva väli johtaa lian pinttymiseen ja moninkertaiseen siivousurakkaan, kun taas liian tiheä tahti voi tuntua budjetissa. Tässä ovat asiantuntijoidemme suositukset pääkaupunkiseudun koteihin.',
      sv: 'Att hitta balansen mellan renlighet och tidsåtgång är en vanlig utmaning. För långa intervall gör att kalk och fett bränner fast, medan för täta besök ökar kostnaden. Här är våra rekommendationer.',
      en: 'Striking the optimal balance between a sparkling home and your family budget is a common dilemma. Too infrequent, and dirt bonds stubbornly; too frequent, and cost mounts. Here is our field-tested guidance.',
    },
    sections: [
      {
        id: 'tekijat',
        h2: {
          fi: '1. Siivoustarpeeseen vaikuttavat tekijät: Asukkaat, lemmikit ja sijainti',
          sv: '1. Faktorer som styr städbehovet: Boende, husdjur och läge',
          en: '1. What Determines Cleaning Frequency in Nordic Homes?',
        },
        paragraphs: {
          fi: [
            'Ei ole olemassa yhtä ainoaa oikeaa vastausta, joka sopisi kaikkiin koteihin. Tärkein muuttuja on asunnon käyttöaste: tekeekö perhe etätöitä kotona päivittäin, vai vietetäänkö asunnossa vain illat ja viikonloput?',
            'Lemmikkieläimet: Koiran tai kissan karvat ja kuivuva kura eteisessä nostavat imurointitarvetta merkittävästi. Lemmikkikodeissa suosittelemme aina viikoittaista tai vähintään joka toinen viikko tapahtuvaa käyntiä.',
            'Kodin pinta-ala: Pienissä asunnoissa pöly näkyy nopeammin, kun taas suurissa omakotitaloissa lattioiden moppaus ja useiden WC-tilojen puhtaanapito vie valtavasti aikaa.',
          ],
          sv: [
            'Alla hem är unika. Största faktorn är användningen: jobbar du hemifrån på heltid eller är du mest hemma på kvällarna?',
            'Husdjur: Pälsfällning och smutsiga tassar ökar behovet av dammsugning. Husdjurshem mår bäst av veckostädning.',
            'Bostadens storlek: I små lägenheter syns damm snabbt, medan villor kräver mycket tid för badrum och stora golvytor.',
          ],
          en: [
            'There is no one-size-fits-all formula. The primary variable is home occupancy: are residents working remotely all day, or solely present during evenings?',
            'Pets: Fur shedding and dried mud near entryways accelerate floor vacuuming needs. Pet households benefit immensely from weekly visits.',
            'Square footage: While compact flats display visible dust quickly, spacious family detached houses demand hours just for bathrooms and floor mopping.',
          ],
        },
      },
      {
        id: 'vertailu',
        h2: {
          fi: '2. Vertailu: Viikoittainen, joka toinen viikko vai kerran kuussa?',
          sv: '2. Jämförelse: Veckovis, varannan vecka eller månadsvis?',
          en: '2. Head-to-Head: Weekly vs. Bi-Weekly vs. Monthly Schedules',
        },
        paragraphs: {
          fi: [
            'Viikoittainen kotisiivous: Täydellinen ratkaisu lapsi- ja lemmikkiperheille sekä kiireisille asiantuntijoille. Kodin perussiisteys säilyy katkeamattomana, eikä viikonloppuja tarvitse koskaan pyhittää siivoamiseen.',
            'Joka toinen viikko (Suosituin): Ylivoimaisesti kysytyin palvelumalli. Kahdessa viikossa koti ehtii kaivata perusteellista imurointia, kylpyhuoneen desinfiointia ja pintojen pyyhintää ilman, että lika pääsee pinttymään.',
            'Kuukausittainen siivous: Sopii yksinasuville tai pariskunnille, jotka siivoavat kevyesti viikoittain itse ja haluavat ammattilaisen tekemään raskaamman syväpuhdistuksen.',
          ],
          sv: [
            'Veckovis städning: Perfekt för barn- och djurfamiljer. Helgerna förblir helt lediga för vila och fritid.',
            'Varannan vecka (Mest populär): Vår mest valda tjänst. Håller kalk och damm borta och ger fantastisk balans mellan pris och nytta.',
            'Månadsvis: Passar singlar eller par som dammsuger lite själva och vill ha proffshjälp med badrum och grundlig avtorkning.',
          ],
          en: [
            'Weekly Housekeeping: The gold standard for families with youngsters or shedding dogs. Frees up weekends entirely for recreation and family time.',
            'Bi-Weekly (Most Popular): Selected by 65% of our clientele. Perfectly stops soap scum and dust layers from establishing deep bonds.',
            'Monthly Deep Clean: Excellent for disciplined single occupants who manage light dusting and desire heavy sanitization monthly.',
          ],
        },
      },
      {
        id: 'sisailma',
        h2: {
          fi: '3. Sisäilman laatu, pölypunkit ja talvikauden allergiat',
          sv: '3. Inomhusluft, dammkvalster och vinterallergier',
          en: '3. Indoor Air Hygiene, Dust Mites & Nordic Winter Air',
        },
        paragraphs: {
          fi: [
            'Pääkaupunkiseudulla talvisin huoneilma on kuivaa, jolloin hienojakoinen pöly leijuu ilmassa ja ärsyttää hengitysteitä. Säännöllinen mikrokuitupyyhintä ja HEPA-13 -suodatettu imurointi poistavat jopa 99,97 % allergeeneista.',
            'Pelkkä imurointi ei riitä: lattioiden säännöllinen nihkeäpyyhintä sitoo mikropölyn, jota imurin ilmavirta ei kykene vangitsemaan.',
          ],
          sv: [
            'Under den nordiska vintern är inomhusluften torr och dammpartiklar virvlar runt. HEPA-filtrerad dammsugning fångar upp 99,97 % av mikrodamm och allergener.',
            'Moppning binder det finaste dammet som annars irriterar slemhinnor och luftvägar.',
          ],
          en: [
            'During Nordic winter months, indoor heating creates low humidity where fine aerosols suspend in air. Professional HEPA-13 filtration captures 99.97% of airborne allergens.',
            'Damp micro-mopping completes the cycle by binding fine particulate that dry suction alone cannot extract.',
          ],
        },
      },
    ],
    interactiveChecklist: [
      {
        id: 'chk-w1',
        category: { fi: 'Ylläpito', sv: 'Underhåll', en: 'Maintenance' },
        title: { fi: 'Päivittäinen pintojen pyyhintä keittiössä', sv: 'Daglig avtorkning i kök', en: 'Daily kitchen counter sanitization' },
        details: { fi: 'Pyyhi ruoanlaittotasot ja tiskiallas heti käytön jälkeen.', sv: 'Torka bänkar och diskho efter matlagning.', en: 'Wipe cooking surfaces and sink basin right after meal prep.' },
        tools: { fi: 'Mikrokuituliina, neutraali keittiösuihke', sv: 'Trasa, milt köksspray', en: 'Microfiber cloth, mild kitchen spray' },
      },
      {
        id: 'chk-w2',
        category: { fi: 'Ylläpito', sv: 'Underhåll', en: 'Maintenance' },
        title: { fi: 'Eteisen ja keittiön imurointi 1–2 krt viikossa', sv: 'Dammsug hall och kök 1–2 ggr/vecka', en: 'High-traffic vacuuming 1–2 times weekly' },
        details: { fi: 'Imuroi hiekka ja karvat ennen kuin ne kulkeutuvat olohuoneen matoille.', sv: 'Fånga grus och päls innan det sprids till mattor.', en: 'Catch outdoor sand and debris before it migrates onto wool carpets.' },
        tools: { fi: 'Imuri tai varsi-imuri', sv: 'Dammsugare', en: 'HEPA stick or canister vacuum' },
      },
      {
        id: 'chk-w3',
        category: { fi: 'Perussiivous', sv: 'Grundstädning', en: 'Standard Clean' },
        title: { fi: 'Kylpyhuoneen desinfiointi ja pesualtaan pesu', sv: 'Badrumsdesinfektion och handfat', en: 'Bathroom basin & toilet disinfection' },
        details: { fi: 'Pese allas, hana ja WC-pönttö joka toinen viikko kalkin estämiseksi.', sv: 'Gör rent handfat, blandare och toalett.', en: 'Scrub washbasin, mixer taps and bowl bi-weekly to inhibit scale buildup.' },
        tools: { fi: 'Saniteettipuhdistusaine, WC-harja, sieni', sv: 'Sanitetsrengöring, toalettborste', en: 'Sanitary cleaner, bowl brush, non-scratch sponge' },
      },
    ],
    faqs: [
      {
        question: {
          fi: 'Voinko muuttaa siivousväliä joustavasti tarpeen mukaan?',
          sv: 'Kan jag ändra städintervall flexibelt?',
          en: 'Can I adjust my cleaning frequency flexibly?',
        },
        answer: {
          fi: 'Kyllä, Siisti360 sopimukset ovat täysin joustavia ilman määräaikaisuutta. Voit tauottaa siivouksen loman ajaksi tai tihentää käyntejä esimerkiksi joulun tai kevään juhlien alla ilman lisäkuluja.',
          sv: 'Ja, våra abonnemang har ingen bindningstid. Du kan pausa under semestern eller lägga till extra besök inför helger utan straffavgifter.',
          en: 'Yes, Siisti360 contracts are month-to-month with zero lock-in period. You can pause during holidays or add extra visits before family gatherings at standard subscription rates.',
        },
      },
    ],
    relatedServiceId: 'kotisiivous',
    relatedServiceCta: {
      title: {
        fi: 'Aloita säännöllinen kotisiivous alkaen 39,90 € / h',
        sv: 'Börja med regelbunden hemstädning från 39,90 €/h',
        en: 'Start recurring home cleaning from 39,90 €/h',
      },
      subtitle: {
        fi: 'Saat oman vakiosiivoojan ja kotitalousvähennyksen (60 %). Kokeile ilman sitoutumispakkoa.',
        sv: 'Få din egen fasta städare och 60 % hushållsavdrag. Testa utan bindningstid.',
        en: 'Enjoy your own dedicated cleaner and 60% tax rebate. Try risk-free with zero long-term commitment.',
      },
      buttonText: {
        fi: 'Laske kotisiivouksen hinta ja kokeile',
        sv: 'Beräkna pris och prova på',
        en: 'Calculate Quote & Try Today',
      },
    },
  },
  'toimistosiivouksen-suunnittelu': {
    id: 'toimistosiivouksen-suunnittelu',
    slugs: {
      fi: 'toimistosiivouksen-suunnittelu',
      sv: 'planera-kontorsstadning',
      en: 'planning-office-cleaning',
    },
    titles: {
      fi: 'Toimistosiivouksen suunnittelu, hygienia ja työviihtyvyyden optimointi',
      sv: 'Planera kontorsstädning: Arbetsmiljö och hygien i fokus',
      en: 'Office Cleaning Planning: Hygiene, SLA & Workplace Well-Being',
    },
    searchIntent: 'commercial',
    searchIntentLabel: {
      fi: 'Kaupallinen tutkiva hakuaie (B2B Toimistopalvelut & Sopimusvertailu)',
      sv: 'Kommersiell sökavsikt (B2B Kontorstjänster & Avtalsjämförelse)',
      en: 'Commercial Investigation (B2B Office Cleaning & SLA Comparison)',
    },
    targetAudience: {
      fi: 'Toimistopäälliköt, kiinteistövastaavat ja yritysjohdon edustajat',
      sv: 'Kontorschefer, fastighetsansvariga och företagsledare',
      en: 'Office managers, facility managers, and business operations directors',
    },
    author: {
      name: 'Laura Virtanen',
      role: {
        fi: 'Puhtausalan erikoisammattitutkinto & vastaava työnohjaaja',
        sv: 'Städledare & certifierad hygienexpert',
        en: 'Certified Cleaning Supervisor & Hygiene Specialist',
      },
      date: '2026-10-05',
      reviewer: {
        fi: 'Tarkistanut Siisti360 laadunvarmistustiimi 6.11.2026',
        sv: 'Granskad av Siisti360 kvalitetsteam 6.11.2026',
        en: 'Reviewed by Siisti360 Quality Assurance on Nov 6, 2026',
      },
    },
    wordCount: 1350,
    readTime: {
      fi: '5 min lukuaika',
      sv: '5 min lästid',
      en: '5 min read',
    },
    summary: {
      fi: 'Puhdas ja raikas toimisto vähentää todistetusti työntekijöiden sairauspoissaoloja ja luo ensiluokkaisen vaikutelman asiakkaille. Tämä B2B-opas opastaa palvelutasosopimuksen (SLA) laadintaan ja kosketuspintojen hygieniasuunnitteluun.',
      sv: 'Ett rent kontor minskar sjukfrånvaro och ger ett professionellt intryck på kunder och besökare. Denna B2B-guide visar hur du bygger en effektiv städplan och SLA.',
      en: 'A pristine office objectively curtails airborne illness transmission and projects authority to visiting clients. This B2B guide covers Service Level Agreements (SLA) and hygiene protocols.',
    },
    keyTakeaways: {
      fi: [
        'Kosketuspinnat (ovenkahvat, hissinapit, kahvikoneet) vaativat päivittäisen desinfioinnin flunssakausina.',
        'Työskentelyaikojen sovitus: siivous toteutetaan joko aamulla ennen klo 8.00 tai iltapäivällä klo 16.00 jälkeen.',
        'Selkeä laatupoikkeamien raportointi ja nimetty yhteyshenkilö takaavat sujuvan yhteistyön.',
        'B2B-siivous on 100 % verovähennyskelpoinen yritystoiminnan kulu.',
      ],
      sv: [
        'Kontaktytor (handtag, knappar, kaffemaskiner) kräver daglig avtorkning under förkylningstider.',
        'Flexibla tider: städning före kl. 08:00 eller efter kl. 16:00 för att inte störa arbetsron.',
        'Dedikerad kontaktperson och kvalitetsronder säkrar jämn hög standard.',
        'Företagsstädning är fullt avdragsgill i näringsverksamheten.',
      ],
      en: [
        'High-touch vectors (door hardware, elevator buttons, coffee machines) require daily disinfection during peak flu months.',
        'Discreet scheduling: cleanings occur before 8:00 AM or after 4:00 PM without interrupting team workflows.',
        'A single designated service manager with swift deviation resolution prevents operational friction.',
        'Commercial office cleaning expenses are 100% tax-deductible for registered businesses.',
      ],
    },
    toc: [
      { id: 'hygienia', title: { fi: '1. Työpaikan kosketuspintahygienia', sv: '1. Kontakthygién på arbetsplatsen', en: '1. Workplace Touchpoint Hygiene' } },
      { id: 'sla', title: { fi: '2. Palvelutasosopimus (SLA) ja laadunvalvonta', sv: '2. Serviceavtal (SLA) och uppföljning', en: '2. Service Level Agreement (SLA)' } },
      { id: 'aikataulutus', title: { fi: '3. Aikataulutus ilman työn häirintää', sv: '3. Diskret schema och tider', en: '3. Scheduling Without Workflow Friction' } },
      { id: 'interaktiivinen-lista', title: { fi: '4. Toimiston tarkistuslista', sv: '4. Kontorets checklista', en: '4. Office Inspection Checklist' } },
    ],
    introLead: {
      fi: 'Toimistotilojen puhtaus ei ole vain ulkonäkökysymys, vaan suora investointi työntekijöiden terveyteen ja tuottavuuteen. Nykyaikainen hybridityö vaatii joustavaa siivoussuunnitelmaa, joka mukautuu toimiston todellisiin käyttäjämääriin.',
      sv: 'Renlighet på arbetsplatsen påverkar direkt medarbetarnas hälsa och trivsel. Med hybridarbete behövs städtjänster som flexibelt anpassas efter kontorets faktiska beläggning.',
      en: 'Workplace hygiene is an operational investment in team wellness and talent retention. Hybrid workplace dynamics require agile janitorial contracts that flex around office traffic.',
    },
    sections: [
      {
        id: 'hygienia',
        h2: {
          fi: '1. Työpaikan kosketuspintahygienia ja mikrobien leviäminen',
          sv: '1. Kontakthygien och minskad smittspridning',
          en: '1. Touchpoint Protocols & Pathogen Transmission Suppression',
        },
        paragraphs: {
          fi: [
            'Tutkimusten mukaan tyypillinen toimiston näppäimistö ja neuvotteluhuoneen kaukosäädin voivat sisältää jopa enemmän bakteereja kuin WC-istuin, mikäli niitä ei puhdisteta säännöllisesti.',
            'Painotamme mikrokuitupyyhintää yhdistettynä alkoholivapaisiin desinfiointiaineisiin, jotka tuhoavat 99,9 % taudinaiheuttajista vahingoittamatta näyttöjä tai elektroniikkaa.',
          ],
          sv: [
            'Tangentbord och fjärrkontroller kan samla enorma mängder bakterier utan regelbunden rengöring.',
            'Vi använder modern mikrofiberteknik och elektronikvänliga desinfektionsmedel.',
          ],
          en: [
            'Surveys confirm office keyboards and presentation remotes host multiple times the bacterial count of lavatory surfaces when unmonitored.',
            'We deploy dedicated microfiber protocols paired with residue-free sanitizers safe for sensitive AV equipment.',
          ],
        },
      },
      {
        id: 'sla',
        h2: {
          fi: '2. Selkeä palvelutasosopimus (SLA) ja nopea reagointiaika',
          sv: '2. Tydligt serviceavtal (SLA) och snabb respons',
          en: '2. SLA Frameworks, Audits & Guaranteed Response Speeds',
        },
        paragraphs: {
          fi: [
            'Hyvässä toimistosiivoussopimuksessa jokaiselle tilalle määritellään tarkka puhtaustaso ja toimenpiteet: mitkä tilat siivotaan päivittäin (keittiö, WC, jätteet) ja mitkä viikoittain (mattojen imurointi, lasipinnat).',
            'Siisti360 nimeää jokaiselle yritysasiakkaalle oman palveluohjaajan, joka suorittaa kuukausittaiset laadunvarmistuskatselmukset.',
          ],
          sv: [
            'I ett genomtänkt avtal definieras dagliga och veckovisa moment i detalj.',
            'En dedikerad arbetsledare genomför regelbundna kvalitetskontroller.',
          ],
          en: [
            'A sound commercial agreement itemizes daily duties (waste removal, breakrooms, WCs) vs periodic duties (carpet extractions, partition glazing).',
            'Siisti360 assigns a dedicated area supervisor conducting recurring audit walks with direct digital reporting.',
          ],
        },
      },
    ],
    interactiveChecklist: [
      {
        id: 'chk-o1',
        category: { fi: 'Keittiö & Taukotila', sv: 'Pentry & Pausrum', en: 'Kitchen & Pantry' },
        title: { fi: 'Tiskikoneen tyhjennys ja tiskipöydän desinfiointi', sv: 'Töm diskmaskin och sprita diskbänk', en: 'Dishwasher cycling & counter sanitization' },
        details: { fi: 'Tiskikoneen käynnistys/tyhjennys, kahvinkeittimen ja mikron pyyhintä.', sv: 'Töm maskin, torka kaffestation och mikro.', en: 'Run/empty dishwasher, sanitize espresso stations and microwave cavities.' },
        tools: { fi: 'Elintarviketurvallinen puhdistusaine, mikrokuituliina', sv: 'Livsmedelssäkert medel, trasa', en: 'Food-contact sanitizer, clean microfiber' },
      },
      {
        id: 'chk-o2',
        category: { fi: 'Neuvottelutilat', sv: 'Mötesrum', en: 'Conference Rooms' },
        title: { fi: 'Neuvottelupöytien ja kosketuspintojen pyyhintä', sv: 'Torka mötesbord och teknik', en: 'Conference table & AV wipe down' },
        details: { fi: 'Pöytien pyyhintä, tuolien järjestely, valkotaulujen pyyhintä ja jätteiden tyhjennys.', sv: 'Ställ i ordning stolar, torka bord och töm papperskorgar.', en: 'Disinfect conference tables, align seating, erase whiteboards, empty bins.' },
        tools: { fi: 'Neutraali yleispesuaine, antistaattinen liina', sv: 'Allrengöring, trasa', en: 'Neutral surface spray, anti-static cloths' },
      },
    ],
    faqs: [
      {
        question: {
          fi: 'Mihin kellonaikoihin toimistosiivous voidaan suorittaa?',
          sv: 'Vilka tider kan kontorsstädningen utföras?',
          en: 'What hours are available for commercial office cleaning?',
        },
        answer: {
          fi: 'Siivoamme yritysten toiveiden mukaan joko aikaisin aamulla ennen klo 8, työpäivän aikana hiljaisella äänitasolla tai iltaisin ja viikonloppuisin.',
          sv: 'Vi anpassar oss efter era önskemål: tidig morgon före kl. 08, diskret under dagen eller kvällar och helger.',
          en: 'We adapt completely to your team cadence: early mornings prior to 8 AM, quiet mid-day servicing, or evening and weekend sessions.',
        },
      },
    ],
    relatedServiceId: 'toimistosiivous',
    relatedServiceCta: {
      title: {
        fi: 'Pyydä räätälöity tarjous yrityksesi toimitiloihin',
        sv: 'Begär skräddarsydd offert för ert kontor',
        en: 'Request a Tailored Office Cleaning Proposal',
      },
      subtitle: {
        fi: 'Teemme maksuttoman katselmuksen kohteessanne Helsingissä, Espoossa tai Vantaalla ja laadimme tarkan SLA-ehdotuksen.',
        sv: 'Vi gör ett kostnadsfritt besök i era lokaler och tar fram en tydlig offert med fast månadskostnad.',
        en: 'We conduct a complimentary walkthrough in Helsinki, Espoo or Vantaa and deliver a fixed-rate SLA proposal.',
      },
      buttonText: {
        fi: 'Pyydä yritystarjous 24h sisällä',
        sv: 'Få företagsförslag inom 24h',
        en: 'Get Office Quote Within 24h',
      },
    },
  },
  'sohvan-ja-maton-puhdistus': {
    id: 'sohvan-ja-maton-puhdistus',
    slugs: {
      fi: 'sohvan-ja-maton-puhdistus',
      sv: 'rengoring-av-soffa-och-matta',
      en: 'sofa-and-carpet-cleaning',
    },
    titles: {
      fi: 'Sohvan ja maton tekstiilipesun kattava opas: Tahranpoisto ja hoito',
      sv: 'Guide för rengöring av soffor och mattor: Fläckborttagning och textilvård',
      en: 'Upholstery & Carpet Extraction Cleaning: Stain Guide & Fabric Care',
    },
    searchIntent: 'informational',
    searchIntentLabel: {
      fi: 'Informatiivinen hakuaie (Tekstiilien hoito-opas & Tahranpoisto)',
      sv: 'Informativ sökavsikt (Textilvård & Fläckguide)',
      en: 'Informational Intent (Fabric Maintenance & Stain Removal)',
    },
    targetAudience: {
      fi: 'Kotitaloudet, joissa on arkoja kangassohvia, villamattoja tai lemmikkieläinten tahroja',
      sv: 'Hem med tygsoffor, ullmattor och fläckar från vardag eller husdjur',
      en: 'Homeowners with delicate upholstery, wool rugs, or pet stain accidents',
    },
    author: {
      name: 'Laura Virtanen',
      role: {
        fi: 'Puhtausalan erikoisammattitutkinto & vastaava työnohjaaja',
        sv: 'Städledare & certifierad hygienexpert',
        en: 'Certified Cleaning Supervisor & Hygiene Specialist',
      },
      date: '2026-09-28',
      reviewer: {
        fi: 'Tarkistanut Siisti360 laadunvarmistustiimi 6.11.2026',
        sv: 'Granskad av Siisti360 kvalitetsteam 6.11.2026',
        en: 'Reviewed by Siisti360 Quality Assurance on Nov 6, 2026',
      },
    },
    wordCount: 1180,
    readTime: {
      fi: '4 min lukuaika',
      sv: '4 min lästid',
      en: '4 min read',
    },
    summary: {
      fi: 'Tekstiilipintojen syväpuhdistus poistaa kankaan kuituihin imeytyneen rasvan, hien ja pölypunkit. Oikea puhdistustekniikka riippuu kankaan hoitomerkinnästä ja kuitutyypistä (luonnonkuitu vs. synteettinen).',
      sv: 'Djuprengöring av soffor och mattor avlägsnar ingrodd smuts, fett och allergener. Rätt metod förhindrar att fibrerna tar skada.',
      en: 'Deep upholstery extraction removes absorbed sebum, dust mites, and odors without over-saturating underlying foam paddings.',
    },
    keyTakeaways: {
      fi: [
        'Tarkista aina kankaan hoitomerkintä: W (vesipesu), S (liuotinpesu), WS (molemmat) tai X (vain imurointi).',
        'Älä koskaan hankaa tuoretta kahvi- tai punaviinitahraa; taputtele nestettä puhtaalla imukykyisellä liinalla.',
        'Ammattimainen vesi-imuri (painehuuhtelukone) ruiskuttaa pesuaineliuoksen ja imee sen samanaikaisesti pois jättäen kankaan vain lievästi kosteaksi.',
        'Kuivumisaika on n. 4–8 tuntia huoneen lämpötilasta ja ilmanvaihdosta riippuen.',
      ],
      sv: [
        'Kolla alltid märketiketten: W (vatten), S (lösningsmedel), WS (båda) eller X (endast dammsugning).',
        'Gnugga aldrig färska fläckar; badda försiktigt utifrån och in.',
        'Textilvårdsmaskin sprutar in rengöringsvätska och suger upp smutsvattnet omedelbart.',
        'Torktid ca 4–8 timmar i god ventilation.',
      ],
      en: [
        'Always verify fabric tag codes: W (water-based), S (solvents only), WS (either), or X (vacuum only).',
        'Never rub an active red wine or coffee spill; blot inward with lint-free towels.',
        'Professional hot water extraction injects detergent and suctions out suspended soils instantaneously.',
        'Drying timeframe spans approximately 4–8 hours under normal domestic ventilation.',
      ],
    },
    toc: [
      { id: 'koodit', title: { fi: '1. Kankaiden hoitomerkinnät (W, S, WS, X)', sv: '1. Tygkoder (W, S, WS, X)', en: '1. Fabric Codes Decoded (W, S, WS, X)' } },
      { id: 'painehuuhtelu', title: { fi: '2. Painehuuhtelulaitteen toimintaperiaate', sv: '2. Så fungerar textilvårdsmaskinen', en: '2. How Injection-Extraction Works' } },
      { id: 'tahranpoisto', title: { fi: '3. Yleisimpien tahrojen ensiapu', sv: '3. Första hjälpen mot fläckar', en: '3. Spotting Guide for Common Spills' } },
      { id: 'interaktiivinen-lista', title: { fi: '4. Tekstiilihoidon tarkistuslista', sv: '4. Textilvårdens checklista', en: '4. Fabric Care Checklist' } },
    ],
    introLead: {
      fi: 'Kangasverhoillut kalusteet ja villamatot keräävät vuosien saatossa valtavan määrän ihorasvaa, lemmikkien hilsettä ja huonepölyä. Perusteellinen vesi-imuripesu palauttaa värien kirkkauden ja raikkaan tuoksun.',
      sv: 'Tygsoffor och mattor suger åt sig damm, hudfett och spill. Djuprengöring med extraktionsmaskin återställer färg och fräschör på djupet.',
      en: 'Fabric-upholstered furnishings and wool rugs act as dust sinks over years of use. Deep extraction revives original vibrance and neutralizes stubborn odors.',
    },
    sections: [
      {
        id: 'koodit',
        h2: {
          fi: '1. Kankaiden hoitomerkinnät: Valitse turvallinen pesutapa',
          sv: '1. Skötselkoder på tyg: Välj säker metod',
          en: '1. Textile Care Codes: Choosing the Safe Chemistry',
        },
        paragraphs: {
          fi: [
            'Ennen minkään nesteen levittämistä sohvan tai nojatuolin kankaaseen, etsi verhoilun tyynyjen alta tai rungon alareunasta hoitolappu.',
            'Koodi W tarkoittaa, että vesipohjainen tekstiilipesu on turvallinen. Koodi S vaatii vedettömän kuivapesun tai liuottimen. Koodi X sallii ainoastaan hellävaraisen harjauksen ja imuroinnin.',
          ],
          sv: [
            'Hitta tygets skötseletikett innan du använder vätskor på dynor och stomme.',
            'Kod W tål vattenbaserad tvätt. Kod S kräver kemtvätt. Kod X tillåter endast torrborstning och dammsugning.',
          ],
          en: [
            'Locate the manufacturer care tag beneath seat cushions or along base frames before applying moisture.',
            'Code W permits water-based extraction. Code S demands dry-cleaning solvents. Code X restricts care strictly to dry brushing and suction.',
          ],
        },
      },
    ],
    interactiveChecklist: [
      {
        id: 'chk-t1',
        category: { fi: 'Ensiapu', sv: 'Första hjälp', en: 'First Response' },
        title: { fi: 'Tuoreen nesteen imeyttäminen ilman hankausta', sv: 'Badda upp färsk vätska utan att gnugga', en: 'Blot spill immediately without rubbing' },
        details: { fi: 'Aseta talouspaperi tai puhdas mikrokuituliina tahran päälle ja paina kevyesti.', sv: 'Lägg papper eller duk på fläcken och tryck lätt.', en: 'Place absorbent paper or clean towel directly over liquid and apply gentle pressure.' },
        tools: { fi: 'Talouspaperi tai kuiva mikrokuituliina', sv: 'Papper eller mikrofiberduk', en: 'Paper towels, un-dyed microfiber' },
      },
      {
        id: 'chk-t2',
        category: { fi: 'Syväpuhdistus', sv: 'Djuprengöring', en: 'Deep Extraction' },
        title: { fi: 'Koko verhoilun tasainen vesi-imurointi', sv: 'Jämn textilvård av hela möbeln', en: 'Uniform wet extraction across the entire panel' },
        details: { fi: 'Pese aina koko tyyny tai istuinosa kerralla, jotta kankaaseen ei jää vesirajoja.', sv: 'Tvätta hela dynan för att undvika fuktringar.', en: 'Always treat the entire cushion or seam-to-seam panel to eliminate watermark rings.' },
        tools: { fi: 'Tekstiilipesuri, tekstiilipesuaine, lämmin vesi', sv: 'Textiltvättmaskin, medel, varmvatten', en: 'Extraction machine, enzyme textile wash, lukewarm water' },
      },
    ],
    faqs: [
      {
        question: {
          fi: 'Kauanko sohva kuivuu pesun jälkeen?',
          sv: 'Hur lång tid tar det för soffan att torka?',
          en: 'How long until the sofa is completely dry?',
        },
        answer: {
          fi: 'Ammattimaisella laitteella vesi imetään tehokkaasti pois, joten kangas kuivuu yleensä 4–8 tunnissa huonelämmössä. Tehostamme kuivumista huolehtimalla hyvästä ilmanvaihdosta.',
          sv: 'Med vår proffsmaskin sugs det mesta vattnet ut, så tyget torkar på ca 4–8 timmar i rumstemperatur.',
          en: 'Industrial dual-motor extraction removes over 85% of applied moisture; typical drying requires 4–8 hours under ambient air conditioning.',
        },
      },
    ],
    relatedServiceId: 'sohvan-puhdistus',
    relatedServiceCta: {
      title: {
        fi: 'Tilaa ammattimainen sohvan tai maton pesu kotiisi',
        sv: 'Boka professionell sofftvätt eller mattvätt hemma',
        en: 'Book Professional In-Home Upholstery Extraction',
      },
      subtitle: {
        fi: 'Tuomme ammattilaistason tekstiilipesurin ja hellävaraiset, tehokkaat aineet suoraan luoksesi.',
        sv: 'Vi tar med professionell textilvårdsmaskin och skonsamma, allergivänliga rengöringsmedel.',
        en: 'We arrive with commercial-grade injection extractors and hypoallergenic fabric conditioners.',
      },
      buttonText: {
        fi: 'Varaa sohvan tai maton pesu',
        sv: 'Boka möbeltvätt',
        en: 'Book Upholstery Cleaning',
      },
    },
  },
};
