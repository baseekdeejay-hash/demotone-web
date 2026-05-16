'use client';

import { Copy, Check, Instagram, Music2, Youtube, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import Reveal from './effects/Reveal';
import { contact, site } from '@/data/content';

const SOCIAL_META: Record<
  keyof typeof contact.social,
  { label: string; icon: React.ReactNode }
> = {
  instagram: { label: 'Instagram', icon: <Instagram size={16} /> },
  soundcloud: { label: 'SoundCloud', icon: <Music2 size={16} /> },
  youtube: { label: 'YouTube', icon: <Youtube size={16} /> },
  spotify: { label: 'Spotify', icon: <Music2 size={16} /> },
  bandcamp: { label: 'Bandcamp', icon: <Music2 size={16} /> },
  beatport: { label: 'Beatport', icon: <Music2 size={16} /> }
};

function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // noop
    }
  };
  return (
    <button
      onClick={handleCopy}
      className="ml-2 inline-flex h-7 w-7 items-center justify-center border border-ink-400 text-bone-200 transition-colors hover:border-acid hover:text-acid"
      aria-label="Copiar email"
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
    </button>
  );
}

export default function Contact() {
  const socials = (
    Object.keys(contact.social) as Array<keyof typeof contact.social>
  ).filter((k) => contact.social[k]);

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-ink-400/40 bg-ink-900 py-24 md:py-32"
    >
      <div className="absolute inset-0 -z-10 bg-industrial-grid opacity-30" />
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-acid/60 to-transparent" />
      <div className="absolute -left-32 bottom-0 -z-10 h-96 w-96 rounded-full bg-flare/10 blur-3xl" />

      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <Reveal>
            <span className="eyebrow">// 05 — Contacto</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight text-bone-100 md:text-7xl">
              Booking <span className="text-acid">/</span> contacto
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-base text-bone-200 md:text-lg">
              Disponible para sesiones DJ, lives y producciones. Escribe con fecha,
              ciudad y propuesta — respuesta en menos de 48h.
            </p>
          </Reveal>
        </div>

        <div className="md:col-span-7">
          <Reveal delay={0.15}>
            <div className="space-y-6 border border-ink-400/60 bg-ink-800 p-6 md:p-8">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone-300">
                  Booking
                </div>
                <div className="mt-2 flex items-center">
                  <a
                    href={`mailto:${contact.bookingEmail}?subject=Booking%20Demotone`}
                    className="font-display text-2xl font-bold tracking-tight text-bone-100 transition-colors hover:text-acid md:text-3xl"
                  >
                    {contact.bookingEmail}
                  </a>
                  <CopyEmail email={contact.bookingEmail} />
                </div>
              </div>

              {contact.pressEmail && contact.pressEmail !== contact.bookingEmail ? (
                <div className="border-t border-ink-400/60 pt-6">
                  <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone-300">
                    Prensa
                  </div>
                  <div className="mt-2 flex items-center">
                    <a
                      href={`mailto:${contact.pressEmail}?subject=Prensa%20Demotone`}
                      className="font-display text-xl font-bold tracking-tight text-bone-100 transition-colors hover:text-acid md:text-2xl"
                    >
                      {contact.pressEmail}
                    </a>
                    <CopyEmail email={contact.pressEmail} />
                  </div>
                </div>
              ) : null}

              {socials.length > 0 ? (
                <div className="border-t border-ink-400/60 pt-6">
                  <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone-300">
                    Redes
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {socials.map((k) => (
                      <a
                        key={k}
                        href={contact.social[k]}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center justify-between border border-ink-400 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-200 transition-colors hover:border-acid hover:text-acid"
                      >
                        <span className="flex items-center gap-2">
                          {SOCIAL_META[k].icon} {SOCIAL_META[k].label}
                        </span>
                        <ArrowUpRight
                          size={12}
                          className="opacity-50 transition-opacity group-hover:opacity-100"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="border-t border-ink-400/60 pt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-bone-300">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span>{site.domain}</span>
                  <span className="text-acid">●</span>
                  <span>Barcelona · ES</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
