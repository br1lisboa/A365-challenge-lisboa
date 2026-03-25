"use client";

import type { Reservation } from "@a365/shared/domain/entities/Reservation";
import { WeatherBadge } from "./WeatherBadge";
import { InsightPanel } from "./InsightPanel";

interface ReservationCardProps {
  reservation: Reservation;
}

const STATUS_STYLES: Record<string, string> = {
  activa: "bg-green-100 text-green-700",
  cancelada: "bg-red-100 text-red-700",
  finalizada: "bg-gray-100 text-gray-700",
};

export function ReservationCard({ reservation }: ReservationCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-gray-900">
            {reservation.pasajero}
          </h3>
          <p className="text-sm text-gray-500">
            Reserva: <span className="font-mono">{reservation.reserva}</span>
          </p>
        </div>
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[reservation.estado] ?? STATUS_STYLES.activa}`}
        >
          {reservation.estado}
        </span>
      </div>

      <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1.5">
          <span>Destino:</span>
          <span className="font-medium text-gray-900">
            {reservation.destino}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span>Regreso:</span>
          <span className="font-medium text-gray-900">
            {reservation.fecha_regreso}
          </span>
        </div>
      </div>

      <div className="mt-3">
        <WeatherBadge city={reservation.destino} />
      </div>

      <InsightPanel reservation={reservation} />
    </div>
  );
}
