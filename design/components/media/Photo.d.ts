import * as React from 'react';

/**
 * Intentional addition: Riverside is photography-led but ships with no imagery,
 * so every image slot renders an explicit "valódi fotó helye" placeholder until
 * a real photo is dropped in.
 * @startingPoint section="Media" subtitle="Photo slots and scrim treatment" viewport="700x300"
 */
export interface PhotoProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  /** CSS aspect-ratio string. 4/3 cards, 16/9 wide, 3/4 portrait, 21/9 hero band. */
  ratio?: string;
  /** Placeholder caption shown when src is absent. */
  note?: string;
  tone?: 'sage' | 'slate';
  /** Bottom-up protection gradient for text over the image. */
  scrim?: boolean;
  caption?: React.ReactNode;
  /** Drop the radius (full-bleed bands). */
  square?: boolean;
}
export declare function Photo(props: PhotoProps): React.JSX.Element;
