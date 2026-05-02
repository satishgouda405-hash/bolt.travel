import { useState } from 'react';
import { ArrowLeft, Clock, Users, Mountain, MapPin, Star, CreditCard } from 'lucide-react';
import type { AdventureDetail } from '../lib/types';
import { formatPrice, getDifficultyColor, cn } from '../lib/utils';
import AvailabilityCalendar from './AvailabilityCalendar';
import AdventureGallery from './AdventureGallery';
import Itinerary from './Itinerary';
import Inclusions from './Inclusions';
import MapSection from './MapSection';
import Reviews from './Reviews';
import SafetySection from './SafetySection';
import BookingModal from './BookingModal';
import type { AdventureSlot } from '../lib/types';

interface Props {
  adventure: AdventureDetail;
  onBack: () => void;
}

export default function AdventureDetail({ adventure, onBack }: Props) {
  const [selectedSlot, setSelectedSlot] = useState<AdventureSlot | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  const handleSlotSelect = (slot: AdventureSlot) => {
    setSelectedSlot(slot);
  };

  const categoryLabel = adventure.category === 'jeep-safari' ? 'Jeep Safari' : adventure.category.charAt(0).toUpperCase() + adventure.category.slice(1);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[360px] max-h-[500px]">
        <img
          src={adventure.hero_image}
          alt={adventure.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-slate-900/20" />
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md text-white rounded-lg hover:bg-white/20 transition-colors text-sm font-medium border border-white/20"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          <div className="max-w-5xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-semibold mb-3">
              <Mountain className="w-3.5 h-3.5" />
              {categoryLabel}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">{adventure.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-300">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> {adventure.duration}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Users className="w-4 h-4" /> Max {adventure.max_group_size}
              </span>
              <span className={cn('px-2.5 py-0.5 rounded-full text-xs font-medium', getDifficultyColor(adventure.difficulty))}>
                {adventure.difficulty}
              </span>
              {adventure.altitude && (
                <span className="inline-flex items-center gap-1.5">
                  <Mountain className="w-4 h-4" /> {adventure.altitude}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-4 h-4" /> {adventure.location}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Price Bar */}
      <div className="sticky top-16 lg:top-20 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div>
            <span className="text-2xl sm:text-3xl font-bold text-slate-900">{formatPrice(adventure.price)}</span>
            <span className="text-gray-500 text-sm">/person</span>
            {adventure.reviews.length > 0 && (
              <span className="ml-3 inline-flex items-center gap-1 text-sm">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="font-semibold text-slate-800">
                  {(adventure.reviews.reduce((s, r) => s + r.rating, 0) / adventure.reviews.length).toFixed(1)}
                </span>
                <span className="text-gray-400">({adventure.reviews.length})</span>
              </span>
            )}
          </div>
          <button
            onClick={() => {
              if (selectedSlot) setBookingOpen(true);
              else document.getElementById('availability')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-xl transition-colors flex items-center gap-2 text-sm"
          >
            <CreditCard className="w-4 h-4" />
            {selectedSlot ? 'Book Now' : 'Check Availability'}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12">
        {/* Description */}
        <div>
          <p className="text-gray-600 leading-relaxed text-base">{adventure.description}</p>
        </div>

        {/* Availability Calendar */}
        <div id="availability">
          <AvailabilityCalendar
            slots={adventure.slots}
            maxGroupSize={adventure.max_group_size}
            onSelectSlot={handleSlotSelect}
          />
          {selectedSlot && (
            <div className="mt-3 p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-800">
                  Selected: {new Date(selectedSlot.date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
                </p>
                <p className="text-xs text-emerald-600 mt-0.5">
                  {selectedSlot.total_slots - selectedSlot.booked_slots} slots available
                </p>
              </div>
              <button
                onClick={() => setBookingOpen(true)}
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-lg transition-colors text-sm"
              >
                Book This Date
              </button>
            </div>
          )}
        </div>

        {/* Gallery */}
        <AdventureGallery images={adventure.images} />

        {/* Itinerary */}
        <Itinerary itineraries={adventure.itineraries} />

        {/* Inclusions */}
        <Inclusions inclusions={adventure.inclusions} />

        {/* Map */}
        <MapSection
          location={adventure.location}
          latitude={adventure.latitude}
          longitude={adventure.longitude}
        />

        {/* Reviews */}
        <Reviews reviews={adventure.reviews} />

        {/* Safety */}
        <SafetySection safety={adventure.safety} />
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        adventureTitle={adventure.title}
        adventureId={adventure.id}
        slot={selectedSlot}
        price={adventure.price}
      />
    </div>
  );
}
