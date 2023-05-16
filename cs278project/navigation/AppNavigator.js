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
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Matches" component={MatchesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function AppStackNavigator() {
  return (
    <AppStack.Navigator
      initialRouteName="Welcome"
      options={{
        headerTintColor: "#4B0082",
        headerTitleStyle: { fontFamily: "Poppins-Regular" },
      }}
    >
      <AppStack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerTintColor: "#4B0082", headerShown: false }}
      />
      <AppStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="App"
        component={AppTabs}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerMode: "screen",
          headerShown: true,
          headerTintColor: "#4B0082",
          headerTitleStyle: { fontFamily: "Poppins-Regular" },
        }}
      />
      <AppStack.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          headerMode: "screen",
          headerShown: true,
          headerTintColor: "#4B0082",
          headerTitleStyle: { fontFamily: "Poppins-Regular" },
        }}
      />
      <AppStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerMode: "screen",
          headerShown: true,
          headerTintColor: "#4B0082",
          headerTitleStyle: { fontFamily: "Poppins-Regular" },
        }}
      />
      <AppStack.Screen
        name="Propose"
        component={ProposeScreen}
        screenOptions={{ headerMode: "screen", headerShown: true }}
      />

    </AppStack.Navigator>
  );
}

export default AppStackNavigator;
