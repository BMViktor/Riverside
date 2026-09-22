import * as React from 'react';

export interface TagProps extends React.HTMLAttributes<HTMLElement> {
  /** Leading Lucide icon — typical for amenities (wifi, waves, flame). */
  icon?: string;
  variant?: 'outline' | 'filled';
  /** Renders as a toggle button when provided. */
  onSelect?: (e: React.MouseEvent) => void;
  selected?: boolean;
  /** Adds a remove affordance (filter chips). */
  onRemove?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
}
export declare function Tag(props: TagProps): React.JSX.Element;
