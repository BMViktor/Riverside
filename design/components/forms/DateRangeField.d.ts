import * as React from 'react';

/** Arrival/departure pair used by every booking surface. */
export interface DateRangeFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  fromLabel?: string;
  toLabel?: string;
  fromProps?: React.InputHTMLAttributes<HTMLInputElement>;
  toProps?: React.InputHTMLAttributes<HTMLInputElement>;
}
export declare function DateRangeField(props: DateRangeFieldProps): React.JSX.Element;
