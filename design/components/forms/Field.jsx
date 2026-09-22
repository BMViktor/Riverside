import React from 'react';

const CSS = `
.rv-field{display:flex;flex-direction:column;gap:6px}
.rv-field__label{font-size:var(--text-small);font-weight:var(--weight-medium);color:var(--text-heading)}
.rv-field__opt{font-weight:var(--weight-regular);color:var(--text-subtle)}
.rv-field__hint{font-size:var(--text-caption);color:var(--text-muted)}
.rv-field__err{font-size:var(--text-caption);color:var(--status-danger-fg);display:flex;gap:6px;align-items:center}
`;
let injected=false;
function useCSS(){React.useEffect(()=>{if(injected)return;injected=true;const s=document.createElement('style');s.textContent=CSS;document.head.appendChild(s);},[]);}

export function Field({ label, htmlFor, hint, error, optional, children, className = '', ...rest }) {
  useCSS();
  return <div className={['rv-field', className].filter(Boolean).join(' ')} {...rest}>
    {label && <label className="rv-field__label" htmlFor={htmlFor}>{label}{optional && <span className="rv-field__opt"> — nem kötelező</span>}</label>}
    {children}
    {error ? <span className="rv-field__err">{error}</span> : hint ? <span className="rv-field__hint">{hint}</span> : null}
  </div>;
}
