import { auth, signInWithEmailAndPassword } from "./firebase.js";
async function loginUser(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, pass);
    if (userCredential) {
      alert("You are Successfully logged in!");
      window.location.href = "home.html";
    }
  } catch (error) {
    alert("User not found. Please Sign Up first.");
    console.error(error);
  }
}

const loginBTN = document.getElementById("loginBTN");
if (loginBTN) {
  loginBTN.addEventListener("click", loginUser);
}
