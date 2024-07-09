// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBIK_ROUdMEHSIs2RVlWsfRpBt7ToP4nlc",
  authDomain: "aerator-33835.firebaseapp.com",  
  projectId: "aerator-33835",
  messagingSenderId: "481115230013",
  storageBucket: "aerator-33835.appspot.com",
  appId: "1:481115230013:android:ebfccd6fd7b026a936ff54"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, createUserWithEmailAndPassword };
