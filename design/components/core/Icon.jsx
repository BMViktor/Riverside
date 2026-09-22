import React from 'react';

/* Riverside uses Lucide (24px grid, 1.5px stroke, round caps) loaded from CDN.
   No brand-owned icon set was provided — see readme.md ICONOGRAPHY. */
export function Icon({ name, size = 20, strokeWidth = 1.5, color = 'currentColor', label, style, ...rest }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const draw = () => { if (window.lucide && ref.current) window.lucide.createIcons({ nameAttr: 'data-lucide', root: ref.current }); };
    draw();
    if (!window.lucide) { const t = setInterval(() => { if (window.lucide) { draw(); clearInterval(t); } }, 120); return () => clearInterval(t); }
  }, [name, size, strokeWidth]);
  return (
    <span ref={ref} aria-label={label} aria-hidden={label ? undefined : true} role={label ? 'img' : undefined}
      style={{ display: 'inline-flex', width: size, height: size, color, flex: '0 0 auto', ...style }} {...rest}>
      <i data-lucide={name} style={{ width: size, height: size, strokeWidth }}></i>
    </span>
  );
}
