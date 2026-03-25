import { describe, it, expect } from "vitest";
import { WeatherMapper } from "../infrastructure/mappers/WeatherMapper";

describe("WeatherMapper", () => {
  it("should map API response to Weather entity", () => {
    const raw = {
      city: "Madrid",
      temperature: 18.5,
      description: "cielo despejado",
      humidity: 45,
      icon: "01d",
      feels_like: 17.2,
      wind_speed: 3.5,
    };

    const result = WeatherMapper.toDomain(raw, "Madrid");

    expect(result).toEqual({
      city: "Madrid",
      temperature: 18.5,
      description: "cielo despejado",
      humidity: 45,
      icon: "01d",
      feelsLike: 17.2,
      windSpeed: 3.5,
    });
  });

  it("should handle missing fields with defaults", () => {
    const raw = {};

    const result = WeatherMapper.toDomain(raw, "Buenos Aires");

    expect(result.city).toBe("Buenos Aires");
    expect(result.temperature).toBe(0);
    expect(result.description).toBe("No disponible");
    expect(result.humidity).toBe(0);
    expect(result.feelsLike).toBe(0);
    expect(result.windSpeed).toBe(0);
  });
});
