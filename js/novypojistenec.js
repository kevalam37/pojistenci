import { addPojistenec } from "./api.js";

// =======================
// Mobilní menu
// =======================
const menuToggle = document.querySelector('.menu-toggle');
const menuItems = document.querySelector('.menu-items');
if (menuToggle && menuItems) {
  menuToggle.addEventListener('click', () => {
    menuItems.classList.toggle('show');
  });
}

// Odhlášení
const logout = document.getElementById('logout');
if (logout) logout.addEventListener('click', () => alert('Odhlášeno!'));

// =======================
// Formulář Nový pojištěnec
// =======================
const form = document.getElementById("novyPojistenecForm");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const message = document.getElementById("formMessage");
    message.textContent = "";
    message.className = "form-message";

    const data = {
      jmeno: document.getElementById("jmeno").value.trim(),
      prijmeni: document.getElementById("prijmeni").value.trim(),
      email: document.getElementById("email").value.trim(),
      telefon: document.getElementById("telefon").value.trim(),
      ulice: document.getElementById("ulice").value.trim(),
      mesto: document.getElementById("mesto").value.trim(),
      psc: document.getElementById("psc").value.trim()
    };

    
    // validace před odesláním
if (!data.jmeno || !data.prijmeni || !data.email) {
  message.textContent = "Vyplňte povinná pole (Jméno, Příjmení, Email).";
  message.classList.add("error");
  return;
}

if (!validateEmail(data.email)) {
  message.textContent = "Neplatný formát emailu.";
  message.classList.add("error");
  return;
}

if (!validatePhone(data.telefon)) {
  message.textContent = "Neplatný formát telefonu (jen čísla, volitelně +).";
  message.classList.add("error");
  return;
}

if (!validatePSC(data.psc)) {
  message.textContent = "Neplatné PSČ (5 číslic).";
  message.classList.add("error");
  return;
}


    try {
      await addPojistenec(data);

      message.textContent = "Pojištěnec byl úspěšně uložen.";
      message.classList.add("success");

      form.reset();

      // deaktivace tlačítka na 2 sekundy
      const button = form.querySelector("button");
      button.disabled = true;
      setTimeout(() => {
        button.disabled = false;
        message.textContent = "";
        message.className = "form-message";
      }, 2000);

    } catch (error) {
      message.textContent = "Nepodařilo se uložit pojištěnce.";
      message.classList.add("error");
      console.error(error);
    }
  });
}

// =======================
// Validace emailu
// =======================
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// =======================
// Validace telefonu
// =======================
function validatePhone(phone) {
  if (!phone) return true; // nepovinné pole
  const re = /^\+?\d{3,15}$/; 
  // +420123456789 nebo 123456789
  return re.test(phone.replace(/\s+/g, '')); // odstraníme mezery
}
// =======================
// Validace PSČ
// =======================
function validatePSC(psc) {
  if (!psc) return true; // nepovinné
  const re = /^[0-9]{5}$/;
  return re.test(psc.trim());
}

