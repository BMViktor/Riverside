import React from 'react';
import { Icon } from '../core/Icon.jsx';

const CSS = `
.rv-daterange{display:grid;grid-template-columns:1fr 1px 1fr;align-items:stretch;background:var(--surface-card);border:1px solid var(--border-default);border-radius:var(--radius-control);overflow:hidden}
.rv-daterange:focus-within{border-color:var(--border-focus);box-shadow:var(--ring-focus)}
.rv-daterange__sep{background:var(--border-hairline)}
.rv-daterange__cell{display:flex;flex-direction:column;gap:2px;padding:var(--space-2) var(--space-4)}
.rv-daterange__cap{display:flex;align-items:center;gap:6px;font-size:var(--text-eyebrow);letter-spacing:var(--ls-eyebrow);text-transform:uppercase;font-weight:var(--weight-semibold);color:var(--text-muted)}
.rv-daterange__el{border:0;outline:0;background:transparent;font-family:var(--font-ui);font-size:var(--text-body);color:var(--text-heading);padding:0;width:100%}
`;
let injected=false;
function useCSS(){React.useEffect(()=>{if(injected)return;injected=true;const s=document.createElement('style');s.textContent=CSS;document.head.appendChild(s);},[]);}

export function DateRangeField({ fromLabel = 'Érkezés', toLabel = 'Távozás', fromProps = {}, toProps = {}, className = '', ...rest }) {
  useCSS();
  return <div className={['rv-daterange', className].filter(Boolean).join(' ')} {...rest}>
    <div className="rv-daterange__cell">
      <span className="rv-daterange__cap"><Icon name="calendar" size={12} />{fromLabel}</span>
      <input type="date" className="rv-daterange__el" {...fromProps} />
    </div>
    <div className="rv-daterange__sep" />
    <div className="rv-daterange__cell">
      <span className="rv-daterange__cap"><Icon name="calendar" size={12} />{toLabel}</span>
      <input type="date" className="rv-daterange__el" {...toProps} />
    </div>
  </div>;
}
