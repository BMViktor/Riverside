/* ============================================================
   RIVERSIDE — AZ OLDALAK SABLONJAI

   Minden oldalhoz egy függvény. Kap egy `ctx`-et (nyelv, szótár,
   tartalom, közös elemek), és visszaad négy dolgot:

     cim       — a böngészőfül címe
     leiras    — a <meta description>
     torzs     — az oldal HTML törzse (a <main> belseje)
     scriptek  — mely js/ fájlok kellenek EZEN az oldalon
     sajatSav  — igaz, ha az oldalnak saját ragadó sávja van
                 (ilyenkor nem kerül rá a mobil foglalási sáv)

   A fejléc, a lábléc és a váz az oldalgyarto.mjs-ben van — ott
   egyszer, itt egyszer sem.

   A HTML itt SZÁNDÉKOSAN teljes: a kész oldalon minden szöveg,
   minden mező és minden kép ott van a forrásban. A JavaScript csak
   viselkedést ad hozzá (naptár, szűrés, számolás), tartalmat nem.
   ============================================================ */

export const OLDAL_SABLONOK = {};

/* ---------- FŐOLDAL ---------- */

OLDAL_SABLONOK.fooldal = (ctx) => {
  const { t, c, u, h, K, adat } = ctx;
  const { HAZ, KAPCSOLAT, SZEZONOK, KORNYEK_IKONOK, forint } = adat;
  const legolcsobb = Math.min(...SZEZONOK.map((sz) => sz.arEjszakankent));

  const hero = `<div class="rv-hero">
  <div class="rv-hero__media">
    ${K.kep('garden-dock-willow.jpg', { cls: 'rv-hero__img', loading: 'eager' })}
    <div class="rv-hero__overlay">
      <div class="rv-hero__inner">
        <div class="rv-eyebrow rv-hero__eyebrow">${h(t.heroFolott)}</div>
        <h1 class="rv-hero__title">${h(t.heroCim)}</h1>
        <p class="rv-hero__lead">${h(t.heroLead(HAZ.alapFerohely, HAZ.potFerohely))}</p>
        <div class="rv-hero__cta">
          ${K.gomb({ fajta: 'accent', meret: 'lg', href: u('foglalas'), sz: t.heroGomb1 })}
          ${K.gomb({ fajta: 'inverse', meret: 'lg', href: u('haz'), sz: t.heroGomb2 })}
        </div>
      </div>
    </div>
  </div>
</div>`;

  const intro = K.szekcio({
    folott: t.introFolott, cim: t.introCim,
    body: `<div class="rv-grid rv-grid--split">
      <div class="rv-stack rv-stack--prose">
        <p>${h(c.introP1)}</p>
        <p>${h(c.introP2)}</p>
        ${K.hazCimkek()}
      </div>
      <div class="rv-grid rv-grid--2">
        ${K.kep('pool-1.jpg', { cls: 'rv-photo rv-photo--tall' })}
        ${K.kep('garden-kayak.jpg', { cls: 'rv-photo rv-photo--tall rv-photo--offset' })}
      </div>
    </div>`,
  });

  const haloKartyak = HAZ.haloszobak.map((sz, i) => {
    const leiras = c.haloszobak[i];
    return K.kartya({
      belso: 'none',
      body: `${K.kep(sz.kep)}
        <div class="rv-roomcard__body">
          <div class="rv-spread">
            <h3 class="rv-display rv-h-24">${h(leiras.nev)}</h3>
            ${K.jelveny(sz.kulcs === 'nappali' ? 'warning' : 'success',
        sz.kulcs === 'nappali' ? '+' + sz.ferohely : t.fok(sz.ferohely))}
          </div>
          <div class="rv-muted rv-meta">${h(leiras.szint)} · ${h(leiras.agyak)}</div>
          <p class="rv-small">${h(leiras.jellemzok[0])}</p>
        </div>`,
    });
  });

  const halo = K.szekcio({
    folott: t.haloFolott,
    cim: t.haloCim(HAZ.alapFerohely, HAZ.potFerohely),
    bevezeto: t.haloBevezeto,
    body: K.lepteto('rv-grid rv-grid--3', haloKartyak),
  });

  const velemenyek = K.szekcio({
    folott: t.velemenyFolott, cim: t.velemenyCim,
    body: K.lepteto('rv-grid rv-grid--3', c.velemenyek.map((v) => K.kartya({
      fajta: 'muted', belso: 'lg',
      body: `<blockquote class="rv-quote">
        <p class="rv-quote__text">„${h(v.szoveg)}”</p>
        <footer class="rv-muted rv-quote__by">${h(v.ki)} · ${h(v.mikor)}</footer>
      </blockquote>`,
    }))) + `<p class="rv-muted rv-note">${h(t.velemenyDemo)}</p>`,
  });

  const kornyek = K.szekcio({
    folott: t.kornyekFolott, cim: t.kornyekCim,
    body: K.lepteto('rv-grid rv-grid--3', c.kornyek.map((k, i) => `<div class="rv-feature">
        <div class="rv-feature__icon">${KORNYEK_IKONOK[i]}</div>
        <h3 class="rv-feature__title">${h(k.cim)}</h3>
        <p class="rv-muted rv-feature__text">${h(k.szoveg)}</p>
      </div>`))
      + `<div class="rv-note"><a class="rv-row" href="${u('kornyek')}">${h(t.kornyekGomb)} →</a></div>`,
  });

  const zaro = K.szekcio({
    body: `<div class="rv-cta">
      <div>
        <h2 class="rv-display rv-cta__title">${h(t.zaroCim)}</h2>
        <p class="rv-muted rv-cta__lead">${h(t.zaroBevezeto(forint(legolcsobb)))}</p>
      </div>
      <div class="rv-cta__buttons">
        ${K.gomb({ fajta: 'primary', meret: 'lg', href: u('foglalas'), sz: t.zaroGomb })}
        ${K.gomb({ fajta: 'ghost', meret: 'lg', href: KAPCSOLAT.telefonLink, sz: KAPCSOLAT.telefon })}
      </div>
    </div>`,
  });

  return {
    cim: `${HAZ.nev} — ${t.heroCim}`,
    leiras: t.heroLead(HAZ.alapFerohely, HAZ.potFerohely),
    torzs: [hero, intro, halo, velemenyek, kornyek, gyikSzekcio(ctx, 6), zaro].join('\n\n'),
  };
};

/* ---------- GYAKORI KÉRDÉSEK ----------
   A nyitás-csukás a böngésző saját <details> eleme. Nem kell hozzá
   JavaScript, és billentyűzetről is működik. */

function gyikSzekcio(ctx, darab) {
  const { t, c, u, h, K, fuz } = ctx;
  const lista = darab ? c.gyik.slice(0, darab) : c.gyik;
  const link = `<a href="${u('hazirend')}">${h(t.gyikHazirendLink)}</a>`;
  return K.szekcio({
    id: 'gyik', keskeny: true, folott: t.gyikFolott, cim: t.gyikCim,
    body: `<div class="rv-faq">
      ${lista.map((f, i) => `<details class="rv-faq__item"${i === 0 ? ' open' : ''}>
        <summary class="rv-faq__q">${h(f.k)}</summary>
        <div class="rv-faq__a">${h(f.v)}</div>
      </details>`).join('\n      ')}
    </div>
    <p class="rv-muted rv-note">${fuz(t.gyikTeljes(null), link)}</p>`,
  });
}

/* ---------- A HÁZ ---------- */

OLDAL_SABLONOK.haz = (ctx) => {
  const { t, c, u, h, K, adat } = ctx;
  const { HAZ, FOTOK, forint } = adat;

  /* A fejléc-galéria három képe. A nagyítót a js/nagyito.js nyitja,
     a `data-nagyito` csoportnév alapján. */
  const galeria = `<div class="rv-container rv-container--pt">
  <div class="rv-gallery">
    <button type="button" class="rv-gallery__thumb" data-nagyito="haz" aria-label="${h(t.fotoNagyitas)}">
      ${K.kep(HAZ.fokepek[0], { loading: 'eager' })}
    </button>
    <div class="rv-gallery__side">
      ${HAZ.fokepek.slice(1, 3).map((k) => `<button type="button" class="rv-gallery__thumb" data-nagyito="haz"
          aria-label="${h(t.fotoNagyitas)}">${K.kep(k)}</button>`).join('\n      ')}
    </div>
  </div>
  <div class="rv-note">
    ${K.gomb({ fajta: 'secondary', href: u('galeria'), sz: t.hazMindKep(FOTOK.length) })}
  </div>
</div>`;

  const szobak = HAZ.haloszobak.map((sz, i) => {
    const leiras = c.haloszobak[i];
    return K.kartya({
      belso: 'none',
      body: `<div class="rv-roomrow rv-roomrow--two">
        ${K.kep(sz.kep, { cls: 'rv-roomrow__media' })}
        <div class="rv-roomrow__body">
          <div class="rv-row rv-row--gap">
            <h3 class="rv-display rv-h-24">${h(leiras.nev)}</h3>
            ${K.jelveny(sz.kulcs === 'nappali' ? 'warning' : 'success',
        sz.kulcs === 'nappali' ? t.kerésre(sz.ferohely) : t.fok(sz.ferohely))}
          </div>
          <div class="rv-muted rv-meta">${h(leiras.szint)} · ${h(leiras.agyak)}</div>
          <div class="rv-tags rv-tags--tight">${leiras.jellemzok.map((j) => K.cimke(j)).join('')}</div>
        </div>
      </div>`,
    });
  }).join('\n');

  const fo = `<div class="rv-container rv-rail">
  <div>
    <div class="rv-eyebrow">${h(t.hazFolott)}</div>
    <h1 class="rv-display rv-pagetitle">${h(t.hazCim)}</h1>
    <div class="rv-muted rv-note">${h(t.hazMeta(HAZ.alapterulet, t.hazKetHalo, HAZ.furdoszobak, HAZ.alapFerohely, HAZ.potFerohely))}</div>
    ${K.hazCimkek('rv-tags--loose')}

    <div class="rv-blokk">
      <div class="rv-eyebrow">${h(t.haloFolott)}</div>
      <h2 class="rv-section__title rv-h2--blokk">${h(t.haloCim(HAZ.alapFerohely, HAZ.potFerohely))}</h2>
      <p class="rv-muted rv-note">${h(t.hazHaloBevezeto(HAZ.alapFerohely, HAZ.maxFerohely))}</p>
      <div class="rv-stack rv-stack--cards">${szobak}</div>
    </div>

    <div class="rv-blokk">
      <div class="rv-eyebrow">${h(t.felszereltsegFolott)}</div>
      <h2 class="rv-section__title rv-h2--blokk">${h(t.felszereltsegCim)}</h2>
      <div class="rv-grid rv-grid--2 rv-grid--mt">
        ${c.felszereltseg.map((cs) => K.kartya({
    fajta: 'muted',
    body: `<h3 class="rv-h3">${h(cs.cim)}</h3>${K.lista(cs.tetelek)}`,
  })).join('\n        ')}
      </div>
    </div>

    <div class="rv-blokk">
      <div class="rv-eyebrow">${h(t.arbanFolott)}</div>
      <h2 class="rv-section__title rv-h2--blokk">${h(t.arbanCim)}</h2>
      <div class="rv-grid rv-grid--2 rv-grid--mt">
        ${K.kartya({ body: `<h3 class="rv-h3">${h(t.arbanBenne)}</h3>${K.lista(c.arbanBenne)}` })}
        ${K.kartya({ body: `<h3 class="rv-h3">${h(t.arbanNincs)}</h3>${K.lista(c.arbanNincs)}` })}
      </div>
    </div>
  </div>

  ${arKartya(ctx)}
</div>`;

  return {
    cim: `${t.hazCim} — ${HAZ.nev}`,
    leiras: t.hazMeta(HAZ.alapterulet, t.hazKetHalo, HAZ.furdoszobak, HAZ.alapFerohely, HAZ.potFerohely),
    torzs: [galeria, fo, gyikSzekcio(ctx, 0)].join('\n\n'),
    scriptek: ['nagyito.js', 'arkalkulator.js'],
  };
};

/** A ház oldal jobb oldali ár- és foglalókártyája. A számokat a
    js/arkalkulator.js frissíti, a mezők itt vannak, készen. */
/** A ház oldal jobb oldali ár- és foglalókártyája.

    A sorrend szándékos: ár → mezők → tételes összeg → ha baj van, a
    magyarázat és a szabad időpontok → és csak ezután a gomb. Így a
    hangsúlyos gomb alatt soha nem áll figyelmeztetés; ami tudnivaló,
    az a döntés ELŐTT kerül a szem elé.

    A számokat a js/arkalkulator.js frissíti; a mezők itt vannak, készen. */
function arKartya(ctx) {
  const { t, u, h, K, adat } = ctx;
  const { HAZ, forint, SZEZONOK } = adat;
  const legolcsobb = Math.min(...SZEZONOK.map((sz) => sz.arEjszakankent));

  return K.kartya({
    cls: 'rv-rail__aside rv-arkartya', belso: 'lg', id: 'rv-arkartya',
    body: `<div class="rv-arkartya__ar">
      <span class="rv-price rv-arkartya__osszeg" id="rv-ak-ejszakaAr">${h(forint(legolcsobb))}</span>
      <span class="rv-arkartya__egyseg">${h(t.perEj)}</span>
    </div>
    <p class="rv-muted rv-arkartya__mibe">${h(t.arKartyaMibe(HAZ.alapFerohely, HAZ.potFerohely))}</p>

    <div class="rv-arkartya__mezok">
      <div class="rv-daterange">
        <label class="rv-daterange__part">
          <span class="rv-daterange__label">${h(t.mezoErkezes)}</span>
          <input class="rv-daterange__el" type="date" id="rv-ak-erkezes" />
        </label>
        <label class="rv-daterange__part">
          <span class="rv-daterange__label">${h(t.mezoTavozas)}</span>
          <input class="rv-daterange__el" type="date" id="rv-ak-tavozas" />
        </label>
      </div>
      <!-- A szezon szabálya végig látszik, nem csak akkor, ha valaki
           beleütközik: így előre tudni, mire lehet számítani. -->
      <div class="rv-field__hint" id="rv-ak-szabaly"></div>

      <div class="rv-field">
        <label class="rv-field__label" for="rv-ak-fo">${h(t.mezoVendegek)}</label>
        ${K.legordulo({
      id: 'rv-ak-fo',
      opciok: Array.from({ length: HAZ.maxFerohely }, (_, i) =>
        `<option value="${i + 1}"${i + 1 === 2 ? ' selected' : ''}>${h(t.fok(i + 1))}</option>`).join(''),
    })}
        <div class="rv-field__hint">${h(t.ferohelySugo(HAZ.alapFerohely, HAZ.potFerohely, HAZ.maxFerohely))}</div>
      </div>
    </div>

    <div class="rv-osszesito" id="rv-ak-osszesito" hidden></div>

    <!-- Ha a kért időpont nem megy: előbb a magyarázat, aztán a kiút. -->
    <div class="rv-notice" id="rv-ak-hiba" hidden></div>
    ${K.alternativakHely('rv-ak-alternativak')}

    ${K.gomb({ fajta: 'accent', meret: 'lg', teljes: true, href: u('foglalas'), sz: t.zaroGomb, id: 'rv-ak-foglalas' })}

    <div class="rv-terms__box">${K.feltetelek(null)}</div>`,
  });
}

/* ---------- ÁRAK ---------- */

OLDAL_SABLONOK.arak = (ctx) => {
  const { t, c, u, h, K, adat } = ctx;
  const { SZEZONOK, MOSTANI_EV, forint, datumSzoveg } = adat;
  const ezEv = SZEZONOK.filter((sz) => sz.ev === MOSTANI_EV);

  const tabla = K.kartya({
    belso: 'none',
    body: `<table class="rv-table">
      <thead><tr>
        <th>${h(t.tablaSzezon)}</th><th>${h(t.tablaIdoszak)}</th>
        <th>${h(t.tablaAr)}</th><th>${h(t.tablaSzabaly)}</th>
      </tr></thead>
      <tbody>
        ${ezEv.map((sz) => `<tr>
          <td>${h(c.szezonNevek[sz.nevKulcs] + ' ' + sz.ev)}</td>
          <td class="rv-muted"><time datetime="${sz.tol}">${h(datumSzoveg(sz.tol))}</time> — <time datetime="${sz.ig}">${h(datumSzoveg(sz.ig))}</time></td>
          <td>${h(forint(sz.arEjszakankent))}</td>
          <td class="rv-muted">${h(sz.kototEjszaka ? t.szabalyTurnus(sz.kototEjszaka) : t.szabalyMin(sz.minEjszaka))}</td>
        </tr>`).join('\n        ')}
      </tbody>
    </table>`,
  });

  const torzs = K.szekcio({
    fo: true, folott: t.arakFolott, cim: t.arakCim, bevezeto: t.arakBevezeto(ctx.adat.HAZ.maxFerohely),
    body: `${tabla}
    <p class="rv-muted rv-note">${h(t.arakTurnusMegjegyzes)}</p>
    <p class="rv-muted rv-note">${h(t.arakTelMegjegyzes)}</p>

    <div class="rv-grid rv-grid--2 rv-grid--mt-lg">
      ${K.kartya({ body: `<h2 class="rv-h3">${h(t.fizetesiFeltetelek)}</h2><div class="rv-terms__box rv-terms__box--flush">${K.feltetelek(null)}</div>` })}
      ${K.kartya({ fajta: 'muted', body: `<h2 class="rv-h3">${h(t.arbanFolott)}</h2>${K.lista(c.arbanBenne)}` })}
    </div>

    <div class="rv-blokk">
      <h2 class="rv-h3">${h(t.fizetesHogyanCim)}</h2>
      <ol class="rv-steps-list">${t.fizetesLepesek.map((l) => `<li>${h(l)}</li>`).join('')}</ol>
    </div>

    <div class="rv-note rv-note--lg">
      ${K.gomb({ fajta: 'accent', meret: 'lg', href: u('foglalas'), sz: t.zaroGomb })}
    </div>`,
  });

  return {
    cim: `${t.arakCim} — ${ctx.adat.HAZ.nev}`,
    leiras: t.arakBevezeto(ctx.adat.HAZ.maxFerohely),
    torzs,
  };
};

/* ---------- GALÉRIA ----------
   Mind a 38 kép benne van a HTML-ben. A szűrő csak elrejt és
   megmutat — nem tölt be semmit utólag. */

OLDAL_SABLONOK.galeria = (ctx) => {
  const { t, c, h, K, adat } = ctx;
  const { FOTOK, FOTO_KATEGORIAK } = adat;

  const szurok = [`<button type="button" class="rv-filter rv-filter--on" data-szuro="mind">
      ${h(t.galeriaMind)} (${FOTOK.length})</button>`]
    .concat(FOTO_KATEGORIAK.map((kat) => `<button type="button" class="rv-filter" data-szuro="${kat}">
      ${h(c.fotoKategoriak[kat])} (${FOTOK.filter((f) => f.mi === kat).length})</button>`));

  const racs = FOTOK.map((f, i) => `<li>
      <button type="button" class="rv-photogrid__item"
        data-nagyito="galeria" data-kategoria="${f.mi}" data-foto="${f.kep}">
        ${K.kep(f.kep, { loading: i < 6 ? 'eager' : 'lazy' })}
        <span class="rv-photogrid__cap">${h(ctx.adat.fotoFelirat(f.kep, ctx.ny))}</span>
      </button>
    </li>`).join('\n    ');

  return {
    cim: `${t.galeriaCim()} — ${ctx.adat.HAZ.nev}`,
    leiras: t.galeriaBevezeto,
    torzs: K.szekcio({
      fo: true, folott: t.galeriaFolott, cim: t.galeriaCim(), bevezeto: t.galeriaBevezeto,
      body: `<div class="rv-filters" role="group" aria-label="${h(t.galeriaSzuresCimke)}">
        ${szurok.join('\n        ')}
      </div>
      <!-- Ide kerül a jelzés, ha a látogató egy címkéről (medence,
           stég …) érkezett, és csak annak a fotóit látja. -->
      <div class="rv-filternote" id="rv-cimke-szuro" hidden></div>
      <ul class="rv-photogrid" id="rv-photogrid">
    ${racs}
      </ul>`,
    }),
    scriptek: ['nagyito.js', 'galeria.js'],
  };
};

/* ---------- KÖRNYÉK ---------- */

OLDAL_SABLONOK.kornyek = (ctx) => {
  const { t, c, u, h, K, adat } = ctx;
  const { KORNYEK_IKONOK, KAPCSOLAT } = adat;

  const hero = `<div class="rv-container rv-container--pt">
  <figure class="rv-figure">
    ${K.kep('garden-dock.jpg', { cls: 'rv-photo rv-photo--wide', loading: 'eager' })}
    <figcaption class="rv-muted rv-figure__cap">${h(t.kornyekHeroFelirat)}</figcaption>
  </figure>
</div>`;

  const lista = K.szekcio({
    fo: true, folott: t.kornyekFolott, cim: t.kornyekOldalCim, bevezeto: t.kornyekOldalLead,
    body: K.lepteto('rv-grid rv-grid--2', c.kornyekTeljes.map((k, i) => K.kartya({
      body: `<div class="rv-feature__icon">${KORNYEK_IKONOK[i % KORNYEK_IKONOK.length]}</div>
        <h2 class="rv-h3 rv-h3--mt">${h(k.cim)}</h2>
        <p class="rv-muted rv-feature__text">${h(k.szoveg)}</p>`,
    }))),
  });

  const joTudni = K.szekcio({
    keskeny: true, folott: t.lablecJoTudni, cim: t.joTudniCim,
    body: `<div class="rv-grid rv-grid--2">
      ${c.joTudni.map((j) => K.kartya({
      fajta: 'muted',
      body: `<h3 class="rv-h3">${h(j.cim)}</h3><p class="rv-muted rv-feature__text">${h(j.szoveg)}</p>`,
    })).join('\n      ')}
    </div>`,
  });

  const hol = K.szekcio({
    keskeny: true, folott: t.holFolott, cim: t.holCim,
    body: `<div class="rv-stack rv-stack--prose">
      <p>${h(t.holP1)}</p>
      <p>${h(t.holP2)}</p>
      <p class="rv-muted">${h(c.utazas)}</p>
    </div>
    <div class="rv-note rv-note--lg rv-row rv-row--gap">
      ${K.gomb({ fajta: 'secondary', href: KAPCSOLAT.terkep, sz: t.utvonaltervezes, extra: 'target="_blank" rel="noreferrer"' })}
      ${K.gomb({ fajta: 'accent', href: u('foglalas'), sz: t.szabadIdopontok })}
    </div>`,
  });

  return {
    cim: `${t.kornyekOldalCim} — ${ctx.adat.HAZ.nev}`,
    leiras: t.kornyekOldalLead,
    torzs: [hero, lista, joTudni, hol].join('\n\n'),
  };
};

/* ---------- FOGLALÁS ----------
   Három lépés egy oldalon: időpont és vendégek · adatok · áttekintés.
   Mindhárom szakasz itt van a HTML-ben; a js/foglalas.js csak azt
   dönti el, melyik látszik, és minden ellenőrzést a logika.js végez. */

OLDAL_SABLONOK.foglalas = (ctx) => {
  const { t, c, u, h, K, fuz, adat } = ctx;
  const { HAZ, EXTRAK, forint } = adat;

  const lepesek = [t.lepes1, t.lepes2, t.lepes3].map((cimke, i) => `<div class="rv-step">
      <span class="rv-step__num${i === 0 ? ' rv-step__num--on' : ''}" data-lepesszam="${i}">${i + 1}</span>
      <span class="rv-step__label${i === 0 ? ' rv-step__label--on' : ''}" data-lepescimke="${i}">${h(cimke)}</span>
    </div>`).join('\n    ');

  const extrak = EXTRAK.map((x) => {
    const leiras = c.extrak[x.id];
    return `<label class="rv-check">
      <input type="checkbox" data-extra="${x.id}" />
      <span>
        <span class="rv-check__label">${h(leiras.nev + ' — ' + (x.ar > 0 ? forint(x.ar) : t.nincsFelar))}</span>
        <span class="rv-check__desc">${h(leiras.leiras)}</span>
      </span>
    </label>`;
  }).join('\n            ');

  const lepes0 = `<div class="rv-step-panel rv-stack rv-stack--wide" data-lepes="0">
    <div class="rv-field">
      <label class="rv-field__label">${h(t.mezoIdopont)}</label>
      <div class="rv-daterange">
        <label class="rv-daterange__part">
          <span class="rv-daterange__label">${h(t.mezoErkezes)}</span>
          <input class="rv-daterange__el" type="date" id="rv-erkezes" />
        </label>
        <label class="rv-daterange__part">
          <span class="rv-daterange__label">${h(t.mezoTavozas)}</span>
          <input class="rv-daterange__el" type="date" id="rv-tavozas" />
        </label>
      </div>
      <div class="rv-field__err" id="rv-hiba-datum" hidden></div>
      <div class="rv-field__hint" id="rv-idopont-sugo"></div>
    </div>

    ${K.alternativakHely('rv-alternativak')}

    ${K.kartya({ fajta: 'muted', body: `<div id="rv-naptar"></div>` })}

    <div class="rv-grid rv-grid--2">
      <div class="rv-field">
        <label class="rv-field__label" for="rv-felnott">${h(t.mezoFelnott)}</label>
        ${K.legordulo({
      id: 'rv-felnott',
      opciok: Array.from({ length: HAZ.maxFerohely }, (_, i) =>
        `<option value="${i + 1}"${i + 1 === 2 ? ' selected' : ''}>${h(t.fok(i + 1))}</option>`).join(''),
    })}
        <div class="rv-field__err" id="rv-hiba-letszam" hidden></div>
        <div class="rv-field__hint">${h(t.sugoFelnott)}</div>
      </div>
      <div class="rv-field">
        <label class="rv-field__label" for="rv-gyerek">${h(t.mezoGyerek)}<span class="rv-field__opt"> — ${h(t.nemKotelezo)}</span></label>
        ${K.legordulo({
      id: 'rv-gyerek',
      opciok: Array.from({ length: HAZ.maxFerohely }, (_, i) =>
        `<option value="${i}">${i === 0 ? h(t.nincsGyerek) : h(t.gyerekek(i))}</option>`).join(''),
    })}
        <div class="rv-field__hint">${h(t.sugoGyerek)}</div>
      </div>
    </div>

    <div class="rv-field">
      <label class="rv-field__label">${h(t.mezoFekvohelyek)}</label>
      ${K.kartya({
      fajta: 'muted',
      body: `<p class="rv-small rv-lead-tight">
          <strong>${h(t.fekvohelyBevezeto(HAZ.alapFerohely, HAZ.potFerohely)[0])}</strong>${h(t.fekvohelyBevezeto(HAZ.alapFerohely, HAZ.potFerohely)[1])}
        </p>
        <div class="rv-stack rv-stack--checks">
          <label class="rv-check">
            <input type="checkbox" id="rv-kanape" />
            <span>
              <span class="rv-check__label">${h(t.kanapeCimke)}</span>
              <span class="rv-check__desc" id="rv-kanape-leiras">${h(t.kanapeNemKell)}</span>
            </span>
          </label>
          <label class="rv-check">
            <input type="checkbox" id="rv-gyerekagy" />
            <span>
              <span class="rv-check__label">${h(t.gyerekagyCimke)}</span>
              <span class="rv-check__desc">${h(t.gyerekagyLeiras)}</span>
            </span>
          </label>
          <label class="rv-check">
            <input type="checkbox" id="rv-etetoszek" />
            <span>
              <span class="rv-check__label">${h(t.etetoszekCimke)}</span>
              <span class="rv-check__desc">${h(t.etetoszekLeiras)}</span>
            </span>
          </label>
        </div>`,
    })}
    </div>

    <div class="rv-field">
      <label class="rv-field__label">${h(t.mezoExtrak)}<span class="rv-field__opt"> — ${h(t.nemKotelezo)}</span></label>
      <div class="rv-stack rv-stack--checks">
            ${extrak}
      </div>
      <div class="rv-field__hint">${h(t.sugoExtrak)}</div>
    </div>
  </div>`;

  const lepes1 = `<div class="rv-step-panel rv-stack rv-stack--wide" data-lepes="1" hidden>
    <div class="rv-grid rv-grid--2">
      <div class="rv-field">
        <label class="rv-field__label" for="rv-nev">${h(t.mezoNev)}</label>
        <div class="rv-input"><input class="rv-input__el" id="rv-nev" type="text" placeholder="${h(t.mintaNev)}" /></div>
        <div class="rv-field__err" id="rv-hiba-nev" hidden></div>
      </div>
      <div class="rv-field">
        <label class="rv-field__label" for="rv-telefon">${h(t.mezoTelefon)}<span class="rv-field__opt"> — ${h(t.nemKotelezo)}</span></label>
        <div class="rv-input"><input class="rv-input__el" id="rv-telefon" type="tel" placeholder="+36" /></div>
        <div class="rv-field__hint">${h(t.sugoTelefon)}</div>
      </div>
    </div>
    <div class="rv-field">
      <label class="rv-field__label" for="rv-email">${h(t.mezoEmail)}</label>
      <div class="rv-input"><input class="rv-input__el" id="rv-email" type="email" placeholder="${h(t.mintaEmail)}" /></div>
      <div class="rv-field__err" id="rv-hiba-email" hidden></div>
    </div>
    <div class="rv-field">
      <label class="rv-field__label" for="rv-megjegyzes">${h(t.mezoMegjegyzes)}<span class="rv-field__opt"> — ${h(t.nemKotelezo)}</span></label>
      <textarea class="rv-textarea" id="rv-megjegyzes" rows="3" placeholder="${h(t.mintaMegjegyzes)}"></textarea>
      <div class="rv-field__hint">${h(t.sugoMegjegyzes)}</div>
    </div>
  </div>`;

  const hazirendLink = `<a href="${u('hazirend')}">${h(t.elfogadomLink)}</a>`;
  const lepes2 = `<div class="rv-step-panel rv-stack rv-stack--wide" data-lepes="2" hidden>
    <div id="rv-attekintes"></div>
    <div class="rv-toast rv-toast--light">
      <span>
        <span class="rv-toast__title">${h(t.mitTortenik)}</span>
        <span id="rv-mit-tortenik"></span>
      </span>
    </div>
    <div class="rv-field">
      <label class="rv-check">
        <input type="checkbox" id="rv-elfogadom" />
        <span><span class="rv-check__label">${fuz(t.elfogadom(null), hazirendLink)}</span></span>
      </label>
      <div class="rv-field__err" id="rv-hiba-feltetel" hidden></div>
    </div>
  </div>`;

  const aside = K.kartya({
    cls: 'rv-rail__aside', belso: 'lg',
    body: `${K.kep('house-river.jpg')}
      <h2 class="rv-display rv-h-24 rv-h3--mt">${h(HAZ.nev)}</h2>
      <div class="rv-muted rv-meta" id="rv-aside-meta">${HAZ.alapterulet} m²</div>
      <div class="rv-osszesito rv-osszesito--flush" id="rv-osszesito"></div>
      <div class="rv-field__err rv-note" id="rv-aside-hiba" hidden></div>
      <div class="rv-terms__box">${K.feltetelek(null)}</div>`,
  });

  const keszLink = `<a href="${u('foglalasom')}">${h(t.menuFoglalasom)}</a>`;
  const dialogus = `<div class="rv-dialog__veil" id="rv-kesz" hidden>
  <div class="rv-dialog" role="dialog" aria-modal="true" aria-labelledby="rv-kesz-cim">
    <div class="rv-dialog__head"><h2 class="rv-display rv-h-26" id="rv-kesz-cim">${h(t.kesz)}</h2></div>
    <div class="rv-dialog__body">
      <p id="rv-kesz-szoveg"></p>
      <p class="rv-muted rv-note" id="rv-kesz-masodik"></p>
      <div class="rv-row rv-row--wrap rv-note" id="rv-kesz-jelvenyek"></div>
      <p class="rv-small rv-note">${fuz(t.keszLekerdezes(null), keszLink)}</p>
    </div>
    <div class="rv-dialog__foot">
      ${K.gomb({ fajta: 'secondary', href: u('fooldal'), sz: t.keszFooldal })}
      ${K.gomb({ fajta: 'primary', href: u('foglalasom'), sz: t.keszFoglalasom })}
    </div>
  </div>
</div>`;

  const torzs = `<div class="rv-container rv-hasStickybar rv-container--pt-lg">
  <div class="rv-eyebrow">${h(t.foglalasFolott)}</div>
  <h1 class="rv-display rv-pagetitle">${h(t.foglalasCim)}</h1>

  <div class="rv-steps rv-note--lg">
    ${lepesek}
  </div>

  <div class="rv-rail">
    ${K.kartya({
    belso: 'lg',
    body: `${lepes0}
      ${lepes1}
      ${lepes2}
      <div class="rv-formfoot">
        ${K.gomb({ fajta: 'secondary', id: 'rv-vissza', sz: '← ' + t.vissza, extra: 'hidden' })}
        ${K.gomb({ fajta: 'accent', meret: 'lg', id: 'rv-tovabb', sz: t.tovabb + ' →' })}
      </div>`,
  })}
    ${aside}
  </div>

  <div class="rv-stickybar">
    <div class="rv-stickybar__price">
      <span class="rv-stickybar__total" id="rv-sav-osszeg">—</span>
      <span class="rv-stickybar__note" id="rv-sav-megjegyzes">${h(t.osszValasztottIdopont)}</span>
    </div>
    ${K.gomb({ fajta: 'accent', id: 'rv-sav-tovabb', sz: t.tovabb })}
  </div>

  ${dialogus}
</div>`;

  return {
    cim: `${t.foglalasCim} — ${HAZ.nev}`,
    leiras: t.mitTortenikSzoveg(''),
    torzs,
    scriptek: ['naptar.js', 'foglalas.js'],
    sajatSav: true,
  };
};

/* ---------- FOGLALÁSOM ----------
   Azonosító + e-mail együtt azonosít. Így nincs jelszó és
   regisztráció, de a foglalás adatai nem érhetők el az azonosítóval
   önmagában — az ugyanis e-mailben utazik. */

OLDAL_SABLONOK.foglalasom = (ctx) => {
  const { t, h, K, fuz, adat } = ctx;

  const kereso = K.kartya({
    belso: 'lg',
    body: `<p class="rv-muted rv-lead-measure">${fuz(t.lekBevezeto(null, null),
      '<strong>RV-DEMO-01</strong>', '<strong>anna@example.hu</strong>')}</p>
    <div class="rv-grid rv-grid--2 rv-grid--mt">
      <div class="rv-field">
        <label class="rv-field__label" for="rv-lek-azonosito">${h(t.lekAzonosito)}</label>
        <div class="rv-input"><input class="rv-input__el" id="rv-lek-azonosito" type="text" placeholder="RV-DEMO-01" /></div>
      </div>
      <div class="rv-field">
        <label class="rv-field__label" for="rv-lek-email">${h(t.lekEmail)}</label>
        <div class="rv-input"><input class="rv-input__el" id="rv-lek-email" type="email" placeholder="anna@example.hu" /></div>
      </div>
    </div>
    <div class="rv-note">${K.gomb({ fajta: 'accent', id: 'rv-lek-gomb', sz: t.lekGomb })}</div>
    <div class="rv-toast rv-toast--light rv-note" id="rv-lek-nincs" hidden>
      <span><span class="rv-toast__title">${h(t.lekNincs)}</span>${h(t.lekNincsSzoveg(adat.KAPCSOLAT.telefon))}</span>
    </div>`,
  });

  const dialogus = `<div class="rv-dialog__veil" id="rv-lem-kerdes" hidden>
  <div class="rv-dialog" role="dialog" aria-modal="true" aria-labelledby="rv-lem-cim">
    <div class="rv-dialog__head"><h2 class="rv-display rv-h-26" id="rv-lem-cim">${h(t.lemBiztos)}</h2></div>
    <div class="rv-dialog__body">
      <p id="rv-lem-szoveg"></p>
      <div class="rv-note" id="rv-lem-jelveny"></div>
    </div>
    <div class="rv-dialog__foot">
      ${K.gomb({ fajta: 'secondary', id: 'rv-lem-megsem', sz: t.megsem })}
      ${K.gomb({ fajta: 'primary', id: 'rv-lem-igen', sz: t.lemIgen })}
    </div>
  </div>
</div>`;

  return {
    cim: `${t.lekCim} — ${adat.HAZ.nev}`,
    leiras: t.lekSugo || t.lekCim,
    torzs: K.szekcio({
      fo: true, keskeny: true, folott: t.lekFolott, cim: t.lekCim,
      body: `${kereso}
      <div id="rv-lek-talalat"></div>
      ${dialogus}`,
    }),
    scriptek: ['foglalasom.js'],
  };
};

/* ---------- HÁZIREND ---------- */

OLDAL_SABLONOK.hazirend = (ctx) => {
  const { t, c, h, K, adat } = ctx;
  const sorok = adat.HAZIREND_SORREND
    .map((id) => [id, c.hazirend.find((x) => x.id === id)])
    .filter(([, r]) => r);

  return {
    cim: `${t.hazirendCim} — ${adat.HAZ.nev}`,
    leiras: t.hazirendBevezeto,
    torzs: K.szekcio({
      fo: true, keskeny: true, folott: t.hazirendFolott, cim: t.hazirendCim, bevezeto: t.hazirendBevezeto,
      body: `<div class="rv-stack rv-stack--cards">
        ${sorok.map(([id, r]) => K.kartya({
        id,
        body: `<h2 class="rv-h3">${h(r.cim)}</h2>${K.lista(r.tetelek)}`,
      })).join('\n        ')}
      </div>`,
    }),
  };
};

/* ---------- KAPCSOLAT ---------- */

OLDAL_SABLONOK.kapcsolat = (ctx) => {
  const { t, c, u, h, K, adat } = ctx;
  const { KAPCSOLAT } = adat;

  const elerhetoseg = K.kartya({
    body: `<h2 class="rv-h3">${h(t.kapcsolatElerhetoseg)}</h2>
    <div class="rv-stack rv-stack--links">
      <a href="${h(KAPCSOLAT.telefonLink)}">${h(KAPCSOLAT.telefon)}</a>
      <a href="tel:${h(KAPCSOLAT.telefonDe.replace(/\s/g, ''))}">${h(KAPCSOLAT.telefonDe)} <span class="rv-muted">${h(t.nemetorszagbol)}</span></a>
      <a href="mailto:${h(KAPCSOLAT.email)}">${h(KAPCSOLAT.email)}</a>
      <span>${h(KAPCSOLAT.cim)}</span>
      <a href="${h(KAPCSOLAT.terkep)}" target="_blank" rel="noreferrer">${h(t.kapcsolatUtvonal)} →</a>
    </div>`,
  });

  const odajutas = K.kartya({
    fajta: 'muted',
    body: `<h2 class="rv-h3">${h(t.kapcsolatOdajutas)}</h2>
    <p class="rv-feature__text">${h(c.utazas)}</p>
    <p class="rv-muted rv-small rv-note">${h(KAPCSOLAT.tulajdonosok)} · NTAK: ${h(KAPCSOLAT.ntak)}</p>`,
  });

  const urlap = K.kartya({
    belso: 'lg',
    body: `<h2 class="rv-h3">${h(t.kerdesemVan)}</h2>
    <p class="rv-muted rv-note">${h(t.kapcsolatLead)}</p>
    <form class="rv-form" id="rv-uzenet" novalidate>
      <div class="rv-grid rv-grid--2 rv-grid--mt">
        <div class="rv-field">
          <label class="rv-field__label" for="rv-u-nev">${h(t.mezoNev)}</label>
          <div class="rv-input"><input class="rv-input__el" id="rv-u-nev" type="text" placeholder="${h(t.mintaNev)}" /></div>
          <div class="rv-field__err" id="rv-u-hiba-nev" hidden></div>
        </div>
        <div class="rv-field">
          <label class="rv-field__label" for="rv-u-email">${h(t.mezoEmail)}</label>
          <div class="rv-input"><input class="rv-input__el" id="rv-u-email" type="email" placeholder="${h(t.mintaEmail)}" /></div>
          <div class="rv-field__err" id="rv-u-hiba-email" hidden></div>
        </div>
      </div>
      <div class="rv-field">
        <label class="rv-field__label" for="rv-u-mikor">${h(t.mikorJonnetek)}<span class="rv-field__opt"> — ${h(t.nemKotelezo)}</span></label>
        <div class="rv-input"><input class="rv-input__el" id="rv-u-mikor" type="text" /></div>
      </div>
      <div class="rv-field">
        <label class="rv-field__label" for="rv-u-uzenet">${h(t.mezoUzenet)}</label>
        <textarea class="rv-textarea" id="rv-u-uzenet" rows="4" placeholder="${h(t.mintaUzenet)}"></textarea>
        <div class="rv-field__err" id="rv-u-hiba-uzenet" hidden></div>
      </div>
      <div class="rv-field">
        <label class="rv-check">
          <input type="checkbox" id="rv-u-adat" />
          <span><span class="rv-check__label">${h(t.adatkezelesElfogadom)} — <a href="${u('adatkezeles')}">${h(t.menuAdatkezeles)}</a></span></span>
        </label>
        <div class="rv-field__err" id="rv-u-hiba-adat" hidden></div>
      </div>
      <div class="rv-formfoot">
        ${K.gomb({ fajta: 'accent', meret: 'lg', tipus: 'submit', sz: t.uzenetKuldes })}
      </div>
    </form>
    <div class="rv-toast rv-toast--light rv-note" id="rv-u-kesz" hidden>
      <span><span class="rv-toast__title">${h(t.uzenetKeszCim)}</span>${h(t.uzenetKeszSzoveg)}</span>
    </div>`,
  });

  return {
    cim: `${t.kapcsolatCim} — ${adat.HAZ.nev}`,
    leiras: t.kapcsolatLead,
    torzs: K.szekcio({
      fo: true, keskeny: true, folott: t.kapcsolatFolott, cim: t.kapcsolatCim,
      body: `<div class="rv-grid rv-grid--2">
        ${elerhetoseg}
        ${odajutas}
      </div>
      <div class="rv-note rv-note--lg">${urlap}</div>`,
    }),
    scriptek: ['kapcsolat.js'],
  };
};

/* ---------- ADATKEZELÉS ---------- */

OLDAL_SABLONOK.adatkezeles = (ctx) => {
  const { t, h, K, adat } = ctx;
  const blokkok = t.adatBlokkok(adat.KAPCSOLAT.email);

  return {
    cim: `${t.menuAdatkezeles} — ${adat.HAZ.nev} ${t.vendeghaz}`,
    leiras: t.adatkezelesLeiras,
    torzs: K.szekcio({
      fo: true, keskeny: true, folott: t.menuAdatkezeles, cim: t.adatkezelesCim,
      body: `<div class="rv-stack rv-stack--cards">
        ${blokkok.map(([cim, tetelek]) => K.kartya({
        belso: 'lg',
        body: `<h2 class="rv-h3">${h(cim)}</h2>${K.lista(tetelek)}`,
      })).join('\n        ')}
      </div>
      <p class="rv-muted rv-small rv-note--lg">${h(t.adatMegjegyzes)}</p>`,
    }),
  };
};

/* ---------- IMPRESSZUM ---------- */

OLDAL_SABLONOK.impresszum = (ctx) => {
  const { t, h, K, adat } = ctx;
  const { KAPCSOLAT } = adat;

  return {
    cim: `${t.menuImpresszum} — ${adat.HAZ.nev} ${t.vendeghaz}`,
    leiras: t.impresszumLeiras,
    torzs: K.szekcio({
      fo: true, keskeny: true, folott: t.menuImpresszum, cim: t.impresszumCim,
      body: K.kartya({
        belso: 'lg',
        body: `<div class="rv-stack rv-stack--blocks">
          <div>
            <div class="rv-eyebrow rv-eyebrow--tight">${h(t.impresszumSzallashely)}</div>
            <p>${h(KAPCSOLAT.tulajdonosok)}</p>
            <p>${h(KAPCSOLAT.cim)}</p>
            <p>${h(t.impresszumNtak(KAPCSOLAT.ntak))}</p>
          </div>
          <div>
            <div class="rv-eyebrow rv-eyebrow--tight">${h(t.kapcsolatElerhetoseg)}</div>
            <p><a href="${h(KAPCSOLAT.telefonLink)}">${h(KAPCSOLAT.telefon)}</a> · <a href="tel:${h(KAPCSOLAT.telefonDe.replace(/\s/g, ''))}">${h(KAPCSOLAT.telefonDe)}</a></p>
            <p><a href="mailto:${h(KAPCSOLAT.email)}">${h(KAPCSOLAT.email)}</a></p>
          </div>
          <div>
            <div class="rv-eyebrow rv-eyebrow--tight">${h(t.impresszumTarhely)}</div>
            <p class="rv-muted rv-small">${h(t.impresszumTarhelySzoveg)}</p>
          </div>
        </div>`,
      }),
    }),
  };
};
