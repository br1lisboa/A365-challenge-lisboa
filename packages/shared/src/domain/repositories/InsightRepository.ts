import type { Insight } from "../entities/Insight";
import type { InsightRequest } from "../../application/dtos/InsightRequest";

export interface InsightRepository {
  generate(request: InsightRequest): Promise<Insight>;
}
