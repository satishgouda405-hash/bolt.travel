import { useState } from 'react';
import { Calendar, Users, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import type { AdventureSlot } from '../lib/types';
import { formatDate, getAvailableSlots } from '../lib/utils';

interface Props {
  slots: AdventureSlot[];
  maxGroupSize: number;
  onSelectSlot: (slot: AdventureSlot) => void;
}

export default function AvailabilityCalendar({ slots, maxGroupSize, onSelectSlot }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const weekOffset = useState(0);
  const [offset, setOffset] = weekOffset;

  const now = new Date();
  const startDate = new Date(now);
  startDate.setDate(now.getDate() + offset * 7);

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    return d;
  });

  const slotsByDate = new Map(slots.map(s => [s.date, s]));

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-slate-900">Live Availability</h3>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => setOffset(Math.max(0, offset - 1))} className="p-1.5 hover:bg-white rounded-lg transition-colors" disabled={offset === 0}>
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <span className="text-sm text-gray-600 px-2 min-w-[120px] text-center">
              {formatDate(weekDays[0].toISOString())} - {formatDate(weekDays[6].toISOString())}
            </span>
            <button onClick={() => setOffset(offset + 1)} className="p-1.5 hover:bg-white rounded-lg transition-colors">
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-100">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
          <div key={d} className="bg-gray-50 px-2 py-2 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-100">
        {weekDays.map(day => {
          const dateKey = day.toISOString().split('T')[0];
          const slot = slotsByDate.get(dateKey);
          const available = slot ? getAvailableSlots(slot) : 0;
          const isSelected = selectedId === slot?.id;
          const isPast = day < new Date(new Date().toDateString());

          return (
            <button
              key={dateKey}
              disabled={!slot || isPast}
              onClick={() => {
                if (slot) {
                  setSelectedId(slot.id);
                  onSelectSlot(slot);
                }
              }}
              className={`relative bg-white p-3 sm:p-4 text-center transition-all min-h-[80px] flex flex-col items-center justify-center gap-1
                ${!slot || isPast ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:bg-emerald-50'}
                ${isSelected ? 'bg-emerald-50 ring-2 ring-emerald-500 ring-inset' : ''}
              `}
            >
              <span className={`text-xs font-medium ${isPast ? 'text-gray-400' : 'text-gray-600'}`}>
                {day.getDate()}
              </span>
              {slot && !isPast && (
                <>
                  <span className={`text-xs font-bold ${available <= 3 ? 'text-red-500' : available <= 8 ? 'text-amber-600' : 'text-emerald-600'}`}>
                    {available} left
                  </span>
                  <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                    <div
                      className={`h-1 rounded-full transition-all ${available <= 3 ? 'bg-red-500' : available <= 8 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                      style={{ width: `${(available / slot.total_slots) * 100}%` }}
                    />
                  </div>
                </>
              )}
              {isSelected && <CheckCircle className="w-4 h-4 text-emerald-500 absolute top-1 right-1" />}
            </button>
          );
        })}
      </div>

      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center gap-6 text-xs text-gray-500">
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Available</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Filling Fast</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Almost Full</span>
        <span className="ml-auto flex items-center gap-1"><Users className="w-3.5 h-3.5" /> Max {maxGroupSize}/batch</span>
      </div>
    </div>
  );
}
