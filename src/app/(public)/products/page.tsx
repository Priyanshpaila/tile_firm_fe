import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

// Mock data
const mockProducts = [
  { id: '1', name: 'Statuario White Marble', category: 'Floor', price: 120, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400&auto=format&fit=crop' },
  { id: '2', name: 'Onyx Blue Glossy', category: 'Wall', price: 95, image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=400&auto=format&fit=crop' },
  { id: '3', name: 'Rustic Terracotta Matte', category: 'Outdoor', price: 65, image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=400&auto=format&fit=crop' },
  { id: '4', name: 'Moroccan Pattern Decor', category: 'Decor', price: 150, image: 'https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?q=80&w=400&auto=format&fit=crop' },
  { id: '5', name: 'Calacatta Gold', category: 'Floor', price: 180, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400&auto=format&fit=crop' },
  { id: '6', name: 'Emerald Green Hexagon', category: 'Wall', price: 85, image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=400&auto=format&fit=crop' },
];

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold font-heading mb-2">Product Catalog</h1>
          <p className="text-muted-foreground">Browse our premium collection of tiles.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <select className="border border-input rounded-md px-3 py-2 text-sm bg-background">
            <option value="">All Categories</option>
            <option value="floor">Floor Tiles</option>
            <option value="wall">Wall Tiles</option>
            <option value="outdoor">Outdoor</option>
            <option value="decor">Decor</option>
          </select>
          <select className="border border-input rounded-md px-3 py-2 text-sm bg-background">
            <option value="newest">Newest First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Simple Sidebar Filters */}
        <aside className="w-full md:w-64 space-y-6 flex-shrink-0">
          <div>
            <h3 className="font-semibold mb-3">Price Range</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="rounded" /> Under $50
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="rounded" /> $50 - $100
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="rounded" /> Over $100
              </label>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Finish</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="rounded" /> Glossy
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="rounded" /> Matte
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="rounded" /> Rustic
              </label>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`} className="group relative">
              <Card className="overflow-hidden border-transparent hover:border-border transition-all h-full bg-zinc-50 dark:bg-zinc-900 border border-border/50 shadow-sm hover:shadow-md">
                <div className="aspect-square bg-muted relative overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${product.image})` }}
                  />
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full shadow-md bg-white text-black hover:bg-zinc-100" onClick={(e) => { e.preventDefault(); /* Add to wishlist */}}>
                      ♡
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="text-xs text-muted-foreground mb-1 font-medium tracking-wider uppercase">{product.category}</div>
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
                  <div className="font-bold text-lg">${product.price} <span className="text-xs text-muted-foreground font-normal">/ sq.ft</span></div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
