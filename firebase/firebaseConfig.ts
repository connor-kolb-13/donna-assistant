import { initializeApp } from "firebase/app";
import { getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Auth, getAuth, initializeAuth } from "firebase/auth";

// 🔐 Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCuwE9DKC6d92hgNB-A3fHPrZk7wndZTx8",
  authDomain: "donna-assistant-b9ce3.firebaseapp.com",
  projectId: "donna-assistant-b9ce3",
  storageBucket: "donna-assistant-b9ce3.appspot.com",
  messagingSenderId: "947174416112",
  appId: "1:947174416112:web:a6ed384087801fefecac35",
};

// 🔥 Initialize app
const app = initializeApp(firebaseConfig);

// 🧠 Use initializeAuth only once — handle native-only errors gracefully
let auth: Auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (e: any) {
  // Fallback for Expo Go or already-initialized auth
  auth = getAuth(app);
}

export { app, auth };
