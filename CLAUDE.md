# CLAUDE.md

Toda la guía de este proyecto está en **[AGENTS.md](./AGENTS.md)**. Léelo entero antes
de editar nada.

Resumen de urgencia:

- Web de **DEMOTONE** (Next.js 14 App Router + Tailwind). Dominio: `demotone.es`.
- Deploy: `git push origin main` → Vercel (proyecto `demotone-next`) despliega solo.
- **Añadir un vídeo de YouTube a la sección Sesiones/Lives = añadir un objeto al array
  `mixes` de `data/content.ts` con el ID de 11 caracteres.** La miniatura, el play y el
  iframe son automáticos. No descargues imágenes ni toques `components/Sets.tsx`.
  Receta completa en AGENTS.md §5.1.
- `npm run build` tiene que pasar antes de hacer push (los errores de TypeScript
  tumban el deploy).
- Si añades embeds de un dominio nuevo, actualiza el CSP en `middleware.ts` (§6.4).
