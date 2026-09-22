/* ============================================================
   RIVERSIDE — NAVIGÁCIÓ

   Az oldalak között valódi linkekkel lépkedünk: minden menüpont egy
   sima <a href="…html">, a böngésző tölti be a következő lapot. Itt
   ezért nincs útvonalkezelés — csak a mobil menü nyitása-zárása.

   A menü HTML-ben már ott van (lásd a fejlécet), csak rejtve. Ez a
   fájl annyit tesz, hogy a hamburgergomb megmutatja.
   ============================================================ */

const burger = el('#rv-burger');
const fiok = el('#rv-drawer');

if (burger && fiok) {
  const allit = (nyitva) => {
    fiok.hidden = !nyitva;
    burger.setAttribute('aria-expanded', String(nyitva));
  };

  burger.addEventListener('click', () => allit(fiok.hidden));

  // Escape-re zár, ahogy minden más nyitható elem az oldalon.
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !fiok.hidden) { allit(false); burger.focus(); }
  });

  // Ha a látogató a fiókon kívülre kattint, zárjuk.
  document.addEventListener('click', (e) => {
    if (fiok.hidden) return;
    if (fiok.contains(e.target) || burger.contains(e.target)) return;
    allit(false);
  });

  /* A fiók a fejléc alatt ül. A fejléc görgetéskor összehúzódik,
     ezért a fiók tetejét is arrébb kell tenni — különben rés marad
     vagy átfedés lesz. Az osztályt az animaciok.js rakja fel. */
  const figyelo = new MutationObserver(() => {
    const tomor = document.querySelector('.rv-header').classList.contains('rv-header--compact');
    fiok.style.top = tomor ? 'var(--header-h-sm)' : '';
  });
  figyelo.observe(document.querySelector('.rv-header'), { attributes: true, attributeFilter: ['class'] });
}
