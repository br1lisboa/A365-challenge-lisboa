import type { ReservationRepository } from "../../domain/repositories/ReservationRepository";
import type { SearchParams } from "../../application/dtos/SearchParams";
import type { PaginatedReservations } from "../../domain/entities/Reservation";
import { ReservationMapper } from "../mappers/ReservationMapper";

const BASE_URL =
  "https://3ccfrjulc8.execute-api.us-west-1.amazonaws.com/dev/reservasHandler";

export class ReservationApiRepository implements ReservationRepository {
  async search(params: SearchParams): Promise<PaginatedReservations> {
    const url = new URL(BASE_URL);

    if (params.pasajero) url.searchParams.set("pasajero", params.pasajero);
    if (params.reserva) url.searchParams.set("reserva", params.reserva);
    url.searchParams.set("page", String(params.page));
    url.searchParams.set("pageSize", String(params.pageSize));

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(
        `Error fetching reservations: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return ReservationMapper.toPaginatedDomain(
      data as Parameters<typeof ReservationMapper.toPaginatedDomain>[0]
    );
  }
}
