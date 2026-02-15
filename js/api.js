// =======================
// Supabase klient
// =======================
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const supabaseUrl = "https://sdjzimzdvlcxdnhgvmqq.supabase.co";
const supabaseKey = "sb_publishable_-ruDf1T5uX8Gknhjkg6scg_yxG4hvAo"; // public key
export const supabase = createClient(supabaseUrl, supabaseKey);

// =======================
// Funkce API
// =======================

// načtení všech pojištěnců
export async function getPojistenci() {
  const { data, error } = await supabase
    .from("pojistenci")
    .select("jmeno, prijmeni, email, telefon, ulice, mesto, psc");

  if (error) throw error;
  return data;
}

// přidání nového pojištěnce
export async function addPojistenec(pojistenec) {
  const { error } = await supabase
    .from("pojistenci")
    .insert([pojistenec]); // musí přesně odpovídat názvům sloupců v DB

  if (error) throw error;
}
export async function addPojisteni(pojisteni) {
  const { error } = await supabase.from("pojisteni").insert([pojisteni]);
  if (error) throw error;
}
