import { describe, it, expect, vi, beforeEach } from "vitest";
import { WeatherApiRepository } from "../infrastructure/api/WeatherApiRepository";

vi.mock("../infrastructure/config/baseUrl", () => ({
  getBaseUrl: () => "http://localhost:3000",
}));

describe("WeatherApiRepository", () => {
  const mockFetch = vi.fn();

  beforeEach(() => {
    vi.stubGlobal("fetch", mockFetch);
    mockFetch.mockReset();
  });

  it("should build correct URL with city param", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          city: "Madrid",
          temperature: 18,
          description: "Cielo despejado",
          humidity: 45,
          icon: "01d",
          feels_like: 16,
          wind_speed: 12,
        }),
    });

    const repo = new WeatherApiRepository();
    await repo.getByCity("Madrid");

    const calledUrl = mockFetch.mock.calls[0][0];
    expect(calledUrl).toContain("/api/weather");
    expect(calledUrl).toContain("city=Madrid");
  });

  it("should map API response to domain entity", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          city: "Madrid",
          temperature: 18,
          description: "Cielo despejado",
          humidity: 45,
          icon: "01d",
          feels_like: 16,
          wind_speed: 12,
        }),
    });

    const repo = new WeatherApiRepository();
    const result = await repo.getByCity("Madrid");

    expect(result.city).toBe("Madrid");
    expect(result.temperature).toBe(18);
    expect(result.feelsLike).toBe(16);
    expect(result.windSpeed).toBe(12);
  });

  it("should throw on non-ok response", async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 503,
      statusText: "Service Unavailable",
    });

    const repo = new WeatherApiRepository();

    await expect(repo.getByCity("Madrid")).rejects.toThrow(
      "Error fetching weather for Madrid: 503"
    );
  });
});
