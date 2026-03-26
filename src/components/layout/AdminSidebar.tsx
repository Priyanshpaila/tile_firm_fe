import Link from 'next/link';

export function AdminSidebar() {
  return (
    <aside className="w-64 border-r border-border bg-zinc-950 text-zinc-50 min-h-screen p-4 flex flex-col gap-2">
      <div className="pb-4 border-b border-zinc-800 mb-4 px-3">
        <span className="font-heading font-bold text-xl text-primary-400">TileVista Admin</span>
      </div>
      <nav className="flex flex-col gap-1 text-sm font-medium">
        <Link href="/admin" className="px-3 py-2 rounded-md hover:bg-zinc-800 transition-colors">Dashboard</Link>
        <Link href="/admin/products" className="px-3 py-2 rounded-md hover:bg-zinc-800 transition-colors">Products</Link>
        <Link href="/admin/categories" className="px-3 py-2 rounded-md hover:bg-zinc-800 transition-colors">Categories</Link>
        <Link href="/admin/appointments" className="px-3 py-2 rounded-md hover:bg-zinc-800 transition-colors">Appointments</Link>
        <Link href="/admin/users" className="px-3 py-2 rounded-md hover:bg-zinc-800 transition-colors">Users & Staff</Link>
        <Link href="/admin/settings" className="px-3 py-2 rounded-md hover:bg-zinc-800 transition-colors">Settings</Link>
      </nav>
    </aside>
  );
}
