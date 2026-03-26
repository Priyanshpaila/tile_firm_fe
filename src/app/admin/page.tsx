import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-heading">Admin Overview</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground uppercase font-bold">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary">1,248</div>
            <p className="text-xs text-green-500 mt-2 font-medium">+12 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground uppercase font-bold">Active Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-foreground">34</div>
            <p className="text-xs text-yellow-500 mt-2 font-medium">12 pending staff assignment</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground uppercase font-bold">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-foreground">$14.2K</div>
            <p className="text-xs text-green-500 mt-2 font-medium">+8.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground uppercase font-bold">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-foreground">8,204</div>
            <p className="text-xs text-green-500 mt-2 font-medium">+142 new signups</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex justify-between items-center bg-background border border-border rounded-lg p-3">
                  <div>
                    <h4 className="font-semibold text-sm">Booking #BK-{1090 + i}</h4>
                    <span className="text-xs text-muted-foreground">John Doe • Oct {10 + i}, 10:00 AM</span>
                  </div>
                  <div className="flex gap-2 text-xs font-bold">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded border border-yellow-200 uppercase">Pending</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Low Stock Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex justify-between items-center bg-background border border-border rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted rounded-md bg-cover" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=100)' }} />
                    <div>
                      <h4 className="font-semibold text-sm">Statuario Marble</h4>
                      <span className="text-xs text-muted-foreground">SKU: SM-001 • Floor</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-red-500 font-bold text-sm">12 boxes</div>
                    <span className="text-[10px] text-muted-foreground uppercase">Remaining</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
