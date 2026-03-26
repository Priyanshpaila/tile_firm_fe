'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Textarea } from '@/components/ui/Textarea';

const timeSlots = [
  '09:00 AM - 11:00 AM',
  '11:30 AM - 01:30 PM',
  '02:30 PM - 04:30 PM',
  '05:00 PM - 07:00 PM'
];

export default function BookingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form State
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('online');

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call and payment gateway
    setTimeout(() => {
      setIsLoading(false);
      setStep(4); // Success step
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl min-h-[calc(100vh-16rem)] flex flex-col justify-center">
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-heading mb-2">Book a Measurement Visit</h1>
        <p className="text-muted-foreground">Schedule our expert team to visit your site for precise measurements and consultation.</p>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-8 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-muted z-0 rounded-full"></div>
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary z-0 rounded-full transition-all duration-300"
          style={{ width: `${((step - 1) / 3) * 100}%` }}
        ></div>
        
        {[1, 2, 3, 4].map((s) => (
          <div 
            key={s} 
            className={`w-8 h-8 rounded-full flex items-center justify-center relative z-10 transition-colors duration-300 ${
              step >= s ? 'bg-primary text-primary-foreground border-2 border-primary' : 'bg-background text-muted-foreground border-2 border-muted'
            }`}
          >
            {s < step ? '✓' : s}
          </div>
        ))}
      </div>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Site Details</CardTitle>
            <CardDescription>Where should our team visit?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-2">
               <label className="text-sm font-medium">Full Address</label>
               <Textarea 
                placeholder="Enter complete building number, street, and landmarks" 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
               />
             </div>
             <div className="space-y-2">
               <label className="text-sm font-medium">Special Requirements / Notes</label>
               <Input 
                placeholder="E.g., Require scaffolding, 4th floor no elevator" 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
               />
             </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleNext} disabled={!address}>Next Step</Button>
          </CardFooter>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Schedule</CardTitle>
            <CardDescription>Select a convenient date and time slot.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
             <div className="space-y-2">
               <label className="text-sm font-medium">Preferred Date</label>
               <Input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]} // primitive min date
                required
               />
             </div>
             <div className="space-y-3">
               <label className="text-sm font-medium">Available Time Slots</label>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                 {timeSlots.map((slot) => (
                   <div 
                     key={slot}
                     onClick={() => setTime(slot)}
                     className={`p-3 border rounded-lg cursor-pointer text-center transition-all ${
                       time === slot ? 'border-primary bg-primary/10 text-primary font-medium' : 'border-border hover:border-primary/50 text-muted-foreground'
                     }`}
                   >
                     {slot}
                   </div>
                 ))}
               </div>
             </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleBack}>Back</Button>
            <Button onClick={handleNext} disabled={!date || !time}>Proceed to Payment</Button>
          </CardFooter>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Payment details</CardTitle>
            <CardDescription>Choose how you'd like to pay the $50 consultation fee.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
               <div className="space-y-3">
                 <label className="border p-4 flex items-start gap-4 rounded-lg cursor-pointer hover:bg-muted/50 transition">
                   <input 
                    type="radio" 
                    name="payment" 
                    className="mt-1" 
                    checked={paymentMethod === 'online'}
                    onChange={() => setPaymentMethod('online')}
                   />
                   <div>
                     <div className="font-semibold text-foreground">Pay Online Now (Razorpay)</div>
                     <div className="text-sm text-muted-foreground">Instant confirmation. Secure payment via UPI, Cards, or Netbanking.</div>
                   </div>
                 </label>
                 
                 <label className="border p-4 flex items-start gap-4 rounded-lg cursor-pointer hover:bg-muted/50 transition">
                   <input 
                    type="radio" 
                    name="payment" 
                    className="mt-1" 
                    checked={paymentMethod === 'cash'}
                    onChange={() => setPaymentMethod('cash')}
                   />
                   <div>
                     <div className="font-semibold text-foreground">Cash on Visit</div>
                     <div className="text-sm text-muted-foreground">Pay our staff directly when they visit. Booking remains pending until visited.</div>
                   </div>
                 </label>
               </div>
               
               <div className="bg-muted p-4 rounded-lg flex justify-between items-center">
                 <div className="text-sm font-medium">Total Consultation Fee</div>
                 <div className="text-xl font-bold">$50.00</div>
               </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={handleBack} disabled={isLoading}>Back</Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Processing...' : paymentMethod === 'online' ? 'Proceed to Razorpay' : 'Confirm Cash Booking'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      )}

      {step === 4 && (
        <Card className="border-primary/50 text-center py-12">
          <CardContent className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="text-2xl font-bold font-heading">Booking Confirmed!</h2>
            <p className="text-muted-foreground max-w-sm">
              Your visit is scheduled for <strong>{date}</strong> between <strong>{time}</strong>. Our team will contact you shortly.
            </p>
            <div className="mt-6 flex gap-4">
              <Button onClick={() => router.push('/dashboard')}>View Dashboard</Button>
              <Button variant="outline" onClick={() => router.push('/')}>Return Home</Button>
            </div>
          </CardContent>
        </Card>
      )}

    </div>
  );
}
