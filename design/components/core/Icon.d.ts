import * as React from 'react';

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Lucide icon name, kebab-case (e.g. "waves", "tent-tree", "fish"). */
  name: string;
  /** Rendered box in px. 16 inline with small text, 20 default, 24 standalone. */
  size?: number;
  /** Stroke width. Keep 1.5 — the brand never mixes weights. */
  strokeWidth?: number;
  color?: string;
  /** Accessible name. Omit for purely decorative icons. */
  label?: string;
}
export declare function Icon(props: IconProps): React.JSX.Element;
