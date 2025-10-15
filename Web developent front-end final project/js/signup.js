import {
  db,
  auth,
  addDoc,
  collection,
  createUserWithEmailAndPassword,
} from "./firebase.js";

const addUser = async (name, email, pass) => {
  try {
    await addDoc(collection(db, "users"), { name, email, pass });
  } catch (error) {
    console.log("error", error);
  }
};

const signupFunc = async (ele) => {
  ele.preventDefault();

  const signupName = document.getElementById("name").value;
  const signupEmail = document.getElementById("email").value;
  const signupPassword = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (signupPassword !== confirmPassword) {
    alert("Password and Confirm Password doesn't match...!");
    return;
  }

  try {
    const signupUser = await createUserWithEmailAndPassword(
      auth,
      signupEmail,
      signupPassword
    );

    if (signupUser) {
      await addUser(signupName, signupEmail, signupPassword);
      alert("You are Successfully Signed up!");
      window.location.href = "login.html";
    }
  } catch (error) {
    console.log("error", error.code);
  }
};

const signupbtn = document.getElementById("signup");
if (signupbtn) {
  signupbtn.addEventListener("click", signupFunc);
}
