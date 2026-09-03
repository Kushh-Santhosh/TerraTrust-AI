import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

export const supabaseConfigured = Boolean(url?.trim() && key?.trim());

export const supabase = createClient(
  url?.trim() || "https://missing.supabase.co",
  key?.trim() || "missing-publishable-key",
);
