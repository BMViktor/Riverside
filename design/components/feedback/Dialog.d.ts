import * as React from 'react';

/**
 * Modal sheet — booking confirmation, gallery, policy details.
 * @startingPoint section="Feedback" subtitle="Dialog, toast and tooltip" viewport="700x340"
 */
export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  title?: React.ReactNode;
  onClose?: () => void;
  /** Action row, right-aligned. */
  footer?: React.ReactNode;
  /** 720px instead of 480px. */
  wide?: boolean;
  children?: React.ReactNode;
}
export declare function Dialog(props: DialogProps): React.JSX.Element | null;
