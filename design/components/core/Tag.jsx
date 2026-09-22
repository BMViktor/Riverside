import React from 'react';
import { Icon } from './Icon.jsx';

const CSS = `
.rv-tag{display:inline-flex;align-items:center;gap:6px;font-size:var(--text-small);color:var(--text-body);background:transparent;border:1px solid var(--border-hairline);border-radius:var(--radius-pill);padding:5px var(--space-3);line-height:1.2;font-family:var(--font-ui);transition:border-color var(--dur-fast) var(--ease-out),background var(--dur-fast) var(--ease-out),color var(--dur-fast) var(--ease-out)}
.rv-tag--filled{background:var(--surface-muted);border-color:transparent}
button.rv-tag{cursor:pointer}
button.rv-tag:hover{border-color:var(--border-strong)}
.rv-tag[aria-pressed=true]{background:var(--sage-800);border-color:var(--sage-800);color:var(--n-50)}
.rv-tag__x{display:inline-flex;opacity:.6}
.rv-tag__x:hover{opacity:1}
`;
let injected=false;
function useCSS(){React.useEffect(()=>{if(injected)return;injected=true;const s=document.createElement('style');s.textContent=CSS;document.head.appendChild(s);},[]);}

export function Tag({ icon, variant = 'outline', selected, onSelect, onRemove, children, className = '', ...rest }) {
  useCSS();
  const cls = ['rv-tag', variant === 'filled' ? 'rv-tag--filled' : '', className].filter(Boolean).join(' ');
  const body = (<>{icon && <Icon name={icon} size={14} />}{children}
    {onRemove && <span className="rv-tag__x" onClick={(e) => { e.stopPropagation(); onRemove(e); }}><Icon name="x" size={13} /></span>}</>);
  if (onSelect) return <button type="button" className={cls} aria-pressed={!!selected} onClick={onSelect} {...rest}>{body}</button>;
  return <span className={cls} {...rest}>{body}</span>;
}
