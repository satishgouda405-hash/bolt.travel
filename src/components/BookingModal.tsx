import { useState } from 'react';
import { X, CreditCard, Smartphone, User, Mail, Phone, Users, Shield } from 'lucide-react';
import type { AdventureSlot } from '../lib/types';
import { formatPrice } from '../lib/utils';
import { supabase } from '../lib/supabase';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  adventureTitle: string;
  adventureId: string;
  slot: AdventureSlot | null;
  price: number;
}

export default function BookingModal({ isOpen, onClose, adventureTitle, adventureId, slot, price }: Props) {
  const [step, setStep] = useState<'form' | 'payment' | 'success'>('form');
  const [form, setForm] = useState({ name: '', email: '', phone: '', groupSize: 1 });
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen || !slot) return null;

  const advanceAmount = Math.round((price * form.groupSize) * 0.5);
  const totalAmount = price * form.groupSize;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStep('payment');

    // Simulate Razorpay payment flow
    setTimeout(() => {
      setStep('success');
      setSubmitting(false);
    }, 2000);
  };

  const handleConfirmBooking = async () => {
    const { error } = await supabase.from('adventure_bookings').insert({
      adventure_id: adventureId,
      slot_id: slot.id,
      name: form.name,
      email: form.email,
      phone: form.phone,
      group_size: form.groupSize,
      advance_amount: advanceAmount,
      payment_id: `pay_${Date.now()}`,
      payment_status: 'completed',
      booking_status: 'confirmed',
    });

    if (!error) {
      // Update slot booked count
      await supabase
        .from('adventure_slots')
        .update({ booked_slots: slot.booked_slots + form.groupSize })
        .eq('id', slot.id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex items-center justify-between">
          <h2 className="font-bold text-lg">Book Your Adventure</h2>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {step === 'form' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-emerald-50 rounded-xl p-4 mb-4">
                <p className="font-semibold text-slate-800">{adventureTitle}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(slot.date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <p className="text-sm text-emerald-600 font-medium mt-1">
                  {slot.total_slots - slot.booked_slots} slots available
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-sm"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-sm"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-sm"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Group Size</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    value={form.groupSize}
                    onChange={e => setForm({ ...form, groupSize: parseInt(e.target.value) })}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-sm appearance-none"
                  >
                    {Array.from({ length: Math.min(slot.total_slots - slot.booked_slots, 10) }, (_, i) => i + 1).map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'person' : 'people'}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Price per person</span>
                  <span className="font-medium">{formatPrice(price)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Total</span>
                  <span className="font-medium">{formatPrice(totalAmount)}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between">
                  <span className="font-semibold text-slate-800">50% Advance</span>
                  <span className="font-bold text-emerald-600 text-lg">{formatPrice(advanceAmount)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                Proceed to Pay Advance
              </button>
            </form>
          )}

          {step === 'payment' && (
            <div className="text-center py-8 space-y-4">
              <div className={`w-16 h-16 mx-auto bg-emerald-100 rounded-full flex items-center justify-center ${submitting ? 'animate-pulse' : ''}`}>
                <CreditCard className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">{submitting ? 'Processing Payment' : 'Payment Gateway'}</h3>
              <p className="text-gray-500 text-sm">Secure payment via Razorpay / UPI</p>
              <div className="flex items-center justify-center gap-4 py-4">
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Smartphone className="w-4 h-4" /> PhonePe
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Smartphone className="w-4 h-4" /> GPay
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <CreditCard className="w-4 h-4" /> Card
                </div>
              </div>
              <p className="text-xs text-gray-400">Amount: {formatPrice(advanceAmount)}</p>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Booking Confirmed!</h3>
              <p className="text-gray-500 text-sm">Your adventure is booked. Check your email for details.</p>
              <div className="bg-emerald-50 rounded-xl p-4 text-left space-y-1">
                <p className="text-sm"><span className="text-gray-500">Booking ID:</span> <span className="font-mono font-semibold">BK{Date.now().toString().slice(-8)}</span></p>
                <p className="text-sm"><span className="text-gray-500">Amount Paid:</span> <span className="font-semibold text-emerald-600">{formatPrice(advanceAmount)}</span></p>
                <p className="text-sm"><span className="text-gray-500">Status:</span> <span className="font-semibold text-emerald-600">Confirmed</span></p>
              </div>
              <button
                onClick={() => {
                  handleConfirmBooking();
                  onClose();
                  setStep('form');
                  setForm({ name: '', email: '', phone: '', groupSize: 1 });
                }}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-colors"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
