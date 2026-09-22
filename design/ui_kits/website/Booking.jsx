const { Button, Card, Tag, Icon, Photo, Badge, Field, Input, Textarea, Select, Checkbox, Radio, RadioGroup, Switch, DateRangeField, Dialog, Toast } = window.RVDS;

function Steps({ step }) {
  const labels = ['Időpont', 'Adatok', 'Áttekintés'];
  return <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
    {labels.map((l, i) => <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{ width: 24, height: 24, borderRadius: 'var(--radius-pill)', display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 600,
        background: i <= step ? 'var(--sage-800)' : 'var(--n-200)', color: i <= step ? 'var(--n-50)' : 'var(--text-muted)' }}>{i + 1}</span>
      <span style={{ fontSize: 14, color: i === step ? 'var(--text-heading)' : 'var(--text-muted)', fontWeight: i === step ? 500 : 400 }}>{l}</span>
      {i < 2 && <span style={{ width: 28, height: 1, background: 'var(--border-default)' }} />}
    </div>)}
  </div>;
}

function Summary({ room }) {
  return <Card padding="lg" style={{ position: 'sticky', top: 96 }}>
    <Photo ratio="16 / 9" note={room + ' — fotó'} />
    <h3 className="rv-display" style={{ fontSize: 24, marginTop: 16 }}>{room}</h3>
    <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>4 fő · 30 m² · reggelivel</div>
    <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
      {[['Július 10. — július 13.', '3 éj'], ['3 éj × 46 000 Ft', '138 000 Ft'], ['Idegenforgalmi adó', '2 400 Ft']].map(([a, b]) =>
        <div key={a} style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}><span style={{ color: 'var(--text-muted)' }}>{a}</span><span>{b}</span></div>)}
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid var(--border-hairline)', color: 'var(--text-heading)', fontWeight: 500 }}>
        <span>Összesen</span><span>140 400 Ft</span></div>
    </div>
    <div style={{ marginTop: 16, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.55 }}>Ez még csak kérés — amíg nem írunk vissza, nem vonunk le semmit.</div>
  </Card>;
}

function Booking({ go }) {
  const [step, setStep] = React.useState(0);
  const [sent, setSent] = React.useState(false);
  const [room, setRoom] = React.useState('Padlásszoba');
  const next = () => (step < 2 ? setStep(step + 1) : setSent(true));
  return <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '48px 32px 0' }}>
    <div className="rv-eyebrow">Foglalás</div>
    <h1 className="rv-display" style={{ fontSize: 'var(--text-display-2)', lineHeight: 1.1, marginTop: 12 }}>Nézzük meg, mikor jönnétek.</h1>
    <div style={{ marginTop: 28 }}><Steps step={step} /></div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 64, alignItems: 'start', marginTop: 40 }}>
      <Card padding="lg">
        {step === 0 && <div style={{ display: 'grid', gap: 22 }}>
          <Field label="Időpont" hint="Minimum két éjszaka, hosszú hétvégén három."><DateRangeField fromProps={{ defaultValue: '2026-07-10' }} toProps={{ defaultValue: '2026-07-13' }} /></Field>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Field label="Felnőtt"><Select options={['1 fő', '2 fő', '3 fő', '4 fő']} defaultValue="2 fő" /></Field>
            <Field label="Gyerek" optional><Select options={['0', '1', '2', '3']} defaultValue="2" /></Field>
          </div>
          <Field label="Szoba">
            <RadioGroup>
              {[['Folyóparti szoba', '2 fő · 32 000 Ft / éj'], ['Kerti szoba', '3 fő · 38 000 Ft / éj'], ['Padlásszoba', '4 fő · 46 000 Ft / éj']].map(([n, d]) =>
                <Radio key={n} name="szoba" label={n} description={d} checked={room === n} onChange={() => setRoom(n)} />)}
            </RadioGroup>
          </Field>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}><Tag icon="waves">Kajak ingyenes</Tag><Tag icon="coffee">Reggeli benne van</Tag><Tag icon="car">Parkolás az udvarban</Tag></div>
        </div>}
        {step === 1 && <div style={{ display: 'grid', gap: 22 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Field label="Név" htmlFor="b1"><Input id="b1" defaultValue="Kovács Anna" /></Field>
            <Field label="Telefonszám" htmlFor="b2" optional hint="Csak ha vissza kell hívnunk."><Input id="b2" placeholder="+36" /></Field>
          </div>
          <Field label="E-mail" htmlFor="b3"><Input id="b3" icon="mail" defaultValue="anna@example.hu" /></Field>
          <Field label="Megjegyzés" htmlFor="b4" optional hint="Allergia, korai érkezés, bármi."><Textarea id="b4" rows={3} placeholder="Két kisgyerekkel jövünk, egy gyerekágy jó lenne." /></Field>
          <Field label="Fizetés">
            <RadioGroup><Radio name="fiz" label="Előre utalás" description="Visszaigazolás után 3 napon belül." defaultChecked /><Radio name="fiz" label="Fizetés érkezéskor" description="Kártyával vagy készpénzzel." /></RadioGroup>
          </Field>
          <div style={{ display: 'grid', gap: 12 }}>
            <Checkbox label="Kutyát is hozunk" description="Kertes rész, pórázzal." />
            <Switch label="Szóljatok, ha akciós hétvége lesz" />
          </div>
        </div>}
        {step === 2 && <div style={{ display: 'grid', gap: 20 }}>
          <div style={{ display: 'grid', gap: 14 }}>
            {[['Időpont', '2026. július 10. — 13. (3 éj)'], ['Vendégek', '2 felnőtt, 2 gyerek'], ['Szoba', room], ['Név', 'Kovács Anna'], ['E-mail', 'anna@example.hu'], ['Fizetés', 'Előre utalás']].map(([a, b]) =>
              <div key={a} style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 16, paddingBottom: 12, borderBottom: '1px solid var(--border-hairline)', fontSize: 15 }}>
                <span style={{ color: 'var(--text-muted)' }}>{a}</span><span style={{ color: 'var(--text-heading)' }}>{b}</span></div>)}
          </div>
          <Toast tone="info" tint="light" title="Mi történik ezután?">Átnézzük a naptárt, és 24 órán belül válaszolunk e-mailben. A foglalás a válaszunkkal lesz élő.</Toast>
          <Checkbox label="Elfogadom a házirendet és az adatkezelési tájékoztatót" defaultChecked />
        </div>}
        <div style={{ display: 'flex', gap: 12, marginTop: 28, paddingTop: 20, borderTop: '1px solid var(--border-hairline)' }}>
          {step > 0 && <Button variant="secondary" iconLeft="arrow-left" onClick={() => setStep(step - 1)}>Vissza</Button>}
          <Button variant="accent" size="lg" iconRight={step < 2 ? 'arrow-right' : 'check'} onClick={next} style={{ marginLeft: 'auto' }}>
            {step < 2 ? 'Tovább' : 'Kérés elküldése'}
          </Button>
        </div>
      </Card>
      <Summary room={room} />
    </div>
    {sent && <Dialog title="Megkaptuk a kérésedet" onClose={() => { setSent(false); go('home'); }}
      footer={<><Button variant="secondary" onClick={() => { setSent(false); go('home'); }}>Vissza a főoldalra</Button><Button variant="primary" onClick={() => { setSent(false); go('area'); }}>Mit lehet itt csinálni</Button></>}>
      <div style={{ display: 'grid', gap: 14 }}>
        <p>Július 10–13., {room}, 2 felnőtt és 2 gyerek. Küldtünk egy visszajelzést az anna@example.hu címre.</p>
        <p style={{ color: 'var(--text-muted)' }}>24 órán belül írunk, hogy szabad-e a szoba. Ha közben változik valami, elég egy telefon.</p>
        <div style={{ display: 'flex', gap: 8 }}><Badge tone="success" icon="check">Kérés rögzítve</Badge><Badge tone="neutral">Azonosító: RV-2026-0714</Badge></div>
      </div>
    </Dialog>}
  </div>;
}
Object.assign(window, { Booking });
