/* ============================================================
   RIVERSIDE — ADATOK (nyelvfüggetlen)

   Itt csak olyasmi van, ami minden nyelven ugyanaz: számok, dátumok,
   képfájlnevek, telefonszám. Egy ár nem fordítható, egy fotó nem
   fordítható — ezek itt vannak, egy helyen.

   A SZÖVEGEK máshol vannak:
     szotar.js    — gombok, címkék, üzenetek (hu / de / en)
     tartalom.js  — hosszabb szövegek: házirend, kérdések,
                    felszereltség, fotófeliratok (hu / de / en)

   Ez a szétválasztás azért jó, mert ha egy árat módosítasz, egy
   helyen kell átírni, nem háromszor.
   ============================================================ */

/* ---------- 1. A HÁZ (számok és képek) ---------- */

const HAZ = {
  nev: 'Riverside',          // a márkanév nem fordul
  alapFerohely: 5,           // a két emeleti hálószobában
  potFerohely: 2,            // a nappali kanapéján, kérésre
  maxFerohely: 7,            // a házirend szerinti felső határ
  furdoszobak: 2,
  alapterulet: 85,           // m²

  /* A hálószobák neve, jellemzői és a szint megnevezése a
     tartalom.js `haloszobak` tömbjében van, UGYANEBBEN A SORRENDBEN. */
  haloszobak: [
    { kulcs: 'erkelyes', ferohely: 2, kep: 'bed-riverside-1.jpg' },
    { kulcs: 'haromagyas', ferohely: 3, kep: 'bed-riverside-2.jpg' },
    { kulcs: 'nappali', ferohely: 2, kep: 'living-1.jpg' },
  ],

  // A ház oldal tetején lévő galéria képei.
  fokepek: [
    'house-river.jpg',
    'garden-dock-willow.jpg',
    'pool-1.jpg',
  ],

};

/* ---------- 1/b. A HÁZ CÍMKÉI ----------
   A ház főbb jellemzői, a főoldalon és a ház oldalán egy sorban.
   A FELIRATOK a tartalom.js `cimkek` tömbjében vannak, UGYANEBBEN A
   SORRENDBEN — itt csak az azonosító és a hozzá tartozó fotók állnak.

   A `fotok` mező mondja meg, melyik képekre ugorjon a címke, ha
   rákattintanak. Ahol ez üres, ott a címke nem link, hanem sima
   felirat: nincs értelme olyan galériát nyitni, amelyben nincs kép.
   Ha egy jellemzőről készül fotó, elég ide felvenni a fájlnevét, és
   a címke magától kattinthatóvá válik. */

const CIMKEK = [
  { kulcs: 'medence', fotok: ['pool-1.jpg', 'pool-2.jpg', 'pool-4.jpg', 'pool-5.jpg', 'pool-3.jpg'] },
  { kulcs: 'szauna', fotok: [] },                 // erről még nincs fotó
  { kulcs: 'steg', fotok: ['garden-dock-willow.jpg', 'garden-dock.jpg', 'garden-ladder.jpg', 'river-house-2.jpg', 'garden-kayak.jpg'] },
  { kulcs: 'horgaszat', fotok: ['garden-dock.jpg', 'river-house-2.jpg', 'garden-dock-willow.jpg'] },
  { kulcs: 'kerekpar', fotok: [] },               // erről még nincs fotó
  { kulcs: 'wifi', fotok: [] },                   // nem fényképezhető
  { kulcs: 'klima', fotok: [] },                  // erről még nincs fotó
  { kulcs: 'kutya', fotok: ['garden-dock.jpg'] },
  { kulcs: 'parkolo', fotok: ['house-side-river.jpg', 'house-front-1.jpg'] },
];

/* ---------- 2. PÉNZ ÉS SZABÁLYOK ----------
   Ezt a négy számot szokás leggyakrabban módosítani. */

const IFA_FELNOTT_EJ = 700;        // idegenforgalmi adó, Ft / felnőtt / éjszaka
const KAUCIO = 70000;              // Ft, érkezéskor készpénzben
const FOGLALO_ARANY = 0.3;         // a szállásdíj hány része a foglaló
const INGYENES_LEMONDAS_NAP = 21;  // ennyi nappal érkezés előttig ingyenes

/* ---------- 3. SZEZONOK ----------
   Minden szezonnak abszolút éjszakai ára van, a TELJES házra.
   A „tól–ig" logikája: az `ig` nap már a következő szezonhoz tartozik.

   MINDEN szezonban minimum 3 éjszakára lehet foglalni, bármelyik
   naptól. Kötött turnus (pontosan ennyi éj, csak ezen a napon
   kezdhető) ma egyetlen szezonban sincs — a logika ismeri a
   `kototEjszaka` és `valtonap` mezőket, tehát ha egyszer mégis
   kellene, elég ide felvenni őket egy szezonhoz.

   A `nevKulcs` a tartalom.js `szezonNevek` mezőire mutat — így a
   szezon neve is három nyelven jelenik meg. Az évszámot a felület
   teszi hozzá. */

function szezonokEgyEvre(ev) {
  return [
    /* Tél: december 1-től február végéig, a főszezonnal azonos áron.
       A karácsony és az újév is ebbe esik — ugyanezen az áron, ezért
       nincs külön „ünnepek" szezon. Átnyúlik a következő évbe, ezért
       a `tol` és az `ig` különböző évszámot visel. */
    { nevKulcs: 'tel', ev, tol: ev + '-12-01', ig: (ev + 1) + '-03-01', arEjszakankent: 75000, minEjszaka: 3 },

    { nevKulcs: 'fo', ev, tol: ev + '-05-31', ig: ev + '-09-01', arEjszakankent: 75000, minEjszaka: 3 },
    { nevKulcs: 'elo', ev, tol: ev + '-03-01', ig: ev + '-05-31', arEjszakankent: 55000, minEjszaka: 3 },
    { nevKulcs: 'uto', ev, tol: ev + '-09-01', ig: ev + '-12-01', arEjszakankent: 55000, minEjszaka: 3 },
  ];
}

const MOSTANI_EV = new Date().getFullYear();
/* Az előző év is szerepel a listán, mert a tél átnyúlik a következő
   évbe: januárt és februárt az ELŐZŐ év tele fedi. Ha az előző év
   kimaradna, egy januári foglalás előszezoni áron jönne ki. */
const SZEZONOK = [MOSTANI_EV - 1, MOSTANI_EV, MOSTANI_EV + 1, MOSTANI_EV + 2].flatMap(szezonokEgyEvre);

/* ---------- 4. EXTRÁK ----------
   Csak az azonosító és az ár. A név és a leírás a tartalom.js
   `extrak` mezőjében van, ugyanezekkel az azonosítókkal. */

const EXTRAK = [
  { id: 'kutya', ar: 0 },
  { id: 'takaritas', ar: 0 },
];

/* ---------- 5. HÁZIREND, GYIK, VÉLEMÉNYEK ----------
   Ezek teljes egészében szövegek, ezért a tartalom.js-ben vannak.
   Itt csak a házirend szakaszainak SORRENDJE és azonosítója él,
   mert a lábléc és a foglalás ezekre a horgonyokra hivatkozik. */

const HAZIREND_SORREND = ['foglalas', 'kaucio', 'lemondas', 'vendegek', 'kutya', 'medence', 'tuz', 'hazban', 'takaritas'];

/* ---------- 6. FOTÓK ----------
   Fájlnév és kategória. A feliratok a tartalom.js-ben, fájlnév
   szerint (lásd a `fotoFelirat` függvényt). */

const FOTO_KATEGORIAK = ['haz', 'viz', 'kert', 'belso', 'halo', 'alaprajz'];

const FOTOK = [
  { kep: 'house-front-1.jpg', mi: 'haz' },
  { kep: 'house-front-2.jpg', mi: 'haz' },
  { kep: 'house-side-river.jpg', mi: 'haz' },
  { kep: 'river-house-1.jpg', mi: 'haz' },

  { kep: 'house-river.jpg', mi: 'viz' },
  { kep: 'garden-dock-willow.jpg', mi: 'viz' },
  { kep: 'garden-dock.jpg', mi: 'viz' },
  { kep: 'river-house-2.jpg', mi: 'viz' },
  { kep: 'river-from-balcony.jpg', mi: 'viz' },
  { kep: 'garden-kayak.jpg', mi: 'viz' },
  { kep: 'garden-ladder.jpg', mi: 'viz' },

  { kep: 'pool-1.jpg', mi: 'kert' },
  { kep: 'pool-2.jpg', mi: 'kert' },
  { kep: 'pool-3.jpg', mi: 'kert' },
  { kep: 'pool-4.jpg', mi: 'kert' },
  { kep: 'pool-5.jpg', mi: 'kert' },
  { kep: 'garden-grill.jpg', mi: 'kert' },
  { kep: 'garden-pergola.jpg', mi: 'kert' },

  { kep: 'living-1.jpg', mi: 'belso' },
  { kep: 'living-2.jpg', mi: 'belso' },
  { kep: 'living-3.jpg', mi: 'belso' },
  { kep: 'living-4.jpg', mi: 'belso' },
  { kep: 'kitchen-1.jpg', mi: 'belso' },
  { kep: 'kitchen-2.jpg', mi: 'belso' },
  { kep: 'kitchen-3.jpg', mi: 'belso' },
  { kep: 'kitchen-4.jpg', mi: 'belso' },

  { kep: 'bed-riverside-1.jpg', mi: 'halo' },
  { kep: 'bed-riverside-2.jpg', mi: 'halo' },
  { kep: 'bed-riverside-3.jpg', mi: 'halo' },
  { kep: 'balcony.jpg', mi: 'halo' },
  { kep: 'bath-upstairs-1.jpg', mi: 'halo' },
  { kep: 'bath-upstairs-2.jpg', mi: 'halo' },
  { kep: 'bath-downstairs.jpg', mi: 'halo' },
  { kep: 'wc-ground.jpg', mi: 'halo' },

  { kep: 'room-parterre-1.jpg', mi: 'alaprajz' },
  { kep: 'room-parterre-2.jpg', mi: 'alaprajz' },
  { kep: 'bed-river-1.jpg', mi: 'alaprajz' },
  { kep: 'bed-river-2.jpg', mi: 'alaprajz' },
];

/* ---------- 7. KÖRNYÉK (ikonok) ----------
   A címek és a szövegek a tartalom.js `kornyek` tömbjében, ugyanebben
   a sorrendben. */

const KORNYEK_IKONOK = ['🛶', '🎣', '🚲'];

/* ---------- 8. ELÉRHETŐSÉG ----------
   Nevek, számok, cím — ezek nem fordulnak. Az „odajutás" szövege
   viszont igen, az a tartalom.js-ben van. */

const KAPCSOLAT = {
  tulajdonosok: 'Piroska és Wilhelm Wenz',
  telefon: '+36 20 483 2723',
  telefonLink: 'tel:+36204832723',
  telefonDe: '+49 171 2320707',
  email: 'info@riverside-koeroes.com',
  cim: '5561 Békésszentandrás, Keresztháti üdülősor 86.',
  terkep: 'https://www.google.com/maps/search/?api=1&query=46.88871763134489,20.49571814291005',
  ntak: 'MA 21002678',
};

/* ---------- 9. DEMÓ FOGLALÁSOK ----------
   Hogy a naptárban legyen foglalt nap is. A számok a mai naphoz
   képest értendők: 21 = mától 21 nap múlva. Az igazi foglalások a
   böngésző tárolójába kerülnek (lásd logika.js). */

const DEMO_FOGLALASOK = [
  { azonosito: 'RV-DEMO-01', nev: 'Kovács Anna', email: 'anna@example.hu', tol: 21, ig: 25, felnott: 4, gyerek: 2, allapot: 'visszaigazolt' },
  { azonosito: 'RV-DEMO-02', nev: 'Szabó Péter', email: 'peter@example.hu', tol: 40, ig: 44, felnott: 2, gyerek: 0, allapot: 'visszaigazolt' },
  { azonosito: 'RV-DEMO-03', nev: 'Tóth Judit', email: 'judit@example.hu', tol: 5, ig: 9, felnott: 5, gyerek: 0, allapot: 'fuggoben' },
];
