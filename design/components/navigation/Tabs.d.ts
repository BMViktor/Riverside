import * as React from 'react';

export interface TabItem { value: string; label: React.ReactNode }
/**
 * Section switcher used on room detail pages and the host dashboard.
 * @startingPoint section="Navigation" subtitle="Tabs — underline and pill variants" viewport="700x150"
 */
export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: Array<string | TabItem>;
  value?: string;
  onChange?: (value: string) => void;
  variant?: 'underline' | 'pills';
}
export declare function Tabs(props: TabsProps): React.JSX.Element;
