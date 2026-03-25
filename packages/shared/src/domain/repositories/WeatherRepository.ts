import type { Weather } from "../entities/Weather";

export interface WeatherRepository {
  getByCity(city: string): Promise<Weather>;
}
