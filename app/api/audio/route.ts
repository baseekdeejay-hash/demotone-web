/**
 * Proxy de audio para resolver mixed content (HTTPS->HTTP).
 *
 * Cliente: fetch('/api/audio?src=<url-encoded>')
 * Servidor: hace fetch a la URL HTTP del servidor del usuario y reenvia el stream.
 *
 * Solo permite hosts en la whitelist (defensa anti-SSRF).
 * Cachea agresivamente porque los MP3s son inmutables.
 */
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

const ALLOWED_HOSTS = new Set<string>([
  '143.47.48.85'
]);

export async function GET(req: NextRequest) {
  const src = req.nextUrl.searchParams.get('src');
  if (!src) {
    return NextResponse.json({ error: 'Falta el parametro src' }, { status: 400 });
  }

  let target: URL;
  try {
    target = new URL(src);
  } catch {
    return NextResponse.json({ error: 'URL invalida' }, { status: 400 });
  }

  if (!ALLOWED_HOSTS.has(target.hostname)) {
    return NextResponse.json({ error: 'Host no permitido' }, { status: 403 });
  }
  if (target.protocol !== 'http:' && target.protocol !== 'https:') {
    return NextResponse.json({ error: 'Protocolo no permitido' }, { status: 403 });
  }

  const range = req.headers.get('range') ?? '';

  try {
    const upstream = await fetch(target.toString(), {
      headers: range ? { Range: range } : {},
      cache: 'no-store'
    });

    if (!upstream.ok && upstream.status !== 206) {
      return NextResponse.json(
        { error: 'Audio no disponible' },
        { status: upstream.status }
      );
    }

    const headers = new Headers();
    const passThrough = [
      'content-type',
      'content-length',
      'accept-ranges',
      'content-range',
      'last-modified',
      'etag'
    ];
    for (const k of passThrough) {
      const v = upstream.headers.get(k);
      if (v) headers.set(k, v);
    }
    if (!headers.has('content-type')) headers.set('content-type', 'audio/mpeg');
    headers.set('cache-control', 'public, max-age=3600, immutable');
    headers.set('access-control-allow-origin', '*');

    return new NextResponse(upstream.body, {
      status: upstream.status,
      headers
    });
  } catch {
    return NextResponse.json(
      { error: 'Error contactando con el servidor de audio' },
      { status: 502 }
    );
  }
}

// CORS preflight (por si lo necesita el <audio>)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'GET, HEAD, OPTIONS',
      'access-control-allow-headers': 'range, content-type'
    }
  });
}
