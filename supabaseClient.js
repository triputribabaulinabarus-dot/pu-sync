import { createClient } from '@supabase/supabase-js';

// https://vkofvsuwrbgrmtlxwjih.supabase.co/rest/v1/
const supabaseUrl = 'https://vkofvsuwrbgrmtlxwjih.supabase.co/';

// sb_publishable_MeFHZJJV7dTZMtqwaiqCng_bS5c2nJo
const supabaseAnonKey = 'sb_publishable_MeFHZJJV7dTZMtqwaiqCng_bS5c2nJo';
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
