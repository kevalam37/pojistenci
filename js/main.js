import { getPojistenci, addPojistenec } from "./api.js";
import { parseJSONSafe } from "./utils.js";

// =======================
// Simulovaná role uživatele
// =======================
const currentUserRole = "admin"; // admin | clerk | guest

// =======================
// Funkce pro zobrazení sekce podle role
// =======================
function showView(role) {
  document.querySelectorAll("section").forEach(s => s.style.display = "none");

  if(role === "admin") {
    document.getElementById("adminView").style.display = "block";
    initAdmin();
  }
  if(role === "clerk") {
    document.getElementById("clerkView").style.display = "block";
    initClerk();
  }
  if(role === "guest") {
    document.getElementById("guestView").style.display = "block";
    initGuest();
  }
}

// =======================
// Funkce pro načtení seznamu
// =======================
async function renderList(role, listId) {
  try {
    const data = await getPojistenci();
    const list = document.getElementById(listId);
    list.innerHTML = "";

    if(!data || data.length === 0) {
      const li = document.createElement("li");
      li.textContent = "Žádní pojištěnci zatím.";
      list.appendChild(li);
      return;
    }

    data.forEach(p => {
      const li = document.createElement("li");
      li.textContent = `${p.jmeno} ${p.prijmeni} – ${JSON.stringify(p.pojisteni)}`;
      list.appendChild(li);
    });
  } catch(err) {
    console.error(`Chyba při načítání (${role}):`, err);
  }
}

// =======================
// Inicializace jednotlivých rolí
// =======================
function initAdmin() {
  renderList("admin", "adminList");

  const form = document.getElementById("adminForm");
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const jmeno = document.getElementById("adminJmeno").value;
    const prijmeni = document.getElementById("adminPrijmeni").value;
    const pojisteni = parseJSONSafe(document.getElementById("adminPojisteni").value);
    if(!pojisteni) { alert("Chybný JSON"); return; }

    try {
      await addPojistenec({ jmeno, prijmeni, pojisteni });
      form.reset();
      renderList("admin", "adminList");
    } catch(err) {
      console.error("Chyba při přidávání (admin):", err);
    }
  });
}

function initClerk() {
  renderList("clerk", "clerkList");

  const form = document.getElementById("clerkForm");
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const jmeno = document.getElementById("clerkJmeno").value;
    const prijmeni = document.getElementById("clerkPrijmeni").value;
    const pojisteni = parseJSONSafe(document.getElementById("clerkPojisteni").value);
    if(!pojisteni) { alert("Chybný JSON"); return; }

    try {
      await addPojistenec({ jmeno, prijmeni, pojisteni });
      form.reset();
      renderList("clerk", "clerkList");
    } catch(err) {
      console.error("Chyba při přidávání (clerk):", err);
    }
  });
}

function initGuest() {
  renderList("guest", "guestList");
}

// =======================
// Start
// =======================
showView(currentUserRole);
