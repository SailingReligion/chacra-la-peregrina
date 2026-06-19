'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Plus, Minus } from 'lucide-react';
import { useLocale } from '@/lib/locale-context';

function FAQItem({ q, a, isOpen, onClick }: { q: string; a: string; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border-b border-white/10 last:border-b-0">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="font-display text-lg sm:text-xl text-white/90 pr-4 group-hover:text-[#C8956C] transition-colors">
          {q}
        </span>
        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-[#C8956C]/20">
          {isOpen ? (
            <Minus className="w-4 h-4 text-[#C8956C]" />
          ) : (
            <Plus className="w-4 h-4 text-white/60" />
          )}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-white/60 leading-relaxed pl-0 md:pl-4 max-w-3xl">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const { t } = useLocale();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = t?.faq?.items || [];

  return (
    <section id="faq" ref={ref} className="py-24 md:py-32 bg-[#1A3A4A]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            {t?.faq?.title || 'Preguntas Frecuentes'}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {items.map((item: any, i: number) => (
            <FAQItem
              key={i}
              q={item.q}
              a={item.a}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
