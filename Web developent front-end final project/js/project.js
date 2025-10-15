import { db, collection, getDocs, doc, updateDoc, deleteDoc } from "../js/firebase.js";

const projectContainer = document.getElementById("projectContainer");
const searchInput = document.getElementById("searchInput");
const editModal = new bootstrap.Modal(document.getElementById("editModal"));
const editTitle = document.getElementById("editTitle");
const editDesc = document.getElementById("editDesc");
const updateBtn = document.getElementById("updateProjectBtn");

let projects = [];
let currentEditId = null;

async function loadProjects() {
  const querySnapshot = await getDocs(collection(db, "projects"));
  projects = [];
  querySnapshot.forEach(docSnap => {
    projects.push({ id: docSnap.id, ...docSnap.data() });
  });
  displayProjects(projects);
}

function displayProjects(list) {
  projectContainer.innerHTML = "";
  if (list.length === 0) {
    projectContainer.innerHTML = `<p class="text-center text-muted">No projects found.</p>`;
    return;
  }

  list.forEach(p => {
    const col = document.createElement("div");
    col.className = "col-12 col-md-6 col-lg-4 d-flex justify-content-center";
    col.innerHTML = `
      <div class="project-card w-100">
        <h5>${p.title}</h5>
        <p>${p.description}</p>
        <div class="card-buttons">
          <button class="btn btn-sm btn-outline-primary editBtn">Edit</button>
          <button class="btn btn-sm btn-outline-danger deleteBtn">Delete</button>
        </div>
      </div>
    `;

    const card = col.querySelector(".project-card");

    // Enlarge on click
    card.addEventListener("click", (e) => {
    
      if (e.target.tagName === "BUTTON") return;
      document.querySelectorAll(".project-card.expanded").forEach(c => c.classList.remove("expanded"));
      card.classList.toggle("expanded");
    });

    // Edit button
    col.querySelector(".editBtn").addEventListener("click", (e) => {
      e.stopPropagation();
      currentEditId = p.id;
      editTitle.value = p.title;
      editDesc.value = p.description;
      editModal.show();
    });

    // Delete button
    col.querySelector(".deleteBtn").addEventListener("click", async (e) => {
      e.stopPropagation();
      if (confirm("Are you sure you want to delete this project?")) {
        await deleteDoc(doc(db, "projects", p.id));
        alert("Project deleted!");
        loadProjects();
      }
    });

    projectContainer.appendChild(col);
  });
}

// Update project
updateBtn.addEventListener("click", async () => {
  const newTitle = editTitle.value.trim();
  const newDesc = editDesc.value.trim();

  if (!newTitle || !newDesc) {
    alert("Both fields are required!");
    return;
  }

  try {
    await updateDoc(doc(db, "projects", currentEditId), {
      title: newTitle,
      description: newDesc
    });
    editModal.hide();
    alert(" Project updated!");
    loadProjects();
  } catch (error) {
    console.error("Error updating project:", error);
  }
});

// Search
searchInput.addEventListener("input", () => {
  const text = searchInput.value.toLowerCase();
  const filtered = projects.filter(p => p.title.toLowerCase().includes(text));
  displayProjects(filtered);
});

loadProjects();
// hamburger Section
function toggleMenu() {
  const nav = document.getElementById("navLinks");
  nav.classList.toggle("active");
}

// Make it globally accessible
window.toggleMenu = toggleMenu;