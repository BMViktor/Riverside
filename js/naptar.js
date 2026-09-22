/* ============================================================
   RIVERSIDE — NAPTÁR

   Két hónap egymás mellett, a foglalt napok jelölve. Első kattintás
   az érkezés, második a távozás.

   A naptár nem tud semmit a foglalásról: kap egy `foglaltE(nap)`
   kérdést és egy `valaszt(nap)` visszahívást, és ennyi. A szabályokat
   a logika.js dönti el, a naptár csak mutat és kérdez.

   Használat (lásd js/foglalas.js):
       const naptar = Naptar(el('#rv-naptar'), { foglaltE, valaszt });
       naptar.frissit(erkezes, tavozas);
   ============================================================ */

function Naptar(doboz, { foglaltE, valaszt }) {
  let horgony = ma().slice(0, 8) + '01';   // a bal oldali hónap első napja
  let erkezes = '';
  let tavozas = '';

  /** Egy hónap rácsa. A kezdő nap a hónap 1-je. */
  function honap(kezdo) {
    const napok = honapRacs(kezdo).map((nap) => {
      if (!nap) return '<span></span>';
      const mult = nap < ma();
      const foglalt = foglaltE(nap);
      const kivalasztott = nap === erkezes || nap === tavozas;
      const kozotte = erkezes && tavozas && nap > erkezes && nap < tavozas;
      const osztaly = ['rv-cal__day', foglalt ? 'rv-cal__day--taken' : 'rv-cal__day--free',
        kivalasztott ? 'rv-cal__day--sel' : '', kozotte ? 'rv-cal__day--range' : ''].filter(Boolean).join(' ');
      return `<button type="button" class="${osztaly}" data-nap="${nap}"
        ${mult || foglalt ? 'disabled' : ''}>${datumbol(nap).getDate()}</button>`;
    }).join('');

    return `<div>
      <div class="rv-cal__title">${vedett(honapCim(kezdo))}</div>
      <div class="rv-cal__dow">${napNevek().map((n) => `<span>${vedett(n)}</span>`).join('')}</div>
      <div class="rv-cal__grid">${napok}</div>
    </div>`;
  }

  function rajzol() {
    const masodik = plusNap(horgony, 32).slice(0, 8) + '01';
    doboz.innerHTML = `
      <div class="rv-cal__head">
        <button type="button" class="rv-iconbtn" data-lep="-1" aria-label="${vedett(T.elozoHonap)}">‹</button>
        <span class="rv-muted rv-cal__hint">${vedett(T.naptarSugo)}</span>
        <button type="button" class="rv-iconbtn" data-lep="1" aria-label="${vedett(T.kovetkezoHonap)}">›</button>
      </div>
      <div class="rv-cal__months">${honap(horgony)}${honap(masodik)}</div>
      <div class="rv-cal__legend">
        <span><i class="rv-dot rv-dot--free"></i> ${vedett(T.naptarSzabad)}</span>
        <span><i class="rv-dot rv-dot--taken"></i> ${vedett(T.naptarFoglalt)}</span>
      </div>`;

    elek('[data-lep]', doboz).forEach((gomb) => gomb.addEventListener('click', () => {
      horgony = plusNap(horgony, Number(gomb.dataset.lep) > 0 ? 32 : -1).slice(0, 8) + '01';
      rajzol();
    }));
    elek('[data-nap]', doboz).forEach((gomb) => gomb.addEventListener('click', () => valaszt(gomb.dataset.nap)));
  }

  rajzol();

  return {
    /** Új érkezés/távozás megjelenítése. A látott hónapot nem lépteti
        el feleslegesen — csak ha a kiválasztott nap kicsúszna. */
    frissit(ujErkezes, ujTavozas) {
      erkezes = ujErkezes || '';
      tavozas = ujTavozas || '';
      if (erkezes) {
        const elso = horgony;
        const utolso = plusNap(horgony, 32).slice(0, 8) + '01';
        if (erkezes < elso || erkezes >= plusNap(utolso, 32)) horgony = erkezes.slice(0, 8) + '01';
      }
      rajzol();
    },
  };
}
