import { describe, it, expect, vi } from "vitest";
import { GetDestinationWeather } from "../application/use-cases/GetDestinationWeather";
import type { WeatherRepository } from "../domain/repositories/WeatherRepository";
import type { Weather } from "../domain/entities/Weather";

describe("GetDestinationWeather", () => {
  it("should return weather for a given city", async () => {
    const mockWeather: Weather = {
      city: "Madrid",
      temperature: 18,
      description: "Cielo despejado",
      humidity: 45,
      icon: "01d",
      feelsLike: 16,
      windSpeed: 12,
    };

    const mockRepo: WeatherRepository = {
      getByCity: vi.fn().mockResolvedValue(mockWeather),
    };

    const useCase = new GetDestinationWeather(mockRepo);
    const result = await useCase.execute("Madrid");

    expect(mockRepo.getByCity).toHaveBeenCalledWith("Madrid");
    expect(result.city).toBe("Madrid");
    expect(result.temperature).toBe(18);
  });

  it("should propagate repository errors", async () => {
    const mockRepo: WeatherRepository = {
      getByCity: vi.fn().mockRejectedValue(new Error("API unavailable")),
    };

    const useCase = new GetDestinationWeather(mockRepo);

    await expect(useCase.execute("Madrid")).rejects.toThrow("API unavailable");
  });
});
