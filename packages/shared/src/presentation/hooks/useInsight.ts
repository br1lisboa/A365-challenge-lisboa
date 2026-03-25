import { useQuery } from "@tanstack/react-query";
import type { InsightRequest } from "../../application/dtos/InsightRequest";
import { GenerateInsight } from "../../application/use-cases/GenerateInsight";
import { InsightApiRepository } from "../../infrastructure/api/InsightApiRepository";

function getBaseUrl(): string {
  if (typeof window !== "undefined" && typeof window.location !== "undefined" && window.location.origin !== "undefined") {
    return window.location.origin;
  }
  // React Native or SSR: use local network IP
  return "http://192.168.1.84:3000";
}

const repository = new InsightApiRepository(getBaseUrl());
const generateInsight = new GenerateInsight(repository);

export function useInsight(request: InsightRequest | null) {
  return useQuery({
    queryKey: ["insight", request?.pasajero, request?.destino],
    queryFn: () => generateInsight.execute(request!),
    enabled: Boolean(request),
    staleTime: 10 * 60_000,
    retry: 1,
  });
}
