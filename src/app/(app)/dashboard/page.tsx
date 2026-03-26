'use client';

import { useAuthStore } from '@/store/useAuthStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function UserDashboardPage() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-heading">Welcome back, {user?.name || 'Guest'}!</h1>
        <Button variant="outline">Edit Profile</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground uppercase tracking-wider">Upcoming Visits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1</div>
            <p className="text-sm text-muted-foreground mt-1">Oct 12, 09:00 AM</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground uppercase tracking-wider">Saved Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
            <p className="text-sm text-muted-foreground mt-1">Updates in Wishlist</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground uppercase tracking-wider">Saved Rooms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3</div>
            <p className="text-sm text-muted-foreground mt-1">From Upload Tool</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-border pb-4">
              <div>
                <p className="font-medium text-foreground">Measurement Visit Scheduled</p>
                <p className="text-sm text-muted-foreground">Order #12093 pending staff assignment</p>
              </div>
              <div className="text-sm text-muted-foreground">Oct 5, 2024</div>
            </div>
            <div className="flex justify-between items-center border-b border-border pb-4">
              <div>
                <p className="font-medium text-foreground">Added Statuario Marble to wishlist</p>
                <p className="text-sm text-muted-foreground">Floor Category</p>
              </div>
              <div className="text-sm text-muted-foreground">Oct 3, 2024</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
