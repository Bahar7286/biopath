import { createClient, SupabaseClient } from '@supabase/supabase-js';

let _supabase: SupabaseClient | null = null;

function getSupabase(): SupabaseClient {
  if (_supabase) return _supabase;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    // Build-time veya env yokken dummy client döndür
    _supabase = createClient(
      'https://placeholder.supabase.co',
      'placeholder-key'
    );
    return _supabase;
  }

  _supabase = createClient(supabaseUrl, supabaseAnonKey);
  return _supabase;
}

// Proxy object - her erişimde lazy init
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const client = getSupabase();
    const value = (client as any)[prop];
    if (typeof value === 'function') {
      return value.bind(client);
    }
    return value;
  },
});

export type Profile = {
  id: string;
  user_id: string;
  username: string;
  full_name: string;
  bio: string;
  location: string;
  website: string;
  github_username: string;
  avatar_url: string;
  repositories: Repository[];
  created_at: string;
  updated_at: string;
};

export type Repository = {
  id: number;
  name: string;
  description: string;
  url: string;
  stars: number;
  forks: number;
  language: string;
};
