# AGENTS.md — Guía de mantenimiento de la web DEMOTONE

> **Para la IA que lea esto:** este documento es la fuente de verdad sobre dónde está
> cada cosa y cómo tocarla sin romper el estilo ni el despliegue. Léelo **completo**
> antes de editar. Si una instrucción del usuario choca con lo que dice aquí, avisa
> del conflicto antes de actuar.
>
> Última verificación contra el código real: **2026-07-30**.

---

## 1. Identificación del proyecto (¡ojo, hay copias falsas!)

**Proyecto REAL y desplegado:**

```
C:\Users\BASEEK\Documents\IA - ANTIGRAVITY\demotone-next
```

En el disco existen otras carpetas con nombre parecido que **NO son la web en
producción**. No las edites nunca:

| Ruta | Qué es |
|---|---|
| `Documents\IA - ANTIGRAVITY\projecte web demotone\demotone-web` | Copia antigua (jun-2026), mezcla Vite + Next, abandonada |
| `Documents\IA - ANTIGRAVITY\projecte web demotone\demotone-web-backup` | Backup congelado |
| `Downloads\APPS-IA-GENERAR-IDEAS\DEMOTONE WEB` | Solo contiene `recovery-codes.txt`, no es código |

**Cómo confirmar que estás en la carpeta correcta** (los tres tienen que dar esto):

```bash
cat .vercel/project.json    # projectName debe ser "demotone-next"
git remote -v               # origin = github.com/baseekdeejay-hash/demotone-web
git log --oneline -1        # el commit más reciente del proyecto
```

---

## 2. Stack y despliegue

- **Framework:** Next.js 14.2.5, App Router, TypeScript, Tailwind CSS 3.4, Framer Motion.
- **Repo GitHub:** `https://github.com/baseekdeejay-hash/demotone-web`, rama **`main`**.
- **Proyecto Vercel:** `demotone-next`
  - `projectId`: `prj_FbMmLysdX2bY0VbQe0Rjdq3xPI2F`
  - `orgId`: `team_dqi7DzCGaX9QlGFhUCfn2AWw`
- **Dominio:** `demotone.es` (`www.demotone.es` redirige 301 al apex, ver `next.config.mjs`).
- **Pipeline:** `git push origin main` → Vercel construye y despliega automáticamente
  (~1-2 min). **No hace falta ejecutar `vercel` a mano.**

### ⚠️ Los ficheros `.bat` de la raíz están OBSOLETOS

`redeploy.bat`, `fix-and-push.bat`, `setup.bat`, `setup.ps1`, `fix-events.bat`,
`fix-sitemap.bat`, `push-cleanup.bat`, `push-marquee.bat` todos hacen:

```
cd /d "O:\BASEK MUSIC PRODUCCIONS\DEMOTONE\DESIGN\demotone-web"
```

Esa unidad `O:` ya no es la ubicación del proyecto. Además llevan el mensaje de commit
escrito a fuego. **No los uses.** Haz los comandos git a mano (ver §6).

### Variables de entorno

`.env.example` declara `GEMINI_API_KEY` (para `app/api/chat/route.ts`). Si hace falta,
se configura en Vercel → Project Settings → Environment Variables, y en local en
`.env.local` (ignorado por git).

---

## 3. Estructura: la web es UNA sola página

Todo el contenido vive en la home (`/`), como secciones que se recorren con scroll y
anclas (`#hero`, `#bio`, `#music`, `#sets`, `#contact`). **No hay más rutas de
contenido.** Las únicas rutas adicionales son técnicas: `robots.txt`, `sitemap.xml` y
el endpoint `app/api/chat/route.ts`.

```
demotone-next/
├─ app/
│  ├─ layout.tsx          # <html>, fuentes Google, TODO el SEO/metadata, JSON-LD
│  ├─ page.tsx            # Home: ensambla las secciones en orden
│  ├─ globals.css         # variables CSS + clases utilitarias propias (§5)
│  ├─ robots.ts           # robots.txt generado
│  ├─ sitemap.ts          # sitemap.xml generado
│  └─ api/chat/route.ts   # endpoint Gemini (stub, requiere GEMINI_API_KEY)
├─ components/
│  ├─ Navbar.tsx  Hero.tsx  Bio.tsx  Music.tsx  Sets.tsx  Contact.tsx  Footer.tsx
│  ├─ SeoJsonLd.tsx
│  └─ effects/    # CustomCursor, GlitchText, Marquee, ParticleField,
│                 # PrivacyGuard (anti-descarga de imágenes), Reveal (scroll)
├─ data/
│  └─ content.ts  # ★ TEXTOS, ENLACES, TRACKS Y VÍDEOS — casi todo se edita aquí
├─ public/
│  ├─ favicon.svg  og.jpg
│  ├─ images/     # hero.jpg, bio.jpg, wordmark.jpg, logo-mono.jpg, singular.jpg,
│  │              # hero-poster.jpg, *-placeholder.svg
│  └─ videos/hero.mp4
├─ middleware.ts        # ★ Content-Security-Policy con nonce (§5.4)
├─ next.config.mjs      # security headers, redirect www→apex, remotePatterns
└─ tailwind.config.ts   # ★ paleta y animaciones
```

Alias de imports: `@/` = raíz del proyecto (`tsconfig.json`). Ej. `@/data/content`.

Orden de las secciones en `app/page.tsx`: Hero → Bio → Music → Sets → Contact → Footer.

---

## 4. Cómo añadir contenido

### 4.1 ★ RECETA: añadir un vídeo nuevo de YouTube

La sección **"Sets & Lives"** (`https://demotone.es/#sets`) la pinta
`components/Sets.tsx` a partir del array `mixes` de `data/content.ts`. Muestra una
rejilla de tarjetas con la **miniatura de YouTube**; al hacer clic, la miniatura se
sustituye por el iframe embebido. Se parte en dos bloques automáticamente según el
campo `category`:

- `category: 'session'` → bloque **"Sesiones"** (icono disco)
- `category: 'live'` → bloque **"Lives"** (icono radio)

Añadir un vídeo es un cambio de **una sola línea de datos**. La miniatura, el botón de
play, el iframe, el número de orden y el enlace externo son automáticos.

**Paso 1 — Saca el ID del vídeo del enlace.** El ID son 11 caracteres:

| Formato del enlace que te dan | ID |
|---|---|
| `https://www.youtube.com/watch?v=a40G1Zvawvk` | `a40G1Zvawvk` |
| `https://youtu.be/a40G1Zvawvk` | `a40G1Zvawvk` |
| `https://www.youtube.com/live/a40G1Zvawvk` | `a40G1Zvawvk` |
| `https://www.youtube.com/shorts/a40G1Zvawvk` | `a40G1Zvawvk` |
| `https://youtu.be/a40G1Zvawvk?si=XXXX&t=30` | `a40G1Zvawvk` |

Descarta siempre los parámetros `?si=`, `&t=`, `&list=`, `&index=`.

**Paso 2 — Añade el objeto al array `mixes` de `data/content.ts`.**

El tipo es (no inventes campos, TypeScript rompe el build):

```ts
export type Mix = {
  title: string;                          // obligatorio
  type: 'youtube' | 'soundcloud';         // obligatorio
  id: string;                             // obligatorio: el ID de 11 chars (o la URL completa si es soundcloud)
  category: 'session' | 'live';           // obligatorio: decide en qué bloque sale
  venue?: string;                         // opcional: sale arriba-izquierda de la ficha
  date?: string;                          // opcional: sale en amarillo, formato 'MM / YYYY'
  collaborator?: string;                  // opcional: se pinta como "· w/ Nombre"
};
```

Ejemplo real, añadiendo una Session 03 al principio de las sesiones:

```ts
export const mixes: Mix[] = [
  {
    title: 'Hardgroove Techno Session 03',
    type: 'youtube',
    id: 'vtqU1bvpp24',
    category: 'session',
    venue: 'Teseracto Local',
    date: '07 / 2026'
  },
  {
    title: 'Hardgroove Techno Session 01',
    // ...el resto tal como estaba
  }
];
```

**Paso 3 — Nada más.** Concretamente, **NO** hagas:

- ❌ No descargues ni guardes ninguna imagen en `public/images/`. La miniatura la saca
  `Sets.tsx` sola de `https://i.ytimg.com/vi/<ID>/hqdefault.jpg`.
- ❌ No edites `Sets.tsx`. Ya itera el array y numera las fichas (`01 //`, `02 //`…).
- ❌ No crees un componente nuevo ni una sección nueva.
- ❌ No toques el CSP: `youtube-nocookie.com` e `i.ytimg.com` ya están permitidos.

**Orden de aparición:** el orden del array es el orden en pantalla, dentro de cada
`category`. Vídeo nuevo arriba = primero. El contador "NN pistas" del encabezado se
recalcula solo.

**Verifica y publica:** `npm run build` y luego el flujo de §6.

### 4.2 Añadir un set de SoundCloud a la misma sección

Igual que arriba, pero `type: 'soundcloud'` y en `id` va la **URL completa** del track:

```ts
{
  title: 'Nombre del set',
  type: 'soundcloud',
  id: 'https://soundcloud.com/demotone/nombre-del-track',
  category: 'session'
}
```

Ojo: las tarjetas SoundCloud **no tienen miniatura** (`thumb` es `null`), muestran un
degradado con el botón de play. Es el comportamiento previsto, no un bug.

### 4.3 Añadir un track/release a la sección "Música"

Array `tracks` en `data/content.ts`. Tipo `Track`:
`{ title, type: 'youtube'|'soundcloud', id, label?, year? }`.

Diferencia con `mixes`: en Música el iframe se carga **directo, sin miniatura ni clic
previo**. Un YouTube aquí se embebe desde el primer render.

### 4.4 Cambiar textos, bio, redes o email

Todo vive en `data/content.ts`: objetos `site`, `nav`, `bio`, `contact`. No hay textos
duplicados en los componentes salvo los títulos de sección.

Si cambias el título o la descripción del sitio, actualiza **también** el bloque
`metadata` de `app/layout.tsx` (título OG, descripción, keywords) y
`components/SeoJsonLd.tsx`, que no leen de `content.ts`.

---

## 5. Sistema de diseño — respétalo o la web deja de parecer la misma

### 5.1 Paleta (`tailwind.config.ts`)

| Token | Hex | Uso |
|---|---|---|
| `ink-900` | `#050505` | fondo base de la página |
| `ink-800` | `#0a0a0b` | fondo de secciones alternas y tarjetas |
| `ink-700/600/500` | `#111113`/`#16161a`/`#1d1d22` | degradados y capas |
| `ink-400` | `#26262d` | **bordes** (casi siempre con `/60` de opacidad) |
| `bone-100` | `#f5f5f0` | texto principal |
| `bone-200` | `#dcdcd6` | texto secundario |
| `bone-300` | `#a8a89e` | micro-texto, metadatos |
| `acid` | `#e6ff04` | **acento principal** (amarillo neón) |
| `flare` | `#ff5b1f` | acento secundario (glitch) |

Usa **siempre** estos tokens de Tailwind. No metas hex sueltos en el JSX ni introduzcas
colores nuevos: el amarillo `acid` es la identidad de la marca.

### 5.2 Tipografía

Cargada con `next/font/google` en `app/layout.tsx` y expuesta como variables CSS:

- `font-display` → Space Grotesk. Titulares, siempre `uppercase` + `tracking-tight`.
- `font-mono` → JetBrains Mono. Etiquetas, metadatos, botones. Siempre `uppercase` con
  `tracking-[0.22em]` o `tracking-[0.28em]` y tamaños diminutos (`text-[10px]`,
  `text-[11px]`).
- `font-sans` → Inter. Párrafos.

No añadas fuentes nuevas.

### 5.3 Clases utilitarias propias (`app/globals.css`)

`.eyebrow` (etiqueta de sección con raya), `.btn-neon` (botón contorno amarillo con
relleno al hover), `.bg-industrial-grid`, `.bg-scanlines`, `.glitch` (necesita
`data-text`), `.marquee-track`, `.reveal-init`, `.no-pick`.

**Patrón de sección** — cópialo si creas una sección nueva:

```tsx
<section id="xxx" className="relative overflow-hidden border-t border-ink-400/40 bg-ink-900 py-24 md:py-32">
  <div className="absolute inset-0 -z-10 bg-industrial-grid opacity-30" />
  <div className="mx-auto max-w-7xl px-6">
    <Reveal><span className="eyebrow">// 05 — Nombre</span></Reveal>
    <Reveal delay={0.05}>
      <h2 className="mt-6 max-w-3xl font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight text-bone-100 md:text-7xl">
        Título <span className="text-acid">/</span> aquí
      </h2>
    </Reveal>
    {/* contenido */}
  </div>
</section>
```

**Patrón de tarjeta:** `border border-ink-400/60 bg-ink-800` +
`transition-colors hover:border-acid/60`, más los **cuatro `<span>` de esquina** que
aparecen al hover (`opacity-0 ... group-hover:opacity-100`). Está en `Sets.tsx` líneas
51-54 y en `Music.tsx` 45-48: cópialo literalmente.

**Animación de entrada:** envuelve en `<Reveal delay={0.05 * i}>` los elementos de una
lista. Las secciones van numeradas en el eyebrow (`// 01` Bio, `// 02` Discografía,
`// 03` Sets & Lives…): si insertas una sección, renumera las siguientes y añade la
entrada correspondiente al array `nav` de `data/content.ts`.

### 5.4 ★ Content-Security-Policy — la trampa nº1

`middleware.ts` inyecta un CSP estricto en todas las rutas menos `/api`. Si añades un
embed o una imagen de un dominio nuevo y **no** lo declaras ahí, el iframe sale en
blanco o la imagen no carga, sin error visible en el build:

- `frame-src` permitidos hoy: `'self'`, `youtube.com`, `youtube-nocookie.com`,
  `w.soundcloud.com`. → Vimeo, Twitch, Spotify, Bandcamp **hay que añadirlos**.
- `img-src` permitidos hoy: `'self'`, `blob:`, `data:`, `i.ytimg.com`, `i1.sndcdn.com`.
- `media-src`: `'self'`, `blob:`.
- `connect-src`: `'self'`.

Y si usas `next/image` con un host remoto, además hay que añadirlo a
`images.remotePatterns` en `next.config.mjs`. Nota: `Sets.tsx` y `Music.tsx` usan
`<img>` normal a propósito (con `eslint-disable-next-line @next/next/no-img-element`)
para las miniaturas de YouTube, así que ahí no aplica.

### 5.5 Otras restricciones que rompen el deploy

- `typescript: { ignoreBuildErrors: false }` → **cualquier error de tipos tumba el
  build de Vercel**. Corre `npm run build` en local antes de subir.
- `eslint: { ignoreDuringBuilds: true }` → los avisos de lint no bloquean.
- Componentes con hooks o manejadores de eventos necesitan `'use client'` en la primera
  línea. Es un olvido que ya ha roto un build en este repo.
- `X-Frame-Options: DENY` y `frame-ancestors 'none'`: la web no se puede embeber en
  otro sitio. No es un bug.
- `PrivacyGuard` + reglas CSS en `globals.css` bloquean arrastrar/seleccionar imágenes.

---

## 6. Flujo de trabajo para cada cambio

```bash
cd "C:\Users\BASEEK\Documents\IA - ANTIGRAVITY\demotone-next"
```

1. `git status` — comprueba que partes de un árbol limpio.
2. `npm install` solo si falta `node_modules`.
3. Edita los ficheros de datos (casi siempre `data/content.ts`).
4. `npm run build` — **obligatorio**, tiene que acabar sin errores.
5. Opcional: `npm run dev` y mira `http://localhost:3000/#sets`.
6. Commit y push:

```bash
git add -A
git commit -m "feat(sets): anadir Hardgroove Techno Session 03"
git push origin main
```

Estilo de mensajes de commit del repo: `tipo(ambito): descripcion` en minúsculas
(`feat`, `fix`, `chore`, `docs`; ámbitos vistos: `sets`, `seo`, `security`).
Evita acentos y eñes en el mensaje: el historial ya tiene problemas de codificación.

7. Espera 1-2 min y verifica en `https://demotone.es`. Si el deploy falla, el log está
   en el dashboard de Vercel del proyecto `demotone-next`.

---

## 7. Problemas conocidos (no son "tuyos", ya venían así)

1. **Canónica contradictoria.** `app/sitemap.ts` declara `https://www.demotone.es`
   como canónica, pero `next.config.mjs` redirige `www` → apex y `app/layout.tsx`
   pone `https://demotone.es` en `alternates.canonical`. El sitemap es el que está
   mal; arreglarlo = usar el apex.
2. **`README.md` desactualizado.** Su árbol de ficheros menciona `Events.tsx` (borrado
   en el commit `e48bff1`) y componentes de efectos con nombres antiguos
   (`ParticleBackground`, `ScrollReveal`). Fíate de este AGENTS.md, no del README.
3. **`app/api/chat/route.ts`** depende de `GEMINI_API_KEY`, que puede no estar
   configurada en Vercel. No está enganchado a ninguna interfaz todavía.

### Nota histórica: el área `/sesiones` fue eliminada

Hubo una sección `/sesiones` (biblioteca de MP3 con reproductor de waveform,
`wavesurfer.js`, `zustand`, un proxy de audio en `app/api/audio` y una paleta naranja
propia). Estaba inacabada y se **borró por completo el 2026-07-30**. Si ves referencias
a ella en commits antiguos, en el `README.md` o en los `.bat`, ignóralas: **no la
recrees salvo que el usuario lo pida explícitamente.** El código sigue recuperable en
el historial de git (anterior al commit de borrado).

---

## 8. Chuleta: "quiero X" → "toca Y"

| El usuario pide | Fichero a editar |
|---|---|
| Añadir vídeo de YouTube a Sesiones o Lives | `data/content.ts` → `mixes` (§4.1) |
| Añadir track/remix a Música | `data/content.ts` → `tracks` |
| Cambiar bio, tagline, descripción | `data/content.ts` → `bio`, `site` |
| Cambiar email o redes sociales | `data/content.ts` → `contact` |
| Cambiar items del menú | `data/content.ts` → `nav` |
| Cambiar título/SEO/OG de la web | `app/layout.tsx` + `components/SeoJsonLd.tsx` |
| Cambiar la foto del hero o de la bio | `public/images/` + rutas en `data/content.ts` |
| Cambiar colores o animaciones | `tailwind.config.ts` (+ `app/globals.css`) |
| Permitir embeds de un servicio nuevo | `middleware.ts` (`frame-src`/`img-src`) (§5.4) |
| Reordenar secciones | `app/page.tsx` (y renumerar los `.eyebrow`) |
