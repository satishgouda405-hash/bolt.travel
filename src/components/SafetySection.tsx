import { Shield, Phone } from 'lucide-react';
import type { AdventureSafety } from '../lib/types';

interface Props {
  safety: AdventureSafety[];
}

const categoryColors: Record<string, string> = {
  'Safety Gear': 'bg-sky-50 border-sky-100',
  'Certified Guides': 'bg-emerald-50 border-emerald-100',
  'Insurance': 'bg-amber-50 border-amber-100',
  'Emergency': 'bg-red-50 border-red-100',
  'Communication': 'bg-violet-50 border-violet-100',
  'Training': 'bg-teal-50 border-teal-100',
};

const categoryIconColors: Record<string, string> = {
  'Safety Gear': 'bg-sky-100 text-sky-600',
  'Certified Guides': 'bg-emerald-100 text-emerald-600',
  'Insurance': 'bg-amber-100 text-amber-600',
  'Emergency': 'bg-red-100 text-red-600',
  'Communication': 'bg-violet-100 text-violet-600',
  'Training': 'bg-teal-100 text-teal-600',
};

export default function SafetySection({ safety }: Props) {
  if (safety.length === 0) return null;

  return (
    <div id="safety">
      <div className="flex items-center gap-2 mb-6">
        <Shield className="w-5 h-5 text-emerald-600" />
        <h3 className="font-bold text-slate-900 text-lg">Emergency & Safety</h3>
      </div>

      <p className="text-gray-500 text-sm mb-6">
        Your safety is our top priority. All our adventures follow strict safety protocols, and our guides are certified professionals.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        {safety.map(item => (
          <div key={item.id} className={`rounded-xl p-5 border ${categoryColors[item.category] || 'bg-gray-50 border-gray-100'}`}>
            <div className="flex items-start gap-3">
              <span className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${categoryIconColors[item.category] || 'bg-gray-100 text-gray-600'}`}>
                <Shield className="w-5 h-5" />
              </span>
              <div>
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{item.category}</span>
                <h4 className="font-semibold text-slate-800 text-sm mt-0.5">{item.title}</h4>
                <p className="text-gray-500 text-sm mt-1 leading-relaxed">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-slate-900 rounded-xl p-5 flex flex-col sm:flex-row items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
          <Phone className="w-6 h-6 text-white" />
        </div>
        <div className="text-center sm:text-left flex-1">
          <p className="text-white font-semibold">24/7 Emergency Helpline</p>
          <p className="text-gray-400 text-sm">In case of emergency during your adventure, call our dedicated helpline</p>
        </div>
        <a href="tel:+919876543210" className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-lg transition-colors text-sm whitespace-nowrap">
          Call Now
        </a>
      </div>
    </div>
  );
}
