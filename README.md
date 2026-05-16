# demotone-web

Sitio oficial de **Demotone** (Techno) — alias **Baseek** (Hardgroove · Techno · Acid).
Construido con Next.js 14 (App Router), TypeScript, Tailwind CSS y Framer Motion.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Variables de entorno

Copia `.env.example` a `.env.local` y rellena:

- `GEMINI_API_KEY` — clave de Google Gemini para la futura ruta `/api/chat` (asistente de IA gratuito).

En Vercel, configura las mismas variables en **Project Settings → Environment Variables**.

## Estructura

```
app/
  layout.tsx        # Layout raíz + fuentes
  page.tsx          # Página principal con todas las secciones
  globals.css       # Estilos globales y utilidades custom
  api/chat/route.ts # Endpoint serverless para Gemini (stub)
components/
  Navbar.tsx, Hero.tsx, Bio.tsx, Music.tsx, Sets.tsx,
  Events.tsx, Contact.tsx, Footer.tsx
  effects/          # ParticleBackground, GlitchText, CustomCursor, ScrollReveal
data/
  content.ts        # Configuración central de textos y enlaces
public/             # Imágenes y assets estáticos
```

## Despliegue

Push a `main` → deploy automático en Vercel.
