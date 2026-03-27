import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function VisualizerHubPage() {
  return (
    <div className="container mx-auto px-6 py-32 min-h-screen flex flex-col items-center justify-center bg-brand-cream">
      <div className="text-center mb-24 max-w-4xl">
        <div className="mb-6 overflow-hidden">
          <span className="inline-block text-[10px] font-bold uppercase tracking-[0.5em] text-brand-gold italic">Studio Hub</span>
        </div>
        <h1 className="text-5xl md:text-8xl font-bold font-heading mb-8 tracking-tighter text-brand-charcoal leading-[0.95]">
          The <span className="text-brand-gold italic">Visualizer</span> Studio.
        </h1>
        <p className="text-xl text-brand-taupe font-light leading-relaxed max-w-2xl mx-auto italic">
          Experience architectural excellence. Choose your visualization path to bring TileVista's collections into reality.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl w-full px-4">
        {/* 3D Visualizer Card */}
        <div className="group relative bg-white border border-brand-beige p-12 rounded-[3.5rem] flex flex-col overflow-hidden hover:border-brand-gold/30 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-gold/5 hover:-translate-y-3">
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-brand-gold/5 rounded-full blur-3xl group-hover:bg-brand-gold/10 transition-colors" />
          <div className="w-16 h-16 bg-brand-cream rounded-2xl flex items-center justify-center mb-10 text-brand-gold shadow-sm">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>
          </div>
          <h2 className="text-3xl font-bold mb-6 tracking-tight text-brand-charcoal">3D Room Presets</h2>
          <p className="text-brand-taupe text-lg mb-12 flex-1 leading-relaxed">
            Navigate through photorealistic 3D spaces. Switch collections in real-time and observe material textures under architectural lighting.
          </p>
          <Button size="lg" className="rounded-2xl py-8 text-sm font-bold uppercase tracking-widest shadow-xl shadow-brand-charcoal/10" asChild>
            <Link href="/visualizer/3d">Launch Experience</Link>
          </Button>
        </div>

        {/* Upload Visualizer Card */}
        <div className="group relative bg-white border border-brand-beige p-12 rounded-[3.5rem] flex flex-col overflow-hidden hover:border-brand-gold/30 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-gold/5 hover:-translate-y-3">
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-brand-gold/5 rounded-full blur-3xl group-hover:bg-brand-gold/10 transition-colors" />
          <div className="w-16 h-16 bg-brand-cream rounded-2xl flex items-center justify-center mb-10 text-brand-gold shadow-sm">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
          </div>
          <h2 className="text-3xl font-bold mb-6 tracking-tight text-brand-charcoal">Design My Space</h2>
          <p className="text-brand-taupe text-lg mb-12 flex-1 leading-relaxed">
            Upload your architectural blueprints or room photos. Our AI mapping engine integrates chosen surfaces into your existing geometry.
          </p>
          <Button size="lg" variant="outline" className="rounded-2xl py-8 text-sm font-bold uppercase tracking-widest border-brand-beige" asChild>
            <Link href="/visualizer/upload">Open Studio</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
