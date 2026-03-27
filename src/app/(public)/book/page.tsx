'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Textarea } from '@/components/ui/Textarea';
import { toast } from 'react-hot-toast';
import { apiClient } from '@/lib/api-client';

const timeSlots = [
  '09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00',
  '14:00-15:00', '15:00-16:00', '16:00-17:00', '17:00-18:00'
];

export default function BookingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    street: '',
    city: '',
    state: '',
    pincode: '',
    date: '',
    timeSlot: '',
    notes: '',
    paymentMethod: 'online'
  });

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const payload = {
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode
        },
        date: formData.date,
        timeSlot: formData.timeSlot,
        notes: formData.notes,
        paymentMethod: formData.paymentMethod
      };

      const res = await apiClient.appointments.create(payload);
      
      if (res.success) {
        toast.success('Protocol established. Assessment scheduled.');
        setStep(4); // Success step
      } else {
        throw new Error(res.message || 'Scheduling failed');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Access denied to scheduling protocol.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-24 max-w-4xl min-h-screen flex flex-col justify-center bg-brand-cream">
      <div className="mb-16 text-center">
        <div className="mb-6 overflow-hidden">
          <span className="hero-particle inline-block text-[10px] font-bold uppercase tracking-[0.5em] text-brand-gold italic">Concierge Service</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold font-heading mb-8 tracking-tighter text-brand-charcoal leading-[0.95] italic">Experience <span className="text-brand-gold">Excellence.</span></h1>
        <p className="text-xl text-brand-taupe max-w-2xl mx-auto font-light leading-relaxed italic">Schedule a private architectural consultation for precise site assessment and curation.</p>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-20 relative max-w-2xl mx-auto w-full px-4">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-brand-beige z-0 rounded-full"></div>
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-brand-gold z-0 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${((step - 1) / 3) * 100}%` }}
        ></div>
        
        {[1, 2, 3, 4].map((s) => (
          <div 
            key={s} 
            className={`w-12 h-12 rounded-full flex items-center justify-center relative z-10 transition-all duration-500 ${
              step >= s ? 'bg-brand-gold text-brand-cream scale-110 shadow-2xl shadow-brand-gold/20' : 'bg-white text-brand-taupe border border-brand-beige'
            }`}
          >
            <span className="text-[10px] font-black italic">{s < step ? '✓' : s}</span>
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="bg-white border border-brand-beige rounded-[3.5rem] p-12 shadow-2xl shadow-brand-charcoal/5">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4 tracking-tighter text-brand-charcoal italic">Location <span className="text-brand-gold">Details</span></h2>
            <p className="text-brand-taupe text-xs uppercase tracking-widest font-bold italic opacity-60">Specify your project site</p>
          </div>
          <div className="space-y-8">
             <div className="space-y-4">
               <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold italic">Street / Building Info</label>
               <Input 
                 placeholder="Suite 402, Radiant Plaza" 
                 className="rounded-2xl border-brand-beige bg-brand-cream/30 focus:ring-brand-gold h-16 p-8 text-brand-charcoal"
                 value={formData.street}
                 onChange={(e) => setFormData({...formData, street: e.target.value})}
                 required
               />
             </div>
             <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold italic">City</label>
                  <Input 
                    placeholder="Metropolis" 
                    className="rounded-2xl border-brand-beige bg-brand-cream/30 focus:ring-brand-gold h-16 p-8 text-brand-charcoal"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold italic">State</label>
                  <Input 
                    placeholder="Region" 
                    className="rounded-2xl border-brand-beige bg-brand-cream/30 focus:ring-brand-gold h-16 p-8 text-brand-charcoal"
                    value={formData.state}
                    onChange={(e) => setFormData({...formData, state: e.target.value})}
                    required
                  />
                </div>
             </div>
             <div className="space-y-4">
               <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold italic">Pincode</label>
               <Input 
                 placeholder="000 000" 
                 className="rounded-2xl border-brand-beige bg-brand-cream/30 focus:ring-brand-gold h-16 p-8 text-brand-charcoal"
                 value={formData.pincode}
                 onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                 required
               />
             </div>
             <div className="pt-10 flex justify-end">
               <Button className="rounded-full px-12 py-8 text-[10px] font-bold uppercase tracking-[0.3em] shadow-2xl shadow-brand-charcoal/10" onClick={handleNext} disabled={!formData.street || !formData.city || !formData.pincode}>Proceed to Timeline</Button>
             </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white border border-brand-beige rounded-[3.5rem] p-12 shadow-2xl shadow-brand-charcoal/5">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4 tracking-tighter text-brand-charcoal italic">Visualizer <span className="text-brand-gold">Availability</span></h2>
            <p className="text-brand-taupe text-xs uppercase tracking-widest font-bold italic opacity-60">Choose your preferred window</p>
          </div>
          <div className="space-y-12">
             <div className="space-y-4">
               <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold italic">Consultation Date</label>
               <Input 
                type="date" 
                className="rounded-2xl border-brand-beige bg-brand-cream/30 focus:ring-brand-gold h-16 w-full p-8 text-brand-charcoal"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                min={new Date().toISOString().split('T')[0]}
                required
               />
             </div>
             <div className="space-y-6">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold italic">Window of Arrival</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {timeSlots.map((slot) => (
                    <div 
                      key={slot}
                      onClick={() => setFormData({...formData, timeSlot: slot})}
                      className={`p-6 border rounded-2xl cursor-pointer text-center transition-all duration-300 text-[10px] font-bold uppercase tracking-widest ${
                        formData.timeSlot === slot ? 'border-brand-gold bg-brand-gold/10 text-brand-charcoal shadow-xl' : 'border-brand-beige hover:border-brand-gold text-brand-taupe'
                      }`}
                    >
                      {slot}
                    </div>
                  ))}
                </div>
             </div>
             <div className="pt-10 flex justify-between">
               <Button variant="outline" className="rounded-full px-12 py-8 text-[10px] font-bold uppercase tracking-[0.3em] border-brand-beige italic" onClick={handleBack}>Modify Address</Button>
               <Button className="rounded-full px-12 py-8 text-[10px] font-bold uppercase tracking-[0.3em] shadow-2xl shadow-brand-charcoal/10" onClick={handleNext} disabled={!formData.date || !formData.timeSlot}>Review Summary</Button>
             </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="bg-white border border-brand-beige rounded-[3.5rem] p-12 shadow-2xl shadow-brand-charcoal/5">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4 tracking-tighter text-brand-charcoal italic">Final <span className="text-brand-gold">Confirmation</span></h2>
            <p className="text-brand-taupe text-xs uppercase tracking-widest font-bold italic opacity-60">Secure your session</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-12">
             <div className="space-y-5">
               <label className={`border p-8 flex items-start gap-6 rounded-[2.5rem] cursor-pointer transition-all group ${formData.paymentMethod === 'online' ? 'border-brand-gold bg-brand-gold/5' : 'border-brand-beige hover:bg-brand-cream'}`}>
                 <input 
                  type="radio" 
                  name="payment" 
                  className="mt-1.5 w-6 h-6 accent-brand-gold" 
                  checked={formData.paymentMethod === 'online'}
                  onChange={() => setFormData({...formData, paymentMethod: 'online'})}
                 />
                 <div>
                   <div className="font-bold text-xl mb-2 text-brand-charcoal group-hover:text-brand-gold transition-colors italic">Architectural Premium (Digital)</div>
                   <div className="text-sm text-brand-taupe leading-relaxed italic opacity-80">Secure instant confirmation via premium gateway. High-priority logistics.</div>
                 </div>
               </label>
               
               <label className={`border p-8 flex items-start gap-6 rounded-[2.5rem] cursor-pointer transition-all group ${formData.paymentMethod === 'cash' ? 'border-brand-gold bg-brand-gold/5' : 'border-brand-beige hover:bg-brand-cream'}`}>
                 <input 
                  type="radio" 
                  name="payment" 
                  className="mt-1.5 w-6 h-6 accent-brand-gold" 
                  checked={formData.paymentMethod === 'cash'}
                  onChange={() => setFormData({...formData, paymentMethod: 'cash'})}
                 />
                 <div>
                   <div className="font-bold text-xl mb-2 text-brand-charcoal group-hover:text-brand-gold transition-colors italic">Standard Curation (On-Site)</div>
                   <div className="text-sm text-brand-taupe leading-relaxed italic opacity-80">Pay during consultation. Standard queue priority.</div>
                 </div>
               </label>
             </div>
             
             <div className="bg-brand-charcoal p-10 rounded-[2.5rem] flex justify-between items-center text-brand-cream border border-brand-gold/20">
               <div className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-60 italic">Assessment Fee</div>
               <div className="text-4xl font-bold text-brand-gold leading-none tracking-tighter italic">$500.00</div>
             </div>

             <div className="pt-10 flex justify-between items-center">
               <Button type="button" variant="outline" className="rounded-full px-12 py-8 text-[10px] font-bold uppercase tracking-[0.3em] border-brand-beige italic" onClick={handleBack} disabled={isLoading}>Back</Button>
               <Button type="submit" className="rounded-full px-16 py-8 text-[10px] font-bold uppercase tracking-[0.4em] shadow-2xl shadow-brand-charcoal/30 flex items-center gap-4" disabled={isLoading}>
                 {isLoading ? <span className="w-4 h-4 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" /> : null}
                 {isLoading ? 'Processing...' : 'Confirm Assessment ↗'}
               </Button>
             </div>
          </form>
        </div>
      )}

      {step === 4 && (
        <div className="text-center py-24 bg-brand-charcoal rounded-[4.5rem] border border-brand-gold/30 shadow-3xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-[120px] -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-[120px] -ml-48 -mb-48" />
          
          <div className="relative z-10 flex flex-col items-center gap-10 text-brand-cream">
            <div className="w-24 h-24 bg-brand-gold/20 text-brand-gold rounded-full flex items-center justify-center shadow-inner border border-brand-gold/20">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            </div>
            <div>
              <h2 className="text-5xl md:text-7xl font-bold font-heading tracking-tighter leading-[0.9] mb-6 italic">Protocol <span className="text-brand-gold">Confirmed.</span></h2>
              <p className="text-brand-beige/60 text-xl max-w-md mx-auto leading-relaxed font-light italic">
                Your assessment session is secured for <span className="text-brand-gold font-bold">{formData.date}</span> at <span className="text-brand-gold font-bold">{formData.timeSlot}</span>.
              </p>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-6">
              <Button className="rounded-full px-12 py-7 text-[10px] font-bold uppercase tracking-[0.3em] bg-brand-gold text-brand-charcoal hover:bg-white" onClick={() => router.push('/dashboard')}>Manage Archive</Button>
              <Button variant="outline" className="rounded-full px-12 py-7 text-[10px] font-bold uppercase tracking-[0.3em] border-brand-beige text-brand-cream hover:bg-brand-gold hover:text-brand-charcoal" onClick={() => router.push('/')}>Return Studio</Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
