import { type HTMLAttributes } from "react";

type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
  width?: string;
  height?: string;
};

export function Skeleton({
  width,
  height = "h-4",
  className = "",
  ...props
}: SkeletonProps) {
  return (
    <div
      className={`bg-surface-border rounded animate-pulse ${height} ${width ?? ""} ${className}`}
      {...props}
    />
  );
}
