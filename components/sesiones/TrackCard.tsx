'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Play, Pause } from 'lucide-react';
import { usePlayerStore } from '@/lib/sesiones/playerStore';
import type { Session } from '@/lib/sesiones/data';

export default function TrackCard({ session }: { session: Session }) {
  const current = usePlayerStore((s) => s.current);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const play = usePlayerStore((s) => s.play);
  const togglePlay = usePlayerStore((s) => s.togglePlay);

  const isCurrent = current?.slug === session.slug;
  const showPause = isCurrent && isPlaying;

  return (
    <article className="group relative flex flex-col gap-3 rounded-md bg-[#1a1a1a] p-3 ring-1 ring-white/5 transition hover:bg-[#222] hover:ring-white/10">
      <Link
        href={`/sesiones/${session.slug}`}
        className="relative aspect-square overflow-hidden rounded bg-[#222]"
      >
        <Image
          src={session.cover}
          alt={session.title}
          fill
          sizes="(max-width:768px) 50vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-105"
          data-protect="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60" />

        {/* Botón play flotante */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            if (isCurrent) togglePlay();
            else play(session);
          }}
          className="absolute right-3 bottom-3 grid h-11 w-11 place-items-center rounded-full bg-[#ff5500] text-black opacity-90 shadow-lg shadow-[#ff5500]/40 transition hover:opacity-100"
          aria-label={showPause ? 'Pausar' : 'Reproducir'}
        >
          {showPause ? (
            <Pause size={18} fill="currentColor" />
          ) : (
            <Play size={18} fill="currentColor" />
          )}
        </button>
      </Link>

      <div className="flex flex-col gap-0.5 px-1 pb-1">
        <Link
          href={`/sesiones/${session.slug}`}
          className="truncate text-sm font-semibold text-white hover:text-[#ff5500]"
        >
          {session.title}
        </Link>
        <span className="truncate text-xs text-zinc-400">
          {session.artist}
        </span>
        {session.genres?.length ? (
          <div className="mt-1 flex flex-wrap gap-1">
            {session.genres.slice(0, 3).map((g) => (
              <span
                key={g}
                className="rounded-sm bg-white/5 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-zinc-300"
              >
                {g}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
