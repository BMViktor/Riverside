import * as React from 'react';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Lucide icon name. */
  icon: string;
  variant?: 'plain' | 'outline' | 'inverse';
  size?: 'sm' | 'md';
  /** Pill shape — use for controls floating over photography. */
  round?: boolean;
  /** Required accessible name. */
  label: string;
}
export declare function IconButton(props: IconButtonProps): React.JSX.Element;
