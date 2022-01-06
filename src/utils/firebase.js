import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmU9h9pg4OIQcGRx3BHhfoI-BCYDYBXn8",
  authDomain: "capstone-project-8ba5e.firebaseapp.com",
  projectId: "capstone-project-8ba5e",
  storageBucket: "capstone-project-8ba5e.appspot.com",
  messagingSenderId: "1056500361617",
  appId: "1:1056500361617:web:4fe6e57608f505b9bd5230"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
const db = getFirestore()

export default db

