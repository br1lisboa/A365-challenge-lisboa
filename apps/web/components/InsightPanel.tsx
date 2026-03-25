"use client";

import { useWeather } from "@a365/shared/presentation/hooks/useWeather";
import { useInsight } from "@a365/shared/presentation/hooks/useInsight";
import type { Reservation } from "@a365/shared/domain/entities/Reservation";

interface InsightPanelProps {
  reservation: Reservation;
}

export function InsightPanel({ reservation }: InsightPanelProps) {
  const { data: weather } = useWeather(reservation.destino);

  const insightRequest =
    weather
      ? {
          pasajero: reservation.pasajero,
          destino: reservation.destino,
          estado: reservation.estado,
          fecha_regreso: reservation.fecha_regreso,
          clima: {
            description: weather.description,
            temperature: weather.temperature,
          },
        }
      : null;

  const { data: insight, isLoading, isError } = useInsight(insightRequest);

  if (!weather) return null;

  if (isLoading) {
    return (
      <div className="mt-3 p-3 bg-blue-50 rounded-lg animate-pulse">
        <div className="h-3 w-3/4 bg-blue-200 rounded mb-2" />
        <div className="h-3 w-1/2 bg-blue-200 rounded" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-3 p-3 bg-yellow-50 rounded-lg text-yellow-700 text-xs">
        No se pudo generar el insight para esta reserva.
      </div>
    );
  }

  if (!insight) return null;

  return (
    <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
      <p className="text-xs font-medium text-blue-700 mb-1">
        Insight IA
      </p>
      <p className="text-sm text-blue-900">{insight.message}</p>
    </div>
  );
}
