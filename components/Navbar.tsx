'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { nav, site } from '@/data/content';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-ink-400/60 bg-ink-900/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20"
        aria-label="Principal"
      >
        <a
          href="#hero"
          className="group flex items-center gap-2 font-display text-lg font-bold uppercase tracking-[0.22em] text-bone-100"
        >
          <span className="relative inline-flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-acid opacity-60"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-acid"></span>
          </span>
          <span className="transition-colors group-hover:text-acid">{site.name}</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="font-mono text-[11px] uppercase tracking-[0.28em] text-bone-200 transition-colors hover:text-acid"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" className="btn-neon">
              Booking
            </a>
          </li>
        </ul>

        <button
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center border border-ink-400 text-bone-100 transition-colors hover:border-acid hover:text-acid md:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="md:hidden"
          >
            <ul className="flex flex-col gap-1 border-t border-ink-400/60 bg-ink-900/95 px-6 py-6 backdrop-blur-xl">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-ink-400/40 py-3 font-display text-xl uppercase tracking-tight text-bone-100 hover:text-acid"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="pt-4">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="btn-neon w-full"
                >
                  Booking
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
