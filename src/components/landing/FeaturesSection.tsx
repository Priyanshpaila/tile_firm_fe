'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { IoDiamondOutline, IoColorPaletteOutline, IoCubeOutline, IoFlashOutline } from 'react-icons/io5';

const features = [
  {
    icon: <IoDiamondOutline className="w-8 h-8 flex-shrink-0" />,
    title: 'Premium Quality',
    description: 'Sourced from the finest global manufacturers, our tiles bear uncompromised quality and durability.'
  },
  {
    icon: <IoCubeOutline className="w-8 h-8 flex-shrink-0" />,
    title: 'Advanced 3D Visualization',
    description: 'Don’t just imagine. See your chosen tiles in realistic 3D room environments before you buy.'
  },
  {
    icon: <IoColorPaletteOutline className="w-8 h-8 flex-shrink-0" />,
    title: 'Endless Varieties',
    description: 'From classic marbles to futuristic metallics, find the perfect match for your unique aesthetic.'
  },
  {
    icon: <IoFlashOutline className="w-8 h-8 flex-shrink-0" />,
    title: 'Instant Booking',
    description: 'Schedule a physical measurement and consultation visit instantly with our expert staff.'
  }
];

export function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(itemsRef.current, 
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-zinc-950 text-zinc-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6 text-primary-400">Why Choose TileVista</h2>
          <p className="text-zinc-400 text-lg">
            We combine high-end materials with cutting-edge technology to provide a seamless tile purchasing experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, i) => (
            <div 
              key={i} 
              ref={(el) => { itemsRef.current[i] = el; }}
              className="flex flex-col items-center text-center p-6 border border-zinc-800 rounded-2xl bg-zinc-900/50 hover:bg-zinc-800 transition-colors"
            >
              <div className="p-4 bg-primary-900/40 text-primary-400 rounded-full mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-zinc-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
