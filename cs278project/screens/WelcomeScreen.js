import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { AppLoading } from "expo";

const { width, height } = Dimensions.get("window");

const WelcomeScreen = ({ navigation }) => {
  const handleSignUp = () => {
    navigation.navigate("Signup");
  };

  const handleSignIn = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Plates</Text>
        <Text style={styles.tagline}>
          the best way to set your next platonic date
        </Text>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignIn}>
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 48,
    fontFamily: "Poppins-Bold",
  },
  tagline: {
    fontSize: 18,
    fontFamily: "Poppins-Regular",
  },
  bottomContainer: {
    paddingBottom: height / 8,
    alignItems: "center",
  },
  signUpButton: {
    width: width * 0.8,
    backgroundColor: "#4B0082",
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginBottom: 12,
  },
  signUpButtonText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Poppins-Regular",
  },
  signInText: {
    fontSize: 16,
    color: "#4B0082",
    marginTop: 12,
    fontFamily: "Poppins-Regular",
    justifyContent: "center",
  },
});

export default WelcomeScreen;
