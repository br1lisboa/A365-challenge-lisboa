import type { WeatherRepository } from "../../domain/repositories/WeatherRepository";
import type { Weather } from "../../domain/entities/Weather";
import { WeatherMapper } from "../mappers/WeatherMapper";

const WEATHER_URL = "https://api.assist-365.com/api/weather/current";
const AUTH_KEY =
  "A365_AUTH_cbc0260c7c2067809eefd2b03a77925dae35e2adf3ab0d6553a867b88dbe5515_SECURE_2024";

export class WeatherApiRepository implements WeatherRepository {
  async getByCity(city: string): Promise<Weather> {
    const url = new URL(WEATHER_URL);
    url.searchParams.set("city", city);
    url.searchParams.set("units", "metric");
    url.searchParams.set("lang", "es");

    const response = await fetch(url.toString(), {
      headers: {
        "X-System-Auth-Key": AUTH_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Error fetching weather for ${city}: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return WeatherMapper.toDomain(data, city);
  }
}
