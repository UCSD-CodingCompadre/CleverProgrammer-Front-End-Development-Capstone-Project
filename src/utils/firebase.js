import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzn4XPb8BWEmXmDS0tUTcBUmwjhuEtDwE",
  authDomain: "capstone-a82e0.firebaseapp.com",
  projectId: "capstone-a82e0",
  storageBucket: "capstone-a82e0.appspot.com",
  messagingSenderId: "209943927355",
  appId: "1:209943927355:web:01fb0b54e807ff188c9a1e",
  measurementId: "G-ELT9JZWPJN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
const db = getFirestore()

export default db

