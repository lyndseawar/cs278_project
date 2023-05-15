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
      options={{
        headerTintColor: "#FFF",
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
      <AppStack.Screen
        name="Home"
        component={HomeScreen}
        screenOptions={{ headerMode: "screen", headerShown: true }}
      />
      <AppStack.Screen
        name="Feed"
        component={FeedScreen}
        screenOptions={{ headerMode: "screen", headerShown: true }}
      />
      <AppStack.Screen
        name="Profile"
        component={ProfileScreen}
        screenOptions={{ headerMode: "screen", headerShown: true }}
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
