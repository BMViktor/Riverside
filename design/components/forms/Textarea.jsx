import React from 'react';

const CSS = `
.rv-textarea{width:100%;background:var(--surface-card);border:1px solid var(--border-default);border-radius:var(--radius-control);padding:var(--space-3);font-family:var(--font-ui);font-size:var(--text-body);line-height:var(--lh-body);color:var(--text-heading);outline:0;resize:vertical;min-height:104px;transition:border-color var(--dur-fast) var(--ease-out),box-shadow var(--dur-fast) var(--ease-out)}
.rv-textarea::placeholder{color:var(--text-subtle)}
.rv-textarea:focus{border-color:var(--border-focus);box-shadow:var(--ring-focus)}
.rv-textarea--invalid{border-color:var(--status-danger-fg)}
.rv-textarea:disabled{background:var(--surface-sunken)}
`;
let injected=false;
function useCSS(){React.useEffect(()=>{if(injected)return;injected=true;const s=document.createElement('style');s.textContent=CSS;document.head.appendChild(s);},[]);}

export function Textarea({ invalid, rows = 4, className = '', ...rest }) {
  useCSS();
  return <textarea rows={rows} className={['rv-textarea', invalid ? 'rv-textarea--invalid' : '', className].filter(Boolean).join(' ')} aria-invalid={invalid || undefined} {...rest} />;
}
