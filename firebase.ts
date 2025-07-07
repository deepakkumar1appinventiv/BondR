// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJegRw6KxET33ejY4qeGeP1IlNo3vDLjk",
  authDomain: "bondr-social-media-app.firebaseapp.com",
  projectId: "bondr-social-media-app",
  storageBucket: "bondr-social-media-app.firebasestorage.app",
  messagingSenderId: "912922086253",
  appId: "1:912922086253:web:1d599f3f669069e0792864"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()

export const db = getFirestore()