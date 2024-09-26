// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-92d06.firebaseapp.com",
  projectId: "real-estate-92d06",
  storageBucket: "real-estate-92d06.appspot.com",
  messagingSenderId: "458390575055",
  appId: "1:458390575055:web:7588ff8f1df57fcd28e4ba",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
