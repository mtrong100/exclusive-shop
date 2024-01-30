import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyDaYrSXuKGfqvQ0iAnGFqi_dsptIqOrYB8",
  authDomain: "exclusive-firebase.firebaseapp.com",
  projectId: "exclusive-firebase",
  storageBucket: "exclusive-firebase.appspot.com",
  messagingSenderId: "831281332116",
  appId: "1:831281332116:web:82a059d1beab7f8c385981",
  measurementId: "G-P12L7QEW5P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
