import type { ComponentPropsWithoutRef, ReactNode } from "react";
import "./badge.scss";

type BadgeTone = "neutral" | "accent" | "success" | "warning" | "danger";

type BadgeProps = {
  children: ReactNode;
  tone?: BadgeTone;
  ariaLabel?: string; // 課題13
} & ComponentPropsWithoutRef<"span">;

/**
 * Practice Question 11: Flesh out the badge styles and variants.
 */
export const Badge = ({ children, tone = "neutral", className = "",ariaLabel, ...props }: BadgeProps) => {
  const modifier = tone !== "neutral" ? ` c-badge--${tone}` : "";
  return (
    <span className={`c-badge${modifier} ${className}`.trim()} aria-label={ariaLabel} {...props}>
      <span className="c-badge__text">{children}</span>
    </span>
  );
};

export default Badge;
