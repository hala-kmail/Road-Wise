import logo1 from '../assets/logo1.jpg';
import logo2 from '../assets/logo2.jpg';
import logo3 from '../assets/logo3.png';
import logo4 from '../assets/logo4.png';
import logo5 from '../assets/logo5.webp';
import logo6 from '../assets/logo6.png';
import logo7 from '../assets/logo7.png';
import logo8 from '../assets/logo8.png';
import logo9 from '../assets/logo9.png';
import logo10 from '../assets/logo10.png';
import logo11 from '../assets/logo11.jpg';
import logo12 from '../assets/logo12.jpg';
import logo13 from '../assets/logo13.jpg';
import logo14 from '../assets/logo14.png';
import logo15 from '../assets/logo15.png';
import logo16 from '../assets/logo16.jpg';
import logo17 from '../assets/logo17.png';
import logo18 from '../assets/logo18.png';
import logo19 from '../assets/logo19.png';
import logo20 from '../assets/logo20.png';

/** Logos ordered logo1 … logo20 (extensions match files in `src/assets`). */
export const partnerLogoSources = [
  logo1,
  logo2,
  logo3,
  logo4,
  logo5,
  logo6,
  logo7,
  logo8,
  logo9,
  logo10,
  logo11,
  logo12,
  logo13,
  logo14,
  logo15,
  logo16,
  logo17,
  logo18,
  logo19,
  logo20,
] as const;

export type PartnerLogoSlide = { src: string; alt: string };

export function getPartnerLogoMarqueeSlides(lang: 'en' | 'ar'): PartnerLogoSlide[] {
  return partnerLogoSources.map((src, i) => ({
    src,
    alt: lang === 'en' ? `Partner logo ${i + 1}` : `شعار شريك ${i + 1}`,
  }));
}
