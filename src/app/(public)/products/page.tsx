'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { apiClient, Product } from '@/lib/api-client';
import { toast } from 'react-hot-toast';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    search: '',
    sort: 'newest',
  });

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchInitialData = async () => {
    try {
      const catRes = await apiClient.categories.getAll();
      if (catRes.success) setCategories(catRes.data?.categories || []);
    } catch (error) {
      console.error('Failed to fetch categories', error);
    }
  };

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await apiClient.products.getAll({
        category: filters.category,
        search: filters.search,
        sort: filters.sort,
      });
      if (res.success) {
        setProducts(res.data?.products || []);
      }
    } catch (error) {
      toast.error('Failed to load architectural catalog.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleWishlist = async (productId: string) => {
    try {
      const res = await apiClient.users.toggleWishlist(productId);
      if (res.success) {
        toast.success(res.message || 'Gallery item saved.');
      }
    } catch (error) {
      toast.error('Sign in to curate your collection.');
    }
  };

  return (
    <div className="container mx-auto px-6 py-20 min-h-screen bg-brand-cream">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <div className="mb-4 overflow-hidden">
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.5em] text-brand-gold italic">Catalog</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold font-heading mb-4 tracking-tight text-brand-charcoal italic">Design <span className="text-brand-gold">Gallery</span></h1>
          <p className="text-brand-taupe text-lg max-w-xl font-light italic opacity-80">Browse our curated collection of architectural tiles, from classic marble to modern textures.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <select 
            className="border border-brand-beige rounded-2xl px-6 py-4 text-[10px] font-bold uppercase tracking-widest bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-brand-gold outline-none transition-all cursor-pointer text-brand-charcoal"
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.slug}>{cat.name}</option>
            ))}
          </select>
          <select 
            className="border border-brand-beige rounded-2xl px-6 py-4 text-[10px] font-bold uppercase tracking-widest bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-brand-gold outline-none transition-all cursor-pointer text-brand-charcoal"
            value={filters.sort}
            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
          >
            <option value="newest">Newest First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-[280px_1fr] gap-16">
        {/* Simple Sidebar Filters */}
        <aside className="space-y-12 flex-shrink-0">
          <div className="relative">
             <input 
              type="text" 
              placeholder="Search catalog..." 
              className="w-full bg-white/50 border border-brand-beige rounded-2xl px-6 py-4 text-xs font-bold uppercase tracking-widest focus:ring-2 focus:ring-brand-gold outline-none text-brand-charcoal placeholder:text-brand-taupe/40"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
             />
          </div>

          <div>
            <h3 className="text-[10px] font-bold mb-8 tracking-[0.3em] uppercase text-brand-gold italic">Refine by Finish</h3>
            <div className="space-y-5">
              {['Glossy', 'Matte', 'Rustic', 'Satin'].map((label) => (
                <label key={label} className="flex items-center gap-4 text-xs cursor-pointer group">
                  <input type="checkbox" className="w-5 h-5 rounded-lg border-brand-beige text-brand-gold focus:ring-brand-gold transition-all cursor-pointer accent-brand-gold" />
                  <span className="text-brand-taupe group-hover:text-brand-charcoal transition-colors font-bold uppercase tracking-widest italic">{label}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="p-8 bg-brand-charcoal rounded-[2.5rem] border border-brand-gold/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-brand-gold/10 transition-colors" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-gold italic block mb-4">Visualizer</span>
            <h4 className="text-brand-cream font-bold text-xl tracking-tighter italic mb-6">Preview in your space.</h4>
            <Button size="sm" className="w-full rounded-xl bg-brand-gold text-brand-charcoal hover:bg-white text-[10px] font-black tracking-[0.2em] uppercase" asChild>
              <Link href="/visualizer">Launch Studio</Link>
            </Button>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="min-h-[400px]">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 opacity-50">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-[4/5] bg-white/50 rounded-[2.5rem] animate-pulse border border-brand-beige" />
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
              {products.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`} className="group">
                  <div className="relative overflow-hidden rounded-[2.5rem] bg-white border border-brand-beige hover:border-brand-gold/50 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-gold/5 hover:-translate-y-2">
                    <div className="aspect-[4/5] relative overflow-hidden">
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                        style={{ backgroundImage: `url(${product.images[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400&auto=format&fit=crop'})` }}
                      />
                      <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <Button 
                          size="icon" 
                          variant="outline" 
                          className="h-12 w-12 rounded-2xl shadow-xl bg-white/90 backdrop-blur-md border-transparent text-brand-charcoal hover:text-red-500" 
                          onClick={(e) => { e.preventDefault(); handleToggleWishlist(product.id); }}
                        >
                          ♡
                        </Button>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="text-[10px] text-brand-gold font-bold mb-3 tracking-[0.2em] uppercase italic">{product.category}</div>
                      <h3 className="text-2xl font-bold text-brand-charcoal mb-4 group-hover:text-brand-gold transition-colors tracking-tight leading-tight italic">{product.name}</h3>
                      <div className="flex justify-between items-end border-t border-brand-cream/50 pt-6">
                        <div className="text-2xl font-bold text-brand-charcoal tracking-tighter">${product.price} <span className="text-[10px] text-brand-taupe font-bold uppercase tracking-widest ml-1">/ sq.ft</span></div>
                        <span className="text-brand-gold font-bold text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity italic">Details ↗</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-20 border-2 border-dashed border-brand-beige rounded-[3.5rem] bg-white/30 backdrop-blur-sm">
               <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-gold italic mb-8">No results found</span>
               <h3 className="text-4xl font-bold font-heading text-brand-charcoal tracking-tighter italic mb-4">Empty <span className="text-brand-gold">Collection.</span></h3>
               <p className="text-brand-taupe max-w-sm italic">Adjust your search or category filters to discover our architectural elements.</p>
               <Button variant="outline" className="mt-10 rounded-full px-10 border-brand-beige text-[10px] font-bold uppercase tracking-widest" onClick={() => setFilters({ category: '', search: '', sort: 'newest' })}>Clear Protocol</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
