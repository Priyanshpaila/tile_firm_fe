'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

gsap.registerPlugin(useGSAP, ScrollTrigger);

type HeroParticle = {
  width: number;
  height: number;
  left: number;
  top: number;
};

export function HeroSection() {
  const containerRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const buttonsRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const particles = useMemo<HeroParticle[]>(
    () =>
      Array.from({ length: 8 }, () => ({
        width: Math.random() * 200 + 100,
        height: Math.random() * 200 + 100,
        left: Math.random() * 90,
        top: Math.random() * 90,
      })),
    []
  );

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      tl.fromTo(
        titleRef.current,
        { y: 120, opacity: 0, scale: 0.95, skewY: 5 },
        { y: 0, opacity: 1, scale: 1, skewY: 0, duration: 1.8, delay: 0.3 }
      )
        .fromTo(
          subtitleRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2 },
          '-=1.4'
        )
        .fromTo(
          buttonsRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          '-=1'
        );

      const animatedParticles = gsap.utils.toArray<HTMLElement>('.hero-particle');

      animatedParticles.forEach((particle, i) => {
        gsap.to(particle, {
          y: 'random(-60, 60)',
          x: 'random(-30, 30)',
          rotation: i % 2 === 0 ? 5 : -5,
          duration: 'random(4, 8)',
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        });
      });

      gsap.to(titleRef.current, {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      const handleMouseMove = (e: MouseEvent) => {
        if (!bgRef.current) return;

        const xPos = (e.clientX / window.innerWidth - 0.5) * 30;
        const yPos = (e.clientY / window.innerHeight - 0.5) * 30;

        gsap.to(bgRef.current, {
          x: xPos,
          y: yPos,
          duration: 1.5,
          ease: 'power3.out',
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[95vh] items-center justify-center overflow-hidden bg-brand-cream"
    >
      <div ref={bgRef} className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:60px_60px] opacity-[0.03]" />

        {isMounted &&
          particles.map((particle, i) => (
            <div
              key={i}
              className="hero-particle absolute rounded-sm border border-brand-gold/10 bg-white shadow-xl"
              style={{
                width: `${particle.width}px`,
                height: `${particle.height}px`,
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                opacity: 0.1,
                backdropFilter: 'blur(4px)',
              }}
            />
          ))}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(184,155,114,0.1),transparent_70%)]" />
      </div>

      <div className="container relative z-10 flex flex-col items-center px-6 text-center">
        <div className="mb-8 overflow-hidden">
          <span className="hero-particle inline-block text-[10px] font-black uppercase tracking-[0.6em] text-brand-gold italic">
            Tile Firm • Est. 2024
          </span>
        </div>

        <h1
          ref={titleRef}
          className="mb-12 max-w-6xl text-6xl font-bold font-heading leading-[0.9] tracking-tighter text-brand-charcoal opacity-0 italic md:text-8xl lg:text-[9rem]"
        >
          Mastering <br />
          <span className="relative text-brand-gold">
            The Surface
            <div className="absolute left-0 -bottom-4 h-[1px] w-full bg-brand-gold/30" />
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="mb-16 max-w-2xl text-lg font-medium leading-relaxed text-brand-taupe opacity-0 italic md:text-xl"
        >
          Curated ceramic masterpieces for high-end architectural vision.
          <br className="hidden md:block" />
          Experience luxury surfaces in our immersive digital studio.
        </p>

        <div ref={buttonsRef} className="flex flex-col gap-8 opacity-0 sm:flex-row">
          <Button
            size="lg"
            asChild
            className="rounded-full bg-brand-charcoal px-16 py-8 text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl shadow-brand-charcoal/20 transition-colors hover:bg-brand-gold"
          >
            <Link href="/products">Explore Archive ↗</Link>
          </Button>

          <Button
            size="lg"
            variant="outline"
            asChild
            className="rounded-full border-brand-beige px-16 py-8 text-[10px] font-black uppercase tracking-[0.4em] transition-colors hover:border-brand-gold"
          >
            <Link href="/visualizer">Launch Atelier</Link>
          </Button>
        </div>
      </div>

      <div className="group absolute bottom-12 left-1/2 flex -translate-x-1/2 cursor-pointer flex-col items-center gap-4 text-brand-taupe opacity-40 transition-opacity duration-500 hover:opacity-100">
        <span className="text-[9px] font-black uppercase tracking-[0.4em] italic">
          Descending
        </span>
        <div className="relative h-20 w-[1px] overflow-hidden bg-gradient-to-b from-brand-gold via-brand-beige to-transparent">
          <div className="animate-scroll-line absolute left-0 top-0 h-1/2 w-full bg-brand-gold" />
        </div>
      </div>
    </section>
  );
}