'use client';

import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Grid } from '@react-three/drei';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

function RoomEnvironment() {
  return (
    <group>
      {/* Floor */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.05} />
      </mesh>
      
      {/* Back Wall */}
      <mesh position={[0, 2, -5]} receiveShadow>
        <boxGeometry args={[10, 4, 0.2]} />
        <meshStandardMaterial color="#f4f4f5" />
      </mesh>
      
      {/* Left Wall */}
      <mesh position={[-5, 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[10, 4, 0.2]} />
        <meshStandardMaterial color="#e4e4e7" />
      </mesh>
      
      {/* Decorative Pillar */}
      <mesh position={[4, 2, -4]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 4, 0.5]} />
        <meshStandardMaterial color="#18181b" />
      </mesh>
    </group>
  );
}

export default function ThreeDVisualizerPage() {
  const [selectedTile, setSelectedTile] = useState('calacatta-gold');

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] bg-brand-cream">
      {/* Visualizer Toolbar */}
      <div className="h-20 border-b border-brand-beige bg-white/80 backdrop-blur-md flex items-center justify-between px-10 z-10 shadow-sm">
        <div className="flex items-center gap-6">
          <Link href="/visualizer" className="group flex items-center gap-3 text-[10px] font-bold text-brand-taupe hover:text-brand-gold uppercase tracking-[0.3em] transition-colors">
            <span className="text-xl group-hover:-translate-x-2 transition-transform">←</span> Exit Studio
          </Link>
          <div className="h-8 w-[1px] bg-brand-beige/50" />
          <h1 className="font-bold font-heading text-lg text-brand-charcoal tracking-tight italic">Architectural <span className="text-brand-gold">Studio</span> — v4.0</h1>
        </div>
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-5">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">Material context</span>
            <select 
              className="text-xs font-bold uppercase tracking-widest bg-brand-cream text-brand-charcoal border border-brand-beige rounded-full px-8 py-3 focus:ring-2 focus:ring-brand-gold outline-none cursor-pointer hover:bg-white transition-all appearance-none"
              value={selectedTile}
              onChange={(e) => setSelectedTile(e.target.value)}
            >
              <option value="calacatta-gold">Statuario White (Glossy)</option>
              <option value="emerald-hex">Emerald Hexagon (Matte)</option>
              <option value="rustic-terra">Rustic Terracotta (Textured)</option>
            </select>
          </div>
          <Button size="sm" className="rounded-full px-10 py-5 text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl shadow-brand-charcoal/10">Finalize Design</Button>
        </div>
      </div>

      {/* R3F Canvas Area */}
      <div className="flex-1 w-full relative overflow-hidden bg-brand-cream">
        <div className="absolute top-10 left-10 z-10 flex flex-col gap-4">
            <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl border border-brand-beige text-[10px] font-bold text-brand-gold uppercase tracking-[0.4em] flex items-center gap-4 shadow-2xl">
              <span className="w-2.5 h-2.5 bg-brand-gold rounded-full animate-ping" />
              Engine: Active Path Tracing
            </div>
        </div>
        
        <div className="absolute inset-x-0 bottom-12 max-w-md mx-auto text-center z-10">
          <div className="bg-brand-charcoal px-8 py-4 rounded-full shadow-2xl text-[10px] font-bold text-brand-gold uppercase tracking-[0.3em] border border-brand-gold/20 inline-block">
             Orbit: Mouse Left • Pan: Mouse Right • Zoom: Scroll
          </div>
        </div>
        
        <Suspense fallback={
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background z-50">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
            <div className="text-sm font-medium animate-pulse">Initializing Engine...</div>
          </div>
        }>
          <Canvas 
            shadows 
            camera={{ position: [4, 4, 8], fov: 45 }}
            gl={{ antialias: true, stencil: false, depth: true }}
          >
            <fog attach="fog" args={['#18181b', 10, 25]} />
            <ambientLight intensity={0.4} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            
            <RoomEnvironment />
            
            <Grid 
              infiniteGrid 
              fadeDistance={30} 
              cellColor="#333333" 
              sectionColor="var(--brand-gold)" 
              cellSize={1} 
              sectionSize={5}
              position={[0, -0.01, 0]}
            />
            
            <OrbitControls 
              makeDefault
              minPolarAngle={Math.PI / 6} 
              maxPolarAngle={Math.PI / 2} 
              minDistance={3}
              maxDistance={15}
              enableDamping
              dampingFactor={0.05}
            />
            <Environment preset="apartment" />
          </Canvas>
        </Suspense>
      </div>
    </div>
  );
}

