"use client";

import { useWeather } from "@a365/shared/presentation/hooks/useWeather";

interface WeatherBadgeProps {
  city: string;
}

export function WeatherBadge({ city }: WeatherBadgeProps) {
  const { data: weather, isLoading, isError } = useWeather(city);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-xs text-gray-400 animate-pulse">
        <div className="h-4 w-20 bg-gray-200 rounded" />
      </div>
    );
  }

  if (isError || !weather) {
    return (
      <span className="text-xs text-gray-400">Clima no disponible</span>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="font-semibold text-gray-700">
        {Math.round(weather.temperature)}C
      </span>
      <span className="text-gray-500 capitalize">{weather.description}</span>
      <span className="text-gray-400">|</span>
      <span className="text-gray-400 text-xs">
        Humedad {weather.humidity}%
      </span>
    </div>
  );
}
