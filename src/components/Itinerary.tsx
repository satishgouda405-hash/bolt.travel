import { MapPin, Clock } from 'lucide-react';
import type { AdventureItinerary } from '../lib/types';

interface Props {
  itineraries: AdventureItinerary[];
}

export default function Itinerary({ itineraries }: Props) {
  if (itineraries.length === 0) return null;

  const days = [...new Set(itineraries.map(i => i.day))].sort();

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <MapPin className="w-5 h-5 text-emerald-600" />
        <h3 className="font-bold text-slate-900 text-lg">Day-wise Itinerary</h3>
      </div>

      <div className="space-y-6">
        {days.map(day => {
          const items = itineraries.filter(i => i.day === day).sort((a, b) => a.sort_order - b.sort_order);
          return (
            <div key={day} className="relative">
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500 text-white font-bold text-sm">
                  D{day}
                </span>
                <h4 className="font-semibold text-slate-800">
                  {day === 1 ? 'Day 1' : `Day ${day}`}
                </h4>
              </div>

              <div className="ml-5 border-l-2 border-emerald-200 pl-6 space-y-0">
                {items.map((item) => (
                  <div key={item.id} className="relative pb-4 last:pb-0">
                    <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-white border-2 border-emerald-400" />
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md whitespace-nowrap">
                        <Clock className="w-3 h-3" />
                        {item.time}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-semibold text-slate-800 text-sm">{item.title}</h5>
                        {item.description && (
                          <p className="text-gray-500 text-sm mt-0.5 leading-relaxed">{item.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
