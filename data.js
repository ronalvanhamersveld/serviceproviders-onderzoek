/*
  GEGEVENS VAN DE PAGINA
  ----------------------
  Dit is het enige bestand dat je hoeft aan te passen om de pagina bij te werken.
  - Pas alleen de tekst tussen de aanhalingstekens en de getallen aan.
  - Laat komma's, haakjes en accolades staan.
  - Datums altijd als "JJJJ-MM-DD", bijvoorbeeld "2026-12-19".
  - Zolang voorbeeld op true staat, toont de pagina bovenaan een gele balk
    met de tekst van voorbeeldTekst. Zet voorbeeld op false als alles klopt.
*/
window.ONDERZOEK = {
  voorbeeld: true,
  voorbeeldTekst: "Voorbeeldversie: welke meting nu open is, de sluitdatum, de stand per markt, de link naar de vragenlijst en de voorbereidingslink zijn nog niet echt.",

  naam: "Serviceproviders-onderzoek",
  editie: "2026 · meting 3",
  ondertitel:
    "Beoordeel in ongeveer 8 minuten de serviceproviders en franchiseorganisaties waar je mee werkt. Je ontvangt een samenvatting van de belangrijkste uitkomsten en helpt de partijen waarmee je samenwerkt hun dienstverlening te verbeteren.",

  // Link naar de vragenlijst van de huidige meting (Crowdtech).
  vragenlijstUrl: "#vragenlijst-link-volgt",
  // Gemeten mediaan 2026: meting 1 9,1 minuten, meting 2 6,2 minuten.
  duurMinuten: 8,
  sluitdatum: "2026-12-19",
  resultatenBekend: "begin 2027",
  laatstBijgewerkt: "2026-11-20",

  // De metingen van dit jaar. status: "afgerond", "open" of "gepland".
  metingen: [
    { naam: "Meting 1", periode: "voorjaar", thema: "Binnendienst en acceptatie", status: "afgerond" },
    { naam: "Meting 2", periode: "zomer", thema: "Marktgerichtheid", status: "afgerond" },
    { naam: "Meting 3", periode: "najaar", thema: "Bedrijfsvoering", status: "open" }
  ],
  metingenIntro: "Vanaf 2026 drie metingen, elk met een eigen thema. Per markt wordt de best beoordeelde serviceprovider bekendgemaakt.",

  // Respons per markt voor de huidige meting: doel = aantal beoordelingen
  // dat we nodig hebben, huidig = aantal dat nu binnen is. Wekelijks bijwerken.
  productgroepen: [
    { naam: "Hypotheken", doel: 300, huidig: 205 },
    { naam: "Consumptief krediet", doel: 80, huidig: 31 },
    { naam: "Particuliere schade", doel: 250, huidig: 168 },
    { naam: "Zakelijke schade", doel: 200, huidig: 92 },
    { naam: "Franchise (hypotheken en verzekeren)", doel: 100, huidig: 44 }
  ],

  // Voorbereidingslink: adviseurs vullen één keer hun kantoorgegevens in,
  // zodat ze die niet bij elke meting opnieuw hoeven in te vullen.
  // Laat url leeg ("") om het blok te verbergen.
  voorbereiding: {
    url: "#voorbereiding-link-volgt",
    besparing: "1½ à 2 minuten",
    kop: "Eén DFO-profiel, daarna sneller door elke meting",
    tekst: "Vul één keer per jaar je kantoorgegevens in, zoals de grootte van je kantoor, je regio en de markten waarin je adviseert. Dat kost ongeveer 6 minuten. Bij elke volgende meting slaan we die vragen over en beoordeel je direct de serviceproviders. Dat scheelt ongeveer 1½ à 2 minuten per meting, ook als je meedoet aan het Performance-onderzoek.",
    stappen: [
      "Vul eenmalig je kantoorgegevens in (ongeveer 6 minuten)",
      "Je krijgt bij elke meting een persoonlijke link",
      "Je beoordeelt direct de serviceproviders waar je mee werkt"
    ],
    knop: "Vul je gegevens alvast in"
  },

  // Kerncijfers bovenaan de pagina.
  kerncijfers: [
    { waarde: "1.850+", label: "beoordelingen in 2026 tot nu toe" },
    { waarde: "40", label: "serviceproviders en franchiseorganisaties beoordeeld" },
    { waarde: "3", label: "metingen per jaar" }
  ],

  // Wat respondenten eraan hebben.
  opbrengst: [
    {
      titel: "Je ontvangt een samenvatting",
      tekst: "Na de meting krijg je een samenvatting van de belangrijkste uitkomsten per markt. Zo weet je hoe de serviceproviders ervoor staan."
    },
    {
      titel: "Je helpt jouw serviceprovider verbeteren",
      tekst: "De partijen waarmee je samenwerkt zien wat adviseurs van hun dienstverlening vinden en waar het beter kan. Jouw oordeel helpt ze dat te verbeteren."
    },
    {
      titel: "Jouw stem bepaalt de uitkomst",
      tekst: "De scores en de best beoordeelde serviceproviders per markt volgen rechtstreeks uit de beoordelingen van financieel adviseurs."
    },
    {
      titel: "8 minuten en anoniem",
      tekst: "Je beoordeelt alleen de serviceproviders waar je mee werkt. Je antwoorden zijn nooit naar jou of je kantoor te herleiden."
    }
  ],

  /* ------------------------------------------------------------------
     BEWAARD VOOR LATER: teksten voor een pagina voor serviceproviders.
     Deze worden op de huidige pagina NIET getoond.
     ------------------------------------------------------------------ */
  aanbieders: {
    kop: "Weet hoe adviseurs uw dienstverlening beoordelen",
    intro: "Het Serviceproviders-onderzoek laat per markt zien hoe financieel adviseurs uw organisatie beoordelen en hoe u scoort ten opzichte van de markt.",
    voordelen: [
      { titel: "Eigen rapport per markt", tekst: "Uw scores op de aspecten van elke meting, naast het gemiddelde van de markt." },
      { titel: "Uw NPS bij het intermediair", tekst: "Hoe waarschijnlijk het is dat adviseurs u aanbevelen, en hoe dat zich over de metingen ontwikkelt." },
      { titel: "Wat adviseurs belangrijk vinden", tekst: "Per aspect het belang en de waardering, zodat u ziet waar verbeteren het meeste oplevert." },
      { titel: "Zichtbaar bij adviseurs", tekst: "Uw naam bij de gratis vakpaper die naar de deelnemende adviseurs gaat." }
    ],
    bewijs: {
      cijfer: "Meting 2, 2026",
      tekst: "Meedenken met het kantoor hangt het sterkst samen met de bereidheid van adviseurs om een serviceprovider aan te bevelen."
    },
    pakketten: [
      { naam: "Rapport per meting", tekst: "Het rapport van één meting voor de markten waarin u actief bent.", prijs: "Prijs op aanvraag", aanbevolen: false },
      { naam: "Compleet pakket 2026", tekst: "De rapporten van meting 1, 2 en 3.", prijs: "Prijs op aanvraag", aanbevolen: true }
    ],
    aanvraagUrl: "mailto:info@dfobv.nl?subject=Aanvraag%20rapport%20Serviceproviders-onderzoek%202026",
    contact: { naam: "Bureau DFO", telefoon: "033 – 258 04 60", email: "info@dfobv.nl" }
  },

  // Eerdere resultaten. Nieuwste bovenaan.
  // Bron: persberichten en vakpapers van Bureau DFO (openbaar).
  // top3 is optioneel: de 2e en 3e plaats. Alleen invullen uit de samenvattingen voor adviseurs.
  // samenvattingUrl: vul hier de downloadlink in. Leeg = geen knop.
  // noot is optioneel: een korte zin, alleen getoond als er geen downloadlink is.
  vorigeJaren: [
    {
      jaar: "2026 · meting 2",
      kerncijfers: [
        { waarde: "1.018", label: "beoordelingen door advieskantoren" },
        { waarde: "40", label: "serviceproviders en franchiseorganisaties" }
      ],
      // Link naar de samenvatting (pdf of webpagina). Leeg laten = geen downloadknop.
      samenvattingUrl: "",
      noot: "De samenvatting van deze meting volgt binnenkort.",
      kernbevinding:
        "Meedenken met het kantoor bepaalt hoe adviseurs een serviceprovider waarderen en of ze die aanbevelen. Op alle acht aspecten van marktgerichtheid blijft de waardering achter bij wat adviseurs belangrijk vinden; bij meedenken is het verschil het grootst.",
      links: [
        { tekst: "Lees het persbericht", url: "https://www2.dfobv.nl/assets/files/persbericht-bureau-dfo-meedenken-met-kantoor-bepaalt-waardering-serviceproviders.pdf" }
      ],
      winnaarsTitel: "Best beoordeeld op marktgerichtheid",
      winnaars: [
        { productgroep: "Hypotheken (groot)", winnaar: "VCN Hypotheken" },
        { productgroep: "Particuliere schade (groot)", winnaar: "Turien & Co." },
        { productgroep: "Particuliere schade (klein)", winnaar: "certe assuradeuren" },
        { productgroep: "Zakelijke schade (groot)", winnaar: "SUREbusiness" },
        { productgroep: "Zakelijke schade (klein)", winnaar: "certe assuradeuren" },
        { productgroep: "Franchise", winnaar: "Financieel Fit" }
      ]
    },
    {
      jaar: "2026 · meting 1",
      kerncijfers: [
        { waarde: "850", label: "beoordelingen, ongeveer" },
        { waarde: "264", label: "advieskantoren deden mee" }
      ],
      samenvattingUrl: "https://www.dfobv.nl/wp-content/uploads/2026/06/Vakpaper-Serviceproviders-2026-meting-1.pdf",
      kernbevinding:
        "Bereikbaarheid van de binnendienst en de doorlooptijd van de acceptatie bepalen het meest hoe adviseurs hun serviceprovider waarderen. Een kantoor werkt per markt meestal met één vaste serviceprovider, die het grootste deel van de omzet krijgt.",
      links: [
        { tekst: "Zo schreef VVP erover", url: "https://www.vvponline.nl/nieuws/dikke-voldoende-voor-serviceproviders" }
      ],
      winnaarsTitel: "Best beoordeeld op binnendienst en acceptatie",
      winnaars: [
        { productgroep: "Hypotheken (groot)", winnaar: "VCN Hypotheken" },
        { productgroep: "Consumptief krediet", winnaar: "VCN Kredieten" },
        { productgroep: "Particuliere schade (groot)", winnaar: "VCN Verzekeringen" },
        { productgroep: "Particuliere schade (klein)", winnaar: "certe assuradeuren" },
        { productgroep: "Zakelijke schade (groot)", winnaar: "SUREbusiness" },
        { productgroep: "Zakelijke schade (klein)", winnaar: "certe assuradeuren" },
        { productgroep: "Franchise", winnaar: "Financieel Fit" }
      ]
    },
    {
      jaar: "2025",
      kerncijfers: [
        { waarde: "2.106", label: "beoordelingen door advieskantoren" },
        { waarde: "2,8", label: "serviceproviders per kantoor, gemiddeld" }
      ],
      samenvattingUrl: "https://www.dfobv.nl/product/gratis-vakpaper-serviceproviders-onderzoek-2025/",
      kernbevinding:
        "Serviceproviders ontwikkelen zich van leverancier naar partner van het advieskantoor. Bijna een derde van de kantoren ziet een positief effect op het rendement van het kantoor.",
      links: [
        { tekst: "Zo schreef VVP erover", url: "https://www.vvponline.nl/nieuws/hoogst-gewaardeerde-serviceproviders-van-2025" }
      ],
      winnaarsTitel: "Best beoordeeld in 2025",
      winnaars: [
        { productgroep: "Hypotheken (groot)", winnaar: "VCN Hypotheken" },
        { productgroep: "Hypotheken (klein)", winnaar: "LNI" },
        { productgroep: "Franchise hypotheken", winnaar: "Financieel Fit" },
        { productgroep: "Consumptief krediet", winnaar: "De Kredietmakelaar" },
        { productgroep: "Particuliere schade (groot)", winnaar: "VCN Verzekeringen" },
        { productgroep: "Particuliere schade (klein)", winnaar: "certe assuradeuren" },
        { productgroep: "Zakelijke schade (groot)", winnaar: "SUREbusiness" },
        { productgroep: "Zakelijke schade (klein)", winnaar: "certe assuradeuren" },
        { productgroep: "Inkomen (groot)", winnaar: "Felison" },
        { productgroep: "Inkomen (klein)", winnaar: "certe assuradeuren" }
      ]
    },
    {
      jaar: "2024",
      kerncijfers: [
        { waarde: "2.023", label: "beoordelingen door advieskantoren" },
        { waarde: "3,2", label: "serviceproviders per kantoor, gemiddeld" }
      ],
      samenvattingUrl: "https://www.dfobv.nl/product/gratis-vakpaper-serviceproviders-onderzoek-2024/",
      kernbevinding:
        "De markt van serviceproviders consolideert en de verschillen in dienstverlening zijn groot. 39% van de kantoren werkt het liefst met één serviceprovider.",
      links: [
        { tekst: "Zo schreef VVP erover", url: "https://www.vvponline.nl/nieuws/resultaten-dfo-onderzoek-serviceproviders-2024" }
      ],
      winnaarsTitel: "Best beoordeeld in 2024",
      winnaars: [
        { productgroep: "Hypotheken (groot)", winnaar: "VCN Hypotheken" },
        { productgroep: "Hypotheken (klein)", winnaar: "LNI" },
        { productgroep: "Franchise", winnaar: "Financieel Fit" },
        { productgroep: "Consumptief krediet", winnaar: "VCN Kredieten" },
        { productgroep: "Particuliere schade", winnaar: "BSB Volmachten" },
        { productgroep: "Zakelijke schade", winnaar: "BSB Volmachten" },
        { productgroep: "Inkomen", winnaar: "VCN Verzekeringen" }
      ]
    }
  ],

  // Wat er met de resultaten gebeurt.
  impact: {
    citaat:
      "Wie het kantoor begrijpt, meedenkt en vooruitkijkt, heeft de beste uitgangspositie om een grotere rol te spelen.",
    bron: "Jurjen Oosterbaan Martinius, directeur Bureau DFO (persbericht oktober 2026)",
    punten: [
      { titel: "Gratis vakpaper voor alle adviseurs", tekst: "Na elke meting delen we de uitkomsten in een vakpaper, aangeboden door de deelnemende serviceproviders.", link: "https://www.dfobv.nl/product/gratis-vakpaper-serviceproviders-onderzoek-2026/" },
      { titel: "Winnaars in beeld", tekst: "De best beoordeelde serviceproviders per markt worden bekendgemaakt en gaan aan de slag met hun uitkomsten.", link: "https://sp.dfobv.nl/" }
    ],
    // Artikelen in de vakpers over het onderzoek. Nieuwste bovenaan.
    // De eerste 4 staan direct op de pagina, de rest onder "Nog ... artikelen".
    vakpers: [
      { medium: "VVP", datum: "oktober 2026", titel: "Serviceproviders schieten tekort in aandacht voor advieskantoren", url: "https://www.vvponline.nl/nieuws/bureau-dfo-serviceproviders-schieten-tekort-in-aandacht-voor-advieskantoren" },
      { medium: "InFinance", datum: "oktober 2026", titel: "Adviseurs missen meedenkende houding bij serviceproviders", url: "https://infinance.nl/branche/adviseurs-missen-meedenkende-houding-bij-serviceproviders/" },
      { medium: "Schade Magazine", datum: "oktober 2026", titel: "Meedenken met een kantoor bepaalt de waardering voor serviceproviders", url: "https://schade-magazine.nl/nieuws/archief/2026/10/meedenken-met-een-kantoor-bepaalt-de-waardering-voor-serviceproviders/13260" },
      { medium: "VVP", datum: "juni 2026", titel: "Dikke voldoende voor serviceproviders", url: "https://www.vvponline.nl/nieuws/dikke-voldoende-voor-serviceproviders" },
      { medium: "InFinance", datum: "juni 2026", titel: "Bereikbaarheid en acceptatiesnelheid bepalend voor waardering serviceproviders", url: "https://infinance.nl/branche/bereikbaarheid-en-acceptatiesnelheid-bepalend-voor-waardering-serviceproviders/" },
      { medium: "Schade Magazine", datum: "juni 2026", titel: "Onderzoek naar serviceproviders: bereikbaarheid en snelheid cruciaal", url: "https://www.schade-magazine.nl/nieuws/archief/2026/06/onderzoek-naar-serviceproviders-bereikbaarheid-en-snelheid-cruciaal/12916" },
      { medium: "VVP", datum: "november 2025", titel: "Serviceproviders transformeren van leverancier naar partner financieel advieskantoor", url: "https://www.vvponline.nl/nieuws/serviceproviders-transformeren-van-leverancier-naar-partner-financieel-advieskantoor" },
      { medium: "InFinance", datum: "november 2025", titel: "Winnaars DFO Serviceprovideronderzoek", url: "https://infinance.nl/artikel/winnaars-dfo-serviceprovideronderzoek/" },
      { medium: "Schade Magazine", datum: "november 2025", titel: "Bureau DFO heeft jaarlijks onderzoek naar serviceproviders uitgebracht", url: "https://www.schade-magazine.nl/nieuws/archief/2025/11/bureau-dfo-heeft-jaarlijks-onderzoek-naar-serviceproviders-uitgebracht/12131" },
      { medium: "VVP", datum: "november 2024", titel: "Resultaten DFO-onderzoek Serviceproviders 2024", url: "https://www.vvponline.nl/nieuws/resultaten-dfo-onderzoek-serviceproviders-2024" },
      { medium: "Schade Magazine", datum: "november 2024", titel: "Consolidatie en grote verschillen in dienstverlening", url: "https://schade-magazine.nl/nieuws/archief/2024/11/dfo-onderzoek-2024-consolidatie-en-grote-verschillen-in-dienstverlening/11045" },
      { medium: "InFinance", datum: "november 2023", titel: "Hoogst gewaardeerde serviceproviders 2023", url: "https://infinance.nl/artikel/hoogst-gewaardeerde-serviceproviders-2023/" },
      { medium: "VVP", datum: "november 2023", titel: "Bureau DFO pleit voor intensievere samenwerking adviseurs en serviceproviders", url: "https://www.vvponline.nl/nieuws/bureau-dfo-pleit-voor-intensievere-samenwerking-adviseurs-en-serviceproviders" },
      { medium: "Schade Magazine", datum: "november 2023", titel: "Ontwikkelingen vragen om intensievere samenwerking", url: "https://www.schade-magazine.nl/nieuws/archief/2023/11/ontwikkelingen-vragen-om-intensievere-samenwerking/10113" },
      { medium: "VVP", datum: "oktober 2022", titel: "Hoogst gewaardeerde serviceproviders van 2022", url: "https://www.vvponline.nl/nieuws/hoogst-gewaardeerde-serviceproviders-van-2022" },
      { medium: "InFinance", datum: "oktober 2022", titel: "Hoogst gewaardeerde serviceproviders 2022", url: "https://infinance.nl/artikel/hoogst-gewaardeerde-serviceproviders-2022/" }
    ],
    // Berichten van serviceproviders zelf over hun resultaat.
    aanbiedersOver: [
      { medium: "Turien & Co.", datum: "oktober 2026", titel: "Beste serviceprovider in de categorie particuliere schade", url: "https://www.turien.nl/adviseur/nieuws/turien-co-beste-serviceprovider-in-categorie-particuliere-schade-1" },
      { medium: "VCN", datum: "2026", titel: "Drie keer uitgeroepen tot beste serviceprovider", url: "https://www.vcn.nl/testimonial/17/vcn-uitgroepen-tot-beste-serviceprovider-2025-dfo" },
      { medium: "SUREbusiness", datum: "november 2025", titel: "Beste serviceprovider Schade Zakelijk groot 2025", url: "https://www.surebusiness.nl/nieuws/surebusiness-beste-serviceprovider-schade-zakelijk-groot-2025" },
      { medium: "BSB Volmachten", datum: "2024", titel: "Uitgeroepen tot beste serviceprovider", url: "https://www.bsbvolmachten.nl/beste-service-provider-2024/" },
      { medium: "SUREbusiness", datum: "november 2023", titel: "Beste serviceprovider Schade Zakelijk 2023", url: "https://www.surebusiness.nl/nieuws/surebusiness-beste-serviceprovider-schade-zakelijk-2023" }
    ]
  },

  // BEWAARD VOOR LATER: vragen voor serviceproviders (worden nu niet getoond).
  faqAanbieders: [
    { vraag: "Welke markten worden onderzocht?", antwoord: "Hypotheken, consumptief krediet, particuliere schade en zakelijke schade, met een aparte indeling voor grote en kleine serviceproviders, plus franchiseorganisaties." },
    { vraag: "Heeft het afnemen van een rapport invloed op de uitkomst?", antwoord: "Nee. De scores komen alleen uit de beoordelingen van financieel adviseurs. Of u een rapport afneemt, heeft daar geen invloed op." },
    { vraag: "Kunnen wij zien welke adviseur wat heeft geantwoord?", antwoord: "Nee. Alle uitkomsten worden op groepsniveau gerapporteerd. Antwoorden zijn niet te herleiden naar adviseurs of kantoren." }
  ],

  faq: [
    { vraag: "Wie kan meedoen?", antwoord: "Iedere financieel adviseur die werkt met een serviceprovider of franchiseorganisatie voor hypotheken, consumptief krediet, particuliere schade of zakelijke schade." },
    { vraag: "Wat bedoelen jullie met een serviceprovider?", antwoord: "Een organisatie waarbij je kantoor is aangesloten voor toegang tot aanbieders, ondersteuning en diensten, zoals een volmacht, hypotheekketen of franchiseorganisatie. Je beoordeelt alleen de partijen waar jij zelf mee werkt." },
    { vraag: "Waarom drie metingen per jaar?", antwoord: "Vanaf 2026 doen we het Serviceproviders-onderzoek in drie metingen, elk met een eigen thema: binnendienst en acceptatie, marktgerichtheid en bedrijfsvoering. Zo gaat elke vragenlijst over één thema en zijn de uitkomsten actueler." },
    { vraag: "Hoe lang duurt het invullen?", antwoord: "Ongeveer 8 minuten. In meting 2 was de helft van de adviseurs binnen ruim 6 minuten klaar, in meting 1 duurde het ongeveer 9 minuten. Je beoordeelt alleen de serviceproviders waar je zelf mee werkt." },
    { vraag: "Zijn mijn antwoorden anoniem?", antwoord: "Ja. We rapporteren alleen op groepsniveau. Je antwoorden zijn nooit terug te leiden naar jou of je kantoor." },
    { vraag: "Wat is de voorbereidingslink?", antwoord: "Met de voorbereidingslink vul je één keer per jaar je kantoorgegevens in; dat kost ongeveer 6 minuten. Bij de volgende metingen hoef je die niet opnieuw in te vullen. Dat scheelt ongeveer 1½ à 2 minuten per meting, ook bij het Performance-onderzoek." },
    { vraag: "Hoe krijg ik de samenvatting?", antwoord: "Aan het eind van de vragenlijst laat je je e-mailadres achter. Dat gebruiken we alleen om je de samenvatting te sturen en we slaan het los van je antwoorden op." },
    { vraag: "Wat doen de serviceproviders met mijn oordeel?", antwoord: "De serviceproviders zien hoe adviseurs hun dienstverlening beoordelen en op welke punten het beter kan. Zo helpt jouw oordeel de partijen waarmee je samenwerkt om hun service te verbeteren." },
    { vraag: "Wie voert het onderzoek uit?", antwoord: "DFO Onderzoek, onderdeel van Bureau DFO in Hoevelaken, in samenwerking met Atentikmarketing." }
  ]
};
