'use client';

import { useEffect, useRef, type MouseEvent } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import {
  IoDiamondOutline,
  IoColorPaletteOutline,
  IoCubeOutline,
  IoFlashOutline,
} from 'react-icons/io5';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const features = [
  {
    icon: <IoDiamondOutline className="w-8 h-8 flex-shrink-0" />,
    title: 'Archive Quality',
    subtitle: 'Rigorously Vetted',
    description:
      'Sourced from elite global manufacturers, our elements bear uncompromised structural integrity.',
  },
  {
    icon: <IoCubeOutline className="w-8 h-8 flex-shrink-0" />,
    title: 'Spatial Studio',
    subtitle: 'Quantum Visualization',
    description:
      'Bridge the gap between concept and reality with immersive, high-fidelity 3D environment mapping.',
  },
  {
    icon: <IoColorPaletteOutline className="w-8 h-8 flex-shrink-0" />,
    title: 'Curated Palette',
    subtitle: 'Artisanal Selection',
    description:
      'From classic marbles to avant-garde textures, discover a taxonomy of surfaces for the modern vision.',
  },
  {
    icon: <IoFlashOutline className="w-8 h-8 flex-shrink-0" />,
    title: 'Concierge Protocol',
    subtitle: 'Streamlined Logistics',
    description:
      'Schedule high-priority site assessments and consultations with our expert curators instantly.',
  },
];

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const items = itemsRef.current.filter(
        (item): item is HTMLDivElement => item !== null
      );

      if (!items.length) return;

      gsap.set(items, {
        clearProps: 'opacity,transform',
      });

      gsap.fromTo(
        items,
        {
          autoAlpha: 0,
          y: 80,
          scale: 0.96,
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
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

      requestAnimationFrame(() => ScrollTrigger.refresh());
    },
    { scope: sectionRef }
  );

  useEffect(() => {
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>, index: number) => {
    const card = itemsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPct = x / rect.width - 0.5;
    const yPct = y / rect.height - 0.5;

    gsap.to(card, {
      duration: 0.35,
      rotationY: xPct * 16,
      rotationX: -yPct * 16,
      ease: 'power3.out',
      transformPerspective: 1200,
      overwrite: 'auto',
    });
  };

  const handleMouseLeave = (index: number) => {
    const card = itemsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      duration: 0.5,
      rotationY: 0,
      rotationX: 0,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  };

  return (
    <section
      ref={sectionRef}
      className="py-32 bg-brand-cream text-brand-charcoal overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <div className="mb-6 overflow-hidden">
            <span className="inline-block text-[10px] font-black uppercase tracking-[0.5em] text-brand-gold italic">
              The Atelier Standards
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold font-heading mb-8 tracking-tighter italic leading-[0.95]">
            Crafted for <span className="text-brand-gold">Excellence.</span>
          </h2>
          <p className="text-brand-taupe text-lg font-medium italic opacity-80 leading-relaxed">
            Synthesizing artisanal craftsmanship with architectural technology to
            redefine the design journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              ref={(el) => {
                itemsRef.current[i] = el;
              }}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={() => handleMouseLeave(i)}
              className="group flex flex-col items-center text-center p-12 border border-brand-beige/50 rounded-[3rem] bg-white transition-all duration-700 cursor-default will-change-transform shadow-2xl shadow-brand-charcoal/5 hover:border-brand-gold/50"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div
                className="p-8 bg-brand-gold/5 text-brand-gold rounded-full mb-10 transition-all duration-700 group-hover:scale-110 group-hover:bg-brand-charcoal group-hover:text-brand-gold shadow-inner border border-brand-gold/10"
                style={{ transform: 'translateZ(50px)' }}
              >
                {feature.icon}
              </div>

              <h3
                className="text-2xl font-bold mb-2 tracking-tighter text-brand-charcoal italic"
                style={{ transform: 'translateZ(40px)' }}
              >
                {feature.title}
              </h3>

              <p
                className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold mb-6 italic"
                style={{ transform: 'translateZ(30px)' }}
              >
                {feature.subtitle}
              </p>

              <p
                className="text-brand-taupe text-sm leading-relaxed font-medium italic opacity-80"
                style={{ transform: 'translateZ(20px)' }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}