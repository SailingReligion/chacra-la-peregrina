'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Leaf, Flame, Waves } from 'lucide-react';
import { useLocale } from '@/lib/locale-context';
import { withBasePath } from '@/lib/utils';
import { BrandName } from '@/components/brand-name';

const ICONS: Record<string, React.ReactNode> = {
  leaf: <Leaf className="w-8 h-8" />,
  flame: <Flame className="w-8 h-8" />,
  waves: <Waves className="w-8 h-8" />,
};

const IMAGES = [
  '/images/paisajes/chacra-vista-general.jpg',
  '/images/quincho/parrillero-interior.jpg',
  '/images/hero/sunset-pool-reflection.jpg',
];

export default function ValuesSection() {
  const { t } = useLocale();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  const items = t?.values?.items || [];

  return (
    <section id="values" ref={ref} className="py-24 md:py-32 bg-[#FAF6F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#2C2420] mb-4">
            {t?.values?.title || 'Una experiencia única'}
          </h2>
          <p className="text-lg text-[#8B7355] max-w-xl mx-auto flex items-center justify-center flex-wrap gap-2">
            <span>Tres razones para elegir</span>
            <BrandName size="md" className="text-[#8B7355]" />
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {items.map((item: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.2 }}
              className="group cursor-pointer transition-transform duration-500 hover:-translate-y-2"
              onClick={() => {
                const targets = ['venue', 'venue', 'gallery'];
                const el = document.getElementById(targets[i]);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <div className="shine-on-hover relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 shadow-lg group-hover:shadow-2xl transition-shadow duration-500">
                <img
                  src={withBasePath(IMAGES[i])}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <span className="text-white text-sm font-medium">
                    {t?.values?.subtitle === 'Three reasons to choose La Peregrina' ? 'Explore →' : t?.values?.subtitle === 'Três razões para escolher La Peregrina' ? 'Explorar →' : 'Explorar →'}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-[#C8956C]/10 flex items-center justify-center text-[#C8956C] group-hover:bg-[#C8956C] group-hover:text-white transition-all duration-500">
                  {ICONS[item.icon] || <Leaf className="w-8 h-8" />}
                </div>
                <div>
                  <h3 className="font-display text-xl text-[#2C2420] mb-2 group-hover:text-[#C8956C] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-[#8B7355] text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
