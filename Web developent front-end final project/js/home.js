import { db, collection, addDoc, serverTimestamp } from "./firebase2.js";

const projectCollection = collection(db, "projects");

// Save Project Button Click
document.getElementById("saveProjectBtn").addEventListener("click", async () => {
  const title = document.getElementById("projectTitle").value.trim();
  const desc = document.getElementById("projectDesc").value.trim();

  if (title && desc) {
    try {
      await addDoc(projectCollection, {
        title,
        description: desc,
        createdAt: serverTimestamp()
      });

      // Clear input fields
      document.getElementById("projectTitle").value = "";
      document.getElementById("projectDesc").value = "";

      // Hide Bootstrap modal after saving
      const modalElement = document.getElementById('addProjectModal');
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      modalInstance.hide();

      alert("Project added successfully!");
    } catch (error) {
      console.error("Error adding project:", error);
      alert(" Failed to add project. Please try again.");
    }
  } else {
    alert(" Please fill out both fields!");
  }
});
function toggleMenu() {
  const nav = document.getElementById("navLinks");
  nav.classList.toggle("active");
}

// Make it globally accessible
window.toggleMenu = toggleMenu;



// Select all FAQ items
const faqItems = document.querySelectorAll(".faq-item");

// Loop through each item
faqItems.forEach(item => {
  const question = item.querySelector(".faq-question");

  question.addEventListener("click", () => {
    // Toggle active class
    item.classList.toggle("active");

    // Get the answer element
    const answer = item.querySelector(".faq-answer");

    // Toggle display
    if(item.classList.contains("active")){
      answer.style.maxHeight = answer.scrollHeight + "px";
    } else {
      answer.style.maxHeight = 0;
    }
  });
});