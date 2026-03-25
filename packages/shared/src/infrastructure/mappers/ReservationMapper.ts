import type {
  Reservation,
  PaginatedReservations,
  ReservationStatus,
} from "../../domain/entities/Reservation";

interface ApiReservation {
  reserva: string;
  pasajero: string;
  destino: string;
  estado: string;
  fecha_regreso: string;
}

interface ApiPaginatedResponse {
  total: number;
  page: number;
  pageSize: number;
  resultados: ApiReservation[];
}

const VALID_STATUSES: ReservationStatus[] = [
  "activa",
  "cancelada",
  "finalizada",
];

function toReservationStatus(status: string): ReservationStatus {
  if (VALID_STATUSES.includes(status as ReservationStatus)) {
    return status as ReservationStatus;
  }
  return "activa";
}

export const ReservationMapper = {
  toDomain(raw: ApiReservation): Reservation {
    return {
      reserva: raw.reserva,
      pasajero: raw.pasajero,
      destino: raw.destino,
      estado: toReservationStatus(raw.estado),
      fecha_regreso: raw.fecha_regreso,
    };
  },

  toPaginatedDomain(raw: ApiPaginatedResponse): PaginatedReservations {
    return {
      total: raw.total,
      page: raw.page,
      pageSize: raw.pageSize,
      resultados: raw.resultados.map(ReservationMapper.toDomain),
    };
  },
};
