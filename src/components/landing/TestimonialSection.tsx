'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const testimonials = [
  {
    name: 'Sarah Jenkins',
    role: 'Principal Architect • Atelier SJ',
    text:
      "The spatial intelligence of Tile Firm's visualizer has redefined our material procurement protocol. The fidelity of the surface textures is unprecedented.",
  },
  {
    name: 'Michael Chen',
    role: 'Collector & Homeowner',
    text:
      'I was hesitant until I utilized the environment mapping. Seeing the Statuario marble layout within my own architectural context provided absolute certainty.',
  },
  {
    name: 'Emily Riviera',
    role: 'Interior Curator',
    text:
      'Exquisite finishes, seamless logistics, and a booking system that respects the pace of high-end design. A true partner in material excellence.',
  },
];

export function TestimonialSection() {
  const containerRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useGSAP(
    () => {
      const cards = cardsRef.current.filter(
        (card): card is HTMLDivElement => card !== null
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
      });

      tl.fromTo(
        titleRef.current,
        { y: 60, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: 'expo.out' }
      ).fromTo(
        cards,
        { y: 100, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.8,
          stagger: 0.2,
          ease: 'expo.out',
        },
        '-=1.2'
      );

      cards.forEach((card, i) => {
        gsap.to(card, {
          y: -10,
          duration: 3 + i,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
          delay: i * 0.5,
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="overflow-hidden border-t border-brand-beige/30 bg-brand-cream py-40"
    >
      <div className="container mx-auto px-6">
        <div className="mx-auto mb-28 max-w-4xl text-center">
          <div className="mb-6 overflow-hidden">
            <span className="inline-block text-[10px] font-black uppercase tracking-[0.5em] text-brand-gold italic">
              Architectural Reviews • V2.0
            </span>
          </div>
          <h2
            ref={titleRef}
            className="text-center text-5xl font-bold font-heading leading-[0.9] tracking-tighter text-brand-charcoal opacity-0 italic md:text-7xl"
          >
            The Atelier <span className="text-brand-gold">Dialogue.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="group relative flex flex-col justify-between rounded-[3.5rem] border border-brand-beige/50 bg-white p-14 opacity-0 shadow-2xl shadow-brand-charcoal/5 transition-all duration-700 hover:border-brand-gold"
            >
              <div className="relative mb-14">
                <div className="mb-10 text-brand-gold/10 transition-colors duration-500 group-hover:text-brand-gold/20">
                  <svg width="40" height="30" viewBox="0 0 40 30" fill="currentColor">
                    <path d="M0 30V15.3846C0 10.3846 1.15385 6.46154 3.46154 3.61538C5.84615 0.769231 9.38462 -0.384615 14.0769 0.153846V6.92308C11.3077 6.92308 9.46154 7.69231 8.53846 9.23077C7.61538 10.6923 7.15385 12.3846 7.15385 14.3077H14.0769V30H0ZM25.9231 30V15.3846C25.9231 10.3846 27.0769 6.46154 29.3846 3.61538C31.7692 0.769231 35.3077 -0.384615 40 0.153846V6.92308C37.2308 6.92308 35.3846 7.69231 34.4615 9.23077C33.5385 10.6923 33.0769 12.3846 33.0769 14.3077H40V30H25.9231Z" />
                  </svg>
                </div>

                <p className="text-xl font-medium leading-relaxed text-brand-taupe opacity-90 transition-colors duration-500 group-hover:text-brand-charcoal italic">
                  "{t.text}"
                </p>
              </div>

              <div className="flex items-center gap-6 border-t border-brand-beige/30 pt-10">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-charcoal text-2xl font-bold text-brand-gold shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-xl font-bold tracking-tighter text-brand-charcoal italic">
                    {t.name}
                  </p>
                  <p className="mt-1 text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold italic">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}