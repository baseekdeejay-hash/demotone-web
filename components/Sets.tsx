'use client';

import { useMemo, useState } from 'react';
import { ExternalLink, Play, Radio, Disc3 } from 'lucide-react';
import Reveal from './effects/Reveal';
import { mixes, type Mix } from '@/data/content';

function YouTubeEmbed({ id }: { id: string }) {
  return (
    <iframe
      className="aspect-video w-full"
      src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`}
      title="YouTube"
      frameBorder={0}
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      loading="lazy"
    />
  );
}

function SoundCloudEmbed({ url }: { url: string }) {
  const src = `https://w.soundcloud.com/player/?url=${encodeURIComponent(
    url
  )}&color=%23e6ff04&inverse=true&auto_play=false&show_user=true&hide_related=true&visual=true`;
  return (
    <iframe
      className="aspect-video w-full"
      src={src}
      title="SoundCloud"
      allow="autoplay"
      loading="lazy"
      frameBorder={0}
    />
  );
}

function MixCard({ mix, index }: { mix: Mix; index: number }) {
  const [open, setOpen] = useState(false);
  const externalUrl =
    mix.type === 'youtube'
      ? `https://www.youtube.com/watch?v=${mix.id}`
      : mix.id;
  const thumb =
    mix.type === 'youtube'
      ? `https://i.ytimg.com/vi/${mix.id}/hqdefault.jpg`
      : null;

  return (
    <article className="group relative flex flex-col overflow-hidden border border-ink-400/60 bg-ink-800 transition-colors hover:border-acid/60">
      <span className="absolute left-2 top-2 z-10 h-3 w-3 border-l border-t border-acid/70 opacity-0 transition-opacity group-hover:opacity-100" />
      <span className="absolute right-2 top-2 z-10 h-3 w-3 border-r border-t border-acid/70 opacity-0 transition-opacity group-hover:opacity-100" />
      <span className="absolute left-2 bottom-2 z-10 h-3 w-3 border-l border-b border-acid/70 opacity-0 transition-opacity group-hover:opacity-100" />
      <span className="absolute right-2 bottom-2 z-10 h-3 w-3 border-r border-b border-acid/70 opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="relative bg-ink-900">
        {open ? (
          mix.type === 'youtube' ? (
            <YouTubeEmbed id={mix.id} />
          ) : (
            <SoundCloudEmbed url={mix.id} />
          )
        ) : (
          <button
            onClick={() => setOpen(true)}
            className="group/btn relative flex aspect-video w-full items-center justify-center overflow-hidden text-bone-100"
            aria-label={`Reproducir ${mix.title}`}
          >
            {thumb ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={thumb}
                alt={mix.title}
                className="absolute inset-0 h-full w-full object-cover grayscale contrast-110 transition-all duration-500 group-hover/btn:grayscale-0 group-hover/btn:scale-[1.04]"
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-ink-700 via-ink-800 to-ink-900" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/30 to-ink-900/40" />
            <div className="absolute inset-0 bg-scanlines opacity-25" />

            <span className="absolute left-3 top-3 z-10 font-mono text-[10px] uppercase tracking-[0.22em] text-bone-200">
              {String(index + 1).padStart(2, '0')} //{' '}
              {mix.type === 'youtube' ? 'YOUTUBE' : 'SOUNDCLOUD'}
            </span>
            <span className="absolute right-3 top-3 z-10 font-mono text-[10px] uppercase tracking-[0.22em] text-acid">
              ► PLAY
            </span>

            <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-acid bg-ink-900/70 text-acid transition-all duration-300 group-hover/btn:scale-110 group-hover/btn:bg-acid group-hover/btn:text-ink-900">
              <Play size={22} fill="currentColor" />
            </span>
          </button>
        )}
      </div>

      <div className="flex flex-col gap-1 border-t border-ink-400/60 p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-bone-300">
          <span>
            {mix.venue ?? '—'}
            {mix.collaborator ? ` · w/ ${mix.collaborator}` : ''}
          </span>
          {mix.date ? <span className="text-acid">{mix.date}</span> : null}
        </div>
        <h3 className="mt-1 font-display text-lg font-bold uppercase leading-tight tracking-tight text-bone-100">
          {mix.title}
        </h3>
        <a
          href={externalUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex items-center gap-2 self-start font-mono text-[11px] uppercase tracking-[0.22em] text-bone-200 transition-colors hover:text-acid"
        >
          Ver completo <ExternalLink size={12} />
        </a>
      </div>
    </article>
  );
}

function Subsection({
  title,
  icon,
  items
}: {
  title: string;
  icon: React.ReactNode;
  items: Mix[];
}) {
  if (items.length === 0) return null;
  return (
    <div className="mt-16 first:mt-0">
      <Reveal>
        <div className="flex items-center gap-3 border-b border-ink-400/60 pb-3">
          <span className="text-acid">{icon}</span>
          <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-bone-100 md:text-3xl">
            {title}
          </h3>
          <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.22em] text-bone-300">
            {items.length.toString().padStart(2, '0')} pistas
          </span>
        </div>
      </Reveal>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {items.map((m, i) => (
          <Reveal key={`${m.id}-${i}`} delay={0.05 * i}>
            <MixCard mix={m} index={i} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export default function Sets() {
  const { sessions, lives } = useMemo(() => {
    return {
      sessions: mixes.filter((m) => m.category === 'session'),
      lives: mixes.filter((m) => m.category === 'live')
    };
  }, []);

  return (
    <section
      id="sets"
      className="relative overflow-hidden border-t border-ink-400/40 bg-ink-900 py-24 md:py-32"
    >
      <div className="absolute inset-0 -z-10 bg-industrial-grid opacity-30" />
      <div className="absolute -right-32 top-1/4 -z-10 h-96 w-96 rounded-full bg-acid/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <span className="eyebrow">// 03 — Sets &amp; Lives</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-6 max-w-3xl font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight text-bone-100 md:text-7xl">
            Sets <span className="text-acid">&amp;</span> Lives
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-base text-bone-200 md:text-lg">
            Selección de sesiones DJ y sets en directo.
          </p>
        </Reveal>

        <Subsection
          title="Sesiones"
          icon={<Disc3 size={20} strokeWidth={1.5} />}
          items={sessions}
        />

        <Subsection
          title="Lives"
          icon={<Radio size={20} strokeWidth={1.5} />}
          items={lives}
        />
      </div>
    </section>
  );
}
