import { db, collection, getDocs } from "./firebase.js";

// DOM se container lo
const projectContainer = document.getElementById("projectContainer");

// Firebase se data lena
async function loadProjects() {
  try {
    const querySnapshot = await getDocs(collection(db, "projects"));
    
    if (querySnapshot.empty) {
      projectContainer.innerHTML = `<p class="text-center text-muted mt-4">No projects found.</p>`;
      return;
    }

    // har document se data nikalna
    let html = "";
    querySnapshot.forEach((doc) => {
      const project = doc.data();
      html += `
        <div class="card mb-3 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">${project.title || "Untitled Project"}</h5>
            <p class="card-text text-muted">${project.description || "No description available."}</p>
            <p class="small text-secondary mb-0"><strong>Created by:</strong> ${project.owner || "Unknown"}</p>
          </div>
        </div>
      `;
    });

    // container me add karna
    projectContainer.innerHTML = html;

  } catch (error) {
    console.error("Error loading projects:", error);
    projectContainer.innerHTML = `<p class="text-danger">Error loading projects.</p>`;
  }
}

// Page load hote hi data fetch kar lo
window.addEventListener("DOMContentLoaded", loadProjects);



// 🔹 BONUS STEP — Search filter ka code ↓ (isse file ke end me add karo)
const searchInput = document.querySelector("input[type='text']");

searchInput.addEventListener("input", () => {
  const term = searchInput.value.toLowerCase();
  const cards = document.querySelectorAll("#projectContainer .card");

  cards.forEach((card) => {
    const title = card.querySelector(".card-title").textContent.toLowerCase();
    card.style.display = title.includes(term) ? "block" : "none";
  });
});
