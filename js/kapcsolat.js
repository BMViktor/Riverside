/* ============================================================
   RIVERSIDE — KAPCSOLAT ŰRLAP

   A demóban az üzenet nem megy sehova: nincs mögötte szerver. Az
   űrlap viszont ugyanúgy ellenőriz, mint élesben fog, és ezt ki is
   írjuk — nem teszünk úgy, mintha elküldtük volna.

   Ha egyszer éles lesz: az `elkuldes` függvényben egyetlen `fetch`
   hívás a helye, minden más maradhat.
   ============================================================ */

(function kapcsolat() {
  const urlap = el('#rv-uzenet');
  if (!urlap) return;

  const mNev = el('#rv-u-nev');
  const mEmail = el('#rv-u-email');
  const mUzenet = el('#rv-u-uzenet');
  const mAdat = el('#rv-u-adat');

  function rendben() {
    let jo = true;
    hibat('#rv-u-hiba-nev', ''); hibat('#rv-u-hiba-email', '');
    hibat('#rv-u-hiba-uzenet', ''); hibat('#rv-u-hiba-adat', '');

    if (!mNev.value.trim()) { hibat('#rv-u-hiba-nev', T.hibaNev); jo = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mEmail.value)) { hibat('#rv-u-hiba-email', T.hibaEmail); jo = false; }
    if (!mUzenet.value.trim()) { hibat('#rv-u-hiba-uzenet', T.hibaUzenetSzoveg); jo = false; }
    if (!mAdat.checked) { hibat('#rv-u-hiba-adat', T.hibaAdatkezeles); jo = false; }
    return jo;
  }

  urlap.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!rendben()) return;
    // Itt menne el az üzenet. A demóban csak visszajelzünk.
    urlap.reset();
    mutasd(el('#rv-u-kesz'), true);
  });
})();
