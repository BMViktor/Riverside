const { Button, Card, Tag, Icon, Photo, Badge, Tabs, Checkbox } = window.RVDS;

const ALL_ROOMS = [
  { name: 'Folyóparti szoba', size: '2 fő · 18 m²', price: '32 000 Ft', beds: 'Franciaágy', view: 'Folyóra néző', state: 'free', note: 'Két nagy ablak a víz felé, reggel itt kel fel a nap.' },
  { name: 'Kerti szoba', size: '3 fő · 22 m²', price: '38 000 Ft', beds: 'Franciaágy + pótágy', view: 'Kertre néző', state: 'free', note: 'Közvetlen kijárás a kertbe, saját terasz két székkel.' },
  { name: 'Padlásszoba', size: '4 fő · 30 m²', price: '46 000 Ft', beds: '2 franciaágy', view: 'Tetőablak', state: 'hold', note: 'Két külön tér, gyerekekkel ez a legjobb választás.' },
  { name: 'Kis szoba', size: '2 fő · 14 m²', price: '28 000 Ft', beds: '2 külön ágy', view: 'Udvarra néző', state: 'full', note: 'A ház legcsendesebb sarka, hosszabb tartózkodásra.' }
];
const STATE = { free: ['success', 'Szabad'], hold: ['warning', 'Előjegyzés'], full: ['danger', 'Betelt'] };

function Rooms({ go, onBook }) {
  const [filter, setFilter] = React.useState('Mind');
  const [onlyFree, setOnlyFree] = React.useState(false);
  const list = ALL_ROOMS.filter(r => (!onlyFree || r.state === 'free') && (filter === 'Mind' || (filter === '2 fő' ? r.size.startsWith('2') : filter === 'Család' ? !r.size.startsWith('2') : true)));
  return <div>
    <Section eyebrow="Szobák és árak" title="Négy szoba, reggelivel." lead="Az árak két főre, reggelivel értendők. Pótágy 6 000 Ft / éj. Minimum két éjszaka, hosszú hétvégén három.">
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap', marginBottom: 28 }}>
        <Tabs variant="pills" items={['Mind', '2 fő', 'Család']} value={filter} onChange={setFilter} />
        <Checkbox label="Csak a szabad szobák" checked={onlyFree} onChange={e => setOnlyFree(e.target.checked)} />
        <span style={{ marginLeft: 'auto', fontSize: 14, color: 'var(--text-muted)' }}>{list.length} szoba</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {list.map(r => <Card key={r.name} padding="none">
          <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr 230px', minHeight: 200 }}>
            <Photo ratio="auto" square note={r.name} style={{ height: '100%' }} />
            <div style={{ padding: 'var(--pad-card-lg)' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <h3 className="rv-display" style={{ fontSize: 26 }}>{r.name}</h3>
                <Badge tone={STATE[r.state][0]}>{STATE[r.state][1]}</Badge>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 6 }}>{r.size}</div>
              <p style={{ fontSize: 15, marginTop: 12, maxWidth: '48ch' }}>{r.note}</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 16 }}>
                <Tag icon="bed-double">{r.beds}</Tag><Tag icon="eye">{r.view}</Tag><Tag icon="bath">Saját fürdő</Tag>
              </div>
            </div>
            <div style={{ borderLeft: '1px solid var(--border-hairline)', padding: 'var(--pad-card-lg)', display: 'flex', flexDirection: 'column', gap: 12, justifyContent: 'center', background: 'var(--n-50)' }}>
              <div>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 30, color: 'var(--text-heading)' }}>{r.price}</span>
                <span style={{ fontSize: 14, color: 'var(--text-muted)' }}> / éj</span>
              </div>
              <Button variant="accent" block disabled={r.state === 'full'} onClick={onBook}>{r.state === 'full' ? 'Betelt' : 'Foglalás'}</Button>
              <Button variant="secondary" block onClick={() => go('room')}>Részletek</Button>
            </div>
          </div>
        </Card>)}
      </div>
    </Section>
    <Section eyebrow="Jó tudni" title="Amit a foglalás előtt érdemes átfutni.">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 'var(--gutter)' }}>
        {[['clock', 'Érkezés', '15:00-tól, távozás 10:00-ig. Ha csúszik, szólj.'],
          ['credit-card', 'Fizetés', 'Előre utalás vagy fizetés érkezéskor, kártyával is.'],
          ['dog', 'Kutya', 'Jöhet, a kertes részen. Szobában nem alszik.'],
          ['ban', 'Csendes ház', 'Nincs buli, nincs hangos zene 22:00 után.']].map(([i, t, d]) =>
          <Card key={t} variant="muted"><Icon name={i} size={20} color="var(--sage-600)" /><h3 style={{ fontSize: 'var(--text-h3)', marginTop: 12 }}>{t}</h3><p style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 6 }}>{d}</p></Card>)}
      </div>
    </Section>
  </div>;
}
Object.assign(window, { Rooms, ALL_ROOMS });
