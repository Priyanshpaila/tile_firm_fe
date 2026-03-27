import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-12 p-8 lg:p-12 bg-brand-cream min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-gold italic">Global Control</span>
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-brand-charcoal tracking-tighter italic mt-2">Atelier <span className="text-brand-gold">Overview.</span></h1>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <Card className="border-brand-beige shadow-xl shadow-brand-charcoal/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] text-brand-taupe uppercase tracking-[0.3em] font-black italic">Active Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-black text-brand-charcoal tracking-tighter italic leading-none">1,248</div>
            <p className="text-[10px] text-brand-gold mt-4 font-black uppercase tracking-widest italic">+12 This Session</p>
          </CardContent>
        </Card>
        <Card className="border-brand-beige shadow-xl shadow-brand-charcoal/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] text-brand-taupe uppercase tracking-[0.3em] font-black italic">Open Protocols</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-black text-brand-gold tracking-tighter italic leading-none">34</div>
            <p className="text-[10px] text-brand-taupe mt-4 font-black uppercase tracking-widest italic opacity-60">12 Pending Logistics</p>
          </CardContent>
        </Card>
        <Card className="border-brand-beige shadow-xl shadow-brand-charcoal/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] text-brand-taupe uppercase tracking-[0.3em] font-black italic">Global Curation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-black text-brand-charcoal tracking-tighter italic leading-none">$14.2K</div>
            <p className="text-[10px] text-brand-gold mt-4 font-black uppercase tracking-widest italic">+8.2% Growth</p>
          </CardContent>
        </Card>
        <Card className="border-brand-beige shadow-xl shadow-brand-charcoal/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] text-brand-taupe uppercase tracking-[0.3em] font-black italic">Studio Curators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-black text-brand-charcoal tracking-tighter italic leading-none">8,204</div>
            <p className="text-[10px] text-brand-gold mt-4 font-black uppercase tracking-widest italic">+142 New Access</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-brand-beige shadow-2xl shadow-brand-charcoal/5 overflow-hidden">
          <CardHeader className="border-b border-brand-beige py-8 px-10 bg-white">
            <CardTitle className="text-xl font-bold tracking-tighter italic text-brand-charcoal">Recent Protocols</CardTitle>
          </CardHeader>
          <CardContent className="p-10 space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex justify-between items-center bg-brand-cream/30 border border-brand-beige/50 rounded-2xl p-6 transition-all hover:border-brand-gold hover:bg-white group">
                <div>
                  <h4 className="font-black text-sm text-brand-charcoal italic uppercase tracking-widest leading-none mb-2">#BK-{1090 + i}</h4>
                  <span className="text-[10px] text-brand-taupe font-bold uppercase tracking-widest italic">Protocol by J. Doe • Oct {10 + i}</span>
                </div>
                <div className="flex gap-2">
                  <span className="px-4 py-2 bg-brand-gold/10 text-brand-gold text-[8px] font-black uppercase tracking-[0.2em] rounded-full border border-brand-gold/20 italic">Awaiting Assignment</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="border-brand-beige shadow-2xl shadow-brand-charcoal/5 overflow-hidden">
          <CardHeader className="border-b border-brand-beige py-8 px-10 bg-white">
            <CardTitle className="text-xl font-bold tracking-tighter italic text-brand-charcoal">Inventory Alerts</CardTitle>
          </CardHeader>
          <CardContent className="p-10 space-y-6">
            {[1, 2].map((i) => (
              <div key={i} className="flex justify-between items-center bg-brand-cream/30 border border-brand-beige/50 rounded-2xl p-6 transition-all hover:border-brand-gold hover:bg-white group">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-brand-cream rounded-xl bg-cover border border-brand-beige group-hover:border-brand-gold transition-colors" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=100)' }} />
                  <div>
                    <h4 className="font-black text-sm text-brand-charcoal italic uppercase tracking-widest leading-none mb-2">Statuario Marble</h4>
                    <span className="text-[10px] text-brand-taupe font-bold uppercase tracking-widest italic">SKU: SM-001 • Element-Floor</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-brand-gold font-black text-xl italic leading-none mb-1">12 Bxs</div>
                  <span className="text-[8px] text-brand-taupe uppercase tracking-[0.2em] font-black italic opacity-60">Reserved State</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
