import { describe, it, expect, vi, beforeEach } from "vitest";
import { GET } from "../../app/api/weather/route";

const mockFetch = vi.fn();

beforeEach(() => {
  vi.stubGlobal("fetch", mockFetch);
  mockFetch.mockReset();
  vi.stubEnv("A365_WEATHER_AUTH_KEY", "test-auth-key");
});

function buildRequest(city?: string): Request {
  const url = new URL("http://localhost:3000/api/weather");
  if (city) url.searchParams.set("city", city);
  return new Request(url.toString());
}

describe("GET /api/weather", () => {
  it("should proxy weather data with auth header", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          data: {
            city: "Madrid",
            temperature: 18,
            humidity: 45,
            feels_like: 16,
            weather: { description: "Cielo despejado", icon: "01d" },
            wind: { speed: 12 },
          },
        }),
    });

    const response = await GET(buildRequest("Madrid"));
    const json = await response.json();

    expect(json.city).toBe("Madrid");
    expect(json.temperature).toBe(18);
    expect(json.description).toBe("Cielo despejado");

    const calledUrl = mockFetch.mock.calls[0][0];
    expect(calledUrl).toContain("city=Madrid");

    const calledOptions = mockFetch.mock.calls[0][1];
    expect(calledOptions.headers["X-System-Auth-Key"]).toBe("test-auth-key");
  });

  it("should return 400 if city is missing", async () => {
    const response = await GET(buildRequest());
    expect(response.status).toBe(400);
  });

  it("should return 500 if external API fails", async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 503,
      statusText: "Service Unavailable",
      text: () => Promise.resolve("error"),
    });

    const response = await GET(buildRequest("Madrid"));
    expect(response.status).toBe(500);
  });
});
