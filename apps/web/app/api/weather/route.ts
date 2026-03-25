import { NextResponse } from "next/server";

const WEATHER_URL = "https://api.assist-365.com/api/weather/current";
const AUTH_KEY =
  "A365_AUTH_cbc0260c7c2067809eefd2b03a77925dae35e2adf3ab0d6553a867b88dbe5515_SECURE_2024";

export async function GET(request: Request) {
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
      headers: { "X-System-Auth-Key": AUTH_KEY },
    });

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const json = await response.json();
    const data = json.data;

    return NextResponse.json({
      city: data.city,
      temperature: data.temperature,
      description: data.weather?.description ?? "No disponible",
      humidity: data.humidity,
      icon: data.weather?.icon ?? "",
      feels_like: data.feels_like,
      wind_speed: data.wind?.speed ?? 0,
    });
  } catch (error) {
    console.error("Weather proxy error:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather" },
      { status: 500 }
    );
  }
}
