import * as React from 'react';

/**
 * Riverside button. Primary = deep pine, used once per view; accent = clay,
 * reserved for booking ("Foglalás") calls to action.
 * @startingPoint section="Core" subtitle="Buttons, tags, badges and cards" viewport="700x260"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'accent' | 'inverse';
  size?: 'sm' | 'md' | 'lg';
  /** Full-width — forms and mobile only. */
  block?: boolean;
  /** Lucide icon name rendered before the label. */
  iconLeft?: string;
  /** Lucide icon name rendered after the label. */
  iconRight?: string;
  /** Renders an <a> instead of a <button>. */
  href?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}
export declare function Button(props: ButtonProps): React.JSX.Element;
