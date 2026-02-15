import { addPojisteni } from "./api.js"; // nová funkce pro přidání pojištění

// ==================================
// Získání klienta z URL (např. ?id=123&jmeno=Jan+Novak)
// ==================================
const urlParams = new URLSearchParams(window.location.search);
const klientId = urlParams.get("id");
const klientJmeno = urlParams.get("jmeno")?.replace(/\+/g, " ") || "";

// Nastavení nadpisu
document.getElementById("pageTitle").textContent = `Přidat pojištění k ${klientJmeno}`;

// ==================================
// Submit formuláře
// ==================================
const form = document.getElementById("pridatPojisteniForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const message = document.getElementById("formMessage");
  message.textContent = "";
  message.className = "form-message";

  const data = {
    klient_id: klientId,
    castka: parseFloat(document.getElementById("castka").value),
    predmet: document.getElementById("predmet").value.trim(),
    platnost_od: document.getElementById("platnostOd").value,
    platnost_do: document.getElementById("platnostDo").value,
  };

  // Jednoduchá validace
  if (!data.castka || !data.predmet || !data.platnost_od || !data.platnost_do) {
    message.textContent = "Vyplňte všechna pole.";
    message.classList.add("error");
    return;
  }

  try {
    await addPojisteni(data);
    message.textContent = "Pojištění bylo úspěšně přidáno.";
    message.classList.add("success");
    form.reset();
  } catch (err) {
    console.error(err);
    message.textContent = "Nepodařilo se uložit pojištění.";
    message.classList.add("error");
  }
});
