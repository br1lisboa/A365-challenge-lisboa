"use client";

import type { Insight } from "@a365/shared/domain/entities/Insight";
import { Skeleton } from "./ui/Skeleton";

interface InsightPanelProps {
  insight: Insight | undefined;
  isLoading: boolean;
  isError: boolean;
  hasWeather: boolean;
}

function SparklesIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-500 shrink-0">
      <path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z" />
    </svg>
  );
}

export function InsightPanel({
  insight,
  isLoading,
  isError,
  hasWeather,
}: InsightPanelProps) {
  if (!hasWeather) return null;

  if (isLoading) {
    return (
      <div className="mt-4 p-4 bg-gradient-to-r from-brand-50 to-brand-100 rounded-control border-l-[3px] border-l-brand-500">
        <div className="flex items-center gap-2 mb-2">
          <SparklesIcon />
          <Skeleton width="w-20" height="h-3" className="bg-brand-200" />
        </div>
        <Skeleton width="w-3/4" height="h-3" className="bg-brand-200 mb-1.5" />
        <Skeleton width="w-1/2" height="h-3" className="bg-brand-200" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-4 p-4 bg-status-warning-bg rounded-control border-l-[3px] border-l-status-warning-text">
        <p className="text-status-warning-text text-caption">
          No se pudo generar el insight para esta reserva.
        </p>
      </div>
    );
  }

  if (!insight) return null;

  return (
    <div className="mt-4 p-4 bg-gradient-to-r from-brand-50 to-brand-100 rounded-control border-l-[3px] border-l-brand-500">
      <div className="flex items-center gap-2 mb-1.5">
        <SparklesIcon />
        <span className="text-caption font-semibold text-brand-600">
          Insight IA
        </span>
      </div>
      <p className="text-body text-foreground-primary leading-relaxed">
        {insight.message}
      </p>
    </div>
  );
}
