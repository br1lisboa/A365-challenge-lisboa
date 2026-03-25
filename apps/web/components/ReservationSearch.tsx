"use client";

import { useReducer } from "react";
import { useSearchReservations } from "@a365/shared/presentation/hooks/useSearchReservations";
import { SearchBar } from "./SearchBar";
import { ReservationList } from "./ReservationList";

const PAGE_SIZE = 5;

interface SearchState {
  pasajero: string;
  reserva: string;
  page: number;
}

type SearchAction =
  | { type: "search"; pasajero: string; reserva: string }
  | { type: "page"; page: number }
  | { type: "reset" };

function searchReducer(state: SearchState, action: SearchAction): SearchState {
  switch (action.type) {
    case "search":
      return { pasajero: action.pasajero, reserva: action.reserva, page: 1 };
    case "page":
      return { ...state, page: action.page };
    case "reset":
      return INITIAL_STATE;
  }
}

const INITIAL_STATE: SearchState = { pasajero: "", reserva: "", page: 1 };

function SearchIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-500">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export function ReservationSearch() {
  const [state, dispatch] = useReducer(searchReducer, INITIAL_STATE);

  const hasSearched = Boolean(state.pasajero || state.reserva);

  const { data, isLoading, isError, error } = useSearchReservations({
    pasajero: state.pasajero || undefined,
    reserva: state.reserva || undefined,
    page: state.page,
    pageSize: PAGE_SIZE,
  });

  return (
    <div className={`transition-all duration-500 ease-out ${hasSearched ? "" : "flex flex-col items-center justify-center min-h-[60vh]"}`}>
      <section
        className={`w-full transition-all duration-500 ease-out ${
          hasSearched
            ? "sticky top-14 z-40 bg-surface-secondary py-3 border-b border-surface-border"
            : "max-w-xl mx-auto text-center"
        }`}
      >
        {!hasSearched && (
          <div className="mb-6">
            <div className="flex justify-center mb-4">
              <SearchIcon />
            </div>
            <h2 className="text-heading text-foreground-primary mb-2">
              Buscar reservas
            </h2>
            <p className="text-body text-foreground-secondary">
              Ingresa el nombre del pasajero o el numero de reserva
            </p>
          </div>
        )}
        <SearchBar
          onSearch={(params) => dispatch({ type: "search", ...params })}
          onClear={hasSearched ? () => dispatch({ type: "reset" }) : undefined}
          isLoading={isLoading}
        />
      </section>

      {hasSearched && (
        <section className="mt-4 animate-fade-in-up">
          <ReservationList
            data={data}
            isLoading={isLoading}
            isError={isError}
            error={error}
            hasSearched={hasSearched}
            page={state.page}
            onPageChange={(page) => dispatch({ type: "page", page })}
          />
        </section>
      )}
    </div>
  );
}
