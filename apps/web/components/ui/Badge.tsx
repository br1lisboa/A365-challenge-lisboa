import { type HTMLAttributes } from "react";

const variants = {
  success: "bg-status-success-bg text-status-success-text",
  error: "bg-status-error-bg text-status-error-text",
  neutral: "bg-surface-muted text-foreground-secondary",
} as const;

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: keyof typeof variants;
};

export function Badge({
  variant = "neutral",
  className = "",
  ...props
}: BadgeProps) {
  return (
    <span
      className={`px-2.5 py-1 rounded-badge text-caption font-medium ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
