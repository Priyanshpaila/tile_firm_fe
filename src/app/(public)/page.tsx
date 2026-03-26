import { HeroSection } from '@/components/landing/HeroSection';
import { CategorySection } from '@/components/landing/CategorySection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { VisualizerCTASection } from '@/components/landing/VisualizerCTASection';
import { TestimonialSection } from '@/components/landing/TestimonialSection';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <CategorySection />
      <FeaturesSection />
      <VisualizerCTASection />
      <TestimonialSection />
    </div>
  );
}

