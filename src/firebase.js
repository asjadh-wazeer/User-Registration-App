// import firebase from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCAa7MBlO92Idth9hNfknFjGD-nYosyhm4",
  authDomain: "user-registration-applic-bfe8b.firebaseapp.com",
  projectId: "user-registration-applic-bfe8b",
  storageBucket: "user-registration-applic-bfe8b.appspot.com",
  messagingSenderId: "113708821343",
  appId: "1:113708821343:web:4d12497429af87ec5124ea",
  measurementId: "G-ZQYN8DPVXH",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
