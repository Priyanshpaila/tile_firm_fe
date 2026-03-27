'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function UploadVisualizerPage() {
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [isMapping, setIsMapping] = useState(false);

  // Mock handlers
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPhotoUploaded(true);
    }
  };

  return (
    <div className="container mx-auto px-6 py-20 min-h-screen flex flex-col bg-brand-cream">
      <div className="mb-12 flex items-center gap-8">
        <Link href="/visualizer" className="group text-[10px] font-bold text-brand-taupe hover:text-brand-gold inline-flex items-center gap-3 uppercase tracking-[0.3em] transition-all">
          <span className="text-xl group-hover:-translate-x-2 transition-transform">←</span> Back
        </Link>
        <div className="h-8 w-[1px] bg-brand-beige" />
        <h1 className="text-3xl font-black font-heading tracking-tighter text-brand-charcoal uppercase leading-tight italic">AI Room <span className="text-brand-gold">Transformation</span></h1>
      </div>

      <div className="flex-1 flex flex-col lg:grid lg:grid-cols-[1fr_380px] gap-12">
        {/* Workspace Area */}
        <div className="flex-1 bg-brand-beige/50 border border-brand-beige rounded-[3.5rem] flex items-center justify-center relative overflow-hidden shadow-inner min-h-[500px]">
          {!photoUploaded ? (
            <div className="text-center p-12">
              <div className="w-24 h-24 mx-auto mb-10 bg-brand-gold/10 text-brand-gold rounded-[2.5rem] flex items-center justify-center shadow-xl shadow-brand-gold/5">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>
              </div>
              <h3 className="text-3xl font-bold mb-6 tracking-tight text-brand-charcoal italic">Begin Transformation</h3>
              <p className="text-brand-taupe text-lg mb-12 max-w-sm mx-auto font-light leading-relaxed">
                Upload a clear architectural blue-print or a photo of your space to initiate AI mapping.
              </p>
              <label className="cursor-pointer bg-brand-charcoal text-brand-gold px-12 py-6 rounded-full font-bold shadow-2xl shadow-brand-charcoal/20 hover:bg-black transition-all hover:scale-105 active:scale-95 inline-block uppercase tracking-widest text-[10px]">
                <span>Initiate Upload</span>
                <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
              </label>
            </div>
          ) : (
             <div className="absolute inset-0 flex flex-col">
               <div className="flex-1 bg-brand-charcoal relative">
                 <div className="absolute inset-0 flex items-center justify-center text-brand-gold/20 font-bold uppercase tracking-[0.5em] text-xs italic">
                   [ Processing Architectural Data ]
                 </div>
                 {/* This is where the Canvas and manual 4-point mapping tools go */}
                 {isMapping && (
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                      <div className="border-2 border-brand-gold bg-brand-gold/10 w-2/3 h-2/3 relative shadow-2xl">
                        <span className="absolute -top-12 left-0 text-brand-gold font-bold text-[10px] bg-brand-charcoal border border-brand-gold/20 px-5 py-2.5 rounded-full uppercase tracking-widest shadow-2xl">Defining Boundary Matrix...</span>
                        <div className="absolute -top-2.5 -left-2.5 w-6 h-6 bg-white rounded-full border-4 border-brand-gold shadow-xl"></div>
                        <div className="absolute -top-2.5 -right-2.5 w-6 h-6 bg-white rounded-full border-4 border-brand-gold shadow-xl"></div>
                        <div className="absolute -bottom-2.5 -left-2.5 w-6 h-6 bg-white rounded-full border-4 border-brand-gold shadow-xl"></div>
                        <div className="absolute -bottom-2.5 -right-2.5 w-6 h-6 bg-white rounded-full border-4 border-brand-gold shadow-xl"></div>
                      </div>
                    </div>
                 )}
               </div>
               <div className="h-24 bg-white border-t border-brand-beige flex items-center justify-between px-10">
                                   <Button variant="outline" className="rounded-full px-10 font-bold uppercase tracking-widest text-[10px] border-brand-beige" onClick={() => { setPhotoUploaded(false); setIsMapping(false); }}>Reset Blueprint</Button>

                 <Button className="rounded-full px-12 py-6 font-bold uppercase tracking-widest text-[10px] shadow-xl shadow-brand-charcoal/10" onClick={() => setIsMapping(!isMapping)}>
                   {isMapping ? 'Confirm Geometry' : 'Define Surface Area'}
                 </Button>
               </div>
             </div>
          )}
        </div>

        {/* Tools Sidebar */}
        <aside className="w-full space-y-12" style={{ opacity: photoUploaded ? 1 : 0.4, pointerEvents: photoUploaded ? 'auto' : 'none' }}>
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold mb-8">Spatial Layout Pattern</h3>
            <div className="grid grid-cols-2 gap-5">
              {['Grid', 'Brick', 'Herringbone', 'Diagonal'].map((pattern) => (
                <button key={pattern} className={`border rounded-[1.5rem] py-6 text-[10px] font-bold uppercase tracking-widest transition-all ${pattern === 'Grid' ? 'border-brand-gold bg-brand-gold/10 text-brand-charcoal shadow-xl shadow-brand-gold/5' : 'border-brand-beige bg-white hover:bg-brand-cream text-brand-taupe'}`}>
                  {pattern}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold mb-8">Curated Collection</h3>
            <div className="space-y-4">
               <select className="w-full border border-brand-beige rounded-[1.5rem] px-8 py-6 text-xs font-bold uppercase tracking-widest bg-white focus:ring-2 focus:ring-brand-gold outline-none transition-all appearance-none cursor-pointer text-brand-charcoal">
                 <option>Statuario White Marble</option>
                 <option>Emerald Green Glossy</option>
                 <option>Rustic Wood Textured</option>
               </select>
            </div>
          </div>
          <div className="pt-10">
            <Button 
                className="w-full rounded-[1.5rem] py-8 text-xs font-bold uppercase tracking-[0.2em] shadow-2xl shadow-brand-charcoal/10 transition-all hover:scale-[1.02]" 
                onClick={() => {
                  if (!isMapping) alert('Please define the surface boundary area first.');
                  else alert('AI Visualization Generation Started...');
                }}
            >
              Generate visualization ↗
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
