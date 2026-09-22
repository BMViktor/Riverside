/* ============================================================
   RIVERSIDE — NAGYÍTÓ (lightbox)

   Teljes képernyős képnézegető. Nyilakkal lapoz, Escape-re bezár.

   Nem kell megmondani neki, mely képekkel dolgozzon: minden
   gombra, amin `data-nagyito="csoportnév"` van, magától felfigyel,
   és az azonos csoportba tartozókat egy sorozatnak tekinti. Ezért
   szolgálja ki ugyanez a fájl a galériát és a ház oldal fejléc-
   galériáját is.

   A képek és a feliratok az oldal HTML-jéből jönnek, nem innen.
   ============================================================ */

(function nagyito() {
  const gombok = elek('[data-nagyito]');
  if (!gombok.length) return;

  /* Csoportonként egy sorozat. A sorrend a HTML sorrendje. */
  const csoportok = {};
  gombok.forEach((gomb) => {
    const nev = gomb.dataset.nagyito;
    (csoportok[nev] = csoportok[nev] || []).push(gomb);
  });

  /* A réteg egyszer készül el, és üresen vár. */
  const reteg = document.createElement('div');
  reteg.className = 'rv-lightbox';
  reteg.hidden = true;
  reteg.setAttribute('role', 'dialog');
  reteg.setAttribute('aria-modal', 'true');
  reteg.setAttribute('aria-label', T.fotoNagyitas);
  reteg.innerHTML = `
    <div class="rv-lightbox__bar">
      <span data-mi="szamlalo"></span>
      <button type="button" class="rv-iconbtn rv-iconbtn--inverse" data-mi="bezar"
              aria-label="${vedett(T.bezaras)}">✕</button>
    </div>
    <div class="rv-lightbox__stage">
      <button type="button" class="rv-iconbtn rv-iconbtn--inverse rv-iconbtn--round" data-mi="elozo"
              aria-label="${vedett(T.elozo)}">‹</button>
      <img class="rv-lightbox__img" data-mi="kep" alt="" />
      <button type="button" class="rv-iconbtn rv-iconbtn--inverse rv-iconbtn--round" data-mi="kovetkezo"
              aria-label="${vedett(T.kovetkezo)}">›</button>
    </div>
    <div class="rv-lightbox__caption" data-mi="felirat"></div>`;
  document.body.appendChild(reteg);

  const resz = (nev) => el(`[data-mi="${nev}"]`, reteg);
  let sorozat = [];
  let index = 0;
  let honnan = null;         // ide adjuk vissza a fókuszt bezáráskor
  let elozoTulcsordulas = '';

  /** Egy elem adatai: a benne lévő kép és a felirata. */
  function adatok(gomb) {
    const kep = el('img', gomb);
    const felirat = el('.rv-photogrid__cap', gomb);
    return {
      src: kep ? kep.getAttribute('src') : '',
      felirat: felirat ? felirat.textContent.trim() : (kep ? kep.getAttribute('alt') : ''),
    };
  }

  function rajzol() {
    const { src, felirat } = adatok(sorozat[index]);
    resz('kep').setAttribute('src', src);
    resz('kep').setAttribute('alt', felirat);
    resz('felirat').textContent = felirat;
    resz('szamlalo').textContent = (index + 1) + ' / ' + sorozat.length;
  }

  function lep(mennyit) {
    index = (index + mennyit + sorozat.length) % sorozat.length;
    rajzol();
  }

  function nyit(gomb) {
    // Csak a láthatók számítanak: a galéria szűrője elrejthet képeket.
    sorozat = csoportok[gomb.dataset.nagyito].filter((g) => !g.hidden && !(g.closest('li') || {}).hidden);
    index = Math.max(0, sorozat.indexOf(gomb));
    honnan = gomb;
    rajzol();
    reteg.hidden = false;
    elozoTulcsordulas = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    resz('bezar').focus();
  }

  function bezar() {
    reteg.hidden = true;
    document.body.style.overflow = elozoTulcsordulas;
    if (honnan) honnan.focus();
  }

  gombok.forEach((gomb) => gomb.addEventListener('click', () => nyit(gomb)));
  resz('bezar').addEventListener('click', bezar);
  resz('elozo').addEventListener('click', () => lep(-1));
  resz('kovetkezo').addEventListener('click', () => lep(1));
  // A háttérre kattintva is zár, a képre és a gombokra kattintva nem.
  reteg.addEventListener('click', (e) => { if (e.target === reteg) bezar(); });

  document.addEventListener('keydown', (e) => {
    if (reteg.hidden) return;
    if (e.key === 'Escape') bezar();
    if (e.key === 'ArrowRight') lep(1);
    if (e.key === 'ArrowLeft') lep(-1);
  });
})();
