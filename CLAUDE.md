# CLAUDE.md

Toda la guía de este proyecto está en **[AGENTS.md](./AGENTS.md)**. Léelo entero antes
de editar nada.

Resumen de urgencia:

- Web de **DEMOTONE** (Next.js 14 App Router + Tailwind). Dominio: `demotone.es`.
- Es **una sola página** con secciones ancladas (`#hero`, `#bio`, `#music`, `#sets`,
  `#contact`). No hay otras rutas de contenido.
- **`git push` NO despliega.** GitHub no está conectado a Vercel. Para publicar:
  `npx vercel deploy --prod --yes --scope demotone-s-projects` (proyecto `demotone-web`,
  que es el que tiene el dominio; `demotone-next` es un duplicado sin dominio).
- Nunca añadas una redirección `www` → apex en `next.config.mjs`: hace bucle infinito
  con la redirección de Vercel y tumba la web (AGENTS.md §7.1).
- **Añadir un vídeo de YouTube a la sección Sesiones/Lives = añadir un objeto al array
  `mixes` de `data/content.ts` con el ID de 11 caracteres.** La miniatura, el play y el
  iframe son automáticos. No descargues imágenes ni toques `components/Sets.tsx`.
  Receta completa en AGENTS.md §4.1.
- `npm run build` tiene que pasar antes de hacer push (los errores de TypeScript
  tumban el deploy).
- Si añades embeds de un dominio nuevo, actualiza el CSP en `middleware.ts` (§5.4).
