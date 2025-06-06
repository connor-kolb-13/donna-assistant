// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCuwE9DKC6d92hgNB-A3fHPrZk7wndZTx8",
  authDomain: "donna-assistant-b9ce3.firebaseapp.com",
  projectId: "donna-assistant-b9ce3",
  storageBucket: "donna-assistant-b9ce3.firebasestorage.app",
  messagingSenderId: "947174416112",
  appId: "1:947174416112:web:a6ed384087801fefecac35",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
