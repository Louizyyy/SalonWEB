import { createClient } from "@supabase/supabase-js";
const url = import.meta.env.VITE_SUPABASE_URL?.trim();
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim();
// No credentials means demo mode. Never put a secret/service-role key here.
export const configurationError =
  Boolean(url || key) && !(url && key && /^https:\/\//.test(url))
    ? "Supabase configuration is incomplete. Check both values in .env.local and restart Vite."
    : "";
export const supabase =
  url && key && !configurationError
    ? createClient(url, key, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false,
        },
      })
    : null;
