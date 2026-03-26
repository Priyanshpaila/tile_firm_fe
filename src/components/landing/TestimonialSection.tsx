'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const testimonials = [
  {
    name: 'Sarah Jenkins',
    role: 'Interior Designer',
    text: "The 3D visualizer tool completely changed how I present designs to my clients. The tile quality is exceptional."
  },
  {
    name: 'Michael Chen',
    role: 'Homeowner',
    text: "I was hesitant to buy tiles online until I uploaded a photo of my bathroom. Seeing the marble layout in my own space gave me 100% confidence."
  },
  {
    name: 'Emily R.',
    role: 'Architect',
    text: "Fast delivery, premium finishes, and the booking system for home measurements was incredibly smooth."
  }
];

export function TestimonialSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardsRef.current,
        { y: 40, opacity: 0 },
        { 
          scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
          y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power2.out' 
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 bg-zinc-50 dark:bg-zinc-900 border-t border-border">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 font-heading">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div 
              key={i} 
              ref={(el) => { cardsRef.current[i] = el; }}
              className="bg-background p-8 rounded-2xl shadow-sm border border-border flex flex-col justify-between"
            >
              <div className="mb-6">
                {/* 5 Stars */}
                <div className="flex gap-1 text-primary mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <svg key={j} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-lg italic text-muted-foreground">"{t.text}"</p>
              </div>
              <div>
                <p className="font-bold text-foreground">{t.name}</p>
                <p className="text-sm text-primary">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
