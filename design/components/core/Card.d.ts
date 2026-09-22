import * as React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'plain' | 'muted' | 'raised';
  /** Renders a <button> with hover lift — room cards, activity cards. */
  interactive?: boolean;
  padding?: 'none' | 'md' | 'lg';
  /** Full-bleed media slot rendered above the body (photo, map, gallery). */
  media?: React.ReactNode;
  children?: React.ReactNode;
}
export declare function Card(props: CardProps): React.JSX.Element;
