export type ReservationStatus = "activa" | "cancelada" | "finalizada";

export interface Reservation {
  reserva: string;
  pasajero: string;
  destino: string;
  estado: ReservationStatus;
  fecha_regreso: string;
}

export interface PaginatedReservations {
  total: number;
  page: number;
  pageSize: number;
  resultados: Reservation[];
}
