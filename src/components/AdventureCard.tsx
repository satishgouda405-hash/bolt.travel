import { Mountain, Car, Waves, Clock, Users, ArrowRight } from 'lucide-react';
import type { Adventure, AdventureCategory } from '../lib/types';
import { formatPrice, getDifficultyColor, cn } from '../lib/utils';

const categoryIcons: Record<AdventureCategory, typeof Mountain> = {
  trekking: Mountain,
  'jeep-safari': Car,
  rafting: Waves,
};

const categoryBadgeColors: Record<AdventureCategory, string> = {
  trekking: 'bg-emerald-500',
  'jeep-safari': 'bg-amber-500',
  rafting: 'bg-sky-500',
};

interface Props {
  adventure: Adventure;
  onSelect: (slug: string) => void;
}

export default function AdventureCard({ adventure, onSelect }: Props) {
  const Icon = categoryIcons[adventure.category];

  return (
    <div
      onClick={() => onSelect(adventure.slug)}
      className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={adventure.hero_image}
          alt={adventure.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <span className={cn('inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-xs font-semibold', categoryBadgeColors[adventure.category])}>
            <Icon className="w-3.5 h-3.5" />
            {adventure.category === 'jeep-safari' ? 'Jeep Safari' : adventure.category.charAt(0).toUpperCase() + adventure.category.slice(1)}
          </span>
        </div>
        {adventure.featured && (
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1.5 rounded-full bg-rose-500 text-white text-xs font-semibold">Featured</span>
          </div>
        )}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-white font-bold text-lg leading-tight drop-shadow-md">{adventure.title}</h3>
        </div>
      </div>

      <div className="p-5">
        <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">{adventure.short_description}</p>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-gray-500">
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {adventure.duration}
          </span>
          <span className="inline-flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            Max {adventure.max_group_size}
          </span>
          <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium', getDifficultyColor(adventure.difficulty))}>
            {adventure.difficulty}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <span className="text-2xl font-bold text-slate-900">{formatPrice(adventure.price)}</span>
            <span className="text-gray-500 text-sm">/person</span>
          </div>
          <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold text-sm group-hover:gap-2 transition-all">
            View Details <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </div>
  );
}
