import React, { useState } from 'react';
import { motion } from 'motion/react';
import { content } from '../lib/constants';
import { MapPin, Phone, Mail, Send, Smartphone } from 'lucide-react';
import { cn } from '../lib/utils';

interface ContactProps {
  lang: 'en' | 'ar';
}

const telHref = (raw: string) => `tel:${raw.replace(/[^\d+]/g, '')}`;

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export const Contact: React.FC<ContactProps> = ({ lang }) => {
  const t = content[lang].contact;
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formStatus === 'sending') {
      return;
    }
    setFormStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          lang,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean };
      if (res.ok && data.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
        return;
      }
      setFormStatus('error');
    } catch {
      setFormStatus('error');
    }
  };

  const inputClass =
    'w-full rounded-2xl border border-dark/[0.08] bg-white px-4 py-3.5 text-sm font-semibold text-dark shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] transition-all placeholder:text-dark/38 focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/15';

  return (
    <section id="contact" className="relative overflow-hidden bg-bg-deep px-4 py-20 sm:px-6 sm:py-28">
      <div className="hero-backdrop-mesh pointer-events-none absolute inset-0 opacity-[0.55]" aria-hidden />
      <div
        className="pointer-events-none absolute -start-[18%] top-1/4 h-[min(52rem,90vw)] w-[min(52rem,90vw)] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle, color-mix(in srgb, var(--color-primary) 22%, transparent) 0%, transparent 68%)',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -end-[12%] bottom-0 h-[min(40rem,75vw)] w-[min(40rem,75vw)] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle, color-mix(in srgb, var(--color-accent-yellow) 18%, transparent) 0%, transparent 65%)',
        }}
        aria-hidden
      />
      <div className="hero-fine-grid pointer-events-none absolute inset-0 opacity-[0.35]" aria-hidden />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-3xl text-center lg:mx-0 lg:max-w-2xl lg:text-start">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/80 px-4 py-1.5 text-meta font-bold uppercase tracking-[0.22em] text-primary shadow-sm backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)]" aria-hidden />
            {t.eyebrow}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-display font-black tracking-tight text-dark"
          >
            <span className="bg-gradient-to-br from-dark via-dark to-primary bg-clip-text text-transparent">
              {t.title}
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-base font-medium leading-relaxed text-dark/65 md:text-lg"
          >
            {t.subtitle}
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-8 h-1 w-24 origin-center rounded-full bg-gradient-to-r from-primary via-primary-light to-accent-yellow lg:mx-0 lg:origin-start"
            aria-hidden
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-[1.75rem] border border-black/[0.06] bg-white/90 shadow-[0_32px_90px_-40px_rgba(47,159,157,0.35),0_32px_80px_-48px_rgba(0,0,0,0.12)] backdrop-blur-md sm:rounded-[2.25rem]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <aside className="relative border-b border-white/10 bg-gradient-to-b from-zinc-950 via-dark to-zinc-950 p-8 text-white sm:p-10 lg:col-span-5 lg:border-b-0 lg:border-e lg:border-white/10 lg:p-12">
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.12]"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 20% 20%, color-mix(in srgb, var(--color-primary-light) 55%, transparent), transparent 42%), radial-gradient(circle at 90% 80%, color-mix(in srgb, var(--color-accent-yellow) 40%, transparent), transparent 48%)',
                }}
                aria-hidden
              />
              <div className="hero-noise absolute inset-0 rounded-[inherit]" aria-hidden />

              <div className="relative">
                <p className="mb-8 font-mono text-label font-semibold uppercase tracking-[0.3em] text-white/50">
                  {lang === 'en' ? 'Offices' : 'المكاتب'}
                </p>

                <div className="space-y-6">
                  <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-5 ring-1 ring-white/[0.04] transition-all duration-300 hover:border-primary/35 hover:bg-white/[0.09] hover:shadow-[0_0_0_1px_color-mix(in_srgb,var(--color-primary)_28%,transparent),0_20px_50px_-28px_rgba(0,0,0,0.45)]">
                    <div className="absolute start-0 top-0 h-full w-1 rounded-s-2xl bg-gradient-to-b from-primary-light to-primary opacity-90" aria-hidden />
                    <p className="mb-4 text-label font-black uppercase tracking-[0.2em] text-white/45">{t.palestine.title}</p>
                    <div className="flex gap-3">
                      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/25">
                        <MapPin className="h-4 w-4 text-primary-light" aria-hidden />
                      </span>
                      <p className="text-sm font-semibold leading-relaxed text-white/92 lg:text-base">{t.palestine.address}</p>
                    </div>
                    <div className="mt-4 flex flex-col gap-2.5 border-t border-white/10 pt-4 ps-[3.25rem]">
                      <a
                        href={telHref(t.palestine.phone)}
                        className="flex items-center gap-2 text-sm font-bold text-white/90 transition-colors hover:text-primary-light"
                      >
                        <Phone className="h-3.5 w-3.5 shrink-0 text-white/40" aria-hidden />
                        {t.palestine.phone}
                      </a>
                      <a
                        href={telHref(t.palestine.mobile)}
                        className="flex items-center gap-2 text-sm font-bold text-white/90 transition-colors hover:text-primary-light"
                      >
                        <Smartphone className="h-3.5 w-3.5 shrink-0 text-white/40" aria-hidden />
                        {t.palestine.mobile}
                      </a>
                    </div>
                  </div>

                  <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-5 ring-1 ring-white/[0.04] transition-all duration-300 hover:border-accent-yellow/40 hover:bg-white/[0.09] hover:shadow-[0_0_0_1px_color-mix(in_srgb,var(--color-accent-yellow)_35%,transparent),0_20px_50px_-28px_rgba(0,0,0,0.45)]">
                    <div className="absolute start-0 top-0 h-full w-1 rounded-s-2xl bg-gradient-to-b from-accent-yellow to-amber-500 opacity-95" aria-hidden />
                    <p className="mb-4 text-label font-black uppercase tracking-[0.2em] text-white/45">{t.jordan.title}</p>
                    <div className="flex gap-3">
                      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-yellow/15 ring-1 ring-accent-yellow/30">
                        <MapPin className="h-4 w-4 text-accent-yellow" aria-hidden />
                      </span>
                      <p className="text-sm font-semibold leading-relaxed text-white/92 lg:text-base">{t.jordan.address}</p>
                    </div>
                    <div className="mt-4 flex flex-col gap-2.5 border-t border-white/10 pt-4 ps-[3.25rem]">
                      <a
                        href={telHref(t.jordan.phone1)}
                        className="flex items-center gap-2 text-sm font-bold text-white/90 transition-colors hover:text-accent-yellow"
                      >
                        <Phone className="h-3.5 w-3.5 shrink-0 text-white/40" aria-hidden />
                        {t.jordan.phone1}
                      </a>
                      <a
                        href={telHref(t.jordan.phone2)}
                        className="flex items-center gap-2 text-sm font-bold text-white/90 transition-colors hover:text-accent-yellow"
                      >
                        <Phone className="h-3.5 w-3.5 shrink-0 text-white/40" aria-hidden />
                        {t.jordan.phone2}
                      </a>
                    </div>
                  </div>

                  <a
                    href={`mailto:${t.palestine.email}`}
                    className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl border border-white/12 bg-gradient-to-r from-white/[0.07] to-white/[0.03] px-4 py-3.5 text-sm font-bold text-white shadow-inner ring-1 ring-white/5 transition-all hover:border-primary/40 hover:from-primary/20 hover:to-primary/10 hover:ring-primary/20"
                  >
                    <Mail className="h-4 w-4 text-primary-light transition-transform group-hover:scale-110" aria-hidden />
                    <span className="truncate">{t.palestine.email}</span>
                  </a>
                </div>
              </div>
            </aside>

            <div className="relative flex flex-col bg-gradient-to-br from-bg-deep/90 via-white to-white p-8 sm:p-10 lg:col-span-7 lg:p-12">
              <div
                className="pointer-events-none absolute end-0 top-0 h-48 w-48 rounded-full blur-2xl"
                style={{
                  background:
                    'radial-gradient(circle, color-mix(in srgb, var(--color-primary) 14%, transparent), transparent 70%)',
                }}
                aria-hidden
              />

              <div className="relative flex flex-1 flex-col">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-black text-dark md:text-xl">{t.formHeading}</h3>
                    <p className="mt-2 flex items-center gap-2.5 text-sm font-medium leading-relaxed text-dark/55 sm:text-base lg:text-body-sm">
                    
                      {t.emailFormHint}
                    </p>
                  </div>
                </div>

                <form className="flex flex-1 flex-col gap-4" onSubmit={handleEmailSubmit}>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <input
                      type="text"
                      required
                      disabled={formStatus === 'sending'}
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (formStatus === 'success' || formStatus === 'error') {
                          setFormStatus('idle');
                        }
                      }}
                      placeholder={t.form.name}
                      className={inputClass}
                    />
                    <input
                      type="email"
                      required
                      disabled={formStatus === 'sending'}
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (formStatus === 'success' || formStatus === 'error') {
                          setFormStatus('idle');
                        }
                      }}
                      placeholder={t.form.email}
                      className={inputClass}
                    />
                  </div>
                  <textarea
                    rows={5}
                    required
                    disabled={formStatus === 'sending'}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (formStatus === 'success' || formStatus === 'error') {
                        setFormStatus('idle');
                      }
                    }}
                    placeholder={t.form.message}
                    className={cn(inputClass, 'min-h-[8.5rem] resize-y')}
                  />

                  {formStatus === 'success' && (
                    <p className="rounded-2xl border border-primary/25 bg-primary/8 px-4 py-3 text-sm font-semibold text-dark">
                      {t.formSuccess}
                    </p>
                  )}
                  {formStatus === 'error' && (
                    <p className="rounded-2xl border border-red-500/25 bg-red-500/8 px-4 py-3 text-sm font-semibold text-dark">
                      {t.formError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={formStatus === 'sending'}
                    className="hero-cta-shine group relative mt-1 flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-primary to-primary-light py-4 text-sm font-black uppercase tracking-[0.16em] text-white shadow-lg shadow-primary/30 transition-transform enabled:hover:scale-[1.01] enabled:active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <span className="relative z-[1] flex items-center gap-3">
                      {formStatus === 'sending' ? t.formSending : t.form.send}
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:rotate-180" aria-hidden />
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
