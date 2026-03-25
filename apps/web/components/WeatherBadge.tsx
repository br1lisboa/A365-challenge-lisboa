"use client";

import type { Weather } from "@a365/shared/domain/entities/Weather";
import { Skeleton } from "./ui/Skeleton";

interface WeatherBadgeProps {
  weather: Weather | undefined;
  isLoading: boolean;
  isError: boolean;
}

export function WeatherBadge({ weather, isLoading, isError }: WeatherBadgeProps) {
  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <Skeleton width="w-20" />
      </div>
    );
  }

  if (isError || !weather) {
    return (
      <span className="text-caption text-foreground-muted">Clima no disponible</span>
    );
  }

  return (
    <div className="flex items-center gap-2 text-body">
      <span className="font-semibold text-foreground-primary">
        {Math.round(weather.temperature)}C
      </span>
      <span className="text-foreground-secondary capitalize">
        {weather.description}
      </span>
      <span className="text-foreground-muted">|</span>
      <span className="text-foreground-muted text-caption">
        Humedad {weather.humidity}%
      </span>
    </div>
  );
}
