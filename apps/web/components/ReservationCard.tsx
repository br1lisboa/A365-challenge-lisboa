"use client";

import { memo } from "react";
import dynamic from "next/dynamic";
import type { Reservation, ReservationStatus } from "@a365/shared/domain/entities/Reservation";
import { useWeather } from "@a365/shared/presentation/hooks/useWeather";
import { useInsight } from "@a365/shared/presentation/hooks/useInsight";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { WeatherBadge } from "./WeatherBadge";

const InsightPanel = dynamic(
  () => import("./InsightPanel").then((m) => ({ default: m.InsightPanel })),
  { ssr: false }
);

const STATUS_BADGE_VARIANT: Record<ReservationStatus, "success" | "error" | "neutral"> = {
  activa: "success",
  cancelada: "error",
  finalizada: "neutral",
};

interface ReservationCardProps {
  reservation: Reservation;
}

function ReservationCardRaw({ reservation }: ReservationCardProps) {
  const {
    data: weather,
    isLoading: weatherLoading,
    isError: weatherError,
  } = useWeather(reservation.destino);

  const insightRequest = weather
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

  const {
    data: insight,
    isLoading: insightLoading,
    isError: insightError,
  } = useInsight(insightRequest);

  return (
    <Card variant="elevated">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-foreground-primary">
            {reservation.pasajero}
          </h3>
          <p className="text-body text-foreground-secondary">
            Reserva: <span className="font-mono">{reservation.reserva}</span>
          </p>
        </div>
        <Badge variant={STATUS_BADGE_VARIANT[reservation.estado] ?? "neutral"}>
          {reservation.estado}
        </Badge>
      </div>

      <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-body text-foreground-secondary">
        <div className="flex items-center gap-1.5">
          <span>Destino:</span>
          <span className="font-medium text-foreground-primary">
            {reservation.destino}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span>Regreso:</span>
          <span className="font-medium text-foreground-primary">
            {reservation.fecha_regreso}
          </span>
        </div>
      </div>

      <div className="mt-3">
        <WeatherBadge
          weather={weather}
          isLoading={weatherLoading}
          isError={weatherError}
        />
      </div>

      <InsightPanel
        insight={insight}
        isLoading={insightLoading}
        isError={insightError}
        hasWeather={Boolean(weather)}
      />
    </Card>
  );
}

export const ReservationCard = memo(ReservationCardRaw);
