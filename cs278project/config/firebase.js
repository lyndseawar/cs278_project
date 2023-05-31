import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
//import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

// Your web app's Firebase configuration
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

//const analytics = getAnalytics(app);
//const db = getFirestore(app);

//export default { db };
export default app;
