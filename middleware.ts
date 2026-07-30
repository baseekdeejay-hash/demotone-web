import { NextResponse } from 'next/server'
 
// OJO con script-src: NO uses 'strict-dynamic' con nonce aqui.
// Next.js no estaba aplicando el nonce a sus <script>, y 'strict-dynamic'
// hace que el navegador IGNORE 'self' y 'unsafe-inline'. Resultado: se
// bloquean TODOS los scripts, React no hidrata y la web se ve muerta
// (sin video de portada, sin animaciones, sin botones de play).
// Paso el 2026-07-30. Si tocas esto, verifica que la web hidrata (§7.3).
export function middleware(request: Request) {
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' ${process.env.NODE_ENV === 'production' ? '' : "'unsafe-eval'"};
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' blob: data: https://i.ytimg.com https://i1.sndcdn.com;
    font-src 'self' data: https://fonts.gstatic.com;
    media-src 'self' blob:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
    connect-src 'self';
    frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://w.soundcloud.com;
`
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, ' ')
    .trim()
 
  // El CSP se pone SOLO en la respuesta. Si se pone tambien en los headers
  // de la peticion, Next intenta gestionar el nonce por su cuenta.
  const response = NextResponse.next()
  response.headers.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue
  )
 
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
