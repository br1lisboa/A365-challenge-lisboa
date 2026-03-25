import type { PaginatedReservations } from "../entities/Reservation";
import type { SearchParams } from "../../application/dtos/SearchParams";

export interface ReservationRepository {
  search(params: SearchParams): Promise<PaginatedReservations>;
}
