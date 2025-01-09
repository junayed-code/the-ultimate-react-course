import { supabase } from "@lib/supabase";

export function getCabins() {
  return supabase.from("cabins").select("*");
}
