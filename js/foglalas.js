/* ============================================================
   RIVERSIDE — FOGLALÁS

   A foglalas.html mindhárom lépése ott van a lapon, készen. Ez a
   fájl annyit tesz, hogy:

     — eldönti, melyik lépés látszik,
     — minden változásnál újraszámoltatja az árat és az elérhetőséget,
     — a hibakódokból a látogató nyelvén ír mondatot,
     — mentéskor átadja a foglalást a logika.js-nek.

   Egyetlen ellenőrzést sem végez maga: a szabályok (minimum éjszaka,
   nyári turnus, férőhely, ütközés) a logika.js `ellenoriz`
   függvényében élnek, egy helyen. Ez a fájl csak megjeleníti, amit
   onnan kap.
   ============================================================ */

(function foglalas() {
  const tovabbGomb = el('#rv-tovabb');
  if (!tovabbGomb) return;              // nem a foglalási oldalon vagyunk

  /* A ház oldal árkalkulátora a címsorban hozhatja magával az
     időpontot, hogy ne kelljen újra beállítani. Csak dátumformátumú
     értéket veszünk át; bármi más esetén marad az alapértelmezés. */
  const cimbol = new URL(window.location.href).searchParams;
  const datumE = (sz) => /^\d{4}-\d{2}-\d{2}$/.test(sz || '');

  /* ---------- Állapot ---------- */
  const A = {
    lepes: 0,
    erkezes: datumE(cimbol.get('erkezes')) ? cimbol.get('erkezes') : plusNap(ma(), 30),
    tavozas: datumE(cimbol.get('tavozas')) ? cimbol.get('tavozas') : plusNap(ma(), 34),
    felnott: 2,
    gyerek: 0,
    kanape: false,
    gyerekagy: false,
    etetoszek: false,
    extrak: [],
    kesz: null,
  };

  let foglalasok = foglalasokBetolt();

  /* ---------- Mezők ---------- */
  const mErkezes = el('#rv-erkezes');
  const mTavozas = el('#rv-tavozas');
  const mFelnott = el('#rv-felnott');
  const mGyerek = el('#rv-gyerek');
  const mKanape = el('#rv-kanape');
  const mGyerekagy = el('#rv-gyerekagy');
  const mEtetoszek = el('#rv-etetoszek');
  const mNev = el('#rv-nev');
  const mEmail = el('#rv-email');
  const mTelefon = el('#rv-telefon');
  const mMegjegyzes = el('#rv-megjegyzes');
  const mElfogadom = el('#rv-elfogadom');

  const foSzam = Number(cimbol.get('fo'));
  if (foSzam >= 1 && foSzam <= HAZ.maxFerohely) A.felnott = foSzam;

  mErkezes.min = ma();
  mErkezes.value = A.erkezes;
  mTavozas.value = A.tavozas;
  mFelnott.value = String(A.felnott);

  /* ---------- Naptár ---------- */
  const naptar = Naptar(el('#rv-naptar'), {
    foglaltE: (nap) => foglaltNapE(nap, foglalasok),
    valaszt: (nap) => {
      // Első kattintás új érkezés, második a távozás — ha értelmes.
      if (!A.erkezes || nap <= A.erkezes || A.tavozas) { A.erkezes = nap; A.tavozas = ''; }
      else A.tavozas = nap;
      mErkezes.value = A.erkezes;
      mTavozas.value = A.tavozas;
      hibat('#rv-hiba-datum', '');
      frissit();
    },
  });

  /* ---------- Számolás és kirajzolás ---------- */

  function frissit() {
    const fo = A.felnott + A.gyerek;
    const kanapeKell = fo > HAZ.alapFerohely;      // 6 főtől kötelező
    const eredmeny = ellenoriz(A.erkezes, A.tavozas, A.felnott, A.gyerek, foglalasok);
    const ar = arat(A.erkezes, A.tavozas, A.felnott, A.gyerek, A.extrak, false);

    /* A kanapé jelölője 6 fő fölött kötelező, és ezt ki is írjuk. */
    mKanape.checked = A.kanape || kanapeKell;
    mKanape.disabled = kanapeKell;
    irj('#rv-kanape-leiras', kanapeKell ? T.kanapeKell(fo) : T.kanapeNemKell);

    /* Az időpont súgója a szezon szabályát mondja meg. */
    const sz = eredmeny.szabalyok || {};
    irj('#rv-idopont-sugo', sz.kototEjszaka ? T.sugoTurnus(sz.kototEjszaka) : T.sugoMinEj(sz.minEjszaka || 3));

    /* Alternatívák, ha a kért időpont nem megy. */
    alternativakatRajzol(el('#rv-alternativak'), eredmeny.szabad ? [] : eredmeny.javaslatok, (j) => {
      A.erkezes = j.erkezes; A.tavozas = j.tavozas;
      mErkezes.value = j.erkezes; mTavozas.value = j.tavozas;
      hibat('#rv-hiba-datum', '');
      frissit();
    });

    /* Oldalsó összesítő. */
    irj('#rv-aside-meta', HAZ.alapterulet + ' m² · ' + T.fok(fo));
    osszesitot(ar);
    hibat('#rv-aside-hiba', eredmeny.szabad ? '' : hibaUzenet(eredmeny));

    /* Ragadó sáv az oldal alján. */
    irj('#rv-sav-osszeg', ar.ejszakak > 0 ? forint(ar.osszesen) : '—');
    irj('#rv-sav-megjegyzes', ar.ejszakak > 0
      ? ar.ejszakak + ' ' + T.ej + ' · ' + T.feltFoglalo.toLowerCase() + ' ' + forint(ar.foglalo)
      : T.osszValasztottIdopont);

    /* A feltételek első sorában a tényleges foglaló összege. */
    const feltFoglalo = el('.rv-terms__val');
    if (feltFoglalo && ar.foglalo) feltFoglalo.textContent = T.feltFoglaloOsszeg(forint(ar.foglalo));

    naptar.frissit(A.erkezes, A.tavozas);
    if (A.lepes === 2) attekintest(ar, fo, kanapeKell);
    return { eredmeny, ar, fo, kanapeKell };
  }

  function osszesitot(ar) {
    const doboz = el('#rv-osszesito');
    if (!doboz) return;
    if (!ar || ar.ejszakak <= 0) {
      doboz.innerHTML = `<div class="rv-spread"><span class="rv-muted">${vedett(T.osszValasztottIdopont)}</span></div>`;
      return;
    }
    const sor = (cimke, ertek, extraOsztaly = '') =>
      `<div class="rv-spread ${extraOsztaly}"><span class="rv-muted">${vedett(cimke)}</span><span>${vedett(ertek)}</span></div>`;

    doboz.innerHTML = [
      sor(idoszakSzoveg(A.erkezes, A.tavozas), ar.ejszakak + ' ' + T.ej),
      sor(ar.ejszakak + ' ' + T.ej + ' × ' + forint(ar.atlagEjszaka), forint(ar.szallasdij)),
      ...ar.extraSorok.map((s) => sor(C.extrak[s.id].nev, s.osszeg === 0 ? T.nincsFelar : forint(s.osszeg))),
      sor(T.osszIfa, forint(ar.ifa)),
      `<div class="rv-spread rv-osszesito__total"><span>${vedett(T.osszesen)}</span><span>${vedett(forint(ar.osszesen))}</span></div>`,
      `<div class="rv-spread rv-osszesito__deposit"><span>${vedett(T.osszFoglaloMost)}</span><span>${vedett(forint(ar.foglalo))}</span></div>`,
    ].join('');
  }

  function vendegSzoveg() {
    return T.felnottek(A.felnott) + (A.gyerek ? ', ' + T.gyerekek(A.gyerek) : '');
  }

  function attekintest(ar, fo, kanapeKell) {
    const fekvohelyek = [
      T.attekHaloszobakban(Math.min(fo, HAZ.alapFerohely)),
      (A.kanape || kanapeKell) ? T.attekKanape : null,
      A.gyerekagy ? T.attekGyerekagy : null,
      A.etetoszek ? T.attekEtetoszek : null,
    ].filter(Boolean).join(' · ');

    const sorok = [
      [T.attekIdopont, idoszakSzoveg(A.erkezes, A.tavozas) + ' (' + ar.ejszakak + ' ' + T.ej + ')'],
      [T.osszVendegek, vendegSzoveg()],
      [T.attekFekvohelyek, fekvohelyek],
      [T.mezoNev, mNev.value],
      [T.mezoEmail, mEmail.value],
      [T.mezoTelefon, mTelefon.value || T.attekNemAdtadMeg],
    ];
    el('#rv-attekintes').innerHTML = sorok.map(([cimke, ertek]) =>
      `<div class="rv-summaryrow"><span class="rv-muted">${vedett(cimke)}</span><span>${vedett(ertek)}</span></div>`).join('');
    irj('#rv-mit-tortenik', T.mitTortenikSzoveg(forint(ar.foglalo)));
  }

  /* ---------- Lépések ---------- */

  function lepesreValt(uj) {
    A.lepes = uj;
    elek('.rv-step-panel').forEach((p) => { p.hidden = Number(p.dataset.lepes) !== uj; });
    elek('[data-lepesszam]').forEach((e) => e.classList.toggle('rv-step__num--on', Number(e.dataset.lepesszam) <= uj));
    elek('[data-lepescimke]').forEach((e) => e.classList.toggle('rv-step__label--on', Number(e.dataset.lepescimke) === uj));

    el('#rv-vissza').hidden = uj === 0;
    tovabbGomb.textContent = uj < 2 ? T.tovabb + ' →' : T.kuldes;
    irj('#rv-sav-tovabb', uj < 2 ? T.tovabb : T.kuldes);
    frissit();
  }

  /** A lépés ellenőrzése. Igazat ad, ha mehetünk tovább. */
  function lepesRendben(lepes, eredmeny) {
    hibat('#rv-hiba-datum', ''); hibat('#rv-hiba-letszam', '');
    hibat('#rv-hiba-nev', ''); hibat('#rv-hiba-email', ''); hibat('#rv-hiba-feltetel', '');

    if (lepes === 0) {
      if (!A.erkezes || !A.tavozas) { hibat('#rv-hiba-datum', T.hibaDatum); return false; }
      if (!eredmeny.szabad) {
        if (eredmeny.ok_kod === 'letszam') hibat('#rv-hiba-letszam', hibaUzenet(eredmeny));
        else hibat('#rv-hiba-datum', hibaUzenet(eredmeny));
        return false;
      }
    }
    if (lepes === 1) {
      let jo = true;
      if (!mNev.value.trim()) { hibat('#rv-hiba-nev', T.hibaNev); jo = false; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mEmail.value)) { hibat('#rv-hiba-email', T.hibaEmail); jo = false; }
      if (!jo) return false;
    }
    if (lepes === 2 && !mElfogadom.checked) { hibat('#rv-hiba-feltetel', T.hibaFeltetel); return false; }
    return true;
  }

  function tovabb() {
    const { eredmeny, ar, fo, kanapeKell } = frissit();
    if (!lepesRendben(A.lepes, eredmeny)) return;

    if (A.lepes < 2) {
      lepesreValt(A.lepes + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    /* Mentés előtt még egyszer ellenőrzünk: közben felkerülhetett egy
       másik foglalás ugyanarra az időszakra. */
    foglalasok = foglalasokBetolt();
    const most = ellenoriz(A.erkezes, A.tavozas, A.felnott, A.gyerek, foglalasok);
    if (!most.szabad) {
      hibat('#rv-hiba-datum', hibaUzenet(most));
      lepesreValt(0);
      return;
    }

    const foglalas = {
      azonosito: ujAzonosito(A.erkezes),
      nev: mNev.value, email: mEmail.value, telefon: mTelefon.value, megjegyzes: mMegjegyzes.value,
      erkezes: A.erkezes, tavozas: A.tavozas, felnott: A.felnott, gyerek: A.gyerek,
      kanape: A.kanape || kanapeKell, gyerekagy: A.gyerekagy, etetoszek: A.etetoszek,
      extrak: A.extrak,
      allapot: 'fuggoben',
      foglalo: ar.foglalo,
      osszesen: ar.osszesen,
    };
    foglalasok = [...foglalasok, foglalas];
    foglalasokMent(foglalasok);
    keszDialogus(foglalas);
  }

  function keszDialogus(f) {
    irj('#rv-kesz-szoveg', T.keszSzoveg(idoszakSzoveg(f.erkezes, f.tavozas), vendegSzoveg(), f.email));
    irj('#rv-kesz-masodik', T.keszMasodik(forint(f.foglalo)));
    el('#rv-kesz-jelvenyek').innerHTML = [
      ['success', T.keszRogzitve],
      ['neutral', T.keszAzonosito(f.azonosito)],
      ['accent', forint(f.osszesen)],
    ].map(([szin, sz]) => `<span class="rv-badge rv-badge--${szin}">${vedett(sz)}</span>`).join('');
    mutasd(el('#rv-kesz'), true);
  }

  /* ---------- Eseménykezelés ---------- */

  mErkezes.addEventListener('input', () => {
    A.erkezes = mErkezes.value;
    if (A.tavozas && A.tavozas <= A.erkezes) { A.tavozas = plusNap(A.erkezes, 4); mTavozas.value = A.tavozas; }
    mTavozas.min = plusNap(A.erkezes || ma(), 1);
    frissit();
  });
  mTavozas.addEventListener('input', () => { A.tavozas = mTavozas.value; frissit(); });

  mFelnott.addEventListener('change', () => { A.felnott = Number(mFelnott.value); frissit(); });
  mGyerek.addEventListener('change', () => { A.gyerek = Number(mGyerek.value); frissit(); });
  mKanape.addEventListener('change', () => { A.kanape = mKanape.checked; frissit(); });
  mGyerekagy.addEventListener('change', () => { A.gyerekagy = mGyerekagy.checked; });
  mEtetoszek.addEventListener('change', () => { A.etetoszek = mEtetoszek.checked; });

  elek('[data-extra]').forEach((jelolo) => jelolo.addEventListener('change', () => {
    const id = jelolo.dataset.extra;
    A.extrak = jelolo.checked ? [...A.extrak, id] : A.extrak.filter((x) => x !== id);
    frissit();
  }));

  tovabbGomb.addEventListener('click', tovabb);
  el('#rv-sav-tovabb').addEventListener('click', tovabb);
  el('#rv-vissza').addEventListener('click', () => lepesreValt(Math.max(0, A.lepes - 1)));

  lepesreValt(0);
})();
