import * as React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'accent';
  /** Optional leading Lucide icon. */
  icon?: string;
  children?: React.ReactNode;
}
export declare function Badge(props: BadgeProps): React.JSX.Element;
