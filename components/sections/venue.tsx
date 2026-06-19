'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLocale } from '@/lib/locale-context';
import { withBasePath } from '@/lib/utils';

const VENUE_TABS = [
  {
    key: 'quincho',
    images: [
      '/images/quincho/parrillero-interior.jpg',
      '/images/quincho/quincho-completo.jpg',
      '/images/quincho/parrillero-exterior.jpg',
      '/images/quincho/quincho-comedor.jpg',
    ],
  },
  {
    key: 'piscina',
    images: [
      '/images/piscina/piscina-laguna-panorama.jpg',
      '/images/piscina/piscina-terraza-laguna.jpg',
      '/images/piscina/piscina-atardecer.jpg',
    ],
  },
  {
    key: 'naturaleza',
    images: [
      '/images/paisajes/chacra-vista-general.jpg',
      '/images/paisajes/quincho-piscina-panorama.jpg',
      '/images/fauna/carpincho.jpg',
      '/images/paisajes/cielo-estrellado.jpg',
    ],
  },
];

export default function VenueSection() {
  const { t } = useLocale();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeTab, setActiveTab] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const [paused, setPaused] = useState(false);

  const tab = VENUE_TABS[activeTab];
  const venueData = t?.venue || {};
  const tabData = venueData[tab.key] || {};

  // Rotación automática: avanza imágenes y, al terminar un tab, pasa al siguiente.
  // Se pausa al pasar el mouse por encima o cuando la sección no está visible.
  useEffect(() => {
    if (paused || !inView) return;
    const interval = setInterval(() => {
      setActiveImage((prevImg) => {
        const total = VENUE_TABS[activeTab].images.length;
        if (prevImg + 1 < total) {
          return prevImg + 1;
        }
        // Terminó el tab actual → pasar al siguiente
        setActiveTab((prevTab) => (prevTab + 1) % VENUE_TABS.length);
        return 0;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [activeTab, paused, inView]);

  return (
    <section id="venue" ref={ref} className="py-24 md:py-32 bg-[#FAF6F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#2C2420] mb-4">
            {venueData.title || 'El Lugar'}
          </h2>
          <p className="text-lg text-[#8B7355]">
            {venueData.subtitle || 'Donde cada detalle importa'}
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-12">
          {VENUE_TABS.map((vt, i) => {
            const label = venueData[vt.key]?.title || vt.key;
            return (
              <button
                key={vt.key}
                onClick={() => { setActiveTab(i); setActiveImage(0); }}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-400 ${
                  activeTab === i
                    ? 'bg-[#C8956C] text-white shadow-lg shadow-[#C8956C]/25'
                    : 'bg-white text-[#8B7355] hover:bg-[#C8956C]/10 border border-[#8B7355]/20'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Split screen content */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-[#2C2420]">
              <motion.img
                key={`${activeTab}-${activeImage}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7 }}
                src={withBasePath(tab.images[activeImage])}
                alt={tabData.title}
                className="w-full h-full object-cover ken-burns"
              />
            </div>
            {/* Thumbnail strip */}
            <div className="flex gap-2 mt-4 justify-center">
              {tab.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-16 h-12 rounded-lg overflow-hidden transition-all duration-300 ${
                    activeImage === i ? 'ring-2 ring-[#C8956C] ring-offset-2 scale-105' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={withBasePath(img)} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="font-display text-2xl sm:text-3xl text-[#2C2420] mb-6">
              {tabData.title || tab.key}
            </h3>
            <p className="text-[#8B7355] leading-relaxed text-base sm:text-lg mb-8">
              {tabData.desc || ''}
            </p>
            <button
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-[#C8956C] font-medium hover:text-[#B5704F] transition-colors group"
            >
              {t?.hero?.cta || 'Consultar Disponibilidad'}
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
