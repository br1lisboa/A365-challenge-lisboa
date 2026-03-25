import { useQuery } from "@tanstack/react-query";
import { GetDestinationWeather } from "../../application/use-cases/GetDestinationWeather";
import { WeatherApiRepository } from "../../infrastructure/api/WeatherApiRepository";

const repository = new WeatherApiRepository();
const getWeather = new GetDestinationWeather(repository);

export function useWeather(city: string) {
  return useQuery({
    queryKey: ["weather", city],
    queryFn: () => getWeather.execute(city),
    enabled: Boolean(city),
    staleTime: 5 * 60_000,
  });
}
