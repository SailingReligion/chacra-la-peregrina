'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, CheckCircle, AlertCircle, MapPin, ExternalLink } from 'lucide-react';
import { useLocale } from '@/lib/locale-context';

const OSM_EMBED = 'https://www.openstreetmap.org/export/embed.html?bbox=-55.1200%2C-34.8560%2C-55.1010%2C-34.8420&layer=mapnik&marker=-34.848869%2C-55.110706';
const MAPS_LINK = 'https://www.google.com/maps/search/?api=1&query=-34.848869%2C-55.110706';

export default function ContactSection() {
  const { t } = useLocale();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    guestCount: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const contactData = t?.contact || {};
  const formT = contactData.form || {};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      if (res.ok) {
        setStatus('success');
        setFormState({ name: '', email: '', phone: '', eventType: '', eventDate: '', guestCount: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const inputClass = 'w-full px-4 py-3 bg-white border border-[#2C2420]/10 rounded-xl text-[#2C2420] placeholder:text-[#8B7355]/50 focus:outline-none focus:ring-2 focus:ring-[#C8956C]/40 focus:border-[#C8956C] transition-all duration-300';

  return (
    <section id="contact" ref={ref} className="py-24 md:py-32 bg-[#FAF6F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#2C2420] mb-4">
            {contactData.title || 'Hagamos que suceda'}
          </h2>
          <p className="text-lg text-[#8B7355] max-w-xl mx-auto">
            {contactData.subtitle || 'Contanos tu idea y la hacemos realidad'}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-[#8B7355] mb-1.5">{formT.name || 'Nombre'}</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#8B7355] mb-1.5">{formT.email || 'Email'}</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-[#8B7355] mb-1.5">{formT.phone || 'Teléfono'}</label>
                  <input
                    type="tel"
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#8B7355] mb-1.5">{formT.eventType || 'Tipo de evento'}</label>
                  <select
                    value={formState.eventType}
                    onChange={(e) => setFormState({ ...formState, eventType: e.target.value })}
                    className={inputClass}
                  >
                    <option value="">—</option>
                    {(formT.eventTypes || ['Boda', 'Corporativo', 'Familiar', 'Cumpleaños', 'Otro']).map((type: string) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-[#8B7355] mb-1.5">{formT.eventDate || 'Fecha'}</label>
                  <input
                    type="date"
                    value={formState.eventDate}
                    onChange={(e) => setFormState({ ...formState, eventDate: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#8B7355] mb-1.5">{formT.guestCount || 'Invitados'}</label>
                  <input
                    type="text"
                    value={formState.guestCount}
                    onChange={(e) => setFormState({ ...formState, guestCount: e.target.value })}
                    placeholder="ej. 60"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-[#8B7355] mb-1.5">{formT.message || 'Mensaje'}</label>
                <textarea
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="group w-full sm:w-auto relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#3A6B7E] text-white font-medium rounded-xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_25px_rgba(58,107,126,0.3)] hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {status === 'sending' ? (
                    <>{formT.sending || 'Enviando...'}<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /></>
                  ) : status === 'success' ? (
                    <><CheckCircle className="w-5 h-5" />{formT.success || '¡Enviado!'}</>
                  ) : status === 'error' ? (
                    <><AlertCircle className="w-5 h-5" />{formT.error || 'Error'}</>
                  ) : (
                    <><Send className="w-4 h-4" />{formT.submit || 'Enviar Consulta'}</>
                  )}
                </span>
                <div className="absolute inset-0 bg-[#2C5A6B] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </button>
            </form>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Interactive map */}
            <div className="rounded-2xl overflow-hidden shadow-xl border border-[#2C2420]/5">
              <div className="aspect-video relative">
                <iframe
                  src={OSM_EMBED}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  title="Mapa - Chacra La Peregrina, Laguna del Sauce"
                  className="absolute inset-0"
                />
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#C8956C] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[#2C2420] font-medium">
                  {contactData.location || 'El Pejerrey, Laguna del Sauce · Punta del Este, Uruguay'}
                </p>
                <a
                  href={MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-[#3A6B7E] hover:text-[#2C5A6B] mt-1 transition-colors"
                >
                  {contactData.mapLink || 'Abrir en Google Maps'}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
