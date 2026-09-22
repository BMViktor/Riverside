# Riverside — az olvasható, szerkeszthető weboldal

Ez a weboldal **külön HTML fájlokból** áll. Nincs mögötte keretrendszer,
nincs fordítás, nincs `npm install`. Nyisd meg az `index.html`-t dupla
kattintással, és megy — a foglalási logikával együtt.

Internet sem kell hozzá. (Egyetlen dolog jön a netről: a betűtípus. Ha
nincs net, a rendszer betűire vált, minden más változatlan.)

## A mappaszerkezet

```
/
├── index.html          A főoldal (magyar)
├── a-haz.html          A ház
├── arak.html           Árak
├── galeria.html        Galéria
├── kornyek.html        Környék
├── foglalas.html       Foglalás
├── foglalasom.html     Foglalás lekérdezése és lemondása
├── hazirend.html       Házirend
├── kapcsolat.html      Kapcsolat
├── adatkezeles.html    Adatkezelési tájékoztató
├── impresszum.html     Impresszum
│
├── de/                 Ugyanez a 11 oldal németül (index, das-haus, preise, …)
├── en/                 Ugyanez a 11 oldal angolul (index, the-house, prices, …)
│
├── css/
│   ├── style.css       Tokenek, komponensek, elrendezés — ezt szerkeszted
│   ├── responsive.css  Ami a laptop / tablet / mobil méreteknél változik
│   └── animations.css  A görgetésre adott mozgás
│
├── js/
│   ├── szotar.js       Gombok, címkék, üzenetek — három nyelven
│   ├── tartalom.js     Hosszabb szövegek — három nyelven
│   ├── adatok.js       Árak, szezonok, férőhely, képfájlnevek, elérhetőség
│   ├── logika.js       Dátum, árazás, szabályok, szabad-e a ház, mentés
│   ├── main.js         Közös segédek, minden oldalon fut
│   ├── navigacio.js    A mobil menü nyitása-zárása
│   ├── animaciok.js    Fejléc, belépő szekciók, parallax, mobil sáv
│   ├── naptar.js       A naptár (csak a foglalási oldalon)
│   ├── foglalas.js     A három lépéses foglalás
│   ├── foglalasom.js   Lekérdezés és lemondás
│   ├── galeria.js      A galéria szűrője
│   ├── nagyito.js      Képnagyító — a galéria és a ház oldal is ezt használja
│   ├── arkalkulator.js A ház oldal ár- és foglalókártyája
│   └── kapcsolat.js    A kapcsolati űrlap ellenőrzése
│
├── assets/
│   └── images/         A 38 fotó
│
├── design/             A Riverside Design System — a vizuális rendszer forrása
└── eszkozok/           Az oldalgyártó (lásd lejjebb)
```

## Hogyan működik

**A navigáció valódi.** Minden menüpont egy sima link:

```html
<a href="arak.html">Árak</a>
```

A böngésző tölti be a következő lapot. Nincs útvonalkezelés
JavaScriptből, nincs `#/valami` a címsorban, és minden oldal önmagában
is teljes: ha valaki egyetlen oldalra érkezik, az ott van készen.

**A közös részek közösek.** A CSS három fájlban, a JavaScript a `js/`
mappában — mindegyik oldal ugyanazokat tölti be. Egy szín, egy gomb, egy
kártya vagy a lábléc **egy helyen** van megírva, nem harminchárom
példányban.

**A JavaScript csak akkor fut, ha van mit csinálnia.** Minden fájl az
elején megnézi, hogy az őt érdeklő elem létezik-e az oldalon, és ha nem,
azonnal kilép. Ezért tölthető be ugyanaz a készlet mindenhol anélkül,
hogy bármi hibázna.

**Az oldal ismeri önmagát.** Minden lap alján ott áll egy rövid blokk:

```html
<script>
  window.RV = { nyelv: 'de', oldal: 'buchen', utak: { … } };
</script>
```

Ennyi az egyetlen beágyazott script: ebből tudja a JavaScript, melyik
nyelven és melyik oldalon van, és hova mutatnak a linkek.

## Három nyelv

A magyar oldalak a gyökérben, a német a `de/`, az angol az `en/`
mappában vannak. A fájlnevek is a saját nyelvükön szólnak:

| Magyar | Német | Angol |
| --- | --- | --- |
| `arak.html` | `de/preise.html` | `en/prices.html` |
| `a-haz.html` | `de/das-haus.html` | `en/the-house.html` |
| `foglalas.html` | `de/buchen.html` | `en/book.html` |

A fejlécben a HU / DE / EN kapcsoló ugyanarra az oldalra visz, csak a
másik nyelven — mert a link a gyártáskor a megfelelő fájlra mutat.

A szöveg két fájlban lakik, mindkettőben ugyanaz a három blokk egymás
alatt (`hu`, `de`, `en`): a `js/szotar.js`-ben a felületi szavak, a
`js/tartalom.js`-ben a hosszabb szövegek. A szabály egyszerű: **ha
szöveg, akkor szótár; ha szám vagy fájlnév, akkor `adatok.js`.** Egy
árat így továbbra is egy helyen kell átírni, nem háromban.

A `logika.js` szándékosan nem beszél. Ha egy foglalás nem megy át, nem
mondatot ad vissza, hanem kódot (`min-ejszaka`, `turnus`, `foglalt`), és
a `main.js` fordítja mondattá azon a nyelven, amelyiken a látogató jár.
Ezért egy negyedik nyelv csak annyi, hogy a két szótár kap egy új
blokkot — a logikához nem kell hozzányúlni.

Ha egy fordítás hiányzik, a magyar szöveg jelenik meg helyette, tehát
félkész fordítással sem törik el az oldal.

## A ház címkéi a galériára mutatnak

A főoldalon és a ház oldalán egy sorban állnak a ház jellemzői
(Medence, Saját stég, Horgászat …). Amelyikhez tartozik fotó, az
**link**: a galériát nyitja meg, arra a néhány képre szűrve
(`galeria.html?cimke=medence`). A szűrt nézet fölött ott a jelzés, és
egy kattintással vissza lehet állni mind a 38 képre.

Hogy melyik címkéhez melyik fotó tartozik, az `js/adatok.js`
`CIMKEK` listájában áll, a `tartalom.js` `cimkek` tömbjével azonos
sorrendben:

```js
{ kulcs: 'medence', fotok: ['pool-1.jpg', 'pool-2.jpg', …] },
{ kulcs: 'szauna',  fotok: [] },     // erről még nincs fotó
```

Amelyiknél a lista üres, ott a címke **nem link**, hanem sima felirat
— üres galériára vinni csalódás volna. Öt jellemzőről nincs jelenleg
fotó: **finn szauna, kerékpárok, wi-fi, légkondicionáló** és a
**kutyabarát** jelzéshez sincs saját kép (a stégen fotózott kutya
szolgál helyette). Ha ezekről készül fénykép, elég a fájlnevét
felvenni ide, és a címke magától kattinthatóvá válik.

## Amit a kereső és a böngésző lát

A weboldal szerkezete szándékosan szemantikus: a gép is érti, mi van a
lapon — ettől jobb a keresőben, és ettől használható felolvasóval,
billentyűzettel.

**Minden lapon pontosan egy `<h1>`** áll, és a címsorok nem ugranak
szintet (`h1` után `h2`, nem `h3`). A gyártóban ezt a szekció `fo: true`
jelzője kapcsolja: az az egy szekció adja a lap címét.

**Tereptárgyak:** `<header>`, `<nav>` (mindegyik megnevezve),
`<main id="tartalom">`, `<footer>`, és a lábléc elérhetősége `<address>`.
A galéria valódi lista (`<ul>`/`<li>`), az ártáblában a dátumok `<time>`
elemben állnak, gépi formátummal együtt.

**Billentyűzet:** az első Tab egy ugrólinkra áll („Ugrás a tartalomra"),
ami csak fókuszban látszik — nem kell minden lapon végigjárni a menüt.
Minden gombnak van neve, minden mezőnek címkéje, a nagyító
`role="dialog"`.

**Fejlécek:** minden lapon `canonical`, mind a három nyelvre `hreflang`
(plusz `x-default`), és megosztási adatok (`og:title`, `og:description`,
`og:image`, `og:url`). A nyelvi változatok így nem versengenek egymással
a keresőben, hanem egymás fordításai.

**Strukturált adat** (`application/ld+json`): minden lapon a szálláshely
adatai (cím, koordináta, telefon, férőhely, árterjedelem), a főoldalon és
a ház oldalán ezen felül a gyakori kérdések — ezeket a Google ki is tudja
emelni a találat alatt. Ami itt szerepel, az mind látszik az oldalon is;
rejtett kulcsszó nincs.

**Képek:** mindegyiknek van `alt` szövege és `width`/`height` attribútuma.
Ez utóbbi azért fontos, mert e nélkül a böngésző csak a kép letöltése után
tudja, mennyi helyet foglal, és addig ugrál a lap alatta lévő része — ezt
a Google is méri. A méreteket az `eszkozok/kepmeretek.json` tartja; új
fotónál elég oda felvenni.

**`sitemap.xml` és `robots.txt`** a gyártáskor magától elkészül. A
sitemap mind a 33 lapot felsorolja, és mindegyiknél megadja a másik két
nyelv címét is.

> A végleges domain egyetlen helyen áll: `eszkozok/oldalgyarto.mjs`,
> a `HELYSZIN` konstans. Élesítés előtt ezt az egy sort kell átírni, és
> a canonical, az og: mezők meg a sitemap magától követi.

## Ha szöveget módosítasz

A 33 HTML fájlban a szöveg **készen** benne van — ezért olvasható a
forrás, és ezért találja meg a kereső. Viszont ugyanaz a mondat több
lapon is szerepelhet, ezért nem kézzel írjuk át, hanem a szótárban, és
újragyártjuk az oldalakat:

```bash
node eszkozok/oldalgyarto.mjs
```

Ez a parancs a `js/szotar.js` és a `js/tartalom.js` alapján újraírja
mind a 33 HTML fájlt. Egyszer kell hozzá a Node.js, semmi más.

**Tipikus módosítások**

| Mit | Hol | Kell újragyártás? |
| --- | --- | --- |
| Ár, szezon, férőhely | `js/adatok.js` | igen |
| Idegenforgalmi adó, kaució, foglaló, lemondási határidő | `js/adatok.js`, a „PÉNZ ÉS SZABÁLYOK" szakasz | igen |
| Gyakori kérdés, házirend-pont, vélemény | `js/tartalom.js`, mindhárom nyelvnél | igen |
| Gomb- vagy mezőfelirat | `js/szotar.js`, mindhárom nyelvnél | igen |
| Új fotó | kép az `assets/images/` mappába, felvenni a `FOTOK` tömbbe (`adatok.js`) és a feliratát a `fotoFeliratok` szakaszba (`tartalom.js`) | igen |
| Szín, méret, térköz | `css/style.css`, az 1. (TOKENEK) szakasz | nem |
| Egy oldal elrendezése | `eszkozok/oldalak.mjs`, az adott oldal sablonja | igen |
| Viselkedés (naptár, szűrés, számolás) | a megfelelő `js/` fájl | nem |

Egy HTML fájlt közvetlenül is szerkeszthetsz — de akkor a gyártót ne
futtasd újra, mert felülírná. Ha tartósan akarsz változtatni egy oldal
elrendezésén, az `eszkozok/oldalak.mjs` a helye: ott egy függvény tartozik
minden oldalhoz, és a HTML ugyanúgy olvasható benne.

Mentés után elég frissíteni a böngészőt (Ctrl+F5).

## Szezonok és árak

| Szezon | Ár / éj | Szabály |
| --- | --- | --- |
| Előszezon (márc 1 — máj 31) | 55 000 Ft | min. 3 éj |
| Főszezon (máj 31 — szept 1) | 75 000 Ft | min. 3 éj |
| Utószezon (szept 1 — dec 1) | 55 000 Ft | min. 3 éj |
| Téli szezon (dec 1 — márc 1) | 75 000 Ft | min. 3 éj |

A **téli szezon a karácsonyt és az újévet is magában foglalja**, ugyanezen az áron —
ezért nincs külön „ünnepek" szezon. Mivel a tél átnyúlik a következő évbe, a szezonlista
az előző évtől indul (`js/adatok.js`): januárt és februárt az ELŐZŐ év tele fedi.

**Minden időszakban minimum 3 éjszaka, bármelyik naptól kezdve** — nyárra sincs külön
szabály. Kötött turnus (pontosan ennyi éj, csak ezen a napon kezdhető) egyetlen szezonban
sincs; a logika viszont ismeri a `kototEjszaka` és `valtonap` mezőket, tehát ha egyszer
mégis kellene, elég felvenni őket egy szezonhoz az `adatok.js`-ben.

A szabály a ház oldal árkártyáján és a foglalási oldalon is végig kiírva áll
(„min. 3 éj foglalható"), nem csak akkor, ha valaki beleütközik.

## Hogyan működik a foglalás

Három lépés: időpont és vendégek → adatok → áttekintés. Mindhárom szakasz
ott van a `foglalas.html`-ben; a `js/foglalas.js` csak azt dönti el,
melyik látszik.

Az ellenőrzés mindig ugyanabban a sorrendben fut (`logika.js`,
`ellenoriz`):

1. Múltbeli dátum?
2. Több a vendég, mint 7?
3. Megfelel a szezon szabályainak? (minimum 3 éjszaka, minden időszakban)
4. Szabad-e a ház akkor?

Ha bármelyiken elbukik, az üzenet mellé a rendszer kiajánlja a három
legközelebbi olyan időszakot, amely szabad **és** szabályos — egy
kattintással átvehető.

Az árazás minden éjszakát a **saját** szezonja szerint számol, ezért egy
szezonhatáron átnyúló tartózkodás vegyes áron jön ki. A létszám az árat
nem befolyásolja, csak az idegenforgalmi adót (700 Ft / fő / éj, 18 év
felett).

## Mi mozog görgetéskor

A `js/animaciok.js` intézi, a mértékét a `css/animations.css` tartja kordában.

- A fejléc a főoldal tetején légies, a hero fölött lebeg; lefelé görgetve
  hátteret kap és összehúzódik, felfelé visszanyílik. A tartalom közben
  nem ugrik meg: a rögzített fejléc alatt állandó magasságú helykitöltő áll.
- A szekciók akkor úsznak be, amikor a képernyőre érnek — egyszer, aztán
  állnak.
- A kártyák egymás után jelennek meg, 70 ezredmásodperces csúszással.
- A hero fotója alig észrevehetően mozdul (legfeljebb 28 képpont), és
  nem lóg ki a keretéből.
- Mobilon a hero után alulról beúszik a foglalási sáv.

Ha valamelyik mozgás sok: `css/animations.css`. A `--reveal-y` (mennyit
emelkedik) és a `--reveal-dur` (mennyi ideig tart) egy-egy sor a fájl
elején. A parallaxot a `js/animaciok.js`-ben a `Math.min(28, y * 0.10)`
két száma adja.

Aki az operációs rendszerében csökkentett mozgást kért, annál minden
azonnal látszik, mozgás nélkül.

## Hol vannak a foglalások

A böngésző saját tárolójában (localStorage), ezen a gépen, ebben a
böngészőben. Nincs mögötte szerver. Ez a demóhoz pont elég: a foglalás
frissítés után is megvan, és a naptárban azonnal foglalt lesz az időszak.

A lábléc alján a **„Demóadatok visszaállítása"** gomb mindent visszaállít
a kiinduló állapotba.

Ha egyszer éles lesz: a `logika.js`-ben a `foglalasokBetolt`,
`foglalasokMent` és a `foglalastKeres` az egyetlen három pont, ahol az
adat mozog. Ezeket kell szerverhívásra cserélni, és minden más mehet
változatlanul. A kapcsolati űrlapnál ugyanígy: a `js/kapcsolat.js`-ben
egyetlen `fetch` helye van előkészítve.

## Kipróbálható a demóban

- **Foglalás-lekérdezés:** azonosító `RV-DEMO-01`, e-mail `anna@example.hu`
- **Betelt időpont:** válassz mától 5–9 nap közötti időszakot → megjelennek az alternatívák
- **Szezonárak:** decemberi, januári vagy februári időpont → 75 000 Ft / éj (téli szezon),
  októberi vagy áprilisi → 55 000 Ft / éj; szezonhatáron átnyúló tartózkodásnál vegyes ár
- **Hatodik vendég:** állítsd a felnőttek számát 6-ra → magától bejelöli és zárolja a kanapét
- **Galéria:** szűrj egy kategóriára → a cím is követi, tehát a nézet megosztható

## Mi ez, és mi nem

Ez a változat olvasásra és szerkesztésre készült, és önmagában is teljes
weboldal. A `riverside-web` projekt ugyanezt tudja, plusz az admin
felületet, és valódi fejlesztői eszközökkel (TypeScript, ellenőrzött
típusok) — az megy majd élesbe.

**Amire még szükség lesz az éles indulás előtt:** valódi vendégvélemények
a demószövegek helyett, jobb felbontású fotó hat képnél, a házirend PDF-je,
és az adatkezelési tájékoztató jogi átnézése.
