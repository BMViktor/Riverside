import * as React from 'react';

export interface TooltipProps extends React.HTMLAttributes<HTMLSpanElement> {
  label: React.ReactNode;
  placement?: 'top' | 'bottom' | 'right';
  children?: React.ReactNode;
}
export declare function Tooltip(props: TooltipProps): React.JSX.Element;
