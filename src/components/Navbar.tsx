import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { content } from '../lib/constants';
import brandLogo from '../assets/logo.png';

interface NavbarProps {
  lang: 'en' | 'ar';
  setLang: (lang: 'en' | 'ar') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, setLang }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const t = content[lang];
  const isBlog = location.pathname === '/blog' || location.pathname.startsWith('/blog/');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { name: t.nav.home, href: '#home' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.services, href: '#services' },
    { name: t.nav.team, href: '#team' },
    { name: t.nav.contact, href: '#contact' },
  ];

  return (
    <nav className="fixed top-3 sm:top-4 md:top-6 left-0 right-0 z-50 px-3 sm:px-4 md:px-6">
      {/*
        Scroll offset lives only on this wrapper — not on <nav>. A transformed ancestor breaks
        `position: fixed` for the mobile panel (it clips to the bar). The menu stays a sibling below.
      */}
      <div
        className={cn(
          'max-w-7xl mx-auto transition-transform duration-500',
          isScrolled ? 'translate-y-[-0.25rem] md:translate-y-[-0.5rem]' : ''
        )}
      >
        <div className={cn(
          "glass rounded-2xl px-3 py-2 sm:px-5 sm:py-2.5 md:px-6 flex items-center justify-between gap-2 sm:gap-3 border border-black/5 shadow-2xl transition-all duration-500 min-w-0",
          isScrolled ? "bg-white/95" : "bg-white/78"
        )}>
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 sm:gap-3 group min-w-0 flex-1 pr-1">
            <img
              src={brandLogo}
              alt={t.site.documentTitle}
              className="h-10 w-auto max-h-10 max-w-[2.875rem] sm:h-11 sm:max-h-11 sm:max-w-[3.375rem] md:h-14 md:max-h-14 md:max-w-none object-contain shrink-0 rounded-full drop-shadow-[0_4px_12px_rgba(47,159,157,0.2)] group-hover:opacity-90 transition-opacity"
            />
            <div className="min-w-0 flex-1">
              <h3 className="font-black text-base sm:text-lg md:text-2xl tracking-tighter leading-tight text-dark truncate">{t.site.wordmarkLine1}</h3>
              <p className={cn('text-[9px] sm:text-[10px] font-black text-dark/30 tracking-wide sm:tracking-[0.3em] truncate', lang === 'en' && 'uppercase')}>{t.site.wordmarkLine2}</p>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.href} 
                href={link.href} 
                className="text-[10px] font-black uppercase tracking-widest text-dark/40 hover:text-primary transition-all relative overflow-hidden h-4"
              >
                <span className="block group-hover:-translate-y-full transition-transform">
                  {link.name}
                </span>
                <span className="block absolute top-full left-0 group-hover:-translate-y-full transition-transform text-primary text-[10px]">
                  {link.name}
                </span>
              </a>
            ))}
            <Link
              to="/blog"
              className={cn(
                'text-[10px] font-black uppercase tracking-widest transition-colors relative overflow-hidden h-4',
                isBlog ? 'text-primary' : 'text-dark/40 hover:text-primary'
              )}
            >
              {t.nav.blog}
            </Link>
            
            <div className="w-px h-5 bg-dark/10" />

            <button
              type="button"
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="px-3 py-1.5 bg-dark text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-colors flex items-center gap-2"
            >
              <Globe className="w-3 h-3" />
              {lang === 'en' ? 'AR' : 'EN'}
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="flex md:hidden items-center shrink-0 gap-1.5">
            <button
              type="button"
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center glass rounded-full touch-manipulation"
              aria-label={lang === 'en' ? 'العربية' : 'English'}
            >
              <Globe className="w-5 h-5 text-dark shrink-0" />
            </button>
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center glass rounded-full text-dark touch-manipulation"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X className="w-6 h-6 shrink-0" /> : <Menu className="w-6 h-6 shrink-0" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu — sibling of transformed bar wrapper so fixed covers the viewport */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 bottom-0 z-[60] md:hidden bg-white/98 backdrop-blur-3xl border-t border-black/5 overflow-y-auto overscroll-contain"
            style={{
              top: 'max(5rem, calc(env(safe-area-inset-top, 0px) + 4.25rem))',
              paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom, 0px))',
            }}
          >
            <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-3.5 px-2 text-xl sm:text-3xl font-black text-dark hover:text-primary active:text-primary transition-colors tracking-tighter rounded-xl hover:bg-primary/5"
                >
                  {link.name}
                </a>
              ))}
              <Link
                to="/blog"
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  'block py-3.5 px-2 text-xl sm:text-3xl font-black transition-colors tracking-tighter rounded-xl hover:bg-primary/5',
                  isBlog ? 'text-primary' : 'text-dark hover:text-primary active:text-primary'
                )}
              >
                {t.nav.blog}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
