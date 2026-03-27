'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { apiClient, Product } from '@/lib/api-client';
import { toast } from 'react-hot-toast';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [params.id]);

  const fetchProduct = async () => {
    setIsLoading(true);
    try {
      const res = await apiClient.products.getOne(params.id);
      if (res.success) {
        setProduct(res.data?.product || null);
      }
    } catch (error) {
      toast.error('Failed to retrieve architectural specimen.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleWishlist = async () => {
    if (!product) return;
    try {
      const res = await apiClient.users.toggleWishlist(product.id);
      if (res.success) {
        toast.success(res.message || 'Gallery item saved.');
      }
    } catch (error) {
      toast.error('Sign in to curate your collection.');
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-40 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-8">
           <div className="w-16 h-16 border-4 border-brand-gold border-t-transparent rounded-full animate-spin" />
           <p className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-gold animate-pulse">Materializing Specimen...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-6 py-40 min-h-screen text-center">
        <h1 className="text-4xl font-bold font-heading text-brand-charcoal italic mb-8">Specimen Not Found.</h1>
        <Button asChild rounded-full px-10>
          <Link href="/products">Return to Archive</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-20 min-h-screen bg-brand-cream">
      <div className="mb-16">
        <Link href="/products" className="group text-[10px] font-black text-brand-taupe hover:text-brand-gold inline-flex items-center gap-4 uppercase tracking-[0.3em] transition-all italic">
          <span className="text-2xl group-hover:-translate-x-2 transition-transform">←</span> Archive Collections
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
        {/* Image Gallery */}
        <div className="space-y-10">
          <div className="aspect-square bg-white rounded-[3.5rem] overflow-hidden border border-brand-beige shadow-3xl shadow-brand-charcoal/5 relative group">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] group-hover:scale-110"
              style={{ backgroundImage: `url(${product.images[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop'})` }}
            />
            <div className="absolute inset-0 bg-brand-charcoal/5 group-hover:bg-transparent transition-colors duration-1000" />
          </div>
          <div className="grid grid-cols-4 gap-6">
            {product.images.map((img, i) => (
              <div key={i} className="aspect-square bg-white rounded-[2rem] border border-brand-beige overflow-hidden cursor-pointer hover:border-brand-gold transition-all hover:scale-105 shadow-xl shadow-brand-charcoal/5">
                 <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${img})` }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-center">
          <div className="mb-8 overflow-hidden">
            <span className="hero-particle inline-block text-[10px] font-black uppercase tracking-[0.5em] text-brand-gold italic">Architectural Specimen • {product.category}</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-bold font-heading mb-10 text-brand-charcoal tracking-tighter leading-[0.85] italic">{product.name}</h1>
          <div className="text-4xl md:text-6xl font-black mb-14 text-brand-charcoal tracking-tighter italic border-l-4 border-brand-gold pl-8">${product.price} <span className="text-xs text-brand-taupe font-bold uppercase tracking-widest ml-4">/ per sq.ft</span></div>
          
          <p className="text-2xl text-brand-taupe mb-16 leading-relaxed font-light italic opacity-80 max-w-xl">
            "{product.description}"
          </p>

          <div className="flex flex-col sm:flex-row gap-8 mb-20 pb-16 border-b border-brand-beige/50">
            <Button size="lg" className="flex-[2] rounded-full py-10 text-[10px] font-black uppercase tracking-[0.4em] shadow-3xl shadow-brand-charcoal/20 bg-brand-charcoal hover:bg-brand-gold transition-all" asChild>
              <Link href="/book">Initiate Assessment ↗</Link>
            </Button>
            <Button size="lg" variant="outline" className="flex-1 rounded-full py-10 text-[10px] font-black uppercase tracking-[0.4em] border-brand-beige hover:border-brand-gold transition-all" asChild>
              <Link href={`/visualizer/3d?tile=${product.id}`}>Launch Studio</Link>
            </Button>
            <Button 
              size="icon" 
              variant="ghost" 
              className="w-20 h-20 flex-shrink-0 rounded-full border border-brand-beige hover:bg-brand-beige group transition-all"
              onClick={handleToggleWishlist}
            >
              <span className="text-2xl transition-colors group-hover:text-red-500">♡</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h3 className="font-black text-[10px] uppercase tracking-[0.4em] text-brand-gold mb-10 italic">Technical Protocol</h3>
              <dl className="space-y-8 text-[11px] font-bold uppercase tracking-widest text-brand-taupe">
                {[
                  { label: 'Dimension', value: 'Custom Cut' },
                  { label: 'Surface', value: 'Refined' },
                  { label: 'Origin', value: 'Atelier Source' }
                ].map((spec) => (
                  <div key={spec.label} className="flex justify-between border-b border-brand-beige/30 pb-4">
                    <dt className="opacity-60 italic">{spec.label}</dt>
                    <dd className="text-brand-charcoal">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h3 className="font-black text-[10px] uppercase tracking-[0.4em] text-brand-gold mb-10 italic">Curated Attributes</h3>
              <ul className="grid grid-cols-1 gap-6">
                {['Environmental Mapping', 'High-Fidelity Texture', 'Sustainably Sourced'].map((attr, i) => (
                  <li key={i} className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.3em] text-brand-charcoal italic">
                    <span className="flex-shrink-0 w-10 h-10 rounded-2xl bg-brand-gold/10 text-brand-gold flex items-center justify-center text-xs shadow-xl shadow-brand-gold/5">✓</span> 
                    {attr}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
