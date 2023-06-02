import { initializeApp } from 'firebase/app';
import { getFirestore, initializeFirestore } from 'firebase/firestore'; // import Firestore functions
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyAGT0dOTGffWg0mkiTRQB4AlZ_wpLLOlqw",
  authDomain: "cs-278-project-331b5.firebaseapp.com",
  projectId: "cs-278-project-331b5",
  storageBucket: "cs-278-project-331b5.appspot.com",
  messagingSenderId: "434972141984",
  appId: "1:434972141984:web:3fdf00f49ce48955031cc5",
  measurementId: "G-9XDEBJ0YF5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore
const db = getFirestore(app); // Initialize Firestore using the app instance

export { auth, db }; // Export the auth and db (Firestore) objects for usage in other files
