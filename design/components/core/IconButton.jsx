import React from 'react';
import { Icon } from './Icon.jsx';

const CSS = `
.rv-iconbtn{display:inline-flex;align-items:center;justify-content:center;border:1px solid transparent;border-radius:var(--radius-control);background:transparent;color:var(--text-body);cursor:pointer;transition:background var(--dur-fast) var(--ease-out),color var(--dur-fast) var(--ease-out),border-color var(--dur-fast) var(--ease-out)}
.rv-iconbtn--sm{width:var(--control-h-sm);height:var(--control-h-sm)}
.rv-iconbtn--md{width:var(--control-h-md);height:var(--control-h-md)}
.rv-iconbtn--plain:hover{background:var(--surface-muted);color:var(--text-heading)}
.rv-iconbtn--outline{border-color:var(--border-default);background:var(--surface-card)}
.rv-iconbtn--outline:hover{border-color:var(--border-strong)}
.rv-iconbtn--inverse{color:var(--text-inverse);border-color:var(--border-inverse);background:rgba(251,249,245,.08);backdrop-filter:blur(6px)}
.rv-iconbtn--inverse:hover{background:rgba(251,249,245,.18)}
.rv-iconbtn--round{border-radius:var(--radius-pill)}
.rv-iconbtn:disabled{color:var(--action-disabled-fg);cursor:not-allowed}
`;
let injected = false;
function useCSS(){React.useEffect(()=>{if(injected)return;injected=true;const s=document.createElement('style');s.textContent=CSS;document.head.appendChild(s);},[]);}

export function IconButton({ icon, variant = 'plain', size = 'md', round, label, className = '', ...rest }) {
  useCSS();
  const cls = ['rv-iconbtn', 'rv-iconbtn--' + variant, 'rv-iconbtn--' + size, round ? 'rv-iconbtn--round' : '', className].filter(Boolean).join(' ');
  return <button className={cls} aria-label={label} {...rest}><Icon name={icon} size={size === 'sm' ? 16 : 20} /></button>;
}
