'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  RotateCw,
  Gauge
} from 'lucide-react';
import Waveform from './Waveform';
import { usePlayerStore, formatTime } from '@/lib/sesiones/playerStore';
import type { Session } from '@/lib/sesiones/data';

const RATES = [0.5, 0.75, 1, 1.25, 1.5, 2];

export default function BigPlayer({ session }: { session: Session }) {
  const current = usePlayerStore((s) => s.current);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const currentTime = usePlayerStore((s) => s.currentTime);
  const duration = usePlayerStore((s) => s.duration);
  const volume = usePlayerStore((s) => s.volume);
  const rate = usePlayerStore((s) => s.rate);
  const setVolume = usePlayerStore((s) => s.setVolume);
  const setRate = usePlayerStore((s) => s.setRate);
  const togglePlay = usePlayerStore((s) => s.togglePlay);
  const skip = usePlayerStore((s) => s.skip);
  const _setCurrent = usePlayerStore((s) => s._setCurrent);

  // Marca esta session como activa en el store al montar
  useEffect(() => {
    _setCurrent(session);
  }, [session, _setCurrent]);

  const showThisPlayer = !current || current.slug === session.slug;

  return (
    <article className="rounded-md bg-[#1a1a1a] p-5 md:p-7 ring-1 ring-white/5">
      <div className="flex flex-col gap-5 md:flex-row md:gap-7">
        {/* Cover */}
        <div className="relative h-44 w-44 shrink-0 overflow-hidden rounded bg-[#222] md:h-52 md:w-52">
          <Image
            src={session.cover}
            alt={session.title}
            fill
            sizes="(max-width:768px) 176px, 208px"
            className="object-cover"
            data-protect="true"
          />
        </div>

        {/* Info + waveform + controles */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h1 className="font-display text-2xl font-bold text-white md:text-3xl">
              {session.title}
            </h1>
            <span className="text-sm text-zinc-400">por</span>
            <span className="text-sm font-semibold text-[#ff5500]">
              {session.artist}
            </span>
          </div>

          {session.description ? (
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-400">
              {session.description}
            </p>
          ) : null}

          {session.genres?.length ? (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {session.genres.map((g) => (
                <span
                  key={g}
                  className="rounded-sm bg-white/5 px-2 py-0.5 text-[11px] uppercase tracking-wider text-zinc-300"
                >
                  #{g}
                </span>
              ))}
            </div>
          ) : null}

          {/* Waveform — solo se monta para la sesion actual */}
          <div className="mt-5">
            {showThisPlayer ? <Waveform session={session} big /> : null}
            <div className="mt-2 flex items-center justify-between font-mono text-[11px] text-zinc-400">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controles */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => skip(-15)}
              className="grid h-10 w-10 place-items-center rounded-full bg-white/5 text-white transition hover:bg-white/10"
              aria-label="Retroceder 15 segundos"
            >
              <RotateCcw size={16} />
            </button>

            <button
              type="button"
              onClick={togglePlay}
              className="grid h-14 w-14 place-items-center rounded-full bg-[#ff5500] text-black shadow-lg shadow-[#ff5500]/30 transition hover:bg-[#ff7733]"
              aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
            >
              {isPlaying ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" />}
            </button>

            <button
              type="button"
              onClick={() => skip(15)}
              className="grid h-10 w-10 place-items-center rounded-full bg-white/5 text-white transition hover:bg-white/10"
              aria-label="Avanzar 15 segundos"
            >
              <RotateCw size={16} />
            </button>

            {/* Velocidad */}
            <div className="ml-2 flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-xs text-zinc-300">
              <Gauge size={14} />
              <select
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="cursor-pointer bg-transparent text-xs outline-none"
                aria-label="Velocidad de reproducción"
              >
                {RATES.map((r) => (
                  <option key={r} value={r} className="bg-[#1a1a1a]">
                    {r}x
                  </option>
                ))}
              </select>
            </div>

            {/* Volumen */}
            <div className="ml-auto flex items-center gap-2 text-zinc-300">
              <button
                type="button"
                onClick={() => setVolume(volume > 0 ? 0 : 0.9)}
                className="grid h-8 w-8 place-items-center rounded text-zinc-300 transition hover:text-white"
                aria-label={volume > 0 ? 'Silenciar' : 'Activar sonido'}
              >
                {volume > 0 ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="h-1 w-24 cursor-pointer accent-[#ff5500]"
                aria-label="Volumen"
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
