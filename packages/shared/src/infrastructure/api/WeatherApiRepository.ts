import type { WeatherRepository } from "../../domain/repositories/WeatherRepository";
import type { Weather } from "../../domain/entities/Weather";
import { WeatherMapper } from "../mappers/WeatherMapper";

function getBaseUrl(): string {
  if (typeof window !== "undefined" && typeof window.location !== "undefined" && window.location.origin !== "undefined") {
    return window.location.origin;
  }
  // React Native or SSR: use local network IP
  return "http://192.168.1.84:3000";
}

export class WeatherApiRepository implements WeatherRepository {
  async getByCity(city: string): Promise<Weather> {
    const baseUrl = getBaseUrl();
    const url = new URL(`${baseUrl}/api/weather`);
    url.searchParams.set("city", city);

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(
        `Error fetching weather for ${city}: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return WeatherMapper.toDomain(data, city);
  }
}
