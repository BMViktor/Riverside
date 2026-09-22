import * as React from 'react';

/**
 * Label + hint + error wrapper shared by every form control.
 * @startingPoint section="Forms" subtitle="Inputs, selects, choices and switches" viewport="700x320"
 */
export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  htmlFor?: string;
  hint?: string;
  error?: string;
  /** Appends the brand's " — nem kötelező" suffix instead of an asterisk. */
  optional?: boolean;
  children?: React.ReactNode;
}
export declare function Field(props: FieldProps): React.JSX.Element;
