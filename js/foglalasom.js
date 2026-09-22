/* ============================================================
   RIVERSIDE — FOGLALÁSOM

   Azonosító + e-mail cím együtt azonosít. Nincs jelszó és nincs
   regisztráció, de a foglalás adatai nem érhetők el pusztán az
   azonosítóval — az ugyanis e-mailben utazik.

   A keresést és a lemondást a logika.js végzi; ez a fájl a mezőket
   olvassa és az eredményt írja ki.
   ============================================================ */

(function foglalasom() {
  const gomb = el('#rv-lek-gomb');
  if (!gomb) return;

  const mAzonosito = el('#rv-lek-azonosito');
  const mEmail = el('#rv-lek-email');
  const talalatDoboz = el('#rv-lek-talalat');
  const kerdes = el('#rv-lem-kerdes');

  let talalat = null;

  const ALLAPOT_SZOVEG = {
    fuggoben: T.allapotFuggoben,
    visszaigazolt: T.allapotVisszaigazolt,
    lemondott: T.allapotLemondott,
  };
  const ALLAPOT_SZIN = { fuggoben: 'warning', visszaigazolt: 'success', lemondott: 'danger' };

  function keres() {
    const foglalasok = foglalasokBetolt();
    talalat = foglalastKeres(mAzonosito.value, mEmail.value, foglalasok);
    mutasd(el('#rv-lek-nincs'), !talalat);
    rajzol();
  }

  function rajzol() {
    if (!talalat) { talalatDoboz.innerHTML = ''; return; }

    const allapot = lemondasiAllapot(talalat);
    const ar = arat(talalat.erkezes, talalat.tavozas, talalat.felnott, talalat.gyerek, talalat.extrak, false);
    const fekvohelyek = [
      talalat.kanape ? T.attekKanape : T.attekCsakHalo,
      talalat.gyerekagy ? T.attekGyerekagy : null,
      talalat.etetoszek ? T.attekEtetoszek : null,
    ].filter(Boolean).join(' · ');

    const sorok = [
      [T.osszVendegek, T.felnottek(talalat.felnott) + (talalat.gyerek ? ', ' + T.gyerekek(talalat.gyerek) : '')],
      [T.attekFekvohelyek, fekvohelyek],
      [T.osszSzallasdij, ar.ejszakak + ' ' + T.ej + ' · ' + forint(ar.szallasdij)],
      [T.osszIfa, T.ifaErkezeskor(forint(ar.ifa))],
      [T.osszesen, forint(ar.osszesen)],
      [T.feltFoglalo, forint(talalat.foglalo)],
      [T.osszKaucio, T.kaucioErkezeskor(forint(KAUCIO))],
    ];

    /* A lemondás állapota: ingyenes-e még, és egyáltalán lemondható-e. */
    let also;
    if (talalat.allapot === 'lemondott') {
      also = `<div class="rv-toast rv-toast--light rv-note--lg">
        <span><span class="rv-toast__title">${vedett(T.lemMar)}</span>${vedett(T.lemMarSzoveg)}</span></div>`;
    } else {
      also = `<div class="rv-toast rv-toast--light rv-note--lg">
        <span>
          <span class="rv-toast__title">${vedett(allapot.ingyenes ? T.lemIngyenes : T.lemNemIngyenes)}</span>
          ${vedett(allapot.ingyenes
        ? T.lemIngyenesSzoveg(datumSzoveg(allapot.hatarido))
        : T.lemNemIngyenesSzoveg(datumSzoveg(allapot.hatarido)))}
        </span>
      </div>`;
      if (allapot.lemondhato) {
        also += `<div class="rv-formfoot">
          <a class="rv-btn rv-btn--secondary rv-btn--md" href="${vedett(KAPCSOLAT.telefonLink)}">${vedett(T.lemModositas)}</a>
          <button type="button" class="rv-btn rv-btn--ghost rv-btn--md" id="rv-lem-inditas">${vedett(T.lemGomb)}</button>
        </div>`;
      }
    }

    talalatDoboz.innerHTML = `<div class="rv-card rv-card--default rv-note--lg">
      <div class="rv-card__body rv-card__body--lg">
        <div class="rv-spread rv-spread--top">
          <div>
            <div class="rv-eyebrow">${vedett(talalat.azonosito)}</div>
            <h2 class="rv-display rv-h2--blokk">${vedett(idoszakSzoveg(talalat.erkezes, talalat.tavozas))}</h2>
          </div>
          <span class="rv-badge rv-badge--${ALLAPOT_SZIN[talalat.allapot] || 'neutral'}">${vedett(ALLAPOT_SZOVEG[talalat.allapot])}</span>
        </div>
        <div class="rv-stack rv-stack--rows">
          ${sorok.map(([cimke, ertek]) =>
      `<div class="rv-summaryrow"><span class="rv-muted">${vedett(cimke)}</span><span>${vedett(ertek)}</span></div>`).join('')}
        </div>
        ${also}
      </div>
    </div>`;

    const inditas = el('#rv-lem-inditas');
    if (inditas) inditas.addEventListener('click', () => kerdestNyit(allapot));
  }

  function kerdestNyit(allapot) {
    irj('#rv-lem-szoveg', T.lemBiztosSzoveg(idoszakSzoveg(talalat.erkezes, talalat.tavozas)));
    el('#rv-lem-jelveny').innerHTML = `<span class="rv-badge rv-badge--${allapot.ingyenes ? 'success' : 'warning'}">${vedett(allapot.ingyenes ? T.lemVisszajar(forint(talalat.foglalo)) : T.lemNemJar)}</span>`;
    mutasd(kerdes, true);
  }

  gomb.addEventListener('click', keres);
  // Enter a mezőben is keres — ez a leggyakoribb mozdulat.
  [mAzonosito, mEmail].forEach((mezo) => mezo.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); keres(); }
  }));

  el('#rv-lem-megsem').addEventListener('click', () => mutasd(kerdes, false));
  el('#rv-lem-igen').addEventListener('click', () => {
    const foglalasok = foglalasokBetolt().map((f) =>
      f.azonosito === talalat.azonosito ? { ...f, allapot: 'lemondott' } : f);
    foglalasokMent(foglalasok);
    talalat = { ...talalat, allapot: 'lemondott' };
    mutasd(kerdes, false);
    rajzol();
  });
})();
