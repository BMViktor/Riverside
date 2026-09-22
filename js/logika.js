/* ============================================================
   RIVERSIDE — LOGIKA

   Itt van minden számolás és szabály: dátumkezelés, árazás,
   szabadság-ellenőrzés, alternatív időpontok és a foglalások
   tárolása. A felület (felulet.js) ezeket a függvényeket hívja,
   és magától nem számol semmit.

   Ha egy szabály változik — például a minimum éjszakaszám kezelése —,
   az itt van egy helyen, nem szétszórva az oldalakon.
   ============================================================ */

/* ============================================================
   1. DÁTUMOK

   Minden dátum 'ÉÉÉÉ-HH-NN' formájú szöveg. Ennek két előnye van:
   szövegként is helyesen összehasonlítható ('2026-07-03' < '2026-07-10'),
   és nincs időzóna-meglepetés.

   Fontos fogalom: az intervallum FÉLIG NYÍLT, [érkezés, távozás).
   A távozás napja már nem éjszaka, és a ház aznap újra foglalható.
   ============================================================ */

/* A hónapnevek és a rövid napnevek nyelvenként. A dátumot minden
   nyelv a saját szokása szerint írjuk ki:
     magyar  → 2026. július 10.        német → 10. Juli 2026
     angol   → 10 July 2026
   A hét mindenhol hétfővel kezdődik. */
const HONAPOK = {
  hu: ['január', 'február', 'március', 'április', 'május', 'június',
       'július', 'augusztus', 'szeptember', 'október', 'november', 'december'],
  de: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
       'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
  en: ['January', 'February', 'March', 'April', 'May', 'June',
       'July', 'August', 'September', 'October', 'November', 'December'],
};

const NAPOK_ROVID = {
  hu: ['H', 'K', 'Sze', 'Cs', 'P', 'Szo', 'V'],
  de: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
  en: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
};

/** Az éppen beállított nyelv. A felület állítja `nyelvBeallit`-tal;
    a dátumfüggvényeknek így nem kell minden hívásnál átadni. */
let AKTUALIS_NYELV = 'hu';
function nyelvBeallit(nyelv) { AKTUALIS_NYELV = nyelv; }
function honapNevek() { return HONAPOK[AKTUALIS_NYELV] || HONAPOK.hu; }
function napNevek() { return NAPOK_ROVID[AKTUALIS_NYELV] || NAPOK_ROVID.hu; }

/** Egy Date-ből ÉÉÉÉ-HH-NN. Helyi idő szerint, nem UTC szerint: a
    vendég a saját naptárára gondol, amikor dátumot választ. */
function isoNap(d) {
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0')
    + '-' + String(d.getDate()).padStart(2, '0');
}

function ma() {
  return isoNap(new Date());
}

function datumbol(iso) {
  const [e, h, n] = iso.split('-').map(Number);
  return new Date(e, h - 1, n);
}

/** Dátum eltolása napokkal. plusNap('2026-07-01', 3) → '2026-07-04' */
function plusNap(iso, nap) {
  const d = datumbol(iso);
  d.setDate(d.getDate() + nap);
  return isoNap(d);
}

/** Hány éjszaka az érkezés és a távozás között. */
function ejszakak(tol, ig) {
  if (!tol || !ig) return 0;
  const ms = datumbol(ig).getTime() - datumbol(tol).getTime();
  return Math.max(0, Math.round(ms / 86400000));
}

/** A tartózkodás éjszakái, egyesével. A távozás napja nincs köztük. */
function ejszakaLista(tol, ig) {
  const ki = [];
  for (let i = 0; i < ejszakak(tol, ig); i++) ki.push(plusNap(tol, i));
  return ki;
}

/** Átfed-e két időszak. Mindkettő [tól, ig) logikájú. */
function atfed(aTol, aIg, bTol, bIg) {
  return aTol < bIg && bTol < aIg;
}

/** Egy dátum a nyelv szokása szerint. */
function datumSzoveg(iso) {
  if (!iso) return '';
  const d = datumbol(iso);
  const ho = honapNevek()[d.getMonth()];
  if (AKTUALIS_NYELV === 'de') return d.getDate() + '. ' + ho + ' ' + d.getFullYear();
  if (AKTUALIS_NYELV === 'en') return d.getDate() + ' ' + ho + ' ' + d.getFullYear();
  return d.getFullYear() + '. ' + ho + ' ' + d.getDate() + '.';
}

/** Időszak rövid alakban, ha egy hónapba esik:
      magyar → 2026. július 10–13.
      német  → 10.–13. Juli 2026
      angol  → 10–13 July 2026 */
function idoszakSzoveg(tol, ig) {
  if (!tol || !ig) return '';
  const a = datumbol(tol), b = datumbol(ig);
  const egyHonap = a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
  const egyEv = a.getFullYear() === b.getFullYear();
  const hoA = honapNevek()[a.getMonth()], hoB = honapNevek()[b.getMonth()];

  if (AKTUALIS_NYELV === 'de') {
    if (egyHonap) return a.getDate() + '.–' + b.getDate() + '. ' + hoA + ' ' + a.getFullYear();
    if (egyEv) return a.getDate() + '. ' + hoA + ' – ' + b.getDate() + '. ' + hoB + ' ' + a.getFullYear();
    return datumSzoveg(tol) + ' – ' + datumSzoveg(ig);
  }
  if (AKTUALIS_NYELV === 'en') {
    if (egyHonap) return a.getDate() + '–' + b.getDate() + ' ' + hoA + ' ' + a.getFullYear();
    if (egyEv) return a.getDate() + ' ' + hoA + ' – ' + b.getDate() + ' ' + hoB + ' ' + a.getFullYear();
    return datumSzoveg(tol) + ' – ' + datumSzoveg(ig);
  }
  if (egyHonap) return a.getFullYear() + '. ' + hoA + ' ' + a.getDate() + '–' + b.getDate() + '.';
  if (egyEv) return a.getFullYear() + '. ' + hoA + ' ' + a.getDate() + '. — ' + hoB + ' ' + b.getDate() + '.';
  return datumSzoveg(tol) + ' — ' + datumSzoveg(ig);
}

/** Egy hónap neve és éve a naptár fejlécéhez. */
function honapCim(iso) {
  const d = datumbol(iso);
  const ho = honapNevek()[d.getMonth()];
  return AKTUALIS_NYELV === 'hu' ? d.getFullYear() + '. ' + ho : ho + ' ' + d.getFullYear();
}

/** A hónap napjai hétfővel kezdődő rácsba rendezve (elején üres helyekkel). */
function honapRacs(horgony) {
  const d = datumbol(horgony);
  const elso = new Date(d.getFullYear(), d.getMonth(), 1);
  const napokSzama = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  const eltolas = (elso.getDay() + 6) % 7;  // vasárnap = 0 → hétfő-alapra
  const cellak = new Array(eltolas).fill(null);
  for (let i = 1; i <= napokSzama; i++) cellak.push(isoNap(new Date(d.getFullYear(), d.getMonth(), i)));
  while (cellak.length % 7 !== 0) cellak.push(null);
  return cellak;
}

/** „225 600 Ft” — a pénznem mindhárom nyelven forint, csak az ezres
    tagolás jele más: magyarul és németül szóköz, angolul vessző. */
function forint(szam) {
  const egesz = Math.round(szam || 0);
  const jel = AKTUALIS_NYELV === 'en' ? ',' : ' ';
  return String(egesz).replace(/\B(?=(\d{3})+(?!\d))/g, jel) + ' Ft';
}

/* ============================================================
   2. SZEZON ÉS ÁR
   ============================================================ */

/** Melyik szezonba esik egy adott éjszaka.
    A lista SORRENDJE dönt: az első találat nyer, ezért áll a kötött
    nyári turnus a szezonlista elején. */
function szezonja(nap) {
  return SZEZONOK.find((sz) => nap >= sz.tol && nap < sz.ig)
    || { nevKulcs: 'elo', ev: datumbol(nap).getFullYear(), arEjszakankent: 55000, minEjszaka: 3 };
}

/** A tartózkodásra érvényes szabályok: a benne lévő legszigorúbb szezon dönt. */
function szabalyok(tol, ig) {
  const napok = ejszakaLista(tol, ig);
  if (napok.length === 0) {
    const sz = szezonja(tol);
    return { minEjszaka: sz.minEjszaka, kototEjszaka: sz.kototEjszaka, valtonap: sz.valtonap, szezonKulcs: sz.nevKulcs };
  }
  let ki = { minEjszaka: 0, szezonKulcs: '' };
  for (const nap of napok) {
    const sz = szezonja(nap);
    if (sz.minEjszaka > ki.minEjszaka) ki = { ...ki, minEjszaka: sz.minEjszaka, szezonKulcs: sz.nevKulcs };
    if (sz.kototEjszaka) ki = { ...ki, kototEjszaka: sz.kototEjszaka, valtonap: sz.valtonap, szezonKulcs: sz.nevKulcs };
  }
  return ki;
}

/** Megfelel-e a tartózkodás a szezon szabályainak.

    FONTOS: ez a függvény nem ad vissza kész mondatot, csak KÓDOT és a
    behelyettesítendő számokat. A szöveg a felületen készül el, a
    választott nyelven (lásd `hibaUzenet` a felulet.js-ben). Így a
    logika nyelvfüggetlen marad. */
function szabalyosE(tol, ig) {
  const ej = ejszakak(tol, ig);
  if (ej <= 0) return { ok: false, ok_kod: 'rossz-idoszak' };

  const sz = szabalyok(tol, ig);

  // Kötött turnus: pontosan annyi éjszaka, és csak a váltónapon kezdhető.
  if (sz.kototEjszaka) {
    if (ej !== sz.kototEjszaka || datumbol(tol).getDay() !== sz.valtonap) {
      return { ok: false, ok_kod: 'turnus', ejszakaSzam: sz.kototEjszaka, valtonap: sz.valtonap ?? 6 };
    }
    return { ok: true };
  }

  if (ej < sz.minEjszaka) {
    return { ok: false, ok_kod: 'min-ejszaka', ejszakaSzam: sz.minEjszaka };
  }
  return { ok: true };
}


/**
 * A teljes ár, tételesen.
 * Fontos: minden éjszaka A SAJÁT szezonja szerint árazódik, tehát egy
 * szezonhatáron átnyúló tartózkodás vegyes áron jön ki.
 * A létszám az árat NEM befolyásolja, csak az idegenforgalmi adót.
 */
function arat(tol, ig, felnott, gyerek, valasztottExtrak, visszateroVendeg) {
  const ej = ejszakak(tol, ig);
  const ejszakankent = ejszakaLista(tol, ig).map((nap) => {
    const sz = szezonja(nap);
    return { nap, ar: sz.arEjszakankent, szezonKulcs: sz.nevKulcs };
  });

  const szallasdij = ejszakankent.reduce((ossz, e) => ossz + e.ar, 0);

  const extraSorok = (valasztottExtrak || [])
    .map((id) => EXTRAK.find((x) => x.id === id))
    .filter(Boolean)
    .map((x) => ({ id: x.id, osszeg: x.ar }));
  const extrakOsszesen = extraSorok.reduce((o, sor) => o + sor.osszeg, 0);

  // Idegenforgalmi adó csak a 18 év felettiek után.
  const ifa = IFA_FELNOTT_EJ * felnott * ej;

  const osszesen = szallasdij + extrakOsszesen + ifa;
  // A foglaló a SZÁLLÁSDÍJ 30%-a, százasra kerekítve — nem az adóból
  // és nem a kaucióból.
  const foglalo = Math.round((szallasdij * FOGLALO_ARANY) / 100) * 100;

  return {
    ejszakak: ej,
    ejszakankent,
    szallasdij,
    extraSorok,
    extrakOsszesen,
    ifa,
    osszesen,
    foglalo,
    hatralek: osszesen - foglalo,
    kaucio: visszateroVendeg ? 0 : KAUCIO,
    atlagEjszaka: ej > 0 ? Math.round(szallasdij / ej) : 55000,
  };
}

/* ============================================================
   3. TÁROLÁS

   A foglalások a böngésző saját tárolójába (localStorage) kerülnek.
   Ez azt jelenti: ami ezen a gépen, ebben a böngészőben történik, az
   itt marad — nincs szerver mögötte. Éles oldalon ezt a három
   függvényt kell szerverhívásra cserélni, és minden más mehet tovább.
   ============================================================ */

const TAROLO_KULCS = 'riverside-foglalasok';

function foglalasokBetolt() {
  try {
    const mentett = localStorage.getItem(TAROLO_KULCS);
    if (mentett) return JSON.parse(mentett);
  } catch (e) {
    // Privát ablakban vagy letiltott tárolónál ide jutunk: ilyenkor
    // csak a demóadatokkal dolgozunk, és az oldal működik tovább.
  }
  return DEMO_FOGLALASOK.map((d) => ({
    azonosito: d.azonosito,
    nev: d.nev,
    email: d.email,
    erkezes: plusNap(ma(), d.tol),
    tavozas: plusNap(ma(), d.ig),
    felnott: d.felnott,
    gyerek: d.gyerek,
    kanape: d.felnott + d.gyerek > HAZ.alapFerohely,
    gyerekagy: false,
    etetoszek: false,
    extrak: [],
    allapot: d.allapot,
    foglalo: arat(plusNap(ma(), d.tol), plusNap(ma(), d.ig), d.felnott, d.gyerek, [], false).foglalo,
    osszesen: arat(plusNap(ma(), d.tol), plusNap(ma(), d.ig), d.felnott, d.gyerek, [], false).osszesen,
  }));
}

function foglalasokMent(lista) {
  try {
    localStorage.setItem(TAROLO_KULCS, JSON.stringify(lista));
  } catch (e) { /* ha nem megy, a lap attól még működik */ }
}

/** Visszaállítja a kiinduló demóadatokat. */
function demoVisszaallit() {
  try { localStorage.removeItem(TAROLO_KULCS); } catch (e) { /* nem baj */ }
}

/** Új azonosító: RV-év-hónapnap + két véletlen jegy, hogy ne ütközzön. */
function ujAzonosito(erkezes) {
  const [e, h, n] = erkezes.split('-');
  return 'RV-' + e + '-' + h + n + '-' + String(Math.floor(Math.random() * 90) + 10);
}

/* ============================================================
   4. SZABAD-E A HÁZ

   Egyetlen naptár van, mert a házat egyben adjuk ki. Lemondott
   foglalás nem foglal helyet.
   ============================================================ */

const FOGLALO_ALLAPOTOK = ['fuggoben', 'visszaigazolt'];

function szabadE(tol, ig, foglalasok) {
  if (!tol || !ig || tol >= ig) return false;
  return !foglalasok.some((f) =>
    FOGLALO_ALLAPOTOK.includes(f.allapot) && atfed(tol, ig, f.erkezes, f.tavozas));
}

/** Foglalt-e egy adott éjszaka — a naptár színezéséhez. */
function foglaltNapE(nap, foglalasok) {
  return foglalasok.some((f) =>
    FOGLALO_ALLAPOTOK.includes(f.allapot) && nap >= f.erkezes && nap < f.tavozas);
}

/**
 * Egy helyen dönti el, foglalható-e az időszak.
 * A sorrend szándékos: előbb a múlt, aztán a létszám, aztán a szezon
 * szabályai, végül az ütközés — így mindig a legbeszédesebb hibát kapjuk.
 */
function ellenoriz(tol, ig, felnott, gyerek, foglalasok) {
  const fok = felnott + gyerek;
  const ar = ejszakak(tol, ig) > 0 ? arat(tol, ig, felnott, gyerek, [], false) : null;
  const alap = { ar, szabalyok: szabalyok(tol, ig), javaslatok: [] };

  if (tol && tol < ma()) {
    return { ...alap, szabad: false, ok_kod: 'mult', javaslatok: javasolIdopontot(ma(), ig, foglalasok) };
  }
  if (fok > HAZ.maxFerohely) {
    // Más dátum ezen nem segít, ezért itt nem ajánlunk alternatívát.
    return { ...alap, szabad: false, ok_kod: 'letszam', maxFo: HAZ.maxFerohely };
  }
  const sz = szabalyosE(tol, ig);
  if (!sz.ok) {
    return {
      ...alap, szabad: false, ok_kod: sz.ok_kod,
      ejszakaSzam: sz.ejszakaSzam, valtonap: sz.valtonap,
      javaslatok: sz.ok_kod === 'rossz-idoszak' ? [] : javasolIdopontot(tol, ig, foglalasok),
    };
  }
  if (!szabadE(tol, ig, foglalasok)) {
    return { ...alap, szabad: false, ok_kod: 'foglalt', javaslatok: javasolIdopontot(tol, ig, foglalasok) };
  }
  return { ...alap, szabad: true };
}

/* ============================================================
   5. ALTERNATÍV IDŐPONTOK

   A „betelt” önmagában zsákutca: a vendég vagy telefonál, vagy elmegy.
   Ezért ha a kért időpont nem megy, a kért érkezéstől kifelé haladva
   (0, +1, -1, +2, -2 …) keressük a legközelebbi olyan időszakokat,
   amelyek szabadok ÉS megfelelnek a szezon szabályainak.
   ============================================================ */

function javasolIdopontot(tol, ig, foglalasok, darab = 3, tavolsag = 120) {
  if (!tol) return [];
  const kertEj = Math.max(1, ejszakak(tol, ig));
  const talalt = [];

  for (let i = 0; i <= tavolsag && talalt.length < darab; i++) {
    for (const irany of i === 0 ? [0] : [1, -1]) {
      if (talalt.length >= darab) break;
      const kezdes = plusNap(tol, i * irany);
      if (kezdes < ma()) continue;

      // A szezon dönti el, milyen hosszú tartózkodás ajánlható.
      const sz = szezonja(kezdes);
      let ej = kertEj;
      if (sz.kototEjszaka) {
        if (datumbol(kezdes).getDay() !== sz.valtonap) continue;
        ej = sz.kototEjszaka;
      } else {
        ej = Math.max(kertEj, szabalyok(kezdes, plusNap(kezdes, kertEj)).minEjszaka);
      }

      const vege = plusNap(kezdes, ej);
      if (!szabalyosE(kezdes, vege).ok) continue;
      if (!szabadE(kezdes, vege, foglalasok)) continue;
      // Ne ajánljunk egymást átfedő időszakokat — az nem valódi választás.
      if (talalt.some((j) => kezdes < j.tavozas && j.erkezes < vege)) continue;

      talalt.push({
        erkezes: kezdes,
        tavozas: vege,
        ejszakak: ej,
        eltolas: Math.round((datumbol(kezdes) - datumbol(tol)) / 86400000),
        szallasdij: ejszakaLista(kezdes, vege).reduce((o, n) => o + szezonja(n).arEjszakankent, 0),
      });
    }
  }
  return talalt.sort((a, b) => Math.abs(a.eltolas) - Math.abs(b.eltolas));
}

/* ============================================================
   6. LEMONDÁS
   ============================================================ */

/** Meddig ingyenes a lemondás, és most még az-e. */
function lemondasiAllapot(foglalas) {
  const hatarido = plusNap(foglalas.erkezes, -INGYENES_LEMONDAS_NAP);
  return {
    hatarido,
    ingyenes: ma() <= hatarido,
    lemondhato: FOGLALO_ALLAPOTOK.includes(foglalas.allapot) && foglalas.erkezes > ma(),
  };
}

/** Azonosító ÉS e-mail együtt azonosít — az azonosító önmagában nem elég,
    mert az e-mailben utazik. */
function foglalastKeres(azonosito, email, foglalasok) {
  const a = (azonosito || '').trim().toLowerCase();
  const e = (email || '').trim().toLowerCase();
  if (!a || !e) return null;
  return foglalasok.find((f) => f.azonosito.toLowerCase() === a && f.email.toLowerCase() === e) || null;
}
