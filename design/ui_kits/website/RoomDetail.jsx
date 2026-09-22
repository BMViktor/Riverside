const { Button, Card, Tag, Icon, Photo, Badge, Tabs, DateRangeField, Select, Tooltip } = window.RVDS;

function RoomDetail({ go, onBook }) {
  const [tab, setTab] = React.useState('A szoba');
  return <div>
    <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '24px 32px 0' }}>
      <button onClick={() => go('rooms')} style={{ appearance: 'none', background: 'none', border: 0, padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--text-muted)', fontFamily: 'var(--font-ui)' }}>
        <Icon name="arrow-left" size={14} />Vissza a szobákhoz
      </button>
    </div>
    <div style={{ maxWidth: 'var(--container-max)', margin: '20px auto 0', padding: '0 32px', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12 }}>
      <Photo ratio="4 / 3" note="padlásszoba — fő fotó" />
      <div style={{ display: 'grid', gap: 12 }}>
        <Photo ratio="4 / 3" tone="slate" note="tetőablak" />
        <Photo ratio="4 / 3" note="fürdő" />
      </div>
    </div>
    <div style={{ maxWidth: 'var(--container-max)', margin: '48px auto 0', padding: '0 32px', display: 'grid', gridTemplateColumns: '1fr 380px', gap: 64, alignItems: 'start' }}>
      <div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <h1 className="rv-display" style={{ fontSize: 'var(--text-display-2)', lineHeight: 1.1 }}>Padlásszoba</h1>
          <Badge tone="warning" icon="clock">Előjegyzés</Badge>
        </div>
        <div style={{ fontSize: 15, color: 'var(--text-muted)', marginTop: 8 }}>4 fő · 30 m² · két külön tér · tetőablak</div>
        <div style={{ marginTop: 32 }}><Tabs items={['A szoba', 'Felszereltség', 'Ház szabályai']} value={tab} onChange={setTab} /></div>
        <div style={{ marginTop: 24, maxWidth: 'var(--measure-body)', display: 'flex', flexDirection: 'column', gap: 16, fontSize: 'var(--text-body)', lineHeight: 'var(--lh-body)' }}>
          {tab === 'A szoba' && <>
            <p>A tetőtér egészét elfoglalja: egy nagyobb és egy kisebb tér, közöttük alacsony átjáró. A gyerekek rendszerint a hátsó részt választják, mert onnan látszik a folyó.</p>
            <p>Nyáron a tetőablakok éjszakára nyitva hagyhatók, szúnyoghálóval. Van ventilátor, klíma nincs — a ház vastag falai miatt eddig nem kellett.</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <Tag icon="bed-double">2 franciaágy</Tag><Tag icon="bath">Saját fürdő, zuhany</Tag><Tag icon="wifi">Wi-Fi</Tag><Tag icon="coffee">Reggeli</Tag><Tag icon="baby">Gyerekágy kérésre</Tag>
            </div></>}
          {tab === 'Felszereltség' && <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {['Két franciaágy, jó matracok', 'Saját fürdő zuhanyzóval, hajszárító', 'Szekrény, fiókok, elég fogas', 'Asztal két székkel, olvasólámpák', 'Ventilátor, szúnyoghálós tetőablakok', 'Törölköző, ágynemű, alapvető tisztálkodószerek'].map(x => <li key={x}>{x}</li>)}
          </ul>}
          {tab === 'Ház szabályai' && <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <p>Érkezés 15:00-tól, távozás 10:00-ig. Ha csúszik a vonat vagy a forgalom, egy telefon elég.</p>
            <p>22:00 után csendet kérünk a kertben is — a szomszédok korán kelnek, és mi is.</p>
            <p>A kutya jöhet, a kertes részen. Dohányozni a ház előtt lehet.</p>
          </div>}
        </div>
      </div>
      <Card style={{ position: 'sticky', top: 96 }} padding="lg">
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 34, color: 'var(--text-heading)' }}>46 000 Ft</span>
          <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>/ éj, reggelivel</span>
        </div>
        <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <DateRangeField fromProps={{ defaultValue: '2026-07-10' }} toProps={{ defaultValue: '2026-07-13' }} />
          <Select options={['2 fő', '3 fő', '4 fő']} defaultValue="4 fő" />
          <Button variant="accent" size="lg" block onClick={onBook}>Foglalás indítása</Button>
        </div>
        <div style={{ marginTop: 20, paddingTop: 18, borderTop: '1px solid var(--border-hairline)', display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14, color: 'var(--text-body)' }}>
          {[['3 éj × 46 000 Ft', '138 000 Ft'], ['Idegenforgalmi adó', '2 400 Ft'], ['Takarítás', 'nincs']].map(([a, b]) =>
            <div key={a} style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-muted)' }}>{a}</span><span>{b}</span></div>)}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 500, color: 'var(--text-heading)', paddingTop: 10, borderTop: '1px solid var(--border-hairline)' }}>
            <span>Összesen</span><span>140 400 Ft</span></div>
        </div>
        <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-muted)' }}>
          <Tooltip label="A foglalás csak a válaszunk után él"><span style={{ display: 'inline-flex' }}><Icon name="info" size={14} /></span></Tooltip>
          Kérés elküldése után 24 órán belül visszaírunk.
        </div>
      </Card>
    </div>
  </div>;
}
Object.assign(window, { RoomDetail });
