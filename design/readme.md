# Riverside — Design System

Riverside egy családias, folyóparti vendégház a Körös-vidéken. Nem luxusszálloda,
hanem egy hiteles, otthonos menedék azoknak, akik pár napra ki akarnak szakadni a
mindennapokból — csendben, természetközelben, saját tempóban.

Ez a rendszer ebből a brand-leírásból készült. Minden alap (szín, tipográfia,
komponens, UI kit) ebből a szövegből és a megadott színirányból vezethető le.

**Célközönség:** családok és párok, akik nyugodt, aktív kikapcsolódást keresnek —
kajak, horgászat, kert, medence. Nem éjszakai élet, nem elit luxus.

**Termékfelület:** egyetlen felület van definiálva, a vendégház weboldala
(főoldal, szobák, szobalap, környék/kapcsolat, foglalás). Alkalmazás, admin
felület, nyomtatott anyag vagy prezentáció nem került leírásra, ezért nem is
készült — lásd CAVEATS.

---

## Sources

| Source | Status |
| --- | --- |
| Brand leírás (chat, magyar nyelvű szöveg: pozicionálás, célközönség, hangnem, vizuális irány) | ez az egyetlen forrás |
| Kódbázis / repo | nem volt megadva |
| Figma fájl vagy link | nem volt megadva |
| Logó, fotók, ikonkészlet, betűtípus-fájlok | nem volt megadva |
| Meglévő deck vagy sablon | nem volt megadva |

Mivel sem kód, sem Figma nem volt elérhető, a rendszer **nem rekonstrukció**,
hanem a leírásból felépített első verzió. Minden helyettesítés jelölve van
(betűtípus, ikonkészlet, fotók).

---

## Index

| Path | What it is |
| --- | --- |
| `styles.css` | A globális belépési pont — csak `@import` sorok. Ezt az egy fájlt kell linkelni. |
| `tokens/` | `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `radii.css`, `shadows.css`, `motion.css`, `base.css` |
| `components/core/` | Button, IconButton, Icon, Badge, Tag, Card |
| `components/forms/` | Field, Input, Textarea, Select, Checkbox, Radio + RadioGroup, Switch, DateRangeField |
| `components/navigation/` | Tabs |
| `components/feedback/` | Dialog, Toast, Tooltip |
| `components/media/` | Photo |
| `ui_kits/website/` | A weboldal 5 képernyője, kattintható (`index.html`) |
| `templates/website-page/` | „Riverside oldalsablon" — kezdő oldalsablon (fejléc, hero, kártyarács, lábléc) |
| `guidelines/*.card.html` | Foundation kártyák (Colors, Type, Spacing, Brand) |
| `thumbnail.html` | A rendszer ikonja |
| `SKILL.md` | Agent Skill belépő |

Minden komponens mellett ott van a `<Name>.d.ts` (props szerződés) és a
`<Name>.prompt.md` (mikor és hogyan használd).

### Intentional additions

A brand-leírás nem definiál komponenskészletet, ezért egy szokásos alapkészlet
készült. Két elem indoklással került bele a szokásos listán túl:

- **`DateRangeField`** — a foglalás a brand központi művelete, az érkezés/távozás
  pár minden felületen szerepel, ezért primitív, nem kit-szintű markup.
- **`Photo`** — a brand fotóvezérelt, de nincs fotóanyag. Minden képhely explicit
  „valódi fotó helye" placeholdert rajzol, amíg valódi kép nem kerül a helyére.

---

## CONTENT FUNDAMENTALS

A hangnem a legfontosabb brand-eszköz: meleg, közvetlen, hiteles — mintha egy jó
ismerős ajánlaná a helyet. A szövegek magyarul íródnak.

**Megszólítás.** Tegeződés, egyes szám második személy: *„Írj, ha bármi kérdés
van."* A ház nevében többes szám első személy: *„Mi nyitunk kaput"*, *„24 órán
belül válaszolunk."* Sosem harmadik személy („a Vendégház biztosítja…"), sosem
„Ön".

**Mondathossz.** Rövid, egyszerű kijelentések, néha töredék. Egy bekezdés 2–3
mondat. Konkrétum mindig van benne: *„Négy bringa a fészerben, a gátoldalon 20 km
sík út."* — nem *„kiváló kerékpáros lehetőségek"*.

**Amit a brand kimond, és amit nem.** Kimondja, mi nincs: *„Nincs recepció, nincs
kártyás ajtó."*, *„Klíma nincs — a ház vastag falai miatt eddig nem kellett."* Ez
a hitelesség fő eszköze. Nem használ szuperlatívuszokat („exkluzív", „prémium",
„felejthetetlen élmény"), nem ígér hangulatot, hanem leír egy helyet.

**Casing.** Mondatkezdő nagybetű mindenhol — gombokon, badge-eken, címkéken is
(„Foglalás", „Szabad", „Betelt"). Az egyetlen csupa nagybetűs elem az eyebrow
(`.rv-eyebrow`, 0.14em betűköz), és ott is csak rövid helymegjelölés vagy
szekciónév áll: *VENDÉGHÁZ A KÖRÖS PARTJÁN*.

**Számok, árak, dátumok.** Ezres tagolás szóközzel, a „Ft" a szám után kisbetűvel:
*46 000 Ft / éj*. Dátum magyar sorrendben, gondolatjeles intervallummal:
*2026. július 10–13.* Az ár mellett mindig ott van, mit tartalmaz: *„/ éj,
reggelivel"*.

**Űrlapok.** A nem kötelező mezőket jelöljük („— nem kötelező"), a kötelezőket
nem csillagozzuk. A hint segít, nem szabályoz: *„Csak ha vissza kell hívnunk."*
Hibaszöveg mondat, nem kód: *„Adj meg egy érvényes e-mail címet."*

**Emoji.** Nincs. Semmilyen felületen. Az ikonok viszik a vizuális jelzést.

**Példák a hangnemre:**

- Cím: „Pár nap a folyó mellett." / „Egy ház, ami nem akar több lenni, mint ami."
- Lead: „Négy szoba, nagy kert, medence és két kajak a parton. Nem szálloda — inkább egy ház, ahol pár napra tiétek a tempó."
- Mikrocopy: „Ez még csak kérés — amíg nem írunk vissza, nem vonunk le semmit."
- Házirend: „22:00 után csendet kérünk a kertben is — a szomszédok korán kelnek, és mi is."

---

## VISUAL FOUNDATIONS

**Paletta.** Négy irány, ahogy a brand-leírás kéri: szürkészöld (`--sage-*`, a ház
színe), kékesszürke (`--slate-*`, a víz), sötét antracit (`--n-800/900`), meleg
fehér (`--n-50`, oldalháttér). Ezen túl **egy** meleg akcent: clay/terrakotta
(`--clay-500`) — kizárólag foglalási CTA-n. Ha valami clay színű, az foglalható.
Semmilyen szürke nem hideg: minden neutrális enyhén melegre hajlik. Egy nézetben
legfeljebb két háttérszín van (meleg fehér + egy `--surface-muted` vagy antracit
sáv).

**Tipográfia.** Két család. **EB Garamond** (display) a címekben, szobanevekben,
árakban és idézetekben — csak regular vágás, szűk betűköz (−0.015…−0.02em).
**Karla** (UI) minden futószövegben, gombon, űrlapban; medium (500) a legnehezebb
használt vágás, bold nincs. Mono (`IBM Plex Mono`) csak azonosítókhoz. Szövegmérték
62ch futószövegre, 36ch lead-re. A címsorok sosem csupa nagybetűsek.

**Layout.** 1200px tartalomszélesség, 32px oldalmargó, 24px gridhézag, 96px
szekcióritmus (mobilon 56px). A fejléc `sticky`, 72px magas, 90%-os meleg fehér
alapon `backdrop-filter: blur(10px)` — ez az egyetlen fixált elem. A szobalapon és
a foglalásban az összegző kártya `sticky top: 96px`. A hero fölé 36px-szel
belapol a foglalósáv — ez a rendszer egyetlen átfedő eleme.

**Hátterek és képek.** Fotóvezérelt brand: full-bleed 21:9 hero, 16:9 széles sáv,
4:3 kártyakép, 3:4 portré. Nincs gradiens-háttér, nincs mintázat, nincs textúra,
nincs kézzel rajzolt illusztráció. A gradiens egyetlen megengedett használata a
`--scrim-bottom` védőgradiens fotó fölötti szöveg alatt. A képek színvilága meleg
nappali fény, természetes zöldek és víz-szürkék, szemcse és filter nélkül; hideg,
kékes vagy fekete-fehér kezelés nincs. Amíg nincs valódi fotó, a `Photo`
komponens csíkos sage/slate placeholdert rajzol „valódi fotó helye" felirattal.

**Sarokrádiuszok.** Csendes geometria: 2px (badge), 4px (gombok, inputok), 8px
(kártyák, képek), 14px (dialógus — a legnagyobb rádiusz a rendszerben), pill csak
tageknél és avatárnál.

**Kártyák.** Fehér alap, 1px meleg hajszálvonal (`--border-hairline`), 8px
rádiusz, 24px padding, **nyugalmi állapotban árnyék nélkül**. Árnyék és keret
soha nem jelenik meg együtt: a `raised` és `interactive` változat elhagyja a
keretet. Nincs színes bal szegély, nincs színes fejléc-sáv.

**Árnyékok.** Meleg tónusú, alacsony alfa (`rgba(43,40,35,…)`), sosem kékesfekete.
`xs/sm` finom kiemelés, `md` hover, `lg` dialógus és toast. A keretek viszik a
hierarchiát, az emelés kivétel.

**Hover.** Gombnál sötétebb tónus (nem áttetszőség), ghost gombnál halk sage
háttér, kártyánál `--shadow-md` + 2px felfelé mozdulás, linknél sage → clay
színváltás és a szín alá húzódó aláhúzás. Ikonos gombok háttérszínt kapnak, nem
méretet.

**Press.** 1px lefelé nudge (`translateY(1px)`) és egy fokkal mélyebb szín.
Nincs skálázás, nincs rugó.

**Fókusz.** `2px solid var(--border-focus)` outline 2px offsettel; űrlapelemeken
ezen kívül `--ring-focus` (3px, 22% pine). A fókuszgyűrű mindig látszik, sosem
`outline: none`.

**Animáció.** 120ms hover/fókusz, 180ms állapotváltás, 280ms dialógus belépés (8px
elhalványuló emelkedés), 600ms galéria-áttűnés. Easing: `--ease-out`
`cubic-bezier(.22,.61,.36,1)`, overlay-nél `--ease-entrance`. Nincs bounce, nincs
spring, nincs parallax, nincs scroll-vezérelt mozgás, nincs autoplay karusszel.

**Átlátszóság és blur.** Két helyen: a sticky fejléc (90% + 10px blur) és a fotó
fölötti inverse kontrollok (8–18% fehér + 6px blur), valamint a dialógus fátyla
(56% antracit + 2px blur). Máshol nem — a szöveg soha nem áttetsző (helyette
`--text-muted`).

**Védőkezelés.** Fotó fölötti szöveg alatt mindig alulról induló gradiens
(`--scrim-bottom`), nem kapszula és nem tömör sáv. A kapszulát csak akkor
használjuk, ha egyetlen kontroll (IconButton) lóg a képen.

**Szegélyek.** Három szint: `--border-hairline` (kártyák, elválasztók),
`--border-default` (input alap), `--border-strong` (interaktív hover, checkbox).
Az elválasztó mindig 1px, sosem 2px vagy dupla.

---

## ICONOGRAPHY

**Készlet: Lucide, CDN-ről** — `https://unpkg.com/lucide@latest/dist/umd/lucide.js`.
A brand-leírás nem tartalmaz ikonkészletet, saját ikonfontot vagy SVG-készletet,
ezért helyettesítés történt: a Lucide vonalas, 24px-es rácson dolgozó, lekerekített
végű stílusa illik a visszafogott, természetes irányhoz. **Ez helyettesítés, nem
átvett készlet — jelöld, ha a valódi készlet más.**

- Vonalvastagság mindig **1.5px**, méret 16px (szövegben), 20px (alap), 24px
  (önállóan, szekciók fölött). Kitöltött (filled) ikon nincs.
- Szín: örökölt `currentColor`; szekciójelzőnél `--sage-600`, kontrollban
  `--text-muted`.
- Használat: az `Icon` komponensen keresztül (`<Icon name="waves" />`), nem közvetlen
  SVG-vel. Dekoratív ikon `aria-hidden`, jelentést hordozó ikon `label`-t kap.
- Tipikus névkészlet ebben a brandben: `waves, fish, tent-tree, trees, flame, bike,
  wifi, coffee, bed-double, bath, dog, car, map-pin, phone, calendar, sun, mail,
  instagram, facebook, arrow-right, chevron-down, check, x, info`.
- **Emoji nincs**, unicode karakter ikonként nincs, PNG ikon nincs. A szeparátorként
  használt „·" az egyetlen dekoratív karakter.
- **Logó nincs.** A brand-leírás nem tartalmaz logófájlt, és nem is rajzoltunk
  helyette: ahol márkajel kellene, a „Riverside" szó áll EB Garamondban, alatta
  egy 11px-es, ritkított „KÖRÖS-VIDÉK" sorral (`guidelines/brand-wordmark.card.html`).
  Ha van valódi logó, tedd `assets/logo.svg`-ként a helyére.

Az `assets/` mappa ezért üres: nem volt átvehető vizuális anyag (logó, fotó,
illusztráció, ikonkészlet).

---

## CAVEATS

1. **Betűtípus-helyettesítés.** Nincs megadott betűfájl. EB Garamond (display) +
   Karla (UI) Google Fontsról, `tokens/fonts.css`-ben `@import`-tal. Ha van
   licencelt brandbetű, cseréld ott ki.
2. **Ikon-helyettesítés.** Lucide CDN-ről, lásd fent.
3. **Nincs fotóanyag.** Minden képhely placeholder. A brand fotóvezérelt, így ez a
   legfontosabb hiányzó elem.
4. **Nincs logó.** Szöveges wordmark áll a helyén, szándékosan.
5. **Egy termékfelület.** Csak a weboldal készült el; app, admin, slide-sablon
   nem volt leírva, ezért nem is találtunk ki ilyet.
