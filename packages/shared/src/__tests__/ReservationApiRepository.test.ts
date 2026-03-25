import { describe, it, expect, vi, beforeEach } from "vitest";
import { ReservationApiRepository } from "../infrastructure/api/ReservationApiRepository";

describe("ReservationApiRepository", () => {
  const mockFetch = vi.fn();

  beforeEach(() => {
    vi.stubGlobal("fetch", mockFetch);
    mockFetch.mockReset();
  });

  it("should build correct URL with search params", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
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
        }),
    });

    const repo = new ReservationApiRepository();
    await repo.search({ pasajero: "Ana", page: 1, pageSize: 5 });

    const calledUrl = mockFetch.mock.calls[0][0];
    expect(calledUrl).toContain("pasajero=Ana");
    expect(calledUrl).toContain("page=1");
    expect(calledUrl).toContain("pageSize=5");
  });

  it("should not include empty params in URL", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          total: 0,
          page: 1,
          pageSize: 5,
          resultados: [],
        }),
    });

    const repo = new ReservationApiRepository();
    await repo.search({ page: 1, pageSize: 5 });

    const calledUrl = mockFetch.mock.calls[0][0];
    expect(calledUrl).not.toContain("pasajero=");
    expect(calledUrl).not.toContain("reserva=");
  });

  it("should throw on non-ok response", async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    });

    const repo = new ReservationApiRepository();

    await expect(
      repo.search({ page: 1, pageSize: 5 })
    ).rejects.toThrow("Error fetching reservations: 500");
  });
});
