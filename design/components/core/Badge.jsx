import React from 'react';
import { Icon } from './Icon.jsx';

const CSS = `
.rv-badge{display:inline-flex;align-items:center;gap:6px;font-family:var(--font-ui);font-size:var(--text-caption);font-weight:var(--weight-medium);line-height:1;padding:5px var(--space-2);border-radius:var(--radius-xs)}
.rv-badge--neutral{background:var(--surface-sunken);color:var(--text-body)}
.rv-badge--success{background:var(--status-success-bg);color:var(--status-success-fg)}
.rv-badge--warning{background:var(--status-warning-bg);color:var(--status-warning-fg)}
.rv-badge--danger{background:var(--status-danger-bg);color:var(--status-danger-fg)}
.rv-badge--info{background:var(--status-info-bg);color:var(--status-info-fg)}
.rv-badge--accent{background:var(--surface-accent);color:var(--text-accent)}
`;
let injected=false;
function useCSS(){React.useEffect(()=>{if(injected)return;injected=true;const s=document.createElement('style');s.textContent=CSS;document.head.appendChild(s);},[]);}

export function Badge({ tone = 'neutral', icon, children, className = '', ...rest }) {
  useCSS();
  return <span className={['rv-badge', 'rv-badge--' + tone, className].filter(Boolean).join(' ')} {...rest}>
    {icon && <Icon name={icon} size={13} />}{children}
  </span>;
}
