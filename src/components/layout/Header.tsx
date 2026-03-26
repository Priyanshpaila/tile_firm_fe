import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold font-heading text-primary">TileVista</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/products" className="transition-colors hover:text-primary">Products</Link>
          <Link href="/visualizer" className="transition-colors hover:text-primary">Visualizer</Link>
          <Link href="/book" className="transition-colors hover:text-primary">Book Visit</Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Link href="/login" className="text-sm font-medium hover:text-primary">Login</Link>
          <Link href="/register" className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700 transition-colors">Sign Up</Link>
        </div>
      </div>
    </header>
  );
}
