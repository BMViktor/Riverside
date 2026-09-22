import * as React from 'react';

export interface SelectOption { value: string; label: string }
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  size?: 'sm' | 'md' | 'lg';
  /** Convenience list; strings or {value,label}. Ignored if children are given. */
  options?: Array<string | SelectOption>;
}
export declare function Select(props: SelectProps): React.JSX.Element;
