/* ============================================================
   RIVERSIDE — TARTALOM három nyelven

   Itt vannak a hosszabb szövegek: a ház bemutatása, a hálószobák,
   a felszereltség, a házirend, a gyakori kérdések, a vélemények,
   a környék és a fotófeliratok — magyarul, németül és angolul.

   Amit itt NEM találsz: a számok (ár, férőhely, adó) és a
   képfájlnevek. Azok az `adatok.js`-ben vannak, mert nyelvtől
   függetlenek — egy ár minden nyelven ugyanannyi.

   A gombok és rövid címkék a `szotar.js`-ben vannak.

   SZERKESZTÉS: a három nyelv szerkezete azonos, ugyanazokkal a
   kulcsokkal. Ha egy tételt hozzáadsz, add hozzá mind a háromhoz.
   ============================================================ */

const TARTALOM = {

  /* ==========================================================
     MAGYAR
     ========================================================== */
  hu: {
    introP1: 'A nyaraló Békésszentandráson áll, a Kákafoki holtág partján, egy természetvédelmi parkban. Nem szobánként adjuk ki: aki jön, az a teljes 85 négyzetmétert kapja, a kerttel, a medencével, a szaunával és a stéggel együtt.',
    introP2: 'Zárt udvar, körben kerítés, a víz felőli részen még egy alacsonyabb is — a gyerekek és a kutya szem előtt vannak. Reggeli nincs, viszont a konyha úgy fel van szerelve, hogy ne hiányozzon.',

    cimkek: ['Medence', 'Finn szauna', 'Saját stég', 'Horgászat', 'Kerékpárok', 'Wi-Fi', 'Légkondicionáló', 'Kutyabarát', 'Kamerás parkoló'],

    haloszobak: [
      { nev: 'Erkélyes hálószoba', szint: 'Emelet', agyak: '1 franciaágy', jellemzok: ['Partra néző panorámaablak', 'Saját erkély', 'TV', 'Redőny és szúnyogháló'] },
      { nev: 'Háromágyas hálószoba', szint: 'Emelet', agyak: '3 különálló ágy', jellemzok: ['TV', 'Redőny és szúnyogháló', 'Gyermekágy kérésre'] },
      { nev: 'Nappali', szint: 'Földszint', agyak: 'Kihúzható kanapé', jellemzok: ['Csak kérésre ágyazzuk be', 'TV', 'Innen nyílik a fürdőszoba'] },
    ],

    felszereltseg: [
      { cim: 'A házban', tetelek: ['85 m², két hálószoba és nappali, 2 fürdőszoba', 'Légkondicionáló — zárt nyílászárók mellett használható', 'TV minden szobában, német és magyar műholdas csatornákkal', 'Minden ablakon redőny és szúnyogháló', 'Wi-Fi a házban és a kertben', 'Ágynemű huzattal és törölköző'] },
      { cim: 'Konyha', tetelek: ['Villanytűzhely sütővel, kerámia főzőlappal', 'Két hűtőszekrény, fagyasztórekesszel', 'Két kávéfőző: filteres és eszpresszó', 'Mikrohullámú sütő, vízforraló, kenyérpirító, mixer', 'Étkészlet, edénykészlet, poharak, evőeszközök'] },
      { cim: 'Kert és víz', tetelek: ['Medence — reggelente mi tisztítjuk', 'Finn szauna', 'Saját stég, kerítéssel leválasztva az udvartól', 'Csónak, 2 túrakajak, vízibicikli, mentőmellényekkel', 'Grillezés és bográcsozás a kijelölt tűzrakó helyen', 'Kerti kiülők, napozóágyak'] },
      { cim: 'Játék és mozgás', tetelek: ['Pingpongasztal ütőkkel és labdákkal', 'Asztali foci', 'Három kerékpár'] },
      { cim: 'Biztonság és praktikum', tetelek: ['Zárt udvar, minden oldalon kerítés', 'A folyó felőli részen külön, 80 cm magas kerítés', 'Biztonsági kamerával védett parkoló az ingatlanon belül', 'A csapvíz fúrott kútból jön, szűrőrendszerrel — nem ivóvíz'] },
    ],

    arbanBenne: ['A ház és a kert önálló használata', 'Közüzemi díjak', 'Ágynemű huzattal és törölköző', 'Medence, szauna, kajak, csónak, vízibicikli, kerékpár', 'Parkolás az ingatlanon belül', 'Wi-Fi', 'Gyermekágy és etetőszék', 'Kutya, ha szobatiszta'],
    arbanNincs: ['Idegenforgalmi adó: 700 Ft / fő / éj, 18 év felett — érkezéskor készpénzben', 'Kaució: 70 000 Ft érkezéskor készpénzben, távozáskor visszajár', 'Étkezés — a konyha felszerelt, a bevásárlás a tiétek', 'Tűzifa és faszén a grillhez és a bográcshoz', 'Törölköző a medencéhez, a szaunához és a napozóágyakhoz'],

    szezonNevek: { turnus: 'Nyári turnus', fo: 'Főszezon', tel: 'Téli szezon', elo: 'Előszezon', uto: 'Utószezon' },

    extrak: {
      kutya: { nev: 'Kutyát hozunk', leiras: 'Felár nélkül, ha szobatiszta. A saját fekhelyét hozzátok.' },
      'x-ifa': { nev: 'Idegenforgalmi adó', leiras: '700 Ft / fő / éj, 18 éves kor felett. Érkezéskor készpénzben.' },
      'x-kutya': { nev: 'Kutyát hozunk', leiras: 'Felár nélkül, ha szobatiszta. A saját fekhelyét hozzátok.' },
      'x-takaritas': { nev: 'Heti takarítás és ágyneműcsere', leiras: 'Egy hétnél hosszabb tartózkodásnál díjmentes, előre egyeztetve.' },
      takaritas: { nev: 'Heti takarítás és ágyneműcsere', leiras: 'Egy hétnél hosszabb tartózkodásnál díjmentes, előre egyeztetve.' },
    },

    hazirend: [
      { id: 'foglalas', cim: 'Foglalás és fizetés', tetelek: ['A foglalás a foglaló befizetésével válik érvényessé: a szállásdíj 30%-át kérjük átutalással.', 'A fennmaradó összeg legkésőbb az érkezés előtt 14 nappal érkezzen meg, vagy fizethető készpénzzel az érkezés napján.', 'Az idegenforgalmi adó 700 Ft / fő / éj a 18 éven felülieknek, az érkezés napján készpénzben.', 'Érkezéskor a vendég átadja a személyes dokumentumait adatfelvételre — ezt az NTAK rendszerén keresztül továbbítjuk.'] },
      { id: 'kaucio', cim: 'Kaució', tetelek: ['70 000 Ft kauciót kérünk érkezéskor, készpénzben.', 'Távozáskor visszaadjuk, ha a berendezés hiánytalan és nem történt károkozás.', 'Visszatérő vendégeinktől nem kérünk kauciót.'] },
      { id: 'lemondas', cim: 'Lemondás', tetelek: ['Érkezés előtt 21 napon túli lemondásnál a foglalót visszafizetjük.', 'Érkezés előtt 21 napon belüli lemondásnál a foglalót nem áll módunkban visszatéríteni.', 'Meg nem érkezés esetén a foglaló nem jár vissza.', 'Ha a lefoglalt időszak vége előtt távoztok, a lefoglalt éjszakák díja akkor is fizetendő.'] },
      { id: 'vendegek', cim: 'Vendégek', tetelek: ['A nyaralóban legfeljebb 7 fő tartózkodhat.', 'Csak a bejelentett vendégek lakhatnak itt; az adatokat a GDPR szerint kezeljük.', 'Látogatót napközben, a szállásadó engedélyével lehet fogadni.', 'Ittas vagy agresszív vendéget nem fogadunk. Ez nem bulinyaraló.'] },
      { id: 'kutya', cim: 'Kutya', tetelek: ['A kutya felár nélkül jöhet, ha szobatiszta.', 'Agresszív állatot, harci kutyát és cicát nem tudunk fogadni.', 'Kérjük, hozzátok a kedvenc saját fekhelyét — a kanapéra és az ágyra nem mehet fel.', 'A medencébe állatot beengedni tilos, és a kertben sem hagyható egyedül.'] },
      { id: 'medence', cim: 'Medence és szauna', tetelek: ['A medence és a szauna használata saját felelősségre történik.', 'A medencét reggelente mi tisztítjuk; a karbantartást mi végezzük.', '14 éven aluli gyerek csak felnőtt felügyeletében lehet a medence környékén.', 'A szaunát ittas, lázas vagy beteg állapotban kérjük ne használjátok.', 'Hozzatok saját törölközőt a medencéhez, a szaunához és a napozóágyakhoz.'] },
      { id: 'tuz', cim: 'Grill és bográcsozás', tetelek: ['Tüzet csak a kijelölt tűzrakó helyen, szélcsendben, egy vödör oltóvízzel lehet rakni.', 'A fát és a faszenet nem tudjuk biztosítani.', 'Tűzrakás után kérjük a szemét eltávolítását és a parázs leöntését.'] },
      { id: 'hazban', cim: 'A házban', tetelek: ['Az épületekben dohányozni és füstölőt használni tilos.', 'A csapvíz fúrott kútból jön: mosogatásra és zuhanyzásra alkalmas, de nem ivóvíz.', 'A légkondicionálót csak zárt nyílászárók mellett használjátok.', 'A bútorokat kérjük ne vigyétek ki a házból, és távozáskor zárjátok be az ajtót, ablakot, kaput.'] },
      { id: 'takaritas', cim: 'Takarítás és szemét', tetelek: ['A házat tisztán kapjátok, és olyan állapotban kérjük vissza — a kertben és a grill körül is.', 'Egy héten túli tartózkodásnál ágynemű- és törölközőcserét, valamint heti egy takarítást előre egyeztetünk.', 'A háztartási szemét a ház melletti nagy kukába kerül; a WC-be ne dobjatok egészségügyi betétet.', 'A haldarabokat kérjük ne dobjátok vissza a folyóba.'] },
    ],

    gyik: [
      { k: 'Lehet szobát bérelni, vagy csak az egész házat?', v: 'Csak az egész házat adjuk ki, egyben. Aki jön, az a teljes 85 négyzetmétert kapja a kerttel, a medencével, a szaunával és a stéggel együtt — más vendég nem lakik itt közben.' },
      { k: 'Hányan férünk el?', v: 'Öt fő alszik a két emeleti hálószobában, további kettőnek a nappali kanapéját ágyazzuk be kérésre. A házirend szerint legfeljebb heten lehettek. Gyermekágyat és etetőszéket díjmentesen adunk, és ezek nem számítanak bele a férőhelybe.' },
      { k: 'A létszám befolyásolja az árat?', v: 'Nem. A szállásdíj a teljes házra szól, akárhányan jöttök. A létszám csak az idegenforgalmi adót érinti: 700 Ft / fő / éj a 18 éven felülieknek, érkezéskor készpénzben.' },
      { k: 'Meddig kell fizetni, és mennyit előre?', v: 'A foglalás a szállásdíj 30%-ának átutalásával válik élővé. A hátralék legkésőbb az érkezés előtt 14 nappal érkezzen meg, vagy fizethető készpénzben érkezéskor. Érkezéskor még 70 000 Ft kaució jár, amit távozáskor visszaadunk — visszatérő vendégtől nem kérjük.' },
      { k: 'Mi van, ha le kell mondanunk?', v: 'Érkezés előtt 21 napon túli lemondásnál a foglalót visszafizetjük. Ezen belül a foglalót nem áll módunkban visszatéríteni. Lemondani a Foglalásom oldalon vagy telefonon lehet.' },
      { k: 'Hány éjszakára lehet foglalni?', v: 'Legalább három éjszakára, bármelyik naptól — nyáron is. Hosszabb tartózkodásnak nincs felső határa.' },
      { k: 'Vihetjük a kutyát?', v: 'Igen, felár nélkül, ha szobatiszta. A kedvenc saját fekhelyét hozzátok, mert a kanapéra és az ágyra nem mehet fel; a medencébe állat nem mehet, és a kertben sem hagyható egyedül. Agresszív állatot és cicát nem tudunk fogadni.' },
      { k: 'Van reggeli?', v: 'Nincs. A konyha viszont teljesen felszerelt — indukciós főzőlap, sütő, mosogatógép, hűtő, kávéfőző —, a bevásárlás és a főzés a tiétek. A faluban bolt van, Szarvason nagyobb üzletek.' },
      { k: 'Iható a csapvíz?', v: 'Nem. A csapvíz fúrott kútból jön szűrőrendszeren át: mosogatásra, zuhanyzásra alkalmas, de ivásra nem. Ivóvizet a faluban lehet venni.' },
      { k: 'Működik a medence és a szauna egész évben?', v: 'A medencét a szezonban tartjuk üzemben, és reggelente mi tisztítjuk; a szauna egész évben használható. Mindkettő saját felelősségre, 14 év alatt felnőtt felügyeletében. Törölközőt a medencéhez és a szaunához hozzatok magatokkal.' },
    ],

    velemenyek: [
      { szoveg: 'Azt hittük, két napot bírunk ki net nélkül. Négy lett belőle, és a gyerekek a vizet nem akarták otthagyni.', ki: 'Eszter és Máté', mikor: 'Négy fő, augusztus' },
      { szoveg: 'A kutyát is vihettük, és tényleg nem volt gond. A zárt kert miatt egész héten nem kellett pórázon tartani.', ki: 'Tamás', mikor: 'Két fő és egy kutya, június' },
      { szoveg: 'Reggel a stégről indultunk kajakkal, délután a medencénél ültünk. Nem kellett sehova autózni.', ki: 'A Nagy család', mikor: 'Hat fő, egy teljes hét' },
    ],

    kornyek: [
      { cim: 'Kajak és csónak', szoveg: 'Két túrakajak, csónak és vízibicikli a saját stégnél, mentőmellényekkel. A holtág csendes, motorcsónak nem jár rajta.' },
      { cim: 'Horgászat', szoveg: 'A stég a kert végében van. Területi engedélyt a faluban lehet váltani — szólj, és megmutatjuk, hol.' },
      { cim: 'Bringa a gáton', szoveg: 'Három kerékpár a háznál, a gátoldalon sík út vezet Szarvas és Gyomaendrőd felé.' },
    ],

    fotoKategoriak: { haz: 'A ház kívülről', viz: 'Víz és stég', kert: 'Kert és medence', belso: 'Nappali és konyha', halo: 'Hálószobák és fürdők', alaprajz: 'Alaprajz' },

    fotoFeliratok: {
      'house-front-1': 'A ház a kert felől, a térköves bejáróval és a kerti kemencével',
      'house-front-2': 'A tornácos homlokzat és az erkély a bejárat felől',
      'house-side-river': 'A kapu és a kerítés az utca felől, a ház oldalánál',
      'river-house-1': 'A ház és a fedett kerti ülőhely a gyepről nézve',
      'house-river': 'A stég a holtágon, csónakkal és vízibiciklivel',
      'garden-dock-willow': 'A stéghez vezető út a fűzfa alatt, hintával',
      'garden-dock': 'Horgászbotok a stégen, kora reggel',
      'river-house-2': 'A part a kert végében, a vízre néző padokkal',
      'river-from-balcony': 'A holtág a kert felől, fűzfák között',
      'garden-kayak': 'A két túrakajak és a vízibicikli a parton',
      'garden-ladder': 'Létra a vízbe a stég mellett',
      'pool-1': 'A medence a kertben, napozóágyakkal',
      'pool-2': 'A medence és a fedett pihenő a térkövezett részen',
      'pool-3': 'Pingpongasztal a medence mellett',
      'pool-4': 'A medence napernyőkkel és nyugágyakkal, nyáron',
      'pool-5': 'A fedett pihenő csocsóasztallal és ülőgarnitúrával',
      'garden-grill': 'A kerti kemence és a kültéri étkező a fenyők tövében',
      'garden-pergola': 'A fedett kerti asztal a tűzifa mellett',
      'living-1': 'A nappali a kanapéval és a fa lépcsővel',
      'living-2': 'A nappali a téglaboltív és a kandalló felől',
      'living-3': 'Az étkező a nagy asztallal, a nappaliból nyílva',
      'living-4': 'Az étkezőasztal piros székekkel, a teraszajtó mellett',
      'kitchen-1': 'A konyha a boltív alatt, indukciós főzőlappal',
      'kitchen-2': 'A konyhapult mosogatóval és sütővel',
      'kitchen-3': 'A konyha a hűtővel és a mikrohullámú sütővel',
      'kitchen-4': 'Kávéfőző és vízforraló a konyhapulton',
      'bed-riverside-1': 'Az erkélyes hálószoba franciaággyal, fa mennyezettel',
      'bed-riverside-2': 'A hálószoba az ágyakkal és a beépített szekrénnyel',
      'bed-riverside-3': 'A hálószoba szekrénysora televízióval',
      'balcony': 'Az erkély asztallal és székekkel, kilátással a kertre',
      'bath-upstairs-1': 'Az emeleti fürdőszoba zuhanykabinnal és tetőablakkal',
      'bath-upstairs-2': 'Az emeleti fürdő mosdóval és törölközőszárítóval',
      'bath-downstairs': 'A földszinti fürdőszoba zuhanykabinnal',
      'wc-ground': 'Külön WC a földszinten',
      'room-parterre-1': 'A földszint 3D alaprajza: nappali, étkező és a lépcső',
      'room-parterre-2': 'A földszint 3D alaprajza másik nézetből',
      'bed-river-1': 'Az emelet 3D alaprajza: a két hálószoba és a fürdő',
      'bed-river-2': 'Az erkélyes hálószoba 3D alaprajza',
    },

    /* A „Jó tudni” csempék — a ház oldal alján. Az ikonok a seed.ts
       GOOD_TO_KNOW_ICONS tömbjében, ugyanebben a sorrendben. */
    joTudni: [
      { cim: 'Érkezés', szoveg: 'Kulcsátadás személyesen, mi ott vagyunk. Ha csúszik, elég egy telefon.' },
      { cim: 'Foglaló', szoveg: 'A szállásdíj 30%-a átutalással — ezzel válik élővé a foglalás.' },
      { cim: 'Kaució', szoveg: '70 000 Ft érkezéskor készpénzben, távozáskor visszajár.' },
      { cim: 'Csendes ház', szoveg: 'Nem bulinyaraló. Az épületekben dohányozni tilos.' },
    ],

    /* A környék oldal hat kártyája. Az első három a főoldalon is látszik. */
    kornyekTeljes: [
      { cim: 'Kajak és csónak', szoveg: 'Két túrakajak, csónak és vízibicikli a saját stégnél, mentőmellényekkel. A holtág csendes, motorcsónak nem jár rajta.' },
      { cim: 'Horgászat', szoveg: 'A stég a kert végében van. Területi engedélyt a faluban lehet váltani — szólj, és megmutatjuk, hol.' },
      { cim: 'Bringa a gáton', szoveg: 'Három kerékpár a háznál, a gátoldalon sík út vezet Szarvas és Gyomaendrőd felé.' },
      { cim: 'Arborétum', szoveg: 'A szarvasi arborétum 12 km, autóval negyed óra. Kora nyáron a legszebb.' },
      { cim: 'Termálfürdő', szoveg: 'Szarvason, negyed óra. Esős napra a legjobb terv.' },
      { cim: 'Természetvédelmi park', szoveg: 'A ház a Kákafoki holtág partján, védett területen áll — a környék madarai reggel hangosabbak, mint bármi más.' },
    ],

    utazas: 'Budapesttől 150 km, autóval nagyjából két óra. Vonattal Szarvasig, onnan elmegyünk értetek.',
  },

  /* ==========================================================
     NÉMET — DEUTSCH
     ========================================================== */
  de: {
    introP1: 'Das Ferienhaus steht in Békésszentandrás am Ufer des Kákafok-Altarms, in einem Naturschutzpark. Wir vermieten nicht zimmerweise: Wer kommt, bekommt die vollen 85 Quadratmeter mit Garten, Pool, Sauna und Steg.',
    introP2: 'Geschlossener Hof, ringsum ein Zaun, zum Wasser hin noch ein niedrigerer — Kinder und Hund bleiben im Blick. Frühstück gibt es nicht, dafür ist die Küche so ausgestattet, dass nichts fehlt.',

    cimkek: ['Pool', 'Finnische Sauna', 'Eigener Steg', 'Angeln', 'Fahrräder', 'WLAN', 'Klimaanlage', 'Hunde willkommen', 'Parkplatz mit Kamera'],

    haloszobak: [
      { nev: 'Schlafzimmer mit Balkon', szint: 'Obergeschoss', agyak: '1 Doppelbett', jellemzok: ['Panoramafenster zum Ufer', 'Eigener Balkon', 'TV', 'Rollläden und Fliegengitter'] },
      { nev: 'Dreibettzimmer', szint: 'Obergeschoss', agyak: '3 Einzelbetten', jellemzok: ['TV', 'Rollläden und Fliegengitter', 'Kinderbett auf Wunsch'] },
      { nev: 'Wohnzimmer', szint: 'Erdgeschoss', agyak: 'Schlafsofa', jellemzok: ['Wird nur auf Wunsch bezogen', 'TV', 'Von hier geht das Bad ab'] },
    ],

    felszereltseg: [
      { cim: 'Im Haus', tetelek: ['85 m², zwei Schlafzimmer und Wohnzimmer, 2 Bäder', 'Klimaanlage — bei geschlossenen Fenstern und Türen zu nutzen', 'TV in jedem Zimmer, mit deutschen und ungarischen Satellitensendern', 'Rollläden und Fliegengitter an allen Fenstern', 'WLAN im Haus und im Garten', 'Bettwäsche und Handtücher'] },
      { cim: 'Küche', tetelek: ['Elektroherd mit Backofen und Ceranfeld', 'Zwei Kühlschränke mit Gefrierfach', 'Zwei Kaffeemaschinen: Filter und Espresso', 'Mikrowelle, Wasserkocher, Toaster, Mixer', 'Geschirr, Töpfe, Gläser, Besteck'] },
      { cim: 'Garten und Wasser', tetelek: ['Pool — wir reinigen ihn morgens', 'Finnische Sauna', 'Eigener Steg, durch einen Zaun vom Hof getrennt', 'Boot, 2 Tourenkajaks, Tretboot, mit Schwimmwesten', 'Grillen und Kesselgulasch an der ausgewiesenen Feuerstelle', 'Gartenmöbel, Sonnenliegen'] },
      { cim: 'Spiel und Bewegung', tetelek: ['Tischtennisplatte mit Schlägern und Bällen', 'Tischfußball', 'Drei Fahrräder'] },
      { cim: 'Sicherheit und Praktisches', tetelek: ['Geschlossener Hof, ringsum eingezäunt', 'Zum Fluss hin ein zusätzlicher, 80 cm hoher Zaun', 'Kameraüberwachter Parkplatz auf dem Grundstück', 'Das Leitungswasser kommt aus einem Brunnen mit Filteranlage — kein Trinkwasser'] },
    ],

    arbanBenne: ['Haus und Garten zur alleinigen Nutzung', 'Nebenkosten', 'Bettwäsche und Handtücher', 'Pool, Sauna, Kajak, Boot, Tretboot, Fahrrad', 'Parken auf dem Grundstück', 'WLAN', 'Kinderbett und Hochstuhl', 'Hund, sofern stubenrein'],
    arbanNincs: ['Kurtaxe: 700 Ft / Person / Nacht ab 18 Jahren — bei Anreise in bar', 'Kaution: 70 000 Ft bei Anreise in bar, bei Abreise zurück', 'Verpflegung — die Küche ist ausgestattet, der Einkauf ist eure Sache', 'Brennholz und Holzkohle für Grill und Kessel', 'Handtücher für Pool, Sauna und Sonnenliegen'],

    szezonNevek: { turnus: 'Sommerwoche', fo: 'Hauptsaison', tel: 'Wintersaison', elo: 'Vorsaison', uto: 'Nachsaison' },

    extrak: {
      kutya: { nev: 'Wir bringen unseren Hund mit', leiras: 'Ohne Aufpreis, sofern stubenrein. Bringt bitte sein eigenes Körbchen mit.' },
      'x-ifa': { nev: 'Kurtaxe', leiras: '700 Ft / Person / Nacht ab 18 Jahren. Bei Anreise in bar.' },
      'x-kutya': { nev: 'Wir bringen unseren Hund mit', leiras: 'Ohne Aufpreis, sofern stubenrein. Bringt bitte sein eigenes Körbchen mit.' },
      'x-takaritas': { nev: 'Wöchentliche Reinigung und Wäschewechsel', leiras: 'Bei Aufenthalten über eine Woche kostenlos, nach Absprache.' },
      takaritas: { nev: 'Wöchentliche Reinigung und Wäschewechsel', leiras: 'Bei Aufenthalten über eine Woche kostenlos, nach Absprache.' },
    },

    hazirend: [
      { id: 'foglalas', cim: 'Buchung und Zahlung', tetelek: ['Die Buchung wird mit der Anzahlung verbindlich: 30 % des Übernachtungspreises per Überweisung.', 'Der Restbetrag soll spätestens 14 Tage vor Anreise eingehen oder kann am Anreisetag bar gezahlt werden.', 'Die Kurtaxe beträgt 700 Ft / Person / Nacht ab 18 Jahren, am Anreisetag in bar.', 'Bei der Anreise legen die Gäste ihre Ausweisdokumente zur Erfassung vor — die Daten werden über das ungarische NTAK-System übermittelt.'] },
      { id: 'kaucio', cim: 'Kaution', tetelek: ['Bei Anreise bitten wir um 70 000 Ft Kaution in bar.', 'Bei der Abreise geben wir sie zurück, wenn die Einrichtung vollständig und unbeschädigt ist.', 'Von Stammgästen verlangen wir keine Kaution.'] },
      { id: 'lemondas', cim: 'Stornierung', tetelek: ['Bei Stornierung mehr als 21 Tage vor Anreise erstatten wir die Anzahlung.', 'Bei Stornierung innerhalb von 21 Tagen vor Anreise können wir die Anzahlung nicht erstatten.', 'Bei Nichtanreise wird die Anzahlung nicht erstattet.', 'Wenn ihr vor dem Ende des gebuchten Zeitraums abreist, sind die gebuchten Nächte dennoch zu zahlen.'] },
      { id: 'vendegek', cim: 'Gäste', tetelek: ['Im Ferienhaus dürfen sich höchstens 7 Personen aufhalten.', 'Es dürfen nur die angemeldeten Gäste hier wohnen; die Daten behandeln wir nach der DSGVO.', 'Besuch tagsüber ist mit Zustimmung der Vermieter möglich.', 'Betrunkene oder aggressive Gäste nehmen wir nicht auf. Das hier ist kein Partyhaus.'] },
      { id: 'kutya', cim: 'Hund', tetelek: ['Der Hund darf ohne Aufpreis mit, sofern er stubenrein ist.', 'Aggressive Tiere, Kampfhunde und Katzen können wir nicht aufnehmen.', 'Bringt bitte sein eigenes Körbchen mit — auf Sofa und Bett darf er nicht.', 'Tiere dürfen nicht in den Pool und nicht allein im Garten bleiben.'] },
      { id: 'medence', cim: 'Pool und Sauna', tetelek: ['Die Nutzung von Pool und Sauna erfolgt auf eigene Verantwortung.', 'Den Pool reinigen wir morgens; die Wartung übernehmen wir.', 'Kinder unter 14 Jahren dürfen sich nur unter Aufsicht Erwachsener am Pool aufhalten.', 'Bitte nutzt die Sauna nicht in betrunkenem, fiebrigem oder krankem Zustand.', 'Bringt eigene Handtücher für Pool, Sauna und Sonnenliegen mit.'] },
      { id: 'tuz', cim: 'Grill und Kesselgulasch', tetelek: ['Feuer nur an der ausgewiesenen Feuerstelle, bei Windstille und mit einem Eimer Löschwasser.', 'Holz und Holzkohle können wir nicht stellen.', 'Nach dem Feuer bitte den Abfall entfernen und die Glut ablöschen.'] },
      { id: 'hazban', cim: 'Im Haus', tetelek: ['In den Gebäuden sind Rauchen und Räucherstäbchen nicht erlaubt.', 'Das Leitungswasser kommt aus einem Brunnen: zum Spülen und Duschen geeignet, aber kein Trinkwasser.', 'Die Klimaanlage bitte nur bei geschlossenen Fenstern und Türen nutzen.', 'Bitte tragt die Möbel nicht aus dem Haus und schließt bei der Abreise Türen, Fenster und Tor.'] },
      { id: 'takaritas', cim: 'Reinigung und Abfall', tetelek: ['Ihr bekommt das Haus sauber und wir bitten es so zurück — auch im Garten und rund um den Grill.', 'Bei Aufenthalten über eine Woche stimmen wir Wäschewechsel und eine wöchentliche Reinigung vorab ab.', 'Der Hausmüll kommt in die große Tonne neben dem Haus; bitte keine Hygieneartikel in die Toilette.', 'Bitte werft Fischreste nicht zurück ins Wasser.'] },
    ],

    gyik: [
      { k: 'Kann man einzelne Zimmer mieten oder nur das ganze Haus?', v: 'Nur das ganze Haus, als Ganzes. Wer kommt, bekommt die vollen 85 Quadratmeter mit Garten, Pool, Sauna und Steg — es wohnen keine anderen Gäste mit.' },
      { k: 'Wie viele Personen haben Platz?', v: 'Fünf Personen schlafen in den zwei Schlafzimmern im Obergeschoss, für zwei weitere beziehen wir auf Wunsch das Sofa im Wohnzimmer. Laut Hausordnung dürfen es höchstens sieben sein. Kinderbett und Hochstuhl stellen wir kostenlos, sie zählen nicht zur Belegung.' },
      { k: 'Ändert die Personenzahl den Preis?', v: 'Nein. Der Übernachtungspreis gilt für das ganze Haus, egal zu wie vielt ihr kommt. Die Personenzahl betrifft nur die Kurtaxe: 700 Ft / Person / Nacht ab 18 Jahren, bei Anreise in bar.' },
      { k: 'Wann ist zu zahlen, und wie viel im Voraus?', v: 'Die Buchung wird mit der Überweisung von 30 % des Übernachtungspreises verbindlich. Der Restbetrag soll spätestens 14 Tage vor Anreise eingehen oder kann bei Anreise bar gezahlt werden. Bei Anreise kommen 70 000 Ft Kaution dazu, die wir bei der Abreise zurückgeben — von Stammgästen verlangen wir sie nicht.' },
      { k: 'Was ist, wenn wir stornieren müssen?', v: 'Bei Stornierung mehr als 21 Tage vor Anreise erstatten wir die Anzahlung. Innerhalb dieser Frist können wir sie nicht erstatten. Stornieren könnt ihr auf der Seite „Meine Buchung" oder telefonisch.' },
      { k: 'Für wie viele Nächte kann man buchen?', v: 'Ab drei Nächten, an jedem beliebigen Tag beginnend — auch im Sommer. Nach oben gibt es keine Grenze.' },
      { k: 'Dürfen wir den Hund mitbringen?', v: 'Ja, ohne Aufpreis, sofern er stubenrein ist. Bringt sein eigenes Körbchen mit, denn auf Sofa und Bett darf er nicht; in den Pool dürfen Tiere nicht, und allein im Garten bleiben dürfen sie auch nicht. Aggressive Tiere und Katzen können wir nicht aufnehmen.' },
      { k: 'Gibt es Frühstück?', v: 'Nein. Die Küche ist dafür voll ausgestattet — Ceranfeld, Backofen, Spülmaschine, Kühlschrank, Kaffeemaschine —, Einkauf und Kochen sind eure Sache. Im Dorf gibt es einen Laden, in Szarvas größere Märkte.' },
      { k: 'Kann man das Leitungswasser trinken?', v: 'Nein. Das Leitungswasser kommt über eine Filteranlage aus einem Brunnen: zum Spülen und Duschen geeignet, aber nicht zum Trinken. Trinkwasser gibt es im Dorf zu kaufen.' },
      { k: 'Sind Pool und Sauna das ganze Jahr in Betrieb?', v: 'Den Pool betreiben wir in der Saison und reinigen ihn morgens; die Sauna ist das ganze Jahr nutzbar. Beides auf eigene Verantwortung, unter 14 Jahren nur unter Aufsicht Erwachsener. Handtücher für Pool und Sauna bringt bitte selbst mit.' },
    ],

    velemenyek: [
      { szoveg: 'Wir dachten, wir halten zwei Tage ohne Internet aus. Es wurden vier, und die Kinder wollten gar nicht mehr aus dem Wasser.', ki: 'Eszter und Máté', mikor: 'Vier Personen, August' },
      { szoveg: 'Der Hund durfte mit, und es war wirklich kein Problem. Wegen des geschlossenen Gartens mussten wir ihn die ganze Woche nicht anleinen.', ki: 'Tamás', mikor: 'Zwei Personen und ein Hund, Juni' },
      { szoveg: 'Morgens sind wir vom Steg aus mit dem Kajak los, nachmittags saßen wir am Pool. Wir mussten nirgendwohin fahren.', ki: 'Familie Nagy', mikor: 'Sechs Personen, eine ganze Woche' },
    ],

    kornyek: [
      { cim: 'Kajak und Boot', szoveg: 'Zwei Tourenkajaks, ein Boot und ein Tretboot am eigenen Steg, mit Schwimmwesten. Der Altarm ist ruhig, Motorboote fahren hier nicht.' },
      { cim: 'Angeln', szoveg: 'Der Steg liegt am Ende des Gartens. Die Angelkarte gibt es im Dorf — sagt Bescheid, wir zeigen euch, wo.' },
      { cim: 'Radeln auf dem Damm', szoveg: 'Drei Fahrräder am Haus, auf dem Damm führt ein flacher Weg Richtung Szarvas und Gyomaendrőd.' },
    ],

    fotoKategoriak: { haz: 'Das Haus von außen', viz: 'Wasser und Steg', kert: 'Garten und Pool', belso: 'Wohnzimmer und Küche', halo: 'Schlafzimmer und Bäder', alaprajz: 'Grundriss' },

    fotoFeliratok: {
      'house-front-1': 'Das Haus vom Garten aus, mit gepflasterter Einfahrt und Gartenofen',
      'house-front-2': 'Die Fassade mit Veranda und Balkon vom Eingang aus',
      'house-side-river': 'Tor und Zaun von der Straße, an der Hausseite',
      'river-house-1': 'Das Haus und der überdachte Sitzplatz, von der Wiese aus',
      'house-river': 'Der Steg am Altarm, mit Boot und Tretboot',
      'garden-dock-willow': 'Der Weg zum Steg unter der Weide, mit Hollywoodschaukel',
      'garden-dock': 'Angelruten auf dem Steg, am frühen Morgen',
      'river-house-2': 'Das Ufer am Ende des Gartens, mit Bänken zum Wasser',
      'river-from-balcony': 'Der Altarm vom Garten aus, zwischen Weiden',
      'garden-kayak': 'Die zwei Tourenkajaks und das Tretboot am Ufer',
      'garden-ladder': 'Leiter ins Wasser neben dem Steg',
      'pool-1': 'Der Pool im Garten, mit Sonnenliegen',
      'pool-2': 'Pool und überdachter Sitzbereich auf der gepflasterten Fläche',
      'pool-3': 'Tischtennisplatte neben dem Pool',
      'pool-4': 'Der Pool mit Sonnenschirmen und Liegen, im Sommer',
      'pool-5': 'Der überdachte Sitzbereich mit Tischfußball und Sitzgruppe',
      'garden-grill': 'Gartenofen und Außenessplatz am Fuß der Kiefern',
      'garden-pergola': 'Der überdachte Gartentisch neben dem Brennholz',
      'living-1': 'Das Wohnzimmer mit Sofa und Holztreppe',
      'living-2': 'Das Wohnzimmer vom Backsteinbogen und Kamin aus',
      'living-3': 'Der Essbereich mit großem Tisch, vom Wohnzimmer abgehend',
      'living-4': 'Der Esstisch mit roten Stühlen, neben der Terrassentür',
      'kitchen-1': 'Die Küche unter dem Bogen, mit Ceranfeld',
      'kitchen-2': 'Die Küchenzeile mit Spüle und Backofen',
      'kitchen-3': 'Die Küche mit Kühlschrank und Mikrowelle',
      'kitchen-4': 'Kaffeemaschine und Wasserkocher auf der Arbeitsplatte',
      'bed-riverside-1': 'Das Schlafzimmer mit Balkon, Doppelbett und Holzdecke',
      'bed-riverside-2': 'Das Schlafzimmer mit Betten und Einbauschrank',
      'bed-riverside-3': 'Die Schrankwand im Schlafzimmer mit Fernseher',
      'balcony': 'Der Balkon mit Tisch und Stühlen, Blick in den Garten',
      'bath-upstairs-1': 'Das Bad im Obergeschoss mit Duschkabine und Dachfenster',
      'bath-upstairs-2': 'Das obere Bad mit Waschbecken und Handtuchheizkörper',
      'bath-downstairs': 'Das Bad im Erdgeschoss mit Duschkabine',
      'wc-ground': 'Separates WC im Erdgeschoss',
      'room-parterre-1': '3D-Grundriss des Erdgeschosses: Wohnzimmer, Essbereich und Treppe',
      'room-parterre-2': '3D-Grundriss des Erdgeschosses aus anderer Sicht',
      'bed-river-1': '3D-Grundriss des Obergeschosses: die zwei Schlafzimmer und das Bad',
      'bed-river-2': '3D-Grundriss des Schlafzimmers mit Balkon',
    },

    /* Die „Gut zu wissen“-Kacheln. */
    joTudni: [
      { cim: 'Anreise', szoveg: 'Schlüsselübergabe persönlich, wir sind da. Wenn es später wird, genügt ein Anruf.' },
      { cim: 'Anzahlung', szoveg: '30 % des Übernachtungspreises per Überweisung — damit wird die Buchung verbindlich.' },
      { cim: 'Kaution', szoveg: '70 000 Ft bei Anreise in bar, bei Abreise zurück.' },
      { cim: 'Ruhiges Haus', szoveg: 'Kein Partyhaus. In den Gebäuden ist Rauchen nicht erlaubt.' },
    ],

    kornyekTeljes: [
      { cim: 'Kajak und Boot', szoveg: 'Zwei Tourenkajaks, ein Boot und ein Tretboot am eigenen Steg, mit Schwimmwesten. Der Altarm ist ruhig, Motorboote fahren hier nicht.' },
      { cim: 'Angeln', szoveg: 'Der Steg liegt am Ende des Gartens. Die Angelkarte gibt es im Dorf — sagt Bescheid, wir zeigen euch, wo.' },
      { cim: 'Radeln auf dem Damm', szoveg: 'Drei Fahrräder am Haus, auf dem Damm führt ein flacher Weg Richtung Szarvas und Gyomaendrőd.' },
      { cim: 'Arboretum', szoveg: 'Das Arboretum von Szarvas ist 12 km entfernt, eine Viertelstunde mit dem Auto. Im Frühsommer am schönsten.' },
      { cim: 'Thermalbad', szoveg: 'In Szarvas, eine Viertelstunde entfernt. Der beste Plan für einen Regentag.' },
      { cim: 'Naturschutzpark', szoveg: 'Das Haus liegt am Kákafok-Altarm in einem Schutzgebiet — die Vögel sind morgens lauter als alles andere.' },
    ],

    utazas: 'Von Budapest 150 km, mit dem Auto etwa zwei Stunden. Mit der Bahn bis Szarvas, von dort holen wir euch ab.',
  },

  /* ==========================================================
     ANGOL — ENGLISH
     ========================================================== */
  en: {
    introP1: 'The house stands in Békésszentandrás on the bank of the Kákafok backwater, inside a nature reserve. We do not let it room by room: whoever comes gets the full 85 square metres, along with the garden, the pool, the sauna and the jetty.',
    introP2: 'A closed yard fenced all round, with a lower fence again on the water side — children and dogs stay in sight. There is no breakfast, but the kitchen is equipped well enough that you will not miss it.',

    cimkek: ['Pool', 'Finnish sauna', 'Private jetty', 'Fishing', 'Bicycles', 'Wi-Fi', 'Air conditioning', 'Dog friendly', 'Parking with camera'],

    haloszobak: [
      { nev: 'Bedroom with balcony', szint: 'Upstairs', agyak: '1 double bed', jellemzok: ['Panoramic window facing the bank', 'Private balcony', 'TV', 'Shutters and insect screens'] },
      { nev: 'Three-bed room', szint: 'Upstairs', agyak: '3 single beds', jellemzok: ['TV', 'Shutters and insect screens', 'Cot on request'] },
      { nev: 'Living room', szint: 'Ground floor', agyak: 'Sofa bed', jellemzok: ['Made up only on request', 'TV', 'The bathroom opens from here'] },
    ],

    felszereltseg: [
      { cim: 'In the house', tetelek: ['85 m², two bedrooms and a living room, 2 bathrooms', 'Air conditioning — to be used with doors and windows closed', 'TV in every room, with German and Hungarian satellite channels', 'Shutters and insect screens on every window', 'Wi-Fi in the house and the garden', 'Bed linen and towels'] },
      { cim: 'Kitchen', tetelek: ['Electric cooker with oven and ceramic hob', 'Two fridges with freezer compartments', 'Two coffee makers: filter and espresso', 'Microwave, kettle, toaster, blender', 'Crockery, pots and pans, glasses, cutlery'] },
      { cim: 'Garden and water', tetelek: ['Pool — we clean it every morning', 'Finnish sauna', 'Private jetty, fenced off from the yard', 'Boat, 2 touring kayaks, pedalo, with life jackets', 'Barbecue and kettle cooking at the designated fire pit', 'Garden seating, sun loungers'] },
      { cim: 'Games and activity', tetelek: ['Table tennis with bats and balls', 'Table football', 'Three bicycles'] },
      { cim: 'Safety and practical things', tetelek: ['Closed yard, fenced on every side', 'A separate 80 cm fence on the river side', 'Camera-monitored parking within the property', 'Tap water comes from a bored well with a filter system — not drinking water'] },
    ],

    arbanBenne: ['Sole use of the house and the garden', 'Utilities', 'Bed linen and towels', 'Pool, sauna, kayak, boat, pedalo, bicycles', 'Parking within the property', 'Wi-Fi', 'Cot and high chair', 'Dog, if house-trained'],
    arbanNincs: ['Tourist tax: 700 Ft per person per night, aged 18 and over — cash on arrival', 'Security deposit: 70,000 Ft cash on arrival, returned on departure', 'Meals — the kitchen is equipped, the shopping is yours', 'Firewood and charcoal for the barbecue and the kettle', 'Towels for the pool, the sauna and the sun loungers'],

    szezonNevek: { turnus: 'Summer week', fo: 'High season', tel: 'Winter season', elo: 'Early season', uto: 'Late season' },

    extrak: {
      kutya: { nev: 'We are bringing our dog', leiras: 'No extra charge if house-trained. Please bring its own bed.' },
      'x-ifa': { nev: 'Tourist tax', leiras: '700 Ft per person per night, aged 18 and over. Cash on arrival.' },
      'x-kutya': { nev: 'We are bringing our dog', leiras: 'No extra charge if house-trained. Please bring its own bed.' },
      'x-takaritas': { nev: 'Weekly cleaning and linen change', leiras: 'Free for stays longer than a week, arranged in advance.' },
      takaritas: { nev: 'Weekly cleaning and linen change', leiras: 'Free for stays longer than a week, arranged in advance.' },
    },

    hazirend: [
      { id: 'foglalas', cim: 'Booking and payment', tetelek: ['A booking becomes valid with the deposit: we ask for 30% of the accommodation price by bank transfer.', 'The balance should arrive at the latest 14 days before arrival, or it can be paid in cash on the day of arrival.', 'Tourist tax is 700 Ft per person per night for those aged 18 and over, in cash on the day of arrival.', 'On arrival guests present their identity documents for registration — we forward this through the Hungarian NTAK system.'] },
      { id: 'kaucio', cim: 'Security deposit', tetelek: ['We ask for a 70,000 Ft security deposit in cash on arrival.', 'We return it on departure if the furnishings are complete and undamaged.', 'We do not ask returning guests for a deposit.'] },
      { id: 'lemondas', cim: 'Cancellation', tetelek: ['If you cancel more than 21 days before arrival, we refund the deposit.', 'If you cancel within 21 days of arrival, we are not able to refund the deposit.', 'In case of no-show the deposit is not refunded.', 'If you leave before the end of the booked period, the booked nights are still payable.'] },
      { id: 'vendegek', cim: 'Guests', tetelek: ['At most 7 people may stay in the house.', 'Only registered guests may stay here; we handle personal data under the GDPR.', 'Visitors during the day are possible with the hosts’ consent.', 'We do not accept intoxicated or aggressive guests. This is not a party house.'] },
      { id: 'kutya', cim: 'Dogs', tetelek: ['Your dog is welcome at no extra charge if it is house-trained.', 'We cannot accept aggressive animals, fighting dogs or cats.', 'Please bring its own bed — it may not go on the sofa or the beds.', 'Animals are not allowed in the pool and may not be left alone in the garden.'] },
      { id: 'medence', cim: 'Pool and sauna', tetelek: ['The pool and the sauna are used at your own risk.', 'We clean the pool every morning and take care of maintenance.', 'Children under 14 may only be near the pool under adult supervision.', 'Please do not use the sauna when intoxicated, feverish or unwell.', 'Bring your own towels for the pool, the sauna and the sun loungers.'] },
      { id: 'tuz', cim: 'Barbecue and open fire', tetelek: ['Fires only at the designated fire pit, in calm weather, with a bucket of water at hand.', 'We are not able to provide wood or charcoal.', 'After a fire please remove the rubbish and douse the embers.'] },
      { id: 'hazban', cim: 'Inside the house', tetelek: ['Smoking and incense are not allowed in the buildings.', 'Tap water comes from a bored well: fine for washing up and showering, but not for drinking.', 'Please use the air conditioning only with doors and windows closed.', 'Please do not carry furniture outside, and lock doors, windows and the gate when you leave.'] },
      { id: 'takaritas', cim: 'Cleaning and rubbish', tetelek: ['You receive the house clean and we ask for it back in the same state — in the garden and around the barbecue too.', 'For stays longer than a week we agree linen and towel changes and one weekly clean in advance.', 'Household waste goes in the large bin beside the house; please do not put sanitary items in the toilet.', 'Please do not throw fish remains back into the water.'] },
    ],

    gyik: [
      { k: 'Can we rent a room, or only the whole house?', v: 'Only the whole house, as one unit. Whoever comes gets the full 85 square metres with the garden, the pool, the sauna and the jetty — no other guests stay here at the same time.' },
      { k: 'How many of us fit?', v: 'Five people sleep in the two upstairs bedrooms, and we make up the living-room sofa for two more on request. House rules allow seven at most. We provide a cot and a high chair free of charge, and they do not count towards capacity.' },
      { k: 'Does the number of guests change the price?', v: 'No. The accommodation price is for the whole house, however many of you come. The number of guests only affects the tourist tax: 700 Ft per person per night for those aged 18 and over, in cash on arrival.' },
      { k: 'When do we pay, and how much in advance?', v: 'A booking becomes firm when you transfer 30% of the accommodation price. The balance should arrive at the latest 14 days before arrival, or can be paid in cash on arrival. On arrival there is also a 70,000 Ft security deposit, which we return on departure — we do not ask returning guests for it.' },
      { k: 'What if we have to cancel?', v: 'If you cancel more than 21 days before arrival, we refund the deposit. Within that window we are not able to refund it. You can cancel on the My booking page or by phone.' },
      { k: 'How many nights can we book?', v: 'From three nights, starting on any day — in summer too. There is no upper limit.' },
      { k: 'Can we bring the dog?', v: 'Yes, at no extra charge, if it is house-trained. Bring its own bed, as it may not go on the sofa or the beds; animals are not allowed in the pool and may not be left alone in the garden. We cannot accept aggressive animals or cats.' },
      { k: 'Is breakfast provided?', v: 'No. The kitchen, though, is fully equipped — hob, oven, dishwasher, fridge, coffee maker — and the shopping and cooking are yours. There is a shop in the village and larger stores in Szarvas.' },
      { k: 'Can we drink the tap water?', v: 'No. Tap water comes from a bored well through a filter system: fine for washing up and showering, but not for drinking. You can buy drinking water in the village.' },
      { k: 'Are the pool and the sauna available all year?', v: 'We run the pool in season and clean it every morning; the sauna is available all year. Both are used at your own risk, and under 14s only with adult supervision. Please bring your own towels for the pool and the sauna.' },
    ],

    velemenyek: [
      { szoveg: 'We thought we would last two days without the internet. It turned into four, and the children did not want to leave the water.', ki: 'Eszter and Máté', mikor: 'Four guests, August' },
      { szoveg: 'We could bring the dog, and it really was no trouble. Thanks to the closed garden we never had to keep her on the lead all week.', ki: 'Tamás', mikor: 'Two guests and a dog, June' },
      { szoveg: 'In the morning we set off from the jetty by kayak, in the afternoon we sat by the pool. We did not have to drive anywhere.', ki: 'The Nagy family', mikor: 'Six guests, a full week' },
    ],

    kornyek: [
      { cim: 'Kayak and boat', szoveg: 'Two touring kayaks, a boat and a pedalo at the private jetty, with life jackets. The backwater is quiet — no motorboats run on it.' },
      { cim: 'Fishing', szoveg: 'The jetty is at the end of the garden. You can buy a local permit in the village — just ask and we will show you where.' },
      { cim: 'Cycling on the dyke', szoveg: 'Three bicycles at the house, and a flat path along the dyke towards Szarvas and Gyomaendrőd.' },
    ],

    fotoKategoriak: { haz: 'The house outside', viz: 'Water and jetty', kert: 'Garden and pool', belso: 'Living room and kitchen', halo: 'Bedrooms and bathrooms', alaprajz: 'Floor plan' },

    fotoFeliratok: {
      'house-front-1': 'The house from the garden, with the paved drive and the garden oven',
      'house-front-2': 'The porch front and the balcony, seen from the entrance',
      'house-side-river': 'The gate and the fence from the street, beside the house',
      'river-house-1': 'The house and the covered garden seating, seen from the lawn',
      'house-river': 'The jetty on the backwater, with a boat and a pedalo',
      'garden-dock-willow': 'The path to the jetty under the willow, with a swing seat',
      'garden-dock': 'Fishing rods on the jetty, early morning',
      'river-house-2': 'The bank at the end of the garden, with benches facing the water',
      'river-from-balcony': 'The backwater seen from the garden, between willows',
      'garden-kayak': 'The two touring kayaks and the pedalo on the bank',
      'garden-ladder': 'A ladder into the water beside the jetty',
      'pool-1': 'The pool in the garden, with sun loungers',
      'pool-2': 'The pool and the covered seating area on the paved section',
      'pool-3': 'Table tennis beside the pool',
      'pool-4': 'The pool with parasols and loungers, in summer',
      'pool-5': 'The covered seating area with table football and a sofa set',
      'garden-grill': 'The garden oven and outdoor dining table among the pines',
      'garden-pergola': 'The covered garden table beside the firewood',
      'living-1': 'The living room with the sofa and the wooden stairs',
      'living-2': 'The living room from the brick arch and the fireplace',
      'living-3': 'The dining area with a large table, opening off the living room',
      'living-4': 'The dining table with red chairs, next to the terrace door',
      'kitchen-1': 'The kitchen under the arch, with a ceramic hob',
      'kitchen-2': 'The kitchen counter with sink and oven',
      'kitchen-3': 'The kitchen with the fridge and the microwave',
      'kitchen-4': 'Coffee maker and kettle on the kitchen counter',
      'bed-riverside-1': 'The balcony bedroom with a double bed and wooden ceiling',
      'bed-riverside-2': 'The bedroom with beds and a fitted wardrobe',
      'bed-riverside-3': 'The wardrobe wall in the bedroom, with a television',
      'balcony': 'The balcony with table and chairs, looking over the garden',
      'bath-upstairs-1': 'The upstairs bathroom with a shower cabin and a roof window',
      'bath-upstairs-2': 'The upstairs bathroom with washbasin and towel radiator',
      'bath-downstairs': 'The ground-floor bathroom with a shower cabin',
      'wc-ground': 'A separate toilet on the ground floor',
      'room-parterre-1': '3D floor plan of the ground floor: living room, dining area and stairs',
      'room-parterre-2': '3D floor plan of the ground floor from another angle',
      'bed-river-1': '3D floor plan of the upper floor: the two bedrooms and the bathroom',
      'bed-river-2': '3D floor plan of the bedroom with the balcony',
    },

    /* The "Good to know" tiles. */
    joTudni: [
      { cim: 'Arrival', szoveg: 'We hand over the keys in person, we are there. If you are running late, a phone call is enough.' },
      { cim: 'Deposit', szoveg: '30% of the accommodation price by bank transfer — this confirms the booking.' },
      { cim: 'Security deposit', szoveg: '70,000 Ft cash on arrival, returned on departure.' },
      { cim: 'A quiet house', szoveg: 'Not a party house. Smoking is not allowed in the buildings.' },
    ],

    kornyekTeljes: [
      { cim: 'Kayak and boat', szoveg: 'Two touring kayaks, a boat and a pedalo at the private jetty, with life jackets. The backwater is quiet — no motorboats run on it.' },
      { cim: 'Fishing', szoveg: 'The jetty is at the end of the garden. You can buy a local permit in the village — just ask and we will show you where.' },
      { cim: 'Cycling on the dyke', szoveg: 'Three bicycles at the house, and a flat path along the dyke towards Szarvas and Gyomaendrőd.' },
      { cim: 'Arboretum', szoveg: 'The Szarvas arboretum is 12 km away, a quarter of an hour by car. At its best in early summer.' },
      { cim: 'Thermal baths', szoveg: 'In Szarvas, a quarter of an hour away. The best plan for a rainy day.' },
      { cim: 'Nature reserve', szoveg: 'The house stands on the Kákafok backwater inside a protected area — the birds here are louder in the morning than anything else.' },
    ],

    utazas: '150 km from Budapest, roughly two hours by car. By train to Szarvas, and we will pick you up from there.',
  },
};

/** Az adott nyelv tartalma; ami hiányzik, magyarul jelenik meg. */
function tartalom(nyelv) {
  const alap = TARTALOM.hu;
  const valasztott = TARTALOM[nyelv] || alap;
  return new Proxy(valasztott, {
    get: (cel, kulcs) => (kulcs in cel ? cel[kulcs] : alap[kulcs]),
  });
}

/** Egy fotó felirata a fájlneve alapján ('images/pool-1.jpg' → kulcs 'pool-1'). */
function fotoFelirat(kepUt, nyelv) {
  const kulcs = kepUt.replace(/^.*\//, '').replace(/\.[a-z]+$/i, '');
  return tartalom(nyelv).fotoFeliratok[kulcs] || kulcs;
}
