/* ============================================================
   RIVERSIDE — OLDALGYÁRTÓ

   Ez a fájl állítja elő a 33 kész HTML oldalt (11 oldal × 3 nyelv)
   a szótárból és a tartalomból. Futtatás a projekt gyökeréből:

       node eszkozok/oldalgyarto.mjs

   MIÉRT VAN RÁ SZÜKSÉG:
   A weboldal külön HTML fájlokból áll — ez a helyes, mert a böngésző
   így valódi linkeken lépked, és minden oldal önmagában is teljes.
   A fejléc, a lábléc és a szövegek viszont mind a 33 oldalon
   ugyanazok. Ha kézzel írnánk őket, egy telefonszám átírása 33
   fájlt érintene. Ezért a szöveg egy helyen él (js/szotar.js és
   js/tartalom.js), és ez a gyártó írja ki belőle az oldalakat.

   HA CSAK SZÖVEGET MÓDOSÍTASZ: írd át a szótárban, és futtasd ezt.
   HA CSAK EGY OLDAL ELRENDEZÉSÉT: szerkesztheted közvetlenül a HTML
   fájlt is — de akkor a gyártót ne futtasd újra, mert felülírná.
   A tartós megoldás ilyenkor az, hogy az eszkozok/oldalak.mjs-ben
   írod át az adott oldal sablonját.

   AMI NEM ITT VAN: a viselkedés (naptár, foglalás, galéria) a js/
   mappában, a kinézet a css/ mappában. Ez a fájl csak HTML-t ír.
   ============================================================ */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { OLDAL_SABLONOK } from './oldalak.mjs';

const ITT = path.dirname(fileURLToPath(import.meta.url));
const GYOKER = path.join(ITT, '..');

/* ---------- 1. Az adat- és szótárfájlok beolvasása ----------
   A js/ mappa fájljai a böngészőnek készültek: egyszerű
   globális változókat hoznak létre. Itt egyetlen függvénybe
   fűzve futtatjuk őket, és elkérjük, amire szükségünk van. */

/* A fotók valódi képpontmérete. Azért kerül a HTML-be, mert e nélkül
   a böngésző csak a kép letöltése után tudja, mennyi helyet foglal —
   addig a lap alatta lévő része ugrál (ez a „layout shift", amit a
   Google a Core Web Vitals között mér). A listát az eszkozok/
   kepmeretek.json tartja; új fotónál elég oda felvenni. */
const KEPMERETEK = JSON.parse(fs.readFileSync(path.join(ITT, 'kepmeretek.json'), 'utf8'));

/* A végleges cím. A canonical, az og: mezők és a sitemap ebből épül —
   élesítés előtt ezt az egy sort kell átírni. */
const HELYSZIN = 'https://riverside-koeroes.com';

const FORRASOK = ['szotar.js', 'tartalom.js', 'adatok.js', 'logika.js'];
const egybe = FORRASOK.map((f) => fs.readFileSync(path.join(GYOKER, 'js', f), 'utf8')).join('\n;\n');
const KORNYEZET = new Function(`${egybe}
  return { SZOVEG, szoveg, TARTALOM, tartalom, fotoFelirat, NYELVEK, UTVONALAK, ut,
           HAZ, CIMKEK, KAPCSOLAT, SZEZONOK, EXTRAK, FOTOK, FOTO_KATEGORIAK, KORNYEK_IKONOK,
           HAZIREND_SORREND, IFA_FELNOTT_EJ, KAUCIO, FOGLALO_ARANY, INGYENES_LEMONDAS_NAP,
           forint, datumSzoveg, nyelvBeallit, MOSTANI_EV };`)();

const { SZOVEG, szoveg, tartalom, fotoFelirat, NYELVEK, UTVONALAK, HAZ, CIMKEK, KAPCSOLAT,
  SZEZONOK, EXTRAK, FOTOK, FOTO_KATEGORIAK, KORNYEK_IKONOK, HAZIREND_SORREND,
  IFA_FELNOTT_EJ, KAUCIO, FOGLALO_ARANY, INGYENES_LEMONDAS_NAP, forint, datumSzoveg,
  nyelvBeallit, MOSTANI_EV } = KORNYEZET;

/* ---------- 2. Oldalak és fájlnevek ---------- */

/* A menüben ebben a sorrendben szerepelnek. A `fooldal` fájlneve
   mindig index.html, a többié a szótár útvonalszava. */
const OLDALAK = ['fooldal', 'haz', 'arak', 'galeria', 'kornyek', 'foglalas',
  'foglalasom', 'hazirend', 'kapcsolat', 'adatkezeles', 'impresszum'];

/** Egy oldal fájlneve az adott nyelven: ('de','arak') → 'de/preise.html' */
function fajl(ny, kulcs) {
  const mappa = ny === 'hu' ? '' : ny + '/';
  if (kulcs === 'fooldal') return mappa + 'index.html';
  return mappa + UTVONALAK[ny][kulcs] + '.html';
}

/** Relatív hivatkozás egyik oldalról a másikra. A német és az angol
    oldalak egy mappával lejjebb ülnek, onnan `../` a kifelé vezető út. */
function link(honnanNy, hovaNy, hovaKulcs) {
  const fel = honnanNy === 'hu' ? '' : '../';
  return fel + fajl(hovaNy, hovaKulcs);
}

/* ---------- 3. Szövegkezelés ---------- */

/** HTML-be írható szöveg. Minden szótári szöveg ezen megy keresztül. */
function h(szoveg) {
  return String(szoveg ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Néhány szótári szöveg tömböt ad vissza, mert link vagy kiemelés
    van a közepén: ['Elfogadom a ', LINK]. A szöveges részeket
    biztonságosra alakítja, a lyukakat pedig sorban kitölti a kapott
    HTML-darabokkal. */
function fuz(reszek, ...beszurasok) {
  let i = 0;
  return reszek.map((r) => (typeof r === 'string' ? h(r) : (beszurasok[i++] ?? ''))).join('');
}

/* ---------- 4. Közös elemek ----------
   Ugyanazok az osztálynevek, mint a design systemben — a CSS-t nem
   kell hozzáigazítani semmihez. */

function komponensek(ctx) {
  const K = {};

  K.gomb = ({ fajta = 'primary', meret = 'md', teljes, href, id, tipus = 'button', sz, extra = '' }) => {
    const cls = ['rv-btn', 'rv-btn--' + fajta, 'rv-btn--' + meret, teljes ? 'rv-btn--block' : ''].filter(Boolean).join(' ');
    const azon = id ? ` id="${id}"` : '';
    if (href) return `<a class="${cls}" href="${h(href)}"${azon} ${extra}>${h(sz)}</a>`;
    return `<button type="${tipus}" class="${cls}"${azon} ${extra}>${h(sz)}</button>`;
  };

  K.kartya = ({ fajta = 'default', belso = 'md', cls = '', style = '', id = '', body }) => {
    const test = belso === 'lg' ? 'rv-card__body rv-card__body--lg'
      : belso === 'none' ? 'rv-card__body rv-card__body--none' : 'rv-card__body';
    return `<div class="rv-card rv-card--${fajta}${cls ? ' ' + cls : ''}"${id ? ` id="${id}"` : ''}${style ? ` style="${style}"` : ''}>
      <div class="${test}">${body}</div>
    </div>`;
  };

  K.jelveny = (szin, sz) => `<span class="rv-badge rv-badge--${szin}">${h(sz)}</span>`;

  /** Legördülő mező. A nyíl nem dísz: e nélkül a mező szövegmezőnek
      látszik, és nem derül ki, hogy választani lehet belőle. */
  K.legordulo = ({ id, cimke, opciok }) => `<div class="rv-select">
      <select class="rv-select__el" id="${id}"${cimke ? ` aria-label="${h(cimke)}"` : ''}>${opciok}</select>
      <span class="rv-select__chev" aria-hidden="true">▾</span>
    </div>`;
  K.cimke = (sz) => `<span class="rv-tag">${h(sz)}</span>`;

  /** A ház jellemzői egy sorban (medence, stég, horgászat …).

      Amelyikhez tartozik fotó, az link: a galériát nyitja meg, arra a
      néhány képre szűrve. Amelyikhez nem, az sima felirat marad —
      olyan galériára mutatni, amiben nincs kép, csalódás volna. Hogy
      melyikhez van fotó, azt az adatok.js `CIMKEK` listája mondja meg. */
  K.hazCimkek = (extraOsztaly = '') => {
    const elemek = ctx.c.cimkek.map((felirat, i) => {
      const cimke = CIMKEK[i];
      if (!cimke || !cimke.fotok.length) return `<span class="rv-tag">${h(felirat)}</span>`;
      const cel = `${ctx.u('galeria')}?cimke=${cimke.kulcs}`;
      return `<a class="rv-tag rv-tag--link" href="${cel}"
        title="${h(ctx.t.cimkeFotok(felirat, cimke.fotok.length))}">${h(felirat)}</a>`;
    });
    return `<div class="rv-tags${extraOsztaly ? ' ' + extraOsztaly : ''}">${elemek.join('')}</div>`;
  };
  K.lista = (tetelek) => `<ul class="rv-list">${tetelek.map((x) => `<li>${h(x)}</li>`).join('')}</ul>`;

  /* Belépő burkoló. A megjelenést a js/animaciok.js kapcsolja be,
     amikor az elem a képernyőre ér; a mozgás a css/animations.css-ben. */
  K.megjelenes = (body, keses = 0) =>
    `<div class="rv-reveal"${keses ? ` style="--rv-delay:${keses}ms"` : ''}>${body}</div>`;

  /* Rács, amelynek elemei egymás után lépnek be. */
  K.lepteto = (cls, elemek, lepes = 70, max = 4) =>
    `<div class="${cls}">${elemek.map((e, i) =>
      `<div class="rv-reveal"${i ? ` style="--rv-delay:${Math.min(i, max) * lepes}ms"` : ''}>${e}</div>`).join('')}</div>`;

  /* A `fo: true` jelzi, hogy ez az oldal FŐ szekciója: a címe ilyenkor
     <h1> lesz, nem <h2>. Minden oldalon pontosan egy <h1> áll — ez
     mondja meg a keresőnek és a felolvasónak, miről szól a lap. */
  K.szekcio = ({ folott, cim, bevezeto, keskeny, id, body, fo }) => {
    const cimSzint = fo ? 'h1' : 'h2';
    const fej = (folott || cim || bevezeto) ? K.megjelenes(`<div class="rv-section__head">
        ${folott ? `<div class="rv-eyebrow rv-eyebrow--gap">${h(folott)}</div>` : ''}
        ${cim ? `<${cimSzint} class="rv-section__title">${h(cim)}</${cimSzint}>` : ''}
        ${bevezeto ? `<p class="rv-section__lead">${h(bevezeto)}</p>` : ''}
      </div>`) : '';
    return `<section${id ? ` id="${id}"` : ''} class="rv-container ${keskeny ? 'rv-container--narrow ' : ''}rv-section">
      ${fej}
      ${K.megjelenes(body, 90)}
    </section>`;
  };

  /** Fotó a képfájl nevéből. A felirat a tartalomból jön, a nyelv
      szerint — ez egyben az alt szöveg is. */
  K.kep = (fajl, { cls = 'rv-photo', style = '', loading = 'lazy' } = {}) => {
    const meret = KEPMERETEK[fajl];
    return `<img src="${ctx.eszkoz('assets/images/' + fajl)}" alt="${h(fotoFelirat(fajl, ctx.ny))}"
       class="${cls}"${style ? ` style="${style}"` : ''}${meret ? ` width="${meret[0]}" height="${meret[1]}"` : ''}
       loading="${loading}" decoding="async" />`;
  };

  K.sor = (cimke, ertek) =>
    `<div class="rv-summaryrow"><span class="rv-muted">${h(cimke)}</span><span>${h(ertek)}</span></div>`;

  /** A kereskedelmi feltételek kivonata — ott, ahol a döntés születik. */
  K.feltetelek = (foglaloOsszeg) => {
    const t = ctx.t;
    const sorok = [
      [t.feltFoglalo, foglaloOsszeg ? t.feltFoglaloOsszeg(forint(foglaloOsszeg)) : t.feltFoglaloSzazalek(Math.round(FOGLALO_ARANY * 100))],
      [t.feltHatralek, t.feltHatralekSzoveg],
      [t.osszIfa, t.feltIfaSzoveg(forint(IFA_FELNOTT_EJ))],
      [t.osszKaucio, t.feltKaucioSzoveg(forint(KAUCIO))],
      [t.feltLemondas, t.feltLemondasSzoveg(INGYENES_LEMONDAS_NAP)],
    ];
    return `<div class="rv-terms">
      ${sorok.map(([cimke, sz]) => `<div class="rv-spread rv-terms__row">
        <span class="rv-muted">${h(cimke)}</span><span class="rv-terms__val">${h(sz)}</span>
      </div>`).join('')}
      <a class="rv-row" href="${ctx.u('hazirend')}">${h(t.feltTeljesHazirend)} →</a>
    </div>`;
  };

  /* Az alternatív időpontok helye. Üresen indul: a js/foglalas.js
     tölti fel, ha a kért időpont nem megy. */
  K.alternativakHely = (id) => `<div class="rv-alts" id="${id}" hidden></div>`;

  return K;
}

/* ---------- 5. Fejléc és lábléc ---------- */

function fejlec(ctx) {
  const { t, ny, oldal, u, K } = ctx;
  const menu = [['haz', t.menuHaz], ['arak', t.menuArak], ['galeria', t.menuGaleria],
    ['kornyek', t.menuKornyek || t.kornyekFolott], ['kapcsolat', t.menuKapcsolat]];
  const fiokMenu = menu.concat([['foglalasom', t.menuFoglalasom], ['hazirend', t.menuHazirend]]);

  const nyelvek = NYELVEK.map((n) =>
    `<a class="rv-lang${n === ny ? ' rv-lang--on' : ''}" href="${link(ny, n, oldal)}" lang="${n}"
        ${n === ny ? 'aria-current="true"' : ''} title="${h(SZOVEG[n].nyelvNeve)}">${n.toUpperCase()}</a>`).join('');

  return `<header class="rv-header${oldal === 'fooldal' ? ' rv-header--top' : ''}">
  <div class="rv-header__inner">
    <a class="rv-wordmark" href="${u('fooldal')}">
      <span class="rv-wordmark__name">${h(HAZ.nev)}</span>
      <span class="rv-wordmark__sub">Békésszentandrás</span>
    </a>
    <nav class="rv-nav" aria-label="${h(t.menuGomb)}">
      ${menu.map(([kulcs, nev]) =>
    `<a class="rv-navlink${oldal === kulcs ? ' rv-navlink--active' : ''}" href="${u(kulcs)}"
          ${oldal === kulcs ? 'aria-current="page"' : ''}>${h(nev)}</a>`).join('\n      ')}
    </nav>
    <div class="rv-header__actions">
      <div class="rv-langs" role="group" aria-label="${h(t.nyelvvalaszto)}">${nyelvek}</div>
      <a class="rv-header__phone" href="${h(KAPCSOLAT.telefonLink)}">${h(KAPCSOLAT.telefon)}</a>
      ${K.gomb({ fajta: 'accent', href: u('foglalas'), sz: t.menuFoglalas })}
      <button type="button" class="rv-header__burger rv-iconbtn" id="rv-burger"
              aria-label="${h(t.menuGomb)}" aria-expanded="false" aria-controls="rv-drawer">☰</button>
    </div>
  </div>
  <!-- Diszkrét haladásjelző a fejléc alsó élén — görgetés közben nő. -->
  <span class="rv-progress" aria-hidden="true"></span>
  <div class="rv-drawer" id="rv-drawer" hidden>
    <div class="rv-drawer__inner">
      ${fiokMenu.map(([kulcs, nev]) => `<a class="rv-drawer__link" href="${u(kulcs)}">${h(nev)}</a>`).join('\n      ')}
    </div>
  </div>
</header>`;
}

function lablec(ctx) {
  const { t, u } = ctx;
  return `<footer class="rv-footer">
  <div class="rv-footer__grid">
    <div>
      <div class="rv-footer__mark">${h(HAZ.nev)}</div>
      <p class="rv-footer__col rv-footer__intro">${h(t.lablecBevezeto(HAZ.alapFerohely, HAZ.potFerohely))}</p>
    </div>
    <nav class="rv-footer__col" aria-label="${h(t.lablecHaz)}">
      <span class="rv-eyebrow rv-footer__eyebrow">${h(t.lablecHaz)}</span>
      <a href="${u('haz')}">${h(t.lablecHazFelszereltseg)}</a>
      <a href="${u('galeria')}">${h(t.menuGaleria)}</a>
      <a href="${u('arak')}">${h(t.lablecArak)}</a>
      <a href="${u('foglalas')}">${h(t.menuFoglalas)}</a>
      <a href="${u('foglalasom')}">${h(t.menuFoglalasom)}</a>
    </nav>
    <address class="rv-footer__col">
      <span class="rv-eyebrow rv-footer__eyebrow">${h(t.lablecKapcsolat)}</span>
      <a href="${h(KAPCSOLAT.telefonLink)}">${h(KAPCSOLAT.telefon)}</a>
      <a href="mailto:${h(KAPCSOLAT.email)}">${h(KAPCSOLAT.email)}</a>
      <span>${h(KAPCSOLAT.cim)}</span>
      <a href="${u('kapcsolat')}">${h(t.menuKapcsolat)}</a>
    </address>
    <nav class="rv-footer__col" aria-label="${h(t.lablecJoTudni)}">
      <span class="rv-eyebrow rv-footer__eyebrow">${h(t.lablecJoTudni)}</span>
      <a href="${u('hazirend')}">${h(t.menuHazirend)}</a>
      <a href="${u('adatkezeles')}">${h(t.menuAdatkezeles)}</a>
      <a href="${u('impresszum')}">${h(t.menuImpresszum)}</a>
      <button type="button" class="rv-linkbtn" id="rv-demo-vissza">${h(t.lablecDemo)}</button>
    </nav>
  </div>
  <div class="rv-footer__bar">
    <div class="rv-footer__barInner">
      <span>© ${MOSTANI_EV} ${h(HAZ.nev)} · ${h(KAPCSOLAT.tulajdonosok)}</span>
      <span>NTAK: ${h(KAPCSOLAT.ntak)}</span>
    </div>
  </div>
</footer>`;
}

/** A mobil foglalási sáv. A foglalási oldalon nincs rá szükség:
    ott saját ragadó sáv mutatja a végösszeget. */
function mobilSav(ctx) {
  const { t, u, K } = ctx;
  const legolcsobb = Math.min(...SZEZONOK.map((sz) => sz.arEjszakankent));
  return `<div class="rv-ctabar">
  <div class="rv-ctabar__price">
    <span class="rv-ctabar__from">${h(forint(legolcsobb))}</span>
    <span class="rv-ctabar__note">${h(t.perEj)} · ${h(t.aTeljesHazra)}</span>
  </div>
  ${K.gomb({ fajta: 'accent', href: u('foglalas'), sz: t.menuFoglalas })}
</div>`;
}

/* ---------- 5/b. Strukturált adat ----------
   A keresők ebből tudják meg, hogy szálláshelyről van szó, hol van,
   mennyibe kerül és hogyan lehet elérni. Ugyanaz az adat, ami az
   oldalon is látszik — nem rejtett kulcsszavak. */

function t0(ctx) { return ctx.t; }

function szallashelyAdat(ctx) {
  const legolcsobb = Math.min(...SZEZONOK.map((sz) => sz.arEjszakankent));
  const legdragabb = Math.max(...SZEZONOK.map((sz) => sz.arEjszakankent));
  return {
    '@context': 'https://schema.org',
    '@type': 'VacationRental',
    name: HAZ.nev,
    description: ctx.t.heroLead(HAZ.alapFerohely, HAZ.potFerohely),
    url: HELYSZIN + '/' + fajl(ctx.ny, 'fooldal'),
    image: [HELYSZIN + '/assets/images/garden-dock-willow.jpg', HELYSZIN + '/assets/images/pool-1.jpg'],
    telephone: KAPCSOLAT.telefon,
    email: KAPCSOLAT.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Keresztháti üdülősor 86.',
      postalCode: '5561',
      addressLocality: 'Békésszentandrás',
      addressCountry: 'HU',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 46.88871763134489, longitude: 20.49571814291005 },
    numberOfRooms: HAZ.haloszobak.length,
    occupancy: { '@type': 'QuantitativeValue', maxValue: HAZ.maxFerohely },
    floorSize: { '@type': 'QuantitativeValue', value: HAZ.alapterulet, unitCode: 'MTK' },
    petsAllowed: true,
    priceRange: legolcsobb + '–' + legdragabb + ' HUF',
    checkinTime: '15:00',
    checkoutTime: '10:00',
  };
}

/** A gyakori kérdések strukturált formában — a Google ezeket ki is
    tudja emelni a találat alatt. Csak azokon az oldalakon, ahol a
    kérdések tényleg ott vannak a lapon. */
function strukturaltGyik(ctx, oldal) {
  if (oldal !== 'fooldal' && oldal !== 'haz') return '';
  const lista = oldal === 'fooldal' ? ctx.c.gyik.slice(0, 6) : ctx.c.gyik;
  const adat = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: lista.map((f) => ({
      '@type': 'Question',
      name: f.k,
      acceptedAnswer: { '@type': 'Answer', text: f.v },
    })),
  };
  return '\n<script type="application/ld+json">' + JSON.stringify(adat) + '</script>';
}

/* ---------- 6. Az oldal váza ---------- */

function oldalVaz(ctx, { cim, leiras, torzs, scriptek = [], sajatSav }) {
  const { ny, oldal, eszkoz, u } = ctx;
  const fooldalE = oldal === 'fooldal';

  /* A futó kód innen tudja meg, melyik nyelven és melyik oldalon van,
     és hova mutatnak a linkek. Ennyi az egyetlen beágyazott script. */
  const utak = {};
  for (const k of OLDALAK) utak[k] = u(k);

  /* A kereső és a közösségi megosztás fejlécei. A `canonical` mondja
     meg, melyik a lap hivatalos címe, a `hreflang` pedig azt, hogy a
     három nyelvi változat ugyanannak a lapnak a fordítása — e nélkül
     a kereső külön, egymással versengő oldalaknak látná őket. */
  const abszolut = (rel) => HELYSZIN + '/' + rel;
  const sajatCim = abszolut(fajl(ny, oldal));

  return `<!DOCTYPE html>
<html lang="${ny}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${h(cim)}</title>
<meta name="description" content="${h(leiras)}" />
<link rel="canonical" href="${sajatCim}" />
${NYELVEK.map((n) => `<link rel="alternate" hreflang="${n}" href="${abszolut(fajl(n, oldal))}" />`).join('\n')}
<link rel="alternate" hreflang="x-default" href="${abszolut(fajl('hu', oldal))}" />

<!-- Megosztáskor (üzenetben, közösségi oldalon) ez látszik. -->
<meta property="og:type" content="website" />
<meta property="og:site_name" content="${h(HAZ.nev)}" />
<meta property="og:locale" content="${ny === 'hu' ? 'hu_HU' : ny === 'de' ? 'de_DE' : 'en_GB'}" />
<meta property="og:title" content="${h(cim)}" />
<meta property="og:description" content="${h(leiras)}" />
<meta property="og:url" content="${sajatCim}" />
<meta property="og:image" content="${abszolut('assets/images/garden-dock-willow.jpg')}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="theme-color" content="#3f4a44" />

<link rel="stylesheet" href="${eszkoz('css/style.css')}" />
<link rel="stylesheet" href="${eszkoz('css/responsive.css')}" />
<link rel="stylesheet" href="${eszkoz('css/animations.css')}" />

<!-- Strukturált adat: a keresőnek ebből derül ki, hogy szálláshelyről
     van szó, hol van, mennyibe kerül és hogyan lehet elérni. -->
<script type="application/ld+json">${JSON.stringify(szallashelyAdat(ctx))}</script>${
  strukturaltGyik(ctx, oldal)}
</head>
<body>

<!-- Billentyűzettel érkezőknek: az első Tab a tartalomra ugrik, nem
     kell végigjárni a menüt minden oldalon. -->
<a class="rv-skiplink" href="#tartalom">${h(t0(ctx).ugrasTartalomra)}</a>

${fejlec(ctx)}

<!-- Állandó magasságú helykitöltő a rögzített fejléc alatt. Ezért nem
     ugrik meg a tartalom, amikor a fejléc görgetéskor összehúzódik.
     A főoldalon nincs rá szükség: ott a fejléc a fotóra ül rá. -->
<div class="rv-headerSpacer${fooldalE ? ' rv-headerSpacer--none' : ''}" aria-hidden="true"></div>

<main id="tartalom"${sajatSav ? '' : ' class="rv-hasCtabar"'}>
${torzs}
</main>

${lablec(ctx)}
${sajatSav ? '' : mobilSav(ctx)}

<script>
  /* Az oldal önazonossága: nyelv, oldalkulcs és a többi oldal címe.
     A js/ mappa fájljai ebből tudják, hova irányítsanak. */
  window.RV = { nyelv: '${ny}', oldal: '${oldal}', utak: ${JSON.stringify(utak)} };
</script>
<script src="${eszkoz('js/szotar.js')}"></script>
<script src="${eszkoz('js/tartalom.js')}"></script>
<script src="${eszkoz('js/adatok.js')}"></script>
<script src="${eszkoz('js/logika.js')}"></script>
<script src="${eszkoz('js/main.js')}"></script>
<script src="${eszkoz('js/navigacio.js')}"></script>
<script src="${eszkoz('js/animaciok.js')}"></script>
${scriptek.map((s) => `<script src="${eszkoz('js/' + s)}"></script>`).join('\n')}

</body>
</html>
`;
}

/* ---------- 7. Gyártás ---------- */

let darab = 0;
for (const ny of NYELVEK) {
  nyelvBeallit(ny);                      // a dátum- és árformázás is a nyelvet követi
  for (const oldal of OLDALAK) {
    const ctx = {
      ny, oldal,
      t: szoveg(ny),
      c: tartalom(ny),
      /** Hivatkozás egy másik oldalra, ezen a nyelven. */
      u: (kulcs) => link(ny, ny, kulcs),
      /** A css/, js/ és assets/ mappák elérése erről az oldalról. */
      eszkoz: (rel) => (ny === 'hu' ? '' : '../') + rel,
      h, fuz, link,
      adat: { HAZ, CIMKEK, KAPCSOLAT, SZEZONOK, EXTRAK, FOTOK, FOTO_KATEGORIAK, KORNYEK_IKONOK,
        HAZIREND_SORREND, IFA_FELNOTT_EJ, KAUCIO, FOGLALO_ARANY, INGYENES_LEMONDAS_NAP,
        MOSTANI_EV, forint, datumSzoveg, fotoFelirat },
    };
    ctx.K = komponensek(ctx);

    const sablon = OLDAL_SABLONOK[oldal];
    if (!sablon) throw new Error('nincs sablon: ' + oldal);
    const eredmeny = sablon(ctx);

    const utvonal = path.join(GYOKER, fajl(ny, oldal));
    fs.mkdirSync(path.dirname(utvonal), { recursive: true });
    fs.writeFileSync(utvonal, oldalVaz(ctx, eredmeny));
    darab++;
  }
}

/* ---------- 8. A keresőnek szóló két fájl ----------
   A sitemap felsorolja mind a 33 lapot, és mindegyiknél megmondja,
   hogy a másik két nyelv ugyanannak a lapnak a fordítása. A robots
   megmutatja, hol találja a sitemapet. */

fs.writeFileSync(path.join(GYOKER, 'sitemap.xml'), sitemapKeszit());
fs.writeFileSync(path.join(GYOKER, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${HELYSZIN}/sitemap.xml\n`);

function sitemapKeszit() {
  const sorok = [];
  for (const ny of NYELVEK) {
    for (const oldal of OLDALAK) {
      const alternativak = NYELVEK.map((n) =>
        `    <xhtml:link rel="alternate" hreflang="${n}" href="${HELYSZIN}/${fajl(n, oldal)}" />`).join('\n');
      sorok.push(`  <url>
    <loc>${HELYSZIN}/${fajl(ny, oldal)}</loc>
${alternativak}
    <changefreq>${oldal === 'fooldal' || oldal === 'arak' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${oldal === 'fooldal' ? '1.0' : oldal === 'foglalas' || oldal === 'haz' ? '0.9' : '0.6'}</priority>
  </url>`);
    }
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sorok.join('\n')}
</urlset>
`;
}

console.log(`Kész: ${darab} HTML oldal (${OLDALAK.length} oldal × ${NYELVEK.length} nyelv), sitemap.xml és robots.txt.`);
