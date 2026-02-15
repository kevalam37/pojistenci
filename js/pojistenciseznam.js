import { getPojistenci } from "./api.js";

const tableBody = document.querySelector("#pojistenciTable tbody");
const prevBtn = document.getElementById("prevPage");
const nextBtn = document.getElementById("nextPage");
const pageInfo = document.getElementById("pageInfo");

let data = [];
let currentPage = 1;
const rowsPerPage = 5;

export async function loadPojistenci() {
  try {
    data = await getPojistenci();
    renderTable();
  } catch (err) {
    console.error("Chyba při načítání pojištěnců:", err);
    tableBody.innerHTML = "<tr><td colspan='3'>Chyba při načítání pojištěnců.</td></tr>";
  }
}

function renderTable() {
  tableBody.innerHTML = "";

  if (!data || data.length === 0) {
    tableBody.innerHTML = "<tr><td colspan='3'>Žádní pojištěnci zatím.</td></tr>";
    pageInfo.textContent = "";
    return;
  }

  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const pageData = data.slice(start, end);

  pageData.forEach(p => {
    const fullName = `${p.jmeno || ''} ${p.prijmeni || ''}`;
    const bydliste = `${p.ulice || ''}, ${p.mesto || ''}`;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${fullName}</td>
      <td>${bydliste}</td>
      <td>
        <button class="btn-primary" onclick="window.location.href='edit_pojistenec.html?id=${p.id}'">
          Editovat
        </button>
      </td>
    `;
    tableBody.appendChild(tr);
  });

  pageInfo.textContent = `Stránka ${currentPage} z ${Math.ceil(data.length / rowsPerPage)}`;

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = end >= data.length;
}

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) currentPage--;
  renderTable();
});

nextBtn.addEventListener("click", () => {
  if (currentPage * rowsPerPage < data.length) currentPage++;
  renderTable();
});
