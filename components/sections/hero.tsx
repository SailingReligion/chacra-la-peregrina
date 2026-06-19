'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLocale } from '@/lib/locale-context';
import { withBasePath } from '@/lib/utils';

export default function HeroSection() {
  const { t } = useLocale();

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with parallax */}
      <div
        className="absolute inset-0 parallax-hero"
        style={{ backgroundImage: `url(${withBasePath('/images/hero/sunset-pool-reflection.jpg')})` }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/70" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-6 tracking-tight"
              style={{ textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
            {t?.hero?.title || 'Chacra La Peregrina'}
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-lg sm:text-xl md:text-2xl text-white/90 mb-10 font-light max-w-2xl mx-auto"
          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
        >
          {t?.hero?.subtitle || 'Donde la laguna encuentra tu próximo evento'}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <button
            onClick={scrollToContact}
            className="group relative inline-flex items-center px-8 py-4 bg-[#C8956C] text-white text-lg font-medium rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(200,149,108,0.4)] hover:scale-105"
          >
            <span className="relative z-10">
              {t?.hero?.cta || 'Consultar Disponibilidad'}
            </span>
            <div className="absolute inset-0 bg-[#B5704F] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <button
          onClick={() => {
            const el = document.getElementById('values');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="text-white/60 hover:text-white transition-colors"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </motion.div>
    </section>
  );
}
