'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { apiClient, Appointment } from '@/lib/api-client';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

export default function UserDashboardPage() {
  const { user } = useAuthStore();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const [appRes, wishRes] = await Promise.all([
        apiClient.appointments.getMy(),
        apiClient.users.getWishlist()
      ]);

      if (appRes.success) setAppointments(appRes.data?.appointments || []);
      if (wishRes.success) setWishlistCount(wishRes.data?.wishlist?.length || 0);
    } catch (error) {
      toast.error('Failed to synchronize with the Studio archives.');
    } finally {
      setIsLoading(false);
    }
  };

  const upcomingAppointment = appointments.find(a => a.status === 'scheduled' || a.status === 'pending');

  return (
    <div className="space-y-12 p-8 lg:p-12 bg-brand-cream min-h-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-gold italic">Curator Profile</span>
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-brand-charcoal tracking-tighter italic mt-2">Welcome back, <span className="text-brand-gold">{user?.name || 'Curator'}</span>!</h1>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="rounded-full px-10 border-brand-beige text-[10px] font-bold uppercase tracking-[0.3em]" asChild>
            <Link href="/products">Browse Elements</Link>
          </Button>
          <Button className="rounded-full px-10 text-[10px] font-bold uppercase tracking-[0.3em]">Modify Profile</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="border-brand-beige shadow-xl shadow-brand-charcoal/5 group hover:border-brand-gold transition-all duration-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] text-brand-taupe uppercase tracking-[0.3em] font-black italic">Upcoming Visits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-black text-brand-gold tracking-tighter italic leading-none group-hover:scale-105 transition-transform origin-left">
              {appointments.filter(a => a.status !== 'cancelled' && a.status !== 'completed').length.toString().padStart(2, '0')}
            </div>
            {upcomingAppointment ? (
              <p className="text-xs text-brand-taupe mt-4 font-bold uppercase tracking-widest italic opacity-60">
                {new Date(upcomingAppointment.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })} • {upcomingAppointment.time}
              </p>
            ) : (
              <p className="text-xs text-brand-taupe mt-4 font-bold uppercase tracking-widest italic opacity-60">No sessions scheduled</p>
            )}
          </CardContent>
        </Card>
        
        <Card className="border-brand-beige shadow-xl shadow-brand-charcoal/5 group hover:border-brand-gold transition-all duration-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] text-brand-taupe uppercase tracking-[0.3em] font-black italic">Saved Elements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-black text-brand-gold tracking-tighter italic leading-none group-hover:scale-105 transition-transform origin-left">
              {wishlistCount.toString().padStart(2, '0')}
            </div>
            <p className="text-xs text-brand-taupe mt-4 font-bold uppercase tracking-widest italic opacity-60">Architectural Wishlist</p>
          </CardContent>
        </Card>

        <Card className="border-brand-beige shadow-xl shadow-brand-charcoal/5 group hover:border-brand-gold transition-all duration-500 bg-brand-charcoal relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-2xl -mr-16 -mt-16" />
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] text-brand-gold/60 uppercase tracking-[0.3em] font-black italic">Studio Actions</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <Button size="sm" className="w-full rounded-xl bg-brand-gold text-brand-charcoal hover:bg-white text-[10px] font-black tracking-[0.2em] uppercase mb-3" asChild>
               <Link href="/book">New Assessment</Link>
            </Button>
            <Button size="sm" variant="ghost" className="w-full text-brand-cream/60 hover:text-brand-gold text-[10px] font-black tracking-[0.2em] uppercase" asChild>
               <Link href="/visualizer">Launch Visualizer</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="border-brand-beige shadow-2xl shadow-brand-charcoal/5 overflow-hidden">
        <CardHeader className="border-b border-brand-beige py-8 px-10 bg-white flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold tracking-tighter italic text-brand-charcoal">Atelier Activity Log</CardTitle>
          {isLoading && <span className="w-4 h-4 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />}
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-brand-beige">
            {appointments.length > 0 ? (
              appointments.slice(0, 5).map((app) => (
                <div key={app.id} className="flex justify-between items-center p-10 hover:bg-brand-cream/50 transition-colors group">
                  <div>
                    <p className="font-bold text-lg text-brand-charcoal italic leading-none mb-2 group-hover:text-brand-gold transition-colors">
                      Protocol: {app.serviceType}
                    </p>
                    <p className="text-xs text-brand-taupe uppercase tracking-widest font-medium">
                      Status: {app.status} • {app.paymentStatus === 'paid' ? 'Authenticated' : 'Payment Required'}
                    </p>
                  </div>
                  <div className="text-[10px] font-black text-brand-gold uppercase tracking-[0.2em]">
                    {new Date(app.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-20 text-center">
                <p className="text-brand-taupe text-xs font-bold uppercase tracking-widest italic opacity-40">No recent protocol logs found.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
