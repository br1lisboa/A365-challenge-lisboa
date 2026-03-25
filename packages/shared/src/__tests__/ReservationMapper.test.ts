import { describe, it, expect } from "vitest";
import { ReservationMapper } from "../infrastructure/mappers/ReservationMapper";

describe("ReservationMapper", () => {
  it("should map a single reservation to domain entity", () => {
    const raw = {
      reserva: "AX321",
      pasajero: "Ana Torres",
      destino: "Madrid",
      estado: "activa",
      fecha_regreso: "2025-05-22",
    };

    const result = ReservationMapper.toDomain(raw);

    expect(result).toEqual({
      reserva: "AX321",
      pasajero: "Ana Torres",
      destino: "Madrid",
      estado: "activa",
      fecha_regreso: "2025-05-22",
    });
  });

  it("should default unknown status to 'activa'", () => {
    const raw = {
      reserva: "BX999",
      pasajero: "Test User",
      destino: "Lima",
      estado: "unknown_status",
      fecha_regreso: "2025-06-01",
    };

    const result = ReservationMapper.toDomain(raw);
    expect(result.estado).toBe("activa");
  });

  it("should map paginated response correctly", () => {
    const raw = {
      total: 20,
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
        {
          reserva: "BX555",
          pasajero: "Carlos Lopez",
          destino: "Lima",
          estado: "finalizada",
          fecha_regreso: "2025-04-10",
        },
      ],
    };

    const result = ReservationMapper.toPaginatedDomain(raw);

    expect(result.total).toBe(20);
    expect(result.page).toBe(1);
    expect(result.pageSize).toBe(5);
    expect(result.resultados).toHaveLength(2);
    expect(result.resultados[0].pasajero).toBe("Ana Torres");
    expect(result.resultados[1].estado).toBe("finalizada");
  });
});
