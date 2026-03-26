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
    <div className="container mx-auto px-4 py-8 h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/visualizer" className="text-sm text-muted-foreground hover:text-foreground">
          &larr; Back
        </Link>
        <h1 className="text-2xl font-bold font-heading px-4 border-l border-border">Upload Room Visualizer</h1>
      </div>

      <div className="flex-1 flex gap-8">
        {/* Workspace Area */}
        <div className="flex-1 bg-zinc-100 dark:bg-zinc-900 border border-border rounded-xl flex items-center justify-center relative overflow-hidden">
          {!photoUploaded ? (
            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 text-primary rounded-full flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload a Photo</h3>
              <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                For best results, take a clear photo of your room well-lit, showing as much of the floor or wall as possible.
              </p>
              <label className="cursor-pointer bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition">
                <span>Select Image</span>
                <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
              </label>
            </div>
          ) : (
             <div className="absolute inset-0 flex flex-col">
               <div className="flex-1 bg-zinc-800 relative">
                 <div className="absolute inset-0 flex items-center justify-center text-zinc-500 font-medium">
                   [Mock Uploaded Photo Display]
                 </div>
                 {/* This is where the Canvas and manual 4-point mapping tools go */}
                 {isMapping && (
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                      <div className="border border-primary bg-primary/20 w-1/2 h-1/2 relative animate-pulse">
                        <span className="absolute -top-6 left-0 text-primary font-bold text-xs bg-background/80 px-2 py-1 rounded">Mapping Surface...</span>
                        <div className="absolute -top-1 -left-1 w-3 h-3 bg-white rounded-full border-2 border-primary"></div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full border-2 border-primary"></div>
                        <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-white rounded-full border-2 border-primary"></div>
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-white rounded-full border-2 border-primary"></div>
                      </div>
                    </div>
                 )}
               </div>
               <div className="h-16 bg-background border-t border-border flex items-center justify-between px-6">
                 <Button variant="outline" onClick={() => setPhotoUploaded(false)}>Start Over</Button>
                 <Button onClick={() => setIsMapping(!isMapping)}>
                   {isMapping ? 'Finish Mapping' : 'Draw Floor Area'}
                 </Button>
               </div>
             </div>
          )}
        </div>

        {/* Tools Sidebar */}
        <aside className="w-80 bg-background border border-border rounded-xl p-6 flex flex-col gap-6 opacity-50 pointer-events-none" style={{ opacity: photoUploaded ? 1 : 0.5, pointerEvents: photoUploaded ? 'auto' : 'none' }}>
          <div>
            <h3 className="font-semibold mb-3">1. Select Pattern</h3>
            <div className="grid grid-cols-2 gap-2">
              <button className="border border-primary bg-primary/10 rounded-md py-2 text-sm font-medium">Grid</button>
              <button className="border border-border bg-background hover:bg-muted rounded-md py-2 text-sm font-medium">Brick</button>
              <button className="border border-border bg-background hover:bg-muted rounded-md py-2 text-sm font-medium">Herringbone</button>
              <button className="border border-border bg-background hover:bg-muted rounded-md py-2 text-sm font-medium">Diagonal</button>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3">2. Choose Tile</h3>
            <div className="space-y-2">
               <select className="w-full border border-input rounded p-2 text-sm">
                 <option>Statuario White Marble</option>
                 <option>Emerald Green</option>
                 <option>Rustic Wood Look</option>
               </select>
            </div>
          </div>
          <div className="mt-auto">
            <Button className="w-full" size="lg" disabled={!isMapping}>Save & Create Booking</Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
