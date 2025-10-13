// js/home.js
import { db, storage, ref, uploadBytes, getDownloadURL } from "./firebaseConfig.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

// small helpers for navbar toggle & faq (if you have faq code, keep it)
function toggleMenu() { document.getElementById("navLinks").classList.toggle("active"); }
window.toggleMenu = toggleMenu;

// Form handling
const addProjectForm = document.getElementById("addProjectForm");

addProjectForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fileInput = document.getElementById("projectImage");
  const title = document.getElementById("projectTitle").value.trim();
  const description = document.getElementById("projectDescription").value.trim();
  const file = fileInput.files[0];

  if (!file || !title || !description) {
    alert("Please provide image, title and description.");
    return;
  }

  try {
    // upload image
    const storageRef = ref(storage, `projects/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    const imageUrl = await getDownloadURL(storageRef);

    // save to Firestore
    await addDoc(collection(db, "projects"), {
      title,
      description,
      image: imageUrl,
      createdAt: Date.now()
    });

    // success
    alert("Project saved!");
    addProjectForm.reset();
    // close bootstrap modal safely
    const modalEl = document.getElementById("addProjectForm");
    const bsModal = bootstrap.Modal.getOrCreateInstance(modalEl);
    bsModal.hide();

    // optional: redirect to project page so user sees it immediately
    window.location.href = "project.html";

  } catch (err) {
    console.error(err);
    alert("Error saving project. Check console.");
  }
});
