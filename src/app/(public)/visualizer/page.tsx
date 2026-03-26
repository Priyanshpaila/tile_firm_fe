import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function VisualizerHubPage() {
  return (
    <div className="container mx-auto px-4 py-16 min-h-[calc(100vh-16rem)] flex flex-col items-center justify-center">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">Choose Your Visualization Experience</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Experience TileVista's premium collection in realistic environments before making your choice.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        <div className="bg-zinc-50 dark:bg-zinc-900 border border-border p-8 rounded-2xl flex flex-col relative overflow-hidden group hover:border-primary transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <h2 className="text-2xl font-bold mb-3 relative z-10">3D Room Presets</h2>
          <p className="text-muted-foreground mb-8 relative z-10 flex-1">
            Browse our curated 3D room scenes (kitchens, bathrooms, outdoors). Orbit around the space and apply different tiles in real-time.
          </p>
          <Button size="lg" className="w-full relative z-10" asChild>
            <Link href="/visualizer/3d">Launch 3D Visualizer</Link>
          </Button>
        </div>

        <div className="bg-zinc-50 dark:bg-zinc-900 border border-border p-8 rounded-2xl flex flex-col relative overflow-hidden group hover:border-primary transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm3 4h6v2H9v-2z"/></svg>
          </div>
          <h2 className="text-2xl font-bold mb-3 relative z-10">Upload Your Room</h2>
          <p className="text-muted-foreground mb-8 relative z-10 flex-1">
            Snap a photo of your own space. Use our manual mapping tool to define your floor or walls, and instantly see how our tiles transform your home.
          </p>
          <Button size="lg" variant="outline" className="w-full relative z-10" asChild>
            <Link href="/visualizer/upload">Open Upload Tool</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
