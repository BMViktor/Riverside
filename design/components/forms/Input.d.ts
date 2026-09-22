import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  size?: 'sm' | 'md' | 'lg';
  /** Leading Lucide icon name. */
  icon?: string;
  /** Trailing static text (e.g. "fő", "Ft"). */
  suffix?: string;
  invalid?: boolean;
}
export declare function Input(props: InputProps): React.JSX.Element;
