import type { ComponentPropsWithoutRef, ReactNode } from "react";
import "./badge.scss";

type BadgeTone = "neutral" | "accent" | "success" | "warning" | "danger";

type BadgeProps = {
  variant?: 'primary' | 'secondary';
  children: ReactNode;
  tone?: BadgeTone;
  'aria-label'?: string;
} & ComponentPropsWithoutRef<"span">;

/**
 * Practice Question 11: Flesh out the badge styles and variants.
 */
export const Badge = ({
  variant = 'primary',
  children,
  tone = "neutral",
  className = "",
  'aria-label': ariaLabel,
  ...props 
}: BadgeProps) => {
  const modifier = tone !== "neutral" ? ` c-badge--${tone}` : "";
  const variantModifier = variant !== "primary" ? ` c-badge--${variant}` : "";
  
  return (
    <span 
      className={`c-badge${modifier} ${variantModifier} ${className}`.trim()}
      aria-label={ariaLabel}
      role={ariaLabel ? 'status' : undefined}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
