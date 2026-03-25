import { NextResponse } from "next/server";

interface InsightRequestBody {
  pasajero: string;
  destino: string;
  estado: string;
  fecha_regreso: string;
  clima: {
    description: string;
    temperature: number;
  };
}

const SYSTEM_PROMPT = `Eres un asistente interno para agentes de asistencia al viajero de Assist-365.
Generás un mensaje breve dirigido al agente (no al pasajero) para que pueda asistir mejor.

Estructura del mensaje:
1. Situación: nombrar al pasajero, su destino y el clima actual (1 oración).
2. Sugerencias para el agente: 2-3 recomendaciones concretas que el agente puede hacerle al pasajero según el clima y el estado del viaje (1-2 oraciones).

Tono: profesional pero cercano, como un compañero de trabajo que te ayuda. Usá "podrías sugerirle", "es buen momento para recomendarle".
Extensión: máximo 3-4 oraciones. Texto plano en español, sin markdown ni bullets.

Ejemplo:
Datos: Pasajero: Ana Torres, Destino: Madrid, Estado: confirmada, Regreso: 2025-02-10, Clima: cielo despejado, 6°C
Respuesta: La pasajera Ana Torres se encuentra en Madrid con clima frío y cielo despejado (6°C). Podrías sugerirle abrigarse bien para recorrer el Retiro o la Gran Vía, aprovechar para visitar el Museo del Prado en las horas más frías y llevar una bufanda para las tardes. Como su viaje finaliza pronto, también es buen momento para recordarle los datos de su vuelo de regreso.`;

function buildUserPrompt(data: InsightRequestBody): string {
  return `Datos: Pasajero: ${data.pasajero}, Destino: ${data.destino}, Estado: ${data.estado}, Regreso: ${data.fecha_regreso}, Clima: ${data.clima.description}, ${data.clima.temperature}°C
Respuesta:`;
}

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

export async function POST(request: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "OPENROUTER_API_KEY not configured" },
      { status: 500 }
    );
  }

  try {
    const body: InsightRequestBody = await request.json();

    if (!body.pasajero || !body.destino) {
      return NextResponse.json(
        { error: "Missing required fields: pasajero, destino" },
        { status: 400 }
      );
    }

    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-001",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: buildUserPrompt(body) },
        ],
        max_tokens: 250,
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("OpenRouter API error:", response.status, errorData);
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    const message =
      data.choices?.[0]?.message?.content ??
      "No se pudo generar el insight.";

    return NextResponse.json({
      message: message.trim(),
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Insight generation error:", error);

    return NextResponse.json(
      { error: "Failed to generate insight" },
      { status: 500 }
    );
  }
}
