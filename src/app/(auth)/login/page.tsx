'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { apiClient } from '@/lib/api-client';
import { toast } from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await apiClient.auth.login({ email, password });
      
      if (res.success && res.data?.user) {
        setUser(res.data.user);
        toast.success('Access granted to the Studio.');
        router.push('/dashboard');
      } else {
        throw new Error(res.message || 'Authentication failed');
      }
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || 'Access denied. Please verify credentials.';
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
          <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-transparent to-transparent" />
          
          <div className="relative h-full flex flex-col justify-between z-10">
            <div>
              <Link href="/" className="text-2xl font-black tracking-tighter text-brand-cream italic">
                Tile<span className="text-brand-gold">Vista</span>
              </Link>
            </div>
            
            <div className="space-y-6">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-gold italic">Architectural Excellence</span>
              <h2 className="text-5xl font-bold font-heading text-brand-cream tracking-tighter leading-none italic">
                Curating <br />
                <span className="text-brand-gold">Reality.</span>
              </h2>
              <p className="text-brand-beige/60 text-lg max-w-sm font-light italic">
                Access your private atelier for high-precision architectural visualization and surface curation.
              </p>
            </div>
          </div>
        </div>

        {/* Form Side */}
        <div className="p-8 md:p-12 lg:p-20 flex flex-col justify-center">
          <div className="mb-10">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-gold italic">Member Portal</span>
            <h1 className="text-3xl md:text-4xl font-bold font-heading text-brand-charcoal tracking-tighter italic mt-4">Welcome <span className="text-brand-gold">Back.</span></h1>
            <p className="text-brand-taupe text-[10px] mt-3 font-medium uppercase tracking-[0.2em] italic opacity-60">Secure authentication protocol</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6 md:space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold italic ml-1" htmlFor="email">Identity (Email)</label>
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
              <div className="flex items-center justify-between ml-1">
                <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold italic" htmlFor="password">Security (Password)</label>
                <Link href="/forgot-password" disable-gsap="true" className="text-[10px] font-bold text-brand-taupe hover:text-brand-gold transition-colors uppercase tracking-[0.1em] italic">
                  Recovery?
                </Link>
              </div>
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

            <div className="pt-2 space-y-6 md:space-y-8">
              <Button 
                className="w-full h-14 md:h-16 rounded-2xl text-[10px] font-bold uppercase tracking-[0.4em] shadow-xl shadow-brand-charcoal/10 transition-all hover:-translate-y-1 active:scale-95 flex items-center gap-4" 
                type="submit" 
                disabled={isLoading}
              >
                {isLoading ? <span className="w-4 h-4 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" /> : null}
                {isLoading ? 'Authenticating...' : 'Access Studio ↗'}
              </Button>
              
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-center text-brand-taupe italic">
                New curator?{' '}
                <Link href="/register" disable-gsap="true" className="text-brand-gold hover:text-brand-charcoal transition-colors border-b border-brand-gold/30 pb-0.5">
                  Apply for Access
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

