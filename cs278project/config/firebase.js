//import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
