import type { InsightRepository } from "../../domain/repositories/InsightRepository";
import type { InsightRequest } from "../../application/dtos/InsightRequest";
import type { Insight } from "../../domain/entities/Insight";

export class InsightApiRepository implements InsightRepository {
  constructor(private readonly baseUrl: string) {}

  async generate(request: InsightRequest): Promise<Insight> {
    const response = await fetch(`${this.baseUrl}/api/insight`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(
        `Error generating insight: ${response.status} ${response.statusText}`
      );
    }

    const data = (await response.json()) as { message: string; generatedAt?: string };

    return {
      message: data.message,
      generatedAt: data.generatedAt ?? new Date().toISOString(),
    };
  }
}
