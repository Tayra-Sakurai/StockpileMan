/**
 * @fileoverview This is a part of StockpileMan
 * @copyright Copyright (C) 2026 Tayra Sakurai
 * @license This is a part of StockpileMan
 * Copyright (C) 2026 Tayra Sakurai
 * 
 * StockpileMan is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 * 
 * StockpileMan is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License along with StockpileMan. If not, see <https://www.gnu.org/licenses/>.
 */
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
  globalThis.__supabase = createClient(
    supabaseUrl,
    supabaseKey
  );

/**
 * The Supabase client.
 * @type {import("@supabase/supabase-js").SupabaseClient<any, "public", "public", any, any>}
 */
export let supabase = globalThis.__supabase;
console.info("Supabase Client was initialized.");
