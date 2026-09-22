const { Button, Card, Tag, Icon, Photo, DateRangeField, Select, Badge } = window.RVDS;

function BookingBar({ onBook }) {
  return <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-hairline)', borderRadius: 'var(--radius-md)',
    boxShadow: 'var(--shadow-md)', padding: 16, display: 'grid', gridTemplateColumns: '1.4fr .7fr auto', gap: 12, alignItems: 'end' }}>
    <DateRangeField fromProps={{ defaultValue: '2026-07-10' }} toProps={{ defaultValue: '2026-07-13' }} />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span className="rv-eyebrow">Vendégek</span>
      <Select options={['2 fő', '3 fő', '4 fő', '5 fő', '6 fő']} defaultValue="4 fő" />
    </div>
    <Button variant="accent" size="lg" iconRight="arrow-right" onClick={onBook}>Szabad helyek</Button>
  </div>;
}

function Hero({ onBook, go }) {
  return <div style={{ position: 'relative' }}>
    <Photo ratio="21 / 9" square scrim note="hero fotó — a ház a folyó felől, kora reggel" style={{ minHeight: 520 }} />
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', width: '100%', padding: '0 32px 64px' }}>
        <div style={{ maxWidth: '20ch' }}>
          <div className="rv-eyebrow" style={{ color: 'rgba(251,249,245,.78)' }}>Vendégház a Körös partján</div>
          <h1 className="rv-display" style={{ color: 'var(--text-inverse)', fontSize: 'var(--text-display-1)', lineHeight: 'var(--lh-display-1)', letterSpacing: 'var(--ls-display-1)', marginTop: 14 }}>Pár nap a folyó mellett.</h1>
        </div>
        <p style={{ color: 'rgba(251,249,245,.86)', fontSize: 'var(--text-lead)', lineHeight: 1.55, maxWidth: '44ch', marginTop: 18 }}>
          Négy szoba, nagy kert, medence és két kajak a parton. Nem szálloda — inkább egy ház, ahol pár napra tiétek a tempó.
        </p>
        <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
          <Button variant="accent" size="lg" onClick={onBook}>Foglalás</Button>
          <Button variant="inverse" size="lg" onClick={() => go('rooms')}>Szobák megtekintése</Button>
        </div>
      </div>
    </div>
    <div style={{ maxWidth: 'var(--container-max)', margin: '-36px auto 0', padding: '0 32px', position: 'relative', zIndex: 2 }}>
      <BookingBar onBook={onBook} />
    </div>
  </div>;
}

function Intro() {
  return <Section eyebrow="Mi ez a hely" title="Egy ház, ami nem akar több lenni, mint ami.">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18, fontSize: 'var(--text-body)', lineHeight: 'var(--lh-body)', maxWidth: 'var(--measure-body)' }}>
        <p>A ház a nagyszüleimé volt, a kert végében ér véget a világ és kezdődik a Körös. Kifestettük, kicseréltük az ágyakat, de a lényeget meghagytuk: csend, árnyék, víz.</p>
        <p>Reggeli a kerti asztalnál, délután kajak vagy horgászás, este grill. Nincs recepció, nincs kártyás ajtó — mi nyitunk kaput, és ott vagyunk, ha kell valami.</p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 6 }}>
          <Tag icon="waves">Kajak</Tag><Tag icon="fish">Horgászat</Tag><Tag icon="waves">Medence</Tag><Tag icon="trees">Kert</Tag><Tag icon="flame">Grill</Tag><Tag icon="wifi">Wi-Fi</Tag><Tag icon="dog">Kutyabarát</Tag>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Photo ratio="3 / 4" note="kert, hosszú asztal" />
        <Photo ratio="3 / 4" tone="slate" note="csónak a parton" style={{ marginTop: 32 }} />
      </div>
    </div>
  </Section>;
}

const ROOMS = [
  { name: 'Folyóparti szoba', size: '2 fő · 18 m²', price: '32 000 Ft', tags: ['Franciaágy', 'Folyóra néző'], note: 'Két nagy ablak a víz felé.' },
  { name: 'Kerti szoba', size: '3 fő · 22 m²', price: '38 000 Ft', tags: ['Pótágy', 'Kertre néző'], note: 'Közvetlen kijárás a kertbe.' },
  { name: 'Padlásszoba', size: '4 fő · 30 m²', price: '46 000 Ft', tags: ['Családi', 'Tetőablak'], note: 'Két külön tér, gyerekeknek jó.' }
];

function RoomTeasers({ go }) {
  return <Section eyebrow="Szobák" title="Négy szoba, mind más." lead="Mindegyikben saját fürdő, jó matrac és elég hely a pakoláshoz. Az árak reggelivel értendők.">
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 'var(--gutter)' }}>
      {ROOMS.map(r => <Card key={r.name} interactive padding="md" onClick={() => go('room')}
        media={<Photo ratio="4 / 3" square note={r.name + ' — fotó'} />}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'baseline' }}>
          <h3 className="rv-display" style={{ fontSize: 24 }}>{r.name}</h3>
          <Badge tone="success">Szabad</Badge>
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>{r.size}</div>
        <p style={{ fontSize: 14, color: 'var(--text-body)', marginTop: 10 }}>{r.note}</p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 16, paddingTop: 14, borderTop: '1px solid var(--border-hairline)' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--text-heading)' }}>{r.price}</span>
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>/ éj</span>
          <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: 'var(--text-link)' }}>Részletek<Icon name="arrow-right" size={14} /></span>
        </div>
      </Card>)}
    </div>
  </Section>;
}

function Quote() {
  return <Section narrow style={{ textAlign: 'center' }}>
    <blockquote style={{ margin: 0 }}>
      <p className="rv-display" style={{ fontSize: 'var(--text-display-3)', lineHeight: 1.35, color: 'var(--text-heading)' }}>
        „Azt hittük, két napot bírunk ki net nélkül. Négy lett belőle, és a gyerekek a folyót nem akarták otthagyni.”
      </p>
      <footer style={{ marginTop: 18, fontSize: 14, color: 'var(--text-muted)' }}>Eszter és Máté — 2025 augusztus</footer>
    </blockquote>
  </Section>;
}

function AreaStrip({ go }) {
  const items = [
    { icon: 'waves', t: 'Kajak a házból', d: 'Két kajak, mellények, a parton. Felfelé 6 km-re van egy csendes kanyar.' },
    { icon: 'fish', t: 'Horgászat', d: 'Területi engedélyt a faluban lehet venni, szólj és elmegyünk érte.' },
    { icon: 'bike', t: 'Bicikli', d: 'Négy bringa a fészerben, a gátoldalon 20 km sík út.' }
  ];
  return <Section eyebrow="Környék" title="Amit a ház körül lehet kezdeni.">
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 'var(--gutter)' }}>
      {items.map(i => <div key={i.t} style={{ borderTop: '1px solid var(--border-default)', paddingTop: 20 }}>
        <Icon name={i.icon} size={24} color="var(--sage-600)" />
        <h3 style={{ fontSize: 'var(--text-h3)', marginTop: 14 }}>{i.t}</h3>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 8, lineHeight: 1.6 }}>{i.d}</p>
      </div>)}
    </div>
    <div style={{ marginTop: 32 }}><Button variant="secondary" iconRight="arrow-right" onClick={() => go('area')}>Mit lehet itt csinálni</Button></div>
  </Section>;
}

function CtaBand({ onBook }) {
  return <Section style={{ marginTop: 'var(--section-y)' }}>
    <div style={{ background: 'var(--surface-muted)', borderRadius: 'var(--radius-lg)', padding: '56px 48px', display: 'flex', gap: 32, alignItems: 'center', justifyContent: 'space-between' }}>
      <div>
        <h2 className="rv-display" style={{ fontSize: 'var(--text-display-3)' }}>Nézd meg, mikor van hely.</h2>
        <p style={{ marginTop: 10, color: 'var(--text-muted)', maxWidth: '46ch' }}>Írj vagy telefonálj — a naptárt mi vezetjük, és 24 órán belül válaszolunk.</p>
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <Button variant="primary" size="lg" onClick={onBook}>Foglalás indítása</Button>
        <Button variant="ghost" size="lg" iconLeft="phone">+36 30 123 4567</Button>
      </div>
    </div>
  </Section>;
}

function Home({ go, onBook }) {
  return <div>
    <Hero onBook={onBook} go={go} />
    <Intro />
    <RoomTeasers go={go} />
    <Quote />
    <AreaStrip go={go} />
    <CtaBand onBook={onBook} />
  </div>;
}

Object.assign(window, { Home, BookingBar, ROOMS });
