import { createClient } from '@supabase/supabase-js';

/**
 * Supabase database URL.
 * @type {string}
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
/**
 * Supabase API Key
 * @type {string}
 */
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
