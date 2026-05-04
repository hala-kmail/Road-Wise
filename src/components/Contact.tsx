import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { content } from '../lib/constants';
import { MapPin, Phone, Mail, Send, Smartphone, Globe } from 'lucide-react';
import { cn } from '../lib/utils';

interface ContactProps { lang: 'en' | 'ar'; }

const MagneticButton: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set(clientX - centerX);
    y.set(clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.button>
  );
};

export const Contact: React.FC<ContactProps> = ({ lang }) => {
  const t = content[lang].contact;
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = "972599251482";
    const text = `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="contact" className="py-24 bg-white px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          {/* Left Panel - Info */}
          <div className="lg:w-1/3 bg-primary p-12 rounded-[2.5rem] text-white relative overflow-hidden flex flex-col justify-center">
             <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%] border-[20px] border-white/20 rounded-full"
                />
             </div>

             <div className="relative z-10">
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-5xl font-black mb-10 tracking-tighter leading-none"
                >
                  {t.title}
                </motion.h2>
                
                <div className="space-y-8">
                   <motion.div 
                     initial={{ opacity: 0, y: 10 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     className="space-y-3"
                   >
                     <p className="text-[10px] font-black uppercase tracking-widest text-white/40">{t.palestine.title}</p>
                     <div className="flex gap-3">
                        <MapPin className="w-5 h-5 flex-shrink-0 text-white/60" />
                        <p className="font-bold text-sm leading-tight opacity-90">{t.palestine.address}</p>
                     </div>
                     <div className="flex flex-col gap-1 mt-2">
                        <div className="flex items-center gap-2 text-xs font-bold">
                          <Phone className="w-3.5 h-3.5 text-white/40" />
                          <span>{t.palestine.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold">
                           <Smartphone className="w-3.5 h-3.5 text-white/40" />
                           <span>{t.palestine.mobile}</span>
                        </div>
                     </div>
                   </motion.div>

                   <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                      className="space-y-3 pt-6 border-t border-white/10"
                   >
                     <p className="text-[10px] font-black uppercase tracking-widest text-white/40">{t.jordan.title}</p>
                     <div className="flex gap-3">
                        <MapPin className="w-5 h-5 flex-shrink-0 text-white/60" />
                        <p className="font-bold text-sm leading-tight opacity-90">{t.jordan.address}</p>
                     </div>
                     <div className="flex flex-col gap-1 mt-2">
                        <div className="flex items-center gap-2 text-xs font-bold">
                           <Phone className="w-3.5 h-3.5 text-white/40" />
                           <span>{t.jordan.phone1}</span>
                        </div>
                     </div>
                   </motion.div>
                </div>
             </div>
          </div>

          {/* Right Panel - Form */}
          <div className="lg:w-2/3 bg-bg-card p-12 rounded-[2.5rem] border border-black/5 flex flex-col">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="w-full h-full flex flex-col"
            >
              <form className="space-y-4 flex-1" onSubmit={handleWhatsApp}>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t.form.name}
                      className="w-full bg-white border border-black/5 rounded-2xl px-6 py-4 focus:border-primary focus:outline-none transition-all placeholder:text-dark/20 text-sm font-bold"
                    />
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t.form.email}
                      className="w-full bg-white border border-black/5 rounded-2xl px-6 py-4 focus:border-primary focus:outline-none transition-all placeholder:text-dark/20 text-sm font-bold"
                    />
                 </div>
                 <textarea 
                   rows={4}
                   required
                   value={formData.message}
                   onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                   placeholder={t.form.message}
                   className="w-full bg-white border border-black/5 rounded-2xl px-6 py-4 focus:border-primary focus:outline-none transition-all placeholder:text-dark/20 text-sm font-bold resize-none"
                 />

                 <MagneticButton className="w-full group py-5 rounded-2xl bg-primary text-white text-sm font-black uppercase tracking-[0.2em] shadow-lg hover:shadow-primary/20 transition-all flex items-center justify-center gap-4">
                    {t.form.send}
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                 </MagneticButton>
              </form>

              <div className="mt-10 pt-10 border-t border-black/5 grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white border border-black/5 rounded-xl flex items-center justify-center text-primary shadow-sm">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                       <p className="text-[8px] font-black text-dark/30 uppercase leading-none mb-1">Email Details</p>
                       <p className="font-bold text-xs text-dark underline">info@roadwiseconsulting.com</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white border border-black/5 rounded-xl flex items-center justify-center text-secondary shadow-sm">
                       <Globe className="w-4 h-4" />
                    </div>
                    <div>
                       <p className="text-[8px] font-black text-dark/30 uppercase leading-none mb-1">Digital Presence</p>
                       <p className="font-bold text-xs text-dark underline">www.roadwiseconsulting.com</p>
                    </div>
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
