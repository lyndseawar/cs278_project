import { createAppContainer, createStackNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import CreateProfileScreen from "./screens/CreateProfileScreen";
import FriendPairingScreen from "./screens/FriendPairingScreen";
import DashboardScreen from "./screens/DashboardScreen";

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Signup: SignupScreen,
});

const AppStack = createBottomTabNavigator({
  Dashboard: DashboardScreen,
  CreateProfile: CreateProfileScreen,
  FriendPairing: FriendPairingScreen,
});

const AppNavigator = createStackNavigator(
  {
    Auth: AuthStack,
    App: AppStack,
  },
  {
    initialRouteName: "Auth",
    headerMode: "none",
  }
);

export default createAppContainer(AppNavigator);
