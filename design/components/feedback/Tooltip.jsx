import React from 'react';

const CSS = `
.rv-tip{position:relative;display:inline-flex}
.rv-tip__bub{position:absolute;z-index:40;background:var(--surface-inverse);color:var(--text-inverse);font-size:var(--text-caption);line-height:1.35;padding:6px var(--space-2);border-radius:var(--radius-sm);white-space:nowrap;opacity:0;pointer-events:none;transition:opacity var(--dur-fast) var(--ease-out)}
.rv-tip:hover .rv-tip__bub,.rv-tip:focus-within .rv-tip__bub{opacity:1}
.rv-tip__bub--top{bottom:calc(100% + 6px);left:50%;transform:translateX(-50%)}
.rv-tip__bub--bottom{top:calc(100% + 6px);left:50%;transform:translateX(-50%)}
.rv-tip__bub--right{left:calc(100% + 6px);top:50%;transform:translateY(-50%)}
`;
let injected=false;
function useCSS(){React.useEffect(()=>{if(injected)return;injected=true;const s=document.createElement('style');s.textContent=CSS;document.head.appendChild(s);},[]);}

export function Tooltip({ label, placement = 'top', children, className = '', ...rest }) {
  useCSS();
  return <span className={['rv-tip', className].filter(Boolean).join(' ')} {...rest}>
    {children}
    <span className={'rv-tip__bub rv-tip__bub--' + placement} role="tooltip">{label}</span>
  </span>;
}
