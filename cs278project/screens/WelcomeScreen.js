import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";
import welcomeImage from "../assets/boy-and-girl-giving-high-five-to-each-other.png";


const { width, height } = Dimensions.get("window");

export const WelcomeScreen = ({ navigation }) => {
  const handleSignUp = () => {
    navigation.navigate("Signup");
  };

  const handleSignIn = () => {
    navigation.navigate("Login");
  };

  return (
    <ImageBackground
      source={welcomeImage}
      style={styles.container}
      resizeMode="contain"
    >
      <View style={styles.dimmingOverlay} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Platedate</Text>
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  dimmingOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.01)",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  titleContainer: {
    height: height * 0.25,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  title: {
    fontSize: 48,
    fontFamily: "Poppins-Bold",
  },
  tagline: {
    width: width * 0.9,
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    textAlign: "center",
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: height / 9,
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
