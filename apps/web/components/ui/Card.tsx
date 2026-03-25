import { type HTMLAttributes } from "react";

const variants = {
  elevated:
    "bg-surface-primary rounded-card border border-surface-border p-card-padding shadow-card hover:shadow-card-hover transition-shadow",
  flat: "bg-surface-secondary rounded-card border border-surface-border p-card-padding",
  info: "bg-status-info-bg rounded-control border border-status-info-border p-3",
  error:
    "bg-status-error-bg rounded-card border border-status-error-bg-muted p-card-padding",
  warning: "bg-status-warning-bg rounded-control p-3",
} as const;

type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: keyof typeof variants;
};

export function Card({
  variant = "elevated",
  className = "",
  ...props
}: CardProps) {
  return (
    <div className={`${variants[variant]} ${className}`} {...props} />
  );
}
