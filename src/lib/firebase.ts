import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCL9Z6W0H0LVRweClewue8HnPNHSI9vxxw",
  authDomain: "next-project-c0c63.firebaseapp.com",
  projectId: "next-project-c0c63",
  storageBucket: "next-project-c0c63.firebasestorage.app",
  messagingSenderId: "224274672797",
  appId: "1:224274672797:web:598e39b40542b51bd7b874",
  measurementId: "G-R9KPHRFDLN"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);


export const db = getFirestore(app);