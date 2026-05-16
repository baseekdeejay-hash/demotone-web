'use client';

import { ExternalLink, MapPin, Calendar } from 'lucide-react';
import Reveal from './effects/Reveal';
import { events, type EventItem } from '@/data/content';

function EventRow({ event, index }: { event: EventItem; index: number }) {
  const past = event.status === 'past';
  const soldout = event.status === 'soldout';

  return (
    <article
      className={`group relative grid grid-cols-12 items-center gap-4 border-b border-ink-400/60 py-6 transition-colors ${
        past ? 'opacity-50' : 'hover:bg-ink-800/60'
      }`}
    >
      <div className="col-span-12 md:col-span-2">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-300">
          {String(index + 1).padStart(2, '0')}
        </div>
        <div className="mt-1 font-display text-2xl font-bold uppercase tracking-tight text-acid md:text-3xl">
          {event.date}
        </div>
      </div>

      <div className="col-span-12 md:col-span-6">
        <h3 className="font-display text-xl font-bold uppercase tracking-tight text-bone-100 md:text-2xl">
          {event.venue}
        </h3>
        <div className="mt-2 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-300">
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={12} /> {event.city}
            {event.country ? ` · ${event.country}` : ''}
          </span>
        </div>
      </div>

      <div className="col-span-12 flex justify-start md:col-span-4 md:justify-end">
        {soldout ? (
          <span className="border border-flare/70 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.28em] text-flare">
            Sold Out
          </span>
        ) : past ? (
          <span className="border border-ink-400 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.28em] text-bone-300">
            Pasado
          </span>
        ) : event.ticketUrl ? (
          <a
            href={event.ticketUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-neon"
          >
            Entradas <ExternalLink size={12} />
          </a>
        ) : (
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone-300">
            Pr&oacute;ximamente
          </span>
        )}
      </div>
    </article>
  );
}

export default function Events() {
  const hasEvents = events.length > 0 && events[0].date !== 'TODO';

  return (
    <section
      id="events"
      className="relative overflow-hidden border-t border-ink-400/40 bg-ink-800 py-24 md:py-32"
    >
      <div className="absolute inset-0 -z-10 bg-scanlines opacity-25" />

      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <span className="eyebrow">// 04 — Agenda</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-6 max-w-3xl font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight text-bone-100 md:text-7xl">
            Pr&oacute;ximas <span className="text-acid">fechas</span>
          </h2>
        </Reveal>

        <div className="mt-14">
          {hasEvents ? (
            <div className="border-t border-ink-400/60">
              {events.map((e, i) => (
                <Reveal key={i} delay={0.03 * i}>
                  <EventRow event={e} index={i} />
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <div className="relative border border-dashed border-ink-400 bg-ink-900/60 p-10 text-center">
                <Calendar
                  size={28}
                  className="mx-auto text-acid"
                  strokeWidth={1.5}
                />
                <p className="mt-4 font-display text-2xl font-bold uppercase tracking-tight text-bone-100">
                  Pr&oacute;ximas fechas
                </p>
                <p className="mt-2 font-mono text-xs uppercase tracking-[0.22em] text-bone-300">
                  Agenda en construcci&oacute;n. Para booking, escribe directamente.
                </p>
                <a href="#contact" className="btn-neon mt-6 inline-flex">
                  Contactar para booking
                </a>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
