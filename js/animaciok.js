/* ============================================================
   RIVERSIDE — MOZGÁS GÖRGETÉSKOR

   Az oldal finoman reagál a görgetésre: a fejléc összehúzódik, a
   szekciók belépéskor megjelennek, a hero fotó alig észrevehetően
   elmozdul, és mobilon előbújik egy foglalási sáv.

   Miért így:
   — egyetlen görgetés-figyelő fut az egész oldalon, `passive` módban,
     és képkockánként legfeljebb egyszer dolgozik (requestAnimationFrame);
   — a szekciókat nem a görgetés mozgatja, hanem IntersectionObserver
     szól nekik, és egy elem a megjelenése után le is iratkozik;
   — görgetés közben csak osztályt vagy CSS-változót írunk, elrendezést
     soha — így a böngészőnek nem kell újraszámolnia a lapot.

   A mozgás mértékét a css/animations.css tartja kordában, és ott van
   a `prefers-reduced-motion` kezelése is.
   ============================================================ */

/** Igaz, ha a látogató csökkentett mozgást kért az operációs rendszerében. */
function csokkentettMozgas() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/* ---------- 1. Belépő elemek ----------
   Egyetlen közös megfigyelő szolgálja ki az összes elemet. Az elem a
   megjelenése után leiratkozik: egyszer lép be, és onnantól áll. */

(function belepok() {
  const elemek = elek('.rv-reveal');
  if (!elemek.length) return;

  if (csokkentettMozgas() || typeof IntersectionObserver === 'undefined') {
    elemek.forEach((e) => e.classList.add('rv-reveal--in'));
    return;
  }

  const megfigyelo = new IntersectionObserver((bejegyzesek) => {
    for (const b of bejegyzesek) {
      if (!b.isIntersecting) continue;
      b.target.classList.add('rv-reveal--in');
      megfigyelo.unobserve(b.target);
    }
  /* Akkor lép be, amikor a teteje a képernyő alsó nyolcadába ér — így
     a mozgás a görgetés természetes üteméhez igazodik.

     A küszöb szándékosan 0, és a késleltetést a `rootMargin` adja:
     egy arányos küszöb (pl. 0.12) a magas elemeknél SOHA nem teljesül.
     A galéria mobilon több mint tízezer képpont magas — annak a 12%-a
     nem fér ki egy telefon képernyőjére, így a szekció örökre rejtve
     maradna. Ezért az elem méretétől független feltétel kell. */
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0 });

  elemek.forEach((e) => megfigyelo.observe(e));
})();

/* ---------- 2. A fejléc, a haladásjelző és a mobil sáv ---------- */

const TOMORITES_UTAN = 48;      // ennyi képpont után húzódik össze a fejléc
const VISSZANYIT_ELTERES = 90;  // felfelé görgetve ennyi után nyílik vissza

(function gorgetes() {
  const fejlec = el('.rv-header');
  if (!fejlec) return;

  const haladas = el('.rv-progress', fejlec);
  const sav = el('.rv-ctabar');
  const heroKep = el('.rv-hero__img');
  const fooldalE = fejlec.classList.contains('rv-header--top') || OLDAL === 'fooldal';
  const mozoghat = !csokkentettMozgas();

  let varakozik = false;
  let utolso = window.scrollY;
  let fordulopont = window.scrollY;
  let lefele = true;

  const szamol = () => {
    varakozik = false;
    const y = window.scrollY;
    const magassag = document.documentElement.scrollHeight - window.innerHeight;

    // Irányváltás: felfelé görgetve a fejléc visszanyeri a magasságát.
    if (y > utolso && !lefele) { lefele = true; fordulopont = y; }
    if (y < utolso && lefele) { lefele = false; fordulopont = y; }
    utolso = y;

    const felfeleEleget = !lefele && (fordulopont - y) > VISSZANYIT_ELTERES;
    const tomor = y > TOMORITES_UTAN && !felfeleEleget;

    fejlec.classList.toggle('rv-header--compact', tomor);
    // Légies csak a főoldal tetején, ahol a fejléc a fotón ül.
    fejlec.classList.toggle('rv-header--top', fooldalE && y <= 8);

    if (haladas) {
      haladas.style.setProperty('--rv-progress', magassag > 0 ? Math.min(1, y / magassag) : 0);
    }
    if (sav) sav.classList.toggle('rv-ctabar--on', y > window.innerHeight * 0.75);

    /* Nagyon finom parallax: a kép legfeljebb 28 képpontot mozdul, és
       mivel nagyobb a kereténél, sosem látszik ki alóla él. CSS
       változóval adjuk át, hogy a böngésző a kompozitoron rajzolja. */
    if (heroKep && mozoghat && y <= window.innerHeight) {
      heroKep.style.setProperty('--rv-parallax', Math.min(28, y * 0.10).toFixed(1) + 'px');
    }
  };

  const figyelo = () => {
    if (varakozik) return;
    varakozik = true;
    requestAnimationFrame(szamol);
  };

  szamol();
  window.addEventListener('scroll', figyelo, { passive: true });
  window.addEventListener('resize', figyelo, { passive: true });
})();
