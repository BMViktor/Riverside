/* ============================================================
   RIVERSIDE — MAIN

   Minden oldal betölti. Három dolgot csinál:

     1. beállítja a nyelvet a dátum- és árformázásnak,
     2. közreadja a kis segédeket, amiket a többi fájl használ,
     3. bekapcsolja a lábléc „Demóadatok visszaállítása" gombját.

   Az oldal a saját azonosságát a HTML-ből kapja: minden lap alján
   ott áll egy rövid `window.RV = { nyelv, oldal, utak }` blokk. Innen
   tudjuk, melyik nyelven vagyunk, és hova mutatnak a linkek — így
   egyetlen JavaScript-fájl mind a 33 oldalt kiszolgálja.
   ============================================================ */

/* A nyelv a <html lang="...">-ból is olvasható; a window.RV a
   biztos forrás, mert azt a gyártó írja ki. */
const NYELV = (window.RV && window.RV.nyelv) || document.documentElement.lang || 'hu';
const OLDAL = (window.RV && window.RV.oldal) || 'fooldal';
const UTAK = (window.RV && window.RV.utak) || {};

/* A dátumok és az árak is a választott nyelven jelennek meg. */
nyelvBeallit(NYELV);

/** A választott nyelv felületi szavai: T.foglalas, T.fok(3) … */
const T = szoveg(NYELV);
/** A választott nyelv tartalma: C.gyik, C.hazirend … */
const C = tartalom(NYELV);

/* ---------- Apró segédek ----------
   Szándékosan rövidek: az `el` egy elemet keres, az `elek` többet.
   Mindkettő `null`-t, illetve üres tömböt ad, ha nincs találat —
   ezért működnek ugyanazok a fájlok olyan oldalon is, ahol az adott
   elem nem létezik. */

const el = (valaszto, szulo = document) => szulo.querySelector(valaszto);
const elek = (valaszto, szulo = document) => [...szulo.querySelectorAll(valaszto)];

/** Szöveg beírása, ha az elem létezik. */
function irj(valaszto, szoveg) {
  const e = typeof valaszto === 'string' ? el(valaszto) : valaszto;
  if (e) e.textContent = szoveg;
}

/** Elem mutatása vagy elrejtése a `hidden` jelzővel. */
function mutasd(elem, lathato) {
  if (!elem) return;
  elem.hidden = !lathato;
}

/** Hibaüzenet egy mező alatt. Üres szövegre eltűnik. */
function hibat(valaszto, szoveg) {
  const e = typeof valaszto === 'string' ? el(valaszto) : valaszto;
  if (!e) return;
  e.textContent = szoveg || '';
  e.hidden = !szoveg;
}

/** HTML-be írható szöveg — mindenhol ezen megy át a felhasználói adat. */
function vedett(szoveg) {
  return String(szoveg ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Hivatkozás egy másik oldalra, ezen a nyelven: `ide('foglalas')`. */
function ide(oldalKulcs) {
  return UTAK[oldalKulcs] || UTAK.fooldal || 'index.html';
}

/* ---------- A logika kódjaiból mondat ----------
   A logika.js sosem ad vissza mondatot, csak kódot (`min-ejszaka`,
   `turnus`, `foglalt`). A mondat itt születik meg, a látogató
   nyelvén — ezért egy új nyelvhez nem kell a logikához nyúlni. */

function hibaUzenet(eredmeny) {
  if (!eredmeny || eredmeny.szabad) return '';
  switch (eredmeny.ok_kod) {
    case 'mult': return T.hibaMult;
    case 'letszam': return T.hibaLetszam(eredmeny.maxFo);
    case 'rossz-idoszak': return T.hibaRosszIdoszak;
    case 'min-ejszaka': return T.hibaMinEj(eredmeny.ejszakaSzam);
    case 'turnus': return T.hibaTurnus(eredmeny.ejszakaSzam, T.napNevek[eredmeny.valtonap]);
    case 'foglalt': return T.hibaFoglalt;
    default: return T.hibaAltalanos;
  }
}

/** „két héttel később" — emberi nyelven, a választott nyelven. */
function eltolasSzoveg(nap) {
  if (nap === 0) return T.altUgyanaznap;
  const n = Math.abs(nap);
  const egyseg = (n % 7 === 0 && n >= 7) ? T.altHet(n / 7) : T.altNap(n);
  return nap > 0 ? T.altKesobb(egyseg) : T.altKorabban(egyseg);
}

/* ---------- Alternatív időpontok ----------
   A „betelt" állapot kiútja: a rendszer a kért érkezéstől kifelé
   haladva megkeresi a legközelebbi szabad és szabályos időszakokat.
   Ez a függvény rajzolja ki őket; a kattintást a hívó oldal kezeli. */

function alternativakatRajzol(doboz, javaslatok, valasztaskor) {
  if (!doboz) return;
  if (!javaslatok || !javaslatok.length) { doboz.hidden = true; doboz.innerHTML = ''; return; }

  doboz.hidden = false;
  doboz.innerHTML = `<div class="rv-alts__title">${vedett(T.altCim)}</div>
    <div class="rv-stack rv-stack--checks">
      ${javaslatok.map((j, i) => `<button type="button" class="rv-alt" data-alt="${i}">
        <span class="rv-alt__main">
          <span class="rv-alt__dates">${vedett(idoszakSzoveg(j.erkezes, j.tavozas))}</span>
          <span class="rv-alt__meta">${vedett(j.ejszakak + ' ' + T.ej + ' · ' + eltolasSzoveg(j.eltolas) + ' · ' + forint(j.szallasdij))}</span>
        </span>
        <span>→</span>
      </button>`).join('')}
    </div>`;

  elek('[data-alt]', doboz).forEach((gomb) => {
    gomb.addEventListener('click', () => valasztaskor(javaslatok[Number(gomb.dataset.alt)]));
  });
}

/* ---------- Lábléc: demóadatok visszaállítása ---------- */

const demoGomb = el('#rv-demo-vissza');
if (demoGomb) {
  demoGomb.addEventListener('click', () => {
    demoVisszaallit();
    window.location.href = ide('fooldal');
  });
}
