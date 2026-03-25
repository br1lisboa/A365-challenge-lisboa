import type { InsightRepository } from "../../domain/repositories/InsightRepository";
import type { InsightRequest } from "../dtos/InsightRequest";
import type { Insight } from "../../domain/entities/Insight";

export class GenerateInsight {
  constructor(private readonly repository: InsightRepository) {}

  async execute(request: InsightRequest): Promise<Insight> {
    return this.repository.generate(request);
  }
}
