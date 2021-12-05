import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBLsZ8cI7iYsWHYeXcVPkdKibKHOWrj4qQ",
  authDomain: "capstone-5b03c.firebaseapp.com",
  projectId: "capstone-5b03c",
  storageBucket: "capstone-5b03c.appspot.com",
  messagingSenderId: "405356690926",
  appId: "1:405356690926:web:855ed425afcc806f6422ff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
const db = getFirestore()

export default db

