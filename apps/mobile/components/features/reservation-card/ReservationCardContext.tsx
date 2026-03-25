import { createContext, useContext } from "react";
import type { ReservationStatus } from "@a365/shared/domain/entities/Reservation";

export interface ReservationCardData {
  reserva: string;
  pasajero: string;
  destino: string;
  estado: ReservationStatus;
  fechaRegreso: string;
}

const ReservationCardContext = createContext<ReservationCardData | null>(null);

export const ReservationCardProvider = ReservationCardContext.Provider;

export function useReservationCardContext() {
  const ctx = useContext(ReservationCardContext);
  if (!ctx)
    throw new Error("useReservationCardContext must be used within ReservationCard");
  return ctx;
}
