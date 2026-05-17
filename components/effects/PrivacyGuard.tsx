'use client';

import { useEffect } from 'react';

/**
 * Capa de disuasión contra descarga casual de imágenes/video.
 *
 * IMPORTANTE: ningún método protege al 100% (cualquier usuario con DevTools
 * puede sacar las imágenes). Esto solo bloquea al 95% de usuarios casuales:
 *  - Bloquea menú contextual (clic derecho) sobre img, video y picture
 *  - Bloquea drag&drop de imágenes
 *  - Bloquea selección / arrastre de texto sobre estos elementos
 */
export default function PrivacyGuard() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isMedia = (el: EventTarget | null): boolean => {
      if (!(el instanceof HTMLElement)) return false;
      const tag = el.tagName.toLowerCase();
      return (
        tag === 'img' ||
        tag === 'picture' ||
        tag === 'video' ||
        tag === 'source' ||
        !!el.closest('img, picture, video, [data-protect="true"]')
      );
    };

    const onContextMenu = (e: MouseEvent) => {
      if (isMedia(e.target)) e.preventDefault();
    };
    const onDragStart = (e: DragEvent) => {
      if (isMedia(e.target)) e.preventDefault();
    };
    const onSelectStart = (e: Event) => {
      if (isMedia(e.target)) e.preventDefault();
    };

    document.addEventListener('contextmenu', onContextMenu);
    document.addEventListener('dragstart', onDragStart);
    document.addEventListener('selectstart', onSelectStart);

    return () => {
      document.removeEventListener('contextmenu', onContextMenu);
      document.removeEventListener('dragstart', onDragStart);
      document.removeEventListener('selectstart', onSelectStart);
    };
  }, []);

  return null;
}
