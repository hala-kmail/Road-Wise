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
    <footer className="bg-white text-dark sm:pt-32 pt-16 sm:pb-16 pb-8 px-6 border-t border-black/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-4 mb-8">
              <img
                src={brandLogo}
                alt={t.site.documentTitle}
                className="h-14 w-auto max-h-14 object-contain shrink-0 drop-shadow-[0_4px_12px_rgba(47,159,157,0.2)] rounded-full"
              />
              <div>
                 <h3 className="font-black text-2xl tracking-tighter leading-none text-dark">{t.site.wordmarkLine1}</h3>
                 <p className={cn('text-[10px] font-black text-dark/30 tracking-[0.3em]', lang === 'en' && 'uppercase')}>{t.site.wordmarkLine2}</p>
              </div>
            </div>
            <p className="text-dark/40 text-sm leading-relaxed mb-10 max-w-xs font-medium">
              {t.hero.tagline}
            </p>
            <div className="flex gap-4">
              {[Linkedin, Facebook, Twitter, Instagram].map((Icon, idx) => (
                <a key={idx} href="#" className="w-12 h-12 bg-bg-card border border-black/5 rounded-xl flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:pl-12">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-dark/20 mb-8">
              {lang === 'en' ? "Navigation" : "التنقل"}
            </h4>
            <ul className="space-y-4 text-dark/60 text-sm font-bold">
              <li><a href="#home" className="hover:text-primary transition-colors">{t.nav.home}</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">{t.nav.about}</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">{t.nav.services}</a></li>
              <li><a href="#team" className="hover:text-primary transition-colors">{t.nav.team}</a></li>
            </ul>
          </div>

          {/* Contact Summary */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-dark/20 mb-8">
              {t.nav.contact}
            </h4>
            <ul className="space-y-6 text-dark/60 text-sm font-medium">
              <li className="flex flex-col gap-1">
                <span className="text-[10px] font-black text-dark/20 uppercase tracking-widest">Main Office</span>
                <span className="font-bold text-dark/80">{t.contact.palestine.phone}</span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-[10px] font-black text-dark/20 uppercase tracking-widest">Regional Office</span>
                <span className="font-bold text-dark/80">{t.contact.jordan.phone1}</span>
              </li>
              <li className="pt-2">
                <a href={`mailto:${t.contact.palestine.email}`} className="text-primary font-black tracking-widest text-xs uppercase hover:underline transition-all">
                  {t.contact.palestine.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Regulatory */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-dark/20 mb-8">
              {lang === 'en' ? "Registration" : "التسجيل"}
            </h4>
            <div className="bg-bg-card p-6 rounded-3xl border border-black/5">
              <p className="text-2xl font-black text-dark mb-2 tracking-tighter">#562595355</p>
              <p className="text-xs text-dark/40 leading-relaxed font-medium">
                {lang === 'en' ? "Palestinian private shareholding company registered at the Ministry of National Economy." : "شركة مساهمة فلسطينية خاصة مسجلة لدى وزارة الاقتصاد الوطني."}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-16 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-dark/20 text-[10px] font-black uppercase tracking-[0.3em]">
            {t.footer.rights}
          </p>
          <div className="flex gap-8">
             <a href="#" className="text-dark/20 text-[10px] font-black uppercase tracking-widest hover:text-dark transition-colors">Privacy Policy</a>
             <a href="#" className="text-dark/20 text-[10px] font-black uppercase tracking-widest hover:text-dark transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
