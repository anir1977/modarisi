import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Public project URL and publishable key: safe to ship to the browser (access is enforced by RLS).
const URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://zlmkkparjchxihbvghmh.supabase.co";
const KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "sb_publishable_Uv9Qo9Hsjyyps-y0VdAc7Q_VUjwFyhR";

/** Server-side reads (no session). */
export const serverDb = () => createClient(URL, KEY, { auth: { persistSession: false, autoRefreshToken: false } });

let browser: SupabaseClient | null = null;
/** Browser client with a persisted auth session. */
export const browserDb = () => (browser ??= createClient(URL, KEY));
