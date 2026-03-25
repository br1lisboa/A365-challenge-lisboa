import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { SearchParams } from "../../application/dtos/SearchParams";
import { SearchReservations } from "../../application/use-cases/SearchReservations";
import { ReservationApiRepository } from "../../infrastructure/api/ReservationApiRepository";

const repository = new ReservationApiRepository();
const searchReservations = new SearchReservations(repository);

export function useSearchReservations(params: SearchParams) {
  const hasSearchTerm = Boolean(params.pasajero || params.reserva);

  return useQuery({
    queryKey: ["reservations", params],
    queryFn: () => searchReservations.execute(params),
    enabled: hasSearchTerm,
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}
