import React from "react";
import { StatusBar } from "react-native";
import AppNavigator from "./AppNavigator";

//You'll need to install the following packages:
//expo install react-navigation react-navigation-stack
//react - navigation - tabs react - native - gesture -
//handler react - native - reanimated react - native -
//screens react - native - safe - area - context @react-native
//- community / masked - view

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <AppNavigator />
    </>
  );
}
