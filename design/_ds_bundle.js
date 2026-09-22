/* @ds-bundle: {"format":4,"namespace":"RiversideDesignSystem_54ad61","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"DateRangeField","sourcePath":"components/forms/DateRangeField.jsx"},{"name":"Field","sourcePath":"components/forms/Field.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"RadioGroup","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"Photo","sourcePath":"components/media/Photo.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"77babf97cc16","components/core/Button.jsx":"93f1b3e95b13","components/core/Card.jsx":"07e2040a12ae","components/core/Icon.jsx":"1f1087bacdfa","components/core/IconButton.jsx":"9babbc95b9cd","components/core/Tag.jsx":"0ce0f4388410","components/feedback/Dialog.jsx":"21bf00bd3125","components/feedback/Toast.jsx":"cde1311c2ae4","components/feedback/Tooltip.jsx":"75396934caf5","components/forms/Checkbox.jsx":"7aa27d0d6a54","components/forms/DateRangeField.jsx":"633f70c74a09","components/forms/Field.jsx":"204894dca5fb","components/forms/Input.jsx":"d6161d6cd044","components/forms/Radio.jsx":"935ba33cd34f","components/forms/Select.jsx":"c8a8bad74632","components/forms/Switch.jsx":"65e3f684e9e0","components/forms/Textarea.jsx":"656db973b394","components/media/Photo.jsx":"0ffe5f78f668","components/navigation/Tabs.jsx":"79ef9cd27355","ui_kits/website/Area.jsx":"ee5b8ab3121c","ui_kits/website/Booking.jsx":"107b191de8e9","ui_kits/website/Home.jsx":"3e0946137002","ui_kits/website/RoomDetail.jsx":"72a226a6e6ff","ui_kits/website/Rooms.jsx":"4bc59110b438","ui_kits/website/Shell.jsx":"2ce8dd781825"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.RiversideDesignSystem_54ad61 = window.RiversideDesignSystem_54ad61 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
let injected = false;
function useCSS() {
  React.useEffect(() => {
    if (injected) return;
    injected = true;
    const s = document.createElement('style');
    s.textContent = CSS;
    document.head.appendChild(s);
  }, []);
}
function Card({
  variant = 'default',
  interactive,
  padding = 'md',
  media,
  children,
  className = '',
  ...rest
}) {
  useCSS();
  const Tag = interactive ? 'button' : 'div';
  const cls = ['rv-card', 'rv-card--' + variant, interactive ? 'rv-card--interactive' : '', className].filter(Boolean).join(' ');
  const padCls = padding === 'lg' ? 'rv-card__body--lg' : padding === 'none' ? 'rv-card__body--none' : '';
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls
  }, rest), media, /*#__PURE__*/React.createElement("div", {
    className: ['rv-card__body', padCls].filter(Boolean).join(' ')
  }, children));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Riverside uses Lucide (24px grid, 1.5px stroke, round caps) loaded from CDN.
   No brand-owned icon set was provided — see readme.md ICONOGRAPHY. */
function Icon({
  name,
  size = 20,
  strokeWidth = 1.5,
  color = 'currentColor',
  label,
  style,
  ...rest
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const draw = () => {
      if (window.lucide && ref.current) window.lucide.createIcons({
        nameAttr: 'data-lucide',
        root: ref.current
      });
    };
    draw();
    if (!window.lucide) {
      const t = setInterval(() => {
        if (window.lucide) {
          draw();
          clearInterval(t);
        }
      }, 120);
      return () => clearInterval(t);
    }
  }, [name, size, strokeWidth]);
  return /*#__PURE__*/React.createElement("span", _extends({
    ref: ref,
    "aria-label": label,
    "aria-hidden": label ? undefined : true,
    role: label ? 'img' : undefined,
    style: {
      display: 'inline-flex',
      width: size,
      height: size,
      color,
      flex: '0 0 auto',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("i", {
    "data-lucide": name,
    style: {
      width: size,
      height: size,
      strokeWidth
    }
  }));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.rv-badge{display:inline-flex;align-items:center;gap:6px;font-family:var(--font-ui);font-size:var(--text-caption);font-weight:var(--weight-medium);line-height:1;padding:5px var(--space-2);border-radius:var(--radius-xs)}
.rv-badge--neutral{background:var(--surface-sunken);color:var(--text-body)}
.rv-badge--success{background:var(--status-success-bg);color:var(--status-success-fg)}
.rv-badge--warning{background:var(--status-warning-bg);color:var(--status-warning-fg)}
.rv-badge--danger{background:var(--status-danger-bg);color:var(--status-danger-fg)}
.rv-badge--info{background:var(--status-info-bg);color:var(--status-info-fg)}
.rv-badge--accent{background:var(--surface-accent);color:var(--text-accent)}
`;
let injected = false;
function useCSS() {
  React.useEffect(() => {
    if (injected) return;
    injected = true;
    const s = document.createElement('style');
    s.textContent = CSS;
    document.head.appendChild(s);
  }, []);
}
function Badge({
  tone = 'neutral',
  icon,
  children,
  className = '',
  ...rest
}) {
  useCSS();
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ['rv-badge', 'rv-badge--' + tone, className].filter(Boolean).join(' ')
  }, rest), icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 13
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
    if (injected) return;
    injected = true;
    const s = document.createElement('style');
    s.textContent = CSS;
    document.head.appendChild(s);
  }, []);
}
function Button({
  variant = 'primary',
  size = 'md',
  block,
  iconLeft,
  iconRight,
  href,
  disabled,
  children,
  className = '',
  ...rest
}) {
  useCSS();
  const cls = ['rv-btn', 'rv-btn--' + variant, 'rv-btn--' + size, block ? 'rv-btn--block' : '', className].filter(Boolean).join(' ');
  const iconSize = size === 'lg' ? 20 : 16;
  const inner = /*#__PURE__*/React.createElement(React.Fragment, null, iconLeft && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconLeft,
    size: iconSize
  }), children, iconRight && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconRight,
    size: iconSize
  }));
  if (href && !disabled) return /*#__PURE__*/React.createElement("a", _extends({
    className: cls,
    href: href
  }, rest), inner);
  return /*#__PURE__*/React.createElement("button", _extends({
    className: cls,
    disabled: disabled
  }, rest), inner);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.rv-iconbtn{display:inline-flex;align-items:center;justify-content:center;border:1px solid transparent;border-radius:var(--radius-control);background:transparent;color:var(--text-body);cursor:pointer;transition:background var(--dur-fast) var(--ease-out),color var(--dur-fast) var(--ease-out),border-color var(--dur-fast) var(--ease-out)}
.rv-iconbtn--sm{width:var(--control-h-sm);height:var(--control-h-sm)}
.rv-iconbtn--md{width:var(--control-h-md);height:var(--control-h-md)}
.rv-iconbtn--plain:hover{background:var(--surface-muted);color:var(--text-heading)}
.rv-iconbtn--outline{border-color:var(--border-default);background:var(--surface-card)}
.rv-iconbtn--outline:hover{border-color:var(--border-strong)}
.rv-iconbtn--inverse{color:var(--text-inverse);border-color:var(--border-inverse);background:rgba(251,249,245,.08);backdrop-filter:blur(6px)}
.rv-iconbtn--inverse:hover{background:rgba(251,249,245,.18)}
.rv-iconbtn--round{border-radius:var(--radius-pill)}
.rv-iconbtn:disabled{color:var(--action-disabled-fg);cursor:not-allowed}
`;
let injected = false;
function useCSS() {
  React.useEffect(() => {
    if (injected) return;
    injected = true;
    const s = document.createElement('style');
    s.textContent = CSS;
    document.head.appendChild(s);
  }, []);
}
function IconButton({
  icon,
  variant = 'plain',
  size = 'md',
  round,
  label,
  className = '',
  ...rest
}) {
  useCSS();
  const cls = ['rv-iconbtn', 'rv-iconbtn--' + variant, 'rv-iconbtn--' + size, round ? 'rv-iconbtn--round' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("button", _extends({
    className: cls,
    "aria-label": label
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: size === 'sm' ? 16 : 20
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.rv-tag{display:inline-flex;align-items:center;gap:6px;font-size:var(--text-small);color:var(--text-body);background:transparent;border:1px solid var(--border-hairline);border-radius:var(--radius-pill);padding:5px var(--space-3);line-height:1.2;font-family:var(--font-ui);transition:border-color var(--dur-fast) var(--ease-out),background var(--dur-fast) var(--ease-out),color var(--dur-fast) var(--ease-out)}
.rv-tag--filled{background:var(--surface-muted);border-color:transparent}
button.rv-tag{cursor:pointer}
button.rv-tag:hover{border-color:var(--border-strong)}
.rv-tag[aria-pressed=true]{background:var(--sage-800);border-color:var(--sage-800);color:var(--n-50)}
.rv-tag__x{display:inline-flex;opacity:.6}
.rv-tag__x:hover{opacity:1}
`;
let injected = false;
function useCSS() {
  React.useEffect(() => {
    if (injected) return;
    injected = true;
    const s = document.createElement('style');
    s.textContent = CSS;
    document.head.appendChild(s);
  }, []);
}
function Tag({
  icon,
  variant = 'outline',
  selected,
  onSelect,
  onRemove,
  children,
  className = '',
  ...rest
}) {
  useCSS();
  const cls = ['rv-tag', variant === 'filled' ? 'rv-tag--filled' : '', className].filter(Boolean).join(' ');
  const body = /*#__PURE__*/React.createElement(React.Fragment, null, icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 14
  }), children, onRemove && /*#__PURE__*/React.createElement("span", {
    className: "rv-tag__x",
    onClick: e => {
      e.stopPropagation();
      onRemove(e);
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 13
  })));
  if (onSelect) return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: cls,
    "aria-pressed": !!selected,
    onClick: onSelect
  }, rest), body);
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), body);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
let injected = false;
function useCSS() {
  React.useEffect(() => {
    if (injected) return;
    injected = true;
    const s = document.createElement('style');
    s.textContent = CSS;
    document.head.appendChild(s);
  }, []);
}
function Dialog({
  open = true,
  title,
  onClose,
  footer,
  wide,
  children,
  ...rest
}) {
  useCSS();
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "rv-dialog__scrim",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", _extends({
    className: ['rv-dialog', wide ? 'rv-dialog--wide' : ''].filter(Boolean).join(' '),
    role: "dialog",
    "aria-modal": "true",
    onClick: e => e.stopPropagation()
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "rv-dialog__head"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "rv-dialog__title"
  }, title), onClose && /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "x",
    label: "Bez\xE1r\xE1s",
    onClick: onClose
  })), /*#__PURE__*/React.createElement("div", {
    className: "rv-dialog__body"
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    className: "rv-dialog__foot"
  }, footer)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.rv-toast{display:flex;gap:var(--space-3);align-items:flex-start;background:var(--surface-inverse);color:var(--text-inverse);border-radius:var(--radius-md);padding:var(--space-4);box-shadow:var(--shadow-lg);max-width:400px;font-size:var(--text-small);animation:rv-rise var(--dur-slow) var(--ease-entrance)}
.rv-toast--light{background:var(--surface-card);color:var(--text-body);border:1px solid var(--border-hairline)}
.rv-toast__title{font-weight:var(--weight-medium);color:inherit;display:block;margin-bottom:2px}
.rv-toast__icon{display:flex;margin-top:1px}
.rv-toast__close{margin-left:auto;background:none;border:0;color:inherit;opacity:.6;cursor:pointer;display:flex;padding:0}
.rv-toast__close:hover{opacity:1}
`;
let injected = false;
function useCSS() {
  React.useEffect(() => {
    if (injected) return;
    injected = true;
    const s = document.createElement('style');
    s.textContent = CSS;
    document.head.appendChild(s);
  }, []);
}
const ICONS = {
  success: 'check',
  info: 'info',
  warning: 'triangle-alert',
  danger: 'circle-alert'
};
function Toast({
  tone = 'info',
  title,
  tint = 'dark',
  onClose,
  children,
  className = '',
  ...rest
}) {
  useCSS();
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "status",
    className: ['rv-toast', tint === 'light' ? 'rv-toast--light' : '', className].filter(Boolean).join(' ')
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "rv-toast__icon"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: ICONS[tone] || 'info',
    size: 16
  })), /*#__PURE__*/React.createElement("span", null, title && /*#__PURE__*/React.createElement("span", {
    className: "rv-toast__title"
  }, title), children), onClose && /*#__PURE__*/React.createElement("button", {
    className: "rv-toast__close",
    "aria-label": "Bez\xE1r\xE1s",
    onClick: onClose
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 14
  })));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.rv-tip{position:relative;display:inline-flex}
.rv-tip__bub{position:absolute;z-index:40;background:var(--surface-inverse);color:var(--text-inverse);font-size:var(--text-caption);line-height:1.35;padding:6px var(--space-2);border-radius:var(--radius-sm);white-space:nowrap;opacity:0;pointer-events:none;transition:opacity var(--dur-fast) var(--ease-out)}
.rv-tip:hover .rv-tip__bub,.rv-tip:focus-within .rv-tip__bub{opacity:1}
.rv-tip__bub--top{bottom:calc(100% + 6px);left:50%;transform:translateX(-50%)}
.rv-tip__bub--bottom{top:calc(100% + 6px);left:50%;transform:translateX(-50%)}
.rv-tip__bub--right{left:calc(100% + 6px);top:50%;transform:translateY(-50%)}
`;
let injected = false;
function useCSS() {
  React.useEffect(() => {
    if (injected) return;
    injected = true;
    const s = document.createElement('style');
    s.textContent = CSS;
    document.head.appendChild(s);
  }, []);
}
function Tooltip({
  label,
  placement = 'top',
  children,
  className = '',
  ...rest
}) {
  useCSS();
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ['rv-tip', className].filter(Boolean).join(' ')
  }, rest), children, /*#__PURE__*/React.createElement("span", {
    className: 'rv-tip__bub rv-tip__bub--' + placement,
    role: "tooltip"
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.rv-check{display:flex;gap:var(--space-3);align-items:flex-start;cursor:pointer;font-size:var(--text-small);color:var(--text-body);line-height:1.45}
.rv-check__box{position:relative;flex:0 0 auto;width:18px;height:18px;border:1px solid var(--border-strong);border-radius:var(--radius-xs);background:var(--surface-card);display:flex;align-items:center;justify-content:center;color:transparent;margin-top:1px;transition:background var(--dur-fast) var(--ease-out),border-color var(--dur-fast) var(--ease-out),color var(--dur-fast) var(--ease-out)}
.rv-check input{position:absolute;opacity:0;width:0;height:0}
.rv-check:hover .rv-check__box{border-color:var(--sage-600)}
.rv-check input:checked + .rv-check__box{background:var(--sage-800);border-color:var(--sage-800);color:#fff}
.rv-check input:focus-visible + .rv-check__box{box-shadow:var(--ring-focus)}
.rv-check input:disabled + .rv-check__box{background:var(--surface-sunken);border-color:var(--border-hairline)}
.rv-check__label{display:flex;flex-direction:column;gap:2px}
.rv-check__desc{color:var(--text-muted);font-size:var(--text-caption)}
`;
let injected = false;
function useCSS() {
  React.useEffect(() => {
    if (injected) return;
    injected = true;
    const s = document.createElement('style');
    s.textContent = CSS;
    document.head.appendChild(s);
  }, []);
}
function Checkbox({
  label,
  description,
  className = '',
  ...rest
}) {
  useCSS();
  return /*#__PURE__*/React.createElement("label", {
    className: ['rv-check', className].filter(Boolean).join(' ')
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox"
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "rv-check__box"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 13,
    strokeWidth: 2
  })), /*#__PURE__*/React.createElement("span", {
    className: "rv-check__label"
  }, label, description && /*#__PURE__*/React.createElement("span", {
    className: "rv-check__desc"
  }, description)));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/DateRangeField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.rv-daterange{display:grid;grid-template-columns:1fr 1px 1fr;align-items:stretch;background:var(--surface-card);border:1px solid var(--border-default);border-radius:var(--radius-control);overflow:hidden}
.rv-daterange:focus-within{border-color:var(--border-focus);box-shadow:var(--ring-focus)}
.rv-daterange__sep{background:var(--border-hairline)}
.rv-daterange__cell{display:flex;flex-direction:column;gap:2px;padding:var(--space-2) var(--space-4)}
.rv-daterange__cap{display:flex;align-items:center;gap:6px;font-size:var(--text-eyebrow);letter-spacing:var(--ls-eyebrow);text-transform:uppercase;font-weight:var(--weight-semibold);color:var(--text-muted)}
.rv-daterange__el{border:0;outline:0;background:transparent;font-family:var(--font-ui);font-size:var(--text-body);color:var(--text-heading);padding:0;width:100%}
`;
let injected = false;
function useCSS() {
  React.useEffect(() => {
    if (injected) return;
    injected = true;
    const s = document.createElement('style');
    s.textContent = CSS;
    document.head.appendChild(s);
  }, []);
}
function DateRangeField({
  fromLabel = 'Érkezés',
  toLabel = 'Távozás',
  fromProps = {},
  toProps = {},
  className = '',
  ...rest
}) {
  useCSS();
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ['rv-daterange', className].filter(Boolean).join(' ')
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "rv-daterange__cell"
  }, /*#__PURE__*/React.createElement("span", {
    className: "rv-daterange__cap"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "calendar",
    size: 12
  }), fromLabel), /*#__PURE__*/React.createElement("input", _extends({
    type: "date",
    className: "rv-daterange__el"
  }, fromProps))), /*#__PURE__*/React.createElement("div", {
    className: "rv-daterange__sep"
  }), /*#__PURE__*/React.createElement("div", {
    className: "rv-daterange__cell"
  }, /*#__PURE__*/React.createElement("span", {
    className: "rv-daterange__cap"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "calendar",
    size: 12
  }), toLabel), /*#__PURE__*/React.createElement("input", _extends({
    type: "date",
    className: "rv-daterange__el"
  }, toProps))));
}
Object.assign(__ds_scope, { DateRangeField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/DateRangeField.jsx", error: String((e && e.message) || e) }); }

// components/forms/Field.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.rv-field{display:flex;flex-direction:column;gap:6px}
.rv-field__label{font-size:var(--text-small);font-weight:var(--weight-medium);color:var(--text-heading)}
.rv-field__opt{font-weight:var(--weight-regular);color:var(--text-subtle)}
.rv-field__hint{font-size:var(--text-caption);color:var(--text-muted)}
.rv-field__err{font-size:var(--text-caption);color:var(--status-danger-fg);display:flex;gap:6px;align-items:center}
`;
let injected = false;
function useCSS() {
  React.useEffect(() => {
    if (injected) return;
    injected = true;
    const s = document.createElement('style');
    s.textContent = CSS;
    document.head.appendChild(s);
  }, []);
}
function Field({
  label,
  htmlFor,
  hint,
  error,
  optional,
  children,
  className = '',
  ...rest
}) {
  useCSS();
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ['rv-field', className].filter(Boolean).join(' ')
  }, rest), label && /*#__PURE__*/React.createElement("label", {
    className: "rv-field__label",
    htmlFor: htmlFor
  }, label, optional && /*#__PURE__*/React.createElement("span", {
    className: "rv-field__opt"
  }, " \u2014 nem k\xF6telez\u0151")), children, error ? /*#__PURE__*/React.createElement("span", {
    className: "rv-field__err"
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    className: "rv-field__hint"
  }, hint) : null);
}
Object.assign(__ds_scope, { Field });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Field.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.rv-input{display:flex;align-items:center;gap:var(--space-2);background:var(--surface-card);border:1px solid var(--border-default);border-radius:var(--radius-control);padding:0 var(--space-3);height:var(--control-h-md);transition:border-color var(--dur-fast) var(--ease-out),box-shadow var(--dur-fast) var(--ease-out)}
.rv-input--sm{height:var(--control-h-sm)}
.rv-input--lg{height:var(--control-h-lg);padding:0 var(--space-4)}
.rv-input:focus-within{border-color:var(--border-focus);box-shadow:var(--ring-focus)}
.rv-input--invalid{border-color:var(--status-danger-fg)}
.rv-input--disabled{background:var(--surface-sunken);border-color:var(--border-hairline)}
.rv-input__el{flex:1;min-width:0;border:0;background:transparent;outline:0;font-family:var(--font-ui);font-size:var(--text-body);color:var(--text-heading)}
.rv-input__el::placeholder{color:var(--text-subtle)}
.rv-input__icon{color:var(--text-muted);display:flex}
.rv-input__suffix{font-size:var(--text-small);color:var(--text-muted);white-space:nowrap}
`;
let injected = false;
function useCSS() {
  React.useEffect(() => {
    if (injected) return;
    injected = true;
    const s = document.createElement('style');
    s.textContent = CSS;
    document.head.appendChild(s);
  }, []);
}
function Input({
  size = 'md',
  icon,
  suffix,
  invalid,
  disabled,
  className = '',
  ...rest
}) {
  useCSS();
  const cls = ['rv-input', 'rv-input--' + size, invalid ? 'rv-input--invalid' : '', disabled ? 'rv-input--disabled' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", {
    className: cls
  }, icon && /*#__PURE__*/React.createElement("span", {
    className: "rv-input__icon"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 16
  })), /*#__PURE__*/React.createElement("input", _extends({
    className: "rv-input__el",
    disabled: disabled,
    "aria-invalid": invalid || undefined
  }, rest)), suffix && /*#__PURE__*/React.createElement("span", {
    className: "rv-input__suffix"
  }, suffix));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.rv-radio{display:flex;gap:var(--space-3);align-items:flex-start;cursor:pointer;font-size:var(--text-small);color:var(--text-body);line-height:1.45}
.rv-radio__dot{position:relative;flex:0 0 auto;width:18px;height:18px;border:1px solid var(--border-strong);border-radius:var(--radius-pill);background:var(--surface-card);margin-top:1px;transition:border-color var(--dur-fast) var(--ease-out),box-shadow var(--dur-fast) var(--ease-out)}
.rv-radio input{position:absolute;opacity:0;width:0;height:0}
.rv-radio:hover .rv-radio__dot{border-color:var(--sage-600)}
.rv-radio input:checked + .rv-radio__dot{border-color:var(--sage-800);box-shadow:inset 0 0 0 4px var(--sage-800)}
.rv-radio input:focus-visible + .rv-radio__dot{box-shadow:var(--ring-focus)}
.rv-radio__label{display:flex;flex-direction:column;gap:2px}
.rv-radio__desc{color:var(--text-muted);font-size:var(--text-caption)}
.rv-radiogroup{display:flex;flex-direction:column;gap:var(--space-3)}
.rv-radiogroup--row{flex-direction:row;gap:var(--space-6)}
`;
let injected = false;
function useCSS() {
  React.useEffect(() => {
    if (injected) return;
    injected = true;
    const s = document.createElement('style');
    s.textContent = CSS;
    document.head.appendChild(s);
  }, []);
}
function Radio({
  label,
  description,
  className = '',
  ...rest
}) {
  useCSS();
  return /*#__PURE__*/React.createElement("label", {
    className: ['rv-radio', className].filter(Boolean).join(' ')
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "radio"
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "rv-radio__dot"
  }), /*#__PURE__*/React.createElement("span", {
    className: "rv-radio__label"
  }, label, description && /*#__PURE__*/React.createElement("span", {
    className: "rv-radio__desc"
  }, description)));
}
function RadioGroup({
  row,
  children,
  className = '',
  ...rest
}) {
  useCSS();
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "radiogroup",
    className: ['rv-radiogroup', row ? 'rv-radiogroup--row' : '', className].filter(Boolean).join(' ')
  }, rest), children);
}
Object.assign(__ds_scope, { Radio, RadioGroup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.rv-select{position:relative;display:flex;align-items:center;background:var(--surface-card);border:1px solid var(--border-default);border-radius:var(--radius-control);height:var(--control-h-md);padding:0 var(--space-3);transition:border-color var(--dur-fast) var(--ease-out),box-shadow var(--dur-fast) var(--ease-out)}
.rv-select--sm{height:var(--control-h-sm)}
.rv-select--lg{height:var(--control-h-lg);padding:0 var(--space-4)}
.rv-select:focus-within{border-color:var(--border-focus);box-shadow:var(--ring-focus)}
.rv-select__el{appearance:none;flex:1;min-width:0;border:0;background:transparent;outline:0;font-family:var(--font-ui);font-size:var(--text-body);color:var(--text-heading);padding-right:var(--space-5);cursor:pointer}
.rv-select__chev{position:absolute;right:var(--space-3);color:var(--text-muted);pointer-events:none;display:flex}
.rv-select--disabled{background:var(--surface-sunken)}
`;
let injected = false;
function useCSS() {
  React.useEffect(() => {
    if (injected) return;
    injected = true;
    const s = document.createElement('style');
    s.textContent = CSS;
    document.head.appendChild(s);
  }, []);
}
function Select({
  size = 'md',
  options = [],
  disabled,
  children,
  className = '',
  ...rest
}) {
  useCSS();
  return /*#__PURE__*/React.createElement("div", {
    className: ['rv-select', 'rv-select--' + size, disabled ? 'rv-select--disabled' : '', className].filter(Boolean).join(' ')
  }, /*#__PURE__*/React.createElement("select", _extends({
    className: "rv-select__el",
    disabled: disabled
  }, rest), children || options.map(o => typeof o === 'string' ? /*#__PURE__*/React.createElement("option", {
    key: o,
    value: o
  }, o) : /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label))), /*#__PURE__*/React.createElement("span", {
    className: "rv-select__chev"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 16
  })));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.rv-switch{display:flex;align-items:center;gap:var(--space-3);cursor:pointer;font-size:var(--text-small);color:var(--text-body)}
.rv-switch input{position:absolute;opacity:0;width:0;height:0}
.rv-switch__track{position:relative;flex:0 0 auto;width:38px;height:22px;border-radius:var(--radius-pill);background:var(--n-300);transition:background var(--dur-base) var(--ease-out)}
.rv-switch__track::after{content:"";position:absolute;top:3px;left:3px;width:16px;height:16px;border-radius:var(--radius-pill);background:#fff;box-shadow:var(--shadow-xs);transition:transform var(--dur-base) var(--ease-out)}
.rv-switch input:checked + .rv-switch__track{background:var(--sage-800)}
.rv-switch input:checked + .rv-switch__track::after{transform:translateX(16px)}
.rv-switch input:focus-visible + .rv-switch__track{box-shadow:var(--ring-focus)}
.rv-switch input:disabled + .rv-switch__track{background:var(--n-200)}
`;
let injected = false;
function useCSS() {
  React.useEffect(() => {
    if (injected) return;
    injected = true;
    const s = document.createElement('style');
    s.textContent = CSS;
    document.head.appendChild(s);
  }, []);
}
function Switch({
  label,
  className = '',
  ...rest
}) {
  useCSS();
  return /*#__PURE__*/React.createElement("label", {
    className: ['rv-switch', className].filter(Boolean).join(' ')
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    role: "switch"
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "rv-switch__track"
  }), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.rv-textarea{width:100%;background:var(--surface-card);border:1px solid var(--border-default);border-radius:var(--radius-control);padding:var(--space-3);font-family:var(--font-ui);font-size:var(--text-body);line-height:var(--lh-body);color:var(--text-heading);outline:0;resize:vertical;min-height:104px;transition:border-color var(--dur-fast) var(--ease-out),box-shadow var(--dur-fast) var(--ease-out)}
.rv-textarea::placeholder{color:var(--text-subtle)}
.rv-textarea:focus{border-color:var(--border-focus);box-shadow:var(--ring-focus)}
.rv-textarea--invalid{border-color:var(--status-danger-fg)}
.rv-textarea:disabled{background:var(--surface-sunken)}
`;
let injected = false;
function useCSS() {
  React.useEffect(() => {
    if (injected) return;
    injected = true;
    const s = document.createElement('style');
    s.textContent = CSS;
    document.head.appendChild(s);
  }, []);
}
function Textarea({
  invalid,
  rows = 4,
  className = '',
  ...rest
}) {
  useCSS();
  return /*#__PURE__*/React.createElement("textarea", _extends({
    rows: rows,
    className: ['rv-textarea', invalid ? 'rv-textarea--invalid' : '', className].filter(Boolean).join(' '),
    "aria-invalid": invalid || undefined
  }, rest));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/media/Photo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.rv-photo{position:relative;overflow:hidden;background:var(--sage-100);border-radius:var(--radius-image);display:block;width:100%}
.rv-photo--square{border-radius:0}
.rv-photo__img{width:100%;height:100%;object-fit:cover;display:block}
.rv-photo__ph{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;color:var(--sage-500);background:repeating-linear-gradient(135deg,var(--sage-100) 0 10px,var(--sage-50) 10px 20px);font-size:var(--text-caption);text-align:center;padding:var(--space-3)}
.rv-photo__ph--slate{background:repeating-linear-gradient(135deg,var(--slate-100) 0 10px,var(--slate-50) 10px 20px);color:var(--slate-500)}
.rv-photo__scrim{position:absolute;inset:0;background:var(--scrim-bottom);pointer-events:none}
.rv-photo__cap{position:absolute;left:var(--space-4);right:var(--space-4);bottom:var(--space-4);color:var(--text-inverse);font-size:var(--text-small)}
`;
let injected = false;
function useCSS() {
  React.useEffect(() => {
    if (injected) return;
    injected = true;
    const s = document.createElement('style');
    s.textContent = CSS;
    document.head.appendChild(s);
  }, []);
}
function Photo({
  src,
  alt = '',
  ratio = '4 / 3',
  note = 'valódi fotó helye',
  tone = 'sage',
  scrim,
  caption,
  square,
  className = '',
  style,
  ...rest
}) {
  useCSS();
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ['rv-photo', square ? 'rv-photo--square' : '', className].filter(Boolean).join(' '),
    style: {
      aspectRatio: ratio,
      ...style
    }
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    className: "rv-photo__img",
    src: src,
    alt: alt
  }) : /*#__PURE__*/React.createElement("div", {
    className: ['rv-photo__ph', tone === 'slate' ? 'rv-photo__ph--slate' : ''].filter(Boolean).join(' ')
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "image",
    size: 18
  }), note), scrim && /*#__PURE__*/React.createElement("div", {
    className: "rv-photo__scrim"
  }), caption && /*#__PURE__*/React.createElement("div", {
    className: "rv-photo__cap"
  }, caption));
}
Object.assign(__ds_scope, { Photo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/media/Photo.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.rv-tabs{display:flex;gap:var(--space-6);border-bottom:1px solid var(--border-hairline)}
.rv-tab{appearance:none;background:none;border:0;border-bottom:2px solid transparent;margin-bottom:-1px;padding:0 0 var(--space-3);font-family:var(--font-ui);font-size:var(--text-small);font-weight:var(--weight-medium);color:var(--text-muted);cursor:pointer;display:flex;align-items:center;gap:var(--space-2);transition:color var(--dur-fast) var(--ease-out),border-color var(--dur-fast) var(--ease-out)}
.rv-tab:hover{color:var(--text-heading)}
.rv-tab[aria-selected=true]{color:var(--text-heading);border-bottom-color:var(--sage-800)}
.rv-tabs--pills{border-bottom:0;gap:var(--space-1)}
.rv-tabs--pills .rv-tab{padding:7px var(--space-4);border-radius:var(--radius-pill);border-bottom:0;margin:0}
.rv-tabs--pills .rv-tab[aria-selected=true]{background:var(--surface-muted);color:var(--text-heading)}
`;
let injected = false;
function useCSS() {
  React.useEffect(() => {
    if (injected) return;
    injected = true;
    const s = document.createElement('style');
    s.textContent = CSS;
    document.head.appendChild(s);
  }, []);
}
function Tabs({
  items = [],
  value,
  onChange,
  variant = 'underline',
  className = '',
  ...rest
}) {
  useCSS();
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "tablist",
    className: ['rv-tabs', variant === 'pills' ? 'rv-tabs--pills' : '', className].filter(Boolean).join(' ')
  }, rest), items.map(it => {
    const id = typeof it === 'string' ? it : it.value;
    const label = typeof it === 'string' ? it : it.label;
    return /*#__PURE__*/React.createElement("button", {
      key: id,
      role: "tab",
      "aria-selected": value === id,
      className: "rv-tab",
      onClick: () => onChange && onChange(id)
    }, label);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Area.jsx
try { (() => {
const {
  Button,
  Card,
  Tag,
  Icon,
  Photo,
  Input,
  Textarea,
  Field,
  Checkbox
} = window.RVDS;
function Area({
  onBook
}) {
  const things = [['waves', 'Kajak', 'Két kajak a parton, mellényekkel. Felfelé 6 km-re egy holtág, ott szinte soha senki.'], ['fish', 'Horgászat', 'Csónakkikötő a kert végében. Területi engedélyt a faluban lehet venni.'], ['bike', 'Bringa a gáton', 'Négy bicikli a fészerben, 20 km sík út a gátoldalon Gyomaendrődig.'], ['trees', 'Arborétum', '12 km, autóval negyed óra. Kora nyáron érdemes, amikor még nincs tömeg.'], ['sun', 'Termálfürdő', 'Szarvason, 15 perc. Esős napra a legjobb terv.'], ['utensils', 'Ahol enni lehet', 'Három hely, amit magunk is használunk — a listát a szobában találod.']];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Photo, {
    ratio: "21 / 9",
    square: true,
    scrim: true,
    note: "a g\xE1toldal naplement\xE9ben",
    caption: "A g\xE1toldal a h\xE1z m\xF6g\xF6tt \u2014 innen indul a bringa\xFAt.",
    style: {
      maxHeight: 420
    }
  }), /*#__PURE__*/React.createElement(Section, {
    eyebrow: "K\xF6rny\xE9k",
    title: "A foly\xF3, a g\xE1t, \xE9s ami m\xE9g belef\xE9r.",
    lead: "Semmi sincs messze, \xE9s semmit nem kell el\u0151re megszervezni. Ha k\xE9rd\xE9s van, k\xE9rdezz \u2014 helyben lakunk."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 'var(--gutter)'
    }
  }, things.map(([i, t, d]) => /*#__PURE__*/React.createElement(Card, {
    key: t
  }, /*#__PURE__*/React.createElement(Icon, {
    name: i,
    size: 22,
    color: "var(--sage-600)"
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--text-h3)',
      marginTop: 14
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--text-muted)',
      marginTop: 8,
      lineHeight: 1.6
    }
  }, d))))), /*#__PURE__*/React.createElement(Section, {
    eyebrow: "Kapcsolat",
    title: "\xCDrj, ha b\xE1rmi k\xE9rd\xE9s van."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 48,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "lg"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "N\xE9v",
    htmlFor: "c1"
  }, /*#__PURE__*/React.createElement(Input, {
    id: "c1",
    placeholder: "Kov\xE1cs Anna"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "E-mail",
    htmlFor: "c2"
  }, /*#__PURE__*/React.createElement(Input, {
    id: "c2",
    placeholder: "anna@example.hu"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Miben seg\xEDthet\xFCnk?",
    htmlFor: "c3"
  }, /*#__PURE__*/React.createElement(Textarea, {
    id: "c3",
    rows: 4,
    placeholder: "N\xE9gyen j\xF6nn\xE9nk j\xFAliusban, k\xE9t kisgyerekkel\u2026"
  })), /*#__PURE__*/React.createElement(Checkbox, {
    label: "Elolvastam az adatkezel\xE9si t\xE1j\xE9koztat\xF3t"
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg"
  }, "\xDCzenet elk\xFCld\xE9se"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(Photo, {
    ratio: "4 / 3",
    tone: "slate",
    note: "t\xE9rk\xE9p helye \u2014 a h\xE1z a K\xF6r\xF6s-parton"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      fontSize: 15
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "map-pin",
    size: 16,
    color: "var(--sage-600)"
  }), "5540 Szarvas, K\xF6r\xF6s-part 4."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "phone",
    size: 16,
    color: "var(--sage-600)"
  }), "+36 30 123 4567"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "mail",
    size: 16,
    color: "var(--sage-600)"
  }), "szia@riverside.hu"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--text-muted)',
      marginTop: 4,
      lineHeight: 1.6
    }
  }, "Budapestr\u0151l 2 \xF3ra aut\xF3val, vonattal Szarvasig, onnan elmegy\xFCnk \xE9rted az \xE1llom\xE1sra.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    icon: "car"
  }, "Ingyenes parkol\xE1s"), /*#__PURE__*/React.createElement(Tag, {
    icon: "train-front"
  }, "\xC1llom\xE1s 4 km"), /*#__PURE__*/React.createElement(Tag, {
    icon: "dog"
  }, "Kutyabar\xE1t")), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: onBook,
    iconRight: "arrow-right"
  }, "Szabad helyek megn\xE9z\xE9se")))));
}
Object.assign(window, {
  Area
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Area.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Booking.jsx
try { (() => {
const {
  Button,
  Card,
  Tag,
  Icon,
  Photo,
  Badge,
  Field,
  Input,
  Textarea,
  Select,
  Checkbox,
  Radio,
  RadioGroup,
  Switch,
  DateRangeField,
  Dialog,
  Toast
} = window.RVDS;
function Steps({
  step
}) {
  const labels = ['Időpont', 'Adatok', 'Áttekintés'];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 28,
      alignItems: 'center'
    }
  }, labels.map((l, i) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 24,
      height: 24,
      borderRadius: 'var(--radius-pill)',
      display: 'grid',
      placeItems: 'center',
      fontSize: 12,
      fontWeight: 600,
      background: i <= step ? 'var(--sage-800)' : 'var(--n-200)',
      color: i <= step ? 'var(--n-50)' : 'var(--text-muted)'
    }
  }, i + 1), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: i === step ? 'var(--text-heading)' : 'var(--text-muted)',
      fontWeight: i === step ? 500 : 400
    }
  }, l), i < 2 && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 1,
      background: 'var(--border-default)'
    }
  }))));
}
function Summary({
  room
}) {
  return /*#__PURE__*/React.createElement(Card, {
    padding: "lg",
    style: {
      position: 'sticky',
      top: 96
    }
  }, /*#__PURE__*/React.createElement(Photo, {
    ratio: "16 / 9",
    note: room + ' — fotó'
  }), /*#__PURE__*/React.createElement("h3", {
    className: "rv-display",
    style: {
      fontSize: 24,
      marginTop: 16
    }
  }, room), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--text-muted)',
      marginTop: 4
    }
  }, "4 f\u0151 \xB7 30 m\xB2 \xB7 reggelivel"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      fontSize: 14
    }
  }, [['Július 10. — július 13.', '3 éj'], ['3 éj × 46 000 Ft', '138 000 Ft'], ['Idegenforgalmi adó', '2 400 Ft']].map(([a, b]) => /*#__PURE__*/React.createElement("div", {
    key: a,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)'
    }
  }, a), /*#__PURE__*/React.createElement("span", null, b))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: 12,
      borderTop: '1px solid var(--border-hairline)',
      color: 'var(--text-heading)',
      fontWeight: 500
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xD6sszesen"), /*#__PURE__*/React.createElement("span", null, "140 400 Ft"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      fontSize: 13,
      color: 'var(--text-muted)',
      lineHeight: 1.55
    }
  }, "Ez m\xE9g csak k\xE9r\xE9s \u2014 am\xEDg nem \xEDrunk vissza, nem vonunk le semmit."));
}
function Booking({
  go
}) {
  const [step, setStep] = React.useState(0);
  const [sent, setSent] = React.useState(false);
  const [room, setRoom] = React.useState('Padlásszoba');
  const next = () => step < 2 ? setStep(step + 1) : setSent(true);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '48px 32px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "rv-eyebrow"
  }, "Foglal\xE1s"), /*#__PURE__*/React.createElement("h1", {
    className: "rv-display",
    style: {
      fontSize: 'var(--text-display-2)',
      lineHeight: 1.1,
      marginTop: 12
    }
  }, "N\xE9zz\xFCk meg, mikor j\xF6nn\xE9tek."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(Steps, {
    step: step
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 380px',
      gap: 64,
      alignItems: 'start',
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "lg"
  }, step === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 22
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Id\u0151pont",
    hint: "Minimum k\xE9t \xE9jszaka, hossz\xFA h\xE9tv\xE9g\xE9n h\xE1rom."
  }, /*#__PURE__*/React.createElement(DateRangeField, {
    fromProps: {
      defaultValue: '2026-07-10'
    },
    toProps: {
      defaultValue: '2026-07-13'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Feln\u0151tt"
  }, /*#__PURE__*/React.createElement(Select, {
    options: ['1 fő', '2 fő', '3 fő', '4 fő'],
    defaultValue: "2 f\u0151"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Gyerek",
    optional: true
  }, /*#__PURE__*/React.createElement(Select, {
    options: ['0', '1', '2', '3'],
    defaultValue: "2"
  }))), /*#__PURE__*/React.createElement(Field, {
    label: "Szoba"
  }, /*#__PURE__*/React.createElement(RadioGroup, null, [['Folyóparti szoba', '2 fő · 32 000 Ft / éj'], ['Kerti szoba', '3 fő · 38 000 Ft / éj'], ['Padlásszoba', '4 fő · 46 000 Ft / éj']].map(([n, d]) => /*#__PURE__*/React.createElement(Radio, {
    key: n,
    name: "szoba",
    label: n,
    description: d,
    checked: room === n,
    onChange: () => setRoom(n)
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    icon: "waves"
  }, "Kajak ingyenes"), /*#__PURE__*/React.createElement(Tag, {
    icon: "coffee"
  }, "Reggeli benne van"), /*#__PURE__*/React.createElement(Tag, {
    icon: "car"
  }, "Parkol\xE1s az udvarban"))), step === 1 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "N\xE9v",
    htmlFor: "b1"
  }, /*#__PURE__*/React.createElement(Input, {
    id: "b1",
    defaultValue: "Kov\xE1cs Anna"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Telefonsz\xE1m",
    htmlFor: "b2",
    optional: true,
    hint: "Csak ha vissza kell h\xEDvnunk."
  }, /*#__PURE__*/React.createElement(Input, {
    id: "b2",
    placeholder: "+36"
  }))), /*#__PURE__*/React.createElement(Field, {
    label: "E-mail",
    htmlFor: "b3"
  }, /*#__PURE__*/React.createElement(Input, {
    id: "b3",
    icon: "mail",
    defaultValue: "anna@example.hu"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Megjegyz\xE9s",
    htmlFor: "b4",
    optional: true,
    hint: "Allergia, korai \xE9rkez\xE9s, b\xE1rmi."
  }, /*#__PURE__*/React.createElement(Textarea, {
    id: "b4",
    rows: 3,
    placeholder: "K\xE9t kisgyerekkel j\xF6v\xFCnk, egy gyerek\xE1gy j\xF3 lenne."
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Fizet\xE9s"
  }, /*#__PURE__*/React.createElement(RadioGroup, null, /*#__PURE__*/React.createElement(Radio, {
    name: "fiz",
    label: "El\u0151re utal\xE1s",
    description: "Visszaigazol\xE1s ut\xE1n 3 napon bel\xFCl.",
    defaultChecked: true
  }), /*#__PURE__*/React.createElement(Radio, {
    name: "fiz",
    label: "Fizet\xE9s \xE9rkez\xE9skor",
    description: "K\xE1rty\xE1val vagy k\xE9szp\xE9nzzel."
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    label: "Kuty\xE1t is hozunk",
    description: "Kertes r\xE9sz, p\xF3r\xE1zzal."
  }), /*#__PURE__*/React.createElement(Switch, {
    label: "Sz\xF3ljatok, ha akci\xF3s h\xE9tv\xE9ge lesz"
  }))), step === 2 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 14
    }
  }, [['Időpont', '2026. július 10. — 13. (3 éj)'], ['Vendégek', '2 felnőtt, 2 gyerek'], ['Szoba', room], ['Név', 'Kovács Anna'], ['E-mail', 'anna@example.hu'], ['Fizetés', 'Előre utalás']].map(([a, b]) => /*#__PURE__*/React.createElement("div", {
    key: a,
    style: {
      display: 'grid',
      gridTemplateColumns: '160px 1fr',
      gap: 16,
      paddingBottom: 12,
      borderBottom: '1px solid var(--border-hairline)',
      fontSize: 15
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)'
    }
  }, a), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-heading)'
    }
  }, b)))), /*#__PURE__*/React.createElement(Toast, {
    tone: "info",
    tint: "light",
    title: "Mi t\xF6rt\xE9nik ezut\xE1n?"
  }, "\xC1tn\xE9zz\xFCk a napt\xE1rt, \xE9s 24 \xF3r\xE1n bel\xFCl v\xE1laszolunk e-mailben. A foglal\xE1s a v\xE1laszunkkal lesz \xE9l\u0151."), /*#__PURE__*/React.createElement(Checkbox, {
    label: "Elfogadom a h\xE1zirendet \xE9s az adatkezel\xE9si t\xE1j\xE9koztat\xF3t",
    defaultChecked: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginTop: 28,
      paddingTop: 20,
      borderTop: '1px solid var(--border-hairline)'
    }
  }, step > 0 && /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    iconLeft: "arrow-left",
    onClick: () => setStep(step - 1)
  }, "Vissza"), /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    size: "lg",
    iconRight: step < 2 ? 'arrow-right' : 'check',
    onClick: next,
    style: {
      marginLeft: 'auto'
    }
  }, step < 2 ? 'Tovább' : 'Kérés elküldése'))), /*#__PURE__*/React.createElement(Summary, {
    room: room
  })), sent && /*#__PURE__*/React.createElement(Dialog, {
    title: "Megkaptuk a k\xE9r\xE9sedet",
    onClose: () => {
      setSent(false);
      go('home');
    },
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      onClick: () => {
        setSent(false);
        go('home');
      }
    }, "Vissza a f\u0151oldalra"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      onClick: () => {
        setSent(false);
        go('area');
      }
    }, "Mit lehet itt csin\xE1lni"))
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("p", null, "J\xFAlius 10\u201313., ", room, ", 2 feln\u0151tt \xE9s 2 gyerek. K\xFCldt\xFCnk egy visszajelz\xE9st az anna@example.hu c\xEDmre."), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-muted)'
    }
  }, "24 \xF3r\xE1n bel\xFCl \xEDrunk, hogy szabad-e a szoba. Ha k\xF6zben v\xE1ltozik valami, el\xE9g egy telefon."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "success",
    icon: "check"
  }, "K\xE9r\xE9s r\xF6gz\xEDtve"), /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral"
  }, "Azonos\xEDt\xF3: RV-2026-0714")))));
}
Object.assign(window, {
  Booking
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Booking.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Home.jsx
try { (() => {
const {
  Button,
  Card,
  Tag,
  Icon,
  Photo,
  DateRangeField,
  Select,
  Badge
} = window.RVDS;
function BookingBar({
  onBook
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-hairline)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-md)',
      padding: 16,
      display: 'grid',
      gridTemplateColumns: '1.4fr .7fr auto',
      gap: 12,
      alignItems: 'end'
    }
  }, /*#__PURE__*/React.createElement(DateRangeField, {
    fromProps: {
      defaultValue: '2026-07-10'
    },
    toProps: {
      defaultValue: '2026-07-13'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "rv-eyebrow"
  }, "Vend\xE9gek"), /*#__PURE__*/React.createElement(Select, {
    options: ['2 fő', '3 fő', '4 fő', '5 fő', '6 fő'],
    defaultValue: "4 f\u0151"
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    size: "lg",
    iconRight: "arrow-right",
    onClick: onBook
  }, "Szabad helyek"));
}
function Hero({
  onBook,
  go
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(Photo, {
    ratio: "21 / 9",
    square: true,
    scrim: true,
    note: "hero fot\xF3 \u2014 a h\xE1z a foly\xF3 fel\u0151l, kora reggel",
    style: {
      minHeight: 520
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      width: '100%',
      padding: '0 32px 64px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: '20ch'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "rv-eyebrow",
    style: {
      color: 'rgba(251,249,245,.78)'
    }
  }, "Vend\xE9gh\xE1z a K\xF6r\xF6s partj\xE1n"), /*#__PURE__*/React.createElement("h1", {
    className: "rv-display",
    style: {
      color: 'var(--text-inverse)',
      fontSize: 'var(--text-display-1)',
      lineHeight: 'var(--lh-display-1)',
      letterSpacing: 'var(--ls-display-1)',
      marginTop: 14
    }
  }, "P\xE1r nap a foly\xF3 mellett.")), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'rgba(251,249,245,.86)',
      fontSize: 'var(--text-lead)',
      lineHeight: 1.55,
      maxWidth: '44ch',
      marginTop: 18
    }
  }, "N\xE9gy szoba, nagy kert, medence \xE9s k\xE9t kajak a parton. Nem sz\xE1lloda \u2014 ink\xE1bb egy h\xE1z, ahol p\xE1r napra ti\xE9tek a temp\xF3."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    size: "lg",
    onClick: onBook
  }, "Foglal\xE1s"), /*#__PURE__*/React.createElement(Button, {
    variant: "inverse",
    size: "lg",
    onClick: () => go('rooms')
  }, "Szob\xE1k megtekint\xE9se")))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '-36px auto 0',
      padding: '0 32px',
      position: 'relative',
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement(BookingBar, {
    onBook: onBook
  })));
}
function Intro() {
  return /*#__PURE__*/React.createElement(Section, {
    eyebrow: "Mi ez a hely",
    title: "Egy h\xE1z, ami nem akar t\xF6bb lenni, mint ami."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 48,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 18,
      fontSize: 'var(--text-body)',
      lineHeight: 'var(--lh-body)',
      maxWidth: 'var(--measure-body)'
    }
  }, /*#__PURE__*/React.createElement("p", null, "A h\xE1z a nagysz\xFCleim\xE9 volt, a kert v\xE9g\xE9ben \xE9r v\xE9get a vil\xE1g \xE9s kezd\u0151dik a K\xF6r\xF6s. Kifestett\xFCk, kicser\xE9lt\xFCk az \xE1gyakat, de a l\xE9nyeget meghagytuk: csend, \xE1rny\xE9k, v\xEDz."), /*#__PURE__*/React.createElement("p", null, "Reggeli a kerti asztaln\xE1l, d\xE9lut\xE1n kajak vagy horg\xE1sz\xE1s, este grill. Nincs recepci\xF3, nincs k\xE1rty\xE1s ajt\xF3 \u2014 mi nyitunk kaput, \xE9s ott vagyunk, ha kell valami."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      flexWrap: 'wrap',
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    icon: "waves"
  }, "Kajak"), /*#__PURE__*/React.createElement(Tag, {
    icon: "fish"
  }, "Horg\xE1szat"), /*#__PURE__*/React.createElement(Tag, {
    icon: "waves"
  }, "Medence"), /*#__PURE__*/React.createElement(Tag, {
    icon: "trees"
  }, "Kert"), /*#__PURE__*/React.createElement(Tag, {
    icon: "flame"
  }, "Grill"), /*#__PURE__*/React.createElement(Tag, {
    icon: "wifi"
  }, "Wi-Fi"), /*#__PURE__*/React.createElement(Tag, {
    icon: "dog"
  }, "Kutyabar\xE1t"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Photo, {
    ratio: "3 / 4",
    note: "kert, hossz\xFA asztal"
  }), /*#__PURE__*/React.createElement(Photo, {
    ratio: "3 / 4",
    tone: "slate",
    note: "cs\xF3nak a parton",
    style: {
      marginTop: 32
    }
  }))));
}
const ROOMS = [{
  name: 'Folyóparti szoba',
  size: '2 fő · 18 m²',
  price: '32 000 Ft',
  tags: ['Franciaágy', 'Folyóra néző'],
  note: 'Két nagy ablak a víz felé.'
}, {
  name: 'Kerti szoba',
  size: '3 fő · 22 m²',
  price: '38 000 Ft',
  tags: ['Pótágy', 'Kertre néző'],
  note: 'Közvetlen kijárás a kertbe.'
}, {
  name: 'Padlásszoba',
  size: '4 fő · 30 m²',
  price: '46 000 Ft',
  tags: ['Családi', 'Tetőablak'],
  note: 'Két külön tér, gyerekeknek jó.'
}];
function RoomTeasers({
  go
}) {
  return /*#__PURE__*/React.createElement(Section, {
    eyebrow: "Szob\xE1k",
    title: "N\xE9gy szoba, mind m\xE1s.",
    lead: "Mindegyikben saj\xE1t f\xFCrd\u0151, j\xF3 matrac \xE9s el\xE9g hely a pakol\xE1shoz. Az \xE1rak reggelivel \xE9rtend\u0151k."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 'var(--gutter)'
    }
  }, ROOMS.map(r => /*#__PURE__*/React.createElement(Card, {
    key: r.name,
    interactive: true,
    padding: "md",
    onClick: () => go('room'),
    media: /*#__PURE__*/React.createElement(Photo, {
      ratio: "4 / 3",
      square: true,
      note: r.name + ' — fotó'
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 12,
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    className: "rv-display",
    style: {
      fontSize: 24
    }
  }, r.name), /*#__PURE__*/React.createElement(Badge, {
    tone: "success"
  }, "Szabad")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--text-muted)',
      marginTop: 4
    }
  }, r.size), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--text-body)',
      marginTop: 10
    }
  }, r.note), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 6,
      marginTop: 16,
      paddingTop: 14,
      borderTop: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 22,
      color: 'var(--text-heading)'
    }
  }, r.price), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, "/ \xE9j"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 14,
      color: 'var(--text-link)'
    }
  }, "R\xE9szletek", /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right",
    size: 14
  })))))));
}
function Quote() {
  return /*#__PURE__*/React.createElement(Section, {
    narrow: true,
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "rv-display",
    style: {
      fontSize: 'var(--text-display-3)',
      lineHeight: 1.35,
      color: 'var(--text-heading)'
    }
  }, "\u201EAzt hitt\xFCk, k\xE9t napot b\xEDrunk ki net n\xE9lk\xFCl. N\xE9gy lett bel\u0151le, \xE9s a gyerekek a foly\xF3t nem akart\xE1k otthagyni.\u201D"), /*#__PURE__*/React.createElement("footer", {
    style: {
      marginTop: 18,
      fontSize: 14,
      color: 'var(--text-muted)'
    }
  }, "Eszter \xE9s M\xE1t\xE9 \u2014 2025 augusztus")));
}
function AreaStrip({
  go
}) {
  const items = [{
    icon: 'waves',
    t: 'Kajak a házból',
    d: 'Két kajak, mellények, a parton. Felfelé 6 km-re van egy csendes kanyar.'
  }, {
    icon: 'fish',
    t: 'Horgászat',
    d: 'Területi engedélyt a faluban lehet venni, szólj és elmegyünk érte.'
  }, {
    icon: 'bike',
    t: 'Bicikli',
    d: 'Négy bringa a fészerben, a gátoldalon 20 km sík út.'
  }];
  return /*#__PURE__*/React.createElement(Section, {
    eyebrow: "K\xF6rny\xE9k",
    title: "Amit a h\xE1z k\xF6r\xFCl lehet kezdeni."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 'var(--gutter)'
    }
  }, items.map(i => /*#__PURE__*/React.createElement("div", {
    key: i.t,
    style: {
      borderTop: '1px solid var(--border-default)',
      paddingTop: 20
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: i.icon,
    size: 24,
    color: "var(--sage-600)"
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--text-h3)',
      marginTop: 14
    }
  }, i.t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--text-muted)',
      marginTop: 8,
      lineHeight: 1.6
    }
  }, i.d)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    iconRight: "arrow-right",
    onClick: () => go('area')
  }, "Mit lehet itt csin\xE1lni")));
}
function CtaBand({
  onBook
}) {
  return /*#__PURE__*/React.createElement(Section, {
    style: {
      marginTop: 'var(--section-y)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-muted)',
      borderRadius: 'var(--radius-lg)',
      padding: '56px 48px',
      display: 'flex',
      gap: 32,
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "rv-display",
    style: {
      fontSize: 'var(--text-display-3)'
    }
  }, "N\xE9zd meg, mikor van hely."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 10,
      color: 'var(--text-muted)',
      maxWidth: '46ch'
    }
  }, "\xCDrj vagy telefon\xE1lj \u2014 a napt\xE1rt mi vezetj\xFCk, \xE9s 24 \xF3r\xE1n bel\xFCl v\xE1laszolunk.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    onClick: onBook
  }, "Foglal\xE1s ind\xEDt\xE1sa"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "lg",
    iconLeft: "phone"
  }, "+36 30 123 4567"))));
}
function Home({
  go,
  onBook
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Hero, {
    onBook: onBook,
    go: go
  }), /*#__PURE__*/React.createElement(Intro, null), /*#__PURE__*/React.createElement(RoomTeasers, {
    go: go
  }), /*#__PURE__*/React.createElement(Quote, null), /*#__PURE__*/React.createElement(AreaStrip, {
    go: go
  }), /*#__PURE__*/React.createElement(CtaBand, {
    onBook: onBook
  }));
}
Object.assign(window, {
  Home,
  BookingBar,
  ROOMS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/RoomDetail.jsx
try { (() => {
const {
  Button,
  Card,
  Tag,
  Icon,
  Photo,
  Badge,
  Tabs,
  DateRangeField,
  Select,
  Tooltip
} = window.RVDS;
function RoomDetail({
  go,
  onBook
}) {
  const [tab, setTab] = React.useState('A szoba');
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '24px 32px 0'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => go('rooms'),
    style: {
      appearance: 'none',
      background: 'none',
      border: 0,
      padding: 0,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontSize: 14,
      color: 'var(--text-muted)',
      fontFamily: 'var(--font-ui)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-left",
    size: 14
  }), "Vissza a szob\xE1khoz")), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '20px auto 0',
      padding: '0 32px',
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Photo, {
    ratio: "4 / 3",
    note: "padl\xE1sszoba \u2014 f\u0151 fot\xF3"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Photo, {
    ratio: "4 / 3",
    tone: "slate",
    note: "tet\u0151ablak"
  }), /*#__PURE__*/React.createElement(Photo, {
    ratio: "4 / 3",
    note: "f\xFCrd\u0151"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '48px auto 0',
      padding: '0 32px',
      display: 'grid',
      gridTemplateColumns: '1fr 380px',
      gap: 64,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    className: "rv-display",
    style: {
      fontSize: 'var(--text-display-2)',
      lineHeight: 1.1
    }
  }, "Padl\xE1sszoba"), /*#__PURE__*/React.createElement(Badge, {
    tone: "warning",
    icon: "clock"
  }, "El\u0151jegyz\xE9s")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      color: 'var(--text-muted)',
      marginTop: 8
    }
  }, "4 f\u0151 \xB7 30 m\xB2 \xB7 k\xE9t k\xFCl\xF6n t\xE9r \xB7 tet\u0151ablak"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    items: ['A szoba', 'Felszereltség', 'Ház szabályai'],
    value: tab,
    onChange: setTab
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24,
      maxWidth: 'var(--measure-body)',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      fontSize: 'var(--text-body)',
      lineHeight: 'var(--lh-body)'
    }
  }, tab === 'A szoba' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", null, "A tet\u0151t\xE9r eg\xE9sz\xE9t elfoglalja: egy nagyobb \xE9s egy kisebb t\xE9r, k\xF6z\xF6tt\xFCk alacsony \xE1tj\xE1r\xF3. A gyerekek rendszerint a h\xE1ts\xF3 r\xE9szt v\xE1lasztj\xE1k, mert onnan l\xE1tszik a foly\xF3."), /*#__PURE__*/React.createElement("p", null, "Ny\xE1ron a tet\u0151ablakok \xE9jszak\xE1ra nyitva hagyhat\xF3k, sz\xFAnyogh\xE1l\xF3val. Van ventil\xE1tor, kl\xEDma nincs \u2014 a h\xE1z vastag falai miatt eddig nem kellett."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    icon: "bed-double"
  }, "2 francia\xE1gy"), /*#__PURE__*/React.createElement(Tag, {
    icon: "bath"
  }, "Saj\xE1t f\xFCrd\u0151, zuhany"), /*#__PURE__*/React.createElement(Tag, {
    icon: "wifi"
  }, "Wi-Fi"), /*#__PURE__*/React.createElement(Tag, {
    icon: "coffee"
  }, "Reggeli"), /*#__PURE__*/React.createElement(Tag, {
    icon: "baby"
  }, "Gyerek\xE1gy k\xE9r\xE9sre"))), tab === 'Felszereltség' && /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      paddingLeft: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, ['Két franciaágy, jó matracok', 'Saját fürdő zuhanyzóval, hajszárító', 'Szekrény, fiókok, elég fogas', 'Asztal két székkel, olvasólámpák', 'Ventilátor, szúnyoghálós tetőablakok', 'Törölköző, ágynemű, alapvető tisztálkodószerek'].map(x => /*#__PURE__*/React.createElement("li", {
    key: x
  }, x))), tab === 'Ház szabályai' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("p", null, "\xC9rkez\xE9s 15:00-t\xF3l, t\xE1voz\xE1s 10:00-ig. Ha cs\xFAszik a vonat vagy a forgalom, egy telefon el\xE9g."), /*#__PURE__*/React.createElement("p", null, "22:00 ut\xE1n csendet k\xE9r\xFCnk a kertben is \u2014 a szomsz\xE9dok kor\xE1n kelnek, \xE9s mi is."), /*#__PURE__*/React.createElement("p", null, "A kutya j\xF6het, a kertes r\xE9szen. Doh\xE1nyozni a h\xE1z el\u0151tt lehet.")))), /*#__PURE__*/React.createElement(Card, {
    style: {
      position: 'sticky',
      top: 96
    },
    padding: "lg"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 34,
      color: 'var(--text-heading)'
    }
  }, "46 000 Ft"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: 'var(--text-muted)'
    }
  }, "/ \xE9j, reggelivel")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18,
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(DateRangeField, {
    fromProps: {
      defaultValue: '2026-07-10'
    },
    toProps: {
      defaultValue: '2026-07-13'
    }
  }), /*#__PURE__*/React.createElement(Select, {
    options: ['2 fő', '3 fő', '4 fő'],
    defaultValue: "4 f\u0151"
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    size: "lg",
    block: true,
    onClick: onBook
  }, "Foglal\xE1s ind\xEDt\xE1sa")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      paddingTop: 18,
      borderTop: '1px solid var(--border-hairline)',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      fontSize: 14,
      color: 'var(--text-body)'
    }
  }, [['3 éj × 46 000 Ft', '138 000 Ft'], ['Idegenforgalmi adó', '2 400 Ft'], ['Takarítás', 'nincs']].map(([a, b]) => /*#__PURE__*/React.createElement("div", {
    key: a,
    style: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)'
    }
  }, a), /*#__PURE__*/React.createElement("span", null, b))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontWeight: 500,
      color: 'var(--text-heading)',
      paddingTop: 10,
      borderTop: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xD6sszesen"), /*#__PURE__*/React.createElement("span", null, "140 400 Ft"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement(Tooltip, {
    label: "A foglal\xE1s csak a v\xE1laszunk ut\xE1n \xE9l"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "info",
    size: 14
  }))), "K\xE9r\xE9s elk\xFCld\xE9se ut\xE1n 24 \xF3r\xE1n bel\xFCl vissza\xEDrunk."))));
}
Object.assign(window, {
  RoomDetail
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/RoomDetail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Rooms.jsx
try { (() => {
const {
  Button,
  Card,
  Tag,
  Icon,
  Photo,
  Badge,
  Tabs,
  Checkbox
} = window.RVDS;
const ALL_ROOMS = [{
  name: 'Folyóparti szoba',
  size: '2 fő · 18 m²',
  price: '32 000 Ft',
  beds: 'Franciaágy',
  view: 'Folyóra néző',
  state: 'free',
  note: 'Két nagy ablak a víz felé, reggel itt kel fel a nap.'
}, {
  name: 'Kerti szoba',
  size: '3 fő · 22 m²',
  price: '38 000 Ft',
  beds: 'Franciaágy + pótágy',
  view: 'Kertre néző',
  state: 'free',
  note: 'Közvetlen kijárás a kertbe, saját terasz két székkel.'
}, {
  name: 'Padlásszoba',
  size: '4 fő · 30 m²',
  price: '46 000 Ft',
  beds: '2 franciaágy',
  view: 'Tetőablak',
  state: 'hold',
  note: 'Két külön tér, gyerekekkel ez a legjobb választás.'
}, {
  name: 'Kis szoba',
  size: '2 fő · 14 m²',
  price: '28 000 Ft',
  beds: '2 külön ágy',
  view: 'Udvarra néző',
  state: 'full',
  note: 'A ház legcsendesebb sarka, hosszabb tartózkodásra.'
}];
const STATE = {
  free: ['success', 'Szabad'],
  hold: ['warning', 'Előjegyzés'],
  full: ['danger', 'Betelt']
};
function Rooms({
  go,
  onBook
}) {
  const [filter, setFilter] = React.useState('Mind');
  const [onlyFree, setOnlyFree] = React.useState(false);
  const list = ALL_ROOMS.filter(r => (!onlyFree || r.state === 'free') && (filter === 'Mind' || (filter === '2 fő' ? r.size.startsWith('2') : filter === 'Család' ? !r.size.startsWith('2') : true)));
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Section, {
    eyebrow: "Szob\xE1k \xE9s \xE1rak",
    title: "N\xE9gy szoba, reggelivel.",
    lead: "Az \xE1rak k\xE9t f\u0151re, reggelivel \xE9rtend\u0151k. P\xF3t\xE1gy 6 000 Ft / \xE9j. Minimum k\xE9t \xE9jszaka, hossz\xFA h\xE9tv\xE9g\xE9n h\xE1rom."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 24,
      flexWrap: 'wrap',
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    variant: "pills",
    items: ['Mind', '2 fő', 'Család'],
    value: filter,
    onChange: setFilter
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "Csak a szabad szob\xE1k",
    checked: onlyFree,
    onChange: e => setOnlyFree(e.target.checked)
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      fontSize: 14,
      color: 'var(--text-muted)'
    }
  }, list.length, " szoba")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, list.map(r => /*#__PURE__*/React.createElement(Card, {
    key: r.name,
    padding: "none"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '300px 1fr 230px',
      minHeight: 200
    }
  }, /*#__PURE__*/React.createElement(Photo, {
    ratio: "auto",
    square: true,
    note: r.name,
    style: {
      height: '100%'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--pad-card-lg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    className: "rv-display",
    style: {
      fontSize: 26
    }
  }, r.name), /*#__PURE__*/React.createElement(Badge, {
    tone: STATE[r.state][0]
  }, STATE[r.state][1])), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--text-muted)',
      marginTop: 6
    }
  }, r.size), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15,
      marginTop: 12,
      maxWidth: '48ch'
    }
  }, r.note), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap',
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    icon: "bed-double"
  }, r.beds), /*#__PURE__*/React.createElement(Tag, {
    icon: "eye"
  }, r.view), /*#__PURE__*/React.createElement(Tag, {
    icon: "bath"
  }, "Saj\xE1t f\xFCrd\u0151"))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderLeft: '1px solid var(--border-hairline)',
      padding: 'var(--pad-card-lg)',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      justifyContent: 'center',
      background: 'var(--n-50)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 30,
      color: 'var(--text-heading)'
    }
  }, r.price), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: 'var(--text-muted)'
    }
  }, " / \xE9j")), /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    block: true,
    disabled: r.state === 'full',
    onClick: onBook
  }, r.state === 'full' ? 'Betelt' : 'Foglalás'), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    block: true,
    onClick: () => go('room')
  }, "R\xE9szletek"))))))), /*#__PURE__*/React.createElement(Section, {
    eyebrow: "J\xF3 tudni",
    title: "Amit a foglal\xE1s el\u0151tt \xE9rdemes \xE1tfutni."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 'var(--gutter)'
    }
  }, [['clock', 'Érkezés', '15:00-tól, távozás 10:00-ig. Ha csúszik, szólj.'], ['credit-card', 'Fizetés', 'Előre utalás vagy fizetés érkezéskor, kártyával is.'], ['dog', 'Kutya', 'Jöhet, a kertes részen. Szobában nem alszik.'], ['ban', 'Csendes ház', 'Nincs buli, nincs hangos zene 22:00 után.']].map(([i, t, d]) => /*#__PURE__*/React.createElement(Card, {
    key: t,
    variant: "muted"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: i,
    size: 20,
    color: "var(--sage-600)"
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--text-h3)',
      marginTop: 12
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--text-muted)',
      marginTop: 6
    }
  }, d))))));
}
Object.assign(window, {
  Rooms,
  ALL_ROOMS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Rooms.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Shell.jsx
try { (() => {
const {
  Button,
  Icon,
  Photo
} = window.RVDS;
function NavLink({
  label,
  active,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      appearance: 'none',
      background: 'none',
      border: 0,
      padding: '4px 0',
      cursor: 'pointer',
      fontFamily: 'var(--font-ui)',
      fontSize: 15,
      color: active ? 'var(--text-heading)' : 'var(--text-body)',
      borderBottom: active ? '1px solid var(--sage-800)' : '1px solid transparent'
    }
  }, label);
}
function Header({
  page,
  go,
  onBook
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 30,
      height: 'var(--header-h)',
      background: 'rgba(251,249,245,.9)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      height: '100%',
      padding: '0 32px',
      display: 'flex',
      alignItems: 'center',
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => go('home'),
    style: {
      appearance: 'none',
      background: 'none',
      border: 0,
      cursor: 'pointer',
      padding: 0,
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 26,
      letterSpacing: '-0.01em',
      color: 'var(--text-heading)'
    }
  }, "Riverside"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 10,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: 'var(--text-subtle)',
      marginTop: -2
    }
  }, "K\xF6r\xF6s-vid\xE9k")), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 26,
      marginLeft: 12
    }
  }, /*#__PURE__*/React.createElement(NavLink, {
    label: "Szob\xE1k",
    active: page === 'rooms' || page === 'room',
    onClick: () => go('rooms')
  }), /*#__PURE__*/React.createElement(NavLink, {
    label: "K\xF6rny\xE9k",
    active: page === 'area',
    onClick: () => go('area')
  }), /*#__PURE__*/React.createElement(NavLink, {
    label: "\xC1rak",
    onClick: () => go('rooms')
  }), /*#__PURE__*/React.createElement(NavLink, {
    label: "Kapcsolat",
    onClick: () => go('area')
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      fontSize: 14,
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "phone",
    size: 15
  }), "+36 30 123 4567"), /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    onClick: onBook
  }, "Foglal\xE1s"))));
}
function Footer({
  go
}) {
  const col = {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    fontSize: 14,
    color: 'rgba(251,249,245,.72)'
  };
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--surface-inverse)',
      color: 'var(--text-inverse)',
      marginTop: 'var(--section-y)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '64px 32px 40px',
      display: 'grid',
      gridTemplateColumns: '1.6fr 1fr 1fr 1fr',
      gap: 40
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 30
    }
  }, "Riverside"), /*#__PURE__*/React.createElement("p", {
    style: {
      ...col,
      marginTop: 12,
      maxWidth: '32ch',
      lineHeight: 1.6
    }
  }, "Csal\xE1di vend\xE9gh\xE1z a K\xF6r\xF6s partj\xE1n. N\xE9gy szoba, egy nagy kert, csend \xE9s v\xEDz \u2014 p\xE1r napra kiszakadni a mindennapokb\xF3l.")), /*#__PURE__*/React.createElement("div", {
    style: col
  }, /*#__PURE__*/React.createElement("span", {
    className: "rv-eyebrow",
    style: {
      color: 'rgba(251,249,245,.5)'
    }
  }, "H\xE1z"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      go('rooms');
    },
    style: {
      color: 'inherit'
    }
  }, "Szob\xE1k \xE9s \xE1rak"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      go('area');
    },
    style: {
      color: 'inherit'
    }
  }, "K\xF6rny\xE9k"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: 'inherit'
    }
  }, "H\xE1zirend")), /*#__PURE__*/React.createElement("div", {
    style: col
  }, /*#__PURE__*/React.createElement("span", {
    className: "rv-eyebrow",
    style: {
      color: 'rgba(251,249,245,.5)'
    }
  }, "Kapcsolat"), /*#__PURE__*/React.createElement("span", null, "+36 30 123 4567"), /*#__PURE__*/React.createElement("span", null, "szia@riverside.hu"), /*#__PURE__*/React.createElement("span", null, "5540 Szarvas, K\xF6r\xF6s-part 4.")), /*#__PURE__*/React.createElement("div", {
    style: col
  }, /*#__PURE__*/React.createElement("span", {
    className: "rv-eyebrow",
    style: {
      color: 'rgba(251,249,245,.5)'
    }
  }, "K\xF6vess minket"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "instagram",
    size: 18
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "facebook",
    size: 18
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "mail",
    size: 18
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--border-inverse)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '18px 32px',
      fontSize: 13,
      color: 'rgba(251,249,245,.5)',
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Riverside Vend\xE9gh\xE1z"), /*#__PURE__*/React.createElement("span", null, "Adatkezel\xE9s \xB7 S\xFCti be\xE1ll\xEDt\xE1sok"))));
}
function Section({
  eyebrow,
  title,
  lead,
  children,
  narrow,
  style
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: narrow ? 'var(--container-narrow)' : 'var(--container-max)',
      margin: '0 auto',
      padding: '0 32px',
      marginTop: 'var(--section-y)',
      ...style
    }
  }, (eyebrow || title) && /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: '60ch',
      marginBottom: 32
    }
  }, eyebrow && /*#__PURE__*/React.createElement("div", {
    className: "rv-eyebrow",
    style: {
      marginBottom: 12
    }
  }, eyebrow), title && /*#__PURE__*/React.createElement("h2", {
    className: "rv-display",
    style: {
      fontSize: 'var(--text-display-2)',
      lineHeight: 'var(--lh-display-2)',
      letterSpacing: 'var(--ls-display-2)'
    }
  }, title), lead && /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 14,
      fontSize: 'var(--text-lead)',
      lineHeight: 'var(--lh-lead)',
      color: 'var(--text-muted)',
      maxWidth: 'var(--measure-body)'
    }
  }, lead)), children);
}
Object.assign(window, {
  Header,
  Footer,
  Section,
  NavLink
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Shell.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.DateRangeField = __ds_scope.DateRangeField;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.RadioGroup = __ds_scope.RadioGroup;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Photo = __ds_scope.Photo;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
