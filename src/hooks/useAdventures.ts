import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Adventure, AdventureSlot, AdventureDetail } from '../lib/types';

export function useAdventures() {
  const [adventures, setAdventures] = useState<Adventure[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const { data, error } = await supabase
        .from('adventures')
        .select('*')
        .order('featured', { ascending: false })
        .order('price', { ascending: true });

      if (!error && data) setAdventures(data);
      setLoading(false);
    }
    fetch();
  }, []);

  return { adventures, loading };
}

export function useFeaturedAdventures() {
  const [adventures, setAdventures] = useState<Adventure[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const { data, error } = await supabase
        .from('adventures')
        .select('*')
        .eq('featured', true)
        .order('price', { ascending: true });

      if (!error && data) setAdventures(data);
      setLoading(false);
    }
    fetch();
  }, []);

  return { adventures, loading };
}

export function useAdventureBySlug(slug: string | undefined) {
  const [adventure, setAdventure] = useState<AdventureDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) { setLoading(false); return; }

    async function fetch() {
      const { data: adv, error: advErr } = await supabase
        .from('adventures')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (advErr || !adv) { setLoading(false); return; }

      const [imgRes, itnRes, incRes, slotRes, revRes, safRes] = await Promise.all([
        supabase.from('adventure_images').select('*').eq('adventure_id', adv.id).order('sort_order'),
        supabase.from('adventure_itineraries').select('*').eq('adventure_id', adv.id).order('day').order('sort_order'),
        supabase.from('adventure_inclusions').select('*').eq('adventure_id', adv.id).order('type').order('sort_order'),
        supabase.from('adventure_slots').select('*').eq('adventure_id', adv.id).gte('date', new Date().toISOString().split('T')[0]).order('date'),
        supabase.from('adventure_reviews').select('*').eq('adventure_id', adv.id).order('featured', { ascending: false }).order('created_at', { ascending: false }),
        supabase.from('adventure_safety').select('*').eq('adventure_id', adv.id).order('sort_order'),
      ]);

      setAdventure({
        ...adv,
        images: imgRes.data || [],
        itineraries: itnRes.data || [],
        inclusions: incRes.data || [],
        slots: slotRes.data || [],
        reviews: revRes.data || [],
        safety: safRes.data || [],
      });
      setLoading(false);
    }
    fetch();
  }, [slug]);

  return { adventure, loading };
}

export function useSlots(adventureId: string | undefined) {
  const [slots, setSlots] = useState<AdventureSlot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!adventureId) { setLoading(false); return; }

    async function fetch() {
      const { data, error } = await supabase
        .from('adventure_slots')
        .select('*')
        .eq('adventure_id', adventureId)
        .gte('date', new Date().toISOString().split('T')[0])
        .eq('is_available', true)
        .order('date');

      if (!error && data) setSlots(data);
      setLoading(false);
    }
    fetch();
  }, [adventureId]);

  return { slots, loading };
}
