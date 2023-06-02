import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { WelcomeScreen, LoginScreen, SignupScreen } from '../screens';

const Stack = createStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='Welcome'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen 
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }} />
      <Stack.Screen 
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }} />
      <Stack.Screen 
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: false }} />
      {/* <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} /> */}
    </Stack.Navigator>
  );
};
