import React from 'react';
import { content } from '../lib/constants';
import { cn } from '../lib/utils';
import brandLogo from '../assets/logo.png';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

interface FooterProps {
  lang: 'en' | 'ar';
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = content[lang];
  
  return (
    <footer className="relative border-t border-white/10 bg-dark pt-16 pb-8 text-white/90 sm:pb-16 sm:pt-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(47,159,157,0.12),transparent_55%)]" aria-hidden />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-24 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-8 flex items-center gap-4">
              <img
                src={brandLogo}
                alt={t.site.documentTitle}
                className="h-14 w-auto max-h-14 shrink-0 rounded-full object-contain drop-shadow-[0_4px_16px_rgba(47,159,157,0.35)]"
              />
              <div>
                 <h3 className="text-2xl font-black leading-none tracking-tighter text-white">{t.site.wordmarkLine1}</h3>
                 <p className={cn('text-[10px] font-black tracking-[0.3em] text-white/45', lang === 'en' && 'uppercase')}>{t.site.wordmarkLine2}</p>
              </div>
            </div>
            <p className="mb-10 max-w-xs text-sm font-medium leading-relaxed text-white/55">
              {t.hero.tagline}
            </p>
            <div className="flex gap-3">
              {[Linkedin, Facebook, Twitter, Instagram].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition-all duration-300 hover:border-primary/40 hover:bg-primary hover:text-white"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:ps-12">
            <h4 className="mb-8 text-xs font-black uppercase tracking-[0.2em] text-white/40">
              {lang === 'en' ? "Navigation" : "التنقل"}
            </h4>
            <ul className="space-y-4 text-sm font-bold text-white/65">
              <li><a href="#home" className="transition-colors hover:text-primary-light">{t.nav.home}</a></li>
              <li><a href="#about" className="transition-colors hover:text-primary-light">{t.nav.about}</a></li>
              <li><a href="#services" className="transition-colors hover:text-primary-light">{t.nav.services}</a></li>
              <li><a href="#team" className="transition-colors hover:text-primary-light">{t.nav.team}</a></li>
            </ul>
          </div>

          {/* Contact Summary */}
          <div>
            <h4 className="mb-8 text-xs font-black uppercase tracking-[0.2em] text-white/40">
              {t.nav.contact}
            </h4>
            <ul className="space-y-6 text-sm font-medium text-white/65">
              <li className="flex flex-col gap-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/35">{lang === 'en' ? 'Main Office' : 'المكتب الرئيسي'}</span>
                <span className="font-bold text-white/90">{t.contact.palestine.phone}</span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/35">{lang === 'en' ? 'Regional Office' : 'المكتب الإقليمي'}</span>
                <span className="font-bold text-white/90">{t.contact.jordan.phone1}</span>
              </li>
              <li className="pt-2">
                <a href={`mailto:${t.contact.palestine.email}`} className="text-xs font-black uppercase tracking-widest text-primary-light transition-all hover:text-accent-yellow hover:underline">
                  {t.contact.palestine.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Regulatory */}
          <div>
            <h4 className="mb-8 text-xs font-black uppercase tracking-[0.2em] text-white/40">
              {lang === 'en' ? "Registration" : "التسجيل"}
            </h4>
            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm">
              <p className="mb-2 text-2xl font-black tracking-tighter text-white">#562595355</p>
              <p className="text-xs font-medium leading-relaxed text-white/50">
                {lang === 'en' ? "Palestinian private shareholding company registered at the Ministry of National Economy." : "شركة مساهمة فلسطينية خاصة مسجلة لدى وزارة الاقتصاد الوطني."}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-8 border-t border-white/10 pt-16 md:flex-row">
          <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-white/35 md:text-start">
            {t.footer.rights}
          </p>
          <div className="flex gap-8">
             <a href="#" className="text-[10px] font-black uppercase tracking-widest text-white/35 transition-colors hover:text-white">{lang === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية'}</a>
             <a href="#" className="text-[10px] font-black uppercase tracking-widest text-white/35 transition-colors hover:text-white">{lang === 'en' ? 'Terms of Service' : 'شروط الخدمة'}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
