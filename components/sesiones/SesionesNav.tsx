'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Disc3, Library, Upload, Home } from 'lucide-react';

const LINKS = [
  { href: '/sesiones', label: 'Biblioteca', icon: Library, exact: true },
  { href: '/sesiones/upload', label: 'Subir', icon: Upload, exact: true }
];

export default function SesionesNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0a0a0b]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-6 px-4 md:px-6">
        <Link
          href="/sesiones"
          className="flex items-center gap-2 text-white"
        >
          <Disc3 size={20} className="text-[#ff5500]" />
          <span className="font-display text-base font-bold uppercase tracking-wider">
            Sesiones
          </span>
          <span className="text-xs text-zinc-500">por Demotone</span>
        </Link>

        <nav className="ml-auto flex items-center gap-1">
          {LINKS.map((l) => {
            const Icon = l.icon;
            const active = l.exact
              ? pathname === l.href
              : pathname?.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`inline-flex items-center gap-1.5 rounded px-3 py-1.5 text-sm transition ${
                  active
                    ? 'bg-white/10 text-white'
                    : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon size={14} />
                <span className="hidden sm:inline">{l.label}</span>
              </Link>
            );
          })}
          <Link
            href="/"
            className="ml-2 inline-flex items-center gap-1.5 rounded px-3 py-1.5 text-sm text-zinc-400 transition hover:bg-white/5 hover:text-white"
            aria-label="Volver al sitio principal"
          >
            <Home size={14} />
            <span className="hidden sm:inline">Inicio</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
