const { Button, Icon, Photo } = window.RVDS;

function NavLink({ label, active, onClick }) {
  return <button onClick={onClick} style={{ appearance: 'none', background: 'none', border: 0, padding: '4px 0', cursor: 'pointer',
    fontFamily: 'var(--font-ui)', fontSize: 15, color: active ? 'var(--text-heading)' : 'var(--text-body)',
    borderBottom: active ? '1px solid var(--sage-800)' : '1px solid transparent' }}>{label}</button>;
}

function Header({ page, go, onBook }) {
  return <header style={{ position: 'sticky', top: 0, zIndex: 30, height: 'var(--header-h)', background: 'rgba(251,249,245,.9)',
    backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--border-hairline)' }}>
    <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', height: '100%', padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32 }}>
      <button onClick={() => go('home')} style={{ appearance: 'none', background: 'none', border: 0, cursor: 'pointer', padding: 0, textAlign: 'left' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 26, letterSpacing: '-0.01em', color: 'var(--text-heading)' }}>Riverside</span>
        <span style={{ display: 'block', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-subtle)', marginTop: -2 }}>Körös-vidék</span>
      </button>
      <nav style={{ display: 'flex', gap: 26, marginLeft: 12 }}>
        <NavLink label="Szobák" active={page === 'rooms' || page === 'room'} onClick={() => go('rooms')} />
        <NavLink label="Környék" active={page === 'area'} onClick={() => go('area')} />
        <NavLink label="Árak" onClick={() => go('rooms')} />
        <NavLink label="Kapcsolat" onClick={() => go('area')} />
      </nav>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 14, color: 'var(--text-muted)' }}><Icon name="phone" size={15} />+36 30 123 4567</span>
        <Button variant="accent" onClick={onBook}>Foglalás</Button>
      </div>
    </div>
  </header>;
}

function Footer({ go }) {
  const col = { display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14, color: 'rgba(251,249,245,.72)' };
  return <footer style={{ background: 'var(--surface-inverse)', color: 'var(--text-inverse)', marginTop: 'var(--section-y)' }}>
    <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '64px 32px 40px', display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', gap: 40 }}>
      <div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 30 }}>Riverside</div>
        <p style={{ ...col, marginTop: 12, maxWidth: '32ch', lineHeight: 1.6 }}>Családi vendégház a Körös partján. Négy szoba, egy nagy kert, csend és víz — pár napra kiszakadni a mindennapokból.</p>
      </div>
      <div style={col}><span className="rv-eyebrow" style={{ color: 'rgba(251,249,245,.5)' }}>Ház</span>
        <a href="#" onClick={e => { e.preventDefault(); go('rooms'); }} style={{ color: 'inherit' }}>Szobák és árak</a>
        <a href="#" onClick={e => { e.preventDefault(); go('area') }} style={{ color: 'inherit' }}>Környék</a>
        <a href="#" style={{ color: 'inherit' }}>Házirend</a></div>
      <div style={col}><span className="rv-eyebrow" style={{ color: 'rgba(251,249,245,.5)' }}>Kapcsolat</span>
        <span>+36 30 123 4567</span><span>szia@riverside.hu</span><span>5540 Szarvas, Körös-part 4.</span></div>
      <div style={col}><span className="rv-eyebrow" style={{ color: 'rgba(251,249,245,.5)' }}>Kövess minket</span>
        <span style={{ display: 'flex', gap: 12 }}><Icon name="instagram" size={18} /><Icon name="facebook" size={18} /><Icon name="mail" size={18} /></span></div>
    </div>
    <div style={{ borderTop: '1px solid var(--border-inverse)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '18px 32px', fontSize: 13, color: 'rgba(251,249,245,.5)', display: 'flex', justifyContent: 'space-between' }}>
        <span>© 2026 Riverside Vendégház</span><span>Adatkezelés · Süti beállítások</span>
      </div>
    </div>
  </footer>;
}

function Section({ eyebrow, title, lead, children, narrow, style }) {
  return <section style={{ maxWidth: narrow ? 'var(--container-narrow)' : 'var(--container-max)', margin: '0 auto', padding: '0 32px', marginTop: 'var(--section-y)', ...style }}>
    {(eyebrow || title) && <div style={{ maxWidth: '60ch', marginBottom: 32 }}>
      {eyebrow && <div className="rv-eyebrow" style={{ marginBottom: 12 }}>{eyebrow}</div>}
      {title && <h2 className="rv-display" style={{ fontSize: 'var(--text-display-2)', lineHeight: 'var(--lh-display-2)', letterSpacing: 'var(--ls-display-2)' }}>{title}</h2>}
      {lead && <p style={{ marginTop: 14, fontSize: 'var(--text-lead)', lineHeight: 'var(--lh-lead)', color: 'var(--text-muted)', maxWidth: 'var(--measure-body)' }}>{lead}</p>}
    </div>}
    {children}
  </section>;
}

Object.assign(window, { Header, Footer, Section, NavLink });
