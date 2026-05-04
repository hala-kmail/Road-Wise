import React, { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { content } from '../lib/constants';

interface NavbarProps {
  lang: 'en' | 'ar';
  setLang: (lang: 'en' | 'ar') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, setLang }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = content[lang].nav;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.home, href: '#home' },
    { name: t.about, href: '#about' },
    { name: t.services, href: '#services' },
    { name: t.team, href: '#team' },
    { name: t.contact, href: '#contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-4 md:top-6 left-0 right-0 z-50 transition-all duration-500",
      isScrolled ? "translate-y-[-0.5rem]" : ""
    )}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={cn(
          "glass rounded-2xl px-6 py-2.5 flex items-center justify-between border border-black/5 shadow-2xl transition-all duration-500",
          isScrolled ? "bg-white/95" : "bg-white/80"
        )}>
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-white font-black group-hover:rotate-12 transition-transform text-xs">
              RW
            </div>
            <span className="text-sm font-black text-dark tracking-tighter uppercase">
              RoadWise
            </span>
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
            
            <div className="w-px h-5 bg-dark/10" />

            <button 
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="px-3 py-1.5 bg-dark text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-colors flex items-center gap-2"
            >
              <Globe className="w-3 h-3" />
              {lang === 'en' ? 'AR' : 'EN'}
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="flex md:hidden items-center gap-4">
            <button 
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="p-2 glass rounded-full"
            >
              <Globe className="w-5 h-5 text-dark" />
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 glass rounded-full text-dark"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 top-[88px] z-40 bg-white/95 backdrop-blur-3xl md:hidden overflow-y-auto border-t border-black/5"
          >
            <div className="p-8 space-y-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-4xl font-black text-dark hover:text-primary transition-colors tracking-tighter"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
