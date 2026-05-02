import { Star, Quote } from 'lucide-react';
import type { AdventureReview } from '../lib/types';

interface Props {
  reviews: AdventureReview[];
}

const sourceLabels: Record<string, string> = {
  google: 'Google',
  tripadvisor: 'TripAdvisor',
  website: 'Website',
};

const sourceColors: Record<string, string> = {
  google: 'bg-blue-100 text-blue-700',
  tripadvisor: 'bg-emerald-100 text-emerald-700',
  website: 'bg-slate-100 text-slate-700',
};

export default function Reviews({ reviews }: Props) {
  if (reviews.length === 0) return null;

  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);
  const featured = reviews.filter(r => r.featured);

  return (
    <div id="reviews">
      <div className="flex items-center gap-2 mb-2">
        <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
        <h3 className="font-bold text-slate-900 text-lg">Reviews & Ratings</h3>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-4xl font-bold text-slate-900">{avgRating}</span>
          <div>
            <div className="flex">
              {[1, 2, 3, 4, 5].map(s => (
                <Star key={s} className={`w-4 h-4 ${s <= Math.round(Number(avgRating)) ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="text-xs text-gray-500">{reviews.length} reviews</span>
          </div>
        </div>
        <div className="flex gap-2 ml-auto">
          {['google', 'tripadvisor', 'website'].map(s => {
            const count = reviews.filter(r => r.source === s).length;
            if (count === 0) return null;
            return (
              <span key={s} className={`text-xs font-medium px-2 py-1 rounded-full ${sourceColors[s]}`}>
                {count} from {sourceLabels[s]}
              </span>
            );
          })}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {(featured.length > 0 ? featured : reviews.slice(0, 4)).map(review => (
          <div key={review.id} className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md transition-shadow">
            <Quote className="w-6 h-6 text-emerald-200 mb-2" />
            <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">{review.review_text}</p>
            <div className="mt-4 flex items-center gap-3 pt-3 border-t border-gray-50">
              {review.author_avatar ? (
                <img src={review.author_avatar} alt={review.author_name} className="w-9 h-9 rounded-full object-cover" loading="lazy" />
              ) : (
                <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-sm">
                  {review.author_name.charAt(0)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-800 text-sm truncate">{review.author_name}</p>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star key={s} className={`w-3 h-3 ${s <= review.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">{review.trip_date}</span>
                </div>
              </div>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${sourceColors[review.source]}`}>
                {sourceLabels[review.source]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
