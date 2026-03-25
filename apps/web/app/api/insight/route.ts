import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

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

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "API key not configured" },
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

    const client = new Anthropic({ apiKey });

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 200,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: buildUserPrompt(body),
        },
      ],
    });

    const textBlock = response.content.find((block) => block.type === "text");
    const message = textBlock?.text ?? "No se pudo generar el insight.";

    return NextResponse.json({
      message,
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
