import React from 'react';

const CSS = `
.rv-tabs{display:flex;gap:var(--space-6);border-bottom:1px solid var(--border-hairline)}
.rv-tab{appearance:none;background:none;border:0;border-bottom:2px solid transparent;margin-bottom:-1px;padding:0 0 var(--space-3);font-family:var(--font-ui);font-size:var(--text-small);font-weight:var(--weight-medium);color:var(--text-muted);cursor:pointer;display:flex;align-items:center;gap:var(--space-2);transition:color var(--dur-fast) var(--ease-out),border-color var(--dur-fast) var(--ease-out)}
.rv-tab:hover{color:var(--text-heading)}
.rv-tab[aria-selected=true]{color:var(--text-heading);border-bottom-color:var(--sage-800)}
.rv-tabs--pills{border-bottom:0;gap:var(--space-1)}
.rv-tabs--pills .rv-tab{padding:7px var(--space-4);border-radius:var(--radius-pill);border-bottom:0;margin:0}
.rv-tabs--pills .rv-tab[aria-selected=true]{background:var(--surface-muted);color:var(--text-heading)}
`;
let injected=false;
function useCSS(){React.useEffect(()=>{if(injected)return;injected=true;const s=document.createElement('style');s.textContent=CSS;document.head.appendChild(s);},[]);}

export function Tabs({ items = [], value, onChange, variant = 'underline', className = '', ...rest }) {
  useCSS();
  return <div role="tablist" className={['rv-tabs', variant === 'pills' ? 'rv-tabs--pills' : '', className].filter(Boolean).join(' ')} {...rest}>
    {items.map(it => {
      const id = typeof it === 'string' ? it : it.value;
      const label = typeof it === 'string' ? it : it.label;
      return <button key={id} role="tab" aria-selected={value === id} className="rv-tab" onClick={() => onChange && onChange(id)}>{label}</button>;
    })}
  </div>;
}
