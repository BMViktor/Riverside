import * as React from 'react';

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: 'success' | 'info' | 'warning' | 'danger';
  title?: React.ReactNode;
  /** Anthracite (default) or white-on-hairline. */
  tint?: 'dark' | 'light';
  onClose?: () => void;
  children?: React.ReactNode;
}
export declare function Toast(props: ToastProps): React.JSX.Element;
