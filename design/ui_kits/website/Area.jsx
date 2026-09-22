const { Button, Card, Tag, Icon, Photo, Input, Textarea, Field, Checkbox } = window.RVDS;

function Area({ onBook }) {
  const things = [
    ['waves', 'Kajak', 'Két kajak a parton, mellényekkel. Felfelé 6 km-re egy holtág, ott szinte soha senki.'],
    ['fish', 'Horgászat', 'Csónakkikötő a kert végében. Területi engedélyt a faluban lehet venni.'],
    ['bike', 'Bringa a gáton', 'Négy bicikli a fészerben, 20 km sík út a gátoldalon Gyomaendrődig.'],
    ['trees', 'Arborétum', '12 km, autóval negyed óra. Kora nyáron érdemes, amikor még nincs tömeg.'],
    ['sun', 'Termálfürdő', 'Szarvason, 15 perc. Esős napra a legjobb terv.'],
    ['utensils', 'Ahol enni lehet', 'Három hely, amit magunk is használunk — a listát a szobában találod.']
  ];
  return <div>
    <Photo ratio="21 / 9" square scrim note="a gátoldal naplementében" caption="A gátoldal a ház mögött — innen indul a bringaút." style={{ maxHeight: 420 }} />
    <Section eyebrow="Környék" title="A folyó, a gát, és ami még belefér." lead="Semmi sincs messze, és semmit nem kell előre megszervezni. Ha kérdés van, kérdezz — helyben lakunk.">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 'var(--gutter)' }}>
        {things.map(([i, t, d]) => <Card key={t}>
          <Icon name={i} size={22} color="var(--sage-600)" />
          <h3 style={{ fontSize: 'var(--text-h3)', marginTop: 14 }}>{t}</h3>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 8, lineHeight: 1.6 }}>{d}</p>
        </Card>)}
      </div>
    </Section>
    <Section eyebrow="Kapcsolat" title="Írj, ha bármi kérdés van.">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
        <Card padding="lg">
          <div style={{ display: 'grid', gap: 16 }}>
            <Field label="Név" htmlFor="c1"><Input id="c1" placeholder="Kovács Anna" /></Field>
            <Field label="E-mail" htmlFor="c2"><Input id="c2" placeholder="anna@example.hu" /></Field>
            <Field label="Miben segíthetünk?" htmlFor="c3"><Textarea id="c3" rows={4} placeholder="Négyen jönnénk júliusban, két kisgyerekkel…" /></Field>
            <Checkbox label="Elolvastam az adatkezelési tájékoztatót" />
            <Button variant="primary" size="lg">Üzenet elküldése</Button>
          </div>
        </Card>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <Photo ratio="4 / 3" tone="slate" note="térkép helye — a ház a Körös-parton" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 15 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}><Icon name="map-pin" size={16} color="var(--sage-600)" />5540 Szarvas, Körös-part 4.</div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}><Icon name="phone" size={16} color="var(--sage-600)" />+36 30 123 4567</div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}><Icon name="mail" size={16} color="var(--sage-600)" />szia@riverside.hu</div>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.6 }}>Budapestről 2 óra autóval, vonattal Szarvasig, onnan elmegyünk érted az állomásra.</p>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}><Tag icon="car">Ingyenes parkolás</Tag><Tag icon="train-front">Állomás 4 km</Tag><Tag icon="dog">Kutyabarát</Tag></div>
          <Button variant="secondary" onClick={onBook} iconRight="arrow-right">Szabad helyek megnézése</Button>
        </div>
      </div>
    </Section>
  </div>;
}
Object.assign(window, { Area });
