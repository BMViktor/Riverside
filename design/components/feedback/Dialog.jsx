import React from 'react';
import { IconButton } from '../core/IconButton.jsx';

const CSS = `
@keyframes rv-fade{from{opacity:0}to{opacity:1}}
@keyframes rv-rise{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.rv-dialog__scrim{position:fixed;inset:0;background:var(--surface-overlay);backdrop-filter:blur(2px);display:flex;align-items:center;justify-content:center;padding:var(--space-6);z-index:60;animation:rv-fade var(--dur-base) var(--ease-out)}
.rv-dialog{background:var(--surface-card);border-radius:var(--radius-lg);box-shadow:var(--shadow-lg);width:100%;max-width:480px;max-height:88vh;overflow:auto;animation:rv-rise var(--dur-slow) var(--ease-entrance)}
.rv-dialog--wide{max-width:720px}
.rv-dialog__head{display:flex;align-items:flex-start;justify-content:space-between;gap:var(--space-4);padding:var(--space-6) var(--space-6) 0}
.rv-dialog__title{font-family:var(--font-display);font-size:var(--text-display-3);line-height:var(--lh-display-3);color:var(--text-heading)}
.rv-dialog__body{padding:var(--space-4) var(--space-6);color:var(--text-body);font-size:var(--text-small)}
.rv-dialog__foot{display:flex;justify-content:flex-end;gap:var(--space-3);padding:var(--space-4) var(--space-6) var(--space-6)}
`;
let injected=false;
function useCSS(){React.useEffect(()=>{if(injected)return;injected=true;const s=document.createElement('style');s.textContent=CSS;document.head.appendChild(s);},[]);}

export function Dialog({ open = true, title, onClose, footer, wide, children, ...rest }) {
  useCSS();
  if (!open) return null;
  return <div className="rv-dialog__scrim" onClick={onClose}>
    <div className={['rv-dialog', wide ? 'rv-dialog--wide' : ''].filter(Boolean).join(' ')} role="dialog" aria-modal="true" onClick={e => e.stopPropagation()} {...rest}>
      <div className="rv-dialog__head">
        <h2 className="rv-dialog__title">{title}</h2>
        {onClose && <IconButton icon="x" label="Bezárás" onClick={onClose} />}
      </div>
      <div className="rv-dialog__body">{children}</div>
      {footer && <div className="rv-dialog__foot">{footer}</div>}
    </div>
  </div>;
}
