import React, { useState } from 'react';
import { motion } from 'motion/react';
import { content } from '../lib/constants';
import { MapPin, Phone, Mail, Send, Smartphone } from 'lucide-react';
import { cn } from '../lib/utils';

interface ContactProps {
  lang: 'en' | 'ar';
}

const telHref = (raw: string) => `tel:${raw.replace(/[^\d+]/g, '')}`;

export const Contact: React.FC<ContactProps> = ({ lang }) => {
  const t = content[lang].contact;
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = '972599251482';
    const text = `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const inputClass =
    'w-full rounded-xl border border-black/[0.08] bg-white px-4 py-3.5 text-sm font-semibold text-dark shadow-sm transition-all placeholder:text-dark/35 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20';

  return (
    <section id="contact" className="relative bg-bg-deep px-4 py-16 sm:px-6 sm:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background:
            'radial-gradient(ellipse 90% 55% at 100% 0%, color-mix(in srgb, var(--color-primary) 8%, transparent), transparent 52%)',
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-8 text-center lg:mb-10 lg:text-start">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-black tracking-tighter text-dark md:text-5xl"
          >
            {t.title}
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-[1.5rem] border border-black/[0.07] bg-white shadow-[0_28px_80px_-48px_rgba(0,0,0,0.16),0_0_0_1px_rgba(255,255,255,0.85)_inset] sm:rounded-[1.85rem]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* معلومات المكاتب */}
            <aside className="border-b border-dark/10 bg-gradient-to-b from-dark via-zinc-900 to-zinc-950 p-8 text-white sm:p-10 lg:col-span-5 lg:border-b-0 lg:border-e lg:border-dark/15 lg:p-12">
              <p className="mb-8 font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-white/45">
                {lang === 'en' ? 'Offices' : 'المكاتب'}
              </p>

              <div className="space-y-10">
                <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40">{t.palestine.title}</p>
                  <div className="flex gap-3">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/10">
                      <MapPin className="h-4 w-4 text-primary-light" aria-hidden />
                    </span>
                    <p className="text-sm font-semibold leading-relaxed text-white/90">{t.palestine.address}</p>
                  </div>
                  <div className="flex flex-col gap-2 ps-12">
                    <a
                      href={telHref(t.palestine.phone)}
                      className="flex items-center gap-2 text-sm font-bold text-white/90 transition-colors hover:text-primary-light"
                    >
                      <Phone className="h-3.5 w-3.5 shrink-0 text-white/45" aria-hidden />
                      {t.palestine.phone}
                    </a>
                    <a
                      href={telHref(t.palestine.mobile)}
                      className="flex items-center gap-2 text-sm font-bold text-white/90 transition-colors hover:text-primary-light"
                    >
                      <Smartphone className="h-3.5 w-3.5 shrink-0 text-white/45" aria-hidden />
                      {t.palestine.mobile}
                    </a>
                  </div>
                </div>

                <div className="space-y-4 border-t border-white/10 pt-10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40">{t.jordan.title}</p>
                  <div className="flex gap-3">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/10">
                      <MapPin className="h-4 w-4 text-accent-yellow" aria-hidden />
                    </span>
                    <p className="text-sm font-semibold leading-relaxed text-white/90">{t.jordan.address}</p>
                  </div>
                  <div className="flex flex-col gap-2 ps-12">
                    <a
                      href={telHref(t.jordan.phone1)}
                      className="flex items-center gap-2 text-sm font-bold text-white/90 transition-colors hover:text-primary-light"
                    >
                      <Phone className="h-3.5 w-3.5 shrink-0 text-white/45" aria-hidden />
                      {t.jordan.phone1}
                    </a>
                    <a
                      href={telHref(t.jordan.phone2)}
                      className="flex items-center gap-2 text-sm font-bold text-white/90 transition-colors hover:text-primary-light"
                    >
                      <Phone className="h-3.5 w-3.5 shrink-0 text-white/45" aria-hidden />
                      {t.jordan.phone2}
                    </a>
                  </div>
                </div>

                <a
                  href={`mailto:${t.palestine.email}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-bold text-white/95 ring-1 ring-white/5 transition-colors hover:border-primary/40 hover:bg-white/10"
                >
                  <Mail className="h-4 w-4 text-primary-light" aria-hidden />
                  {t.palestine.email}
                </a>
              </div>
            </aside>

            {/* النموذج */}
            <div className="flex flex-col p-8 sm:p-10 lg:col-span-7 lg:p-12">
              <form className="flex flex-1 flex-col gap-4" onSubmit={handleWhatsApp}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                    }}
                    placeholder={t.form.name}
                    className={inputClass}
                  />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                    }}
                    placeholder={t.form.email}
                    className={inputClass}
                  />
                </div>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                  }}
                  placeholder={t.form.message}
                  className={cn(inputClass, 'resize-none')}
                />

                <button
                  type="submit"
                  className="mt-2 flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-primary to-primary-light py-4 text-sm font-black uppercase tracking-[0.18em] text-white shadow-md shadow-primary/25 transition-transform hover:scale-[1.01] active:scale-[0.99]"
                >
                  {t.form.send}
                  <Send className="h-4 w-4" aria-hidden />
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
