import { Check, Package, Backpack } from 'lucide-react';
import type { AdventureInclusion } from '../lib/types';

interface Props {
  inclusions: AdventureInclusion[];
}

export default function Inclusions({ inclusions }: Props) {
  if (inclusions.length === 0) return null;

  const included = inclusions.filter(i => i.type === 'included').sort((a, b) => a.sort_order - b.sort_order);
  const carry = inclusions.filter(i => i.type === 'carry').sort((a, b) => a.sort_order - b.sort_order);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
        <div className="flex items-center gap-2 mb-4">
          <Package className="w-5 h-5 text-emerald-600" />
          <h3 className="font-bold text-slate-900">What's Included</h3>
        </div>
        <ul className="space-y-3">
          {included.map(item => (
            <li key={item.id} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center mt-0.5">
                <Check className="w-3 h-3 text-white" />
              </span>
              <span className="text-sm text-slate-700">{item.item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
        <div className="flex items-center gap-2 mb-4">
          <Backpack className="w-5 h-5 text-amber-600" />
          <h3 className="font-bold text-slate-900">What to Carry</h3>
        </div>
        <ul className="space-y-3">
          {carry.map(item => (
            <li key={item.id} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center mt-0.5">
                <Backpack className="w-3 h-3 text-white" />
              </span>
              <span className="text-sm text-slate-700">{item.item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
