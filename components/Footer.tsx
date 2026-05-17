import { contact, site } from '@/data/content';

export default function Footer() {
  const year = new Date().getFullYear();
  const socials = Object.entries(contact.social).filter(([, v]) => v);

  return (
    <footer className="relative border-t border-ink-400/60 bg-ink-900">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <div className="font-display text-2xl font-bold uppercase tracking-[0.2em] text-bone-100">
            {site.name}
          </div>
          <p className="mt-3 max-w-xs font-mono text-xs uppercase tracking-[0.18em] text-bone-300">
            {site.tagline}
          </p>
        </div>

        <div>
          <h3 className="eyebrow">Contacto</h3>
          <ul className="mt-3 space-y-1 font-mono text-sm text-bone-200">
            <li>
              Booking / Prensa:{' '}
              <a className="hover:text-acid" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow">Redes</h3>
          <ul className="mt-3 flex flex-wrap gap-3 font-mono text-xs uppercase tracking-[0.18em] text-bone-200">
            {socials.length === 0 ? (
              <li className="text-bone-300">&mdash; pr&oacute;ximamente &mdash;</li>
            ) : (
              socials.map(([k, v]) => (
                <li key={k}>
                  <a
                    href={v}
                    target="_blank"
                    rel="noreferrer"
                    className="border border-ink-400 px-3 py-1 hover:border-acid hover:text-acid"
                  >
                    {k}
                  </a>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-400/60">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-6 py-5 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-300 md:flex-row md:items-center">
          <span>&copy; {year} &middot; {site.name} &middot; {site.domain}</span>
          <span>Hecho con ruido y groove.</span>
        </div>
      </div>
    </footer>
  );
}
