'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function VisualizerCTASection() {
  const containerRef = useRef<HTMLElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const floatElRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 65%',
        },
      });

      tl.from(textRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.5,
        ease: 'expo.out',
      })
        .from(
          imageContainerRef.current,
          {
            y: 80,
            opacity: 0,
            duration: 1.5,
            ease: 'expo.out',
          },
          '-=1.2'
        )
        .from(
          floatElRef.current,
          {
            scale: 0.8,
            opacity: 0,
            y: 40,
            duration: 1,
            ease: 'back.out(1.2)',
          },
          '-=0.8'
        );

      if (floatElRef.current) {
        gsap.to(floatElRef.current, {
          y: -20,
          duration: 3,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
        });
      }

      const imgObj = imageContainerRef.current?.querySelector<HTMLImageElement>('img');
      if (imgObj) {
        gsap.to(imgObj, {
          scale: 1.15,
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-brand-cream py-40"
    >
      <div className="container relative z-10 mx-auto px-6">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-32">
          <div ref={textRef} className="max-w-2xl">
            <div className="mb-8 overflow-hidden">
              <span className="inline-block text-[10px] font-black uppercase tracking-[0.5em] text-brand-gold italic">
                Spatial Intelligence • V2.0
              </span>
            </div>

            <h2 className="mb-10 text-5xl font-bold font-heading leading-[0.9] tracking-tighter text-brand-charcoal italic md:text-7xl">
              Visualize. <br />
              <span className="text-brand-gold">Materialize.</span>
            </h2>

            <p className="mb-12 text-xl font-medium leading-relaxed text-brand-taupe opacity-80 italic">
              Bridge the void between concept and structural reality. Our studio
              environment allows you to curate premium surfaces within your own
              architectural context with quantum precision.
            </p>

            <ul className="mb-16 space-y-8">
              {[
                'Proprietary AI Environment Mapping',
                'High-Fidelity 3D Material Scaling',
                'Real-Time Curation Metadata',
              ].map((item, id) => (
                <li
                  key={item}
                  className="group flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-charcoal italic"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-gold/10 bg-brand-gold/5 text-brand-gold shadow-inner transition-colors duration-500 group-hover:bg-brand-charcoal group-hover:text-brand-gold">
                    {String(id + 1).padStart(2, '0')}
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-8 sm:flex-row">
              <Button
                className="rounded-full bg-brand-charcoal px-16 py-8 text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl shadow-brand-charcoal/20 transition-colors hover:bg-brand-gold"
                asChild
              >
                <Link href="/visualizer">Enter Studio ↗</Link>
              </Button>

              <Button
                variant="outline"
                className="rounded-full border-brand-beige px-16 py-8 text-[10px] font-black uppercase tracking-[0.4em] transition-colors hover:border-brand-gold"
                asChild
              >
                <Link href="/visualizer/upload">Upload Archive</Link>
              </Button>
            </div>
          </div>

          <div
            ref={imageContainerRef}
            className="relative h-[580px] w-full overflow-hidden rounded-[3rem] border border-brand-beige shadow-2xl lg:h-[750px] lg:rounded-[4.5rem]"
          >
            <div className="absolute inset-[-15%] z-0 h-[130%]">
              <img
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1200&auto=format&fit=crop"
                alt="Architectural Visualizer"
                className="h-full w-full rounded-[3rem] object-cover brightness-[0.85] grayscale-[0.1] will-change-transform lg:rounded-[4.5rem]"
              />
            </div>

            <div className="absolute inset-0 z-10 bg-gradient-to-tr from-brand-charcoal/60 via-transparent to-transparent" />
            <div className="pointer-events-none absolute inset-0 z-20 rounded-[3rem] border-[0.5px] border-white/20 lg:rounded-[4.5rem]" />

            <div
              ref={floatElRef}
              className="absolute bottom-6 left-6 z-30 max-w-sm rounded-[2rem] border border-brand-gold/20 bg-white/95 p-6 shadow-2xl backdrop-blur-3xl will-change-transform sm:bottom-12 sm:left-12 sm:p-10 lg:rounded-[2.5rem]"
            >
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <span className="block text-[10px] font-black uppercase tracking-widest text-brand-charcoal italic">
                    Statuario Elite
                  </span>
                  <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-brand-taupe italic">
                    Polished Marble • Layer 01
                  </span>
                </div>
                <span className="rounded-full border border-brand-gold/10 bg-brand-gold/10 px-4 py-1.5 text-[8px] font-black uppercase tracking-widest text-brand-gold italic">
                  Active
                </span>
              </div>

              <div className="flex gap-5">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`relative h-16 w-16 cursor-pointer overflow-hidden rounded-2xl border-2 transition-all duration-500 ${
                      i === 1
                        ? 'scale-110 border-brand-gold shadow-xl'
                        : 'border-brand-beige hover:border-brand-gold'
                    } group/item`}
                  >
                    <div
                      className={`absolute inset-0 ${
                        i === 1
                          ? 'bg-white'
                          : i === 2
                          ? 'bg-brand-charcoal'
                          : 'bg-brand-taupe'
                      }`}
                    />
                    <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity group-hover/item:opacity-100" />
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-brand-beige pt-8">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-brand-gold">
                  Intensity: 85%
                </span>
                <div className="h-1 w-24 overflow-hidden rounded-full bg-brand-beige">
                  <div className="h-full w-[85%] bg-brand-gold" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}