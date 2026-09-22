import React from 'react';
import { Icon } from '../core/Icon.jsx';

const CSS = `
.rv-input{display:flex;align-items:center;gap:var(--space-2);background:var(--surface-card);border:1px solid var(--border-default);border-radius:var(--radius-control);padding:0 var(--space-3);height:var(--control-h-md);transition:border-color var(--dur-fast) var(--ease-out),box-shadow var(--dur-fast) var(--ease-out)}
.rv-input--sm{height:var(--control-h-sm)}
.rv-input--lg{height:var(--control-h-lg);padding:0 var(--space-4)}
.rv-input:focus-within{border-color:var(--border-focus);box-shadow:var(--ring-focus)}
.rv-input--invalid{border-color:var(--status-danger-fg)}
.rv-input--disabled{background:var(--surface-sunken);border-color:var(--border-hairline)}
.rv-input__el{flex:1;min-width:0;border:0;background:transparent;outline:0;font-family:var(--font-ui);font-size:var(--text-body);color:var(--text-heading)}
.rv-input__el::placeholder{color:var(--text-subtle)}
.rv-input__icon{color:var(--text-muted);display:flex}
.rv-input__suffix{font-size:var(--text-small);color:var(--text-muted);white-space:nowrap}
`;
let injected=false;
function useCSS(){React.useEffect(()=>{if(injected)return;injected=true;const s=document.createElement('style');s.textContent=CSS;document.head.appendChild(s);},[]);}

export function Input({ size = 'md', icon, suffix, invalid, disabled, className = '', ...rest }) {
  useCSS();
  const cls = ['rv-input', 'rv-input--' + size, invalid ? 'rv-input--invalid' : '', disabled ? 'rv-input--disabled' : '', className].filter(Boolean).join(' ');
  return <div className={cls}>
    {icon && <span className="rv-input__icon"><Icon name={icon} size={16} /></span>}
    <input className="rv-input__el" disabled={disabled} aria-invalid={invalid || undefined} {...rest} />
    {suffix && <span className="rv-input__suffix">{suffix}</span>}
  </div>;
}
