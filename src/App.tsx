/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { About } from './components/About.tsx';
import { VisionMission } from './components/VisionMission.tsx';
import { Services } from './components/Services.tsx';
import { Approach } from './components/Approach.tsx';
import { Team } from './components/Team.tsx';
import { Clients } from './components/Clients.tsx';
import { Engagements } from './components/Engagements.tsx';
import { Contact } from './components/Contact.tsx';
import { Footer } from './components/Footer.tsx';
import { Blog } from './components/Blog.tsx';
import { BlogPostDetail } from './components/BlogPostDetail.tsx';
import { content } from './lib/constants';

function HomePage({ lang }: { lang: 'en' | 'ar' }) {
  return (
    <main>
      <Hero lang={lang} />
      <About lang={lang} />
      <VisionMission lang={lang} />
      <Services lang={lang} />
      <Approach lang={lang} />
      <Team lang={lang} />
      <Clients lang={lang} />
      <Engagements lang={lang} />
      <Contact lang={lang} />
    </main>
  );
}

function AppShell() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const cursorRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const hideNavbar = pathname === '/blog' || pathname.startsWith('/blog/');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.title = content[lang].site.documentTitle;
  }, [lang]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-bg-deep font-sans text-dark overflow-x-hidden selection:bg-accent-yellow/22 selection:text-dark scroll-smooth">
      {/* Scroll Progress */}
      <motion.div className="scroll-progress" style={{ scaleX }} />

      {/* Cursor Glow */}
      <div ref={cursorRef} className="cursor-glow hidden md:block" />

      {!hideNavbar && <Navbar lang={lang} setLang={setLang} />}

      <Routes>
        <Route path="/" element={<HomePage lang={lang} />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:documentId" element={<BlogPostDetail />} />
      </Routes>

      <Footer lang={lang} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
