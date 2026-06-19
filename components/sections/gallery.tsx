'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocale } from '@/lib/locale-context';
import { withBasePath } from '@/lib/utils';
import { BrandName } from '@/components/brand-name';

const GALLERY_IMAGES = [
  { src: '/images/hero/sunset-lounge-laguna.jpg', alt: 'Atardecer desde las reposeras', span: 'col-span-2 row-span-2' },
  { src: '/images/quincho/parrillero-interior.jpg', alt: 'Interior del parrillero', span: '' },
  { src: '/images/piscina/piscina-terraza-laguna.jpg', alt: 'Terraza con piscina y laguna', span: '' },
  { src: '/images/quincho/quincho-completo.jpg', alt: 'Vista completa del quincho', span: '' },
  { src: '/images/paisajes/atardecer-laguna.jpg', alt: 'Atardecer en la laguna', span: '' },
  { src: '/images/piscina/piscina-laguna-panorama.jpg', alt: 'Piscina con vista panorámica', span: 'col-span-2' },
  { src: '/images/fauna/carpincho.jpg', alt: 'Carpincho en su hábitat', span: '' },
  { src: '/images/quincho/parrillero-exterior.jpg', alt: 'Vista exterior del quincho', span: '' },
  { src: '/images/paisajes/atardecer-paisaje.jpg', alt: 'Paisaje al atardecer', span: '' },
  { src: '/images/quincho/quincho-comedor.jpg', alt: 'Comedor del quincho', span: '' },
  { src: '/images/piscina/piscina-atardecer.jpg', alt: 'Piscina al atardecer', span: 'col-span-2' },
];

export default function GallerySection() {
  const { t } = useLocale();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => setLightboxIndex((prev) => (prev !== null ? (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length : null));
  const nextImage = () => setLightboxIndex((prev) => (prev !== null ? (prev + 1) % GALLERY_IMAGES.length : null));

  return (
    <section id="gallery" ref={ref} className="py-24 md:py-32 bg-[#2C2420]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white mb-4 flex items-center justify-center flex-wrap gap-3">
            <span>Descubrí</span>
            <BrandName size="lg" className="text-white" />
          </h2>
          <p className="text-lg text-white/60">
            {t?.gallery?.subtitle || 'Cada rincón cuenta una historia'}
          </p>
        </motion.div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[220px]">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={`relative rounded-xl overflow-hidden cursor-pointer group ${img.span}`}
              onClick={() => openLightbox(i)}
            >
              <img
                src={withBasePath(img.src)}
                alt={img.alt}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-end">
                <div className="p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-white text-sm font-medium">{img.alt}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center lightbox-overlay"
            onClick={closeLightbox}
          >
            <button
              onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 md:left-8 text-white/50 hover:text-white transition-colors z-10"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 md:right-8 text-white/50 hover:text-white transition-colors z-10"
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              src={withBasePath(GALLERY_IMAGES[lightboxIndex].src)}
              alt={GALLERY_IMAGES[lightboxIndex].alt}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            <div className="absolute bottom-6 text-center text-white/60 text-sm">
              {GALLERY_IMAGES[lightboxIndex].alt} &middot; {lightboxIndex + 1}/{GALLERY_IMAGES.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
