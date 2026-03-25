import { NextResponse } from "next/server";

const WEATHER_URL = "https://api.assist-365.com/api/weather/current";

export async function GET(request: Request) {
  const authKey = process.env.A365_WEATHER_AUTH_KEY;

  if (!authKey) {
    return NextResponse.json(
      { error: "A365_WEATHER_AUTH_KEY not configured" },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");

  if (!city) {
    return NextResponse.json(
      { error: "Missing required param: city" },
      { status: 400 }
    );
  }

  try {
    const url = new URL(WEATHER_URL);
    url.searchParams.set("city", city);
    url.searchParams.set("units", "metric");
    url.searchParams.set("lang", "es");

    const response = await fetch(url.toString(), {
      headers: { "X-System-Auth-Key": authKey },
    });

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const json = await response.json();
    const data = json.data;

    return NextResponse.json(
      {
        city: data.city,
        temperature: data.temperature,
        description: data.weather?.description ?? "No disponible",
        humidity: data.humidity,
        icon: data.weather?.icon ?? "",
        feels_like: data.feels_like,
        wind_speed: data.wind?.speed ?? 0,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      }
    );
  } catch (error) {
    console.error("Weather proxy error:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather" },
      { status: 500 }
    );
  }
}
