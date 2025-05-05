import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

// Initialize Supabase client
const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl ?? '';
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey ?? '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database tables
export type Memory = {
  id: string;
  created_at: string;
  user_id: string;
  title: string;
  description?: string;
  type: 'photo' | 'song' | 'link' | 'text';
  content_url?: string;
  metadata?: Record<string, any>;
};

// Storage bucket names
export const STORAGE_BUCKETS = {
  PHOTOS: 'photos',
  SONGS: 'songs',
  FILES: 'files',
} as const; 