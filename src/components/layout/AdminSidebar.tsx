import Link from 'next/link';

export function AdminSidebar() {
  return (
    <aside className="w-64 border-r border-brand-gold/20 bg-brand-charcoal text-brand-cream min-h-screen p-6 flex flex-col gap-6 shadow-2xl">
      <div className="pb-6 border-b border-brand-gold/20 mb-4 px-3">
        <span className="font-black text-xl text-brand-gold tracking-tighter uppercase italic">Atelier.Admin</span>
      </div>
      <nav className="flex flex-col gap-3 text-[10px] font-black uppercase tracking-[0.3em]">
        <Link href="/admin" className="px-5 py-4 rounded-xl hover:bg-brand-gold hover:text-brand-charcoal transition-all duration-300 italic">Analytical Overview</Link>
        <Link href="/admin/products" className="px-5 py-4 rounded-xl hover:bg-brand-gold hover:text-brand-charcoal transition-all duration-300 italic">Inventory Curation</Link>
        <Link href="/admin/categories" className="px-5 py-4 rounded-xl hover:bg-brand-gold hover:text-brand-charcoal transition-all duration-300 italic">Architectural Tags</Link>
        <Link href="/admin/appointments" className="px-5 py-4 rounded-xl hover:bg-brand-gold hover:text-brand-charcoal transition-all duration-300 italic">Protocol Log</Link>
        <Link href="/admin/users" className="px-5 py-4 rounded-xl hover:bg-brand-gold hover:text-brand-charcoal transition-all duration-300 italic">Member Access</Link>
        <Link href="/admin/settings" className="px-5 py-4 rounded-xl hover:bg-brand-gold hover:text-brand-charcoal transition-all duration-300 italic">Studio System</Link>
      </nav>
    </aside>
  );
}
