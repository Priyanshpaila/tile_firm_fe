"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { IoPersonOutline, IoLogOutOutline } from 'react-icons/io5';

export function Header() {
  const pathname = usePathname();
  const { user, logout, isAuthenticated } = useAuthStore();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-500 border-b",
      isScrolled 
        ? "h-16 bg-brand-cream/90 backdrop-blur-xl border-brand-beige/40 shadow-xl shadow-brand-charcoal/5" 
        : "h-24 bg-transparent border-transparent"
    )}>
      <div className="container mx-auto h-full flex items-center justify-between px-6">
        <Link href="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity group">
          <div className="w-10 h-10 bg-brand-charcoal rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-2xl shadow-brand-charcoal/20 group-hover:bg-brand-gold">
            <span className="text-brand-gold group-hover:text-brand-charcoal font-black text-xl tracking-tighter italic transition-colors">V</span>
          </div>
          <span className="text-2xl font-bold font-heading tracking-tighter text-brand-charcoal italic">
            Atelier Tile<span className="text-brand-gold relative">Vista<div className="absolute -bottom-1 left-0 w-full h-[1px] bg-brand-gold/30" /></span>
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-12 text-[10px] font-black uppercase tracking-[0.4em] text-brand-charcoal/60">
          {[
            { label: 'Archive', href: '/products' },
            { label: 'Studio', href: '/visualizer' },
            { label: 'Concierge', href: '/book' },
          ].map((item) => (
            <Link 
              key={item.href}
              href={item.href} 
              className={cn(
                "hover:text-brand-gold transition-colors relative group py-2",
                pathname === item.href && "text-brand-gold"
              )}
            >
              {item.label}
              <span className={cn(
                "absolute bottom-0 left-0 w-0 h-[1.5px] bg-brand-gold transition-all duration-500 group-hover:w-full",
                pathname === item.href && "w-full"
              )} />
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center space-x-8">
          {isAuthenticated ? (
            <div className="flex items-center space-x-6">
              <Link 
                href="/dashboard" 
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-brand-charcoal hover:text-brand-gold transition-colors italic px-6 py-2 border border-brand-beige/50 rounded-full hover:border-brand-gold"
              >
                <IoPersonOutline className="text-lg" />
                Atelier Hub
              </Link>
              <button 
                onClick={logout}
                className="text-brand-charcoal/40 hover:text-brand-gold transition-colors"
                title="Logout"
              >
                <IoLogOutOutline className="text-2xl" />
              </button>
            </div>
          ) : (
            <>
              <Link href="/login" className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-charcoal/40 hover:text-brand-gold transition-colors italic">Login</Link>
              <Button size="sm" className="rounded-full px-10 py-5 text-[9px] font-black uppercase tracking-[0.3em] bg-brand-charcoal hover:bg-brand-gold transition-colors shadow-2xl shadow-brand-charcoal/10" asChild>
                <Link href="/register">Join Atelier</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
