export type AdventureCategory = 'trekking' | 'jeep-safari' | 'rafting';

export interface Adventure {
  id: string;
  title: string;
  slug: string;
  category: AdventureCategory;
  short_description: string;
  description: string;
  price: number;
  duration: string;
  difficulty: string;
  max_group_size: number;
  location: string;
  latitude: number | null;
  longitude: number | null;
  altitude: string;
  hero_image: string;
  featured: boolean;
  whatsapp_number: string;
  created_at: string;
}

export interface AdventureImage {
  id: string;
  adventure_id: string;
  url: string;
  caption: string;
  sort_order: number;
  created_at: string;
}

export interface AdventureItinerary {
  id: string;
  adventure_id: string;
  day: number;
  time: string;
  title: string;
  description: string;
  sort_order: number;
  created_at: string;
}

export interface AdventureInclusion {
  id: string;
  adventure_id: string;
  type: 'included' | 'carry';
  item: string;
  icon: string;
  sort_order: number;
  created_at: string;
}

export interface AdventureSlot {
  id: string;
  adventure_id: string;
  date: string;
  total_slots: number;
  booked_slots: number;
  is_available: boolean;
  created_at: string;
}

export interface AdventureBooking {
  id: string;
  adventure_id: string;
  slot_id: string;
  name: string;
  email: string;
  phone: string;
  group_size: number;
  advance_amount: number;
  payment_id: string;
  payment_status: 'pending' | 'completed' | 'failed';
  booking_status: 'confirmed' | 'cancelled';
  created_at: string;
}

export interface AdventureReview {
  id: string;
  adventure_id: string;
  author_name: string;
  author_avatar: string;
  rating: number;
  review_text: string;
  source: 'google' | 'tripadvisor' | 'website';
  trip_date: string;
  featured: boolean;
  created_at: string;
}

export interface AdventureSafety {
  id: string;
  adventure_id: string;
  category: string;
  title: string;
  description: string;
  icon: string;
  sort_order: number;
  created_at: string;
}

export interface AdventureDetail extends Adventure {
  images: AdventureImage[];
  itineraries: AdventureItinerary[];
  inclusions: AdventureInclusion[];
  slots: AdventureSlot[];
  reviews: AdventureReview[];
  safety: AdventureSafety[];
}

export const CATEGORY_LABELS: Record<AdventureCategory, string> = {
  trekking: 'Trekking',
  'jeep-safari': 'Jeep Safari',
  rafting: 'Rafting',
};

export const CATEGORY_ICONS: Record<AdventureCategory, string> = {
  trekking: 'Mountain',
  'jeep-safari': 'Car',
  rafting: 'Waves',
};
