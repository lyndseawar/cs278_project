import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useAuthentication } from "../utils/hooks/useAuthentication"; // Import your Firebase authentication hook

import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import FeedScreen from "../screens/FeedScreen";
import ProfileScreen from "../screens/ProfileScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import ProposeScreen from "../screens/ProposeScreen";

const AppStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function AppTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Feed") {
            iconName = focused ? "list" : "list-outline";
          } else if (route.name === "Propose") {
            iconName = focused ? "create" : "create-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#4B0082",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen 
        name="Feed" 
        component={FeedScreen} 
        options={{
          headerTintColor: "#4B0082",
          headerTitleStyle: { fontFamily: "Poppins-Regular" },
        }}
      />
      <Tab.Screen 
        name="Propose" 
        component={ProposeScreen} 
        options={{
          headerTintColor: "#4B0082",
          headerTitleStyle: { fontFamily: "Poppins-Regular" },
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
            headerTintColor: "#4B0082",
            headerTitleStyle: { fontFamily: "Poppins-Regular" },
        }}
      />
    </Tab.Navigator>
  );
}

function AuthStackNavigator() {
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
        options={{ headerShown: false }}
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
    </AppStack.Navigator>
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
        options={{ headerShown: false }}
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
    </AppStack.Navigator>
  );
}

export default function RootNavigation() {
  const { user, isLoading } = useAuthentication();

  if (isLoading) {
    return null; // show a loading indicator or splash screen
  }

  return user ? <AppStackNavigator /> : <AuthStackNavigator />;
}
