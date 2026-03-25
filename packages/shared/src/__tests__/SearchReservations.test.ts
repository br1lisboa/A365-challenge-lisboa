import { describe, it, expect, vi } from "vitest";
import { SearchReservations } from "../application/use-cases/SearchReservations";
import type { ReservationRepository } from "../domain/repositories/ReservationRepository";
import type { PaginatedReservations } from "../domain/entities/Reservation";

describe("SearchReservations", () => {
  it("should call repository with search params", async () => {
    const mockResult: PaginatedReservations = {
      total: 1,
      page: 1,
      pageSize: 5,
      resultados: [
        {
          reserva: "AX321",
          pasajero: "Ana Torres",
          destino: "Madrid",
          estado: "activa",
          fecha_regreso: "2025-05-22",
        },
      ],
    };

    const mockRepo: ReservationRepository = {
      search: vi.fn().mockResolvedValue(mockResult),
    };

    const useCase = new SearchReservations(mockRepo);
    const result = await useCase.execute({
      pasajero: "Ana",
      page: 1,
      pageSize: 5,
    });

    expect(mockRepo.search).toHaveBeenCalledWith({
      pasajero: "Ana",
      page: 1,
      pageSize: 5,
    });
    expect(result.resultados).toHaveLength(1);
    expect(result.resultados[0].pasajero).toBe("Ana Torres");
  });

  it("should propagate repository errors", async () => {
    const mockRepo: ReservationRepository = {
      search: vi.fn().mockRejectedValue(new Error("Network error")),
    };

    const useCase = new SearchReservations(mockRepo);

    await expect(
      useCase.execute({ page: 1, pageSize: 5 })
    ).rejects.toThrow("Network error");
  });
});
