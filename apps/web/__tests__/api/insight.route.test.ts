import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "../../app/api/insight/route";

const mockFetch = vi.fn();

beforeEach(() => {
  vi.stubGlobal("fetch", mockFetch);
  mockFetch.mockReset();
  vi.stubEnv("OPENROUTER_API_KEY", "test-api-key");
});

function buildRequest(body: Record<string, unknown>): Request {
  return new Request("http://localhost:3000/api/insight", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

const validBody = {
  pasajero: "Ana Torres",
  destino: "Madrid",
  estado: "activa",
  fecha_regreso: "2025-05-22",
  clima: { description: "Cielo despejado", temperature: 18 },
};

describe("POST /api/insight", () => {
  it("should return generated insight", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          choices: [
            {
              message: {
                content: "La pasajera Ana Torres se encuentra en Madrid.",
              },
            },
          ],
        }),
    });

    const response = await POST(buildRequest(validBody));
    const json = await response.json();

    expect(json.message).toBe(
      "La pasajera Ana Torres se encuentra en Madrid."
    );
    expect(json.generatedAt).toBeDefined();

    const fetchBody = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(fetchBody.model).toBe("google/gemini-2.0-flash-001");
    expect(fetchBody.messages[1].content).toContain("Ana Torres");
    expect(fetchBody.messages[1].content).toContain("Madrid");
  });

  it("should return 400 if required fields are missing", async () => {
    const response = await POST(buildRequest({ estado: "activa" }));
    expect(response.status).toBe(400);
  });

  it("should return 500 if OpenRouter fails", async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 429,
      text: () => Promise.resolve("Rate limited"),
    });

    const response = await POST(buildRequest(validBody));
    expect(response.status).toBe(500);
  });
});
