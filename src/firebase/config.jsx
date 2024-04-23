// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_psaKzxmgMDKrx63tbhh-bcQ-AKYDpJQ",
  authDomain: "ec-bid.firebaseapp.com",
  databaseURL: "https://ec-bid-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ec-bid",
  storageBucket: "ec-bid.appspot.com",
  messagingSenderId: "336214138183",
  appId: "1:336214138183:web:6be1ccb769f2aaad354062",
  measurementId: "G-5CTDLF80CY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
export const db = getFirestore(app);
export const auth = getAuth(app);