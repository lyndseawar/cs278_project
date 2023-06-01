import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import { FeedScreen, ProposeScreen, ProfileScreen } from '../screens';

const Tab = createBottomTabNavigator();

export const AppStack = () => {
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
};
