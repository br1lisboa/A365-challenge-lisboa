import type { Weather } from "../../domain/entities/Weather";

interface ApiWeatherResponse {
  city?: string;
  temperature?: number;
  description?: string;
  humidity?: number;
  icon?: string;
  feels_like?: number;
  wind_speed?: number;
  [key: string]: unknown;
}

export const WeatherMapper = {
  toDomain(raw: ApiWeatherResponse, city: string): Weather {
    return {
      city: raw.city ?? city,
      temperature: raw.temperature ?? 0,
      description: raw.description ?? "No disponible",
      humidity: raw.humidity ?? 0,
      icon: raw.icon ?? "",
      feelsLike: raw.feels_like ?? 0,
      windSpeed: raw.wind_speed ?? 0,
    };
  },
};
