import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Property = {
  id?: string;
  created_at?: string;
  // Basic Info
  title: string;
  property_type: string;
  transaction_type: string;
  price: number;
  description: string;
  
  // Location Info
  address: string;
  detail_address: string;
  zip_code: string;
  latitude: string;
  longitude: string;
  
  // Detail Info
  size: number;
  rooms: number;
  bathrooms: number;
  floor: number;
  total_floors: number;
  parking_available: boolean;
  elevator: boolean;
  move_in_date: string;
  features: string[];
  
  // Images
  images: string[];
}; 