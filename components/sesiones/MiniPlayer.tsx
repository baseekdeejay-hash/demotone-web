'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Play, Pause, X, RotateCcw, RotateCw } from 'lucide-react';
import { usePlayerStore, formatTime } from '@/lib/sesiones/playerStore';

export default function MiniPlayer() {
  const current = usePlayerStore((s) => s.current);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const currentTime = usePlayerStore((s) => s.currentTime);
  const duration = usePlayerStore((s) => s.duration);
  const togglePlay = usePlayerStore((s) => s.togglePlay);
  const skip = usePlayerStore((s) => s.skip);
  const closeMini = usePlayerStore((s) => s.closeMini);
  const seekTo = usePlayerStore((s) => s.seekTo);

  if (!current) return null;

  const progress = duration > 0 ? currentTime / duration : 0;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#0a0a0b]/95 backdrop-blur-xl">
      {/* Barra de progreso superior, click para seek */}
      <div
        className="group relative h-1 w-full cursor-pointer bg-white/5"
        onClick={(e) => {
          const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
          const pct = (e.clientX - rect.left) / rect.width;
          seekTo(Math.max(0, Math.min(1, pct)) * (duration || 0));
        }}
        aria-label="Barra de progreso"
      >
        <div
          className="h-full bg-[#ff5500] transition-[width] duration-150"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <div className="mx-auto flex max-w-7xl items-center gap-3 px-3 py-2.5 md:gap-4 md:px-6 md:py-3">
        {/* Cover */}
        <Link
          href={`/sesiones/${current.slug}`}
          className="relative h-11 w-11 shrink-0 overflow-hidden rounded bg-[#222] md:h-12 md:w-12"
        >
          <Image
            src={current.cover}
            alt=""
            fill
            sizes="48px"
            className="object-cover"
            data-protect="true"
          />
        </Link>

        {/* Title + artist */}
        <Link
          href={`/sesiones/${current.slug}`}
          className="min-w-0 flex-1 truncate"
        >
          <div className="truncate text-sm font-semibold text-white">
            {current.title}
          </div>
          <div className="truncate text-xs text-zinc-400">{current.artist}</div>
        </Link>

        {/* Controles */}
        <button
          type="button"
          onClick={() => skip(-15)}
          className="hidden h-8 w-8 place-items-center rounded-full text-zinc-300 transition hover:bg-white/5 hover:text-white md:grid"
          aria-label="Retroceder 15 segundos"
        >
          <RotateCcw size={14} />
        </button>

        <button
          type="button"
          onClick={togglePlay}
          className="grid h-9 w-9 place-items-center rounded-full bg-[#ff5500] text-black transition hover:bg-[#ff7733]"
          aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
        >
          {isPlaying ? (
            <Pause size={16} fill="currentColor" />
          ) : (
            <Play size={16} fill="currentColor" />
          )}
        </button>

        <button
          type="button"
          onClick={() => skip(15)}
          className="hidden h-8 w-8 place-items-center rounded-full text-zinc-300 transition hover:bg-white/5 hover:text-white md:grid"
          aria-label="Avanzar 15 segundos"
        >
          <RotateCw size={14} />
        </button>

        {/* Time */}
        <span className="hidden font-mono text-[11px] tabular-nums text-zinc-400 md:inline">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>

        {/* Close */}
        <button
          type="button"
          onClick={closeMini}
          className="grid h-8 w-8 place-items-center rounded-full text-zinc-400 transition hover:bg-white/5 hover:text-white"
          aria-label="Cerrar reproductor"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
