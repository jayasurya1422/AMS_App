import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBIK_ROUdMEHSIs2RVlWsfRpBt7ToP4nlc",
  authDomain: "aerator-33835.firebaseapp.com",
  projectId: "aerator-33835",
  messagingSenderId: "481115230013",
  storageBucket: "aerator-33835.appspot.com",
  appId: "1:481115230013:android:ebfccd6fd7b026a936ff54"
};

let app;
let auth;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
} else {
  app = getApps()[0];
  auth = getAuth(app);
}

export const db = getFirestore(app);
export { auth };