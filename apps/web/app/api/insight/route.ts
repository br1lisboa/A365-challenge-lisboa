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

const SYSTEM_PROMPT = `Eres un asistente inteligente para agentes de asistencia al viajero de la empresa Assist-365.
Tu rol es generar un breve mensaje de asistencia (2-3 oraciones máximo) combinando los datos del viajero.
El mensaje debe ser conciso, útil y proactivo. Debe ayudar al agente a tomar decisiones sobre cómo asistir al pasajero.
No uses formato markdown ni bullets. Escribe en texto plano, en español.`;

function buildUserPrompt(data: InsightRequestBody): string {
  return `Datos del viajero:
- Pasajero: ${data.pasajero}
- Destino: ${data.destino}
- Estado de reserva: ${data.estado}
- Fecha de regreso: ${data.fecha_regreso}
- Clima actual en destino: ${data.clima.description}, ${data.clima.temperature}°C

Genera un insight breve y accionable para el agente de asistencia.`;
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
        max_tokens: 200,
        temperature: 0.7,
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
      {
        message:
          "No se pudo generar el insight en este momento. Intente nuevamente.",
        generatedAt: new Date().toISOString(),
        error: true,
      },
      { status: 200 }
    );
  }
}
