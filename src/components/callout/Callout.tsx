import type { ReactNode } from 'react';
import './callout.scss';

type CalloutTone = 'info' | 'warning' | 'success' | 'danger';

type CalloutProps = {
  /** Callout title */
  title?: string;
  /** Visual tone of the callout */
  tone?: CalloutTone;
  /** Callout content */
  children: ReactNode;
  /** Additional class name */
  className?: string;
  
  /** Render as an alert for important messages */
  asAlert?: boolean;
};

/**
 * Callout component for displaying highlighted information
 * @example
 * <Callout title="Note" tone="info">
 *   This is an informational callout
 * </Callout>
 * 
 * @example
 * // As an alert
 * <Callout title="Warning" tone="warning" asAlert>
 *   This is an important warning
 * </Callout>
 */
export const Callout = ({
  title,
  tone = 'info',
  children,
  className = '',
  asAlert = false,
}: CalloutProps) => {
  const baseClass = 'c-callout';
  const modifier = tone !== 'info' ? ` ${baseClass}--${tone}` : '';
  const classes = `${baseClass}${modifier} ${className}`.trim();
  
  const Element = asAlert ? 'div' : 'aside';
  const role = asAlert ? 'alert' : 'note';
  const ariaLive = asAlert ? 'assertive' : undefined;

  return (
    <Element 
      className={classes} 
      role={role}
      aria-live={ariaLive}
      aria-atomic={asAlert}
    >
      {title && <h3 className="c-callout__title">{title}</h3>}
      <div className="c-callout__content">{children}</div>
    </Element>
  );
};

export default Callout;
