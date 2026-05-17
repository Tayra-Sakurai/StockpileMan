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

if (!globalThis.__supabase)
  globalThis.__supabase = createClient(supabaseUrl, supabaseKey);

export let supabase = globalThis.__supabase;
console.info("Supabase Client was initialized.");
