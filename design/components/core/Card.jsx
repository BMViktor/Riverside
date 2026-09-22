import React from 'react';

const CSS = `
.rv-card{background:var(--surface-card);border:1px solid var(--border-hairline);border-radius:var(--radius-card);overflow:hidden;transition:border-color var(--dur-base) var(--ease-out),box-shadow var(--dur-base) var(--ease-out),transform var(--dur-base) var(--ease-out)}
.rv-card--plain{background:transparent;border-color:transparent}
.rv-card--muted{background:var(--surface-muted);border-color:transparent}
.rv-card--raised{box-shadow:var(--shadow-sm);border-color:transparent}
.rv-card--interactive{cursor:pointer;display:block;text-align:left;width:100%;font:inherit;color:inherit}
.rv-card--interactive:hover{border-color:var(--border-default);box-shadow:var(--shadow-md);transform:translateY(-2px)}
.rv-card__body{padding:var(--pad-card)}
.rv-card__body--lg{padding:var(--pad-card-lg)}
.rv-card__body--none{padding:0}
`;
let injected=false;
function useCSS(){React.useEffect(()=>{if(injected)return;injected=true;const s=document.createElement('style');s.textContent=CSS;document.head.appendChild(s);},[]);}

export function Card({ variant = 'default', interactive, padding = 'md', media, children, className = '', ...rest }) {
  useCSS();
  const Tag = interactive ? 'button' : 'div';
  const cls = ['rv-card', 'rv-card--' + variant, interactive ? 'rv-card--interactive' : '', className].filter(Boolean).join(' ');
  const padCls = padding === 'lg' ? 'rv-card__body--lg' : padding === 'none' ? 'rv-card__body--none' : '';
  return <Tag className={cls} {...rest}>
    {media}
    <div className={['rv-card__body', padCls].filter(Boolean).join(' ')}>{children}</div>
  </Tag>;
}
