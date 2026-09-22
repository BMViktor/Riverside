import React from 'react';
import { Icon } from './Icon.jsx';

const CSS = `
.rv-btn{display:inline-flex;align-items:center;justify-content:center;gap:var(--space-2);font-family:var(--font-ui);font-weight:var(--weight-medium);border:1px solid transparent;border-radius:var(--radius-control);cursor:pointer;text-decoration:none;transition:background var(--dur-fast) var(--ease-out),border-color var(--dur-fast) var(--ease-out),color var(--dur-fast) var(--ease-out),transform var(--dur-fast) var(--ease-out);white-space:nowrap}
.rv-btn:active:not(:disabled){transform:translateY(1px)}
.rv-btn--sm{height:var(--control-h-sm);padding:0 var(--space-3);font-size:var(--text-small)}
.rv-btn--md{height:var(--control-h-md);padding:0 var(--space-5);font-size:var(--text-small)}
.rv-btn--lg{height:var(--control-h-lg);padding:0 var(--space-6);font-size:var(--text-body)}
.rv-btn--primary{background:var(--action-primary-bg);color:var(--action-primary-fg)}
.rv-btn--primary:hover:not(:disabled){background:var(--action-primary-bg-hover)}
.rv-btn--primary:active:not(:disabled){background:var(--action-primary-bg-active)}
.rv-btn--accent{background:var(--action-accent-bg);color:var(--action-accent-fg)}
.rv-btn--accent:hover:not(:disabled){background:var(--action-accent-bg-hover)}
.rv-btn--secondary{background:var(--surface-card);color:var(--action-secondary-fg);border-color:var(--action-secondary-border)}
.rv-btn--secondary:hover:not(:disabled){border-color:var(--border-strong);background:var(--n-50)}
.rv-btn--ghost{background:transparent;color:var(--text-body);padding-left:var(--space-2);padding-right:var(--space-2)}
.rv-btn--ghost:hover:not(:disabled){background:var(--surface-muted);color:var(--text-heading)}
.rv-btn--inverse{background:rgba(251,249,245,.1);color:var(--text-inverse);border-color:var(--border-inverse)}
.rv-btn--inverse:hover:not(:disabled){background:rgba(251,249,245,.18)}
.rv-btn:disabled,.rv-btn[aria-disabled=true]{background:var(--action-disabled-bg);color:var(--action-disabled-fg);border-color:transparent;cursor:not-allowed;transform:none}
.rv-btn--block{width:100%}
`;
let injected = false;
function useCSS() {
  React.useEffect(() => {
    if (injected) return; injected = true;
    const s = document.createElement('style'); s.textContent = CSS; document.head.appendChild(s);
  }, []);
}

export function Button({ variant = 'primary', size = 'md', block, iconLeft, iconRight, href, disabled, children, className = '', ...rest }) {
  useCSS();
  const cls = ['rv-btn', 'rv-btn--' + variant, 'rv-btn--' + size, block ? 'rv-btn--block' : '', className].filter(Boolean).join(' ');
  const iconSize = size === 'lg' ? 20 : 16;
  const inner = (<>
    {iconLeft && <Icon name={iconLeft} size={iconSize} />}
    {children}
    {iconRight && <Icon name={iconRight} size={iconSize} />}
  </>);
  if (href && !disabled) return <a className={cls} href={href} {...rest}>{inner}</a>;
  return <button className={cls} disabled={disabled} {...rest}>{inner}</button>;
}
