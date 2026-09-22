import React from 'react';

const CSS = `
.rv-switch{display:flex;align-items:center;gap:var(--space-3);cursor:pointer;font-size:var(--text-small);color:var(--text-body)}
.rv-switch input{position:absolute;opacity:0;width:0;height:0}
.rv-switch__track{position:relative;flex:0 0 auto;width:38px;height:22px;border-radius:var(--radius-pill);background:var(--n-300);transition:background var(--dur-base) var(--ease-out)}
.rv-switch__track::after{content:"";position:absolute;top:3px;left:3px;width:16px;height:16px;border-radius:var(--radius-pill);background:#fff;box-shadow:var(--shadow-xs);transition:transform var(--dur-base) var(--ease-out)}
.rv-switch input:checked + .rv-switch__track{background:var(--sage-800)}
.rv-switch input:checked + .rv-switch__track::after{transform:translateX(16px)}
.rv-switch input:focus-visible + .rv-switch__track{box-shadow:var(--ring-focus)}
.rv-switch input:disabled + .rv-switch__track{background:var(--n-200)}
`;
let injected=false;
function useCSS(){React.useEffect(()=>{if(injected)return;injected=true;const s=document.createElement('style');s.textContent=CSS;document.head.appendChild(s);},[]);}

export function Switch({ label, className = '', ...rest }) {
  useCSS();
  return <label className={['rv-switch', className].filter(Boolean).join(' ')}>
    <input type="checkbox" role="switch" {...rest} />
    <span className="rv-switch__track" />
    {label && <span>{label}</span>}
  </label>;
}
