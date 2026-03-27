import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-brand-beige/30 bg-brand-cream pt-32 pb-16 overflow-hidden relative">
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 py-8">
          <div className="md:col-span-5 space-y-10">
            <div className="flex items-center space-x-4 group">
              <div className="w-12 h-12 bg-brand-charcoal rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:bg-brand-gold shadow-2xl shadow-brand-charcoal/20">
                <span className="text-brand-gold group-hover:text-brand-charcoal font-black text-2xl tracking-tighter italic">V</span>
              </div>
              <h3 className="text-3xl font-black font-heading text-brand-charcoal tracking-tighter italic">
                Atelier Tile<span className="text-brand-gold">Vista.</span>
              </h3>
            </div>
            <p className="text-lg text-brand-taupe leading-[1.6] font-medium italic max-w-sm opacity-80">
              Curation at the intersection of architectural heritage and digital innovation. Concept, visualize, and materialize with precision.
            </p>
            <div className="flex gap-8">
               {['Instagram', 'LinkedIn', 'Behance'].map(social => (
                 <a key={social} href="#" className="text-[9px] font-black uppercase tracking-[0.3em] text-brand-charcoal/40 hover:text-brand-gold transition-colors duration-500 italic pb-1 border-b border-transparent hover:border-brand-gold">
                   {social}
                 </a>
               ))}
            </div>
          </div>
          
          <div className="md:col-span-2">
            <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-charcoal mb-10 italic">Archive</h4>
            <ul className="space-y-6 text-[10px] font-black uppercase tracking-[0.3em] text-brand-taupe opacity-70">
              <li><Link href="/products?category=floor" className="hover:text-brand-gold transition-all duration-500 hover:tracking-[0.4em] italic">Floor surfaces</Link></li>
              <li><Link href="/products?category=wall" className="hover:text-brand-gold transition-all duration-500 hover:tracking-[0.4em] italic">Wall textures</Link></li>
              <li><Link href="/products?category=outdoor" className="hover:text-brand-gold transition-all duration-500 hover:tracking-[0.4em] italic">External elements</Link></li>
              <li><Link href="/products?category=decor" className="hover:text-brand-gold transition-all duration-500 hover:tracking-[0.4em] italic">Artisanal detail</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-charcoal mb-10 italic">Studio</h4>
            <ul className="space-y-6 text-[10px] font-black uppercase tracking-[0.3em] text-brand-taupe opacity-70">
              <li><Link href="/visualizer" className="hover:text-brand-gold transition-all duration-500 hover:tracking-[0.4em] italic">Atelier visualizer</Link></li>
              <li><Link href="/book" className="hover:text-brand-gold transition-all duration-500 hover:tracking-[0.4em] italic">Private concierge</Link></li>
              <li><Link href="/contact" className="hover:text-brand-gold transition-all duration-500 hover:tracking-[0.4em] italic">Contact curators</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
             <div className="p-10 bg-brand-charcoal rounded-[2.5rem] shadow-3xl shadow-brand-charcoal/20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-brand-gold opacity-0 group-hover:opacity-5 transition-opacity" />
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-gold mb-6 italic">Protocol Update</h4>
                <p className="text-[11px] text-brand-cream font-medium italic opacity-60 leading-relaxed mb-8">Join our architectural manifest for exclusive material releases.</p>
                <div className="relative">
                   <input 
                    type="email" 
                    placeholder="ENTER EMAIL"
                    className="w-full bg-white/5 border-b border-brand-gold/20 text-[10px] font-black uppercase tracking-[0.2em] text-brand-cream pb-3 outline-none focus:border-brand-gold transition-colors placeholder:text-brand-gold/30"
                   />
                </div>
             </div>
          </div>
        </div>
        
        <div className="mt-32 pt-10 border-t border-brand-beige/30 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="text-[9px] font-black uppercase tracking-[0.5em] text-brand-taupe/40 italic">
             © {new Date().getFullYear()} TILEVISTA ARCHITECTURAL INTELLIGENCE. ALL RIGHTS RESERVED.
           </div>
           <div className="flex gap-10 text-[9px] font-black uppercase tracking-[0.3em] text-brand-taupe/40 italic">
              <Link href="/privacy" className="hover:text-brand-gold transition-colors">Privacy protocol</Link>
              <Link href="/terms" className="hover:text-brand-gold transition-colors">Terms of material</Link>
           </div>
        </div>
      </div>
    </footer>
  );
}
