import * as React from 'react';

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  description?: string;
}
export declare function Radio(props: RadioProps): React.JSX.Element;

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Lay the options out horizontally. */
  row?: boolean;
  children?: React.ReactNode;
}
export declare function RadioGroup(props: RadioGroupProps): React.JSX.Element;
