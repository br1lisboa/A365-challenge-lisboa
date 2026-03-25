import { describe, it, expect, vi } from "vitest";
import { GenerateInsight } from "../application/use-cases/GenerateInsight";
import type { InsightRepository } from "../domain/repositories/InsightRepository";

describe("GenerateInsight", () => {
  it("should generate insight with reservation and weather data", async () => {
    const mockInsight = {
      message:
        "La pasajera Ana Torres se encuentra en Madrid con clima templado.",
      generatedAt: "2025-05-20T10:00:00Z",
    };

    const mockRepo: InsightRepository = {
      generate: vi.fn().mockResolvedValue(mockInsight),
    };

    const useCase = new GenerateInsight(mockRepo);
    const result = await useCase.execute({
      pasajero: "Ana Torres",
      destino: "Madrid",
      estado: "activa",
      fecha_regreso: "2025-05-22",
      clima: {
        description: "cielo despejado",
        temperature: 18,
      },
    });

    expect(mockRepo.generate).toHaveBeenCalledOnce();
    expect(result.message).toContain("Ana Torres");
  });

  it("should propagate errors from repository", async () => {
    const mockRepo: InsightRepository = {
      generate: vi.fn().mockRejectedValue(new Error("AI service unavailable")),
    };

    const useCase = new GenerateInsight(mockRepo);

    await expect(
      useCase.execute({
        pasajero: "Test",
        destino: "Test",
        estado: "activa",
        fecha_regreso: "2025-01-01",
        clima: { description: "test", temperature: 0 },
      })
    ).rejects.toThrow("AI service unavailable");
  });
});
