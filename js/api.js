// =======================
// Supabase inicializace
// =======================
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

// ASCII-only key
const supabaseUrl = "https://sdjzimzdvlcxdnhgvmqq.supabase.co";
const supabaseKey = "sb_publishable_-ruDf1T5uX8Gknhjkg6scg_yxG4hvAo";

export const supabase = createClient(supabaseUrl, supabaseKey);

// =======================
// Funkce API
// =======================

export async function getPojistenci() {
  const { data, error } = await supabase.from("pojistenci").select("*");
  if (error) throw error;
  return data;
}

export async function addPojistenec(pojistenec) {
  const { error } = await supabase.from("pojistenci").insert([pojistenec]);
  if (error) throw error;
}
