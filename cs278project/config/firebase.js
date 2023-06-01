import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

//adding the SDKs for Firebase products you want to use
const firebaseConfig = {
  apiKey: "AIzaSyAGT0dOTGffWg0mkiTRQB4AlZ_wpLLOlqw",
  authDomain: "cs-278-project-331b5.firebaseapp.com",
  projectId: "cs-278-project-331b5",
  storageBucket: "cs-278-project-331b5.appspot.com",
  messagingSenderId: "434972141984",
  appId: "1:434972141984:web:3fdf00f49ce48955031cc5",
  measurementId: "G-9XDEBJ0YF5",
};

// initialize firebase
const app = initializeApp(firebaseConfig);

// initialize auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
