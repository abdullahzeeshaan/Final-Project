// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBfO9-FC7Gu5AyGZcWB-XEB_xmTrL37p3Y",
    authDomain: "webflow-by-az.firebaseapp.com",
    projectId: "webflow-by-az",
    storageBucket: "webflow-by-az.firebasestorage.app",
    messagingSenderId: "1028612794975",
    appId: "1:1028612794975:web:dfd77d0fc4ee999ea049ea"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

console.log("app", app);
console.log("db", db);
console.log("auth", auth);

export {
  db,
  auth,
  addDoc,
  collection,
  getDocs,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
};
