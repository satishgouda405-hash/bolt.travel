import { useState } from 'react';
import { Mountain, Car, Waves, Filter } from 'lucide-react';
import type { Adventure, AdventureCategory } from '../lib/types';
import AdventureCard from './AdventureCard';

const categories: { key: AdventureCategory | 'all'; label: string; icon: typeof Mountain }[] = [
  { key: 'all', label: 'All Adventures', icon: Filter },
  { key: 'trekking', label: 'Trekking', icon: Mountain },
  { key: 'jeep-safari', label: 'Jeep Safari', icon: Car },
  { key: 'rafting', label: 'Rafting', icon: Waves },
];

interface Props {
  adventures: Adventure[];
  loading: boolean;
  onSelect: (slug: string) => void;
}

export default function AdventureList({ adventures, loading, onSelect }: Props) {
  const [active, setActive] = useState<AdventureCategory | 'all'>('all');

  const filtered = active === 'all' ? adventures : adventures.filter(a => a.category === active);

  return (
    <section id="adventures" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-emerald-600 font-semibold text-sm tracking-wider uppercase">Explore Our Adventures</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Choose Your Next Journey
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            From snow-capped Himalayan treks to thrilling river rapids, find the perfect adventure with live availability and instant booking.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map(c => {
            const Icon = c.icon;
            const isActive = active === c.key;
            return (
              <button
                key={c.key}
                onClick={() => setActive(c.key)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {c.label}
              </button>
            );
          })}
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse bg-white rounded-2xl overflow-hidden">
                <div className="aspect-[4/3] bg-gray-200" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(a => (
              <AdventureCard key={a.id} adventure={a} onSelect={onSelect} />
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No adventures found in this category.
          </div>
        )}
      </div>
    </section>
  );
}
