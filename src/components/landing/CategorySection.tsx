'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Link from 'next/link';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const categories = [
  { id: 'floor', title: 'Floor Tiles', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop' },
  { id: 'wall', title: 'Wall Tiles', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600&auto=format&fit=crop' },
  { id: 'outdoor', title: 'Outdoor', image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=600&auto=format&fit=crop' },
  { id: 'decor', title: 'Decor & Accents', image: 'https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?q=80&w=600&auto=format&fit=crop' },
];

export function CategorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">Shop by Category</h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              Find the perfect foundation for your next project, curated by space and style.
            </p>
          </div>
          <Link href="/categories" className="text-primary font-medium hover:underline pb-1">
            View All Categories &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.id}`}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="group relative h-96 overflow-hidden rounded-2xl flex items-end p-6"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${cat.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="relative z-10 w-full transform transition-transform duration-500 group-hover:translate-y-0">
                <h3 className="text-2xl font-bold text-white mb-2">{cat.title}</h3>
                <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-md rounded-md text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Explore
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
