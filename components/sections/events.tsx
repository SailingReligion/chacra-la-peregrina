'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Heart, Briefcase, Cake } from 'lucide-react';
import { useLocale } from '@/lib/locale-context';
import { withBasePath } from '@/lib/utils';

const ICONS = [Heart, Briefcase, Cake];
const EVENT_IMAGES = [
  '/images/hero/sunset-lounge-laguna.jpg',
  '/images/quincho/parrillero-interior.jpg',
  '/images/piscina/piscina-terraza-laguna.jpg',
];

export default function EventsSection() {
  const { t } = useLocale();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeEvent, setActiveEvent] = useState(0);

  const eventsData = t?.events || {};
  const types = eventsData.types || [];

  return (
    <section id="events" className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Background image that changes */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeEvent}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.08 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <img
              src={withBasePath(EVENT_IMAGES[activeEvent])}
              alt=""
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#2C2420] mb-4">
            {eventsData.title || 'Tu Evento, Tu Estilo'}
          </h2>
          <p className="text-lg text-[#8B7355]">
            {eventsData.subtitle || 'Cada celebración es única'}
          </p>
        </motion.div>

        {/* Event type selector */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 max-w-4xl mx-auto">
          {types.map((eventType: any, i: number) => {
            const Icon = ICONS[i] || Heart;
            const isActive = activeEvent === i;
            return (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                onClick={() => setActiveEvent(i)}
                className={`flex-1 text-left p-6 md:p-8 rounded-2xl transition-all duration-500 border ${
                  isActive
                    ? 'bg-[#C8956C] text-white border-[#C8956C] shadow-xl shadow-[#C8956C]/20 scale-[1.02]'
                    : 'bg-white/80 backdrop-blur-sm text-[#2C2420] border-[#2C2420]/10 hover:border-[#C8956C]/40 hover:shadow-lg'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                  isActive ? 'bg-white/20' : 'bg-[#C8956C]/10'
                }`}>
                  <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-[#C8956C]'}`} />
                </div>
                <h3 className={`font-display text-xl mb-3 ${isActive ? 'text-white' : 'text-[#2C2420]'}`}>
                  {eventType.title}
                </h3>
                <p className={`text-sm leading-relaxed ${isActive ? 'text-white/90' : 'text-[#8B7355]'}`}>
                  {eventType.desc}
                </p>
                <div className={`mt-4 inline-flex items-center gap-1 text-sm font-medium transition-all ${
                  isActive ? 'text-white' : 'text-[#C8956C]'
                }`}>
                  {t?.hero?.cta || 'Consultar'}
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
