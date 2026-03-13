// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC01_CQufP41yOMD72JP5NuDqS5IGy0DoI",
  authDomain: "echo-d3fb2.firebaseapp.com",
  projectId: "echo-d3fb2",
  storageBucket: "echo-d3fb2.firebasestorage.app",
  messagingSenderId: "480844890059",
  appId: "1:480844890059:web:29877c7af9f1167d1b004e",
  measurementId: "G-KQEFFVM4ZG"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);