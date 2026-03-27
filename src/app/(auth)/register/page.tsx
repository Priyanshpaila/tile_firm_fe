'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { apiClient } from '@/lib/api-client';
import { toast } from 'react-hot-toast';

export default function RegisterPage() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await apiClient.auth.register({ name, email, password });
      
      if (res.success && res.data?.user) {
        setUser(res.data.user);
        toast.success('Curator status granted. Welcome to the Studio.');
        router.push('/dashboard');
      } else {
        throw new Error(res.message || 'Registration failed');
      }
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || 'Application denied. Please try again.';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-brand-cream p-4 md:p-8">
      <div className="w-full max-w-md lg:max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[2rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl shadow-brand-charcoal/5 border border-brand-beige">
        {/* Visual Side - Visible only on LG upward */}
        <div className="hidden lg:block relative bg-brand-charcoal overflow-hidden p-16">
          <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-transparent to-transparent" />
          
          <div className="relative h-full flex flex-col justify-between z-10">
            <div>
              <Link href="/" className="text-2xl font-black tracking-tighter text-brand-cream italic">
                Tile<span className="text-brand-gold">Vista</span>
              </Link>
            </div>
            
            <div className="space-y-6">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-gold italic">Exclusive Membership</span>
              <h2 className="text-5xl font-bold font-heading text-brand-cream tracking-tighter leading-none italic">
                Join the <br />
                <span className="text-brand-gold">Atelier.</span>
              </h2>
              <p className="text-brand-beige/60 text-lg max-w-sm font-light italic">
                Apply for curator access to unlock the full potential of architectural surface visualization.
              </p>
            </div>
          </div>
        </div>

        {/* Form Side */}
        <div className="p-8 md:p-12 lg:p-20 flex flex-col justify-center">
          <div className="mb-10">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-gold italic">Admission</span>
            <h1 className="text-3xl md:text-4xl font-bold font-heading text-brand-charcoal tracking-tighter italic mt-4">Create <span className="text-brand-gold">Identity.</span></h1>
            <p className="text-brand-taupe text-[10px] mt-3 font-medium uppercase tracking-[0.2em] italic opacity-60">Architectural Curator Application</p>
          </div>
          
          <form onSubmit={handleRegister} className="space-y-5 md:space-y-6">
            <div className="grid grid-cols-1 gap-5">
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold italic ml-1" htmlFor="name">Full Name</label>
                <Input 
                  id="name" 
                  type="text" 
                  placeholder="Lexington Vance" 
                  className="rounded-2xl border-brand-beige bg-brand-cream/30 focus:ring-brand-gold h-14 md:h-16 p-5 md:p-6 text-brand-charcoal font-medium placeholder:text-brand-taupe/40"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required 
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold italic ml-1" htmlFor="email">Email Address</label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="curator@tilevista.studio" 
                  className="rounded-2xl border-brand-beige bg-brand-cream/30 focus:ring-brand-gold h-14 md:h-16 p-5 md:p-6 text-brand-charcoal font-medium placeholder:text-brand-taupe/40"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
              
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold italic ml-1" htmlFor="password">Security Protocol (Password)</label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••"
                  className="rounded-2xl border-brand-beige bg-brand-cream/30 focus:ring-brand-gold h-14 md:h-16 p-5 md:p-6 text-brand-charcoal font-medium placeholder:text-brand-taupe/40"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="pt-4 space-y-6 md:space-y-8">
              <Button 
                className="w-full h-14 md:h-16 rounded-2xl text-[10px] font-bold uppercase tracking-[0.4em] shadow-xl shadow-brand-charcoal/10 transition-all hover:-translate-y-1 active:scale-95 flex items-center gap-4" 
                type="submit" 
                disabled={isLoading}
              >
                {isLoading ? <span className="w-4 h-4 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" /> : null}
                {isLoading ? 'Processing...' : 'Submit Application ↗'}
              </Button>
              
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-center text-brand-taupe italic">
                Already curating?{' '}
                <Link href="/login" disable-gsap="true" className="text-brand-gold hover:text-brand-charcoal transition-colors border-b border-brand-gold/30 pb-0.5">
                  Sign In
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
