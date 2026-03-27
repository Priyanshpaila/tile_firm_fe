'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const categories = [
  {
    id: 'floor',
    title: 'Floor Elements',
    subtitle: 'Foundation & Durability',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'wall',
    title: 'Wall Surfaces',
    subtitle: 'Elegance & Texture',
    image:
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'outdoor',
    title: 'External Textures',
    subtitle: 'Climate Resilience',
    image:
      'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'decor',
    title: 'Artisanal Accents',
    subtitle: 'Detail & Craft',
    image:
      'https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?q=80&w=800&auto=format&fit=crop',
  },
];

export function CategorySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useGSAP(
    () => {
      const cards = cardsRef.current.filter(
        (card): card is HTMLAnchorElement => card !== null
      );

      if (!cards.length) return;

      gsap.set(cards, {
        clearProps: 'opacity,transform',
      });

      gsap.fromTo(
        cards,
        {
          autoAlpha: 0,
          y: 60,
          scale: 0.98,
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.12,
          ease: 'expo.out',
          overwrite: 'auto',
          clearProps: 'opacity,transform',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
            invalidateOnRefresh: true,
          },
        }
      );

      cards.forEach((card) => {
        const bg = card.querySelector<HTMLElement>('.parallax-bg');
        if (!bg) return;

        gsap.to(bg, {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    },
    { scope: sectionRef }
  );

  useEffect(() => {
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  return (
    <section ref={sectionRef} className="py-32 bg-brand-cream overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mb-20 flex flex-col md:flex-row justify-between items-end gap-10">
          <div className="max-w-2xl">
            <div className="mb-6 overflow-hidden">
              <span className="inline-block text-[10px] font-black uppercase tracking-[0.5em] text-brand-gold italic">
                Curation • Chapters
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold font-heading mb-6 text-brand-charcoal tracking-tighter italic">
              Architectural <span className="text-brand-gold">Taxonomy.</span>
            </h2>
            <p className="text-brand-taupe text-lg font-medium italic opacity-80 leading-relaxed">
              Discover the perfect foundation for your next project, rigorously
              curated by space, durability, and aesthetic intent.
            </p>
          </div>

          <Link
            href="/products"
            className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold hover:text-brand-charcoal transition-all duration-500 italic pb-2 border-b border-brand-beige"
          >
            Discover Full Archive
            <span className="text-lg group-hover:translate-x-2 transition-transform">
              ↗
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.id}`}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="group relative h-[550px] overflow-hidden rounded-[2.5rem] border border-brand-beige/50 shadow-2xl shadow-brand-charcoal/5 transition-all duration-700 hover:border-brand-gold hover:-translate-y-2"
            >
              <div
                className="parallax-bg absolute inset-[-20%] bg-cover bg-center transition-transform duration-[2s] ease-out group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
                style={{ backgroundImage: `url(${cat.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/20 to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-90" />
              <div className="absolute inset-0 border-[0.5px] border-white/10 rounded-[2.5rem] pointer-events-none" />

              <div className="relative z-10 h-full flex flex-col justify-end p-10 transition-all duration-500">
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-brand-gold mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0 italic">
                  Category {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-3xl font-bold text-white mb-2 tracking-tighter italic group-hover:text-brand-gold transition-colors">
                  {cat.title}
                </h3>
                <p className="text-brand-beige/60 text-xs font-bold uppercase tracking-widest italic mb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  {cat.subtitle}
                </p>
                <div className="h-[1px] w-0 group-hover:w-full bg-brand-gold/30 transition-all duration-700" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}