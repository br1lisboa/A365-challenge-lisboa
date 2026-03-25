"use client";

import type { PaginatedReservations } from "@a365/shared/domain/entities/Reservation";
import { ReservationCard } from "./ReservationCard";
import { Pagination } from "./Pagination";

interface ReservationListProps {
  data: PaginatedReservations | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  hasSearched: boolean;
  page: number;
  onPageChange: (page: number) => void;
}

export function ReservationList({
  data,
  isLoading,
  isError,
  error,
  hasSearched,
  page,
  onPageChange,
}: ReservationListProps) {
  if (!hasSearched) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-lg">Busca por nombre de pasajero o numero de reserva</p>
        <p className="text-sm mt-1">Los resultados aparecen aqui</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse"
          >
            <div className="h-5 w-40 bg-gray-200 rounded mb-3" />
            <div className="h-4 w-60 bg-gray-200 rounded mb-2" />
            <div className="h-4 w-32 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12 bg-red-50 rounded-xl border border-red-200">
        <p className="text-red-700 font-medium">Error al buscar reservas</p>
        <p className="text-red-500 text-sm mt-1">
          {error?.message ?? "Intente nuevamente"}
        </p>
      </div>
    );
  }

  if (!data || data.resultados.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
        <p className="text-gray-500 font-medium">No se encontraron reservas</p>
        <p className="text-gray-400 text-sm mt-1">
          Intenta con otro nombre o numero de reserva
        </p>
      </div>
    );
  }

  const totalPages = Math.ceil(data.total / data.pageSize);

  return (
    <div>
      <p className="text-sm text-gray-500 mb-4">
        {data.total} resultado{data.total !== 1 ? "s" : ""} encontrado
        {data.total !== 1 ? "s" : ""}
      </p>
      <div className="flex flex-col gap-4">
        {data.resultados.map((reservation) => (
          <ReservationCard
            key={reservation.reserva}
            reservation={reservation}
          />
        ))}
      </div>
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}
