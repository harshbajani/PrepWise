import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCE3mLqUlZUcoISv_LGMtjne7ck8AbCKos",
  authDomain: "prepwise-ff878.firebaseapp.com",
  projectId: "prepwise-ff878",
  storageBucket: "prepwise-ff878.firebasestorage.app",
  messagingSenderId: "1002990358961",
  appId: "1:1002990358961:web:3a51ddc7907a5161e86d90",
  measurementId: "G-7PQRDKVBMB",
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
