import React from 'react';
import { Icon } from '../core/Icon.jsx';

const CSS = `
.rv-toast{display:flex;gap:var(--space-3);align-items:flex-start;background:var(--surface-inverse);color:var(--text-inverse);border-radius:var(--radius-md);padding:var(--space-4);box-shadow:var(--shadow-lg);max-width:400px;font-size:var(--text-small);animation:rv-rise var(--dur-slow) var(--ease-entrance)}
.rv-toast--light{background:var(--surface-card);color:var(--text-body);border:1px solid var(--border-hairline)}
.rv-toast__title{font-weight:var(--weight-medium);color:inherit;display:block;margin-bottom:2px}
.rv-toast__icon{display:flex;margin-top:1px}
.rv-toast__close{margin-left:auto;background:none;border:0;color:inherit;opacity:.6;cursor:pointer;display:flex;padding:0}
.rv-toast__close:hover{opacity:1}
`;
let injected=false;
function useCSS(){React.useEffect(()=>{if(injected)return;injected=true;const s=document.createElement('style');s.textContent=CSS;document.head.appendChild(s);},[]);}

const ICONS = { success: 'check', info: 'info', warning: 'triangle-alert', danger: 'circle-alert' };

export function Toast({ tone = 'info', title, tint = 'dark', onClose, children, className = '', ...rest }) {
  useCSS();
  return <div role="status" className={['rv-toast', tint === 'light' ? 'rv-toast--light' : '', className].filter(Boolean).join(' ')} {...rest}>
    <span className="rv-toast__icon"><Icon name={ICONS[tone] || 'info'} size={16} /></span>
    <span>{title && <span className="rv-toast__title">{title}</span>}{children}</span>
    {onClose && <button className="rv-toast__close" aria-label="Bezárás" onClick={onClose}><Icon name="x" size={14} /></button>}
  </div>;
}
