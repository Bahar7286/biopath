import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
