import React from 'react';
import { Icon } from '../core/Icon.jsx';

const CSS = `
.rv-check{display:flex;gap:var(--space-3);align-items:flex-start;cursor:pointer;font-size:var(--text-small);color:var(--text-body);line-height:1.45}
.rv-check__box{position:relative;flex:0 0 auto;width:18px;height:18px;border:1px solid var(--border-strong);border-radius:var(--radius-xs);background:var(--surface-card);display:flex;align-items:center;justify-content:center;color:transparent;margin-top:1px;transition:background var(--dur-fast) var(--ease-out),border-color var(--dur-fast) var(--ease-out),color var(--dur-fast) var(--ease-out)}
.rv-check input{position:absolute;opacity:0;width:0;height:0}
.rv-check:hover .rv-check__box{border-color:var(--sage-600)}
.rv-check input:checked + .rv-check__box{background:var(--sage-800);border-color:var(--sage-800);color:#fff}
.rv-check input:focus-visible + .rv-check__box{box-shadow:var(--ring-focus)}
.rv-check input:disabled + .rv-check__box{background:var(--surface-sunken);border-color:var(--border-hairline)}
.rv-check__label{display:flex;flex-direction:column;gap:2px}
.rv-check__desc{color:var(--text-muted);font-size:var(--text-caption)}
`;
let injected=false;
function useCSS(){React.useEffect(()=>{if(injected)return;injected=true;const s=document.createElement('style');s.textContent=CSS;document.head.appendChild(s);},[]);}

export function Checkbox({ label, description, className = '', ...rest }) {
  useCSS();
  return <label className={['rv-check', className].filter(Boolean).join(' ')}>
    <input type="checkbox" {...rest} />
    <span className="rv-check__box"><Icon name="check" size={13} strokeWidth={2} /></span>
    <span className="rv-check__label">{label}{description && <span className="rv-check__desc">{description}</span>}</span>
  </label>;
}
