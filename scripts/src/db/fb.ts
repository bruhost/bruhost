// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCBt0XO_FRsFr-QGn91NrVzR5nfugJaOmw",
  authDomain: "bruh0st.firebaseapp.com",
  projectId: "bruh0st",
  storageBucket: "bruh0st.firebasestorage.app",
  messagingSenderId: "481699813539",
  appId: "1:481699813539:web:eb485a8216820a06c98716",
  measurementId: "G-WTSH3E9NVD"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth }