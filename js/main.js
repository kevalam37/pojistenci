import { getPojistenci, addPojistenec } from "./api.js";
import { parseJSONSafe } from "./utils.js";

// =======================
// DOM elementy
// =======================
const form = document.getElementById("addForm");
const list = document.getElementById("pojistenciList");

// =======================
// Funkce: vykreslení seznamu
// =======================
async function nactiPojistence() {
  try {
    const data = await getPojistenci();
    list.innerHTML = "";

    if (!data || data.length === 0) {
      const li = document.createElement("li");
      li.textContent = "Žádní pojištěnci zatím.";
      list.appendChild(li);
      return;
    }

    data.forEach((p) => {
      const li = document.createElement("li");
      li.textContent = `${p.jmeno} ${p.prijmeni} – ${JSON.stringify(p.pojisteni)}`;
      list.appendChild(li);
    });
  } catch (err) {
    console.error("Chyba při načítání:", err);
  }
}

// =======================
// Funkce: submit formuláře
// =======================
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const jmeno = document.getElementById("jmeno").value;
  const prijmeni = document.getElementById("prijmeni").value;
  const input = document.getElementById("pojisteni").value;
  const pojisteni = parseJSONSafe(input);

  if (pojisteni === null) {
    alert("Chybný JSON!");
    return;
  }

  try {
    await addPojistenec({ jmeno, prijmeni, pojisteni });
    form.reset();
    nactiPojistence();
  } catch (err) {
    console.error("Chyba při přidávání:", err);
  }
});

// =======================
// Inicializace stránky
// =======================
nactiPojistence();
