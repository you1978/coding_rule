import type { ReactNode } from "react";
import "./callout.scss";

type CalloutTone = "info" | "warning" | "success" | "danger";

type CalloutProps = {
  title?: string;
  tone?: CalloutTone;
  children: ReactNode;
};

/**
 * Practice Question 20 starter component.
 * Enhance tone modifiers, iconography, and layout per the exercise instructions.
 */
export const Callout = ({ title, tone = "info", children }: CalloutProps) => {
  const modifier = tone !== "info" ? ` c-callout--${tone}` : "";
  return (
    <aside className={`c-callout${modifier}`} role="note">
      {title ? <h3 className="c-callout__title">{title}</h3> : null}
      <div className="c-callout__body">{children}</div>
    </aside>
  );
};

export default Callout;
