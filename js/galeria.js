/* ============================================================
   RIVERSIDE — GALÉRIA

   Mind a 38 kép benne van a galeria.html forrásában. Ez a fájl csak
   szűr: elrejti azokat, amelyek nem tartoznak a választotthoz. Nem
   tölt be semmit utólag, és nem rajzol újra semmit.

   Kétféle szűrés van:

     ?mit=kert      — kategória (a szűrőgombok)
     ?cimke=medence — a ház egy jellemzője (a főoldal és a ház oldal
                      címkéiről érkezve: „Medence" → a medence fotói)

   A választás mindkét esetben a címsorba kerül, így a szűrt nézet
   megosztható, és a vissza gomb is azt hozza, amit a látogató várna.
   ============================================================ */

(function galeria() {
  const racs = el('#rv-photogrid');
  if (!racs) return;

  const szurok = elek('[data-szuro]');
  const kepek = elek('.rv-photogrid__item', racs);
  const cimkeDoboz = el('#rv-cimke-szuro');

  /** A címsor frissítése anélkül, hogy új oldalt töltenénk. */
  function cimbe(kulcs, ertek) {
    const cim = new URL(window.location.href);
    cim.searchParams.delete('mit');
    cim.searchParams.delete('cimke');
    if (ertek) cim.searchParams.set(kulcs, ertek);
    history.replaceState(null, '', cim);
  }

  /* ---------- Kategória szerint ---------- */

  function szur(mit, cimbeIs) {
    /* A lista ELEMÉT rejtjük el, nem a benne lévő gombot: különben a
       rács üres helyeket hagyna a kihagyott képek helyén. */
    kepek.forEach((k) => { k.closest('li').hidden = mit !== 'mind' && k.dataset.kategoria !== mit; });
    szurok.forEach((gomb) => gomb.classList.toggle('rv-filter--on', gomb.dataset.szuro === mit));
    if (cimkeDoboz) { cimkeDoboz.hidden = true; cimkeDoboz.innerHTML = ''; }
    if (cimbeIs) cimbe('mit', mit === 'mind' ? '' : mit);
  }

  /* ---------- A ház egy jellemzője szerint ----------
     A jellemzőhöz tartozó fotók listája az adatok.js CIMKEK
     tömbjében van, a felirata a tartalom.js `cimkek` tömbjében,
     ugyanazon a helyen. */

  function cimkeSzerint(kulcs, cimbeIs) {
    const index = CIMKEK.findIndex((x) => x.kulcs === kulcs);
    if (index < 0 || !CIMKEK[index].fotok.length) return false;

    const fotok = CIMKEK[index].fotok;
    const felirat = C.cimkek[index];

    kepek.forEach((k) => { k.closest('li').hidden = !fotok.includes(k.dataset.foto); });
    szurok.forEach((gomb) => gomb.classList.remove('rv-filter--on'));

    if (cimkeDoboz) {
      cimkeDoboz.hidden = false;
      cimkeDoboz.innerHTML = `<span class="rv-filternote__label">${vedett(T.galeriaCimkeSzuro(felirat))}</span>
        <button type="button" class="rv-linkbtn" id="rv-cimke-torles">${vedett(T.galeriaMind)} →</button>`;
      el('#rv-cimke-torles').addEventListener('click', () => szur('mind', true));
    }
    if (cimbeIs) cimbe('cimke', kulcs);
    return true;
  }

  szurok.forEach((gomb) => gomb.addEventListener('click', () => szur(gomb.dataset.szuro, true)));

  /* Induláskor a címsor dönt: előbb a címke, aztán a kategória. */
  const cim = new URL(window.location.href).searchParams;
  const cimke = cim.get('cimke');
  const kategoria = cim.get('mit');

  if (!cimke || !cimkeSzerint(cimke, false)) {
    if (kategoria && szurok.some((g) => g.dataset.szuro === kategoria)) szur(kategoria, false);
  }
})();
