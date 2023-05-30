import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigation/AppNavigator";
import { useFonts } from "expo-font";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGT0dOTGffWg0mkiTRQB4AlZ_wpLLOlqw",
  authDomain: "cs-278-project-331b5.firebaseapp.com",
  projectId: "cs-278-project-331b5",
  storageBucket: "cs-278-project-331b5.appspot.com",
  messagingSenderId: "434972141984",
  appId: "1:434972141984:web:3fdf00f49ce48955031cc5",
  measurementId: "G-9XDEBJ0YF5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default function App() {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins/Poppins-Regular.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("./assets/fonts/Poppins/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("./assets/fonts/Poppins/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins/Poppins-Light.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("./assets/fonts/Poppins/Poppins-Thin.ttf"),
  });

  if (!fontsLoaded) {
    return null; //show a loading indicator or splash screen
  }

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
