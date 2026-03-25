import { type ButtonHTMLAttributes } from "react";

const variants = {
  primary:
    "bg-brand-600 text-foreground-inverse hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed",
  secondary:
    "border border-surface-border-strong hover:bg-surface-secondary disabled:opacity-50 disabled:cursor-not-allowed",
} as const;

const sizes = {
  sm: "px-3 py-1.5 text-caption",
  md: "px-6 py-control-y text-body font-medium",
} as const;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`rounded-control transition-colors ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
}
