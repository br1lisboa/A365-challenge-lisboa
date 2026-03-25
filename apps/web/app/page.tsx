"use client";

import { useState } from "react";
import { useSearchReservations } from "@a365/shared/presentation/hooks/useSearchReservations";
import { SearchBar } from "../components/SearchBar";
import { ReservationList } from "../components/ReservationList";

const PAGE_SIZE = 5;

export default function HomePage() {
  const [searchParams, setSearchParams] = useState({
    pasajero: "",
    reserva: "",
  });
  const [page, setPage] = useState(1);
  const [hasSearched, setHasSearched] = useState(false);

  const { data, isLoading, isError, error } = useSearchReservations({
    pasajero: searchParams.pasajero || undefined,
    reserva: searchParams.reserva || undefined,
    page,
    pageSize: PAGE_SIZE,
  });

  const handleSearch = (params: { pasajero: string; reserva: string }) => {
    setSearchParams(params);
    setPage(1);
    setHasSearched(true);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          A365 Agent Assistant
        </h1>
        <p className="text-gray-500 mt-1">
          Herramienta de consulta para agentes de asistencia al viajero
        </p>
      </header>

      <section className="mb-8">
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />
      </section>

      <section>
        <ReservationList
          data={data}
          isLoading={isLoading}
          isError={isError}
          error={error}
          hasSearched={hasSearched}
          page={page}
          onPageChange={handlePageChange}
        />
      </section>
    </main>
  );
}
