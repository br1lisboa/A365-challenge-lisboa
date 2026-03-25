"use client";

import type { PaginatedReservations } from "@a365/shared/domain/entities/Reservation";
import { ReservationCard } from "./ReservationCard";
import { Pagination } from "./Pagination";
import { Card } from "./ui/Card";
import { Skeleton } from "./ui/Skeleton";

interface ReservationListProps {
  data: PaginatedReservations | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  hasSearched: boolean;
  page: number;
  onPageChange: (page: number) => void;
}

function ListSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i} variant="elevated" className="!shadow-none">
          <Skeleton width="w-40" height="h-5" className="mb-3" />
          <Skeleton width="w-60" className="mb-2" />
          <Skeleton width="w-32" />
        </Card>
      ))}
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <Card variant="error" className="text-center py-12">
      <p className="text-status-error-text font-medium">Error al buscar reservas</p>
      <p className="text-status-error-text/70 text-body mt-1">{message}</p>
    </Card>
  );
}

function EmptyResult() {
  return (
    <Card variant="flat" className="text-center py-12">
      <p className="text-foreground-secondary font-medium">
        No se encontraron reservas
      </p>
      <p className="text-foreground-muted text-body mt-1">
        Intenta con otro nombre o numero de reserva
      </p>
    </Card>
  );
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
  if (!hasSearched) return null;
  if (isLoading) return <ListSkeleton />;
  if (isError) return <ErrorState message={error?.message ?? "Intente nuevamente"} />;
  if (!data || data.resultados.length === 0) return <EmptyResult />;

  const totalPages = Math.ceil(data.total / data.pageSize);

  return (
    <div>
      <p className="text-body text-foreground-secondary mb-4">
        {data.total} resultado{data.total !== 1 ? "s" : ""} encontrado
        {data.total !== 1 ? "s" : ""}
      </p>
      <div className="flex flex-col gap-4">
        {data.resultados.map((reservation, index) => (
          <div
            key={reservation.reserva}
            className="animate-fade-in-up opacity-0"
            style={{ animationDelay: `${index * 75}ms` }}
          >
            <ReservationCard reservation={reservation} />
          </div>
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
