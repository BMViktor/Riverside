/* ============================================================
   RIVERSIDE — ÁRKALKULÁTOR (a ház oldal jobb oldali kártyája)

   Két dátum és egy létszám: a kártya azonnal megmondja, mennyibe
   kerül, és hogy szabad-e a ház akkor. Ha nem, kiajánlja a három
   legközelebbi szabad, szabályos időpontot.

   Ugyanazt a `logika.js`-t használja, mint a foglalási oldal —
   ezért nem fordulhat elő, hogy itt más jön ki, mint ott.
   ============================================================ */

(function arkalkulator() {
  const kartya = el('#rv-arkartya');
  if (!kartya) return;

  const mErkezes = el('#rv-ak-erkezes');
  const mTavozas = el('#rv-ak-tavozas');
  const mFo = el('#rv-ak-fo');
  const foglalasGomb = el('#rv-ak-foglalas');

  /* A „tól" ár: a legolcsóbb szezon éjszakai ára — ez áll a kártyán,
     amíg a látogató nem választott időpontot. */
  const legolcsobbAr = () => Math.min(...SZEZONOK.map((sz) => sz.arEjszakankent));

  let erkezes = plusNap(ma(), 30);
  let tavozas = plusNap(ma(), 34);

  mErkezes.min = ma();
  mErkezes.value = erkezes;
  mTavozas.value = tavozas;

  function frissit() {
    const fo = Number(mFo.value);
    const eredmeny = ellenoriz(erkezes, tavozas, fo, 0, foglalasokBetolt());
    const ar = eredmeny.ar || arat(erkezes, tavozas, fo, 0, [], false);

    irj('#rv-ak-ejszakaAr', forint(ar && ar.ejszakak > 0 ? ar.atlagEjszaka : legolcsobbAr()));

    /* A szezon szabálya mindig ott áll a dátumok alatt — nem csak
       akkor, ha valaki beleütközik. A számot a logika adja, nem
       ez a fájl: ha az adatok.js-ben változik a minimum, a szöveg
       magától követi. */
    const sz = eredmeny.szabalyok || {};
    irj('#rv-ak-szabaly', sz.kototEjszaka
      ? T.sugoTurnus(sz.kototEjszaka)
      : T.sugoMinEj(sz.minEjszaka || 3));

    /* A magyarázat a gomb FÖLÖTT jelenik meg, és nem hibapirossal:
       nem a látogató rontott el valamit, csak arra az időpontra nincs
       hely. A kiutat a közvetlenül alatta álló szabad időpontok adják. */
    hibat('#rv-ak-hiba', eredmeny.szabad ? '' : hibaUzenet(eredmeny));

    alternativakatRajzol(el('#rv-ak-alternativak'), eredmeny.szabad ? [] : eredmeny.javaslatok, (j) => {
      erkezes = j.erkezes; tavozas = j.tavozas;
      mErkezes.value = erkezes; mTavozas.value = tavozas;
      frissit();
    });

    /* A tételes összeget csak akkor mutatjuk, ha az időpont tényleg
       foglalható: egy végösszeg olyan tartózkodásra, amit nem lehet
       lefoglalni, félrevezető. */
    const osszesito = el('#rv-ak-osszesito');
    if (eredmeny.szabad && ar && ar.ejszakak > 0) {
      const sor = (cimke, ertek) =>
        `<div class="rv-spread"><span class="rv-muted">${vedett(cimke)}</span><span>${vedett(ertek)}</span></div>`;
      osszesito.innerHTML = [
        sor(idoszakSzoveg(erkezes, tavozas), ar.ejszakak + ' ' + T.ej),
        sor(ar.ejszakak + ' ' + T.ej + ' × ' + forint(ar.atlagEjszaka), forint(ar.szallasdij)),
        sor(T.osszIfa, forint(ar.ifa)),
        `<div class="rv-spread rv-osszesito__total"><span>${vedett(T.osszesen)}</span><span>${vedett(forint(ar.osszesen))}</span></div>`,
      ].join('');
      osszesito.hidden = false;
    } else {
      osszesito.hidden = true;
    }

    /* A feltételek első sorában a tényleges foglaló összege. */
    const feltFoglalo = el('.rv-terms__val', kartya);
    if (feltFoglalo && ar && ar.foglalo) feltFoglalo.textContent = T.feltFoglaloOsszeg(forint(ar.foglalo));

    /* A Foglalás gomb az időpontot is viszi magával, hogy a foglalási
       oldalon ne kelljen újra beállítani. */
    if (foglalasGomb) {
      foglalasGomb.href = ide('foglalas') + '?erkezes=' + erkezes + '&tavozas=' + tavozas + '&fo=' + fo;
    }
  }

  mErkezes.addEventListener('input', () => {
    erkezes = mErkezes.value;
    if (tavozas <= erkezes) { tavozas = plusNap(erkezes, 4); mTavozas.value = tavozas; }
    mTavozas.min = plusNap(erkezes || ma(), 1);
    frissit();
  });
  mTavozas.addEventListener('input', () => { tavozas = mTavozas.value; frissit(); });
  mFo.addEventListener('change', frissit);

  frissit();
})();
