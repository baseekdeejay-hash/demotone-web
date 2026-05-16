/**
 * Endpoint serverless para futuras consultas a Google Gemini (free tier).
 *
 * Uso desde el cliente:
 *   const r = await fetch('/api/chat', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify({ message: '...', systemPrompt: '...' })
 *   });
 *   const data = await r.json();
 *
 * Requiere variable de entorno GEMINI_API_KEY (configurar en Vercel).
 * Documentación: https://ai.google.dev/gemini-api/docs
 */

import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

// Modelo free tier recomendado. Cambiar a gemini-1.5-flash-latest si se prefiere.
const MODEL = 'gemini-2.0-flash';

type Body = {
  message?: string;
  systemPrompt?: string;
  history?: { role: 'user' | 'model'; text: string }[];
};

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          'GEMINI_API_KEY no configurada. Añade la variable en Vercel → Project Settings → Environment Variables.'
      },
      { status: 503 }
    );
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 });
  }

  const message = (body.message ?? '').trim();
  if (!message) {
    return NextResponse.json({ error: 'Falta el campo "message"' }, { status: 400 });
  }
  if (message.length > 4000) {
    return NextResponse.json(
      { error: 'Mensaje demasiado largo (máx 4000 caracteres)' },
      { status: 400 }
    );
  }

  const contents = [
    ...(body.history ?? []).map((h) => ({
      role: h.role,
      parts: [{ text: h.text }]
    })),
    { role: 'user', parts: [{ text: message }] }
  ];

  const payload: Record<string, unknown> = {
    contents,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1024
    }
  };

  if (body.systemPrompt) {
    payload.systemInstruction = {
      role: 'system',
      parts: [{ text: body.systemPrompt }]
    };
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`;

  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!r.ok) {
      const errText = await r.text();
      return NextResponse.json(
        { error: 'Gemini API error', detail: errText.slice(0, 500) },
        { status: 502 }
      );
    }

    const data = (await r.json()) as {
      candidates?: { content?: { parts?: { text?: string }[] } }[];
    };
    const text =
      data.candidates?.[0]?.content?.parts?.map((p) => p.text ?? '').join('') ??
      '';

    return NextResponse.json({ text, model: MODEL });
  } catch (err) {
    return NextResponse.json(
      { error: 'Fallo de red contactando a Gemini', detail: String(err) },
      { status: 502 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    endpoint: '/api/chat',
    method: 'POST',
    model: MODEL,
    note:
      'Stub listo. Configura GEMINI_API_KEY en Vercel y haz POST con { message: "..." }.'
  });
}
