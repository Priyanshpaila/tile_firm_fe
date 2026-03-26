import { AdminSidebar } from '@/components/layout/AdminSidebar';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex flex-1 flex-col">
        <header className="h-16 border-b border-border bg-background flex items-center justify-between px-6">
          <h2 className="text-lg font-semibold">Admin Panel</h2>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">Exit Admin</Link>
          </div>
        </header>
        <main className="flex-1 p-6 bg-muted/10">{children}</main>
      </div>
    </div>
  );
}
