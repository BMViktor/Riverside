import React from 'react';
import { Icon } from '../core/Icon.jsx';

const CSS = `
.rv-select{position:relative;display:flex;align-items:center;background:var(--surface-card);border:1px solid var(--border-default);border-radius:var(--radius-control);height:var(--control-h-md);padding:0 var(--space-3);transition:border-color var(--dur-fast) var(--ease-out),box-shadow var(--dur-fast) var(--ease-out)}
.rv-select--sm{height:var(--control-h-sm)}
.rv-select--lg{height:var(--control-h-lg);padding:0 var(--space-4)}
.rv-select:focus-within{border-color:var(--border-focus);box-shadow:var(--ring-focus)}
.rv-select__el{appearance:none;flex:1;min-width:0;border:0;background:transparent;outline:0;font-family:var(--font-ui);font-size:var(--text-body);color:var(--text-heading);padding-right:var(--space-5);cursor:pointer}
.rv-select__chev{position:absolute;right:var(--space-3);color:var(--text-muted);pointer-events:none;display:flex}
.rv-select--disabled{background:var(--surface-sunken)}
`;
let injected=false;
function useCSS(){React.useEffect(()=>{if(injected)return;injected=true;const s=document.createElement('style');s.textContent=CSS;document.head.appendChild(s);},[]);}

export function Select({ size = 'md', options = [], disabled, children, className = '', ...rest }) {
  useCSS();
  return <div className={['rv-select', 'rv-select--' + size, disabled ? 'rv-select--disabled' : '', className].filter(Boolean).join(' ')}>
    <select className="rv-select__el" disabled={disabled} {...rest}>
      {children || options.map(o => typeof o === 'string'
        ? <option key={o} value={o}>{o}</option>
        : <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
    <span className="rv-select__chev"><Icon name="chevron-down" size={16} /></span>
  </div>;
}
