'use client';

import { useLocale } from '@/lib/locale-context';
import { BrandName } from '@/components/brand-name';

export default function SiteFooter() {
  const { t } = useLocale();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#2C2420] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <button onClick={() => scrollTo('hero')} className="inline-block mb-2">
              <BrandName size="xl" className="text-white" />
            </button>
            <p className="text-white/40 text-sm">
              {t?.footer?.tagline || 'Eventos exclusivos en armonía con la naturaleza'}
            </p>
          </div>

          <div className="flex items-center gap-6">
            {['venue', 'events', 'contact'].map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-white/40 hover:text-white/80 text-sm transition-colors"
              >
                {t?.nav?.[id === 'venue' ? 'lugar' : id === 'events' ? 'eventos' : 'contacto'] || id}
              </button>
            ))}
          </div>

          <div className="text-center md:text-right">
            <p className="text-white/30 text-xs flex items-center gap-1 justify-center md:justify-end">
              &copy; {new Date().getFullYear()} Chacra <BrandName size="xs" className="text-white/30" />
            </p>
            <p className="text-white/20 text-xs mt-1">
              {t?.footer?.location || 'El Pejerrey, Laguna del Sauce · Punta del Este, Uruguay'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
