import Link from 'next/link';

export function Sidebar() {
  return (
    <aside className="w-64 border-r border-border bg-background min-h-[calc(100vh-4rem)] p-4 flex flex-col gap-2">
      <nav className="flex flex-col gap-1">
        <Link href="/dashboard" className="px-3 py-2 rounded-md hover:bg-muted font-medium text-sm transition-colors">Overview</Link>
        <Link href="/dashboard/appointments" className="px-3 py-2 rounded-md hover:bg-muted font-medium text-sm transition-colors">Appointments</Link>
        <Link href="/dashboard/wishlist" className="px-3 py-2 rounded-md hover:bg-muted font-medium text-sm transition-colors">Wishlist</Link>
        <Link href="/dashboard/settings" className="px-3 py-2 rounded-md hover:bg-muted font-medium text-sm transition-colors">Settings</Link>
      </nav>
    </aside>
  );
}
