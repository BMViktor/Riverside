import React from 'react';
import { Icon } from '../core/Icon.jsx';

const CSS = `
.rv-photo{position:relative;overflow:hidden;background:var(--sage-100);border-radius:var(--radius-image);display:block;width:100%}
.rv-photo--square{border-radius:0}
.rv-photo__img{width:100%;height:100%;object-fit:cover;display:block}
.rv-photo__ph{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;color:var(--sage-500);background:repeating-linear-gradient(135deg,var(--sage-100) 0 10px,var(--sage-50) 10px 20px);font-size:var(--text-caption);text-align:center;padding:var(--space-3)}
.rv-photo__ph--slate{background:repeating-linear-gradient(135deg,var(--slate-100) 0 10px,var(--slate-50) 10px 20px);color:var(--slate-500)}
.rv-photo__scrim{position:absolute;inset:0;background:var(--scrim-bottom);pointer-events:none}
.rv-photo__cap{position:absolute;left:var(--space-4);right:var(--space-4);bottom:var(--space-4);color:var(--text-inverse);font-size:var(--text-small)}
`;
let injected=false;
function useCSS(){React.useEffect(()=>{if(injected)return;injected=true;const s=document.createElement('style');s.textContent=CSS;document.head.appendChild(s);},[]);}

export function Photo({ src, alt = '', ratio = '4 / 3', note = 'valódi fotó helye', tone = 'sage', scrim, caption, square, className = '', style, ...rest }) {
  useCSS();
  return <div className={['rv-photo', square ? 'rv-photo--square' : '', className].filter(Boolean).join(' ')} style={{ aspectRatio: ratio, ...style }} {...rest}>
    {src
      ? <img className="rv-photo__img" src={src} alt={alt} />
      : <div className={['rv-photo__ph', tone === 'slate' ? 'rv-photo__ph--slate' : ''].filter(Boolean).join(' ')}>
          <Icon name="image" size={18} />{note}
        </div>}
    {scrim && <div className="rv-photo__scrim" />}
    {caption && <div className="rv-photo__cap">{caption}</div>}
  </div>;
}
