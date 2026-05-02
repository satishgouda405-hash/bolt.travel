/*
  # Create Adventure Website Schema

  1. New Tables
    - `adventures` - Main adventure listings (trekking, jeep safari, rafting)
      - `id` (uuid, primary key)
      - `title` (text, adventure name)
      - `slug` (text, unique URL identifier)
      - `category` (text, trekking/jeep-safari/rafting)
      - `short_description` (text, brief overview)
      - `description` (text, full description)
      - `price` (integer, price in INR)
      - `duration` (text, e.g. "2 Days / 1 Night")
      - `difficulty` (text, Easy/Moderate/Hard)
      - `max_group_size` (integer, maximum participants)
      - `location` (text, base camp location name)
      - `latitude` (numeric, GPS latitude)
      - `longitude` (numeric, GPS longitude)
      - `altitude` (text, max altitude info)
      - `hero_image` (text, main image URL)
      - `featured` (boolean, show on homepage)
      - `whatsapp_number` (text, contact number)
      - `created_at` (timestamptz)

    - `adventure_images` - Gallery images for each adventure
      - `id` (uuid, primary key)
      - `adventure_id` (uuid, FK to adventures)
      - `url` (text, image URL)
      - `caption` (text, image description)
      - `sort_order` (integer, display order)
      - `created_at` (timestamptz)

    - `adventure_itineraries` - Day-wise itinerary items
      - `id` (uuid, primary key)
      - `adventure_id` (uuid, FK to adventures)
      - `day` (integer, day number)
      - `time` (text, e.g. "06:00 AM")
      - `title` (text, activity title)
      - `description` (text, activity details)
      - `sort_order` (integer, display order)
      - `created_at` (timestamptz)

    - `adventure_inclusions` - What's included and what to carry
      - `id` (uuid, primary key)
      - `adventure_id` (uuid, FK to adventures)
      - `type` (text, "included" or "carry")
      - `item` (text, item description)
      - `icon` (text, icon name)
      - `sort_order` (integer, display order)
      - `created_at` (timestamptz)

    - `adventure_slots` - Availability slots for booking
      - `id` (uuid, primary key)
      - `adventure_id` (uuid, FK to adventures)
      - `date` (date, slot date)
      - `total_slots` (integer, max capacity)
      - `booked_slots` (integer, currently booked)
      - `is_available` (boolean, slot open for booking)
      - `created_at` (timestamptz)

    - `adventure_bookings` - Booking records
      - `id` (uuid, primary key)
      - `adventure_id` (uuid, FK to adventures)
      - `slot_id` (uuid, FK to adventure_slots)
      - `name` (text, guest name)
      - `email` (text, guest email)
      - `phone` (text, guest phone)
      - `group_size` (integer, number of people)
      - `advance_amount` (integer, advance paid in INR)
      - `payment_id` (text, Razorpay payment ID)
      - `payment_status` (text, pending/completed/failed)
      - `booking_status` (text, confirmed/cancelled)
      - `created_at` (timestamptz)

    - `adventure_reviews` - Customer reviews
      - `id` (uuid, primary key)
      - `adventure_id` (uuid, FK to adventures)
      - `author_name` (text, reviewer name)
      - `author_avatar` (text, avatar URL)
      - `rating` (integer, 1-5 stars)
      - `review_text` (text, review content)
      - `source` (text, google/tripadvisor/website)
      - `trip_date` (text, when they went)
      - `featured` (boolean, show prominently)
      - `created_at` (timestamptz)

    - `adventure_safety` - Safety and emergency info
      - `id` (uuid, primary key)
      - `adventure_id` (uuid, FK to adventures)
      - `category` (text, e.g. "Safety Gear", "Certified Guides", "Insurance")
      - `title` (text, item title)
      - `description` (text, item details)
      - `icon` (text, icon name)
      - `sort_order` (integer, display order)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Public read access for adventures, images, itineraries, inclusions, slots, reviews, safety
    - Authenticated insert/update for bookings
    - No public write access to slots (managed server-side)

  3. Indexes
    - Index on adventures.category for filtering
    - Index on adventure_slots.adventure_id and date for availability lookups
    - Index on adventure_bookings.slot_id for booking management
*/

-- Adventures table
CREATE TABLE IF NOT EXISTS adventures (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  category text NOT NULL CHECK (category IN ('trekking', 'jeep-safari', 'rafting')),
  short_description text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  price integer NOT NULL DEFAULT 0,
  duration text NOT NULL DEFAULT '',
  difficulty text NOT NULL DEFAULT 'Moderate',
  max_group_size integer NOT NULL DEFAULT 15,
  location text NOT NULL DEFAULT '',
  latitude numeric DEFAULT NULL,
  longitude numeric DEFAULT NULL,
  altitude text DEFAULT '',
  hero_image text NOT NULL DEFAULT '',
  featured boolean DEFAULT false,
  whatsapp_number text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Adventure images gallery
CREATE TABLE IF NOT EXISTS adventure_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  adventure_id uuid NOT NULL REFERENCES adventures(id) ON DELETE CASCADE,
  url text NOT NULL,
  caption text DEFAULT '',
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Day-wise itinerary
CREATE TABLE IF NOT EXISTS adventure_itineraries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  adventure_id uuid NOT NULL REFERENCES adventures(id) ON DELETE CASCADE,
  day integer NOT NULL DEFAULT 1,
  time text NOT NULL DEFAULT '',
  title text NOT NULL,
  description text DEFAULT '',
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Inclusions and what to carry
CREATE TABLE IF NOT EXISTS adventure_inclusions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  adventure_id uuid NOT NULL REFERENCES adventures(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('included', 'carry')),
  item text NOT NULL,
  icon text DEFAULT '',
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Availability slots
CREATE TABLE IF NOT EXISTS adventure_slots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  adventure_id uuid NOT NULL REFERENCES adventures(id) ON DELETE CASCADE,
  date date NOT NULL,
  total_slots integer NOT NULL DEFAULT 15,
  booked_slots integer NOT NULL DEFAULT 0,
  is_available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  UNIQUE(adventure_id, date)
);

-- Bookings
CREATE TABLE IF NOT EXISTS adventure_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  adventure_id uuid NOT NULL REFERENCES adventures(id) ON DELETE CASCADE,
  slot_id uuid NOT NULL REFERENCES adventure_slots(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  group_size integer NOT NULL DEFAULT 1,
  advance_amount integer NOT NULL DEFAULT 0,
  payment_id text DEFAULT '',
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed')),
  booking_status text DEFAULT 'confirmed' CHECK (booking_status IN ('confirmed', 'cancelled')),
  created_at timestamptz DEFAULT now()
);

-- Reviews
CREATE TABLE IF NOT EXISTS adventure_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  adventure_id uuid NOT NULL REFERENCES adventures(id) ON DELETE CASCADE,
  author_name text NOT NULL,
  author_avatar text DEFAULT '',
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text text NOT NULL,
  source text DEFAULT 'website' CHECK (source IN ('google', 'tripadvisor', 'website')),
  trip_date text DEFAULT '',
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Safety info
CREATE TABLE IF NOT EXISTS adventure_safety (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  adventure_id uuid NOT NULL REFERENCES adventures(id) ON DELETE CASCADE,
  category text NOT NULL,
  title text NOT NULL,
  description text DEFAULT '',
  icon text DEFAULT '',
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE adventures ENABLE ROW LEVEL SECURITY;
ALTER TABLE adventure_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE adventure_itineraries ENABLE ROW LEVEL SECURITY;
ALTER TABLE adventure_inclusions ENABLE ROW LEVEL SECURITY;
ALTER TABLE adventure_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE adventure_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE adventure_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE adventure_safety ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public can view adventures" ON adventures FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public can view images" ON adventure_images FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public can view itineraries" ON adventure_itineraries FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public can view inclusions" ON adventure_inclusions FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public can view available slots" ON adventure_slots FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public can view reviews" ON adventure_reviews FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public can view safety info" ON adventure_safety FOR SELECT TO anon, authenticated USING (true);

-- Booking policies: authenticated users can insert, anon can also insert (for guest bookings)
CREATE POLICY "Guests can create bookings" ON adventure_bookings FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Users can view own bookings" ON adventure_bookings FOR SELECT TO authenticated USING (auth.uid()::text = email);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_adventures_category ON adventures(category);
CREATE INDEX IF NOT EXISTS idx_adventures_featured ON adventures(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_slots_adventure_date ON adventure_slots(adventure_id, date);
CREATE INDEX IF NOT EXISTS idx_bookings_slot ON adventure_bookings(slot_id);
CREATE INDEX IF NOT EXISTS idx_reviews_adventure ON adventure_reviews(adventure_id);
CREATE INDEX IF NOT EXISTS idx_images_adventure ON adventure_images(adventure_id);
CREATE INDEX IF NOT EXISTS idx_itineraries_adventure ON adventure_itineraries(adventure_id);
CREATE INDEX IF NOT EXISTS idx_inclusions_adventure ON adventure_inclusions(adventure_id);
CREATE INDEX IF NOT EXISTS idx_safety_adventure ON adventure_safety(adventure_id);
