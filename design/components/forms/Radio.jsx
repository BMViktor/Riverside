import React from 'react';

const CSS = `
.rv-radio{display:flex;gap:var(--space-3);align-items:flex-start;cursor:pointer;font-size:var(--text-small);color:var(--text-body);line-height:1.45}
.rv-radio__dot{position:relative;flex:0 0 auto;width:18px;height:18px;border:1px solid var(--border-strong);border-radius:var(--radius-pill);background:var(--surface-card);margin-top:1px;transition:border-color var(--dur-fast) var(--ease-out),box-shadow var(--dur-fast) var(--ease-out)}
.rv-radio input{position:absolute;opacity:0;width:0;height:0}
.rv-radio:hover .rv-radio__dot{border-color:var(--sage-600)}
.rv-radio input:checked + .rv-radio__dot{border-color:var(--sage-800);box-shadow:inset 0 0 0 4px var(--sage-800)}
.rv-radio input:focus-visible + .rv-radio__dot{box-shadow:var(--ring-focus)}
.rv-radio__label{display:flex;flex-direction:column;gap:2px}
.rv-radio__desc{color:var(--text-muted);font-size:var(--text-caption)}
.rv-radiogroup{display:flex;flex-direction:column;gap:var(--space-3)}
.rv-radiogroup--row{flex-direction:row;gap:var(--space-6)}
`;
let injected=false;
function useCSS(){React.useEffect(()=>{if(injected)return;injected=true;const s=document.createElement('style');s.textContent=CSS;document.head.appendChild(s);},[]);}

export function Radio({ label, description, className = '', ...rest }) {
  useCSS();
  return <label className={['rv-radio', className].filter(Boolean).join(' ')}>
    <input type="radio" {...rest} />
    <span className="rv-radio__dot" />
    <span className="rv-radio__label">{label}{description && <span className="rv-radio__desc">{description}</span>}</span>
  </label>;
}

export function RadioGroup({ row, children, className = '', ...rest }) {
  useCSS();
  return <div role="radiogroup" className={['rv-radiogroup', row ? 'rv-radiogroup--row' : '', className].filter(Boolean).join(' ')} {...rest}>{children}</div>;
}
