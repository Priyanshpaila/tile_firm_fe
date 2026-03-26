'use client';

import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Grid } from '@react-three/drei';
import Link from 'next/link';

function PlaceholderRoom() {
  return (
    <group>
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#ededed" />
      </mesh>
      <mesh position={[0, 1.5, -5]}>
        <boxGeometry args={[10, 4, 0.5]} />
        <meshStandardMaterial color="#d4af37" />
      </mesh>
    </group>
  );
}

export default function ThreeDVisualizerPage() {
  const [selectedTile, setSelectedTile] = useState('calacatta-gold');

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Visualizer Toolbar */}
      <div className="h-16 border-b border-border bg-background flex items-center justify-between px-6 z-10">
        <div className="flex items-center gap-4">
          <Link href="/visualizer" className="text-sm text-muted-foreground hover:text-foreground">
            &larr; Back
          </Link>
          <h1 className="font-semibold px-4 border-l border-border">3D Preset: Modern Bathroom</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">Selected Tile: {selectedTile}</span>
          <select 
            className="text-sm border border-input rounded p-1"
            value={selectedTile}
            onChange={(e) => setSelectedTile(e.target.value)}
          >
            <option value="calacatta-gold">Calacatta Gold</option>
            <option value="emerald-hex">Emerald Hexagon</option>
            <option value="rustic-terra">Rustic Terracotta</option>
          </select>
        </div>
      </div>

      {/* R3F Canvas Area */}
      <div className="flex-1 w-full bg-zinc-100 dark:bg-zinc-950 relative">
        <div className="absolute inset-x-0 bottom-8 max-w-sm mx-auto text-center z-10 bg-background/80 backdrop-blur px-4 py-2 rounded-full shadow-sm text-xs font-medium border border-border">
          Scroll to zoom. Click and drag to orbit.
        </div>
        
        <Suspense fallback={
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            Loading 3D Engine...
          </div>
        }>
          <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
            <PlaceholderRoom />
            <Grid infiniteGrid fadeDistance={20} cellColor="#cccccc" sectionColor="#aaaaaa" />
            <OrbitControls 
              makeDefault
              minPolarAngle={0} 
              maxPolarAngle={Math.PI / 2 + 0.1} // don't go below ground
              minDistance={2}
              maxDistance={10}
            />
            <Environment preset="city" />
          </Canvas>
        </Suspense>
      </div>
    </div>
  );
}
