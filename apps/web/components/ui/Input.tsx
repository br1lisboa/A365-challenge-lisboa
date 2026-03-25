import { type InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  fullWidth?: boolean;
};

export function Input({ fullWidth = true, className = "", ...props }: InputProps) {
  return (
    <input
      className={`bg-surface-primary px-control-x py-control-y border border-surface-border-strong rounded-control focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-body text-foreground-primary placeholder:text-foreground-muted ${fullWidth ? "flex-1" : ""} ${className}`}
      {...props}
    />
  );
}
