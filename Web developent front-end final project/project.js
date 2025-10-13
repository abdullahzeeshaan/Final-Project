// js/project.js
import { db } from "./firebaseConfig.js";
import { collection, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

const projectContainer = document.getElementById("projectContainer");
const searchInput = document.getElementById("projectSearch");
const modalLabel = document.getElementById("projectDetailModalLabel");
const modalImage = document.getElementById("modalProjectImage");
const modalDesc = document.getElementById("modalProjectDescription");
const editBtn = document.getElementById("editProjectBtn");
const deleteBtn = document.getElementById("deleteProjectBtn");

function toggleMenu() { document.getElementById("navLinks").classList.toggle("active"); }
window.toggleMenu = toggleMenu;

let allProjects = []; // local cache

async function loadProjects() {
  const colRef = collection(db, "projects");
  const snap = await getDocs(colRef);
  allProjects = [];
  snap.forEach(d => allProjects.push({ id: d.id, ...d.data() }));
  renderProjects(allProjects);
}

function renderProjects(list) {
  projectContainer.innerHTML = "";
  if (!list.length) {
    projectContainer.innerHTML = `<div class="col-12 text-center text-muted">No projects found.</div>`;
    return;
  }
  list.forEach(p => {
    const col = document.createElement("div");
    col.className = "col-md-4 col-sm-6 mb-4";
    col.innerHTML = `
      <div class="project-card p-3" data-id="${p.id}">
        <img src="${p.image}" alt="${p.title}">
        <h3>${escapeHtml(p.title)}</h3>
        <p>${escapeHtml(p.description).substring(0, 120)}...</p>
      </div>
    `;
    col.querySelector(".project-card").addEventListener("click", () => openDetail(p));
    projectContainer.appendChild(col);
  });
}

function openDetail(project) {
  modalLabel.innerText = project.title;
  modalImage.src = project.image;
  modalDesc.innerText = project.description;

  // delete handler
  deleteBtn.onclick = async () => {
    if (!confirm("Delete this project?")) return;
    await deleteDoc(doc(db, "projects", project.id));
    // refresh list
    await loadProjects();
    // hide modal
    const m = bootstrap.Modal.getOrCreateInstance(document.getElementById("projectDetailModal"));
    m.hide();
  };

  // edit placeholder
  editBtn.onclick = () => {
    alert("Edit feature coming soon.");
  };

  const modal = new bootstrap.Modal(document.getElementById("projectDetailModal"));
  modal.show();
}

// Search
searchInput.addEventListener("input", (e) => {
  const q = e.target.value.toLowerCase().trim();
  if (!q) return renderProjects(allProjects);
  const filtered = allProjects.filter(p => p.title.toLowerCase().includes(q));
  renderProjects(filtered);
});

// small helper to avoid XSS when injecting text
function escapeHtml(str) {
  if (!str) return "";
  return str.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

// initial load
loadProjects();
