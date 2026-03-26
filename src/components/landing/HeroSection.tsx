'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Simple fade up animation
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
      );
      
      gsap.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.4 }
      );
      
      gsap.fromTo(
        buttonsRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.6 }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-zinc-50 dark:bg-zinc-950"
    >
      {/* Background with subtle gradient or actual image later */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-100/40 to-transparent dark:from-primary-950/40 z-0"></div>
      
      <div className="container relative z-10 px-4 text-center flex flex-col items-center">
        <h1 
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading mb-6 tracking-tight text-foreground max-w-4xl"
          style={{ opacity: 0 }}
        >
          Premium Tiles for <br/> 
          <span className="text-primary-600 dark:text-primary-400">Modern Spaces</span>
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl"
          style={{ opacity: 0 }}
        >
          Discover, visualize, and bring your vision to life with TileVista's exclusive collection and advanced 3D visualizers.
        </p>
        
        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4" style={{ opacity: 0 }}>
          <Button size="lg" asChild>
            <Link href="/products">Explore Collection</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/visualizer">Open 3D Visualizer</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
