import type { WeatherRepository } from "../../domain/repositories/WeatherRepository";
import type { Weather } from "../../domain/entities/Weather";

export class GetDestinationWeather {
  constructor(private readonly repository: WeatherRepository) {}

  async execute(city: string): Promise<Weather> {
    return this.repository.getByCity(city);
  }
}
