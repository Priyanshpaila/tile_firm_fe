'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function VisualizerCTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(textRef.current,
        { x: -50, opacity: 0 },
        { 
          scrollTrigger: { trigger: containerRef.current, start: 'top 70%' },
          x: 0, opacity: 1, duration: 1, ease: 'power3.out' 
        }
      );
      
      gsap.fromTo(imageRef.current,
        { x: 50, opacity: 0, scale: 0.95 },
        { 
          scrollTrigger: { trigger: containerRef.current, start: 'top 70%' },
          x: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out', delay: 0.2
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 overflow-hidden bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div ref={textRef} className="flex-1 lg:pr-10">
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              See It Before <br />
              <span className="text-primary">You Build It.</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Take the guesswork out of your renovation. Upload a photo of your room or choose from our 3D presets to visualize how our premium tiles will look in your actual space in real-time.
            </p>
            
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">✓</div>
                <span className="font-medium text-foreground">Upload your own room photos</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">✓</div>
                <span className="font-medium text-foreground">Full 3D orbit and zoom presets</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">✓</div>
                <span className="font-medium text-foreground">Compare multiple patterns instantly</span>
              </li>
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/visualizer/3d">Try 3D Presets</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/visualizer/upload">Upload My Room</Link>
              </Button>
            </div>
          </div>
          
          <div ref={imageRef} className="flex-1 w-full h-[500px] relative rounded-3xl overflow-hidden shadow-2xl border border-border">
            {/* Real implementation will use next/image. Using a placeholder gradient + decorative elements for now */}
            <div className="absolute inset-0 bg-gradient-to-tr from-zinc-200 to-zinc-50 dark:from-zinc-900 dark:to-zinc-800">
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-3/4 h-3/4 border-2 border-primary/30 rounded-xl flex items-center justify-center relative bg-background/50 backdrop-blur-sm shadow-lg overflow-hidden">
                    {/* Mock grid to represent tiles */}
                    <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-1 p-2 opacity-50">
                      {Array.from({ length: 16 }).map((_, i) => (
                        <div key={i} className="bg-primary/20 rounded-sm"></div>
                      ))}
                    </div>
                    <span className="z-10 text-xl font-bold text-foreground bg-background/80 px-4 py-2 rounded-md">Interactive Visualizer Demo</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
