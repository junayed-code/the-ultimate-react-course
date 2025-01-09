import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

const { SUPABASE_URL, SUPABASE_KEY } = process.env as Record<string, string>;

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY, {});
