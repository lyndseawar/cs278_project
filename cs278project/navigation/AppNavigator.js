import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import HomeScreen from "../screens/HomeScreen";
import FeedScreen from "../screens/FeedScreen";
import ProfileScreen from "../screens/ProfileScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import ProposeScreen from "../screens/ProposeScreen";

const AppStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function AppTabs() {
  return (
    <Tab.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Matches" component={MatchesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function AppStackNavigator() {
  return (
    <AppStack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerMode: "screen", headerShown: false }}
    >
      <AppStack.Screen name="Welcome" component={WelcomeScreen} />
      <AppStack.Screen name="Login" component={LoginScreen} />
      <AppStack.Screen name="Signup" component={SignupScreen} />
      <AppStack.Screen name="App" component={AppTabs} />
      <AppStack.Screen name="Home" component={HomeScreen} />
      <AppStack.Screen name="Feed" component={FeedScreen} />
      <AppStack.Screen name="Profile" component={ProfileScreen} />
      <AppStack.Screen name="Propose" component={ProposeScreen} />
    </AppStack.Navigator>
  );
}

export default AppStackNavigator;
