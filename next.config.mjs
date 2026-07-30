/** @type {import('next').NextConfig} */

const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' }
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: false },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: 'i1.sndcdn.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' }
    ]
  },
  // OJO: no anadir aqui una redireccion www -> apex. Vercel ya redirige
  // demotone.es -> www.demotone.es a nivel de dominio, y las dos juntas
  // provocan un bucle infinito que tumba la web (paso el 2026-07-30).
  // El dominio canonico es https://www.demotone.es
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders
      }
    ];
  }
};

export default nextConfig;
