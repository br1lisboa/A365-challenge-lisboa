import type { ReservationRepository } from "../../domain/repositories/ReservationRepository";
import type { SearchParams } from "../dtos/SearchParams";
import type { PaginatedReservations } from "../../domain/entities/Reservation";

export class SearchReservations {
  constructor(private readonly repository: ReservationRepository) {}

  async execute(params: SearchParams): Promise<PaginatedReservations> {
    return this.repository.search(params);
  }
}
