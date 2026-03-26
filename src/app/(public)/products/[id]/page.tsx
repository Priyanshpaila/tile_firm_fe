import Link from 'next/link';
import { Button } from '@/components/ui/Button';

// Mock product
const product = { 
  id: '1', 
  name: 'Statuario White Marble', 
  category: 'Floor', 
  price: 120, 
  description: 'A classic Italian marble look featuring crisp white backgrounds and striking grey veining. Perfect for creating a luxurious and timeless space.',
  features: ['Stain Resistant', 'High Durability', 'Easy to Clean', 'Large Format'],
  specifications: {
    size: '600x1200mm',
    thickness: '9mm',
    finish: 'Glossy',
    material: 'Porcelain',
    origin: 'Spain'
  },
  images: [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop'
  ]
};

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <Link href="/products" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-2">
          &larr; Back to Catalog
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square bg-muted rounded-2xl overflow-hidden border border-border">
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${product.images[0]})` }}
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, i) => (
              <div key={i} className="aspect-square bg-muted rounded-lg border border-border overflow-hidden cursor-pointer hover:border-primary transition-colors">
                 <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${img})` }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <div className="mb-2 text-sm font-bold tracking-widest text-primary uppercase">{product.category}</div>
          <h1 className="text-4xl font-bold font-heading mb-4 text-foreground">{product.name}</h1>
          <div className="text-3xl font-bold mb-6">${product.price} <span className="text-base text-muted-foreground font-normal">/ sq.ft</span></div>
          
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10 pb-10 border-b border-border">
            <Button size="lg" className="flex-1">Add to Bookings Request</Button>
            <Button size="lg" variant="outline" className="flex-1">
              Test in 3D Visualizer
            </Button>
            <Button size="icon" variant="outline" className="w-12 h-12 flex-shrink-0">
              ♡
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-4">Specifications</h3>
              <dl className="space-y-3 text-sm">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b border-border/50 pb-2">
                    <dt className="text-muted-foreground capitalize">{key}</dt>
                    <dd className="font-medium text-foreground">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Key Features</h3>
              <ul className="space-y-3 text-sm">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-primary font-bold">✓</span> {feature}
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
