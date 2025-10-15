// js/firebase2.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBQvk0-W185bBV8t-R9-DisyUE6OZS9SnQ",
  authDomain: "my-project-eb1f6.firebaseapp.com",
  projectId: "my-project-eb1f6",
  storageBucket: "my-project-eb1f6.appspot.com",
  messagingSenderId: "844633551341",
  appId: "1:844633551341:web:ade7da0bef9f1ebb9d37e4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export {
  db,
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  getDocs
};
