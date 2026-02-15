import { supabase } from "./api.js"; // Supabase klient

// ===============================
// Načtení jména pojištěnce z URL
// ===============================
const params = new URLSearchParams(window.location.search);
const pojistenecId = params.get("id");
const pojistenecName = params.get("jmeno");

// Nastavení nadpisu
document.getElementById("nadpis").textContent =
  `Přidat pojištění k ${pojistenecName || ""}`;

// ===============================
// Odeslání formuláře
// ===============================
const form = document.getElementById("pridatPojisteniForm");
const message = document.getElementById("formMessage");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  message.textContent = "";
  message.className = "form-message";

  // Načtení hodnot
  const data = {
    pojistenec_id: pojistenecId,
    typ: document.getElementById("typPojisteni").value,
    castka: parseFloat(document.getElementById("castka").value),
    predmet: document.getElementById("predmet").value.trim(),
    platnost_od: document.getElementById("platnostOd").value,
    platnost_do: document.getElementById("platnostDo").value,
  };

  // Jednoduchá validace
  if (
    !data.typ ||
    !data.castka ||
    !data.predmet ||
    !data.platnost_od ||
    !data.platnost_do
  ) {
    message.textContent = "Vyplňte všechna povinná pole.";
    message.classList.add("error");
    return;
  }

  if (data.castka <= 0) {
    message.textContent = "Částka musí být větší než 0.";
    message.classList.add("error");
    return;
  }

  try {
    // Uložení do Supabase
    const { error } = await supabase.from("pojisteni").insert([data]);
    if (error) throw error;

    // Úspěch
    message.textContent = "Pojištění bylo úspěšně uloženo.";
    message.classList.add("success");
    form.reset();

    // Tlačítko na 2 sekundy zakázáno
    const button = form.querySelector("button");
    button.disabled = true;
    setTimeout(() => {
      button.disabled = false;
      message.textContent = "";
      message.className = "form-message";
    }, 2000);

  } catch (err) {
    console.error("Chyba při ukládání:", err);
    message.textContent = "Nepodařilo se uložit pojištění.";
    message.classList.add("error");
  }
});
