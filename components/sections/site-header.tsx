'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLocale } from '@/lib/locale-context';
import { localeFlags, localeNames, locales, Locale } from '@/lib/i18n';

const NAV_ITEMS = ['inicio', 'lugar', 'eventos', 'galeria', 'faq', 'contacto'] as const;
const SECTION_IDS: Record<string, string> = {
  inicio: 'hero',
  lugar: 'venue',
  eventos: 'events',
  galeria: 'gallery',
  faq: 'faq',
  contacto: 'contact',
};

export default function SiteHeader() {
  const { locale, setLocale, t } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#FAF6F1]/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => scrollTo('hero')}
            className="flex flex-col leading-none"
          >
            <span
              className={`font-display text-xl tracking-wide transition-colors duration-500 ${
                scrolled ? 'text-[#2C2420]' : 'text-white'
              }`}
              style={!scrolled ? { textShadow: '0 2px 10px rgba(0,0,0,0.7), 0 0 4px rgba(0,0,0,0.5)' } : {}}
            >
              La Peregrina
            </span>
            <span
              className={`text-[10px] uppercase tracking-[0.3em] transition-colors duration-500 ${
                scrolled ? 'text-[#8B7355]' : 'text-white'
              }`}
              style={!scrolled ? { textShadow: '0 2px 8px rgba(0,0,0,0.7)' } : {}}
            >
              Laguna del Sauce
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((key) => (
              <button
                key={key}
                onClick={() => scrollTo(SECTION_IDS[key])}
                className={`px-3 py-2 text-sm tracking-wide transition-all duration-300 rounded-md hover:bg-white/10 ${
                  scrolled
                    ? 'text-[#2C2420]/80 hover:text-[#2C2420] hover:bg-[#2C2420]/5'
                    : 'text-white hover:text-white'
                }`}
                style={!scrolled ? { textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 0px 3px rgba(0,0,0,0.5)' } : {}}
              >
                {t?.nav?.[key] || key}
              </button>
            ))}

            {/* Language Selector */}
            <div className="relative ml-2">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className={`px-3 py-2 text-sm rounded-md border transition-all duration-300 ${
                  scrolled
                    ? 'border-[#2C2420]/20 text-[#2C2420]/70 hover:border-[#2C2420]/40'
                    : 'border-white/40 text-white hover:border-white/70'
                }`}
              style={!scrolled ? { textShadow: '0 2px 6px rgba(0,0,0,0.6)' } : {}}
              >
                {localeFlags[locale]} {locale.toUpperCase()}
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden min-w-[140px]"
                  >
                    {locales.map((l) => (
                      <button
                        key={l}
                        onClick={() => { setLocale(l as Locale); setLangOpen(false); }}
                        className={`w-full px-4 py-2.5 text-sm text-left flex items-center gap-2 transition-colors ${
                          locale === l ? 'bg-[#C8956C]/10 text-[#C8956C] font-medium' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span>{localeFlags[l as Locale]}</span>
                        <span>{localeNames[l as Locale]}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className={`w-6 h-6 ${scrolled ? 'text-[#2C2420]' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${scrolled ? 'text-[#2C2420]' : 'text-white'}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#FAF6F1]/98 backdrop-blur-lg border-t border-[#2C2420]/10"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_ITEMS.map((key) => (
                <button
                  key={key}
                  onClick={() => scrollTo(SECTION_IDS[key])}
                  className="block w-full text-left px-4 py-3 text-[#2C2420] hover:bg-[#C8956C]/10 rounded-lg transition-colors text-sm tracking-wide"
                >
                  {t?.nav?.[key] || key}
                </button>
              ))}
              <div className="flex gap-2 px-4 pt-3 border-t border-[#2C2420]/10 mt-2">
                {locales.map((l) => (
                  <button
                    key={l}
                    onClick={() => { setLocale(l as Locale); setMobileOpen(false); }}
                    className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                      locale === l
                        ? 'bg-[#C8956C] text-white border-[#C8956C]'
                        : 'border-[#2C2420]/20 text-[#2C2420]/70 hover:border-[#C8956C]'
                    }`}
                  >
                    {localeFlags[l as Locale]} {l.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
